import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { verifyCaptcha } from "@/lib/captcha";
import { renderDemoEmail, renderDemoEmailText } from "@/lib/email-template";
import { isGraphMailerConfigured, sendMail } from "@/lib/mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RequestDemoBody = {
  fullName?: string;
  email?: string;
  company?: string;
  country?: string;
  captcha?: { token?: string; answer?: string | number };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function bad(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

function isM365SmtpAuthDisabled(err: unknown): boolean {
  const anyErr = err as
    | {
        code?: unknown;
        responseCode?: unknown;
        response?: unknown;
        message?: unknown;
      }
    | undefined;

  const code = typeof anyErr?.code === "string" ? anyErr.code : "";
  const responseCode =
    typeof anyErr?.responseCode === "number" ? anyErr.responseCode : undefined;
  const response = typeof anyErr?.response === "string" ? anyErr.response : "";
  const message = typeof anyErr?.message === "string" ? anyErr.message : "";

  if (code !== "EAUTH" || responseCode !== 535) return false;
  const haystack = `${response}\n${message}`;
  return haystack.includes("5.7.139") &&
    haystack.includes("SmtpClientAuthentication is disabled");
}

export async function POST(req: Request) {
  let body: RequestDemoBody;
  try {
    body = (await req.json()) as RequestDemoBody;
  } catch {
    return bad("Invalid JSON body.");
  }

  const fullName = (body.fullName ?? "").trim();
  const email = (body.email ?? "").trim();
  const company = (body.company ?? "").trim();
  const country = (body.country ?? "").trim();
  const captchaToken = body.captcha?.token ?? "";
  const captchaAnswer = body.captcha?.answer;

  if (!fullName || !email || !company || !country) {
    return bad("All fields are required.");
  }
  if (!EMAIL_RE.test(email)) {
    return bad("Please enter a valid email address.");
  }
  if (
    !captchaToken ||
    (typeof captchaAnswer !== "string" && typeof captchaAnswer !== "number")
  ) {
    return bad("Please solve the captcha.");
  }
  const captchaResult = verifyCaptcha(captchaToken, captchaAnswer);
  if (!captchaResult.ok) {
    return bad(captchaResult.reason);
  }

  const recipient =
    process.env.DEMO_RECIPIENT_EMAIL || "yara.hossam@whiteguard.co.uk";

  const graphConfigured = isGraphMailerConfigured();

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  const smtpConfigured = Boolean(host && user && pass);

  if (!graphConfigured && !smtpConfigured) {
    const missing: string[] = [];
    if (!process.env.SMTP_HOST) missing.push("SMTP_HOST");
    if (!process.env.SMTP_USER) missing.push("SMTP_USER");
    if (!process.env.SMTP_PASS) missing.push("SMTP_PASS");
    console.error(
      "[request-demo] Mailer not configured (no Graph config; missing SMTP env vars):",
      missing
    );
    return bad("Mailer is not configured. Please contact the site admin.", 500);
  }

  const transporter = smtpConfigured
    ? nodemailer.createTransport({
        host: host as string,
        port: Number.parseInt(process.env.SMTP_PORT || "587", 10),
        secure: process.env.SMTP_SECURE === "true",
        auth: { user: user as string, pass: pass as string },
      })
    : null;

  const sourceUrl = req.headers.get("referer") ?? undefined;
  const submittedAt = new Date();

  const html = renderDemoEmail({
    fullName,
    email,
    company,
    country,
    submittedAt,
    sourceUrl,
  });
  const text = renderDemoEmailText({
    fullName,
    email,
    company,
    country,
    submittedAt,
    sourceUrl,
  });

  try {
    // Prefer Microsoft Graph when configured (works even if M365 SMTP AUTH is disabled).
    // If Graph isn't configured, fall back to SMTP via Nodemailer.
    try {
      if (graphConfigured) {
        await sendMail({
          to: recipient,
          replyTo: email,
          subject: `New Demo Request — ${company}`,
          html,
          text,
        });
        return NextResponse.json({ ok: true });
      }
      throw new Error("MAILER_NO_PROVIDER");
    } catch (graphErr) {
      const msg = graphErr instanceof Error ? graphErr.message : String(graphErr);
      if (msg !== "MAILER_NO_PROVIDER") {
        console.error("[request-demo] Graph sendMail failed:", graphErr);
      }

      if (!transporter) {
        throw graphErr;
      }

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"WhiteHawk Website" <${user as string}>`,
        to: recipient,
        replyTo: email,
        subject: `New Demo Request — ${company}`,
        html,
        text,
      });
    }
  } catch (err) {
    if (isM365SmtpAuthDisabled(err)) {
      console.error(
        "[request-demo] sendMail failed: Microsoft 365 SMTP AUTH is disabled for this tenant/mailbox.",
        err
      );
      return bad(
        "Email is temporarily unavailable (SMTP authentication is disabled). Please contact the site admin.",
        500
      );
    }

    console.error("[request-demo] sendMail failed:", err);
    return bad("Failed to send the email. Please try again later.", 502);
  }

  return NextResponse.json({ ok: true });
}
