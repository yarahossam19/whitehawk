"use client";

import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { toast } from "sonner";

import "./import-popup.scss";

import PrimaryButton from "../../PrimaryButton/PrimaryButton";
import FileUploader from "../../InputFields/FileUploader/FileUploader";
import useMockTicketApis from "../../../mockApi";
import Link from "next/link";
import SelectField from "../../InputFields/SelectField/SelectField";
import ImportErrorsPopup from "./ImportErrorsPopup";
import {
  extractImportRowErrors,
  groupImportErrors,
  showImportValidationToast,
  summarizeImportErrors,
  type GroupedImportError,
} from "../../../utils/importErrorUtils";

interface PopupProps {
  visible: boolean;
  subType: string;
  onClose?: () => void;
  onSubmit: () => void;
  options?: {select_options: { label: string; value: string }[]; placeholder?: string};
}
export default function ImportPopup(props: PopupProps) {
  const [visible, setVisible] = useState(false);
  const [ticketType, setTicketType] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [groupedErrors, setGroupedErrors] = useState<GroupedImportError[]>([]);
  const [errorsSummary, setErrorsSummary] = useState("");
  const [isErrorsPopupVisible, setIsErrorsPopupVisible] = useState(false);

  const handleFileChange = (file: any) => {
    setSelectedFile(file);
  };
  const handleTypeChange = (value: string) => {
    setTicketType(value);
  };
  const TicketsApi = useMockTicketApis();

  const handleImportValidationErrors = (rowErrors: ReturnType<typeof extractImportRowErrors>) => {
    if (!rowErrors?.length) return;

    const grouped = groupImportErrors(rowErrors);
    const summary = summarizeImportErrors(grouped, rowErrors);

    setGroupedErrors(grouped);
    setErrorsSummary(summary);
    showImportValidationToast(summary, () => setIsErrorsPopupVisible(true));
  };

  const handleImport = async () => {
    if (!selectedFile) return;

    const importSource = props.options === undefined ? props.subType : ticketType;
    if (!importSource) return;

    setIsSubmitting(true);

    try {
      const result = await TicketsApi.ImportTickets(importSource, selectedFile);

      if (result?.ok) {
        props.onSubmit();
        return;
      }

      if (result?.rowErrors?.length) {
        handleImportValidationErrors(result.rowErrors);
      }
    } catch (error) {
      // No real network layer here (see mockApi.ts) — this shape matches
      // what an Axios-style error response would carry, kept generic so the
      // axios package itself doesn't need to be a dependency.
      const responseData = (error as { response?: { data?: unknown } } | undefined)?.response?.data;
      const rowErrors = extractImportRowErrors(responseData);

      if (rowErrors?.length) {
        handleImportValidationErrors(rowErrors);
        return;
      }

      toast.error("Failed to import tickets");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="card flex justify-content-center">
        <Dialog
          header="Import Data"
          visible={props.visible}
          onHide={() => {
            if (!props.visible) return;
            props.onClose?.();
          }}
          className="import-popup"
          appendTo="self"
        >
          <p className="mt-2">
            Drop CSV files here to import your data{" "}
            <Link
              href="#"
              className="text-blue-500"
              onClick={() => {
                const importSource = props.options === undefined ? props.subType : ticketType;
                TicketsApi.TicketTemplate(importSource);
              }}
            >
              Download Template.
            </Link>{" "}
            {props.options && <span>make sure to choose type.</span>}
          </p>

          {props.options && (
            <div>
              <SelectField
                Options={props.options?.select_options || []}
                onChange={(value) => handleTypeChange(value)}
                className="filter-panel__select"
                placeholder={props.options?.placeholder || "Select Ticket Type"}
                value={ticketType || ""}
              />
            </div>
          )}
          <div className="px-6 py-3">
            <FileUploader id=" " onStateChange={handleFileChange} />
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
              buttonStyle="submit"
              disabled={isSubmitting || (props.options !== undefined && !ticketType)}
              onClick={() => void handleImport()}
              className="w-full"
            >
              {isSubmitting ? "Importing..." : "Import"}
            </PrimaryButton>
          </div>
        </Dialog>
      </div>

      <ImportErrorsPopup
        visible={isErrorsPopupVisible}
        summary={errorsSummary}
        groupedErrors={groupedErrors}
        onClose={() => setIsErrorsPopupVisible(false)}
      />
    </>
  );
}
