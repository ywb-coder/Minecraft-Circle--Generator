import { describe, expect, it } from "vitest";
import { generateShape } from "./index";

/** Measure the fastest observed run of `fn`, in milliseconds. */
function measure(fn: () => unknown): number {
  // Warm up JIT and caches before measuring so a busy machine does not
  // turn the first run into a false regression.
  fn();
  let best = Infinity;
  // Take many samples and keep the minimum. What we care about is how fast
  // the shape can be built, not how long the process was descheduled.
  for (let i = 0; i < 15; i++) {
    const t0 = performance.now();
    fn();
    const dt = performance.now() - t0;
    if (dt < best) best = dt;
  }
  return best;
}

/**
 * Run `fn` under a performance budget.
 *
 * Vitest executes test files in parallel workers. On a loaded machine
 * (a build running in the background, for instance) the worker can be
 * descheduled for several milliseconds, and every sample inside one
 * measurement window picks up that pause. The result is a number that
 * describes the scheduler, not the code.
 *
 * A genuine regression is slow every time, so measuring twice and keeping
 * the faster result separates the two cases: real regressions fail both
 * rounds, a scheduling artefact passes the second one.
 */
function withinBudget(fn: () => unknown, budgetMs: number): number {
  const first = measure(fn);
  if (first < budgetMs) return first;
  return Math.min(first, measure(fn));
}

describe("performance budgets (release gate)", () => {
  it("circle 512 outline < 5ms", () => {
    expect(
      withinBudget(() => generateShape({ type: "circle", d: 512 }), 5)
    ).toBeLessThan(5);
  });

  it("circle 512 filled < 40ms", () => {
    expect(
      withinBudget(
        () => generateShape({ type: "circle", d: 512, style: "filled" }),
        40
      )
    ).toBeLessThan(40);
  });

  it("circle 512 thick ring < 10ms", () => {
    expect(
      withinBudget(
        () => generateShape({ type: "circle", d: 512, thickness: 6 }),
        10
      )
    ).toBeLessThan(10);
  });

  it("sphere 256 < 30ms", () => {
    expect(
      withinBudget(() => generateShape({ type: "sphere", d: 256 }), 30)
    ).toBeLessThan(30);
  });

  it("dome 256 < 30ms", () => {
    expect(
      withinBudget(() => generateShape({ type: "dome", d: 256 }), 30)
    ).toBeLessThan(30);
  });

  it("torus 512x16 < 40ms", () => {
    expect(
      withinBudget(() => generateShape({ type: "torus", d: 512, t: 16 }), 40)
    ).toBeLessThan(40);
  });

  it("ellipsoid 256x192x128 < 30ms", () => {
    expect(
      withinBudget(
        () => generateShape({ type: "ellipsoid", w: 256, h: 192, dp: 128 }),
        30
      )
    ).toBeLessThan(30);
  });
});
