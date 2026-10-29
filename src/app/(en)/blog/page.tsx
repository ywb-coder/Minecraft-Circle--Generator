import type { Metadata } from "next";
import Link from "@/components/StaticLink";
import ArticleMeta from "@/components/ArticleMeta";
import SeoShell from "@/app/_seo/shell";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/config";
import { blogIndexHreflang } from "@/lib/blog-content";

export const metadata: Metadata = {
  title: "Blog: Minecraft Building Guides & Tips",
  description:
    "Guides and tips for building better structures in Minecraft. Circle sizes, towers, ovals, spheres, and more.",
  alternates: {
    canonical: `${SITE_URL}/blog/`,
    languages: blogIndexHreflang(),
  },
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
            <div className="flex gap-4">
              <div className="shrink-0 border-2 border-mc-border bg-panel-2">
                <img
                  src="/shape-pngs/circle-21.webp"
                  alt="Generated 21-block circle footprint used as a Minecraft tower base thumbnail"
                  width={461}
                  height={461}
                  loading="lazy"
                  className="h-20 w-20 [image-rendering:pixelated]"
                />
              </div>
              <div>
                <Link
                  href="/blog/minecraft-tower-guide/"
                  className="pixel-link text-sm font-bold"
                >
                  Minecraft Tower Guide: Choose the Right Circle Diameter
                </Link>
                <ArticleMeta published="2026-10-23" updated="2026-10-23" />
                <p className="mt-1 text-sm leading-7 text-muted">
                  Choose a tower diameter by interior, wall thickness, stairs,
                  and height. Compare 9–51 block footprints with verified
                  counts and build tips.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 border-2 border-mc-border bg-panel-2">
                <img
                  src="/shape-pngs/oval-21-9.webp"
                  alt="Generated 21 by 9 oval outline blueprint thumbnail"
                  width={461}
                  height={209}
                  loading="lazy"
                  className="h-20 w-20 object-contain [image-rendering:pixelated]"
                />
              </div>
              <div>
                <Link
                  href="/blog/minecraft-oval-guide/"
                  className="pixel-link text-sm font-bold"
                >
                  Minecraft Oval Guide: Build Round Ovals Block by Block
                </Link>
                <ArticleMeta published="2026-10-23" updated="2026-10-23" />
                <p className="mt-1 text-sm leading-7 text-muted">
                  Build a Minecraft oval with width and height blueprints:
                  axes, quadrants, outline vs filled shapes, size picks, block
                  counts, and fixes for a lopsided result.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 border-2 border-mc-border bg-panel-2">
                <img
                  src="/shape-pngs/circle-21.webp"
                  alt="Generated 21-block circle blueprint used as a sphere slice reference thumbnail"
                  width={461}
                  height={461}
                  loading="lazy"
                  className="h-20 w-20 [image-rendering:pixelated]"
                />
              </div>
              <div>
                <Link
                  href="/blog/minecraft-sphere-guide/"
                  className="pixel-link text-sm font-bold"
                >
                  Minecraft Sphere Guide: Build a Round Sphere Layer by Layer
                </Link>
                <ArticleMeta published="2026-10-21" updated="2026-10-21" />
                <p className="mt-1 text-sm leading-7 text-muted">
                  Learn how to build a Minecraft sphere from stacked circle
                  slices: odd vs even diameters, an equator-first workflow,
                  hollow shells, and size guidance.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 border-2 border-mc-border bg-panel-2">
                <img
                  src="/shape-pngs/circle-31.webp"
                  alt="Generated 31-block circle blueprint used as a dome base slice reference thumbnail"
                  width={461}
                  height={461}
                  loading="lazy"
                  className="h-20 w-20 [image-rendering:pixelated]"
                />
              </div>
              <div>
                <Link
                  href="/blog/minecraft-dome-guide/"
                  className="pixel-link text-sm font-bold"
                >
                  Minecraft Dome Guide: Build a Half-Sphere on a Flat Base
                </Link>
                <ArticleMeta published="2026-10-21" updated="2026-10-21" />
                <p className="mt-1 text-sm leading-7 text-muted">
                  Build a Minecraft dome from a flat base with stacked circle
                  slices: base diameter vs height, hollow interiors,
                  step-by-step building, and size guidance.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 border-2 border-mc-border bg-panel-2">
                <img
                  src="/shape-pngs/circle-15.webp"
                  alt="Generated 15-block circle blueprint thumbnail"
                  width={380}
                  height={380}
                  loading="lazy"
                  className="h-20 w-20 [image-rendering:pixelated]"
                />
              </div>
              <div>
                <Link
                  href="/blog/minecraft-circle-guide/"
                  className="pixel-link text-sm font-bold"
                >
                  Minecraft Circle Guide: How to Build Perfect Circles, Spheres
                  &amp; Domes
                </Link>
                <ArticleMeta published="2026-09-10" updated="2026-10-21" />
                <p className="mt-1 text-sm leading-7 text-muted">
                  Complete guide to building circles in Minecraft. Learn odd vs
                  even diameters, step-by-step building, and find the perfect
                  size for your build.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 border-2 border-mc-border bg-panel-2">
                <img
                  src="/shape-pngs/circle-21.webp"
                  alt="Generated 21-block circle blueprint thumbnail"
                  width={461}
                  height={461}
                  loading="lazy"
                  className="h-20 w-20 [image-rendering:pixelated]"
                />
              </div>
              <div>
                <Link
                  href="/blog/minecraft-circle-sizes/"
                  className="pixel-link text-sm font-bold"
                >
                  Minecraft Circle Sizes: Complete Chart for Every Build Type
                </Link>
                <ArticleMeta published="2026-09-10" updated="2026-10-21" />
                <p className="mt-1 text-sm leading-7 text-muted">
                  Find the perfect Minecraft circle size for towers, wells,
                  arenas, and domes. Complete chart with block counts and
                  recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SeoShell>
  );
}
