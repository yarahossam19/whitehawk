"use client";
 
import { useEffect, useMemo, useRef, useState } from "react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useDemoModal } from "@/contexts/DemoModalContext";
import { useFreeTrialModal } from "@/contexts/FreeTrialModalContext";
import styles from "./HeroSection.module.scss";
export function HeroSection() {
  const { openDemoModal } = useDemoModal();
  const { openFreeTrialModal } = useFreeTrialModal();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { root: null, threshold: 0.15, rootMargin: "200px 0px 200px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroLeft}>
          <h1 className={styles.heroTitle}>
            Manage your entire cybersecurity program
            <br />
            in one platform
          </h1>
          <p className={styles.heroSubtitle}>
            Automate vulnerability management, streamline compliance, and proactively detect threats across your organization – all in one integrated platform
          </p>
          <div className={styles.heroButtons}>
            <PrimaryButton title="Get Demo" variant="primary" onClick={openDemoModal} className={styles.heroButton} />
            <PrimaryButton title="Start free trial" variant="secondary" onClick={openFreeTrialModal} className={styles.heroButton} />
          </div>
        </div>
        <div className={styles.heroRight}>
          <HeroRightVideo isActive={isActive} prefersReducedMotion={prefersReducedMotion} />
        </div>
      </div>
    </section>
  );
}

function HeroRightVideo({
  isActive,
  prefersReducedMotion,
}: {
  isActive: boolean;
  prefersReducedMotion: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const src = isActive && !prefersReducedMotion ? "/assets/videos/VwebsiteHero2.webm" : undefined;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (!isActive || prefersReducedMotion) {
      v.pause();
      return;
    }

    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }, [isActive, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className={styles.cloudWrap} aria-hidden>
        <svg
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.cloudSvg}
        >
          <defs>
            <linearGradient id="hero-cloud-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="10%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#b8e0f0" />
              <stop offset="70%" stopColor="#50a0c0" stopOpacity="0.6" />
              <stop offset="90%" stopColor="#003858" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#002439" stopOpacity="0" />
            </linearGradient>
            <filter id="hero-cloud-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
              </feMerge>
            </filter>
          </defs>
          <path
            className={styles.cloud}
            fill="url(#hero-cloud-gradient)"
            filter="url(#hero-cloud-blur)"
            d="M0,200 C80,95 220,175 380,110 C520,165 640,70 780,155 C920,85 1020,170 1150,120 L1200,200 L0,200 Z"
          />
          <path
            className={`${styles.cloud} ${styles.cloudLayer2}`}
            fill="url(#hero-cloud-gradient)"
            filter="url(#hero-cloud-blur)"
            d="M0,200 C120,145 280,115 420,165 C580,95 720,150 860,105 C980,160 1080,90 1200,200 L1200,200 L0,200 Z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={styles.heroVideoWrap} aria-hidden>
      <video
        ref={videoRef}
        className={styles.heroVideo}
        muted
        loop
        playsInline
        preload={isActive ? "metadata" : "none"}
      >
        {src ? <source src={src} type="video/webm" /> : null}
      </video>
    </div>
  );
}
