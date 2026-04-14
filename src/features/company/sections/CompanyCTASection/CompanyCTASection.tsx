"use client";

import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useDemoModal } from "@/contexts/DemoModalContext";
import styles from "./CompanyCTASection.module.scss";

export function CompanyCTASection() {
  const { openDemoModal } = useDemoModal();

  return (
    <section className={styles.section} aria-labelledby="company-cta-heading">
      <div className={styles.inner}>
        <h2 id="company-cta-heading" className={styles.title}>
          Ready to Simplify?
        </h2>
        <div className={styles.actions}>
          <div className={styles.demoBtnShell}>
            <PrimaryButton title="Request a Demo" variant="secondary" onClick={openDemoModal} />
          </div>
          <button type="button" className={styles.link} onClick={openDemoModal}>
            Become a Partner
          </button>
        </div>
      </div>
    </section>
  );
}
