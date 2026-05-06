"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import styles from "./ChallengesSection.module.scss";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useLeadModalOpener } from "@/hooks/useLeadModalOpener";
import itIcon from "@/../public/assets/icons/it-icon.svg";
import securityIcon from "@/../public/assets/icons/security-icon.svg";
import enterpriseIcon from "@/../public/assets/icons/enterprise-icon.svg";
import mspIcon from "@/../public/assets/icons/msp-icon.svg";


type TabItem = { title: string; text: string };

type TabConfig = {
  id: string;
  label: string;
  icon: typeof itIcon;
  cardTitle: string;
  items: TabItem[];
  image: string;
  imageAlt: string;
  unoptimized?: boolean;
};

const TABS: TabConfig[] = [
  {
    id: "it",
    label: "IT Teams",
    icon: itIcon,
    cardTitle: "Simplify IT Security Without Slowing Operations",
    image: "/assets/imgs/home/it.png",
    imageAlt: "IT operations dashboard",
    items: [
      {
        title: "Full Asset Visibility",
        text: "Track all IT and non-IT assets from a single dashboard with automated discovery",
      },
      {
        title: "Reduced Manual Work",
        text: "Automate vulnerability tracking, reporting, and routine security checks",
      },
      {
        title: "Operational Efficiency",
        text: "Reduce response time and manual effort with automated alerts and workflows",
      },
    ],
  },
  {
    id: "security",
    label: "Security Teams",
    icon: securityIcon,
    cardTitle: "Advanced Threat Detection for Modern Defenders",
    image: "/assets/imgs/home/security.png",
    imageAlt: "Security operations view",
    items: [
      {
        title: "Real-time Alerts",
        text: "Catch threats before they escalate",
      },
      {
        title: "Deep Forensics",
        text: "Understand the 'how' and 'why' of attacks",
      },
      {
        title: "Collaborative Workflows",
        text: "Share findings instantly."}
    ],
  },
  {
    id: "msp",
    label: "MSPs",
    icon: mspIcon,
    cardTitle: "Scale Your Security Offering with Ease",
    image: "/assets/imgs/home/msp.png",
    imageAlt: "MSP multi-tenant overview",
    unoptimized: true,
    items: [
      {
        title: "Multi-Tenant Management",
        text: "Handle all clients in one view",
      },
      {
        title: "Automated Reporting",
        text: "Show value to your customers effortlessly",
      },
      {
        title: "White-label Ready",
        text: "Brand the platform as your own",
      },
    ],
  },
  {
    id: "enterprise",
    label: "Enterprise",
    icon: enterpriseIcon,
    cardTitle: "Enterprise-Grade Governance & Compliance",
    image: "/assets/imgs/home/enterprise.png",
    imageAlt: "Enterprise compliance and risk",
    items: [
      {
        title: "Unified GRC",
        text: "Streamline audits and policy enforcement",
      },
      {
        title: "Customizable Dashboards",
        text: "Metrics that matter to the C-suite",
      },
      {
        title: "24/7 Support",
        text: "Dedicated experts whenever you need them",
      },
    ],
  },
];

export function ChallengesSection() {
  const [activeId, setActiveId] = useState(TABS[0].id);
  const { openFromButtonTitle } = useLeadModalOpener();
  const active = TABS.find((t) => t.id === activeId) ?? TABS[0];

  return (
    <section className={styles.challengesSection}>
      <div className={styles.container}>
        <div className={styles.kickerWrap}>
          <span className={styles.kicker}>Use Cases</span>
        </div>
        <h2 className={styles.title}>Built for real-world security challenges</h2>
        <p className={styles.subtitle}>
          From preventing breaches to training your team, WhiteHawk adapts to your specific security
          needs and industry requirements.
        </p>

        <div className={styles.tabs} role="tablist" aria-label="Audience">
          {TABS.map((tab) => {
            const selected = activeId === tab.id;
            return (
              <button
                id={`tab-${tab.id}`}
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                className={`${styles.tab} ${selected ? styles.tabActive : ""}`}
                onClick={() => setActiveId(tab.id)}
              >
                <span className={styles.tabIconWrap} aria-hidden>
                  <Image
                    src={tab.icon}
                    alt=""
                    width={16}
                    height={16}
                    className={styles.tabIconImg}
                  />
                </span>
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className={styles.card} role="tabpanel" aria-labelledby={`tab-${activeId}`}>
          <div className={styles.cardLeft}>
            <h3 className={styles.cardTitle}>{active.cardTitle}</h3>
            <ul className={styles.itemList}>
              {active.items.map((item) => (
                <li key={item.title} className={styles.itemRow}>
                  <span className={styles.itemCheck} aria-hidden>
                    <Check className={styles.itemCheckSvg} strokeWidth={3} size={14} />
                  </span>
                  <div className={styles.itemCopy}>
                    <p className={styles.itemTitle}>{item.title}</p>
                    <p className={styles.itemText}>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <PrimaryButton
              title="Schedule Demo"
              variant="secondary"
              onClick={() => openFromButtonTitle("Schedule Demo")}
              className={styles.button}
            />
          </div>
          <div className={styles.cardRight}>
            <div className={styles.imageGlow} aria-hidden />
            <div className={styles.imageFrame}>
              <Image
                key={active.image}
                src={active.image}
                alt={active.imageAlt}
                width={400}
                height={464}
                className={styles.panelImage}
                sizes="(max-width: 900px) 100vw, 400px"
                loading="lazy"
                fetchPriority="low"
                decoding="async"
                unoptimized={active.unoptimized}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
