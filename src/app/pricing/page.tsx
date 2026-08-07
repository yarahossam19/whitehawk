import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Fragment } from "react";
import { SiteLayout } from "@/components/site/SiteLayout/SiteLayout";
import { HeroWordmark } from "@/components/site/HeroWordmark";
import { Badge } from "@/components/site/ui/Badge/Badge";
import { Button } from "@/components/site/ui/Button/Button";
import { Card } from "@/components/site/ui/Card/Card";
import { Check } from "@/components/site/ui/Check/Check";
import { CTABand } from "@/components/site/ui/CTABand/CTABand";
import { FAQSection } from "@/components/site/ui/FAQSection/FAQSection";
import { LogoStrip } from "@/components/site/ui/LogoStrip/LogoStrip";
import { Section } from "@/components/site/ui/Section/Section";
import { SectionHeader } from "@/components/site/ui/SectionHeader/SectionHeader";
import { Lock, ShieldCheck, RotateCw, Timer } from "lucide-react";
import styles from "./page.module.scss";

export const metadata: Metadata = pageMetadata({
  path: "/pricing",
  title: "Pricing — WhiteHawk",
  description:
    "Transparent plans tailored to your program. Standard, Pro and Enterprise — book a demo for a personalized quote.",
});

const tiers = [
  {
    name: "Standard",
    tagline: "Foundational visibility.",
    scale: "Up to 25 apps · 500 identities",
    cta: { label: "Book a Demo", variant: "ghost" as const },
    highlight: false,
    included: [
      "Unified asset inventory",
      "Baseline defensive detections",
      "Automated pentest scans",
      "SOC 2 evidence pack",
      "Community support",
    ],
    locked: ["Cross-app correlation", "Automated remediation"],
    header: "Includes",
  },
  {
    name: "Pro",
    tagline: "Advanced detection & remediation.",
    scale: "Up to 150 apps · 5,000 identities",
    cta: { label: "Book a Demo", variant: "primary" as const },
    highlight: true,
    included: [
      "Everything in Standard",
      "Cross-module correlation",
      "Human-led pentests (quarterly)",
      "SOAR playbooks",
      "All GRC frameworks",
      "24/5 support",
    ],
    header: "Everything in Standard, plus",
  },
  {
    name: "Enterprise",
    tagline: "Maximum control & support.",
    scale: "Unlimited · Custom SLAs",
    cta: { label: "Contact sales", variant: "ghost" as const },
    highlight: false,
    included: [
      "Everything in Pro",
      "Single-tenant / self-hosted",
      "Dedicated CSM",
      "24/7 managed detection & response",
      "Custom integrations",
      "Regional data residency",
    ],
    header: "Everything in Pro, plus",
  },
] as const;

const matrix = [
  {
    cat: "Visibility",
    rows: [
      ["SaaS app connections", "Up to 25", "Up to 150", "Unlimited"],
      ["Real-time log ingestion", "✓", "✓", "✓"],
      ["Cross-app correlation", "○", "✓", "✓"],
      ["Log retention", "90 days", "1 year", "5 years"],
    ],
  },
  {
    cat: "Detection & Response",
    rows: [
      ["Behavioral baseline modeling", "✓", "✓", "Advanced"],
      ["Automated remediation", "○", "✓", "✓"],
      ["Human-led pentests", "—", "Quarterly", "Monthly"],
    ],
  },
  {
    cat: "Compliance & GRC",
    rows: [
      ["Framework mapping", "SOC 2", "SOC 2, ISO, PCI", "Any"],
      ["Continuous evidence", "✓", "✓", "✓"],
      ["Auditor portal", "—", "✓", "✓"],
    ],
  },
  {
    cat: "Support",
    rows: [
      ["Onboarding", "Self-serve", "Guided", "White-glove"],
      ["Support hours", "Business", "24/5", "24/7"],
      ["Dedicated CSM", "—", "—", "✓"],
    ],
  },
];

const trust = [
  { icon: Lock, text: "SOC 2 Type II" },
  { icon: ShieldCheck, text: "AES-256 + TLS 1.3" },
  { icon: Lock, text: "GDPR & HIPAA" },
  { icon: RotateCw, text: "99.9% Uptime SLA" },
  { icon: Timer, text: "Deploys < 30 min" },
];

const faqs = [
  {
    q: "How does pricing scale?",
    a: "We charge based on connected apps and monitored identities. No surprise usage fees.",
  },
  {
    q: "Do you offer annual discounts?",
    a: "Yes, 15% off for annual commitments on Pro and above.",
  },
  {
    q: "Is there a free trial?",
    a: "We offer a 14-day working POC with your data, guided by a security engineer.",
  },
  { q: "Can I switch tiers later?", a: "Yes, up or down at any renewal. Data and users stay put." },
];

