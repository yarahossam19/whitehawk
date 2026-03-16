"use client";

import Image from "next/image";
import styles from "./PlatformSection.module.scss";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import offensive from "@/../public/assets/icons/navbar/Offensive.svg";
import defensive from "@/../public/assets/icons/navbar/Defensive.svg";
import grc from "@/../public/assets/icons/navbar/GRC.svg";
import assetManagement from "@/../public/assets/icons/navbar/Asset Management.svg";
import bg from "@/../public/assets/imgs/platform-bg.png";
import greenShield from "@/../public/assets/icons/green-shield.svg";
import { OptimizedDashboardVideo } from "./OptimizedDashboardVideo";

const FEATURES = [
  { label: "Offensive Security", icon: offensive },
  { label: "Defensive Security", icon: defensive },
  { label: "GRC", icon: grc },
  { label: "Asset Management", icon: assetManagement },
];

export function PlatformSection() {
  return (
    <section className={styles.platformSection} style={{ backgroundImage: `url(${bg.src})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className={styles.bgPattern} aria-hidden />
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.content}>
            <h2 className={styles.title}>
              One platform to run your cybersecurity program
            </h2>
            <p className={styles.subtitle}>
              A unified workspace for tasks, evidence, risk, assets, findings, and reporting
            </p>
            <ul className={styles.featureList}>
              {FEATURES.map(({ label, icon }) => (
                <li key={label} className={styles.featureItem}>
                  <span className={styles.featureIcon}>
                    <Image src={icon} alt="" width={25} height={25} />
                  </span>
                  <span className={styles.featureLabel}>{label}</span>
                </li>
              ))}
            </ul>
          </div>
          <PrimaryButton title="Explore Our Platform" variant="secondary" href="#" className={styles.button}/>
        </div>
        <div className={styles.right}>
          <div className={styles.dashboardFrame}>
            <div className={styles.dashboardPlaceholder}>
              <OptimizedDashboardVideo />
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}><Image src={greenShield} alt="" width={25} height={25} /></span>
              <div className={styles.badgeText}>
                <strong>100% Secure</strong>
                <span>System Status</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
