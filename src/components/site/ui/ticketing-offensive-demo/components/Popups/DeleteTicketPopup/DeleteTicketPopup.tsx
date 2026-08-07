"use client";

import React, { useState } from "react";
import { Dialog } from "primereact/dialog";

import "./delete-popup.scss";

import Image from "next/image";

import binIcon from "../../../assets/icons/red-delete.svg";
import PrimaryButton from "../../PrimaryButton/PrimaryButton";

interface PopupProps {
  visible: boolean;
  onClose?: () => void;
  onSubmit: (row: any) => void | Promise<unknown>;
  className?: string;
  deleteType?: string;
  /** Optional external loading flag; if omitted, the popup manages its own submitting state. */
  loading?: boolean;
}
export default function DeletePopup(props: PopupProps) {
  const [visible, setVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isBusy = props.loading ?? isSubmitting;

  const handleConfirm = async (row: any) => {
    if (isBusy) return;

    const result = props.onSubmit(row);

    // If onSubmit returns a promise and no external loading is provided, manage local state
    if (props.loading === undefined && result && typeof (result as Promise<unknown>).then === "function") {
      try {
        setIsSubmitting(true);
        await result;
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={`card flex justify-content-center ${props.className || ""}`}>
      <Dialog
        visible={props.visible}
        onHide={() => {
          if (!props.visible) return;
          props.onClose?.();
        }}
        className="delete-popup"
        appendTo="self"
      >
        <div className="delete-content">
          <Image src={binIcon} alt="Delete Icon" width={40} height={40} />
          <div className="flex flex-col ">
            <h3>Delete {props.deleteType}</h3>
            <p>Are you sure you want to delete {props.deleteType}?</p>
          </div>
        </div>
        <div className="buttons-container">
          <PrimaryButton
            buttonStyle="cancel"
            onClick={() => props.onClose?.() || setVisible(false)}
            className="w-full"
          >
            Cancel
          </PrimaryButton>
          <PrimaryButton
            buttonStyle="delete"
            onClick={() => void handleConfirm(undefined)}
            className="w-full"
            disabled={isBusy}
          >
            {isBusy ? "Deleting..." : "Confirm"}
          </PrimaryButton>
        </div>
      </Dialog>
    </div>
  );
}
