import dynamic from "next/dynamic";
import holdStyles from "./home-placeholders.module.scss";
import { HeroShell } from "./HeroShell";

const HomeBelowFold = dynamic(() => import("./HomeBelowFold"), {
  loading: () => (
    <div
      className={holdStyles.hold}
      style={{ minHeight: 4800, background: "#ffffff" }}
      aria-hidden
    />
  ),
});

/**
 * Hero: server HTML (h1/subtitle/cloud) + tiny client islands → fast mobile LCP.
 * Below-fold: one dynamic chunk → one network + lower TBT than 10× dynamic().
 */
export default function Home() {
  return (
    <>
      <HeroShell />
      <HomeBelowFold />
    </>
  );
}
