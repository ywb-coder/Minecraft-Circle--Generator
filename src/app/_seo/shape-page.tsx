import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale, type Locale } from "@/lib/i18n/locales";
import { interpolate } from "@/lib/i18n/format";
import { generateShape } from "@/lib/shapes";
import {
  hreflangMap,
  isOvalPair,
  nearestOvalPair,
  OVAL_PAIRS,
  parsePositiveInt,
} from "@/lib/seo";
import SeoShell from "./shell";
import { BlueprintGrid, LayerGrid } from "./blueprint";
import SizeGuide from "./sizeguide";
import SeoJsonLd from "./jsonld";

export type RouteShape = "circle" | "sphere" | "dome" | "oval";

export type ShapePageInput = {
  type: RouteShape;
  locale: Locale;
  d?: string;
  w?: string;
  h?: string;
};

const RANGES: Record<
  "circle" | "sphere" | "dome",
  { min: number; max: number }
> = {
  circle: { min: 5, max: 256 },
  sphere: { min: 5, max: 128 },
  dome: { min: 5, max: 128 },
};

const SHAPE_KEYS: Record<RouteShape, keyof Dictionary["tool"]> = {
  circle: "circle",
  sphere: "sphere",
  dome: "dome",
  oval: "oval",
};

function resolveParams(input: ShapePageInput): {
  d: number;
  w: number;
  h: number;
  path: string;
} | null {
  if (input.type === "oval") {
    const w = parsePositiveInt(input.w);
    const h = parsePositiveInt(input.h);
    if (w === null || h === null || !isOvalPair(w, h)) return null;
    return { d: w, w, h, path: `/oval/${w}/${h}` };
  }
  const range = RANGES[input.type];
  const d = parsePositiveInt(input.d);
  if (d === null || d < range.min || d > range.max) return null;
  return { d, w: d, h: d, path: `/${input.type}/${d}` };
}

export async function shapePageMetadata(
  input: ShapePageInput
): Promise<Metadata> {
  const resolved = resolveParams(input);
  if (!resolved) return {};
  const dict = await getDictionary(input.locale);
  const shape = dict.tool[SHAPE_KEYS[input.type]];
  return {
    title: interpolate(dict.perSize.title, { shape, d: resolved.d }),
    description: interpolate(dict.perSize.desc, { shape, d: resolved.d }),
    alternates: { languages: hreflangMap(resolved.path) },
  };
}

function toolHref(
  locale: Locale,
  type: RouteShape,
  d: number,
  w: number,
  h: number
): string {
  const base = locale === defaultLocale ? "/" : `/${locale}/`;
  if (type === "oval") return `${base}?t=oval&w=${w}&h=${h}`;
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
  const index = OVAL_PAIRS.findIndex(([pw]) => pw === d);
  const links: { href: string; label: string }[] = [];
  if (index > 0) {
    const [pw, ph] = OVAL_PAIRS[index - 1];
    links.push({ href: `/oval/${pw}/${ph}/`, label: `${pw}×${ph}` });
  }
  if (index >= 0 && index < OVAL_PAIRS.length - 1) {
    const [pw, ph] = OVAL_PAIRS[index + 1];
    links.push({ href: `/oval/${pw}/${ph}/`, label: `${pw}×${ph}` });
  }
  return links;
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
  return links;
}

export default async function ShapePage(
  input: ShapePageInput
): Promise<ReactNode> {
  const resolved = resolveParams(input);
  if (!resolved) notFound();
  const { locale, type } = input;
  const { d, w, h, path } = resolved;
  const dict = await getDictionary(locale);
  const shapeName = dict.tool[SHAPE_KEYS[type]];
  const title = interpolate(dict.perSize.title, { shape: shapeName, d });
  const description = interpolate(dict.perSize.desc, {
    shape: shapeName,
    d,
  });
  const shape = generateShape(
    type === "oval"
      ? { type, w, h, style: "outline" }
      : { type, d, style: "outline" }
  );
  const layered = type === "sphere" || type === "dome";
  const related = relatedLinks(type, d);
  const others = otherShapeLinks(locale, type, d);
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
            href={toolHref(locale, type, d, w, h)}
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
                  className="mc-btn px-3 py-1.5 text-[10px]"
                  style={{ padding: "6px 12px" }}
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
                className="mc-btn px-3 py-1.5 text-[10px]"
                style={{ padding: "6px 12px" }}
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
      </div>
    </SeoShell>
  );
}
