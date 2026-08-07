import type { LucideIcon } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout/SiteLayout";
import { HeroSection } from "@/components/site/HeroSection/HeroSection";
import type { Hero3DVariant } from "@/components/site/Hero3D";
import { Badge } from "@/components/site/ui/Badge/Badge";
import { Button } from "@/components/site/ui/Button/Button";
import { Card } from "@/components/site/ui/Card/Card";
import { CTABand } from "@/components/site/ui/CTABand/CTABand";
import { FAQSection } from "@/components/site/ui/FAQSection/FAQSection";
import { IntegrationLogo } from "@/components/site/ui/IntegrationLogo/IntegrationLogo";
import { Section } from "@/components/site/ui/Section/Section";
import { SectionHeader } from "@/components/site/ui/SectionHeader/SectionHeader";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import styles from "./ModulePage.module.scss";

export interface ModulePageConfig {
  variant: Hero3DVariant;
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  primaryColor: string;
  capabilities: Array<{ icon: LucideIcon; title: string; description: string }>;
  howItWorks: { heading: string; body: string; steps: Array<string | { text: string; icon?: LucideIcon }> };
  /**
   * Label shown in the fake browser URL bar of the "Product view" section.
   * Omit it to drop that whole section from the page (GRC has no product
   * surface worth showing yet).
   */
  productViewLabel?: string;
  /**
   * Optional real embedded product surface rendered inside the "Product
   * view" browser-chrome frame instead of the generic hardcoded stats/bars
   * mockup. Used by the Offensive/Defensive pages to embed the ticketing
   * demo; left unset (Asset Management) keeps today's generic mockup.
   */
  productView?: React.ReactNode;
  /**
   * Optional highlighted dark band for a single flagship sub-product that
   * deserves more than a capability card (Defensive uses it for SOC AI).
   * Renders directly after the product view when present.
   */
  spotlight?: {
    eyebrow: string;
    title: React.ReactNode;
    body: string;
    steps: Array<{ icon: LucideIcon; title: string; description: string }>;
    notes?: string[];
  };
  useCases: Array<{ title: string; description: string }>;
  /** Omit (or pass an empty array) to drop the integrations strip entirely. */
  integrations?: string[];
  faqs: Array<{ q: string; a: string }>;
}

