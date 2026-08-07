"use client";

import React from "react";
import { MultiSelect } from "primereact/multiselect";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";

import { Label } from "../../ui/label";

import "./multi-select-field.scss";

interface MultiSelectFieldProps {
  id?: string;
  title?: string;
  subtext?: string;
  error?: string | boolean;
  optionsLabel?: string;
  required?: boolean;
  placeholder?: string;
  filter?: boolean;
  filterPlaceholder?: string;
  Options: { label: string; value: string }[];
  value?: string[];
  disabled?: boolean;
  className?: string;
  onChange?: (values: string[]) => void;
}

export default function MultiSelectField({
  id,
  title,
  subtext,
  error,
  optionsLabel,
  required,
  placeholder = "Select options",
  filter = false,
  filterPlaceholder = "Search...",
  Options,
  disabled,
  className,
  value = [],
  onChange,
}: MultiSelectFieldProps) {
  const hasError = Boolean(error);
  const normalizedOptions = Options.map((option) => ({
    ...option,
    value: String(option.value),
  }));
  const normalizedValue = (value || []).map((item) => String(item));
  const selectAllLabelText = "Select All";

  const panelHeaderTemplate = filter
    ? (event: {
        checkboxElement: React.ReactNode;
        filterElement: React.ReactNode;
        closeElement: React.ReactNode;
      }) => (
        <div className="multi-select-panel-header">
          <div className="multi-select-panel-header__search-row">
            {event.filterElement}
            {event.closeElement}
          </div>
          <div className="multi-select-panel-header__select-all">
            {event.checkboxElement}
            <span className="multi-select-panel-header__select-all-label">
              {selectAllLabelText}
            </span>
          </div>
        </div>
      )
    : undefined;

  return (
    <div className={`multi-select-wrapper ${hasError ? "has-error" : ""} ${className}`}>
      <div className="flex gap-1">
        {title && (
          <Label htmlFor={id} className={`multi-select-label ${hasError ? "error" : ""}`}>
            {title}
          </Label>
        )}
        {required && <span className="multi-required-indicator">*</span>}
      </div>

      <MultiSelect
        disabled={disabled}
        id={id}
        value={normalizedValue}
        options={normalizedOptions}
        onChange={(e) => {
          const raw = e.value;
          const arr = Array.isArray(raw) ? raw : [];
          const normalized = arr.map((entry) => String((entry as { value?: string | number })?.value ?? entry));
          onChange?.(normalized);
        }}
        optionLabel="label"
        optionValue="value"
        dataKey="value"
        placeholder={placeholder}
        filter={filter}
        filterBy="label"
        filterMatchMode="contains"
        filterPlaceholder={filterPlaceholder}
        emptyFilterMessage="No results found"
        resetFilterOnHide
        filterInputAutoFocus
        selectAllLabel={selectAllLabelText}
        panelHeaderTemplate={panelHeaderTemplate}
        display="chip"
        panelClassName="multi-select-field-panel"
        appendTo={typeof window !== "undefined" ? document.body : undefined}
        className={`multi-select-field ${hasError ? "error" : ""}`}
      />

      {subtext && (
        <p className={`multi-select-description ${hasError ? "error" : ""}`}>{subtext}</p>
      )}
    </div>
  );
}
