/** Tab + card icons (stroke style, matches design) */

export function IconConsulting({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-2M8 7h8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 12h4M10 16h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function IconMSSP({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="8" cy="12" r="3" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="16" cy="12" r="3" stroke="currentColor" strokeWidth="1.75" />
      <path d="M11 12h2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function IconIntegrator({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="6" cy="18" r="2.25" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="18" cy="18" r="2.25" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="6" r="2.25" stroke="currentColor" strokeWidth="1.75" />
      <path d="M7.5 16.5l3-7M16.5 16.5l-3-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function IconChannel({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M6 6h15l-1.5 9h-12L6 6zm0 0L5 3H2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.5" fill="currentColor" />
      <circle cx="18" cy="20" r="1.5" fill="currentColor" />
    </svg>
  );
}
