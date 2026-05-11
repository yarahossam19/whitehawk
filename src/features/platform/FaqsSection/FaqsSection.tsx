"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import styles from "./FaqsSection.module.scss";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqsSectionProps {
  sectionTitle: string;
  sectionSubtitle?: string;
  items: FaqItem[];
  /** Indices to keep open by default. Defaults to none. */
  defaultOpen?: number[];
}

export function FaqsSection({
  sectionTitle,
  sectionSubtitle,
  items,
  defaultOpen = [],
}: FaqsSectionProps) {
  const [open, setOpen] = useState<Set<number>>(() => new Set(defaultOpen));

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section className={styles.section} aria-labelledby="platform-faqs-title">
      <div className={styles.container}>
        <h2 id="platform-faqs-title" className={styles.title}>
          {sectionTitle}
        </h2>
        {sectionSubtitle && <p className={styles.subtitle}>{sectionSubtitle}</p>}

        <ul className={styles.list} role="list">
          {items.map((item, i) => {
            const isOpen = open.has(i);
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <li key={i} className={styles.item}>
                <button
                  type="button"
                  id={buttonId}
                  className={styles.questionRow}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(i)}
                >
                  <span className={styles.question}>{item.question}</span>
                  <span
                    className={`${styles.toggleIcon} ${
                      isOpen ? styles.toggleIconOpen : ""
                    }`}
                    aria-hidden
                  >
                    {isOpen ? (
                      <Minus size={16} strokeWidth={2.5} />
                    ) : (
                      <Plus size={16} strokeWidth={2.5} />
                    )}
                  </span>
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  className={`${styles.answerWrap} ${
                    isOpen ? styles.answerWrapOpen : ""
                  }`}
                >
                  <div className={styles.answerInner}>
                    <div className={styles.answerBody}>
                      <div className={styles.divider} aria-hidden />
                      <p className={styles.answer}>{item.answer}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
