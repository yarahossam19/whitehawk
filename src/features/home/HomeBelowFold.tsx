import { ClientsSection } from "./_sections/ClientsSection/ClientsSection";
import { DisconnectedSection } from "./_sections/DisconnectedSection/DisconnectedSection";
import { PlatformSection } from "./_sections/PlatformSection/PlatformSection";
import { TrustedBySection } from "./_sections/TrustedBySection/TrustedBySection";
import { WhyChooseSection } from "./_sections/WhyChooseSection/WhyChooseSection";
import { KeyCapabilitiesSection } from "./_sections/KeyCapabilitiesSection/KeyCapabilitiesSection";
import { ChallengesSection } from "./_sections/ChallengesSection/ChallengesSection";
import { TestimonialsSection } from "./_sections/TestimonialsSection/TestimonialsSection";
import { PackedBySection } from "./_sections/PackedBySection/PackedBySection";
import { CTASection } from "./_sections/CTASection/CTASection";

/**
 * Single chunk for all below-fold sections:
 * - One network round-trip instead of 10 (mobile)
 * - One parse/hydration wave → lower TBT vs many dynamic() boundaries
 */
export default function HomeBelowFold() {
  return (
    <>
      <ClientsSection />
      <DisconnectedSection />
      <PlatformSection />
      <TrustedBySection />
      <WhyChooseSection />
      <KeyCapabilitiesSection />
      <ChallengesSection />
      <TestimonialsSection />
      <PackedBySection />
      <CTASection />
    </>
  );
}
