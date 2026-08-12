import type { CircleStyle, ShapeType } from "@/lib/shapes";

export interface ToolState {
  type: ShapeType;
  d: number;
  w: number;
  h: number;
  dp: number;
  t: number;
  thickness: number;
  inner: number;
  style: CircleStyle;
  block: string;
  start: number;
  span: number;
  layerIndex: number;
  playing: boolean;
  speed: number;
  centerX: number;
  centerY: number;
  centerZ: number;
  builder: boolean;
  placed: string[];
  showCoords: boolean;
  rowCounts: boolean;
  fullscreen: boolean;
  mobileTab: "controls" | "preview" | "export";
}

export const DEFAULT_STATE: ToolState = {
  type: "circle",
  d: 25,
  w: 25,
  h: 13,
  dp: 13,
  t: 8,
  thickness: 1,
  inner: 0,
  style: "outline",
  block: "stone",
  start: 0,
  span: 90,
  layerIndex: 0,
  playing: false,
  speed: 1,
  centerX: 0,
  centerY: 64,
  centerZ: 0,
  builder: false,
  placed: [],
  showCoords: false,
  rowCounts: false,
  fullscreen: false,
  mobileTab: "controls",
};

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function toInt(value: string | null, fallback: number): number {
  if (value === null) return fallback;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}
