"use client";
import { useState } from "react";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { getData as getCountryData } from "country-list";
import { useFreeTrialModal } from "@/contexts/FreeTrialModalContext";
import { useToast } from "@/contexts/ToastContext";
import { submitPartnerApplication } from "@/lib/api";
import styles from "./FreeTrialModal.module.scss";

/** Figma: WhiteHawk Website — node 2010-3875 (dev). Adjust labels/options if the frame differs. */
type SelectOption = { label: string; value: string };

const COUNTRY_OPTIONS = [
  ...getCountryData()
    .filter(({ code, name }: { code: string; name: string }) =>
      code !== "IL" && name !== "Israel"
    )
    .map(({ code, name }: { code: string; name: string }): SelectOption => ({
      label: name,
      value: code,
    }))
    .sort((a: SelectOption, b: SelectOption) => a.label.localeCompare(b.label)),
  { label: "Other", value: "OTHER" },
];
const COMPANY_SIZE_OPTIONS = [
  { label: "1-25 employees", value: "1-25" },
  { label: "26-100 employees", value: "26-100" },
  { label: "101-1000 employees", value: "101-1000" },
  { label: "1000+ employees", value: "1000+" }
];
// Values match the strings the API expects (see sample payload).
const INDUSTRY_OPTIONS = [
  { label: "Technology", value: "Technology" },
  { label: "Financial Services", value: "Financial Services" },
  { label: "Healthcare", value: "Healthcare" },
  { label: "Retail", value: "Retail" },
  { label: "Manufacturing", value: "Manufacturing" },
  { label: "Education", value: "Education" },
  { label: "Government", value: "Government" },
  { label: "Other", value: "Other" }
];
const Partner_TYPE_OPTIONS = [
  { label: "Strategic Partnership", value: "Strategic Partnership" },
  { label: "Technology Partnership", value: "Technology Partnership" },
  { label: "Referral Partnership", value: "Referral Partnership" },
  { label: "Reseller", value: "Reseller" },
  { label: "Other", value: "Other" },
];

type FormState = {
  CompanyLegalName: string;
  TradeName: string;
  Website: string;
  Country: string;
  CompanySize: string;
  IndustryFocus: string;
  ContactFullName: string;
  ContactTitle: string;
  ContactEmail: string;
  ContactPhone: string;
  ServicesOffered: string;
  PartnershipType: string;
};

const INITIAL_FORM: FormState = {
  CompanyLegalName: "",
  TradeName: "",
  Website: "",
  Country: "",
  CompanySize: "",
  IndustryFocus: "",
  ContactFullName: "",
  ContactTitle: "",
  ContactEmail: "",
  ContactPhone: "",
  ServicesOffered: "",
  PartnershipType: "",
};

