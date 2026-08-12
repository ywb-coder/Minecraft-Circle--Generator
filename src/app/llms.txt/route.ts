import { SITE_URL } from "@/lib/config";
import { generateShape } from "@/lib/shapes";

export const dynamic = "force-static";

const CIRCLE_SIZES = [15, 21, 25, 33, 41, 49, 65, 101];
const PAGE_CIRCLE_SIZES = [15, 21, 33, 49, 101];

function circleBlocks(d: number): number {
  return generateShape({ type: "circle", d, style: "outline" }).blockCount;
}

export async function GET(): Promise<Response> {
  const lines: string[] = [];
  lines.push("# Minecraft Circle Generator");
  lines.push("");
  lines.push(
    "> Free Minecraft circle generator with block-by-block pixel blueprints for circles, ovals, spheres, domes and arcs. Works for Java and Bedrock editions."
  );
  lines.push("");
  lines.push("## Key facts");
  lines.push("");
  for (const d of CIRCLE_SIZES) {
    lines.push(`- A ${d}-block circle outline uses ${circleBlocks(d)} blocks.`);
  }
  const sphere = generateShape({ type: "sphere", d: 15, style: "outline" });
  lines.push(
    `- A 15-block sphere uses ${sphere.totalBlockCount} blocks across ${sphere.layers.length} layers.`
  );
  const dome = generateShape({ type: "dome", d: 15, style: "outline" });
  lines.push(
    `- A 15-block dome uses ${dome.totalBlockCount} blocks across ${dome.layers.length} layers.`
  );
  const torus = generateShape({ type: "torus", d: 41, t: 8 });
  lines.push(
    `- A 41-block torus with an 8-block tube uses ${torus.totalBlockCount} blocks across ${torus.layers.length} layers.`
  );
  const ellipsoid = generateShape({ type: "ellipsoid", w: 25, h: 17, dp: 9 });
  lines.push(
    `- A 25x17x9 ellipsoid uses ${ellipsoid.totalBlockCount} blocks across ${ellipsoid.layers.length} layers.`
  );
  lines.push("");
  lines.push("## Pages");
  lines.push("");
  lines.push(
    `- [Minecraft Circle Generator](${SITE_URL}/): interactive circle, oval, sphere, dome and arc generator`
  );
  for (const d of PAGE_CIRCLE_SIZES) {
    lines.push(
      `- [Circle with ${d} block diameter](${SITE_URL}/circle/${d}/): ${circleBlocks(d)}-block blueprint`
    );
  }
  lines.push(`- [Sphere with 15 block diameter](${SITE_URL}/sphere/15/): sphere blueprint`);
  lines.push(`- [Dome with 15 block diameter](${SITE_URL}/dome/15/): dome blueprint`);
  lines.push(`- [Oval 15x7](${SITE_URL}/oval/15/7/): oval blueprint`);
  lines.push(`- [Torus 41x8](${SITE_URL}/torus/41/8/): torus blueprint`);
  lines.push(`- [Ellipsoid 25x17x9](${SITE_URL}/ellipsoid/25/17/9/): ellipsoid blueprint`);

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
