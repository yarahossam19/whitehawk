import Image from "next/image";
import styles from "./MeasurableOutcomesSection.module.scss";

type Outcome = {
  id: string;
  stat: string;
  label: string;
  /** Background image filling the card. */
  bgImage: string;
  bgAlt: string;
};

/* Right-to-left ordering: bg1 → right card, bg2 → middle, bg3 → left.
   The array is rendered left-to-right, so the leftmost card uses bg3. */
const OUTCOMES: Outcome[] = [
  {
    id: "incident-response-1",
    stat: "30%",
    label: "lower total cost",
    bgImage: "/assets/imgs/section-bg3.png",
    bgAlt: "",
  },
  {
    id: "mena-enterprises",
    stat: "64+",
    label: "Organizations Across MENA",
    bgImage: "/assets/imgs/section-bg2.png",
    bgAlt: "",
  },
  {
    id: "incident-response-2",
    stat: "40%",
    label: "Faster Response Decisions",
    bgImage: "/assets/imgs/section-bg1.png",
    bgAlt: "",
  },
];

export function MeasurableOutcomesSection() {
  return (
    <section className={styles.outcomesSection} aria-labelledby="outcomes-title">
      <div className={styles.container}>
        <h2 id="outcomes-title" className={styles.title}>
          Measurable outcomes trusted across MENA
        </h2>
        <p className={styles.subtitle}>
          White Hawk helps enterprises improve response speed, reduce security cost, and maintain compliance evidence across regulated environments
        </p>

        <ul className={styles.grid} role="list">
          {OUTCOMES.map((o) => (
            <li key={o.id} className={styles.card}>
              <Image
                src={o.bgImage}
                alt={o.bgAlt}
                fill
                sizes="(max-width: 800px) 100vw, 33vw"
                className={styles.cardBg}
                aria-hidden
                priority={false}
              />
              <div className={styles.cardContent}>
                <span className={styles.stat}>{o.stat}</span>
                <span className={styles.label}>{o.label}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
