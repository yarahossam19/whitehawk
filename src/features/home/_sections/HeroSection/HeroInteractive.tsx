"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useDemoModal } from "@/contexts/DemoModalContext";
import styles from "./HeroSection.module.scss";
import whitehawkLogo from "@/../public/assets/icons/logo/whitehawk-logo.svg";
import router from "@/../public/assets/icons/Router.svg";
import shield from "@/../public/assets/icons/Shield.svg";
import list from "@/../public/assets/icons/List.svg";
import hacker from "@/../public/assets/icons/Hacker.svg";

function HeroDiagram({ lazyVisuals }: { lazyVisuals: boolean }) {
  const cx = 50;
  const cy = 50;
  const corner = 20;
  const top = { x: 50, y: 12 };
  const right = { x: 88, y: 50 };
  const bottom = { x: 50, y: 88 };
  const left = { x: 12, y: 50 };
  const iconSize = 80;
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

  const imgProps = lazyVisuals
    ? ({ loading: "lazy" as const, fetchPriority: "low" as const })
    : ({ priority: true as const, fetchPriority: "high" as const });

  return (
    <div className={styles.diagramWrap}>
      <svg className={styles.diagramSvg} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <path id="hero-diagram-path" d={motionPath} fill="none" />
        </defs>
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
          sizes="(max-width: 700px) 200px, 420px"
          {...imgProps}
        />
      </div>
      <div
        className={styles.diagramIcon}
        style={{ top: "12%", left: "45%", transform: "translate(-50%, -50%)" }}
      >
        <Image src={router} alt="" width={iconSize} height={iconSize} loading="lazy" />
      </div>
      <div
        className={styles.diagramIcon}
        style={{ top: "57%", right: "20%", transform: "translate(50%, -50%)" }}
      >
        <Image src={list} alt="" width={iconSize} height={iconSize} loading="lazy" />
      </div>
      <div
        className={styles.diagramIcon}
        style={{ bottom: "12%", left: "55%", transform: "translate(-50%, 50%)" }}
      >
        <Image src={shield} alt="" width={iconSize} height={iconSize} loading="lazy" />
      </div>
      <div
        className={styles.diagramIcon}
        style={{ top: "43%", left: "21%", transform: "translate(-50%, -50%)" }}
      >
        <Image src={hacker} alt="" width={iconSize} height={iconSize} loading="lazy" />
      </div>
    </div>
  );
}

export function HeroButtons() {
  const { openDemoModal } = useDemoModal();
  return (
    <div className={styles.heroButtons}>
      <PrimaryButton
        title="Get Demo"
        variant="primary"
        onClick={openDemoModal}
        className={styles.heroButton}
      />
      <PrimaryButton
        title="Start free trial"
        variant="secondary"
        onClick={openDemoModal}
        className={styles.heroButton}
      />
    </div>
  );
}

/** Mobile: defer diagram until idle so LCP stays text-first; desktop: immediate */
export function HeroDiagramSlot() {
  const [showDiagram, setShowDiagram] = useState(false);
  const [lazyVisuals, setLazyVisuals] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 700px)").matches;
    if (!mobile) {
      setShowDiagram(true);
      setLazyVisuals(false);
      return;
    }
    setLazyVisuals(true);
    const run = () => setShowDiagram(true);
    const id =
      typeof requestIdleCallback !== "undefined"
        ? requestIdleCallback(run, { timeout: 1200 })
        : window.setTimeout(run, 150);
    return () => {
      if (typeof requestIdleCallback !== "undefined") cancelIdleCallback(id as number);
      else window.clearTimeout(id as number);
    };
  }, []);

  return (
    <div className={styles.heroRight}>
      {showDiagram ? (
        <HeroDiagram lazyVisuals={lazyVisuals} />
      ) : (
        <div className={styles.diagramWrap} aria-hidden />
      )}
    </div>
  );
}
