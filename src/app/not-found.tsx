import Link from "next/link";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Page not found</h2>
        <p className={styles.description}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={styles.button}>
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
