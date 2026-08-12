import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function SizeGuide({ dict }: { dict: Dictionary }) {
  return (
    <section className="mc-panel-inset pixel-corners mt-10 p-5">
      <h2 className="font-pixel text-[10px] uppercase tracking-wide text-cyan">
        {dict.sizeGuide.title}
      </h2>
      <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
        {dict.sizeGuide.entries.map((entry) => (
          <li
            key={entry.size}
            className="flex items-baseline gap-2 text-sm"
          >
            <span className="font-terminal text-xl text-accent">
              {entry.size}
            </span>
            <span className="text-ink">
              {entry.use}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
