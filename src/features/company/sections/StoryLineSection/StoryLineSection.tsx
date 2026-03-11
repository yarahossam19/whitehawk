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

        {/* First section: on top of the line, centered */}
        <div className={styles.topBlock}>
          <h2 className={styles.topHeading}>Too many disconnected tools?</h2>
          <div className={styles.topCard}>
            <p className={styles.topCardP}>
              We saw security teams drowning in alerts from disparate systems. The noise was overwhelming. The context was missing.
            </p>
            <p className={styles.topCardP}>
              <strong>The White Hawk Platform</strong> was built to silence the noise and amplify the signal.
            </p>
          </div>
          <h3 className={styles.topSubHeading}>A new standard.</h3>
        </div>

        <div className={styles.sideRow}>
          {/* Left of the line: SPEC 01 Core Mission */}
          <div className={`${styles.sideBlock} ${styles.leftBlock} ${inView ? styles.revealLeft : ""}`}>
            <span className={styles.specLabel}>SPEC 01: CORE MISSION</span>
            <div className={styles.cornerL} aria-hidden />
            <div className={styles.specContent}>
              <p>
                We are redefining the future of cybersecurity by transforming fragmented services into a{" "}
                <strong>unified, intelligent product.</strong>
              </p>
              <p>
                Our mission is simple: empower every organization—regardless of size or industry—to build, manage, and scale a world-class cybersecurity program with <strong>clarity, speed, and confidence.</strong>
              </p>
            </div>
          </div>

          {/* Right of the line: SPEC 02 Global Vision */}
          <div className={`${styles.sideBlock} ${styles.rightBlock} ${inView ? styles.revealRight : ""}`}>
          <span className={styles.specLabel}>SPEC 02: GLOBAL VISION</span>
          <div className={styles.specContent}>
            <p className={styles.visionIntro}>We aim to build the</p>
            <p className={styles.visionHighlight}>first world-class Arab cybersecurity product</p>
            <p className={styles.visionDash}>—</p>
            <p>
              designed to empower every Arab organization with advanced, accessible protection, and proudly export our innovation to serve global enterprises.
            </p>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
