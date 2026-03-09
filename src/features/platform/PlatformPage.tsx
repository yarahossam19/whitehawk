"use client";

import type { PlatformPageConfig } from "./config";
import { PlatformHero } from "./PlatformHero/PlatformHero";
import { ActivitiesSection } from "./ActivitiesSection/ActivitiesSection";
import { MissionSection } from "./MissionSection/MissionSection";
import { SuccessStoriesSection } from "./SuccessStoriesSection/SuccessStoriesSection";

interface PlatformPageProps {
  config: PlatformPageConfig;
}

export function PlatformPage({ config }: PlatformPageProps) {
  return (
    <main>
      <PlatformHero
        title={config.hero.title}
        subtitle={config.hero.subtitle}
        ctaLabel={config.hero.ctaLabel}
      />
      <ActivitiesSection
        sectionTitle={config.activities.sectionTitle}
        sectionSubtitle={config.activities.sectionSubtitle}
        items={config.activities.items}
      />
      <MissionSection cards={config.mission.cards} />
      <SuccessStoriesSection
        sectionTitle={config.successStories.sectionTitle}
        items={config.successStories.items}
      />
    </main>
  );
}
