import type { Point } from "./types";
import { outlineCircle } from "./circle";

export const MIN_ARC = 7;
export const MAX_ARC = 256;

export type ArcAngles = [start: number, span: number];

export const ARC_SPANS = [45, 90, 135, 180, 270] as const;

/**
 * Arc: a portion of an outline circle between start angle and start + span.
 * Angles are degrees, 0° at the +x axis, counter-clockwise. Endpoint cells
 * that straddle the boundary are included with a half-cell tolerance so the
 * arc stays connected.
 */
export function arcPoints(d: number, start: number, span: number): Point[] {
  const r = (d - 1) / 2;
  const a0 = ((start % 360) * Math.PI) / 180;
  const a1 = (((start + span) % 360) * Math.PI) / 180;
  const tol = 0.5 / Math.max(1, r);

  const inRange = (angle: number) => {
    if (a1 > a0) return angle >= a0 - tol && angle <= a1 + tol;
    return angle >= a0 - tol || angle <= a1 + tol;
  };

  return outlineCircle(d).filter(({ x, y }) => {
    if (x === 0 && y === 0) return false;
    const angle = Math.atan2(y, x);
    return inRange(angle < 0 ? angle + Math.PI * 2 : angle);
  });
}
