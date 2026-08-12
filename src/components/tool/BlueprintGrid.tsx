import { memo } from "react";
import type { Point } from "@/lib/shapes";

function BlueprintGridBase({
  points,
  sizeW,
  sizeH,
  color,
  label,
  cellMaxWidth = 24,
  highlight,
  context,
  interactive = false,
  placedKeys,
  onCellClick,
  showCoords = false,
  rowCounts = false,
}: {
  points: Point[];
  sizeW: number;
  sizeH: number;
  color: string;
  label?: string;
  cellMaxWidth?: number;
  highlight?: Point | null;
  context?: Point[];
  interactive?: boolean;
  placedKeys?: Set<string>;
  onCellClick?: (x: number, y: number) => void;
  showCoords?: boolean;
  rowCounts?: boolean;
}) {
  const set = new Set(points.map((p) => `${p.x},${p.y}`));
  const contextSet = context ? new Set(context.map((p) => `${p.x},${p.y}`)) : null;
  const highlightKey = highlight ? `${highlight.x},${highlight.y}` : null;
  const cells: { x: number; y: number; on: boolean }[] = [];
  for (let y = sizeH - 1; y >= 0; y--) {
    for (let x = 0; x < sizeW; x++) {
      const px = x - Math.floor(sizeW / 2);
      const py = y - Math.floor(sizeH / 2);
      cells.push({ x: px, y: py, on: set.has(`${px},${py}`) });
    }
  }

  const svgMode = sizeW * sizeH > 2048;
  if (svgMode) {
    const cell = Math.max(1, Math.min(24, Math.floor(448 / sizeW)));
    const ox = Math.floor(sizeW / 2);
    const oy = Math.floor(sizeH / 2);
    const pathFor = (pts: Point[]) => {
      let d = "";
      for (const p of pts) {
        const x = (p.x + ox) * cell;
        const y = (p.y + oy) * cell;
        d += `M${x} ${y}h${cell}v${cell}h-${cell}z`;
      }
      return d;
    };
    return (
      <div
        aria-label={label}
        className="mc-panel-inset pixel-corners inline-block max-w-full overflow-auto p-2"
      >
        <svg
          width={sizeW * cell}
          height={sizeH * cell}
          viewBox={`0 0 ${sizeW * cell} ${sizeH * cell}`}
          className="block"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.18) 1px, transparent 1px)",
            backgroundSize: `${cell}px ${cell}px`,
          }}
        >
          {context ? (
            <path d={pathFor(context)} fill="rgba(251,191,36,0.25)" />
          ) : null}
          <path d={pathFor(points)} fill={color} />
        </svg>
      </div>
    );
  }

  const rowCountsMap: Record<number, number> = {};
  if (rowCounts) {
    for (const p of points) {
      rowCountsMap[p.y] = (rowCountsMap[p.y] ?? 0) + 1;
    }
  }

  return (
    <div
      aria-label={label}
      className="mc-panel-inset pixel-corners inline-block max-w-full overflow-auto p-2"
    >
      <div className="flex">
        {showCoords && (
          <div className="mr-1 flex flex-col justify-between py-0.5">
            {cells
              .filter((_, i) => i % sizeW === 0)
              .map((c, row) => (
                <span
                  key={row}
                  className="flex h-6 items-center font-terminal text-[10px] leading-none text-muted"
                >
                  {c.y}
                </span>
              ))}
          </div>
        )}
        <div>
          {showCoords && (
            <div className="mb-1 flex">
              {cells.slice(0, sizeW).map((c) => (
                <span
                  key={c.x}
                  className="flex h-6 w-6 shrink-0 items-center justify-center font-terminal text-[10px] leading-none text-muted"
                >
                  {c.x}
                </span>
              ))}
              {rowCounts && <span className="w-6 shrink-0" />}
            </div>
          )}
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${sizeW}, minmax(0, 1fr))`,
              gap: 1,
              width: sizeW * cellMaxWidth,
            }}
          >
            {cells.map((c) => {
              const key = `${c.x},${c.y}`;
              const isHighlight = highlightKey === key;
              const isPlaced = placedKeys?.has(key) ?? false;
              const isContext = contextSet?.has(key) ?? false;
              return (
                <div
                  key={key}
                  title={key}
                  onClick={interactive && onCellClick ? () => onCellClick(c.x, c.y) : undefined}
                  className="aspect-square w-full"
                  style={{
                    background: c.on ? color : isContext ? "rgba(251,191,36,0.25)" : "transparent",
                    border: isPlaced
                      ? "2px solid #4ade80"
                      : isHighlight
                        ? "2px solid var(--accent)"
                        : c.on
                          ? "1px solid rgba(5,13,31,0.9)"
                          : "1px solid rgba(5,13,31,0.55)",
                    cursor: interactive ? "pointer" : undefined,
                  }}
                />
              );
            })}
          </div>
        </div>
        {rowCounts && (
          <div className="ml-1 flex flex-col justify-between py-0.5">
            {Array.from({ length: sizeH }, (_, row) => {
              const y = Math.floor(sizeH / 2) - row;
              return (
                <span
                  key={row}
                  className="flex h-6 items-center font-terminal text-[10px] leading-none text-accent"
                >
                  {rowCountsMap[y] ?? 0}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(BlueprintGridBase);
