"use client";

import { useCallback } from "react";
import { useDemoModal } from "@/contexts/DemoModalContext";
import { useFreeTrialModal } from "@/contexts/FreeTrialModalContext";

/**
 * Partner-program CTAs (title contains "partner", case-insensitive) open the free trial modal;
 * all other titles open the request demo modal.
 */
export function useLeadModalOpener() {
  const { openDemoModal } = useDemoModal();
  const { openFreeTrialModal } = useFreeTrialModal();

  const openFromButtonTitle = useCallback(
    (buttonTitle: string) => {
      if (/partner/i.test(buttonTitle)) openFreeTrialModal();
      else openDemoModal();
    },
    [openDemoModal, openFreeTrialModal]
  );

  return { openDemoModal, openFreeTrialModal, openFromButtonTitle };
}
