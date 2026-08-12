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

/**
 * Projected corner points of a cube drawn with the same math as drawCube.
 * Top face: (x0,y0), (x0+dx,y0-dy), (x0+2dx,y0), (x0+dx,y0+dy);
 * bottom face: top face + (0, s).
 */
function cubeCorners(
  x: number,
  y: number,
  z: number,
  s: number
): [number, number][] {
  const cos30 = Math.sqrt(3) / 2;
  const sin30 = 0.5;
  const x0 = (x + z) * cos30 * s;
  const y0 = (-x + z) * sin30 * s - y * s;
  const dx = s * cos30;
  const dy = s * sin30;
  return [
    [x0, y0],
    [x0 + dx, y0 - dy],
    [x0 + 2 * dx, y0],
    [x0 + dx, y0 + dy],
    [x0, y0 + s],
    [x0 + dx, y0 - dy + s],
    [x0 + 2 * dx, y0 + s],
    [x0 + dx, y0 + dy + s],
  ];
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
      for (const layer of shape.layers) {
        const wy = layer.z - minZ;
        for (const p of layer.points) {
          cubes.push({ x: p.x, y: wy, z: p.y });
        }
      }
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
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      for (const c of cubes) {
        for (const [px, py] of cubeCorners(c.x, c.z, c.y, 1)) {
          if (px < minX) minX = px;
          if (px > maxX) maxX = px;
          if (py < minY) minY = py;
          if (py > maxY) maxY = py;
        }
      }
      const bboxW = maxX - minX;
      const bboxH = maxY - minY;
      const s = Math.min(w, h) / Math.max(bboxW, bboxH) / 1.12;
      const ox = w / 2 - ((minX + maxX) / 2) * s;
      const oy = h / 2 - ((minY + maxY) / 2) * s;
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
