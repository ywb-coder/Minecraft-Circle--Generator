import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShapePage, { shapePageMetadata } from "@/app/_seo/shape-page";
import { defaultLocale, isLocale, subpathLocales } from "@/lib/i18n/locales";
import { OVAL_PAIRS } from "@/lib/seo";

export function generateStaticParams() {
  return subpathLocales.flatMap((locale) =>
    OVAL_PAIRS.map(([w, h]) => ({ locale, w: String(w), h: String(h) }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; w: string; h: string }>;
}): Promise<Metadata> {
  const { locale, w, h } = await params;
  if (!isLocale(locale) || locale === defaultLocale) return {};
  return shapePageMetadata({ type: "oval", locale, w, h });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; w: string; h: string }>;
}) {
  const { locale, w, h } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  return <ShapePage type="oval" locale={locale} w={w} h={h} />;
}
