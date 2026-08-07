"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import styles from "./FAQ.module.scss";

/**
 * Editorial FAQ — a single-open list with big type, hairline dividers, and
 * an animated +/- glyph.
 */
export function FAQ({ items }: { items: Array<{ q: string; a: string }> }) {
  const [open, setOpen] = useState(0);
  return (
    <div className={styles.root}>
      <ul className={styles.list}>
        {items.map((it, i) => {
          const isOpen = i === open;
          return (
            <li
              key={i}
              className={`reveal ${styles.item}`}
              style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
            >
              <div className={`${styles.itemInner} ${isOpen ? styles.itemOpen : ""}`}>
                <span className={`${styles.indicator} ${isOpen ? styles.indicatorOpen : ""}`} aria-hidden />
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className={styles.trigger}
                >
                  <span className={styles.triggerText}>
                    <span className={styles.mobileIndex}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={`${styles.question} ${isOpen ? styles.questionOpen : styles.questionClosed}`}>
                      {it.q}
                    </span>
                  </span>
                  <span className={`${styles.iconWrap} ${isOpen ? styles.iconOpen : styles.iconClosed}`}>
                    <Plus size={14} />
                  </span>
                </button>
                <div className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}>
                  <div className={styles.panelInner}>
                    <p className={styles.answer}>{it.a}</p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
