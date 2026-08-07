"use client";

import React from "react";
import { Dialog } from "primereact/dialog";

import PrimaryButton from "../../PrimaryButton/PrimaryButton";
import {
  formatRowRanges,
  type GroupedImportError,
} from "../../../utils/importErrorUtils";
import "./import-popup.scss";

interface ImportErrorsPopupProps {
  visible: boolean;
  summary?: string;
  groupedErrors: GroupedImportError[];
  onClose: () => void;
}

export default function ImportErrorsPopup({
  visible,
  summary,
  groupedErrors,
  onClose,
}: ImportErrorsPopupProps) {
  return (
    <Dialog
      header="Import Validation Errors"
      visible={visible}
      onHide={onClose}
      className="import-popup import-errors-popup"
      appendTo="self"
    >
      {summary && <p className="import-errors-popup__summary">{summary}</p>}

      <div className="import-errors-popup__list">
        {groupedErrors.map((error) => (
          <div
            key={`${error.field}-${error.message}`}
            className="import-errors-popup__item"
          >
            <div className="import-errors-popup__field">{error.fieldLabel}</div>
            <div className="import-errors-popup__message">{error.message}</div>
            <div className="import-errors-popup__rows">
              Rows: {formatRowRanges(error.rows)}
            </div>
          </div>
        ))}
      </div>

      <div className="buttons-container import-errors-popup__actions">
        <PrimaryButton buttonStyle="submit" onClick={onClose} className="w-full">
          Close
        </PrimaryButton>
      </div>
    </Dialog>
  );
}
