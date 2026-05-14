import { ReactNode } from "react";
import { useLazyLoad } from "@/hooks/useLazyLoad";

interface LazyLoadSectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  minHeight?: number;
}

/**
 * Client component that lazy-loads its children when they enter the viewport.
 * Useful for deferring heavy sections that aren't visible on initial page load.
 */
export function LazyLoadSection({ 
  children, 
  fallback = <div style={{ minHeight: 500, background: "#f5f5f5" }} />,
  minHeight = 500 
}: LazyLoadSectionProps) {
  const { ref, isInView } = useLazyLoad({ rootMargin: "100px" });

  return (
    <div 
      ref={ref} 
      style={{ minHeight: !isInView ? minHeight : "auto" }}
    >
      {isInView ? children : fallback}
    </div>
  );
}
