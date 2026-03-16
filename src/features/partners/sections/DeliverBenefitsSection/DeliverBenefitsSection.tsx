"use client";

import { Award, Layers, TrendingUp, Zap } from "lucide-react";
import styles from "./DeliverBenefitsSection.module.scss";

const MARQUEE_CARDS = [
  {
    title: "Deliver Faster",
    text: "Leverage standardized workflows and built-in reporting.",
    Icon: Zap,
  },
  {
    title: "Reduce Overhead",
    text: "Fewer tools, Centralized visibility",
    Icon: Layers,
  },
  {
    title: "Grow Revenue",
    text: "New recurring streams & Upsells",
    Icon: TrendingUp,
  },
  {
    title: "Differentiate",
    text: "One platform across domains",
    Icon: Award,
  },
] as const;

export function DeliverBenefitsSection() {
  return (
    <section className={styles.section} aria-labelledby="deliver-benefits-subtitle">
      <div className={styles.inner}>
        <p id="deliver-benefits-subtitle" className={styles.subtitle}>
          Comprehensive capabilities across the security spectrum
        </p>
        <div className={styles.marqueeMask}>
          <div className={styles.marqueeTrack}>
            {[0, 1].map((dup) => (
              <div key={dup} className={styles.marqueeChunk}>
                {MARQUEE_CARDS.map(({ title, text, Icon }, i) => (
                  <article key={`${dup}-${i}`} className={styles.card}>
                    <div className={styles.iconWrap}>
                      <Icon className={styles.icon} strokeWidth={1.75} size={32} aria-hidden />
                    </div>
                    <div className={styles.copy}>
                      <h3 className={styles.cardTitle}>{title}</h3>
                      <p className={styles.cardText}>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
