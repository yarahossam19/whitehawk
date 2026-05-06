"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { getData as getCountryData } from "country-list";
import { useDemoModal } from "@/contexts/DemoModalContext";
import { useToast } from "@/contexts/ToastContext";
import styles from "./RequestDemoModal.module.scss";

type SelectOption = { label: string; value: string };

const COUNTRY_OPTIONS: SelectOption[] = [
  ...getCountryData()
    .filter(
      ({ code, name }: { code: string; name: string }) =>
        code !== "IL" && name !== "Israel"
    )
    .map(
      ({ code, name }: { code: string; name: string }): SelectOption => ({
        label: name,
        value: code,
      })
    )
    .sort((a: SelectOption, b: SelectOption) => a.label.localeCompare(b.label)),
  { label: "Other", value: "OTHER" },
];

// --- Service taxonomy ---
const MAIN_TABS: SelectOption[] = [
  { label: "Offensive", value: "offensive" },
  { label: "Defensive", value: "defensive" },
];

const SUB_TYPES_BY_MAIN: Record<string, SelectOption[]> = {
  offensive: [
    { label: "Vulnerability Assessment", value: "va" },
    { label: "Penetration Testing", value: "pt" },
    { label: "Security Configuration Review", value: "sc_review" },
  ],
  defensive: [
    { label: "Alerts", value: "alert" },
    { label: "Breach", value: "breach" },
    { label: "Threat Hunting", value: "threat-hunting" },
    { label: "Threat Intelligence", value: "threat-intelligence" },
  ],
};

const SUB_SUB_TYPES_BY_SUB: Record<string, SelectOption[]> = {
  va: [
    { label: "Network VA", value: "network_va" },
    { label: "Web VA", value: "web_va" },
    { label: "Mobile VA", value: "mobile_va" },
    { label: "API VA", value: "api_va" },
    { label: "Source Code VA", value: "source-code_va" },
  ],
  pt: [
    { label: "Network PT", value: "network_pt" },
    { label: "Web PT", value: "web_pt" },
    { label: "Mobile PT", value: "mobile_pt" },
    { label: "API PT", value: "api_pt" },
    { label: "Source Code PT", value: "source-code_pt" },
    { label: "AD PT", value: "ad_pt" },
    { label: "Wireless PT", value: "wireless_pt" },
    { label: "POS PT", value: "pos_pt" },
    { label: "Physical PT", value: "physical_pt" },
    { label: "OT/ICS/SCADA PT", value: "ot-ics-scada_pt" },
  ],
  breach: [
    { label: "Combos Data", value: "combos_data" },
    { label: "Public Data Breach", value: "public-data_breach" },
    { label: "Info Stealer", value: "info_stealer" },
    { label: "ULPs Data", value: "ulps_data" },
    { label: "Machine Info", value: "machine_info" },
  ],
};

