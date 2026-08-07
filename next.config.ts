import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Blog post cover images are admin-supplied arbitrary URLs (validated as
    // a URL string only, no fixed CDN/domain — see src/lib/posts.actions.ts).
    // Allow any https host so next/image doesn't reject them at runtime.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  async headers() {
    return [
      {
        // Files under public/ are served with `max-age=0` by default, so the
        // 9 MB demo clip would be revalidated on every repeat visit. Nothing
        // in public/videos is content-hashed, so this is a long max-age rather
        // than `immutable`: replacing a clip means either a new filename or a
        // week's tail of stale caches.
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800" }],
      },
    ];
  },
};

export default nextConfig;
