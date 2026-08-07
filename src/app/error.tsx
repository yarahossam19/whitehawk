"use client";

import { useEffect } from "react";
import { reportLovableError } from "@/lib/lovable-error-reporting";
import styles from "./error.module.scss";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
    reportLovableError(error, { boundary: "next_error_boundary" });
  }, [error]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>This page didn't load</h1>
        <p className={styles.description}>
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className={styles.actions}>
          <button onClick={() => reset()} className={styles.primaryButton}>
            Try again
          </button>
          <a href="/" className={styles.secondaryButton}>
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}
