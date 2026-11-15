import { CTABand } from "@/components/site/ui/CTABand/CTABand";

/** The dark band under every article. Shared by the public page and the editor Preview. */
export function ArticleCta() {
  return (
    <CTABand
      title="Bring the whole security program under one roof"
      primary={{ label: "Book a Demo", to: "/contact" }}
      secondary={{ label: "Explore platform", to: "/platform" }}
    />
  );
}
