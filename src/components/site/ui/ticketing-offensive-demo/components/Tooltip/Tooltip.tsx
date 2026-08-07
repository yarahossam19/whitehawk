"use client";

import * as React from "react";

import { Tooltip as ShadcnTooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

export interface AppTooltipProps {
  /** The element that should show a tooltip on hover / focus */
  children: React.ReactNode;
  /** Tooltip text or custom JSX */
  content: React.ReactNode;
  /** Optional side for the tooltip (top, right, bottom, left) */
  side?: "top" | "right" | "bottom" | "left";
  /** Optional alignment of the tooltip relative to the trigger */
  align?: "start" | "center" | "end";
  /** Optional additional className for the tooltip content */
  className?: string;
}

/**
 * Simple app-level Tooltip built on top of shadcn-ui Radix tooltip primitives.
 * Uses CSS variables (bg-foreground / text-background) so it automatically
 * adapts to light and dark themes configured in the app.
 */
export function AppTooltip({
  children,
  content,
  side = "top",
  align = "center",
  className,
}: AppTooltipProps) {
  return (
    <ShadcnTooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} align={align} className={className}>
        {content}
      </TooltipContent>
    </ShadcnTooltip>
  );
}

export default AppTooltip;
