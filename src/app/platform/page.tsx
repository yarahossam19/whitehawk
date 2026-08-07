import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { SiteLayout } from "@/components/site/SiteLayout/SiteLayout";
import { Hero3D } from "@/components/site/Hero3D";
import { Button } from "@/components/site/ui/Button/Button";
import { Card } from "@/components/site/ui/Card/Card";
import { CTABand } from "@/components/site/ui/CTABand/CTABand";
import { FAQSection } from "@/components/site/ui/FAQSection/FAQSection";
import { IntegrationLogo } from "@/components/site/ui/IntegrationLogo/IntegrationLogo";
import { Section } from "@/components/site/ui/Section/Section";
import { SectionHeader } from "@/components/site/ui/SectionHeader/SectionHeader";
import {
  Radar,
  ShieldCheck,
  ClipboardList,
  Boxes,
  ArrowRight,
  ArrowUpRight,
  Lock,
  KeyRound,
  Globe,
} from "lucide-react";
import styles from "./page.module.scss";

export const metadata: Metadata = pageMetadata({
  path: "/platform",
  title: "Platform — WhiteHawk",
  description:
    "One security platform, four modules. Offensive, defensive, GRC and asset management sharing one data model, one workflow engine, one console.",
});

// The shape every module's own flow shares: discover, correlate, prioritize,
// then close the loop with an owner and evidence.
const steps = [
  { n: "01", t: "Discover", d: "Network, cloud, identity and endpoint connectors find every asset — agentless or agent-based." },
  { n: "02", t: "Correlate", d: "Findings, alerts, controls and assets meet in one graph instead of four consoles." },
  { n: "03", t: "Prioritize", d: "Ranked by real exposure and business criticality, not CVSS alone." },
  { n: "04", t: "Remediate", d: "Every finding becomes a ticket with an owner, evidence and a fix path." },
];

// One card per module, each summarising that module's own page — bullets are
// its real named capabilities, not a generic feature list.
const capabilities = [
  {
    icon: Radar,
    tag: "Offensive",
    title: "Continuous offensive testing",
    body: "Testing across apps, cloud, network and identity, with every finding ranked by real exposure rather than CVSS alone.",
    bullets: [
      "Vulnerability assessment",
      "Penetration testing",
      "Security configuration review",
      "CIS benchmark assessment",
    ],
  },
  {
    icon: ShieldCheck,
    tag: "Defensive",
    title: "Detection & response",
    body: "Human-led SOC operations with AI-driven correlation and automated containment behind them.",
    bullets: [
      "SOC alerts and management",
      "Threat intelligence and hunting",
      "Data breach monitoring",
      "SOC AI triage and response",
    ],
  },
  {
    icon: ClipboardList,
    tag: "GRC",
    title: "Compliance & audit",
    body: "Controls mapped once to the frameworks your regulator audits against, with evidence collected as they operate.",
    bullets: [
      "Gap assessment",
      "Risk and governance management",
      "Compliance management",
      "Audit management",
    ],
  },
  {
    icon: Boxes,
    tag: "Assets",
    title: "Unified asset inventory",
    body: "Every device, workload, identity and shadow-IT instance discovered, then scored by business criticality.",
    bullets: [
      "Automated discovery, agentless or agent-based",
      "IT and non-IT — OT, ICS and SCADA",
      "Business criticality scoring",
      "Control coverage gaps",
    ],
  },
];

// The real connector inventory, in the same six groups as /integrations. Keep
// the two lists in step — this page is the overview of that one.
const integrationRows = [
  { cat: "Network discovery", items: ["SNMP discovery", "Active discovery", "Wireless discovery"] },
  { cat: "Cloud", items: ["AWS", "Microsoft Azure", "Google Cloud", "Alibaba Cloud"] },
  { cat: "Identity & endpoint", items: ["Active Directory", "Asset Agent", "EDR"] },
  { cat: "Detection & response", items: ["SIEM", "Elastic Search", "Threat Hunting", "Firewall"] },
  { cat: "Threat intel & data", items: ["Dexpose", "Ransomware Live", "NVD CVE", "Kali / Nessus"] },
  { cat: "Productivity", items: ["Microsoft Calendar"] },
];

const heroModules = [
  { to: "/platform/offensive", label: "Offensive", icon: Radar },
  { to: "/platform/defensive", label: "Defensive", icon: ShieldCheck },
  { to: "/platform/grc", label: "GRC", icon: ClipboardList },
  { to: "/platform/asset-management", label: "Assets", icon: Boxes },
];

const faqs = [
  {
    q: "Do I need every module?",
    a: "No. Every module is fully featured standalone. Add the rest of the suite whenever you're ready — data and users carry over.",
  },
  { q: "How is data isolated between customers?", a: "Each tenant runs on isolated compute and encrypted per-tenant keys." },
  { q: "What's your uptime commitment?", a: "99.9% for Standard and Pro, 99.99% with credits for Enterprise." },
  { q: "Can I self-host?", a: "Yes — Enterprise supports single-tenant deployments in your VPC or on prem." },
];

