"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDemoModal } from "@/contexts/DemoModalContext";

const RequestDemoModal = dynamic(
  () =>
    import("@/components/RequestDemoModal/RequestDemoModal").then(
      (m) => m.RequestDemoModal
    ),
  { ssr: false, loading: () => null }
);

/**
 * Load PrimeReact + modal only when the user opens the demo dialog.
 * Idle-loading the chunk was causing ~0.2 CLS on desktop when global
 * theme CSS applied late. First open may briefly load the chunk.
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
