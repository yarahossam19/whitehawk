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

type ClientIcon = { src: StaticImageData; alt: string };

const ICON = (src: StaticImageData, alt: string): ClientIcon => ({ src, alt });

const GROUPS: { id: number; icons: ClientIcon[] }[] = [
  {
    id: 1,
    icons: [
      ICON(group1client1, "A.T. Lease"),
      ICON(group1client2, "Andalusia"),
      ICON(group1client3, "Paxera Health"),
      ICON(group1client4, "Easy Cash"),
    ],
  },
  {
    id: 2,
    icons: [
      ICON(group2client1, "Edraky"),
      ICON(group2client2, "Al Seraj Islamic Bank"),
      ICON(group2client3, "Client logo (group2-3)"),
      ICON(group2client4, "Muheel"),
    ],
  },
  {
    id: 3,
    icons: [
      ICON(group3client1, "ELkheir"),
      ICON(group3client2, "Grand Egyptian Museum"),
      ICON(group3client3, "ORA"),
      ICON(group5client1, "Orascom"),
    ],
  },
  {
    id: 4,
    icons: [
      ICON(group4client1, "Enmaa Finance"),
      ICON(group4client2, "Bank Next"),
      ICON(group4client3, "Ezz Elarab"),
      ICON(group6client2, "Egyptian Cement"),
    ],
  },
  {
    id: 5,
    icons: [
      ICON(group5client1, "Orascom"),
      ICON(group5client2, "Global Brands"),
      ICON(group5client3, "Oliv"),
      ICON(group1client1, "A.T. Lease"),
    ],
  },
  {
    id: 6,
    icons: [
      ICON(group6client1, "mdp"),
      ICON(group6client2, "Egyptian Cement"),
      ICON(group6client3, "Click Group"),
      ICON(group3client2, "Grand Egyptian Museum"),
    ],
  },
  {
    id: 7,
    icons: [
      ICON(group7client1, "Jockey Club of Saudi Arabia "),
      ICON(group7client2, "Plastic Bank"),
      ICON(group7client3, "MLF Finance"),
      ICON(group4client3, "Ezz Elarab"),
    ],
  },
];

const SWAP_INTERVAL_MS = 3000;
const FLIP_ANIMATION_MS = 560;

function FaceImg({ src, alt }: { src: StaticImageData; alt: string }) {
  return (
    <Image
      className={styles.faceImg}
      src={src}
      alt={alt}
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
  icons: ClientIcon[];
}) {
  const n = icons.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    icons.forEach((ic) => {
      const im = new window.Image();
      im.src = ic.src.src;
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
            <FaceImg src={icons[0].src} alt={icons[0].alt} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={`${styles.cardInner} ${isFlipping ? styles.cardInnerFlipping : ""}`}>
        <FaceImg
          src={icons[currentIndex].src}
          alt={icons[currentIndex].alt}
        />
      </div>
    </div>
  );
}

export function ClientsSection() {
  return (
    <section className={styles.clientsSection}>
      <h2 className={styles.title}>Trusted by Leading Organizations Across MENA</h2>
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
