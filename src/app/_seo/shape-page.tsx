import type { Metadata } from "next";
import Link from "@/components/StaticLink";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, type Locale } from "@/lib/i18n/locales";
import { interpolate } from "@/lib/i18n/format";
import { SITE_URL, HREFLANG_MAP } from "@/lib/config";
import { generateShape } from "@/lib/shapes";
import {
  ELLIPSOID_COMBOS,
  hreflangMap,
  isEllipsoidCombo,
  isOvalPair,
  isTorusCombo,
  localizePath,
  nearestOvalPair,
  OVAL_PAIRS,
  parsePositiveInt,
  TORUS_COMBOS,
} from "@/lib/seo";
import SeoShell from "./shell";
import { BlueprintGrid, LayerGrid } from "./blueprint";
import SizeGuide from "./sizeguide";
import SeoJsonLd from "./jsonld";

export type RouteShape =
  | "circle"
  | "sphere"
  | "dome"
  | "oval"
  | "torus"
  | "ellipsoid";

export type ShapePageInput = {
  type: RouteShape;
  locale: Locale;
  d?: string;
  w?: string;
  h?: string;
  t?: string;
  dp?: string;
};

const RANGES: Record<
  "circle" | "sphere" | "dome" | "torus" | "ellipsoid",
  { min: number; max: number }
> = {
  circle: { min: 5, max: 256 },
  sphere: { min: 5, max: 128 },
  dome: { min: 5, max: 128 },
  torus: { min: 15, max: 512 },
  ellipsoid: { min: 5, max: 256 },
};

const SHAPE_KEYS: Record<RouteShape, keyof Dictionary["tool"]> = {
  circle: "circle",
  sphere: "sphere",
  dome: "dome",
  oval: "oval",
  torus: "torus",
  ellipsoid: "ellipsoid",
};

type ResolvedParams =
  | {
      type: "circle" | "sphere" | "dome" | "oval";
      d: number;
      w: number;
      h: number;
      path: string;
    }
  | {
      type: "torus";
      d: number;
      w: number;
      h: number;
      t: number;
      path: string;
    }
  | {
      type: "ellipsoid";
      d: number;
      w: number;
      h: number;
      dp: number;
      path: string;
    };

function resolveParams(input: ShapePageInput): ResolvedParams | null {
  if (input.type === "oval") {
    const w = parsePositiveInt(input.w);
    const h = parsePositiveInt(input.h);
    if (w === null || h === null || !isOvalPair(w, h)) return null;
    return { type: input.type, d: w, w, h, path: `/oval/${w}/${h}` };
  }
  if (input.type === "torus") {
    const d = parsePositiveInt(input.d);
    const t = parsePositiveInt(input.t);
    const range = RANGES.torus;
    if (d === null || t === null || !isTorusCombo(d, t)) return null;
    if (d < range.min || d > range.max) return null;
    return { type: input.type, d, w: d, h: d, t, path: `/torus/${d}/${t}` };
  }
  if (input.type === "ellipsoid") {
    const w = parsePositiveInt(input.w);
    const h = parsePositiveInt(input.h);
    const dp = parsePositiveInt(input.dp);
    const range = RANGES.ellipsoid;
    if (
      w === null ||
      h === null ||
      dp === null ||
      !isEllipsoidCombo(w, h, dp)
    )
      return null;
    if (w < range.min || w > range.max) return null;
    return {
      type: input.type,
      d: w,
      w,
      h,
      dp,
      path: `/ellipsoid/${w}/${h}/${dp}`,
    };
  }
  const range = RANGES[input.type];
  const d = parsePositiveInt(input.d);
  if (d === null || d < range.min || d > range.max) return null;
  return { type: input.type, d, w: d, h: d, path: `/${input.type}/${d}` };
}

