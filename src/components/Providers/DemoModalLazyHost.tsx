"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useDemoModal } from "@/contexts/DemoModalContext";

const RequestDemoModal = dynamic(() => import("@/components/RequestDemoModal/RequestDemoModal").then(m => ({ default: m.RequestDemoModal })), {
  ssr: false,
  loading: () => null,
});

/**
 * Mount the modal only after the user opens it for the first time.
 * Uses dynamic import with ssr: false to split modal code from main bundle,
 * avoiding unnecessary JS on initial page load. Reduces LCP and TBT.
 */
export function DemoModalLazyHost() {
  const { isOpen } = useDemoModal();
  const [everOpened, setEverOpened] = useState(false);

  useEffect(() => {
    if (isOpen) setEverOpened(true);
  }, [isOpen]);

  /* First open: isOpen true but everOpened still false — must still mount */
  if (!isOpen && !everOpened) return null;
  return <RequestDemoModal />
}
