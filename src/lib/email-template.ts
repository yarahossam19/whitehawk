/**
 * HTML email template for the demo-request notification.
 *
 * Uses table-based layout and inline styles for max compatibility across
 * mail clients (Outlook, Gmail, Apple Mail, etc.).
 *
 * Brand palette taken from globals.scss:
 *   --primary-900: #002439  (deep navy)
 *   --primary-700: #005283  (mid blue)
 *   --primary-light: #abe0ff
 *   --ui-colored-bg: #e7f6ff
 *   --text-secondary: #52697a
 */

export type DemoEmailFields = {
  fullName: string;
  email: string;
  company: string;
  country: string;
  submittedAt?: Date;
  sourceUrl?: string;
};

const escapeHtml = (s: unknown): string =>
  String(s ?? "").replace(/[&<>"']/g, (ch) => {
    switch (ch) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return ch;
    }
  });

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:14px 24px;border-bottom:1px solid #e7f6ff;border-bottom-color:var(--wh-border,#e7f6ff);">
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:#52697a;margin-bottom:4px;">${escapeHtml(
          label
        )}</div>
        <div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:600;color:#002439;color:var(--wh-text,#002439);line-height:1.4;word-break:break-word;">${escapeHtml(
          value
        )}</div>
      </td>
    </tr>
  `;
}

export function renderDemoEmail(f: DemoEmailFields): string {
  const submittedAt = (f.submittedAt ?? new Date()).toUTCString();
  const sourceUrl = f.sourceUrl ?? "";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title>New Demo Request — WhiteHawk</title>
    <style>
      :root {
        color-scheme: light;
        --wh-bg: #eaf4fb;
        --wh-card-bg: #ffffff;
        --wh-text: #002439;
        --wh-muted: #52697a;
        --wh-border: #e7f6ff;
        --wh-accent: #005283;
        --wh-accent-soft: #abe0ff;
        --wh-cta-bg: #002439;
        --wh-cta-text: #ffffff;
        --wh-footer-bg: #e7f6ff;
        --wh-shadow: 0 8px 24px rgba(0, 36, 57, 0.08);
        --wh-cta-shadow: inset 0 0 10px rgba(0, 82, 131, 0.3), inset 0 0 20px rgba(0, 82, 131, 0.2);
      }

      @media (prefers-color-scheme: dark) {
        :root {
          color-scheme: dark;
          --wh-bg: #002439;
          --wh-card-bg: #002439;
          --wh-text: #ffffff;
          --wh-muted: #abe0ff;
          --wh-border: rgba(171, 224, 255, 0.25);
          --wh-footer-bg: rgba(0, 82, 131, 0.18);
          --wh-shadow: none;
          --wh-cta-bg: #005283;
          --wh-cta-text: #ffffff;
          --wh-cta-shadow: none;
        }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:#eaf4fb;background-color:var(--wh-bg,#eaf4fb);font-family:Arial,Helvetica,sans-serif;color:#002439;color:var(--wh-text,#002439);">
    <!-- preheader -->
    <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#eaf4fb;color:var(--wh-bg,#eaf4fb);">
      ${escapeHtml(f.fullName)} from ${escapeHtml(
    f.company
  )} requested a demo.
    </div>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eaf4fb;background-color:var(--wh-bg,#eaf4fb);padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;background-color:var(--wh-card-bg,#ffffff);border-radius:16px;overflow:hidden;box-shadow:0 8px 24px rgba(0,36,57,0.08);box-shadow:var(--wh-shadow,0 8px 24px rgba(0,36,57,0.08));">

            <!-- header -->
            <tr>
              <td style="background:#002439;background:linear-gradient(135deg,#002439 0%,#005283 100%);padding:32px 32px 28px;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#abe0ff;color:var(--wh-accent-soft,#abe0ff);margin-bottom:8px;">WhiteHawk</div>
                <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:26px;line-height:1.2;font-weight:700;color:#ffffff; ">New Demo Request</h1>
                <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#abe0ff;color:var(--wh-accent-soft,#abe0ff);">Someone just requested a demo from the website. Details below.</p>
              </td>
            </tr>

            <!-- field rows -->
            <tr>
              <td style="padding:8px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  ${row("Full Name", f.fullName)}
                  ${row("Business Email", f.email)}
                  ${row("Company", f.company)}
                  ${row("Country", f.country)}
                </table>
              </td>
            </tr>

            <!-- CTA -->
            <tr>
              <td align="left" style="padding:8px 32px 28px;">
                <a href="mailto:${escapeHtml(
                  f.email
                )}" style="display:inline-block;background:#002439;background-color:var(--wh-cta-bg,#002439);color:#ffffff;color:var(--wh-cta-text,#ffffff);text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:600;line-height:1;padding:14px 22px;border-radius:12px;box-shadow:inset 0 0 10px rgba(0,82,131,0.3),inset 0 0 20px rgba(0,82,131,0.2);box-shadow:var(--wh-cta-shadow,inset 0 0 10px rgba(0,82,131,0.3),inset 0 0 20px rgba(0,82,131,0.2));">Reply to ${escapeHtml(
    f.fullName
  )}</a>
              </td>
            </tr>

            <!-- footer -->
            <tr>
              <td style="background:#e7f6ff;background-color:var(--wh-footer-bg,#e7f6ff);padding:18px 32px;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#52697a;color:var(--wh-muted,#52697a);">
                  Submitted ${escapeHtml(submittedAt)}${
    sourceUrl
      ? ` &middot; <a href="${escapeHtml(
          sourceUrl
        )}" style="color:#005283;color:var(--wh-accent,#005283);text-decoration:none;">${escapeHtml(
          sourceUrl
        )}</a>`
      : ""
  }
                </div>
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.6;color:#52697a;color:var(--wh-muted,#52697a);margin-top:6px;">This message was generated automatically by the WhiteHawk website demo form.</div>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function renderDemoEmailText(f: DemoEmailFields): string {
  const submittedAt = (f.submittedAt ?? new Date()).toUTCString();
  return [
    "New Demo Request — WhiteHawk",
    "",
    `Full Name:      ${f.fullName}`,
    `Business Email: ${f.email}`,
    `Company:        ${f.company}`,
    `Country:        ${f.country}`,
    "",
    `Submitted: ${submittedAt}`,
    f.sourceUrl ? `Source:    ${f.sourceUrl}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}
