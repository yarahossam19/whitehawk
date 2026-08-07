import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteLayout } from "@/components/site/SiteLayout/SiteLayout";
import { AuthForm } from "./auth-form";

export const metadata: Metadata = {
  title: "Sign in — WhiteHawk",
  description: "Sign in to manage your WhiteHawk content and account.",
  robots: { index: false, follow: false },
};

export default function AuthPage() {
  return (
    <SiteLayout>
      <Suspense fallback={null}>
        <AuthForm />
      </Suspense>
    </SiteLayout>
  );
}
