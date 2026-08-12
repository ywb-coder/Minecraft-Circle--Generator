"use client";

import { BLOCKS } from "@/lib/blocks";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function BlockPalette({
  value,
  onChange,
  dict,
}: {
  value: string;
  onChange: (id: string) => void;
  dict: Dictionary;
}) {
  return (
    <div>
      <p className="font-pixel text-[10px] text-muted">{dict.tool.blockColors}</p>
      <div className="mt-2 grid grid-cols-6 gap-1.5">
        {BLOCKS.map((block) => (
          <button
            key={block.id}
            type="button"
            title={block.name}
            aria-label={block.name}
            aria-pressed={value === block.id}
            onClick={() => onChange(block.id)}
            className={`h-7 w-7 border-2 border-mc-border ${value === block.id ? "mc-btn-selected" : ""}`}
            style={{ background: block.color }}
          />
        ))}
      </div>
    </div>
  );
}
