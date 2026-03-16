"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./OptimizedDashboardVideo.module.scss";

const VIDEO_SRC = "/assets/videos/dashboard.webm";

/**
 * Loads the video file only after the block is near the viewport (IntersectionObserver).
 * Uses preload="none" until play so the MP4 is not downloaded on page load.
 */
export function OptimizedDashboardVideo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { rootMargin: "120px", threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onPlayClick = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setPlaying(true);
    v.play().catch(() => setError(true));
  }, []);

  return (
    <div ref={wrapRef} className={styles.wrap}>
      {inView ? (
        <video
          ref={videoRef}
          className={styles.video}
          src={VIDEO_SRC}
          preload="none"
          playsInline
          muted
          loop
          controls={playing}
          aria-label="Platform dashboard preview"
        />
      ) : (
        <div className={styles.skeleton} aria-hidden />
      )}
      {inView && !playing && !error && (
        <button
          type="button"
          className={styles.playOverlay}
          onClick={onPlayClick}
          aria-label="Play dashboard video"
        >
          <span className={styles.playIcon} aria-hidden />
          <span className={styles.playLabel}>Play preview</span>
        </button>
      )}
      {error && (
        <p className={styles.error} role="status">
          Video could not be played.
        </p>
      )}
    </div>
  );
}
