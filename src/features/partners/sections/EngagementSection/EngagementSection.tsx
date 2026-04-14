"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./EngagementSection.module.scss";
import sell from "@/../public/assets/icons/Sell.svg";
import deliver from "@/../public/assets/icons/Deliver.svg";
import build from "@/../public/assets/icons/Build.svg";
const STEPS = [
  {
    id: "sell",
    title: "Sell",
    body: "Resell licenses to your customer base. Bundle White Hawk with your existing services. Generate recurring revenue streams through subscription-based models.",
    activeNode: 1,
  },
  {
    id: "deliver",
    title: "Deliver",
    body: "Standardize workflows across engagements. Reduce delivery time with built-in templates and automation. Deliver assessments, SOC services, and compliance programs faster.",
    activeNode: 2,
  },
  {
    id: "build",
    title: "Build",
    body: "Create custom services on top of the platform. Integrate your proprietary tools and methodologies. Expand your offerings without building from scratch.",
    activeNode: 0,
  },
] as const;

const CX = 193;
const CY = 193;
const R = 155;
const RAD = (deg: number) => (deg * Math.PI) / 180;
const pt = (deg: number) => ({
  x: CX + R * Math.cos(RAD(deg)),
  y: CY + R * Math.sin(RAD(deg)),
});
const NODES = [
  { deg: -90, label: "Sell" },
  { deg: 30, label: "Deliver" },
  { deg: 150, label: "Build" },
] as const;

function arcPath(fromDeg: number, toDeg: number) {
  const a = pt(fromDeg);
  const b = pt(toDeg);
  return `M ${a.x} ${a.y} A ${R} ${R} 0 0 1 ${b.x} ${b.y}`;
}

const ARC_PATHS = [0, 1, 2].map((i) =>
  arcPath(NODES[i].deg, NODES[(i + 1) % 3].deg)
);

const ICON_SRC = [sell, deliver, build] as const;

/** ~120° arc length for r=155 */
const ARC_LEN_APPROX = (2 * Math.PI * R) / 3;

