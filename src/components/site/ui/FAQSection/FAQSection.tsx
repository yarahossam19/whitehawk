import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/site/ui/Button/Button";
import { FAQ } from "@/components/site/ui/FAQ/FAQ";
import styles from "./FAQSection.module.scss";

/**
 * The one FAQ layout used across the whole site: a sticky left aside
 * (eyebrow + heading + body + "Contact us") next to the shared numeral-
 * indexed accordion (FAQ). Every page's FAQ block should render this
 * instead of hand-rolling its own left column or accordion markup.
 */
export function FAQSection({
  eyebrow = "FAQ",
  heading,
  body,
  items,
}: {
  eyebrow?: string;
  heading: string;
  body: string;
  items: Array<{ q: string; a: string }>;
}) {
  return (
    <div className={styles.grid}>
      <div className={`reveal ${styles.aside}`}>
        <div className={styles.eyebrow}>{eyebrow}</div>
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.body}>{body}</p>
        <Button as="link" to="/contact" variant="ghost" className={styles.cta}>
          Contact us <ArrowUpRight size={14} />
        </Button>
      </div>
      <FAQ items={items} />
    </div>
  );
}
