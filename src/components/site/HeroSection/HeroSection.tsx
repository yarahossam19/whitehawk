import type { ReactNode } from "react";
import { Hero3D, type Hero3DVariant } from "../Hero3D";
import { HeroParticles } from "../HeroParticles";
import styles from "./HeroSection.module.scss";

interface HeroSectionProps {
  variant: Hero3DVariant;
  eyebrow?: string;
  title: ReactNode;
  description: string;
  actions?: ReactNode;
  /** "dark" (navy, default — home) or "light" (module pages) */
  theme?: "dark" | "light";
  /** Ambient particle mark behind the dark hero (home page only). */
  particles?: boolean;
}

/**
 * Hero band with a 3D Three.js scene on the right.
 * Dark theme = navy home hero. Light theme = module pages, with a slow
 * vertical "scanner" beam sweeping across a faint drifting dot grid —
 * evokes precision instrumentation without competing with the 3D scene.
 */
export function HeroSection({
  variant,
  eyebrow,
  title,
  description,
  actions,
  theme = "dark",
  particles = false,
}: HeroSectionProps) {
  if (theme === "light") {
    return (
      <section className={styles.light}>
        {/* Faint drifting dot grid — precision-instrument feel */}
        <div aria-hidden className={`${styles.dotGrid} animate-grid`} />

        {/* Vertical scanner beam — slow horizontal sweep */}
        <div
          aria-hidden
          className={`${styles.scanBeam} animate-scan ${variant === "offensive" ? styles.scanBeamOffensive : styles.scanBeamDefault}`}
        />

        {/* Soft top-right glow, static — adds depth without motion clutter */}
        <div aria-hidden className={styles.glow} />

        {/* Bottom hairline */}
        <div aria-hidden className={styles.hairline} />

        <div className={styles.inner}>
          <div className={styles.textCol}>
            {eyebrow && (
              <div className={`${styles.eyebrowPill} animate-fade-up`}>
                <span className={`${styles.eyebrowDot} animate-pulse-dot`} />
                {eyebrow}
              </div>
            )}
            <h1 className={`${styles.title} animate-text-reveal delay-100`}>{title}</h1>
            <p className={`${styles.description} animate-fade-up delay-200`}>{description}</p>
            {actions && <div className={`${styles.actions} animate-fade-up delay-300`}>{actions}</div>}
          </div>
          <div className={`${styles.visual3d} animate-fade-in delay-200`}>
            <Hero3D variant={variant} />
          </div>
        </div>
      </section>
    );
  }

  // Dark (default) — home hero
  return (
    <section className={styles.dark}>
      {particles && <HeroParticles className={styles.particles} />}
      <div aria-hidden className={`${styles.aurora} animate-aurora`} />
      <div aria-hidden className={styles.floatBlobs}>
        <div className={`${styles.floatBlobLeft} animate-float`} />
        <div className={`${styles.floatBlobRight} animate-float`} />
      </div>

      <div className={styles.inner}>
        <div className={styles.textCol}>
          {eyebrow && (
            <div className={`${styles.eyebrowPillDark} animate-fade-up`}>
              <span className={`${styles.eyebrowDot} animate-pulse-dot`} />
              {eyebrow}
            </div>
          )}
          <h1 className={`${styles.titleDark} animate-text-reveal delay-100`}>{title}</h1>
          <p className={`${styles.descriptionDark} animate-fade-up delay-200`}>{description}</p>
          {actions && <div className={`${styles.actions} animate-fade-up delay-300`}>{actions}</div>}
        </div>
        <div className={`${styles.visual3d} animate-fade-in delay-200`}>
          <Hero3D variant={variant} />
        </div>
      </div>
    </section>
  );
}
