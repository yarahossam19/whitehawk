"use client";

import styles from "./TrustSection.module.scss";

const CERTS = ["ISO 27001", "ISO 9001:2015", "SOC 2", "CREST", "PCI DSS", "GDPR"];

const BACKERS = ["BEC", "Plug and Play", "XS", "DEIN", "Others"];

export function TrustSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.packedBy}>
          <p className={styles.packedByLabel}>Packed by</p>
          <div className={styles.logos}>
            {BACKERS.map((name) => (
              <div key={name} className={styles.logo}>
                {name}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.trust}>
          <p className={styles.trustLabel}>Backed by Trusted and Certified</p>
          <div className={styles.certGrid}>
            {CERTS.map((cert) => (
              <div key={cert} className={styles.certItem}>
                <div className={styles.orbit} aria-hidden>
                  <div className={styles.orbitCircle} />
                </div>
                <div className={styles.certInner}>
                  <span className={styles.certText}>{cert}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

