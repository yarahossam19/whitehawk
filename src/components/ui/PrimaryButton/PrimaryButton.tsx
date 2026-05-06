"use client";

import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import styles from "./PrimaryButton.module.scss";

export type PrimaryButtonVariant = "primary" | "secondary";

export interface PrimaryButtonProps {
  /** Button label */
  title: string;
  /** Click handler (used when no href) */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** primary = dark fill, secondary = light fill */
  variant?: PrimaryButtonVariant;
  /** Optional additional class names */
  className?: string;
  /** Optional type (submit for forms) */
  type?: "button" | "submit" | "reset";
  /** Optional href: renders as Next.js Link when provided */
  href?: string;
  /** Optional disabled state */
  disabled?: boolean;
  target?: string;
  /** Optional icon or content after title */
  children?: ReactNode;
}

export function PrimaryButton({
  title,
  onClick,
  variant = "primary",
  className = "",
  target,
  type = "button",
  href,
  disabled = false,
  children,
}: PrimaryButtonProps) {
  const classNames = [styles.button, styles[variant], className].filter(Boolean).join(" ");

  if (href && !disabled) {
    return (
      <Link href={href} className={classNames} target={target}>
        {title}
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      aria-label={title}
    >
      {title}
      {children}
    </button>
  );
}
