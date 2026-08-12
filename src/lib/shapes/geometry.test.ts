import { describe, expect, it } from "vitest";
import {
  arcPoints,
  chartCircle,
  circlePoints,
  domeLayers,
  filledCircle,
  generateShape,
  outlineCircle,
  ovalPoints,
  sphereLayers,
} from "./index";

/** Ground truth extracted from the reference site's prerendered HTML. */
function rowWidths(points: { x: number; y: number }[], size: number) {
  const widths: number[] = [];
  const r = Math.round((size - 1) / 2);
  for (let y = -r; y <= r; y++) {
    widths.push(points.filter((p) => p.y === y).length);
  }
  return widths;
}

function pattern(points: { x: number; y: number }[], size: number) {
  const rows: string[] = [];
  const r = Math.round((size - 1) / 2);
  for (let y = -r; y <= r; y++) {
    let row = "";
    for (let x = -r; x <= r; x++) {
      row += points.some((p) => p.x === x && p.y === y) ? "#" : ".";
    }
    rows.push(row);
  }
  return rows;
}

describe("outlineCircle — exact match with reference site grids", () => {
  const cases: Record<number, number[]> = {
    7: [3, 2, 2, 2, 2, 2, 3],
    11: [5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5],
    15: [5, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 5],
    21: [7, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 7],
  };

  for (const [d, widths] of Object.entries(cases)) {
    it(`d=${d}`, () => {
      const points = outlineCircle(Number(d));
      expect(rowWidths(points, Number(d))).toEqual(widths);
    });
  }

  it("d=15 matches the exact reference pattern", () => {
    const expected = [
      ".....#####.....",
      "...##.....##...",
      "..#.........#..",
      ".#...........#.",
      ".#...........#.",
      "#.............#",
      "#.............#",
      "#.............#",
      "#.............#",
      "#.............#",
      ".#...........#.",
      ".#...........#.",
      "..#.........#..",
      "...##.....##...",
      ".....#####.....",
    ];
    expect(pattern(outlineCircle(15), 15)).toEqual(expected);
    expect(outlineCircle(15)).toHaveLength(40);
  });

  it("d=7 matches the exact reference pattern", () => {
    const expected = [
      "..###..",
      ".#...#.",
      "#.....#",
      "#.....#",
      "#.....#",
      ".#...#.",
      "..###..",
    ];
    expect(pattern(outlineCircle(7), 7)).toEqual(expected);
  });

  it("d=21 matches the exact reference pattern", () => {
    const expected = [
      ".......#######.......",
      ".....##.......##.....",
      "....#...........#....",
      "...#.............#...",
      "..#...............#..",
      ".#.................#.",
      ".#.................#.",
      "#...................#",
      "#...................#",
      "#...................#",
      "#...................#",
      "#...................#",
      "#...................#",
      "#...................#",
      ".#.................#.",
      ".#.................#.",
      "..#...............#..",
      "...#.............#...",
      "....#...........#....",
      ".....##.......##.....",
      ".......#######.......",
    ];
    expect(pattern(outlineCircle(21), 21)).toEqual(expected);
    expect(outlineCircle(21)).toHaveLength(56);
  });
});

describe("chartCircle — the classic Minecraft circle chart", () => {
  it("d=15 has the classic chart row widths", () => {
    const widths = rowWidths(chartCircle(15), 15);
    expect(widths).toEqual([1, 8, 10, 12, 12, 14, 14, 15, 14, 14, 12, 12, 10, 8, 1]);
    expect(chartCircle(15)).toHaveLength(157);
  });

  it("d=15 filled disc has 169 blocks", () => {
    expect(filledCircle(15)).toHaveLength(169);
    expect(rowWidths(filledCircle(15), 15)).toEqual([1, 9, 11, 13, 13, 15, 15, 15, 15, 15, 13, 13, 11, 9, 1]);
  });
});

