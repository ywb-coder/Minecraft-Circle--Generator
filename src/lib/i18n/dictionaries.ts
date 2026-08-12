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
    outline: string;
    chart: string;
    filled: string;
    block: string;
    blockColors: string;
    angleStart: string;
    angleSpan: string;
    preview: string;
    blueprint: string;
    buildOrder: string;
    speed: string;
    layer: string;
    blocksCount: string;
    copyBlocks: string;
    copyLink: string;
    exportPng: string;
    shareUrl: string;
    sizeGuide: string;
    generate: string;
    copied: string;
    invalidSize: string;
  };
  sizeGuide: {
    title: string;
    entries: { size: string; use: string }[];
  };
  perSize: {
    title: string;
    desc: string;
    blocks: string;
    layer: string;
    openTool: string;
    related: string;
    otherShapes: string;
  };
  blog: {
    title: string;
    readMore: string;
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
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
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  de: () => import("./dictionaries/de.json").then((m) => m.default),
  es: () => import("./dictionaries/es.json").then((m) => m.default),
  fr: () => import("./dictionaries/fr.json").then((m) => m.default),
  pt: () => import("./dictionaries/pt.json").then((m) => m.default),
  tr: () => import("./dictionaries/tr.json").then((m) => m.default),
  it: () => import("./dictionaries/it.json").then((m) => m.default),
  ru: () => import("./dictionaries/ru.json").then((m) => m.default),
  pl: () => import("./dictionaries/pl.json").then((m) => m.default),
  id: () => import("./dictionaries/id.json").then((m) => m.default),
  zh: () => import("./dictionaries/zh.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
