"use client";

import { useMutation } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { submitContactMessage } from "@/lib/contact.actions";
import { Button } from "@/components/site/ui/Button/Button";
import { toast } from "sonner";
import styles from "./contact-form.module.scss";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const mutation = useMutation({
    mutationFn: submitContactMessage,
    onSuccess: () => {
      toast.success("Message sent. A security engineer will get back within one business day.");
      setForm({ name: "", email: "", company: "", message: "" });
    },
    onError: (err: any) => toast.error(err?.message ?? "Failed to send message"),
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({ ...form, source: "demo" });
  };

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((s) => ({ ...s, [k]: e.target.value }));

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <div className={styles.eyebrow}>Book a demo</div>

      <div className={styles.fieldsRow}>
        <div>
          <label className={styles.label}>
            Full name *
          </label>
          <input
            required
            maxLength={120}
            value={form.name}
            onChange={set("name")}
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label}>
            Work email *
          </label>
          <input
            type="email"
            required
            maxLength={320}
            value={form.email}
            onChange={set("email")}
            className={styles.input}
          />
        </div>
      </div>
      <div className={styles.fieldMt}>
        <label className={styles.label}>
          Company
        </label>
        <input
          maxLength={200}
          value={form.company}
          onChange={set("company")}
          className={styles.input}
        />
      </div>
      <div className={styles.fieldMt}>
        <label className={styles.label}>
          What are you hoping to solve? *
        </label>
        <textarea
          required
          rows={5}
          maxLength={5000}
          value={form.message}
          onChange={set("message")}
          className={styles.textarea}
        />
        <div className={styles.charCount}>{form.message.length} / 5000</div>
      </div>
      <div className={styles.footer}>
        <p className={styles.disclaimer}>
          By submitting, you agree to WhiteHawk's Privacy Policy. We never share your details.
        </p>
        <Button variant="accent" size="lg" type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
