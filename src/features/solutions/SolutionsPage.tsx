"use client";

import type { SolutionsPageConfig } from "./config";
import { SolutionsHero } from "./SolutionsHero/SolutionsHero";
import { WhyMattersSection } from "./WhyMattersSection/WhyMattersSection";
import { ChallengeSolutionSection } from "./ChallengeSolutionSection/ChallengeSolutionSection";
import { BenefitsSection } from "./BenefitsSection/BenefitsSection";
import { RegulatorySection } from "./RegulatorySection/RegulatorySection";
import { FaqsSection } from "@/features/platform/FaqsSection/FaqsSection";

interface SolutionsPageProps {
  config: SolutionsPageConfig;
}

export function SolutionsPage({ config }: SolutionsPageProps) {
  return (
    <main>
      <SolutionsHero
        titleLines={config.hero.titleLines}
        description={config.hero.description}
        ctaLabel={config.hero.ctaLabel}
        imageSrc={config.hero.imageSrc}
      />
      <WhyMattersSection
        topTitle={config.whyMatters.topTitle}
        topDescription={config.whyMatters.topDescription}
        illustration={config.whyMatters.illustration}
        tabletBackgroundSrc={config.whyMatters.tabletBackgroundSrc}
        mobileBackgroundSrc={config.whyMatters.mobileBackgroundSrc}
        bottomTitle={config.whyMatters.bottomTitle}
        bottomDescription={config.whyMatters.bottomDescription}
        features={config.whyMatters.features}
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
      <RegulatorySection
        title={config.regulatory.title}
        description={config.regulatory.description}
        illustration={config.regulatory.illustration}
      />
      <FaqsSection
        sectionTitle={config.faqs.sectionTitle}
        sectionSubtitle={config.faqs.sectionSubtitle}
        items={config.faqs.items}
      />
    </main>
  );
}
