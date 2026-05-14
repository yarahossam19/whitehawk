"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./_sections/HeroSection/HeroSection.module.scss";

const VIDEO_SRC = "/assets/videos/V-website%20Hero%202.webm";

export function HeroVideoIsland() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const tryPlay = useCallback(() => {
    videoRef.current?.play().catch(() => {
      /* autoplay blocked — fine */
    });
  }, []);

  const pauseVideo = useCallback(() => {
    videoRef.current?.pause();
  }, []);

  // Kick off playback as soon as the browser has enough data. The video's
  // `src` is set directly in JSX with `preload="auto"`, so the download
  // starts at mount instead of waiting for IntersectionObserver.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onReady = () => {
      setVideoReady(true);
      tryPlay();
    };
    v.addEventListener("loadeddata", onReady);
    // If the browser already buffered enough before this listener attached
    // (cached, fast network), kick off playback now.
    if (v.readyState >= 2) onReady();
    return () => v.removeEventListener("loadeddata", onReady);
  }, [tryPlay]);

  // Pause when the hero scrolls out of the viewport to save battery; resume
  // when it scrolls back in. No longer responsible for attaching src.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || reducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) tryPlay();
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
        {reducedMotion ? null : (
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
