import type { Metadata } from "next";
import { SITE_URL } from "@/lib/config";

/**
 * Shared document metadata for every root layout.
 *
 * The site is split into three route groups (`(en)`, `(es)`, `(loc)`) so that
 * each one can own its own `<html lang>` — the app router only exposes the
 * `params` of segments *below* a layout, so a single shared root layout could
 * never know which locale it was rendering.
 */
export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: {
    google: "google59dae63d03160853.html",
  },
  title: {
    default: "Minecraft Circle Generator — Free Block Blueprints",
    template: "%s | CircleGen",
  },
  description:
    "Free Minecraft circle generator with block-by-block pixel blueprints for circles, ovals, spheres, domes and arcs. Works for Java and Bedrock.",
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    siteName: "CircleGen",
    type: "website",
    images: [{ url: "/og-image.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.webp"],
  },
};
