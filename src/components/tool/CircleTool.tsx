"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getBlock } from "@/lib/blocks";
import {
  blocksText,
  buildShareUrl,
  downloadGridPng,
  downloadText,
  pointsToCSV,
  pointsToJSON,
  setblockText,
  shapeExportMeta,
  toSVG,
} from "@/lib/export";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { subpathLocales } from "@/lib/i18n/locales";
import {
  isEllipsoidCombo,
  isTorusCombo,
  OVAL_PAIRS,
} from "@/lib/seo";
import {
  generateShape,
  outlineCircle,
  shapeLimits,
  type CircleStyle,
  type ShapeType,
} from "@/lib/shapes";
import BlockPalette from "./BlockPalette";
import BlueprintGrid from "./BlueprintGrid";
import BuildOrderBar from "./BuildOrderBar";
import IsoPreview from "./IsoPreview";
import LayerStack from "./LayerStack";
import ShapeControls from "./ShapeControls";
import SizeGuideTable from "./SizeGuideTable";
import { clamp, DEFAULT_STATE, toInt, type ToolState } from "./tool-state";

type Tab = "blueprint" | "preview" | "build";
type MobileTab = "controls" | "preview" | "export";

const TABS: Tab[] = ["blueprint", "preview", "build"];
const SHAPE_TYPES: ShapeType[] = [
  "circle",
  "oval",
  "sphere",
  "dome",
  "arc",
  "torus",
  "ellipsoid",
];
const STYLES: CircleStyle[] = ["outline", "chart", "filled"];
const STORAGE_KEY = "cg-tool-state-v1";

function stateFromUrl(): ToolState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  const params = new URLSearchParams(window.location.search);
  const next: ToolState = { ...DEFAULT_STATE };
  const t = params.get("t");
  if (t && (SHAPE_TYPES as string[]).includes(t)) next.type = t as ShapeType;
  const limits = shapeLimits[next.type];
  next.d = clamp(toInt(params.get("d"), next.d), limits.min, limits.max);
  next.w = clamp(toInt(params.get("w"), next.w), limits.min, limits.max);
  next.h = clamp(toInt(params.get("h"), next.h), limits.min, limits.max);
  const s = params.get("s");
  if (s && (STYLES as string[]).includes(s)) next.style = s as CircleStyle;
  const b = params.get("b");
  if (b && getBlock(b).id === b) next.block = b;
  next.start = clamp(toInt(params.get("a"), next.start), 0, 359);
  next.span = clamp(toInt(params.get("g"), next.span), 0, 359);
  next.thickness = clamp(toInt(params.get("tk"), next.thickness), 1, 6);
  next.inner = clamp(toInt(params.get("in"), next.inner), 0, 510);
  next.centerX = toInt(params.get("cx"), next.centerX);
  next.centerY = toInt(params.get("cy"), next.centerY);
  next.centerZ = toInt(params.get("cz"), next.centerZ);
  next.t = clamp(toInt(params.get("tb"), next.t), 1, 64);
  next.dp = clamp(toInt(params.get("dp"), next.dp), 5, 256);
  return next;
}

function mergeSaved(saved: Partial<ToolState> | null, next: ToolState): ToolState {
  if (!saved) return next;
  const merged = { ...next };
  const fromUrl = new Set([
    "type",
    "d",
    "w",
    "h",
    "dp",
    "t",
    "thickness",
    "inner",
    "style",
    "block",
    "start",
    "span",
    "centerX",
    "centerY",
    "centerZ",
  ]);
  (Object.keys(saved) as (keyof ToolState)[]).forEach((key) => {
    if (fromUrl.has(key)) return;
    const value = saved[key];
    if (value === undefined) return;
    if (key === "placed" && Array.isArray(value)) {
      merged.placed = value as string[];
    } else if (typeof value === "boolean" || typeof value === "number" || typeof value === "string") {
      (merged as Record<string, unknown>)[key] = value;
    }
  });
  return merged;
}

