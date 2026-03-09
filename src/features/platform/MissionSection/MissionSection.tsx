"use client";

import { useState } from "react";
import type { MissionCard } from "../../config";
import styles from "./MissionSection.module.scss";

interface MissionSectionProps {
  cards: MissionCard[];
}

function SimulateIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M16 10v12M10 16h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TrackIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M16 8v8l6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GenerateIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path d="M8 12h16v12H8z" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M12 8v4M16 8v4M20 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CardIcon({ icon }: { icon: MissionCard["icon"] }) {
  if (icon === "simulate") return <SimulateIcon />;
  if (icon === "track") return <TrackIcon />;
  return <GenerateIcon />;
}

export function MissionSection({ cards }: MissionSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.cards}>
          {cards.map((card, index) => {
            const isOpen = openIndex === index;
            return (
              <button
                key={card.title}
                type="button"
                className={`${styles.card} ${isOpen ? styles.cardOpen : styles.cardClosed}`}
                onClick={() => setOpenIndex(index)}
                aria-expanded={isOpen}
              >
                <div className={styles.cardInner}>
                  <span className={styles.icon}>
                    <CardIcon icon={card.icon} />
                  </span>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <div className={styles.cardContent}>
                    <p className={styles.cardDescription}>{card.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
