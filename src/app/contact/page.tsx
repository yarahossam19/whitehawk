import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SiteLayout } from "@/components/site/SiteLayout/SiteLayout";
import { Section } from "@/components/site/ui/Section/Section";
import { CTABand } from "@/components/site/ui/CTABand/CTABand";
import { CheckCircle2 } from "lucide-react";
import { ContactForm } from "./contact-form";
import styles from "./page.module.scss";

const highlights = [
  "Discuss what your business needs (and doesn't need)",
  "Explore the full capabilities of the White Hawk platform",
  "Tailor strategies to automate your security and compliance",
];

export const metadata: Metadata = pageMetadata({
  path: "/contact",
  title: "Contact us · Book a Demo — White Hawk",
  description:
    "Talk to a security engineer. Book a 30-minute working demo, ask about pricing, or start a partner conversation.",
});

export default function ContactPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className={styles.hero}>
        <div aria-hidden className={styles.dotGrid} />
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <div className={styles.eyebrow}>Contact</div>
            <h1 className={styles.title}>
              Talk to a security engineer, <span className={styles.titleAccent}>not a chatbot</span>.
            </h1>
            <p className={styles.subtitle}>
              30-minute working session, no slideware. Bring your questions, we bring the product.
            </p>
          </div>
        </div>
      </section>

      {/* Form + info */}
      <Section>
        <div className={styles.grid}>
          <ContactForm />

          {/* Side info */}
          <div className={styles.sideInfo}>
            <h2 className={styles.sideTitle}>Find out what White Hawk can do for your business.</h2>
            <p className={styles.sideSubtitle}>Meet one-on-one with a White Hawk expert to:</p>
            <ul className={styles.checklist}>
              {highlights.map((h) => (
                <li key={h} className={styles.checklistItem}>
                  <CheckCircle2 size={18} className={styles.checkIcon} />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CTABand
        title="Two clicks from here to a live product demo"
        primary={{ label: "Book a Demo", to: "/contact" }}
        secondary={{ label: "See pricing", to: "/pricing" }}
      />
    </SiteLayout>
  );
}
