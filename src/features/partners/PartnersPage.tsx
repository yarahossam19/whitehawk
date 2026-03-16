"use client";

import { PartnersHero } from "./sections/PartnersHero/PartnersHero";
import { WhyPartnerSection } from "./sections/WhyPartnerSection/WhyPartnerSection";
import { PartnerAudienceSection } from "./sections/PartnerAudienceSection/PartnerAudienceSection";
import { EngagementSection } from "./sections/EngagementSection/EngagementSection";
import { CapabilitiesSection } from "./sections/CapabilitiesSection/CapabilitiesSection";
import { DeliverBenefitsSection } from "./sections/DeliverBenefitsSection/DeliverBenefitsSection";
import { TiersSection } from "./sections/TiersSection/TiersSection";
import { PartnersCTASection } from "./sections/PartnersCTASection/PartnersCTASection";

export function PartnersPage() {
  return (
    <main>
      <PartnersHero />
      <WhyPartnerSection />
      <PartnerAudienceSection />
      <EngagementSection />
      <CapabilitiesSection />
      <DeliverBenefitsSection />
      <TiersSection />
      <PartnersCTASection />
    </main>
  );
}
