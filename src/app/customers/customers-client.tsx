"use client";

import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout/SiteLayout";
import { Bento } from "@/components/site/ui/Bento/Bento";
import { BentoTile } from "@/components/site/ui/BentoTile/BentoTile";
import { Button } from "@/components/site/ui/Button/Button";
import { CTABand } from "@/components/site/ui/CTABand/CTABand";
import { LogoStrip } from "@/components/site/ui/LogoStrip/LogoStrip";
import { Section } from "@/components/site/ui/Section/Section";
import { SectionHeader } from "@/components/site/ui/SectionHeader/SectionHeader";
import { ArrowUpRight, Quote } from "lucide-react";
import styles from "./customers-client.module.scss";

const filters = ["All", "Finance", "Healthcare", "Government", "Offensive", "Defensive"] as const;

type Story = {
  name: string;
  industry: (typeof filters)[number];
  tag: (typeof filters)[number];
  headline: string;
  metric: string;
  metricLabel: string;
};

const stories: Story[] = [
  { name: "Northwind Bank", industry: "Finance", tag: "Defensive", headline: "Cut mean-time-to-respond by 4×", metric: "4×", metricLabel: "faster MTTR" },
  { name: "Contoso Health", industry: "Healthcare", tag: "Defensive", headline: "Audit prep collapsed from six weeks to three days", metric: "92%", metricLabel: "faster audits" },
  { name: "Fabrikam Gov", industry: "Government", tag: "Offensive", headline: "Zero-to-one red team in a single quarter", metric: "1 Q", metricLabel: "0→1 red team" },
  { name: "Globex", industry: "Finance", tag: "Defensive", headline: "One console, three programs, same team", metric: "3", metricLabel: "programs unified" },
  { name: "Initech", industry: "Healthcare", tag: "Offensive", headline: "Weekly pentests without operator burnout", metric: "52", metricLabel: "pentests / year" },
  { name: "Acme Corp", industry: "Government", tag: "Offensive", headline: "FedRAMP evidence generated on demand", metric: "$480k", metricLabel: "annual savings" },
];

const stats = [
  { n: "300+", l: "security teams" },
  { n: "48", l: "countries" },
  { n: "62%", l: "avg. tool consolidation" },
  { n: "4×", l: "faster MTTR" },
];

export function CustomersClient() {
  const [f, setF] = useState<(typeof filters)[number]>("All");
  const visible = useMemo(
    () => (f === "All" ? stories : stories.filter((s) => s.industry === f || s.tag === f)),
    [f],
  );

  return (
    <SiteLayout>
      {/* Editorial hero */}
      <section className={styles.hero}>
        <div aria-hidden className={styles.dotGrid} />
        <div className={styles.heroInner}>
          <div className={styles.heroGrid}>
            <div className={styles.heroStatDesktop}>
              <div className={styles.eyebrow}>Customers</div>
              <div className={styles.bigNumber}>300+</div>
              <div className={styles.bigNumberLabel}>/ security teams</div>
            </div>
            <div className={styles.heroCopy}>
              <div className={styles.eyebrowMobile}>Customers</div>
              <h1 className={styles.title}>
                Real security teams. <span className={styles.titleAccent}>Real results.</span>
              </h1>
              <p className={styles.subtitle}>
                From regulated healthcare to global finance to public-sector security operations —
                here's what teams ship after standardizing on WhiteHawk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured — pull-quote hero */}
      <Section>
        <div className={styles.featuredGrid}>
          <div className={styles.quoteCard}>
            <div aria-hidden className={styles.quoteGlow} />
            <div className={styles.quoteContent}>
              <div className={styles.badgeRow}>
                <span className={styles.badge}>★ Featured story</span>
                <span>Healthcare · 4,200 employees</span>
              </div>
              <Quote size={40} className={styles.quoteIcon} />
              <blockquote className={styles.quoteText}>
                "Consolidating on WhiteHawk gave the team one console for offense, defense and
                GRC — and gave the CFO back a six-figure line item."
              </blockquote>
              <div className={styles.quoteFooter}>
                <div className={styles.avatar} />
                <div>
                  <div className={styles.avatarName}>Marcus Ortega</div>
                  <div className={styles.avatarRole}>CISO · Contoso Health</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.miniStats}>
            {[
              { n: "92%", l: "faster audits" },
              { n: "3", l: "vendors retired" },
              { n: "$480k", l: "annual savings" },
              { n: "1", l: "unified console" },
            ].map((s) => (
              <div key={s.l} className={styles.miniStatCard}>
                <div className={styles.miniStatNumber}>{s.n}</div>
                <div className={styles.miniStatLabel}>{s.l}</div>
              </div>
            ))}
            <Button variant="accent" className={styles.miniStatCta}>
              Read the full story <ArrowUpRight size={14} />
            </Button>
          </div>
        </div>
      </Section>

      {/* Grid — bento */}
      <Section bg="wash">
        <div className={styles.filterRow}>
          <SectionHeader eyebrow="Case studies" title="Every industry, every module" align="left" />
          <div className={styles.filterChips}>
            {filters.map((c) => (
              <button
                key={c}
                onClick={() => setF(c)}
                className={`${styles.filterChip} ${f === c ? styles.filterChipActive : ""}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <Bento cols={6}>
          {visible.map((s, i) => {
            const span = i === 0 ? styles.tileHero : i % 5 === 1 ? styles.tileSpan3 : styles.tileSpan2;
            const isHero = i === 0;
            return (
              <BentoTile
                key={s.name}
                variant={isHero ? "ink" : "canvas"}
                className={`${span}`}
                eyebrow={`${s.industry} · ${s.tag}`}
                index={String(i + 1).padStart(2, "0")}
              >
                <div className={`${styles.tileTitle} ${isHero ? styles.tileTitleHero : ""}`}>
                  {s.name}
                </div>
                <div className={`${styles.tileHeadline} ${isHero ? styles.tileHeadlineHero : ""}`}>
                  {s.headline}
                </div>
                <div className={`${styles.tileFooter} ${isHero ? styles.tileFooterHero : ""}`}>
                  <div>
                    <div className={`${styles.tileMetric} ${isHero ? styles.tileMetricHero : ""}`}>
                      {s.metric}
                    </div>
                    <div className={`${styles.tileMetricLabel} ${isHero ? styles.tileMetricLabelHero : ""}`}>
                      {s.metricLabel}
                    </div>
                  </div>
                  <span className={`${styles.tileReadMore} ${isHero ? styles.tileReadMoreHero : ""}`}>
                    Read <ArrowUpRight size={12} />
                  </span>
                </div>
              </BentoTile>
            );
          })}
        </Bento>
      </Section>

      {/* Stats band */}
      <Section>
        <div className={styles.statsGrid}>
          {stats.map((s) => (
            <div key={s.l}>
              <div className={styles.statNumber}>{s.n}</div>
              <div className={styles.statLabel}>{s.l}</div>
            </div>
          ))}
        </div>
      </Section>

      <LogoStrip label="Also trusted by" />

      <CTABand
        title="Your team could be next"
        primary={{ label: "Book a Demo", to: "/contact" }}
        secondary={{ label: "Read the blog", to: "/blog" }}
      />
    </SiteLayout>
  );
}
