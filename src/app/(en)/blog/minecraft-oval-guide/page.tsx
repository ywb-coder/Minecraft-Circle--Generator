import type { Metadata } from "next";
import Link from "@/components/StaticLink";
import ArticleMeta from "@/components/ArticleMeta";
import SeoShell from "@/app/_seo/shell";
import ArticleJsonLd from "@/app/_seo/article-jsonld";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/config";

const TITLE = "Minecraft Oval Guide: Build Round Ovals Block by Block";
const DESCRIPTION =
  "Build a Minecraft oval with width and height blueprints: axes, quadrants, outline vs filled shapes, size picks, block counts, and fixes for a lopsided result.";
const PATH = "/blog/minecraft-oval-guide/";

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
      name: "Is a Minecraft oval the same as an ellipse?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not exactly. In math, an ellipse is a precise curve defined by two axes and two focal points. A Minecraft oval approximates that proportion on a grid: the square cells decide the edge, so it moves in steps. At build scale it reads as an oval, but it is not a mathematically exact ellipse. CircleGen calls the shape an oval and shows the block pattern for each indexed pair.",
      },
    },
    {
      "@type": "Question",
      name: "What size oval should I build?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with the footprint. Match the width to the long horizontal space and the height to the short vertical space. A 15×7 oval suits a window or fountain rim, 21×9 a pond or table, 31×15 an arena or courtyard, and 41×21 a plaza or large pool. If a circle would leave wide empty corners, a flatter oval fills the area better.",
      },
    },
    {
      "@type": "Question",
      name: "Can I make a hollow oval?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The outline blueprint is already a hollow one-block ring, so leave the middle empty and add a floor, water, or grass. For a one-block wall, the nominal clear box is width minus 2 by height minus 2, but the stepped ends can pinch it. Check the actual rows before promising a full rectangle. Add a second inner ring for thicker walls.",
      },
    },
  ],
};

