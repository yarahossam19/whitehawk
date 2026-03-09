"use client";

import type { ActivityItem } from "../../config";
import styles from "./ActivitiesSection.module.scss";

interface ActivitiesSectionProps {
  sectionTitle: string;
  sectionSubtitle?: string;
  items: ActivityItem[];
}

export function ActivitiesSection({
  sectionTitle,
  sectionSubtitle,
  items,
}: ActivitiesSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.headerWrap}>
        <div className={styles.header}>
          <h2 className={styles.title}>{sectionTitle}</h2>
          {sectionSubtitle && <p className={styles.subtitle}>{sectionSubtitle}</p>}
        </div>
      </div>
      <div className={styles.rows}>
        {items.map((item, index) => (
          <div
            key={item.title}
            className={`${styles.row} ${index % 2 === 1 ? styles.rowReverse : ""}`}
          >
            <div className={styles.content}>
              <h3 className={styles.rowTitle}>{item.title}</h3>
              <p className={styles.rowDescription}>{item.description}</p>
            </div>
            <div className={styles.media}>
              <div className={styles.imagePlaceholder} aria-hidden />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
