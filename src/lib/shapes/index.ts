import type { CircleStyle, ShapeResult, ShapeType } from "./types";
import { circlePoints, MAX_DIAMETER, MIN_DIAMETER } from "./circle";
import { ovalPoints } from "./oval";
import { domeLayers, sphereLayers, MAX_SPHERE, MIN_SPHERE } from "./sphere";
import { arcPoints, MAX_ARC, MIN_ARC } from "./arc";

export * from "./types";
export * from "./circle";
export * from "./oval";
export * from "./sphere";
export * from "./arc";

export interface ShapeParams {
  type: ShapeType;
  d?: number;
  w?: number;
  h?: number;
  style?: CircleStyle;
  start?: number;
  span?: number;
}

function bounds(points: { x: number; y: number }[]) {
  if (points.length === 0) {
    return { minX: 0, maxX: 0, minY: 0, maxY: 0 };
  }
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

export function generateShape(params: ShapeParams): ShapeResult {
  const style: CircleStyle = params.style ?? "outline";
  const { type } = params;

  if (type === "circle") {
    const d = params.d ?? 15;
    const points = circlePoints(d, style);
    const b = bounds(points);
    return {
      type,
      width: d,
      height: d,
      depth: 1,
      points,
      layers: [],
      blockCount: points.length,
      totalBlockCount: points.length,
      ...b,
    };
  }

  if (type === "oval") {
    const w = params.w ?? 25;
    const h = params.h ?? 13;
    const points = ovalPoints(w, h, style);
    const b = bounds(points);
    return {
      type,
      width: w,
      height: h,
      depth: 1,
      points,
      layers: [],
      blockCount: points.length,
      totalBlockCount: points.length,
      ...b,
    };
  }

  if (type === "arc") {
    const d = params.d ?? 15;
    const start = params.start ?? 0;
    const span = params.span ?? 90;
    const points = arcPoints(d, start, span);
    const b = bounds(points);
    return {
      type,
      width: d,
      height: d,
      depth: 1,
      points,
      layers: [],
      blockCount: points.length,
      totalBlockCount: points.length,
      ...b,
    };
  }

  if (type === "sphere") {
    const d = params.d ?? 15;
    const layers = sphereLayers(d);
    const total = layers.reduce((s, l) => s + l.blockCount, 0);
    const b = bounds(layers[0]?.points ?? []);
    return {
      type,
      width: d,
      height: d,
      depth: d,
      points: layers[0]?.points ?? [],
      layers,
      blockCount: layers[0]?.blockCount ?? 0,
      totalBlockCount: total,
      ...b,
    };
  }

  const d = params.d ?? 15;
  const layers = domeLayers(d);
  const total = layers.reduce((s, l) => s + l.blockCount, 0);
  const b = bounds(layers[0]?.points ?? []);
  return {
    type,
    width: d,
    height: d,
    depth: layers.length,
    points: layers[0]?.points ?? [],
    layers,
    blockCount: layers[0]?.blockCount ?? 0,
    totalBlockCount: total,
    ...b,
  };
}

export const shapeLimits = {
  circle: { min: MIN_DIAMETER, max: MAX_DIAMETER },
  oval: { min: MIN_DIAMETER, max: MAX_DIAMETER },
  arc: { min: MIN_ARC, max: MAX_ARC },
  sphere: { min: MIN_SPHERE, max: MAX_SPHERE },
  dome: { min: MIN_SPHERE, max: MAX_SPHERE },
} as const;
