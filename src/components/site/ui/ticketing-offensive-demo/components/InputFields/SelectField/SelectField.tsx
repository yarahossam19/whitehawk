"use client";

import React, { HtmlHTMLAttributes, useEffect, useState } from "react";

import { Label } from "../../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import AppTooltip from "../../Tooltip/Tooltip";

import "./select-field.scss";

interface SelectFieldProps {
  id?: string;
  title?: string;
  subtext?: string;
  error?: string | boolean;
  optionsLabel?: string;
  required?: boolean;
  placeholder?: string;
  className?: HtmlHTMLAttributes<HTMLDivElement> | string;
  Options: { label: string; value: string; color?: string }[];
  value?: string;
  onChange?: (value: string) => void; // parent only listens
  disabled?: boolean;
  /** Shown on hover (e.g. when disabled with an explanation). */
  tooltip?: string;
}

export default function SelectField({
  id,
  title,
  subtext,
  error,
  Options,
  required,
  optionsLabel,
   className,
  placeholder,
  value,
  onChange,
  disabled = false,
  tooltip,
}: SelectFieldProps) {
  const hasError = Boolean(error);
  const [selected, setSelected] = useState<string>(value ?? "");

  // Keep internal state in sync with external value prop (never use null for controlled input)
  useEffect(() => {
    setSelected(value ?? "");
  }, [value]);

  const handleChange = (val: string) => {
    // Don't update or notify if trying to set an empty value when we already have a value
    if (!val && selected) {
      console.warn("SelectField: Blocked empty value change when existing value is:", selected);
      return;
    }

    setSelected(val); // internal control
    onChange?.(val); // notify parent
  };

  const isSeverityValue = (val: string) =>
    ["low", "medium", "high", "critical"].includes(val?.toLowerCase?.() || "");

  const getSeverityClass = (val: string) =>
    isSeverityValue(val) ? val?.toLowerCase?.() || "" : "";

  const selectedOption = Options.find((option) => option.value === selected);

  const renderStatusColorBadge = (label: string, color?: string) => (
    <div className="status-color-badge">
      {color ? (
        <span className="status-color-dot" style={{ backgroundColor: color }} />
      ) : null}
      <span className="status-color-label">{label}</span>
    </div>
  );

  const fieldContent = (
    <>
      <div className="flex gap-1">
        {title && (
          <Label htmlFor={id} className={`select-label ${hasError ? "error" : ""}`}>
            {title}
          </Label>
        )}
        {required && <span className="required-indicator">*</span>}
      </div>

      <Select onValueChange={handleChange} value={selected ?? ""} disabled={disabled}>
        <SelectTrigger id={id} className={`select-field  ${hasError ? "error" : ""} ${className || ""}`} disabled={disabled}>
          {selectedOption?.color ? (
            renderStatusColorBadge(selectedOption.label, selectedOption.color)
          ) : (
            <SelectValue placeholder={placeholder} />
          )}
        </SelectTrigger>

        <SelectContent position="popper" sideOffset={6} className="select-portal-content">
          <SelectGroup>
            {optionsLabel && <SelectLabel className="select-label">{optionsLabel}</SelectLabel>}
            {Options.map((option) => {
              const optionClass = getSeverityClass(option.value);
              const isSeverity = isSeverityValue(option.value);

              return (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className={`select-option ${optionClass}`}
                >
                  {isSeverity ? (
                    <div className={`severity-badge ${optionClass}`}>
                      <span className="severity-dot" />
                      <span className="severity-label">{option.label}</span>
                    </div>
                  ) : option.color ? (
                    renderStatusColorBadge(option.label, option.color)
                  ) : (
                    option.label
                  )}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );

  return (
    <div className={`select-wrapper ${hasError ? "has-error" : ""}`}>
      {tooltip ? (
        <AppTooltip content={tooltip} side="top">
          <span className="select-tooltip-trigger">{fieldContent}</span>
        </AppTooltip>
      ) : (
        fieldContent
      )}

      {subtext && <p className={`select-description ${hasError ? "error" : ""}`}>{subtext}</p>}
    </div>
  );
}
