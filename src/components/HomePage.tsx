import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localeNames, type Locale, defaultLocale } from "@/lib/i18n/locales";
import LangSync from "./LangSync";
import LangSwitcher from "./LangSwitcher";

export default function HomePage({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const hrefFor = (l: Locale) => (l === defaultLocale ? "/" : `/${l}/`);

  return (
    <div className="flex min-h-full flex-col">
      <LangSync lang={locale} />
      <header className="border-b border-zinc-200 bg-white/95 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/95">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
          <Link href={hrefFor(locale)} className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-green-600 font-pixel text-[10px] text-white">
              CG
            </span>
            <span className="font-pixel text-[10px] tracking-wide text-zinc-900 dark:text-zinc-100">
              {dict.siteName}
            </span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <a
              href={`${hrefFor(locale)}#tool`}
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {dict.nav.tool}
            </a>
            <a
              href={`${hrefFor(locale)}blog/`}
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
            >
              {dict.nav.blog}
            </a>
            <LangSwitcher locale={locale} />
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 pt-14 pb-8 text-center">
          <h1 className="mx-auto max-w-3xl font-pixel text-2xl leading-relaxed text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            {dict.hero.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            {dict.hero.subtitle}
          </p>
        </section>

        <section
          id="tool"
          className="mx-auto max-w-5xl px-4 pb-16"
        >
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Tool placeholder — geometry engine lands in the next milestone.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 py-8 dark:border-zinc-800">
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          {dict.footer.tagline}
        </p>
      </footer>
    </div>
  );
}
