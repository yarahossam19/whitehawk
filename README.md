This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Demo Request Email ("Request demo" modal)

The API route `POST /api/request-demo` sends an email to `DEMO_RECIPIENT_EMAIL`.

Provider order:

1. `RESEND_API_KEY` - used first when available.
2. Microsoft Graph - used when the `M365_*` variables below are configured.
3. SMTP - used when `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS` are set.

Required/optional variables:

- `RESEND_API_KEY` - Resend API key for the Edge route.
- `MAIL_FROM` - optional Resend sender name/address, defaults to `WhiteHawk Website <onboarding@resend.dev>`.
- `DEMO_RECIPIENT_EMAIL` - optional destination address, defaults to `yara.hossam@whiteguard.co.uk`.
- `M365_TENANT_ID`, `M365_CLIENT_ID`, `M365_CLIENT_SECRET`
- `M365_SENDER_EMAIL` - mailbox to send as; the app must be allowed to send as this mailbox.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, and optional `SMTP_FROM`.

Notes:

- In local development, SMTP is available as a fallback if the SMTP env vars are set.
- Graph requires an Entra ID app registration with `Mail.Send` **application** permission and admin consent.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
