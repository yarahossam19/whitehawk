import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";
import { SiteLayout } from "@/components/site/SiteLayout/SiteLayout";
import { HeroWordmark } from "@/components/site/HeroWordmark";
import { Button } from "@/components/site/ui/Button/Button";
import { CTABand } from "@/components/site/ui/CTABand/CTABand";
import { LogoStrip } from "@/components/site/ui/LogoStrip/LogoStrip";
import { Section } from "@/components/site/ui/Section/Section";
import { SectionHeader } from "@/components/site/ui/SectionHeader/SectionHeader";
import { FAQSection } from "@/components/site/ui/FAQSection/FAQSection";
import { HomeVideo } from "@/components/site/ui/HomeVideo/HomeVideo";
import { TestimonialCarousel } from "@/components/site/ui/TestimonialCarousel/TestimonialCarousel";
import {
  ShieldCheck,
  Radar,
  ClipboardList,
  Boxes,
  ArrowUpRight,
  TrendingDown,
  Clock3,
  Layers,
  EyeOff,
} from "lucide-react";
import styles from "./page.module.scss";

export const metadata: Metadata = pageMetadata({
  path: "/",
  title: "WhiteHawk — One security platform, end to end",
  description:
    "Offensive, defensive, GRC and asset management, unified in a single platform. Run your whole security program on WhiteHawk.",
});

const modules = [
  {
    key: "offensive",
    to: "/platform/offensive",
    icon: Radar,
    tag: "Offensive",
    title: "See what attackers see",
    blurb: "Continuous x-ray of your attack surface — buried fractures, exploit paths, weak points.",
    stat: "6h",
    statLabel: "sweep cadence",
  },
  {
    key: "defensive",
    to: "/platform/defensive",
    icon: ShieldCheck,
    tag: "Defensive",
    title: "Detect fast, respond faster",
    blurb: "Behavioral analytics, SOAR-style playbooks, 24/7 alerting your SOC actually trusts.",
    stat: "< 4h",
    statLabel: "median MTTR",
  },
  {
    key: "grc",
    to: "/platform/grc",
    icon: ClipboardList,
    tag: "GRC",
    title: "Audit ready, on demand",
    blurb: "Controls-as-queries, continuous evidence, one-click audit packs across every framework.",
    stat: "92%",
    statLabel: "Less Prep Time",
  },
  {
    key: "asset",
    to: "/platform/asset-management",
    icon: Boxes,
    tag: "Assets",
    title: "Discover, Manage, and Track every Asset.",
    blurb: "100+ Asset Types, real-time ownership tracking, impact analysis in one traversal.",
    stat: "100+",
    statLabel: "Asset Types",
  },
];

const problems = [
  {
    icon: Layers,
    stat: "Up to 14 tools",
    label: "in the average stack",
    text: "SIEMs, scanners, ticketing, GRC — each sees only its own slice, so risks get missed, delayed, or handled without context.",
  },
  {
    icon: Clock3,
    stat: "Days lost between discovery and action",
    label: "offense-to-GRC lag",
    text: "Offensive security identifies a vulnerability. Defensive teams lack the context to recognize related threats, while GRC struggles to track the risk, ownership, and remediation status.",
  },
  {
    icon: EyeOff,
    stat: "You can't secure what you can't see",
    label: "Assets scattered across sheets, tools, and teams",
    text: "Cloud systems, endpoints, apps — even non-IT assets — quietly fall out of view before anyone notices they're exposed.",
  },
  {
    icon: TrendingDown,
    stat: "Every audit",
    label: "becomes a fire drill",
    text: "Evidence lives in a spreadsheet last updated in March — audited under deadline pressure in June.",
  },
];

const testimonials = [
  {
    quote:
      "WhiteGuard transformed our security posture from reactive to proactive. Their SOC team detected a critical vulnerability that had gone unnoticed for months.",
    name: "Mohamed Arafa",
    role: "IT Manager At Paxera",
  },
  {
    quote:
      "The penetration testing uncovered vulnerabilities our previous vendor missed entirely. WhiteGuard's offensive team is world-class.",
    name: "Bahaa Ryad",
    role: "IT Manager Penetration testing At Enmaa",
  },
  {
    quote:
      "WhiteGuard helped us optimize our security spending by offering efficient cybersecurity tools while focusing on risk mitigation. We have achieved a robust security posture at a predictable price point, proving that world-class defense doesn't have to come with an unsustainable budget.",
    name: "Hazem Mohamed",
    role: "CIO, A.T Lease",
  },
  // {
  //   // Carried over as-is from the previous site, where this quote was duplicated
  //   // from Mohamed Arafa's — replace with Mohamed Youssef's own words.
  //   quote:
  //     "WhiteGuard transformed our security posture from reactive to proactive. Their SOC team detected a critical vulnerability that had gone unnoticed for months.",
  //   name: "Mohamed Youssef",
  //   role: "infrastructure manager At GIG",
  // },
];

