export const locales = ["en", "de", "es", "fr", "pt", "tr", "it", "ru", "pl", "id", "zh"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Locales served at subpaths (the default locale lives at the root `/`). */
export const subpathLocales: Locale[] = locales.filter((l) => l !== defaultLocale);

export const localeNames: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  es: "Español",
  fr: "Français",
  pt: "Português",
  tr: "Türkçe",
  it: "Italiano",
  ru: "Русский",
  pl: "Polski",
  id: "Bahasa Indonesia",
  zh: "中文",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
