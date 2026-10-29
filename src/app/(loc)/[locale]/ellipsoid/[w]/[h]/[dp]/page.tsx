import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShapePage, { shapePageMetadata } from "@/app/_seo/shape-page";
import { defaultLocale, isLocale, subpathLocales } from "@/lib/i18n/locales";
import { ELLIPSOID_COMBOS } from "@/lib/seo";

export function generateStaticParams() {
  return subpathLocales.flatMap((locale) =>
    ELLIPSOID_COMBOS.map(([w, h, dp]) => ({
      locale,
      w: String(w),
      h: String(h),
      dp: String(dp),
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; w: string; h: string; dp: string }>;
}): Promise<Metadata> {
  const { locale, w, h, dp } = await params;
  if (!isLocale(locale) || locale === defaultLocale) return {};
  return shapePageMetadata({ type: "ellipsoid", locale, w, h, dp });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; w: string; h: string; dp: string }>;
}) {
  const { locale, w, h, dp } = await params;
  if (!isLocale(locale) || locale === defaultLocale) notFound();
  return <ShapePage type="ellipsoid" locale={locale} w={w} h={h} dp={dp} />;
}
