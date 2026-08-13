const { chromium } = require("playwright");
const { check, newPage, open, shot, errors } = require("./helpers");

const errAt = () => errors.length;

module.exports = async function main() {
  const browser = await chromium.launch();
  try {
    const desktop = await newPage(browser, { width: 1440, height: 900 });
    const dpage = desktop.page;
    const e0 = errAt();

    await open(dpage, "/");
    await shot(dpage, "03-desktop-home");

    const h1Font = await dpage
      .locator("h1")
      .first()
      .evaluate((el) => getComputedStyle(el).fontFamily);
    check("03 h1 font pixel", h1Font.includes("Press Start 2P"), h1Font.slice(0, 40));
    const btnShadow = await dpage
      .locator(".mc-btn")
      .first()
      .evaluate((el) => getComputedStyle(el).boxShadow);
    check("03 mc-btn shadow", btnShadow !== "none", btnShadow.slice(0, 40));
    check(
      "03 pixel-corners on grid",
      (await dpage.locator('[aria-label="Blueprint"].pixel-corners').count()) >= 1
    );

    const left = dpage.locator(".lg\\:h-\\[calc\\(100vh-180px\\)\\]");
    const leftInfo = await left.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return {
        h: Math.round(rect.height),
        clientH: el.clientHeight,
        scrollH: el.scrollHeight,
        overflowY: getComputedStyle(el).overflowY,
      };
    });
    check(
      "03 左栏:视口内定高+内部滚动",
      !!leftInfo && leftInfo.h <= 900 - 160 && leftInfo.overflowY === "auto" && leftInfo.clientH < leftInfo.scrollH + 2,
      JSON.stringify(leftInfo)
    );
    await shot(dpage, "03-desktop-sticky");

    const grid = dpage.locator('[aria-label="Blueprint"]');
    const gw = await grid.evaluate((el) => el.scrollWidth);
    const gc = await grid.evaluate((el) => el.clientWidth);
    check("03 preview no hscroll", gw <= gc, `scroll=${gw} client=${gc}`);

    await dpage.getByRole("button", { name: "Fullscreen", exact: true }).click();
    await dpage.waitForTimeout(400);
    const overlay = dpage.locator(".fixed.inset-0.z-50");
    check("03 overlay present", (await overlay.count()) === 1);
    const ovStyle = await overlay.evaluate((el) => ({
      pos: getComputedStyle(el).position,
      z: getComputedStyle(el).zIndex,
    }));
    check("03 overlay fixed z50", ovStyle.pos === "fixed" && ovStyle.z === "50", JSON.stringify(ovStyle));
    const osH = await overlay.evaluate((el) => el.scrollHeight);
    const ocH = await overlay.evaluate((el) => el.clientHeight);
    check("03 overlay no scrollbar", osH <= ocH + 2, `scroll=${osH} client=${ocH}`);
    const fg = overlay.locator('[aria-label="Blueprint"]');
    const fgw = await fg.evaluate((el) => el.scrollWidth);
    const fgc = await fg.evaluate((el) => el.clientWidth);
    check("03 fullscreen right no hscroll", fgw <= fgc, `scroll=${fgw} client=${fgc}`);
    const fsLeft = overlay.locator(".overflow-y-auto");
    check(
      "03 fullscreen left scrollable",
      (await fsLeft.count()) >= 1 &&
        (await fsLeft.first().evaluate((el) => getComputedStyle(el).overflowY)) === "auto"
    );
    check(
      "03 fullscreen right scrollable",
      (await overlay.locator(".overflow-x-hidden.overflow-y-auto").count()) === 1
    );
    await shot(dpage, "03-fullscreen");

    await dpage.getByRole("button", { name: "Preview", exact: true }).click();
    await dpage.waitForTimeout(400);
    check(
      "03 fullscreen preview canvas",
      (await dpage.locator('canvas[aria-label*="Isometric"]').count()) === 1
    );
    await dpage.getByRole("button", { name: "Blueprint", exact: true }).click();
    await dpage.waitForTimeout(400);
    await dpage.getByRole("button", { name: "Fullscreen ✕", exact: true }).click();
    await dpage.waitForTimeout(300);
    check("03 overlay dismissed", (await overlay.count()) === 0);
    await dpage.getByRole("button", { name: "Fullscreen", exact: true }).click();
    await dpage.waitForTimeout(400);
    check("03 overlay re-entered", (await overlay.count()) === 1);
    await dpage.getByRole("button", { name: "Fullscreen ✕", exact: true }).click();
    await dpage.waitForTimeout(300);
    check("03 overlay exited again", (await overlay.count()) === 0);
    const blueprintSel = await dpage
      .locator("button")
      .filter({ hasText: /^Blueprint$/ })
      .first()
      .evaluate((el) => el.className);
    check("03 tab preserved blueprint", blueprintSel.includes("mc-btn-selected"));
    check("03 blueprint grid back", (await dpage.locator('[aria-label="Blueprint"]').count()) >= 1);

    await open(dpage, "/");
    await Promise.all([
      dpage.waitForURL("**/circle/15/**"),
      dpage.locator('a[href="/circle/15/"]').first().click(),
    ]);
    check("03 hot size 15 url", dpage.url().includes("/circle/15/"));
    const h1 = await dpage.locator("h1").first().textContent();
    check("03 size page h1 has 15", !!h1 && h1.includes("15"));
    await Promise.all([
      dpage.waitForURL("**t=circle&d=15**"),
      dpage.locator('a:has-text("Open in the generator")').first().click(),
    ]);
    check("03 open in generator url", dpage.url().includes("t=circle&d=15"));
    await open(dpage, "/");
    await Promise.all([
      dpage.waitForURL("**/about/**"),
      dpage.locator('a[href="/about/"]').first().click(),
    ]);
    check("03 footer about url", dpage.url().includes("/about/"));
    check("03 about h1", (await dpage.locator("h1").count()) >= 1);
    await shot(dpage, "03-about");

    await open(dpage, "/");
    const lang = dpage.locator('select[aria-label="Language"]');
    check("03 lang options 11", (await lang.locator("option").count()) === 11);
    await Promise.all([dpage.waitForURL("**/zh/**"), lang.selectOption("zh")]);
    check("03 zh url", dpage.url().includes("/zh/"));
    await dpage.waitForTimeout(700);
    check(
      "03 zh tool rendered",
      (await dpage.locator('[aria-label="蓝图"], [aria-label="Blueprint"]').count()) >= 1
    );
    check("03 desktop no new errors", errAt() === e0);

    const tablet = await newPage(browser, { width: 768, height: 1024 });
    const tpage = tablet.page;
    const t0 = errAt();
    await open(tpage, "/");
    for (const t of ["Generator", "Preview", "Download PNG"]) {
      check(
        `03 tablet tab ${t}`,
        (await tpage.locator("button:visible", { hasText: new RegExp("^" + t + "$") }).count()) >= 1
      );
    }
    await tpage.locator("button:visible", { hasText: /^Preview$/ }).first().click();
    await tpage.waitForTimeout(400);
    check(
      "03 tablet preview blueprint",
      (await tpage.locator('[aria-label="Blueprint"]:visible').count()) >= 1
    );
    await tpage.locator("button:visible", { hasText: /^Download PNG$/ }).first().click();
    await tpage.waitForTimeout(400);
    check(
      "03 tablet export panel",
      (await tpage.locator('p:visible:has-text("World coordinates")').count()) >= 1
    );
    await shot(tpage, "03-tablet");
    check("03 tablet no new errors", errAt() === t0);

    const mobile = await newPage(browser, { width: 390, height: 844 });
    const mpage = mobile.page;
    const m0 = errAt();
    await open(mpage, "/");
    const dims = await mpage.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      iw: window.innerWidth,
    }));
    check("03 mobile no h overflow", dims.sw <= dims.iw + 1, JSON.stringify(dims));
    await mpage.locator("button:visible", { hasText: /^Generator$/ }).first().click();
    await mpage.waitForTimeout(200);
    await shot(mpage, "03-mobile-controls");
    await mpage.locator("button:visible", { hasText: /^Preview$/ }).first().click();
    await mpage.waitForTimeout(300);
    await shot(mpage, "03-mobile-preview");
    await mpage.locator("button:visible", { hasText: /^Download PNG$/ }).first().click();
    await mpage.waitForTimeout(300);
    await shot(mpage, "03-mobile-export");
    check(
      "03 mobile lang switch",
      (await mpage.locator('select[aria-label="Language"]').count()) >= 1
    );
    await shot(mpage, "03-mobile");
    check("03 mobile no new errors", errAt() === m0);
  } finally {
    await browser.close();
  }
};
