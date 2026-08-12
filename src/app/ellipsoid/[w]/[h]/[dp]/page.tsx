import type { Metadata } from "next";
import ShapePage, { shapePageMetadata } from "@/app/_seo/shape-page";
import { defaultLocale } from "@/lib/i18n/locales";
import { ELLIPSOID_COMBOS } from "@/lib/seo";

export function generateStaticParams() {
  return ELLIPSOID_COMBOS.map(([w, h, dp]) => ({
    w: String(w),
    h: String(h),
    dp: String(dp),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ w: string; h: string; dp: string }>;
}): Promise<Metadata> {
  const { w, h, dp } = await params;
  return shapePageMetadata({ type: "ellipsoid", locale: defaultLocale, w, h, dp });
}

export default async function Page({
  params,
}: {
  params: Promise<{ w: string; h: string; dp: string }>;
}) {
  const { w, h, dp } = await params;
  return <ShapePage type="ellipsoid" locale={defaultLocale} w={w} h={h} dp={dp} />;
}
