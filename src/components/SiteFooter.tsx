import Link from "@/components/StaticLink";
import ConsentSettingsButton from "@/components/ConsentSettingsButton";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { CONTENT_UPDATED, SITE_EMAIL } from "@/lib/config";

export default function SiteFooter({
  dict,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <footer className="border-t-4 border-mc-border bg-panel-2">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 py-8 text-center">
        <p className="text-sm text-muted">{dict.footer.tagline}</p>
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          <Link href="/about/" className="pixel-link text-sm">
            {dict.footer.about}
          </Link>
          <Link href="/contact/" className="pixel-link text-sm">
            {dict.footer.contact}
          </Link>
          <Link href="/privacy/" className="pixel-link text-sm">
            {dict.footer.privacy}
          </Link>
          <Link href="/terms/" className="pixel-link text-sm">
            {dict.footer.terms}
          </Link>
          <Link href="/blog/" className="pixel-link text-sm">
            {dict.footer.blog}
          </Link>
          <ConsentSettingsButton label={dict.consent.settings} />
        </nav>
        <p className="font-pixel text-[10px] text-ink">
          © {new Date().getFullYear()} {dict.siteName}
        </p>
        <p className="font-terminal text-sm text-muted">
          {dict.footer.lastUpdated}: {CONTENT_UPDATED}
        </p>
        <a
          href="https://www.producthunt.com/products/circlegen?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-circlegen"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            alt="CircleGen - Pixel-perfect Minecraft circle blueprints in 11 languages | Product Hunt"
            width="250"
            height="54"
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1225644&theme=dark&t=1787038210094"
          />
        </a>
        <p className="text-xs text-muted">
          {dict.footer.feedback}{" "}
          <a href={`mailto:${SITE_EMAIL}`} className="pixel-link">
            {SITE_EMAIL}
          </a>
        </p>
      </div>
    </footer>
  );
}
