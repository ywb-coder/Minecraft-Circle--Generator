import type { CircleStyle, ShapeType } from "@/lib/shapes";

export interface ToolState {
  type: ShapeType;
  d: number;
  w: number;
  h: number;
  style: CircleStyle;
  block: string;
  start: number;
  span: number;
  layerIndex: number;
  playing: boolean;
  speed: number;
}

export const DEFAULT_STATE: ToolState = {
  type: "circle",
  d: 15,
  w: 25,
  h: 13,
  style: "outline",
  block: "stone",
  start: 0,
  span: 90,
  layerIndex: 0,
  playing: false,
  speed: 1,
};

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function toInt(value: string | null, fallback: number): number {
  if (value === null) return fallback;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}
