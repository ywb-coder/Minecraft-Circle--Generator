import type { Metadata } from "next";
import ShapePage, { shapePageMetadata } from "@/app/_seo/shape-page";
import { defaultLocale } from "@/lib/i18n/locales";
import { OVAL_PAIRS } from "@/lib/seo";

export function generateStaticParams() {
  return OVAL_PAIRS.map(([w, h]) => ({ w: String(w), h: String(h) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ w: string; h: string }>;
}): Promise<Metadata> {
  const { w, h } = await params;
  return shapePageMetadata({ type: "oval", locale: defaultLocale, w, h });
}

export default async function Page({
  params,
}: {
  params: Promise<{ w: string; h: string }>;
}) {
  const { w, h } = await params;
  return <ShapePage type="oval" locale={defaultLocale} w={w} h={h} />;
}
