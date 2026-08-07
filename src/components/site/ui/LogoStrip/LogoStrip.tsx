"use client";

import { LOGO_DIMENSIONS } from "@/lib/logo-assets";
import styles from "./LogoStrip.module.scss";

// .webp, not the original .svg: those "SVGs" were base64 PNGs behind a pattern
// crop, together 3.2 MB for a row of 32px-tall marks, and next/image cannot
// optimize SVG. See src/lib/logo-assets.ts.
const CLIENT_LOGOS = [
  "group1-1",
  "group1-2",
  "group1-3",
  "group1-4",
  "group2-1",
  "group2-2",
  "group2-3",
  "group2-4",
  "group3-1",
  "group3-2",
  "group3-3",
  "group4-1",
  "group4-2",
  "group4-3",
  "group5-1",
  "group5-2",
  "group5-3",
  "group6-1",
  "group6-2",
  "group6-3",
  "group7-1",
  "group7-2",
  "group7-3",
].map((n) => `/icons/clients/${n}.webp`);

export function LogoStrip({ label = "Trusted by leading organizations" }: { label?: string }) {
  const row = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.label}>{label}</div>
        <div
          className={styles.track}
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className={`${styles.row} animate-marquee`}>
            {row.map((src, i) => {
              const dim = LOGO_DIMENSIONS[src];
              return (
                <img
                  key={`${src}-${i}`}
                  src={src}
                  alt=""
                  aria-hidden
                  // Intrinsic size up front so the marquee row doesn't reflow
                  // as each mark arrives; CSS still constrains the painted box
                  // to 32px tall / 120px wide.
                  width={dim?.width}
                  height={dim?.height}
                  // The row is duplicated to loop seamlessly, so the second
                  // copy (and everything past the fold of the first) has no
                  // reason to block the initial load.
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className={styles.logo}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
