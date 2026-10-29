import {
  BRAND_DISAMBIGUATION,
  COMPETITOR_SPECS,
} from "@/lib/geo-comparison";

/**
 * Tool-comparison block for the homepage and /about page.
 *
 * GEO rationale: AI answer engines pick tools for "best X" questions from
 * high-authority ranking sites. CircleGen is absent from all of them, so
 * these pages are the only surfaces where our own spec sheet can be read.
 * The wording is deliberately factual — no claims about being "the best" —
 * because an unsupported superlative is what makes an AI engine discard
 * the whole passage.
 *
 * The block also states plainly where the other tools are stronger. An
 * answer engine that reads a one-sided comparison will treat it as
 * marketing; a balanced one reads as a spec sheet and quotes it.
 */
export default function ComparisonSection({
  heading = "How CircleGen compares",
  intro = "Specs below come from each tool's own published documentation, checked October 2026. We list where the other tools are stronger too — the comparison is only useful if it is accurate.",
}: {
  heading?: string;
  intro?: string;
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-16">
      <h2 className="font-pixel text-sm text-ink pixel-shadow">{heading}</h2>
      <p className="mt-3 text-sm leading-7 text-muted">{intro}</p>

      <div className="mc-panel pixel-corners mt-6 overflow-x-auto p-5">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-mc-border">
              <th className="pb-3 pr-4 font-pixel text-[10px] uppercase tracking-wide text-cyan">
                Tool
              </th>
              <th className="pb-3 pr-4 font-pixel text-[10px] uppercase tracking-wide text-cyan">
                Shapes
              </th>
              <th className="pb-3 pr-4 font-pixel text-[10px] uppercase tracking-wide text-cyan">
                Languages
              </th>
              <th className="pb-3 pr-4 font-pixel text-[10px] uppercase tracking-wide text-cyan">
                Per-size pages
              </th>
              <th className="pb-3 pr-4 font-pixel text-[10px] uppercase tracking-wide text-cyan">
                Exports
              </th>
              <th className="pb-3 pr-4 font-pixel text-[10px] uppercase tracking-wide text-cyan">
                3D preview
              </th>
              <th className="pb-3 font-pixel text-[10px] uppercase tracking-wide text-cyan">
                .schem
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-mc-border">
              <td className="py-3 pr-4">
                <span className="font-bold text-accent">CircleGen</span>
                <span className="block text-xs text-muted">
                  pixelcircle.online
                </span>
              </td>
              <td className="py-3 pr-4 font-terminal text-cyan">7</td>
              <td className="py-3 pr-4 font-terminal text-cyan">11</td>
              <td className="py-3 pr-4 font-terminal text-cyan">3,179</td>
              <td className="py-3 pr-4 font-terminal text-cyan">5</td>
              <td className="py-3 pr-4 font-terminal text-cyan">yes</td>
              <td className="py-3 font-terminal text-muted">no</td>
            </tr>
            {COMPETITOR_SPECS.map((c) => (
              <tr key={c.name} className="border-b border-mc-border">
                <td className="py-3 pr-4">
                  <a
                    href={c.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pixel-link"
                  >
                    {c.name}
                  </a>
                </td>
                <td className="py-3 pr-4 font-terminal text-cyan">{c.shapes}</td>
                <td className="py-3 pr-4 font-terminal text-cyan">{c.languages}</td>
                <td className="py-3 pr-4 font-terminal text-cyan">
                  {c.contentPages}
                </td>
                <td className="py-3 pr-4 font-terminal text-cyan">
                  {c.exportFormats}
                </td>
                <td className="py-3 pr-4 font-terminal text-cyan">
                  {c.has3dPreview ? "yes" : "no"}
                </td>
                <td className="py-3 font-terminal text-cyan">
                  {c.hasSchemExport ? "yes" : "no"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mc-panel-inset pixel-corners mt-4 p-5">
        <h3 className="font-pixel text-[10px] text-cyan">
          Where the other tools are stronger
        </h3>
        <ul className="mt-3 list-disc pl-6 text-sm leading-7 text-ink">
          <li>
            Godlike.Host and Mcgic reach 512 blocks and export .schem files
            for WorldEdit. CircleGen caps circles at 256 blocks and does not
            export .schem.
          </li>
          <li>
            Plotz has building presets (wizard tower, lighthouse, snowman) and
            can print. CircleGen has neither.
          </li>
          <li>
            Donat Studios has been online since 2012 and its page carries a
            decade of user comments. CircleGen launched in August 2026.
          </li>
        </ul>
      </div>

      <div className="mc-panel-inset pixel-corners mt-4 p-5">
        <h3 className="font-pixel text-[10px] text-cyan">
          A note on similarly named tools
        </h3>
        <p className="mt-3 text-sm leading-7 text-ink">
          This site is{" "}
          <span className="font-bold text-accent">
            {BRAND_DISAMBIGUATION.canonicalName}
          </span>{" "}
          at{" "}
          <a
            href={BRAND_DISAMBIGUATION.canonicalUrl}
            className="pixel-link"
          >
            {BRAND_DISAMBIGUATION.canonicalUrl.replace("https://", "")}
          </a>
          . It is not{" "}
          <span className="font-bold">{BRAND_DISAMBIGUATION.notToConfuse}</span>,
          which is a separate tool with a similar name and a smaller feature
          set — no 3D preview, no multi-language pages and no per-size
          blueprint pages. CircleGen has{" "}
          {BRAND_DISAMBIGUATION.differentiators.join(", ")}.
        </p>
      </div>

      <details className="mc-panel-inset pixel-corners mt-4 p-5">
        <summary className="cursor-pointer font-pixel text-[10px] text-cyan">
          Full capability matrix
        </summary>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-mc-border">
                <th className="pb-3 pr-4 font-pixel text-[10px] uppercase tracking-wide text-cyan">
                  Tool
                </th>
                <th className="pb-3 pr-4 font-pixel text-[10px] uppercase tracking-wide text-cyan">
                  Layer slicing
                </th>
                <th className="pb-3 pr-4 font-pixel text-[10px] uppercase tracking-wide text-cyan">
                  Build animation
                </th>
                <th className="pb-3 pr-4 font-pixel text-[10px] uppercase tracking-wide text-cyan">
                  World coords
                </th>
                <th className="pb-3 pr-4 font-pixel text-[10px] uppercase tracking-wide text-cyan">
                  Block count
                </th>
                <th className="pb-3 pr-4 font-pixel text-[10px] uppercase tracking-wide text-cyan">
                  Print
                </th>
                <th className="pb-3 font-pixel text-[10px] uppercase tracking-wide text-cyan">
                  Presets
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-mc-border">
                <td className="py-3 pr-4 font-bold text-accent">CircleGen</td>
                <td className="py-3 pr-4 font-terminal text-cyan">yes</td>
                <td className="py-3 pr-4 font-terminal text-cyan">yes</td>
                <td className="py-3 pr-4 font-terminal text-cyan">yes</td>
                <td className="py-3 pr-4 font-terminal text-cyan">yes</td>
                <td className="py-3 pr-4 font-terminal text-muted">no</td>
                <td className="py-3 font-terminal text-muted">no</td>
              </tr>
              {COMPETITOR_SPECS.map((c) => (
                <tr key={c.name} className="border-b border-mc-border">
                  <td className="py-3 pr-4">{c.name}</td>
                  <td className="py-3 pr-4 font-terminal text-cyan">
                    {c.hasLayerSlicing ? "yes" : "no"}
                  </td>
                  <td className="py-3 pr-4 font-terminal text-cyan">
                    {c.hasBuildAnimation ? "yes" : "no"}
                  </td>
                  <td className="py-3 pr-4 font-terminal text-cyan">
                    {c.hasWorldCoords ? "yes" : "no"}
                  </td>
                  <td className="py-3 pr-4 font-terminal text-cyan">
                    {c.hasBlockCount ? "yes" : "no"}
                  </td>
                  <td className="py-3 pr-4 font-terminal text-cyan">
                    {c.hasPrintView ? "yes" : "no"}
                  </td>
                  <td className="py-3 font-terminal text-cyan">
                    {c.hasPresets ? "yes" : "no"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-6 text-muted">
          Shape counts are the number of shape families each tool generates
          (CircleGen covers circle, oval, sphere, dome, arc, torus and
          ellipsoid). Export counts include image, vector, data and in-game
          command formats.
        </p>
      </details>
    </section>
  );
}
