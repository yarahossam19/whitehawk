"use client";
import { useCallback, useEffect, useState } from "react";
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

type FormState = {
  fullName: string;
  email: string;
  company: string;
  country: string;
  captchaAnswer: string;
};

const INITIAL_FORM: FormState = {
  fullName: "",
  email: "",
  company: "",
  country: "",
  captchaAnswer: "",
};

type CaptchaChallenge = {
  token: string;
  question: string;
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

  // Load a fresh captcha every time the modal opens.
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (!captcha) {
      setErrorMsg("Captcha not loaded — please refresh it and try again.");
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
      // Always rotate the captcha after a failure so the user gets a fresh
      // question and the same token can't be brute-forced.
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
                placeholder="Abdo Salem"
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
                placeholder="Example@Example.co"
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
                appendTo="self"
                value={form.country}
                onChange={(e) => setField("country", e.value)}
                filter
              />
            </div>

            {/* --- Math Captcha --- */}
            <div className={styles.field}>
              <label className={styles.label} htmlFor="captcha">
                Security check <span className={styles.required}>*</span>
              </label>
              <div className={styles.captchaWrap}>
                <div
                  className={styles.captchaQuestion}
                  aria-live="polite"
                >
                  {captchaLoading
                    ? "Loading..."
                    : captcha?.question ?? "Couldn't load — please refresh."}
                </div>
                <button
                  type="button"
                  onClick={() => void fetchCaptcha()}
                  className={styles.captchaRefresh}
                  aria-label="Refresh captcha"
                  disabled={captchaLoading || submitting}
                  title="Get a new question"
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
                inputMode="numeric"
                placeholder="Enter the answer as a number"
                className={styles.input}
                value={form.captchaAnswer}
                onChange={(e) =>
                  setField("captchaAnswer", e.target.value.replace(/[^\d-]/g, ""))
                }
                autoComplete="off"
                spellCheck={false}
                required
                maxLength={4}
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
