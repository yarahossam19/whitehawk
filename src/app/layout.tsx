import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NavBar } from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/Providers/Providers";
import "./globals.scss";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://whitehawk.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "WhiteHawk | Unified Cybersecurity Platform",
    template: "%s | WhiteHawk",
  },
  description:
    "WhiteHawk unifies offensive security, defensive SOC, GRC, and asset visibility in one platform—so teams reduce risk, prove compliance, and respond faster.",
  applicationName: "WhiteHawk",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "WhiteHawk",
    title: "WhiteHawk | Unified Cybersecurity Platform",
    description:
      "One platform for vulnerability management, monitoring, compliance, and asset discovery—built for enterprises and partners.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhiteHawk | Unified Cybersecurity Platform",
    description:
      "One platform for offensive, defensive, GRC, and asset security—reduce risk and audit prep time.",
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <NavBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
