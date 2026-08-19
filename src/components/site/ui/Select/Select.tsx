"use client";

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useMemo, useState } from "react";
import styles from "./Select.module.scss";

export type SelectOption = { label: string; value: string };

export type SelectProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  /**
   * Show a type-to-filter input instead of a plain list. Defaults to on once
   * the list is long enough that scanning it becomes the bottleneck.
   */
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
};

const SEARCHABLE_THRESHOLD = 12;

function Chevron() {
  return (
    <svg className={styles.chevron} viewBox="0 0 12 8" aria-hidden="true" focusable="false">
      <path
        d="M1 1.5 6 6.5l5-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Check() {
  return (
    <svg className={styles.check} viewBox="0 0 14 14" aria-hidden="true" focusable="false">
      <path
        d="M2.5 7.5 5.5 10.5 11.5 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Portaled via `anchor`, so the panel flips instead of overflowing the viewport
// and can't be clipped by an ancestor's overflow.
const ANCHOR = { to: "bottom start", gap: 6 } as const;

export function Select({
  id,
  value,
  onChange,
  options,
  placeholder = "Select…",
  searchable,
  disabled,
  className,
  "aria-label": ariaLabel,
}: SelectProps) {
  const [query, setQuery] = useState("");

  const useSearch = searchable ?? options.length > SEARCHABLE_THRESHOLD;
  const selected = options.find((o) => o.value === value) ?? null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    // Prefix matches first — typing "un" should surface "United Kingdom"
    // ahead of "Réunion".
    const starts: SelectOption[] = [];
    const contains: SelectOption[] = [];
    for (const o of options) {
      const label = o.label.toLowerCase();
      if (label.startsWith(q)) starts.push(o);
      else if (label.includes(q)) contains.push(o);
    }
    return [...starts, ...contains];
  }, [options, query]);

  const triggerClass = `${styles.trigger} ${className ?? ""}`;

  if (useSearch) {
    return (
      <Combobox
        value={value}
        onChange={(v: string | null) => onChange(v ?? "")}
        onClose={() => setQuery("")}
        disabled={disabled}
        immediate
      >
        <div className={styles.wrap}>
          <ComboboxInput
            id={id}
            aria-label={ariaLabel}
            className={triggerClass}
            placeholder={placeholder}
            autoComplete="off"
            displayValue={(v: string) => options.find((o) => o.value === v)?.label ?? ""}
            onChange={(e) => setQuery(e.target.value)}
          />
          <ComboboxButton className={styles.chevronBtn} aria-label="Toggle options">
            <Chevron />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor={ANCHOR}
          className={`${styles.panel} ${styles.panelCombobox}`}
          modal={false}
        >
          {filtered.length === 0 ? (
            <div className={styles.empty}>No matches</div>
          ) : (
            filtered.map((o) => (
              <ComboboxOption key={o.value} value={o.value} className={styles.option}>
                <span className={styles.optionLabel}>{o.label}</span>
                <Check />
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </Combobox>
    );
  }

  return (
    <Listbox value={value} onChange={onChange} disabled={disabled}>
      <div className={styles.wrap}>
        <ListboxButton id={id} aria-label={ariaLabel} className={triggerClass}>
          <span className={selected ? styles.value : styles.placeholder}>
            {selected?.label ?? placeholder}
          </span>
          <Chevron />
        </ListboxButton>
      </div>

      <ListboxOptions
        anchor={ANCHOR}
        className={`${styles.panel} ${styles.panelListbox}`}
        modal={false}
      >
        {options.map((o) => (
          <ListboxOption key={o.value} value={o.value} className={styles.option}>
            <span className={styles.optionLabel}>{o.label}</span>
            <Check />
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}
