import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, type Locale } from "@/lib/i18n/locales";
import LangSync from "./LangSync";
import LangSwitcher from "./LangSwitcher";
import CircleTool from "./tool/CircleTool";
import SizeGuideTable from "./tool/SizeGuideTable";

export default function HomePage({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const hrefFor = (l: Locale) => (l === defaultLocale ? "/" : `/${l}/`);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="flex min-h-full flex-col">
      <LangSync lang={locale} />

      <header className="border-b-4 border-mc-border bg-panel-2">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4">
          <Link
            href={hrefFor(locale)}
            className="flex items-center gap-3"
          >
            <span className="grid h-8 w-8 place-items-center bg-accent shadow-[3px_3px_0_rgba(0,0,0,0.5)]">
              <span className="font-pixel text-[8px] text-[#1a1205]">CG</span>
            </span>
            <span className="font-pixel text-[10px] text-ink">
              {dict.siteName}
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <a href="#tool" className="font-pixel text-[10px] text-ink hover:text-accent">
              {dict.nav.tool}
            </a>
            <Link href="/blog/" className="font-pixel text-[10px] text-ink hover:text-accent">
              {dict.nav.blog}
            </Link>
            <a href="#faq" className="font-pixel text-[10px] text-ink hover:text-accent">
              {dict.nav.about}
            </a>
            <LangSwitcher locale={locale} />
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 pt-16 pb-10 text-center">
          <h1 className="mx-auto max-w-3xl font-pixel text-xl leading-relaxed text-ink pixel-shadow sm:text-2xl">
            {dict.hero.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted">
            {dict.hero.subtitle}
          </p>
          <div className="mx-auto mt-8 h-1 w-full bg-accent" />
        </section>

        <section id="tool" className="mx-auto max-w-5xl px-4 pb-16">
          <div className="mc-panel pixel-corners blueprint-grid p-4">
            <CircleTool dict={dict} />
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-16">
          <SizeGuideTable dict={dict} />
        </section>

        <section id="faq" className="mx-auto max-w-5xl px-4 pb-16">
          <h2 className="font-pixel text-sm text-ink pixel-shadow">
            {dict.faq.title}
          </h2>
          <div className="mt-6 flex flex-col gap-6">
            {dict.faq.items.map((item, i) => (
              <div key={i}>
                <h3 className="font-pixel text-[10px] leading-relaxed text-accent">
                  {item.q}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.a}</p>
              </div>
            ))}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
            }}
          />
        </section>
      </main>

      <footer className="border-t-4 border-mc-border bg-panel-2">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 py-8 text-center">
          <p className="text-sm text-muted">{dict.footer.tagline}</p>
          <p className="font-pixel text-[10px] text-ink">
            © {new Date().getFullYear()} {dict.siteName}
          </p>
        </div>
      </footer>
    </div>
  );
}
