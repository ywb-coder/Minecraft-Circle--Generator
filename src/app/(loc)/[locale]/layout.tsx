import type { Metadata } from "next";
import RootDocument from "@/app/_seo/root-document";
import { rootMetadata } from "@/app/_seo/root-metadata";
import { isLocale } from "@/lib/i18n/locales";
import "@/app/globals.css";

export const metadata: Metadata = rootMetadata;

/**
 * Root layout for every localized route (`/de/`, `/fr/`, `/pt/`, `/ru/`, ...).
 *
 * This layout sits at the `[locale]` segment itself, so it — unlike a shared
 * app-root layout — actually receives `params.locale` and can emit the correct
 * `<html lang>` for the server-rendered document.
 */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = isLocale(locale) ? locale : "en";
  return <RootDocument lang={lang}>{children}</RootDocument>;
}
