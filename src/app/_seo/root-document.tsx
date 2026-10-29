import type { ReactNode } from "react";

/**
 * The `<html>`/`<body>` shell shared by every root layout.
 *
 * `lang` is passed in by the owning route group so the server-rendered
 * document always advertises the real content language (important for both
 * crawlers and screen readers).
 */
export default function RootDocument({
  lang,
  children,
}: {
  lang: string;
  children: ReactNode;
}) {
  return (
    <html lang={lang} className="h-full antialiased">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
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
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
