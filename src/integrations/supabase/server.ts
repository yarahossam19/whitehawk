// Server-side Supabase client scoped to the current request's session cookie.
// Use this in Server Components, Server Actions and Route Handlers so RLS
// policies apply exactly as they would for the signed-in user.
import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./types";

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    const missing = [
      ...(!SUPABASE_URL ? ["NEXT_PUBLIC_SUPABASE_URL"] : []),
      ...(!SUPABASE_PUBLISHABLE_KEY ? ["NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"] : []),
    ];
    throw new Error(`Missing Supabase environment variable(s): ${missing.join(", ")}.`);
  }

  return createServerClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called during a Server Component render, where cookies are
          // read-only. Session refresh already happens in middleware.
        }
      },
    },
  });
}

// Authenticated user + a client scoped to their session — the equivalent of
// the old `requireSupabaseAuth` middleware, for use inside Server Actions.
export async function requireUser() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims?.sub) {
    throw new Error("Unauthorized: sign in required");
  }
  return { supabase, userId: data.claims.sub as string };
}
