import { readdir, rm } from "node:fs/promises";
import { join } from "node:path";

const outDir = join(process.cwd(), "out");

/**
 * Removes the heavy full RSC payload files (index.txt / __next._full.txt)
 * while keeping __next._tree.txt (~3 MB total) so client-side navigation
 * prefetch keeps working without 404s.
 */
async function removeTxt(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await removeTxt(full);
    } else if (
      entry.name.endsWith(".txt") &&
      entry.name !== "__next._tree.txt" &&
      !(
        dir === outDir &&
        ["llms.txt", "llms-full.txt", "robots.txt"].includes(entry.name)
      )
    ) {
      await rm(full);
    }
  }
}

await removeTxt(outDir);
console.log("Heavy RSC payloads removed from out/ (kept __next._tree.txt)");
