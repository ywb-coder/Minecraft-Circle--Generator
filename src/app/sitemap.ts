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

const blogImages: Record<string, string> = {
  blog: "/og-image.webp",
  "blog/minecraft-circle-guide": "/shape-pngs/circle-15.webp",
  "blog/minecraft-circle-sizes": "/shape-pngs/circle-21.webp",
  "blog/minecraft-sphere-guide": "/shape-pngs/circle-21.webp",
  "blog/minecraft-dome-guide": "/shape-pngs/circle-31.webp",
  "blog/minecraft-oval-guide": "/shape-pngs/oval-21-9.webp",
  "blog/minecraft-tower-guide": "/shape-pngs/circle-21.webp",
};

const trustEntries: MetadataRoute.Sitemap = [
  "about",
  "contact",
  "privacy",
  "terms",
  "blog",
  "blog/minecraft-circle-guide",
  "blog/minecraft-circle-sizes",
  "blog/minecraft-sphere-guide",
  "blog/minecraft-dome-guide",
  "blog/minecraft-oval-guide",
  "blog/minecraft-tower-guide",
].map((page) => ({
  url: localizedUrl(`/${page}`, "en"),
  changeFrequency: "monthly",
  priority: 0.4,
  ...(blogImages[page]
    ? { images: [`${SITE_URL}${blogImages[page]}`] }
    : {}),
}));

const esBlogImages: Record<string, string> = {
  "/es/blog": "/og-image.webp",
  "/es/blog/como-hacer-circulos-minecraft": "/shape-pngs/circle-15.webp",
  "/es/blog/como-hacer-esfera-minecraft": "/shape-pngs/circle-21.webp",
  "/es/blog/medidas-circulos-minecraft": "/shape-pngs/circle-101.webp",
  "/es/blog/como-hacer-ovalo-minecraft": "/shape-pngs/oval-21-9.webp",
  "/es/blog/como-hacer-cupula-minecraft": "/shape-pngs/circle-31.webp",
  "/es/blog/como-hacer-torre-minecraft": "/shape-pngs/circle-21.webp",
};

const esBlogEntries: MetadataRoute.Sitemap = [
  "/es/blog",
  "/es/blog/como-hacer-circulos-minecraft",
  "/es/blog/como-hacer-esfera-minecraft",
  "/es/blog/medidas-circulos-minecraft",
  "/es/blog/como-hacer-ovalo-minecraft",
  "/es/blog/como-hacer-cupula-minecraft",
  "/es/blog/como-hacer-torre-minecraft",
].map((path) => ({
  url: localizedUrl(path, "en"),
  changeFrequency: "monthly",
  priority: 0.5,
  ...(esBlogImages[path]
    ? { images: [`${SITE_URL}${esBlogImages[path]}`] }
    : {}),
}));

function blogHreflang(slug: BlogSlug): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of BLOG_PUBLISHED_LOCALES) {
    map[l] = `${SITE_URL}${blogPath(l, slug)}`;
  }
  map["x-default"] = `${SITE_URL}/blog/${slug}/`;
  return map;
}

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
    url: `${SITE_URL}/${locale}/blog/`,
    changeFrequency: "monthly",
    priority: 0.4,
    alternates: {
      languages: {
        en: `${SITE_URL}/blog/`,
        es: `${SITE_URL}/es/blog/`,
        de: `${SITE_URL}/de/blog/`,
        fr: `${SITE_URL}/fr/blog/`,
        pt: `${SITE_URL}/pt/blog/`,
        ru: `${SITE_URL}/ru/blog/`,
        "x-default": `${SITE_URL}/blog/`,
      },
    },
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...homeEntries,
    ...shapeEntries,
    ...trustEntries,
    ...esBlogEntries,
    ...newBlogEntries,
  ];
}
