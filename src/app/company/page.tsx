import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { SiteLayout } from "@/components/site/SiteLayout/SiteLayout";
import { HeroWordmark } from "@/components/site/HeroWordmark";
import { Badge } from "@/components/site/ui/Badge/Badge";
import { Card } from "@/components/site/ui/Card/Card";
import { CTABand } from "@/components/site/ui/CTABand/CTABand";
import { FAQSection } from "@/components/site/ui/FAQSection/FAQSection";
import { LogoStrip } from "@/components/site/ui/LogoStrip/LogoStrip";
import { Section } from "@/components/site/ui/Section/Section";
import { SectionHeader } from "@/components/site/ui/SectionHeader/SectionHeader";
import { LOGO_DIMENSIONS } from "@/lib/logo-assets";
import { Target, Eye } from "lucide-react";
import styles from "./page.module.scss";

export const metadata: Metadata = pageMetadata({
  path: "/company",
  title: "Company — WhiteHawk",
  description:
    "WhiteHawk is on a mission to unify the security program. Meet the team, our investors, and the story behind the platform.",
});

const pillars = [
  {
    key: "mission",
    icon: Target,
    tone: "navy" as const,
    eyebrow: "Core Mission",
    title: "Empower every organization to build, manage, and scale a world-class cybersecurity program.",
    description:
      "We're redefining the future of cybersecurity by transforming fragmented services into a unified, intelligent product — giving every organization, regardless of size or industry, clarity, speed, and confidence.",
  },
  {
    key: "vision",
    icon: Eye,
    tone: "accent" as const,
    eyebrow: "Global Vision",
    title: "The first world-class Arab cybersecurity product.",
    description:
      "We aim to build the first world-class Arab cybersecurity product — designed to empower every Arab organization with advanced, accessible protection, and proudly export our innovation to serve global enterprises.",
  },
];

const leaders = [
  {
    name: "Nadia Fischer",
    initials: "NF",
    title: "CEO & Co-founder",
    tone: "navy" as const,
    bio: "Formerly VP Security at a Fortune 100. Built and ran offensive, defensive and GRC programs at scale — and got tired of stitching them together.",
  },
  {
    name: "Rahul Menon",
    initials: "RM",
    title: "CTO & Co-founder",
    tone: "accent" as const,
    bio: "Distributed systems engineer. Previously staff at two acquired security startups. Believes security data belongs in a graph.",
  },
];

const faqs = [
  { q: "Where is WhiteHawk based?", a: "We operate across Egypt, Saudi Arabia and the United States, serving customers in the region and beyond." },
  { q: "Are you hiring?", a: "Yes — engineering, security research and go-to-market roles. See the careers page." },
  { q: "Who are your investors?", a: "We're backed by tier-1 cybersecurity VCs and strategic angels from the industry." },
];

// .webp, not the original .svg: those were base64 PNGs behind an SVG wrapper
// (up to 175 KB each to paint a 40px-tall mark) that next/image serves
// unoptimized. See src/lib/logo-assets.ts.
const investors = [
  "/icons/investors/investor3.webp",
  "/icons/investors/investor8.webp",
  "/icons/investors/investor1.webp",
  "/icons/investors/investor4.webp",
  "/icons/investors/investor2.webp",
  "/icons/investors/investor5.webp",
  "/icons/investors/investor6.webp",
  "/icons/investors/investor7.webp",

  // "/icons/investors/investor21.webp",
  // "/icons/investors/investor22.webp",
];

