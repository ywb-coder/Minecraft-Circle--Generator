import type { CircleStyle, Point } from "./types";

export const MIN_DIAMETER = 3;
export const MAX_DIAMETER = 512;

/**
 * Core band primitive: all cells whose center distance from the origin falls
 * in [lo, hi). All circle variants are expressed through this function.
 */
export function bandPoints(lo: number, hi: number): Point[] {
  const cells: Point[] = [];
  const max = Math.ceil(hi);
  for (let y = -max; y <= max; y++) {
    for (let x = -max; x <= max; x++) {
      const dist2 = x * x + y * y;
      if (dist2 >= lo * lo && dist2 < hi * hi) {
        cells.push({ x, y });
      }
    }
  }
  return cells;
}

/**
 * Perfect pixel circle (ring) — the thin outline used by the leading
 * circle-generator tools: cells in [r - 0.5, r + 0.5), r = (d - 1) / 2.
 */
export function outlineCircle(d: number): Point[] {
  if (d <= 1) return [{ x: 0, y: 0 }];
  const r = (d - 1) / 2;
  return bandPoints(r - 0.5, r + 0.5);
}

/** Thick ring: the outline expanded inward by (thickness - 1) blocks. */
export function ringPoints(d: number, thickness: number): Point[] {
  if (d <= 1) return [{ x: 0, y: 0 }];
  const r = (d - 1) / 2;
  const t = Math.max(1, thickness);
  return bandPoints(r - 0.5 - (t - 1), r + 0.5);
}

/** Hollow ring: the outer circle with an inner cut-out circle removed. */
export function annulusPoints(outerD: number, innerD: number): Point[] {
  if (outerD <= 1) return [{ x: 0, y: 0 }];
  const outerR = (outerD - 1) / 2;
  const innerR = Math.min(innerD, outerD - 2) > 1 ? (innerD - 1) / 2 : -1;
  return bandPoints(innerR + 0.5, outerR + 0.5);
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
