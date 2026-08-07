"use client";

import React, { useState } from "react";
import { Dialog } from "primereact/dialog";

import csvIcon from "../../../assets/icons/CSV.svg";
import xslIcon from "../../../assets/icons/XSL.svg";

import "./export-popup.scss";

import Image from "next/image";

import PrimaryButton from "../../PrimaryButton/PrimaryButton";
import useMockTicketApis from "../../../mockApi";
import SelectField from "../../InputFields/SelectField/SelectField";

interface PopupProps {
  visible: boolean;
  ticketType?:string;
  options?: {select_options: { label: string; value: string }[]; placeholder?: string};
  onClose?: () => void;
  onSubmit: () => void;
}
export default function ExportPopup(props: PopupProps) {
  const [visible, setVisible] = useState(false);
  const [fileType,setFileType] = useState<string>('');
  const [ticketType, setTicketType] = useState<string>('');

  const TicketApis = useMockTicketApis();
  const handleTypeChange = (value: string) => {
    setTicketType(value);
  };
  return (
    <div className="card flex justify-content-center">
      <Dialog
        header="Export All Data"
        visible={props.visible}
        onHide={() => {
          if (!props.visible) return;
          props.onClose?.();
        }}
        className="export-popup"
        appendTo="self"
      >
        <p className="mt-2">Select from XSL or CSV format to export the data {props.options &&<span>make sure to choose type.</span>}</p>
         {props.options && <div>
                   <SelectField
                    Options={props.options?.select_options || []}
                    onChange={(value) => handleTypeChange(value)}
                    className="filter-panel__select"
                    placeholder={props.options?.placeholder || "Select Ticket Type"}
                    value={ticketType || ""}
                  />
                </div>}
        <div className="flex justify-center items-center gap-6 my-4">
        <div
          className={`p-3 cursor-pointer rounded-xl transition-all duration-200 border-2
            ${fileType === 'excel'
              ? 'border-blue-500 bg-blue-100 shadow-md scale-105'
              : 'border-transparent hover:bg-blue-100'}`}
          onClick={() => setFileType('excel')}
        >
          <Image src={xslIcon} alt="XSL" width={60} height={70} />
        </div>

        <div
          className={`p-3 cursor-pointer rounded-xl transition-all duration-200 border-2
            ${fileType === 'csv'
              ? 'border-blue-500 bg-blue-100 shadow-md scale-105'
              : 'border-transparent hover:bg-blue-100'}`}
          onClick={() => setFileType('csv')}
        >
          <Image src={csvIcon} alt="CSV" width={60} height={70} />
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
            buttonStyle="submit"
            onClick={() => {
              if (fileType) {
                let importSource = props.options===undefined ?   props.ticketType:ticketType;
                TicketApis.ExportTickets(importSource, fileType);
                props.onSubmit();
              }
            }}
            className="w-full"
          >
            Save
          </PrimaryButton>
        </div>
      </Dialog>
    </div>
  );
}
