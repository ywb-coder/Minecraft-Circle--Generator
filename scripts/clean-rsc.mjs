import { readdir, rm } from "node:fs/promises";
import { join } from "node:path";

const outDir = join(process.cwd(), "out");

async function removeTxt(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await removeTxt(full);
    } else if (entry.name.endsWith(".txt")) {
      await rm(full);
    }
  }
}

await removeTxt(outDir);
console.log("RSC payload .txt files removed from out/");
