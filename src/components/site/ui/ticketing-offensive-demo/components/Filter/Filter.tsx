"use client";

import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { X } from "lucide-react";
import Image from "next/image";

import "./filter.scss";

import filterIcon from "../../assets/icons/table/filter.svg";
import DateField from "../InputFields/DateField/DateField";
import InputField from "../InputFields/InputField/InputField";
import MultiSelectField from "../InputFields/MultiSelectField/MultiSelectField";
import SelectField from "../InputFields/SelectField/SelectField";
interface FilterOption {
  key: string;
  label: string;
  type: "select" | "date" | "range" | "text" | "multi-select" | string;
  options?: { label: string; value: string }[];
  placeholder?: string;
}

interface FilterPanelProps {
  filterOptions?: FilterOption[];
  onFilter?: (filters: Record<string, any>) => void;
  className?: string;
  menuClassName?: string;
  alignRight?: boolean;
  filters?: Record<string, any>;
}

export default function FilterPanel({
  filterOptions = [],
  onFilter = () => {},
  className,
  menuClassName,
  alignRight = false,
  filters: externalFilters,
}: FilterPanelProps) {
  const [internalFilters, setInternalFilters] = useState<Record<string, any>>({});
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [autoAlignRight, setAutoAlignRight] = useState(false);
  const filters = externalFilters ?? internalFilters;
  const setFilters = externalFilters ? () => {} : setInternalFilters; // if external, don't set

  const effectiveAlignRight = useMemo(() => alignRight || autoAlignRight, [alignRight, autoAlignRight]);

  const handleFilterChange = (key: string, value: any) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilter(updated);
  };

  const clearFilters = () => {
    setFilters({});
    onFilter({});
  };

  const clearSingleFilter = (key: string) => {
    const updated = { ...filters };
    delete updated[key];
    setFilters(updated);
    onFilter(updated);
  };

  const hasActiveFilters = Object.values(filters).some(
    (v) => {
      if (v === "" || v === null || v === undefined) return false;
      if (Array.isArray(v)) return v.length > 0;
      return true;
    }
  );

  return (
    <Popover as="div" className="filter-panel relative inline-block text-left ">
      {({ open, close }) => (
        <>
          {useEffect(() => {
            if (!open) return;
            const update = () => {
              const btn = buttonRef.current;
              const panel = panelRef.current;
              if (!btn) return;
              const rect = btn.getBoundingClientRect();
              const width = panel?.offsetWidth ?? 400;
              const padding = 12;
              const wouldOverflowRight = rect.left + width > window.innerWidth - padding;
              const wouldOverflowLeft = rect.right - width < padding;
              // Prefer flipping to keep panel fully visible.
              if (wouldOverflowRight && !wouldOverflowLeft) setAutoAlignRight(false); // anchor right:0
              else if (!wouldOverflowRight && wouldOverflowLeft) setAutoAlignRight(true); // anchor left:0
              else setAutoAlignRight(wouldOverflowRight); // fallback
            };

            const raf = window.requestAnimationFrame(update);
            window.addEventListener("resize", update);
            window.addEventListener("scroll", update, true);
            return () => {
              window.cancelAnimationFrame(raf);
              window.removeEventListener("resize", update);
              window.removeEventListener("scroll", update, true);
            };
          }, [open])}
          <Popover.Button
            ref={buttonRef}
            className={`filter-panel__button ${hasActiveFilters ? "active" : ""} ${className || ""}`}
            type="button"
          >
            <Image src={filterIcon} alt="Filter" width={18} height={18} />
            <span>Filter</span>
            {hasActiveFilters && (
              <span className="filter-panel__count">
                {
                  Object.values(filters).filter((v) => {
                    if (v === "" || v === null || v === undefined) return false;
                    if (Array.isArray(v)) return v.length > 0;
                    return true;
                  }).length
                }
              </span>
            )}
          </Popover.Button>

          <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Popover.Panel
              as="div"
              ref={panelRef}
              className={`filter-panel__dropdown ${effectiveAlignRight ? "align-right" : ""} ${menuClassName || ""}`}
              static
            >
              <div className="filter-panel__header">
                <div className="filter-panel__title">
                  <h4>Advanced Filters</h4>
                  <Image src={filterIcon} alt="Filter" width={18} height={18} />
                </div>

                <div className="flex">
                  {hasActiveFilters && (
                    <button onClick={clearFilters} className="clear-btn" type="button">
                      Clear All
                    </button>
                  )}
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      className="cursor-pointer"
                      aria-label="Close filters"
                      onClick={close}
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="filter-panel__grid">
                {filterOptions.length === 0 && (
                  <div className="text-sm text-muted-foreground col-span-full p-2">
                    No filters available
                  </div>
                )}
                {filterOptions.map((option) => (
                  <div key={option.key} className="filter-panel__item">
                    <div className="filter-panel__label-row">
                      <label className="filter-panel__label">{option.label}</label>
                      {(() => {
                        const value = filters[option.key];
                        const hasValue =
                          value !== "" &&
                          value !== null &&
                          value !== undefined &&
                          (option.type === "range"
                            ? value?.from || value?.to
                            : Array.isArray(value)
                              ? value.length > 0
                              : true);
                        return (
                          hasValue && (
                            <button
                              onClick={() => clearSingleFilter(option.key)}
                              className="clear-btn"
                              type="button"
                            >
                              Clear
                            </button>
                          )
                        );
                      })()}
                    </div>

                    {option.type === "range" && (
                      <div className="filter-panel__range">
                        <DateField
                          title="from"
                          value={filters[option.key]?.from || undefined}
                          onChange={(value) =>
                            handleFilterChange(option.key, {
                              ...filters[option.key],
                              from: value,
                            })
                          }
                        />

                        <DateField
                          title="to"
                          value={filters[option.key]?.to || undefined}
                          onChange={(value) =>
                            handleFilterChange(option.key, {
                              ...filters[option.key],
                              to: value,
                            })
                          }

                        />
                      </div>
                    )}

                    {option.type === "select" && (
                      <SelectField
                        placeholder={option.placeholder || ""}
                        Options={option.options || []}
                        onChange={(value) => handleFilterChange(option.key, value)}
                        className="filter-panel__select"
                        value={filters[option.key] || ""}
                      />
                    )}
                    {option.type === "text" && (
                      <InputField
                        placeholder={option.placeholder || ""}
                        value={filters[option.key] || ""}
                        onChange={(e) => handleFilterChange(option.key, e.target.value)}
                        className="filter-panel__input"
                      />
                    )}

                    {option.type === "date" && (
                      <DateField
                        value={filters[option.key] || undefined}
                        onChange={(value) => handleFilterChange(option.key, value)}
                        className="filter-panel__date"
                      />
                    )}
                    {option.type === "multi-select" && (
                      <MultiSelectField
                        placeholder={option.placeholder || ""}
                        Options={option.options || []}
                        value={filters[option.key] || []}
                        onChange={(value) => handleFilterChange(option.key, value)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
