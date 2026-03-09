"use client";

import { useState } from "react";
import styles from "./WhyChooseSection.module.scss";

const FEATURES = [
  {
    id: "unified",
    title: "Unified Platform for Total Visibility",
    description:
      "No more juggling between multiple tools. White Hawk brings everything into one place, giving you a clear, centralized view of your entire security posture.",
    icon: "unified",
  },
  {
    id: "timeline",
    title: "Timeline and Audit Trail",
    description:
      "Every action is logged and traceable. Build audit-ready timelines and demonstrate compliance with automated evidence collection and reporting.",
    icon: "clock",
  },
  {
    id: "ticketing",
    title: "Integrated Ticketing and Workflows",
    description:
      "Connect findings to tasks and assign owners without leaving the platform. Track progress from discovery to remediation with customizable workflows.",
    icon: "document",
  },
  {
    id: "incident",
    title: "Streamlined Incident and Vulnerability Management",
    description:
      "Keep track of security issues from start to finish with White Hawk's ticketing and reporting systems. Easily prioritize, resolve, and report vulnerabilities or incidents with full traceability.",
    icon: "siren",
  },
  {
    id: "reporting",
    title: "Powerful Reporting and Analytics",
    description:
      "Turn data into decisions with built-in reports and dashboards. Export audit-ready reports, track KPIs, and share insights with stakeholders in one click.",
    icon: "monitor",
  },
  {
    id: "trends",
    title: "Trends and Benchmarking",
    description:
      "See how your security posture changes over time. Compare against benchmarks and industry standards to focus efforts where they matter most.",
    icon: "graph",
  },
  {
    id: "roles",
    title: "Roles and Access Control",
    description:
      "Assign the right level of access to every user. Support auditors, analysts, and executives with role-based views and secure, compliant access.",
    icon: "person",
  },
  {
    id: "automation",
    title: "Automation and Integrations",
    description:
      "Connect White Hawk to your existing tools. Automate scans, sync assets, and keep everything up to date with out-of-the-box and custom integrations.",
    icon: "refresh",
  },
];

const ICON_SVG: Record<string, React.ReactNode> = {
  unified: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      <path d="M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12" />
    </svg>
  ),
  clock: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
  document: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8M16 17H8M10 9H8" />
    </svg>
  ),
  siren: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  monitor: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
  graph: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 20V10M18 20V4M6 20v-4" />
      <path d="M4 8l4 4 4-4 8 4" />
    </svg>
  ),
  person: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
      <path d="M14 10h4v4h-4z" />
    </svg>
  ),
  refresh: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 21h5v-5" />
    </svg>
  ),
};

export function WhyChooseSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={styles.section} aria-labelledby="why-choose-title">
      <div className={styles.container}>
        <h2 id="why-choose-title" className={styles.title}>
          Why Choose White Hawk?
        </h2>
        <p className={styles.subtitle}>
          With White Hawk, you don&apos;t just get a tool—you get a comprehensive,
          proactive cybersecurity solution that scales with your business.
        </p>

        <div className={styles.trackWrap}>
          <div className={styles.baseline} aria-hidden />
          <span className={`${styles.cornerDotBottom} ${styles.left}`} aria-hidden />
          <span className={`${styles.cornerDotBottom} ${styles.right}`} aria-hidden />
          <div className={styles.track}>
          {FEATURES.map((feature, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={feature.id}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
              >
                <span className={styles.verticalLine} aria-hidden />
                <span className={styles.cornerDot} aria-hidden />
                {isOpen ? (
                  <div className={styles.card}>
                    <button
                      type="button"
                      className={styles.cardIconBtn}
                      onClick={() => setOpenIndex(null)}
                      aria-expanded={true}
                      aria-controls={`why-card-body-${index}`}
                      id={`why-card-heading-${index}`}
                      title={feature.title}
                    >
                      <span className={styles.cardIconWrap}>
                        <span className={styles.cardIcon}>{ICON_SVG[feature.icon]}</span>
                      </span>
                    </button>
                    <div
                      id={`why-card-body-${index}`}
                      className={styles.cardBody}
                      role="region"
                      aria-labelledby={`why-card-heading-${index}`}
                    >
                      <h3 className={styles.cardTitle}>{feature.title}</h3>
                      <p className={styles.cardDescription}>{feature.description}</p>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    className={styles.dot}
                    onClick={() => setOpenIndex(index)}
                    aria-expanded={false}
                    aria-controls={`why-card-body-${index}`}
                    title={feature.title}
                  >
                    <span className={styles.dotIconWrap}>
                      <span className={styles.dotIcon}>{ICON_SVG[feature.icon]}</span>
                    </span>
                  </button>
                )}
              </div>
            );
          })}
          </div>
        </div>

        <div className={styles.useCasesDivider}>
          <span className={styles.useCasesLine} />
          <span className={styles.useCasesLabel}>USE CASES</span>
          <span className={styles.useCasesLine} />
        </div>
      </div>
    </section>
  );
}
