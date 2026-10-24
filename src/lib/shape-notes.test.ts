import { describe, expect, it } from "vitest";
import { INDEXABLE_SHAPE_PATHS } from "./seo";
import { getShapeNote, SHAPE_NOTES } from "./shape-notes";

const LOCALES = ["en", "es"] as const;

describe("shape notes", () => {
  it("covers every indexable shape path in both languages", () => {
    expect(Object.keys(SHAPE_NOTES)).toHaveLength(INDEXABLE_SHAPE_PATHS.size);

    for (const path of INDEXABLE_SHAPE_PATHS) {
      expect(
        SHAPE_NOTES[path as keyof typeof SHAPE_NOTES],
        path
      ).toBeDefined();
      for (const locale of LOCALES) {
        const text = SHAPE_NOTES[path as keyof typeof SHAPE_NOTES][locale];
        expect(text.trim().length, `${path} (${locale})`).toBeGreaterThan(0);
      }
    }
  });

  it("keeps every note between 120 and 500 characters", () => {
    for (const [path, note] of Object.entries(SHAPE_NOTES)) {
      for (const locale of LOCALES) {
        const text = note[locale];
        expect(text.length, `${path} (${locale})`).toBeGreaterThanOrEqual(120);
        expect(text.length, `${path} (${locale})`).toBeLessThanOrEqual(500);
      }
    }
  });

  it("writes two sentences of 35 to 70 words per note", () => {
    for (const [path, note] of Object.entries(SHAPE_NOTES)) {
      for (const locale of LOCALES) {
        const text = note[locale].trim();
        const words = text.split(/\s+/);
        const sentences = text.match(/[.!?](?=\s|$)/g) ?? [];
        expect(words.length, `${path} (${locale}) words`).toBeGreaterThanOrEqual(
          35
        );
        expect(words.length, `${path} (${locale}) words`).toBeLessThanOrEqual(
          70
        );
        expect(sentences.length, `${path} (${locale}) sentences`).toBe(2);
      }
    }
  });

  it("contains no Unicode replacement characters", () => {
    for (const [path, note] of Object.entries(SHAPE_NOTES)) {
      for (const locale of LOCALES) {
        expect(note[locale], `${path} (${locale})`).not.toContain("\uFFFD");
      }
    }
  });

  it("uses unique notes within each language", () => {
    for (const locale of LOCALES) {
      const notes = Object.values(SHAPE_NOTES).map((note) =>
        note[locale].trim()
      );
      expect(new Set(notes).size, locale).toBe(notes.length);
    }
  });

  it("normalizes trailing slashes and rejects unknown locales", () => {
    expect(getShapeNote("/circle/15/", "en")).toBe(
      SHAPE_NOTES["/circle/15"].en
    );
    expect(getShapeNote("/circle/15", "de")).toBeUndefined();
    expect(getShapeNote("/circle/14", "en")).toBeUndefined();
  });
});
