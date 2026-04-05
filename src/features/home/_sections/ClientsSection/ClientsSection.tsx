"use client";

import styles from "./ClientsSection.module.scss";
import Image from "next/image";
import group1client1 from "@/../public/assets/icons/clients/group1-1.svg";
import group1client2 from "@/../public/assets/icons/clients/group1-2.svg";
import group2client1 from "@/../public/assets/icons/clients/group2-1.svg";
import group2client2 from "@/../public/assets/icons/clients/group2-2.svg";
import group3client1 from "@/../public/assets/icons/clients/group3-1.svg";
import group3client2 from "@/../public/assets/icons/clients/group3-2.svg";
import group4client1 from "@/../public/assets/icons/clients/group4-1.svg";
import group4client2 from "@/../public/assets/icons/clients/group4-2.svg";
import group5client1 from "@/../public/assets/icons/clients/group5-1.svg";
import group5client2 from "@/../public/assets/icons/clients/group5-2.svg";
import group6client1 from "@/../public/assets/icons/clients/group6-1.svg";
import group6client2 from "@/../public/assets/icons/clients/group6-2.svg";
import group7client1 from "@/../public/assets/icons/clients/group7-1.svg";
import group7client2 from "@/../public/assets/icons/clients/group7-2.svg";

const GROUPS: Array<{ id: number; icon1: typeof group1client1; icon2: typeof group1client2 }> = [
  { id: 1, icon1: group1client1, icon2: group1client2 },
  { id: 2, icon1: group2client1, icon2: group2client2 },
  { id: 3, icon1: group3client1, icon2: group3client2 },
  { id: 4, icon1: group4client1, icon2: group4client2 },
  { id: 5, icon1: group5client1, icon2: group5client2 },
  { id: 6, icon1: group6client1, icon2: group6client2 },
  { id: 7, icon1: group7client1, icon2: group7client2 },
];

function ClientFlipCard({
  icon1,
  icon2,
}: {
  icon1: typeof group1client1;
  icon2: typeof group1client2;
}) {
  return (
    <div className={styles.card}>
      <div className={styles.cardInner}>
        <div className={styles.cardFace} data-face="front">
          <Image src={icon1} alt="" width={160} height={50} sizes="160px" />
        </div>
        <div className={styles.cardFace} data-face="back">
          <Image src={icon2} alt="" width={160} height={50} sizes="160px" />
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
            icon1={group.icon1}
            icon2={group.icon2}
          />
        ))}
      </div>
    </section>
  );
}
