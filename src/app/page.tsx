import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/config";
import { hreflangMap } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Minecraft Circle Generator — Circles & Spheres",
  description:
    "Free Minecraft circle generator with block-by-block pixel blueprints for circles, ovals, spheres, domes and arcs. Works for Java and Bedrock.",
  alternates: {
    canonical: SITE_URL + "/",
    languages: hreflangMap("/"),
  },
};

export default async function Home() {
  const dict = await getDictionary(defaultLocale);
  return <HomePage dict={dict} locale={defaultLocale} />;
}
