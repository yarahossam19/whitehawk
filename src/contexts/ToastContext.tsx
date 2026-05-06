"use client";

import { createContext, useCallback, useContext, useRef } from "react";
import { Toast, type ToastMessage } from "primereact/toast";

type ShowToast = (message: ToastMessage | ToastMessage[]) => void;

const ToastContext = createContext<ShowToast | null>(null);

export function useToast(): ShowToast {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const toastRef = useRef<Toast>(null);

  const showToast: ShowToast = useCallback((message) => {
    toastRef.current?.show(message);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Toast ref={toastRef} position="top-right" />
    </ToastContext.Provider>
  );
}
