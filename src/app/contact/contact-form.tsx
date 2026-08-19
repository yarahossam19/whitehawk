"use client";

import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/site/ui/Button/Button";
import { Select } from "@/components/site/ui/Select/Select";
import {
  COUNTRY_OPTIONS,
  MAIN_TABS,
  subSubTypesFor,
  subTypesFor,
  labelFor,
} from "@/lib/demo-services";
import styles from "./contact-form.module.scss";

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

type CaptchaChallenge = { token: string; image: string };

const STEPS = ["About you", "What you need", "Verify & send"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function requestDemo(payload: {
  form: FormState;
  captchaToken: string;
}): Promise<void> {
  const { form, captchaToken } = payload;

  const res = await fetch("/api/request-demo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: form.fullName,
      email: form.email,
      company: form.company,
      country: form.country,
      service: {
        mainType: form.mainType,
        subType: form.subType,
        subSubType: form.subSubType,
        other: form.otherServices,
      },
      captcha: { token: captchaToken, answer: form.captchaAnswer },
    }),
  });

  const data = (await res.json().catch(() => null)) as
    | { ok: true }
    | { ok: false; error?: string }
    | null;

  if (!res.ok || !data?.ok) {
    throw new Error(
      (data && "error" in data && data.error) || "Failed to send your request. Please try again.",
    );
  }
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [step, setStep] = useState(0);
  const [captcha, setCaptcha] = useState<CaptchaChallenge | null>(null);
  const [captchaLoading, setCaptchaLoading] = useState(false);

  const subTypeOptions = subTypesFor(form.mainType);
  const subSubTypeOptions = subSubTypesFor(form.subType);
  const subSubRequired = subSubTypeOptions.length > 0;

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const fetchCaptcha = useCallback(async () => {
    setCaptchaLoading(true);
    try {
      const res = await fetch("/api/captcha", { cache: "no-store" });
      if (!res.ok) throw new Error("captcha request failed");
      const data = (await res.json()) as CaptchaChallenge;
      setCaptcha(data);
    } catch {
      setCaptcha(null);
    } finally {
      setCaptchaLoading(false);
      setForm((prev) => ({ ...prev, captchaAnswer: "" }));
    }
  }, []);

  useEffect(() => {
    void fetchCaptcha();
  }, [fetchCaptcha]);

  const mutation = useMutation({
    mutationFn: requestDemo,
    onSuccess: () => {
      toast.success("Request sent. A security engineer will get back within one business day.");
      setForm(INITIAL_FORM);
      setStep(0);
      void fetchCaptcha();
    },
    onError: (err: Error) => {
      toast.error(err.message);
      // Any failure may have consumed or expired the token — a retry with the
      // same challenge can never succeed, so always issue a fresh one.
      void fetchCaptcha();
    },
  });

  // Changing a level clears everything downstream so stale slugs can't leak
  // through into the submitted payload.
  const handleMainTypeChange = (value: string) =>
    setForm((prev) => ({ ...prev, mainType: value, subType: "", subSubType: "" }));

  const handleSubTypeChange = (value: string) =>
    setForm((prev) => ({ ...prev, subType: value, subSubType: "" }));

  // Mirrors the server's rules exactly, so the Next button never lets someone
  // reach the captcha with a payload the API will reject.
  const stepOneValid =
    form.fullName.trim().length > 0 &&
    EMAIL_RE.test(form.email.trim()) &&
    form.company.trim().length > 0 &&
    form.country.length > 0;

  const stepTwoValid =
    form.mainType.length > 0 &&
    form.subType.length > 0 &&
    (!subSubRequired || form.subSubType.length > 0);

  const canAdvance = step === 0 ? stepOneValid : stepTwoValid;
  const canSubmit =
    stepOneValid &&
    stepTwoValid &&
    Boolean(captcha) &&
    form.captchaAnswer.trim().length >= 4 &&
    !mutation.isPending;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (step < STEPS.length - 1) {
      if (canAdvance) setStep((s) => s + 1);
      return;
    }
    if (!captcha) {
      toast.error("Captcha not loaded — please refresh it and try again.");
      return;
    }
    if (!canSubmit) return;
    mutation.mutate({ form, captchaToken: captcha.token });
  };

  const reviewRows: Array<[string, string]> = [
    ["Full name", form.fullName],
    ["Business email", form.email],
    ["Company", form.company],
    ["Country", labelFor(COUNTRY_OPTIONS, form.country) ?? "—"],
    ["Service type", labelFor(MAIN_TABS, form.mainType) ?? "—"],
    ["Service", labelFor(subTypeOptions, form.subType) ?? "—"],
  ];
  if (subSubRequired) {
    reviewRows.push([
      "Specific service",
      labelFor(subSubTypeOptions, form.subSubType) ?? "—",
    ]);
  }
  if (form.otherServices.trim()) {
    reviewRows.push(["Other services", form.otherServices.trim()]);
  }

  return (
    <form onSubmit={onSubmit} className={styles.form} noValidate>
      <div className={styles.eyebrow}>Book a demo</div>

      <ol className={styles.stepper} aria-label="Progress">
        {STEPS.map((label, i) => (
          <li
            key={label}
            className={`${styles.stepItem} ${i === step ? styles.stepItemActive : ""} ${
              i < step ? styles.stepItemDone : ""
            }`}
            aria-current={i === step ? "step" : undefined}
          >
            <span className={styles.stepDot}>{i < step ? "✓" : i + 1}</span>
            <span className={styles.stepLabel}>{label}</span>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div className={styles.step}>
          <div className={styles.fieldsRow}>
            <div>
              <label className={styles.label} htmlFor="demo-fullName">
                Full name *
              </label>
              <input
                id="demo-fullName"
                maxLength={120}
                autoComplete="name"
                value={form.fullName}
                onChange={(e) => setField("fullName", e.target.value)}
                className={styles.input}
              />
            </div>
            <div>
              <label className={styles.label} htmlFor="demo-email">
                Business email *
              </label>
              <input
                id="demo-email"
                type="email"
                maxLength={320}
                autoComplete="email"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.fieldsRow}>
            <div>
              <label className={styles.label} htmlFor="demo-company">
                Company *
              </label>
              <input
                id="demo-company"
                maxLength={200}
                autoComplete="organization"
                value={form.company}
                onChange={(e) => setField("company", e.target.value)}
                className={styles.input}
              />
            </div>
            <div>
              <label className={styles.label} htmlFor="demo-country">
                Country *
              </label>
              <Select
                id="demo-country"
                value={form.country}
                onChange={(v) => setField("country", v)}
                options={COUNTRY_OPTIONS}
                placeholder="Search for a country…"
              />
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className={styles.step}>
          <div>
            <span className={styles.label}>Service type *</span>
            <div className={styles.segmented} role="group" aria-label="Service type">
              {MAIN_TABS.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => handleMainTypeChange(tab.value)}
                  aria-pressed={form.mainType === tab.value}
                  className={`${styles.segment} ${
                    form.mainType === tab.value ? styles.segmentActive : styles.segmentInactive
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {form.mainType && (
            <div className={styles.fieldMt}>
              <label className={styles.label} htmlFor="demo-subType">
                Service *
              </label>
              <Select
                id="demo-subType"
                value={form.subType}
                onChange={handleSubTypeChange}
                options={subTypeOptions}
                placeholder="Select a service…"
              />
            </div>
          )}

          {subSubRequired && (
            <div className={styles.fieldMt}>
              <label className={styles.label} htmlFor="demo-subSubType">
                Specific service *
              </label>
              <Select
                id="demo-subSubType"
                value={form.subSubType}
                onChange={(v) => setField("subSubType", v)}
                options={subSubTypeOptions}
                placeholder="Select a specific service…"
              />
            </div>
          )}

          <div className={styles.fieldMt}>
            <label className={styles.label} htmlFor="demo-otherServices">
              Anything else we should know?
            </label>
            <textarea
              id="demo-otherServices"
              rows={4}
              maxLength={500}
              value={form.otherServices}
              onChange={(e) => setField("otherServices", e.target.value)}
              className={styles.textarea}
            />
            <div className={styles.charCount}>{form.otherServices.length} / 500</div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className={styles.step}>
          <dl className={styles.review}>
            {reviewRows.map(([label, value]) => (
              <div key={label} className={styles.reviewRow}>
                <dt className={styles.reviewLabel}>{label}</dt>
                <dd className={styles.reviewValue}>{value}</dd>
              </div>
            ))}
          </dl>

          <div className={styles.fieldMt}>
            <label className={styles.label} htmlFor="demo-captcha">
              Type the text in the image *
            </label>
            <div className={styles.captchaRow}>
              {captcha ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={captcha.image}
                  alt="Captcha challenge"
                  width={240}
                  height={64}
                  className={styles.captchaImg}
                />
              ) : (
                <div className={styles.captchaPlaceholder}>
                  {captchaLoading ? "Loading…" : "Captcha unavailable"}
                </div>
              )}
              <button
                type="button"
                onClick={() => void fetchCaptcha()}
                disabled={captchaLoading}
                className={styles.captchaRefresh}
              >
                Refresh
              </button>
            </div>
            <input
              id="demo-captcha"
              value={form.captchaAnswer}
              onChange={(e) => setField("captchaAnswer", e.target.value.toUpperCase())}
              maxLength={10}
              inputMode="text"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              className={`${styles.input} ${styles.captchaInput}`}
            />
          </div>
        </div>
      )}

      <div className={styles.footer}>
        <p className={styles.disclaimer}>
          By submitting, you agree to WhiteHawk&apos;s Privacy Policy. We never share your details.
        </p>

        <div className={styles.stepNav}>
          {step > 0 && (
            <Button
              variant="ghost"
              size="lg"
              type="button"
              onClick={() => setStep((s) => s - 1)}
              disabled={mutation.isPending}
            >
              Back
            </Button>
          )}

          {step < STEPS.length - 1 ? (
            <Button variant="accent" size="lg" type="submit" disabled={!canAdvance}>
              Next
            </Button>
          ) : (
            <Button variant="accent" size="lg" type="submit" disabled={!canSubmit}>
              {mutation.isPending ? "Sending…" : "Send request"}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
