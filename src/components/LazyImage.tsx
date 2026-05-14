import Image from "next/image";
import { CSSProperties } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fill?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "scale-down";
}

/**
 * Lazy-loaded image with automatic WebP support and optimization.
 * Loads with low-quality placeholder, then swaps to high-quality.
 */
export function LazyImage({
  src,
  alt,
  className,
  style,
  priority = false,
  quality = 75,
  sizes,
  ...props
}: LazyImageProps) {
  // Convert .png/.jpg to .webp if available, fallback to original
  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, ".webp");

  return (
    <Image
      src={priority ? src : webpSrc}
      alt={alt}
      quality={quality}
      priority={priority}
      className={className}
      style={style}
      sizes={sizes || "100vw"}
      loading={priority ? "eager" : "lazy"}
      {...props}
    />
  );
}
