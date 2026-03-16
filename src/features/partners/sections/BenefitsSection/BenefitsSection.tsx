import { PARTNER_BENEFITS } from "../../config";
import styles from "./BenefitsSection.module.scss";

export function BenefitsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.title}>Partner benefits</h2>
          <p className={styles.subtitle}>
            Everything we build is meant to make your practice more profitable and your clients more secure.
          </p>
        </header>
        <ul className={styles.list}>
          {PARTNER_BENEFITS.map((text) => (
            <li key={text} className={styles.item}>
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
