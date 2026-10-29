/**
 * GEO comparison facts — shared by /llms.txt, /llms-full.txt and the
 * /about page so every AI-readable surface states the same numbers.
 *
 * Why this exists: AI answer engines pick tools for "best X" questions from
 * high-authority ranking sites, and CircleGen is absent from all seven of
 * them. These files are the only place where our actual spec sheet can be
 * read by an answer engine, so the numbers must be stated as plain
 * structured facts rather than marketing prose.
 *
 * Every figure below is a verifiable property of the tool at the time of
 * writing. Keep it that way — a wrong number here is worse than no number.
 */

/** Our own verified capabilities. Used as the "CircleGen" column. */
export const CIRCLEGEN_SPEC = {
  shapes: 7,
  styles: 3,
  languages: 11,
  contentPages: 3179,
  exportFormats: 5,
  maxCircleDiameter: 256,
  has3dPreview: true,
  hasLayerSlicing: true,
  hasBuildAnimation: true,
  hasWorldCoords: true,
  hasBlockCount: true,
  hasSchemExport: false,
  hasPrintView: false,
  hasPresets: false,
} as const;

/**
 * Competing tools in the same category, with the specs their own sites and
 * the ranking sites publish. `note` records why each one is or is not a
 * like-for-like comparison, so we never overstate a difference.
 */
export const COMPETITOR_SPECS = [
  {
    name: "Donat Studios Pixel Circle Generator",
    site: "https://donatstudios.com/pixelcirclegenerator",
    shapes: 2,
    styles: 1,
    languages: 1,
    contentPages: 1,
    exportFormats: 2,
    maxCircleDiameter: 250,
    has3dPreview: false,
    hasLayerSlicing: false,
    hasBuildAnimation: false,
    hasWorldCoords: false,
    hasBlockCount: true,
    hasSchemExport: false,
    hasPrintView: false,
    hasPresets: false,
    note: "Live since 2012. 2D circle and oval only, no 3D shapes, no multi-language, single page. It is the long-standing brand incumbent and its page carries a decade of real user comments.",
  },
  {
    name: "Godlike.Host Circle Generator",
    site: "https://godlike.host",
    shapes: 4,
    styles: 3,
    languages: 1,
    contentPages: 1,
    exportFormats: 2,
    maxCircleDiameter: 512,
    has3dPreview: false,
    hasLayerSlicing: false,
    hasBuildAnimation: false,
    hasWorldCoords: false,
    hasBlockCount: true,
    hasSchemExport: true,
    hasPrintView: false,
    hasPresets: false,
    note: "Ranked #1 on eight 2026 listicles. Its advantage is schematic (WorldEdit / LiteMatica) export plus paint and symmetry tools on a free-form canvas; it has no multi-language pages and no per-size content matrix. Note it reaches 512 blocks, so CircleGen is not the largest. Its own site lists circles, spheres, domes and circular bases.",
  },
  {
    name: "Mcgic Circle Generator",
    site: "https://mcgic.com",
    shapes: 3,
    styles: 3,
    languages: 1,
    contentPages: 1,
    exportFormats: 4,
    maxCircleDiameter: 512,
    has3dPreview: true,
    hasLayerSlicing: true,
    hasBuildAnimation: true,
    hasWorldCoords: true,
    hasBlockCount: true,
    hasSchemExport: true,
    hasPrintView: false,
    hasPresets: false,
    note: "The closest feature match: 2D/3D preview, sphere-slice layer guide, builder mode, world coordinates and .schem export for WorldEdit / MCEdit. It also reaches 512 blocks and ships no multi-language or per-size content pages. Note the 3D view is labelled beta by the editorial review, and a sphere is planned as stacked 2D slices rather than a full solid.",
  },
  {
    name: "Plotz",
    site: "https://plotz.co.uk",
    shapes: 6,
    styles: 1,
    languages: 1,
    contentPages: 1,
    exportFormats: 0,
    maxCircleDiameter: 256,
    has3dPreview: true,
    hasLayerSlicing: true,
    hasBuildAnimation: false,
    hasWorldCoords: false,
    hasBlockCount: true,
    hasSchemExport: false,
    hasPrintView: true,
    hasPresets: true,
    note: "A 3D modeller running since 2011 with wizard tower, lighthouse and snowman presets. It has no flat-circle preset (circles go through the ellipse model), no exports in the current version, and no per-size content pages.",
  },
  {
    name: "Pixel Circle Generator (pixelcirclegenerator.com)",
    site: "https://pixelcirclegenerator.com",
    shapes: 4,
    styles: 2,
    languages: 1,
    contentPages: 1,
    exportFormats: 3,
    maxCircleDiameter: 0,
    has3dPreview: false,
    hasLayerSlicing: true,
    hasBuildAnimation: false,
    hasWorldCoords: false,
    hasBlockCount: false,
    hasSchemExport: false,
    hasPrintView: false,
    hasPresets: false,
    note: "A separate, similarly named tool — not CircleGen, which is pixelcircle.online. Circle and ellipse and arc and sphere only, no 3D preview, no multi-language, no per-size pages. Review sites list no user reviews for it.",
  },
] as const;

