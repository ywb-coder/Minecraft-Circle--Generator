import type { CircleStyle, Point } from "./types";

/**
 * Outline oval: cells whose normalized distance (x/rx)^2 + (y/ry)^2 falls in
 * [(1 - 0.5/rmin)^2, (1 + 0.5/rmin)^2), keeping the ring one cell thick in
 * the minor axis.
 */
export function outlineOval(w: number, h: number): Point[] {
  const rx = (w - 1) / 2;
  const ry = (h - 1) / 2;
  const rmin = Math.min(rx, ry);
  const lo = (1 - 0.5 / rmin) * (1 - 0.5 / rmin);
  const hi = (1 + 0.5 / rmin) * (1 + 0.5 / rmin);
  const cells: Point[] = [];
  for (let y = -Math.round(ry); y <= Math.round(ry); y++) {
    for (let x = -Math.round(rx); x <= Math.round(rx); x++) {
      const nx = x / rx;
      const ny = y / ry;
      const d2 = nx * nx + ny * ny;
      if (d2 >= lo && d2 < hi) {
        cells.push({ x, y });
      }
    }
  }
  return cells;
}

/** Filled oval: every row y, cells |x| <= round(rx * sqrt(1 - (y/ry)^2)). */
export function filledOval(w: number, h: number): Point[] {
  const rx = (w - 1) / 2;
  const ry = (h - 1) / 2;
  const cells: Point[] = [];
  for (let y = -Math.round(ry); y <= Math.round(ry); y++) {
    const ratio = 1 - (y * y) / (ry * ry);
    const xm = Math.round(rx * Math.sqrt(Math.max(0, ratio)));
    for (let x = -xm; x <= xm; x++) {
      cells.push({ x, y });
    }
  }
  return cells;
}

/** Classic chart oval: the filled oval minus its center column (center row keeps its center cell). */
export function chartOval(w: number, h: number): Point[] {
  const rx = (w - 1) / 2;
  const ry = (h - 1) / 2;
  const cells: Point[] = [];
  for (let y = -Math.round(ry); y <= Math.round(ry); y++) {
    const ratio = 1 - (y * y) / (ry * ry);
    const xm = Math.round(rx * Math.sqrt(Math.max(0, ratio)));
    const atCap = Math.abs(y) === Math.round(ry);
    const isCenterRow = y === 0;
    for (let x = -xm; x <= xm; x++) {
      if (!atCap && x === 0 && !isCenterRow) continue;
      cells.push({ x, y });
    }
  }
  return cells;
}

export function ovalPoints(
  w: number,
  h: number,
  style: CircleStyle
): Point[] {
  if (style === "filled") return filledOval(w, h);
  if (style === "chart") return chartOval(w, h);
  return outlineOval(w, h);
}
