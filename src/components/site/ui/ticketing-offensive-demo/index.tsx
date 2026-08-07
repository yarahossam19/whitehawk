"use client";

import { useEffect, useMemo, useState } from "react";

// Tailwind entry, scoped to this folder only (see tailwind-entry.css) — the
// rest of the site is SCSS Modules. Also carries theme.css's design tokens
// (renamed to a --tix- prefix wherever they'd otherwise collide with the
// site's own tokens — see theme.css), scoped to body.ticketing-demo-active
// (toggled below) instead of :root, so they never leak into the rest of the
// site.
import "./tailwind-entry.css";

import totalTicket from "./assets/icons/new.svg";
import redAlerts from "./assets/icons/red-alerts.svg";
import closedIcon from "./assets/icons/table/Ticket Close.svg";
import openIcon from "./assets/icons/table/Ticket Open.svg";
import { DataTable } from "./components/DataTable/DataTable";
import { mockData } from "./mockData";
import { mockDataDefensive } from "./mockDataDefensive";
import { mockKanbanData } from "./mockKanbanData";
import { mockKanbanDataDefensive } from "./mockKanbanDataDefensive";
import DeletePopup from "./components/Popups/DeleteTicketPopup/DeleteTicketPopup";
import EditPopup from "./components/Popups/EditTicketPopup/EditTicketPopup";
import ExportPopup from "./components/Popups/ExportPopup/ExportPopup";
import ImportPopup from "./components/Popups/ImportPopup/ImportPopup";
import PrimaryButton from "./components/PrimaryButton/PrimaryButton";
import { TicketsCard } from "./components/TicketCards/TicketsCard";

import "./offensive.scss";

export type TicketingDemoVariant = "offensive" | "defensive";

function buildColumns(variant: TicketingDemoVariant) {
  const isOffensive = variant === "offensive";
  return [
    {
      id: "ticket",
      header: "Ticket ID",
      accessorKey: "ticket",
    },
    {
      id: "scanType",
      header: isOffensive ? "Scan Type" : "Alert Type",
      accessorKey: "scanType",
    },
    {
      id: "scanner",
      header: isOffensive ? "Scanner Used" : "Detection Source",
      accessorKey: "scanner",
    },
    {
      id: "createdDate",
      header: "Created Date",
      accessorKey: "createdDate",
    },
    {
      id: "scanEndDate",
      header: isOffensive ? "Scan End Date" : "Resolved Date",
      accessorKey: "scanEndDate",
    },
    {
      id: "status",
      header: "Status",
      // Without an accessor, TanStack has nothing to read for this column and
      // `getValue()` came back undefined — the Status cell rendered as an empty
      // pill on every row.
      accessorKey: "status",
      // Modifier derived from the value ("In Progress" → status--in-progress)
      // rather than hardcoded to `new`, so every status in the dataset gets its
      // own tint from data-table.scss instead of all of them reading as New.
      cell: ({ getValue }: any) => {
        const value = String(getValue() ?? "");
        const modifier = value.trim().toLowerCase().replace(/\s+/g, "-");
        return (
          <span className={`status${modifier ? ` status--${modifier}` : ""}`}>{value}</span>
        );
      },
    },
    {
      id: "cvss",
      header: isOffensive ? "CVSS" : "Severity",
      cell: ({ row }: any) => {
        const { score, level } = row.original.cvss;
        const levelClass = level.toLowerCase();
        return (
          <span className={`cvss cvss--${levelClass}`}>
            {score} {level}
          </span>
        );
      },
    },
    {
      id: "assignee",
      header: "Assignee",
      cell: ({ row }: any) => {
        const { name, tier, avatar } = row.original.assignee;
        return (
          <div className="assignee">
            <img src={avatar} alt={name} className="assignee__avatar" />
            <div className="assignee__info">
              <span className="assignee__info-name">{name}</span>
              <span className="assignee__info-tier">{tier}</span>
            </div>
          </div>
        );
      },
    },
  ];
}

const tabsByVariant: Record<TicketingDemoVariant, Array<{ label: string; value: string }>> = {
  offensive: [
    { label: "All", value: "all-tickets" },
    { label: "Network VA", value: "network-va" },
    { label: "Web VA", value: "web-va" },
    { label: "Mobile VA", value: "mobile-va" },
    { label: "API VA", value: "api-va" },
    { label: "Source Code VA", value: "source-code-va" },
  ],
  defensive: [
    { label: "All", value: "all-alerts" },
    { label: "Network Alerts", value: "network-alerts" },
    { label: "Endpoint Alerts", value: "endpoint-alerts" },
    { label: "Identity Alerts", value: "identity-alerts" },
    { label: "Cloud Alerts", value: "cloud-alerts" },
    { label: "Insider Threat", value: "insider-threat" },
  ],
};

const filterOptions = [
  {
    key: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "New", value: "New" },
      { label: "In Progress", value: "In Progress" },
      { label: "Completed", value: "Completed" },
    ],
    placeholder: "Select status",
  },
  {
    key: "assignee",
    label: "Assignee",
    type: "select",
    options: [
      { label: "Alice", value: "Alice" },
      { label: "Bob", value: "Bob" },
      { label: "Charlie", value: "Charlie" },
    ],
    placeholder: "Choose assignee",
  },
  {
    key: "createdDate",
    label: "Created Date",
    type: "date",
    placeholder: "Pick a date",
  },
  {
    key: "dateRange",
    label: "Created Range",
    type: "range",
    placeholder: "Select date range",
  },
];

