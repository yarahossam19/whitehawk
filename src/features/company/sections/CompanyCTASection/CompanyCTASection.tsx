"use client";

import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useLeadModalOpener } from "@/hooks/useLeadModalOpener";
import styles from "./CompanyCTASection.module.scss";

const DEMO_TITLE = "Request a Demo";
const PARTNER_LINK_LABEL = "Become a Partner";

export function CompanyCTASection() {
  const { openFromButtonTitle } = useLeadModalOpener();

  return (
    <section className={styles.section} aria-labelledby="company-cta-heading">
      <div className={styles.inner}>
        <h2 id="company-cta-heading" className={styles.title}>
          Ready to Simplify?
        </h2>
        <div className={styles.actions}>
          <div className={styles.demoBtnShell}>
            <PrimaryButton
              title={DEMO_TITLE}
              variant="secondary"
              onClick={() => openFromButtonTitle(DEMO_TITLE)}
            />
          </div>
          <button type="button" className={styles.link} onClick={() => openFromButtonTitle(PARTNER_LINK_LABEL)}>
            {PARTNER_LINK_LABEL}
          </button>
        </div>
      </div>
    </section>
  );
}
