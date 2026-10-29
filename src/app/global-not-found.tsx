import RootDocument from "@/app/_seo/root-document";
import SeoShell from "@/app/_seo/shell";
import Localized404 from "@/components/Localized404";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/locales";
import "@/app/globals.css";

/**
 * App-wide 404 page.
 *
 * The site uses multiple root layouts (one per route group), so the 404 page
 * has to bring its own document shell instead of relying on a shared parent
 * layout.
 */
export default async function GlobalNotFound() {
  const dict = await getDictionary(defaultLocale);
  return (
    <RootDocument lang={defaultLocale}>
      <SeoShell dict={dict} locale={defaultLocale}>
        <Localized404 />
      </SeoShell>
    </RootDocument>
  );
}
