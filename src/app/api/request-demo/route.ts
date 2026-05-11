import { NextResponse } from "next/server";
import { verifyCaptcha } from "@/lib/captcha";
import { renderDemoEmail, renderDemoEmailText } from "@/lib/email-template";

// Runs on Cloudflare Workers / Vercel Edge. Uses Resend's HTTP API instead
// of SMTP, so it doesn't rely on raw TCP sockets (which Edge can't open).
export const runtime = "edge";
export const dynamic = "force-dynamic";

type RequestDemoBody = {
  fullName?: string;
  email?: string;
  company?: string;
  country?: string;
  service?: {
    mainType?: string;
    subType?: string;
    subSubType?: string;
    other?: string;
  };
  captcha?: { token?: string; answer?: string | number };
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function bad(message: string, status = 400) {
  return NextResponse.json({ ok: false, error: message }, { status });
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
  const serviceMain = (body.service?.mainType ?? "").trim();
  const serviceSub = (body.service?.subType ?? "").trim();
  const serviceSubSub = (body.service?.subSubType ?? "").trim();
  const serviceOther = (body.service?.other ?? "").trim();
  const captchaToken = body.captcha?.token ?? "";
  const captchaAnswer = body.captcha?.answer;

  if (!fullName || !email || !company || !country) {
    return bad("All fields are required.");
  }
  if (!serviceMain || !serviceSub) {
    return bad("Please choose a service type and sub-type.");
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
  const captchaResult = await verifyCaptcha(captchaToken, captchaAnswer);
  if (!captchaResult.ok) {
    return bad(captchaResult.reason);
  }

  // --- Resend config -----------------------------------------------------
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[request-demo] RESEND_API_KEY missing.");
    return bad("Mailer is not configured. Please contact the site admin.", 500);
  }

  // Sender. While testing, Resend's sandbox sender `onboarding@resend.dev`
  // works without verifying a domain (and can only deliver to your own
  // verified email). For production, verify your domain in Resend and set
  // MAIL_FROM to "WhiteHawk <demo@your-verified-domain>".
  const from =
    process.env.MAIL_FROM ||
    "WhiteHawk Website <onboarding@resend.dev>";
  const recipient =
    process.env.DEMO_RECIPIENT_EMAIL || "yara.hossam@whiteguard.co.uk";

  const sourceUrl = req.headers.get("referer") ?? undefined;
  const submittedAt = new Date();

  const html = renderDemoEmail({
    fullName,
    email,
    company,
    country,
    serviceMain,
    serviceSub,
    serviceSubSub,
    serviceOther,
    submittedAt,
    sourceUrl,
  });
  const text = renderDemoEmailText({
    fullName,
    email,
    company,
    country,
    serviceMain,
    serviceSub,
    serviceSubSub,
    serviceOther,
    submittedAt,
    sourceUrl,
  });

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: email,
        subject: `New Demo Request — ${company}`,
        html,
        text,
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error(
        "[request-demo] Resend failed:",
        resp.status,
        errText.slice(0, 500)
      );
      return bad("Failed to send the email. Please try again later.", 502);
    }
  } catch (err) {
    console.error("[request-demo] Resend network error:", err);
    return bad("Failed to send the email. Please try again later.", 502);
  }

  return NextResponse.json({ ok: true });
}