const systemCardsByVariant: Record<
  TicketingDemoVariant,
  Array<{ label: string; value: number; icon: string; color: string }>
> = {
  offensive: [
    { label: "Total Tickets", value: 200, icon: totalTicket, color: "rgba(10, 138, 231, 0.20)" },
    { label: "Open Tickets", value: 100, icon: openIcon, color: "rgba(245, 133, 21, 0.20)" },
    { label: "Closed Tickets", value: 50, icon: closedIcon, color: "rgba(27, 169, 103, 0.20)" },
    { label: "Critical Tickets", value: 50, icon: redAlerts, color: "rgba(234, 35, 64, 0.20)" },
  ],
  defensive: [
    { label: "Total Alerts", value: 340, icon: totalTicket, color: "rgba(10, 138, 231, 0.20)" },
    { label: "Open Alerts", value: 62, icon: openIcon, color: "rgba(245, 133, 21, 0.20)" },
    { label: "Resolved Alerts", value: 260, icon: closedIcon, color: "rgba(27, 169, 103, 0.20)" },
    { label: "Critical Alerts", value: 18, icon: redAlerts, color: "rgba(234, 35, 64, 0.20)" },
  ],
};

/**
 * Standalone, backend-free demo of the ticketing hub — reused for both the
 * Offensive and Defensive module pages' "Product view" section. All data is
 * mocked and all actions (export/import/edit/delete) are no-ops that
 * simulate success via toast notifications — nothing is sent to a server.
 *
 * `variant` swaps the column headers, tabs, KPI cards and mock dataset
 * between offensive-testing wording (scans/CVSS) and defensive wording
 * (alerts/severity) — the DataTable/Kanban/Popup machinery underneath is
 * identical either way.
 */
export function TicketingDemo({ variant = "offensive" }: { variant?: TicketingDemoVariant }) {
  // theme.css's ~70 design tokens are scoped to this class (not :root) so
  // they only apply while this component is actually mounted, and never leak
  // onto pages that don't render it.
  useEffect(() => {
    document.body.classList.add("ticketing-demo-active");
    return () => {
      document.body.classList.remove("ticketing-demo-active");
    };
  }, []);

  const [isExportPopupVisible, setIsExportPopupVisible] = useState(false);
  const [isImportPopupVisible, setIsImportPopupVisible] = useState(false);
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const menuItems = [
    { label: "Export", onClick: () => setIsExportPopupVisible(true) },
    { label: "Import", onClick: () => setIsImportPopupVisible(true) },
  ];

  const columns = useMemo(() => buildColumns(variant), [variant]);
  const tabs = tabsByVariant[variant];
  const systemCards = systemCardsByVariant[variant];
  const data = variant === "offensive" ? mockData : mockDataDefensive;
  const kanbanColumns = variant === "offensive" ? mockKanbanData : mockKanbanDataDefensive;

  return (
    <div className="offensive-page">
      <div className="button-container">
        <PrimaryButton
          buttonStyle="primary"
          menuItems={menuItems}
          href="#"
          className="cursor-pointer"
        />
      </div>
      <div
        style={{
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <div className="cards-container">
          {systemCards.map((type) => (
            <TicketsCard
              key={type.label}
              title={type.label}
              value={type.value}
              icon={type.icon}
              color={type.color}
            />
          ))}
        </div>
      </div>

      <DataTable
        enableRowSelection={false}
        columnPersistenceKey={`ticketing-${variant}-hub-demo`}
        columns={columns}
        filterOptions={filterOptions}
        actionsMenuOptions={[
          {
            label: "Edit",
            onClick: () => setIsEditPopupVisible(true),
          },
          {
            label: "Delete",
            onClick: () => setIsDeletePopupVisible(true),
          },
        ]}
        data={data}
        kanbanColumns={kanbanColumns}
        tabs={tabs}
        kanbanView
      />
      {isExportPopupVisible && (
        <ExportPopup
          visible={isExportPopupVisible}
          onClose={() => setIsExportPopupVisible(false)}
          onSubmit={() => {
            setIsExportPopupVisible(false);
          }}
        />
      )}
      {isImportPopupVisible && (
        <ImportPopup
          visible={isImportPopupVisible}
          subType="offensive"
          onClose={() => setIsImportPopupVisible(false)}
          onSubmit={() => {
            setIsImportPopupVisible(false);
          }}
        />
      )}
      {isEditPopupVisible && (
        <EditPopup
          visible={isEditPopupVisible}
          onClose={() => setIsEditPopupVisible(false)}
          onSubmit={() => {
            setIsEditPopupVisible(false);
          }}
        />
      )}
      {isDeletePopupVisible && (
        <DeletePopup
          visible={isDeletePopupVisible}
          deleteType="This Ticket"
          onClose={() => setIsDeletePopupVisible(false)}
          onSubmit={() => {
            setIsDeletePopupVisible(false);
          }}
        />
      )}
    </div>
  );
}

export default TicketingDemo;
