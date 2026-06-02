import nodemailer from "nodemailer";

export type SendMailArgs = {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  from?: string;
};

export function isResendMailerConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export function isGraphMailerConfigured(): boolean {
  return Boolean(
    process.env.M365_TENANT_ID &&
      process.env.M365_CLIENT_ID &&
      process.env.M365_CLIENT_SECRET &&
      process.env.M365_SENDER_EMAIL
  );
}

export function isSmtpMailerConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
  );
}

async function sendMailViaResend(args: SendMailArgs): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is required for Resend mail.");
  }

  const from = args.from || process.env.MAIL_FROM || "WhiteHawk Website <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [args.to],
      reply_to: args.replyTo,
      subject: args.subject,
      html: args.html,
      text: args.text,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Resend failed (HTTP ${res.status}): ${text || "<no body>"}`);
  }
}

async function getGraphAccessToken(): Promise<string> {
  const tenantId = process.env.M365_TENANT_ID;
  const clientId = process.env.M365_CLIENT_ID;
  const clientSecret = process.env.M365_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error("Microsoft Graph env vars missing.");
  }

  const tokenUrl = `https://login.microsoftonline.com/${encodeURIComponent(
    tenantId
  )}/oauth2/v2.0/token`;

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "client_credentials",
    scope: "https://graph.microsoft.com/.default",
  });

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const json = (await res.json()) as
    | { access_token: string }
    | { error?: string; error_description?: string };

  if (!res.ok || !("access_token" in json)) {
    const details = JSON.stringify(json);
    throw new Error(
      `Failed to fetch Graph access token (HTTP ${res.status}): ${details}`
    );
  }

  return json.access_token;
}

async function sendMailViaGraph(args: SendMailArgs): Promise<void> {
  const senderEmail = process.env.M365_SENDER_EMAIL;
  if (!senderEmail) {
    throw new Error("M365_SENDER_EMAIL is required for Graph mail.");
  }

  const token = await getGraphAccessToken();

  const url = `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
    senderEmail
  )}/sendMail`;

  const payload = {
    message: {
      subject: args.subject,
      body: {
        contentType: "HTML",
        content: args.html,
      },
      toRecipients: [
        {
          emailAddress: {
            address: args.to,
          },
        },
      ],
      ...(args.replyTo
        ? {
            replyTo: [
              {
                emailAddress: { address: args.replyTo },
              },
            ],
          }
        : null),
    },
    saveToSentItems: true,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Graph sendMail failed (HTTP ${res.status}): ${text || "<no body>"}`
    );
  }
}

async function sendMailViaSmtp(args: SendMailArgs): Promise<void> {
  const host = process.env.SMTP_HOST;
  const portRaw = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASS;

  if (!host || !portRaw || !user || !password) {
    throw new Error("SMTP env vars missing.");
  }

  const from =
    args.from ||
    process.env.SMTP_FROM ||
    process.env.MAIL_FROM ||
    "WhiteHawk Website <info@whiteguard.co.uk>";

  const transporter = nodemailer.createTransport({
    host,
    port: Number(portRaw),
    secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
    auth: {
      user,
      pass: password,
    },
  });

  await transporter.sendMail({
    from,
    to: args.to,
    subject: args.subject,
    html: args.html,
    text: args.text,
    replyTo: args.replyTo,
  });
}

export async function sendMail(args: SendMailArgs): Promise<void> {
  if (isResendMailerConfigured()) {
    return sendMailViaResend(args);
  }

  if (isGraphMailerConfigured()) {
    return sendMailViaGraph(args);
  }

  if (isSmtpMailerConfigured()) {
    return sendMailViaSmtp(args);
  }

  throw new Error("MAILER_NO_PROVIDER");
}
