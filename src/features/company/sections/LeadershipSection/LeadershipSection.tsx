"use client";

import Image from "next/image";
import styles from "./LeadershipSection.module.scss";
import ceo from "@/../public/assets/imgs/ceo.png";
import cto from "@/../public/assets/imgs/cto.png";
const LEADERS = [
  {
    id: "youssef",
    name: "Youssef S. Ghoniem",
    watermark: "LEADER",
    bio: "Visionary architect behind the platform. With 10 years in offensive security, Youssef realized the industry needed a bridge between chaos and structure.",
    image: ceo,
    alt: "Youssef S. Ghoniem",
    align: "left" as const,
  },
  {
    id: "mohamed",
    name: "Mohamed Mamdouh",
    watermark: "BUILDER",
    bio: "Operational mastermind. Mohamed ensures that every feature we build translates into real-world efficiency for our partners and clients.",
    image: cto,
    alt: "Mohamed Mamdouh",
    align: "right" as const,
  },
];

export function LeadershipSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {LEADERS.map((leader) => (
          <article
            key={leader.id}
            className={leader.align === "right" ? `${styles.card} ${styles.cardReversed}` : styles.card}
          >
            <div className={styles.portraitWrap}>
              <div className={styles.portraitBg} aria-hidden />
              <div className={styles.portraitCircle}>
                <Image src={leader.image} alt={leader.alt} fill className={styles.portraitImg} />
              </div>
            </div>
            <div className={styles.textBlock}>
              <div
                className={leader.align === "right" ? styles.watermarkRight : styles.watermark}
                aria-hidden
              >
                {leader.watermark}
              </div>
              <div className={styles.textContent}>
                <h3 className={styles.name}>{leader.name}</h3>
                <p className={styles.bio}>{leader.bio}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
