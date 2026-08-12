import type { Layer, Point, ShapeResult } from "@/lib/shapes";

const FILLED = "#4ade80";

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

/**
 * Renders only the filled cells (absolutely positioned) instead of one div
 * per grid cell, so cost is O(blocks) instead of O(size²). The empty cells
 * are suggested by a CSS grid-line background.
 */
function FilledCells({
  points,
  minX,
  minY,
  width,
  height,
  cell,
}: {
  points: Point[];
  minX: number;
  minY: number;
  width: number;
  height: number;
  cell: number;
}) {
  return (
    <div
      className="relative"
      style={{
        width: width * cell,
        height: height * cell,
        backgroundImage:
          "linear-gradient(rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.18) 1px, transparent 1px)",
        backgroundSize: `${cell}px ${cell}px`,
      }}
    >
      {points.map((p) => (
        <div
          key={`${p.x},${p.y}`}
          title={`${p.x}, ${p.y}`}
          style={{
            position: "absolute",
            left: (p.x - minX) * cell,
            top: (p.y - minY) * cell,
            width: cell,
            height: cell,
            backgroundColor: FILLED,
          }}
        />
      ))}
    </div>
  );
}

export function BlueprintGrid({ shape }: { shape: ShapeResult }) {
  const { minX, maxX, minY, maxY } = boundsOf(shape.points);
  const width = maxX - minX + 1;
  const height = maxY - minY + 1;
  const cell = Math.max(1, Math.min(24, Math.floor(448 / width)));
  return (
    <div className="mc-panel-inset pixel-corners max-w-full overflow-x-auto p-2">
      <FilledCells
        points={shape.points}
        minX={minX}
        minY={minY}
        width={width}
        height={height}
        cell={cell}
      />
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
