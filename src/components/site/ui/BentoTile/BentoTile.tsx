"use client";

import type { ReactNode } from "react";
import styles from "./BentoTile.module.scss";

const variantClass = { canvas: styles.canvas, ink: styles.ink, accent: styles.accent, glass: styles.glass };

export function BentoTile({
  children,
  variant = "canvas",
  className = "",
  hoverable = true,
  eyebrow,
  index,
}: {
  children: ReactNode;
  variant?: "canvas" | "ink" | "accent" | "glass";
  className?: string;
  hoverable?: boolean;
  eyebrow?: string;
  index?: string;
}) {
  const light = variant === "canvas" || variant === "glass";
  return (
    <div
      className={`reveal ${styles.root} ${variantClass[variant]} ${hoverable ? styles.hoverable : ""} ${className}`}
    >
      {(eyebrow || index) && (
        <div className={styles.header}>
          {eyebrow && <div className={light ? styles.eyebrowLight : styles.eyebrowDark}>{eyebrow}</div>}
          {index && <div className={light ? styles.indexLight : styles.indexDark}>{index}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
