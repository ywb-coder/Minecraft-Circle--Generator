import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { analyticsEnabled, trackEvent } from "./analytics";

/**
 * The analytics module reads `window.gtag`. Under the default node test
 * environment there is no window, so we install a minimal fake on
 * globalThis — this also doubles as the "gtag absent" case when removed.
 */

const gtagSpy = vi.fn();

function setWindow(value: unknown): void {
  (globalThis as unknown as Record<string, unknown>).window = value;
}

beforeEach(() => {
  gtagSpy.mockClear();
});

afterEach(() => {
  delete (globalThis as unknown as Record<string, unknown>).window;
  gtagSpy.mockClear();
});

describe("analyticsEnabled", () => {
  it("is false when window is absent (SSR / non-browser)", () => {
    delete (globalThis as unknown as Record<string, unknown>).window;
    expect(analyticsEnabled()).toBe(false);
  });

  it("is false when gtag is absent (consent denied or withdrawn)", () => {
    setWindow({});
    expect(analyticsEnabled()).toBe(false);
  });

  it("is true once gtag is present (consent granted)", () => {
    setWindow({ gtag: gtagSpy });
    expect(analyticsEnabled()).toBe(true);
  });
});

describe("trackEvent", () => {
  it("is a no-op when window is absent", () => {
    delete (globalThis as unknown as Record<string, unknown>).window;
    expect(() => trackEvent("download_png")).not.toThrow();
    expect(gtagSpy).not.toHaveBeenCalled();
  });

  it("is a no-op when gtag is absent (consent denied)", () => {
    setWindow({});
    expect(() => trackEvent("download_png")).not.toThrow();
    expect(gtagSpy).not.toHaveBeenCalled();
  });

  it("sends the event with empty params by default", () => {
    setWindow({ gtag: gtagSpy });
    trackEvent("copy_link");
    expect(gtagSpy).toHaveBeenCalledWith("event", "copy_link", {});
  });

  it("forwards params to gtag", () => {
    setWindow({ gtag: gtagSpy });
    trackEvent("copy_setblock", {
      shape: "circle",
      blocks: 56,
      all_layers: false,
    });
    expect(gtagSpy).toHaveBeenCalledWith("event", "copy_setblock", {
      shape: "circle",
      blocks: 56,
      all_layers: false,
    });
  });
});
