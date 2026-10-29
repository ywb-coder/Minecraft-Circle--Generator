import type { MetadataRoute } from "next";

export const dynamic = "force-static";

import { HREFLANG_LOCALES, SITE_URL } from "../lib/config";
import { defaultLocale } from "../lib/i18n/locales";
import {
  circleDiameters,
  domeDiameters,
  ELLIPSOID_COMBOS,
  hreflangMap,
  isIndexableShapePath,
  localizedUrl,
  OVAL_PAIRS,
  sphereDiameters,
  TORUS_COMBOS,
} from "../lib/seo";
import {
  BLOG_SLUGS,
  BLOG_PUBLISHED_LOCALES,
  blogHreflang,
  blogIndexHreflang,
  blogIndexPath,
  blogPath,
  type BlogSlug,
} from "../lib/blog-content";

function shapeImage(path: string): string {
  return `${SITE_URL}/shape-pngs/${path.slice(1).replace(/\//g, "-")}.webp`;
}

function shapeEntry(
  path: string,
  locale: (typeof HREFLANG_LOCALES)[number]
): MetadataRoute.Sitemap[number] {
  return {
    url: localizedUrl(path, locale),
    changeFrequency: "monthly",
    priority: 0.8,
    alternates: { languages: hreflangMap(path) },
    ...(locale === defaultLocale ? { images: [shapeImage(path)] } : {}),
  };
}

const homeEntries: MetadataRoute.Sitemap = HREFLANG_LOCALES.map((locale) => ({
  url: localizedUrl("/", locale),
  changeFrequency: "weekly",
  priority: 1,
  images: [`${SITE_URL}/og-image.webp`],
  alternates: { languages: hreflangMap("/") },
}));

const shapeEntries: MetadataRoute.Sitemap = [];

for (const locale of HREFLANG_LOCALES) {
  for (const d of circleDiameters) {
    const path = `/circle/${d}`;
    if (!isIndexableShapePath(path)) continue;
    shapeEntries.push(shapeEntry(path, locale));
  }
  for (const d of sphereDiameters) {
    const path = `/sphere/${d}`;
    if (!isIndexableShapePath(path)) continue;
    shapeEntries.push(shapeEntry(path, locale));
  }
  for (const d of domeDiameters) {
    const path = `/dome/${d}`;
    if (!isIndexableShapePath(path)) continue;
    shapeEntries.push(shapeEntry(path, locale));
  }
  for (const [w, h] of OVAL_PAIRS) {
    const path = `/oval/${w}/${h}`;
    if (!isIndexableShapePath(path)) continue;
    shapeEntries.push(shapeEntry(path, locale));
  }
  for (const [d, t] of TORUS_COMBOS) {
    const path = `/torus/${d}/${t}`;
    if (!isIndexableShapePath(path)) continue;
    shapeEntries.push(shapeEntry(path, locale));
  }
  for (const [w, h, dp] of ELLIPSOID_COMBOS) {
    const path = `/ellipsoid/${w}/${h}/${dp}`;
    if (!isIndexableShapePath(path)) continue;
    shapeEntries.push(shapeEntry(path, locale));
  }
}

const trustEntries: MetadataRoute.Sitemap = [
  "about",
  "contact",
  "privacy",
  "terms",
].map((page) => ({
  url: localizedUrl(`/${page}`, "en"),
  changeFrequency: "monthly" as const,
  priority: 0.4,
}));

/** Thumbnail per guide, per language. */
const enBlogImage: Record<BlogSlug, string> = {
  "minecraft-circle-guide": "/shape-pngs/circle-15.webp",
  "minecraft-circle-sizes": "/shape-pngs/circle-21.webp",
  "minecraft-sphere-guide": "/shape-pngs/circle-21.webp",
  "minecraft-dome-guide": "/shape-pngs/circle-31.webp",
  "minecraft-oval-guide": "/shape-pngs/oval-21-9.webp",
  "minecraft-tower-guide": "/shape-pngs/circle-21.webp",
};

const esBlogImage: Record<BlogSlug, string> = {
  "minecraft-circle-guide": "/shape-pngs/circle-15.webp",
  "minecraft-circle-sizes": "/shape-pngs/circle-101.webp",
  "minecraft-sphere-guide": "/shape-pngs/circle-21.webp",
  "minecraft-dome-guide": "/shape-pngs/circle-31.webp",
  "minecraft-oval-guide": "/shape-pngs/oval-21-9.webp",
  "minecraft-tower-guide": "/shape-pngs/circle-21.webp",
};

/**
 * One blog entry (index or guide) with the full hreflang cluster, so every
 * language that publishes the guide points at the others.
 */
function blogEntry(
  path: string,
  image: string,
  slug: BlogSlug | null,
  priority: number
): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority,
    images: [`${SITE_URL}${image}`],
    alternates: {
      languages: slug ? blogHreflang(slug) : blogIndexHreflang(),
    },
  };
}

const enBlogEntries: MetadataRoute.Sitemap = [
  blogEntry("/blog/", "/og-image.webp", null, 0.4),
  ...BLOG_SLUGS.map((slug) =>
    blogEntry(`/blog/${slug}/`, enBlogImage[slug], slug, 0.4)
  ),
];

const esBlogEntries: MetadataRoute.Sitemap = [
  blogEntry("/es/blog/", "/og-image.webp", null, 0.5),
  ...BLOG_SLUGS.map((slug) =>
    blogEntry(blogPath("es", slug), esBlogImage[slug], slug, 0.5)
  ),
];

const newBlogEntries: MetadataRoute.Sitemap = [];
for (const locale of BLOG_PUBLISHED_LOCALES) {
  if (locale === "en" || locale === "es") continue;
  for (const slug of BLOG_SLUGS) {
    newBlogEntries.push({
      url: `${SITE_URL}${blogPath(locale, slug)}`,
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: { languages: blogHreflang(slug) },
    });
  }
  newBlogEntries.push({
    url: `${SITE_URL}${blogIndexPath(locale)}`,
    changeFrequency: "monthly",
    priority: 0.4,
    alternates: { languages: blogIndexHreflang() },
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...homeEntries,
    ...shapeEntries,
    ...trustEntries,
    ...enBlogEntries,
    ...esBlogEntries,
    ...newBlogEntries,
  ];
}
