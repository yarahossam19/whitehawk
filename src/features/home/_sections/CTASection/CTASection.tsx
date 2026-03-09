"use client";

import styles from "./CTASection.module.scss";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export function CTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Protect your business today.</h2>
        <p className={styles.subtitle}>
          Don&apos;t wait for a threat to appear. Secure your future with
          WhiteHawk&apos;s intelligent protection platform.
        </p>
        <div className={styles.buttons}>
          <PrimaryButton
            title="Start Free Trial"
            variant="primary"
            href="#"
            className={styles.primaryBtn}
          />
          <PrimaryButton
            title="Schedule Demo"
            variant="secondary"
            href="#"
            className={styles.secondaryBtn}
          />
        </div>
        <p className={styles.disclaimer}>
          No credit card required. 14-day free trial.
        </p>
      </div>
    </section>
  );
}
