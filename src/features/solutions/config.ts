import type { WhyMattersIconName } from "./WhyMattersSection/WhyMattersIcons";
import type { WhyMattersIllustrationName } from "./WhyMattersSection/WhyMattersIllustrations";
import type { RegulatoryIllustrationName } from "./RegulatorySection/RegulatoryIllustrations";

export type SolutionType = "fintech-company" | "public-sectors" | "healthcare-organizations";

export interface ChallengeItem {

  title: string;
  description: string;
  icon: "target" | "lightning" | "lock" | "clock" | "stroke" | "documents" | "data";
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
  icon:
    | "eye"
    | "lightning"
    | "clock"
    | "infinity"
    | "bolt"
    | "uptime"
    | "confidence"
    | "coverage"
    |"report"
    | "scale"
    | "data";

}

export interface SolutionsPageConfig {
  title: string;
  metaTitle: string;
  metaDescription: string;
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
    metaTitle: "Cybersecurity in Fintech: PCI-DSS & CBE | WhiteHawk",
    metaDescription:
      "Cybersecurity in fintech — PCI-DSS 4.0, CBE, SAMA, FRA 139, API security, fraud detection, 24/7 SOC. WhiteHawk for MENA fintechs.",
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
        { value: "Confidence", title: "Investor Confidence", description: "Mature security and fintech and cybersecurity is now a Series A diligence requirement across MENA fintech investors, not a Series C polish", icon: "confidence" },
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
    metaTitle: "Government Cybersecurity: NCA ECC & CCC | WhiteHawk",
    metaDescription:
"Government cybersecurity by WhiteHawk — NCA ECC, NCA CCC, NCA OTCC, OT security, citizen data protection, sovereign-aware SOC for MENA.",    hero: {
      titleLines: ["Government & Public ","Sector Cybersecurity Across MENA"],
      description:
"Government cybersecurity is national security. Citizen data, critical infrastructure, electoral systems, and public services are now permanent targets. WhiteHawk delivers government cybersecurity for ministries and public sector cybersecurity teams across MENA — aligned to NCA ECC, NCA CCC, NCA OTCC, and ISO 27001, and trusted by institutions like the Grand Egyptian Museum.",      ctaLabel: "Get Demo",
      imageSrc: "/assets/imgs/solutions/government.png",
    },
    challengeSolution: {
      challenge: {
        title: "Top Cybersecurity Risks Facing Government & Public Infrastructure",
        items: [
          {
            title: "Nation-State Campaigns",
            description: "Long-dwell intrusions targeting ministries, defense, and energy operators. Detection requires behavioral analytics and threat hunting, not signature-based tools — exactly what cyber security public sector teams now demand.",
            icon: "target",
          },
          {
            title: "Ransomware on Critical Services",
            description: "Hospitals, utilities, and municipal services are increasingly ransomware targets across the region. Recovery without backups can take weeks.",
            icon: "stroke",
          },
          {
            title: "Citizen Data Exposure",
            description: "Misconfigured cloud storage and weak access controls have produced some of the largest public-sector data leaks in MENA in the last 24 months.",
            icon: "documents",
          },
         
        ],
      },
      solution: {
        title: "Government Cybersecurity Solutions",
        items: [
          {
            title: "Threat Detection & National Security Monitoring",
            description: "24/7 SOC operations with regional coverage across Egypt, KSA, the UK, the US, and Libya. Behavioral analytics tuned to nation-state TTPs and threat-intel feeds focused on adversaries active in MENA's public sector.",
            icon: "dashboard",
          },
          {
            title: "Critical Infrastructure & Public Network Protection",
            description: "OT and ICS security for utilities, transportation, and public-service operators. Network segmentation, secure remote access, and continuous monitoring of operational technology — the systems that fail most catastrophically when attacked.",
            icon: "lightning",
          },
          {
            title: "Government Compliance, Governance & Risk Management",
            description: "Continuous control mapping for NCA ECC, NCA CCC, NCA OTCC, ISO/IEC 27001, and sovereign cloud requirements. Audit evidence collected continuously, not assembled in panic the week the assessor arrives.",
            icon: "lock",
          },
          {
            title: "Identity, Access & Citizen Data Protection",
            description: "Privileged access management, multi-factor authentication, role-based access control, and data-loss prevention for citizen records. Zero-trust architectures designed for both employee and citizen-facing services.",
            icon: "data",
          },
         
        ],
      },
    },
    benefits: {
      sectionTitle: "Outcomes that matter to public missions",
      sectionSubtitle: "Less manual evidence work, faster decisions, stronger citizen trust",
      items: [
        { value: "Trusted", title: "Citizen Confidence", description: "Audited cybersecurity posture builds public trust and drives adoption of secure digital government services across the region.", icon: "eye" },
        { value: "Resilient", title: "Always-On Services", description: "Continuous monitoring ensures service availability under attack — measured in minutes of downtime, not hours", icon: "infinity" },
        { value: "Aligned", title: "Compliance Ready", description: "Evidence-on-demand simplifies compliance with NCA frameworks and ISO standards — no more last-minute audit rush.", icon: "report" },
        { value: "Protected", title: "Data Sovereignty", description: "Citizen data stays local, encrypted, and fully controlled — aligned with sovereignty and residency requirements", icon: "data" },
      ],
    },
    whyMatters: {
      topTitle: "Strengthening Public Sector Cybersecurity with Advanced Cybersecurity",
      topDescription:
        "Government cybersecurity has to balance two things that pull in opposite directions: open access for citizens and ironclad protection of sovereign data. WhiteHawk gives govt cyber security teams the platform and the expertise to do both — without the vendor sprawl that plagued public-sector IT historically",
      illustration: "government",
      bottomTitle: "Why Cybersecurity Matters in Government & Public Sector",
      bottomDescription:" A breach inside a government agency is not just an IT incident — it is a sovereign-trust event. Citizen records, regulatory data, defense communications, and critical-service availability are all at stake. Cybersecurity and government can no longer be separate procurement tracks; they have to be one continuously assessed program",      features: [
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
      title: "Regulatory Compliance for Government Cybersecurity.",
      description:
"WhiteHawk maintains continuous evidence for the frameworks that govern public-sector security in MENA: NCA ECC, NCA CCC, NCA OTCC for operational technology, sovereign data residency requirements, and international standards including ISO 27001 and NIST CSF where applicable to multi-national engagements.",      illustration: "government",
    },
    faqs: {
      sectionTitle: "What are advanced cybersecurity platforms for public sector protection?",
      sectionSubtitle:
      "WhiteHawk is the cybersecurity platform purpose-built for cyber security public sector environments — combining 24/7 SOC, OT security, NCA-aligned GRC, and DFIR under one continuously assessed program.",
      items: [
        {
          question: "Who needs government & public sector cybersecurity?",
          answer:
"Ministries, agencies, sovereign-cloud operators, public-service providers, defense contractors, cultural institutions, and any entity whose compromise would have national-level consequences. Government cyber security agencies typically lead procurement.",        },
        {
          question: "How often should government organizations conduct cybersecurity assessments?",
          answer:
"NCA ECC and NCA CCC frameworks require annual readiness reviews plus continuous monitoring. Mature government cybersecurity programs run quarterly red-team exercises against high-criticality assets.",        },
        {
          question:
            "What role does cybersecurity play in protecting national critical infrastructure?",
          answer:
"Critical infrastructure is the highest-stakes attack surface. NCA OTCC mandates specific OT security controls; public sector cybersecurity teams must apply them across utilities, transport, and energy.",        },
        {
          question: "How can public sector organizations improve resilience against cyberattacks?",
          answer:
"Continuous monitoring, validated incident-response playbooks, segmented networks, and tested recovery procedures. The cybersecurity and government playbook is now 'assume breach,' not 'prevent every intrusion'",        },
        {
          question: "What is the importance of citizen data protection in government cybersecurity?",
          answer:
"Citizen trust is the foundation of digital government. A single major leak can set digital-services adoption back years. Privacy-by-design, encryption, and access controls are non-negotiable.",        },
        {
          question: "What should government organizations look for in a cybersecurity partner?",
          answer:
"NCA registration, sovereign-cloud capability, public-sector references, OT security depth, and continuous evidence collection. The partners trusted by government cyber security agencies share these traits.",        },
        
      ],
    },
  },
  /* Figma 864:6861 — Healthcare */
  "healthcare-organizations": {
    title: "Healthcare Organizations",
    metaTitle: "Healthcare Cybersecurity: HIPAA & ISO 27799 | WhiteHawk",
    metaDescription:

"Healthcare cybersecurity solutions — HIPAA, GDPR, ISO 27799, medical device security, 24/7 SOC. PaxeraHealth & Andalusia trust WhiteHawk.",    hero: {
      titleLines: ["Healthcare Cybersecurity","for Hospitals, Clinics & Health-Tech"],
      description:
"Healthcare Cybersecurity is patient safety. Connected medical devices, electronic health records, and remote consultation platforms are now permanent targets for ransomware crews and data brokers. WhiteHawk delivers healthcare cybersecurity solutions for hospitals, imaging companies, insurers, and medical-tourism providers — including current clients like PaxeraHealth and Andalusia Medical Tourism — aligned to HIPAA, GDPR, and regional health regulators.",      ctaLabel: "Get Demo",
      imageSrc: "/assets/imgs/solutions/healthcare.png",
    },
    challengeSolution: {
      challenge: {
        title: "Top Cybersecurity Risks Facing Healthcare Providers",
        items: [
          {
            title: "Ransomware on Clinical Systems",
            description:
"Hospital ransomware is growing fastest in MENA. Outage windows directly impact patient care and trigger mandatory regulatory reporting under regional health cybersecurity rules.",       
     icon: "target",
      },
          {
            title: "Patient Data Theft",
            description:
"Medical records sell for 10x more than payment cards on criminal marketplaces. Leaks trigger HIPAA, GDPR, and local-regulator penalties simultaneously.",
            icon: "lightning",
          },
          {
            title: "Medical Device Compromise",
            description:
"IV pumps, imaging systems, and patient monitors are connected, often unpatched, and rarely covered by traditional endpoint protection — a core medical cybersecurity blind spot",           
 icon: "data",
          },
        ],
      },
      solution: {
        title: "Healthcare Cybersecurity Solutions",
        items: [
          {
            title: "Threat Detection for Healthcare Systems",
            description: "24/7 SOC monitoring tuned to clinical workflows. Behavioral analytics distinguish nurse-station shift changes from credential misuse, and clinical-system alerts route to staff who understand both technology and patient impact.",
            icon: "dashboard",
          },
          {
            title: "Patient Data Privacy & Medical Record Protection",
            description: "Encryption at rest and in transit, data-loss prevention across email and storage, role-based access for electronic health records, and audit logging detailed enough to satisfy HIPAA and regional data-protection regulators on demand.",
            icon: "lightning",
          },
          {
            title: "HIPAA Compliance, Governance & Risk Management",
            description: "Continuous HIPAA control mapping, GDPR alignment for cross-border patient data, and ISO 27001 evidence — collected automatically through WhiteHawk's GRC module instead of manually reassembled at every audit cycle.",
            icon: "lock",
          },
          {
            title: "Medical Device, Cloud & Hospital Network Security",
            description: "Network segmentation isolating connected medical devices from administrative networks, cloud-posture monitoring across Azure and AWS, and continuous vulnerability assessment for the hospital network's actual living asset inventory.",
            icon: "data",
          },
         
        ],
      },
    },
    benefits: {
      sectionTitle: "Why healthcare teams choose WhiteHawk",
      sectionSubtitle: "Stronger posture without disrupting care delivery",
      items: [
        { value: "Uptime", title: "Clinical Continuity", description: "Continuous healthcare cybersecurity monitoring keeps EHR, imaging, and clinical systems running — even during regional disruptions or active attacks.", icon: "uptime" },
        { value: "Confidence", title: "Patient Confidence", description: "Strong security posture now influences patient choice for healthcare and medical tourism across the Gulf region.", icon: "confidence" },
        { value: "Compliance", title: "Compliance Simplicity", description: "On-demand evidence for HIPAA, GDPR, ISO 27001, ISO 27799, and regional regulators removes audit-season pressure", icon: "clock" },
        { value: "Coverage", title: "Better Coverage", description: "Cyber insurers require proven controls — automated evidence generation helps reduce friction and improve underwriting outcomes", icon: "coverage" },
      ],
    },
    whyMatters: {
      topTitle: "Securing Healthcare Systems, Patients & Critical Data",
      topDescription:
        "Healthcare cybersecurity has to protect three things at once: clinical operations that cannot stop, patient data that cannot leak, and connected devices that cannot be tampered with. WhiteHawk Healthcare Cybersecurity is the only platform that tackles all three under a single continuously assessed program.",
      illustration: "healthcare",
      bottomTitle: "Why Cybersecurity Matters in Healthcare Organizations",
      bottomDescription:
        "A ransomware event inside a hospital is not measured in dollars. It is measured in delayed surgeries, rerouted ambulances, and patient outcomes. Health cybersecurity has to meet clinical-quality standards — regulators across MENA, the EU, and the US now treat Healthcare Cybersecurity as a patient-safety obligation, not an IT checkbox.",
      features: [
        {
          title: "Clinical Impact",
          description: "Downtime in clinical systems can directly translate into delayed or compromised patient care.",
          icon: "patient-safety",
        },
        {
          title: "Patient Safety",
          description: "Medical devices and EHR systems are high-value ransomware targets with direct bedside consequences.",
          icon: "phi-risk",
        },
        {
          title: "Beyond Compliance",
          description: "Healthcare providers face simultaneous HIPAA, GDPR, and regional-regulator obligations on every audit cycle.",
          icon: "hipaa-pressure",
        },
        {
          title: "Global Regulation",
          description: "Cross-border patient data and medical tourism mean multiple regulatory frameworks apply at once.",
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
