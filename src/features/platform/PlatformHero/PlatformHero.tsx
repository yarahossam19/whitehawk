"use client";

import { PrimaryButton } from "@/components/ui/PrimaryButton";
import styles from "./PlatformHero.module.scss";

interface PlatformHeroProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
}

export function PlatformHero({ title, subtitle, ctaLabel }: PlatformHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroLeft}>
          <h1 className={styles.heroTitle}>{title}</h1>
          <p className={styles.heroSubtitle}>{subtitle}</p>
          <PrimaryButton title={ctaLabel} variant="primary" href="#" />
        </div>
        <div className={styles.heroRight}>
          <div className={styles.heroImage} aria-hidden>
            <div className={styles.heroImagePlaceholder} />
          </div>
        </div>
      </div>
    </section>
  );
}
