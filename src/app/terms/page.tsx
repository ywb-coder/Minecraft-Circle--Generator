import type { Metadata } from "next";
import Link from "next/link";
import SeoShell from "@/app/_seo/shell";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/locales";
import { SITE_EMAIL, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Use — Minecraft Circle Generator",
  description:
    "Terms of use for the free Minecraft circle generator. Free to use, provided as-is, not affiliated with Mojang or Microsoft.",
  alternates: { canonical: `${SITE_URL}/terms/` },
};

export default async function TermsPage() {
  const dict = await getDictionary(defaultLocale);
  return (
    <SeoShell dict={dict} locale={defaultLocale}>
      <div className="mx-auto max-w-3xl">
        <h1 className="pixel-shadow font-pixel text-lg text-ink sm:text-xl">
          Terms of Use
        </h1>

        <section className="mc-panel pixel-corners mt-8 p-5">
          <div className="space-y-4 text-sm leading-7 text-muted">
            <p>
              <strong className="text-ink">Free to use:</strong> the circle
              generator and all its blueprints are free for personal and
              non-commercial use, in Java Edition and Bedrock Edition.
            </p>
            <p>
              <strong className="text-ink">As-is:</strong> the tool is provided
              without warranty of any kind. We do our best to make every
              blueprint accurate, but you are responsible for checking the grid
              before building.
            </p>
            <p>
              <strong className="text-ink">Trademark:</strong> Minecraft is a
              trademark of Mojang Studios / Microsoft. This website is an
              independent fan tool, not affiliated with, endorsed by, or
              sponsored by Mojang Studios or Microsoft.
            </p>
            <p>
              <strong className="text-ink">Content:</strong> generated
              blueprints and their coordinates may be used freely. Redistribute
              this website&apos;s tool or content for profit only with written
              permission.
            </p>
            <p>
              <strong className="text-ink">Questions:</strong> email{" "}
              <a href={`mailto:${SITE_EMAIL}`} className="pixel-link">
                {SITE_EMAIL}
              </a>
              .
            </p>
            <p>
              <Link href="/" className="pixel-link">
                Back to the generator
              </Link>
            </p>
          </div>
        </section>
      </div>
    </SeoShell>
  );
}
