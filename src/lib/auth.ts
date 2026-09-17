import "server-only";
import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Admin auth, replacing Supabase Auth.
 *
 * There is exactly one admin — the credentials live in the environment rather
 * than in a table, which is what the old `user_roles` table plus the
 * "first user becomes admin" trigger were really expressing. The session is a
 * signed cookie; no server-side session store, so nothing to keep in sync.
 *
 * Everything here uses node:crypto, so no dependency was added for it.
 */

const COOKIE_NAME = "wh_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // a week
const SCRYPT_KEY_LENGTH = 64;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing environment variable ${name}. See .env.example — run \`npm run admin:password\` to generate the admin credentials.`,
    );
  }
  return value;
}

// ---------- password hashing ----------

/**
 * Produces the `ADMIN_PASSWORD_HASH` value. Used by scripts/set-admin-password.mjs.
 *
 * Fields are colon-separated, NOT the `$` that scrypt/PHC strings conventionally
 * use: Next loads .env through dotenv-expand, which reads `$...` as a variable
 * reference and silently truncates the value at the first one.
 */
export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const key = scryptSync(password, salt, SCRYPT_KEY_LENGTH);
  return `scrypt:${salt.toString("hex")}:${key.toString("hex")}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [scheme, saltHex, keyHex] = stored.split(":");

  if (scheme !== "scrypt" || !saltHex || !keyHex) {
    // Worth saying out loud: a malformed hash is indistinguishable from a wrong
    // password at the sign-in form, and the likeliest cause is an unescaped `$`
    // in the value (see hashPassword above) rather than a typo.
    console.error(
      "[auth] ADMIN_PASSWORD_HASH is malformed — expected scrypt:<salt-hex>:<key-hex>, got " +
        `${JSON.stringify(stored.slice(0, 16))}…. Regenerate it with \`npm run admin:password\`.`,
    );
    return false;
  }

  const expected = Buffer.from(keyHex, "hex");
  // Deriving at the stored length keeps timingSafeEqual from throwing on a
  // malformed hash instead of just reporting a mismatch.
  const actual = scryptSync(password, Buffer.from(saltHex, "hex"), expected.length);
  return timingSafeEqual(actual, expected);
}

// ---------- signed session token ----------

function sign(payload: string): string {
  return createHmac("sha256", requireEnv("AUTH_SECRET")).update(payload).digest("base64url");
}

function createSessionToken(email: string): string {
  const payload = Buffer.from(
    JSON.stringify({ sub: email, exp: Date.now() + SESSION_TTL_SECONDS * 1000 }),
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function readSessionToken(token: string | undefined): string | null {
  if (!token) return null;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = Buffer.from(sign(payload));
  const provided = Buffer.from(signature);
  if (expected.length !== provided.length || !timingSafeEqual(expected, provided)) return null;

  try {
    const claims = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
      sub?: string;
      exp?: number;
    };
    if (!claims.sub || typeof claims.exp !== "number" || claims.exp < Date.now()) return null;
    // A changed ADMIN_EMAIL invalidates outstanding sessions, which is what you
    // want when the admin account is handed over.
    if (claims.sub.toLowerCase() !== requireEnv("ADMIN_EMAIL").toLowerCase()) return null;
    return claims.sub;
  } catch {
    return null;
  }
}

// ---------- session cookie ----------

export async function startSession(email: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, createSessionToken(email), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function endSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

/** The signed-in admin's email, or null. Never throws — safe in a layout. */
export async function getSessionEmail(): Promise<string | null> {
  try {
    const store = await cookies();
    return readSessionToken(store.get(COOKIE_NAME)?.value);
  } catch {
    // Missing AUTH_SECRET / ADMIN_EMAIL: treat as signed out rather than
    // crashing the page that asked.
    return null;
  }
}

export async function isSignedIn(): Promise<boolean> {
  return (await getSessionEmail()) !== null;
}

/** Guard for Server Actions and route handlers that mutate data. */
export async function requireAdmin(): Promise<string> {
  const email = await getSessionEmail();
  if (!email) throw new Error("Unauthorized: sign in required");
  return email;
}

// ---------- credential check ----------

/**
 * Deliberately verifies the password even when the email is wrong, so a
 * response time can't be used to discover the admin address.
 */
export function checkCredentials(email: string, password: string): boolean {
  const expectedEmail = requireEnv("ADMIN_EMAIL");
  const expectedHash = requireEnv("ADMIN_PASSWORD_HASH");

  const emailMatches = email.trim().toLowerCase() === expectedEmail.trim().toLowerCase();
  const passwordMatches = verifyPassword(password, expectedHash);

  return emailMatches && passwordMatches;
}
