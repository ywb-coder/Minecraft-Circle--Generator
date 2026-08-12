export type ShapeType = "circle" | "oval" | "sphere" | "dome" | "arc";

export type CircleStyle = "outline" | "chart" | "filled";

export interface Point {
  x: number;
  y: number;
}

/** One layer of a sphere/dome: a 2D footprint (x,y) at height z. */
export interface Layer {
  z: number;
  points: Point[];
  blockCount: number;
}

export interface ShapeResult {
  type: ShapeType;
  width: number;
  height: number;
  depth: number;
  /** 2D footprint used by the grid blueprint (circle/oval/arc: the shape itself; sphere/dome: the selected layer). */
  points: Point[];
  /** Sphere/dome layers, bottom to top. Empty for flat shapes. */
  layers: Layer[];
  blockCount: number;
  /** Total block count across all layers (sphere/dome) or of the single footprint. */
  totalBlockCount: number;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}
