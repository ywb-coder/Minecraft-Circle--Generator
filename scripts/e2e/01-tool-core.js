const { chromium } = require("playwright");
const { BASE, check, newPage, open, shot, setSlider, errors } = require("./helpers");

module.exports = async function main() {
  const browser = await chromium.launch();
  const { page } = await newPage(browser, { width: 1440, height: 900 });

  const errBase = () => errors.length;
  const blockCount = async () => {
    const t = await page
      .locator("p.font-terminal.text-3xl")
      .first()
      .textContent()
      .catch(() => "");
    return t ? parseInt(t) : -1;
  };

  // 1. 默认状态
  await open(page, "/");
  const grid = page.locator('[aria-label="Blueprint"]').first();
  const cells = await grid.locator(".grid > div").count();
  const filled = await grid
    .locator(".grid > div")
    .evaluateAll((els) => els.filter((e) => (e.style.background || "").startsWith("#") || (e.style.background || "").startsWith("rgb")).length);
  const gb = await grid.boundingBox();
  check("01 默认圆25:625格", cells === 625, "cells=" + cells);
  check("01 默认圆25:68块", filled === 68, "filled=" + filled);
  check("01 默认网格宽度≥400", !!gb && gb.width >= 400, "w=" + Math.round(gb?.width || 0));
  await shot(page, "01-default");

  // 2. 7 个形状按钮逐一
  const shapes = ["Circle", "Oval", "Sphere", "Dome", "Arc", "Torus", "Ellipsoid"];
  for (const s of shapes) {
    const e0 = errBase();
    await page.getByRole("button", { name: s, exact: true }).first().click();
    await page.waitForTimeout(500);
    const n = await blockCount();
    check(`01 形状按钮 ${s}:方块数>0`, n > 0, "blocks=" + n);
    check(`01 形状按钮 ${s}:无报错`, errBase() === e0);
    await shot(page, "01-shape-" + s.toLowerCase());
  }

  // 3. 三样式精确方块数(圆 25:outline 68 / filled 477 / chart 455)
  await page.getByRole("button", { name: "Circle", exact: true }).first().click();
  await page.waitForTimeout(300);
  for (const [style, expected] of [["Filled", 477], ["Chart", 455], ["Outline", 68]]) {
    await page.getByRole("button", { name: style, exact: true }).first().click();
    await page.waitForTimeout(400);
    const n = await blockCount();
    check(`01 样式 ${style}:方块数=${expected}`, n === expected, "got=" + n);
  }

  // 4. 厚度递增
  const thickness = page.locator('label:has-text("Outline thickness") input[type="range"]').first();
  const counts = [];
  for (const v of [1, 2, 3, 4]) {
    await setSlider(page, thickness, v);
    await page.waitForTimeout(300);
    counts.push(await blockCount());
  }
  check("01 厚度1-4方块数递增", counts[0] < counts[1] && counts[1] < counts[2] && counts[2] < counts[3], counts.join(">"));
  await setSlider(page, thickness, 1);
  await page.waitForTimeout(300);
  await shot(page, "01-thickness");

  // 5. 内圆挖空(墙环计数介于 outline 与 filled 之间)
  const inner = page.locator('label:has-text("Inner cutout") input[type="range"]').first();
  const c0 = await blockCount();
  await setSlider(page, inner, 11);
  await page.waitForTimeout(300);
  const c1 = await blockCount();
  check("01 内圆挖空生效(68<块数<477)", c1 > 68 && c1 < 477, `${c0}->${c1}`);

  // 6. 每个滑杆逐一测(circle)
  const dInput = page.locator('input[type="number"]').first();
  const dSlider = page.locator('input[type="range"]').first();
  for (const v of [128, 256, 15]) {
    await setSlider(page, dSlider, v);
    await page.waitForTimeout(300);
    const shown = await dInput.inputValue();
    check(`01 直径滑杆→${v}`, shown === String(v), "shown=" + shown);
  }

  // 7. Oval 宽/高滑杆
  await page.getByRole("button", { name: "Oval", exact: true }).first().click();
  await page.waitForTimeout(400);
  const ovalSliders = page.locator('input[type="range"]');
  for (let i = 0; i < Math.min(2, await ovalSliders.count()); i++) {
    await setSlider(page, ovalSliders.nth(i), Number(await ovalSliders.nth(i).getAttribute("max")));
    await page.waitForTimeout(300);
    check(`01 Oval 滑杆${i + 1}:方块数>0`, (await blockCount()) > 0);
  }

  // 8. Ellipsoid 宽/高/深
  await page.getByRole("button", { name: "Ellipsoid", exact: true }).first().click();
  await page.waitForTimeout(400);
  const ellSliders = page.locator('input[type="range"]');
  for (let i = 0; i < Math.min(3, await ellSliders.count()); i++) {
    await setSlider(page, ellSliders.nth(i), Math.round(Number(await ellSliders.nth(i).getAttribute("max")) / 2));
    await page.waitForTimeout(300);
    check(`01 Ellipsoid 滑杆${i + 1}:方块数>0`, (await blockCount()) > 0);
  }

  // 9. Torus 直径/管厚
  await page.getByRole("button", { name: "Torus", exact: true }).first().click();
  await page.waitForTimeout(400);
  const torSliders = page.locator('input[type="range"]');
  for (let i = 0; i < Math.min(2, await torSliders.count()); i++) {
    await setSlider(page, torSliders.nth(i), Math.round(Number(await torSliders.nth(i).getAttribute("max")) / 2));
    await page.waitForTimeout(300);
    check(`01 Torus 滑杆${i + 1}:方块数>0`, (await blockCount()) > 0);
  }

  // 10. Arc 直径/起始角 + span 按钮
  await page.getByRole("button", { name: "Arc", exact: true }).first().click();
  await page.waitForTimeout(400);
  const arcSliders = page.locator('input[type="range"]');
  for (let i = 0; i < Math.min(2, await arcSliders.count()); i++) {
    await setSlider(page, arcSliders.nth(i), Math.round(Number(await arcSliders.nth(i).getAttribute("max")) / 2));
    await page.waitForTimeout(300);
    check(`01 Arc 滑杆${i + 1}:方块数>0`, (await blockCount()) > 0);
  }
  for (const span of ["45", "90", "135", "180", "270"]) {
    await page.locator(`button:has-text("${span}°")`).first().click();
    await page.waitForTimeout(250);
    check(`01 Arc span ${span}°:方块数>0`, (await blockCount()) > 0);
  }

  // 11. Sphere 层滑杆
  await page.getByRole("button", { name: "Sphere", exact: true }).first().click();
  await page.waitForTimeout(400);
  const layerSlider = page.locator('label:has-text("Layer") input[type="range"]').first();
  check("01 Sphere 层滑杆存在", (await layerSlider.count()) > 0);
  const l0 = await layerSlider.evaluate((el) => el.value);
  await setSlider(page, layerSlider, Math.min(6, Number(await layerSlider.getAttribute("max"))));
  await page.waitForTimeout(300);
  const l1 = await layerSlider.evaluate((el) => el.value);
  check("01 层滑杆可拖动", l0 !== l1, `${l0}->${l1}`);
  await shot(page, "01-sphere-layers");

  // 12. 预设按钮
  for (const p of ["16", "32", "64", "128", "256"]) {
    await page.getByRole("button", { name: p, exact: true }).first().click();
    await page.waitForTimeout(250);
    const shown = await dInput.inputValue();
    check(`01 预设 ${p} 生效`, shown === p, "shown=" + shown);
  }

  // 13. 方块调色板换色(先复位直径到 25 保证 div 模式)
  await setSlider(page, page.locator('input[type="range"]').first(), 25);
  await page.waitForTimeout(300);
  await page.getByRole("button", { name: "Gold Block" }).first().click();
  await page.waitForTimeout(400);
  const goldFilled = await grid
    .locator(".grid > div")
    .evaluateAll((els) => els.filter((e) => (e.style.background || "").includes("248, 214, 42") || (e.style.background || "").includes("#f8d62a")).length);
  check("01 调色板换 Gold 生效", goldFilled > 0, "goldCells=" + goldFilled);
  await shot(page, "01-gold-block");

  // 14. SVG 模式(大尺寸):坐标 + 每行块数标注渲染(回归:曾在大尺寸下被静默忽略)
  const eSvg = errBase();
  await page.getByRole("button", { name: "Circle", exact: true }).first().click();
  await page.waitForTimeout(300);
  await setSlider(page, page.locator('input[type="range"]').first(), 101);
  await page.waitForTimeout(400);
  await page.getByRole("button", { name: "Show coordinates", exact: true }).click();
  await page.getByRole("button", { name: "Row counts", exact: true }).click();
  await page.waitForTimeout(400);
  const svgTexts = await page.locator('[aria-label="Blueprint"] svg text').count();
  check("01 svg-mode 坐标+行数标注渲染", svgTexts >= 202, "texts=" + svgTexts);
  check("01 svg-mode 无报错", errBase() === eSvg);
  await shot(page, "01-svg-coords");

  await browser.close();
};
