"use client";



import { useRef, useState, useEffect } from "react";

import styles from "./ScatteredUnifiedSection.module.scss";



/** Full-bleed scattered squares: % left, % top, size px, rotate deg */

const SCATTER_BOXES: { left: number; top: number; size: number; rotate: number }[] = [

  { left: -2, top: 4, size: 44, rotate: -12 },

  { left: 6, top: 18, size: 36, rotate: 8 },

  { left: 3, top: 42, size: 52, rotate: -6 },

  { left: 8, top: 68, size: 38, rotate: 14 },

  { left: 1, top: 88, size: 48, rotate: -9 },

  { left: 14, top: 8, size: 32, rotate: 22 },

  { left: 18, top: 55, size: 56, rotate: -4 },

  { left: 12, top: 78, size: 40, rotate: 11 },

  { left: 28, top: 2, size: 42, rotate: -18 },

  { left: 22, top: 32, size: 34, rotate: 6 },

  { left: 26, top: 48, size: 50, rotate: -11 },

  { left: 30, top: 82, size: 36, rotate: 9 },

  { left: 42, top: 12, size: 48, rotate: 15 },

  { left: 38, top: 38, size: 30, rotate: -7 },

  { left: 44, top: 62, size: 44, rotate: 4 },

  { left: 40, top: 90, size: 38, rotate: -14 },

  { left: 55, top: 6, size: 40, rotate: -8 },

  { left: 52, top: 28, size: 54, rotate: 12 },

  { left: 58, top: 52, size: 32, rotate: -3 },

  { left: 54, top: 76, size: 46, rotate: 18 },

  { left: 68, top: 14, size: 36, rotate: -16 },

  { left: 72, top: 44, size: 42, rotate: 7 },

  { left: 66, top: 68, size: 50, rotate: -5 },

  { left: 70, top: 88, size: 34, rotate: 10 },

  { left: 82, top: 8, size: 48, rotate: -13 },

  { left: 86, top: 36, size: 38, rotate: 5 },

  { left: 80, top: 58, size: 44, rotate: -10 },

  { left: 88, top: 78, size: 40, rotate: 16 },

  { left: 94, top: 22, size: 52, rotate: -6 },

  { left: 96, top: 48, size: 36, rotate: 8 },

  { left: 92, top: 92, size: 46, rotate: -12 },

  { left: 48, top: 20, size: 28, rotate: 20 },

  { left: 50, top: 72, size: 32, rotate: -20 },

];



export function ScatteredUnifiedSection() {

  const sectionRef = useRef<HTMLElement>(null);

  const [progress, setProgress] = useState(0);



  useEffect(() => {

    const section = sectionRef.current;

    if (!section) return;



    const onScroll = () => {

      const rect = section.getBoundingClientRect();

      const viewportHeight = window.innerHeight;

      const scrolled = -rect.top;

      const p = Math.max(0, Math.min(1, scrolled / viewportHeight));

      setProgress(p);

    };



    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);

  }, []);



  return (

    <section ref={sectionRef} className={styles.section}>

      <div className={styles.stickyWrap}>

        <div

          className={styles.panelScattered}

          style={{ transform: `translateX(${-progress * 100}%)` }}

        >

          <div className={styles.scatteredBg} aria-hidden>

            {SCATTER_BOXES.map((b, i) => (

              <span

                key={i}

                className={styles.scatterSquare}

                style={{

                  left: `${b.left}%`,

                  top: `${b.top}%`,

                  width: b.size,

                  height: b.size,

                  transform: `translate(-50%, -50%) rotate(${b.rotate}deg)`,

                }}

              />

            ))}

          </div>

          <div className={styles.textColumn}>

            <h2 className={styles.title}>

              <span className={styles.titleLine}>Scattered.</span>

              <span className={styles.titleLine}>Unclear.</span>

            </h2>

            <p className={styles.subtitle}>

              Teams were forced to manage security across dozens of tools.

            </p>

          </div>

        </div>

        <div

          className={styles.panelUnified}

          style={{ transform: `translateX(${(1 - progress) * 100}%)` }}

        >

          {/* Figma 864:8314 — ProblemSolutionSection / unified panel */}
          <div className={styles.unifiedStack}>
            <div className={styles.unifiedFrame}>
              <div className={styles.unifiedIconWrap} aria-hidden>
                <svg
                  className={styles.unifiedShieldIcon}
                  xmlns="http://www.w3.org/2000/svg"
                  width={80}
                  height={80}
                  viewBox="0 0 80 80"
                  fill="none"
                >
                  <path
                    d="M66.6666 43.3322C66.6666 59.9989 54.9999 68.3322 41.1333 73.1656C40.4071 73.4116 39.6184 73.3998 38.8999 73.1322C24.9999 68.3322 13.3333 59.9989 13.3333 43.3322V19.9989C13.3333 19.1148 13.6844 18.267 14.3096 17.6419C14.9347 17.0168 15.7825 16.6656 16.6666 16.6656C23.3333 16.6656 31.6666 12.6656 37.4666 7.59889C38.1728 6.99556 39.0711 6.66406 39.9999 6.66406C40.9287 6.66406 41.8271 6.99556 42.5333 7.59889C48.3666 12.6989 56.6666 16.6656 63.3333 16.6656C64.2173 16.6656 65.0652 17.0168 65.6903 17.6419C66.3154 18.267 66.6666 19.1148 66.6666 19.9989V43.3322Z"
                    stroke="#003859"
                    strokeWidth={3.33333}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M30 39.9987L36.6667 46.6654L50 33.332"
                    stroke="#003859"
                    strokeWidth={3.33333}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className={styles.unifiedInnerBlur} aria-hidden />
            </div>
            <div className={styles.unifiedCardCopy}>
              <h3 className={styles.rightTitle}>Unified Structure.</h3>
              <p className={styles.rightSubtitle}>
                White Hawk brings everything together into one coherent platform.
              </p>
            </div>
          </div>

        </div>

      </div>

    </section>

  );

}

