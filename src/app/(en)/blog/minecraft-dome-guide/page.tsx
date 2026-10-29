import type { Metadata } from "next";
import Link from "@/components/StaticLink";
import ArticleMeta from "@/components/ArticleMeta";
import SeoShell from "@/app/_seo/shell";
import ArticleJsonLd from "@/app/_seo/article-jsonld";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/config";

const TITLE =
  "Minecraft Dome Guide: Build a Half-Sphere on a Flat Base";
const DESCRIPTION =
  "Build a Minecraft dome from a flat base with stacked circle slices: base diameter vs height, hollow interiors, step-by-step building, and size guidance.";
const PATH = "/blog/minecraft-dome-guide/";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between a Minecraft dome and a sphere?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A dome is a half-sphere with a flat base. CircleGen starts with the full base circle and stacks smaller rings upward to a cap. A sphere repeats those rings above and below its equator, with no flat base.",
      },
    },
    {
      "@type": "Question",
      name: "What diameter should I use for a dome roof?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Match the base to the outside width of the round room. Diameter 15 suits small kilns and hut roofs, 21 suits pavilions and small greenhouses, and 31 or 51 suits halls and large observatories. Larger domes look smoother but need more blocks and scaffolding.",
      },
    },
    {
      "@type": "Question",
      name: "Can a Minecraft dome be hollow?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. CircleGen's dome blueprint is a shell of rings, so the interior is open. Build the base ring and walls, leave the middle empty, and add a floor at ground level. Plan doors and slits while building rather than cutting a finished shell.",
      },
    },
  ],
};

