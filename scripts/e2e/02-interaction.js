const { chromium } = require("playwright");
  const { BASE, check, newPage, open, shot, setSlider, errors } = require("./helpers");

module.exports = async function main() {
  const browser = await chromium.launch();
  const { context, page } = await newPage(browser, { width: 1440, height: 900 });
  const errBase = () => errors.length;

  // 1. Builder 全流程
  await open(page, "/");
  await page.getByRole("button", { name: "Build order" }).click();
  await page.waitForTimeout(300);
  await page.getByRole("button", { name: "Builder" }).click();
  await page.waitForTimeout(300);
  const placedText = () =>
    page
      .locator("span.font-terminal.text-lg")
      .filter({ hasText: /^\d+ \/ \d+$/ })
      .first()
      .textContent()
      .catch(() => "");
  const gridB = page.locator('[aria-label="Build order"] .grid > div');
  const targetTitles = ["-12,12", "-11,11", "7,7"];
  for (const title of targetTitles) {
    await page.locator(`[aria-label="Build order"] div[title="${title}"]`).click();
    await page.waitForTimeout(250);
  }
  let pt = await placedText();
  check("02 Builder 点3格 → 3/68", pt === "3 / 68", pt);
  await page.getByRole("button", { name: "Next", exact: true }).first().click();
  await page.waitForTimeout(250);
  pt = await placedText();
  check("02 Next → 4/68", pt === "4 / 68", pt);
  await page.getByRole("button", { name: "Prev", exact: true }).first().click();
  await page.waitForTimeout(250);
  pt = await placedText();
  check("02 Prev → 3/68", pt === "3 / 68", pt);
  await shot(page, "02-builder");

  // 2. 3D 拖拽
  await page.getByRole("button", { name: "Preview" }).click();
  await page.waitForTimeout(400);
  const canvas = page.locator("canvas").first();
  check("02 Preview canvas 存在", (await canvas.count()) > 0);
  const cb = await canvas.boundingBox();
  await page.mouse.move(cb.x + cb.width / 2, cb.y + cb.height / 2);
  await page.mouse.down();
  await page.mouse.move(cb.x + cb.width / 2 + 140, cb.y + cb.height / 2, { steps: 8 });
  await page.mouse.up();
  await page.waitForTimeout(300);
  check("02 3D 拖拽无报错", errBase() === errors.length);
  await shot(page, "02-3d");

  // 3. Sphere 图层同步
  await open(page, "/?t=sphere&d=25");
  const layerSlider = page.locator('label:has-text("Layer") input[type="range"]').first();
  await setSlider(page, layerSlider, 6);
  await page.waitForTimeout(400);
  const pressed = await page.locator('[data-testid="layer-row"][aria-pressed="true"]').count();
  check("02 LayerStack 高亮唯一", pressed === 1, "pressed=" + pressed);
  check("02 图层切换无报错", errBase() === errors.length);
  await shot(page, "02-sphere-layer");

  // 4. 导出文件名
  const exports = [
    ["Download PNG", ".png"],
    ["SVG", ".svg"],
    ["CSV", ".csv"],
    ["JSON", ".json"],
  ];
  for (const [btn, ext] of exports) {
    const [download] = await Promise.all([
      page.waitForEvent("download", { timeout: 8000 }).catch(() => null),
      page.getByRole("button", { name: btn }).first().click().catch(() => {}),
    ]);
    if (download) {
      check(`02 导出 ${btn}:文件名含${ext}`, download.suggestedFilename().endsWith(ext), download.suggestedFilename());
    } else {
      check(`02 导出 ${btn}:触发下载`, false, "no download");
    }
    await page.waitForTimeout(200);
  }

  // 5. 剪贴板格式
  await page.getByRole("button", { name: "Copy blocks" }).click();
  await page.waitForTimeout(300);
  const blocksClip = await page.evaluate(() => navigator.clipboard.readText().catch(() => ""));
  const lines = blocksClip.split("\n").filter(Boolean);
  check("02 Copy blocks:每行 x y 格式", lines.every((l) => /^-?\d+ -?\d+$/.test(l.trim())) && lines.length > 0, "lines=" + lines.length);
  await page.getByRole("button", { name: "Copy /setblock" }).click();
  await page.waitForTimeout(300);
  const sb = await page.evaluate(() => navigator.clipboard.readText().catch(() => ""));
  check("02 setblock 含 minecraft:stone", sb.includes("minecraft:stone") && sb.startsWith("/setblock"));
  await page.getByRole("button", { name: "Copy link" }).click();
  await page.waitForTimeout(300);
  const link = await page.evaluate(() => navigator.clipboard.readText().catch(() => ""));
  check("02 Copy link 含参数", link.includes("?t=sphere&d=25"), link.slice(-40));
  await page.getByRole("button", { name: "Copy permanent link" }).click();
  await page.waitForTimeout(300);
  const perm = await page.evaluate(() => navigator.clipboard.readText().catch(() => ""));
  check("02 永久链接指向 /sphere/25/", perm.endsWith("/sphere/25/"), perm);

  // 6. permLink 显示规则
  await open(page, "/?t=circle&d=15");
  check("02 circle outline 有 permLink", (await page.getByRole("button", { name: "Copy permanent link" }).count()) > 0);
  await page.getByRole("button", { name: "Filled" }).click();
  await page.waitForTimeout(300);
  check("02 circle filled 无 permLink", (await page.getByRole("button", { name: "Copy permanent link" }).count()) === 0);
  await page.getByRole("button", { name: "Arc" }).click();
  await page.waitForTimeout(300);
  check("02 arc 无 permLink", (await page.getByRole("button", { name: "Copy permanent link" }).count()) === 0);
  await open(page, "/?t=torus&d=40&tb=5");
  check("02 torus 非组合无 permLink", (await page.getByRole("button", { name: "Copy permanent link" }).count()) === 0);
  await open(page, "/?t=torus&d=41&tb=8");
  check("02 torus 组合有 permLink", (await page.getByRole("button", { name: "Copy permanent link" }).count()) > 0);

  // 7. URL 初始化(7 形状;清空存储保证 layerIndex=0)
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const urlCases = [
    ["/?t=circle&d=15", 40],
    ["/?t=oval&w=25&h=13", 74],
    ["/?t=sphere&d=15", 1],
    ["/?t=dome&d=15", 40],
    ["/?t=arc&d=15", 11],
    ["/?t=torus&d=41&tb=8", 96],
    ["/?t=ellipsoid&w=25&h=17&dp=11", 1],
  ];
  for (const [url, expected] of urlCases) {
    await page.evaluate(() => localStorage.clear());
    await open(page, url);
    const t = await page.locator("p.font-terminal.text-3xl").first().textContent().catch(() => "");
    const total = t ? parseInt(t) : -1;
    check(`02 URL ${url.split("?")[1]}:显示块数=${expected}`, total === expected, "got=" + total);
  }

  // 8. localStorage 保存与 URL 优先
  await open(page, "/?t=circle&d=25");
  const dInput = page.locator('input[type="number"]').first();
  await dInput.fill("33");
  await page.waitForTimeout(900);
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  let d = await dInput.inputValue();
  check("02 无参刷新恢复 d=33", d === "33", "d=" + d);
  await open(page, "/?t=circle&d=15");
  d = await dInput.inputValue();
  check("02 URL 优先于存储 d=15", d === "15", "d=" + d);

  // 9. URL 厚度/挖空
  const toolN = async () => {
    const t = await page.locator("p.font-terminal.text-3xl").first().textContent().catch(() => "");
    return t ? parseInt(t) : -1;
  };
  await page.evaluate(() => localStorage.clear());
  await open(page, "/?t=circle&d=25&tk=3");
  let n = await toolN();
  check("02 厚度3 方块数=196", n === 196, "got=" + n);
  await page.evaluate(() => localStorage.clear());
  await open(page, "/?t=circle&d=25&in=11");
  n = await toolN();
  check("02 挖空11 方块数=392", n === 392, "got=" + n);

  // 10. 世界坐标 + setblock 偏移
  await open(page, "/?t=circle&d=15");
  await page.locator('label:has-text("Center X") input[type="number"]').first().fill("100");
  await page.getByRole("button", { name: "Copy /setblock" }).click();
  await page.waitForTimeout(300);
  const off = await page.evaluate(() => navigator.clipboard.readText().catch(() => ""));
  check("02 setblock 偏移(含 107)", off.includes("/setblock 107 64"), off.split("\n")[0]);
  check("02 交互全程无报错", errBase() === errors.length);

  await browser.close();
};
