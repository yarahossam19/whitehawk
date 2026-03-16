import Image from "next/image";
import { BriefcaseBusiness, TrendingUp, Zap } from "lucide-react";
import styles from "./WhyPartnerSection.module.scss";

const DASHBOARD = "/assets/imgs/new-dashboard.png";

const dashboardSizes = "(max-width: 900px) 100vw, 55vw";

export function WhyPartnerSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.title}>Why Partner with White Hawk</h2>
          <p className={styles.subtitle}>
            One platform. Many opportunities. Transform how you deliver cybersecurity services.
          </p>
        </header>

        <div className={styles.bento}>
          {/* 1 — clipped preview; hover lifts + crossfade luminosity → full color */}
          <article className={styles.cardHero}>
            <div className={styles.cardHeroCopy}>
              <h3 className={styles.cardHeroTitle}>One Platform. Many Opportunities.</h3>
              <p className={styles.cardHeroText}>
                A unified cybersecurity management platform that partners can sell, implement, and build
                services around.
              </p>
            </div>
            <div className={styles.dashboardFrame}>
              <div className={styles.dashboardImageWrap}>
                {/* Base: luminosity (smooth fade out on hover) */}
                <Image
                  src={DASHBOARD}
                  alt=""
                  width={1200}
                  height={800}
                  className={styles.dashboardLayerLuma}
                  sizes={dashboardSizes}
                  aria-hidden
                  loading="lazy"
                  fetchPriority="low"
                />
                <Image
                  src={DASHBOARD}
                  alt="White Hawk platform dashboard preview"
                  width={1200}
                  height={800}
                  className={styles.dashboardLayerColor}
                  sizes={dashboardSizes}
                  loading="lazy"
                  fetchPriority="low"
                />
              </div>
            </div>
          </article>

          {/* 2 — Not Just a Tool */}
          <article className={styles.cardTall}>
            <div className={styles.iconWrap} aria-hidden>
              <Zap className={styles.iconLg} strokeWidth={1.75} />
            </div>
            <h3 className={styles.cardTitle}>Not Just a Tool</h3>
            <p className={styles.cardBody}>
              A cybersecurity management platform that partners can sell, implement, and build services
              around. Differentiate your offering with enterprise-grade capabilities.
            </p>
          </article>

          {/* 3 — Recurring Revenue */}
          <article className={styles.cardCompact}>
            <div className={styles.iconWrapSm} aria-hidden>
              <TrendingUp className={styles.iconSm} strokeWidth={1.75} />
            </div>
            <div className={styles.cardCompactCopy}>
              <h4 className={styles.cardCompactTitle}>Recurring Revenue</h4>
              <p className={styles.cardCompactText}>
                Generate sustainable income streams with subscription-based licensing.
              </p>
            </div>
          </article>

          {/* 4 — Faster Delivery */}
          <article className={styles.cardCompact}>
            <div className={styles.iconWrapSm} aria-hidden>
              <Zap className={styles.iconSm} strokeWidth={1.75} />
            </div>
            <div className={styles.cardCompactCopy}>
              <h4 className={styles.cardCompactTitle}>Faster Delivery</h4>
              <p className={styles.cardCompactText}>
                Streamlined workflows reduce project timelines and increase margins.
              </p>
            </div>
          </article>

          {/* 5 — Market Differentiation */}
          <article className={styles.cardCompact}>
            <div className={styles.iconWrapSm} aria-hidden>
              <BriefcaseBusiness className={styles.iconSm} strokeWidth={1.75} />
            </div>
            <div className={styles.cardCompactCopy}>
              <h4 className={styles.cardCompactTitle}>Market Differentiation</h4>
              <p className={styles.cardCompactText}>
                Stand out in competitive markets with comprehensive capabilities.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
