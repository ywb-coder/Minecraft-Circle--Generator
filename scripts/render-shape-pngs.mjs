/**
 * render-shape-pngs.mjs — Screenshot the blueprint grid of every shape SEO page into public/shape-pngs/
 *
 * For each unique shape URL (circle/101, oval/21/9, torus/113/20, ellipsoid/113/71/49, ...) it
 * loads the prebuilt static page from out/ over a tiny local HTTP server, locates the blueprint
 * grid element (section.mc-panel .mc-panel-inset — the root rendered by BlueprintGrid on SEO pages)
 * and saves an element screenshot as public/shape-pngs/<url-with-dashes>.png.
 *
 * Usage:  node scripts/render-shape-pngs.mjs
 * Output: public/shape-pngs/*.png (existing files are kept/overwritten, never deleted)
 *
 * NOTE: keep console output ASCII-only — Windows console (GBK) garbles UTF-8.
 */

import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { chromium } from "playwright";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "out");
const PNG_DIR = path.join(ROOT, "public", "shape-pngs");

const SHAPES = ["circle", "sphere", "dome", "oval", "torus", "ellipsoid"];
// Root element rendered by src/components/tool/BlueprintGrid; on SEO pages the only
// strict section.mc-panel on the page holds exactly one .mc-panel-inset (the blueprint).
const SELECTOR = "section.mc-panel .mc-panel-inset";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".json": "application/json",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
};

// ---------- discovery: find every dir under a shape root that contains index.html ----------
function discoverEntries() {
  const entries = [];
  for (const shape of SHAPES) {
    const shapeDir = path.join(OUT_DIR, shape);
    if (!fs.existsSync(shapeDir)) continue;
    const walk = (dir, relParts) => {
      for (const child of fs.readdirSync(dir, { withFileTypes: true })) {
        if (!child.isDirectory()) continue;
        const abs = path.join(dir, child.name);
        const parts = [...relParts, child.name];
        if (fs.existsSync(path.join(abs, "index.html"))) {
          entries.push({ urlPath: "/" + parts.join("/") + "/", name: parts.join("-") });
        }
        walk(abs, parts);
      }
    };
    walk(shapeDir, [shape]);
  }
  entries.sort((a, b) => (a.urlPath < b.urlPath ? -1 : a.urlPath > b.urlPath ? 1 : 0));
  return entries;
}

// ---------- minimal static server for out/ (no file:// — pages use absolute /_next/... paths) ----------
function createStaticServer(outDir) {
  const root = path.normalize(outDir);
  return http.createServer((req, res) => {
    let urlPath;
    try {
      urlPath = new URL(req.url, "http://localhost").pathname;
    } catch {
      res.writeHead(400);
      res.end("bad request");
      return;
    }
    let rel = decodeURIComponent(urlPath).replace(/^\/+/, "");
    if (rel === "" || rel.endsWith("/")) rel += "index.html";
    const filePath = path.normalize(path.join(root, rel));
    if (filePath !== root && !filePath.startsWith(root + path.sep)) {
      res.writeHead(403);
      res.end("forbidden");
      return;
    }
    fs.stat(filePath, (err, st) => {
      if (err || !st.isFile()) {
        res.writeHead(404);
        res.end("not found");
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      fs.createReadStream(filePath).pipe(res);
    });
  });
}

function dirSizeMB(dir) {
  let bytes = 0;
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const abs = path.join(d, e.name);
      if (e.isDirectory()) walk(abs);
      else if (e.isFile()) bytes += fs.statSync(abs).size;
    }
  };
  walk(dir);
  return bytes / (1024 * 1024);
}

async function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.error("out/ not found under " + ROOT + " — run `npm run build` first.");
    process.exit(1);
  }
  const entries = discoverEntries();
  if (entries.length === 0) {
    console.error("no shape pages (index.html) found under out/");
    process.exit(1);
  }
  fs.mkdirSync(PNG_DIR, { recursive: true });

  const server = createStaticServer(OUT_DIR);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  console.log(`static server on ${base} (serving ${OUT_DIR})`);
  console.log(`pages to render: ${entries.length}  ->  ${PNG_DIR}`);

  let browser;
  try {
    browser = await chromium.launch({
      headless: true,
      args: ["--disable-blink-features=AutomationControlled"],
    });
  } catch (e) {
    console.log(
      `bundled chromium unavailable (${e.message.split("\n")[0].slice(0, 80)}), trying real Chrome`
    );
    browser = await chromium.launch({
      channel: "chrome",
      headless: true,
      args: ["--disable-blink-features=AutomationControlled"],
    });
  }
  const context = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
  const page = await context.newPage();

  const failed = [];
  const total = entries.length;
  for (let i = 0; i < total; i++) {
    const entry = entries[i];
    const outFile = path.join(PNG_DIR, entry.name + ".png");
    try {
      await page.goto(base + entry.urlPath, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.waitForTimeout(300); // let fonts/layout settle
      const loc = page.locator(SELECTOR).first();
      if ((await loc.count()) === 0) throw new Error("blueprint selector not found");
      await loc.screenshot({ path: outFile, timeout: 30000 });
    } catch (e) {
      failed.push(entry.name);
      console.error(`FAIL ${entry.name}: ${String(e.message).split("\n")[0].slice(0, 200)}`);
    }
    const done = i + 1;
    if (done % 25 === 0 || done === total) {
      console.log(`progress: ${done}/${total} (ok=${done - failed.length}, fail=${failed.length})`);
    }
  }

  await browser.close();
  await new Promise((resolve) => server.close(resolve));
  if (typeof server.closeAllConnections === "function") server.closeAllConnections();

  const ok = total - failed.length;
  console.log("\nDONE: total=" + total + " ok=" + ok + " fail=" + failed.length);
  console.log("output: " + PNG_DIR);
  console.log("size: " + dirSizeMB(PNG_DIR).toFixed(2) + " MB");
  if (failed.length > 0) {
    console.log("failed list:");
    for (const f of failed) console.log("  " + f);
  }
  process.exit(failed.length > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error("FATAL: " + e.message.slice(0, 300));
  process.exit(1);
});
