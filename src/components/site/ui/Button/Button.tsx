"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./Button.module.scss";

export function Button({
  as = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  href,
  to,
  ...rest
}: {
  as?: "button" | "a" | "link";
  variant?: "primary" | "accent" | "ghost" | "ghost-dark" | "link";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: ReactNode;
  href?: string;
  to?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;
  if (as === "link" && to) {
    return (
      <Link href={to} className={cls}>
        {children}
      </Link>
    );
  }
  if (as === "a" && href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
