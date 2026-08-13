const { chromium } = require("playwright");
const { BASE, check, newPage, open, shot, measureDrag, errors } = require("./helpers");

const errAt = () => errors.length;

async function dragCanvas(page, canvas, steps = 10) {
  const box = await canvas.boundingBox();
  if (!box) return null;
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  const times = [];
  for (let i = 1; i <= steps; i++) {
    const t0 = Date.now();
    await page.mouse.move(cx + i * 10, cy + (i % 2 === 0 ? 6 : -6));
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

module.exports = async function main() {
  const browser = await chromium.launch();
  try {
    const { page } = await newPage(browser, { width: 1440, height: 900 });
    const e0 = errAt();

    const cases = [
      ["circle512", "/?t=circle&d=512", 60, 120],
      ["circle300-filled", "/?t=circle&d=300&s=filled", 400, 800],
      ["sphere200", "/?t=sphere&d=200", 60, 120],
      ["torus256", "/?t=torus&d=256&tb=24", 400, 800],
      ["ellipsoid150", "/?t=ellipsoid&w=150&h=120&dp=90", 60, 120],
    ];
    for (const [name, url, avgMax, maxMax] of cases) {
      await open(page, url, 1600);
      const slider = page.locator('input[type="range"]').first();
      await slider.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      const r = await measureDrag(page, slider, 10);
      check(`04 drag ${name}`, !!r && r.avg < avgMax && r.max < maxMax, JSON.stringify(r));
      await shot(page, `04-perf-${name}`);
    }

    await open(page, "/?t=circle&d=100", 1400);
    await page.getByRole("button", { name: "Row counts", exact: true }).click();
    await page.waitForTimeout(300);
    const r2 = await measureDrag(page, page.locator('input[type="range"]').first(), 10);
    check("04 drag with row counts", !!r2 && r2.avg < 60, JSON.stringify(r2));

    await open(page, "/?t=sphere&d=100", 1400);
    await page.getByRole("button", { name: "Preview", exact: true }).click();
    await page.waitForTimeout(500);
    const canvas = page.locator('canvas[aria-label*="Isometric"]');
    const r3 = await dragCanvas(page, canvas, 10);
    check("04 3d rotate", !!r3 && r3.avg < 60, JSON.stringify(r3));

    await page.getByRole("button", { name: "Blueprint", exact: true }).click();
    await page.waitForTimeout(200);
    await page.getByRole("button", { name: "Fullscreen", exact: true }).click();
    await page.waitForTimeout(400);
    const r4 = await measureDrag(page, page.locator('input[type="range"]').first(), 10);
    check("04 fullscreen drag", !!r4 && r4.avg < 60, JSON.stringify(r4));
    await page.getByRole("button", { name: "Fullscreen ✕", exact: true }).click();
    await page.waitForTimeout(300);
    check("04 fullscreen exited", (await page.locator(".fixed.inset-0.z-50").count()) === 0);

    const lp = await newPage(browser, { width: 1440, height: 900 });
    const t0 = Date.now();
    await lp.page.goto(BASE + "/", { waitUntil: "networkidle" });
    const loadMs = Date.now() - t0;
    check("04 first load", loadMs < 8000, `${loadMs}ms`);

    check("04 no new errors", errAt() === e0);
  } finally {
    await browser.close();
  }
};