describe("symmetry and bounds", () => {
  for (const d of [9, 15, 21, 33, 51, 101, 255]) {
    it(`circle d=${d} is symmetric and in bounds`, () => {
      const points = circlePoints(d, "outline");
      const set = new Set(points.map((p) => `${p.x},${p.y}`));
      const rr = Math.round((d - 1) / 2);
      for (const p of points) {
        expect(set.has(`${-p.x},${p.y}`)).toBe(true);
        expect(set.has(`${p.x},${-p.y}`)).toBe(true);
        expect(Math.abs(p.x)).toBeLessThanOrEqual(rr);
        expect(Math.abs(p.y)).toBeLessThanOrEqual(rr);
      }
      const widths = rowWidths(points, d);
      expect(widths[0]).toEqual(widths[d - 1]);
    });
  }

  for (const d of [50, 100, 256]) {
    it(`even circle d=${d} renders without crash and stays bounded`, () => {
      const points = circlePoints(d, "outline");
      expect(points.length).toBeGreaterThan(0);
      for (const p of points) {
        expect(Math.abs(p.x)).toBeLessThanOrEqual(d / 2);
        expect(Math.abs(p.y)).toBeLessThanOrEqual(d / 2);
      }
    });
  }

  it("outlineCircle(1) returns the single center cell", () => {
    expect(outlineCircle(1)).toEqual([{ x: 0, y: 0 }]);
  });
});

describe("oval", () => {
  it("15x7 outline is symmetric", () => {
    const points = ovalPoints(15, 7, "outline");
    const set = new Set(points.map((p) => `${p.x},${p.y}`));
    for (const p of points) {
      expect(set.has(`${-p.x},${p.y}`)).toBe(true);
      expect(set.has(`${p.x},${-p.y}`)).toBe(true);
    }
    expect(rowWidths(points, 7)).toHaveLength(7);
  });

  it("filled 25x13 has more blocks than outline", () => {
    expect(filledCircle(25).length).toBeGreaterThan(outlineCircle(25).length);
    expect(ovalPoints(25, 13, "filled").length).toBeGreaterThan(
      ovalPoints(25, 13, "outline").length
    );
  });
});

describe("sphere and dome", () => {
  it("sphere d=15 has 15 layers, center layer = outline(15)", () => {
    const layers = sphereLayers(15);
    expect(layers).toHaveLength(15);
    const center = layers[7];
    expect(center.blockCount).toBe(40);
    expect(center.points.length).toBe(40);
  });

  it("dome d=15 has 8 layers with full ring at the base", () => {
    const layers = domeLayers(15);
    expect(layers).toHaveLength(8);
    expect(layers[0].blockCount).toBe(40);
    expect(layers[7].blockCount).toBe(1);
    const total = layers.reduce((s, l) => s + l.blockCount, 0);
    expect(generateShape({ type: "dome", d: 15 }).totalBlockCount).toBe(total);
  });

  it("sphere layers shrink toward the poles", () => {
    const layers = sphereLayers(21);
    expect(layers[0].blockCount).toBeLessThan(layers[10].blockCount);
  });
});

describe("arc", () => {
  it("90° arc of d=15 has ~10 blocks (quarter of 40)", () => {
    const points = arcPoints(15, 0, 90);
    expect(points.length).toBeGreaterThanOrEqual(9);
    expect(points.length).toBeLessThanOrEqual(11);
  });

  it("full 360° arc equals the outline circle", () => {
    const points = arcPoints(15, 0, 360);
    expect(points.length).toBe(outlineCircle(15).length);
  });

  it("wrap-around arc works (270° to 360°)", () => {
    const points = arcPoints(15, 270, 90);
    expect(points.length).toBeGreaterThanOrEqual(9);
    expect(points.length).toBeLessThanOrEqual(11);
  });
});

describe("generateShape", () => {
  it("defaults to circle d=15 outline", () => {
    const result = generateShape({ type: "circle" });
    expect(result.blockCount).toBe(40);
    expect(result.type).toBe("circle");
  });

  it("sphere reports totalBlockCount across layers", () => {
    const result = generateShape({ type: "sphere", d: 15 });
    expect(result.layers).toHaveLength(15);
    expect(result.totalBlockCount).toBeGreaterThan(result.blockCount);
  });
});
