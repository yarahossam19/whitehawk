"use client";

import Image from "next/image";
import styles from "./LeadershipSection.module.scss";
import leader1 from "@/../public/assets/icons/investors/investor1.svg";
import leader2 from "@/../public/assets/icons/investors/investor2.svg";

export function LeadershipSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <article className={styles.card}>
          <div className={styles.portraitWrap}>
            <div className={styles.portraitBg} />
            <div className={styles.portraitCircle}>
              <Image src={leader1} alt="Leader" fill className={styles.portraitImg} />
            </div>
          </div>
          <div className={styles.text}>
            <div className={styles.watermark}>LEADER</div>
            <h3 className={styles.name}>Youssef S. Ghoniem</h3>
            <p className={styles.bio}>
              Visionary architect behind the platform. With 10 years in offensive security, Youssef realized the
              industry needed a bridge between chaos and structure.
            </p>
          </div>
        </article>

        <article className={`${styles.card} ${styles.cardRight}`}>
          <div className={styles.portraitWrap}>
            <div className={styles.portraitBg} />
            <div className={styles.portraitCircle}>
              <Image src={leader2} alt="Leader" fill className={styles.portraitImg} />
            </div>
          </div>
          <div className={styles.textRight}>
            <div className={styles.watermarkRight}>BUILDER</div>
            <h3 className={styles.name}>Mohamed Mamdouh</h3>
            <p className={styles.bio}>
              Operational mastermind. Mohamed ensures that every feature we build translates into real-world
              efficiency for our partners and clients.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

