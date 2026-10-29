import type { Metadata } from "next";
import ShapePage, { shapePageMetadata } from "@/app/_seo/shape-page";
import { defaultLocale } from "@/lib/i18n/locales";
import { TORUS_COMBOS } from "@/lib/seo";

export function generateStaticParams() {
  return TORUS_COMBOS.map(([d, t]) => ({ d: String(d), t: String(t) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ d: string; t: string }>;
}): Promise<Metadata> {
  const { d, t } = await params;
  return shapePageMetadata({ type: "torus", locale: defaultLocale, d, t });
}

export default async function Page({
  params,
}: {
  params: Promise<{ d: string; t: string }>;
}) {
  const { d, t } = await params;
  return <ShapePage type="torus" locale={defaultLocale} d={d} t={t} />;
}
