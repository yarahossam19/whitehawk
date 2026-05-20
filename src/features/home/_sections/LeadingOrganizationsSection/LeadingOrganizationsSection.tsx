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
    title: "Advanced Threat Detection",
    description:
      "WhiteHawk's AI engine processes telemetry under 200 ms and reduces MTTR by 40%, combining threat intelligence platform data and intrusion prevention system signals into one decision engine.",
    image: "/assets/imgs/leading-orgs/imagee2.png",
    imageAlt: "Timeline showing WhiteHawk AI threat-detection pipeline",
  },
  {
    id: "incident-response",
    title: "Fast Incident Response",
    description:
      "DFIR-backed containment, forensic reporting, and regulator-ready documentation produced the same week.",
    image: "/assets/imgs/leading-orgs/imagee3.png",
    imageAlt: "Contain, Forensics, Report incident-response flow",
  },
  {
    id: "compliance",
    title: "Compliance-Ready",
    description:
      "SAMA, NCA, CBE, FRA 139, ISO 27001, PCI-DSS 4.0, HIPAA, GDPR — evidence collected continuously by the cybersecurity platform.",
    image: "/assets/imgs/leading-orgs/imagee4.png",
    imageAlt: "Compliance certifications grid",
  },
  {
    id: "experts",
    title: "Certified Experts",
    description:
      "OSCP, OSWE, OSEP, OSWP, CEH, CRTP, C|PENT, eCPPT, eCPTX, GPEN, GXPN, GCPN credentials.",
    image: "/assets/imgs/leading-orgs/imagee5.png",
    imageAlt: "Cybersecurity certification badges",
  },
];

export function LeadingOrganizationsSection() {
  return (
    <section className={styles.section} aria-labelledby="leading-orgs-title">
      <div className={styles.container}>
        <h2 id="leading-orgs-title" className={styles.title}>
          Why Leading Organizations Choose This Cybersecurity System.
        </h2>
        <p className={styles.subtitle}>
          Five decision points, structured as a scannable bento grid: operations, response,
          expertise, compliance, and AI detection working as one system.
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
