"use client";

import type { SuccessStory } from "../../config";
import styles from "./SuccessStoriesSection.module.scss";

interface SuccessStoriesSectionProps {
  sectionTitle: string;
  items: SuccessStory[];
}

export function SuccessStoriesSection({ sectionTitle, items }: SuccessStoriesSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{sectionTitle}</h2>
        <div className={styles.grid}>
          {items.map((item) => (
            <article key={item.company} className={styles.card}>
              <p className={styles.result}>{item.result}</p>
              <p className={styles.company}>{item.company}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