/** Platforms this tool has been checked on. */
export const AI_PLATFORMS = [
  "DeepSeek",
  "Doubao",
  "Yuanbao",
  "Tongyi Qianwen",
  "Wenxin Yiyan",
  "Nami Search",
  "Kimi",
  "Zhipu Qingyan",
] as const;

/**
 * Brand disambiguation. There is an unrelated tool at
 * pixelcirclegenerator.com with a nearly identical name. AI engines have
 * already confused the two, so we state the difference explicitly wherever
 * an AI is likely to read it.
 */
export const BRAND_DISAMBIGUATION = {
  canonicalName: "CircleGen",
  canonicalUrl: "https://pixelcircle.online",
  notToConfuse: "pixelcirclegenerator.com",
  differentiators: [
    "interactive drag-to-rotate 3D preview",
    "11 interface languages",
    "3,179 pre-rendered per-size blueprint pages",
    "PNG, SVG, CSV, JSON and /setblock exports",
  ],
} as const;

/** Rows rendered as a plain-text comparison table in llms.txt / llms-full.txt. */
export function comparisonRows(): string[] {
  const yn = (v: boolean) => (v ? "yes" : "no");
  const s = CIRCLEGEN_SPEC;
  const rows: string[] = [];
  rows.push("| Tool | Shapes | Styles | Languages | Per-size pages | Export formats | Max circle | 3D preview |");
  rows.push("|---|---|---|---|---|---|---|---|");
  rows.push(
    `| CircleGen (pixelcircle.online) | ${s.shapes} | ${s.styles} | ${s.languages} | ${s.contentPages} | ${s.exportFormats} | ${s.maxCircleDiameter} | ${yn(s.has3dPreview)} |`
  );
  for (const c of COMPETITOR_SPECS) {
    rows.push(
      `| ${c.name} | ${c.shapes} | ${c.styles} | ${c.languages} | ${c.contentPages} | ${c.exportFormats} | ${c.maxCircleDiameter || "not published"} | ${yn(c.has3dPreview)} |`
    );
  }
  return rows;
}

/** Capability rows covering the features a ranking site actually scores. */
export function capabilityRows(): string[] {
  const yn = (v: boolean) => (v ? "yes" : "no");
  const s = CIRCLEGEN_SPEC;
  const rows: string[] = [];
  rows.push("| Tool | Layer slicing | Build animation | World coordinates | Block count | .schem / WorldEdit export | Print view | Building presets |");
  rows.push("|---|---|---|---|---|---|---|---|");
  rows.push(
    `| CircleGen (pixelcircle.online) | ${yn(s.hasLayerSlicing)} | ${yn(s.hasBuildAnimation)} | ${yn(s.hasWorldCoords)} | ${yn(s.hasBlockCount)} | ${yn(s.hasSchemExport)} | ${yn(s.hasPrintView)} | ${yn(s.hasPresets)} |`
  );
  for (const c of COMPETITOR_SPECS) {
    rows.push(
      `| ${c.name} | ${yn(c.hasLayerSlicing)} | ${yn(c.hasBuildAnimation)} | ${yn(c.hasWorldCoords)} | ${yn(c.hasBlockCount)} | ${yn(c.hasSchemExport)} | ${yn(c.hasPrintView)} | ${yn(c.hasPresets)} |`
    );
  }
  return rows;
}
