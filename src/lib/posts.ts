import "server-only";
import { getDb } from "./db";

export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_url: string | null;
  category: string;
  tags: string[];
  author_name: string;
  read_minutes: number;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

// SQLite has no boolean and no array type, so `published` is stored as 0/1 and
// `tags` as a JSON string. Every read goes through here so the rest of the app
// keeps seeing the same shape it saw from Postgres.
export type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_url: string | null;
  category: string;
  tags: string;
  author_name: string;
  read_minutes: number;
  published: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export function rowToPost(row: PostRow): Post {
  let tags: string[] = [];
  try {
    const parsed = JSON.parse(row.tags);
    if (Array.isArray(parsed)) tags = parsed.filter((t): t is string => typeof t === "string");
  } catch {
    // A hand-edited row shouldn't take the blog down over its tag list.
  }

  return {
    ...row,
    tags,
    published: row.published === 1,
  };
}

const LIST_COLUMNS =
  "id, slug, title, excerpt, cover_url, category, tags, author_name, read_minutes, published_at";

export type PostListItem = Omit<Post, "body" | "created_at" | "updated_at" | "published">;

// -------- public: list published posts --------
export async function listPublishedPosts(): Promise<PostListItem[]> {
  const rows = getDb()
    .prepare(
      `SELECT ${LIST_COLUMNS} FROM posts
       WHERE published = 1
       ORDER BY published_at DESC`,
    )
    .all() as unknown as Array<Omit<PostRow, "body" | "created_at" | "updated_at" | "published">>;

  return rows.map((row) => {
    const { tags, ...rest } = row;
    let parsedTags: string[] = [];
    try {
      const parsed = JSON.parse(tags);
      if (Array.isArray(parsed)) {
        parsedTags = parsed.filter((t): t is string => typeof t === "string");
      }
    } catch {
      // as above
    }
    return { ...rest, tags: parsedTags };
  });
}

// -------- public: read one published post by slug --------
export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  const row = getDb()
    .prepare("SELECT * FROM posts WHERE slug = ? AND published = 1")
    .get(slug) as PostRow | undefined;

  return row ? rowToPost(row) : null;
}
