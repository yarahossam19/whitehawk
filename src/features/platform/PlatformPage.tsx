"use client";

import type { PlatformPageConfig, PlatformType } from "./config";
import { PlatformHero } from "./PlatformHero/PlatformHero";
import { ActivitiesSection } from "./ActivitiesSection/ActivitiesSection";
import { MissionSection } from "./MissionSection/MissionSection";
import { SuccessStoriesSection } from "./SuccessStoriesSection/SuccessStoriesSection";

/** Public path prefix for platform imagery (hero.png, section1.png, …) */
export function platformImageDir(type: PlatformType): string {
  if (type === "asset-management") return "/assets/imgs/assets";
  return `/assets/imgs/${type}`;
}

interface PlatformPageProps {
  platformType: PlatformType;
  config: PlatformPageConfig;
}

export function PlatformPage({ platformType, config }: PlatformPageProps) {
  const imgDir = platformImageDir(platformType);
  return (
    <main>
      <PlatformHero
        title={config.hero.title}
        subtitle={config.hero.subtitle}
        ctaLabel={config.hero.ctaLabel}
        heroImageSrc={`${imgDir}/hero.png`}
      />
      <ActivitiesSection
        platformType={platformType}
        imageDir={imgDir}
        sectionTitle={config.activities.sectionTitle}
        sectionSubtitle={config.activities.sectionSubtitle}
        items={config.activities.items}
      />
      <MissionSection cards={config.mission.cards} />
      {/* <SuccessStoriesSection
        sectionTitle={config.successStories.sectionTitle}
        items={config.successStories.items}
      /> */}
    </main>
  );
}
