import "server-only";
import { getDb } from "./db";
import type { Locale } from "./blog/doc";
import type { BodyFormat } from "./blog/post-text";

export type Post = {
  id: string;
  slug: string;
  /** An article and its translation share one slug and differ by locale. */
  locale: Locale;
  title: string;
  /** Optional override for where the hero title splits into lead + rest. */
  title_lead: string | null;
  /** The small label above the hero title; falls back to the category. */
  eyebrow: string;
  excerpt: string;
  /** Markdown (posts written before the visual editor) or document JSON. */
  body: string;
  body_format: BodyFormat;
  cover_url: string | null;
  category: string;
  tags: string[];
  author_name: string;
  /** Calculated from the body on every save. */
  read_minutes: number;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

// SQLite has no boolean and no array type, so `published` is stored as 0/1 and
// `tags` as a JSON string. Every read goes through here so the rest of the app
// keeps seeing the same shape it saw from Postgres.
export type PostRow = Omit<Post, "tags" | "published"> & {
  tags: string;
  published: number;
};

function parseTags(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.filter((t): t is string => typeof t === "string");
  } catch {
    // A hand-edited row shouldn't take the blog down over its tag list.
  }
  return [];
}

export function rowToPost(row: PostRow): Post {
  return {
    ...row,
    tags: parseTags(row.tags),
    published: row.published === 1,
  };
}

const LIST_COLUMNS =
  "id, slug, locale, title, title_lead, eyebrow, excerpt, body_format, cover_url, category, tags, author_name, read_minutes, published_at";

export type PostListItem = Omit<Post, "body" | "created_at" | "updated_at" | "published">;

// -------- public: list published posts in one language --------
export async function listPublishedPosts(locale: Locale = "en"): Promise<PostListItem[]> {
  const rows = getDb()
    .prepare(
      `SELECT ${LIST_COLUMNS} FROM posts
       WHERE published = 1 AND locale = ?
       ORDER BY published_at DESC`,
    )
    .all(locale) as unknown as Array<Omit<PostListItem, "tags"> & { tags: string }>;

  return rows.map((row) => ({ ...row, tags: parseTags(row.tags) }));
}

// -------- public: read one published post by slug --------
export async function getPublishedPostBySlug(
  slug: string,
  locale: Locale = "en",
): Promise<Post | null> {
  const row = getDb()
    .prepare("SELECT * FROM posts WHERE slug = ? AND locale = ? AND published = 1")
    .get(slug, locale) as PostRow | undefined;

  return row ? rowToPost(row) : null;
}

// -------- public: is the same article published in another language? --------
export async function hasPublishedTranslation(slug: string, locale: Locale): Promise<boolean> {
  const row = getDb()
    .prepare("SELECT 1 AS found FROM posts WHERE slug = ? AND locale = ? AND published = 1")
    .get(slug, locale);
  return Boolean(row);
}
