"use client";

import React, { useState } from "react";
import { Dialog } from "primereact/dialog";

import PrimaryButton from "../../PrimaryButton/PrimaryButton";

import "./edit-popup.scss";

import InputField from "../../InputFields/InputField/InputField";
import DateField from "../../InputFields/DateField/DateField";
import SelectField from "../../InputFields/SelectField/SelectField";

interface PopupProps {
  visible: boolean;
  onClose?: () => void;
  onSubmit: () => void;
}
export default function EditPopup(props: PopupProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="card flex justify-content-center">
      <Dialog
        header="Ticket Fields"
        visible={props.visible}
        onHide={() => {
          if (!props.visible) return;
          props.onClose?.();
        }}
        className="edit-popup"
        appendTo="self"
      >
        <div className="inputs-container py-2">
          <SelectField
            id="scan-type"
            title="Scan Type"
            Options={[
              { label: "Low", value: "low" },
              { label: "Medium", value: "medium" },
              { label: "High", value: "high" },
              { label: "Critical", value: "critical" },
            ]}
          />
          <SelectField
            id="scanner-used"
            title="Scanner Used"
            Options={[
              { label: "Low", value: "low" },
              { label: "Medium", value: "medium" },
              { label: "High", value: "high" },
              { label: "Critical", value: "critical" },
            ]}
          />
          <DateField id="created-date" title="Created Date" />
          <DateField id="scan-end-date" title="Scan End Date" />
          <InputField id="cvss-score" title="CVSS Score" placeholder="Ex: 7.5" />
          <SelectField
            id="status"
            title="Status"
            Options={[
              { label: "Open", value: "open" },
              { label: "In Progress", value: "in-progress" },
              { label: "Resolved", value: "resolved" },
              { label: "Closed", value: "closed" },
            ]}
          />
          <SelectField
            id="assignee"
            title="Assignee"
            Options={[
              { label: "User 1", value: "user-1" },
              { label: "User 2", value: "user-2" },
              { label: "User 3", value: "user-3" },
            ]}
          />
        </div>
        <div className="buttons-container">
          <PrimaryButton
            buttonStyle="cancel"
            onClick={() => props.onClose?.() || setVisible(false)}
            className="w-full"
          >
            Cancel
          </PrimaryButton>
          <PrimaryButton buttonStyle="submit" onClick={() => props.onSubmit()} className="w-full">
            Submit
          </PrimaryButton>
        </div>
      </Dialog>
    </div>
  );
}
