"use client";

import React from "react";
import dynamic from "next/dynamic";

/**
 * Create aggressively lazy-loaded sections visible on scroll.
 * These sections don't render at all until user scrolls within 200px of them.
 */
export const createLazySection = (
  importPath: () => Promise<any>,
  componentName: string,
  minHeight = 600
) => {
  return dynamic(
    async () => {
      const module = await importPath();
      return { default: module[componentName] };
    },
    {
      loading: () => (
        <div
          style={{ minHeight, background: "#f5f5f5" }}
          aria-hidden
          role="presentation"
        />
      ),
      ssr: false,
    }
  );
};
