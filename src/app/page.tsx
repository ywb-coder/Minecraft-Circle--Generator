import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/config";
import { hreflangMap } from "@/lib/seo";

export const metadata: Metadata = {
  title:
    "Minecraft Circle Generator — Build Perfect Circles, Ovals, Spheres & Domes",
  description:
    "Free Minecraft circle generator with block-by-block blueprints for circles, ovals, spheres, and domes. Live preview, build order animation, and PNG downloads for Java and Bedrock.",
  alternates: {
    canonical: SITE_URL + "/",
    languages: hreflangMap("/"),
  },
};

export default async function Home() {
  const dict = await getDictionary(defaultLocale);
  return <HomePage dict={dict} locale={defaultLocale} />;
}
