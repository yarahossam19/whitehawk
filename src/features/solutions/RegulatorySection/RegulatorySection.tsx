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
        <div className={styles.copy}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.illustrationWrapper}>
          {/* Mobile */}
          <Image
            src="/assets/imgs/illustration-mobile.png"
            alt="Regulatory compliance illustration"
            width={390}
            height={420}
            className={`${styles.illustrationImg} ${styles.illustrationMobile}`}
            priority={false}
          />
          {/* Tablet */}
          <Image
            src="/assets/imgs/illustration-tablet.png"
            alt="Regulatory compliance illustration"
            width={768}
            height={480}
            className={`${styles.illustrationImg} ${styles.illustrationTablet}`}
            priority={false}
          />
          {/* Desktop */}
          <Image
            src="/assets/imgs/illustration-web.png"
            alt="Regulatory compliance illustration"
            width={1300}
            height={560}
            className={`${styles.illustrationImg} ${styles.illustrationDesktop}`}
            priority={false}
          />
        </div>
      </div>
    </section>
  );
}
