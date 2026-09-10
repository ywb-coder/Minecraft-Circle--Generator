import type { Metadata } from "next";
import Link from "@/components/StaticLink";
import SeoShell from "@/app/_seo/shell";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Minecraft Circle Guide: How to Build Perfect Circles, Spheres & Domes",
  description:
    "Complete guide to building circles in Minecraft. Learn odd vs even diameters, step-by-step building, and find the perfect size for your build.",
  alternates: { canonical: `${SITE_URL}/blog/minecraft-circle-guide/` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many blocks do I need for a hollow Minecraft circle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the diameter. A diameter-7 hollow circle uses 16 blocks, diameter-9 uses 24, diameter-11 uses 32, diameter-15 uses 44, diameter-21 uses 64, diameter-31 uses 96, diameter-41 uses 128, and diameter-51 uses 160 blocks. Use the CircleGen generator to get exact counts for any diameter.",
      },
    },
    {
      "@type": "Question",
      name: "Do circles work differently in Java and Bedrock?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The pixel-circle algorithm uses the same grid math in both editions. Every blueprint from CircleGen works identically in Java Edition and Bedrock Edition.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best diameter for a Minecraft circle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on your build. For wells and chimneys, 7–9 is ideal. Watchtowers and ponds work well at 9–11. Fountains and small rooms suit 11–15. Tower bases look best at 15–21. Arenas and large rooms need 21–31. Castle walls and dome bases work at 31–51. Larger diameters always produce smoother curves.",
      },
    },
    {
      "@type": "Question",
      name: "How do I build a sphere in Minecraft?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A sphere is a stack of circle slices of varying diameters. Start with the largest circle as the equator, then place progressively smaller circles above and below it until they taper to a single block at the top and bottom. Use the CircleGen sphere generator to get each slice as a block-by-block blueprint.",
      },
    },
  ],
};

