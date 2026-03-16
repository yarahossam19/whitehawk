"use client";

import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useDemoModal } from "@/contexts/DemoModalContext";
import styles from "./PartnersCTASection.module.scss";

export function PartnersCTASection() {
  const { openDemoModal } = useDemoModal();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Let&apos;s Build Together.</h2>
        <p className={styles.subtitle}>
          If you help customers with cybersecurity, compliance, or digital risk—we&apos;d love to explore how
          White Hawk can power your practice.
        </p>
        <div className={styles.actions}>
          <PrimaryButton title="Talk to Partner Team" variant="secondary" onClick={openDemoModal} />
          <button type="button" className={styles.link} onClick={openDemoModal}>
            Schedule a partner briefing
          </button>
        </div>
      </div>
    </section>
  );
}
