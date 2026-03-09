"use client";

import { useState } from "react";
import styles from "./ChallengesSection.module.scss";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import itIcon from "@/../public/assets/icons/it-icon.svg";
import securityIcon from "@/../public/assets/icons/security-icon.svg";
import enterpriseIcon from "@/../public/assets/icons/enterprise-icon.svg";
import mspIcon from "@/../public/assets/icons/msp-icon.svg";
import Image from "next/image";
const TABS = [
  { id: "it", label: "IT News", icon: itIcon },
  { id: "security", label: "Security News", icon: securityIcon },
  { id: "enterprise", label: "Enterprise News", icon: enterpriseIcon },
  { id: "msp", label: "MSP News", icon: mspIcon },
];

const BULLETS = [
  "Full Asset Visibility",
  "Reduced Manual Work",
  "Optimized Efficiency",
];

export function ChallengesSection() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <section className={styles.challengesSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Built for real-world security challenges</h2>
        <p className={styles.subtitle}>
          Stay ahead with insights and solutions designed for today&apos;s security landscape.
        </p>

        <div className={styles.tabs} role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Image
                src={tab.icon}
                alt={tab.label}
                width={20}
                height={20}
                className={styles.tabIcon}
              />
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.card}>
          <div className={styles.cardLeft}>
            <h3 className={styles.cardTitle}>
              Simplify IT Security Without Slowing Operations
            </h3>
            <ul className={styles.bulletList}>
              {BULLETS.map((text) => (
                <li key={text} className={styles.bulletItem}>
                  <span className={styles.check} aria-hidden />
                  {text}
                </li>
              ))}
            </ul>
            <PrimaryButton title="Request Demo" variant="secondary" href="#" className={styles.button}/>
          </div>
          <div className={styles.cardRight}>
            <div className={styles.imagePlaceholder} aria-hidden>
              <span className={styles.placeholderLabel}>Dashboard / workspace</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
