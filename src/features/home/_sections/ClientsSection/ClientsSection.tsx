"use client";

import { useEffect, useRef, useState } from "react";
import type { StaticImageData } from "next/image";
import styles from "./ClientsSection.module.scss";
import group1client1 from "@/../public/assets/icons/clients/group1-1.svg";
import group1client2 from "@/../public/assets/icons/clients/group1-2.svg";
import group1client3 from "@/../public/assets/icons/clients/group1-3.svg";
import group1client4 from "@/../public/assets/icons/clients/group1-4.svg";
import group2client1 from "@/../public/assets/icons/clients/group2-1.svg";
import group2client2 from "@/../public/assets/icons/clients/group2-2.svg";
import group2client3 from "@/../public/assets/icons/clients/group2-3.svg";
import group2client4 from "@/../public/assets/icons/clients/group2-4.svg";
import group3client1 from "@/../public/assets/icons/clients/group3-1.svg";
import group3client2 from "@/../public/assets/icons/clients/group3-2.svg";
import group3client3 from "@/../public/assets/icons/clients/group3-3.svg";
import group4client1 from "@/../public/assets/icons/clients/group4-1.svg";
import group4client2 from "@/../public/assets/icons/clients/group4-2.svg";
import group4client3 from "@/../public/assets/icons/clients/group4-3.svg";
import group5client1 from "@/../public/assets/icons/clients/group5-1.svg";
import group5client2 from "@/../public/assets/icons/clients/group5-2.svg";
import group5client3 from "@/../public/assets/icons/clients/group5-3.svg";
import group6client1 from "@/../public/assets/icons/clients/group6-1.svg";
import group6client2 from "@/../public/assets/icons/clients/group6-2.svg";
import group6client3 from "@/../public/assets/icons/clients/group6-3.svg";
import group7client1 from "@/../public/assets/icons/clients/group7-1.svg";
import group7client2 from "@/../public/assets/icons/clients/group7-2.svg";
import group7client3 from "@/../public/assets/icons/clients/group7-3.svg";

const GROUPS: { id: number; icons: StaticImageData[] }[] = [
  { id: 1, icons: [group1client1, group1client2, group1client3, group1client4] },
  { id: 2, icons: [group2client1, group2client2, group2client3, group2client4] },
  { id: 3, icons: [group3client1, group3client2, group3client3] },
  { id: 4, icons: [group4client1, group4client2, group4client3] },
  { id: 5, icons: [group5client1, group5client2, group5client3] },
  { id: 6, icons: [group6client1, group6client2, group6client3] },
  { id: 7, icons: [group7client1, group7client2, group7client3] },
];

/** Must match `.cardInnerFlip` animation-duration in SCSS */
const FLIP_DURATION_MS = 8000;
const STAGGER_PHASES = 3;

function FaceImg({ src }: { src: StaticImageData }) {
  return (
    <img
      className={styles.faceImg}
      src={src.src}
      alt=""
      width={160}
      height={50}
      draggable={false}
      decoding="async"
    />
  );
}

function ClientFlipCard({
  icons,
  staggerPhase,
}: {
  icons: StaticImageData[];
  staggerPhase: number;
}) {
  const n = icons.length;
  const [startIndex, setStartIndex] = useState(0);
  const innerRef = useRef<HTMLDivElement>(null);
  const lastIterAtRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    icons.forEach((ic) => {
      const im = new window.Image();
      im.src = ic.src;
    });
  }, [icons]);

  useEffect(() => {
    const el = innerRef.current;
    if (!el || n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onIter = (e: AnimationEvent) => {
      if (e.target !== el) return;
      const now = performance.now();
      if (now - lastIterAtRef.current < FLIP_DURATION_MS * 0.88) return;
      lastIterAtRef.current = now;

      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        setStartIndex((i) => (i + 1) % n);
      });
    };

    el.addEventListener("animationiteration", onIter);
    return () => {
      el.removeEventListener("animationiteration", onIter);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [n]);

  if (n < 1) return null;

  if (n === 1) {
    return (
      <div className={styles.card}>
        <div className={styles.cardInner}>
          <div className={styles.cardFace} data-face="front">
            <FaceImg src={icons[0]} />
          </div>
        </div>
      </div>
    );
  }

  const frontSrc = icons[startIndex];
  const backSrc = icons[(startIndex + 1) % n];
  const delaySec = -(FLIP_DURATION_MS / 1000 / STAGGER_PHASES) * (staggerPhase % STAGGER_PHASES);

  return (
    <div className={styles.card}>
      <div
        ref={innerRef}
        className={`${styles.cardInner} ${styles.cardInnerFlip}`}
        style={{ ["--flip-delay" as string]: `${delaySec}s` }}
      >
        <div className={styles.cardFace} data-face="front">
          <FaceImg src={frontSrc} />
        </div>
        <div className={styles.cardFace} data-face="back">
          <FaceImg src={backSrc} />
        </div>
      </div>
    </div>
  );
}

export function ClientsSection() {
  return (
    <section className={styles.clientsSection}>
      <h2 className={styles.title}>Trusted by Industry Leaders</h2>
      <div className={styles.grid}>
        {GROUPS.map((group) => (
          <ClientFlipCard
            key={group.id}
            icons={group.icons}
            staggerPhase={(group.id - 1) % STAGGER_PHASES}
          />
        ))}
      </div>
    </section>
  );
}
