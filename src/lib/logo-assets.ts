/**
 * Intrinsic pixel dimensions of the generated WebP logo marks under
 * public/icons/{clients,investors,certificates}.
 *
 * Those directories originally held SVGs that were really base64-embedded PNGs
 * cropped out of sprite sheets with a <pattern> transform — 5.8 MB of assets to
 * paint marks 32-44 px tall, and nothing next/image could optimize (it passes
 * SVG through untouched). They were rasterized once to ~300 KB of WebP at ~3x
 * the display size.
 *
 * The dimensions live here rather than being read off disk because a raw <img>
 * (LogoStrip's marquee) and next/image both need width/height up front to
 * reserve space and avoid layout shift, and each mark has its own aspect ratio.
 *
 * Regenerate with the same rasterize-then-measure pass if the source art
 * changes.
 */
export const LOGO_DIMENSIONS: Record<string, { width: number; height: number }> = {
  "/icons/clients/group1-1.webp": { width: 110, height: 96 },
  "/icons/clients/group1-2.webp": { width: 110, height: 96 },
  "/icons/clients/group1-3.webp": { width: 285, height: 96 },
  "/icons/clients/group1-4.webp": { width: 78, height: 96 },
  "/icons/clients/group2-1.webp": { width: 310, height: 96 },
  "/icons/clients/group2-2.webp": { width: 310, height: 96 },
  "/icons/clients/group2-3.webp": { width: 97, height: 96 },
  "/icons/clients/group2-4.webp": { width: 259, height: 96 },
  "/icons/clients/group3-1.webp": { width: 94, height: 96 },
  "/icons/clients/group3-2.webp": { width: 94, height: 96 },
  "/icons/clients/group3-3.webp": { width: 218, height: 96 },
  "/icons/clients/group4-1.webp": { width: 318, height: 96 },
  "/icons/clients/group4-2.webp": { width: 318, height: 96 },
  "/icons/clients/group4-3.webp": { width: 264, height: 96 },
  "/icons/clients/group5-1.webp": { width: 353, height: 96 },
  "/icons/clients/group5-2.webp": { width: 353, height: 96 },
  "/icons/clients/group5-3.webp": { width: 198, height: 96 },
  "/icons/clients/group6-1.webp": { width: 269, height: 96 },
  "/icons/clients/group6-2.webp": { width: 269, height: 96 },
  "/icons/clients/group6-3.webp": { width: 206, height: 96 },
  "/icons/clients/group7-1.webp": { width: 384, height: 96 },
  "/icons/clients/group7-2.webp": { width: 384, height: 96 },
  "/icons/clients/group7-3.webp": { width: 215, height: 96 },
  "/icons/investors/investor1.webp": { width: 120, height: 120 },
  "/icons/investors/investor2.webp": { width: 637, height: 120 },
  "/icons/investors/investor21.webp": { width: 203, height: 120 },
  "/icons/investors/investor22.webp": { width: 378, height: 120 },
  "/icons/investors/investor3.webp": { width: 357, height: 120 },
  "/icons/investors/investor4.webp": { width: 213, height: 120 },
  "/icons/investors/investor5.webp": { width: 476, height: 120 },
  "/icons/investors/investor6.webp": { width: 286, height: 120 },
  "/icons/investors/investor7.webp": { width: 168, height: 120 },
  "/icons/investors/investor8.webp": { width: 203, height: 120 },
  "/icons/certificates/soc-2.webp": { width: 133, height: 132 },
  "/icons/certificates/iso-27001.webp": { width: 133, height: 132 },
  "/icons/certificates/gdpr.webp": { width: 133, height: 132 },
  "/icons/certificates/pco-dss.webp": { width: 133, height: 132 },
};
