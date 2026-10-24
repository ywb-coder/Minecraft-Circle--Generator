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
  lines.push("## Features");
  lines.push("");
  lines.push(
    "- Export every block as a /setblock command with world coordinates (all layers for 3D shapes)."
  );
  lines.push(
    "- Builder mode steps through placements block by block with click-to-mark, Next/Prev and play."
  );
  lines.push(
    "- Outline thickness (1-6) makes thick walls; inner cutout creates hollow rings."
  );
  lines.push(
    "- Interactive 3D preview with drag-to-rotate, layer-by-layer view for spheres, domes, toruses and ellipsoids."
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
  lines.push("");
  lines.push("## Guides");
  lines.push("");
  lines.push(
    `- [Minecraft Circle Guide](${SITE_URL}/blog/minecraft-circle-guide/): odd vs even diameters, step-by-step circle building, sphere and dome tips`
  );
  lines.push(
    `- [Minecraft Circle Sizes](${SITE_URL}/blog/minecraft-circle-sizes/): complete size chart with block counts for every build type`
  );
  lines.push(
    `- [Minecraft Sphere Guide](${SITE_URL}/blog/minecraft-sphere-guide/): turn circle slices into a layered sphere`
  );
  lines.push(
    `- [Minecraft Dome Guide](${SITE_URL}/blog/minecraft-dome-guide/): choose a base diameter and stack a half-sphere roof`
  );
  lines.push(
    `- [Minecraft Oval Guide](${SITE_URL}/blog/minecraft-oval-guide/): width and height blueprints for stretched circles`
  );
  lines.push(
    `- [Minecraft Tower Guide](${SITE_URL}/blog/minecraft-tower-guide/): pick a footprint by interior, walls, and stairs`
  );
  lines.push(
    `- [Cómo hacer un círculo en Minecraft](${SITE_URL}/es/blog/como-hacer-circulos-minecraft/): guía paso a paso en español`
  );
  lines.push(
    `- [Cómo hacer una esfera en Minecraft](${SITE_URL}/es/blog/como-hacer-esfera-minecraft/): esfera por capas en español`
  );
  lines.push(
    `- [Medidas de círculos en Minecraft](${SITE_URL}/es/blog/medidas-circulos-minecraft/): tabla de tamaños y conteos`
  );
  lines.push(
    `- [Cómo hacer un óvalo en Minecraft](${SITE_URL}/es/blog/como-hacer-ovalo-minecraft/): planos de ancho y alto en español`
  );
  lines.push("");
  lines.push("## Languages");
  lines.push("");
  lines.push(
    `- [Español](${SITE_URL}/es/), [Русский](${SITE_URL}/ru/), [Deutsch](${SITE_URL}/de/), [Français](${SITE_URL}/fr/), [Italiano](${SITE_URL}/it/), [Português](${SITE_URL}/pt/), [Türkçe](${SITE_URL}/tr/), [Polski](${SITE_URL}/pl/), [Bahasa Indonesia](${SITE_URL}/id/), [中文](${SITE_URL}/zh/)`
  );

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
