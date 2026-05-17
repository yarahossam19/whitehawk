import styles from "./WhyMattersSection.module.scss";
import { WhyMattersIcon, type WhyMattersIconName } from "./WhyMattersIcons";
import {
  WhyMattersIllustration,
  type WhyMattersIllustrationName,
} from "./WhyMattersIllustrations";

export interface WhyMattersFeature {
  title: string;
  description: string;
  icon: WhyMattersIconName;
}

export interface WhyMattersSectionProps {
  /** Top half — light card. */
  topTitle: string;
  topDescription: string;
  illustration: WhyMattersIllustrationName;
  tabletBackgroundSrc: string;
  mobileBackgroundSrc: string;

  /** Bottom half — dark card. */
  bottomTitle: string;
  bottomDescription: string;
  features: WhyMattersFeature[];
}

export function WhyMattersSection({
  topTitle,
  topDescription,
  illustration,
  tabletBackgroundSrc,
  mobileBackgroundSrc,
  bottomTitle,
  bottomDescription,
  features,
}: WhyMattersSectionProps) {
  return (
    <section className={styles.section} aria-label="Solution overview">
      <div className={styles.container}>
        {/* --- Top half: light card --- */}
        <div
          className={styles.topCard}
          style={
            {
              "--why-matters-tablet-bg": `url(${tabletBackgroundSrc})`,
              "--why-matters-mobile-bg": `url(${mobileBackgroundSrc})`,
            } as React.CSSProperties
          }
        >
          <div className={styles.topCopy}>
            <h2 className={styles.topTitle}>{topTitle}</h2>
            <p className={styles.topDescription}>{topDescription}</p>
          </div>
          <div className={styles.topIllustration} aria-hidden>
            <WhyMattersIllustration illustration={illustration} />
          </div>
        </div>

        {/* --- Bottom half: dark card --- */}
        <div className={styles.bottomCard}>
          <div className={styles.bottomCopy}>
            <h3 className={styles.bottomTitle}>{bottomTitle}</h3>
            <p className={styles.bottomDescription}>{bottomDescription}</p>
          </div>
          <ul className={styles.featureGrid} role="list">
            {features.map((f) => (
              <li key={f.title} className={styles.featureItem}>
                <span className={styles.featureIcon} aria-hidden>
                  <WhyMattersIcon icon={f.icon} />
                </span>
                <div className={styles.featureCopy}>
                  <p className={styles.featureTitle}>{f.title}</p>
                  <p className={styles.featureDescription}>{f.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
