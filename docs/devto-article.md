# dev.to 文章草稿 — 发布指引

- **发布平台**:dev.to(注册:`dev.to/enter`,邮箱或 GitHub 登录,免费、即时发布、正文链接 dofollow)
- **标签**:`showdev` `minecraft` `javascript` `nextjs`
- **封面图**:`docs/assets/campaign/03-preview-3d.png`(3D 球体渲染,上传时选它)
- **注意事项**:标题别改得太广告化;正文链接已自然融入,不要额外堆链接;发布后回复所有评论(前几小时互动影响传播)

---

## 标题(三选一,推荐第 1 个)

1. **How I built a free Minecraft circle generator with 3,100 pre-rendered pages**
2. Build a Minecraft circle generator: the math behind pixel-perfect blueprints
3. Why my Minecraft circle generator has a page for every size (and yours can too)

---

## 正文(复制以下内容,把 `{{COVER}}` 替换为封面图上传链接)

```markdown
If you've ever tried to build a circle in Minecraft, you know the problem: the game is a grid of cubes, so there are no curves — only pixelated approximations. Get one block wrong and the whole ring looks lopsided.

I built a free tool that solves this: [CircleGen](https://pixelcircle.online) — a static site that turns any diameter into a block-by-block blueprint you can copy straight into the game.

## The math: midpoint circle algorithm

A Minecraft circle is just a discrete circle rendered on a square grid. The classic way to compute it is the [midpoint circle algorithm](https://en.wikipedia.org/wiki/Midpoint_circle_algorithm): instead of evaluating every point of the circle equation, you walk the arc in one octant and mirror it to the other seven, using an error term to decide whether the next block steps horizontally, vertically, or diagonally.

Two properties matter for building:

- **Odd diameters give a true center block.** With an even diameter the "center" falls between four blocks, so the pattern looks off. That's why all my sizes are odd — 5, 7, 9 ... up to 256.
- **The outline vs. filled difference is big.** A filled 25-block circle needs 477 blocks; its outline needs only 68. Blueprints that don't tell you which one you're looking at are useless in survival mode, where you might be mining every single block.

## Turning math into pages: pre-rendered SEO at zero backend cost

The interesting engineering choice: every size and shape is a **real static page**, generated at build time with Next.js static export. `/circle/101/` isn't a dynamic route that computes on request — it's a pre-rendered HTML file that already contains the full blueprint grid, the exact block count, and a per-size FAQ.

Why bother? Three reasons:

1. **It's genuinely useful data.** Each page answers the question you actually searched for: "how many blocks is a 101-block circle?" (316), "what should I use it for?" (stadiums, large temples). That's the kind of computed fact a copy-paste article can't provide.
2. **The math runs once, at build time.** Visitors get instant pages with zero server cost — the whole site is static files on a CDN.
3. **Each language gets its own pages.** The site ships in 11 languages (English, German, Spanish, French, Portuguese, Turkish, Italian, Russian, Polish, Indonesian, Chinese), each with its own pre-rendered shape pages and hreflang alternates — not machine-translated widgets, but proper localized pages.

## What the tool does

Pick a shape (circle, oval, sphere, dome, arc, torus, ellipsoid), a diameter, and a style (outline, chart, filled), and you get:

- a pixel-perfect blueprint grid you can copy block by block
- a draggable 3D preview
- build-order animation and layer slicing for spheres and domes
- PNG / SVG / CSV / JSON export
- `/setblock` commands with your world coordinates
- a 45-block color palette and "share this exact state" links

Everything runs in the browser — no downloads, no accounts. It works identically for Java and Bedrock editions, which matters more than you'd think: the same block grid applies to both.

## The part that took the longest

Not the math — that's 30 lines. The hard part was the content around it: writing the per-size FAQs, the size guide (diameter 15 = fountain base, 101 = stadium), and doing all of it consistently in 11 languages. A generator gets you 90% of the way; the other 10% is explaining, in each language, *what the numbers mean for your build*.

The code is open source: [github.com/ywb-coder/Minecraft-Circle--Generator](https://github.com/ywb-coder/Minecraft-Circle--Generator). If you've built something similar — a generator, a calculator, anything with pre-rendered data pages — I'd love to hear how you structured it. And if you just want a blueprint for your next build: [pixelcircle.online](https://pixelcircle.online) — it's free.

#showdev #minecraft #javascript #nextjs
```

---

## 发布后(5 分钟内)

1. 把封面图 `03-preview-3d.png` 上传为文章封面
2. 加标签 `showdev` `minecraft` `javascript` `nextjs`(正文末尾标签行删掉即可)
3. 发布 → 前 1-2 小时蹲评论区回复
4. 发布 URL 记入 `docs/backlink-campaign.md` 的"已提交记录"表
