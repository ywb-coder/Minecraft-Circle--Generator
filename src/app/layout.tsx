import type { Metadata } from "next";
import { SITE_URL } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: {
    google: "google59dae63d03160853.html",
  },
  title: {
    default: "Minecraft Circle Generator — Circles & Spheres",
    template: "%s | CircleGen",
  },
  description:
    "Free Minecraft circle generator with block-by-block pixel blueprints for circles, ovals, spheres, domes and arcs. Works for Java and Bedrock.",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
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

const GA_MEASUREMENT_ID = "G-ED1D95CXQV";

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
        {/* Google Analytics 4 */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: [
              "window.dataLayer = window.dataLayer || [];",
              "function gtag(){dataLayer.push(arguments);}",
              "gtag('js', new Date());",
              `gtag('config', '${GA_MEASUREMENT_ID}');`,
            ].join("\n"),
          }}
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
