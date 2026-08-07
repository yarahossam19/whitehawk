import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { SiteLayout } from "@/components/site/SiteLayout/SiteLayout";
import { HeroWordmark } from "@/components/site/HeroWordmark";
import { Button } from "@/components/site/ui/Button/Button";
import { Card } from "@/components/site/ui/Card/Card";
import { CTABand } from "@/components/site/ui/CTABand/CTABand";
import { FAQSection } from "@/components/site/ui/FAQSection/FAQSection";
import { Section } from "@/components/site/ui/Section/Section";
import { SectionHeader } from "@/components/site/ui/SectionHeader/SectionHeader";
import {
  ArrowRight,
  ArrowUpRight,
  Zap,
  TrendingUp,
  Briefcase,
  Network,
  ShoppingCart,
  DollarSign,
  Package,
  Wrench,
  Infinity as InfinityIcon,
} from "lucide-react";
import styles from "./page.module.scss";

export const metadata: Metadata = pageMetadata({
  path: "/partners",
  title: "Become a Partner — WhiteHawk",
  description:
    "Grow your practice with the WhiteHawk partner program — resellers, MSSPs and technology partners welcome.",
});

const benefits = [
  {
    icon: Zap,
    title: "Not Just a Tool",
    body: "Differentiate your offering with an enterprise-grade platform, not just another tool.",
  },
  {
    icon: TrendingUp,
    title: "Recurring Revenue",
    body: "Generate sustainable income streams with subscription-based licensing.",
  },
  {
    icon: Zap,
    title: "Faster Delivery",
    body: "Streamlined workflows reduce project timelines and increase margins.",
  },
  {
    icon: Briefcase,
    title: "Market Differentiation",
    body: "Stand out in competitive markets with comprehensive capabilities.",
  },
];

const types = [
  {
    title: "Strategic Security Advisors",
    body: "Consultancies and GRC advisors deliver structured assessments and client roadmaps with WhiteHawk.",
    icon: Briefcase,
  },
  {
    title: "Managed Security Service Providers",
    body: "Centralize alerts, playbooks and incident management to deliver SOC services efficiently.",
    icon: InfinityIcon,
  },
  {
    title: "Systems & Technology Integrators",
    body: "Use WhiteHawk as the management layer that ties disparate tools into one ecosystem.",
    icon: Network,
  },
  {
    title: "Value-Added Resellers",
    body: "Bundle WhiteHawk with your services for stickier relationships and higher-margin revenue.",
    icon: ShoppingCart,
  },
];

const steps = [
  {
    n: "01",
    t: "Sell",
    d: "Resell licenses and bundle WhiteHawk with your services for recurring revenue.",
  },
  {
    n: "02",
    t: "Deliver",
    d: "Standardize workflows with built-in templates and automation to ship engagements faster.",
  },
  {
    n: "03",
    t: "Build",
    d: "Create custom services and integrate your own tools on top of the platform.",
  },
];

const partnerLogos = [
  { name: "Partner 01", src: "/icons/partners/partner1.png" },
  { name: "Partner 02", src: "/icons/partners/partner2.png" },
  { name: "Partner 03", src: "/icons/partners/partner3.png" },
  { name: "Partner 04", src: "/icons/partners/partner4.png" },
  { name: "Partner 05", src: "/icons/partners/partner5.png" },
  { name: "Partner 06", src: "/icons/partners/partner6.png" },
  { name: "Partner 07", src: "/icons/partners/partner7.png" },
  { name: "Partner 08", src: "/icons/partners/partner8.png" },
  { name: "Partner 09", src: "/icons/partners/partner9.png" },
  { name: "Partner 10", src: "/icons/partners/partner10.jpeg" },
  { name: "Partner 11", src: "/icons/partners/partner11.png" },
  { name: "Partner 12", src: "/icons/partners/partner12.png" },
  { name: "Partner 13", src: "/icons/partners/partner13.png" },
  { name: "Partner 14", src: "/icons/partners/partner14.png" },
  { name: "Partner 15", src: "/icons/partners/partner15.png" },
  { name: "Partner 16", src: "/icons/partners/partner16.png" },
  { name: "Partner 17", src: "/icons/partners/partner17.png" },
  { name: "Partner 18", src: "/icons/partners/partner18.png" },
  { name: "Partner 19", src: "/icons/partners/partner19.png" }, 
  { name: "Partner 20", src: "/icons/partners/partner20.png" },
  { name: "Partner 21", src: "/icons/partners/partner21.png" },
  { name: "Partner 22", src: "/icons/partners/partner22.png" },
  { name: "Partner 23", src: "/icons/partners/partner23.png" },
  { name: "Partner 24", src: "/icons/partners/partner24.png" },
  { name: "Partner 25", src: "/icons/partners/partner25.png" },
  { name: "Partner 26", src: "/icons/partners/partner26.png" },
  { name: "Partner 27", src: "/icons/partners/partner27.png" },
  { name: "Partner 28", src: "/icons/partners/partner28.png" },
  { name: "Partner 29", src: "/icons/partners/partner29.png" },
  { name: "Partner 30", src: "/icons/partners/partner30.png" },
  { name: "Partner 31", src: "/icons/partners/partner31.jpeg" },
  { name: "Partner 32", src: "/icons/partners/partner32.jpeg" },
  { name: "Partner 33", src: "/icons/partners/partner33.jpeg" },
];

