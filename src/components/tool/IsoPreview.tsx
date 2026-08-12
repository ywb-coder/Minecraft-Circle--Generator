import { memo, useEffect, useMemo, useRef } from "react";
import type { ShapeResult } from "@/lib/shapes";

function shade(hex: string, factor: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.max(0, Math.round(((n >> 16) & 255) * factor)));
  const g = Math.min(255, Math.max(0, Math.round(((n >> 8) & 255) * factor)));
  const b = Math.min(255, Math.max(0, Math.round((n & 255) * factor)));
  return `rgb(${r},${g},${b})`;
}

interface Cube {
  x: number;
  y: number;
  z: number;
}

const spriteCache = new Map<string, HTMLCanvasElement>();

function buildSprite(color: string, s: number): HTMLCanvasElement {
  const cos30 = Math.sqrt(3) / 2;
  const sin30 = 0.5;
  const dx = s * cos30;
  const dy = s * sin30;
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(2 * dx) + 2;
  canvas.height = Math.ceil(2 * dy + s) + 2;
  const ctx = canvas.getContext("2d");
  const x0 = 1;
  const y0 = 1 + dy;
  if (!ctx) return canvas;
  ctx.fillStyle = shade(color, 1.25);
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x0 + dx, y0 - dy);
  ctx.lineTo(x0 + dx + dx, y0);
  ctx.lineTo(x0 + dx, y0 + dy);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = shade(color, 0.65);
  ctx.beginPath();
  ctx.moveTo(x0 + dx, y0 - dy);
  ctx.lineTo(x0 + dx + dx, y0);
  ctx.lineTo(x0 + dx + dx, y0 + s);
  ctx.lineTo(x0 + dx, y0 - dy + s);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = shade(color, 0.45);
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x0 + dx, y0 + dy);
  ctx.lineTo(x0 + dx, y0 + dy + s);
  ctx.lineTo(x0, y0 + s);
  ctx.closePath();
  ctx.fill();
  return canvas;
}

function getSprite(color: string, s: number): HTMLCanvasElement {
  const key = `${color}|${Math.round(s * 100)}`;
  let sprite = spriteCache.get(key);
  if (!sprite) {
    sprite = buildSprite(color, s);
    spriteCache.set(key, sprite);
  }
  return sprite;
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

function IsoPreview({
  shape,
  color,
}: {
  shape: ShapeResult;
  color: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotYRef = useRef(0);
  const dragRef = useRef<{ x: number; rot: number } | null>(null);
  const scheduleRef = useRef<() => void>(() => {});

  const cubes = useMemo(() => {
    const arr: Cube[] = [];
    if (shape.layers.length > 0) {
      const zs = shape.layers.map((l) => l.z);
      const minZ = Math.min(...zs);
      for (const layer of shape.layers) {
        const wy = layer.z - minZ;
        for (const p of layer.points) {
          arr.push({ x: p.x, y: wy, z: p.y });
        }
      }
    } else {
      for (const p of shape.points) {
        arr.push({ x: p.x, y: 0, z: p.y });
      }
    }
    return arr;
  }, [shape]);

  const sorted = useMemo(() => {
    const step = Math.ceil(cubes.length / 8000);
    const arr = step > 1 ? cubes.filter((_, i) => i % step === 0) : [...cubes];
    return arr.sort((a, b) => b.x + b.z + b.y - (a.x + a.z + a.y));
  }, [cubes]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cos30 = Math.sqrt(3) / 2;
    const sin30 = 0.5;
    let rafId = 0;
    let pending = false;

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

      if (cubes.length === 0) return;
      const rot = (rotYRef.current * Math.PI) / 180;
      const cr = Math.cos(rot);
      const sr = Math.sin(rot);
      const rotX = (x: number, z: number) => x * cr - z * sr;
      const rotZ = (x: number, z: number) => x * sr + z * cr;
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      for (const c of cubes) {
        for (const [px, py] of cubeCorners(rotX(c.x, c.z), rotZ(c.x, c.z), c.y, 1)) {
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

      const sprite = getSprite(color, s);
      const dy = s * sin30;
      const sortedRot = [...sorted].sort(
        (a, b) =>
          rotX(b.x, b.z) + rotZ(b.x, b.z) + b.y -
          (rotX(a.x, a.z) + rotZ(a.x, a.z) + a.y)
      );
      for (const c of sortedRot) {
        const xr = rotX(c.x, c.z);
        const zr = rotZ(c.x, c.z);
        const x0 = (xr + zr) * cos30 * s;
        const y0 = (-xr + zr) * sin30 * s - c.y * s;
        ctx.drawImage(sprite, x0 - 1, y0 - dy - 1);
      }
    };

    const scheduleDraw = () => {
      if (pending) return;
      pending = true;
      rafId = requestAnimationFrame(() => {
        pending = false;
        render();
      });
    };
    scheduleRef.current = scheduleDraw;

    scheduleDraw();
    window.addEventListener("resize", scheduleDraw);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", scheduleDraw);
    };
  }, [cubes, sorted, color]);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragRef.current = { x: e.clientX, rot: rotYRef.current };
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    rotYRef.current = dragRef.current.rot + (e.clientX - dragRef.current.x) * 0.4;
    scheduleRef.current();
  };

  const handlePointerUp = () => {
    dragRef.current = null;
  };

  return (
    <div
      className="mc-panel-inset pixel-corners relative aspect-square w-full overflow-hidden"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      style={{ touchAction: "none" }}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        role="img"
        aria-label="Isometric 3D preview of the generated shape - drag to rotate"
      />
    </div>
  );
}

export default memo(IsoPreview);
