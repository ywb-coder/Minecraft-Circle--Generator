import type { Layer, Point } from "./types";
import { outlineCircle } from "./circle";

export const MIN_SPHERE = 5;
export const MAX_SPHERE = 128;

/**
 * Voxel sphere: for each slice z in -r..r, a ring with local radius
 * rz = round(sqrt(r^2 - z^2)). Layers are ordered bottom to top.
 */
export function sphereLayers(d: number): Layer[] {
  const r = (d - 1) / 2;
  const rr = Math.round(r);
  const layers: Layer[] = [];
  for (let z = -rr; z <= rr; z++) {
    const rz = Math.round(Math.sqrt(Math.max(0, r * r - z * z)));
    const points = outlineCircle(2 * rz + 1);
    layers.push({ z, points, blockCount: points.length });
  }
  return layers;
}

/** Bottom half of a sphere, used for dome building from the ground up. */
export function domeLayers(d: number): Layer[] {
  const r = (d - 1) / 2;
  const rr = Math.round(r);
  const layers: Layer[] = [];
  for (let z = 0; z <= rr; z++) {
    const rz = Math.round(Math.sqrt(Math.max(0, r * r - z * z)));
    const points = outlineCircle(2 * rz + 1);
    layers.push({ z, points, blockCount: points.length });
  }
  return layers;
}

export function flattenLayers(layers: Layer[]): Point[] {
  return layers[0] ? layers[0].points : [];
}
