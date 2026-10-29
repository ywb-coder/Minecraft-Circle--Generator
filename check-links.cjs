const fs = require("node:fs");
const path = require("node:path");
const OUT = "out";
const sitemap = fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf8");
const blocks = sitemap.match(/<url>[\s\S]*?<\/url>/g) || [];
const locs = []; let altCount = 0;
const missingLocs = []; const missingAlts = [];
function exists(urlPath) {
  const rel = urlPath.replace(/^\//, "");
  if (rel === "") return fs.existsSync(path.join(OUT, "index.html"));
  if (fs.existsSync(path.join(OUT, rel, "index.html"))) return true;
  return fs.existsSync(path.join(OUT, rel));
}
for (const b of blocks) {
  const loc = b.match(/<loc>([^<]*)<\/loc>/)?.[1];
  if (!loc) continue;
  locs.push(loc);
  const p = new URL(loc).pathname;
  if (!exists(p)) missingLocs.push(loc);
  for (const m of b.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)) {
    altCount++;
    const ap = new URL(m[2]).pathname;
    if (!exists(ap)) missingAlts.push(m[1] + " -> " + m[2]);
  }
}
const htmlFiles = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) { if (!e.name.startsWith("_next")) walk(full); }
    else if (e.name === "index.html") htmlFiles.push(full);
  }
})(OUT);
let htmlAlts = 0; const missingHtmlAlts = [];
for (const f of htmlFiles) {
  const s = fs.readFileSync(f, "utf8");
  for (const m of s.matchAll(/<link rel="alternate" hrefLang="[^"]*" href="([^"]+)"/g)) {
    htmlAlts++;
    const ap = new URL(m[1]).pathname;
    if (!exists(ap)) missingHtmlAlts.push(path.relative(OUT, f) + " -> " + m[1]);
  }
}
console.log("sitemap <loc>: " + locs.length + "  hreflang: " + altCount);
console.log("HTML 页内 hreflang: " + htmlAlts + " (扫描 " + htmlFiles.length + " 个页面)");
console.log("\n404 的 sitemap loc: " + missingLocs.length);
missingLocs.slice(0,8).forEach(x=>console.log("   "+x));
console.log("404 的 sitemap hreflang: " + missingAlts.length);
missingAlts.slice(0,8).forEach(x=>console.log("   "+x));
console.log("404 的 HTML hreflang: " + missingHtmlAlts.length);
missingHtmlAlts.slice(0,8).forEach(x=>console.log("   "+x));
