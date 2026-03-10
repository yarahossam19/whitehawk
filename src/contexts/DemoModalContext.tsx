"use client";

import { createContext, useCallback, useContext, useState } from "react";

interface DemoModalContextValue {
  openDemoModal: () => void;
  closeDemoModal: () => void;
  isOpen: boolean;
}

const DemoModalContext = createContext<DemoModalContextValue | null>(null);

export function useDemoModal() {
  const ctx = useContext(DemoModalContext);
  if (!ctx) {
    throw new Error("useDemoModal must be used within DemoModalProvider");
  }
  return ctx;
}

export function DemoModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDemoModal = useCallback(() => setIsOpen(true), []);
  const closeDemoModal = useCallback(() => setIsOpen(false), []);

  const value: DemoModalContextValue = {
    openDemoModal,
    closeDemoModal,
    isOpen,
  };

  return (
    <DemoModalContext.Provider value={value}>
      {children}
    </DemoModalContext.Provider>
  );
}
