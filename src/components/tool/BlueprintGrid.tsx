import type { Point } from "@/lib/shapes";

export default function BlueprintGrid({
  points,
  sizeW,
  sizeH,
  color,
  label,
  cellMaxWidth = 24,
  highlight,
}: {
  points: Point[];
  sizeW: number;
  sizeH: number;
  color: string;
  label?: string;
  cellMaxWidth?: number;
  highlight?: Point | null;
}) {
  const set = new Set(points.map((p) => `${p.x},${p.y}`));
  const cells: { x: number; y: number; on: boolean }[] = [];
  for (let y = sizeH - 1; y >= 0; y--) {
    for (let x = 0; x < sizeW; x++) {
      const px = x - Math.floor(sizeW / 2);
      const py = y - Math.floor(sizeH / 2);
      cells.push({ x: px, y: py, on: set.has(`${px},${py}`) });
    }
  }
  const highlightKey = highlight ? `${highlight.x},${highlight.y}` : null;
  return (
    <div
      aria-label={label}
      className="mc-panel-inset pixel-corners inline-block max-w-full overflow-auto p-2"
    >
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${sizeW}, minmax(0, 1fr))`,
          gap: 1,
          maxWidth: sizeW * cellMaxWidth,
        }}
      >
        {cells.map((c) => {
          const isHighlight = highlightKey === `${c.x},${c.y}`;
          return (
            <div
              key={`${c.x},${c.y}`}
              title={`${c.x},${c.y}`}
              className="aspect-square w-full"
              style={{
                background: c.on ? color : "transparent",
                border: isHighlight
                  ? "2px solid var(--accent)"
                  : c.on
                    ? "1px solid rgba(5,13,31,0.9)"
                    : "1px solid rgba(5,13,31,0.55)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