export default function CompanyPage() {
  return (
    <SiteLayout>
      {/* Mission hero */}
      <section className={styles.hero}>
        <HeroWordmark tone="dark" className={styles.heroWordmark} />
        <div className={styles.heroInner}>
          <div className={styles.heroEyebrow}>About WhiteHawk</div>
          <h1 className={styles.heroTitle}>
            Security programs deserve <span className={styles.heroAccent}>one system</span>, not ten.
          </h1>
          <p className={styles.heroDescription}>
            We're building the platform that unifies offensive, defensive, GRC and asset management — so security teams can spend less time on plumbing and more time on protection.
          </p>
        </div>
      </section>

      <LogoStrip label="Trusted by customers and partners" />

      {/* Origin story */}
      <Section bg="wash">
        <div className={styles.storyGrid}>
          <div>
            <div className={styles.storyEyebrow}>Our story</div>
            <h2 className={styles.storyTitle}>
              We started WhiteHawk after seeing strong security teams struggle with fragmented tools, disconnected workflows, and limited visibility across their cybersecurity programs.
            </h2>
            <div className={styles.storyBody}>
              <p>
                Through years of building and managing security programs, our founders saw the same challenge across different industries: organizations had capable teams and multiple technologies, but no single system connecting their assets, findings, controls, risks, and operations.
              </p>
              <p>
                WhiteHawk was built in response to those real customer needs. What began as a mission to simplify cybersecurity management evolved into one intelligent platform that brings offensive security, defensive operations, GRC, and asset management together.
              </p>
              <p>
                Our goal is simple: give cybersecurity teams the visibility, coordination, and control they need to manage their entire program more effectively.
              </p>
            </div>
          </div>
          <div className={styles.storyVisual}>
            <div className={styles.storyVisualInner}>
              <div>
                <div className={styles.storyVisualLabel}>
                  Est.
                </div>
                <div className={styles.storyVisualYear}>2022</div>
                <div className={styles.storyVisualLocations}>Egypt · KSA · USA</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section>
        <div className={styles.pillarsGrid}>
          {pillars.map(({ key, icon: Icon, tone, eyebrow, title, description }) => (
            <Card
              key={key}
              className={`${styles.pillarCard} ${tone === "navy" ? styles.toneNavy : styles.toneAccent}`}
            >
              <Icon aria-hidden strokeWidth={1} className={styles.pillarWatermark} />
              <div className={styles.pillarIcon}>
                <Icon size={22} />
              </div>
              <div className={styles.pillarEyebrow}>{eyebrow}</div>
              <h3 className={styles.pillarTitle}>{title}</h3>
              <p className={styles.pillarDescription}>{description}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Leadership
      <Section bg="wash">
        <SectionHeader eyebrow="Leadership" title="Meet the founders" />
        <div className={styles.leadersGrid}>
          {leaders.map(({ name, initials, title, tone, bio }) => (
            <Card
              key={name}
              className={`${styles.leaderCard} ${tone === "navy" ? styles.toneNavy : styles.toneAccent}`}
            >
              <div className={styles.leaderAvatar}>
                <span className={styles.leaderAvatarPattern} aria-hidden="true" />
                <span className={styles.leaderAvatarRing} aria-hidden="true" />
                <span className={styles.leaderAvatarInitials}>{initials}</span>
              </div>
              <div className={styles.leaderBody}>
                <div className={styles.leaderName}>{name}</div>
                <Badge tone="navy">{title}</Badge>
                <p className={styles.leaderBio}>{bio}</p>
              </div>
            </Card>
          ))}
        </div>
      </Section> */}

      {/* Investors */}
      <Section>
        <SectionHeader eyebrow="Backed by" title="Investors & advisors" />
        <div className={styles.investorsGrid}>
          {investors.map((src, i) => (
            <div
              key={src}
              className={`reveal ${styles.investorTile}`}
              style={{ "--reveal-delay": `${(i % 5) * 40}ms` } as React.CSSProperties}
            >
              {/* Real intrinsic dimensions per mark — the previous flat 120×40
                  was the CSS box, not the asset's aspect ratio, so next/image
                  reserved the wrong space and the tiles shifted on decode. */}
              <Image
                src={src}
                alt={`WhiteHawk investor ${i + 1} logo`}
                width={LOGO_DIMENSIONS[src]?.width ?? 120}
                height={LOGO_DIMENSIONS[src]?.height ?? 40}
                className={styles.investorLogo}
              />
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section bg="wash">
        <FAQSection
          eyebrow="Company FAQ"
          heading="Frequently asked"
          body="Still stuck? A security engineer will answer within one business day."
          items={faqs}
        />
      </Section>

      <CTABand
        title="Come see the platform — or come build it with us."
        primary={{ label: "Book a Demo", to: "/contact" }}
        secondary={{ label: "View careers", href: "#" }}
      />
    </SiteLayout>
  );
}
