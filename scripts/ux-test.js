const { chromium } = require("playwright");

const BASE = "http://127.0.0.1:8899";
const results = [];
const errors = [];

function check(name, ok, extra = "") {
  results.push({ name, ok, extra });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${extra ? "  | " + extra : ""}`);
}

async function measureDrag(page, locator, steps) {
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

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  const page = await context.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") errors.push("[console.error] " + m.text().slice(0, 200));
  });
  page.on("pageerror", (e) => errors.push("[pageerror] " + e.message.slice(0, 250)));
  page.on("response", (r) => {
    if (r.status() >= 400) errors.push("[http " + r.status() + "] " + r.url());
  });

  // ========== 1. 首页加载与默认状态 ==========
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  const grid = page.locator('[aria-label="Blueprint"]').first();
  let cells = await grid.locator(".grid > div").count();
  let filled = await grid.locator(".grid > div").evaluateAll((els) => els.filter((e) => (e.style.background || "").startsWith("#") || (e.style.background || "").startsWith("rgb")).length);
  const gb1 = await grid.boundingBox();
  check("默认圆 25 蓝图 625 格", cells === 625, "cells=" + cells);
  check("默认圆 25 填充 68 块", filled === 68, "filled=" + filled);
  check("默认网格宽度合理(>400px)", !!gb1 && gb1.width > 400, "w=" + Math.round(gb1?.width || 0));
  check("无控制台错误", errors.length === 0);

  // ========== 2. 7 形状逐个切换 ==========
  const shapes = ["Circle", "Oval", "Sphere", "Dome", "Arc", "Torus", "Ellipsoid"];
  for (const s of shapes) {
    await page.getByRole("button", { name: s, exact: true }).first().click();
    await page.waitForTimeout(500);
    const countText = await page.locator("p").filter({ hasText: /^\d+ blocks$/ }).first().textContent().catch(() => "");
    check(`形状 ${s} 方块数>0`, !!countText && parseInt(countText) > 0, countText || "none");
  }

  // ========== 3. 椭圆 25×13 + 行计数(用户报告场景) ==========
  await page.goto(BASE + "/?t=oval&w=25&h=13", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.getByRole("button", { name: "Row counts" }).click();
  await page.waitForTimeout(500);
  const g2 = page.locator('[aria-label="Blueprint"]').first();
  cells = await g2.locator(".grid > div").count();
  filled = await g2.locator(".grid > div").evaluateAll((els) => els.filter((e) => !(e.style.background || "").includes("transparent") && e.style.background).length);
  const nums = await page.locator('[aria-label="Blueprint"] .ml-1 span').count();
  const gbox = await g2.boundingBox();
  check("椭圆25×13+行计数:网格可见", cells === 325 && filled > 0 && gbox.width > 400, `cells=${cells} filled=${filled} w=${Math.round(gbox?.width || 0)}`);
  check("行计数=13 个数字", nums === 13, "nums=" + nums);
  check("椭圆场景无报错", errors.length === 0);

  // ========== 4. 滑动性能(打开行计数后) ==========
  const slider = page.locator('input[type="range"]').first();
  const drag = await measureDrag(page, slider, 12);
  check("椭圆滑杆性能 avg<50ms", !!drag && drag.avg < 50, JSON.stringify(drag));

  // ========== 5. 大尺寸性能 ==========
  const perfCases = [
    ["circle 512 outline", "/?t=circle&d=512"],
    ["circle 300 filled", "/?t=circle&d=300&s=filled"],
    ["sphere 200", "/?t=sphere&d=200"],
    ["torus 256x24", "/?t=torus&d=256&tb=24"],
    ["ellipsoid 150x120x90", "/?t=ellipsoid&w=150&h=120&dp=90"],
  ];
  for (const [name, url] of perfCases) {
    await page.goto(BASE + url, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    const sl = page.locator('input[type="range"]').first();
    const c = await measureDrag(page, sl, 10);
    check(`性能 ${name}`, !!c && c.max < 90, JSON.stringify(c));
    check(`${name} 无报错`, errors.length === 0);
  }

  // ========== 6. Tab 与 3D 旋转 ==========
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.getByRole("button", { name: "Preview" }).click();
  await page.waitForTimeout(500);
  check("Preview 有 canvas", (await page.locator("canvas").count()) > 0);
  const canvas = page.locator("canvas").first();
  const cb = await canvas.boundingBox();
  await page.mouse.move(cb.x + cb.width / 2, cb.y + cb.height / 2);
  await page.mouse.down();
  await page.mouse.move(cb.x + cb.width / 2 + 160, cb.y + cb.height / 2, { steps: 8 });
  await page.mouse.up();
  await page.waitForTimeout(300);
  check("3D 拖拽旋转无报错", errors.length === 0);
  await page.getByRole("button", { name: "Build order" }).click();
  await page.waitForTimeout(300);
  await page.getByRole("button", { name: "Builder" }).click();
  await page.waitForTimeout(300);
  const firstCell = page.locator('[aria-label="Build order"] .grid > div').first();
  await firstCell.click();
  await page.waitForTimeout(200);
  const placed = await page.locator("p").filter({ hasText: /^\d+ \/ \d+$/ }).first().textContent().catch(() => "");
  check("Builder 标记生效", !!placed && parseInt(placed) > 0, placed || "none");
  await page.getByRole("button", { name: "Next" }).click();
  await page.waitForTimeout(200);

  // ========== 7. 导出按钮 ==========
  const errs0 = errors.length;
  for (const b of ["Download PNG", "SVG", "CSV", "JSON", "Copy blocks", "Copy link", "Copy permanent link", "Copy /setblock", "All layers"]) {
    const btn = page.getByRole("button", { name: b });
    if (await btn.count()) {
      await btn.first().click();
      await page.waitForTimeout(250);
    }
  }
  check("导出按钮点击无报错", errors.length === errs0, "new=" + (errors.length - errs0));

  // ========== 8. 世界坐标 + setblock 偏移 ==========
  await page.goto(BASE + "/?t=circle&d=15", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  const coordsLabel = page.locator('label:has-text("Center X") input[type="number"]').first();
  await coordsLabel.fill("100");
  await page.getByRole("button", { name: "Copy /setblock" }).click();
  await page.waitForTimeout(400);
  const clip = await page.evaluate(() => navigator.clipboard.readText().catch(() => ""));
  check("setblock 含偏移坐标(107 64)", !!clip && clip.includes("/setblock 107 64"), (clip.split("\n")[0] || "").slice(0, 60));
  check("setblock 含方块名", !!clip && clip.includes("minecraft:stone"));

  // ========== 9. 全屏(检查覆盖层自身滚动) ==========
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.getByRole("button", { name: "Fullscreen" }).first().click();
  await page.waitForTimeout(500);
  const fs = await page.evaluate(() => {
    const el = document.body.querySelector(".fixed.inset-0.z-50");
    if (!el) return { present: false };
    return { present: true, scrollH: el.scrollHeight, clientH: el.clientHeight, grid: !!el.querySelector('[aria-label="Blueprint"]') };
  });
  check("全屏 portal 挂载", fs.present);
  check("全屏覆盖层无滚动", fs.present && fs.scrollH <= fs.clientH + 2, `scrollH=${fs.scrollH} clientH=${fs.clientH}`);
  check("全屏内工具可见", fs.present && fs.grid);
  await page.getByRole("button", { name: /Fullscreen ✕/ }).click();
  await page.waitForTimeout(300);
  check("全屏可退出", (await page.evaluate(() => !document.body.querySelector(".fixed.inset-0.z-50"))) === true);

  // ========== 10. 移动端三 Tab ==========
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);
  const mobileControls = await page.locator("button:has-text('Generator'):visible").count();
  const mobileExport = await page.locator("button:has-text('Download PNG'):visible").count();
  check("移动端 tab 条存在(Generator/Download PNG)", mobileControls > 0 && mobileExport > 0, `c=${mobileControls} e=${mobileExport}`);
  await page.locator("button:has-text('Preview'):visible").first().click();
  await page.waitForTimeout(400);
  check("移动端 Preview 页显示蓝图", (await page.locator('[aria-label="Blueprint"]:visible').count()) > 0);
  await page.locator("button:has-text('Preview'):visible").last().click();
  await page.waitForTimeout(400);
  check("移动端内层 Preview 切出 3D canvas", (await page.locator("canvas:visible").count()) > 0);
  await page.locator("button:has-text('Download PNG'):visible").first().click();
  await page.waitForTimeout(400);
  check("移动端 Export 页有导出按钮", (await page.locator("button:has-text('Copy /setblock'):visible").count()) > 0);
  check("移动端无报错", errors.length === 0);

  // ========== 11. 中文页 ==========
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE + "/zh/?t=circle&d=25", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  const zhGrid = await page.locator('[aria-label="蓝图"]').count();
  check("中文页工具渲染", zhGrid > 0, "zhGrid=" + zhGrid);
  check("中文页无报错", errors.length === 0);

  // ========== 汇总 ==========
  const fails = results.filter((r) => !r.ok);
  console.log("\n===== SUMMARY =====");
  console.log(`total=${results.length} pass=${results.length - fails.length} fail=${fails.length}`);
  if (errors.length) {
    console.log("console errors:");
    [...new Set(errors)].slice(0, 12).forEach((e) => console.log("  " + e));
  }
  await browser.close();
  process.exit(fails.length ? 1 : 0);
})().catch((e) => {
  console.error("FATAL", e);
  process.exit(1);
});
