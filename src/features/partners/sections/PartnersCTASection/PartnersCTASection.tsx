"use client";

import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useLeadModalOpener } from "@/hooks/useLeadModalOpener";
import styles from "./PartnersCTASection.module.scss";

const PARTNER_TEAM_TITLE = "Talk to Partner Team";
const PARTNER_BRIEFING_LABEL = "Schedule a partner briefing";

export function PartnersCTASection() {
  const { openFromButtonTitle } = useLeadModalOpener();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Let&apos;s Build Together.</h2>
        <p className={styles.subtitle}>
          If you help customers with cybersecurity, compliance, or digital risk—we&apos;d love to explore how
          White Hawk can power your practice.
        </p>
        <div className={styles.actions}>
          <PrimaryButton
            title={PARTNER_TEAM_TITLE}
            variant="secondary"
            onClick={() => openFromButtonTitle(PARTNER_TEAM_TITLE)}
          />
          <button
            type="button"
            className={styles.link}
            onClick={() => openFromButtonTitle(PARTNER_BRIEFING_LABEL)}
          >
            {PARTNER_BRIEFING_LABEL}
          </button>
        </div>
      </div>
    </section>
  );
}