export default async function MinecraftCircleGuidePage() {
  const dict = await getDictionary(defaultLocale);
  return (
    <SeoShell dict={dict} locale={defaultLocale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-3xl">
        <h1 className="pixel-shadow font-pixel text-lg text-ink sm:text-xl">
          Minecraft Circle Guide: How to Build Perfect Circles, Spheres &amp;
          Domes
        </h1>

        <section className="mc-panel pixel-corners mt-8 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Why Circles Are Hard in Minecraft
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Minecraft worlds are made of square blocks on a grid. There are no
            curved edges, so every circle is an approximation — a ring of pixels
            that looks round from a distance. The key insight is that the larger
            the diameter, the smoother the curve looks. A 5-block circle is
            obviously jagged, but a 31-block circle reads as a clean ring even
            up close.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            CircleGen uses the midpoint circle algorithm to place blocks where
            their center distance from the middle falls within half a block of
            the radius. This produces the most accurate pixel-circle at any
            given diameter.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Odd vs Even Diameter
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            <strong className="text-ink">Odd diameters</strong> (5, 7, 9, 11,
            …) have a single center block. This makes them ideal for towers,
            pillars, and any build where you want a clear center point for a
            roof, beacon, or pillar.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            <strong className="text-ink">Even diameters</strong> (6, 8, 10, 12,
            …) have a 2×2 center area. They work well for walls, enclosures,
            and builds where you don&apos;t need a single center block —
            especially round walls around an existing structure.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Odd diameters are generally recommended for beginners because the
            single center block makes placement simpler and the resulting
            circle is always symmetric along both axes.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            How to Build a Circle Manually
          </h2>
          <ol className="mt-3 space-y-3 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">1. Choose an odd diameter.</strong>{" "}
              Pick a size that fits your build. Odd numbers (7, 9, 11, 15, …)
              give you a single center block, which makes placement easier.
            </li>
            <li>
              <strong className="text-ink">2. Mark the center block.</strong>{" "}
              Place one block where you want the center of the circle. This is
              your reference point for everything else.
            </li>
            <li>
              <strong className="text-ink">3. Build the cardinal axes.</strong>{" "}
              From the center, count outward in each of the four directions
              (north, south, east, west) and place a block at the radius
              distance. For a diameter-9 circle, that means 4 blocks out from
              the center in each direction.
            </li>
            <li>
              <strong className="text-ink">4. Connect the tips.</strong> Between
              each pair of axis endpoints, add blocks to form the curve. The
              CircleGen blueprint shows you exactly which cells to fill for
              each quadrant.
            </li>
            <li>
              <strong className="text-ink">5. Mirror the quadrants.</strong>{" "}
              Once you build one quadrant, copy the pattern to the other three.
              Every pixel circle is symmetric along both the horizontal and
              vertical axes.
            </li>
          </ol>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Circle Size Quick Reference
          </h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm text-ink">
              <thead>
                <tr className="border-b-2 border-mc-border">
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Diameter
                  </th>
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Hollow Blocks
                  </th>
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Filled Blocks
                  </th>
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Best For
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm leading-7">
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">7</td>
                  <td className="px-3 py-2">16</td>
                  <td className="px-3 py-2">37</td>
                  <td className="px-3 py-2">Wells, chimneys</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">9</td>
                  <td className="px-3 py-2">24</td>
                  <td className="px-3 py-2">69</td>
                  <td className="px-3 py-2">Watchtowers, ponds</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">11</td>
                  <td className="px-3 py-2">32</td>
                  <td className="px-3 py-2">97</td>
                  <td className="px-3 py-2">Fountains, small rooms</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">15</td>
                  <td className="px-3 py-2">44</td>
                  <td className="px-3 py-2">177</td>
                  <td className="px-3 py-2">Tower bases</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">21</td>
                  <td className="px-3 py-2">64</td>
                  <td className="px-3 py-2">349</td>
                  <td className="px-3 py-2">Arenas, large rooms</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">31</td>
                  <td className="px-3 py-2">96</td>
                  <td className="px-3 py-2">761</td>
                  <td className="px-3 py-2">Castle walls, dome bases</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">41</td>
                  <td className="px-3 py-2">128</td>
                  <td className="px-3 py-2">1,321</td>
                  <td className="px-3 py-2">Large arenas</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">51</td>
                  <td className="px-3 py-2">160</td>
                  <td className="px-3 py-2">2,043</td>
                  <td className="px-3 py-2">City walls</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Common Mistakes to Avoid
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">Using even diameters when you need
              a center point.</strong> Even circles have a 2×2 center, which
              makes it impossible to place a single pillar, beacon, or roof
              center. Always use odd diameters for towers.
            </li>
            <li>
              <strong className="text-ink">Guessing block placement.</strong>{" "}
              Eyeballing a circle leads to asymmetric results. Use a blueprint
              (like CircleGen) to know exactly which cells to fill before you
              start building.
            </li>
            <li>
              <strong className="text-ink">Ignoring the filled-vs-hollow
              difference.</strong> A filled circle and a hollow circle use
              very different block counts. Make sure you know which one your
              build needs — a dome base is hollow, a platform is filled.
            </li>
            <li>
              <strong className="text-ink">Starting too small.</strong> Small
              circles (diameter 5–7) are noticeably jagged. If aesthetics
              matter, go at least to diameter 9 or 11 for visible curves, and
              21+ for smooth-looking results.
            </li>
          </ul>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">FAQ</h2>
          <div className="mt-3 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-ink">
                How many blocks do I need for a hollow Minecraft circle?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                It depends on the diameter. A diameter-7 hollow circle uses 16
                blocks, diameter-9 uses 24, diameter-11 uses 32, diameter-15
                uses 44, diameter-21 uses 64, diameter-31 uses 96, diameter-41
                uses 128, and diameter-51 uses 160 blocks. Use the{" "}
                <Link href="/" className="pixel-link">
                  CircleGen generator
                </Link>{" "}
                to get exact counts for any diameter.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                Do circles work differently in Java and Bedrock?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                No. The pixel-circle algorithm uses the same grid math in both
                editions. Every blueprint from CircleGen works identically in
                Java Edition and Bedrock Edition.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                What is the best diameter for a Minecraft circle?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                It depends on your build. For wells and chimneys, 7–9 is
                ideal. Watchtowers and ponds work well at 9–11. Fountains and
                small rooms suit 11–15. Tower bases look best at 15–21. Arenas
                and large rooms need 21–31. Castle walls and dome bases work at
                31–51. Larger diameters always produce smoother curves.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                How do I build a sphere in Minecraft?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                A sphere is a stack of circle slices of varying diameters.
                Start with the largest circle as the equator, then place
                progressively smaller circles above and below it until they
                taper to a single block at the top and bottom. Use the{" "}
                <Link href="/" className="pixel-link">
                  CircleGen sphere generator
                </Link>{" "}
                to get each slice as a block-by-block blueprint.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8">
          <Link href="/blog/" className="pixel-link text-sm">
            ← Back to Blog
          </Link>
        </div>
      </div>
    </SeoShell>
  );
}
