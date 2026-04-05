"use client";

import { useCallback, useEffect, useRef } from "react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useDemoModal } from "@/contexts/DemoModalContext";
import styles from "./PartnersHero.module.scss";

const VIDEO_SRC = "/assets/videos/wh-parteners.webm";

export function PartnersHero() {
  const { openDemoModal } = useDemoModal();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const srcAttachedRef = useRef(false);

  const attachSrcAndPlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (!srcAttachedRef.current) {
      srcAttachedRef.current = true;
      el.src = VIDEO_SRC;
      el.preload = "auto";
      el.load();
    }
    el.play().catch(() => {
      /* autoplay blocked — still fine when user interacts */
    });
  }, []);

  const pauseVideo = useCallback(() => {
    videoRef.current?.pause();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          attachSrcAndPlay();
        } else {
          pauseVideo();
        }
      },
      {
        root: null,
        // Start loading slightly before hero is fully on screen
        rootMargin: "80px 0px 0px 0px",
        threshold: 0,
      }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      pauseVideo();
    };
  }, [attachSrcAndPlay, pauseVideo]);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <div className={styles.cloudWrap} aria-hidden>
        <svg
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.cloudSvg}
        >
          <defs>
            <linearGradient id="partners-cloud-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
              {/* Match Home hero gradient, but bottom is light blue instead of white */}
              <stop offset="10%" stopColor="#9Ddaf2" />
              <stop offset="40%" stopColor="#b8e0f0" />
              <stop offset="70%" stopColor="#50a0c0" stopOpacity="0.6" />
              <stop offset="90%" stopColor="#003859" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#003858" stopOpacity="0" />
            </linearGradient>
            <filter id="partners-cloud-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
              </feMerge>
            </filter>
          </defs>
          <path
            className={styles.cloud}
            fill="url(#partners-cloud-gradient)"
            filter="url(#partners-cloud-blur)"
            d="M0,200 C80,95 220,175 380,110 C520,165 640,70 780,155 C920,85 1020,170 1150,120 L1200,200 L0,200 Z"
          />
          <path
            className={`${styles.cloud} ${styles.cloudLayer2}`}
            fill="url(#partners-cloud-gradient)"
            filter="url(#partners-cloud-blur)"
            d="M0,200 C120,145 280,115 420,165 C580,95 720,150 860,105 C980,160 1080,90 1200,200 L1200,200 L0,200 Z"
          />
        </svg>
      </div>
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 className={styles.title}>
            <span className={styles.titleLine}>Build Stronger</span>
            <span className={styles.titleLine}>Cybersecurity Together</span>
          </h1>
          <p className={styles.subtitle}>
            White Hawk partners with consultancies, system integrators, and MSSPs to deliver a
            unified platform for offensive, defensive, GRC, and asset visibility—so you scale
            without fragmenting your stack.
          </p>
          <PrimaryButton
            title="Become a Partner"
            variant="secondary"
            onClick={openDemoModal}
            className={styles.cta}
          />
        </div>
        <div className={styles.visual} aria-hidden>
          <div className={styles.visualGlow} />
          <div className={styles.videoShell}>
            {/* No src until hero is near viewport — avoids large download on partners route cold load */}
            <video
              ref={videoRef}
              className={styles.video}
              muted
              playsInline
              loop
              preload="none"
              disablePictureInPicture
              controlsList="nodownload noplaybackrate"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
