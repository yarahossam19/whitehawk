"use client";

import { useState } from "react";
import { Linkedin, Twitter, Link2 } from "lucide-react";
import styles from "./share-buttons.module.scss";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const share = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>Share</span>
      <button
        type="button"
        aria-label="Share on LinkedIn"
        onClick={() =>
          share(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`)
        }
        className={styles.iconButton}
      >
        <Linkedin size={14} />
      </button>
      <button
        type="button"
        aria-label="Share on X"
        onClick={() =>
          share(
            `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title)}`,
          )
        }
        className={styles.iconButton}
      >
        <Twitter size={14} />
      </button>
      <button
        type="button"
        aria-label="Copy link"
        onClick={async () => {
          if (navigator.clipboard) {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }
        }}
        className={styles.iconButton}
      >
        <Link2 size={14} />
      </button>
      {copied && <span className={styles.copiedLabel}>Copied</span>}
    </div>
  );
}
