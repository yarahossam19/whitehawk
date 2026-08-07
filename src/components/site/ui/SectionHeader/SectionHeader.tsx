"use client";

import type { ReactNode } from "react";
import styles from "./SectionHeader.module.scss";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={`reveal ${styles.root} ${align === "center" ? styles.center : styles.left} ${className}`}>
      {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
