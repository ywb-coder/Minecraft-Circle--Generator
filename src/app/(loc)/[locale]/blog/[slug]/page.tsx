import type { Metadata } from "next";
import Link from "@/components/StaticLink";
import ArticleMeta from "@/components/ArticleMeta";
import SeoShell from "@/app/_seo/shell";
import ArticleJsonLd from "@/app/_seo/article-jsonld";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isLocale, type Locale } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/config";
import {
  BLOG_CONTENT,
  BLOG_SLUGS,
  blogHreflang,
  blogPath,
  isBlogContentLocale,
  type BlogSlug,
} from "@/lib/blog-content";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const out: { locale: string; slug: string }[] = [];
  for (const locale of ["de", "fr", "pt", "ru"] as const) {
    for (const slug of BLOG_SLUGS) out.push({ locale, slug });
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isBlogContentLocale(locale)) return {};
  const loc = locale;
  const post = BLOG_CONTENT[loc]?.[slug as BlogSlug];
  if (!post) return {};
  const languages = blogHreflang(slug as BlogSlug);
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${SITE_URL}${blogPath(loc, slug as BlogSlug)}`,
      languages,
    },
  };
}

export default async function LocaleBlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isBlogContentLocale(locale)) return null;
  const loc = locale;
  const post = BLOG_CONTENT[loc]?.[slug as BlogSlug];
  if (!post) notFound();
  const dict = await getDictionary(loc);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <SeoShell dict={dict} locale={loc}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        path={`/${loc}/blog/${slug}/`}
        locale={loc}
        images={[post.image]}
        published={post.published}
        updated={post.updated}
      />
      <div className="mx-auto max-w-3xl">
        <h1 className="pixel-shadow font-pixel text-lg text-ink sm:text-xl">
          {post.title}
        </h1>
        <ArticleMeta published={post.published} updated={post.updated} />

        <section className="mc-panel pixel-corners mt-8 p-5">
          <div className="flex gap-4">
            <div className="shrink-0 border-2 border-mc-border bg-panel-2">
              <img
                src={post.image}
                alt={post.title}
                width={461}
                height={461}
                loading="lazy"
                className="h-24 w-24 [image-rendering:pixelated]"
              />
            </div>
            <p className="text-sm leading-7 text-muted">{post.description}</p>
          </div>
        </section>

        {post.sections.map((section, i) => (
          <section key={i} className="mt-8">
            <h2 className="font-pixel text-sm text-ink pixel-shadow">
              {section.h2}
            </h2>
            {section.body.map((para, j) => (
              <p key={j} className="mt-3 text-sm leading-7 text-muted">
                {para}
              </p>
            ))}
          </section>
        ))}

        <section className="mt-10">
          <h2 className="font-pixel text-sm text-ink pixel-shadow">
            FAQ
          </h2>
          <div className="mt-4 flex flex-col gap-6">
            {post.faqs.map((f, i) => (
              <div key={i}>
                <h3 className="font-pixel text-[10px] leading-relaxed text-cyan">
                  {f.q}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SeoShell>
  );
}
