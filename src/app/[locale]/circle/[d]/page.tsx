import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShapePage, { shapePageMetadata } from "@/app/_seo/shape-page";
import { defaultLocale, isLocale, subpathLocales } from "@/lib/i18n/locales";
import { circleDiameters } from "@/lib/seo";

export function generateStaticParams() {
  return subpathLocales.flatMap((locale) =>
    circleDiameters.map((d) => ({ locale, d: String(d) }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; d: string }>;
}): Promise<Metadata> {
  const { locale, d } = await params;
  if (!isLocale(locale) || locale === defaultLocale) return {};
  return shapePageMetadata({ type: "circle", locale, d });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; d: string }>;
}) {
  const { locale, d } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  return <ShapePage type="circle" locale={locale} d={d} />;
}
