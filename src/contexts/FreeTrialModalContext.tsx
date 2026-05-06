"use client";

import { createContext, useCallback, useContext, useState } from "react";

interface FreeTrialModalContextValue {
  openFreeTrialModal: () => void;
  closeFreeTrialModal: () => void;
  isOpen: boolean;
}

const FreeTrialModalContext = createContext<FreeTrialModalContextValue | null>(null);

export function useFreeTrialModal() {
  const ctx = useContext(FreeTrialModalContext);
  if (!ctx) {
    throw new Error("useFreeTrialModal must be used within FreeTrialModalProvider");
  }
  return ctx;
}

export function FreeTrialModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openFreeTrialModal = useCallback(() => setIsOpen(true), []);
  const closeFreeTrialModal = useCallback(() => setIsOpen(false), []);

  const value: FreeTrialModalContextValue = {
    openFreeTrialModal,
    closeFreeTrialModal,
    isOpen,
  };

  return (
    <FreeTrialModalContext.Provider value={value}>{children}</FreeTrialModalContext.Provider>
  );
}
