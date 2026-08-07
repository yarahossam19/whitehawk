"use client";

import { Button } from "@/components/site/ui/Button/Button";
import styles from "./page.module.scss";

/**
 * Newsletter signup for the article page.
 *
 * Split out of page.tsx purely because that page is a Server Component: an
 * onSubmit handler cannot cross the server/client boundary, and passing one
 * throws at render time rather than degrading. Mirrors the identical block in
 * blog-index-client.tsx, which is already a Client Component and so keeps it
 * inline.
 */
export function NewsletterForm() {
  return (
    <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        required
        placeholder="you@company.com"
        className={styles.newsletterInput}
      />
      <Button variant="accent" type="submit">Subscribe</Button>
    </form>
  );
}