const faqs = [
  {
    q: "Can I start with one module and add others later?",
    a: "Yes. Every module is fully functional standalone. You can activate the rest of the suite anytime — data and users carry over.",
  },
  { q: "How long does deployment take?", a: "Most teams go live in under 30 minutes with SSO, cloud connectors and default policies preconfigured." },
  { q: "Where is my data stored?", a: "Data is encrypted at rest with AES-256 and stored in the region you choose (US, EU or APAC)." },
  { q: "Do you offer managed services?", a: "Yes — Enterprise plans include a dedicated CSM and optional 24/7 managed threat response." },
  { q: "Do you integrate with our existing SIEM / ticketing?", a: "One-way sync with Splunk, Microsoft Sentinel, Elastic, QRadar, Wazuh, Forty Siem, Generic and more. Everything is available over a typed REST API too." },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function HomePage() {
  return (
    <SiteLayout>
      <section className={styles.hero}>
        <HeroWordmark className={styles.heroWordmark} />
        <div aria-hidden className={styles.heroGlow} />
        <div className={styles.heroInner}>
          {/* <div className={styles.heroBadge}> */}
            {/* <span className={`${styles.heroBadgeDot} animate-pulse-dot`} />
            ISO 27001 · SOC 2 certified 
          </div> */}
          
          <h1 className={`${styles.heroTitle} animate-text-reveal`}>
            One Intelligent Platform <span className={styles.heroFaint}> <br/>to Manage</span>
            <br />
            <span className={styles.heroAccent}>Your Entire Cybersecurity Program.</span>
          </h1>
          <p className={styles.heroDescription}>
White Hawk unifies every critical cybersecurity function—from offensive security and defensive operations to GRC and asset management—into one intelligent platform, giving you unified visibility, streamlined operations, and complete control over your cybersecurity program.          </p>
          <div className={styles.heroActions}>
            <Button as="link" to="/contact" variant="accent" size="lg">
              Book a Demo
            </Button>
            <Button as="link" to="/platform" variant="ghost-dark" size="lg">
              See the platform
            </Button>
          </div>
        </div>
      </section>

      <LogoStrip />

      {/* Platform video / preview */}
      <Section>
        <SectionHeader
          eyebrow="See it in action"
          title="Every signal, every workflow — in one console"
          description="From the first gap assessment to a fully prepared compliance evidence pack, White Hawk brings your teams, workflows, and evidence together in one intelligent platform."
        />
        <HomeVideo />
      </Section>

      {/* ── PROBLEM (redesigned) — editorial dark band, three divided stat cells ── */}
      <section className={styles.problem}>
        <div aria-hidden className={styles.problemGlow} />
        <div className={styles.problemInner}>
          <div className={`reveal ${styles.problemIntro}`}>
            <div className={styles.problemEyebrow}>The problem</div>
            <h2 className={styles.problemTitle}>
              Fragmented security programs <span className={styles.problemAccent}>bleed money</span> and
              miss threats.
            </h2>
            <p className={styles.problemLead}>
              Most teams juggle a dozen tools that don&apos;t talk to each other. Alerts fall through
              the cracks, compliance ships late, and the budget line grows every quarter.
            </p>
          </div>

          <div className={styles.problemGrid}>
            {problems.map(({ icon: Icon, stat, label, text }, i) => (
              <div
                key={label}
                className={`reveal ${styles.problemCell}`}
                style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
              >
                <div className={styles.problemIconWrap}>
                  <Icon size={18} />
                </div>
                <div className={styles.problemStat}>{stat}</div>
                <div className={styles.problemStatLabel}>{label}</div>
                <p className={styles.problemText}>{text}</p>
              </div>
            ))}
          </div>

          <div
            className={`reveal ${styles.problemFooter}`}
            style={{ "--reveal-delay": `${problems.length * 120}ms` } as React.CSSProperties}
          >
            <span className={styles.problemFooterLine} />
            <span className={styles.problemFooterText}>
              WhiteHawk collapses all of it into one system.
            </span>
            <span className={styles.problemFooterLine} />
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS (redesigned) — editorial index rows ── */}
      <Section id="solutions">
        <div className={styles.solutionsGrid}>
          <div className={styles.solutionsAside}>
            <div className={styles.solutionsEyebrow}>Solutions</div>
            <h2 className={styles.solutionsTitle}>
              Four Modules. <span className={styles.solutionsAccent}>One system.</span>
            </h2>
            <p className={styles.solutionsLead}>
              Use them together as a suite, or stand-alone. Every module is fully featured on its
              own.
            </p>
            <Button as="link" to="/platform" variant="ghost" className={styles.solutionsCta}>
              Full platform tour <ArrowUpRight size={14} />
            </Button>
          </div>

          <div className={styles.solutionsList}>
            {modules.map(({ key, to, icon: Icon, tag, title, blurb, stat, statLabel }, i) => (
              <Link
                key={key}
                href={to}
                className={`reveal ${styles.moduleRow}`}
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
              >
                <Icon aria-hidden strokeWidth={1} className={styles.moduleWatermark} />
                <span className={styles.moduleIndex}>0{i + 1}</span>
                <div className={styles.moduleBody}>
                  <span className={styles.moduleTag}>
                    <Icon size={12} /> {tag}
                  </span>
                  <h3 className={styles.moduleTitle}>{title}</h3>
                  <p className={styles.moduleBlurb}>{blurb}</p>
                </div>
                <div className={styles.moduleMeta}>
                  <div className={styles.moduleStatWrap}>
                    <div className={styles.moduleStat}>{stat}</div>
                    <div className={styles.moduleStatLabel}>{statLabel}</div>
                  </div>
                  <ArrowUpRight size={20} className={styles.moduleArrow} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* Certifications — compact strip */}
      <section className={styles.certs}>
        <div className={styles.certsInner}>
          <div className={styles.certsGrid}>
            <div>
              <div className={styles.certsEyebrow}>Certifications</div>
              <div className={styles.certsHeading}>Certified. Compliant. Out of the box.</div>
            </div>
            <div className={styles.certsList}>
              {/* .webp rather than the source .svg for the badges that have
                  one — those SVGs are base64 PNGs in a wrapper (hundreds of
                  KB to paint a 36px mark) that next/image passes through
                  unoptimized. See src/lib/logo-assets.ts. CREST is served as
                  SVG by request. Note the PCI file is spelled "pco-dss". */}
              {[
                { n: "SOC 2", d: "Type II", src: "/icons/certificates/soc-2.webp" },
                { n: "ISO 27001", d: "Certified", src: "/icons/certificates/iso-27001.webp" },
                { n: "GDPR", d: "EU data", src: "/icons/certificates/gdpr.webp" },
                { n: "PCI DSS", d: "Compliant", src: "/icons/certificates/pco-dss.webp" },
                { n: "CREST", d: "Accredited", src: "/icons/certificates/crest.svg" },
              ].map((c) => (
                <div key={c.n} className={styles.certCard}>
                  <div className={styles.certIconWrap}>
                    <Image
                      src={c.src}
                      alt={c.n}
                      width={36}
                      height={36}
                      className={styles.certIcon}
                    />
                  </div>
                  <div>
                    <div className={styles.certName}>{c.n}</div>
                    <div className={styles.certDesc}>{c.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Section>
        <div className={styles.testimonialsHeader}>
          <SectionHeader eyebrow="What teams say" title="Trusted by security teams that ship" align="left" className="mx-0" />
          <Button as="link" to="/customers" variant="ghost">All customer stories →</Button>
        </div>
        <TestimonialCarousel items={testimonials} />
      </Section>

      {/* ── FAQ ── */}
      <Section bg="wash">
        <FAQSection
          heading="Answers before you ask"
          body="Everything else lives in the docs — including our full trust center and product architecture."
          items={faqs}
        />
      </Section>

      <CTABand
        title="Start with one module. Grow into the platform."
        description="Book a working session with a security engineer — no slideware, real product."
        primary={{ label: "Book a Demo", to: "/contact" }}
        secondary={{ label: "Explore platform", to: "/platform" }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </SiteLayout>
  );
}