export async function shapePageMetadata(
  input: ShapePageInput
): Promise<Metadata> {
  const resolved = resolveParams(input);
  if (!resolved) return {};
  const dict = await getDictionary(input.locale);
  const shape = dict.tool[SHAPE_KEYS[input.type]];
  const { d, w, h } = resolved;
  const generated = generateShape(
    resolved.type === "oval"
      ? { type: resolved.type, w, h, style: "outline" }
      : resolved.type === "torus"
        ? { type: resolved.type, d, t: resolved.t, style: "outline" }
        : resolved.type === "ellipsoid"
          ? { type: resolved.type, w, h, dp: resolved.dp, style: "outline" }
          : { type: resolved.type, d, style: "outline" }
  );
  const layered =
    input.type === "sphere" ||
    input.type === "dome" ||
    input.type === "torus" ||
    input.type === "ellipsoid";
  const blocks = layered ? generated.totalBlockCount : generated.blockCount;
  const title =
    resolved.type === "ellipsoid"
      ? interpolate(dict.perSize.titleEllipsoid, {
          shape,
          w,
          h,
          dp: resolved.dp,
        })
      : interpolate(dict.perSize.title, { shape, d });
  return {
    title,
    description: interpolate(dict.perSize.desc, {
      shape,
      d: resolved.type === "torus" ? d : w,
      blocks,
    }),
    alternates: {
      canonical: `${SITE_URL}${localizePath(resolved.path, input.locale)}`,
      languages: hreflangMap(resolved.path),
    },
  };
}

function nearestUse(dict: Dictionary, d: number): string {
  const entries = dict.sizeGuide.entries;
  const exact = entries.find((entry) => entry.size === String(d));
  if (exact) return exact.use;
  let best = entries[0];
  let bestDiff = Infinity;
  for (const entry of entries) {
    const diff = Math.abs(Number(entry.size) - d);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = entry;
    }
  }
  return best.use;
}

function toolHref(
  locale: Locale,
  type: RouteShape,
  d: number,
  w: number,
  h: number,
  t?: number,
  dp?: number
): string {
  const base = locale === defaultLocale ? "/" : `/${locale}/`;
  if (type === "oval") return `${base}?t=oval&w=${w}&h=${h}`;
  if (type === "torus") return `${base}?t=torus&d=${d}&tb=${t}`;
  if (type === "ellipsoid") return `${base}?t=ellipsoid&w=${w}&h=${h}&dp=${dp}`;
  return `${base}?t=${type}&d=${d}`;
}

function arcToolHref(locale: Locale, d: number): string {
  const base = locale === defaultLocale ? "/" : `/${locale}/`;
  return `${base}?t=arc&d=${d}`;
}

function relatedLinks(
  type: RouteShape,
  d: number
): { href: string; label: string }[] {
  if (type === "circle") {
    return [-2, -1, 1, 2]
      .map((offset) => d + offset)
      .filter((v) => v >= RANGES.circle.min && v <= RANGES.circle.max)
      .map((v) => ({ href: `/circle/${v}/`, label: String(v) }));
  }
  if (type === "sphere" || type === "dome") {
    const range = RANGES[type];
    return [-1, 1]
      .map((offset) => d + offset)
      .filter((v) => v >= range.min && v <= range.max)
      .map((v) => ({ href: `/${type}/${v}/`, label: String(v) }));
  }
  if (type === "torus") {
    const index = TORUS_COMBOS.findIndex(([pd]) => pd === d);
    const links: { href: string; label: string }[] = [];
    if (index > 0) {
      const [pd, pt] = TORUS_COMBOS[index - 1];
      links.push({ href: `/torus/${pd}/${pt}/`, label: `${pd}脳${pt}` });
    }
    if (index >= 0 && index < TORUS_COMBOS.length - 1) {
      const [pd, pt] = TORUS_COMBOS[index + 1];
      links.push({ href: `/torus/${pd}/${pt}/`, label: `${pd}脳${pt}` });
    }
    return links;
  }
  if (type === "ellipsoid") {
    const index = ELLIPSOID_COMBOS.findIndex(([pw]) => pw === d);
    const links: { href: string; label: string }[] = [];
    if (index > 0) {
      const [pw, ph, pd] = ELLIPSOID_COMBOS[index - 1];
      links.push({
        href: `/ellipsoid/${pw}/${ph}/${pd}/`,
        label: `${pw}脳${ph}脳${pd}`,
      });
    }
    if (index >= 0 && index < ELLIPSOID_COMBOS.length - 1) {
      const [pw, ph, pd] = ELLIPSOID_COMBOS[index + 1];
      links.push({
        href: `/ellipsoid/${pw}/${ph}/${pd}/`,
        label: `${pw}脳${ph}脳${pd}`,
      });
    }
    return links;
  }
  const index = OVAL_PAIRS.findIndex(([pw]) => pw === d);
  const links: { href: string; label: string }[] = [];
  if (index > 0) {
    const [pw, ph] = OVAL_PAIRS[index - 1];
    links.push({ href: `/oval/${pw}/${ph}/`, label: `${pw}脳${ph}` });
  }
  if (index >= 0 && index < OVAL_PAIRS.length - 1) {
    const [pw, ph] = OVAL_PAIRS[index + 1];
    links.push({ href: `/oval/${pw}/${ph}/`, label: `${pw}脳${ph}` });
  }
  return links;
}

