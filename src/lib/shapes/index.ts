import type { CircleStyle, ShapeResult, ShapeType } from "./types";
import {
  annulusPoints,
  circlePoints,
  MAX_DIAMETER,
  MIN_DIAMETER,
  ringPoints,
} from "./circle";
import { ovalPoints } from "./oval";
import { domeLayers, sphereLayers, MAX_SPHERE, MIN_SPHERE } from "./sphere";
import { arcPoints, MAX_ARC, MIN_ARC } from "./arc";
import { ellipsoidLayers, MAX_ELLIPSOID, MIN_ELLIPSOID } from "./ellipsoid";
import { MAX_TORUS, MIN_TORUS, torusLayers } from "./torus";

export * from "./types";
export * from "./circle";
export * from "./oval";
export * from "./sphere";
export * from "./arc";
export * from "./ellipsoid";
export * from "./torus";

export interface ShapeParams {
  type: ShapeType;
  d?: number;
  w?: number;
  h?: number;
  dp?: number;
  t?: number;
  thickness?: number;
  inner?: number;
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

function flatResult(
  type: ShapeType,
  points: { x: number; y: number }[],
  width: number,
  height: number
): ShapeResult {
  const b = bounds(points);
  return {
    type,
    width,
    height,
    depth: 1,
    points,
    layers: [],
    blockCount: points.length,
    totalBlockCount: points.length,
    ...b,
  };
}

function layeredResult(
  type: ShapeType,
  layers: { z: number; points: { x: number; y: number }[]; blockCount: number }[],
  width: number,
  height: number
): ShapeResult {
  const total = layers.reduce((s, l) => s + l.blockCount, 0);
  const b = bounds(layers[0]?.points ?? []);
  return {
    type,
    width,
    height,
    depth: layers.length,
    points: layers[0]?.points ?? [],
    layers,
    blockCount: layers[0]?.blockCount ?? 0,
    totalBlockCount: total,
    ...b,
  };
}

export function generateShape(params: ShapeParams): ShapeResult {
  const style: CircleStyle = params.style ?? "outline";
  const { type } = params;

  if (type === "circle") {
    const d = params.d ?? 25;
    const inner = params.inner ?? 0;
    const thickness = params.thickness ?? 1;
    const points =
      inner > 1
        ? annulusPoints(d, inner)
        : style === "outline" && thickness > 1
          ? ringPoints(d, thickness)
          : circlePoints(d, style);
    return flatResult(type, points, d, d);
  }

  if (type === "oval") {
    const w = params.w ?? 25;
    const h = params.h ?? 13;
    const inner = params.inner ?? 0;
    const thickness = params.thickness ?? 1;
    const points =
      style === "outline" && thickness > 1
        ? ovalPoints(w, h, "outline")
        : ovalPoints(w, h, style);
    void inner;
    return flatResult(type, points, w, h);
  }

  if (type === "arc") {
    const d = params.d ?? 25;
    const start = params.start ?? 0;
    const span = params.span ?? 90;
    return flatResult(type, arcPoints(d, start, span), d, d);
  }

  if (type === "sphere") {
    const d = params.d ?? 25;
    return layeredResult(type, sphereLayers(d), d, d);
  }

  if (type === "dome") {
    const d = params.d ?? 25;
    const layers = domeLayers(d);
    return layeredResult(type, layers, d, d);
  }

  if (type === "torus") {
    const d = params.d ?? 41;
    const t = params.t ?? 8;
    const layers = torusLayers(d, t);
    return layeredResult(type, layers, d, d);
  }

  const w = params.w ?? 25;
  const h = params.h ?? 17;
  const dp = params.dp ?? 13;
  return layeredResult(type, ellipsoidLayers(w, h, dp), w, h);
}

export const shapeLimits = {
  circle: { min: MIN_DIAMETER, max: MAX_DIAMETER },
  oval: { min: MIN_DIAMETER, max: MAX_DIAMETER },
  arc: { min: MIN_ARC, max: MAX_ARC },
  sphere: { min: MIN_SPHERE, max: MAX_SPHERE },
  dome: { min: MIN_SPHERE, max: MAX_SPHERE },
  torus: { min: MIN_TORUS, max: MAX_TORUS },
  ellipsoid: { min: MIN_ELLIPSOID, max: MAX_ELLIPSOID },
} as const;
