"use client";

import type { ReactNode } from "react";
import styles from "./Bento.module.scss";

export function Bento({
  children,
  className = "",
  cols = 4,
}: {
  children: ReactNode;
  className?: string;
  cols?: 4 | 6;
}) {
  return (
    <div className={`${styles.root} ${cols === 4 ? styles.cols4 : styles.cols6} ${className}`}>
      {children}
    </div>
  );
}
