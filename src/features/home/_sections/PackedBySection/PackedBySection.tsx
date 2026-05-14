import Image from "next/image";
import styles from "./PackedBySection.module.scss";
import inv1 from "@/../public/assets/icons/investors/investor1.svg";
import inv2 from "@/../public/assets/icons/investors/investor2.svg";
import inv3 from "@/../public/assets/icons/investors/investor3.svg";
import inv4 from "@/../public/assets/icons/investors/investor4.svg";
import inv5 from "@/../public/assets/icons/investors/investor5.svg";
import inv6 from "@/../public/assets/icons/investors/investor6.svg";
import inv7 from "@/../public/assets/icons/investors/investor7.svg";
import inv8 from "@/../public/assets/icons/investors/investor8.svg";

const INVESTORS = [
  { src: inv3, alt: "Investor partner 1" },
  { src: inv8, alt: "Investor partner 2" },
  { src: inv1, alt: "Investor partner 3" },
  { src: inv4, alt: "Investor partner 4" },
  { src: inv2, alt: "Investor partner 5" },
  { src: inv5, alt: "Investor partner 6" },
  { src: inv6, alt: "Investor partner 7" },
  { src: inv7, alt: "Investor partner 8" },
];

export function PackedBySection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Backed by</h2>
        <div className={styles.logos} role="list">
          {INVESTORS.map(({ src, alt }, i) => (
            <div key={i} className={styles.logoWrap} role="listitem">
              <Image
                src={src}
                alt={alt}
                width={160}
                height={80}
                className={styles.logo}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