function nearestTorusCombo(d: number): readonly [number, number] {
  let best = TORUS_COMBOS[0];
  let bestDiff = Infinity;
  for (const combo of TORUS_COMBOS) {
    const diff = Math.abs(combo[0] - d);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = combo;
    }
  }
  return best;
}

function nearestEllipsoidCombo(d: number): readonly [number, number, number] {
  let best = ELLIPSOID_COMBOS[0];
  let bestDiff = Infinity;
  for (const combo of ELLIPSOID_COMBOS) {
    const diff = Math.abs(combo[0] - d);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = combo;
    }
  }
  return best;
}

function otherShapeLinks(
  locale: Locale,
  type: RouteShape,
  d: number
): { href: string; labelKey: keyof Dictionary["tool"] }[] {
  const links: { href: string; labelKey: keyof Dictionary["tool"] }[] = [];
  if (type !== "circle") {
    links.push({ href: `/circle/${d}/`, labelKey: "circle" });
  }
  if (type !== "sphere" && d <= RANGES.sphere.max) {
    links.push({ href: `/sphere/${d}/`, labelKey: "sphere" });
  }
  if (type !== "dome" && d <= RANGES.dome.max) {
    links.push({ href: `/dome/${d}/`, labelKey: "dome" });
  }
  if (d <= RANGES.sphere.max) {
    links.push({ href: arcToolHref(locale, d), labelKey: "arc" });
  }
  if (type !== "oval") {
    const [w, h] = nearestOvalPair(d);
    links.push({ href: `/oval/${w}/${h}/`, labelKey: "oval" });
  }
  if (type !== "torus") {
    const [td, tt] = nearestTorusCombo(d);
    links.push({ href: `/torus/${td}/${tt}/`, labelKey: "torus" });
  }
  if (type !== "ellipsoid") {
    const [ew, eh, edp] = nearestEllipsoidCombo(d);
    links.push({
      href: `/ellipsoid/${ew}/${eh}/${edp}/`,
      labelKey: "ellipsoid",
    });
  }
  return links;
}

