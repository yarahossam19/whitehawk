"use client";

import type { ReactNode } from "react";
import styles from "./Badge.module.scss";

const toneClass = { navy: styles.navy, green: styles.green, amber: styles.amber, dark: styles.dark };

export function Badge({ children, tone = "navy" }: { children: ReactNode; tone?: "navy" | "green" | "amber" | "dark" }) {
  return <span className={`${styles.root} ${toneClass[tone]}`}>{children}</span>;
}
