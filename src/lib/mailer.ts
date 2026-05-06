export type SendMailArgs = {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

export function isGraphMailerConfigured(): boolean {
  return Boolean(
    process.env.M365_TENANT_ID &&
      process.env.M365_CLIENT_ID &&
      process.env.M365_CLIENT_SECRET &&
      process.env.M365_SENDER_EMAIL
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

export async function sendMail(args: SendMailArgs): Promise<void> {
  if (isGraphMailerConfigured()) {
    return sendMailViaGraph(args);
  }

  // Default to SMTP (handled by the caller) when Graph config is absent.
  throw new Error("MAILER_NO_PROVIDER");
}
