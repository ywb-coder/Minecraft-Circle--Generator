import type { MetadataRoute } from "next";

export const dynamic = "force-static";

import { HREFLANG_LOCALES } from "@/lib/config";
import {
  circleDiameters,
  domeDiameters,
  hreflangMap,
  localizedUrl,
  OVAL_PAIRS,
  sphereDiameters,
} from "@/lib/seo";

const homeEntries: MetadataRoute.Sitemap = HREFLANG_LOCALES.map((locale) => ({
  url: localizedUrl("/", locale),
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 1,
  alternates: { languages: hreflangMap("/") },
}));

const shapeEntries: MetadataRoute.Sitemap = [];

for (const locale of HREFLANG_LOCALES) {
  for (const d of circleDiameters) {
    const path = `/circle/${d}`;
    shapeEntries.push({
      url: localizedUrl(path, locale),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: hreflangMap(path) },
    });
  }
  for (const d of sphereDiameters) {
    const path = `/sphere/${d}`;
    shapeEntries.push({
      url: localizedUrl(path, locale),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: hreflangMap(path) },
    });
  }
  for (const d of domeDiameters) {
    const path = `/dome/${d}`;
    shapeEntries.push({
      url: localizedUrl(path, locale),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: hreflangMap(path) },
    });
  }
  for (const [w, h] of OVAL_PAIRS) {
    const path = `/oval/${w}/${h}`;
    shapeEntries.push({
      url: localizedUrl(path, locale),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: hreflangMap(path) },
    });
  }
}

const trustEntries: MetadataRoute.Sitemap = ["about", "contact", "privacy", "terms"].map(
  (page) => ({
    url: localizedUrl(`/${page}`, "en"),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.4,
  })
);

export default function sitemap(): MetadataRoute.Sitemap {
  return [...homeEntries, ...shapeEntries, ...trustEntries];
}
