"use client";

import Image from "next/image";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useDemoModal } from "@/contexts/DemoModalContext";
import styles from "./PlatformHero.module.scss";

interface PlatformHeroProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  heroImageSrc: string;
}

export function PlatformHero({ title, subtitle, ctaLabel, heroImageSrc }: PlatformHeroProps) {
  const { openDemoModal } = useDemoModal();
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroLeft}>
          <h1 className={styles.heroTitle}>{title}</h1>
          <p className={styles.heroSubtitle}>{subtitle}</p>
          <PrimaryButton
            title={ctaLabel}
            variant="primary"
            onClick={openDemoModal}
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
