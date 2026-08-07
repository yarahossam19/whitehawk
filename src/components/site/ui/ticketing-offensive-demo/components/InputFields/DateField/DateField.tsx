"use client";

import React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import { Label } from "../../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";

import "./date-field.scss";

interface DateFieldProps {
  id?: string;
  title?: string;
  subtext?: string;
  error?: string | boolean;
  required?: boolean;
  className?: string;
  value?: Date | undefined;
  disabled?: boolean;
  /** Calendar days strictly before this (local date) cannot be selected */
  minDate?: Date;
  /** Calendar days strictly after this (local date) cannot be selected */
  maxDate?: Date;
  onChange?: (date: Date | undefined) => void;
}

export default function DateField({
  id = "date",
  title,
  subtext,
  error,
  required,
  className,
  value,
  disabled,
  minDate,
  maxDate,
  onChange,
}: DateFieldProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(value);
  const hasError = Boolean(error);

  const calendarDisabled = React.useMemo(() => {
    const hasMin = minDate && !isNaN(minDate.getTime());
    const hasMax = maxDate && !isNaN(maxDate.getTime());
    if (!hasMin && !hasMax) return undefined;
    const minTs = hasMin
      ? new Date(minDate!.getFullYear(), minDate!.getMonth(), minDate!.getDate()).getTime()
      : -Infinity;
    const maxTs = hasMax
      ? new Date(maxDate!.getFullYear(), maxDate!.getMonth(), maxDate!.getDate()).getTime()
      : Infinity;
    return (day: Date) => {
      const ts = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
      return ts < minTs || ts > maxTs;
    };
  }, [minDate, maxDate]);

  React.useEffect(() => {
    if (value !== undefined && value !== null) {
      const dateValue = value instanceof Date ? value : new Date(value);
      if (!isNaN(dateValue.getTime())) {
        setDate(dateValue);
      } else {
        setDate(undefined);
      }
    } else {
      setDate(undefined);
    }
  }, [value]);

  const handleSelect = (selected: Date | undefined) => {
    if (selected) {
      // Normalize the date to noon local time to prevent timezone issues
      const normalizedDate = new Date(selected);
      normalizedDate.setHours(12, 0, 0, 0);
      const selTs = new Date(
        normalizedDate.getFullYear(),
        normalizedDate.getMonth(),
        normalizedDate.getDate()
      ).getTime();
      if (minDate && !isNaN(minDate.getTime())) {
        const minTs = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()).getTime();
        if (selTs < minTs) return;
      }
      if (maxDate && !isNaN(maxDate.getTime())) {
        const maxTs = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()).getTime();
        if (selTs > maxTs) return;
      }
      setDate(normalizedDate);
      setOpen(false);
      onChange?.(normalizedDate);
    } else {
      setDate(undefined);
      setOpen(false);
      onChange?.(undefined);
    }
  };

  const formatDate = (date: Date | undefined): string => {
    if (!date) return "Select date";
    try {
      return date instanceof Date && !isNaN(date.getTime())
        ? date.toLocaleDateString()
        : "Select date";
    } catch {
      return "Select date";
    }
  };

  return (
    <div className={`date-field-wrapper ${hasError ? "has-error" : ""}`}>
      <div className="flex gap-1">
        {title && (
          <Label htmlFor={id} className={`date-field-label ${hasError ? "error" : ""}`}>
            {title}
          </Label>
        )}
        {required && <span className="date-field-required">*</span>}
      </div>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={id}
            onClick={() => setOpen(true)}
            disabled={disabled}
            className={`date-field-input flex justify-between items-center ${hasError ? "error" : ""} ${className || ""}`}
          >
            {date
              ? date instanceof Date
                ? date.toLocaleDateString()
                : new Date(date).toLocaleDateString()
              : "Select date"}
            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-60" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="date-field-calendar" align="start">
          <Calendar
            mode="single"
            className="w-full"
            selected={date}
            onSelect={handleSelect}
            captionLayout="dropdown"
            fromYear={1900}
            toYear={2100}
            disabled={calendarDisabled}
          />
        </PopoverContent>
      </Popover>

      <span className={`date-field-subtext ${hasError ? "error" : ""}`}>
        {hasError ? error : subtext}
      </span>
    </div>
  );
}
