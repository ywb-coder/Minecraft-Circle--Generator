/**
 * 06-serp-check.js — Real-browser search ranking checker (standalone, NOT part of e2e suite)
 *
 * Simulates a human search: real Chromium, realistic UA, typed keyboard query, small delays.
 * Checks our site's position for a keyword list on Google (primary) with Bing fallback.
 *
 * Usage:  node scripts/e2e/06-serp-check.js
 * Output: docs/gsc/serp-YYYYMMDD.csv            (one row per keyword)
 *         docs/gsc/serp-detail-YYYYMMDD.csv     (top-20 URL list per keyword)
 *         scripts/e2e/screenshots/serp-*.png    (SERP screenshots)
 *
 * Caveat: Google may show a captcha to headless/datacenter traffic; the script then
 * falls back to Bing and marks the row "engine=bing (google blocked)". For 100%
 * ground truth, eyeball Google in your own browser — this tool gives a repeatable
 * approximation every week.
 */

const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const OUR_DOMAIN = "pixelcircle.online";

const KEYWORDS = [
  { q: "minecraft circle generator", locale: "en" },
  { q: "minecraft circle chart", locale: "en" },
  { q: "minecraft circle generator 101", locale: "en" },
  { q: "pixel circle minecraft", locale: "en" },
  { q: "我的世界圆形生成器", locale: "zh" },
  { q: "minecraft kreis generator", locale: "de" },
];

const GSC_DIR = path.resolve(__dirname, "..", "..", "docs", "gsc");
const SHOT_DIR = path.resolve(__dirname, "screenshots");

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const rnd = (min, max) => Math.floor(min + Math.random() * (max - min));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function humanDelay(page, min = 600, max = 1800) {
  await sleep(rnd(min, max));
}

async function tryConsent(page) {
  // Google consent page: click "Accept all" like a human would
  try {
    if (page.url().includes("consent.google")) {
      const accept = page.locator("#L2AGLb, button[aria-label*='Accept'], button:has-text('Accept all')").first();
      if (await accept.count()) {
        await accept.click({ timeout: 3000 }).catch(() => {});
        await sleep(1500);
      }
    }
  } catch {
    /* ignore */
  }
}

function looksBlocked(page, url) {
  const u = url.toLowerCase();
  if (u.includes("sorry/index") || u.includes("/sorry?")) return true;
  if (u.includes("consent.google")) return false; // handled separately
  return false;
}

async function blockedText(page) {
  const body = (await page.locator("body").innerText().catch(() => "")) || "";
  if (/unusual traffic|our systems have detected|are you a robot/i.test(body)) return "captcha";
  if (/before you continue|choose your privacy|i agree|accept all/i.test(body)) return "consent";
  return null;
}

async function searchGoogle(page, q) {
  const url = `https://www.google.com/search?q=${encodeURIComponent(q)}&hl=en&gl=us&pws=0&num=20`;
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 }).catch(() => {});
  await humanDelay(page, 1200, 2200);
  await tryConsent(page);
  let blocked = looksBlocked(page, page.url());
  const reason = blocked ? "captcha" : await blockedText(page);
  if (reason) blocked = true;
  if (blocked) return { ok: false, blocked: reason || "unknown", results: [] };
  await page.keyboard.press("End");
  await humanDelay(page, 400, 900);
  await page.keyboard.press("Home");
  const results = await page
    .$$eval("a:has(h3)", (els) =>
      els
        .map((a) => ({ href: a.href, title: (a.querySelector("h3") || {}).innerText || "" }))
        .filter((x) => x.href && !/^https?:\/\/(www\.)?google\./.test(x.href) && x.href.startsWith("http"))
        .slice(0, 20)
    )
    .catch(() => []);
  return { ok: results.length > 0, blocked: null, results };
}

async function searchBing(page, q) {
  const url = `https://cn.bing.com/search?q=${encodeURIComponent(q)}&mkt=en-US&count=20`;
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 }).catch(() => {});
  await humanDelay(page, 1200, 2200);
  const body = (await page.locator("body").innerText().catch(() => "")) || "";
  if (/are you a robot|captcha/i.test(body)) return { ok: false, blocked: "captcha", results: [] };
  const results = await page
    .$$eval("li.b_algo h2 a", (els) =>
      els
        .map((a) => ({ href: a.href, title: a.innerText }))
        .filter((x) => x.href && x.href.startsWith("http"))
        .slice(0, 20)
    )
    .catch(() => []);
  return { ok: results.length > 0, blocked: null, results };
}

