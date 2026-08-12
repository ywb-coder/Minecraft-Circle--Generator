import type { Metadata } from "next";
import ShapePage, { shapePageMetadata } from "@/app/_seo/shape-page";
import { defaultLocale } from "@/lib/i18n/locales";
import { sphereDiameters } from "@/lib/seo";

export function generateStaticParams() {
  return sphereDiameters.map((d) => ({ d: String(d) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ d: string }>;
}): Promise<Metadata> {
  const { d } = await params;
  return shapePageMetadata({ type: "sphere", locale: defaultLocale, d });
}

export default async function Page({
  params,
}: {
  params: Promise<{ d: string }>;
}) {
  const { d } = await params;
  return <ShapePage type="sphere" locale={defaultLocale} d={d} />;
}
