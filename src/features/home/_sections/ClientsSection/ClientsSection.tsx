"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
  { id: 3, icons: [group3client1, group3client2, group3client3, group5client1] },
  { id: 4, icons: [group4client1, group4client2, group4client3, group6client2] },
  { id: 5, icons: [group5client1, group5client2, group5client3, group1client1] },
  { id: 6, icons: [group6client1, group6client2, group6client3, group3client2 ] },
  { id: 7, icons: [group7client1, group7client2, group7client3, group4client3] },
];

const SWAP_INTERVAL_MS = 3000;
const FLIP_ANIMATION_MS = 560;

function FaceImg({ src }: { src: StaticImageData }) {
  return (
    <Image
      className={styles.faceImg}
      src={src}
      alt=""
      width={160}
      height={50}
      loading="lazy"
      decoding="async"
    />
  );
}

function ClientFlipCard({
  icons,
}: {
  icons: StaticImageData[];
}) {
  const n = icons.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    icons.forEach((ic) => {
      const im = new window.Image();
      im.src = ic.src;
    });
  }, [icons]);

  useEffect(() => {
    if (n < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let midTimeout: ReturnType<typeof setTimeout> | null = null;
    let endTimeout: ReturnType<typeof setTimeout> | null = null;

    const runFlip = () => {
      setIsFlipping(true);

      midTimeout = setTimeout(() => {
        setCurrentIndex((i) => (i + 1) % n);
      }, Math.floor(FLIP_ANIMATION_MS / 2));

      endTimeout = setTimeout(() => {
        setIsFlipping(false);
      }, FLIP_ANIMATION_MS);
    };

    const intervalId = setInterval(runFlip, SWAP_INTERVAL_MS);
    return () => {
      clearInterval(intervalId);
      if (midTimeout) clearTimeout(midTimeout);
      if (endTimeout) clearTimeout(endTimeout);
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

  return (
    <div className={styles.card}>
      <div className={`${styles.cardInner} ${isFlipping ? styles.cardInnerFlipping : ""}`}>
        <FaceImg src={icons[currentIndex]} />
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
          />
        ))}
      </div>
    </section>
  );
}
