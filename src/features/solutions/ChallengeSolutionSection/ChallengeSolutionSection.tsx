"use client";

import type { ChallengeItem, SolutionItem } from "../config";
import styles from "./ChallengeSolutionSection.module.scss";
import { ChallengeIcon, ChallengeTitleIcon, SolutionIcon } from "./ChallengeSolutionIcons";

interface ChallengeSolutionSectionProps {
  challenge: { title: string; items: ChallengeItem[] };
  solution: { title: string; items: SolutionItem[] };
}

function CornerDots() {
  return (
    <>
      <span className={styles.cornerDot} style={{ top: 12, left: 12 }} aria-hidden />
      <span className={styles.cornerDot} style={{ top: 12, right: 12 }} aria-hidden />
      <span className={styles.cornerDot} style={{ bottom: 12, left: 12 }} aria-hidden />
      <span className={styles.cornerDot} style={{ bottom: 12, right: 12 }} aria-hidden />
    </>
  );
}

export function ChallengeSolutionSection({ challenge, solution }: ChallengeSolutionSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.challengeCard}>
          <CornerDots />
          <div className={styles.cardTitleWrap}>
            <span className={styles.challengeTitleIcon} aria-hidden>
              <ChallengeTitleIcon />
            </span>
            <h3 className={styles.cardTitle}>{challenge.title}</h3>
          </div>
          <ul className={styles.challengeList}>
            {challenge.items.map((item) => (
              <li key={item.text} className={styles.challengeItem}>
                <span className={styles.challengeItemIcon} aria-hidden>
                  <ChallengeIcon icon={item.icon} />
                </span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.solutionCard}>
          <CornerDots />
          <h3 className={styles.solutionCardTitle}>{solution.title}</h3>
          <div className={styles.solutionItems}>
            {solution.items.map((item) => (
              <div key={item.title} className={styles.solutionItem}>
                <span className={styles.solutionIcon}>
                  <SolutionIcon icon={item.icon} />
                </span>
                <div>
                  <h4 className={styles.solutionItemTitle}>{item.title}</h4>
                  <p className={styles.solutionItemDescription}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
