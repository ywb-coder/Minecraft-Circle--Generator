import { describe, expect, it } from "vitest";
import {
  CONSENT_STORAGE_KEY,
  isEeaTimezone,
  parseConsent,
  regionFromTimezone,
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

describe("isEeaTimezone", () => {
  it("accepts EEA and UK timezones", () => {
    expect(isEeaTimezone("Europe/Madrid")).toBe(true);
    expect(isEeaTimezone("Europe/London")).toBe(true);
    expect(isEeaTimezone("Europe/Berlin")).toBe(true);
    expect(isEeaTimezone("Europe/Zurich")).toBe(true);
    expect(isEeaTimezone("Atlantic/Canary")).toBe(true);
  });

  it("rejects non-EEA European timezones", () => {
    expect(isEeaTimezone("Europe/Moscow")).toBe(false);
    expect(isEeaTimezone("Europe/Istanbul")).toBe(false);
    expect(isEeaTimezone("Europe/Kyiv")).toBe(false);
  });

  it("rejects the site's main markets", () => {
    expect(isEeaTimezone("America/Mexico_City")).toBe(false);
    expect(isEeaTimezone("America/Sao_Paulo")).toBe(false);
    expect(isEeaTimezone("America/New_York")).toBe(false);
    expect(isEeaTimezone("Asia/Shanghai")).toBe(false);
  });

  it("treats missing values as outside the EEA", () => {
    expect(isEeaTimezone(null)).toBe(false);
    expect(isEeaTimezone(undefined)).toBe(false);
    expect(isEeaTimezone("")).toBe(false);
  });
});

describe("regionFromTimezone", () => {
  it("maps EEA timezones to the strict region", () => {
    expect(regionFromTimezone("Europe/Paris")).toBe("eea");
  });

  it("maps other timezones to rest-of-world", () => {
    expect(regionFromTimezone("America/Bogota")).toBe("row");
    expect(regionFromTimezone("Asia/Tokyo")).toBe("row");
  });

  it("falls back to the strict region when the timezone is unknown", () => {
    expect(regionFromTimezone(null)).toBe("eea");
    expect(regionFromTimezone("")).toBe("eea");
  });
});
