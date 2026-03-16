export type SolutionType = "fintech-company" | "public-sectors" | "healthcare-organizations";

export interface ChallengeItem {
  text: string;
  icon: "target" | "lightning" | "lock" | "clock" | "documents";
}

export interface SolutionItem {
  title: string;
  description: string;
  icon: "dashboard" | "lightning" | "lock" | "report" | "data";
}

export interface BenefitItem {
  value: string;
  title: string;
  description: string;
  icon: "eye" | "lightning" | "clock" | "infinity";
}

export interface SolutionsPageConfig {
  title: string;
  hero: {
    title: string;
    description: string;
    ctaLabel: string;
    /** public/assets/imgs/solutions/{fintech|government|healthcare}.png */
    imageSrc: string;
  };
  challengeSolution: {
    challenge: {
      title: string;
      items: ChallengeItem[];
    };
    solution: {
      title: string;
      items: SolutionItem[];
    };
  };
  benefits: {
    sectionTitle: string;
    sectionSubtitle: string;
    items: BenefitItem[];
  };
}

export const SOLUTION_TYPES: SolutionType[] = ["fintech-company", "public-sectors", "healthcare-organizations"];

export const SOLUTIONS_CONFIG: Record<SolutionType, SolutionsPageConfig> = {
  "fintech-company": {
    title: "Fintech & Digital Payments",
    hero: {
      title: "Fintech & Digital Payments",
      description:
        "Experience peace of mind with intelligent, automated cybersecurity that adapts to your needs. We protect your digital assets so you can focus on growth.",
      ctaLabel: "Get Demo",
      imageSrc: "/assets/imgs/solutions/fintech.png",
    },
    challengeSolution: {
      challenge: {
        title: "The Challenge",
        items: [
          { text: "Limited visibility into rapidly expanding cloud infrastructure", icon: "target" },
          { text: "Manual penetration testing slowing down release cycles", icon: "lightning" },
          {
            text: "High regulatory pressure (SOC 2, PCI DSS) requiring constant evidence",
            icon: "lock",
          },
          { text: "Time-consuming audits draining engineering resources", icon: "clock" },
          {
            text: "Scattered data across multiple tools making incident response difficult",
            icon: "documents",
          },
        ],
      },
      solution: {
        title: "The White Hawk Solution",
        items: [
          { title: "Centralized Ops", description: "Unified dashboard for all security data", icon: "dashboard" },
          { title: "Offensive Security", description: "Continuous automated red teaming", icon: "lightning" },
          { title: "Defensive Security (SOC)", description: "24/7 threat monitoring and response", icon: "lock" },
          { title: "GRC Modules", description: "Automated compliance mapping for SOC 2 & PCI", icon: "report" },
          { title: "Asset Management", description: "Real-time tracking of all digital assets", icon: "data" },
        ],
      },
    },
    benefits: {
      sectionTitle: "The Benefits",
      sectionSubtitle: "Measurable impact within the first 90 days",
      items: [
        { value: "100%", title: "Clear Visibility", description: "Asset Coverage", icon: "eye" },
        { value: "3x", title: "Faster Remediation", description: "Response Time", icon: "lightning" },
        { value: "60%", title: "Reduced Audit Time", description: "Less Manual Work", icon: "clock" },
        { value: "24/7", title: "Proactive Management", description: "Continuous Monitoring", icon: "infinity" },
      ],
    },
  },
  /* Figma 864:6704 — Government / Public Sector */
  "public-sectors": {
    title: "Government & Public Sector",
    hero: {
      title: "Government & Public Sector",
      description:
        "Defend citizen services and critical infrastructure with one platform. Align to FISMA, NIST, and FedRAMP while giving every program the same real-time picture of risk.",
      ctaLabel: "Get Demo",
      imageSrc: "/assets/imgs/solutions/government.png",
    },
    challengeSolution: {
      challenge: {
        title: "The Challenge",
        items: [
          {
            text: "FISMA and NIST SP 800-53 demand continuous evidence—spreadsheets and point tools don’t scale.",
            icon: "documents",
          },
          {
            text: "Legacy systems and decades of technical debt leave gaps attackers already know how to exploit.",
            icon: "clock",
          },
          {
            text: "Citizen PII and mission-critical services must stay available and trustworthy under constant scrutiny.",
            icon: "lock",
          },
          {
            text: "Nation-state and ransomware campaigns target public infrastructure and shared service providers.",
            icon: "lightning",
          },
          {
            text: "Siloed tools across bureaus, contractors, and cloud tenants make it hard to see one true risk posture.",
            icon: "target",
          },
        ],
      },
      solution: {
        title: "The White Hawk Solution",
        items: [
          {
            title: "Unified command view",
            description: "One dashboard for security operations, findings, and compliance status across environments.",
            icon: "dashboard",
          },
          {
            title: "Continuous offensive assurance",
            description: "Automated and guided testing so configuration drift and critical vulns surface before adversaries do.",
            icon: "lightning",
          },
          {
            title: "24/7 defensive coverage",
            description: "SOC-ready monitoring, alerting, and response workflows aligned to public-sector runbooks.",
            icon: "lock",
          },
          {
            title: "GRC built for FISMA & FedRAMP",
            description: "Control mapping, evidence collection, and reporting that match how auditors and ATO teams work.",
            icon: "report",
          },
          {
            title: "Authoritative asset inventory",
            description: "Discover and classify every system—on-prem, cloud, and contractor-hosted—that touches mission data.",
            icon: "data",
          },
        ],
      },
    },
    benefits: {
      sectionTitle: "Outcomes that matter to public missions",
      sectionSubtitle: "Less manual evidence work, faster decisions, stronger citizen trust",
      items: [
        { value: "100%", title: "ATO-ready traceability", description: "Evidence tied to controls", icon: "eye" },
        { value: "2×", title: "Faster risk reviews", description: "Shared data, one workflow", icon: "lightning" },
        { value: "50%", title: "Less manual collection", description: "Automated GRC evidence", icon: "clock" },
        { value: "24/7", title: "Always-on visibility", description: "Critical systems covered", icon: "infinity" },
      ],
    },
  },
  /* Figma 864:6861 — Healthcare */
  "healthcare-organizations": {
    title: "Healthcare Organizations",
    hero: {
      title: "Healthcare Organizations",
      description:
        "Keep patient care running while you harden PHI, medical devices, and cloud. WhiteHawk ties HIPAA-ready controls to real-time visibility—without slowing clinicians down.",
      ctaLabel: "Get Demo",
      imageSrc: "/assets/imgs/solutions/healthcare.png",
    },
    challengeSolution: {
      challenge: {
        title: "The Challenge",
        items: [
          {
            text: "HIPAA and breach rules require provable access control, audit trails, and BA oversight—manual processes break under volume.",
            icon: "lock",
          },
          {
            text: "IoMT, bedside devices, and vendor-managed systems multiply entry points most inventories never see.",
            icon: "lightning",
          },
          {
            text: "Ransomware and downtime directly threaten patient safety; recovery windows are measured in minutes, not days.",
            icon: "target",
          },
          {
            text: "PHI lives across EHRs, imaging, labs, SaaS, and backups—fragmented tools hide where data actually flows.",
            icon: "documents",
          },
          {
            text: "Security teams are lean; proving readiness for OCR, payers, and boards steals time from real defense.",
            icon: "clock",
          },
        ],
      },
      solution: {
        title: "The White Hawk Solution",
        items: [
          {
            title: "Clinical-aware operations hub",
            description: "One place for alerts, vulns, and compliance tasks so IT, security, and privacy share the same truth.",
            icon: "dashboard",
          },
          {
            title: "Offensive testing for care environments",
            description: "Prioritize exploitable issues in networks, apps, and cloud that touch PHI and connected devices.",
            icon: "lightning",
          },
          {
            title: "Always-on defensive monitoring",
            description: "Detect anomalous access and lateral movement across systems that store or transmit patient data.",
            icon: "lock",
          },
          {
            title: "HIPAA-aligned GRC",
            description: "Map safeguards to HIPAA (and HITRUST where you need it), with evidence that survives audits.",
            icon: "report",
          },
          {
            title: "Full-spectrum asset discovery",
            description: "Find unmanaged devices and shadow SaaS so nothing with PHI sits outside your control set.",
            icon: "data",
          },
        ],
      },
    },
    benefits: {
      sectionTitle: "Why healthcare teams choose WhiteHawk",
      sectionSubtitle: "Stronger posture without disrupting care delivery",
      items: [
        { value: "100%", title: "PHI touchpoint coverage", description: "Know where data lives", icon: "eye" },
        { value: "4×", title: "Faster mean-time-to-detect", description: "Earlier containment", icon: "lightning" },
        { value: "70%", title: "Less audit prep time", description: "Evidence on demand", icon: "clock" },
        { value: "24/7", title: "Patient-safe monitoring", description: "Always watching", icon: "infinity" },
      ],
    },
  },
};

export function getSolutionsConfig(type: string): SolutionsPageConfig | null {
  if (SOLUTION_TYPES.includes(type as SolutionType)) {
    return SOLUTIONS_CONFIG[type as SolutionType];
  }
  return null;
}
