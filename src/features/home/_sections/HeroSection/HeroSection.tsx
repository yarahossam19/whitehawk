"use client";

import Image from "next/image";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useDemoModal } from "@/contexts/DemoModalContext";
import styles from "./HeroSection.module.scss";
import whitehawkLogo from "@/../public/assets/icons/logo/whitehawk-logo.svg";
import router from "@/../public/assets/icons/Router.svg";
import shield from "@/../public/assets/icons/Shield.svg";
import list from "@/../public/assets/icons/List.svg";
import hacker from "@/../public/assets/icons/Hacker.svg";
export function HeroSection() {
  const { openDemoModal } = useDemoModal();
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroLeft}>
          <h1 className={styles.heroTitle}>
            Manage your entire cybersecurity program
            <br />
            in one platform
          </h1>
          <p className={styles.heroSubtitle}>
            Automate vulnerability management, streamline compliance, and proactively detect threats across your organization – all in one integrated platform
          </p>
          <div className={styles.heroButtons}>
            <PrimaryButton title="Get Demo" variant="primary" onClick={openDemoModal} className={styles.heroButton} />
            <PrimaryButton title="Start free trial" variant="secondary" onClick={openDemoModal} className={styles.heroButton} />
          </div>
        </div>
        <div className={styles.heroRight}>
          <HeroDiagram />
        </div>
      </div>
      <div className={styles.cloudWrap} aria-hidden>
        <svg
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.cloudSvg}
        >
          <defs>
            <linearGradient id="hero-cloud-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="10%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#b8e0f0" />
              <stop offset="70%" stopColor="#50a0c0" stopOpacity="0.6" />
              <stop offset="90%" stopColor="#003858" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#002439" stopOpacity="0" />
            </linearGradient>
            <filter id="hero-cloud-blur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
              </feMerge>
            </filter>
          </defs>
          {/* Cloud edge - varying heights (tall / medium / short peaks), tapers at sides */}
          <path
            className={styles.cloud}
            fill="url(#hero-cloud-gradient)"
            filter="url(#hero-cloud-blur)"
            d="M0,200 C80,95 220,175 380,110 C520,165 640,70 780,155 C920,85 1020,170 1150,120 L1200,200 L0,200 Z"
          />
          <path
            className={`${styles.cloud} ${styles.cloudLayer2}`}
            fill="url(#hero-cloud-gradient)"
            filter="url(#hero-cloud-blur)"
            d="M0,200 C120,145 280,115 420,165 C580,95 720,150 860,105 C980,160 1080,90 1200,200 L1200,200 L0,200 Z"
          />
        </svg>
      </div>
    </section>
  );
}

function HeroDiagram() {

        const cx = 50;
        const cy = 50;
        const corner = 20; // L-shaped bend distance from center
        const top = { x: 50, y: 12 };
        const right = { x: 88, y: 50 };
        const bottom = { x: 50, y: 88 };
        const left = { x: 12, y: 50 };
        const iconSize = 80;

        // L-shaped paths: bend perpendicular first, then to icon (no cross)
        const pathTop = `M ${cx} ${cy} L ${cx + corner} ${cy} L ${cx + corner} ${top.y} L ${top.x} ${top.y}`;
        const pathRight = `M ${cx} ${cy} L ${cx} ${cy - corner} L ${right.x} ${cy - corner} L ${right.x} ${right.y}`;
        const pathBottom = `M ${cx} ${cy} L ${cx - corner} ${cy} L ${cx - corner} ${bottom.y} L ${bottom.x} ${bottom.y}`;
        const pathLeft = `M ${cx} ${cy} L ${cx} ${cy + corner} L ${left.x} ${cy + corner} L ${left.x} ${left.y}`;

        const pathTopBack = `M ${top.x} ${top.y} L ${cx + corner} ${top.y} L ${cx + corner} ${cy} L ${cx} ${cy}`;
        const pathRightBack = `M ${right.x} ${right.y} L ${right.x} ${cy - corner} L ${cx} ${cy - corner} L ${cx} ${cy}`;
        const pathBottomBack = `M ${bottom.x} ${bottom.y} L ${cx - corner} ${bottom.y} L ${cx - corner} ${cy} L ${cx} ${cy}`;
        const pathLeftBack = `M ${left.x} ${left.y} L ${left.x} ${cy + corner} L ${cx} ${cy + corner} L ${cx} ${cy}`;
      
        const motionPath = `
          ${pathTop} ${pathTopBack}
          ${pathRight} ${pathRightBack}
          ${pathBottom} ${pathBottomBack}
          ${pathLeft} ${pathLeftBack}
        `;
      
       
  return (
    <div className={styles.diagramWrap}>
      <svg className={styles.diagramSvg} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <path id="hero-diagram-path" d={motionPath} fill="none" />
        </defs>
        {/* Curved dashed lines: center -> icon (like first image) */}
        <path d={pathTop} className={styles.diagramLine} fill="none" />
        <path d={pathRight} className={styles.diagramLine} fill="none" />
        <path d={pathBottom} className={styles.diagramLine} fill="none" />
        <path d={pathLeft} className={styles.diagramLine} fill="none" />
        <circle r="2" fill="#abe0ff" className={styles.diagramDot}>
          <animateMotion dur="15s" repeatCount="indefinite" path={motionPath} />
        </circle>
      </svg>
      <div className={styles.diagramCenter}>
        <Image
          src={whitehawkLogo}
          alt=""
          width={420}
          height={200}
          priority
          fetchPriority="high"
          sizes="(max-width: 700px) 280px, 420px"
        />
      </div>
      {/* Icons at cardinal positions: top, right, bottom, left */}
      <div className={styles.diagramIcon} style={{ top: "12%", left: "45%", transform: "translate(-50%, -50%)" }}>
        <Image src={router} alt="" width={iconSize} height={iconSize} />
      </div>
      <div className={styles.diagramIcon} style={{ top: "57%", right: "20%", transform: "translate(50%, -50%)" }}>
        <Image src={list} alt="" width={iconSize} height={iconSize} />
      </div>
      <div className={styles.diagramIcon} style={{ bottom: "12%", left: "55%", transform: "translate(-50%, 50%)" }}>
        <Image src={shield} alt="" width={iconSize} height={iconSize} />
      </div>
      <div className={styles.diagramIcon} style={{ top: "43%", left: "21%", transform: "translate(-50%, -50%)" }}>
        <Image src={hacker} alt="" width={iconSize} height={iconSize} />
      </div>
    </div>
  );
}
