import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function SizeGuideTable({ dict }: { dict: Dictionary }) {
  return (
    <div className="mc-panel pixel-corners p-3">
      <h2 className="font-pixel text-[10px] text-ink">{dict.sizeGuide.title}</h2>
      <table className="mt-3 w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-mc-border text-left">
            <th className="pb-2 pr-4 font-pixel text-[10px] text-muted">
              {dict.tool.diameter}
            </th>
            <th className="pb-2 font-pixel text-[10px] text-muted">
              {dict.tool.sizeUse}
            </th>
          </tr>
        </thead>
        <tbody>
          {dict.sizeGuide.entries.map((entry) => (
            <tr key={entry.size} className="border-b border-mc-border/40">
              <td className="py-1.5 pr-4 font-terminal text-2xl text-accent">
                {entry.size}
              </td>
              <td className="py-1.5 text-sm text-ink">{entry.use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
