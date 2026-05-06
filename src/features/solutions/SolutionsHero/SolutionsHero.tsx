"use client";

import Image from "next/image";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useLeadModalOpener } from "@/hooks/useLeadModalOpener";
import styles from "./SolutionsHero.module.scss";

interface SolutionsHeroProps {
  title: string;
  description: string;
  ctaLabel: string;
  imageSrc: string;
}

export function SolutionsHero({ title, description, ctaLabel, imageSrc }: SolutionsHeroProps) {
  const { openFromButtonTitle } = useLeadModalOpener();
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroLeft}>
          <h1 className={styles.heroTitle}>{title}</h1>
          <p className={styles.heroSubtitle}>{description}</p>
          <PrimaryButton
            title={ctaLabel}
            variant="primary"
            onClick={() => openFromButtonTitle(ctaLabel)}
            className={styles.heroCta}
          />
        </div>
        <div className={styles.heroRight}>
          <div className={styles.heroImage}>
            <Image
              src={imageSrc}
              alt=""
              width={472}
              height={365}
              className={styles.heroImg}
              priority
              fetchPriority="high"
              sizes="(max-width: 850px) 100vw, (max-width: 900px) 100vw, 472px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
