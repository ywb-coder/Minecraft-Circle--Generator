const { chromium } = require("playwright");

const BASE = process.env.BASE_URL || "http://127.0.0.1:8899";
const SCREENSHOT_DIR = "scripts/e2e/screenshots";

const results = [];
const errors = [];

function check(name, ok, extra = "") {
  results.push({ name, ok, extra });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${extra ? "  | " + extra : ""}`);
}

async function newPage(browser, viewport) {
  const context = await browser.newContext({ viewport });
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  const page = await context.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") {
      const t = m.text();
      if (t.includes("Failed to load resource")) return;
      errors.push("[console.error] " + t.slice(0, 250));
    }
  });
  page.on("pageerror", (e) => errors.push("[pageerror] " + e.message.slice(0, 300)));
  page.on("response", (r) => {
    if (r.status() >= 400) {
      const u = r.url();
      if (u.includes("_rsc") || u.includes("__next.") || u.endsWith(".txt")) return;
      if (r.status() === 404 && u.includes("this-page-does-not-exist")) return;
      errors.push("[http " + r.status() + "] " + u);
    }
  });
  return { context, page };
}

async function open(page, path = "/", wait = 1200) {
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(wait);
}

async function shot(page, name) {
  try {
    const fs = require("fs");
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
    await page.screenshot({ path: `${SCREENSHOT_DIR}/${name}.png` });
  } catch (e) {
    console.log("  [shot failed] " + e.message.slice(0, 80));
  }
}

async function measureDrag(page, locator, steps = 10) {
  const box = await locator.boundingBox();
  if (!box) return null;
  const y = box.y + box.height / 2;
  await page.mouse.move(box.x + 2, y);
  await page.mouse.down();
  const times = [];
  for (let i = 1; i <= steps; i++) {
    const nx = box.x + (box.width * i) / steps;
    const t0 = Date.now();
    await page.mouse.move(nx, y);
    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => r())));
    times.push(Date.now() - t0);
  }
  await page.mouse.up();
  times.sort((a, b) => a - b);
  return {
    avg: Math.round(times.reduce((s, v) => s + v, 0) / times.length),
    max: times[times.length - 1],
  };
}

async function setSlider(page, locator, value) {
  await locator.evaluate((el, v) => {
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
    setter.call(el, String(v));
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, value);
}

function summary() {
  const fails = results.filter((r) => !r.ok);
  console.log("\n===== SUMMARY =====");
  console.log(`total=${results.length} pass=${results.length - fails.length} fail=${fails.length}`);
  const uniq = [...new Set(errors)];
  if (uniq.length) {
    console.log("errors:");
    uniq.slice(0, 15).forEach((e) => console.log("  " + e));
  }
  return fails.length ? 1 : uniq.length ? 1 : 0;
}

module.exports = { BASE, check, newPage, open, shot, measureDrag, setSlider, summary, errors };
