import Image from "next/image";
import { CSSProperties } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "scale-down";
  sizes?: string;
}

/**
 * Optimized image component with WebP support and Next.js Image optimization.
 * Automatically serves WebP when available, falls back to original format.
 * 
 * Usage: All images should use this component instead of <img> tags.
 */
export function OptimizedImage({
  src,
  alt,
  className,
  style,
  priority = false,
  quality = 80,
  objectFit = "cover",
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      quality={quality}
      priority={priority}
      className={className}
      style={style}
      {...props}
    />
  );
}
