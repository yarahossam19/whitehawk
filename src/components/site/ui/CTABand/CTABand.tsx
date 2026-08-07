"use client";

import { Button } from "@/components/site/ui/Button/Button";
import styles from "./CTABand.module.scss";

export function CTABand({
  eyebrow = "Start now",
  title,
  description,
  primary,
  secondary,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  primary?: { label: string; to?: string; href?: string };
  secondary?: { label: string; to?: string; href?: string };
}) {
  return (
    <section className={styles.root}>
      <div
        aria-hidden
        className={`${styles.glow} animate-aurora`}
        style={{
          background:
            "radial-gradient(700px 320px at 50% 0%, rgba(37,99,235,0.5), transparent 60%), radial-gradient(500px 260px at 20% 100%, rgba(29,79,215,0.35), transparent 65%)",
        }}
      />
      <div className={`reveal ${styles.inner}`}>
        <div className={styles.eyebrow}>● {eyebrow}</div>
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
        <div className={styles.actions}>
          {primary && (
            <Button as={primary.to ? "link" : "a"} to={primary.to} href={primary.href} variant="accent" size="lg">
              {primary.label}
            </Button>
          )}
          {secondary && (
            <Button as={secondary.to ? "link" : "a"} to={secondary.to} href={secondary.href} variant="ghost-dark" size="lg">
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
