import type { WhyMattersIconName } from "./WhyMattersSection/WhyMattersIcons";
import type { WhyMattersIllustrationName } from "./WhyMattersSection/WhyMattersIllustrations";
import type { RegulatoryIllustrationName } from "./RegulatorySection/RegulatoryIllustrations";

export type SolutionType = "fintech-company" | "public-sectors" | "healthcare-organizations";

export interface ChallengeItem {

  title: string;
  description: string;
  icon: "target" | "lightning" | "lock" | "clock" | "stroke" | "documents";
}

export interface WhyMattersFeatureConfig {
  title: string;
  description: string;
  icon: WhyMattersIconName;
}

export interface WhyMattersSectionConfig {
  /** Light top half. */
  topTitle: string;
  topDescription: string;
  /** Right-side illustration for this page — swap per solution. */
  illustration: WhyMattersIllustrationName;
  /** Dark bottom half. */
  bottomTitle: string;
  bottomDescription: string;
  /** 2x2 grid items. */
  features: WhyMattersFeatureConfig[];
}

export interface RegulatorySectionConfig {
  title: string;
  description: string;
  /** Compliance-badge illustration for this page (key from RegulatoryIllustrations.tsx). */
  illustration: RegulatoryIllustrationName;
}

export interface FaqEntry {
  question: string;
  answer: string;
}

export interface SolutionsFaqsConfig {
  sectionTitle: string;
  sectionSubtitle?: string;
  items: FaqEntry[];
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
    /** Each entry renders on its own line inside the H1. */
    titleLines: string[];
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
  whyMatters: WhyMattersSectionConfig;
  regulatory: RegulatorySectionConfig;
  faqs: SolutionsFaqsConfig;
}

export const SOLUTION_TYPES: SolutionType[] = ["fintech-company", "public-sectors", "healthcare-organizations"];

