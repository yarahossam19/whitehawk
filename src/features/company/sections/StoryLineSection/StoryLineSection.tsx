"use client";

import styles from "./StoryLineSection.module.scss";
import { useInView } from "@/hooks/useInView";

export function StoryLineSection() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className={styles.section}>
      <div className={styles.inner} ref={ref}>
        <div className={styles.lineWrap}>
          <div className={`${styles.line} ${inView ? styles.lineVisible : ""}`} />
        </div>
        <div className={styles.columns}>
          <div className={styles.left}>
            <div className={styles.card}>
              <h3 className={styles.cardHeading}>Too many disconnected tools?</h3>
              <p>
                We saw security teams drowning in alerts from disparate systems. The noise was overwhelming.
                The context was missing.{" "}
                <strong>The White Hawk Platform</strong> was built to silence the noise and amplify the signal.
              </p>
              <h4 className={styles.cardSubHeading}>A new standard.</h4>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.spec}>
              <span className={styles.specLabel}>SPEC 01: CORE MISSION</span>
              <div className={styles.specCard}>
                <p>
                  We are redefining the future of cybersecurity by transforming fragmented services into a{" "}
                  <strong>unified, intelligent product.</strong>
                </p>
                <p>
                  Our mission is simple: empower every organization—regardless of size or industry—to build, manage,
                  and scale a world-class cybersecurity program with <strong>clarity, speed, and confidence.</strong>
                </p>
              </div>
            </div>
            <div className={styles.spec}>
              <span className={styles.specLabel}>SPEC 02: GLOBAL VISION</span>
              <div className={styles.specCard}>
                <p>
                  We aim to build the{" "}
                  <strong>first world-class Arab cybersecurity product</strong> – designed to empower every Arab
                  organization with advanced, accessible protection, and proudly export our innovation to serve global
                  enterprises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

