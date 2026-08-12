import type { Metadata } from "next";
import { SITE_URL } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Minecraft Circle Generator — Build Perfect Circles, Ovals, Spheres & Domes",
    template: "%s | CircleGen",
  },
  description:
    "Free Minecraft circle generator with block-by-block blueprints for circles, ovals, spheres, and domes. Live preview, build order animation, and PNG downloads for Java and Bedrock.",
  icons: { icon: "/favicon.png" },
  openGraph: {
    siteName: "CircleGen",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          rel="preload"
          href="/fonts/press-start-2p.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/vt323.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-full flex-col">
        {children}
        {plausibleDomain ? (
          <script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
          />
        ) : null}
      </body>
    </html>
  );
}
