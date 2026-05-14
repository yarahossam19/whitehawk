"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useFreeTrialModal } from "@/contexts/FreeTrialModalContext";

const FreeTrialModal = dynamic(() => import("@/components/FreeTrialModal/FreeTrialModal").then(m => ({ default: m.FreeTrialModal })), {
  ssr: false,
  loading: () => null,
});

export function FreeTrialModalLazyHost() {
  const { isOpen } = useFreeTrialModal();
  const [everOpened, setEverOpened] = useState(false);

  useEffect(() => {
    if (isOpen) setEverOpened(true);
  }, [isOpen]);

  if (!isOpen && !everOpened) return null;
  return <FreeTrialModal />
}