const LOGO_COLUMN_COUNT = 4;
const logoColumns = Array.from({ length: LOGO_COLUMN_COUNT }, (_, col) =>
  partnerLogos.filter((_, i) => i % LOGO_COLUMN_COUNT === col)
);
const logoColumnSpeeds = [34, 26, 30, 22];

const faqs = [
  { q: "Is there a fee to join?", a: "No — the program is free. Certification is included." },
  { q: "Do you have deal registration?", a: "Yes, with tier-based protection windows and margins." },
  { q: "How long does certification take?", a: "Usually 3–5 days of self-paced training plus a live exam." },
];

export default function PartnersPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className={styles.hero}>
        <HeroWordmark
          tone="dark"
          className={styles.heroWordmark}
        />
        <div className={styles.heroInner}>
          <div>
            <div className={styles.eyebrow}>Partner program</div>
            <h1 className={styles.title}>
              Grow your security practice on WhiteHawk.
            </h1>
            <p className={styles.lead}>
              Resellers, MSSPs and technology partners — we're building the ecosystem that makes modern security programs run.
            </p>
            <div className={styles.actions}>
              <Button as="a" href="https://whiteguard.io/become-a-partner" variant="accent" size="lg">
                Apply to become a partner
              </Button>
              <Button as="a" href="https://partner.whiteguard.io/login" variant="ghost" size="lg">
                Partner platform <ArrowUpRight size={14} />
              </Button>
            </div>
          </div>
          <div className={styles.showcase}>
            <div className={styles.showcaseInner}>
              <div className={styles.logoWall}>
                {logoColumns.map((column, ci) => (
                  <div key={ci} className={styles.logoColumn}>
                    <div
                      className={styles.logoColumnTrack}
                      style={{
                        animationDuration: `${logoColumnSpeeds[ci % logoColumnSpeeds.length]}s`,
                        animationDirection: ci % 2 ? "reverse" : "normal",
                      }}
                    >
                      {[...column, ...column].map((logo, i) => (
                        <div key={i} className={styles.logoTile}>
                          <Image
                            src={logo.src}
                            alt={logo.name}
                            width={64}
                            height={64}
                            className={styles.logoImg}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <Section>
        <SectionHeader
          eyebrow="Why partner with WhiteHawk"
          title="One platform. Many opportunities."
          description="A unified cybersecurity management platform that partners can sell, implement, and build services around."
        />
        <div className={styles.benefitsGrid}>
          {benefits.map((b) => (
            <Card key={b.title}>
              <div className={styles.iconBox}>
                <b.icon size={20} />
              </div>
              <div className={styles.cardTitle}>{b.title}</div>
              <div className={styles.cardBody}>{b.body}</div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Types */}
      <Section bg="wash">
        <SectionHeader
          eyebrow="Partner types"
          title="Who the partner program is for"
          description="Tailored partnership models for every type of security services provider."
        />
        <div className={styles.typesGrid}>
          {types.map((t) => (
            <Card key={t.title}>
              <div className={styles.iconBox}>
                <t.icon size={20} />
              </div>
              <div className={styles.cardTitle}>{t.title}</div>
              <p className={styles.typeBody}>{t.body}</p>
         
            </Card>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section>
        <SectionHeader
          eyebrow="How partners engage"
          title="Multiple pathways to value"
          description="Choose how you want to work with WhiteHawk."
        />
        <div className={styles.stepsGrid}>
          {steps.map((s, i) => (
            <div key={s.n} className={styles.stepWrap}>
              <Card className={styles.stepCard}>
                <div className={styles.stepLabel}>
                  Step {s.n}
                </div>
                <div className={styles.stepTitle}>{s.t}</div>
                <div className={styles.stepDesc}>{s.d}</div>
              </Card>
              {i < steps.length - 1 && (
                <ArrowRight
                  className={styles.stepArrow}
                  size={18}
                />
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Access partner platform */}
      <Section bg="wash">
        <Card className={styles.accessCard}>
          <div className={styles.accessTitle}>Already a partner?</div>
          <p className={styles.accessBody}>
            Sign in to the partner portal to register deals, track pipeline and access enablement content.
          </p>
          <div className={styles.accessActions}>
            <Button as="a" href="https://partner.whiteguard.io/login" variant="primary" size="lg">
              Open partner platform <ArrowUpRight size={14} />

              
            </Button>
          </div>
        </Card>
      </Section>

      {/* FAQ */}
      <Section>
        <FAQSection
          eyebrow="Partner FAQ"
          heading="Common questions"
          body="Still stuck? A security engineer will answer within one business day."
          items={faqs}
        />
      </Section>

      <CTABand
        title="Build with us"
        primary={{ label: "Apply to become a partner", href: "https://whiteguard.io/become-a-partner" }}
        secondary={{ label: "Partner platform", href: "https://partner.whiteguard.io/login" }}
      />
    </SiteLayout>
  );
}
