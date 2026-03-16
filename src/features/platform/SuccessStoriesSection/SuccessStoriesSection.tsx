"use client";

import type { SuccessStory } from "../config";
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
          {items.map((item, index) => (
            <article
              key={`${item.company}-${item.result}`}
              className={`${styles.card} ${index === 0 ? styles.cardFirst : styles.cardSecond}`}
            >
              <p className={styles.company}>{item.company}</p>
              <p className={styles.result}>{item.result}</p>
              <p className={styles.quote}>
                <span className={styles.quoteMark} aria-hidden>
                  &ldquo;
                </span>
                {item.quote}
                <span className={styles.quoteMark} aria-hidden>
                  &rdquo;
                </span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
