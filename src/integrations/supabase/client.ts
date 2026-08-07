// Browser Supabase client — session lives in cookies (via @supabase/ssr) so
// both client components and server code (middleware, Server Actions) see
// the same session.
import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./types";

function createSupabaseBrowserClient() {
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
    const missing = [
      ...(!SUPABASE_URL ? ["NEXT_PUBLIC_SUPABASE_URL"] : []),
      ...(!SUPABASE_PUBLISHABLE_KEY ? ["NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"] : []),
    ];
    const message = `Missing Supabase environment variable(s): ${missing.join(", ")}.`;
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }

  return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}

let _supabase: ReturnType<typeof createSupabaseBrowserClient> | undefined;

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";
export const supabase = new Proxy({} as ReturnType<typeof createSupabaseBrowserClient>, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseBrowserClient();
    return Reflect.get(_supabase, prop, receiver);
  },
});
