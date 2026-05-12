/**
 * Image-based text captcha (Edge-runtime compatible).
 *
 * - Uses Web Crypto (`crypto.subtle`) and `crypto.getRandomValues` so the
 *   module runs unchanged on Cloudflare Workers / Vercel Edge / `runtime: "edge"`.
 * - AES-256-GCM encrypts `{ answer, issuedAt, expiry }` with a key derived
 *   from CAPTCHA_SECRET → SHA-256.
 * - Both `issueCaptcha` and `verifyCaptcha` are async because Web Crypto is.
 */

const CAPTCHA_SECRET =
  process.env.CAPTCHA_SECRET ?? "dev-only-default-change-me";
const CAPTCHA_TTL_MS = 5 * 60 * 1000; // 5 minutes
const MIN_SOLVE_MS = 500;

/* ----------------------------- utilities ------------------------------ */

const enc = new TextEncoder();
const dec = new TextDecoder();

function toBase64Url(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i += 1) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(s: string): Uint8Array {
  const pad = s.length % 4 === 2 ? "==" : s.length % 4 === 3 ? "=" : "";
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
  return out;
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a[i] ^ b[i];
  return diff === 0;
}

/** Uniform random integer in [min, max). Uses rejection sampling. */
function randomIntInRange(min: number, max: number): number {
  const range = max - min;
  if (range <= 0) return min;
  const limit = Math.floor(0xffffffff / range) * range;
  const buf = new Uint32Array(1);
  // Re-roll until we hit the bias-free zone.
  // eslint-disable-next-line no-constant-condition
  while (true) {
    crypto.getRandomValues(buf);
    if (buf[0] < limit) return min + (buf[0] % range);
  }
}

/* ----------------------- AES-GCM key (cached) ------------------------- */

let cachedKey: Promise<CryptoKey> | null = null;
function getKey(): Promise<CryptoKey> {
  if (cachedKey) return cachedKey;
  cachedKey = (async () => {
    const raw = await crypto.subtle.digest("SHA-256", enc.encode(CAPTCHA_SECRET));
    return crypto.subtle.importKey("raw", raw, "AES-GCM", false, [
      "encrypt",
      "decrypt",
    ]);
  })();
  return cachedKey;
}

/* ----------------------- payload encrypt/decrypt ---------------------- */

type TokenPayload = {
  a: string; // answer
  i: number; // issuedAt
  e: number; // expiry
};

async function encryptPayload(payload: TokenPayload): Promise<string> {
  const key = await getKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const plaintext = enc.encode(JSON.stringify(payload));
  const ctTag = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plaintext)
  );
  const combined = new Uint8Array(iv.length + ctTag.length);
  combined.set(iv, 0);
  combined.set(ctTag, iv.length);
  return toBase64Url(combined);
}

