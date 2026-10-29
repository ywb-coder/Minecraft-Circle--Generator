import type { Metadata } from "next";
import Link from "@/components/StaticLink";
import ArticleMeta from "@/components/ArticleMeta";
import SeoShell from "@/app/_seo/shell";
import ArticleJsonLd from "@/app/_seo/article-jsonld";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/config";

const TITLE =
  "Minecraft Sphere Guide: Build a Round Sphere Layer by Layer";
const DESCRIPTION =
  "Learn how to build a Minecraft sphere from stacked circle slices: odd vs even diameters, an equator-first workflow, hollow shells, and size guidance.";
const PATH = "/blog/minecraft-sphere-guide/";

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
      name: "Is a Minecraft sphere just stacked circles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. A sphere is a stack of horizontal circle slices. The widest slice is the equator, and each slice above and below it gets smaller until the stack ends in a single-block cap at the top and bottom. CircleGen shows each slice as its own ring blueprint.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use an odd or even diameter for a sphere?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use an odd diameter when you can. Odd diameters keep one center block and match the generator's odd-width slices exactly. Even inputs still work, but the slice math resolves them to the next odd width, so the finished sphere can be one block wider than the number you entered.",
      },
    },
    {
      "@type": "Question",
      name: "How do I keep a large sphere centered while building?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Place a temporary pillar through the center before you start and keep it there until both caps are finished. Build the equator first, check its symmetry, then work down and up from that ring. The generator's layer view gives each ring exact placement, so you never have to eyeball the curve.",
      },
    },
  ],
};

