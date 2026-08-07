"use client";

import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout/SiteLayout";
import { HeroWordmark } from "@/components/site/HeroWordmark";
import { Button } from "@/components/site/ui/Button/Button";
import { CTABand } from "@/components/site/ui/CTABand/CTABand";
import { Section } from "@/components/site/ui/Section/Section";
import { Search } from "lucide-react";
import { IntegrationLogo } from "@/components/site/ui/IntegrationLogo/IntegrationLogo";
import styles from "./integrations-client.module.scss";

const categories = [
  "All",
  "Network discovery",
  "Cloud",
  "Identity & endpoint",
  "Detection & response",
  "Threat intel & data",
  "Productivity",
] as const;

type Category = (typeof categories)[number];

// One line per real category — shown under the category label in the grid.
const categoryDescriptions: Partial<Record<Category, string>> = {
  "Network discovery": "Sweep the network itself rather than trusting an inventory — SNMP, active and wireless discovery find what nobody registered.",
  "Cloud": "Continuous posture and asset checks across the accounts you've actually deployed, not last quarter's snapshot.",
  "Identity & endpoint": "Users, groups and devices stay current, and approved response actions land on the endpoint that needs them.",
  "Detection & response": "Alerts stream in from your existing detection stack and containment goes back out — WhiteHawk adds context, not another console.",
  "Threat intel & data": "Actor attribution, exploit availability, ransomware activity and leaked-credential data enriching every finding.",
  "Productivity": "Schedules and findings where your team already works, instead of one more dashboard to check.",
};

// The connectors WhiteHawk actually ships, mirroring the product's own
// integrations screen. Brand marks are resolved by name in IntegrationLogo —
// see the note there on which vendors simple-icons has no mark for.
// The browse-mode marquee duplicates its row and slides it by half, so it only
// reads as continuous while one copy is wider than the row. Below this many
// chips it isn't, and the row would scroll across visible empty space — those
// categories render as a static wrap instead. Raise the connector count and a
// category picks the animation back up on its own.
const MARQUEE_MIN_ITEMS = 6;

type Integration = { name: string; cat: Category };

const integrations: Integration[] = [
  { name: "SNMP discovery", cat: "Network discovery" },
  { name: "Active discovery", cat: "Network discovery" },
  { name: "Wireless discovery", cat: "Network discovery" },
  { name: "AWS", cat: "Cloud" },
  { name: "Microsoft Azure", cat: "Cloud" },
  { name: "Google Cloud", cat: "Cloud" },
  { name: "Alibaba Cloud", cat: "Cloud" },
  { name: "Active Directory", cat: "Identity & endpoint" },
  { name: "Asset Agent", cat: "Identity & endpoint" },
  { name: "EDR", cat: "Identity & endpoint" },
  { name: "SIEM", cat: "Detection & response" },
  { name: "Elastic Search", cat: "Detection & response" },
  { name: "Threat Hunting", cat: "Detection & response" },
  { name: "Firewall", cat: "Detection & response" },
  { name: "Dexpose", cat: "Threat intel & data" },
  { name: "Ransomware Live", cat: "Threat intel & data" },
  { name: "NVD CVE", cat: "Threat intel & data" },
  { name: "Kali / Nessus", cat: "Threat intel & data" },
  { name: "Microsoft Calendar", cat: "Productivity" },
];

function ToolChip({ name }: { name: string }) {
  return (
    <div className={styles.chip}>
      <IntegrationLogo name={name} />
      <span className={styles.chipName}>{name}</span>
    </div>
  );
}

