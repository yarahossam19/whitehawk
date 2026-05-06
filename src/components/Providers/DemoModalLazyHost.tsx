"use client";

import { useEffect, useState } from "react";
import { useDemoModal } from "@/contexts/DemoModalContext";
import { RequestDemoModal } from "@/components/RequestDemoModal/RequestDemoModal";

/**
 * Mount the modal only after the user opens it for the first time.
 * Avoids running PrimeReact Dialog on the initial render so global theme
 * CSS doesn't shift LCP on first paint. The CSS module ships in the main
 * client chunk (no dynamic() wrapper) so HMR can update it reliably.
 */
export function DemoModalLazyHost() {
  const { isOpen } = useDemoModal();
  const [everOpened, setEverOpened] = useState(false);

  useEffect(() => {
    if (isOpen) setEverOpened(true);
  }, [isOpen]);

  /* First open: isOpen true but everOpened still false — must still mount */
  if (!isOpen && !everOpened) return null;
  return <RequestDemoModal />;
}
