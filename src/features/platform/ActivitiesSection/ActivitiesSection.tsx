"use client";

import Image from "next/image";
import Link from "next/link";
import type { ActivityItem, PlatformType } from "../config";
import styles from "./ActivitiesSection.module.scss";

/** Max sectionN.png available per platform folder (defensive has 5; assets has 3). */
const MAX_SECTION: Record<PlatformType, number> = {
  offensive: 6,
  defensive: 5,
  grc: 7,
  "asset-management": 3,
};

/** Bump this when replacing same-named section images to force a refetch. */
const IMAGE_VERSION = "2026-04-14-1";

function sectionSrc(imageDir: string, platformType: PlatformType, index: number): string {
  const n = Math.min(index, MAX_SECTION[platformType]);
  return `${imageDir}/sect${n}.png?v=${IMAGE_VERSION}`;
}

/** lowercase, hyphenated, alphanumeric-only slug from a title. */
function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface ActivitiesSectionProps {
  platformType: PlatformType;
  imageDir: string;
  sectionTitle: string;
  sectionSubtitle?: string;
  items: ActivityItem[];
}

export function ActivitiesSection({
  platformType,
  imageDir,
  sectionTitle,
  sectionSubtitle,
  items,
}: ActivitiesSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.headerWrap}>
        <div className={styles.header}>
          <h2 className={styles.title}>{sectionTitle}</h2>
          {sectionSubtitle && <p className={styles.subtitle}>{sectionSubtitle}</p>}
        </div>
      </div>
      <div className={styles.rows}>
        {items.map((item, index) => {
          const slug = item.slug ?? slugify(item.title);
          const learnMoreHref = `/platform/${platformType}/${slug}`;
          return (
            <div
              key={item.title}
              className={`${styles.row} ${index % 2 === 1 ? styles.rowReverse : ""}`}
            >
              <div className={styles.content}>
                <div>
                <h3 className={styles.rowTitle}>{item.title}</h3>
                <p className={styles.rowDescription}>{item.description}</p>
                </div>
                {/* <Link
                  href={learnMoreHref}
                  className={styles.learnMore}
                  aria-label={`Learn more about ${item.title}`}
                >
                  Learn More
                </Link> */}
              </div>
              <div className={styles.media}>
                <div className={styles.imageFrame}>
                  <Image
                    src={sectionSrc(imageDir, platformType, index)}
                    alt=""
                    width={640}
                    height={400}
                    unoptimized
                    className={styles.rowImage}
                    sizes="(max-width: 900px) 100vw, 50vw"
                    loading={index < 1 ? "eager" : "lazy"}
                    fetchPriority={index < 1 ? "high" : "low"}
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
