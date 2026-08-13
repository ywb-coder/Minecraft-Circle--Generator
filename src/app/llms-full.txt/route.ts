import { generateShape } from "@/lib/shapes";

export const dynamic = "force-static";

const CIRCLE_SIZES = [15, 21, 25, 33, 41, 49, 65, 101];
const LAYERED_SIZES = [15, 21, 33];

const SIZE_USES: Record<number, string> = {
  15: "a small fountain base or decorative window",
  21: "a compact tower or silo with an easy footprint",
  25: "a garden pond or round gazebo floor",
  33: "a full tower or a large garden feature",
  41: "a castle keep or lighthouse base",
  49: "a large tower or arena ring",
  65: "a coliseum or huge domed hall",
  101: "a stadium, temple or mega base",
};

function circleBlocks(d: number): number {
  return generateShape({ type: "circle", d, style: "outline" }).blockCount;
}

function sphereSummary(d: number): string {
  const shape = generateShape({ type: "sphere", d, style: "outline" });
  return `${shape.totalBlockCount} blocks across ${shape.layers.length} layers`;
}

function domeSummary(d: number): string {
  const shape = generateShape({ type: "dome", d, style: "outline" });
  return `${shape.totalBlockCount} blocks across ${shape.layers.length} layers`;
}

function torusSummary(d: number, t: number): string {
  const shape = generateShape({ type: "torus", d, t });
  return `${shape.totalBlockCount} blocks across ${shape.layers.length} layers`;
}

function ellipsoidSummary(w: number, h: number, dp: number): string {
  const shape = generateShape({ type: "ellipsoid", w, h, dp });
  return `${shape.totalBlockCount} blocks across ${shape.layers.length} layers`;
}

export async function GET(): Promise<Response> {
  const lines: string[] = [];
  lines.push("# Minecraft Circle Generator");
  lines.push("");
  lines.push(
    "> Free Minecraft circle generator with block-by-block pixel blueprints for circles, ovals, spheres, domes and arcs. Works for Java and Bedrock editions."
  );
  lines.push("");
  lines.push("## Shapes");
  lines.push("");
  lines.push(
    "- Circle: a ring outline made of blocks, defined by its diameter. The generator prints an exact pixel grid to copy block by block."
  );
  lines.push(
    "- Oval: an elongated circle with independent width and height, built the same way as a circle but stretched on one axis."
  );
  lines.push(
    "- Sphere: a full 3D ball built from stacked circular layers, each layer slightly smaller as it rises to the top cap."
  );
  lines.push(
    "- Dome: the bottom half of a sphere, built from the ground up in layers that widen to the equator and stop at the widest ring."
  );
  lines.push(
    "- Arc: a curved section of a circle outline, useful for paths, windows and ornamental arches."
  );
  lines.push(
    "- Torus: a donut-shaped ring of tube, defined by its outer diameter and tube thickness, built from stacked circular layers that narrow toward the top and bottom."
  );
  lines.push(
    "- Ellipsoid: a sphere stretched on three axes, defined by width, height and depth, built from stacked oval layers that shrink toward the poles."
  );
  lines.push("");
  lines.push("## Key facts");
  lines.push("");
  for (const d of CIRCLE_SIZES) {
    lines.push(`- A ${d}-block circle outline uses ${circleBlocks(d)} blocks.`);
  }
  for (const d of LAYERED_SIZES) {
    lines.push(`- A ${d}-block sphere uses ${sphereSummary(d)}.`);
  }
  for (const d of LAYERED_SIZES) {
    lines.push(`- A ${d}-block dome uses ${domeSummary(d)}.`);
  }
  lines.push(
    `- A 41-block torus with an 8-block tube uses ${torusSummary(41, 8)}.`
  );
  lines.push(
    `- A 65-block torus with a 12-block tube uses ${torusSummary(65, 12)}.`
  );
  lines.push(`- A 25x17x9 ellipsoid uses ${ellipsoidSummary(25, 17, 9)}.`);
  lines.push(`- A 49x31x21 ellipsoid uses ${ellipsoidSummary(49, 31, 21)}.`);
  lines.push("");
  lines.push("## Size guide");
  lines.push("");
  for (const d of CIRCLE_SIZES) {
    lines.push(
      `- ${d} blocks: ${circleBlocks(d)} blocks in outline form - good for ${SIZE_USES[d]}.`
    );
  }
  lines.push(
    `- Torus 41x8: ${torusSummary(41, 8)} - a compact ring for fountains and circular towers.`
  );
  lines.push(
    `- Torus 65x12: ${torusSummary(65, 12)} - a large ring for arenas and ring walls.`
  );
  lines.push(
    `- Ellipsoid 25x17x9: ${ellipsoidSummary(25, 17, 9)} - a low elongated dome for halls.`
  );
  lines.push(
    `- Ellipsoid 49x31x21: ${ellipsoidSummary(49, 31, 21)} - a big three-axis shape for stadium builds.`
  );
  lines.push("");
  lines.push("## FAQ");
  lines.push("");
  lines.push("### How do I use the generator?");
  lines.push(
    "Pick a shape and a diameter, read the block count, then copy the pixel grid block by block into Minecraft, starting from the center block."
  );
  lines.push("");
  lines.push("### What size should I choose?");
  lines.push(
    "Small circles from 5 to 15 blocks suit fountains and windows, 21 to 49 fit towers and rooms, and anything above 65 is for stadiums, coliseums and mega builds."
  );
  lines.push("");
  lines.push("### Does it work in Java and Bedrock?");
  lines.push(
    "Yes. The blueprint is a simple block-position grid, so it works identically in Java Edition and Bedrock Edition."
  );
  lines.push("");
  lines.push("### How do I build a sphere or dome?");
  lines.push(
    "Switch to the sphere or dome shape, then build one layer at a time from the bottom up, following the per-layer grids until the shape closes at the top."
  );
  lines.push("");
  lines.push("### Can I export /setblock commands?");
  lines.push(
    "Yes. The generator exports every block as a /setblock command with world coordinates, and can copy all layers for spheres, domes, toruses and ellipsoids."
  );
  lines.push("");
  lines.push("### What is Builder mode?");
  lines.push(
    "Builder mode turns the blueprint into a step-by-step guide: click blocks to mark them placed, use Next and Prev to move through the build order, or press Play to auto-advance."
  );
  lines.push("");
  lines.push("## All sizes");
  lines.push("");
  for (let d = 5; d <= 255; d += 2) {
    lines.push(`- ${d}: ${circleBlocks(d)} blocks`);
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
