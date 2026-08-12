import type { Locale } from "./locales";

export interface Dictionary {
  siteName: string;
  tagline: string;
  nav: {
    tool: string;
    blog: string;
    about: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  tool: {
    diameter: string;
    width: string;
    height: string;
    shape: string;
    circle: string;
    oval: string;
    sphere: string;
    dome: string;
    arc: string;
    preview: string;
    blueprint: string;
    copyBlocks: string;
    exportPng: string;
    shareUrl: string;
    sizeGuide: string;
    generate: string;
  };
  footer: {
    tagline: string;
  };
  meta: {
    title: string;
    description: string;
  };
}

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en.json"),
  de: () => import("./dictionaries/de.json"),
  es: () => import("./dictionaries/es.json"),
  fr: () => import("./dictionaries/fr.json"),
  pt: () => import("./dictionaries/pt.json"),
  tr: () => import("./dictionaries/tr.json"),
  it: () => import("./dictionaries/it.json"),
  ru: () => import("./dictionaries/ru.json"),
  pl: () => import("./dictionaries/pl.json"),
  id: () => import("./dictionaries/id.json"),
  zh: () => import("./dictionaries/zh.json"),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
