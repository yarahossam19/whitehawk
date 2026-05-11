"use client";

import type { BenefitItem } from "../config";
import styles from "./BenefitsSection.module.scss";
import { BenefitIcon } from "./BenefitsIcons";

interface BenefitsSectionProps {
  sectionTitle: string;
  sectionSubtitle?: string;
  items: BenefitItem[];
}

export function BenefitsSection({
  sectionTitle,
  sectionSubtitle,
  items,
}: BenefitsSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.headerWrap}>
        <h2 className={styles.title}>{sectionTitle}</h2>
        {sectionSubtitle && <p className={styles.subtitle}>{sectionSubtitle}</p>}
      </div>
      <div className={styles.cards}>
        {items.map((item) => (
          <article key={item.title} className={styles.card}>
            <div className={styles.iconWrap}>
              <BenefitIcon icon={item.icon} />
            </div>
            <span className={styles.value}>{item.value}</span>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDescription}>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