export default async function ShapePage(
  input: ShapePageInput
): Promise<ReactNode> {
  const resolved = resolveParams(input);
  if (!resolved) notFound();
  const { locale } = input;
  const { d, w, h, path } = resolved;
  const dict = await getDictionary(locale);
  const shapeName = dict.tool[SHAPE_KEYS[resolved.type]];
  const shape = generateShape(
    resolved.type === "oval"
      ? { type: resolved.type, w, h, style: "outline" }
      : resolved.type === "torus"
        ? { type: resolved.type, d, t: resolved.t, style: "outline" }
        : resolved.type === "ellipsoid"
          ? { type: resolved.type, w, h, dp: resolved.dp, style: "outline" }
          : { type: resolved.type, d, style: "outline" }
  );
  const layered =
    resolved.type === "sphere" ||
    resolved.type === "dome" ||
    resolved.type === "torus" ||
    resolved.type === "ellipsoid";
  const blocks = layered ? shape.totalBlockCount : shape.blockCount;
  const title =
    resolved.type === "ellipsoid"
      ? interpolate(dict.perSize.titleEllipsoid, {
          shape: shapeName,
          w,
          h,
          dp: resolved.dp,
        })
      : interpolate(dict.perSize.title, { shape: shapeName, d });
  const description = interpolate(dict.perSize.desc, {
    shape: shapeName,
    d: resolved.type === "torus" ? d : w,
    blocks,
  });
  const use = nearestUse(dict, d);
  const related = relatedLinks(resolved.type, d);
  const others = otherShapeLinks(locale, resolved.type, d);
  const vars = { shape: shapeName, d, blocks, use };
  return (
    <SeoShell dict={dict} locale={locale}>
      <div className="mx-auto max-w-3xl">
        <h1 className="pixel-shadow font-pixel text-lg text-ink sm:text-xl">
          {title}
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          {description}
        </p>
        <div className="mt-6">
          <a
            href={toolHref(
              locale,
              resolved.type,
              d,
              w,
              h,
              "t" in resolved ? resolved.t : undefined,
              "dp" in resolved ? resolved.dp : undefined
            )}
            className="mc-btn mc-btn-primary inline-block"
          >
            {dict.perSize.openTool}
          </a>
        </div>

        <section className="mc-panel pixel-corners mt-10 p-5">
          <div className="flex flex-wrap items-start gap-6">
            <BlueprintGrid shape={shape} />
            <p className="font-terminal text-xl text-accent">
              {shape.blockCount} {dict.perSize.blocks}
            </p>
          </div>
          {layered && (
            <div className="mt-8">
              <div className="flex flex-wrap gap-5">
                {shape.layers
                  .filter(
                    (_, index) =>
                      shape.layers.length <= 24 ||
                      index % Math.ceil(shape.layers.length / 24) === 0
                  )
                  .map((layer) => {
                    const index = shape.layers.indexOf(layer);
                    return (
                      <div key={layer.z} className="text-center">
                        <h3
                          id={`layer-${index + 1}`}
                          className="mb-1 font-pixel text-[10px] text-muted"
                        >
                          {dict.perSize.layer} {index + 1}
                        </h3>
                        <LayerGrid layer={layer} />
                      </div>
                    );
                  })}
              </div>
              <p className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-terminal text-sm text-muted">
                {shape.layers.map((layer, index) => (
                  <span key={layer.z}>
                    {index + 1}: {layer.blockCount}
                  </span>
                ))}
              </p>
              <p className="mt-6 text-sm text-muted">
                {shape.totalBlockCount} {dict.perSize.blocks}
              </p>
            </div>
          )}
        </section>

        <p className="mt-10 text-ink">{interpolate(dict.perSize.definition, vars)}</p>

        <section className="mc-panel-inset pixel-corners mt-4 p-4">
          <h2 className="font-pixel text-[10px] uppercase tracking-wide text-cyan">
            {dict.perSize.keyFacts}
          </h2>
          <table className="mt-3 w-full">
            <tbody>
              <tr>
                <td className="pr-4 font-pixel text-[10px] text-muted">
                  {dict.perSize.factDiameter}
                </td>
                <td className="font-terminal text-xl text-accent">{d}</td>
              </tr>
              <tr>
                <td className="pr-4 font-pixel text-[10px] text-muted">
                  {dict.perSize.factBlocks}
                </td>
                <td className="font-terminal text-xl text-accent">{blocks}</td>
              </tr>
              {resolved.type === "torus" && (
                <tr>
                  <td className="pr-4 font-pixel text-[10px] text-muted">
                    {dict.tool.tube}
                  </td>
                  <td className="font-terminal text-xl text-accent">
                    {resolved.t}
                  </td>
                </tr>
              )}
              {resolved.type === "ellipsoid" && (
                <tr>
                  <td className="pr-4 font-pixel text-[10px] text-muted">
                    {dict.tool.depth}
                  </td>
                  <td className="font-terminal text-xl text-accent">
                    {resolved.dp}
                  </td>
                </tr>
              )}
              {layered && (
                <>
                  <tr>
                    <td className="pr-4 font-pixel text-[10px] text-muted">
                      {dict.perSize.factLayers}
                    </td>
                    <td className="font-terminal text-xl text-accent">
                      {shape.layers.length}
                    </td>
                  </tr>
                  <tr>
                    <td className="pr-4 font-pixel text-[10px] text-muted">
                      {dict.perSize.factHeight}
                    </td>
                    <td className="font-terminal text-xl text-accent">
                      {shape.layers.length}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </section>

        <section className="mt-10">
          <h2 className="font-pixel text-[10px] uppercase tracking-wide text-cyan">
            {dict.perSize.howToTitle}
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5">
            {dict.perSize.steps
              .slice(0, layered ? 5 : 3)
              .map((step, index) => (
                <li
                  key={index}
                  className="font-pixel text-[10px] leading-relaxed text-ink"
                >
                  {step}
                </li>
              ))}
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="font-pixel text-[10px] uppercase tracking-wide text-cyan">
            {dict.perSize.setblockTitle}
          </h2>
          <p className="mt-3 text-sm text-muted">
            {interpolate(dict.perSize.setblockBody, vars)}
          </p>
          <pre className="mt-3 inline-block border-2 border-mc-border bg-panel-2 p-3 font-terminal text-lg leading-7 text-cyan">
            /setblock 0 64 0 minecraft:stone
          </pre>
        </section>

        {resolved.type === "circle" && (
          <section className="mt-10">
            <h2 className="font-pixel text-[10px] uppercase tracking-wide text-cyan">
              {dict.tool.thickness} &amp; {dict.tool.inner}
            </h2>
            <p className="mt-3 text-sm text-muted">
              {interpolate(dict.perSize.thicknessTip, vars)}
            </p>
            <p className="mt-2 text-sm text-muted">
              {dict.perSize.innerTip}
            </p>
          </section>
        )}

        <section className="mt-10">
          <h2 className="font-pixel text-[10px] uppercase tracking-wide text-cyan">
            {dict.tool.builder}
          </h2>
          <p className="mt-3 text-sm text-muted">
            {dict.perSize.builderTip}
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-pixel text-[10px] uppercase tracking-wide text-cyan">
            {dict.perSize.usageTitle}
          </h2>
          <p className="mt-3 text-sm text-muted">
            {interpolate(dict.perSize.usageIntro, vars)}{" "}
            <span className="font-bold text-accent">{use}</span>
          </p>
        </section>

        {related.length > 0 && (
          <section className="mt-10">
            <h2 className="font-pixel text-[10px] uppercase tracking-wide text-cyan">
              {dict.perSize.related}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {related.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="mc-btn px-2! py-1! text-[10px]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-10">
          <h2 className="font-pixel text-[10px] uppercase tracking-wide text-cyan">
            {dict.perSize.otherShapes}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {others.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="mc-btn px-2! py-1! text-[10px]"
              >
                {dict.tool[link.labelKey]}
              </Link>
            ))}
          </div>
        </section>

        <SizeGuide dict={dict} />

        <SeoJsonLd
          dict={dict}
          locale={locale}
          path={path}
          title={title}
          description={description}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: interpolate(dict.perSize.faqQ1, vars),
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: interpolate(dict.perSize.faqA1, vars),
                  },
                },
                {
                  "@type": "Question",
                  name: interpolate(dict.perSize.faqQ2, vars),
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: interpolate(dict.perSize.faqA2, vars),
                  },
                },
                {
                  "@type": "Question",
                  name: interpolate(dict.perSize.faqQ3, vars),
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: interpolate(dict.perSize.faqA3, vars),
                  },
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: title,
              description,
              url: `${SITE_URL}${localizePath(path, locale)}`,
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Web",
              inLanguage: HREFLANG_MAP[locale],
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              publisher: {
                "@type": "Organization",
                name: "CircleGen",
                url: SITE_URL,
              },
            }).replace(/</g, "\\u003c"),
          }}
        />
      </div>
    </SeoShell>
  );
}
