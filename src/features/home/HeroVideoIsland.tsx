"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./_sections/HeroSection/HeroSection.module.scss";

const VIDEO_SRC = "/assets/videos/V-website%20Hero%202.webm";

export function HeroVideoIsland() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const srcAttachedRef = useRef(false);
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

  const attachSrcAndPlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    if (!srcAttachedRef.current) {
      srcAttachedRef.current = true;
      setVideoReady(false);
      el.src = VIDEO_SRC;
      el.preload = "auto";
      el.load();
    }
    el.play().catch(() => {
      /* autoplay blocked — fine */
    });
  }, []);

  const pauseVideo = useCallback(() => {
    videoRef.current?.pause();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onReady = () => setVideoReady(true);
    v.addEventListener("loadeddata", onReady);
    return () => v.removeEventListener("loadeddata", onReady);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    if (reducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) attachSrcAndPlay();
        else pauseVideo();
      },
      { root: null, rootMargin: "80px 0px 0px 0px", threshold: 0 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      pauseVideo();
    };
  }, [attachSrcAndPlay, pauseVideo, reducedMotion]);

  return (
    <div ref={rootRef} className={styles.heroRight}>
      <div className={styles.heroVideoWrap} aria-hidden>
        <div className={styles.heroVideoStill} />
        {reducedMotion ? null : (
          <video
            ref={videoRef}
            className={`${styles.heroVideo} ${videoReady ? styles.heroVideoReady : ""}`}
            muted
            playsInline
            loop
            preload="none"
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload noplaybackrate"
          />
        )}
      </div>
    </div>
  );
}
