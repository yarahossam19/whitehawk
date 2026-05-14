import Image from "next/image";
import styles from "./KeyCapabilitiesSection.module.scss";
import offensive from "@/../public/assets/icons/navbar/Offensive.svg";
import hacker from "@/../public/assets/icons/cards/Hacker.svg";
import notes from "@/../public/assets/icons/cards/note.svg";
import defensive from "@/../public/assets/icons/navbar/Defensive.svg";
import grc from "@/../public/assets/icons/navbar/GRC.svg";
import assetManagement from "@/../public/assets/icons/navbar/Asset Management.svg";

const CAPABILITIES = [
  {
    id: "offensive",
    title: "Offensive Security",
    description:
      "Simulate real-world attacks to identify weaknesses in your network, systems, and applications. Regularly run assessments to stay ahead of potential threats",
    icon: hacker,
    iconBg: "red",
  },
  {
    id: "defensive",
    title: "Defensive Security",
    description:
      "Continuously monitor for threats and suspicious activity in your network. Stay updated on the latest attack techniques with real-time threat intelligence",
    icon: defensive,
    iconBg: "blue",
  },
  {
    id: "grc",
    title: "GRC",
    description:
      "Ensure you stay compliant with regulations like NIST, ISO, and PCI. Automate risk assessments, compliance checks, and generate audit-ready reports",
    icon: notes,
    iconBg: "purple",
  },
  {
    id: "asset",
    title: "Asset Management",
    description:
      "Keep an eye on all your assets, from servers to IoT devices. Ensure that everything connected to your network is secure and properly managed",
    icon: assetManagement,
    iconBg: "green",
  },
];

export function KeyCapabilitiesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>KEY CAPABILITIES</p>
        <h2 className={styles.title}>
          All-in-One platform to manage your cybersecurity
        </h2>
        <p className={styles.description}>
          White Hawk combines everything you need to manage your security, from
          vulnerability scanning to compliance checks, into one easy-to-use
          platform.
        </p>
        <div className={styles.cards}>
          {CAPABILITIES.map((cap) => (
            <article key={cap.id} className={styles.card}>
              <div
                className={`${styles.cardIconWrap} ${styles[`iconBg_${cap.iconBg}`]}`}
              >
                <Image src={cap.icon} alt="" width={28} height={28} className={styles.cardIcon} />
              </div>
              <h3 className={styles.cardTitle}>{cap.title}</h3>
              <p className={styles.cardDescription}>{cap.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
