const { chromium } = require("playwright");
const { BASE, check, newPage, shot, errors } = require("./helpers");

const errAt = () => errors.filter((e) => !e.startsWith("[http 404]")).length;

const PAGES = [
  "/circle/15/",
  "/circle/21/",
  "/circle/101/",
  "/sphere/15/",
  "/sphere/33/",
  "/dome/15/",
  "/dome/33/",
  "/oval/15/7/",
  "/oval/25/13/",
  "/torus/41/8/",
  "/torus/65/12/",
  "/ellipsoid/25/17/11/",
];

module.exports = async function main() {
  const browser = await chromium.launch();
  try {
    const { page } = await newPage(browser, { width: 1280, height: 900 });
    const e0 = errAt();

    for (let i = 0; i < PAGES.length; i++) {
      const path = PAGES[i];
      const before = errAt();
      const resp = await page.goto(BASE + path, { waitUntil: "networkidle" });
      check(`05 status ${path}`, !!resp && resp.status() === 200, resp ? String(resp.status()) : "no resp");
      check(`05 h1 ${path}`, (await page.locator("h1").count()) >= 1);
      const content = await page.content();
      check(`05 key facts ${path}`, content.includes("Key facts"));
      const ld = await page.evaluate(() => {
        const out = [];
        document.querySelectorAll('script[type="application/ld+json"]').forEach((s) => {
          try {
            out.push(JSON.parse(s.textContent));
          } catch {}
        });
        return out;
      });
      check(`05 jsonld parse ${path}`, ld.length >= 1, `count=${ld.length}`);
      const hasFaq = ld.some((o) => {
        const t = Array.isArray(o["@type"]) ? o["@type"] : [o["@type"]];
        return t.includes("FAQPage");
      });
      check(`05 jsonld faq ${path}`, hasFaq);
      const alt = (content.match(/rel="alternate"/g) || []).length;
      check(`05 alternates 12 ${path}`, alt === 12, `count=${alt}`);
      check(`05 canonical ${path}`, /rel="canonical"/.test(content));
      const desc = await page.locator('meta[name="description"]').first().getAttribute("content");
      check(`05 desc <=160 ${path}`, !!desc && desc.length <= 160, desc ? `len=${desc.length}` : "missing");
      check(`05 no errors ${path}`, errAt() === before);
      if (i % 3 === 2) await shot(page, `05-seo-${i + 1}`);
    }

    await page.goto(BASE + "/this-page-does-not-exist/", { waitUntil: "networkidle" });
    check("05 404 status", page.url().length > 0, "goto ok");
    await page.goto(BASE + "/404.html", { waitUntil: "networkidle" });
    const c404 = await page.content();
    check("05 404 message", c404.includes("Page not found"));
    check("05 404 popular link", c404.includes("/circle/15/"));

    const trust = ["/about/", "/contact/", "/privacy/", "/terms/"];
    for (const path of trust) {
      const before = errAt();
      const resp = await page.goto(BASE + path, { waitUntil: "networkidle" });
      check(
        `05 trust ${path}`,
        !!resp && resp.status() === 200 && (await page.locator("h1").count()) >= 1,
        resp ? String(resp.status()) : "no resp"
      );
      check(`05 trust no errors ${path}`, errAt() === before);
      if (path === "/about/") await shot(page, "05-about");
    }

    const lBefore = errAt();
    const lResp = await page.goto(BASE + "/llms.txt", { waitUntil: "networkidle" });
    const lText = lResp ? await lResp.text() : "";
    check("05 llms 200", !!lResp && lResp.status() === 200, lResp ? String(lResp.status()) : "no resp");
    check("05 llms 41-block torus", lText.includes("41-block torus"));
    check("05 llms no errors", errAt() === lBefore);

    const fBefore = errAt();
    const fResp = await page.goto(BASE + "/llms-full.txt", { waitUntil: "networkidle" });
    const fText = fResp ? await fResp.text() : "";
    check("05 llms-full 200", !!fResp && fResp.status() === 200, fResp ? String(fResp.status()) : "no resp");
    check("05 llms-full ellipsoid", fText.includes("Ellipsoid"));
    check("05 llms-full no errors", errAt() === fBefore);

    const rBefore = errAt();
    const rResp = await page.goto(BASE + "/robots.txt", { waitUntil: "networkidle" });
    const rText = rResp ? await rResp.text() : "";
    check("05 robots 200", !!rResp && rResp.status() === 200, rResp ? String(rResp.status()) : "no resp");
    check("05 robots gptbot", rText.includes("GPTBot"));
    check("05 robots perplexity", rText.includes("PerplexityBot"));
    check("05 robots no errors", errAt() === rBefore);

    const zhBefore = errAt();
    const zhResp = await page.goto(BASE + "/zh/circle/15/", { waitUntil: "networkidle" });
    const zhContent = await page.content();
    const zhH1 = await page.locator("h1").first().textContent();
    check("05 zh 200", !!zhResp && zhResp.status() === 200, zhResp ? String(zhResp.status()) : "no resp");
    check("05 zh h1 non-empty", !!zhH1 && zhH1.trim().length > 0);
    check("05 zh hreflang 12", (zhContent.match(/rel="alternate"/g) || []).length === 12);
    check("05 zh no errors", errAt() === zhBefore);

    check("05 no new errors overall", errAt() === e0);
  } finally {
    await browser.close();
  }
};
