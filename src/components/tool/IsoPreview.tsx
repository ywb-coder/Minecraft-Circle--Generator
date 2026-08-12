import { useCallback, useEffect, useRef } from "react";
import type { ShapeResult } from "@/lib/shapes";

function shade(hex: string, factor: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.max(0, Math.round(((n >> 16) & 255) * factor)));
  const g = Math.min(255, Math.max(0, Math.round(((n >> 8) & 255) * factor)));
  const b = Math.min(255, Math.max(0, Math.round((n & 255) * factor)));
  return `rgb(${r},${g},${b})`;
}

function drawCube(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  z: number,
  base: string,
  s: number
) {
  const cos30 = Math.sqrt(3) / 2;
  const sin30 = 0.5;
  const x0 = x * s * cos30 + z * s * cos30;
  const y0 = -x * s * sin30 + z * s * sin30 - y * s;
  const dx = s * cos30;
  const dy = s * sin30;
  ctx.fillStyle = shade(base, 1.25);
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x0 + dx, y0 - dy);
  ctx.lineTo(x0 + dx + dx, y0);
  ctx.lineTo(x0 + dx, y0 + dy);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = shade(base, 0.65);
  ctx.beginPath();
  ctx.moveTo(x0 + dx, y0 - dy);
  ctx.lineTo(x0 + dx + dx, y0);
  ctx.lineTo(x0 + dx + dx, y0 + s);
  ctx.lineTo(x0 + dx, y0 - dy + s);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = shade(base, 0.45);
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x0 + dx, y0 + dy);
  ctx.lineTo(x0 + dx, y0 + dy + s);
  ctx.lineTo(x0, y0 + s);
  ctx.closePath();
  ctx.fill();
}

interface Cube {
  x: number;
  y: number;
  z: number;
}

export default function IsoPreview({
  shape,
  color,
}: {
  shape: ShapeResult;
  color: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getCubes = useCallback((): Cube[] => {
    const cubes: Cube[] = [];
    if (shape.layers.length > 0) {
      const zs = shape.layers.map((l) => l.z);
      const minZ = Math.min(...zs);
      const maxZ = Math.max(...zs);
      for (const layer of shape.layers) {
        const wy = layer.z - minZ;
        for (const p of layer.points) {
          cubes.push({ x: p.x, y: wy, z: p.y });
        }
      }
      void maxZ;
    } else {
      for (const p of shape.points) {
        cubes.push({ x: p.x, y: 0, z: p.y });
      }
    }
    return cubes;
  }, [shape]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const cubes = getCubes();
      if (cubes.length === 0) return;
      const span = Math.max(shape.width, shape.height, shape.depth) + 2;
      const s = Math.min(w, h) / (span * 1.4);
      const cos30 = Math.sqrt(3) / 2;
      const minX = Math.min(...cubes.map((c) => c.x));
      const maxX = Math.max(...cubes.map((c) => c.x));
      const minZ = Math.min(...cubes.map((c) => c.z));
      const maxZ = Math.max(...cubes.map((c) => c.z));
      const cx = ((minX + maxX) / 2) * s * cos30;
      const ox = w / 2 - cx;
      const oy = h / 2 + (maxZ - minZ) * s * 0.5;
      ctx.translate(ox, oy);

      const sorted = [...cubes].sort((a, b) => b.x + b.z + b.y - (a.x + a.z + a.y));
      for (const c of sorted) {
        drawCube(ctx, c.x, c.z, c.y, color, s);
      }
    };

    render();
    const onResize = () => render();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [getCubes, color, shape]);

  return (
    <div className="mc-panel-inset pixel-corners relative aspect-square w-full overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
