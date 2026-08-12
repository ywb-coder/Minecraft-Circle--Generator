import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShapePage, { shapePageMetadata } from "@/app/_seo/shape-page";
import { defaultLocale, isLocale, subpathLocales } from "@/lib/i18n/locales";
import { TORUS_COMBOS } from "@/lib/seo";

export function generateStaticParams() {
  return subpathLocales.flatMap((locale) =>
    TORUS_COMBOS.map(([d, t]) => ({ locale, d: String(d), t: String(t) }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; d: string; t: string }>;
}): Promise<Metadata> {
  const { locale, d, t } = await params;
  if (!isLocale(locale) || locale === defaultLocale) return {};
  return shapePageMetadata({ type: "torus", locale, d, t });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; d: string; t: string }>;
}) {
  const { locale, d, t } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  return <ShapePage type="torus" locale={locale} d={d} t={t} />;
}
