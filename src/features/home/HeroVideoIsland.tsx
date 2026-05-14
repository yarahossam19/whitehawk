"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./_sections/HeroSection/HeroSection.module.scss";

const VIDEO_SRC = "/assets/videos/V-website%20Hero%202.webm";

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
  const [videoReady, setVideoReady] = useState(false);
  // useSyncExternalStore: SSR-safe (server snapshot → false), subscribes to changes automatically
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

  // Reveal once the browser has enough data. Effect intentionally runs once —
  // videoReady is NOT in the dep array so the cleanup never cancels the fallback timer.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      clearTimeout(timer);
      setVideoReady(true);
      tryPlay();
    };

    // Already buffered (cached page, fast network)
    if (v.readyState >= 2) {
      reveal();
      return;
    }

    v.addEventListener("loadeddata", reveal, { once: true });
    v.addEventListener("canplay", reveal, { once: true });
    // Make container visible even if the video fails to load
    v.addEventListener("error", reveal, { once: true });

    // Hard fallback: show the container regardless after 3 s
    const timer = setTimeout(reveal, 3000);

    return () => {
      clearTimeout(timer);
      v.removeEventListener("loadeddata", reveal);
      v.removeEventListener("canplay", reveal);
      v.removeEventListener("error", reveal);
    };
  }, [tryPlay]); // stable ref — runs exactly once after mount

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
            className={`${styles.heroVideo} ${videoReady ? styles.heroVideoReady : ""}`}
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
