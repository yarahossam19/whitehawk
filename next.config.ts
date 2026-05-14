import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "primereact"],
    /** Inlines App Router CSS in production → fewer render-blocking `<link>` requests (Lighthouse). */
    inlineCss: true,
    webpackBuildWorker: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    /* Smaller widths first → mobile LCP images decode faster */
    deviceSizes: [384, 640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache
    dangerouslyAllowSVG: false,
  },
  poweredByHeader: false,
  compress: true,
  async rewrites() {
    return [
      {
        source: "/partner-api/:path*",
        destination: "https://partner.whiteguard.io/api/:path*",
      },
    ];
  },
};

export default nextConfig;
