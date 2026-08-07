import { SiteLayout } from "@/components/site/SiteLayout/SiteLayout";
import { Button } from "@/components/site/ui/Button/Button";
import styles from "./not-found.module.scss";

export default function PostNotFound() {
  return (
    <SiteLayout>
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>404</div>
        <h1 className={styles.title}>This article isn't published.</h1>
        <p className={styles.subtitle}>It may have been unpublished or the link is wrong.</p>
        <Button as="link" to="/blog" variant="accent" className={styles.cta}>Back to blog</Button>
      </div>
    </SiteLayout>
  );
}
