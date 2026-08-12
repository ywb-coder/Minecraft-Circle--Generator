import type { Point } from "@/lib/shapes";

const CONTEXT_FILL = "rgba(251,191,36,0.25)";

function buildPathData(
  points: Point[],
  cell: number,
  ox: number,
  topBase: number,
  minX: number,
  minY: number
): string {
  let d = "";
  for (const p of points) {
    const x = (p.x + ox - minX) * cell;
    const y = (topBase - p.y - minY) * cell;
    d += `M${x} ${y}h${cell}v${cell}h-${cell}z`;
  }
  return d;
}

export default function BlueprintGrid({
  points,
  sizeW,
  sizeH,
  color,
  label,
  cellMaxWidth = 24,
  highlight,
  context,
}: {
  points: Point[];
  sizeW: number;
  sizeH: number;
  color: string;
  label?: string;
  cellMaxWidth?: number;
  highlight?: Point | null;
  context?: Point[];
}) {
  const set = new Set(points.map((p) => `${p.x},${p.y}`));
  const contextSet = context ? new Set(context.map((p) => `${p.x},${p.y}`)) : null;
  const highlightKey = highlight ? `${highlight.x},${highlight.y}` : null;

  if (sizeW * sizeH > 4096) {
    const cell = Math.max(1, Math.min(24, Math.floor(448 / sizeW)));
    const ox = Math.floor(sizeW / 2);
    const topBase = sizeH - 1 - Math.floor(sizeH / 2);
    const all = [...points, ...(context ?? []), ...(highlight ? [highlight] : [])];
    if (all.length === 0) {
      return (
        <div
          aria-label={label}
          className="mc-panel-inset pixel-corners inline-block max-w-full overflow-auto p-2"
        >
          <svg width={0} height={0} className="block" role="img" aria-label={label} />
        </div>
      );
    }
    let minX = Infinity;
    let minY = Infinity;
    for (const p of all) {
      const gx = p.x + ox;
      const gy = topBase - p.y;
      if (gx < minX) minX = gx;
      if (gy < minY) minY = gy;
    }
    const w = (Math.max(...all.map((p) => p.x + ox)) - minX + 1) * cell;
    const h = (Math.max(...all.map((p) => topBase - p.y)) - minY + 1) * cell;
    return (
      <div
        aria-label={label}
        className="mc-panel-inset pixel-corners inline-block max-w-full overflow-auto p-2"
      >
        <svg
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          role="img"
          aria-label={label}
          className="block"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.18) 1px, transparent 1px)",
            backgroundSize: `${cell}px ${cell}px`,
            backgroundPosition: `${-minX * cell}px ${-minY * cell}px`,
          }}
        >
          <path
            d={buildPathData(points, cell, ox, topBase, minX, minY)}
            fill={color}
          />
          {context && context.length > 0 && (
            <path
              d={buildPathData(context, cell, ox, topBase, minX, minY)}
              fill={CONTEXT_FILL}
            />
          )}
          {highlight && (
            <path
              d={buildPathData([highlight], cell, ox, topBase, minX, minY)}
              fill="var(--accent)"
            />
          )}
        </svg>
      </div>
    );
  }

  const cells: { x: number; y: number; on: boolean }[] = [];
  for (let y = sizeH - 1; y >= 0; y--) {
    for (let x = 0; x < sizeW; x++) {
      const px = x - Math.floor(sizeW / 2);
      const py = y - Math.floor(sizeH / 2);
      cells.push({ x: px, y: py, on: set.has(`${px},${py}`) });
    }
  }
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
          const inContext =
            contextSet?.has(`${c.x},${c.y}`) === true;
          return (
            <div
              key={`${c.x},${c.y}`}
              title={`${c.x},${c.y}`}
              className="aspect-square w-full"
              style={{
                background: c.on
                  ? color
                  : inContext
                    ? CONTEXT_FILL
                    : "transparent",
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