export default function PlatformPage() {
  return (
    <SiteLayout>
      {/*
        Bespoke hero for the flagship overview page — distinct from the
        shared module-page HeroSection template. Adds a quick-jump module
        strip (so the "four modules" claim is immediately navigable, not
        just stated) and frames the 3D scene as a product window rather
        than letting it float free.
      */}
      <section className={styles.hero}>
        <div aria-hidden className={`${styles.dotGrid} animate-grid`} />
        <div aria-hidden className={`${styles.scanBeam} animate-scan`} />
        <div aria-hidden className={styles.heroGlow} />
        <div aria-hidden className={styles.heroHairline} />

        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <div className={styles.heroPill}>
              <span className={`${styles.heroPillDot} animate-pulse-dot`} />
              Platform overview
            </div>
            <h1 className={`${styles.heroTitle} animate-text-reveal`}>
              One Platform.{" "}
              <span className={styles.accent}>Four Modules.</span>{" "}
              <span className={styles.dim}>Complete Visibility.</span>
            </h1>
            <p className={styles.heroDescription}>
            White Hawk connects every module through a shared data, policy, and workflow layer—giving your teams consistent context, coordinated execution, and faster security operations across the entire program.
            </p>
            <div className={styles.heroActions}>
              <Button as="link" to="/contact" variant="accent" size="lg">
                Book a Demo
              </Button>
              <Button as="a" href="#capabilities" variant="ghost" size="lg">
                Explore capabilities
              </Button>
            </div>

            {/* Quick-jump module strip — makes "four modules" navigable, not just a claim */}
            <div className={styles.moduleStrip}>
              {heroModules.map(({ to, label, icon: Icon }) => (
                <Link key={to} href={to} className={styles.moduleLink}>
                  <Icon size={15} className={styles.moduleLinkIcon} />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.heroVisualWrap}>
            <div className={styles.heroVisual}>
              <Hero3D variant="platform" />
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <Section  bg="white" >
        <SectionHeader
          eyebrow="Workflow"
          title="How work moves through WhiteHawk"
        />
        <div className={styles.stepsGrid}>
          {steps.map((s, i) => (
            <div key={s.n} className={styles.stepItem}>
              <Card>
                <div className={styles.stepLabel}>
                  Step {s.n}
                </div>
                <div className={styles.stepTitle}>{s.t}</div>
                <div className={styles.stepDesc}>{s.d}</div>
              </Card>
              {i < steps.length - 1 && (
                <ArrowRight className={styles.stepArrow} size={18} />
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Capabilities — even grid, every module gets equal weight */}
      <Section id="capabilities" bg="wash">
        <div className={styles.capsHeader}>
          <SectionHeader
            eyebrow="Capabilities"
            title="Every capability, one console"
            align="left"
            className="mx-0"
          />
          <Button as="link" to="/pricing" variant="ghost">
            View capability map <ArrowUpRight size={14} />
          </Button>
        </div>
        <div className={styles.capsGrid}>
          {capabilities.map((cap, i) => (
            <div
              key={cap.title}
              className={`reveal lift ${styles.capCard}`}
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            >
              <div className={styles.capCardTop}>
                <div className={styles.capIcon}>
                  <cap.icon size={22} />
                </div>
                <span className={styles.capTag}>
                  {cap.tag}
                </span>
              </div>
              <h3 className={styles.capTitle}>{cap.title}</h3>
              <p className={styles.capBody}>{cap.body}</p>
              <ul className={styles.capBullets}>
                {cap.bullets.map((b) => (
                  <li key={b} className={styles.capBullet}>
                    <span className={styles.capBulletDot} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>


      {/* Architecture — navy */}
      <section className={styles.archSection}>
        <div aria-hidden className={styles.archGlow} />
        <div className={styles.archInner}>
          <div className="reveal">
            <div className={styles.archEyebrow}>Architecture</div>
            <h2 className={styles.archHeading}>
              Open at the edges, opinionated at the core
            </h2>
            <p className={styles.archBody}>
              A single security data graph in the middle. Modules on top. Your existing tools plugged in via typed connectors — every request over TLS 1.3, every byte encrypted with AES-256.
            </p>
            <Button as="a" href="#" variant="ghost-dark" className={styles.archCta}>
              View trust center →
            </Button>
          </div>
          <div>
            <div className={styles.archRows}>
              {[
                { label: "Sources", items: ["Network", "Cloud", "Identity", "Endpoints", "SIEM", "Threat feeds"] },
                { label: "Core engine", items: ["Data graph", "Policy engine", "Playbooks", "Correlation"] },
                { label: "Modules", items: ["Offensive", "Defensive", "GRC", "Asset Mgmt"] },
                { label: "Output layer · your tools", items: ["Dashboard", "SIEM / SOAR", "Ticketing", "REST API"] },
              ].map((row, i) => (
                <div
                  key={row.label}
                  className={`reveal ${styles.archRow}`}
                  style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
                >
                  <div className={styles.archRowLabel}>
                    {row.label}
                  </div>
                  <div className={styles.archRowItems}>
                    {row.items.map((i) => (
                      <span key={i} className={styles.archPill}>
                        {i}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.archFooterNote}>
              🔒 TLS 1.3 encrypted · AES-256 at rest · Regional isolation
            </div>
          </div>
        </div>
      </section>

      {/* Multitenancy / data isolation — navy */}
      <section className={styles.tenancySection}>
        <div aria-hidden className={styles.tenancyGlow} />
        <div className={styles.tenancyInner}>
          <div className={`reveal ${styles.tenancyIntro}`}>
            <div className={styles.tenancyEyebrow}>Security &amp; isolation</div>
            <h2 className={styles.tenancyHeading}>
              Every tenant is <span className={styles.tenancyAccent}>completely isolated</span>.
            </h2>
            <p className={styles.tenancyLead}>
              WhiteHawk is multitenant by architecture, not by convention. Your data never
              shares compute, storage or an encryption key with anyone else's — isolation is
              enforced at the infrastructure layer, not just the application layer.
            </p>
          </div>

          <div className={styles.tenancyGrid}>
            {[
              {
                icon: Lock,
                stat: "Isolated compute",
                text: "Each tenant runs on dedicated compute — never a shared process or container with another customer.",
              },
              {
                icon: KeyRound,
                stat: "Per-tenant encryption keys",
                text: "Data at rest is encrypted with AES-256 under keys unique to your tenant, not a shared master key.",
              },
              {
                icon: Globe,
                stat: "Regional data residency",
                text: "Choose where your data lives; it never leaves that region without your say-so.",
              },
            ].map(({ icon: Icon, stat, text }, i, arr) => (
              <div
                key={stat}
                className={`reveal ${styles.tenancyCell} ${i < arr.length - 1 ? styles.tenancyCellDivider : ""}`}
                style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              >
                <div className={styles.tenancyIconWrap}>
                  <Icon size={18} />
                </div>
                <div className={styles.tenancyStat}>{stat}</div>
                <p className={styles.tenancyText}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module quick links */}
      <Section bg="wash">
        <SectionHeader eyebrow="Modules" title="Jump into any module" />
        <div className={styles.modulesGrid}>
          {[
            { to: "/platform/offensive", label: "Offensive Security", icon: Radar },
            { to: "/platform/defensive", label: "Defensive Security", icon: ShieldCheck },
            { to: "/platform/grc", label: "GRC System", icon: ClipboardList },
            { to: "/platform/asset-management", label: "Asset Management", icon: Boxes },
          ].map(({ to, label, icon: Icon }, i) => (
            <Link
              key={to}
              href={to}
              className={`reveal ${styles.moduleCard}`}
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            >
              <div className={styles.moduleCardIcon}>
                <Icon size={20} />
              </div>
              <div className={styles.moduleCardLabel}>{label}</div>
              <div className={styles.moduleCardLink}>
                Open module{" "}
                <ArrowRight size={14} className={styles.moduleCardArrow} />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Integrations */}
      <Section>
        <SectionHeader
          eyebrow="Integrations"
          title="Connects to the stack you already run"
          description="Every connector WhiteHawk ships, grouped the way the product groups them."
        />
        <div className={styles.integrationsList}>
          {integrationRows.map((row, i) => (
            <div
              key={row.cat}
              className={`reveal ${styles.integrationsRow}`}
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
            >
              <div className={styles.integrationsEyebrow}>{row.cat}</div>
              <div className={styles.integrationsItems}>
                {row.items.map((name) => (
                  <span key={name} className={styles.integrationChip}>
                    <IntegrationLogo name={name} className={styles.integrationChipLogo} />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Resources */}
      <Section bg="wash">
        <div className={styles.resourcesHeader}>
          <SectionHeader eyebrow="Resources" title="Deeper technical reading" align="left" />
          <Button as="a" href="#" variant="ghost">
            View all →
          </Button>
        </div>
        <div className={styles.resourcesGrid}>
          {[
            { tag: "Guide", title: "Continuous compliance across SAMA CSF, NCA ECC and ISO 27001", icon: ClipboardList },
            { tag: "Guide", title: "What SOC AI automates — and what it hands back to an analyst", icon: ShieldCheck },
            { tag: "Guide", title: "Bringing OT, ICS and medical devices into one inventory", icon: Boxes },
          ].map((r) => (
            <Card key={r.title}>
              <div className={styles.resourceThumb}>
                <r.icon size={40} strokeWidth={1.2} />
              </div>
              <span className={styles.resourceTag}>{r.tag}</span>
              <div className={styles.resourceTitle}>{r.title}</div>
            </Card>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <FAQSection
          eyebrow="Platform FAQ"
          heading="Frequently asked questions"
          body="Still stuck? A security engineer will answer within one business day."
          items={faqs}
        />
      </Section>

      <CTABand
        title="Ready to see the whole platform?"
        primary={{ label: "Book a Demo", to: "/contact" }}
        secondary={{ label: "Talk to sales", to: "/contact" }}
      />
    </SiteLayout>
  );
}
