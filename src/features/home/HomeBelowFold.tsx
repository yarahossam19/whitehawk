"use client";

import { ClientsSection } from "./_sections/ClientsSection/ClientsSection";
import { DisconnectedSection } from "./_sections/DisconnectedSection/DisconnectedSection";
import { PlatformSection } from "./_sections/PlatformSection/PlatformSection";
import { TrustedBySection } from "./_sections/TrustedBySection/TrustedBySection";
import { WhyChooseSection } from "./_sections/WhyChooseSection/WhyChooseSection";
import { KeyCapabilitiesSection } from "./_sections/KeyCapabilitiesSection/KeyCapabilitiesSection";
import { ChallengesSection } from "./_sections/ChallengesSection/ChallengesSection";
import { MeasurableOutcomesSection } from "./_sections/MeasurableOutcomesSection/MeasurableOutcomesSection";
import { LeadingOrganizationsSection } from "./_sections/LeadingOrganizationsSection/LeadingOrganizationsSection";
import { TestimonialsSection } from "./_sections/TestimonialsSection/TestimonialsSection";
import { PackedBySection } from "./_sections/PackedBySection/PackedBySection";
import { CTASection } from "./_sections/CTASection/CTASection";
import { LazyLoadSection } from "@/components/LazyLoadSection";

/**
 * Balanced lazy-loading: Keep Clients & Disconnected as critical.
 * Defer everything from PlatformSection onwards.
 */
export default function HomeBelowFold() {
  return (
    <>
      <ClientsSection />
      <DisconnectedSection />
      <LazyLoadSection minHeight={800}>
        <PlatformSection />
      </LazyLoadSection>
      <LazyLoadSection minHeight={600}>
        <TrustedBySection />
      </LazyLoadSection>
      <LazyLoadSection minHeight={700}>
        <KeyCapabilitiesSection />
      </LazyLoadSection>
      <LazyLoadSection minHeight={600}>
        <WhyChooseSection />
      </LazyLoadSection>
      <LazyLoadSection minHeight={700}>
        <ChallengesSection />
      </LazyLoadSection>
      <LazyLoadSection minHeight={600}>
        <MeasurableOutcomesSection />
      </LazyLoadSection>
      <LazyLoadSection minHeight={700}>
        <LeadingOrganizationsSection />
      </LazyLoadSection>
      {/* <TestimonialsSection /> */}
      <LazyLoadSection minHeight={600}>
        <PackedBySection />
      </LazyLoadSection>
      <CTASection />
    </>
  );
}