export default function CircleTool({ dict }: { dict: Dictionary }) {
  const [state, setState] = useState<ToolState>(DEFAULT_STATE);
  const [tab, setTab] = useState<Tab>("blueprint");
  const [mobileTab, setMobileTab] = useState<MobileTab>("controls");
  const [orderIndex, setOrderIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const skipFirstWrite = useRef(true);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const fromUrl = stateFromUrl();
      let saved: Partial<ToolState> | null = null;
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) saved = JSON.parse(raw) as Partial<ToolState>;
      } catch {
        saved = null;
      }
      setState(mergeSaved(saved, fromUrl));
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (skipFirstWrite.current) {
      skipFirstWrite.current = false;
      return;
    }
    const id = window.setTimeout(() => {
      const params = new URLSearchParams();
      params.set("t", state.type);
      params.set("d", String(state.d));
      params.set("w", String(state.w));
      params.set("h", String(state.h));
      params.set("s", state.style);
      params.set("b", state.block);
      params.set("a", String(state.start));
      params.set("g", String(state.span));
      params.set("tk", String(state.thickness));
      params.set("in", String(state.inner));
      params.set("cx", String(state.centerX));
      params.set("cy", String(state.centerY));
      params.set("cz", String(state.centerZ));
      params.set("tb", String(state.t));
      params.set("dp", String(state.dp));
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}?${params.toString()}`
      );
    }, 300);
    return () => window.clearTimeout(id);
  }, [state]);

  useEffect(() => {
    if (skipFirstWrite.current) return;
    const id = window.setTimeout(() => {
      try {
        const persist: Partial<ToolState> = {
          type: state.type,
          d: state.d,
          w: state.w,
          h: state.h,
          dp: state.dp,
          t: state.t,
          thickness: state.thickness,
          inner: state.inner,
          style: state.style,
          block: state.block,
          start: state.start,
          span: state.span,
          centerX: state.centerX,
          centerY: state.centerY,
          centerZ: state.centerZ,
          placed: state.placed,
          showCoords: state.showCoords,
          rowCounts: state.rowCounts,
          layerIndex: state.layerIndex,
          speed: state.speed,
        };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persist));
      } catch {
        // storage unavailable
      }
    }, 500);
    return () => window.clearTimeout(id);
  }, [state]);

  const shapeType = state.type;
  const shape = useMemo(() => {
    if (shapeType === "oval") {
      const limits = shapeLimits.oval;
      return generateShape({
        type: "oval",
        w: clamp(state.w, limits.min, limits.max),
        h: clamp(state.h, limits.min, limits.max),
        style: state.style,
      });
    }
    if (shapeType === "torus") {
      const limits = shapeLimits.torus;
      return generateShape({
        type: "torus",
        d: clamp(state.d, limits.min, limits.max),
        t: clamp(state.t, 1, 64),
      });
    }
    if (shapeType === "ellipsoid") {
      const limits = shapeLimits.ellipsoid;
      return generateShape({
        type: "ellipsoid",
        w: clamp(state.w, limits.min, limits.max),
        h: clamp(state.h, limits.min, limits.max),
        dp: clamp(state.dp, limits.min, limits.max),
      });
    }
    if (shapeType === "circle" && state.style === "outline") {
      const limits = shapeLimits.circle;
      const d = clamp(state.d, limits.min, limits.max);
      return generateShape({
        type: "circle",
        d,
        style: "outline",
        thickness: clamp(state.thickness, 1, 6),
        inner: state.inner,
      });
    }
    const limits = shapeLimits[shapeType];
    return generateShape({
      type: shapeType,
      d: clamp(state.d, limits.min, limits.max),
      style: state.style,
      start: state.start,
      span: state.span,
    });
  }, [shapeType, state.d, state.w, state.h, state.dp, state.t, state.thickness, state.inner, state.style, state.start, state.span]);

  const layerIndex =
    shape.layers.length > 0
      ? clamp(state.layerIndex, 0, shape.layers.length - 1)
      : 0;
  const points =
    shape.layers.length > 0 ? shape.layers[layerIndex].points : shape.points;
  const blockCount = points.length;
  const color = getBlock(state.block).color;
  const blockId = getBlock(state.block).id;

  const bounds = useMemo(() => {
    const xs = points.map((p) => p.x);
    const ys = points.map((p) => p.y);
    if (xs.length === 0) return { sizeW: 1, sizeH: 1 };
    return {
      sizeW: Math.max(...xs) - Math.min(...xs) + 1,
      sizeH: Math.max(...ys) - Math.min(...ys) + 1,
    };
  }, [points]);

  const order = useMemo(
    () =>
      [...points].sort((a, b) => {
        const da = a.x * a.x + a.y * a.y;
        const db = b.x * b.x + b.y * b.y;
        return da - db;
      }),
    [points]
  );

  const safeIndex = Math.min(orderIndex, Math.max(0, order.length - 1));

  useEffect(() => {
    if (!state.playing || order.length === 0) return;
    const id = window.setInterval(() => {
      setOrderIndex((i) => {
        if (i + 1 >= order.length) {
          setState((s) => ({ ...s, playing: false }));
          return i;
        }
        return i + 1;
      });
    }, 1000 / state.speed);
    return () => window.clearInterval(id);
  }, [state.playing, state.speed, order]);

  const handleToggle = () => {
    if (state.playing) {
      setState((s) => ({ ...s, playing: false }));
    } else {
      if (orderIndex >= order.length - 1) setOrderIndex(0);
      setState((s) => ({ ...s, playing: true }));
    }
  };

  const handleReset = () => {
    setOrderIndex(0);
    setState((s) => ({ ...s, playing: false }));
  };

  const handleCellClick = useCallback((x: number, y: number) => {
    setState((s) => {
      const key = `${x},${y}`;
      const placed = s.placed.includes(key)
        ? s.placed.filter((k) => k !== key)
        : [...s.placed, key];
      return { ...s, placed };
    });
  }, []);

  const handleNext = () => {
    const current = order[safeIndex];
    if (!current) return;
    const key = `${current.x},${current.y}`;
    setState((s) => ({
      ...s,
      placed: s.placed.includes(key) ? s.placed : [...s.placed, key],
    }));
    setOrderIndex((i) => Math.min(i + 1, order.length - 1));
  };

  const handlePrev = () => {
    const prev = Math.max(0, orderIndex - 1);
    const cell = order[prev];
    if (cell) {
      const key = `${cell.x},${cell.y}`;
      setState((s) => ({
        ...s,
        placed: s.placed.filter((k) => k !== key),
      }));
    }
    setOrderIndex(prev);
  };

  const showCopied = () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const filename = `${state.type}-${
    state.type === "oval" ? `${state.w}x${state.h}` : state.type === "ellipsoid" ? `${state.w}x${state.h}x${state.dp}` : state.type === "torus" ? `${state.d}x${state.t}` : state.d
  }`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showCopied();
    } catch {
      // clipboard unavailable
    }
  };

  const handleSetblock = () =>
    copyToClipboard(
      setblockText(
        points,
        state.centerX,
        state.centerY,
        state.centerZ,
        shape.layers.length > 0 ? shape.layers[layerIndex].z : 0,
        blockId
      )
    );

  const handleSetblockAll = () => {
    if (shape.layers.length === 0) {
      handleSetblock();
      return;
    }
    const all = shape.layers
      .map((layer) =>
        setblockText(
          layer.points,
          state.centerX,
          state.centerY,
          state.centerZ,
          layer.z,
          blockId
        )
      )
      .join("\n");
    copyToClipboard(all);
  };

  const handlePng = () => downloadGridPng(points, color, `${filename}.png`);
  const handleSvg = () =>
    downloadText(`${filename}.svg`, toSVG(points, color), "image/svg+xml");
  const handleCsv = () =>
    downloadText(`${filename}.csv`, pointsToCSV(points), "text/csv");
  const handleJson = () =>
    downloadText(
      `${filename}.json`,
      pointsToJSON(points, shapeExportMeta(shape)),
      "application/json"
    );
  const handleCopyBlocks = () => copyToClipboard(blocksText(points));
  const handleCopyLink = () =>
    copyToClipboard(
      buildShareUrl({
        t: state.type,
        d: state.d,
        w: state.w,
        h: state.h,
        s: state.style,
        b: state.block,
        a: state.start,
        g: state.span,
      })
    );

  const handlePermLink = () => {
    if (state.type === "arc") return;
    const seg = window.location.pathname.split("/")[1] ?? "";
    const prefix = (subpathLocales as readonly string[]).includes(seg)
      ? `/${seg}/`
      : "/";
    const path =
      state.type === "oval"
        ? `oval/${state.w}/${state.h}/`
        : state.type === "torus"
          ? `torus/${state.d}/${state.t}/`
          : state.type === "ellipsoid"
            ? `ellipsoid/${state.w}/${state.h}/${state.dp}/`
            : `${state.type}/${state.d}/`;
    copyToClipboard(`${window.location.origin}${prefix}${path}`);
  };

  const hasStaticPage =
    (state.type === "circle" && state.style === "outline" && state.d % 2 === 1) ||
    (state.type === "oval" &&
      OVAL_PAIRS.some(([pw, ph]) => pw === state.w && ph === state.h)) ||
    (state.type === "sphere" && state.d % 2 === 1) ||
    (state.type === "dome" && state.d % 2 === 1) ||
    (state.type === "torus" && isTorusCombo(state.d, state.t)) ||
    (state.type === "ellipsoid" &&
      isEllipsoidCombo(state.w, state.h, state.dp));

  const placed = state.placed;
  const placedSet = useMemo(() => new Set(placed), [placed]);
  const placedCount = placedSet.size;
  const builderEnabled =
    state.builder && bounds.sizeW * bounds.sizeH <= 2048;

  const controlsPanel = (
    <>
      <ShapeControls dict={dict} state={state} setState={setState} />
      <BlockPalette
        value={state.block}
        onChange={(block) => setState((s) => ({ ...s, block }))}
        dict={dict}
      />
    </>
  );

  const previewPanel = (
    <>
      <div className="flex flex-wrap gap-1.5">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`mc-btn px-3! py-1! ${tab === t ? "mc-btn-selected" : ""}`}
          >
            {dict.tool[t === "build" ? "buildOrder" : t]}
          </button>
        ))}
        <button
          type="button"
          className="mc-btn px-2! py-1!"
          onClick={() => setState((s) => ({ ...s, fullscreen: !s.fullscreen }))}
        >
          {dict.tool.fullscreen}
        </button>
        <button
          type="button"
          className={`mc-btn px-2! py-1! ${state.showCoords ? "mc-btn-selected" : ""}`}
          onClick={() => setState((s) => ({ ...s, showCoords: !s.showCoords }))}
        >
          {dict.tool.showCoords}
        </button>
        <button
          type="button"
          className={`mc-btn px-2! py-1! ${state.rowCounts ? "mc-btn-selected" : ""}`}
          onClick={() => setState((s) => ({ ...s, rowCounts: !s.rowCounts }))}
        >
          {dict.tool.rowCounts}
        </button>
      </div>

      <div className="mc-panel-inset pixel-corners flex flex-col items-center gap-4 p-3">
        {tab === "preview" ? (
          <IsoPreview shape={shape} color={color} />
        ) : tab === "build" ? (
          <>
            <div className="flex w-full flex-wrap items-center gap-2">
              <button
                type="button"
                className={`mc-btn px-2! py-1! ${state.builder ? "mc-btn-selected" : ""}`}
                onClick={() => setState((s) => ({ ...s, builder: !s.builder }))}
              >
                {dict.tool.builder}
              </button>
              {state.builder && (
                <>
                  <button type="button" className="mc-btn px-2! py-1!" onClick={handlePrev}>
                    {dict.tool.prev}
                  </button>
                  <button type="button" className="mc-btn px-2! py-1!" onClick={handleNext}>
                    {dict.tool.next}
                  </button>
                  <span className="font-terminal text-lg text-accent">
                    {placedCount} / {order.length}
                  </span>
                </>
              )}
            </div>
            {state.builder && !builderEnabled && (
              <p className="font-pixel text-[10px] text-muted">
                {dict.tool.builder} 鈥?{dict.tool.blueprint}
              </p>
            )}
            <BlueprintGrid
              points={points}
              sizeW={bounds.sizeW}
              sizeH={bounds.sizeH}
              color={color}
              label={dict.tool.buildOrder}
              highlight={order[safeIndex] ?? null}
              interactive={builderEnabled}
              placedKeys={builderEnabled ? placedSet : undefined}
              onCellClick={builderEnabled ? handleCellClick : undefined}
              showCoords={state.showCoords}
              rowCounts={state.rowCounts}
            />
            <BuildOrderBar
              total={order.length}
              current={Math.min(safeIndex + 1, order.length)}
              playing={state.playing}
              speed={state.speed}
              onToggle={handleToggle}
              onSpeed={(speed) => setState((s) => ({ ...s, speed }))}
              onReset={handleReset}
              dict={dict}
            />
          </>
        ) : (
          <>
            {shape.layers.length > 0 ? (
              <LayerStack
                layers={shape.layers}
                activeIndex={layerIndex}
                color={color}
                dict={dict}
                onSelect={(i) => setState((s) => ({ ...s, layerIndex: i }))}
              />
            ) : null}
            <BlueprintGrid
              points={points}
              sizeW={bounds.sizeW}
              sizeH={bounds.sizeH}
              color={color}
              label={dict.tool.blueprint}
              context={state.type === "arc" ? outlineCircle(state.d) : undefined}
              showCoords={state.showCoords}
              rowCounts={state.rowCounts}
            />
          </>
        )}
        <p className="font-terminal text-3xl text-accent">
          {blockCount} {dict.tool.blocksCount}
        </p>
      </div>

      {copied && (
        <p className="font-pixel text-[10px] text-accent">{dict.tool.copied}</p>
      )}

      <div className="flex flex-wrap gap-1.5">
        <button type="button" className="mc-btn mc-btn-primary px-2! py-1!" onClick={handlePng}>
          {dict.tool.exportPng}
        </button>
        <button type="button" className="mc-btn px-2! py-1!" onClick={handleSvg}>
          SVG
        </button>
        <button type="button" className="mc-btn px-2! py-1!" onClick={handleCsv}>
          CSV
        </button>
        <button type="button" className="mc-btn px-2! py-1!" onClick={handleJson}>
          JSON
        </button>
        <button type="button" className="mc-btn px-2! py-1!" onClick={handleCopyBlocks}>
          {dict.tool.copyBlocks}
        </button>
        <button type="button" className="mc-btn px-2! py-1!" onClick={handleCopyLink}>
          {dict.tool.copyLink}
        </button>
        {hasStaticPage && (
          <button type="button" className="mc-btn px-2! py-1!" onClick={handlePermLink}>
            {dict.tool.permLink}
          </button>
        )}
        <button type="button" className="mc-btn px-2! py-1!" onClick={handleSetblock}>
          {dict.tool.setblock}
        </button>
        {shape.layers.length > 0 && (
          <button type="button" className="mc-btn px-2! py-1!" onClick={handleSetblockAll}>
            {dict.tool.allLayers}
          </button>
        )}
      </div>

      {!state.fullscreen && <SizeGuideTable dict={dict} />}
    </>
  );

  const exportPanel = (
    <div className="mc-panel-inset pixel-corners flex flex-col gap-4 p-4">
      <p className="font-pixel text-[10px] text-muted">{dict.tool.worldCoords}</p>
      <div className="flex flex-wrap gap-3">
        <button type="button" className="mc-btn mc-btn-primary px-2! py-1!" onClick={handlePng}>
          {dict.tool.exportPng}
        </button>
        <button type="button" className="mc-btn px-2! py-1!" onClick={handleSvg}>
          SVG
        </button>
        <button type="button" className="mc-btn px-2! py-1!" onClick={handleCsv}>
          CSV
        </button>
        <button type="button" className="mc-btn px-2! py-1!" onClick={handleJson}>
          JSON
        </button>
        <button type="button" className="mc-btn px-2! py-1!" onClick={handleCopyBlocks}>
          {dict.tool.copyBlocks}
        </button>
        <button type="button" className="mc-btn px-2! py-1!" onClick={handleCopyLink}>
          {dict.tool.copyLink}
        </button>
        {hasStaticPage && (
          <button type="button" className="mc-btn px-2! py-1!" onClick={handlePermLink}>
            {dict.tool.permLink}
          </button>
        )}
        <button type="button" className="mc-btn px-2! py-1!" onClick={handleSetblock}>
          {dict.tool.setblock}
        </button>
        {shape.layers.length > 0 && (
          <button type="button" className="mc-btn px-2! py-1!" onClick={handleSetblockAll}>
            {dict.tool.allLayers}
          </button>
        )}
      </div>
      {copied && (
        <p className="font-pixel text-[10px] text-accent">{dict.tool.copied}</p>
      )}
    </div>
  );

  const mobileBar = (
    <div className="flex flex-wrap gap-1.5 lg:hidden">
      {(["controls", "preview", "export"] as MobileTab[]).map((mt) => (
        <button
          key={mt}
          type="button"
          onClick={() => setMobileTab(mt)}
          className={`mc-btn px-3! py-1! ${mobileTab === mt ? "mc-btn-selected" : ""}`}
        >
          {mt === "controls"
            ? dict.nav.tool
            : mt === "preview"
              ? dict.tool.preview
              : dict.tool.exportPng}
        </button>
      ))}
    </div>
  );

  const content = (
    <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
      <div className="hidden flex-col gap-4 lg:flex lg:h-[calc(100vh-180px)] lg:overflow-y-auto">
        {controlsPanel}
      </div>

      <div className="flex min-w-0 flex-col gap-4">
        <div className="hidden lg:block">{previewPanel}</div>
        <div className="lg:hidden">
          {mobileBar}
          <div className="mt-4">
            {mobileTab === "controls" && controlsPanel}
            {mobileTab === "preview" && previewPanel}
            {mobileTab === "export" && exportPanel}
          </div>
        </div>
      </div>
    </div>
  );

  if (state.fullscreen) {
    const overlay = (
      <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-bg p-4">
        <div className="flex items-center justify-between pb-2">
          <span className="font-pixel text-[10px] text-muted">{dict.siteName}</span>
          <button
            type="button"
            className="mc-btn px-3! py-1!"
            onClick={() => setState((s) => ({ ...s, fullscreen: false }))}
          >
            {dict.tool.fullscreen} ✕
          </button>
        </div>
        <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
          <div className="min-h-0 overflow-y-auto">{controlsPanel}</div>
          <div className="flex min-h-0 flex-col gap-4 overflow-hidden">
            {previewPanel}
          </div>
        </div>
      </div>
    );
    return createPortal(overlay, document.body);
  }

  return content;
}
