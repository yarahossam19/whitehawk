import {
  siAlibabacloud,
  siCisco,
  siElastic,
  siElasticsearch,
  siFortinet,
  siGooglecloud,
  siKalilinux,
  siSplunk,
} from "simple-icons";
import styles from "./IntegrationLogo.module.scss";

type Mark = { title: string; hex: string; path: string };

/**
 * Brand marks for the integrations WhiteHawk actually connects to, keyed by
 * the lower-cased display name used on the site.
 *
 * simple-icons is the only source of marks here, and it carries no Amazon,
 * Microsoft, CrowdStrike or Tenable/Nessus icon (those were removed following
 * trademark requests). Anything missing renders as an initials tile instead —
 * the same treatment the product's own integrations screen gives its
 * first-party connectors (AA, TH, DE, RL, NC, KN), so the fallback is the
 * house style rather than a gap.
 */
const MARKS: Record<string, Mark> = {
  // The three discovery connectors are Cisco-based in the product UI.
  "snmp discovery": siCisco,
  "active discovery": siCisco,
  "wireless discovery": siCisco,
  "google cloud": siGooglecloud,
  "alibaba cloud": siAlibabacloud,
  siem: siElastic,
  // Supported SIEMs. Sentinel, QRadar and Wazuh have no simple-icons mark, so
  // they fall back to monograms alongside these three.
  splunk: siSplunk,
  elastic: siElastic,
  fortisiem: siFortinet,
  "elastic search": siElasticsearch,
  "kali / nessus": siKalilinux,
};

/**
 * Initials for the fallback tile: first letters of the first two words, or the
 * first two characters of a single-word name. Acronyms are kept whole so "AWS"
 * doesn't become "AW". Matches the product's own monograms.
 */
function initials(name: string) {
  const words = name.replace(/[()/]/g, " ").split(/\s+/).filter(Boolean);
  if (words.length === 1) {
    const w = words[0];
    return w === w.toUpperCase() && w.length <= 4 ? w : w.slice(0, 2).toUpperCase();
  }
  return words
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function IntegrationLogo({
  name,
  size = 16,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const mark = MARKS[name.toLowerCase()];
  return (
    <span className={`${styles.root} ${className}`}>
      {mark ? (
        <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false">
          <path d={mark.path} fill={`#${mark.hex}`} />
        </svg>
      ) : (
        <span className={styles.monogram}>{initials(name)}</span>
      )}
    </span>
  );
}
