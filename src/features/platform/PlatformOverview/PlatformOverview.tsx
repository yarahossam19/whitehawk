import Link from "next/link";
import { FaqsSection } from "../FaqsSection/FaqsSection";
import type { PlatformType } from "../config";
import styles from "./PlatformOverview.module.scss";

const PLATFORM_CARDS: {
  number: number;
  slug: PlatformType;
  badge: string;
  title: string;
  description: string;
}[] = [
  { number: 4, slug: "asset-management", badge: "ASSETS", title: "Assets management", description: "Map exposure across assets" },
  { number: 3, slug: "grc", badge: "GRC", title: "GRC", description: "Govern risk and evidence" },
  { number: 2, slug: "defensive", badge: "DEFENSIVE", title: "Defensive", description: "Detect, respond, harden" },
  { number: 1, slug: "offensive", badge: "OFFENSIVE", title: "Offensive", description: "Validate real-world risk" },
];

const OVERVIEW_FAQS = [
  {
    question: "Which WhiteHawk service should we start with?",
    answer: "Start with the pillar that matches the clearest business risk: Offensive for exposure validation, Defensive for detection and response, GRC for compliance evidence, and Asset Management for visibility gaps.",
  },
  {
    question: "Can the four services work together?",
    answer: "Yes. Asset Management defines what needs protection, Offensive validates exploitable risk, Defensive monitors and responds, and GRC turns the work into auditable controls and reports.",
  },
  {
    question: "Are these services continuous or one-time engagements?",
    answer: "They can be delivered as focused assessments, but the strongest value comes from continuous operation inside WhiteHawk so findings, ownership, and remediation stay connected.",
  },
  {
    question: "How do the cards connect to the service pages?",
    answer: "Each card represents a dedicated service page and reuses that page hero image so users can recognize the same service family before opening the deeper details.",
  },
];

function heroImgSrc(type: PlatformType): string {
  const dir = type === "asset-management" ? "/assets/imgs/assets" : `/assets/imgs/${type}`;
  return `${dir}/hero.png`;
}

export function PlatformOverview() {
  return (
    <main className={styles.main}>
      {/* Page header */}
      <div className={styles.headerWrap}>
        <div className={styles.headerGrid}>
          <div className={styles.headerLabel}>
            <span>PLATFORM</span>
            <span>SERVICES</span>
          </div>
          <h1 className={styles.headerTitle}>Services</h1>
          <p className={styles.headerDesc}>
            Four WhiteHawk service pillars for testing exposure, strengthening
            defenses, governing compliance, and keeping every asset visible.
          </p>
        </div>
        <hr className={styles.headerDivider} />
      </div>

      {/* Cards grid */}
      <section className={styles.cardsWrap} aria-label="Platform services">
        <div className={styles.cardsGrid}>
          {PLATFORM_CARDS.map((card) => (
            <Link
              key={card.slug}
              href={`/platform/${card.slug}`}
              className={styles.card}
              aria-label={`${card.title} — ${card.description}`}
            >
              <span className={styles.cardOverlay} aria-hidden />
              <span className={styles.cardNum} aria-hidden>{card.number}</span>

              <div
                className={styles.cardImgWrap}
                style={{ backgroundImage: `url(${heroImgSrc(card.slug)})` }}
                aria-hidden
              />

              <div className={styles.cardFooter}>
                <span className={styles.cardBadge}>{card.badge}</span>
                <div className={styles.cardBottom}>
                  <div>
                    <p className={styles.cardTitle}>{card.title}</p>
                    <p className={styles.cardDesc}>{card.description}</p>
                  </div>
                  <span className={styles.cardArrow} aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <FaqsSection
        sectionTitle="Frequently Asked Questions"
        sectionSubtitle="Quick answers about choosing and combining WhiteHawk services."
        items={OVERVIEW_FAQS}
        defaultOpen={[1, 2, 3]}
      />
    </main>
  );
}
