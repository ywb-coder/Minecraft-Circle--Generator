import { describe, expect, it } from "vitest";
import { generateShape } from "./index";

function time(fn: () => unknown): number {
  let best = Infinity;
  for (let i = 0; i < 3; i++) {
    const t0 = performance.now();
    fn();
    const dt = performance.now() - t0;
    if (dt < best) best = dt;
  }
  return best;
}

describe("performance budgets (release gate)", () => {
  it("circle 512 outline < 5ms", () => {
    expect(time(() => generateShape({ type: "circle", d: 512 }))).toBeLessThan(5);
  });

  it("circle 512 filled < 40ms", () => {
    expect(
      time(() => generateShape({ type: "circle", d: 512, style: "filled" }))
    ).toBeLessThan(40);
  });

  it("circle 512 thick ring < 10ms", () => {
    expect(
      time(() => generateShape({ type: "circle", d: 512, thickness: 6 }))
    ).toBeLessThan(10);
  });

  it("sphere 256 < 30ms", () => {
    expect(time(() => generateShape({ type: "sphere", d: 256 }))).toBeLessThan(30);
  });

  it("dome 256 < 30ms", () => {
    expect(time(() => generateShape({ type: "dome", d: 256 }))).toBeLessThan(30);
  });

  it("torus 512x16 < 40ms", () => {
    expect(
      time(() => generateShape({ type: "torus", d: 512, t: 16 }))
    ).toBeLessThan(40);
  });

  it("ellipsoid 256x192x128 < 30ms", () => {
    expect(
      time(() => generateShape({ type: "ellipsoid", w: 256, h: 192, dp: 128 }))
    ).toBeLessThan(30);
  });
});
