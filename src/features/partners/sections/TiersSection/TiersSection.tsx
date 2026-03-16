"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { PARTNER_TIERS } from "../../config";
import styles from "./TiersSection.module.scss";

export function TiersSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.title}>Partner Enablement &amp; Tiers</h2>
          <p className={styles.subtitle}>
            We support partners at every stage with training, sales enablement, and joint Go-To-Market
            strategies.
          </p>
        </header>
        <div className={styles.tiers}>
          {PARTNER_TIERS.map((tier, index) => {
            const featured = "featured" in tier && tier.featured;
            const elevated =
              hoveredIndex !== null ? hoveredIndex === index : Boolean(featured);
            return (
              <article
                key={tier.name}
                className={`${styles.tier} ${elevated ? styles.tierElevated : ""}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <h3 className={styles.tierName}>{tier.name}</h3>
                <p className={styles.tierTagline}>{tier.tagline}</p>
                <ul className={styles.tierList}>
                  {tier.highlights.map((h) => (
                    <li key={h} className={styles.tierListItem}>
                      <span className={styles.checkWrap} aria-hidden>
                        <Check className={styles.checkIcon} strokeWidth={2.5} size={10} />
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
