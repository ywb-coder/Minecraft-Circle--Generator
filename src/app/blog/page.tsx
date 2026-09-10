import type { Metadata } from "next";
import Link from "@/components/StaticLink";
import SeoShell from "@/app/_seo/shell";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Blog: Minecraft Building Guides & Tips",
  description:
    "Guides and tips for building better structures in Minecraft. Circle sizes, sphere building, and more.",
  alternates: { canonical: `${SITE_URL}/blog/` },
};

export default async function BlogPage() {
  const dict = await getDictionary(defaultLocale);
  return (
    <SeoShell dict={dict} locale={defaultLocale}>
      <div className="mx-auto max-w-3xl">
        <h1 className="pixel-shadow font-pixel text-lg text-ink sm:text-xl">
          Blog
        </h1>

        <section className="mc-panel pixel-corners mt-8 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">Building Guides</h2>
          <div className="mt-3 space-y-4">
            <div>
              <Link
                href="/blog/minecraft-circle-guide/"
                className="pixel-link text-sm font-bold"
              >
                Minecraft Circle Guide: How to Build Perfect Circles, Spheres
                &amp; Domes
              </Link>
              <p className="mt-1 text-sm leading-7 text-muted">
                Complete guide to building circles in Minecraft. Learn odd vs
                even diameters, step-by-step building, and find the perfect
                size for your build.
              </p>
            </div>
            <div>
              <Link
                href="/blog/minecraft-circle-sizes/"
                className="pixel-link text-sm font-bold"
              >
                Minecraft Circle Sizes: Complete Chart for Every Build Type
              </Link>
              <p className="mt-1 text-sm leading-7 text-muted">
                Find the perfect Minecraft circle size for towers, wells,
                arenas, and domes. Complete chart with block counts and
                recommendations.
              </p>
            </div>
          </div>
        </section>
      </div>
    </SeoShell>
  );
}
