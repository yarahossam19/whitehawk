import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "primereact"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    /* Smaller widths first → mobile LCP images decode faster */
    deviceSizes: [384, 640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
