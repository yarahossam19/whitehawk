import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

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

function publicClient() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// -------- public: list published posts --------
export async function listPublishedPosts() {
  const supabase = publicClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, slug, title, excerpt, cover_url, category, tags, author_name, read_minutes, published_at",
    )
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Array<Omit<Post, "body" | "created_at" | "updated_at" | "published">>;
}

// -------- public: read one published post by slug --------
export async function getPublishedPostBySlug(slug: string) {
  const supabase = publicClient();
  const { data: row, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (row as Post | null) ?? null;
}
