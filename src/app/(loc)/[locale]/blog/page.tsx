import type { Metadata } from "next";
import Link from "@/components/StaticLink";
import SeoShell from "@/app/_seo/shell";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/config";
import {
  BLOG_CONTENT,
  BLOG_SLUGS,
  BLOG_INDEX_META,
  blogIndexHreflang,
  blogPath,
  isBlogContentLocale,
  type BlogSlug,
} from "@/lib/blog-content";

const GUIDES_LABEL: Record<Locale, string> = {
  de: "Bauanleitungen",
  fr: "Guides de construction",
  pt: "Guias de construção",
  ru: "Руководства",
  en: "Building Guides",
  es: "Guías de construcción",
  it: "Guide",
  tr: "Rehberler",
  pl: "Poradniki",
  id: "Panduan",
  zh: "建造指南",
};

export function generateStaticParams() {
  return (["de", "fr", "pt", "ru"] as const).map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale) || !isBlogContentLocale(locale)) return {};
  const loc = locale;
  const meta = BLOG_INDEX_META[loc];
  const languages = blogIndexHreflang();
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `${SITE_URL}/${loc}/blog/`,
      languages,
    },
  };
}

export default async function LocaleBlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || !isBlogContentLocale(locale)) return null;
  const loc = locale;
  const dict = await getDictionary(loc);
  const posts = BLOG_SLUGS.map((slug) => BLOG_CONTENT[loc][slug]).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );
  return (
    <SeoShell dict={dict} locale={loc}>
      <div className="mx-auto max-w-3xl">
        <h1 className="pixel-shadow font-pixel text-lg text-ink sm:text-xl">
          {BLOG_INDEX_META[loc].title}
        </h1>

        <section className="mc-panel pixel-corners mt-8 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            {GUIDES_LABEL[loc]}
          </h2>
          <div className="mt-3 space-y-4">
            {posts.map((post) => (
              <div key={post.slug} className="flex gap-4">
                <div className="shrink-0 border-2 border-mc-border bg-panel-2">
                  <img
                    src={post.image}
                    alt={post.title}
                    width={461}
                    height={461}
                    loading="lazy"
                    className="h-20 w-20 [image-rendering:pixelated]"
                  />
                </div>
                <div>
                  <Link
                    href={blogPath(loc, post.slug)}
                    className="pixel-link text-sm font-bold"
                  >
                    {post.title}
                  </Link>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    {post.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SeoShell>
  );
}
