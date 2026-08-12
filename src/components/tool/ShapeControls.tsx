"use client";

import { useMemo } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { interpolate } from "@/lib/i18n/format";
import {
  ARC_SPANS,
  domeLayers,
  shapeLimits,
  sphereLayers,
  type CircleStyle,
  type ShapeType,
} from "@/lib/shapes";
import { clamp, toInt, type ToolState } from "./tool-state";

const SHAPES: ShapeType[] = ["circle", "oval", "sphere", "dome", "arc"];
const STYLES: CircleStyle[] = ["outline", "chart", "filled"];

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
  const isLayered = type === "sphere" || type === "dome";

  const layerCount = useMemo(
    () =>
      isLayered
        ? (type === "sphere" ? sphereLayers : domeLayers)(
            clamp(state.d, limits.min, limits.max)
          ).length
        : 0,
    [type, state.d, isLayered, limits.min, limits.max]
  );

  const invalid = isOval
    ? state.w < limits.min || state.w > limits.max || state.h < limits.min || state.h > limits.max
    : state.d < limits.min || state.d > limits.max;

  const set = (patch: Partial<ToolState>) => setState((s) => ({ ...s, ...patch }));

  const sizeInput = (label: string, value: number, key: "d" | "w" | "h") => (
    <label className="block">
      <span className="font-pixel text-[10px] text-muted">{label}</span>
      <div className="mt-1 flex items-center gap-2">
        <input
          type="number"
          min={limits.min}
          max={limits.max}
          value={value}
          onChange={(e) => set({ [key]: clamp(toInt(e.target.value, value), limits.min, limits.max) })}
          className="w-20 border-2 border-mc-border bg-panel px-2 py-1 font-terminal text-xl text-ink"
        />
        <input
          type="range"
          min={limits.min}
          max={limits.max}
          step={1}
          value={clamp(value, limits.min, limits.max)}
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

      {!isArc && (
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
            {sizeInput(dict.tool.width, state.w, "w")}
            {sizeInput(dict.tool.height, state.h, "h")}
          </>
        ) : isArc ? (
          <>
            {sizeInput(dict.tool.diameter, state.d, "d")}
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
          sizeInput(dict.tool.diameter, state.d, "d")
        )}
      </fieldset>

      {isLayered && (
        <label className="block">
          <span className="font-pixel text-[10px] text-muted">
            {dict.tool.layer} {clamp(state.layerIndex, 0, layerCount - 1) + 1} / {layerCount}
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

      {invalid && (
        <p className="font-pixel text-[10px] leading-relaxed text-accent">
          {interpolate(dict.tool.invalidSize, { min: limits.min, max: limits.max })}
        </p>
      )}
    </div>
  );
}
