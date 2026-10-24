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

function shapeImage(path: string): string {
  return `${SITE_URL}/shape-pngs/${path.slice(1).replace(/\//g, "-")}.png`;
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
  images: [`${SITE_URL}/og-image.png`],
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
  blog: "/og-image.png",
  "blog/minecraft-circle-guide": "/shape-pngs/circle-15.png",
  "blog/minecraft-circle-sizes": "/shape-pngs/circle-21.png",
  "blog/minecraft-sphere-guide": "/shape-pngs/circle-21.png",
  "blog/minecraft-dome-guide": "/shape-pngs/circle-31.png",
  "blog/minecraft-oval-guide": "/shape-pngs/oval-21-9.png",
  "blog/minecraft-tower-guide": "/shape-pngs/circle-21.png",
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
  "/es/blog": "/og-image.png",
  "/es/blog/como-hacer-circulos-minecraft": "/shape-pngs/circle-15.png",
  "/es/blog/como-hacer-esfera-minecraft": "/shape-pngs/circle-21.png",
  "/es/blog/medidas-circulos-minecraft": "/shape-pngs/circle-101.png",
  "/es/blog/como-hacer-ovalo-minecraft": "/shape-pngs/oval-21-9.png",
};

const esBlogEntries: MetadataRoute.Sitemap = [
  "/es/blog",
  "/es/blog/como-hacer-circulos-minecraft",
  "/es/blog/como-hacer-esfera-minecraft",
  "/es/blog/medidas-circulos-minecraft",
  "/es/blog/como-hacer-ovalo-minecraft",
].map((path) => ({
  url: localizedUrl(path, "en"),
  changeFrequency: "monthly",
  priority: 0.5,
  ...(esBlogImages[path]
    ? { images: [`${SITE_URL}${esBlogImages[path]}`] }
    : {}),
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [...homeEntries, ...shapeEntries, ...trustEntries, ...esBlogEntries];
}
