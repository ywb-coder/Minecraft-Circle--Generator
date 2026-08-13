import type { Locale } from "./locales";

export interface Dictionary {
  siteName: string;
  tagline: string;
  nav: {
    tool: string;
    about: string;
    faq: string;
  };
  hero: {
    title: string;
    subtitle: string;
  };
  home: {
    answerTitle: string;
    answer1: string;
    answer2: string;
    sourcesTitle: string;
    sourcesIntro: string;
    howToTitle: string;
    howTo: string[];
  };
  tool: {
    diameter: string;
    width: string;
    height: string;
    shape: string;
    style: string;
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
    sizeUse: string;
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
    permLink: string;
    exportPng: string;
    shareUrl: string;
    sizeGuide: string;
    generate: string;
    copied: string;
    invalidSize: string;
    torus: string;
    ellipsoid: string;
    thickness: string;
    inner: string;
    tube: string;
    worldCoords: string;
    centerX: string;
    centerY: string;
    centerZ: string;
    builder: string;
    next: string;
    prev: string;
    showCoords: string;
    rowCounts: string;
    fullscreen: string;
    setblock: string;
    allLayers: string;
    presets: string;
    depth: string;
  };
  sizeGuide: {
    title: string;
    entries: { size: string; use: string }[];
  };
  perSize: {
    title: string;
    titleEllipsoid: string;
    desc: string;
    blocks: string;
    layer: string;
    openTool: string;
    related: string;
    otherShapes: string;
    keyFacts: string;
    factDiameter: string;
    factBlocks: string;
    factLayers: string;
    factHeight: string;
    definition: string;
    howToTitle: string;
    steps: string[];
    usageTitle: string;
    usageIntro: string;
    faqQ1: string;
    faqA1: string;
    faqQ2: string;
    faqA2: string;
    faqQ3: string;
    faqA3: string;
    setblockTitle: string;
    setblockBody: string;
    thicknessTip: string;
    innerTip: string;
    builderTip: string;
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
  footer: {
    tagline: string;
    lastUpdated: string;
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
