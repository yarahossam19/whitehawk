"use client";

import { useState } from "react";
import {
  IconChannel,
  IconConsulting,
  IconIntegrator,
  IconMSSP,
} from "./PartnerAudienceIcons";
import styles from "./PartnerAudienceSection.module.scss";

/** Figma 751:8669 — Who the Partner Program Is For */
const TABS = [
  {
    id: "consulting",
    label: "Consulting & Advisory",
    Icon: IconConsulting,
    cardTitle: "Strategic Security Advisors",
    body: "Cybersecurity consultancies and GRC advisors use White Hawk to deliver structured assessments, manage client roadmaps, and demonstrate continuous value beyond the initial audit.",
    bullets: ["Risk Assessment Frameworks", "Compliance Mapping", "Strategic Roadmaps"],
  },
  {
    id: "mssp",
    label: "MSSPs & SOC",
    Icon: IconMSSP,
    cardTitle: "Managed Security Service Providers",
    body: "Centralize alerts, playbooks, and incident management. White Hawk enables you to deliver SOC services efficiently with built-in automation and visibility.",
    bullets: ["Unified alert management", "Customizable playbooks", "Multi-tenant architecture"],
  },
  {
    id: "integrators",
    label: "System Integrators",
    Icon: IconIntegrator,
    cardTitle: "Systems & Technology Integrators",
    body: "IT and security integrators use White Hawk as the management layer that ties together disparate tools, creating a unified ecosystem that is easier to maintain and upgrade.",
    bullets: ["API-first Architecture", "Seamless Tool Integration", "Unified Dashboard"],
  },
  {
    id: "channel",
    label: "Channel & Resellers",
    Icon: IconChannel,
    cardTitle: "Value-Added Resellers",
    body: "Resellers can bundle White Hawk with other software or services to create stickier customer relationships and drive higher margin recurring revenue.",
    bullets: ["High-margin Opportunities", "Bundled Service Offerings", "Sales Enablement"],
  },
] as const;

export function PartnerAudienceSection() {
  const [activeId, setActiveId] = useState<(typeof TABS)[number]["id"]>("consulting");
  const active = TABS.find((t) => t.id === activeId)!;
  const CardIcon = active.Icon;

  return (
    <section className={styles.section} aria-labelledby="partner-audience-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="partner-audience-heading" className={styles.title}>
            Who the Partner Program Is For
          </h2>
          <p className={styles.subtitle}>
            Tailored partnership models for every type of security services provider.
          </p>
        </header>

        <div className={styles.tabs} role="tablist" aria-label="Partner types">
          {TABS.map((tab) => {
            const isActive = tab.id === activeId;
            const TabIcon = tab.Icon;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`partner-audience-panel-${tab.id}`}
                id={`partner-audience-tab-${tab.id}`}
                className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                onClick={() => setActiveId(tab.id)}
              >
                <span className={styles.tabIconWrap} aria-hidden>
                  <TabIcon className={styles.tabIconSvg} />
                </span>
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={`partner-audience-panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`partner-audience-tab-${active.id}`}
          className={styles.card}
        >
          <div className={styles.cardIcon} aria-hidden>
            <CardIcon className={styles.cardIconSvg} />
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.cardTitle}>{active.cardTitle}</h3>
            <p className={styles.cardText}>{active.body}</p>
            <ul className={styles.bullets}>
              {active.bullets.map((item) => (
                <li key={item}>
                  <span className={styles.bulletDot} aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
