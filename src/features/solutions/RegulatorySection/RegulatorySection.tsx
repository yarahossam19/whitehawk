import Image from "next/image";
import styles from "./RegulatorySection.module.scss";
import type { RegulatoryIllustrationName } from "./RegulatoryIllustrations";

export interface RegulatorySectionProps {
  title: string;
  description: string;
  illustration: RegulatoryIllustrationName;
}

export function RegulatorySection({
  title,
  description,
}: RegulatorySectionProps) {
  return (
    <section className={styles.section} aria-label="Regulatory compliance">
      <div className={styles.container}>
        <div className={styles.card}>
          <Image
            src="/assets/imgs/regulatory-bg2.png"
            alt=""
            fill
            priority={false}
            sizes="(max-width: 1300px) 100vw, 1300px"
            className={`${styles.bg} ${styles.bgDesktop}`}
            aria-hidden
          />
          <div className={styles.copy}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.description}>{description}</p>
          </div>

          <div className={styles.mobileImage} aria-hidden>
            <Image
              src="/assets/imgs/regulatory-bg-mobile.png"
              alt=""
              fill
              priority={false}
              sizes="100vw"
              className={styles.mobileImageImg}
            />
          </div>
          
        </div>
      </div>
    </section>
  );
}
