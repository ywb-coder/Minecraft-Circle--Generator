import type { Metadata } from "next";
import RootDocument from "@/app/_seo/root-document";
import { rootMetadata } from "@/app/_seo/root-metadata";
import "@/app/globals.css";

export const metadata: Metadata = rootMetadata;

/** Root layout for the Spanish routes (`/es/...`). */
export default function EsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootDocument lang="es">{children}</RootDocument>;
}