export default async function MinecraftSphereGuidePage() {
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
        images={["/shape-pngs/circle-21.webp", "/shape-pngs/circle-31.webp"]}
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
            A Sphere Is a Stack of Circle Slices
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Minecraft has no curved blocks, but a sphere does not need curves.
            It needs stacked horizontal circle slices. The widest slice sits at
            the equator; slices above and below it shrink toward a single-block
            cap. From the side, the ring edges form a ball.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            CircleGen&apos;s sphere mode lists every slice from bottom to top
            and shows the exact ring for each height. This guide explains how
            to use that output. For the rings at your diameter, use the{" "}
            <Link href="/" className="pixel-link">
              sphere generator
            </Link>{" "}
            rather than calculating them by hand.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            How the Generator Turns a Sphere Into Slices
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Each slice is a circle whose width depends on its distance from the
            equator. At the equator, for an odd diameter, it is the full width.
            Toward a pole, the width drops in odd-numbered steps until the slice
            becomes a small ring and then a cap. The generator applies the same
            one-block circle-outline routine used for flat circles and stacks
            the results in order.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            The layer list is more useful than a single sphere picture: it
            tells you which ring to place at each height. Use the preview for
            orientation and the layer grid for placement.
          </p>
          <figure className="mt-5 border-2 border-mc-border bg-panel-2 p-3">
            <img
              src="/shape-pngs/circle-21.webp"
              alt="Generated diagram (not an in-game screenshot) of a 21-block circle blueprint used as the equator slice reference for a Minecraft sphere"
              width={461}
              height={461}
              loading="lazy"
              className="mx-auto h-auto w-full max-w-[260px] [image-rendering:pixelated]"
            />
            <figcaption className="mt-3 text-sm leading-6 text-muted">
              Generated diagram, not an in-game screenshot and not a sphere
              render: this is the equator slice for a 21-block sphere. Slices
              above and below it shrink toward the caps.
            </figcaption>
          </figure>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Odd vs Even Diameter
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Odd diameters are the natural fit. They keep one center block in
            every slice, giving the stack a single vertical axis from bottom
            cap to top cap. A diameter-21 sphere is a good example of a size
            where that center column stays easy to track while building.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            The generator builds every slice from an odd-width circle. Even
            inputs still work, but resolve to the next odd width: a sphere
            entered as diameter 20 ends up with a 21-block equator. That is
            fine for overall scale, but it matters if the sphere must fit an
            even-width room or an existing 2×2 center. When the footprint has
            to match a plan, choose an odd diameter.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            The Equator-First Workflow
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Starting at a pole is tempting, but the equator sets the footprint.
            Build the widest ring first. On a full sphere it sits at the widest
            point, not on the ground.
          </p>
          <ol className="mt-3 space-y-3 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">1. Choose an odd diameter.</strong>{" "}
              Preview it and confirm the equator width fits the site, including
              any wall or path around it.
            </li>
            <li>
              <strong className="text-ink">2. Mark the center.</strong> Place a
              temporary pillar tall enough to pass both caps. Every ring is
              measured from it.
            </li>
            <li>
              <strong className="text-ink">3. Build the equator ring.</strong>{" "}
              Put it at the widest height and follow the slice cell by cell.
              Check all four quadrants before continuing.
            </li>
            <li>
              <strong className="text-ink">4. Build the lower half.</strong> The
              layer list is bottom-to-top, so read it in reverse below the
              equator. Shrink each ring toward the bottom cap; use scaffolding
              if the equator is above ground.
            </li>
            <li>
              <strong className="text-ink">5. Build the upper half.</strong>{" "}
              Return to the equator and follow the list upward until the top
              cap is one block.
            </li>
            <li>
              <strong className="text-ink">6. Close the caps.</strong> Check the
              silhouette from four sides before removing the pillar and adding
              detail.
            </li>
          </ol>
          <p className="mt-3 text-sm leading-7 text-muted">
            If you prefer to build ground-up, follow the list in order. Still
            verify the equator as a full ring; do not guess its shape from the
            smaller layers below it.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Hollow vs Solid Spheres
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            CircleGen&apos;s sphere output is a shell: every layer is a ring,
            and the total counts the shell only. That suits most builds. A
            hollow sphere gives you an interior and uses far fewer blocks.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            Solid spheres are decorative. If you want one, place the rings
            first and fill the discs afterward; filling as you go hides the
            center line. For floors, decide heights before building and leave
            openings for stairs. At the poles, let the smallest ring do its
            job. A wide flat cap looks chopped; smooth with slabs instead.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Reading the Layer View
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Switch to sphere mode, set the diameter, and step through the layer
            control. Layer 1 is the bottom cap; the last is the top. The
            selected layer shows that height&apos;s ring, and its block count
            is for that slice. The summary total is the whole shell.
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">Use the preview for shape, not
              counting.</strong>{" "}
              Rotate it to understand the stack, then return to the layer grid
              for exact placement.
            </li>
            <li>
              <strong className="text-ink">Compare matching widths.</strong>{" "}
              Above and below the equator, slices at the same distance from the
              middle should match. If they do not, one is wrong.
            </li>
            <li>
              <strong className="text-ink">Check the layer count first.</strong>{" "}
              It is also the sphere&apos;s height, so it tells you how much
              scaffolding you need.
            </li>
          </ul>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Choosing 15, 21, 31, or 51
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Use the generator&apos;s total for the diameter you are
            considering; survival cost rises quickly with size.
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">15: small decoration.</strong> A{" "}
              <Link href="/sphere/15/" className="pixel-link">
                diameter-15 sphere
              </Link>{" "}
              works as a lantern orb, floating island core, small planet, or
              tower finial. Too small for an interior.
            </li>
            <li>
              <strong className="text-ink">21: compact centerpiece.</strong> A{" "}
              <Link href="/sphere/21/" className="pixel-link">
                diameter-21 sphere
              </Link>{" "}
              suits a globe, spawn ornament, or small hollow room.
            </li>
            <li>
              <strong className="text-ink">31: medium build.</strong> A{" "}
              <Link href="/sphere/31/" className="pixel-link">
                diameter-31 sphere
              </Link>{" "}
              makes a planetoid, boss-arena shell, or floating island core.
            </li>
            <li>
              <strong className="text-ink">51: landmark.</strong> A
              diameter-51 sphere is a spawn globe, arena, spherical greenhouse,
              or sky planet. Plan scaffolding and the material haul; check the
              total before committing.
            </li>
          </ul>
          <p className="mt-3 text-sm leading-7 text-muted">
            Rule of thumb: 15 and 21 for decoration, 31 for a small interior,
            51 for a landmark. The{" "}
            <Link href="/blog/minecraft-circle-guide/" className="pixel-link">
              circle guide
            </Link>{" "}
            covers the flat-ring basics behind every slice. For a half-sphere
            roof instead of a full ball, see the{" "}
            <Link href="/blog/minecraft-dome-guide/" className="pixel-link">
              dome guide
            </Link>
            ; the{" "}
            <Link href="/blog/minecraft-circle-sizes/" className="pixel-link">
              circle size chart
            </Link>{" "}
            helps match the equator to a room or footprint.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Common Mistakes to Avoid
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">Starting at the top cap.</strong>{" "}
              Without the equator there is no reliable footprint. Build or mark
              the widest ring first.
            </li>
            <li>
              <strong className="text-ink">Losing the center line.</strong> A
              one-block drift is hard to spot. Keep the temporary pillar until
              both caps are finished.
            </li>
            <li>
              <strong className="text-ink">Using an even diameter for an exact
              fit.</strong>{" "}
              The odd-width slices can make the sphere one block wider than
              planned.
            </li>
            <li>
              <strong className="text-ink">Filling the shell too early.</strong>{" "}
              A solid sphere hides the center column and makes later rings
              harder to check.
            </li>
            <li>
              <strong className="text-ink">Flattening the poles.</strong> The
              single-block caps are part of the shape. Smooth with slabs rather
              than widening them.
            </li>
          </ul>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            How This Guide Was Made
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            This guide is based on CircleGen&apos;s sphere grid math: each
            layer is an odd-width circle slice, and the stack tapers to the
            caps. Layer behavior and size guidance were checked against
            generator output and the site&apos;s existing sphere pages, not
            hands-on testing of every build.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Found a slice or count that does not match? Send a correction
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
                Is a Minecraft sphere just stacked circles?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Yes. A sphere is a stack of horizontal circle slices. The
                widest slice is the equator, and each slice above and below it
                gets smaller until the stack ends in a single-block cap at the
                top and bottom. CircleGen shows each slice as its own ring
                blueprint.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                Should I use an odd or even diameter for a sphere?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Use an odd diameter when you can. Odd diameters keep one center
                block and match the generator&apos;s odd-width slices exactly.
                Even inputs still work, but the slice math resolves them to the
                next odd width, so the finished sphere can be one block wider
                than the number you entered.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                How do I keep a large sphere centered while building?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Place a temporary pillar through the center before you start
                and keep it there until both caps are finished. Build the
                equator first, check its symmetry, then work down and up from
                that ring. The generator&apos;s layer view gives each ring exact
                placement, so you never have to eyeball the curve.
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
