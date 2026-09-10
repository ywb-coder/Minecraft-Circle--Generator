import type { Metadata } from "next";
import Link from "@/components/StaticLink";
import SeoShell from "@/app/_seo/shell";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Minecraft Circle Sizes: Complete Chart for Every Build Type",
  description:
    "Find the perfect Minecraft circle size for towers, wells, arenas, and domes. Complete chart with block counts and recommendations.",
  alternates: { canonical: `${SITE_URL}/blog/minecraft-circle-sizes/` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What size circle do I need for a Minecraft well?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A diameter of 7–9 blocks works best for most wells. Diameter 7 gives a cozy 16-block hollow ring, while diameter 9 provides more room with 24 blocks. Either size looks natural as a well opening.",
      },
    },
    {
      "@type": "Question",
      name: "How many stacks of blocks do I need for a circle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on the diameter and whether the circle is hollow or filled. A hollow diameter-21 circle needs 64 blocks (1 stack). A filled diameter-21 needs 349 blocks (about 5.5 stacks). Use the chart on this page to find exact stack counts.",
      },
    },
    {
      "@type": "Question",
      name: "What is the biggest practical circle in Minecraft?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Diameter 101 (filled: 8,012 blocks, ~125 stacks) is a realistic upper limit for most survival builds. Larger diameters like 125+ are possible but require significant resource gathering. In creative mode, there is no practical limit — diameter 255 is the maximum for a single plane.",
      },
    },
  ],
};

