"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin, isSignedIn } from "./auth";
import { getDb, nowIso } from "./db";
import { rowToPost, type Post, type PostRow } from "./posts";
import { docSchema, type Locale } from "./blog/doc";
import { readMinutes } from "./blog/post-text";

// -------- admin: check current user is admin --------
// There is a single admin account, so "signed in" and "is admin" are the same
// question now — the old user_roles lookup has no equivalent.
export async function isCurrentUserAdmin() {
  return isSignedIn();
}

// -------- admin: list all posts (draft + published, every language) --------
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
  locale: z.enum(["en", "ar"]),
  title: z.string().trim().min(1).max(200),
  title_lead: z.string().trim().max(200).nullable().optional(),
  eyebrow: z.string().trim().max(60).default(""),
  excerpt: z.string().trim().max(500).default(""),
  // Validated node by node (see src/lib/blog/doc.ts): only the editor's own
  // blocks, safe link targets and uploaded/https images can be stored.
  body: docSchema,
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
  published: z.boolean(),
});

// Document JSON is roughly twice the size of the Markdown it replaces; this
// keeps about the same article length the old 200,000-character limit allowed.
const MAX_BODY_CHARS = 400_000;

// SQLite rejects a bound boolean, and stores arrays as text.
function toParams(data: z.infer<typeof upsertSchema>) {
  const body = JSON.stringify(data.body);
  if (body.length > MAX_BODY_CHARS) {
    throw new Error("This article is too long to save. Split it into two posts.");
  }
  return {
    slug: data.slug,
    locale: data.locale,
    title: data.title,
    title_lead: data.title_lead ? data.title_lead : null,
    eyebrow: data.eyebrow,
    excerpt: data.excerpt,
    body,
    body_format: "doc",
    cover_url: data.cover_url ?? null,
    category: data.category,
    tags: JSON.stringify(data.tags),
    author_name: data.author_name,
    read_minutes: readMinutes(data.body, data.locale),
    published: data.published ? 1 : 0,
  };
}

function slugTaken(slug: string, locale: Locale, exceptId?: string): boolean {
  const row = getDb()
    .prepare("SELECT id FROM posts WHERE slug = ? AND locale = ?")
    .get(slug, locale) as { id: string } | undefined;
  return Boolean(row) && row!.id !== exceptId;
}

function slugTakenMessage(slug: string, locale: Locale) {
  return locale === "ar"
    ? `An Arabic article already uses the slug "${slug}".`
    : `The slug "${slug}" is already used by another post.`;
}

// Published pages are cached for up to a minute (`revalidate = 60`); a save
// refreshes both language versions and both indexes straight away.
function refreshPublicPages(slug: string) {
  for (const path of [`/blog/${slug}`, `/ar/blog/${slug}`, "/blog", "/ar/blog"]) {
    revalidatePath(path);
  }
}

// -------- admin: create --------
export async function adminCreatePost(input: unknown): Promise<Post> {
  const data = upsertSchema.omit({ id: true }).parse(input);
  await requireAdmin();

  // Postgres raised a unique-violation here; SQLite would too, but with a
  // message that means nothing to whoever is writing the post.
  if (slugTaken(data.slug, data.locale)) {
    throw new Error(slugTakenMessage(data.slug, data.locale));
  }

  const params = toParams(data);
  const id = randomUUID();
  const timestamp = nowIso();

  getDb()
    .prepare(
      `INSERT INTO posts
         (id, slug, locale, title, title_lead, eyebrow, excerpt, body, body_format, cover_url,
          category, tags, author_name, read_minutes, published, published_at, created_at, updated_at)
       VALUES
         (:id, :slug, :locale, :title, :title_lead, :eyebrow, :excerpt, :body, :body_format, :cover_url,
          :category, :tags, :author_name, :read_minutes, :published, :published_at, :created_at, :updated_at)`,
    )
    .run({
      ...params,
      id,
      published_at: data.published ? timestamp : null,
      created_at: timestamp,
      updated_at: timestamp,
    });

  refreshPublicPages(data.slug);
  const row = getDb().prepare("SELECT * FROM posts WHERE id = ?").get(id) as PostRow;
  return rowToPost(row);
}

// -------- admin: update --------
export async function adminUpdatePost(input: unknown): Promise<Post> {
  const data = upsertSchema.extend({ id: z.string().uuid() }).parse(input);
  const { id } = data;
  await requireAdmin();

  const existing = getDb()
    .prepare("SELECT slug, published_at FROM posts WHERE id = ?")
    .get(id) as { slug: string; published_at: string | null } | undefined;

  if (!existing) throw new Error("That post no longer exists.");
  if (slugTaken(data.slug, data.locale, id)) {
    throw new Error(slugTakenMessage(data.slug, data.locale));
  }

  // preserve published_at if already set; else set on first publish
  const published_at = data.published ? (existing.published_at ?? nowIso()) : null;

  getDb()
    .prepare(
      `UPDATE posts SET
         slug = :slug, locale = :locale, title = :title, title_lead = :title_lead,
         eyebrow = :eyebrow, excerpt = :excerpt, body = :body, body_format = :body_format,
         cover_url = :cover_url, category = :category, tags = :tags,
         author_name = :author_name, read_minutes = :read_minutes,
         published = :published, published_at = :published_at, updated_at = :updated_at
       WHERE id = :id`,
    )
    .run({ ...toParams(data), id, published_at, updated_at: nowIso() });

  refreshPublicPages(data.slug);
  if (existing.slug !== data.slug) refreshPublicPages(existing.slug);
  const row = getDb().prepare("SELECT * FROM posts WHERE id = ?").get(id) as PostRow;
  return rowToPost(row);
}

// -------- admin: delete --------
export async function adminDeletePost(id: string) {
  await requireAdmin();
  const row = getDb().prepare("SELECT slug FROM posts WHERE id = ?").get(id) as
    | { slug: string }
    | undefined;
  getDb().prepare("DELETE FROM posts WHERE id = ?").run(id);
  if (row) refreshPublicPages(row.slug);
  return { ok: true as const };
}
