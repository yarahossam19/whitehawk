import axios from "axios";

/**
 * Browser calls go through the Next.js rewrite at `/partner-api/*` (see
 * next.config.ts) so the request is same-origin and CORS doesn't apply.
 * Override with NEXT_PUBLIC_API_BASE_URL once the backend at
 * partner.whiteguard.io sends proper CORS headers.
 */
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/partner-api";

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export type PartnerApplicationPayload = {
  CompanyLegalName: string;
  TradeName: string;
  Website: string;
  CountryCodes: string[];
  CompanySize: string;
  IndustryFocus: string;
  ContactFullName: string;
  ContactTitle: string;
  ContactEmail: string;
  ContactPhone: string;
  ServicesOffered: string;
  PartnershipType: string;
};

export async function submitPartnerApplication(payload: PartnerApplicationPayload) {
  const { data } = await apiClient.post("/applications/", payload);
  return data;
}
