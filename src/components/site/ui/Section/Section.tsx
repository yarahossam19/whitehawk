"use client";

import type { ReactNode } from "react";
import styles from "./Section.module.scss";

const bgClass = { white: styles.white, wash: styles.wash, navy: styles.navy };

export function Section({
  children,
  className = "",
  bg = "white",
  id,
}: {
  children: ReactNode;
  className?: string;
  bg?: "white" | "wash" | "navy";
  id?: string;
}) {
  return (
    <section id={id} className={`${bgClass[bg]} ${className}`}>
      <div className={styles.inner}>{children}</div>
    </section>
  );
}
