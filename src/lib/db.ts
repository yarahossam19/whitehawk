import "server-only";
import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { bodyToDoc, readMinutes } from "./blog/post-text";

/**
 * SQLite replaces the Supabase Postgres this project used to talk to.
 *
 * Everything that has to outlive a container rebuild lives under DATA_DIR —
 * the database file and the uploaded cover images. The deploy bind-mounts a
 * directory from the EC2 host onto it (see .gitlab-ci.yml), so redeploying
 * replaces the image without touching the data. Locally it defaults to ./data,
 * which is gitignored.
 *
 * `node:sqlite` is a Node built-in (stable from Node 24), so there is no
 * dependency to install and nothing native to compile in the Docker build.
 */
export const DATA_DIR = process.env.DATA_DIR ?? path.join(process.cwd(), "data");
export const UPLOADS_DIR = path.join(DATA_DIR, "uploads");

// Timestamps are ISO-8601 UTC strings rather than SQLite's own datetime format,
// so every row reads back in exactly the shape the app already expects from
// Postgres (`2026-09-17T10:20:30.123Z`) and `new Date(...)` parses it directly.
const NOW = "strftime('%Y-%m-%dT%H:%M:%fZ', 'now')";

// Mirrors supabase/migrations/*.sql minus the parts SQLite has no use for:
// RLS policies (access is decided in Server Actions now) and `user_roles`
// (a single admin, defined by ADMIN_EMAIL — see src/lib/auth.ts).
//
// `posts` here is the original shape; MIGRATIONS below brings it up to date.
const SCHEMA = `
  CREATE TABLE IF NOT EXISTS posts (
    id            TEXT PRIMARY KEY,
    slug          TEXT NOT NULL UNIQUE,
    title         TEXT NOT NULL,
    excerpt       TEXT NOT NULL DEFAULT '',
    body          TEXT NOT NULL DEFAULT '',
    cover_url     TEXT,
    category      TEXT NOT NULL DEFAULT 'Insights',
    tags          TEXT NOT NULL DEFAULT '[]',
    author_name   TEXT NOT NULL DEFAULT 'WhiteHawk Team',
    read_minutes  INTEGER NOT NULL DEFAULT 5,
    published     INTEGER NOT NULL DEFAULT 0,
    published_at  TEXT,
    created_at    TEXT NOT NULL DEFAULT (${NOW}),
    updated_at    TEXT NOT NULL DEFAULT (${NOW})
  );

  CREATE INDEX IF NOT EXISTS posts_published_idx
    ON posts (published, published_at DESC);

  CREATE TABLE IF NOT EXISTS contact_messages (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    email       TEXT NOT NULL,
    company     TEXT,
    message     TEXT NOT NULL,
    source      TEXT NOT NULL DEFAULT 'contact',
    created_at  TEXT NOT NULL DEFAULT (${NOW})
  );

  CREATE INDEX IF NOT EXISTS contact_messages_created_idx
    ON contact_messages (created_at DESC);
`;

/**
 * Schema changes after the initial SCHEMA, tracked with PRAGMA user_version.
 * Each step runs once, in a transaction, on whichever database it finds —
 * a fresh one gets SCHEMA above and then every step, an existing one only
 * the steps it hasn't had yet.
 */
const MIGRATIONS: Array<(db: DatabaseSync) => void> = [
  // v1 — bilingual articles and the visual editor.
  // SQLite can't drop the UNIQUE(slug) constraint in place, so the table is
  // rebuilt: an English article and its Arabic version share one slug and are
  // told apart by `locale`. Existing rows become English Markdown posts, and
  // their read time is recalculated from the text, since it is no longer
  // typed by hand.
  (db) => {
    db.exec(`
      CREATE TABLE posts_v1 (
        id            TEXT PRIMARY KEY,
        slug          TEXT NOT NULL,
        locale        TEXT NOT NULL DEFAULT 'en' CHECK (locale IN ('en', 'ar')),
        title         TEXT NOT NULL,
        title_lead    TEXT,
        eyebrow       TEXT NOT NULL DEFAULT '',
        excerpt       TEXT NOT NULL DEFAULT '',
        body          TEXT NOT NULL DEFAULT '',
        body_format   TEXT NOT NULL DEFAULT 'markdown' CHECK (body_format IN ('markdown', 'doc')),
        cover_url     TEXT,
        category      TEXT NOT NULL DEFAULT 'Insights',
        tags          TEXT NOT NULL DEFAULT '[]',
        author_name   TEXT NOT NULL DEFAULT 'WhiteHawk Team',
        read_minutes  INTEGER NOT NULL DEFAULT 5,
        published     INTEGER NOT NULL DEFAULT 0,
        published_at  TEXT,
        created_at    TEXT NOT NULL DEFAULT (${NOW}),
        updated_at    TEXT NOT NULL DEFAULT (${NOW}),
        UNIQUE (slug, locale)
      );

      INSERT INTO posts_v1
        (id, slug, title, excerpt, body, cover_url, category, tags, author_name,
         read_minutes, published, published_at, created_at, updated_at)
      SELECT id, slug, title, excerpt, body, cover_url, category, tags, author_name,
             read_minutes, published, published_at, created_at, updated_at
      FROM posts;

      DROP TABLE posts;
      ALTER TABLE posts_v1 RENAME TO posts;

      CREATE INDEX posts_published_idx ON posts (locale, published, published_at DESC);
    `);

    const rows = db.prepare("SELECT id, body FROM posts").all() as Array<{ id: string; body: string }>;
    const update = db.prepare("UPDATE posts SET read_minutes = ? WHERE id = ?");
    for (const row of rows) {
      update.run(readMinutes(bodyToDoc(row.body, "markdown"), "en"), row.id);
    }
  },
];

function migrate(db: DatabaseSync) {
  const { user_version: current } = db.prepare("PRAGMA user_version").get() as {
    user_version: number;
  };
  for (let version = current; version < MIGRATIONS.length; version++) {
    db.exec("BEGIN IMMEDIATE");
    try {
      MIGRATIONS[version](db);
      db.exec(`PRAGMA user_version = ${version + 1}`);
      db.exec("COMMIT");
    } catch (error) {
      db.exec("ROLLBACK");
      throw error;
    }
  }
}

function openDatabase() {
  // Creates DATA_DIR too, since uploads sits inside it.
  mkdirSync(UPLOADS_DIR, { recursive: true });

  const db = new DatabaseSync(path.join(DATA_DIR, "app.db"));
  // WAL lets the public site keep reading while the admin writes; the timeout
  // covers the brief moments a write holds the lock.
  db.exec("PRAGMA journal_mode = WAL");
  db.exec("PRAGMA busy_timeout = 5000");
  db.exec("PRAGMA foreign_keys = ON");
  db.exec(SCHEMA);
  migrate(db);
  return db;
}

// One connection per process. Cached on globalThis because `next dev` re-
// evaluates modules on hot reload, and a fresh handle per reload would leak
// file descriptors until the dev server restarts.
const globalForDb = globalThis as typeof globalThis & {
  __whitehawkDb?: DatabaseSync;
};

export function getDb(): DatabaseSync {
  if (!globalForDb.__whitehawkDb) {
    globalForDb.__whitehawkDb = openDatabase();
  }
  return globalForDb.__whitehawkDb;
}

export function nowIso() {
  return new Date().toISOString();
}
