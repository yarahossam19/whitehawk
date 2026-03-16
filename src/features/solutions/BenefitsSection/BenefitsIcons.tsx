"use client";

import type { BenefitItem } from "../config";

const BENEFIT_ICONS: Record<BenefitItem["icon"], React.ReactNode> = {
  eye: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <path
        d="M14 5C8 5 4 14 4 14s4 9 10 9 10-9 10-9-4-9-10-9z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  ),
  lightning: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M15 2L5 16h8l-2 10 10-14h-8L15 2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  clock: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M14 8v6l4 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  infinity: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <path
        d="M6 14c0-3.3 2.7-6 6-6 2.2 0 4 1.2 5 3 1-1.8 2.8-3 5-3 3.3 0 6 2.7 6 6s-2.7 6-6 6c-2.2 0-4-1.2-5-3-1 1.8-2.8 3-5 3-3.3 0-6-2.7-6-6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  ),
};

export function BenefitIcon({ icon }: { icon: BenefitItem["icon"] }) {
  return <>{BENEFIT_ICONS[icon]}</>;
}
