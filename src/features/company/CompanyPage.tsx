"use client";

import { CompanyHero } from "./sections/CompanyHero/CompanyHero";
import { ScatteredUnifiedSection } from "./sections/ScatteredUnifiedSection/ScatteredUnifiedSection";
import { StoryLineSection } from "./sections/StoryLineSection/StoryLineSection";
import { PrinciplesSection } from "./sections/PrinciplesSection/PrinciplesSection";
import { LeadershipSection } from "./sections/LeadershipSection/LeadershipSection";
import { TrustSection } from "./sections/TrustSection/TrustSection";

export function CompanyPage() {
  return (
    <main>
      <CompanyHero />
      <ScatteredUnifiedSection />
      <StoryLineSection />
      <PrinciplesSection />
      <LeadershipSection />
      <TrustSection />
    </main>
  );
}