export const SOLUTIONS_CONFIG: Record<SolutionType, SolutionsPageConfig> = {
  "fintech-company": {
    title: "Fintech & Digital Payments",
    hero: {
      titleLines: ["Cybersecurity in Fintech","Built for MENA's Payment & Lending Operators"],
      description:"Cybersecurity in fintech moves at the speed of an API call. So do attackers. Cybersecurity in fintech has to match that tempo — payment fraud detection in milliseconds, PCI-DSS evidence on demand, and regulator-grade incident reporting when something goes wrong. WhiteHawk is the cybersecurity platform built for fintech companies operating under CBE, SAMA, and CBL oversight.",
      ctaLabel: "Get Demo",
      imageSrc: "/assets/imgs/solutions/fintech.png",
    },
    challengeSolution: {
      challenge: {
        title: "Top Cybersecurity Risks Facing Fintech Companies",
        items: [
          { title: "API Abuse", description: "Open banking and embedded finance APIs are the #1 attack vector for cybersecurity in fintech. Credential stuffing, broken authorization, and rate-limit bypass top OWASP's 2024 API security risks.", icon: "target" },
          { title: "Account Takeover", description: "Synthetic identities, SIM-swap fraud, and credential reuse drive the bulk of fintech account compromise. Real-time behavioral analytics is the only effective defense.", icon: "stroke" },
          {
            title: "Insider Risk",
            description: "Fintech teams move fast and grant broad access. Privileged-access misuse and developer credential leaks remain a top breach root cause across the sector.",
            icon: "documents",
          },
          { title: "Cloud Misconfiguration", description: "One exposed S3 bucket or unrotated key can leak millions of records. Continuous cloud-posture monitoring catches drift before it becomes a disclosure", icon: "clock" },
    
        ],
      },
      solution: {
        title: "Cybersecurity Solutions for Fintech",
        items: [
          { title: "Threat Detection & Transaction Monitoring", description: "Real-time anomaly detection across transaction streams, login flows, and API calls. Behavioral models trained on fintech cyber security patterns flag fraud, money-laundering signals, and account-takeover attempts before they complete", icon: "dashboard" },
          { title: "Fraud Prevention & Payment Security", description: "Layered fraud controls: device fingerprinting, velocity rules, geolocation analysis, and risk-based authentication. PCI-DSS 4.0 aligned controls protect cardholder data through the full payment lifecycle", icon: "lightning" },
          { title: "Financial Compliance & GRC", description: "Continuous control mapping for CBE, SAMA, FRA 139, PCI-DSS 4.0, PCI PIN Security, and SOC 2 — the regulatory baseline of cybersecurity in fintech across MENA", icon: "lock" },
          { title: "Cloud, API & Digital Banking Security", description: "API security testing, cloud-posture monitoring, secrets-management hygiene, and runtime application self-protection — designed for the AWS, Azure, and Kubernetes stacks fintech engineering teams actually use today", icon: "data" },
        ],
      },
    },
    benefits: {
      sectionTitle: "The Benefits",
      sectionSubtitle: "Measurable impact within the first 90 days",
      items: [
        { value: "Faster", title: "Banking Partnerships", description: "Pre-built compliance evidence for CBE, SAMA, and PCI-DSS shortens KYC and security review with sponsoring banks from months to weeks", icon: "eye" },
        { value: "Safe", title: "Lower Fraud Loss", description: "Real-time behavioral defenses cut chargeback rates and reduce reserves required by payment processors operating across MENA corridors", icon: "infinity" },
        { value: "Trust", title: "Customer Trust", description: "Public security posture (SOC 2, PCI-DSS, ISO 27001) becomes a marketing asset that wins enterprise contracts, not a hidden cost", icon: "lightning" },
        { value: "Confidence", title: "Investor Confidence", description: "Mature security and fintech and cybersecurity is now a Series A diligence requirement across MENA fintech investors, not a Series C polish", icon: "clock" },
      ],
    },
    whyMatters: {
      topTitle: "Secure Financial Innovation with Advanced Cybersecurity in Fintech",
      topDescription:
"Fintech cyber security is not a tax on innovation. Done right, it is what makes innovation defensible. WhiteHawk gives fintech founders and CISOs the controls, evidence, and 24/7 monitoring needed to ship new products without giving regulators or banking partners reasons to slow you down.",      illustration: "fintech",
      bottomTitle: "Why Cybersecurity Matters in Fintech",
      bottomDescription:
"A single breach can end a fintech. Customer trust evaporates overnight, banking partners freeze settlement, and the regulator can suspend operating licenses. Fintech and cybersecurity are inseparable - the companies that scale are the ones that treat cybersecurity for fintech as a product feature, not a back-office cost.",      features: [
        {
          title: "Customer Trust",
          description: "One incident can turn adoption into churn before the postmortem is written.",
          icon: "customer-trust",
        },
        {
          title: "Settlement Freeze",
          description: "Banking partners can pause flows until containment and evidence are clear.",
          icon: "regulatory-pressure",
        },
        {
          title: "License Exposure",
          description: "Regulators can suspend operating licenses when reporting and controls fail.",
          icon: "transaction-integrity",
        },
        {
          title: "Product-Led Security",
          description: "The fintechs that scale make security part of the customer experience.",
          icon: "continuous-assurance",
        },
      ],
    },
    regulatory: {
      title: "Regulatory Compliance for Fintech Security",
      description:
"A single breach can end a fintech. Customer trust evaporates overnight, banking partners freeze settlement, and the regulator can suspend operating licenses. Fintech and cybersecurity are inseparable - the companies that scale are the ones that treat cybersecurity for fintech as a product feature, not a back-office cost.",      illustration: "fintech",
    },
    faqs: {
      sectionTitle: "Frequently Asked Questions About Fintech Cybersecurity",
      sectionSubtitle:
        "A quick answer to the most common platform comparison question",
      items: [
        {
          question: "What is fintech cybersecurity?",
          answer:
            "It's the continuous protection of customer accounts, payment flows, KYC data, and the cloud infrastructure behind them — combining 24/7 SOC, offensive testing, PCI / SAMA evidence automation, and DFIR under one platform",
        },
        {
          question: "Who needs Fintech Cybersecurity?",
          answer:
            "Digital banks, payment processors, payment-card issuers, e-wallets, lending platforms, exchanges, BNPL providers, and any regulated fintech that handles customer funds or card data — across MENA and beyond",
        },
        {
          question: "How often should fintechs run penetration tests and assessments?",
          answer:
            "PCI DSS 4.0 requires annual penetration testing and after significant change. SAMA expects continuous control monitoring. Mature fintech programs add quarterly red-team or grey-box engagements and continuous vulnerability scanning across customer-facing and internal services",
        },
        {
          question: "How does the platform protect customer accounts and money?",
          answer:
            "Through MFA enforcement, behavioural analytics, transaction-fraud detection, API security testing, and 24/7 SOC monitoring tuned to fintech-specific abuse patterns (ATO, BIN attacks, money-mule rings) — layered to reduce both probability and blast radius",
        },
        {
          question: "What are the biggest cybersecurity threats to fintechs?",
          answer:
            "Account-takeover, payment-API abuse, BIN-attack fraud, ransomware, insider misuse, and supplier supply-chain risk. Each one triggers regulator reporting and brand-trust review",
        },
        {
          question: "Does the platform help with PCI DSS 4.0 and SAMA evidence?",
          answer:
            "Yes. Controls map directly to PCI DSS 4.0, SAMA CSF, NCA ECC, and SOC 2 — with continuous evidence collection and audit-ready reports, so audit prep becomes export instead of recreate",
        },
        {
          question:
            "What should a fintech look for in a cybersecurity partner?",
          answer:
            "PCI / SAMA expertise, real fintech references, payment-API security depth, regional regulator coverage, and a 24/7 fraud-aware SOC that understands money-movement context, not just generic alerts",
        },
      ],
    },
  },
  /* Figma 864:6704 — Government / Public Sector */
  "public-sectors": {
    title: "Government & Public Sector",
    hero: {
      titleLines: ["Government & Public Sector"],
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
            title: "FISMA and NIST SP 800-53 demand continuous evidence",
            description: "Spreadsheets and point tools don’t scale for continuous evidence and compliance.",
            icon: "documents",
          },
          {
            title: "Legacy systems and technical debt create exploitable gaps",
            description: "Decades of drift and outdated systems expand the attack surface.",
            icon: "clock",
          },
          {
            title: "Citizen PII and services must stay available and trustworthy",
            description: "Availability and trust are mandatory under constant oversight and scrutiny.",
            icon: "lock",
          },
          {
            title: "Nation-state and ransomware campaigns target public infrastructure",
            description: "Attackers focus on shared services and critical systems across agencies.",
            icon: "lightning",
          },
          {
            title: "Siloed tools prevent one true risk posture",
            description: "Bureaus, contractors, and cloud tenants fragment visibility and ownership.",
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
    whyMatters: {
      topTitle: "Strengthening Public Sector Cybersecurity with Advanced Cybersecurity",
      topDescription:
        "Government cybersecurity has to balance two things that pull in opposite directions: open access for citizens and ironclad protection of sovereign data. WhiteHawk gives govt cyber security teams the platform and the expertise to do both — without the vendor sprawl that plagued public-sector IT historically",
      illustration: "government",
      bottomTitle: "Why Cybersecurity Matters in Government & Public Sector",
      bottomDescription:
        "A breach inside a government agency is not just an IT incident — it is a sovereign-trust event. Citizen records, regulatory data, defense communications, and critical-service availability are all at stake. Cybersecurity and government can no longer be separate procurement tracks; they have to be one continuously assessed program",
      features: [
        {
          title: "Sovereign Crisis",
          description: "Not just IT incident, but a direct threat to national trust",
          icon: "sovereign-crisis",
        },
        {
          title: "Data Exposure",
          description: "Citizen records and regulatory data become vulnerable targets for breaches",
          icon: "data-exposure",
        },
        {
          title: "Service Disruption",
          description: "Critical services and defense communications risk outages, delays, and compromise",
          icon: "service-disruption",
        },
        {
          title: "Unified Security",
          description: "Cybersecurity must be continuous, integrated, not a separate procurement track",
          icon: "unified-security",
        },
      ],
    },
    regulatory: {
      title: "Regulatory Compliance for Public Sector Cybersecurity",
      description:
        "WhiteHawk maintains continuous evidence for the frameworks that govern public-sector cybersecurity in MENA and globally: NCA ECC and Essential Cybersecurity Controls for KSA agencies, FISMA and NIST SP 800-53 for federal-aligned programs, FedRAMP authorisation packages for cloud workloads, ISO/IEC 27001 for information-security management, and GDPR for cross-border citizen data",
      illustration: "government",
    },
    faqs: {
      sectionTitle: "Frequently Asked Questions About Public Sector Cybersecurity",
      sectionSubtitle:
        "A quick answer to the most common platform comparison question",
      items: [
        {
          question: "What is public-sector cybersecurity?",
          answer:
            "It's the continuous protection of citizen-facing services, sovereign data, and critical-infrastructure systems — combining 24/7 SOC, offensive assurance, NCA / FISMA evidence automation, and DFIR under one platform built for regulated public agencies",
        },
        {
          question: "Who needs Public Sector Cybersecurity?",
          answer:
            "Ministries, regulators, federal and municipal agencies, public hospitals, defense-adjacent contractors, judicial systems, and any operator of critical national infrastructure — across MENA and beyond",
        },
        {
          question:
            "How often should government agencies perform cybersecurity assessments?",
          answer:
            "FISMA mandates continuous monitoring. NCA ECC expects ongoing control evaluation. Mature public-sector programs add annual third-party penetration testing, quarterly red-team exercises against high-value targets, and continuous vulnerability scanning across legacy and cloud estates",
        },
        {
          question: "How does the platform protect citizen data and services?",
          answer:
            "Through identity-based access, network segmentation, encryption at rest and in transit, DLP, and 24/7 SOC monitoring tuned to nation-state and ransomware TTPs — so citizen PII stays confidential and citizen services stay available",
        },
        {
          question: "What are the biggest cybersecurity threats to government?",
          answer:
            "Nation-state intrusions, ransomware against critical services, supplier supply-chain compromise, insider misuse, and legacy-system exploitation. Each one triggers sovereign-trust review and regulator notification",
        },
        {
          question: "Does the platform help with FISMA, NCA ECC, and FedRAMP evidence?",
          answer:
            "Yes. Controls map directly to FISMA, NCA ECC, FedRAMP, NIST SP 800-53, and ISO 27001 — with continuous evidence collection and audit/ATO-ready reports, so accreditation cycles compress from quarters to weeks",
        },
        {
          question:
            "What should a public-sector body look for in a cybersecurity partner?",
          answer:
            "Regulator depth (NCA, FISMA, FedRAMP), cleared personnel where required, sovereign data-handling discipline, real public-sector client references, and a 24/7 SOC that understands mission-critical service availability — not just generic enterprise alerts",
        },
      ],
    },
  },
  /* Figma 864:6861 — Healthcare */
  "healthcare-organizations": {
    title: "Healthcare Organizations",
    hero: {
      titleLines: ["Healthcare Organizations"],
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
            title: "HIPAA demands provable access control and audit trails",
            description:
              "Breach rules and BA oversight require evidence; manual processes break under volume.",
            icon: "lock",
          },
          {
            title: "IoMT and vendor systems multiply unseen entry points",
            description:
              "Bedside devices and vendor-managed systems expand risk beyond what inventories capture.",
            icon: "lightning",
          },
          {
            title: "Ransomware and downtime directly threaten patient safety",
            description:
              "Recovery windows are measured in minutes, not days, across clinical operations.",
            icon: "target",
          },
          {
            title: "PHI is scattered across systems and backups",
            description:
              "EHRs, imaging, labs, SaaS, and backups fragment visibility into how PHI actually flows.",
            icon: "documents",
          },
          {
            title: "Lean teams lose time proving readiness",
            description:
              "OCR, payers, and boards require proof; manual reporting steals time from real defense.",
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
    whyMatters: {
      topTitle: "Protecting Patient Care with End-to-End Cybersecurity",
      topDescription:
        "Healthcare lives between two non-negotiables: keep patient care running and keep PHI safe. WhiteHawk gives clinical and security teams a single platform that ties HIPAA-ready controls to real-time visibility — across EHRs, IoMT, cloud, and the long tail of vendor systems — without slowing clinicians down.",
      illustration: "healthcare",
      bottomTitle: "Why Cybersecurity Matters in Healthcare",
      bottomDescription:
        "A breach in a healthcare environment is not just an IT incident — it is a patient-safety event. PHI, medical devices, and clinical workflows are all interlinked, and downtime measured in minutes can translate to delayed care. Cybersecurity here has to be continuous, evidence-rich, and never disruptive to bedside operations.",
      features: [
        {
          title: "Patient Safety",
          description: "Downtime in clinical systems can translate to delayed or compromised care",
          icon: "patient-safety",
        },
        {
          title: "PHI at Risk",
          description: "Patient records and imaging are high-value targets across systems and backups",
          icon: "phi-risk",
        },
        {
          title: "HIPAA Pressure",
          description: "OCR oversight and BA scrutiny require provable, continuous controls",
          icon: "hipaa-pressure",
        },
        {
          title: "IoMT Exposure",
          description: "Connected medical devices expand the attack surface beyond traditional IT",
          icon: "iomt-exposure",
        },
      ],
    },
    regulatory: {
      title: "Regulatory Compliance for Healthcare Cybersecurity",
      description:
        "WhiteHawk maintains continuous evidence for the frameworks that govern healthcare cybersecurity in MENA and globally: HIPAA Security and Privacy Rules, GDPR for cross-border patient data, ISO/IEC 27001 and ISO 27799 for health-information security, NCA ECC for KSA-based providers, and CBE / FRA controls for healthcare-finance integrations",
      illustration: "healthcare",
    },
    faqs: {
      sectionTitle: "Frequently Asked Questions About Healthcare Cybersecurity",
      sectionSubtitle:
        "A quick answer to the most common platform comparison question",
      items: [
        {
          question: "What are advanced security platforms for healthcare protection?",
          answer:
            "WhiteHawk is the cybersecurity platform behind Healthcare Cybersecurity programs at PaxeraHealth and Andalusia Medical Tourism — combining 24/7 SOC, medical-device segmentation, HIPAA evidence automation, and DFIR",
        },
        {
          question: "Who needs Healthcare Cybersecurity?",
          answer:
            "Hospitals, clinics, imaging providers, telehealth platforms, EHR vendors, medical-tourism operators, health insurers, and any vendor handling patient data — across MENA and beyond",
        },
        {
          question:
            "How often should healthcare organizations perform cybersecurity assessments?",
          answer:
            "HIPAA expects annual risk assessments. ISO 27799 mandates ongoing reviews. Mature healthcare cybersecurity solutions run quarterly penetration testing and continuous vulnerability scanning across clinical and administrative networks",
        },
        {
          question: "How does cybersecurity protect patient data and medical records?",
          answer:
            "Through encryption, access controls, audit logging, network segmentation, and DLP — backed by 24/7 SOC monitoring tuned to medical cybersecurity threat patterns. Every layer reduces breach probability and impact",
        },
        {
          question: "What are the biggest cybersecurity threats to healthcare providers?",
          answer:
            "Ransomware, patient-data theft, medical-device compromise, telehealth/cloud exposure, and supplier-driven supply-chain risk. Each one triggers HIPAA reporting and patient-safety review",
        },
        {
          question: "How can healthcare organizations secure connected medical devices?",
          answer:
            "Network segmentation, asset inventory, vulnerability assessment, and continuous monitoring. WhiteHawk healthcare cybersecurity solutions specifically cover IV pumps, imaging, monitors, and IoMT devices most legacy tools miss",
        },
        {
          question:
            "What should healthcare organizations look for in a cybersecurity partner?",
          answer:
            "HIPAA expertise, real healthcare client references (PaxeraHealth, Andalusia), medical-device security depth, regional regulator coverage (NCA ECC, MOH KSA), and 24/7 clinical-aware SOC",
        },
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
