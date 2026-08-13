import SeoShell from "@/app/_seo/shell";
import Localized404 from "@/components/Localized404";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/locales";

export default async function NotFound() {
  const dict = await getDictionary(defaultLocale);
  return (
    <SeoShell dict={dict} locale={defaultLocale}>
      <Localized404 />
    </SeoShell>
  );
}
