import { SITE_URL, HREFLANG_LOCALES, HREFLANG_MAP } from "./config";
import { defaultLocale } from "./i18n/locales";

export const BLOG_SLUGS = [
  "how-to-build-a-circle-in-minecraft",
  "minecraft-circle-chart-explained",
  "how-to-build-a-sphere-in-minecraft",
  "how-to-build-a-dome-in-minecraft",
  "how-to-build-an-oval-in-minecraft",
  "best-minecraft-fountain-designs",
  "how-to-build-a-minecraft-tower",
  "minecraft-stadium-build-guide",
  "minecraft-cherry-blossom-house-designs",
  "minecraft-japanese-tea-house-design",
  "how-to-build-a-minecraft-castle",
  "minecraft-garden-designs-with-circles",
  "how-to-build-a-circular-pool",
  "minecraft-pixel-art-techniques",
  "minecraft-mega-build-ideas",
] as const;

export const OVAL_PAIRS = [
  [15, 7],
  [21, 9],
  [25, 13],
  [31, 15],
  [35, 17],
  [41, 21],
  [51, 25],
  [61, 31],
  [71, 35],
  [81, 41],
  [101, 51],
  [121, 61],
] as const;

function range(min: number, max: number): number[] {
  const values: number[] = [];
  for (let n = min; n <= max; n++) values.push(n);
  return values;
}

export const circleDiameters = range(5, 256);
export const sphereDiameters = range(5, 128);
export const domeDiameters = range(5, 128);

export function parsePositiveInt(value: string | undefined): number | null {
  if (value === undefined || !/^\d+$/.test(value)) return null;
  const n = Number.parseInt(value, 10);
  return Number.isSafeInteger(n) && n > 0 ? n : null;
}

export function isOvalPair(w: number, h: number): boolean {
  return OVAL_PAIRS.some(([pw, ph]) => pw === w && ph === h);
}

export function nearestOvalPair(d: number): (typeof OVAL_PAIRS)[number] {
  let best: (typeof OVAL_PAIRS)[number] = OVAL_PAIRS[0];
  let bestScore = Infinity;
  for (const pair of OVAL_PAIRS) {
    const score =
      Math.abs(pair[0] - d) + Math.abs(pair[1] - Math.floor(d / 2));
    if (score < bestScore) {
      bestScore = score;
      best = pair;
    }
  }
  return best;
}

export function localizePath(path: string, locale: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  const withSlash = p.endsWith("/") ? p : `${p}/`;
  return locale === defaultLocale ? withSlash : `/${locale}${withSlash}`;
}

export function localizedUrl(path: string, locale: string): string {
  return `${SITE_URL}${localizePath(path, locale)}`;
}

export function hreflangMap(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of HREFLANG_LOCALES) {
    languages[HREFLANG_MAP[locale]] = localizedUrl(path, locale);
  }
  return languages;
}
