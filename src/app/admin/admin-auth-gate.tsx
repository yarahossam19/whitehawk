"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";

// Client-side auth gate (mirrors the original `ssr: false` pathless layout
// guard) — checks the session in the browser and bounces to /auth if absent.
export function AdminAuthGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return;
      if (error || !data.user) {
        router.replace(`/auth?redirect=${encodeURIComponent(pathname)}`);
        return;
      }
      setAuthorized(true);
    });
    return () => {
      active = false;
    };
  }, [router, pathname]);

  if (!authorized) return null;

  return <>{children}</>;
}
