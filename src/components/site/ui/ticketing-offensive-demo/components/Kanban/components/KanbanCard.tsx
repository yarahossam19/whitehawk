"use client";

import React from "react";

import "./kanban-card.scss";

import { MoreHorizontal } from "lucide-react";
import Image from "next/image";

import attachmentIcon from "../../../assets/icons/tickets/attachemnt.svg";
import commentIcon from "../../../assets/icons/tickets/comment.svg";
import noteIcon from "../../../assets/icons/tickets/note.svg";
import type { Task } from "../kanbanTypes";

export default function KanbanCard(props: { task: Task }) {
  const { task } = props;

  return (
    <div className="kanban-card">
      <div className="kanban-card__header">
        <div>
          <h3 className="kanban-card__title">{task.name}</h3>
        </div>
        <MoreHorizontal size={18} />
      </div>
      <div className="kanban-card__body">
        {task.severity && (
          <div className="kanban-card__badge-item">
            <div className="kanban-card__badge-title">Severity:</div>
            <div className={`status-badge status-badge__${task.severity}`}>
              {task.severity}
            </div>
          </div>
        )}
        {task.priority && (
          <div className="kanban-card__badge-item">
            <div className="kanban-card__badge-title">Priority:</div>
            <div className={`status-badge status-badge__${task.priority}`}>
              {task.priority}
            </div>
          </div>
        )}
      </div>
      <div className="kanban-card__assignees-list">
        {task.assignees && task.assignees.length > 0 &&
          task.assignees.map((assignee: any) => {
            const name: string = assignee.username || assignee.name || "";
            const initials =
              name
                .trim()
                .split(" ")
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part.charAt(0).toUpperCase())
                .join("") || "?";

            const avatarUrl: string | undefined =
              assignee.avatar || assignee.avatar_url || assignee.image;

            return (
              <div key={assignee.id ?? name} className="kanban-card__assignee">
                <div className="kanban-card__assignee-avatar">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={name || "Assignee"}
                      width={24}
                      height={24}
                    />
                  ) : (
                    <span>{initials}</span>
                  )}
                </div>
                {name && <span className="kanban-card__assignee-name">{name}</span>}
              </div>
            );
          })}
      </div>
      <div className="kanban-card__footer">
        <div className="footer-item">
          <span>{task.notes_count ?? 0}</span>
          <Image
            src={noteIcon}
            alt="Notes"
            width={16}
            height={16}
            className="invert dark:invert-0"
          />
        </div>
        <div className="footer-item">
          <span>{task.comments_count ?? 0}</span>
          <Image
            src={commentIcon}
            alt="Comments"
            width={16}
            height={16}
            className="invert dark:invert-0"
          />
        </div>
        <div className="footer-item">
          <span>{task.attachments_count ?? 0}</span>
          <Image
            src={attachmentIcon}
            alt="Attachments"
            width={16}
            height={16}
            className="invert dark:invert-0"
          />
        </div>
      </div>
    </div>
  );
}