export default function PricingPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className={styles.hero}>
        <HeroWordmark tone="dark" className={styles.heroWordmark} />
        <div className={styles.heroInner}>
          <div className={styles.heroEyebrow}>Pricing</div>
          <h1 className={`${styles.heroTitle} animate-text-reveal`}>
            Plans built for the way security teams actually buy.
          </h1>
          <p className={styles.heroDescription}>
            Pricing is tailored to your program — no public rate card, no seat-count trap. Every
            plan includes the whole platform.
          </p>
        </div>
      </section>

      <LogoStrip label="Trusted by security teams at" />

      {/* Tier cards */}
      <Section>
        <div className={styles.ctaBlock}>
          <Button as="link" to="/contact" variant="accent" size="lg">
            Get personalized pricing
          </Button>
          <div className={styles.ctaNote}>
            See what's in each plan — get a quote tailored to your program.
          </div>
        </div>
        <div className={styles.tiersGrid}>
          {tiers.map((t, i) => (
            <div
              key={t.name}
              className={`reveal lift ${styles.tierCard} ${t.highlight ? styles.tierCardHighlight : ""}`}
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
            >
              {t.highlight && (
                <div className={styles.tierBadge}>
                  <Badge tone="dark">★ Most popular</Badge>
                </div>
              )}
              <div className={styles.tierSymbol}>
                {t.name === "Enterprise" ? "◆" : t.name === "Pro" ? "◇" : "○"}
              </div>
              <div className={styles.tierName}>{t.name}</div>
              <div className={styles.tierTagline}>{t.tagline}</div>
              <div className={styles.tierScale}>{t.scale}</div>
              <Button as="link" to="/contact" variant={t.cta.variant} className={styles.tierButton}>
                {t.cta.label}
              </Button>
              <div className={styles.tierIncludesLabel}>{t.header}</div>
              <div className={styles.tierList}>
                {t.included.map((f) => (
                  <Check key={f}>{f}</Check>
                ))}
                {"locked" in t &&
                  t.locked?.map((f) => (
                    <div key={f} className={styles.tierLocked}>
                      <span className={styles.tierLockedIcon}>○</span>
                      <span>{f}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Trust bar */}
      <div className={styles.trustBar}>
        <div className={styles.trustInner}>
          {trust.map((t, i) => (
            <div
              key={i}
              className={`reveal ${styles.trustItem}`}
              style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
            >
              <t.icon size={14} />
              {t.text}
            </div>
          ))}
        </div>
      </div>

      {/* Comparison */}
      <Section>
        <SectionHeader eyebrow="Compare plans" title="Every capability, side by side" />
        <div className={`reveal ${styles.compareBlock}`}>
          {/* Scrollable region rather than a squeezed table — focusable so the
              matrix is reachable by keyboard on narrow viewports. */}
          <div
            className={styles.compareWrap}
            role="region"
            aria-label="Plan comparison"
            tabIndex={0}
          >
            <table className={styles.compareTable}>
              <thead>
                <tr className={styles.compareHeadRow}>
                  <th className={styles.compareHeadCell}>Feature</th>
                  <th className={styles.compareHeadCellCenter}>Standard</th>
                  <th className={styles.compareHeadCellCenter}>
                    Pro <span className={styles.popularTag}>Popular</span>
                  </th>
                  <th className={styles.compareHeadCellCenter}>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {matrix.map((cat) => (
                  <Fragment key={cat.cat}>
                    <tr className={styles.compareCatRow}>
                      <td colSpan={4} className={styles.compareCatCell}>
                        <span className={styles.compareCatLabel}>{cat.cat}</span>
                      </td>
                    </tr>
                    {cat.rows.map((r, i) => (
                      <tr key={`${cat.cat}-${i}`} className={styles.compareRow}>
                        <td className={styles.compareCell}>{r[0]}</td>
                        <td className={styles.compareCellCenter}>{r[1]}</td>
                        <td className={styles.compareCellCenter}>{r[2]}</td>
                        <td className={styles.compareCellCenter}>{r[3]}</td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
                <tr className={styles.compareFooterRow}>
                  <td className={styles.compareFooterLabel}>Ready to get started?</td>
                  <td className={styles.compareFooterCell}>
                    <Button as="link" to="/contact" variant="ghost" size="sm">
                      Get Standard
                    </Button>
                  </td>
                  <td className={styles.compareFooterCell}>
                    <Button as="link" to="/contact" variant="primary" size="sm">
                      Start with Pro
                    </Button>
                  </td>
                  <td className={styles.compareFooterCell}>
                    <Button as="link" to="/contact" variant="ghost" size="sm">
                      Contact sales
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={styles.compareHint}>Scroll sideways to compare every plan</p>
        </div>
      </Section>

      {/* ROI band */}
      <section className={styles.roi}>
        <div className={styles.roiInner}>
          <div className={`reveal ${styles.roiEyebrow}`}>Security ROI</div>
          <h2 className={`reveal ${styles.roiTitle}`}>
            Teams on WhiteHawk ship faster and pay less
          </h2>
          <div className={styles.statsGrid}>
            {[
              { n: "62%", l: "avg. reduction in tool spend" },
              { n: "8×", l: "faster audit prep" },
              { n: "< 4h", l: "median MTTR on critical alerts" },
            ].map((s, i) => (
              <div
                key={s.n}
                className={`reveal ${styles.statItem}`}
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                <div className={styles.statNumber}>{s.n}</div>
                <div className={styles.statLabel}>{s.l}</div>
              </div>
            ))}
          </div>
          <Card className={styles.roiCard}>
            <div className={styles.roiQuote}>
              “Consolidating on WhiteHawk let us cut three vendors and reinvest the budget in
              headcount. Auditor called our evidence pack ‘the cleanest they'd seen this year’.”
            </div>
            <div className={styles.roiAuthor}>
              <div className={styles.roiAvatar} />
              <div>
                <div className={styles.roiAuthorName}>Marcus Ortega</div>
                <div className={styles.roiAuthorTitle}>CISO, Contoso Health</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <Section>
        <FAQSection
          eyebrow="Billing & contracts"
          heading="Pricing FAQ"
          body="Still stuck? A security engineer will answer within one business day."
          items={faqs}
        />
      </Section>

      <CTABand
        title="Get a quote tailored to your program"
        primary={{ label: "Book a Demo", to: "/contact" }}
      />
    </SiteLayout>
  );
}
