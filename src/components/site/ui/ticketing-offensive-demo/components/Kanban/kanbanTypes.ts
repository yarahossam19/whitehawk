/** Status object returned per ticket and/or per column from the kanban API. */
export type KanbanStatus = {
  color?: string;
  name?: string;
  id?: string | number;
};

/**
 * Shape of a single ticket displayed inside a kanban card.
 * Only the fields the backend returns per ticket are kept here:
 *   ticket_id, name, status, severity, priority, assignees,
 *   attachments_count, comments_count, notes_count
 */
export type Task = {
  ticket_id: string;
  name?: string;
  status?: KanbanStatus;
  severity?: "low" | "medium" | "high" | "critical" | string;
  priority?: "low" | "medium" | "high" | "critical" | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assignees?: any[];
  attachments_count?: number;
  comments_count?: number;
  notes_count?: number;
};

/** Optional status metadata from kanban API (per column bucket). */
export type KanbanColumnStatus = {
  color?: string;
};

export type KanbanColumn = {
  id: "new" | "in-progress" | "escalated" | "resolved" | "closed" | "pending" | string;
  title: string;
  tasksCount?: number;
  tasks?: Task[];
  /** Top-level color from API (if provided). */
  color?: string;
  /** Status object from API; `color` here takes precedence over `color` when resolving header tint. */
  status?: KanbanColumnStatus;
};
