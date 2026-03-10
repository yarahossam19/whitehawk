"use client";

import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useDemoModal } from "@/contexts/DemoModalContext";
import styles from "./SolutionsHero.module.scss";

interface SolutionsHeroProps {
  title: string;
  description: string;
  ctaLabel: string;
  imageSrc?: string;
}

export function SolutionsHero({ title, description, ctaLabel, imageSrc }: SolutionsHeroProps) {
  const { openDemoModal } = useDemoModal();
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroLeft}>
          <h1 className={styles.heroTitle}>{title}</h1>
          <p className={styles.heroSubtitle}>{description}</p>
          <PrimaryButton title={ctaLabel} variant="primary" onClick={openDemoModal} />
        </div>
        <div className={styles.heroRight}>
          <div className={styles.heroImage} aria-hidden>
            {imageSrc ? (
              <img src={imageSrc} alt="" className={styles.heroImageImg} />
            ) : (
              <div className={styles.heroImagePlaceholder} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
