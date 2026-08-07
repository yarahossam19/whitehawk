"use client";

import type { ReactNode } from "react";
import styles from "./Check.module.scss";

export function Check({ children }: { children: ReactNode }) {
  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 10.5l4 4L16 6" />
      </svg>
      <span>{children}</span>
    </div>
  );
}
