"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import styles from "./PrinciplesSection.module.scss";
import eye from "@/../public/assets/icons/eye.svg";
import tool from "@/../public/assets/icons/tool.svg";
import light from "@/../public/assets/icons/light.svg";
import infinity from "@/../public/assets/icons/infinity.svg";

const PRINCIPLES = [
  {
    id: "clear",
    label: "Clear",
    description: "Visibility is the foundation of security. See everything.",
    icon: eye,
  },
  {
    id: "continuous",
    label: "Continuous",
    description: "Security isn't a check-box. It's an infinite loop.",
    icon: infinity,
  },
  {
    id: "practical",
    label: "Practical",
    description: "Tools that work for engineers, not just auditors.",
    icon: tool,
  },
  {
    id: "scalable",
    label: "Scalable",
    description: "Security that grows with your business.",
    icon: light,
  },
] as const;

const L = PRINCIPLES.length;

export function PrinciplesSection() {
  const [frontIndex, setFrontIndex] = useState(0);

  const goNext = useCallback(() => {
    setFrontIndex((i) => (i + 1) % L);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.stackWrap}>
          {PRINCIPLES.map((p, index) => {
            /* 0 = front (on top, clickable). 1 = middle. 2 = back. 3 = deepest (4th card). */
            const stackPos = (index - frontIndex + L) % L;
            const depthClass =
              stackPos === 0
                ? styles.cardFront
                : stackPos === 1
                  ? styles.cardMiddle
                  : stackPos === 2
                    ? styles.cardBack
                    : styles.cardDeepest;
            const isFront = stackPos === 0;

            return (
              <article
                key={p.id}
                className={`${styles.card} ${depthClass}`}
                onClick={isFront ? goNext : undefined}
                onKeyDown={
                  isFront
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          goNext();
                        }
                      }
                    : undefined
                }
                role={isFront ? "button" : undefined}
                tabIndex={isFront ? 0 : -1}
                aria-label={
                  isFront
                    ? `${p.label}. ${p.description} Click to show next principle.`
                    : undefined
                }
              >
                {isFront && (
                  <span className={styles.clickHint}>Click to Next</span>
                )}
                <div className={styles.cardTop}>
                  <div className={styles.badge} aria-hidden>
                    <Image
                      src={p.icon}
                      alt=""
                      width={36}
                      height={36}
                      className={styles.badgeIcon}
                    />
                  </div>
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
