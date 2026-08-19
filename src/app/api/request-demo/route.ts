import { NextResponse } from "next/server";
import { verifyCaptcha } from "@/lib/captcha";
import { countryLabelFor, resolveService } from "@/lib/demo-services";
import { renderDemoEmail, renderDemoEmailText } from "@/lib/email-template";
import { sendMail } from "@/lib/mailer";

// node:crypto (captcha) and nodemailer both require the Node runtime.
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
  const mainType = (body.service?.mainType ?? "").trim();
  const subType = (body.service?.subType ?? "").trim();
  const subSubType = (body.service?.subSubType ?? "").trim();
  const serviceOther = (body.service?.other ?? "").trim();
  const captchaToken = body.captcha?.token ?? "";
  const captchaAnswer = body.captcha?.answer;

  if (!fullName || !email || !company || !country) {
    return bad("All fields are required.");
  }
  if (fullName.length > 120 || email.length > 320 || company.length > 200) {
    return bad("One or more fields are too long.");
  }
  if (serviceOther.length > 500) {
    return bad("Other services must be 500 characters or fewer.");
  }
  if (!EMAIL_RE.test(email)) {
    return bad("Please enter a valid email address.");
  }

  const countryLabel = countryLabelFor(country);
  if (!countryLabel) {
    return bad("Please choose a country from the list.");
  }

  // Resolve slugs to labels server-side so the email never carries
  // client-supplied free text in the service fields.
  const resolved = resolveService(mainType, subType, subSubType);
  if (!resolved.ok) {
    return bad(resolved.error);
  }

  if (!captchaToken || (typeof captchaAnswer !== "string" && typeof captchaAnswer !== "number")) {
    return bad("Please solve the captcha.");
  }
  const captchaResult = verifyCaptcha(captchaToken, captchaAnswer);
  if (!captchaResult.ok) {
    return bad(captchaResult.reason);
  }

  const recipient = process.env.DEMO_RECIPIENT_EMAIL || "ali.elsawy@whiteguard.co.uk";

  const sourceUrl = req.headers.get("referer") ?? undefined;
  const submittedAt = new Date();

  const fields = {
    fullName,
    email,
    company,
    country: countryLabel,
    serviceMain: resolved.service.mainLabel,
    serviceSub: resolved.service.subLabel,
    serviceSubSub: resolved.service.subSubLabel,
    serviceOther,
    submittedAt,
    sourceUrl,
  };

  try {
    await sendMail({
      to: recipient,
      // Strip newlines so a crafted company name can't inject headers.
      subject: `New Demo Request — ${company.replace(/[\r\n]+/g, " ")}`,
      html: renderDemoEmail(fields),
      text: renderDemoEmailText(fields),
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
