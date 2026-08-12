import type { Point, ShapeResult } from "@/lib/shapes";

export function toSVG(points: Point[], color: string, cell = 24): string {
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  if (xs.length === 0) return "";
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const w = (maxX - minX + 1) * cell;
  const h = (maxY - minY + 1) * cell;
  const rects = points
    .map(
      (p) =>
        `<rect x="${(p.x - minX) * cell}" y="${(p.y - minY) * cell}" width="${cell}" height="${cell}" fill="${color}"/>`
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect width="${w}" height="${h}" fill="#1e293b"/>${rects}</svg>`;
}

export function pointsToCSV(points: Point[]): string {
  return ["x,y", ...points.map((p) => `${p.x},${p.y}`)].join("\n");
}

export function pointsToJSON(points: Point[], meta: Record<string, unknown>): string {
  return JSON.stringify({ ...meta, points }, null, 2);
}

export function blocksText(points: Point[]): string {
  return points.map((p) => `${p.x} ${p.y}`).join("\n");
}

export function downloadText(filename: string, text: string, mime: string): void {
  const blob = new Blob([text], { type: mime });
  downloadBlob(filename, blob);
}

export function downloadBlob(filename: string, blob: Blob): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export interface ShareState {
  t: string;
  d?: number;
  w?: number;
  h?: number;
  s?: string;
  b?: string;
  a?: number;
  g?: number;
}

export function buildShareUrl(state: ShareState): string {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams();
  params.set("t", state.t);
  if (state.d !== undefined) params.set("d", String(state.d));
  if (state.w !== undefined) params.set("w", String(state.w));
  if (state.h !== undefined) params.set("h", String(state.h));
  if (state.s) params.set("s", state.s);
  if (state.b) params.set("b", state.b);
  if (state.a !== undefined) params.set("a", String(state.a));
  if (state.g !== undefined) params.set("g", String(state.g));
  const url = new URL(window.location.pathname, window.location.origin);
  url.search = params.toString();
  return url.toString();
}

export function renderGridToCanvas(
  points: Point[],
  color: string,
  cell = 24
): HTMLCanvasElement {
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const w = (maxX - minX + 1) * cell;
  const h = (maxY - minY + 1) * cell;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = color;
  for (const p of points) {
    ctx.fillRect((p.x - minX) * cell, (p.y - minY) * cell, cell, cell);
  }
  return canvas;
}

export function downloadGridPng(points: Point[], color: string, filename: string): void {
  const canvas = renderGridToCanvas(points, color);
  canvas.toBlob((blob) => {
    if (blob) downloadBlob(filename, blob);
  }, "image/png");
}

export function shapeExportMeta(shape: ShapeResult): Record<string, unknown> {
  return {
    type: shape.type,
    width: shape.width,
    height: shape.height,
    depth: shape.depth,
    blockCount: shape.blockCount,
    totalBlockCount: shape.totalBlockCount,
  };
}
