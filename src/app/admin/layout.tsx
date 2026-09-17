import type { Metadata } from "next";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { isSignedIn } from "@/lib/auth";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// The session cookie is readable on the server, so the gate runs here instead
// of in a client component. Nothing under /admin renders — or reaches the
// browser at all — for a signed-out visitor, where the old client-side gate
// shipped the page and then redirected.
export default async function AdminLayout({ children }: { children: ReactNode }) {
  if (!(await isSignedIn())) {
    redirect("/auth?redirect=/admin/blog");
  }

  return <>{children}</>;
}