function labelFor(options: SelectOption[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

type FormState = {
  fullName: string;
  email: string;
  company: string;
  country: string;
  mainType: string;
  subType: string;
  subSubType: string;
  otherServices: string;
  captchaAnswer: string;
};

const INITIAL_FORM: FormState = {
  fullName: "",
  email: "",
  company: "",
  country: "",
  mainType: "",
  subType: "",
  subSubType: "",
  otherServices: "",
  captchaAnswer: "",
};

type CaptchaChallenge = {
  token: string;
  image: string;
};

export function RequestDemoModal() {
  const { isOpen, closeDemoModal } = useDemoModal();
  const showToast = useToast();

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [captcha, setCaptcha] = useState<CaptchaChallenge | null>(null);
  const [captchaLoading, setCaptchaLoading] = useState(false);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const subTypeOptions = form.mainType
    ? SUB_TYPES_BY_MAIN[form.mainType] ?? []
    : [];
  const subSubTypeOptions = form.subType
    ? SUB_SUB_TYPES_BY_SUB[form.subType] ?? []
    : [];
  const subSubRequired = subSubTypeOptions.length > 0;

  const fetchCaptcha = useCallback(async () => {
    setCaptchaLoading(true);
    try {
      const { data } = await axios.get<CaptchaChallenge>("/api/captcha");
      setCaptcha(data);
      setForm((prev) => ({ ...prev, captchaAnswer: "" }));
    } catch {
      setCaptcha(null);
    } finally {
      setCaptchaLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      void fetchCaptcha();
    }
  }, [isOpen, fetchCaptcha]);

  const resetAndClose = () => {
    setForm(INITIAL_FORM);
    setErrorMsg(null);
    setSubmitting(false);
    setCaptcha(null);
    closeDemoModal();
  };

  const handleMainTypeChange = (value: string) => {
    // Clear downstream selections so stale values can't leak through.
    setForm((prev) => ({
      ...prev,
      mainType: value,
      subType: "",
      subSubType: "",
    }));
  };

  const handleSubTypeChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      subType: value,
      subSubType: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (!captcha) {
      setErrorMsg("Captcha not loaded — please refresh it and try again.");
      return;
    }
    if (!form.mainType || !form.subType) {
      setErrorMsg("Please choose a service type and sub-type.");
      return;
    }
    if (subSubRequired && !form.subSubType) {
      setErrorMsg("Please choose a specific service.");
      return;
    }

    setErrorMsg(null);
    setSubmitting(true);

    try {
      await axios.post("/api/request-demo", {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        country: form.country,
        service: {
          mainType: labelFor(MAIN_TABS, form.mainType),
          subType: labelFor(subTypeOptions, form.subType),
          subSubType: form.subSubType
            ? labelFor(subSubTypeOptions, form.subSubType)
            : "",
          other: form.otherServices.trim(),
        },
        captcha: {
          token: captcha.token,
          answer: form.captchaAnswer.trim(),
        },
      });
      showToast({
        severity: "success",
        summary: "Demo requested",
        detail: "Thanks! We've notified the team and will reach out soon.",
        life: 4000,
      });
      resetAndClose();
    } catch (err) {
      let message = "Something went wrong. Please try again.";
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as
          | { error?: string; message?: string }
          | undefined;
        message = data?.error ?? data?.message ?? err.message ?? message;
      }
      setErrorMsg(message);
      showToast({
        severity: "error",
        summary: "Submission failed",
        detail: message,
        life: 5000,
      });
      void fetchCaptcha();
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
                placeholder="Your full name"
                className={styles.input}
                value={form.fullName}
                onChange={(e) => setField("fullName", e.target.value)}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                Business Email Address <span className={styles.required}>*</span>
              </label>
              <InputText
                id="email"
                type="email"
                placeholder="Your business email"
                className={styles.input}
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                required
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
                value={form.company}
                onChange={(e) => setField("company", e.target.value)}
                required
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
                panelClassName={styles.dropdownPanel}
                appendTo="self"
                value={form.country}
                onChange={(e) => setField("country", e.value)}
             
              />
            </div>

            {/* --- Service Type cascade --- */}
            <div className={styles.field}>
              <label className={styles.label}>
                Service Type <span className={styles.required}>*</span>
              </label>
              <div className={styles.tabRow} role="tablist">
                {MAIN_TABS.map((tab) => {
                  const active = form.mainType === tab.value;
                  return (
                    <button
                      key={tab.value}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      className={`${styles.tabBtn} ${
                        active ? styles.tabBtnActive : ""
                      }`}
                      onClick={() => handleMainTypeChange(tab.value)}
                      disabled={submitting}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {form.mainType && (
              <div className={styles.field}>
                <label className={styles.label} htmlFor="subType">
                  {form.mainType === "offensive"
                    ? "Offensive service"
                    : "Defensive service"}{" "}
                  <span className={styles.required}>*</span>
                </label>
                <Dropdown
                  id="subType"
                  placeholder="Select a service"
                  options={subTypeOptions}
                  className={styles.dropdown}
                  panelClassName={styles.dropdownPanel}
                  appendTo="self"
                  value={form.subType}
                  onChange={(e) => handleSubTypeChange(e.value)}
                />
              </div>
            )}

            {subSubRequired && (
              <div className={styles.field}>
                <label className={styles.label} htmlFor="subSubType">
                  Specific service <span className={styles.required}>*</span>
                </label>
                <Dropdown
                  id="subSubType"
                  placeholder="Select a specific service"
                  options={subSubTypeOptions}
                  className={styles.dropdown}
                  panelClassName={styles.dropdownPanel}
                  appendTo="self"
                  value={form.subSubType}
                  onChange={(e) => setField("subSubType", e.value)}
                />
              </div>
            )}

            <div className={styles.field}>
              <label className={styles.label} htmlFor="otherServices">
                Other services <span className={styles.optional}>(optional)</span>
              </label>
              <InputText
                id="otherServices"
                placeholder="Anything else? Mention any specific service you're looking for"
                className={styles.input}
                value={form.otherServices}
                onChange={(e) => setField("otherServices", e.target.value)}
                maxLength={500}
              />
            </div>

            {/* --- Captcha --- */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="captcha">
                Security check <span className={styles.required}>*</span>
              </label>
              <div className={styles.captchaWrap}>
                <div className={styles.captchaImage} aria-live="polite">
                  {captchaLoading ? (
                    <div className={styles.captchaPlaceholder}>Loading...</div>
                  ) : captcha?.image ? (
                    <Image
                      src={captcha.image}
                      alt="Captcha"
                      className={styles.captchaImgEl}
                      width={240}
                      height={64}
                      unoptimized
                    />
                  ) : (
                    <div className={styles.captchaPlaceholder}>
                      Couldn&apos;t load — please refresh.
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => void fetchCaptcha()}
                  className={styles.captchaRefresh}
                  aria-label="Refresh captcha"
                  disabled={captchaLoading || submitting}
                  title="Get a new captcha"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M21 12a9 9 0 1 1-3.6-7.2M21 4v5h-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <InputText
                id="captcha"
                inputMode="text"
                placeholder="Type the text you see"
                className={styles.input}
                value={form.captchaAnswer}
                onChange={(e) =>
                  setField(
                    "captchaAnswer",
                    e.target.value
                      .toUpperCase()
                      .replace(/[^A-Z0-9]/g, "")
                  )
                }
                autoCapitalize="characters"
                autoComplete="off"
                spellCheck={false}
                required
                maxLength={10}
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
            disabled={submitting || captchaLoading || !captcha}
            loading={submitting}
          />
        </form>
      </div>
    </Dialog>
  );
}
