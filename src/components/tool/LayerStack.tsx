import { memo } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Point } from "@/lib/shapes";

function layerPath(points: Point[]): { d: string; w: number; h: number; cell: number } {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const p of points) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.y > maxY) maxY = p.y;
  }
  const width = maxX - minX + 1;
  const height = maxY - minY + 1;
  const cell = Math.max(1, Math.min(4, Math.floor(120 / width)));
  const w = width * cell;
  const h = height * cell;
  let d = "";
  for (const p of points) {
    const x = (p.x - minX) * cell;
    const y = (p.y - minY) * cell;
    d += `M${x} ${y}h${cell}v${cell}h-${cell}z`;
  }
  return { d, w, h, cell };
}

export default memo(function LayerStack({
  layers,
  activeIndex,
  color,
  dict,
  onSelect,
}: {
  layers: { z: number; points: Point[] }[];
  activeIndex: number;
  color: string;
  dict: Dictionary;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex w-full max-w-md flex-col gap-1.5">
      {layers.map((layer, displayIndex) => {
        const index = layers.length - 1 - displayIndex;
        const active = index === activeIndex;
        return (
          <button
            key={layer.z}
            type="button"
            onClick={() => onSelect(index)}
            aria-pressed={active}
            data-testid="layer-row"
            style={active ? { borderColor: "var(--accent)" } : undefined}
            className={`flex items-center gap-3 border-2 px-2 py-1 text-left ${
              active ? "bg-panel" : "border-transparent bg-panel-2/50 hover:bg-panel-2"
            }`}
          >
            <span className="shrink-0 font-pixel text-[10px] text-muted">
              {dict.tool.layer} {index + 1}
            </span>
            <LayerMini points={layer.points} color={color} />
          </button>
        );
      })}
    </div>
  );
});

function LayerMini({ points, color }: { points: Point[]; color: string }) {
  if (points.length === 0) {
    return <span className="font-terminal text-sm text-muted">—</span>;
  }
  const { d, w, h, cell } = layerPath(points);
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="block shrink-0"
      style={{
        backgroundColor: "rgba(5,13,31,0.55)",
        backgroundImage:
          "linear-gradient(rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.18) 1px, transparent 1px)",
        backgroundSize: `${cell}px ${cell}px`,
      }}
    >
      <path d={d} fill={color} />
    </svg>
  );
}
