import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePage from "@/components/HomePage";
import { getDictionary } from "@/lib/i18n/dictionaries";
import {
  defaultLocale,
  isLocale,
  subpathLocales,
} from "@/lib/i18n/locales";

export function generateStaticParams() {
  return subpathLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function LocalePage({
  params,
}: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === defaultLocale) {
    notFound();
  }
  const dict = await getDictionary(locale);
  return <HomePage dict={dict} locale={locale} />;
}