function fmtDate() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`;
}

async function probePresence(page, q) {
  // site:DOMAIN <keyword> — does the engine associate ANY of our pages with this query?
  // A hit here means we are inside the engine's candidate pool for the keyword
  // (typically << 1000 results), even if not yet on page 1.
  const query = `site:${OUR_DOMAIN} ${q}`;
  let res = await searchGoogle(page, query);
  let engine = "google";
  if (!res.ok) {
    engine = "bing";
    res = await searchBing(page, query);
  }
  if (!res.ok) {
    return { engine: "both", present: null, url: "", title: "", blocked: res.blocked || "empty" };
  }
  const match = res.results.find((r) => r.href.includes(OUR_DOMAIN));
  return {
    engine,
    present: !!match,
    url: match ? match.href : "",
    title: match ? match.title : "",
    blocked: null,
  };
}

async function main() {
  const today = fmtDate();
  fs.mkdirSync(GSC_DIR, { recursive: true });
  fs.mkdirSync(SHOT_DIR, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
    args: ["--disable-blink-features=AutomationControlled"],
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: UA,
    locale: "en-US",
    timezoneId: "America/New_York",
  });
  const page = await context.newPage();

  const rows = [];
  const detailRows = [];
  console.log(`SERP check ${today} — ${KEYWORDS.length} keywords (target: ${OUR_DOMAIN})`);

  for (const { q, locale } of KEYWORDS) {
    let engine = "google";
    let res = await searchGoogle(page, q);
    if (!res.ok) {
      console.log(`  [${q}] google blocked (${res.blocked || "empty"}) -> bing fallback`);
      engine = "bing";
      res = await searchBing(page, q);
      if (!res.ok) {
        const note = `blocked (${res.blocked || "empty"})`;
        console.log(`  [${q}] bing also blocked`);
        rows.push({ date: today, engine: "both", keyword: q, position: "", matched_url: "", collected: 0, note });
        continue;
      }
    }

    const pos = res.results.findIndex((r) => r.href.includes(OUR_DOMAIN));
    const note = res.blocked ? "google blocked (bing data)" : "";
    rows.push({
      date: today,
      engine,
      keyword: q,
      position: pos >= 0 ? pos + 1 : `>${res.results.length}`,
      matched_url: pos >= 0 ? res.results[pos].href : "",
      collected: res.results.length,
      note,
    });
    res.results.forEach((r, i) => {
      detailRows.push({ date: today, engine, keyword: q, pos: i + 1, url: r.href, title: r.title.slice(0, 120) });
    });

    const safe = q.replace(/[^a-z0-9\u4e00-\u9fff]+/gi, "-").slice(0, 40);
    await page.screenshot({ path: path.join(SHOT_DIR, `serp-${engine}-${safe}.png`) }).catch(() => {});
    console.log(
      `  [${q}] engine=${engine} position=${rows[rows.length - 1].position} (${res.results.length} results collected)`
    );
  }

  console.log("\n--- Phase 2: index presence probe (site:DOMAIN <keyword>) ---");
  const probeRows = [];
  for (const { q } of KEYWORDS) {
    const p = await probePresence(page, q);
    const present = p.present === null ? "unknown" : p.present ? "yes" : "no";
    probeRows.push({
      date: today,
      engine: p.engine,
      keyword: q,
      present,
      url: p.url,
      title: p.title.slice(0, 120),
      note: p.blocked ? `engine blocked (${p.blocked})` : "",
    });
    console.log(
      `  [${q}] ${present === "yes" ? "IN candidate pool: " + p.url : present === "no" ? "no association yet" : "engine blocked -> manual check"}
`
        .trim()
    );
  }

  await browser.close();

  const serpCsv = ["date,engine,keyword,position,matched_url,collected,note"].concat(
    rows.map((r) => [r.date, r.engine, `"${r.keyword}"`, r.position, r.matched_url, r.collected, r.note].join(","))
  );
  const detailCsv = ["date,engine,keyword,pos,url,title"].concat(
    detailRows.map((r) => [r.date, r.engine, `"${r.keyword}"`, r.pos, r.url, `"${r.title.replace(/"/g, '""')}"`].join(","))
  );
  const serpFile = path.join(GSC_DIR, `serp-${today}.csv`);
  const detailFile = path.join(GSC_DIR, `serp-detail-${today}.csv`);
  const probeFile = path.join(GSC_DIR, `serp-probe-${today}.csv`);
  fs.writeFileSync(serpFile, "\ufeff" + serpCsv.join("\n"), "utf8");
  fs.writeFileSync(detailFile, "\ufeff" + detailCsv.join("\n"), "utf8");
  fs.writeFileSync(
    probeFile,
    "\ufeff" +
      ["date,engine,keyword,present,url,title,note"].concat(
        probeRows.map((r) =>
          [r.date, r.engine, `"${r.keyword}"`, r.present, r.url, `"${r.title.replace(/"/g, '""')}"`, r.note].join(",")
        )
      ).join("\n"),
    "utf8"
  );

  console.log("\n===== SUMMARY =====");
  rows.forEach((r) =>
    console.log(`  ${r.position.padStart(3)}  ${r.engine.padEnd(5)}  ${r.keyword}${r.note ? "  (" + r.note + ")" : ""}`)
  );
  console.log("--- index presence probe ---");
  probeRows.forEach((r) =>
    console.log(
      `  ${r.present === "yes" ? "YES " : "no  "}  ${r.engine.padEnd(6)}  ${r.keyword}${r.note ? "  (" + r.note + ")" : ""}`
    )
  );
  console.log(`saved: ${serpFile}`);
  console.log(`saved: ${detailFile}`);
  console.log(`saved: ${probeFile}`);
}

main().catch((e) => {
  console.error("FATAL:", e.message.slice(0, 300));
  process.exit(1);
});
