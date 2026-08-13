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
      // Exact sprite bounding box in unit space: each cube's sprite spans
      // [x0, x0 + 2*cos30] horizontally and [y0 - sin30, y0 + sin30 + 1] vertically.
      for (const c of cubes) {
        const xr = rotX(c.x, c.z);
        const zr = rotZ(c.x, c.z);
        const px = (xr + zr) * cos30;
        const py = (-xr + zr) * sin30 - c.y;
        if (px < minX) minX = px;
        const px2 = px + 2 * cos30;
        if (px2 > maxX) maxX = px2;
        const pyTop = py - sin30;
        if (pyTop < minY) minY = pyTop;
        const pyBot = py + sin30 + 1;
        if (pyBot > maxY) maxY = pyBot;
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
      className="mc-panel-inset pixel-corners relative mx-auto aspect-square overflow-hidden"
      style={{ width: "min(100%, calc(100vh - 320px))", touchAction: "none" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
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
