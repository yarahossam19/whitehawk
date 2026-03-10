"use client";

import styles from "./PrinciplesSection.module.scss";
import { useInView } from "@/hooks/useInView";

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
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className={styles.section}>
      <div className={styles.inner} ref={ref}>
        <div className={styles.stackWrap}>
          {PRINCIPLES.map((p, index) => (
            <article
              key={p.id}
              className={`${styles.card} ${styles[`card${index + 1}`]} ${inView ? styles.cardVisible : ""}`}
            >
              <div className={styles.badge} aria-hidden>
                <span className={styles.badgeCircle} />
              </div>
              <header className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{p.label}</h3>
              </header>
              <p className={styles.cardDescription}>{p.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

