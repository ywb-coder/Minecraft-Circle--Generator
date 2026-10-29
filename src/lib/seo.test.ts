import { describe, expect, it } from "vitest";
import sitemap from "../app/sitemap";
import {
  hreflangMap,
  INDEXABLE_SHAPE_PATHS,
  isIndexableShapePath,
} from "./seo";
import { HREFLANG_LOCALES, SITE_URL } from "./config";

const SHAPE_PREFIXES = [
  "/circle/",
  "/sphere/",
  "/dome/",
  "/oval/",
  "/torus/",
  "/ellipsoid/",
];

function isShapeUrl(url: string): boolean {
  const pathname = new URL(url).pathname;
  return SHAPE_PREFIXES.some((prefix) => pathname.includes(prefix));
}

function stripLocaleAndSlash(pathname: string): string {
  const withoutTrailing = pathname.replace(/\/$/, "");
  const localePrefix = new RegExp(
    `^/(${HREFLANG_LOCALES.join("|")})/`
  );
  return withoutTrailing.replace(localePrefix, "/");
}

describe("hreflangMap", () => {
  it("uses the localized shape URL for x-default", () => {
    expect(hreflangMap("/circle/15")["x-default"]).toBe(
      "https://pixelcircle.online/circle/15/"
    );
  });
});

describe("isIndexableShapePath", () => {
  it("accepts indexable shape paths", () => {
    expect(isIndexableShapePath("/circle/15")).toBe(true);
    expect(isIndexableShapePath("/circle/15/")).toBe(true);
    expect(isIndexableShapePath("circle/15")).toBe(true);
  });

  it("rejects non-indexable shape paths", () => {
    expect(isIndexableShapePath("/circle/14")).toBe(false);
    expect(isIndexableShapePath("/sphere/33")).toBe(false);
  });
});

describe("sitemap", () => {
  const entries = sitemap();
  const shapeUrls = entries.filter((entry) => isShapeUrl(entry.url));
  const uniqueShapePaths = new Set(
    shapeUrls.map((entry) => stripLocaleAndSlash(new URL(entry.url).pathname))
  );

  it("contains only the 29 indexable shape paths", () => {
    expect(uniqueShapePaths.size).toBe(INDEXABLE_SHAPE_PATHS.size);
    expect([...uniqueShapePaths].sort()).toEqual(
      [...INDEXABLE_SHAPE_PATHS].sort()
    );
  });

  it("excludes non-indexable shape pages", () => {
    expect(entries.some((entry) => entry.url.includes("/circle/14/"))).toBe(
      false
    );
    expect(entries.some((entry) => entry.url.includes("/sphere/33/"))).toBe(
      false
    );
  });

  it("has 376 entries", () => {
    expect(entries).toHaveLength(376);
    expect(shapeUrls).toHaveLength(INDEXABLE_SHAPE_PATHS.size * HREFLANG_LOCALES.length);
    expect(entries.every((entry) => entry.url.startsWith(SITE_URL))).toBe(true);

    // multi-language blog expansion (de/fr/pt/ru added in this pass)
    for (const locale of ["de", "fr", "pt", "ru"]) {
      for (const slug of [
        "minecraft-circle-guide",
        "minecraft-circle-sizes",
        "minecraft-sphere-guide",
        "minecraft-dome-guide",
        "minecraft-oval-guide",
        "minecraft-tower-guide",
      ]) {
        expect(
          entries.some((e) => e.url === `${SITE_URL}/${locale}/blog/${slug}/`)
        ).toBe(true);
      }
    }

    const paths = new Set(entries.map((entry) => new URL(entry.url).pathname));
    for (const path of [
      "/blog/minecraft-sphere-guide/",
      "/blog/minecraft-dome-guide/",
      "/blog/minecraft-oval-guide/",
      "/blog/minecraft-tower-guide/",
      "/es/blog/como-hacer-esfera-minecraft/",
      "/es/blog/medidas-circulos-minecraft/",
      "/es/blog/como-hacer-ovalo-minecraft/",
    ]) {
      expect(paths.has(path)).toBe(true);
    }
  });
});