export function EngagementSection() {
  const [active, setActive] = useState(0);
  /** 1 = first arc only … 3 = all three blue */
  const [filledCount, setFilledCount] = useState(1);
  /** stroke-dashoffset per arc (0 = fully drawn blue, L = hidden) */
  const [offsets, setOffsets] = useState<[number, number, number]>(() => [
    0,
    ARC_LEN_APPROX,
    ARC_LEN_APPROX,
  ]);
  const lengthsRef = useRef<[number, number, number]>([
    ARC_LEN_APPROX,
    ARC_LEN_APPROX,
    ARC_LEN_APPROX,
  ]);
  const [dashLengths, setDashLengths] = useState<[number, number, number]>([
    ARC_LEN_APPROX,
    ARC_LEN_APPROX,
    ARC_LEN_APPROX,
  ]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([null, null, null]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef(0);
  const step = STEPS[active];

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useLayoutEffect(() => {
    const L: [number, number, number] = [0, 0, 0];
    ARC_PATHS.forEach((_, i) => {
      const el = pathRefs.current[i];
      if (el) L[i] = el.getTotalLength();
    });
    if (L[0] > 0) {
      lengthsRef.current = L;
      queueMicrotask(() => {
        setDashLengths(L);
        setOffsets((prev) => {
          if (prev[1] === ARC_LEN_APPROX && prev[2] === ARC_LEN_APPROX) {
            return [0, L[1], L[2]];
          }
          return prev;
        });
      });
    }
  }, []);

  const syncStepState = useCallback((stepIndex: number) => {
    const L = lengthsRef.current;
    const nextActive = Math.max(0, Math.min(STEPS.length - 1, stepIndex));
    setActive(nextActive);
    setFilledCount(nextActive + 1);
    setOffsets([0, 1, 2].map((i) => (i <= nextActive ? 0 : L[i])) as [number, number, number]);
  }, []);

  const onPick = useCallback(
    (stepIndex: number) => {
      if (stepIndex === active) return;
      syncStepState(stepIndex);
    },
    [active, syncStepState]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateActiveFromScroll = () => {
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      const rect = sectionEl.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      const scrollableDistance = Math.max(1, rect.height - vh);
      const progress = Math.min(1, Math.max(0, -rect.top / scrollableDistance));
      const nextStep = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));

      if (nextStep !== activeRef.current) {
        syncStepState(nextStep);
      }
    };

    updateActiveFromScroll();
    window.addEventListener("scroll", updateActiveFromScroll, { passive: true });
    window.addEventListener("resize", updateActiveFromScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActiveFromScroll);
      window.removeEventListener("resize", updateActiveFromScroll);
    };
  }, [syncStepState]);

  return (
    <section className={styles.section} aria-labelledby="engage-heading">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 id="engage-heading" className={styles.title}>
            How Partners Engage
          </h2>
          <p className={styles.subtitle}>
            Multiple pathways to value, choose how you want to work with White Hawk
          </p>
        </header>

        <div
          ref={sectionRef}
          className={styles.scrollStage}
          style={{ minHeight: `calc(${STEPS.length} * 100vh)` }}
        >
          <div className={styles.stickyWrap}>
            <div className={styles.row}>
              <div className={styles.textViewport}>
                <div
                  className={styles.textTrack}
                  style={{
                    transform: `translateY(calc(-${active} * var(--slide-h)))`,
                  }}
                >
                  {STEPS.map((s, i) => {
                    const isActive = i === active;
                    return (
                      <div key={s.id} className={styles.textSlide}>
                        <button
                          type="button"
                          className={`${styles.textBlock} ${isActive ? styles.textBlockActive : ""}`}
                          onClick={() => onPick(i)}
                          aria-pressed={isActive}
                        >
                          <div className={styles.textBlockHead}>
                            <span
                              className={`${styles.iconCircle} ${isActive ? styles.iconCircleActive : ""}`}
                            >
                              <Image
                                src={ICON_SRC[i]}
                                alt=""
                                width={24}
                                height={24}
                                className={`${styles.iconImg} ${isActive ? styles.iconImgActive : ""}`}
                              />
                            </span>
                            <span className={styles.textTitle}>{s.title}</span>
                          </div>
                          <p className={styles.textBody}>{s.body}</p>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={styles.diagramWrap}>
                <svg className={styles.diagram} viewBox="0 0 386 386" aria-hidden>
                  {[0, 1, 2].map((i) => (
                    <path
                      key={`g-${i}`}
                      d={ARC_PATHS[i]}
                      fill="none"
                      strokeWidth={10}
                      strokeLinecap="round"
                      className={styles.arcMuted}
                    />
                  ))}
                  {[0, 1, 2].map((i) => (
                    <path
                      key={`b-${i}`}
                      ref={(el) => {
                        pathRefs.current[i] = el;
                      }}
                      d={ARC_PATHS[i]}
                      fill="none"
                      strokeWidth={10}
                      strokeLinecap="round"
                      className={styles.arcBlue}
                      style={{
                        strokeDasharray: dashLengths[i],
                        strokeDashoffset: offsets[i],
                      }}
                    />
                  ))}
                  {NODES.map((n, i) => {
                    const p = pt(n.deg);
                    const nodeFilled =
                      filledCount >= 2 || (filledCount >= 1 && (i === 0 || i === 1));
                    const stepForNode = i === 0 ? 2 : i === 1 ? 0 : 1;
                    return (
                      <g key={n.deg}>
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={18}
                          className={styles.nodeHit}
                          onClick={() => onPick(stepForNode)}
                          style={{ cursor: "pointer" }}
                        />
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={11}
                          className={nodeFilled ? styles.nodeDotActive : styles.nodeDot}
                        />
                      </g>
                    );
                  })}
                </svg>
                <div className={styles.centerCard}>
                  <div className={styles.centerBtn} aria-label={`${step.title} engagement`}>
                    <Image
                      src={ICON_SRC[active]}
                      alt=""
                      width={40}
                      height={40}
                      className={styles.centerIcon}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
