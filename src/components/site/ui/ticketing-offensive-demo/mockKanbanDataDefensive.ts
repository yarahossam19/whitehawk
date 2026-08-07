import type { KanbanColumn } from "./components/Kanban/kanbanTypes";

// Defensive-flavored counterpart to mockKanbanData.ts — same column/task
// shape (KanbanColumn/KanbanCard are generic), alert-response wording instead
// of feature-ticket wording.
export const mockKanbanDataDefensive: KanbanColumn[] = [
  {
    id: "new",
    title: "New",
    tasksCount: 3,
    tasks: [
      {
        ticket_id: "A-201",
        name: "Unusual sign-in from new device — Finance admin",
        severity: "high",
        priority: "medium",
        assignees: [{ name: "Alice Cole" }],
        notes_count: 2,
        attachments_count: 1,
        comments_count: 3,
      },
      {
        ticket_id: "A-202",
        name: "Outbound traffic spike to unrecognized host",
        severity: "medium",
        priority: "low",
        assignees: [{ name: "Bob Hart" }],
        notes_count: 1,
        attachments_count: 0,
        comments_count: 5,
      },
      {
        ticket_id: "A-203",
        name: "Endpoint flagged for suspicious PowerShell activity",
        severity: "low",
        priority: "low",
        assignees: [{ name: "Charlie Wu" }],
        notes_count: 3,
        attachments_count: 2,
        comments_count: 0,
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasksCount: 2,
    tasks: [
      {
        ticket_id: "A-204",
        name: "Contain lateral movement on compromised workstation",
        severity: "critical",
        priority: "high",
        assignees: [{ name: "Alice Cole" }],
        notes_count: 4,
        attachments_count: 1,
        comments_count: 8,
      },
      {
        ticket_id: "A-205",
        name: "Investigate repeated failed MFA challenges",
        severity: "medium",
        priority: "low",
        assignees: [{ name: "Bob Hart" }],
        notes_count: 0,
        attachments_count: 0,
        comments_count: 2,
      },
    ],
  },
  {
    id: "escalated",
    title: "Escalated",
    tasksCount: 1,
    tasks: [
      {
        ticket_id: "A-206",
        name: "Possible ransomware precursor — mass file rename",
        severity: "critical",
        priority: "high",
        assignees: [{ name: "Charlie Wu" }],
        notes_count: 5,
        attachments_count: 2,
        comments_count: 6,
      },
    ],
  },
  {
    id: "resolved",
    title: "Resolved",
    tasksCount: 2,
    tasks: [
      {
        ticket_id: "A-207",
        name: "Confirmed benign — scheduled vendor scan",
        severity: "low",
        priority: "low",
        assignees: [{ name: "Alice Cole" }],
        notes_count: 1,
        attachments_count: 0,
        comments_count: 1,
      },
      {
        ticket_id: "A-208",
        name: "Phishing email quarantined and reported",
        severity: "high",
        priority: "medium",
        assignees: [{ name: "Bob Hart" }],
        notes_count: 2,
        attachments_count: 1,
        comments_count: 4,
      },
    ],
  },
  {
    id: "closed",
    title: "Closed",
    tasksCount: 1,
    tasks: [
      {
        ticket_id: "A-209",
        name: "Monthly access-review anomaly — no action needed",
        severity: "medium",
        priority: "low",
        assignees: [{ name: "Charlie Wu" }],
        notes_count: 1,
        attachments_count: 1,
        comments_count: 0,
      },
    ],
  },
];
