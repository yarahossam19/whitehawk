"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./_sections/HeroSection/HeroSection.module.scss";

const VIDEO_SRC = "/assets/videos/VwebsiteHero2.webm";

const MQ_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(MQ_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(MQ_QUERY).matches;
}

export function HeroVideoIsland() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );

  const tryPlay = useCallback(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const pauseVideo = useCallback(() => {
    videoRef.current?.pause();
  }, []);

  // Pause when scrolled out of view to save battery
  useEffect(() => {
    const el = rootRef.current;
    if (!el || reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) tryPlay();
        else pauseVideo();
      },
      { root: null, rootMargin: "80px 0px 0px 0px", threshold: 0 }
    );

    
    observer.observe(el);
    return () => {
      observer.disconnect();
      pauseVideo();
    };
  }, [pauseVideo, tryPlay, reducedMotion]);

  return (
    <div ref={rootRef} className={styles.heroRight}>
      <div className={styles.heroVideoWrap} aria-hidden>
        <div className={styles.heroVideoStill} />
        {!reducedMotion && (
          <video
            ref={videoRef}
            className={styles.heroVideo}
            src={VIDEO_SRC}
            muted
            playsInline
            loop
            autoPlay
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload noplaybackrate"
          />
        )}
      </div>
    </div>
  );
}
