import { describe, expect, it } from "vitest";
import {
  CONSENT_STORAGE_KEY,
  parseConsent,
  serializeConsent,
} from "./consent";

describe("CONSENT_STORAGE_KEY", () => {
  it("uses the versioned key", () => {
    expect(CONSENT_STORAGE_KEY).toBe("circlegen-consent-v1");
  });
});

describe("parseConsent", () => {
  it("parses granted", () => {
    expect(parseConsent("granted")).toBe("granted");
  });

  it("parses denied", () => {
    expect(parseConsent("denied")).toBe("denied");
  });

  it("returns null for a missing value", () => {
    expect(parseConsent(null)).toBeNull();
  });

  it("returns null for invalid values", () => {
    expect(parseConsent("accepted")).toBeNull();
    expect(parseConsent("true")).toBeNull();
    expect(parseConsent("")).toBeNull();
  });

  it("tolerates surrounding whitespace", () => {
    expect(parseConsent("  granted  ")).toBe("granted");
    expect(parseConsent("\ndenied\t")).toBe("denied");
    expect(parseConsent("   ")).toBeNull();
  });
});

describe("serializeConsent", () => {
  it("round-trips granted", () => {
    expect(parseConsent(serializeConsent("granted"))).toBe("granted");
  });

  it("round-trips denied", () => {
    expect(parseConsent(serializeConsent("denied"))).toBe("denied");
  });

  it("serializes to the plain choice string", () => {
    expect(serializeConsent("granted")).toBe("granted");
    expect(serializeConsent("denied")).toBe("denied");
  });
});
