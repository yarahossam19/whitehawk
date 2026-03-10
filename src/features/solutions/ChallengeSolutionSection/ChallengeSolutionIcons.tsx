"use client";

import type { ChallengeItem, SolutionItem } from "../../config";

const CHALLENGE_ICONS: Record<ChallengeItem["icon"], React.ReactNode> = {
  target: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
    </svg>
  ),
  lightning: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8.5 1L3 9h3L5 15l5.5-8H9L8.5 1z" fill="currentColor" />
    </svg>
  ),
  lock: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2.5" y="7" width="11" height="6.5" rx="1" fill="currentColor" />
      <path d="M4.5 7V5a3.5 3.5 0 017 0v2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  ),
  clock: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M8 4v4l2.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  documents: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M2 2h6l4 4v6H2V2z" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M8 2v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

function ChallengeTitleIconSvg() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M10 6v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="10" cy="14" r="1.5" fill="currentColor" />
    </svg>
  );
}

const SOLUTION_ICONS: Record<SolutionItem["icon"], React.ReactNode> = {
  dashboard: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="13" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="3" y="13" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="13" y="13" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
  lightning: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  lock: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M7 10V7a5 5 0 0110 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  report: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  data: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <ellipse cx="12" cy="5" rx="4" ry="2" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M8 5v6c0 1.1 1.8 2 4 2s4-.9 4-2V5" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M8 11v6c0 1.1 1.8 2 4 2s4-.9 4-2v-6" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  ),
};

export function ChallengeIcon({ icon }: { icon: ChallengeItem["icon"] }) {
  return <>{CHALLENGE_ICONS[icon]}</>;
}

export function ChallengeTitleIcon() {
  return <ChallengeTitleIconSvg />;
}

export function SolutionIcon({ icon }: { icon: SolutionItem["icon"] }) {
  return <>{SOLUTION_ICONS[icon]}</>;
}
