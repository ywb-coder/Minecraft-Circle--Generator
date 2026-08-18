# Product Hunt 发布包(复制即用)

> 目标:2026-08-18 提交 Upcoming 排期,发布日选最近的 **周二-周四(UTC 上午)**。
> 外链价值:PH 产品页 dofollow;发布当天带来种子流量 + 社交信号。
> ⚠️ 2026-08-17 未核验 PH 最新规则,以下"发布日选择"为决策规则而非固定答案:以系统实际可选日期为准,按优先级选。

---

## 0. 账号(2 分钟)

1. 打开 `producthunt.com` → 右上角 **Log in** → 用 **GitHub** 账号登录(ywb-coder,已有)
2. 首次登录按提示补昵称/头像(可选)

---

## 1. 创建产品(表单字段,全部复制)

**Name**:
```
CircleGen
```

**Tagline**(≤60 字符,已核对 57 字符):
```
Pixel-perfect Minecraft circle blueprints in 11 languages
```

**Website**:
```
https://pixelcircle.online
```

**Links**(附加链接,越多越好):
```
https://github.com/ywb-coder/Minecraft-Circle--Generator
https://dev.to/ywbcoder/how-i-built-a-free-minecraft-circle-generator-with-3100-pre-rendered-pages-2cai
```

**Topics**(最多 3 个,按优先级;若 "Minecraft" 不在话题列表,用 "Gaming"):
```
Minecraft, Developer Tools, Design Tools
```

**Description**(长版,支持 markdown,直接粘贴):

```markdown
Every Minecraft builder has hit the same wall: how do you lay out a circle, sphere or dome block by block? CircleGen answers that in seconds.

Pick a shape (circle, oval, sphere, dome, arc, torus, ellipsoid) and a diameter, and you get a precise pixel grid you can copy straight into the game — with outline, chart and filled styles, a draggable 3D preview, build-order animation, layer-by-layer slicing, and a 45-block color palette.

Export your blueprint as PNG, SVG, CSV or JSON, copy /setblock commands with your world coordinates, or share the exact state with a link. It ships as a fully static site with zero backend — the math runs entirely in your browser. No downloads, no accounts, free forever.

Built for both Java and Bedrock editions, in 11 languages — with 3,100+ pre-rendered per-size guide pages (e.g. "Minecraft circle with 25 blocks"), so your exact build is one search away. Open source (MIT).
```

**Gallery 图片**(从 `docs/assets/campaign/` 上传,顺序如下):
| 顺序 | 文件 | 说明 |
|---|---|---|
| 1(主图) | `05-social-3d-1000.png` | 1000×1000,3D 球体 |
| 2 | `05-social-2d-1000.png` | 1000×1000,2D 蓝图 |
| 3 | `01-tool-main.png` | 1440×900 工具全貌 |
| 4 | `03-preview-3d.png` | 3D 预览 |
| 5 | `02-blueprint-closeup.png` | 蓝图特写 |
| 6 | `04-demo.gif` | 演示 GIF(滑块→3D) |

**Video**:无视频可不填(有 YouTube 演示视频更好,以后可补)。

---

## 2. 提交 Upcoming 排期

1. 创建完产品后,页面右侧点 **"I made this"**(自荐)/ **Upcoming** 入口
2. **选发布日期(决策规则,按优先级)**:
   - 若系统允许选近期周二-周四 → 选 **8/19(周三)或 8/20(周四)**(留 1-2 天审核缓冲,别选明天 8/18 当天,审核可能来不及)
   - 若系统要求更长提前量 → 选 **8/25-27(周二-周四)** 窗口
   - 无论选哪天,都尽量落在 UTC 上午 0-8 点(覆盖美西下午)
3. 提交后等审核(通常 1-3 天,审核通过前可修改所有字段)

⚠️ 审核常见退件原因:tagline 超长、链接打不开、图片模糊。提交前再点一遍 pixelcircle.online 和 GitHub 链接。

---

## 3. 发布日当天(Playbook)

**前 2 小时(黄金期):**
1. 产品页确认上线 → 立刻发出**创始人首条评论**(见下,提交时已预填,核对已发出)
2. 把发布链接**自然分享**给朋友/社群(私聊或朋友圈发链接即可,**不要明示"求 upvote"**、不要冷 DMs、不要用刷票服务/推广群——PH 明示违规会下架首页并追责)
3. 全程刷新页面,回复每一条评论(越快越好,排序权重高)

**首条评论模板(粘贴后微调):**

> Hey Product Hunt! I built CircleGen because every time I tried to build a big circle or dome in Minecraft, I ended up counting blocks on a screenshot.
>
> What's different:
> - **Every size is a real page** — 3,100+ pre-rendered pages (circle/101/, sphere/33/...) with exact block counts, in 11 languages. No JavaScript needed to see the blueprint.
> - **/setblock export** with your world coordinates — paste a whole dome straight into the game.
> - **Zero backend**: the whole thing is static files, the midpoint-circle math runs at build time.
> - Open source (MIT): [github.com/ywb-coder/Minecraft-Circle--Generator](https://github.com/ywb-coder/Minecraft-Circle--Generator)
>
> Would love feedback from builders — what shape should I add next? I was thinking hexagons and diagonal lines.

**24 小时后:** 产品页发一条 **Update 帖**:感谢 + 数据 + 使用技巧(模板):

> Thanks for the amazing launch day! Quick recap: [关键数据,如 visits/upvotes], and the most requested feature so far is [从评论总结].
> Pro tip: try Builder mode for a step-by-step build order, and the layer slider for domes. Ask me anything in the comments — still here!

---

## 4. 发布后 1 周

- 把产品页 URL 记入 `docs/backlink-campaign.md` 已提交记录表
- PH 页面链接是 dofollow,会被 Google 收录 → 加进 `npm run serp` 的进池追踪观察(dev.to 同理)

---

## 5. 明天(8/18 周二)操作顺序(照抄执行)

**上午(提交,约 30 分钟):**
1. `producthunt.com` → Log in → **GitHub 登录**(ywb-coder)
2. 创建产品,字段全部按第 1 节复制:
   - Name `CircleGen` / Tagline(57 字符,别改)/ Website `https://pixelcircle.online`
   - Links 两个:GitHub + dev.to 文章
   - Topics:Minecraft, Developer Tools, Design Tools
   - Description:整段 markdown 粘贴
   - Gallery 按表格顺序传 6 张(主图 `05-social-3d-1000.png`)
3. 点 **"I made this"** → 选发布日期:优先 **8/19 或 8/20**,系统不让选就选 **8/25-27** 窗口(见第 2 节决策规则)
4. 提交 → 等审核(1-3 天)

**提交后顺手做:**
5. 把审核状态发我,我更新追踪表
6. 在浏览器收藏夹存产品页 URL,方便发布日直达

**发布日当天(Playbook,见第 3 节):**
7. 上线头 2 小时:发创始人首条评论(模板在 3 节)→ 私聊邀 5-10 人 upvote + 评论
8. 全程刷新,快速回复每条评论
9. 24 小时后发 Update 帖(模板在 3 节)

**备用计划:**
- 若 GitHub 登录失败 → 用邮箱注册新号(同一天即可完成)
- 若审核退件 → 按退件原因改字段重新提交,日期顺延到下一个周二-周四窗口
