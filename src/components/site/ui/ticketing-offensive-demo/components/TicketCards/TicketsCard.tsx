"use client";

import React from "react";
import Image from "next/image";

import "./tickets-card.scss";

interface TicketsCardProps {
  title: string;
  value: number;
  icon: string; // image path or import
  color?: string; // optional background color for icon
  isActive?: boolean; // whether the card is currently selected
}

export const TicketsCard: React.FC<TicketsCardProps> = ({ title, value, icon, color, isActive }) => {
  return (
    <div
      className={`ticket-card${isActive ? " ticket-card--active" : ""}`}
      style={{ ["--card-color" as any]: color }}
    >
      <div className="ticket-card__header flex">
        <div className="ticket-card__icon">
          <Image src={icon} alt={title} width={50} height={50} />
        </div>
        <div className="ticket-card__body flex flex-col ">
          <div className="ticket-card__value">{value}</div>
          <span className="ticket-card__title">{title}</span>
        </div>
      </div>
    </div>
  );
};
