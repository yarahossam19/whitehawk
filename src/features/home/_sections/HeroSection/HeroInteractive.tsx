"use client";

import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { useDemoModal } from "@/contexts/DemoModalContext";
import { useFreeTrialModal } from "@/contexts/FreeTrialModalContext";
import styles from "./HeroSection.module.scss";

export function HeroButtons() {
  const { openDemoModal } = useDemoModal();
  const { openFreeTrialModal } = useFreeTrialModal();
  return (
    <div className={styles.heroButtons}>
      <PrimaryButton
        title="Get A Demo"
        variant="primary"
        onClick={openDemoModal}
        className={styles.heroButton}
      />
      <PrimaryButton
        title="Become A Partner"
        variant="secondary"
        onClick={openFreeTrialModal}
        className={styles.heroButton}
      />
    </div>
  );
}
