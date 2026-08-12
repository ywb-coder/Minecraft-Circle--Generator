import type { Layer, Point, ShapeResult } from "@/lib/shapes";

const FILLED = "var(--accent)";

function boundsOf(points: Point[]) {
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
  return { minX, maxX, minY, maxY };
}

function buildPathData(points: Point[], minX: number, minY: number, cell: number): string {
  let d = "";
  for (const p of points) {
    const x = (p.x - minX) * cell;
    const y = (p.y - minY) * cell;
    d += `M${x} ${y}h${cell}v${cell}h-${cell}z`;
  }
  return d;
}

/**
 * Blueprint rendered as a single SVG <path> instead of one div per block,
 * so HTML size stays proportional to the outline instead of the area.
 */
export function BlueprintGrid({ shape }: { shape: ShapeResult }) {
  const { minX, maxX, minY, maxY } = boundsOf(shape.points);
  const width = maxX - minX + 1;
  const height = maxY - minY + 1;
  const cell = Math.max(1, Math.min(24, Math.floor(448 / width)));
  const w = width * cell;
  const h = height * cell;
  return (
    <div className="mc-panel-inset pixel-corners max-w-full overflow-x-auto p-2">
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        role="img"
        aria-label={`${shape.width}x${shape.height} blueprint`}
        className="block"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.18) 1px, transparent 1px)",
          backgroundSize: `${cell}px ${cell}px`,
        }}
      >
        <path d={buildPathData(shape.points, minX, minY, cell)} fill={FILLED} />
      </svg>
    </div>
  );
}

export function LayerGrid({ layer }: { layer: Layer }) {
  if (layer.points.length === 0) return null;
  const { minX, maxX, minY, maxY } = boundsOf(layer.points);
  const width = maxX - minX + 1;
  const height = maxY - minY + 1;
  if (Math.max(width, height) > 64) {
    return (
      <span className="font-terminal text-sm text-muted">
        Ø {width}
      </span>
    );
  }
  const filled = new Set(layer.points.map((p) => `${p.x},${p.y}`));
  const rows: string[] = [];
  for (let y = maxY; y >= minY; y--) {
    let row = "";
    for (let x = minX; x <= maxX; x++) {
      row += filled.has(`${x},${y}`) ? "#" : ".";
    }
    rows.push(row);
  }
  return (
    <div className="inline-block max-w-full overflow-x-auto border border-mc-border bg-panel-2 p-2">
      <pre
        aria-label={`Layer ${layer.z}`}
        className="font-terminal text-sm leading-none text-cyan"
      >
        {rows.join("\n")}
      </pre>
    </div>
  );
}
