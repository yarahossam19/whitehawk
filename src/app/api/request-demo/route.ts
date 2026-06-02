import { NextResponse } from "next/server";
import { verifyCaptcha } from "@/lib/captcha";
import { renderDemoEmail, renderDemoEmailText } from "@/lib/email-template";
import { sendMail } from "@/lib/mailer";

export const runtime = "nodejs";
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
    await sendMail({
      to: recipient,
      subject: `New Demo Request — ${company}`,
      html,
      text,
      replyTo: email,
      from:
        process.env.MAIL_FROM ||
        process.env.SMTP_FROM ||
        "WhiteHawk Website <info@whiteguard.co.uk>",
    });
  } catch (err) {
    console.error("[request-demo] Mail send failed:", err);
    return bad("Failed to send the email. Please try again later.", 502);
  }

  return NextResponse.json({ ok: true });
}
