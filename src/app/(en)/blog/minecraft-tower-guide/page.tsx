import type { Metadata } from "next";
import Link from "@/components/StaticLink";
import ArticleMeta from "@/components/ArticleMeta";
import SeoShell from "@/app/_seo/shell";
import ArticleJsonLd from "@/app/_seo/article-jsonld";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/config";
import { blogHreflang } from "@/lib/blog-content";

const TITLE = "Minecraft Tower Guide: Choose the Right Circle Diameter";
const DESCRIPTION =
  "Choose a Minecraft tower diameter by interior, wall thickness, stairs, and height. Compare 9–51 block footprints with verified counts and build tips.";
const PATH = "/blog/minecraft-tower-guide/";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}${PATH}`,
    languages: blogHreflang("minecraft-tower-guide"),
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What diameter should a Minecraft tower be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Match the diameter to the room you need, then add wall thickness. A 15-block footprint leaves about 13 blocks inside with a one-block wall and suits a starter tower. A 21-block leaves about 19, a 31-block about 29, and a 41- or 51-block footprint provides gatehouse or landmark scale. For a two-block wall, subtract four instead of two.",
      },
    },
    {
      "@type": "Question",
      name: "How much interior space does a 21-block tower have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "About 19 blocks across with a one-block wall, or 17 with a two-block wall. That is a planning approximation: the stepped circle, doorways, and stair openings reduce the exact usable cells. A 3×3 spiral stair still leaves a walkable ring around it.",
      },
    },
    {
      "@type": "Question",
      name: "Should a tower use an odd or even diameter?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Odd diameters are easier because they keep one center block for a mast or spiral stair. Even diameters work for even rooms or paired doors, but the center falls between four cells, so a central mast has to be offset or built as a 2×2 column. A flat circle keeps the diameter you enter; confirm the footprint if the tower must fit an existing foundation.",
      },
    },
  ],
};

export default async function MinecraftTowerGuidePage() {
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
        images={["/shape-pngs/circle-21.webp"]}
        published="2026-10-23"
        updated="2026-10-23"
      />
      <div className="mx-auto max-w-3xl">
        <h1 className="pixel-shadow font-pixel text-lg text-ink sm:text-xl">
          {TITLE}
        </h1>
        <ArticleMeta published="2026-10-23" updated="2026-10-23" />

        <section className="mc-panel pixel-corners mt-8 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            The Footprint Is Not the Room
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            The diameter in CircleGen is the exterior width of the tower
            footprint, the outline you place first. The usable room sits inside
            it, so it is always smaller. A{" "}
            <Link href="/circle/21/" className="pixel-link">
              21-block tower
            </Link>{" "}
            is a standard example: with a one-block wall it leaves about 19
            blocks inside, not 21.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            A one-block wall removes one block per side, so interior ≈ diameter
            − 2; a two-block wall gives interior ≈ diameter − 4. This is a
            planning approximation. The stepped pixel outline is uneven, and
            doors, windows, and stair openings cut into usable cells. Choose
            from these estimates, then confirm the exact ring on the blueprint.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Start with the interior, not the silhouette. Measure the footprint
            of your stair core, bed, storage, and workstations. If a 15-block
            footprint leaves a 13-block room, can the stair and furniture
            coexist? If not, move up a size. The interior cannot be widened
            after the shell is built.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Tower Diameter Comparison
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            These counts are for a one-block-thick ring at each diameter, not a
            finished tower. Interior is the approximate diameter minus two.
            Small sizes do not scale smoothly: 9 uses 32 shell blocks while 11
            uses 28, because of how the stepped outline bends.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm text-ink">
              <thead>
                <tr className="border-b-2 border-mc-border">
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Diameter
                  </th>
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Shell Blocks
                  </th>
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Approx. Interior
                  </th>
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Best Use
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm leading-7">
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">
                    <Link href="/circle/9/" className="pixel-link">
                      9-block tower
                    </Link>
                  </td>
                  <td className="px-3 py-2">32</td>
                  <td className="px-3 py-2">~7</td>
                  <td className="px-3 py-2">Lookout or light well</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">11</td>
                  <td className="px-3 py-2">28</td>
                  <td className="px-3 py-2">~9</td>
                  <td className="px-3 py-2">Narrow wizard tower</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">
                    <Link href="/circle/15/" className="pixel-link">
                      15-block tower
                    </Link>
                  </td>
                  <td className="px-3 py-2">40</td>
                  <td className="px-3 py-2">~13</td>
                  <td className="px-3 py-2">Starter tower</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">
                    <Link href="/circle/21/" className="pixel-link">
                      21-block tower
                    </Link>
                  </td>
                  <td className="px-3 py-2">56</td>
                  <td className="px-3 py-2">~19</td>
                  <td className="px-3 py-2">Standard tower</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">25</td>
                  <td className="px-3 py-2">68</td>
                  <td className="px-3 py-2">~23</td>
                  <td className="px-3 py-2">Roomy tower</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">
                    <Link href="/circle/31/" className="pixel-link">
                      31-block keep
                    </Link>
                  </td>
                  <td className="px-3 py-2">84</td>
                  <td className="px-3 py-2">~29</td>
                  <td className="px-3 py-2">Keep or arena tower</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">33</td>
                  <td className="px-3 py-2">112</td>
                  <td className="px-3 py-2">~31</td>
                  <td className="px-3 py-2">Large tower</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">
                    <Link href="/circle/41/" className="pixel-link">
                      41-block gatehouse
                    </Link>
                  </td>
                  <td className="px-3 py-2">112</td>
                  <td className="px-3 py-2">~39</td>
                  <td className="px-3 py-2">Gatehouse or landmark</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">
                    <Link href="/circle/51/" className="pixel-link">
                      51-block landmark
                    </Link>
                  </td>
                  <td className="px-3 py-2">168</td>
                  <td className="px-3 py-2">~49</td>
                  <td className="px-3 py-2">Large landmark</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm leading-7 text-muted">
            33 and 41 both use 112 shell blocks for one layer, but 41 leaves
            roughly eight more blocks of interior width. For a room, that space
            is worth the same wall cost. For a decorative spire, 33 keeps the
            footprint smaller for the same ring cost.
          </p>
          <figure className="mt-5 border-2 border-mc-border bg-panel-2 p-3">
            <img
              src="/shape-pngs/circle-21.webp"
              alt="Generated diagram, not an in-game screenshot, of a 21-block circle footprint used as a Minecraft tower base"
              width={461}
              height={461}
              loading="lazy"
              className="mx-auto h-auto w-full max-w-[260px] [image-rendering:pixelated]"
            />
            <figcaption className="mt-3 text-sm leading-6 text-muted">
              Generated diagram, not an in-game screenshot: this is the
              21-block circle footprint, not a finished tower. Walls, stair
              core, floors, and roof go on top of this outline.
            </figcaption>
          </figure>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Odd vs Even Diameters
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Odd diameters keep a single center block. A central mast, ladder,
            or spiral stair can rotate around that fixed cell, and every floor
            shares the same axis. A 21-block tower is easy to keep centered.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            Even diameters are not wrong. They suit an even room, paired doors,
            or a facade that mirrors across a two-block axis. What they lack is
            a single center block; the middle falls between four cells, so a
            central mast has to be offset or built as a 2×2 column.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            A flat circle keeps the diameter you enter, even or odd. The
            sphere and dome tools are different: they build from odd-width
            slices, so an even sphere or dome request can resolve one block
            wider. If the tower must sit on an existing even foundation, check
            the circle grid first. The{" "}
            <Link href="/blog/minecraft-circle-guide/" className="pixel-link">
              circle guide
            </Link>{" "}
            explains the outline.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Wall Thickness and Buttresses
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Use a one-block wall from 9 through 21. It preserves the interior
            and suits a watchtower or small keep. At 31 and above, use two
            blocks: a thicker wall reads as masonry, gives windows a sill, and
            grounds a tall tower.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            Always thicken inward. The exterior stays at the chosen diameter,
            and the interior loses two blocks of width for each added block of
            wall, one on each side. A 41-block tower with a two-block wall has
            roughly a 37-block room, smaller than the footprint suggests.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Add buttresses every 4–6 blocks around the outside. They break a
            long curve into bays, add shadow, and make a plain cylinder look
            designed. Place them on the four cardinal points first, then space
            the rest evenly; keep them out of the doorway. They project outward,
            so they do not shrink the interior but do widen the ground-level
            footprint; leave room beside paths and walls.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Stairs, Floors, and Headroom
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Plan the stair core before the shell rises. A 3×3 spiral stair fits
            a standard tower and leaves floor space around it. Use 5×5 when you
            want two-wide stairs or landings. Keep a central column, or leave
            the middle open as a ladder shaft or light well. Do not fill the
            core, then carve the stair out later.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            Set floor heights before building. Four to six blocks of headroom
            per level, including the floor, suits most towers; taller rooms feel
            grander but reduce the floor count. Mark each level on the outside
            wall with a temporary block, then build the floor slab and stair
            opening at that height. The exact stair count depends on floor
            height and turn style, so count from the layout.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Leave the floor opening where the stair arrives, not in the middle,
            and check headroom above the top step before adding the next
            ceiling.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Height and Material Planning
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            If the same ring repeats, shell blocks ≈ ring count × height. A
            21-block ring uses 56 blocks per layer, so 10 layers of wall need
            560 shell blocks. A 31-block ring uses 84 per layer; 12 layers need
            1,008. Those totals cover the wall shell only. Add floors, roof,
            doorway trim, windows, and buttresses separately.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            For a tapered tower, switch to the layer view. Each layer changes,
            so multiply each ring by its layer height and add the results. Do
            not multiply the base ring by total height; that overestimates a
            taper. The same applies when wall thickness changes partway up.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Check the{" "}
            <Link href="/blog/minecraft-circle-sizes/" className="pixel-link">
              circle size chart
            </Link>{" "}
            for nearby diameters, and use the{" "}
            <Link href="/blog/minecraft-dome-guide/" className="pixel-link">
              dome guide
            </Link>{" "}
            when the top becomes a curved roof. A tower is a footprint plus
            height plus roof; each part has its own material count.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Common Mistakes to Avoid
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">Choosing by exterior only.</strong> A
              wide footprint that cannot hold the stair core is worse than a
              smaller tower that works.
            </li>
            <li>
              <strong className="text-ink">Forgetting the stair core.</strong>{" "}
              Draw the 3×3 or 5×5 footprint on the floor before the walls;
              retrofitting a spiral stair usually means rebuilding floors.
            </li>
            <li>
              <strong className="text-ink">
                Using a one-block wall on a 41+ tower.
              </strong>{" "}
              Large shells look paper-thin without a second layer.
            </li>
            <li>
              <strong className="text-ink">
                Building a full solid cylinder.
              </strong>{" "}
              It wastes blocks, hides the interior, and makes stair and floor
              placement harder.
            </li>
            <li>
              <strong className="text-ink">
                Placing the door before checking the interior.
              </strong>{" "}
              Walk the floor plan first; a door centered on the outside may open
              into the stair or a wall.
            </li>
          </ul>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            How This Guide Was Made
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            This guide is based on CircleGen&apos;s circle grid math. The ring
            counts in the table come from the generator&apos;s one-block
            outline for each diameter, and the interior figures use the
            diameter-minus-wall approximation described above. Building advice
            reflects the geometry of the blueprint, not hands-on testing of
            every tower design.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">FAQ</h2>
          <div className="mt-3 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-ink">
                What diameter should a Minecraft tower be?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Match the diameter to the room you need, then add wall
                thickness. A 15-block footprint leaves about 13 blocks inside
                with a one-block wall and suits a starter tower. A 21-block
                leaves about 19, a 31-block about 29, and a 41- or 51-block
                footprint provides gatehouse or landmark scale. For a two-block
                wall, subtract four instead of two.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                How much interior space does a 21-block tower have?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                About 19 blocks across with a one-block wall, or 17 with a
                two-block wall. That is a planning approximation: the stepped
                circle, doorways, and stair openings reduce the exact usable
                cells. A 3×3 spiral stair still leaves a walkable ring around
                it.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                Should a tower use an odd or even diameter?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Odd diameters are easier because they keep one center block for
                a mast or spiral stair. Even diameters work for even rooms or
                paired doors, but the center falls between four cells, so a
                central mast has to be offset or built as a 2×2 column. A flat
                circle keeps the diameter you enter; confirm the footprint if
                the tower must fit an existing foundation.
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
