"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hook for scroll-based lazy loading of sections using IntersectionObserver.
 * Renders a placeholder initially, then loads the actual component when visible.
 * 
 * @returns A ref to attach to the container and a boolean indicating if the element is in view
 */
export function useLazyLoad(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        // Stop observing once we've loaded
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      }
    }, {
      rootMargin: "50px", // Start loading 50px before entering viewport
      ...options,
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return { ref, isInView };
}
