"use server";

import { randomUUID } from "node:crypto";
import { z } from "zod";
import { requireAdmin, isSignedIn } from "./auth";
import { getDb, nowIso } from "./db";
import { rowToPost, type Post, type PostRow } from "./posts";

// -------- admin: check current user is admin --------
// There is a single admin account, so "signed in" and "is admin" are the same
// question now — the old user_roles lookup has no equivalent.
export async function isCurrentUserAdmin() {
  return isSignedIn();
}

// -------- admin: list all posts (draft + published) --------
export async function adminListAllPosts(): Promise<Post[]> {
  await requireAdmin();
  const rows = getDb()
    .prepare("SELECT * FROM posts ORDER BY updated_at DESC")
    .all() as unknown as PostRow[];
  return rows.map(rowToPost);
}

// -------- admin: get one post by id (any state) --------
export async function adminGetPost(id: string): Promise<Post | null> {
  await requireAdmin();
  const row = getDb().prepare("SELECT * FROM posts WHERE id = ?").get(id) as PostRow | undefined;
  return row ? rowToPost(row) : null;
}

const upsertSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and dashes only"),
  title: z.string().trim().min(1).max(200),
  excerpt: z.string().trim().max(500).default(""),
  body: z.string().max(200_000).default(""),
  // Covers uploaded through the editor are served from this app
  // (/api/uploads/<file>), so a site-relative path has to be accepted
  // alongside the absolute URLs that were valid before.
  cover_url: z
    .string()
    .max(1000)
    .refine(
      (value) => value.startsWith("/api/uploads/") || /^https?:\/\//.test(value),
      "Must be an uploaded image or an absolute URL",
    )
    .nullable()
    .optional(),
  category: z.string().trim().min(1).max(60),
  tags: z.array(z.string().trim().min(1).max(40)).max(12),
  author_name: z.string().trim().min(1).max(120),
  read_minutes: z.number().int().min(1).max(120),
  published: z.boolean(),
});

// SQLite rejects a bound boolean, and stores arrays as text.
function toParams(data: z.infer<typeof upsertSchema>) {
  return {
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    body: data.body,
    cover_url: data.cover_url ?? null,
    category: data.category,
    tags: JSON.stringify(data.tags),
    author_name: data.author_name,
    read_minutes: data.read_minutes,
    published: data.published ? 1 : 0,
  };
}

function slugTaken(slug: string, exceptId?: string): boolean {
  const row = getDb().prepare("SELECT id FROM posts WHERE slug = ?").get(slug) as
    | { id: string }
    | undefined;
  return Boolean(row) && row!.id !== exceptId;
}

// -------- admin: create --------
export async function adminCreatePost(input: unknown): Promise<Post> {
  const data = upsertSchema.omit({ id: true }).parse(input);
  await requireAdmin();

  // Postgres raised a unique-violation here; SQLite would too, but with a
  // message that means nothing to whoever is writing the post.
  if (slugTaken(data.slug)) {
    throw new Error(`The slug "${data.slug}" is already used by another post.`);
  }

  const params = toParams(data);
  const id = randomUUID();
  const timestamp = nowIso();

  getDb()
    .prepare(
      `INSERT INTO posts
         (id, slug, title, excerpt, body, cover_url, category, tags, author_name,
          read_minutes, published, published_at, created_at, updated_at)
       VALUES
         (:id, :slug, :title, :excerpt, :body, :cover_url, :category, :tags, :author_name,
          :read_minutes, :published, :published_at, :created_at, :updated_at)`,
    )
    .run({
      ...params,
      id,
      published_at: data.published ? timestamp : null,
      created_at: timestamp,
      updated_at: timestamp,
    });

  const row = getDb().prepare("SELECT * FROM posts WHERE id = ?").get(id) as PostRow;
  return rowToPost(row);
}

// -------- admin: update --------
export async function adminUpdatePost(input: unknown): Promise<Post> {
  const data = upsertSchema.extend({ id: z.string().uuid() }).parse(input);
  const { id } = data;
  await requireAdmin();

  const existing = getDb()
    .prepare("SELECT published_at FROM posts WHERE id = ?")
    .get(id) as { published_at: string | null } | undefined;

  if (!existing) throw new Error("That post no longer exists.");
  if (slugTaken(data.slug, id)) {
    throw new Error(`The slug "${data.slug}" is already used by another post.`);
  }

  // preserve published_at if already set; else set on first publish
  const published_at = data.published ? (existing.published_at ?? nowIso()) : null;

  getDb()
    .prepare(
      `UPDATE posts SET
         slug = :slug, title = :title, excerpt = :excerpt, body = :body,
         cover_url = :cover_url, category = :category, tags = :tags,
         author_name = :author_name, read_minutes = :read_minutes,
         published = :published, published_at = :published_at, updated_at = :updated_at
       WHERE id = :id`,
    )
    .run({ ...toParams(data), id, published_at, updated_at: nowIso() });

  const row = getDb().prepare("SELECT * FROM posts WHERE id = ?").get(id) as PostRow;
  return rowToPost(row);
}

// -------- admin: delete --------
export async function adminDeletePost(id: string) {
  await requireAdmin();
  getDb().prepare("DELETE FROM posts WHERE id = ?").run(id);
  return { ok: true as const };
}
