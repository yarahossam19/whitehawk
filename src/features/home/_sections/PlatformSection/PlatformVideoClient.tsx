"use client";

import dynamic from "next/dynamic";
import React from "react";
import styles from "./PlatformSection.module.scss";

const OptimizedDashboardVideo = dynamic(
  () => import("./OptimizedDashboardVideo").then((mod) => mod.OptimizedDashboardVideo),
  { ssr: false, loading: () => <div className={styles.dashboardPlaceholder} aria-hidden /> }
);

export default function PlatformVideoClient() {
  return <OptimizedDashboardVideo />;
}
