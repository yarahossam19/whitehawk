"use client";

import React from "react";

import "./tickets-card.scss";

import Image from "next/image";

import closedIcon from "../../assets/icons/table/Ticket Close.svg";
import openedIcon from "../../assets/icons/table/Ticket Open.svg";

interface AllTicketsCardProps {
  total: number;
  opened: number;
  closed: number;
}

export const AllTicketsCard: React.FC<AllTicketsCardProps> = ({ total, opened, closed }) => {
  return (
    <div className="all-tickets-card">
      <div className="flex items-center justify-center flex-col ">
        <div className="all-tickets-card__total">{total}</div>
        <div className="all-tickets-card__label">Total Tickets</div>
      </div>

      <div className="all-tickets-card__row">
        <div className="all-tickets-card__stat all-tickets-card__stat--open flex">
          <div className="all-tickets-card__icon--open">
            <Image src={openedIcon} alt="opened" width={24} height={24} />
          </div>
          <div className="flex gap-1 ml-2">
            <span>{opened}</span> <span>Opened</span>
          </div>
        </div>
        <div className="all-tickets-card__stat all-tickets-card__stat--closed flex ">
          <div className="all-tickets-card__icon--closed">
            <Image src={closedIcon} alt="closed" width={24} height={24} />
          </div>
          <div className="flex ml-2 gap-1">
            <span>{closed}</span>
            <span>Closed</span>
          </div>
        </div>
      </div>
    </div>
  );
};
