import Link from "@/components/StaticLink";
import type { ReactNode } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, type Locale } from "@/lib/i18n/locales";
import { buildDate } from "@/lib/config";

export default function SeoShell({
  dict,
  locale,
  children,
}: {
  dict: Dictionary;
  locale: Locale;
  children: ReactNode;
}) {
  const home = locale === defaultLocale ? "/" : `/${locale}/`;
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b-4 border-mc-border bg-panel-2">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link href={home} className="flex items-center gap-2">
            <span className="pixel-shadow grid h-8 w-8 place-items-center bg-accent font-pixel text-[8px] text-[#1a1205]">
              CG
            </span>
            <span className="font-pixel text-[10px] tracking-wide text-ink">
              {dict.siteName}
            </span>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-10">{children}</div>
      </main>
      <footer className="border-t-4 border-mc-border bg-panel-2 py-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 text-center">
          <p className="text-sm text-muted">{dict.footer.tagline}</p>
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link href="/about/" className="pixel-link text-sm">
              About
            </Link>
            <Link href="/contact/" className="pixel-link text-sm">
              Contact
            </Link>
            <Link href="/privacy/" className="pixel-link text-sm">
              Privacy
            </Link>
            <Link href="/terms/" className="pixel-link text-sm">
              Terms
            </Link>
          </nav>
          <p className="font-terminal text-sm text-muted">
            {dict.footer.lastUpdated}: {buildDate()}
          </p>
        </div>
      </footer>
    </div>
  );
}
