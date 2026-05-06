"use client";

import { useEffect, useState } from "react";
import { useFreeTrialModal } from "@/contexts/FreeTrialModalContext";
import { FreeTrialModal } from "@/components/FreeTrialModal/FreeTrialModal";

export function FreeTrialModalLazyHost() {
  const { isOpen } = useFreeTrialModal();
  const [everOpened, setEverOpened] = useState(false);

  useEffect(() => {
    if (isOpen) setEverOpened(true);
  }, [isOpen]);

  if (!isOpen && !everOpened) return null;
  return <FreeTrialModal />;
}
