import { HeroSection } from "./_sections/HeroSection/HeroSection";
import { ClientsSection } from "./_sections/ClientsSection/ClientsSection";
import { DisconnectedSection } from "./_sections/DisconnectedSection/DisconnectedSection";
import { ChallengesSection } from "./_sections/ChallengesSection/ChallengesSection";
import { PlatformSection } from "./_sections/PlatformSection/PlatformSection";
import { TrustedBySection } from "./_sections/TrustedBySection/TrustedBySection";
import { WhyChooseSection } from "./_sections/WhyChooseSection/WhyChooseSection";
import { KeyCapabilitiesSection } from "./_sections/KeyCapabilitiesSection/KeyCapabilitiesSection";
import { TestimonialsSection } from "./_sections/TestimonialsSection/TestimonialsSection";
import { PackedBySection } from "./_sections/PackedBySection/PackedBySection";
import { CTASection } from "./_sections/CTASection/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
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