import type { Layer } from "./types";
import { bandPoints } from "./circle";

export const MIN_TORUS = 15;
export const MAX_TORUS = 512;
export const MIN_TUBE = 2;
export const MAX_TUBE = 64;

/**
 * Torus (donut): a ring of tubes. The centerline radius is R = (outer - tube)/2
 * and the tube half-thickness is tube/2. Each z slice is an annulus whose
 * inner and outer radii shrink toward the top and bottom, producing the
 * curved tube profile.
 */
export function torusLayers(outerD: number, tube: number): Layer[] {
  const rt = tube / 2;
  const R = (outerD - tube) / 2;
  const maxZ = Math.round(rt);
  const layers: Layer[] = [];
  for (let z = -maxZ; z <= maxZ; z++) {
    const chord2 = rt * rt - z * z;
    if (chord2 < 0) continue;
    const rz = Math.sqrt(chord2);
    const points = bandPoints(R - rz - 0.5, R + rz + 0.5);
    layers.push({ z, points, blockCount: points.length });
  }
  return layers;
}