export function IntegrationsClient() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");

  const isFiltering = q.trim() !== "" || cat !== "All";

  const filtered = useMemo(() => {
    return integrations.filter((i) => {
      const matchCat = cat === "All" || i.cat === cat;
      const matchQ = !q || i.name.toLowerCase().includes(q.toLowerCase());
      return matchCat && matchQ;
    });
  }, [q, cat]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof integrations>();
    filtered.forEach((i) => {
      const arr = map.get(i.cat) ?? [];
      arr.push(i);
      map.set(i.cat, arr);
    });
    return Array.from(map.entries());
  }, [filtered]);

  // Every category's full tool list, in a fixed order — used for the
  // browse-mode marquees, which always show everything (search/category
  // filtering switches to the static `grouped` list above instead).
  const allGrouped = useMemo(() => {
    const map = new Map<string, typeof integrations>();
    integrations.forEach((i) => {
      const arr = map.get(i.cat) ?? [];
      arr.push(i);
      map.set(i.cat, arr);
    });
    return categories
      .filter((c) => c !== "All")
      .map((c) => [c, map.get(c) ?? []] as const);
  }, []);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className={styles.hero}>
        <HeroWordmark
          tone="dark"
          className={styles.heroWordmark}
        />
        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>Integrations</div>
          <h1 className={styles.title}>
            Plug WhiteHawk into the stack you already run.
          </h1>
          <p className={styles.subtitle}>
            Discovery, cloud, identity, detection and threat-intel connectors — plus a typed API for
            anything not on the list.
          </p>
          <div className={styles.heroCta}>
            <Button as="link" to="/contact" variant="accent" size="lg">
              Book a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Search + filters */}
      <Section>
        <div className={styles.searchWrap}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search integrations…"
              className={styles.searchInput}
            />
          </div>
          <div className={styles.categories}>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`${styles.categoryButton} ${cat === c ? styles.categoryButtonActive : ""}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.results}>
          {isFiltering ? (
            <>
              {grouped.length === 0 && (
                <div className={styles.empty}>No integrations match your search.</div>
              )}
              {grouped.map(([catName, items]) => (
                <div key={catName}>
                  <div className={styles.groupHead}>
                    <div className={styles.groupEyebrow}>{catName}</div>
                    {categoryDescriptions[catName as Category] && (
                      <p className={styles.groupDescription}>{categoryDescriptions[catName as Category]}</p>
                    )}
                  </div>
                  <div className={styles.chipWrap}>
                    {items.map((i) => (
                      <ToolChip key={i.name} name={i.name} />
                    ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            allGrouped.map(([catName, items], idx) => (
              <div key={catName}>
                <div className={styles.groupHead}>
                  <div className={styles.groupEyebrow}>{catName}</div>
                  {categoryDescriptions[catName as Category] && (
                    <p className={styles.groupDescription}>{categoryDescriptions[catName as Category]}</p>
                  )}
                </div>
                {items.length >= MARQUEE_MIN_ITEMS ? (
                  <div className={styles.marqueeRow}>
                    <div
                      className={`${styles.marqueeTrack} animate-marquee`}
                      style={{
                        animationDuration: `${Math.max(18, items.length * 3.5)}s`,
                        animationDirection: idx % 2 === 1 ? "reverse" : "normal",
                      }}
                    >
                      {[...items, ...items].map((i, dupIdx) => (
                        <ToolChip key={`${i.name}-${dupIdx}`} name={i.name} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className={styles.chipWrap}>
                    {items.map((i) => (
                      <ToolChip key={i.name} name={i.name} />
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </Section>

      {/* Build your own */}
      <Section bg="wash">
        <div className={styles.buildGrid}>
          <div>
            <div className={styles.eyebrow}>Build your own</div>
            <h2 className={styles.buildHeading}>
              Don't see your tool? Build it in an afternoon.
            </h2>
            <p className={styles.buildBody}>
              A REST API, webhook receivers and a typed SDK. Everything WhiteHawk does internally is available externally.
            </p>
            <div className={styles.buildActions}>
              <Button variant="ghost">View API docs</Button>
              <Button variant="ghost">Read integration guide</Button>
            </div>
          </div>
          <div className={styles.codePanel}>
            <div className={styles.codeComment}>// Push a finding into WhiteHawk</div>
            <div>
              <span className={styles.codeMethod}>POST</span> https://api.whitehawk.io/v1/findings
            </div>
            <div className={styles.codeBlock}>
              {`{
  "asset": "aws:iam::role/deploy",
  "severity": "high",
  "source": "custom-scanner",
  "title": "Overly permissive policy"
}`}
            </div>
          </div>
        </div>
      </Section>

      <CTABand
        title="Bring your stack. Keep your workflows."
        primary={{ label: "Book a Demo", to: "/contact" }}
      />
    </SiteLayout>
  );
}
