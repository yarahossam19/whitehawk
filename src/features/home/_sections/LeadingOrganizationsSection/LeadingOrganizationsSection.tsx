import Image from "next/image";
import styles from "./LeadingOrganizationsSection.module.scss";

type Card = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  /** When true, the card spans both columns on desktop (the wide hero card). */
  wide?: boolean;
};

/* Order matches the Figma bento grid:
   image1 → 24/7 Monitoring (full-width hero)
   image2 → Advanced Threat Detection
   image3 → Fast Incident Response
   image4 → Compliance-Ready
   image5 → Certified Experts                                               */
const CARDS: Card[] = [
  {
    id: "monitoring",
    title: "24/7 Monitoring",
    description:
      "SOC-as-a-Service running around the clock from regional centers in Egypt, KSA, UK, US, and Libya.",
    image: "/assets/imgs/leading-orgs/imagee1.png",
    imageAlt: "Dashboard mockup illustrating round-the-clock monitoring",
    wide: true,
  },
  {
    id: "threat-detection",
    title: "AI-Assisted Threat Detection",
    description:
      "Correlate telemetry, threat intelligence platforms, intrusion prevention system signals, and asset context to spot suspicious activity earlier and prioritize the alerts that require attention first",
    image: "/assets/imgs/leading-orgs/imagee2.png",
    imageAlt: "Timeline showing WhiteHawk AI threat-detection pipeline",
  },
  {
    id: "incident-response",
    title: "Faster Incident Response",
    description:
      "Move from detection to containment, investigation, evidence collection, and reporting with clear ownership, traceable steps, and fewer handoffs between teams",
    image: "/assets/imgs/leading-orgs/imagee3.png",
    imageAlt: "Contain, Forensics, Report incident-response flow",
  },
  {
    id: "compliance",
    title: "Compliance Evidence Built In",
    description:
      "Keep controls, evidence, tasks, audit trails, and reporting organized across frameworks such as SAMA, NCA, CBE, FRA 139, ISO 27001, PCI DSS, HIPAA, and GDPR",
    image: "/assets/imgs/leading-orgs/imagee4.png",
    imageAlt: "Compliance certifications grid",
  },
  {
    id: "experts",
    title: "Expert Support Behind the Platform",
    description:
      "White Hawk is backed by WhiteGuard's cybersecurity practitioners across offensive security, defensive operations, incident response, and GRC, so teams get platform capability with real operational expertise",
    image: "/assets/imgs/leading-orgs/imagee5.png",
    imageAlt: "Cybersecurity certification badges",
  },
];

export function LeadingOrganizationsSection() {
  return (
    <section className={styles.section} aria-labelledby="leading-orgs-title">
      <div className={styles.container}>
        <h2 id="leading-orgs-title" className={styles.title}>Why Leading Organizations Choose White Hawk</h2>
        <p className={styles.subtitle}>
          Five practical reasons teams use White Hawk as their cybersecurity system to connect security operations, detection, response, compliance, and expert support in one cybersecurity platform
        </p>

        <ul className={styles.grid} role="list">
          {CARDS.map((card) => (
            <li
              key={card.id}
              className={`${styles.card} ${card.wide ? styles.cardWide : ""}`}
            >
              <div className={styles.cardCopy}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>
              <div className={styles.cardImageWrap}>
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  sizes={
                    card.wide
                      ? "(max-width: 900px) 100vw, 1100px"
                      : "(max-width: 900px) 100vw, 540px"
                  }
                  className={styles.cardImage}
                  loading="lazy"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
