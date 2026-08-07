"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import styles from "./HomeVideo.module.scss";

/**
 * The home page's platform demo, loaded on demand.
 *
 * The clip is ~9 MB, so the <video> element does not exist until the visitor
 * asks for it: the first paint is the branded gradient below (a "facade"),
 * which costs nothing, and the browser never sees the media URL. `preload` is
 * still "none" as a second line of defence, with playback kicked off from the
 * click handler — the click is the user gesture that lets a video with audio
 * autoplay, so nothing is muted.
 *
 * Deliberately NOT a poster image: a real poster frame would be another
 * 50–150 KB on every home page visit to replace a gradient that already looks
 * intentional, and it would change how the section reads.
 */
export function HomeVideo({
  src = "/videos/home-video.webm",
  caption = "platform demo — 2:03",
}: {
  src?: string;
  caption?: string;
}) {
  const [active, setActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className={styles.frame}>
      <div className={styles.aspect}>
        {active ? (
          <video
            ref={videoRef}
            className={styles.video}
            src={src}
            controls
            playsInline
            preload="none"
            // Autoplay is safe here: mounting only happens from a real click,
            // which satisfies the gesture requirement for audible playback.
            autoPlay
            onCanPlay={() => videoRef.current?.play().catch(() => {})}
          />
        ) : (
          <>
            <div aria-hidden className={styles.glow} />
            <button
              type="button"
              aria-label="Play platform demo"
              onClick={() => setActive(true)}
              className={styles.playWrap}
            >
              <span className={styles.playButton}>
                <Play className={styles.playIcon} size={28} fill="currentColor" />
              </span>
            </button>
            <div aria-hidden className={styles.caption}>
              ▶ {caption}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
