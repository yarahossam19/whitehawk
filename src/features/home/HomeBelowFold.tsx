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

/**
 * Single below-fold chunk: predictable layout, no deferred “part B” hydration gaps.
 */
export default function HomeBelowFold() {
  return (
    <>
      <ClientsSection />
      <DisconnectedSection />
      <PlatformSection />
      <TrustedBySection />
      <KeyCapabilitiesSection />
      <WhyChooseSection />
      <ChallengesSection />
      <MeasurableOutcomesSection />
      <LeadingOrganizationsSection />
      {/* <TestimonialsSection /> */}
      <PackedBySection />
      <CTASection />
    </>
  );
}
