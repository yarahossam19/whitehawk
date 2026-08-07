"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import exportIcon from "../../assets/icons/export.svg";
import importIcon from "../../assets/icons/import.svg";

import "./primary-button.scss";

import arrowDown from "../../assets/icons/button-arrow.svg";

interface MenuItemProps {
  label: string;
  onClick: () => void;
  icon?: string | React.ReactNode;
}

interface PrimaryButtonProps {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;

  buttonStyle?:
    | "submit"
    | "delete"
    | "disabled"
    | "reset"
    | "cancel"
    | "primary"
    | "export"
    | "actions"
    | "import"
    | "warning";
  onClick?: (row?: unknown) => void | (() => void);
  className?: string;
  classes?: string;
  menuItems?: MenuItemProps[];
  disabled?: boolean;
  href?: string;
  target?: "_blank" | "_self";
  dropdownmenuclassName?: string;
  [otherProps: string]: unknown;
}

export default function PrimaryButton(props: PrimaryButtonProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen);

  const handleMenuItemClick = (menuItem: MenuItemProps) => {
    menuItem.onClick();
    setIsDropdownOpen(false);
  };

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (props.href) {
      return (
        <Link href={props.href} target={props.target || "_self"}>
          {children}
        </Link>
      );
    }
    return <>{children}</>;
  };

  const sharedProps = {
    style: props.style,
    className: `btn unstyled ${props.className || ""}`,
    type: props.type || "button",
    disabled: props.disabled,
    onClick: props.onClick,
  };

  if (props.buttonStyle === "disabled") {
    return (
      <Wrapper>
        <button {...sharedProps} className={`${sharedProps.className} btn-disabled`} disabled>
          {props.children}
        </button>
      </Wrapper>
    );
  }

  if (props.buttonStyle === "primary") {
    return (
      <div
        className={`primary-button-container   ${props.classes ? props.classes : ""} ${isDropdownOpen ? "is-open" : ""}`}
        ref={dropdownRef}
      >
        <Wrapper>
          <button
            {...sharedProps}
            className={`${sharedProps.className} ${props.classes ? props.classes : ""} btn-primary-left`}
          >
            {props.children || "Add New Ticket"}
          </button>
        </Wrapper>

        <button
          className={`btn btn-primary-right unstyled ${props.className}`}
          onClick={handleDropdownToggle}
          type="button"
        >
          <Image src={arrowDown} alt="arrow" width={20} height={20} />
        </button>

        {isDropdownOpen && props.menuItems?.length ? (
          <div className={`primary-button-dropdown ${props.dropdownmenuclassName || ""}`}>
            {props.menuItems.map((item, index) => (
              <button
                key={index}
                className="primary-button-dropdown-item"
                onClick={() => handleMenuItemClick(item)}
                type="button"
              >
                {item.icon &&
                  (typeof item.icon === "string" ? (
                    <Image src={item.icon} alt="" width={16} height={16} />
                  ) : (
                    item.icon
                  ))}
                <span className={`${item.label}`}>{item.label}</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  if (props.buttonStyle === "cancel") {
    return (
      <Wrapper>
        <div className="cancel-button-container" ref={dropdownRef}>
          <button
            {...sharedProps}
            className={`${sharedProps.className} btn-cancel ${props.disabled ? "btn-disabled" : ""}`}
          >
            {props.children}
          </button>
        </div>
      </Wrapper>
    );
  }

  if (props.buttonStyle === "actions") {
    return (
      <Wrapper>
        <div
          className={`actions-button-container ${isDropdownOpen ? "is-open" : ""}`}
          ref={dropdownRef}
        >
          <button
            {...sharedProps}
            className={`${sharedProps.className} btn-actions`}
            onClick={props.menuItems?.length ? handleDropdownToggle : props.onClick}
            type="button"
          >
            {props.children}
          </button>

          {isDropdownOpen && props.menuItems?.length ? (
            <div className={`primary-button-dropdown ${props.dropdownmenuclassName || ""}`}>
              {props.menuItems.map((item, index) => (
                <button
                  key={index}
                  className="primary-button-dropdown-item"
                  onClick={() => handleMenuItemClick(item)}
                  type="button"
                >
                  {item.icon &&
                    (typeof item.icon === "string" ? (
                      <Image src={item.icon} alt="" width={16} height={16} />
                    ) : (
                      item.icon
                    ))}
                  <span className={`${item.label}`}>{item.label}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </Wrapper>
    );
  }
  if (props.buttonStyle === "submit") {
    return (
      <Wrapper>
        <div className="submit-button-container" ref={dropdownRef}>
          <button
            {...sharedProps}
            className={`${sharedProps.className} btn-submit ${props.disabled ? "btn-disabled" : ""}`}
          >
            {props.children}
          </button>
        </div>
      </Wrapper>
    );
  }

  if (props.buttonStyle === "export") {
    return (
      <Wrapper>
        <div className="export-button-container" ref={dropdownRef}>
          <button {...sharedProps} className={`${sharedProps.className} btn-export`}>
            <Image src={exportIcon} alt="Export" width={16} height={16} />
            {props.children}
          </button>
        </div>
      </Wrapper>
    );
  }

  if (props.buttonStyle === "import") {
    return (
      <Wrapper>
        <div className="import-button-container" ref={dropdownRef}>
          <button {...sharedProps} className={`${sharedProps.className} btn-import`}>
            <Image src={importIcon} alt="Import" width={16} height={16} />
            {props.children}
          </button>
        </div>
      </Wrapper>
    );
  }

  if (props.buttonStyle === "delete") {
    return (
      <Wrapper>
        <div className="delete-button-container" ref={dropdownRef}>
          <button {...sharedProps} className={`${sharedProps.className} btn-delete`}>
            {props.children}
          </button>
        </div>
      </Wrapper>
    );
  }

  if (props.buttonStyle === "warning") {
    return (
      <Wrapper>
        <div className="warning-button-container" ref={dropdownRef}>
          <button {...sharedProps} className={`${sharedProps.className} btn-warning`}>
            {props.children}
          </button>
        </div>
      </Wrapper>
    );
  }

  return null;
}
