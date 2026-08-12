import type { CircleStyle, Point } from "./types";

export const MIN_DIAMETER = 3;
export const MAX_DIAMETER = 256;

/**
 * Perfect pixel circle (ring) — cells whose center distance to the origin
 * falls inside [r - 0.5, r + 0.5), r = (d - 1) / 2. This is the same
 * discrete circle used by the leading circle-generator tools and produces
 * the clean thin ring at any odd diameter.
 */
export function outlineCircle(d: number): Point[] {
  if (d <= 1) return [{ x: 0, y: 0 }];
  const r = (d - 1) / 2;
  const lo = (r - 0.5) * (r - 0.5);
  const hi = (r + 0.5) * (r + 0.5);
  const cells: Point[] = [];
  const rr = Math.round(r);
  for (let y = -rr; y <= rr; y++) {
    for (let x = -rr; x <= rr; x++) {
      const dist2 = x * x + y * y;
      if (dist2 >= lo && dist2 < hi) {
        cells.push({ x, y });
      }
    }
  }
  return cells;
}

/** Solid disc: for every row y, every cell with |x| <= round(sqrt(r^2 - y^2)). */
export function filledCircle(d: number): Point[] {
  const r = (d - 1) / 2;
  const cells: Point[] = [];
  const rr = Math.round(r);
  for (let y = -rr; y <= rr; y++) {
    const xm = Math.round(Math.sqrt(Math.max(0, r * r - y * y)));
    for (let x = -xm; x <= xm; x++) {
      cells.push({ x, y });
    }
  }
  return cells;
}

/** Classic Minecraft circle chart: the filled disc minus its center column (the center row keeps its center cell). */
export function chartCircle(d: number): Point[] {
  const r = (d - 1) / 2;
  const rr = Math.round(r);
  const cells: Point[] = [];
  for (let y = -rr; y <= rr; y++) {
    const xm = Math.round(Math.sqrt(Math.max(0, r * r - y * y)));
    const atCap = Math.abs(y) === rr;
    const isCenterRow = y === 0;
    for (let x = -xm; x <= xm; x++) {
      if (!atCap && x === 0 && !isCenterRow) continue;
      cells.push({ x, y });
    }
  }
  return cells;
}

export function circlePoints(d: number, style: CircleStyle): Point[] {
  if (style === "filled") return filledCircle(d);
  if (style === "chart") return chartCircle(d);
  return outlineCircle(d);
}
