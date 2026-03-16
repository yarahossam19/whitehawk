"use client";

import styles from "./CompanyHero.module.scss";
import Aurora from "@/components/Aurora";

export function CompanyHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.aurora} aria-hidden>
        <Aurora
          colorStops={["#003859", "#003859", "#E1E8EB"]}
          amplitude={0.5}
          blend={0.5}
        />
      </div>
      <div className={styles.leftStrip}>
        <div className={styles.headTextTop}>
          <span className={styles.brand}>White Hawk</span>
          <span className={styles.builtTo}>Built To</span>
        </div>
      </div>
      <div className={styles.inner}>
        <div className={styles.bottomCluster}>
          <div className={styles.bodyText}>
            <span className={styles.bodyBar} aria-hidden />
            <p className={styles.bodyLine}>One platform to manage</p>
            <p className={styles.bodyLineStrong}>Cybersecurity Operations</p>
            <p className={styles.bodyLineStrong}>Risk</p>
            <p className={styles.bodyLineStrong}>Compliance &amp; Assets</p>
            <p className={styles.bodyLineSmall}>in a clear, structured way.</p>
          </div>
          <div className={styles.headlineLines}>
            <span className={styles.simplify}>SIMPLIFY</span>
            <span className={styles.cyber}>CYBERSECURITY.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
