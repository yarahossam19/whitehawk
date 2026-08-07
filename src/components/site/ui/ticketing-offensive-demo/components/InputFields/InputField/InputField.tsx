"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";

import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

import "./input-field.scss";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  title?: string;
  subtext?: string;
  error?: string | boolean;
  required?: boolean;
  index?: number;
  placeholder?: string;
  showAdd?: boolean;
  showRemove?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
  value?: string | number;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  id,
  title,
  subtext,
  error,
  required,
  index,
  placeholder,
  showAdd,
  showRemove,
  onAdd,
  onRemove,
  className,
  value,
  onChange,
  ...props
}: InputFieldProps) {
  const hasError = Boolean(error);
  const controlledValueProps = value !== undefined ? { value } : {};

  return (
    <div className={`input-wrapper ${hasError ? "has-error" : ""}`}>
      <div className="flex gap-1">
        {title && (
          <Label htmlFor={id} className={`input-label ${hasError ? "error" : ""}`}>
            {title} {index !== undefined && <span>{index + 1}</span>}
          </Label>
        )}
        {required && <span className="required-indicator">*</span>}
      </div>

      <div className="flex gap-2">
        <Input
          id={id}
          {...props}
          {...controlledValueProps}
          className={`input-text ${hasError ? "error" : ""} ${className || ""}`}
          onChange={onChange}
          placeholder={placeholder}
        />
        {showAdd && (
          <div className="flex items-center gap-2">
            {showRemove && (
              <button
                type="button"
                className="icon-btn delete"
                onClick={onRemove}
                title="Remove field"
              >
                <Trash2 size={16} />
              </button>
            )}
            {showAdd && (
              <button type="button" className="icon-btn add" onClick={onAdd} title="Add field">
                <Plus size={16} />
              </button>
            )}
          </div>
        )}
      </div>

      <span className={`input-description ${hasError ? "error" : ""}`}>
        {hasError ? error : subtext}
      </span>
    </div>
  );
}
