import Image from "next/image";
import styles from "./TrustedBySection.module.scss";
import cert1 from "@/../public/assets/icons/certificates/colored-certificate1.svg";
import cert2 from "@/../public/assets/icons/certificates/colored-certificate2.svg";
import cert3 from "@/../public/assets/icons/certificates/colored-certificate3.svg";
import cert4 from "@/../public/assets/icons/certificates/colored-certificate4.svg";
import cert5 from "@/../public/assets/icons/certificates/colored-certificate5.svg";
import cert6 from "@/../public/assets/icons/certificates/colored-certificate6.svg";

const CERTIFICATES = [
  { src: cert2, alt: "Certified ISO 9001:2015 Company" },
  { src: cert1, alt: "ISO 27001 Certified" },
  { src: cert3, alt: "AICPA SOC 2" },
  { src: cert4, alt: "CREST" },
  { src: cert5, alt: "PCI DSS Compliant" },
  { src: cert6, alt: "GDPR" },
];

export function TrustedBySection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.subtitle}>Aligned with Globally Recognized Security Standards</p>
        <div className={styles.logos} role="list">
          {CERTIFICATES.map(({ src, alt }) => (
            <div key={alt} className={styles.logoWrap} role="listitem">
              <Image src={src} alt={alt} width={140} height={100} className={styles.logo} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
