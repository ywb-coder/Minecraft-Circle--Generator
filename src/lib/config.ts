/**
 * Site-wide configuration.
 *
 * IMPORTANT: set NEXT_PUBLIC_SITE_URL to the final domain before deploying.
 * It is used for canonical URLs, hreflang alternates and JSON-LD.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://minecraftcirclegenerator.vercel.app";

export const SITE_NAME = "CircleGen";
export const DEFAULT_LOCALE = "en";

/** All locales with their hreflang code. */
export const HREFLANG_LOCALES = [
  "en",
  "de",
  "es",
  "fr",
  "pt",
  "tr",
  "it",
  "ru",
  "pl",
  "id",
  "zh",
] as const;

export const GITHUB_URL =
  "https://github.com/ywb-coder/Minecraft-Circle--Generator";
export const LAUNCH_DATE = "2026-01-01";

export interface Source {
  name: string;
  url: string;
}

export const SOURCES: Source[] = [
  {
    name: "Wikipedia — Midpoint circle algorithm",
    url: "https://en.wikipedia.org/wiki/Midpoint_circle_algorithm",
  },
  {
    name: "Minecraft Wiki — Building",
    url: "https://minecraft.wiki/w/Building",
  },
  {
    name: "Minecraft.net — Official website",
    url: "https://www.minecraft.net/",
  },
];

/** Build date, baked into the static HTML at build time. */
export function buildDate(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Locale -> hreflang attribute value. */
export const HREFLANG_MAP: Record<string, string> = {
  en: "en",
  de: "de",
  es: "es",
  fr: "fr",
  pt: "pt",
  tr: "tr",
  it: "it",
  ru: "ru",
  pl: "pl",
  id: "id",
  zh: "zh-CN",
};
