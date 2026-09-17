"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { currentAdminEmail, signInAction } from "@/lib/auth.actions";
import { Button } from "@/components/site/ui/Button/Button";
import { toast } from "sonner";
import styles from "./auth-form.module.scss";

export function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  // Sign-up disabled — see the note in the card below. `mode` had only one
  // reachable value, so it and its ternaries are removed rather than frozen.
  // const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    currentAdminEmail().then((email) => {
      if (email) router.replace(redirect || "/admin/blog");
    });
  }, [router, redirect]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      // Sign-up was already disabled here when this ran on Supabase Auth, and
      // there is now exactly one admin account defined by ADMIN_EMAIL /
      // ADMIN_PASSWORD_HASH — so there is nothing to register.
      const result = await signInAction({ email, password });
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      toast.success("Signed in");
      // A full navigation, so the server re-reads the freshly set session
      // cookie when it renders the admin layout.
      window.location.href = redirect || "/admin/blog";
    } catch {
      toast.error("Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className={styles.section}>
      <div aria-hidden className={styles.glow} />
      <div className={styles.inner}>
        <div className={styles.textCol}>
          <div className={styles.eyebrow}>Team access</div>
          <h1 className={styles.title}>
            Welcome back.
          </h1>
          <p className={styles.description}>
            This is the internal sign-in for the WhiteHawk team — publish articles, review
            contact messages, manage content. Accounts are provisioned by an existing admin.
          </p>
        </div>
        <div className={styles.card}>
          {/* Sign-up is disabled: the blog admin is invite-only, so /auth offers
              sign-in only. With a single mode the tab switcher has nothing to
              switch between, so it's commented out rather than rendered as a
              lone tab. Restore this block (and the signUp branch in `submit`,
              plus the `mode`-dependent copy) to re-enable self-registration.

          <div className={styles.tabs}>
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`${styles.tab} ${mode === m ? styles.tabActive : styles.tabInactive}`}
              >
                {m === "signin" ? "Sign in" : "Sign up"}
              </button>
            ))}
          </div>
          */}
          <h1 style={{ marginBottom: "1rem" ,fontWeight: "bold",display: "flex",alignSelf: "center"}}> Sign In</h1>
          <form onSubmit={submit} className={styles.form}>
            <div>
              <label className={styles.label}>
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
            </div>
            <div>
              <label className={styles.label}>
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
            </div>
            <Button variant="accent" size="lg" className={styles.submitButton} type="submit" disabled={busy}>
              {busy ? "…" : "Sign in"}
            </Button>
            <p className={styles.disclaimer}>
              By continuing, you agree to WhiteHawk's Terms and Privacy.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
