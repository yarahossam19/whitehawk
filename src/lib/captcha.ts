import crypto from "node:crypto";

/**
 * Spelled-out arithmetic captcha.
 *
 * - Server picks random `a`, `b` and an operator (+, -, ×) such that the
 *   answer is a non-negative integer. Numbers are spelled out in English so
 *   trivial form-spam bots that just regex `\d+ [+\-*] \d+` from the markup
 *   can't lift the answer.
 * - HMAC-SHA256-signs `<answer>.<issuedAt>.<expiry>` with CAPTCHA_SECRET.
 *   The answer never appears in the response payload.
 * - Verification: signature valid, not expired, drag/answer wasn't faster
 *   than 500ms, and `parseInt(submitted) === expectedAnswer`.
 */

const CAPTCHA_SECRET =
  process.env.CAPTCHA_SECRET ?? "dev-only-default-change-me";
const CAPTCHA_TTL_MS = 5 * 60 * 1000; // 5 minutes
const MIN_SOLVE_MS = 500;

const NUMBER_WORDS = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
];

type Op = {
  word: string;
  fn: (a: number, b: number) => number;
};

const OPS: Op[] = [
  { word: "plus", fn: (a, b) => a + b },
  { word: "minus", fn: (a, b) => a - b },
  { word: "times", fn: (a, b) => a * b },
];

function sign(payload: string): string {
  return crypto
    .createHmac("sha256", CAPTCHA_SECRET)
    .update(payload)
    .digest("base64url");
}

function pickQuestion(): { question: string; answer: number } {
  const op = OPS[crypto.randomInt(0, OPS.length)];
  let a: number;
  let b: number;
  if (op.word === "times") {
    // Keep products small (2..9 × 2..9 = max 81).
    a = crypto.randomInt(2, 10);
    b = crypto.randomInt(2, 10);
  } else if (op.word === "minus") {
    // Ensure non-negative result; pick a >= b.
    a = crypto.randomInt(2, 13);
    b = crypto.randomInt(1, a);
  } else {
    a = crypto.randomInt(2, 13);
    b = crypto.randomInt(2, 13);
  }
  const answer = op.fn(a, b);
  const question = `What is ${NUMBER_WORDS[a]} ${op.word} ${NUMBER_WORDS[b]}?`;
  return { question, answer };
}

export type CaptchaIssue = {
  token: string;
  question: string;
};

export function issueCaptcha(): CaptchaIssue {
  const { question, answer } = pickQuestion();
  const issuedAt = Date.now();
  const expiry = issuedAt + CAPTCHA_TTL_MS;
  const payload = `${answer}.${issuedAt}.${expiry}`;
  const sig = sign(payload);
  const token = `${Buffer.from(payload).toString("base64url")}.${sig}`;
  return { token, question };
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
    typeof answer === "number"
      ? String(answer)
      : typeof answer === "string"
      ? answer.trim()
      : "";
  if (!/^-?\d+$/.test(submittedRaw)) {
    return { ok: false, reason: "Please enter the answer as a number." };
  }
  const submitted = Number.parseInt(submittedRaw, 10);

  const parts = token.split(".");
  if (parts.length !== 2) {
    return { ok: false, reason: "Malformed captcha token." };
  }
  const [b64, sig] = parts;

  let payload: string;
  try {
    payload = Buffer.from(b64, "base64url").toString();
  } catch {
    return { ok: false, reason: "Malformed captcha token." };
  }

  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { ok: false, reason: "Captcha signature invalid." };
  }

  const [ansStr, issuedStr, expStr] = payload.split(".");
  const expectedAnswer = Number.parseInt(ansStr ?? "", 10);
  const issuedAt = Number.parseInt(issuedStr ?? "", 10);
  const expiry = Number.parseInt(expStr ?? "", 10);
  if (
    !Number.isFinite(expectedAnswer) ||
    !Number.isFinite(issuedAt) ||
    !Number.isFinite(expiry)
  ) {
    return { ok: false, reason: "Malformed captcha token." };
  }

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

  if (submitted !== expectedAnswer) {
    return { ok: false, reason: "Wrong answer. Please try again." };
  }

  return { ok: true };
}
