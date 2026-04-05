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
 * Hero: server HTML + small client islands. Below-fold: one dynamic chunk.
 */
export default function Home() {
  return (
    <>
      <HeroShell />
      <HomeBelowFold />
    </>
  );
}
