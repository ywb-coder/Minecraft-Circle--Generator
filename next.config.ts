import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    // The site uses multiple root layouts (one per route group), so the global
    // 404 page has to be rendered from `app/global-not-found.tsx` instead of
    // the built-in default. This flag is still experimental in Next 16.
    globalNotFound: true,
  },
};

export default nextConfig;
