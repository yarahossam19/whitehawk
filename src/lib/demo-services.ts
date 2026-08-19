import { getData as getCountryData } from "country-list";

/**
 * Service taxonomy + country list for the demo request form.
 *
 * Shared by the client form and `/api/request-demo`: the client submits slugs,
 * and the server resolves them back to labels for the email. That way the
 * email always reads "Penetration Testing" rather than "pt", and a client can
 * never inject arbitrary text into the service fields.
 */

export type SelectOption = { label: string; value: string };

export const COUNTRY_OPTIONS: SelectOption[] = [
  ...getCountryData()
    .filter(({ code, name }) => code !== "IL" && name !== "Israel")
    .map(({ code, name }): SelectOption => ({ label: name, value: code }))
    .sort((a, b) => a.label.localeCompare(b.label)),
  { label: "Other", value: "OTHER" },
];

export const MAIN_TABS: SelectOption[] = [
  { label: "Offensive", value: "offensive" },
  { label: "Defensive", value: "defensive" },
];

export const SUB_TYPES_BY_MAIN: Record<string, SelectOption[]> = {
  offensive: [
    { label: "Vulnerability Assessment", value: "va" },
    { label: "Penetration Testing", value: "pt" },
    { label: "Security Configuration Review", value: "sc_review" },
  ],
  defensive: [
    { label: "Alerts", value: "alert" },
    { label: "Breach", value: "breach" },
    { label: "Threat Hunting", value: "threat-hunting" },
    { label: "Threat Intelligence", value: "threat-intelligence" },
  ],
};

export const SUB_SUB_TYPES_BY_SUB: Record<string, SelectOption[]> = {
  va: [
    { label: "Network VA", value: "network_va" },
    { label: "Web VA", value: "web_va" },
    { label: "Mobile VA", value: "mobile_va" },
    { label: "API VA", value: "api_va" },
    { label: "Source Code VA", value: "source-code_va" },
  ],
  pt: [
    { label: "Network PT", value: "network_pt" },
    { label: "Web PT", value: "web_pt" },
    { label: "Mobile PT", value: "mobile_pt" },
    { label: "API PT", value: "api_pt" },
    { label: "Source Code PT", value: "source-code_pt" },
    { label: "AD PT", value: "ad_pt" },
    { label: "Wireless PT", value: "wireless_pt" },
    { label: "POS PT", value: "pos_pt" },
    { label: "Physical PT", value: "physical_pt" },
    { label: "OT/ICS/SCADA PT", value: "ot-ics-scada_pt" },
  ],
  breach: [
    { label: "Combos Data", value: "combos_data" },
    { label: "Public Data Breach", value: "public-data_breach" },
    { label: "Info Stealer", value: "info_stealer" },
    { label: "ULPs Data", value: "ulps_data" },
    { label: "Machine Info", value: "machine_info" },
  ],
};

export function subTypesFor(mainType: string): SelectOption[] {
  return mainType ? (SUB_TYPES_BY_MAIN[mainType] ?? []) : [];
}

export function subSubTypesFor(subType: string): SelectOption[] {
  return subType ? (SUB_SUB_TYPES_BY_SUB[subType] ?? []) : [];
}

/** Label for a slug, or `null` when the slug isn't part of the taxonomy. */
export function labelFor(options: SelectOption[], value: string): string | null {
  return options.find((o) => o.value === value)?.label ?? null;
}

export type ResolvedService = {
  mainLabel: string;
  subLabel: string;
  subSubLabel: string;
};

/**
 * Validates a slug triple against the taxonomy and returns display labels.
 * Returns an error message instead when the selection is incomplete or unknown.
 */
export function resolveService(
  mainType: string,
  subType: string,
  subSubType: string,
): { ok: true; service: ResolvedService } | { ok: false; error: string } {
  const mainLabel = labelFor(MAIN_TABS, mainType);
  if (!mainLabel) {
    return { ok: false, error: "Please choose a service type." };
  }

  const subLabel = labelFor(subTypesFor(mainType), subType);
  if (!subLabel) {
    return { ok: false, error: "Please choose a service." };
  }

  const subSubOptions = subSubTypesFor(subType);
  if (subSubOptions.length > 0) {
    const subSubLabel = labelFor(subSubOptions, subSubType);
    if (!subSubLabel) {
      return { ok: false, error: "Please choose a specific service." };
    }
    return { ok: true, service: { mainLabel, subLabel, subSubLabel } };
  }

  // This sub-type has no third level; reject a stale value rather than
  // forwarding it, since the cascade should have cleared it.
  if (subSubType) {
    return { ok: false, error: "Please choose a specific service." };
  }

  return { ok: true, service: { mainLabel, subLabel, subSubLabel: "" } };
}

export function countryLabelFor(value: string): string | null {
  return labelFor(COUNTRY_OPTIONS, value);
}
