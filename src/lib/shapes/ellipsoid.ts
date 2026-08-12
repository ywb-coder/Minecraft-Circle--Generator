import type { Layer } from "./types";
import { ovalPoints } from "./oval";

export const MIN_ELLIPSOID = 5;
export const MAX_ELLIPSOID = 256;

/**
 * Three-axis ellipsoid (scaled sphere): width (x), height (y), depth (z).
 * Each z slice is an oval whose semi-axes scale by sqrt(1 - (z/rz)^2),
 * shrinking from the equator to the poles.
 */
export function ellipsoidLayers(w: number, h: number, dp: number): Layer[] {
  const rx = (w - 1) / 2;
  const ry = (h - 1) / 2;
  const rz = (dp - 1) / 2;
  const maxZ = Math.round(rz);
  const layers: Layer[] = [];
  for (let z = -maxZ; z <= maxZ; z++) {
    const k = Math.sqrt(Math.max(0, 1 - (z * z) / (rz * rz)));
    const lw = Math.max(1, Math.round(2 * rx * k));
    const lh = Math.max(1, Math.round(2 * ry * k));
    const points =
      lw <= 1 || lh <= 1 ? [{ x: 0, y: 0 }] : ovalPoints(lw, lh, "outline");
    layers.push({ z, points, blockCount: points.length });
  }
  return layers;
}
