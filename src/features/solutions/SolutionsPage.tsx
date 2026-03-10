"use client";

import type { SolutionsPageConfig } from "./config";
import { SolutionsHero } from "./SolutionsHero/SolutionsHero";
import { ChallengeSolutionSection } from "./ChallengeSolutionSection/ChallengeSolutionSection";
import { BenefitsSection } from "./BenefitsSection/BenefitsSection";

interface SolutionsPageProps {
  config: SolutionsPageConfig;
}

export function SolutionsPage({ config }: SolutionsPageProps) {
  return (
    <main>
      <SolutionsHero
        title={config.hero.title}
        description={config.hero.description}
        ctaLabel={config.hero.ctaLabel}
        imageSrc={config.hero.imageSrc}
      />
      <ChallengeSolutionSection
        challenge={config.challengeSolution.challenge}
        solution={config.challengeSolution.solution}
      />
      <BenefitsSection
        sectionTitle={config.benefits.sectionTitle}
        sectionSubtitle={config.benefits.sectionSubtitle}
        items={config.benefits.items}
      />
    </main>
  );
}
