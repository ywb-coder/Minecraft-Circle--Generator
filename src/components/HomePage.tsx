import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, type Locale } from "@/lib/i18n/locales";
import {
  buildDate,
  GITHUB_URL,
  HREFLANG_MAP,
  LAUNCH_DATE,
  SITE_EMAIL,
  SITE_URL,
  SOURCES,
} from "@/lib/config";
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

  const langPath = hrefFor(locale);
  const inLanguage = HREFLANG_MAP[locale];

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

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: dict.siteName,
    url: SITE_URL,
    inLanguage,
  };

  const webApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: dict.siteName,
    url: `${SITE_URL}${langPath}`,
    description: dict.meta.description,
    applicationCategory: "GameApplication",
    operatingSystem: "Web Browser",
    inLanguage,
    datePublished: LAUNCH_DATE,
    dateModified: buildDate(),
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: dict.siteName,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.png`,
    email: SITE_EMAIL,
    sameAs: [GITHUB_URL],
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE_EMAIL,
      contactType: "customer support",
    },
  };

  const escapeJsonLd = (data: unknown) =>
    JSON.stringify(data).replace(/</g, "\\u003c");

  const sizeButtons = dict.sizeGuide.entries.slice(0, 5);

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
              <span className="font-pixel text-[8px] text-(--accent-ink)">CG</span>
            </span>
            <span className="font-pixel text-[10px] text-ink">
              {dict.siteName}
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <a href="#tool" className="font-pixel text-[10px] text-ink hover:text-accent">
              {dict.nav.tool}
            </a>
            <a href="#faq" className="font-pixel text-[10px] text-ink hover:text-accent">
              {dict.nav.faq}
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

        <section className="mx-auto max-w-5xl px-4 pb-10">
          <div className="mc-panel pixel-corners p-5">
            <h2 className="font-pixel text-[10px] text-accent">
              What is a Minecraft circle generator?
            </h2>
            <p className="mt-3 text-sm leading-7 text-ink">
              A Minecraft circle generator is a free online tool that turns any
              diameter into a block-by-block pixel blueprint you can copy
              directly into the game. Pick a size from 5 to 256 blocks, choose
              a shape, and the generator draws the exact grid — every row, every
              block — for circles, ovals, spheres, domes and arcs in both Java
              and Bedrock editions.
            </p>
            <p className="mt-3 text-sm leading-7 text-muted">
              The circle generator uses the same discrete-circle math as the
              midpoint circle algorithm, which is why odd diameters produce a
              clean, symmetric ring every time. No downloads, no accounts, and
              the blueprint is always free.
            </p>
          </div>
        </section>

        <section id="tool" className="mx-auto max-w-5xl px-4 pb-16">
          <div className="mc-panel pixel-corners blueprint-grid p-4">
            <CircleTool dict={dict} />
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-16">
          <SizeGuideTable dict={dict} />
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-16">
          <h2 className="font-pixel text-sm text-ink pixel-shadow">
            {dict.sizeGuide.title}
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {sizeButtons.map((entry) => (
              <Link
                key={entry.size}
                href={`${langPath}circle/${entry.size}/`}
                title={entry.use}
                className="mc-btn px-3! py-1!"
              >
                <span className="font-pixel text-[10px]">{entry.size}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 pb-16">
          <h2 className="font-pixel text-sm text-ink pixel-shadow">
            Sources
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            The circle generator is based on standard discrete-circle
            rendering, documented by the following public references:
          </p>
          <ul className="mt-4 list-disc pl-6 text-sm leading-7 text-ink">
            {SOURCES.map((source) => (
              <li key={source.url} className="my-1">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-link"
                >
                  {source.name}
                </a>
              </li>
            ))}
          </ul>
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
              __html: escapeJsonLd(faqJsonLd),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: escapeJsonLd(webSiteJsonLd),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: escapeJsonLd(webApplicationJsonLd),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: escapeJsonLd(organizationJsonLd),
            }}
          />
        </section>
      </main>

      <footer className="border-t-4 border-mc-border bg-panel-2">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-8 text-center">
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
          <p className="font-pixel text-[10px] text-ink">
            © {new Date().getFullYear()} {dict.siteName}
          </p>
          <p className="font-terminal text-sm text-muted">
            Last updated: {buildDate()}
          </p>
        </div>
      </footer>
    </div>
  );
}
