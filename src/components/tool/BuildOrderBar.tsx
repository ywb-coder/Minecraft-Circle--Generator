"use client";

import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function BuildOrderBar({
  total,
  current,
  playing,
  speed,
  onToggle,
  onSpeed,
  onReset,
  dict,
}: {
  total: number;
  current: number;
  playing: boolean;
  speed: number;
  onToggle: () => void;
  onSpeed: (speed: number) => void;
  onReset: () => void;
  dict: Dictionary;
}) {
  return (
    <div className="flex w-full flex-wrap items-center gap-3">
      <button type="button" className="mc-btn px-2! py-1!" onClick={onToggle}>
        {playing ? "⏸" : "▶"}
      </button>
      <button type="button" className="mc-btn px-2! py-1!" onClick={onReset}>
        ↺
      </button>
      <div className="flex min-w-[160px] flex-1 items-center gap-2">
        <span className="font-pixel text-[10px] text-muted">{dict.tool.speed}</span>
        <input
          type="range"
          min={0.5}
          max={5}
          step={0.5}
          value={speed}
          onChange={(e) => onSpeed(Number(e.target.value))}
          className="w-full"
          style={{ accentColor: "var(--accent)" }}
        />
        <span className="font-terminal text-lg text-ink">{speed}x</span>
      </div>
      <p className="font-terminal text-2xl text-accent">
        {current} / {total}
      </p>
    </div>
  );
}
