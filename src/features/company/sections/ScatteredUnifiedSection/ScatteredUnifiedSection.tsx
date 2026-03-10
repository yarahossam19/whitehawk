"use client";

import { useRef, useState, useEffect } from "react";
import styles from "./ScatteredUnifiedSection.module.scss";

export function ScatteredUnifiedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // Section height is 200vh; transition runs over the first 100vh of scroll
      const scrollableHeight = viewportHeight;
      // When section top is at top of viewport, progress 0; when we've scrolled 100vh into section, progress 1
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      setProgress(p);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.stickyWrap}>
        <div
          className={styles.panelScattered}
          style={{ transform: `translateX(${-progress * 100}%)` }}
        >
          <h2 className={styles.title}>Scattered. Unclear.</h2>
          <p className={styles.subtitle}>
            Teams were forced to manage security across dozens of tools.
          </p>
          <div className={styles.floatingSquares} aria-hidden>
            {Array.from({ length: 10 }).map((_, index) => (
              <span key={index} className={styles.square} />
            ))}
          </div>
        </div>
        <div
          className={styles.panelUnified}
          style={{ transform: `translateX(${(1 - progress) * 100}%)` }}
        >
          <div className={styles.unifiedCard}>
            <div className={styles.iconFrame} aria-hidden>
              <div className={styles.iconInner} />
            </div>
            <h3 className={styles.rightTitle}>Unified Structure.</h3>
            <p className={styles.rightSubtitle}>
              White Hawk brings everything together into one coherent platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
