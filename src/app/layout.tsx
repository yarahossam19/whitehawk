import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Manrope } from "next/font/google";
import "@/styles/globals.scss";
import { Providers } from "./providers";

/**
 * Self-hosted rather than the `<link rel="stylesheet">` to fonts.googleapis.com
 * this used to carry. That link was a render-blocking request to a third-party
 * origin on every page: two extra DNS/TLS handshakes (preconnect only hid part
 * of that), then a second round trip for the font files the CSS pointed at.
 * next/font emits the @font-face rules inline, serves the woff2 from our own
 * origin, and preloads it — one origin, no blocking stylesheet.
 *
 * Only Manrope: --font-sans and --font-display were both Manrope with Inter
 * merely listed behind it as a fallback, so Inter's four weights downloaded on
 * every visit and were never painted.
 */
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const SITE_URL = "https://whitehawk.io";
const SITE_DESCRIPTION =
  "WhiteHawk unifies offensive, defensive, GRC and asset management into one security platform — standalone modules or a complete suite.";

export const metadata: Metadata = {
  // Real production domain confirmed from existing references in the codebase
  // (hello@whitehawk.io, api.whitehawk.io, app.whitehawk.io — see contact/integrations pages).
  metadataBase: new URL(SITE_URL),
  title: "WhiteHawk — Secure the whole security program",
  description: SITE_DESCRIPTION,
  // Inherited by every page that doesn't set its own; each public page sets
  // `alternates.canonical` to its own path so duplicate entry points (trailing
  // slash, tracking params, the www host) all consolidate onto one URL.
  alternates: { canonical: "/" },
  applicationName: "WhiteHawk",
  icons: {
    icon: [
      { url: "/icons/logo/wh-light.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    // Square, not the 1200×630 social card: iOS renders this as a rounded
    // app tile and would crop a landscape image.
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  // Explicit rather than implied: without a robots directive the crawler
  // defaults are fine, but max-image-preview/max-snippet unlock rich results
  // that are otherwise capped.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "WhiteHawk — One security platform, end to end",
    description:
      "Offensive, defensive, GRC and asset management — unified in a single security platform for modern teams.",
    type: "website",
    url: SITE_URL,
    siteName: "WhiteHawk",
    locale: "en_US",
    // Previously absent while `twitter.card` already claimed
    // summary_large_image, so every share rendered as a bare text link.
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "WhiteHawk — one security platform, end to end",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WhiteHawk — One security platform, end to end",
    description:
      "Offensive, defensive, GRC and asset management — unified in a single security platform for modern teams.",
    images: ["/og.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "WhiteHawk",
  url: SITE_URL,
  logo: `${SITE_URL}/icons/logo/whitehawk-logo.svg`,
  image: `${SITE_URL}/og.png`,
  description: SITE_DESCRIPTION,
  email: "hello@whitehawk.io",
  sameAs: [`${SITE_URL}`],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "WhiteHawk",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: { "@type": "Organization", name: "WhiteHawk", url: SITE_URL },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
