import ReactDOM from "react-dom";
import { HeroButtons } from "./_sections/HeroSection/HeroInteractive";
import { HeroVideoIsland } from "./HeroVideoIsland";
import styles from "./_sections/HeroSection/HeroSection.module.scss";

/**
 * Server-rendered copy + cloud so HTML paints immediately (mobile LCP).
 * Buttons + diagram are small client islands.
 */
export function HeroShell() {
  // Push the hero video into the document's preload list so the browser
  // starts fetching it alongside other critical resources, instead of
  // waiting for the React island to mount and the <video> element to
  // request its src.
  ReactDOM.preload("/assets/videos/VwebsiteHero2.webm", {
    as: "video",
    type: "video/webm",
    fetchPriority: "high",
  });

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroLeft}>
          <h1 className={styles.heroTitle}>
            The Cybersecurity System That Replaces
            <br />    
           Four Tools With <span style={{ color: "#ABE0FF" }}> One</span>
          </h1>
          <p className={styles.heroSubtitle}>
WhiteHawk is the AI-powered cybersecurity system that unifies offensive testing, defensive monitoring, asset management, and GRC into one cybersecurity platform. Built by WhiteGuard for banks, fintechs, healthcare networks, and critical infrastructure across MENA.          </p>
          <HeroButtons />
        </div>
        <HeroVideoIsland />
      </div>
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
    </section>
  );
}
