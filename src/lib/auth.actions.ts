"use server";

import { z } from "zod";
import { checkCredentials, endSession, getSessionEmail, startSession } from "./auth";

const signInSchema = z.object({
  email: z.string().trim().email().max(320),
  password: z.string().min(1).max(200),
});

/**
 * Throttles sign-in attempts per email. In-memory, so it resets on deploy and
 * is per-process — this is one small container, not a cluster, and the point is
 * to make an online password guess slow rather than to be a hard quota.
 */
const ATTEMPT_LIMIT = 8;
const ATTEMPT_WINDOW_MS = 10 * 60 * 1000;
const attempts = new Map<string, { count: number; firstAt: number }>();

function tooManyAttempts(key: string): boolean {
  const record = attempts.get(key);
  if (!record) return false;
  if (Date.now() - record.firstAt > ATTEMPT_WINDOW_MS) {
    attempts.delete(key);
    return false;
  }
  return record.count >= ATTEMPT_LIMIT;
}

function recordFailure(key: string) {
  const record = attempts.get(key);
  if (!record || Date.now() - record.firstAt > ATTEMPT_WINDOW_MS) {
    attempts.set(key, { count: 1, firstAt: Date.now() });
    return;
  }
  record.count += 1;
}

export type SignInResult = { ok: true } | { ok: false; error: string };

export async function signInAction(input: unknown): Promise<SignInResult> {
  const parsed = signInSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Enter a valid email and password." };
  }

  const key = parsed.data.email.trim().toLowerCase();
  if (tooManyAttempts(key)) {
    return { ok: false, error: "Too many attempts. Try again in a few minutes." };
  }

  let valid: boolean;
  try {
    valid = checkCredentials(parsed.data.email, parsed.data.password);
  } catch (err) {
    // Credentials aren't configured on this deployment at all.
    console.error("[auth]", err);
    return { ok: false, error: "Sign-in is not configured on this server." };
  }

  if (!valid) {
    recordFailure(key);
    // One message for both wrong-email and wrong-password, so neither can be
    // probed independently.
    return { ok: false, error: "Incorrect email or password." };
  }

  attempts.delete(key);
  await startSession(parsed.data.email);
  return { ok: true };
}

export async function signOutAction() {
  await endSession();
  return { ok: true as const };
}

/** Used by the sign-in page to bounce an already-authenticated visitor. */
export async function currentAdminEmail(): Promise<string | null> {
  return getSessionEmail();
}