export function ModulePage({ config }: { config: ModulePageConfig }) {
  const c = config;
  return (
    <SiteLayout>
      <HeroSection
        variant={c.variant}
        eyebrow={c.eyebrow}
        title={c.title}
        description={c.description}
        theme="light"
        actions={
          <>
            <Button as="link" to="/contact" variant="accent" size="lg">
              Book a Demo
            </Button>
            <Button as="link" to="/pricing" variant="ghost" size="lg">
              See pricing
            </Button>
          </>
        }
      />

      <div className={styles.infoBar}>
        Part of the WhiteHawk platform · Available standalone or as part of the suite
      </div>

      {/* Capabilities — even grid, every pillar gets equal weight */}
      <Section>
        <div className={styles.capsHeader}>
          <SectionHeader eyebrow="Capabilities" title="What it does" align="left" className="mx-0" />
          <div className={styles.pillarsCounter}>
            /{String(c.capabilities.length).padStart(2, "0")} pillars
          </div>
        </div>
        <div className={styles.capsGrid}>
          {c.capabilities.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className={`reveal lift ${styles.capCard}`}
              style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
            >
              <div className={styles.capIcon}>
                <Icon size={22} />
              </div>
              <h3 className={styles.capTitle}>{title}</h3>
              <p className={styles.capDesc}>{description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section bg="wash">
        <SectionHeader
          eyebrow="How it works"
          title={c.howItWorks.heading}
          description={c.howItWorks.body}
        />

        <div className={styles.flowWrap}>
          <div aria-hidden className={styles.flowTrack} />
          <div
            aria-hidden
            className={`${styles.flowBeamY} animate-scan-y`}
            style={{ "--module-color": c.primaryColor } as React.CSSProperties}
          />
          <div
            aria-hidden
            className={`${styles.flowBeamX} animate-scan`}
            style={{ "--module-color": c.primaryColor } as React.CSSProperties}
          />

          <ol className={styles.flowSteps}>
            {c.howItWorks.steps.map((step, i) => {
              const text = typeof step === "string" ? step : step.text;
              const Icon = typeof step === "string" ? undefined : step.icon;
              return (
                <li
                  key={i}
                  className={`reveal ${styles.flowStep} ${i === 0 ? "" : `delay-${i * 100}`}`}
                  style={{ "--module-color": c.primaryColor } as React.CSSProperties}
                >
                  <div className={styles.flowNode}>
                    {Icon ? (
                      <Icon size={20} strokeWidth={2.25} />
                    ) : (
                      <span className={styles.flowNodeNum}>{i + 1}</span>
                    )}
                  </div>
                  <div className={styles.flowStepBody}>
                    <div className={styles.flowStepLabel}>Step {String(i + 1).padStart(2, "0")}</div>
                    <p className={styles.flowStepText}>{text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Section>

      {/* Product view — skipped entirely when the module has no surface to show */}
      {c.productViewLabel && (
      <Section>
        <SectionHeader eyebrow="Product view" title="Built the way security teams actually work" />
        <div className={`reveal ${styles.productWindow}`}>
          <div className={styles.chrome}>
            <span className={`${styles.dot} ${styles.dotRed}`} />
            <span className={`${styles.dot} ${styles.dotYellow}`} />
            <span className={`${styles.dot} ${styles.dotGreen}`} />
            <span className={styles.urlLabel}>app.whitehawk.io / {c.productViewLabel}</span>
          </div>
          {c.productView ? (
            <div className={styles.productViewSlot}>{c.productView}</div>
          ) : (
            <div className={styles.productBody}>
              <div className={styles.sidebarList}>
                {["Dashboard", "Findings", "Assets", "Playbooks", "Reports"].map((s, i) => (
                  <div key={s} className={`${styles.sidebarItem} ${i === 1 ? styles.sidebarItemActive : ""}`}>
                    {s}
                  </div>
                ))}
              </div>
              <div>
                <div className={styles.statsGrid}>
                  {[
                    { l: "Posture", v: "94%" },
                    { l: "Open", v: "12" },
                    { l: "MTTD", v: "8m" },
                    { l: "MTTR", v: "1.4h" },
                  ].map((k, i) => (
                    <div
                      key={k.l}
                      className={`reveal ${styles.statCard}`}
                      style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
                    >
                      <div className={styles.statLabel}>{k.l}</div>
                      <div className={styles.statValue}>{k.v}</div>
                    </div>
                  ))}
                </div>
                <div className={styles.eventPanel}>
                  <div className={styles.eventLabel}>Event volume · last 24h</div>
                  <div className={styles.barsRow}>
                    {Array.from({ length: 24 }).map((_, i) => {
                      const h = 20 + Math.abs(Math.sin(i * 1.7)) * 78;
                      return (
                        <div
                          key={i}
                          className={styles.bar}
                          style={
                            {
                              "--bar-height": `${h}%`,
                              "--bar-color": i > 18 ? "#2563EB" : "rgba(255,255,255,0.15)",
                            } as React.CSSProperties
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Section>
      )}

      {/* Spotlight — one flagship sub-product, on a dark band so it reads as
          its own thing rather than another capability card. */}
      {c.spotlight && (
        <section className={styles.spotlight}>
          <div aria-hidden className={styles.spotlightGlow} />
          <div className={styles.spotlightInner}>
            <div className={`reveal ${styles.spotlightHead}`}>
              <div className={styles.spotlightBadge}>
                <Sparkles size={13} /> {c.spotlight.eyebrow}
              </div>
              <h2 className={styles.spotlightTitle}>{c.spotlight.title}</h2>
              <p className={styles.spotlightBody}>{c.spotlight.body}</p>
            </div>

            <ol className={styles.spotlightSteps}>
              {c.spotlight.steps.map(({ icon: Icon, title, description }, i) => (
                <li
                  key={title}
                  className={`reveal ${styles.spotlightStep}`}
                  style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
                >
                  <div className={styles.spotlightStepTop}>
                    <span className={styles.spotlightStepIcon}>
                      <Icon size={16} />
                    </span>
                    <span className={styles.spotlightStepNum}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className={styles.spotlightStepTitle}>{title}</h3>
                  <p className={styles.spotlightStepText}>{description}</p>
                </li>
              ))}
            </ol>

            {c.spotlight.notes && c.spotlight.notes.length > 0 && (
              <ul className={`reveal ${styles.spotlightNotes}`}>
                {c.spotlight.notes.map((n) => (
                  <li key={n} className={styles.spotlightNote}>
                    <ShieldCheck size={14} className={styles.spotlightNoteIcon} />
                    {n}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* Use cases — bento */}
      <Section bg="wash">
        <SectionHeader eyebrow="Use cases" title="Solve what your team is stuck on" />
        <div className={styles.useCasesGrid}>
          {c.useCases.map((u, i) => (
            <div
              key={u.title}
              className={`reveal lift ${styles.useCaseCard}`}
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <div className={styles.useCaseNum}>{String(i + 1).padStart(2, "0")}</div>
              <div className={styles.useCaseTitle}>{u.title}</div>
              <div className={styles.useCaseDesc}>{u.description}</div>
              {/* <div className={styles.useCaseLink}>
                Read the playbook <ArrowRight size={14} />
              </div> */}
            </div>
          ))}
        </div>
      </Section>

      {/* Integrations strip — omitted entirely by modules that don't list any */}
      {c.integrations && c.integrations.length > 0 && (
        <Section>
          <SectionHeader
            eyebrow="Integrations"
            title="Slots into your existing stack"
            description="Two-way sync with the tools your team already uses."
          />
          <div className={`reveal ${styles.integrationsRow}`}>
            {c.integrations.map((n) => (
              <span key={n} className={styles.integrationPill}>
                <IntegrationLogo name={n} className={styles.integrationLogo} />
                {n}
              </span>
            ))}
          </div>
        </Section>
      )}

      {/* Standalone vs suite */}
      <Section bg="wash">
        <div className={styles.standaloneGrid}>
          <Card>
            <Badge tone="navy">Standalone</Badge>
            <h3 className={styles.cardHeading}>Use it on its own</h3>
            <p className={styles.cardBody}>
              Full featured, dedicated deployment, its own pricing tier. Great fit if you already have the rest of your stack sorted.
            </p>
            <Button as="link" to="/pricing" variant="ghost" className={styles.cardCta}>
              See pricing
            </Button>
          </Card>
          <Card className={styles.cardAccent}>
            <Badge tone="dark">Better together</Badge>
            <h3 className={styles.cardHeading}>Run it inside the full suite</h3>
            <p className={styles.cardBody}>
              Every module gets richer when it shares context with the others. One login, one policy engine, one data model.
            </p>
            <Button as="link" to="/platform" variant="accent" className={styles.cardCta}>
              Explore platform
            </Button>
          </Card>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <FAQSection
          heading="Common questions about this module"
          body="Still stuck? A security engineer will answer within one business day."
          items={c.faqs}
        />
      </Section>

      <CTABand
        title="See it running on your data"
        description="30-minute technical walkthrough with a security engineer."
        primary={{ label: "Book a Demo", to: "/contact" }}
        secondary={{ label: "Back to platform", to: "/platform" }}
      />
    </SiteLayout>
  );
}
