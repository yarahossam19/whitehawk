"use client";

import Image from "next/image";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useLeadModalOpener } from "@/hooks/useLeadModalOpener";
import styles from "./PlatformHero.module.scss";

interface PlatformHeroProps {
  /** Each entry renders on its own line inside the H1. */
  titleLines: string[];
  subtitle: string;
  ctaLabel: string;
  heroImageSrc: string;
}

export function PlatformHero({ titleLines, subtitle, ctaLabel, heroImageSrc }: PlatformHeroProps) {
  const { openFromButtonTitle } = useLeadModalOpener();
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroLeft}>
          <h1 className={styles.heroTitle}>
            {titleLines.map((line, i) => (
              <span
                key={i}
                className={`${styles.heroTitleLine} ${
                  i === 0 ? styles.heroTitleLineLead : styles.heroTitleLineRest
                }`}
              >
                {line}
              </span>
            ))}
          </h1>
          <p className={styles.heroSubtitle}>{subtitle}</p>
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
              src={heroImageSrc}
              alt=""
              width={550}
              height={365}
              className={styles.heroImg}
              priority
              fetchPriority="high"
              sizes="(max-width: 700px) 100vw, (max-width: 900px) 100vw, 472px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