export function FreeTrialModal() {
  const { isOpen, closeFreeTrialModal } = useFreeTrialModal();
  const showToast = useToast();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetAndClose = () => {
    setForm(INITIAL_FORM);
    setErrorMsg(null);
    setSubmitting(false);
    closeFreeTrialModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setErrorMsg(null);
    setSubmitting(true);

    try {
      await submitPartnerApplication({
        CompanyLegalName: form.CompanyLegalName.trim(),
        TradeName: form.TradeName.trim(),
        Website: form.Website.trim(),
        CountryCodes: form.Country ? [form.Country] : [],
        CompanySize: form.CompanySize,
        IndustryFocus: form.IndustryFocus,
        ContactFullName: form.ContactFullName.trim(),
        ContactTitle: form.ContactTitle.trim(),
        ContactEmail: form.ContactEmail.trim(),
        ContactPhone: form.ContactPhone.trim(),
        ServicesOffered: form.ServicesOffered.trim(),
        PartnershipType: form.PartnershipType,
      });
      showToast({
        severity: "success",
        summary: "Application submitted",
        detail: "Thanks! We'll be in touch shortly.",
        life: 4000,
      });
      resetAndClose();
    } catch (err) {
      let message = "Something went wrong. Please try again.";
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as unknown;
        if (typeof data === "string") {
          message = data;
        } else if (data && typeof data === "object") {
          const detail = (data as { detail?: string; message?: string }).detail
            ?? (data as { detail?: string; message?: string }).message;
          if (detail) message = detail;
        } else if (err.message) {
          message = err.message;
        }
      }
      setErrorMsg(message);
      showToast({
        severity: "error",
        summary: "Submission failed",
        detail: message,
        life: 5000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const closeIcon = (
    <button
      type="button"
      onClick={resetAndClose}
      className={styles.closeBtn}
      aria-label="Close"
      disabled={submitting}
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
      onHide={resetAndClose}
      closable={false}
      modal
      appendTo="self"
      contentClassName={styles.dialogContent}
      className={styles.dialog}
      showHeader={false}
      dismissableMask
    >
      <div className={styles.wrap}>
        {closeIcon}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.header}>
            <h2 className={styles.title}>Join Our Security Alliance.</h2>
            <p className={styles.subtitle}>
              Fill out the form below to learn how we can grow together and protect our mutual clients.
            </p>
          </div>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="trial-fullName">
                Company Legal Name<span className={styles.required}>*</span>
              </label>
              <InputText
                id="trial-fullName"
                placeholder="Company Legal Name"
                className={styles.input}
                value={form.CompanyLegalName}
                onChange={(e) => setField("CompanyLegalName", e.target.value)}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="trial-country">
                Country <span className={styles.required}>*</span>
              </label>
              <Dropdown
                id="trial-country"
                placeholder="Select Country"
                options={COUNTRY_OPTIONS}
                className={styles.dropdown}
                panelClassName={styles.dropdownPanel}
                appendTo="self"
                value={form.Country}
                onChange={(e) => setField("Country", e.value)}
                filter
              />
            </div>
            <div className={styles.inputGrid}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="trade-name">
                  Trade Name <span className={styles.required}>*</span>
                </label>
                <InputText
                  id="trade-name"
                  placeholder="Company Trade Name"
                  className={styles.input}
                  value={form.TradeName}
                  onChange={(e) => setField("TradeName", e.target.value)}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="Website">
                  Website <span className={styles.required}>*</span>
                </label>
                <InputText
                  id="Website"
                  placeholder="https://www.example.com"
                  className={styles.input}
                  value={form.Website}
                  onChange={(e) => setField("Website", e.target.value)}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="company-size">
                  Company Size <span className={styles.required}>*</span>
                </label>
                <Dropdown
                  id="trial-company-size"
                  placeholder="Select Company Size"
                  options={COMPANY_SIZE_OPTIONS}
                  className={styles.dropdown}
                  panelClassName={styles.dropdownPanel}
                  appendTo="self"
                  value={form.CompanySize}
                  onChange={(e) => setField("CompanySize", e.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="industry-focus">
                  Industry Focus <span className={styles.required}>*</span>
                </label>
                <Dropdown
                  id="trial-industry-focus"
                  placeholder="Select Industry Focus"
                  options={INDUSTRY_OPTIONS}
                  className={styles.dropdown}
                  panelClassName={styles.dropdownPanel}
                  appendTo="self"
                  value={form.IndustryFocus}
                  onChange={(e) => setField("IndustryFocus", e.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-fullName">
                  Contact Full Name <span className={styles.required}>*</span>
                </label>
                <InputText
                  id="contact-fullName"
                  placeholder="Your full name"
                  className={styles.input}
                  value={form.ContactFullName}
                  onChange={(e) => setField("ContactFullName", e.target.value)}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-title">
                  Contact Title <span className={styles.required}>*</span>
                </label>
                <InputText
                  id="contact-title"
                  placeholder="e.g. Security Director"
                  className={styles.input}
                  value={form.ContactTitle}
                  onChange={(e) => setField("ContactTitle", e.target.value)}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="trial-email">
                  Business Email Address <span className={styles.required}>*</span>
                </label>
                <InputText
                  id="trial-email"
                  type="email"
                  placeholder="Example@Example.co"
                  className={styles.input}
                  value={form.ContactEmail}
                  onChange={(e) => setField("ContactEmail", e.target.value)}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contact-phone">
                  Contact Phone Number <span className={styles.required}>*</span>
                </label>
                <InputText
                  id="contact-phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className={styles.input}
                  value={form.ContactPhone}
                  onChange={(e) => setField("ContactPhone", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="services-offered">
                Services Offered <span className={styles.required}>*</span>
              </label>
              <InputTextarea
                id="services-offered"
                className={styles.input}
                placeholder="Briefly describe the services you offer"
                rows={4}
                autoResize
                value={form.ServicesOffered}
                onChange={(e) => setField("ServicesOffered", e.target.value)}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="partner-type">
                Partnership Type <span className={styles.required}>*</span>
              </label>
              <Dropdown
                id="partner-type"
                placeholder="Select Partner Type"
                options={Partner_TYPE_OPTIONS}
                className={styles.dropdown}
                value={form.PartnershipType}
                onChange={(e) => setField("PartnershipType", e.value)}
              />
            </div>
          </div>
          {errorMsg && (
            <p className={styles.errorMsg} role="alert">
              {errorMsg}
            </p>
          )}
          <Button
            type="submit"
            label={submitting ? "Submitting..." : "Submit"}
            className={styles.submitBtn}
            disabled={submitting}
            loading={submitting}
          />
        </form>
      </div>
    </Dialog>
  );
}