export default async function MinecraftOvalGuidePage() {
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
        images={["/shape-pngs/oval-21-9.webp"]}
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
            A Minecraft Oval Has Two Measurements
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Minecraft has no curves. Every round shape is a staircase of square
            blocks, and an oval is its two-axis version. Width sets the long
            horizontal span; height sets the short vertical span. Change either
            number and the whole ring changes, so an oval is a pair such as
            21×9, not a single diameter.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Everyday speech uses &quot;oval&quot; for any stretched circle. In
            geometry, an ellipse is a precise curve defined by two axes and two
            focal points. A Minecraft oval approximates that proportion on a
            grid: each row ends where the blocks say it ends, so the edge steps.
            At build scale it reads as an oval, which is enough for a wall
            opening, pool, or courtyard.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Choose Width and Height Before You Build
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Width is the long horizontal axis; height is the short vertical
            axis. Say the pair width first, height second, so you do not swap
            them halfway through. All CircleGen oval pairs are odd: 15×7, 21×9,
            25×13, 31×15, 41×21, 51×25, and larger combinations such as 61×31.
            Odd values keep one center block on both axes, which makes the
            center easy to mark and the quadrants easy to mirror.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            The greater the width-to-height ratio, the flatter the oval. A 41×21
            ring is close to two blocks wide for every block of height; 25×13
            has a similar proportion at smaller scale, while 15×7 is short
            enough for a window. Pick the pair by the space you need to fill.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm text-ink">
              <thead>
                <tr className="border-b-2 border-mc-border">
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Width × height
                  </th>
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Outline blocks
                  </th>
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Filled blocks
                  </th>
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Stacks of 64
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm leading-7">
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">15×7</td>
                  <td className="px-3 py-2">42</td>
                  <td className="px-3 py-2">69</td>
                  <td className="px-3 py-2">2</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">21×9</td>
                  <td className="px-3 py-2">62</td>
                  <td className="px-3 py-2">133</td>
                  <td className="px-3 py-2">3</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">31×15</td>
                  <td className="px-3 py-2">90</td>
                  <td className="px-3 py-2">337</td>
                  <td className="px-3 py-2">6</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">41×21</td>
                  <td className="px-3 py-2">122</td>
                  <td className="px-3 py-2">641</td>
                  <td className="px-3 py-2">11</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm leading-7 text-muted">
            Counts come from CircleGen&apos;s outline and filled blueprints.
            Stacks round up from the filled count: 133 blocks need three stacks,
            and 641 need eleven. Add extra for a second wall ring, a floor, or
            mistakes.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Build the Oval in Six Steps
          </h2>
          <ol className="mt-3 space-y-3 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">1. Mark the center.</strong> Place a
              temporary block or pillar at the center. For a flat floor, mark
              the center cell with a different block until the outline is done;
              every measurement starts here.
            </li>
            <li>
              <strong className="text-ink">2. Mark the four axis endpoints.</strong>{" "}
              On an odd-width oval, the horizontal endpoints sit (width - 1) / 2
              blocks from the center and the vertical endpoints (height - 1) / 2.
              A 31×15 oval reaches 15 blocks left and right and 7 blocks up and
              down.
            </li>
            <li>
              <strong className="text-ink">3. Build one quadrant and mirror it.</strong>{" "}
              Start with the northeast quadrant, from the top endpoint to the
              east endpoint. Copy it west, then mirror both halves south. The
              grid makes this a cell-by-cell copy instead of an eyeballed curve.
            </li>
            <li>
              <strong className="text-ink">4. Check symmetry before filling.</strong>{" "}
              Compare rows the same distance above and below the horizontal
              axis, and columns the same distance left and right of the vertical
              axis. Walk the four endpoints again. A one-block error is easiest
              to fix while the ring is open.
            </li>
            <li>
              <strong className="text-ink">5. Finish the outline first.</strong>{" "}
              Close the full ring and check it from the front and above. The
              shape should run flat along the middle and step inward at the
              ends, not bulge on one side.
            </li>
            <li>
              <strong className="text-ink">6. Fill second.</strong> Fill row by
              row inside the finished ring. Filling early hides the center line
              and makes a lopsided outline harder to spot.
            </li>
          </ol>
          <figure className="mt-5 border-2 border-mc-border bg-panel-2 p-3">
            <img
              src="/shape-pngs/oval-21-9.webp"
              alt="Generated diagram (not an in-game screenshot) of a 21 by 9 oval outline blueprint for Minecraft"
              width={461}
              height={209}
              loading="lazy"
              className="mx-auto h-auto w-full max-w-[360px] [image-rendering:pixelated]"
            />
            <figcaption className="mt-3 text-sm leading-6 text-muted">
              Generated diagram, not a render or in-game screenshot: the 21×9
              outline blueprint. The long axis is horizontal and the short axis
              vertical, so the ring stays one block wide around a hollow middle.
            </figcaption>
          </figure>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Hollow Ovals, Filled Ovals, and Wall Thickness
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            An outline blueprint is a one-block ring with an empty middle: the
            right start for a pond, fountain, window frame, arena border, or
            courtyard wall. A filled blueprint includes every inside cell, which
            suits a floor, table top, or solid slab.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            For a one-block ring, the nominal clear box is width - 2 by height -
            2: 21×9 gives 19×7, and 31×15 gives 29×13. Treat that as a maximum,
            not a guarantee. The stepped curve cuts the corners and can pinch
            the space near the ends, so check the actual rows. A second inner
            ring gives a two-block wall and shrinks the clear box to 17×5 and
            27×11.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            A thin ring is cheap but weak at a distance. If the oval is a pond
            edge, a raised rim, or a wall seen across a courtyard, plan a second
            course or a row of slabs before you lay the first ring.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            What Each Oval Size Is Good For
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">15×7: window or fountain.</strong> A
              42-block{" "}
              <Link href="/oval/15/7/" className="pixel-link">
                15×7 oval outline
              </Link>{" "}
              fits a wall bay or small basin. The 69-block filled version takes
              two stacks.
            </li>
            <li>
              <strong className="text-ink">21×9: pond or table.</strong> The{" "}
              <Link href="/oval/21/9/" className="pixel-link">
                21×9 oval
              </Link>{" "}
              is wide enough for a garden pond or a long table top. Its 62-block
              ring is quick to place; the 133-block fill takes three stacks.
            </li>
            <li>
              <strong className="text-ink">31×15: arena or courtyard.</strong> A{" "}
              <Link href="/oval/31/15/" className="pixel-link">
                31×15 oval
              </Link>{" "}
              gives a fenced arena floor or a courtyard border with room for a
              center feature. The outline is 90 blocks; a filled floor is 337
              blocks, or six stacks.
            </li>
            <li>
              <strong className="text-ink">41×21: plaza or large pool.</strong>{" "}
              The{" "}
              <Link href="/oval/41/21/" className="pixel-link">
                41×21 oval
              </Link>{" "}
              suits a spawn plaza, a formal pool, or a market ring. Expect 122
              blocks for the outline and 641 for the fill, about eleven stacks.
            </li>
          </ul>
          <p className="mt-3 text-sm leading-7 text-muted">
            An oval earns its place when a circle would leave too much empty
            space. A circle occupies a square footprint; an oval can stretch to
            a long wall or rectangular lawn while keeping a curved edge. The{" "}
            <Link href="/blog/minecraft-circle-guide/" className="pixel-link">
              circle guide
            </Link>{" "}
            covers the one-axis pattern, the{" "}
            <Link href="/blog/minecraft-circle-sizes/" className="pixel-link">
              circle size chart
            </Link>{" "}
            helps match a width to a room, and the{" "}
            <Link href="/blog/minecraft-sphere-guide/" className="pixel-link">
              sphere guide
            </Link>{" "}
            covers round 3D forms.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Fixing a Lopsided Oval
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">Wrong center.</strong> If one end
              looks longer, recount from the center, not from the opposite edge.
            </li>
            <li>
              <strong className="text-ink">Width and height swapped.</strong> A
              21×9 oval is wide and shallow; 9×21 is tall and narrow. Say the
              pair width first and check the blueprint orientation before
              placing blocks.
            </li>
            <li>
              <strong className="text-ink">Filled before checking symmetry.</strong>{" "}
              A solid middle hides the center line. Finish and inspect the ring,
              then fill.
            </li>
            <li>
              <strong className="text-ink">Even dimensions in an odd build.</strong>{" "}
              An odd oval has a single center block that lines up with odd-width
              doors, paths, and rooms. If the surrounding build is odd, keep both
              oval dimensions odd.
            </li>
            <li>
              <strong className="text-ink">A ring that is too thin.</strong> One
              block suits a garden border; a fountain wall or window frame may
              need a second course. Thicken inward so the outside dimensions stay
              correct.
            </li>
          </ul>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">FAQ</h2>
          <div className="mt-3 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-ink">
                Is a Minecraft oval the same as an ellipse?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Not exactly. In math, an ellipse is a precise curve defined by
                two axes and two focal points. A Minecraft oval approximates
                that proportion on a grid: the square cells decide the edge, so
                it moves in steps. At build scale it reads as an oval, but it is
                not a mathematically exact ellipse. CircleGen calls the shape an
                oval and shows the block pattern for each indexed pair.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                What size oval should I build?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Start with the footprint. Match the width to the long horizontal
                space and the height to the short vertical space. A 15×7 oval
                suits a window or fountain rim, 21×9 a pond or table, 31×15 an
                arena or courtyard, and 41×21 a plaza or large pool. If a circle
                would leave wide empty corners, a flatter oval fills the area
                better.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                Can I make a hollow oval?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Yes. The outline blueprint is already a hollow one-block ring,
                so leave the middle empty and add a floor, water, or grass. For a
                one-block wall, the nominal clear box is width minus 2 by height
                minus 2, but the stepped ends can pinch it. Check the actual rows
                before promising a full rectangle. Add a second inner ring for
                thicker walls.
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
