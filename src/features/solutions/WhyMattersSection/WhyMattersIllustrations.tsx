"use client";

import Image from "next/image";

/**
 * Big right-side illustration that sits in the light top half of the
 * WhyMattersSection. ONE entry per solution-type page. Paste the final SVG
 * from Figma in place of the placeholder for each key.
 *
 * The component receives the chosen illustration through the section's
 * `illustration` config field. To add a new solution page:
 *   1. Add a key to `WhyMattersIllustrationName` below.
 *   2. Add a JSX entry to `WHY_MATTERS_ILLUSTRATIONS` (or alias an existing one).
 *   3. Reference it in config.ts as `illustration: "<your-key>"`.
 */

export type WhyMattersIllustrationName =
  | "government"
  | "fintech"
  | "healthcare";

const WHY_MATTERS_ILLUSTRATIONS: Record<WhyMattersIllustrationName, React.ReactNode> = {
  /* Public sector: side-img2 */
  government: (
    <Image
      src="/assets/imgs/side-img2.png"
      alt=""
      width={360}
      height={360}
      priority={false}
      sizes="(max-width: 900px) 280px, 360px"
    />
  ),

  /* Fintech: side-img1 */
  fintech: (
    <Image
      src="/assets/imgs/side-img1.png"
      alt=""
      width={360}
      height={360}
      priority={false}
      sizes="(max-width: 900px) 280px, 360px"
    />
  ),

  /* Healthcare: side-img3 */
  healthcare: (
    <Image
      src="/assets/imgs/side-img3.png"
      alt=""
      width={360}
      height={360}
      priority={false}
      sizes="(max-width: 900px) 280px, 360px"
    />
  ),
};

export function WhyMattersIllustration({
  illustration,
}: {
  illustration: WhyMattersIllustrationName;
}) {
  return <>{WHY_MATTERS_ILLUSTRATIONS[illustration]}</>;
}
