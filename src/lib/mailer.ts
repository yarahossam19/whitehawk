import nodemailer from "nodemailer";

/**
 * Outbound mail with two interchangeable providers.
 *
 * Microsoft Graph (OAuth client-credentials) is preferred when configured,
 * because M365 tenants disable SMTP AUTH by default. SMTP is the fallback for
 * when only a mailbox username + password is available.
 */

export type SendMailArgs = {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  from?: string;
};

const DEFAULT_FROM = "WhiteHawk Website <info@whiteguard.co.uk>";

function resolveFrom(args: SendMailArgs): string {
  return args.from || process.env.MAIL_FROM || process.env.SMTP_FROM || DEFAULT_FROM;
}

export function isGraphMailerConfigured(): boolean {
  return Boolean(
    process.env.M365_TENANT_ID &&
      process.env.M365_CLIENT_ID &&
      process.env.M365_CLIENT_SECRET &&
      process.env.M365_SENDER_EMAIL,
  );
}

export function isSmtpMailerConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS,
  );
}

async function getGraphAccessToken(): Promise<string> {
  const tenantId = process.env.M365_TENANT_ID;
  const clientId = process.env.M365_CLIENT_ID;
  const clientSecret = process.env.M365_CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    throw new Error("Microsoft Graph env vars missing.");
  }

  const tokenUrl = `https://login.microsoftonline.com/${encodeURIComponent(
    tenantId,
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
    throw new Error(`Failed to fetch Graph access token (HTTP ${res.status}): ${details}`);
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
    senderEmail,
  )}/sendMail`;

  const payload = {
    message: {
      subject: args.subject,
      body: {
        contentType: "HTML",
        content: args.html,
      },
      from: {
        emailAddress: { address: senderEmail },
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
    throw new Error(`Graph sendMail failed (HTTP ${res.status}): ${text || "<no body>"}`);
  }
}

async function sendMailViaSmtp(args: SendMailArgs): Promise<void> {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass || !Number.isFinite(port)) {
    throw new Error("SMTP env vars missing or invalid.");
  }

  const transport = nodemailer.createTransport({
    host,
    port,
    // Port 465 is implicit TLS; 587 uses STARTTLS, which nodemailer upgrades to
    // automatically when `secure` is false.
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });

  await transport.sendMail({
    from: resolveFrom(args),
    to: args.to,
    subject: args.subject,
    html: args.html,
    ...(args.text ? { text: args.text } : null),
    ...(args.replyTo ? { replyTo: args.replyTo } : null),
  });
}

export async function sendMail(args: SendMailArgs): Promise<void> {
  if (isGraphMailerConfigured()) {
    return sendMailViaGraph(args);
  }

  if (isSmtpMailerConfigured()) {
    return sendMailViaSmtp(args);
  }

  throw new Error("MAILER_NO_PROVIDER");
}
