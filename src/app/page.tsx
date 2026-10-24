import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/config";
import { hreflangMap } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary(defaultLocale);
  return {
    // absolute: the root layout template would append " | CircleGen" and push
    // the title past Google's ~60-char display limit.
    title: { absolute: dict.meta.title },
    description: dict.meta.description,
    alternates: {
      canonical: SITE_URL + "/",
      languages: hreflangMap("/"),
    },
  };
}

export default async function Home() {
  const dict = await getDictionary(defaultLocale);
  return <HomePage dict={dict} locale={defaultLocale} />;
}
