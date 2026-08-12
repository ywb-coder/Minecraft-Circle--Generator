"use client";

import { useMemo, type Dispatch, type SetStateAction } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { interpolate } from "@/lib/i18n/format";
import {
  ARC_SPANS,
  domeLayers,
  ellipsoidLayers,
  shapeLimits,
  sphereLayers,
  torusLayers,
  type CircleStyle,
  type ShapeType,
} from "@/lib/shapes";
import { clamp, toInt, type ToolState } from "./tool-state";

const SHAPES: ShapeType[] = [
  "circle",
  "oval",
  "sphere",
  "dome",
  "arc",
  "torus",
  "ellipsoid",
];
const STYLES: CircleStyle[] = ["outline", "chart", "filled"];
const PRESETS = [16, 32, 64, 128, 256];

export default function ShapeControls({
  dict,
  state,
  setState,
}: {
  dict: Dictionary;
  state: ToolState;
  setState: Dispatch<SetStateAction<ToolState>>;
}) {
  const { type } = state;
  const limits = shapeLimits[type];
  const isOval = type === "oval";
  const isArc = type === "arc";
  const isLayered = type === "sphere" || type === "dome" || type === "torus" || type === "ellipsoid";
  const isTorus = type === "torus";
  const isEllipsoid = type === "ellipsoid";
  const showThickness = type === "circle" || type === "oval";
  const showInner = type === "circle";
  const showPresets = !isOval && !isEllipsoid;

  const layerCount = useMemo(() => {
    if (type === "sphere") {
      return sphereLayers(clamp(state.d, limits.min, limits.max)).length;
    }
    if (type === "dome") {
      return domeLayers(clamp(state.d, limits.min, limits.max)).length;
    }
    if (type === "torus") {
      return torusLayers(
        clamp(state.d, limits.min, limits.max),
        clamp(state.t, 1, 64)
      ).length;
    }
    if (type === "ellipsoid") {
      return ellipsoidLayers(
        clamp(state.w, limits.min, limits.max),
        clamp(state.h, limits.min, limits.max),
        clamp(state.dp, limits.min, limits.max)
      ).length;
    }
    return 0;
  }, [type, state.d, state.w, state.h, state.dp, state.t, limits.min, limits.max]);

  const invalid = isOval || isEllipsoid
    ? state.w < limits.min || state.w > limits.max || state.h < limits.min || state.h > limits.max ||
      (isEllipsoid && (state.dp < limits.min || state.dp > limits.max))
    : isTorus
      ? state.d < limits.min || state.d > limits.max || state.t < 1 || state.t > 64
      : state.d < limits.min || state.d > limits.max;

  const set = (patch: Partial<ToolState>) => setState((s) => ({ ...s, ...patch }));

  const sizeInput = (
    label: string,
    value: number,
    key: "d" | "w" | "h" | "dp" | "t",
    min: number,
    max: number
  ) => (
    <label className="block">
      <span className="font-pixel text-[10px] text-muted">{label}</span>
      <div className="mt-1 flex items-center gap-2">
        <input
          type="number"
          min={min}
          max={max}
          value={value}
          onChange={(e) => set({ [key]: clamp(toInt(e.target.value, value), min, max) })}
          className="w-20 border-2 border-mc-border bg-panel px-2 py-1 font-terminal text-xl text-ink"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={clamp(value, min, max)}
          onChange={(e) => set({ [key]: Number(e.target.value) })}
          className="w-full"
          style={{ accentColor: "var(--accent)" }}
        />
      </div>
    </label>
  );

  return (
    <div className="flex flex-col gap-4">
      <fieldset>
        <legend className="font-pixel text-[10px] text-muted">{dict.tool.shape}</legend>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {SHAPES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => set({ type: s })}
              className={`mc-btn px-2! py-1! ${type === s ? "mc-btn-selected" : ""}`}
            >
              {dict.tool[s]}
            </button>
          ))}
        </div>
      </fieldset>

      {!isArc && !isTorus && !isEllipsoid && (
        <fieldset>
          <legend className="font-pixel text-[10px] text-muted">{dict.tool.style}</legend>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {STYLES.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => set({ style: st })}
                className={`mc-btn px-2! py-1! ${state.style === st ? "mc-btn-selected" : ""}`}
              >
                {dict.tool[st]}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset className="flex flex-col gap-3">
        {isOval ? (
          <>
            {sizeInput(dict.tool.width, state.w, "w", limits.min, limits.max)}
            {sizeInput(dict.tool.height, state.h, "h", limits.min, limits.max)}
          </>
        ) : isEllipsoid ? (
          <>
            {sizeInput(dict.tool.width, state.w, "w", limits.min, limits.max)}
            {sizeInput(dict.tool.height, state.h, "h", limits.min, limits.max)}
            {sizeInput(dict.tool.depth, state.dp, "dp", limits.min, limits.max)}
          </>
        ) : isTorus ? (
          <>
            {sizeInput(dict.tool.diameter, state.d, "d", limits.min, limits.max)}
            {sizeInput(dict.tool.tube, state.t, "t", 1, 64)}
          </>
        ) : isArc ? (
          <>
            {sizeInput(dict.tool.diameter, state.d, "d", limits.min, limits.max)}
            <label className="block">
              <span className="font-pixel text-[10px] text-muted">{dict.tool.angleStart}</span>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="number"
                  min={0}
                  max={359}
                  value={state.start}
                  onChange={(e) =>
                    set({ start: clamp(toInt(e.target.value, state.start), 0, 359) })
                  }
                  className="w-20 border-2 border-mc-border bg-panel px-2 py-1 font-terminal text-xl text-ink"
                />
                <input
                  type="range"
                  min={0}
                  max={359}
                  step={1}
                  value={state.start}
                  onChange={(e) => set({ start: Number(e.target.value) })}
                  className="w-full"
                  style={{ accentColor: "var(--accent)" }}
                />
              </div>
            </label>
            <label className="block">
              <span className="font-pixel text-[10px] text-muted">{dict.tool.angleSpan}</span>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {ARC_SPANS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => set({ span: s })}
                    className={`mc-btn px-2! py-1! ${state.span === s ? "mc-btn-selected" : ""}`}
                  >
                    {s}°
                  </button>
                ))}
              </div>
            </label>
          </>
        ) : (
          sizeInput(dict.tool.diameter, state.d, "d", limits.min, limits.max)
        )}
      </fieldset>

      {showThickness && state.style === "outline" && (
        <label className="block">
          <span className="font-pixel text-[10px] text-muted">
            {dict.tool.thickness} {state.thickness}
          </span>
          <input
            type="range"
            min={1}
            max={6}
            step={1}
            value={state.thickness}
            onChange={(e) => set({ thickness: Number(e.target.value) })}
            className="mt-1 w-full"
            style={{ accentColor: "var(--accent)" }}
          />
        </label>
      )}

      {showInner && (
        <label className="block">
          <span className="font-pixel text-[10px] text-muted">
            {dict.tool.inner} {state.inner > 0 ? state.inner : 0}
          </span>
          <input
            type="range"
            min={0}
            max={Math.max(0, state.d - 4)}
            step={2}
            value={clamp(state.inner, 0, Math.max(0, state.d - 4))}
            onChange={(e) => set({ inner: Number(e.target.value) })}
            className="mt-1 w-full"
            style={{ accentColor: "var(--accent)" }}
          />
        </label>
      )}

      {showPresets && (
        <fieldset>
          <legend className="font-pixel text-[10px] text-muted">{dict.tool.presets}</legend>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {PRESETS.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => set({ d: n })}
                className="mc-btn px-2! py-1!"
              >
                {n}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {isLayered && (
        <label className="block">
          <span className="font-pixel text-[10px] text-muted">
            {dict.tool.layer} {clamp(state.layerIndex, 0, Math.max(0, layerCount - 1)) + 1} / {Math.max(1, layerCount)}
          </span>
          <input
            type="range"
            min={0}
            max={Math.max(0, layerCount - 1)}
            step={1}
            value={clamp(state.layerIndex, 0, Math.max(0, layerCount - 1))}
            onChange={(e) => set({ layerIndex: Number(e.target.value) })}
            className="mt-1 w-full"
            style={{ accentColor: "var(--accent)" }}
          />
        </label>
      )}

      <fieldset>
        <legend className="font-pixel text-[10px] text-muted">{dict.tool.worldCoords}</legend>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {(["centerX", "centerY", "centerZ"] as const).map((key) => (
            <label key={key} className="block">
              <span className="font-pixel text-[10px] text-muted">{dict.tool[key]}</span>
              <input
                type="number"
                value={state[key]}
                onChange={(e) => set({ [key]: toInt(e.target.value, state[key]) })}
                className="mt-1 w-full border-2 border-mc-border bg-panel px-2 py-1 font-terminal text-lg text-ink"
              />
            </label>
          ))}
        </div>
      </fieldset>

      {invalid && (
        <p className="font-pixel text-[10px] leading-relaxed text-accent">
          {interpolate(dict.tool.invalidSize, { min: limits.min, max: limits.max })}
        </p>
      )}
    </div>
  );
}
