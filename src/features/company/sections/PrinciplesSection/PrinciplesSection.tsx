"use client";

import { useState, useCallback } from "react";
import styles from "./PrinciplesSection.module.scss";

const PRINCIPLES = [
  {
    id: "clear",
    label: "Clear",
    description: "Visibility is the foundation of security. See everything.",
  },
  {
    id: "continuous",
    label: "Continuous",
    description: "Security isn't a check-box. It's an infinite loop.",
  },
  {
    id: "practical",
    label: "Practical",
    description: "Tools that work for engineers, not just auditors.",
  },
];

export function PrinciplesSection() {
  const [frontIndex, setFrontIndex] = useState(0);

  const goNext = useCallback(() => {
    setFrontIndex((i) => (i + 1) % PRINCIPLES.length);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.stackWrap}>
          {PRINCIPLES.map((p, index) => {
            // depth: 0 = back (smallest), 1 = middle, 2 = front
            const depth = (index - frontIndex + PRINCIPLES.length) % PRINCIPLES.length;
            const depthClass = depth === 0 ? styles.cardBack : depth === 1 ? styles.cardMiddle : styles.cardFront;
            const isFront = depth === 2;

            return (
              <article
                key={p.id}
                className={`${styles.card} ${depthClass}`}
                onClick={isFront ? goNext : undefined}
                role={isFront ? "button" : undefined}
                tabIndex={isFront ? 0 : undefined}
                onKeyDown={isFront ? (e) => e.key === "Enter" && goNext() : undefined}
                aria-label={isFront ? "Click to show next principle" : undefined}
              >
                <div className={styles.cardTop}>
                  <div className={styles.badge} aria-hidden />
                  {isFront && (
                    <span className={styles.clickHint}>Click to Next</span>
                  )}
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{p.label}</h3>
                  <p className={styles.cardDescription}>{p.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