export default async function MinecraftCircleSizesPage() {
  const dict = await getDictionary(defaultLocale);
  return (
    <SeoShell dict={dict} locale={defaultLocale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-3xl">
        <h1 className="pixel-shadow font-pixel text-lg text-ink sm:text-xl">
          Minecraft Circle Sizes: Complete Chart for Every Build Type
        </h1>

        <section className="mc-panel pixel-corners mt-8 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">Quick Answer</h2>
          <div className="mt-3 rounded-sm border-2 border-cyan/30 bg-cyan/5 p-4 text-sm leading-7 text-ink">
            <ul className="space-y-1">
              <li>
                <strong className="text-ink">Tiny details and decorations:</strong> diameter
                5–7
              </li>
              <li>
                <strong className="text-ink">Wells and chimneys:</strong> diameter 7–9
              </li>
              <li>
                <strong className="text-ink">Watchtowers and ponds:</strong> diameter 9–11
              </li>
              <li>
                <strong className="text-ink">Fountains and small rooms:</strong> diameter
                11–15
              </li>
              <li>
                <strong className="text-ink">Tower bases and platforms:</strong> diameter
                15–21
              </li>
              <li>
                <strong className="text-ink">Arenas and large rooms:</strong> diameter 21–31
              </li>
              <li>
                <strong className="text-ink">Castle walls and dome bases:</strong> diameter
                31–51
              </li>
              <li>
                <strong className="text-ink">Large arenas and city walls:</strong> diameter
                41–81
              </li>
              <li>
                <strong className="text-ink">Mega builds and stadiums:</strong> diameter 81+
              </li>
            </ul>
          </div>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Detailed Size Guide by Build Type
          </h2>

          <h3 className="mt-4 text-sm font-bold text-ink">Wells</h3>
          <p className="mt-1 text-sm leading-7 text-muted">
            A diameter of 7–9 blocks is the sweet spot for wells. Diameter 7
            gives you a 16-block ring that feels cozy and natural. Diameter 9
            (24 blocks) leaves room for a water source block in the center and
            looks more proportional on most builds.
          </p>

          <h3 className="mt-4 text-sm font-bold text-ink">Towers</h3>
          <p className="mt-1 text-sm leading-7 text-muted">
            Watchtowers work best at diameter 9–11. Taller towers and turret
            bases benefit from diameter 15–21, which gives you enough interior
            space for a spiral staircase or ladder. For castle keeps, diameter
            21–31 provides a roomy interior.
          </p>

          <h3 className="mt-4 text-sm font-bold text-ink">Arenas</h3>
          <p className="mt-1 text-sm leading-7 text-muted">
            Small combat arenas need at least diameter 21 (64 hollow blocks).
            Medium arenas at diameter 31 (96 blocks) give enough room for
            mob-spawning or PvP. Large spectator arenas reach diameter 41–51
            (128–160 blocks) for a grand feel.
          </p>

          <h3 className="mt-4 text-sm font-bold text-ink">Domes</h3>
          <p className="mt-1 text-sm leading-7 text-muted">
            Dome bases follow the same sizing as arenas. A diameter-21 dome
            fits a small house inside. Diameter-31 domes make impressive
            greenhouses or observatories. Diameter-41+ domes are statement
            pieces that dominate the landscape.
          </p>

          <h3 className="mt-4 text-sm font-bold text-ink">Stadiums</h3>
          <p className="mt-1 text-sm leading-7 text-muted">
            Stadiums and colosseums typically use diameter 51–81. At these
            sizes, the curve looks smooth and the interior can hold seating
            tiers, courts, or tracks. Budget 2,000–5,000+ blocks for the
            perimeter wall alone.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Complete Circle Size Reference Chart
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
                    Stacks Needed
                  </th>
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Best Build Types
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm leading-7">
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">5</td>
                  <td className="px-3 py-2">12</td>
                  <td className="px-3 py-2">21</td>
                  <td className="px-3 py-2">&lt;1</td>
                  <td className="px-3 py-2">Tiny details</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">7</td>
                  <td className="px-3 py-2">16</td>
                  <td className="px-3 py-2">37</td>
                  <td className="px-3 py-2">&lt;1</td>
                  <td className="px-3 py-2">Well openings</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">9</td>
                  <td className="px-3 py-2">24</td>
                  <td className="px-3 py-2">69</td>
                  <td className="px-3 py-2">1</td>
                  <td className="px-3 py-2">Watchtowers</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">11</td>
                  <td className="px-3 py-2">32</td>
                  <td className="px-3 py-2">97</td>
                  <td className="px-3 py-2">2</td>
                  <td className="px-3 py-2">Fountains</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">15</td>
                  <td className="px-3 py-2">44</td>
                  <td className="px-3 py-2">177</td>
                  <td className="px-3 py-2">3</td>
                  <td className="px-3 py-2">Tower bases</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">21</td>
                  <td className="px-3 py-2">64</td>
                  <td className="px-3 py-2">349</td>
                  <td className="px-3 py-2">6</td>
                  <td className="px-3 py-2">Arenas</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">31</td>
                  <td className="px-3 py-2">96</td>
                  <td className="px-3 py-2">761</td>
                  <td className="px-3 py-2">12</td>
                  <td className="px-3 py-2">Castle walls</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">41</td>
                  <td className="px-3 py-2">128</td>
                  <td className="px-3 py-2">1,321</td>
                  <td className="px-3 py-2">21</td>
                  <td className="px-3 py-2">Large arenas</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">51</td>
                  <td className="px-3 py-2">160</td>
                  <td className="px-3 py-2">2,043</td>
                  <td className="px-3 py-2">32</td>
                  <td className="px-3 py-2">City walls</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">65</td>
                  <td className="px-3 py-2">208</td>
                  <td className="px-3 py-2">3,317</td>
                  <td className="px-3 py-2">52</td>
                  <td className="px-3 py-2">Mega domes</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">81</td>
                  <td className="px-3 py-2">256</td>
                  <td className="px-3 py-2">5,153</td>
                  <td className="px-3 py-2">81</td>
                  <td className="px-3 py-2">Stadiums</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">101</td>
                  <td className="px-3 py-2">316</td>
                  <td className="px-3 py-2">8,012</td>
                  <td className="px-3 py-2">125</td>
                  <td className="px-3 py-2">Megabuilds</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            How to Choose the Right Size
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">Viewing distance:</strong> If the
              structure will be seen from far away (like a city wall or
              lighthouse), go bigger. Diameter 31+ reads as a clean circle
              from 100+ blocks away.
            </li>
            <li>
              <strong className="text-ink">Wall thickness:</strong> Consider
              whether you need a 1-block-thick ring or a thicker wall. A
              2-block-thick wall at diameter 21 gives an inner diameter of 17,
              which still feels spacious.
            </li>
            <li>
              <strong className="text-ink">Interior space:</strong> Measure how
              much room you need inside. A diameter-15 circle gives roughly a
              13×13 interior. Diameter-21 gives roughly 19×19. Plan for
              furniture, stairs, and movement.
            </li>
            <li>
              <strong className="text-ink">Material needs:</strong> Filled
              circles scale with the square of the radius. A diameter-31
              filled circle needs 761 blocks (about 12 stacks) — manageable
              in survival. A diameter-51 filled circle needs 2,043 blocks (32
              stacks), which requires significant mining.
            </li>
          </ul>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Material Planning Tips
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            One stack in Minecraft holds 64 blocks. Use this to plan your
            resource gathering:
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">Hollow circles</strong> are
              dramatically cheaper than filled ones. A hollow diameter-51
              circle needs only 160 blocks (2.5 stacks), while the filled
              version needs 2,043 (32 stacks).
            </li>
            <li>
              <strong className="text-ink">Domes multiply the cost.</strong> A
              full sphere uses roughly 4× the blocks of a single circle slice.
              A diameter-21 sphere uses about 1,400 blocks (22 stacks) for
              the hollow shell.
            </li>
            <li>
              <strong className="text-ink">Plan for extras.</strong> Budget
              10–15% more blocks than the chart says. You will misplace
              blocks, adjust the design, and want matching stair/slab
              variants for decoration.
            </li>
            <li>
              <strong className="text-ink">Use the generator first.</strong>{" "}
              Get the exact block count from{" "}
              <Link href="/" className="pixel-link">
                CircleGen
              </Link>{" "}
              before you start mining. There is nothing worse than being 20
              blocks short of finishing a dome.
            </li>
          </ul>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">FAQ</h2>
          <div className="mt-3 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-ink">
                What size circle do I need for a Minecraft well?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                A diameter of 7–9 blocks works best for most wells. Diameter 7
                gives a cozy 16-block hollow ring, while diameter 9 provides
                more room with 24 blocks. Either size looks natural as a well
                opening.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                How many stacks of blocks do I need for a circle?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                It depends on the diameter and whether the circle is hollow or
                filled. A hollow diameter-21 circle needs 64 blocks (1 stack).
                A filled diameter-21 needs 349 blocks (about 5.5 stacks). Use
                the chart above to find exact stack counts.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                What is the biggest practical circle in Minecraft?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Diameter 101 (filled: 8,012 blocks, ~125 stacks) is a
                realistic upper limit for most survival builds. Larger
                diameters like 125+ are possible but require significant
                resource gathering. In creative mode, there is no practical
                limit — diameter 255 is the maximum for a single plane.
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
