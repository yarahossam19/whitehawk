"use client";

import Image from "next/image";
import styles from "./TrustSection.module.scss";

const CERTS = ["ISO 27001","SOC 2", "CREST", "GDPR" ];

const INVESTOR_ICONS = [3, 8,1,4,2,  5, 6].map((n) => ({
  src: `/assets/icons/investors/investor${n}.svg`,
  alt: `Backer ${n}`,
}));

export function TrustSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.packedBy}>
          <p className={styles.packedByLabel}>Backed by</p>
          <div className={styles.logos}>
            {INVESTOR_ICONS.map(({ src, alt }) => (
              <div key={src} className={styles.logo}>
                <Image
                  src={src}
                  alt={alt}
                  width={160}
                  height={48}
                  className={styles.logoImg}
                  loading="lazy"
                  decoding="async"
                />
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
