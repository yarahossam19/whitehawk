import { IBM_Plex_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google";

/**
 * The article's fonts, self-hosted through next/font like the site's Manrope
 * (src/app/layout.tsx) instead of the base64 copy inside the reference file.
 *
 * Plus Jakarta Sans has no Arabic letters, so Arabic articles put IBM Plex
 * Sans Arabic first. Only its Arabic subset is loaded: Latin words inside an
 * Arabic article (PDPC, GDPR, URLs) fall through to Plus Jakarta Sans.
 */
export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  fallback: ["system-ui", "sans-serif"],
});

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plex-arabic",
  // No fallback faces in this variable: anything here would sit in front of
  // Plus Jakarta Sans in the Arabic font stack and catch the Latin words.
  adjustFontFallback: false,
  fallback: [],
});

export const articleFontVariables = `${jakarta.variable} ${plexArabic.variable}`;