async function decryptPayload(token: string): Promise<TokenPayload | null> {
  let raw: Uint8Array;
  try {
    raw = fromBase64Url(token);
  } catch {
    return null;
  }
  // 12 byte IV + 16 byte tag + at least 1 byte ciphertext
  if (raw.length < 12 + 16 + 1) return null;
  // Copy into fresh ArrayBuffer-backed Uint8Arrays. TS 5.7+ requires
  // `Uint8Array<ArrayBuffer>` (not the generic `Uint8Array<ArrayBufferLike>`)
  // for `crypto.subtle.encrypt/decrypt`'s `BufferSource` parameter, and
  // `subarray()` returns the looser generic type.
  const iv = new Uint8Array(raw.subarray(0, 12));
  const ctTag = new Uint8Array(raw.subarray(12));
  try {
    const key = await getKey();
    const plain = new Uint8Array(
      await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ctTag)
    );
    const parsed = JSON.parse(dec.decode(plain)) as TokenPayload;
    if (
      !parsed ||
      typeof parsed.a !== "string" ||
      typeof parsed.i !== "number" ||
      typeof parsed.e !== "number"
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/* ------------------------------ code gen ------------------------------ */

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomCode(len = 6): string {
  let out = "";
  for (let i = 0; i < len; i += 1) {
    out += ALPHABET[randomIntInRange(0, ALPHABET.length)];
  }
  return out;
}

/* ------------------------ SVG rendering (sync) ------------------------ */

function svgDataUrlForCode(code: string): string {
  const width = 240;
  const height = 64;
  // Visual jitter is non-security; Math.random is fine here.
  const ri = (min: number, max: number) =>
    Math.floor(min + Math.random() * (max - min));
  const turbulenceSeed = ri(0, 1000);

  const lines = Array.from({ length: 6 }, () => {
    const x1 = ri(0, width);
    const y1 = ri(0, height);
    const x2 = ri(0, width);
    const y2 = ri(0, height);
    const opacity = (ri(10, 28) / 100).toFixed(2);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#005283" stroke-opacity="${opacity}" stroke-width="2" />`;
  }).join("");

  const chars = code
    .split("")
    .map((ch, i) => {
      const x = 24 + i * 34 + ri(-2, 3);
      const y = 42 + ri(-4, 5);
      const rot = ri(-18, 19);
      const skew = ri(-10, 11);
      const letterSpacing = ri(-1, 2);
      return `<text x="${x}" y="${y}" fill="#002439" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" letter-spacing="${letterSpacing}" transform="rotate(${rot} ${x} ${y}) skewX(${skew})">${ch}</text>`;
    })
    .join("");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e7f6ff" />
      <stop offset="1" stop-color="#ffffff" />
    </linearGradient>
    <filter id="n" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="${turbulenceSeed}"/>
      <feDisplacementMap in="SourceGraphic" scale="2" />
    </filter>
  </defs>
  <rect x="0" y="0" width="100%" height="100%" rx="12" fill="url(#bg)" />
  ${lines}
  <g filter="url(#n)">
    ${chars}
  </g>
</svg>`;

  // base64 encode without Buffer
  const utf8 = enc.encode(svg);
  let bin = "";
  for (let i = 0; i < utf8.length; i += 1) bin += String.fromCharCode(utf8[i]);
  return `data:image/svg+xml;base64,${btoa(bin)}`;
}

/* ------------------------------- public API --------------------------- */

export type CaptchaIssue = {
  token: string;
  image: string;
};

export async function issueCaptcha(): Promise<CaptchaIssue> {
  const issuedAt = Date.now();
  const expiry = issuedAt + CAPTCHA_TTL_MS;
  const answer = randomCode(6);
  const token = await encryptPayload({ a: answer, i: issuedAt, e: expiry });
  const image = svgDataUrlForCode(answer);
  return { token, image };
}

export type VerifyResult = { ok: true } | { ok: false; reason: string };

export async function verifyCaptcha(
  token: unknown,
  answer: unknown
): Promise<VerifyResult> {
  if (typeof token !== "string" || token.length === 0) {
    return { ok: false, reason: "Missing captcha token." };
  }
  const submittedRaw =
    typeof answer === "string"
      ? answer.trim()
      : typeof answer === "number"
      ? String(answer)
      : "";
  const submitted = submittedRaw.toUpperCase();
  if (!/^[A-Z0-9]{4,10}$/.test(submitted)) {
    return { ok: false, reason: "Please type the text shown in the image." };
  }

  const payload = await decryptPayload(token);
  if (!payload) {
    return { ok: false, reason: "Malformed captcha token." };
  }

  const expectedAnswer = payload.a.toUpperCase();
  const now = Date.now();
  if (now > payload.e) {
    return {
      ok: false,
      reason: "Captcha expired. Please refresh and try again.",
    };
  }
  if (now - payload.i < MIN_SOLVE_MS) {
    return {
      ok: false,
      reason: "Captcha solved suspiciously fast. Please try again.",
    };
  }

  if (!timingSafeEqual(enc.encode(submitted), enc.encode(expectedAnswer))) {
    return { ok: false, reason: "Wrong text. Please try again." };
  }

  return { ok: true };
}
