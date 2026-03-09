"use client";

import styles from "./DisconnectedSection.module.scss";
import challenge1 from "@/../public/assets/icons/challenges/challenge1.svg";
import challenge2 from "@/../public/assets/icons/challenges/challenge2.svg";
import challenge3 from "@/../public/assets/icons/challenges/challenge3.svg";
import challenge4 from "@/../public/assets/icons/challenges/challenge4.svg";
import challenge5 from "@/../public/assets/icons/challenges/challenge5.svg";
import challenge6 from "@/../public/assets/icons/challenges/challenge6.svg";


const CARDS = [
  {
    title: "Too many tools, no coordination",
    description:
      "If you're using a bunch of different tools to manage your security, it's easy for things to slip through the cracks.",
    icon: challenge1,
  },
  {
    title: "Waiting for threats to happen",
    description:
      "Reacting to threats after they've already caused damage is risky. Without proactive monitoring, you might miss early warning signs and be left playing catch-up.",
    icon: challenge2,
  },
  {
    title: "Managing access feels complicated",
    description:
      "Keeping track of who has access to what can get messy, especially as your team grows.",
    icon: challenge3,
  },
  {
    title: "Compliance feels like a never-ending task",
    description:
      "Keeping up with compliance requirements is stressful, especially when they keep changing.",
    icon: challenge4,
  },
  {
    title: "Vulnerabilities are hard to keep track",
    description:
      "When you've got vulnerabilities spread across different systems, it's hard to stay on top of them all.",
    icon: challenge5,
  },
  {
    title: "Losing track of IT and non-IT assets",
    description:
      "If you're using a bunch of different tools to manage your security, it's easy for things to slip through the cracks.",
    icon: challenge6,
  },
];



export function DisconnectedSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Is your cybersecurity feeling disconnected?</h2>
          <p className={styles.subtitle}>
            Modern businesses face sophisticated challenges that traditional security measures can&apos;t handle alone.
          </p>
        </div>
        <div className={styles.grid}>
          {CARDS.map((card) => (
            <article key={card.title} className={styles.card}>
              <div className={styles.iconWrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={typeof card.icon === "string" ? card.icon : (card.icon as { src?: string })?.src ?? ""}
                  alt=""
                  width={40}
                  height={40}
                />
              </div>
      
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
