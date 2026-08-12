"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getBlock } from "@/lib/blocks";
import {
  blocksText,
  buildShareUrl,
  downloadGridPng,
  downloadText,
  pointsToCSV,
  pointsToJSON,
  shapeExportMeta,
  toSVG,
} from "@/lib/export";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { subpathLocales } from "@/lib/i18n/locales";
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

const TABS: Tab[] = ["blueprint", "preview", "build"];
const SHAPE_TYPES: ShapeType[] = ["circle", "oval", "sphere", "dome", "arc"];
const STYLES: CircleStyle[] = ["outline", "chart", "filled"];

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
  return next;
}

export default function CircleTool({ dict }: { dict: Dictionary }) {
  const [state, setState] = useState<ToolState>(DEFAULT_STATE);
  const [tab, setTab] = useState<Tab>("blueprint");
  const [orderIndex, setOrderIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const skipFirstWrite = useRef(true);

  useEffect(() => {
    const id = window.setTimeout(() => setState(stateFromUrl), 0);
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
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}?${params.toString()}`
      );
    }, 300);
    return () => window.clearTimeout(id);
  }, [state]);

  const shape = useMemo(() => {
    if (state.type === "oval") {
      const limits = shapeLimits.oval;
      return generateShape({
        type: "oval",
        w: clamp(state.w, limits.min, limits.max),
        h: clamp(state.h, limits.min, limits.max),
        style: state.style,
      });
    }
    const limits = shapeLimits[state.type];
    return generateShape({
      type: state.type,
      d: clamp(state.d, limits.min, limits.max),
      style: state.style,
      start: state.start,
      span: state.span,
    });
  }, [state.type, state.d, state.w, state.h, state.style, state.start, state.span]);

  const layerIndex =
    shape.layers.length > 0
      ? clamp(state.layerIndex, 0, shape.layers.length - 1)
      : 0;
  const points =
    shape.layers.length > 0 ? shape.layers[layerIndex].points : shape.points;
  const blockCount = points.length;
  const color = getBlock(state.block).color;

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

  const showCopied = () => {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const filename = `${state.type}-${
    state.type === "oval" ? `${state.w}x${state.h}` : state.d
  }`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showCopied();
    } catch {
      // clipboard unavailable
    }
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
        : `${state.type}/${state.d}/`;
    copyToClipboard(`${window.location.origin}${prefix}${path}`);
  };

  const hasStaticPage = state.type !== "arc";

  return (
    <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
      <div className="flex flex-col gap-4">
        <ShapeControls dict={dict} state={state} setState={setState} />
        <BlockPalette
          value={state.block}
          onChange={(block) => setState((s) => ({ ...s, block }))}
          dict={dict}
        />
      </div>

      <div className="flex min-w-0 flex-col gap-4">
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
        </div>

        <div className="mc-panel-inset pixel-corners flex flex-col items-center gap-4 p-3">
          {tab === "preview" ? (
            <IsoPreview shape={shape} color={color} />
          ) : tab === "build" ? (
            <>
              <BlueprintGrid
                points={points}
                sizeW={bounds.sizeW}
                sizeH={bounds.sizeH}
                color={color}
                label={dict.tool.buildOrder}
                highlight={order[safeIndex] ?? null}
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
          ) : state.type === "sphere" || state.type === "dome" ? (
            <LayerStack
              layers={shape.layers}
              activeIndex={layerIndex}
              color={color}
              dict={dict}
              onSelect={(i) => setState((s) => ({ ...s, layerIndex: i }))}
            />
          ) : (
            <BlueprintGrid
              points={points}
              sizeW={bounds.sizeW}
              sizeH={bounds.sizeH}
              color={color}
              label={dict.tool.blueprint}
              context={
                state.type === "arc" ? outlineCircle(state.d) : undefined
              }
            />
          )}
          <p className="font-terminal text-3xl text-accent">
            {state.type === "sphere" || state.type === "dome"
              ? `${blockCount} / ${shape.totalBlockCount}`
              : blockCount}{" "}
            {dict.tool.blocksCount}
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
        </div>

        <SizeGuideTable dict={dict} />
      </div>
    </div>
  );
}
