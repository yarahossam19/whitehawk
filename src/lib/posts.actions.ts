"use server";

import { z } from "zod";
import { requireUser } from "@/integrations/supabase/server";
import type { Post } from "./posts";

// -------- admin: check current user is admin --------
export async function isCurrentUserAdmin() {
  const { supabase, userId } = await requireUser();
  const { data, error } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (error) throw new Error(error.message);
  return Boolean(data);
}

// -------- admin: list all posts (draft + published) --------
export async function adminListAllPosts() {
  const { supabase } = await requireUser();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Post[];
}

// -------- admin: get one post by id (any state) --------
export async function adminGetPost(id: string) {
  const { supabase } = await requireUser();
  const { data: row, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (row as Post | null) ?? null;
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
  cover_url: z.string().url().max(1000).nullable().optional(),
  category: z.string().trim().min(1).max(60),
  tags: z.array(z.string().trim().min(1).max(40)).max(12),
  author_name: z.string().trim().min(1).max(120),
  read_minutes: z.number().int().min(1).max(120),
  published: z.boolean(),
});

// -------- admin: create --------
export async function adminCreatePost(input: unknown) {
  const data = upsertSchema.omit({ id: true }).parse(input);
  const { supabase } = await requireUser();
  const insert = {
    ...data,
    cover_url: data.cover_url ?? null,
    published_at: data.published ? new Date().toISOString() : null,
  };
  const { data: row, error } = await supabase.from("posts").insert(insert).select("*").single();
  if (error) throw new Error(error.message);
  return row as Post;
}

// -------- admin: update --------
export async function adminUpdatePost(input: unknown) {
  const data = upsertSchema.extend({ id: z.string().uuid() }).parse(input);
  const { id, ...patch } = data;
  const { supabase } = await requireUser();
  // preserve published_at if already set; else set on first publish
  const { data: existing } = await supabase
    .from("posts")
    .select("published, published_at")
    .eq("id", id)
    .maybeSingle();
  const published_at = patch.published
    ? (existing?.published_at ?? new Date().toISOString())
    : null;
  const { data: row, error } = await supabase
    .from("posts")
    .update({ ...patch, cover_url: patch.cover_url ?? null, published_at })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return row as Post;
}

// -------- admin: delete --------
export async function adminDeletePost(id: string) {
  const { supabase } = await requireUser();
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  return { ok: true as const };
}
