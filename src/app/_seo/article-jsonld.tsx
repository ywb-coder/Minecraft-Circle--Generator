import { SITE_URL } from "@/lib/config";

type ArticleLocale = "en" | "es";

function absoluteImage(image: string): string {
  if (/^https?:\/\//i.test(image)) return image;
  return `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;
}

function serialize(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default function ArticleJsonLd({
  title,
  description,
  path,
  locale,
  images,
  published,
  updated,
}: {
  title: string;
  description: string;
  path: string;
  locale: ArticleLocale;
  images: string[];
  published: string;
  updated: string;
}) {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const homeUrl = `${SITE_URL}${locale === "es" ? "/es/" : "/"}`;
  const blogUrl = `${SITE_URL}${locale === "es" ? "/es/blog/" : "/blog/"}`;
  const authorUrl = `${SITE_URL}/about/`;

  const article = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: images.map(absoluteImage),
    datePublished: published,
    dateModified: updated,
    author: {
      "@type": "Organization",
      name: "CircleGen",
      url: authorUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "CircleGen",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/android-chrome-512x512.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    inLanguage: locale,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "es" ? "Inicio" : "Home",
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: blogUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serialize(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serialize(breadcrumb) }}
      />
    </>
  );
}