export default async function MinecraftDomeGuidePage() {
  const dict = await getDictionary(defaultLocale);
  return (
    <SeoShell dict={dict} locale={defaultLocale}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ArticleJsonLd
        title={TITLE}
        description={DESCRIPTION}
        path={PATH}
        locale="en"
        images={["/shape-pngs/circle-31.webp", "/shape-pngs/circle-21.webp"]}
        published="2026-10-21"
        updated="2026-10-21"
      />
      <div className="mx-auto max-w-3xl">
        <h1 className="pixel-shadow font-pixel text-lg text-ink sm:text-xl">
          {TITLE}
        </h1>
        <ArticleMeta published="2026-10-21" updated="2026-10-21" />

        <section className="mc-panel pixel-corners mt-8 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            A Dome Is Half a Sphere on a Flat Base
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            A Minecraft dome starts with a full circle on the ground. Every
            layer above it is smaller, and the stack ends in a small cap. The
            result is a half-sphere: a curved roof with a flat footprint. That
            flat base is what separates a dome from a sphere.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            CircleGen&apos;s dome mode lists every layer from base to cap. Use
            the{" "}
            <Link href="/" className="pixel-link">
              dome generator
            </Link>{" "}
            for exact rings; this guide covers planning and building.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Base Diameter vs Height
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            For odd diameters, the diameter is the base width and the height
            follows. A dome is about half as tall as it is wide, counting the
            base and cap as layers. A wider base makes a taller dome. Dome mode
            cannot stretch the curve vertically, so add a straight cylindrical
            wall below it for extra height.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            Use an odd diameter when the base must match a plan. Every slice is
            an odd-width circle, so an even input resolves to the next odd
            width: diameter 20 gives a 21-block base. That extra block can
            throw off a wall or doorway.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Rings are one block thick. A second inner layer shrinks the
            interior by one block per side (two blocks across), so decide wall
            thickness before placing the base.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Reading the Dome Blueprint
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            In dome mode, layer 1 is the full base circle. Later layers are
            smaller rings, and the last layer is the cap. The selected
            layer&apos;s block count is for that ring. The summary total is the
            whole shell and excludes floors and interior details.
          </p>
          <figure className="mt-5 border-2 border-mc-border bg-panel-2 p-3">
            <img
              src="/shape-pngs/circle-31.webp"
              alt="Generated diagram (not an in-game screenshot) of a 31-block circle blueprint used as the base footprint for a Minecraft dome"
              width={454}
              height={454}
              loading="lazy"
              className="mx-auto h-auto w-full max-w-[260px] [image-rendering:pixelated]"
            />
            <figcaption className="mt-3 text-sm leading-6 text-muted">
              Generated diagram, not an in-game screenshot: this is the base
              footprint for a 31-block dome. The generator stacks smaller rings
              above it to the cap.
            </figcaption>
          </figure>
          <p className="mt-3 text-sm leading-7 text-muted">
            Check base symmetry on both axes before building upward. A
            one-block error carries into every ring and pulls the cap off
            center.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Step-by-Step Dome Build
          </h2>
          <ol className="mt-3 space-y-3 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">1. Choose an odd diameter and check
              the height.</strong>{" "}
              Preview the base and layer count, including headroom for the cap
              and interior floor.
            </li>
            <li>
              <strong className="text-ink">2. Mark the center.</strong> Place a
              temporary pillar tall enough to clear the finished dome. Every
              ring is placed around it.
            </li>
            <li>
              <strong className="text-ink">3. Build the base ring.</strong> Lay
              the circle on level ground. For a hollow dome, leave the middle
              empty. Add a floor afterward with access for stairs or a door.
            </li>
            <li>
              <strong className="text-ink">4. Add the second layer.</strong>{" "}
              Center it on the pillar and check that the gap between rings is
              even all the way around.
            </li>
            <li>
              <strong className="text-ink">5. Follow the layer list
              upward.</strong>{" "}
              Each ring shrinks toward the cap. Check the silhouette every few
              layers so a misplaced block does not become a dent.
            </li>
            <li>
              <strong className="text-ink">6. Plan openings before the
              cap.</strong>{" "}
              Leave blocks out for a kiln vent, an observatory slit, or a
              lantern hole on the layers where they belong.
            </li>
            <li>
              <strong className="text-ink">7. Close the top and remove the
              pillar.</strong>{" "}
              Finish with the smallest ring, then add floors and lighting.
              Smooth steep steps with stairs or slabs if needed.
            </li>
          </ol>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Hollow Interiors and Solid Domes
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            CircleGen&apos;s dome output is a shell. A hollow dome can hold a
            kiln, a telescope, a small room, or a greenhouse. The base ring is
            the outside wall; the empty middle is usable space. A solid dome is
            decorative and costs far more for no structural gain.
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">Floors:</strong> add a filled circle
              at ground level. An upper floor needs a hole for the ladder or
              stair column.
            </li>
            <li>
              <strong className="text-ink">Thickness:</strong> add an inner ring
              one block inside each layer, or use stairs and slabs to suggest
              thickness. Keep the same center.
            </li>
            <li>
              <strong className="text-ink">Openings:</strong> plan doors, kiln
              vents, and observatory slits into the rings instead of cutting
              finished walls.
            </li>
            <li>
              <strong className="text-ink">Lighting:</strong> hang lanterns
              before the roof closes. A sealed hollow shell becomes dark inside.
            </li>
          </ul>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Roofs, Kilns, and Observatories
          </h2>
          <h3 className="mt-4 text-sm font-bold text-ink">Dome roofs</h3>
          <p className="mt-1 text-sm leading-7 text-muted">
            Match the base to the outside walls, or go one size larger for an
            overhang. The base can sit at wall-top height; the layer stack
            works the same way, but the center pillar starts from the floor
            below. Huts and gazebos suit 15 or 21; halls need 31 or more.
          </p>
          <h3 className="mt-4 text-sm font-bold text-ink">Kilns and ovens</h3>
          <p className="mt-1 text-sm leading-7 text-muted">
            A kiln is a small hollow dome with a base door and a top vent.
            Diameter 15 is practical. Leave the doorway open and cover the cap
            with a trapdoor. Brick, deepslate, and copper make convincing
            shells.
          </p>
          <h3 className="mt-4 text-sm font-bold text-ink">Observatories</h3>
          <p className="mt-1 text-sm leading-7 text-muted">
            An observatory needs room for a telescope and a standing area, so
            21 is compact and 31 or 51 gives a proper room. Plan a vertical slit
            on the best-view side while building; cutting it later weakens the
            rings. Put the telescope on the center line and keep the cap open or
            glazed.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Choosing 15, 21, 31, or 51
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">15: cover and detail.</strong> A{" "}
              <Link href="/dome/15/" className="pixel-link">
                diameter-15 dome
              </Link>{" "}
              is a kiln, well cover, lantern roof, or shrine. The interior is
              tight, so treat it as a cover.
            </li>
            <li>
              <strong className="text-ink">21: garden scale.</strong> A{" "}
              <Link href="/dome/21/" className="pixel-link">
                diameter-21 dome
              </Link>{" "}
              fits a pavilion, small greenhouse, porch roof, or compact
              observatory.
            </li>
            <li>
              <strong className="text-ink">31: room scale.</strong> A{" "}
              <Link href="/dome/31/" className="pixel-link">
                diameter-31 dome
              </Link>{" "}
              works for a chapel, greenhouse, observatory, or large tower roof,
              with room for furniture or planting beds.
            </li>
            <li>
              <strong className="text-ink">51: landmark scale.</strong> A
              diameter-51 dome is a hall, cathedral apse, grand observatory, or
              arena roof. Check the total before committing; it needs more
              scaffolding and a taller pillar.
            </li>
          </ul>
          <p className="mt-3 text-sm leading-7 text-muted">
            For a roof viewed from the ground, one size larger looks better.
            For a kiln, choose the smallest size that clears the opening. The{" "}
            <Link href="/blog/minecraft-circle-sizes/" className="pixel-link">
              circle size chart
            </Link>{" "}
            helps match base diameters to room widths and budgets. If you want
            the full ball instead, the{" "}
            <Link href="/blog/minecraft-sphere-guide/" className="pixel-link">
              sphere guide
            </Link>{" "}
            covers both halves, and the{" "}
            <Link href="/blog/minecraft-circle-guide/" className="pixel-link">
              circle guide
            </Link>{" "}
            explains the flat-ring pattern.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Common Mistakes to Avoid
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">Starting with a base that is too
              small.</strong>{" "}
              Height follows width, so a small base gives a cramped interior.
              Decide what must fit inside first.
            </li>
            <li>
              <strong className="text-ink">Building without a center
              pillar.</strong>{" "}
              A one-block drift is hard to see until the cap is off.
            </li>
            <li>
              <strong className="text-ink">Filling the base by accident.</strong>{" "}
              A solid base removes the interior. Build the ring first.
            </li>
            <li>
              <strong className="text-ink">Using an even diameter for an exact
              fit.</strong>{" "}
              The odd-width slices can make the base one block wider than
              planned.
            </li>
            <li>
              <strong className="text-ink">Cutting openings after the shell is
              finished.</strong>{" "}
              A door, vent, or slit interrupts the ring pattern. Plan it on the
              right layer.
            </li>
            <li>
              <strong className="text-ink">Flattening the cap.</strong> A wide
              slab makes the dome look chopped. Follow the smallest ring, or
              make the opening deliberate with a lantern or glass oculus.
            </li>
          </ul>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            How This Guide Was Made
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            This guide is based on CircleGen&apos;s dome grid math: the base is
            a full circle, and every layer above it is a smaller odd-width
            ring. It was checked against generator output and the site&apos;s
            existing dome pages, not hands-on testing of every build.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Found a layer or count that does not match? Send a correction
            through the{" "}
            <Link href="/contact/" className="pixel-link">
              contact page
            </Link>
            .
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">FAQ</h2>
          <div className="mt-3 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-ink">
                What is the difference between a Minecraft dome and a sphere?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                A dome is a half-sphere with a flat base.
                CircleGen starts with the full base circle and stacks smaller
                rings upward to a cap. A sphere repeats those rings above and
                below its equator, with no flat base.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                What diameter should I use for a dome roof?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Match the base to the outside width of the round room.
                Diameter 15 suits small kilns and hut roofs, 21 suits
                pavilions and small greenhouses, and 31 or 51 suits halls and
                large observatories. Larger domes look smoother but need more
                blocks and scaffolding.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                Can a Minecraft dome be hollow?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Yes. CircleGen&apos;s dome blueprint is a shell of rings, so the
                interior is open. Build the base ring and walls, leave the
                middle empty, and add a floor at ground level. Plan doors and
                slits while building rather than cutting a finished shell.
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
