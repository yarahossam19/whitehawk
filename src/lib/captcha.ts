import crypto from "node:crypto";

/**
 * Image-based text captcha.
 *
 * - Server generates a short random code (e.g. 6 chars) and renders it into
 *   an SVG (with mild noise/rotation) returned as a data URL.
 * - The code + timestamps are encrypted into the token (AES-256-GCM) using
 *   CAPTCHA_SECRET-derived key, so clients can't decode the answer.
 * - Verification: token decrypts, not expired, solve wasn't faster than
 *   MIN_SOLVE_MS, and submitted text matches (case-insensitive).
 */

const CAPTCHA_SECRET =
  process.env.CAPTCHA_SECRET ?? "dev-only-default-change-me";
const CAPTCHA_TTL_MS = 5 * 60 * 1000; // 5 minutes
const MIN_SOLVE_MS = 500;

function keyBytes(): Buffer {
  // 32 bytes key for AES-256-GCM derived from secret.
  return crypto.createHash("sha256").update(CAPTCHA_SECRET).digest();
}

type TokenPayload = {
  a: string; // answer
  i: number; // issuedAt
  e: number; // expiry
};

function encryptPayload(payload: TokenPayload): string {
  const iv = crypto.randomBytes(12); // recommended size for GCM
  const cipher = crypto.createCipheriv("aes-256-gcm", keyBytes(), iv);
  const plaintext = Buffer.from(JSON.stringify(payload), "utf8");
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  // token = base64url(iv || ciphertext || tag)
  return Buffer.concat([iv, ciphertext, tag]).toString("base64url");
}

function decryptPayload(token: string): TokenPayload | null {
  let raw: Buffer;
  try {
    raw = Buffer.from(token, "base64url");
  } catch {
    return null;
  }
  if (raw.length < 12 + 16 + 1) return null;
  const iv = raw.subarray(0, 12);
  const tag = raw.subarray(raw.length - 16);
  const ciphertext = raw.subarray(12, raw.length - 16);
  try {
    const decipher = crypto.createDecipheriv("aes-256-gcm", keyBytes(), iv);
    decipher.setAuthTag(tag);
    const plaintext = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ]);
    const parsed = JSON.parse(plaintext.toString("utf8")) as TokenPayload;
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

function randomCode(len = 6): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let idx = 0; idx < len; idx += 1) {
    out += alphabet[crypto.randomInt(0, alphabet.length)];
  }
  return out;
}

function svgDataUrlForCode(code: string): string {
  const width = 240;
  const height = 64;

  const rand = () => crypto.randomInt(0, 1000);
  const lines = Array.from({ length: 6 }, () => {
    const x1 = crypto.randomInt(0, width);
    const y1 = crypto.randomInt(0, height);
    const x2 = crypto.randomInt(0, width);
    const y2 = crypto.randomInt(0, height);
    const opacity = (crypto.randomInt(10, 28) / 100).toFixed(2);
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#005283" stroke-opacity="${opacity}" stroke-width="2" />`;
  }).join("");

  const chars = code.split("").map((ch, i) => {
    const x = 24 + i * 34 + crypto.randomInt(-2, 3);
    const y = 42 + crypto.randomInt(-4, 5);
    const rot = crypto.randomInt(-18, 19);
    const skew = crypto.randomInt(-10, 11);
    const letterSpacing = crypto.randomInt(-1, 2);
    return `<text x="${x}" y="${y}" fill="#002439" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" letter-spacing="${letterSpacing}" transform="rotate(${rot} ${x} ${y}) skewX(${skew})">${ch}</text>`;
  }).join("");

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e7f6ff" />
      <stop offset="1" stop-color="#ffffff" />
    </linearGradient>
    <filter id="n" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="${rand()}"/>
      <feDisplacementMap in="SourceGraphic" scale="2" />
    </filter>
  </defs>
  <rect x="0" y="0" width="100%" height="100%" rx="12" fill="url(#bg)" />
  ${lines}
  <g filter="url(#n)">
    ${chars}
  </g>
</svg>`;

  const b64 = Buffer.from(svg, "utf8").toString("base64");
  return `data:image/svg+xml;base64,${b64}`;
}

export type CaptchaIssue = {
  token: string;
  image: string;
};

export function issueCaptcha(): CaptchaIssue {
  const issuedAt = Date.now();
  const expiry = issuedAt + CAPTCHA_TTL_MS;
  const answer = randomCode(6);
  const token = encryptPayload({ a: answer, i: issuedAt, e: expiry });
  const image = svgDataUrlForCode(answer);
  return { token, image };
}

export type VerifyResult = { ok: true } | { ok: false; reason: string };

export function verifyCaptcha(
  token: unknown,
  answer: unknown
): VerifyResult {
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

  const payload = decryptPayload(token);
  if (!payload) {
    return { ok: false, reason: "Malformed captcha token." };
  }

  const expectedAnswer = payload.a.toUpperCase();
  const issuedAt = payload.i;
  const expiry = payload.e;

  const now = Date.now();
  if (now > expiry) {
    return {
      ok: false,
      reason: "Captcha expired. Please refresh and try again.",
    };
  }
  if (now - issuedAt < MIN_SOLVE_MS) {
    return {
      ok: false,
      reason: "Captcha solved suspiciously fast. Please try again.",
    };
  }

  const a = Buffer.from(submitted);
  const b = Buffer.from(expectedAnswer);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { ok: false, reason: "Wrong text. Please try again." };
  }

  return { ok: true };
}
