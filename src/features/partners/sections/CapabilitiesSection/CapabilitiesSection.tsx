"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { CAPABILITY_ACCORDIONS } from "../../config";
import styles from "./CapabilitiesSection.module.scss";

export function CapabilitiesSection() {
  /* Figma default open: Asset Visibility */
  const [openId, setOpenId] = useState<string>("assets");

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.title}>What You Can Deliver with White Hawk</h2>
          <p className={styles.subtitle}>
            Comprehensive capabilities across the security spectrum
          </p>
        </header>
        <div className={styles.list}>
          {CAPABILITY_ACCORDIONS.map((item) => {
            const open = openId === item.id;
            return (
              <div
                key={item.id}
                className={`${styles.item} ${open ? styles.itemOpen : ""}`}
              >
                <button
                  type="button"
                  className={styles.trigger}
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? "" : item.id)}
                >
                  <span className={styles.triggerLabel}>{item.title}</span>
                  <span className={styles.chevronWrap} aria-hidden>
                    <span className={styles.chevron} />
                  </span>
                </button>
                <div className={styles.panelShell} aria-hidden={!open}>
                  <div className={styles.panelMeasure}>
                    <div className={styles.panel}>
                      <p className={styles.panelBody}>{item.body}</p>
                      <ul className={styles.pills}>
                        {item.bullets.map((b) => (
                          <li key={b} className={styles.pill}>
                            <span className={styles.pillIcon} aria-hidden>
                              <Check
                                className={styles.pillCheck}
                                strokeWidth={2.5}
                                size={10}
                              />
                            </span>
                            <span className={styles.pillText}>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
