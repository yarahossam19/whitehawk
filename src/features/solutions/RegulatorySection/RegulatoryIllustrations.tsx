"use client";

/**
 * Right-side illustration for the RegulatorySection. One slot per solution
 * page (the badge set differs per industry: HIPAA / ISO 27799 for healthcare,
 * PCI / SOC2 for fintech, FISMA / FedRAMP for public sector).
 *
 * Paste the final SVG markup from Figma in place of the placeholder block
 * for each key. The placeholders below are non-final and just give the
 * layout reasonable dimensions so the page renders before assets land.
 *
 * To add another page, add a new key to `RegulatoryIllustrationName`, add a
 * JSX entry to `REGULATORY_ILLUSTRATIONS`, and reference it from config.ts
 * as `regulatory.illustration: "<your-key>"`.
 */

export type RegulatoryIllustrationName =
  | "healthcare"
  | "fintech"
  | "government";

const REGULATORY_ILLUSTRATIONS: Record<RegulatoryIllustrationName, React.ReactNode> = {
  /* Healthcare — HIPAA, SAMA, ISO 27001, CBL, ISO 27799, GDPR around a WH logo. */
  healthcare: (
    // TODO: replace with the final Figma SVG.
    <svg viewBox="0 0 360 280" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <g stroke="#0d4a78" strokeWidth="1.2" fill="none" opacity="0.4">
        <ellipse cx="180" cy="140" rx="150" ry="110" />
        <ellipse cx="180" cy="140" rx="110" ry="80" />
      </g>
      <g>
        <rect x="148" y="118" width="64" height="44" rx="6" fill="#0d4a78" />
        <text
          x="180"
          y="146"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize="22"
          fontWeight="800"
          fill="#ffffff"
        >
          WH
        </text>
      </g>
      {[
        { x: 60, y: 50, label: "HIPAA" },
        { x: 280, y: 50, label: "SAMA" },
        { x: 40, y: 140, label: "ISO 27001" },
        { x: 290, y: 140, label: "CBL" },
        { x: 80, y: 230, label: "ISO 27799" },
        { x: 270, y: 230, label: "GDPR" },
      ].map((b, i) => (
        <g key={i}>
          <rect
            x={b.x - 32}
            y={b.y - 16}
            width="64"
            height="32"
            rx="6"
            fill="#ffffff"
            stroke="#0d4a78"
            strokeWidth="1.2"
            opacity="0.92"
          />
          <text
            x={b.x}
            y={b.y + 4}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize="9"
            fontWeight="700"
            fill="#0d4a78"
          >
            {b.label}
          </text>
        </g>
      ))}
    </svg>
  ),

  /* Fintech — PCI, SOC 2, ISO, NCA, SAMA, GDPR. */
  fintech: (
    // TODO: replace with the final Figma SVG.
    <svg viewBox="0 0 360 280" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <g stroke="#0d4a78" strokeWidth="1.2" fill="none" opacity="0.4">
        <ellipse cx="180" cy="140" rx="150" ry="110" />
        <ellipse cx="180" cy="140" rx="110" ry="80" />
      </g>
      <g>
        <rect x="148" y="118" width="64" height="44" rx="6" fill="#0d4a78" />
        <text
          x="180"
          y="146"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize="22"
          fontWeight="800"
          fill="#ffffff"
        >
          WH
        </text>
      </g>
      {[
        { x: 60, y: 50, label: "PCI DSS" },
        { x: 280, y: 50, label: "SAMA" },
        { x: 40, y: 140, label: "SOC 2" },
        { x: 290, y: 140, label: "NCA" },
        { x: 80, y: 230, label: "ISO 27001" },
        { x: 270, y: 230, label: "GDPR" },
      ].map((b, i) => (
        <g key={i}>
          <rect
            x={b.x - 32}
            y={b.y - 16}
            width="64"
            height="32"
            rx="6"
            fill="#ffffff"
            stroke="#0d4a78"
            strokeWidth="1.2"
            opacity="0.92"
          />
          <text
            x={b.x}
            y={b.y + 4}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize="9"
            fontWeight="700"
            fill="#0d4a78"
          >
            {b.label}
          </text>
        </g>
      ))}
    </svg>
  ),

  /* Public Sector / Government — FISMA, NIST, FedRAMP, NCA, ISO, GDPR. */
  government: (
    // TODO: replace with the final Figma SVG.
    <svg viewBox="0 0 360 280" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <g stroke="#0d4a78" strokeWidth="1.2" fill="none" opacity="0.4">
        <ellipse cx="180" cy="140" rx="150" ry="110" />
        <ellipse cx="180" cy="140" rx="110" ry="80" />
      </g>
      <g>
        <rect x="148" y="118" width="64" height="44" rx="6" fill="#0d4a78" />
        <text
          x="180"
          y="146"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize="22"
          fontWeight="800"
          fill="#ffffff"
        >
          WH
        </text>
      </g>
      {[
        { x: 60, y: 50, label: "FISMA" },
        { x: 280, y: 50, label: "NIST" },
        { x: 40, y: 140, label: "FedRAMP" },
        { x: 290, y: 140, label: "NCA ECC" },
        { x: 80, y: 230, label: "ISO 27001" },
        { x: 270, y: 230, label: "GDPR" },
      ].map((b, i) => (
        <g key={i}>
          <rect
            x={b.x - 32}
            y={b.y - 16}
            width="64"
            height="32"
            rx="6"
            fill="#ffffff"
            stroke="#0d4a78"
            strokeWidth="1.2"
            opacity="0.92"
          />
          <text
            x={b.x}
            y={b.y + 4}
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize="9"
            fontWeight="700"
            fill="#0d4a78"
          >
            {b.label}
          </text>
        </g>
      ))}
    </svg>
  ),
};

export function RegulatoryIllustration({
  illustration,
}: {
  illustration: RegulatoryIllustrationName;
}) {
  return <>{REGULATORY_ILLUSTRATIONS[illustration]}</>;
}
