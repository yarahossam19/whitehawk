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
    imageSrc?: string;
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
  "public-sectors": {
    title: "Public Sectors",
    hero: {
      title: "Public Sectors",
      description:
        "Secure citizen data and critical infrastructure with WhiteHawk. Meet federal and state compliance requirements while defending against advanced threats.",
      ctaLabel: "Get Demo",
    },
    challengeSolution: {
      challenge: {
        title: "The Challenge",
        items: [
          { text: "Strict compliance mandates (FISMA, FedRAMP) with limited resources", icon: "target" },
          { text: "Legacy systems increasing vulnerability surface", icon: "lightning" },
          { text: "Sensitive citizen data requiring zero-trust protection", icon: "lock" },
          { text: "Slow procurement cycles delaying security modernization", icon: "clock" },
          { text: "Fragmented visibility across departments and agencies", icon: "documents" },
        ],
      },
      solution: {
        title: "The White Hawk Solution",
        items: [
          { title: "Centralized Ops", description: "Unified security view across agencies", icon: "dashboard" },
          { title: "Offensive Security", description: "Continuous vulnerability assessment", icon: "lightning" },
          { title: "Defensive Security (SOC)", description: "24/7 monitoring for critical assets", icon: "lock" },
          { title: "GRC Modules", description: "Compliance mapping for FISMA and FedRAMP", icon: "report" },
          { title: "Asset Management", description: "Complete inventory of government assets", icon: "data" },
        ],
      },
    },
    benefits: {
      sectionTitle: "The Benefits",
      sectionSubtitle: "Measurable impact within the first 90 days",
      items: [
        { value: "100%", title: "Compliance Readiness", description: "Audit Preparation", icon: "eye" },
        { value: "2x", title: "Faster Assessment", description: "Scan Cycle Time", icon: "lightning" },
        { value: "50%", title: "Reduced Manual Reviews", description: "Evidence Collection", icon: "clock" },
        { value: "24/7", title: "Continuous Protection", description: "Threat Detection", icon: "infinity" },
      ],
    },
  },
  "healthcare-organizations": {
    title: "Healthcare Organizations",
    hero: {
      title: "Healthcare Organizations",
      description:
        "Protect patient data and meet HIPAA requirements with WhiteHawk. Secure PHI, medical devices, and cloud systems while maintaining clinical workflows.",
      ctaLabel: "Get Demo",
    },
    challengeSolution: {
      challenge: {
        title: "The Challenge",
        items: [
          { text: "HIPAA compliance requiring strict access controls and audit trails", icon: "target" },
          { text: "Connected medical devices creating new attack surfaces", icon: "lightning" },
          { text: "Third-party vendors with varying security postures", icon: "lock" },
          { text: "Ransomware targeting healthcare with critical uptime demands", icon: "clock" },
          { text: "PHI scattered across EHR, imaging, and ancillary systems", icon: "documents" },
        ],
      },
      solution: {
        title: "The White Hawk Solution",
        items: [
          { title: "Centralized Ops", description: "Single pane for all security and compliance", icon: "dashboard" },
          { title: "Offensive Security", description: "Continuous penetration testing", icon: "lightning" },
          { title: "Defensive Security (SOC)", description: "24/7 monitoring for PHI and systems", icon: "lock" },
          { title: "GRC Modules", description: "HIPAA and HITRUST compliance automation", icon: "report" },
          { title: "Asset Management", description: "Discover and secure all connected devices", icon: "data" },
        ],
      },
    },
    benefits: {
      sectionTitle: "The Benefits",
      sectionSubtitle: "Measurable impact within the first 90 days",
      items: [
        { value: "100%", title: "PHI Visibility", description: "Data Coverage", icon: "eye" },
        { value: "4x", title: "Faster Breach Detection", description: "MTTD Improvement", icon: "lightning" },
        { value: "70%", title: "Faster Compliance", description: "Audit Preparation", icon: "clock" },
        { value: "24/7", title: "Always-On Protection", description: "Patient Safety", icon: "infinity" },
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
