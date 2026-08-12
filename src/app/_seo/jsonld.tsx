import { SITE_URL, HREFLANG_MAP } from "@/lib/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/locales";
import { localizePath } from "@/lib/seo";

export default function SeoJsonLd({
  dict,
  locale,
  path,
  title,
  description,
}: {
  dict: Dictionary;
  locale: Locale;
  path: string;
  title: string;
  description: string;
}) {
  const url = `${SITE_URL}${localizePath(path, locale)}`;
  const homeUrl = `${SITE_URL}${localizePath("/", locale)}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: dict.siteName, item: homeUrl },
      { "@type": "ListItem", position: 2, name: title, item: url },
    ],
  };
  const webpage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
    inLanguage: HREFLANG_MAP[locale],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpage) }}
      />
    </>
  );
}
