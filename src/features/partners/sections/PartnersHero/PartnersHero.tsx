"use client";

import { useCallback, useEffect, useRef } from "react";
import Aurora from "@/components/Aurora";
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
      <div className={styles.aurora} aria-hidden>
        <Aurora
          colorStops={["#003859", "#003859", "#E1E8EB"]}
          amplitude={0.5}
          blend={0.5}
        />
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
