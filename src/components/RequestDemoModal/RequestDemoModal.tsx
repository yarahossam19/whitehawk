"use client";

import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useDemoModal } from "@/contexts/DemoModalContext";
import styles from "./RequestDemoModal.module.scss";

const COUNTRY_OPTIONS = [
  { label: "United States", value: "US" },
  { label: "United Kingdom", value: "UK" },
  { label: "Canada", value: "CA" },
  { label: "Australia", value: "AU" },
  { label: "Germany", value: "DE" },
  { label: "France", value: "FR" },
  { label: "Other", value: "OTHER" },
];

export function RequestDemoModal() {
  const { isOpen, closeDemoModal } = useDemoModal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to API or form handler
    closeDemoModal();
  };

  const closeIcon = (
    <button
      type="button"
      onClick={closeDemoModal}
      className={styles.closeBtn}
      aria-label="Close"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M18 6L6 18M6 6l12 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );

  return (
    <Dialog
      visible={isOpen}
      onHide={closeDemoModal}
      closable={false}
      modal
      contentClassName={styles.dialogContent}
      className={styles.dialog}
      showHeader={false}
      dismissableMask
    >
      <div className={styles.wrap}>
        {closeIcon}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.header}>
            <h2 className={styles.title}>Start your security business</h2>
            <p className={styles.subtitle}>Easiest and Simplest ways</p>
          </div>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="fullName">
                Full Name <span className={styles.required}>*</span>
              </label>
              <InputText
                id="fullName"
                placeholder="Abdo Salem"
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                Business Email Address <span className={styles.required}>*</span>
              </label>
              <InputText
                id="email"
                type="email"
                placeholder="Example@Example.co"
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="company">
                Company <span className={styles.required}>*</span>
              </label>
              <InputText
                id="company"
                placeholder="Your company name"
                className={styles.input}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="country">
                Country <span className={styles.required}>*</span>
              </label>
              <Dropdown
                id="country"
                placeholder="Select Country"
                options={COUNTRY_OPTIONS}
                className={styles.dropdown}
              />
            </div>
          </div>
          <Button
            type="submit"
            label="Submit"
            className={styles.submitBtn}
          />
        </form>
      </div>
    </Dialog>
  );
}
