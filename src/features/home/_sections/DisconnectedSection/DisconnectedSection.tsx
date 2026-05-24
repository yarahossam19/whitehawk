import styles from "./DisconnectedSection.module.scss";
import challenge1 from "@/../public/assets/icons/challenges/challenge16.svg";
import challenge2 from "@/../public/assets/icons/challenges/challenge18.svg";
import challenge3 from "@/../public/assets/icons/challenges/challenge13.svg";
import challenge4 from "@/../public/assets/icons/challenges/challenge17.svg";
import challenge5 from "@/../public/assets/icons/challenges/challenge11.svg";
import challenge6 from "@/../public/assets/icons/challenges/challenge15.svg";


const CARDS = [
  {
    title: "Too Many Tools, Not Enough Coordination",
    description:
      "Security teams often run separate tools — SIEMs, scanners, threat intelligence platforms, and ticketing systems — for monitoring, testing, compliance, assets, and reporting. Without one connected cybersecurity system, important risks are missed, delayed, or handled without full context.",
    icon: challenge1,
  },
    {
    title: "Alerts Without Clear Business Context",
    description:
      "Not every alert carries the same level of risk. A warning on a critical production system should not be treated the same as activity on a low-priority asset. Without context, teams waste time deciding what matters first.",
    icon: challenge2,
  },
  {
    title: "Asset Visibility Is Never Complete",
    description:
      "You cannot secure what you cannot see. IT assets, cloud systems, endpoints, applications, and even non-IT assets can easily fall out of view when they are tracked across scattered sheets, tools, and teams",
    icon: challenge3,
  },

  {
    title: "Compliance Work Feels Manual and Repetitive",
    description:
      "Compliance becomes harder when evidence, controls, tasks, and ownership are managed separately. Teams spend too much time collecting proof, updating files, and preparing for audits instead of improving the security program",
    icon: challenge4,
  },
  {
    title: "Vulnerabilities Are Found, But Not Prioritized",
    description:
      "Many organizations know they have vulnerabilities, but struggle to decide which ones should be fixed first. When vulnerability data is disconnected from asset value, intrusion prevention system signals, and business impact, remediation becomes slow and reactive.",
    icon: challenge5,
  },
  {
    title: "Security Workflows Are Hard to Control",
    description:
      "When tasks move between SOC teams, GRC teams, IT teams, and management without a unified workflow, ownership becomes unclear. This slows response, weakens accountability, and makes cybersecurity harder to manage at scale",
    icon: challenge6,
  },
];



export function DisconnectedSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Is Your Cybersecurity Feeling Disconnected?</h2>
          <p className={styles.subtitle}>
            Modern security teams do not usually suffer from a lack of tools. They suffer because every tool, alert, asset, vulnerability, and compliance task lives outside any unified cybersecurity system
          </p>
        </div>
        <div className={styles.grid}>
          {CARDS.map((card) => (
            <article key={card.title} className={styles.card}>
              <div className={styles.iconWrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={typeof card.icon === "string" ? card.icon : (card.icon as { src?: string })?.src ?? ""}
                  alt=""
                  width={30}
                  height={30}
                />
              </div>
      
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
