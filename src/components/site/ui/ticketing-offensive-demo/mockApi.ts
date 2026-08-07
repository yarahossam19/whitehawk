"use client";

import { toast } from "sonner";

import type { ImportRowError } from "./utils/importErrorUtils";

/**
 * Drop-in replacement for the real VAApis() hook used by ExportPopup/ImportPopup.
 * This demo package ships with no backend, so every call simulates a short
 * network delay and resolves locally instead of hitting a real API.
 */
export interface MockTicketApis {
  ExportTickets: (ticketType: string | undefined, fileType: string) => Promise<boolean>;
  ImportTickets: (
    ticketType: string,
    file: File
  ) => Promise<{ ok: true; data: unknown } | { ok: false; rowErrors: ImportRowError[] | null }>;
  TicketTemplate: (ticketType: string | undefined) => Promise<boolean>;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function useMockTicketApis(): MockTicketApis {
  const ExportTickets = async (ticketType: string | undefined, fileType: string) => {
    await delay(600);
    const extension = fileType === "excel" ? "xlsx" : "csv";
    toast.success(`Demo export: ${ticketType || "tickets"}.${extension} (no file is generated in this demo)`);
    return true;
  };

  const ImportTickets = async (_ticketType: string, file: File) => {
    await delay(600);
    toast.success(`Demo import: "${file.name}" received (not actually processed in this demo)`);
    return { ok: true as const, data: [] };
  };

  const TicketTemplate = async (ticketType: string | undefined) => {
    await delay(300);
    toast.info(`Demo: template download for ${ticketType || "tickets"} is disabled in this standalone demo`);
    return true;
  };

  return { ExportTickets, ImportTickets, TicketTemplate };
}
