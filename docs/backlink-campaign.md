# 外链建设操作手册(Backlink Campaign)

> 目标:为 pixelcircle.online 在 4-8 周内建立 15-30 个高质量外链,加速 Google 收录与关键词排名。
> 本文档由 AI 生成,已包含可复制的文案、精确步骤、账号要求和红线规则。需要你手动操作的部分都有"操作"标记。

---

## 一、已经完成的事(2026-08-13)

| 事项 | 说明 |
|---|---|
| README.md 重构 | 新 README 已提交:包含 live demo 链接、特性列表、技术栈、部署说明,可作为所有外链的落地页 |
| LICENSE | 已添加 MIT 许可证(目录站和 awesome 列表的接受门槛) |
| 文案素材 | 见本文档第四节,可直接复制 |
| 乱码清理 | 全站 mojibake 已清零(含 README 残留) |

---

## 二、提交追踪表(每完成一项打勾)

| # | 渠道 | 外链类型 | 预估价值 | 状态 |
|---|---|---|---|---|
| 1 | awesome-minecraft(GitHub PR) | dofollow | ★★★★ | ☐ |
| 2 | FREE FOR DEV | dofollow | ★★★ | ☐ |
| 3 | AlternativeTo | dofollow | ★★★ | ☐ |
| 4 | SaaSHub | dofollow | ★★ | ☐ |
| 5 | Freesiteslike | dofollow | ★★ | ☐ |
| 6 | FreeToolDirectory | dofollow | ★★ | ☐ |
| 7 | Toolify | dofollow | ★★ | ☐ |
| 8 | Product Hunt Launch | dofollow | ★★★★ | ☐ |
| 9 | Hacker News Show HN | dofollow | ★★★★ | ☐ |
| 10 | PlanetMinecraft 资源页 | dofollow | ★★★ | ☐ |
| 11 | minecraftforum.net | dofollow | ★★★ | ☐ |
| 12 | Reddit 自然参与 | dofollow/nofollow | ★★★★ | ☐ |
| 13 | Discord 社区分享 | nofollow | ★★ | ☐ |
| 14 | 贴吧 minecraft 吧 | nofollow | ★(中文流量) | ☐ |
| 15 | 网易我的世界论坛 | nofollow | ★★ | ☐ |
| 16 | B站 MC 建造 up 主合作 | 视频简介外链 | ★★★ | ☐ |

---

## 三、素材准备(先做这一步)

### 3.1 截图/演示素材

- [ ] 工具主界面截图(1440×900,深色像素风)
- [ ] 蓝图网格特写截图(如 circle 25)
- [ ] 3D 预览截图
- [ ] 5-10 秒演示 GIF(拖拽滑块生成圆形 + 切预览旋转)(可用 OBS/ShareX 录屏)
- [ ] 1200×630 的社交分享图(已有 `/og-image.png` 可复用)

素材命名建议:`circlegen-demo.png` / `circlegen-blueprint.png` / `circlegen-preview.gif`

### 3.2 项目基本信息(所有表单复用)

```
工具名:    CircleGen
URL:       https://pixelcircle.online
Github:    https://github.com/ywb-coder/Minecraft-Circle--Generator
分类:      Minecraft / Game Tools / Design Tools
标签:      minecraft, circle generator, building, pixel art
```

### 3.3 英文描述模板(短/中/长三版)

**短版(目录站表单用,1 句话):**

> Free Minecraft circle generator with pixel-perfect block blueprints for circles, ovals, spheres, domes, arcs, toruses and ellipsoids. 11 languages, PNG/SVG export, /setblock copy. Free, no accounts.

**中版(目录站长描述/社区帖用):**

> CircleGen is a free Minecraft shape generator that turns any diameter into a block-by-block pixel blueprint you can copy straight into the game. It supports circles, ovals, spheres, domes, arcs, toruses and ellipsoids with outline, chart and filled styles; includes a live 3D preview, build-order animation, layer slicing, a 45-block color palette, and PNG/SVG/CSV/JSON exports. Everything runs in the browser — no downloads, no accounts. Available in 11 languages for Java and Bedrock editions.

**长版(Product Hunt 用):**

> CircleGen — pixel-perfect Minecraft circle blueprints in 11 languages.
> Every Minecraft builder has hit the same wall: how do you lay out a circle, sphere or dome block by block? CircleGen answers that in seconds. Pick a shape and diameter, and you get a precise pixel grid you can copy straight into the game — with outline, classic-chart and filled styles, a draggable 3D preview, build-order animation, layer-by-layer slicing for spheres and domes, and a 45-block color palette.
> Export your blueprint as PNG, SVG, CSV or JSON, copy /setblock commands with your world coordinates, or share the exact state with a link. It ships as a fully static site with zero backend — the math runs entirely in your browser.
> Bonus for builders who read this far: per-size guide pages (e.g. "Minecraft circle with 25 blocks") exist for 3,100+ combinations across 11 languages, so your exact build is one search away.

**社区评论模板(reddit/论坛自然带出):**

> I hit this exact problem, so I built a free tool that draws the block grid for any circle/sphere/dome size — you can copy the pattern straight into the game. Works for Java & Bedrock: https://pixelcircle.online

---

## 四、各渠道详细操作步骤

### 4.1 awesome-minecraft(GitHub,优先级最高)

> 免费 dofollow 外链,权威相关的完美来源。需要 GitHub 账号(你已有)。

**操作:**
1. 打开 `github.com/bs-community/awesome-minecraft`,点右上角 **Fork**(把仓库复制到你的账号)
2. 在你的 fork 里,打开 `readme.md`,找 **Tools / Websites / Utilities** 分类(或类似 Tools 分区)
3. 在列表末尾加一行:
   ```
   - [CircleGen](https://pixelcircle.online) - Free Minecraft circle generator with block-by-block pixel blueprints in 11 languages.
   ```
4. 提交 commit(写:`Add CircleGen to Tools`)
5. 回到原仓库 → 点 **Pull requests** → **New pull request** → **compare across forks** → 选你的 fork 分支 → 创建 PR,描述写:
   > Adds CircleGen, a free static Minecraft circle/shape generator with per-size blueprint pages in 11 languages. Free, no accounts, MIT licensed.
6. 等待维护者合并(通常几天)。合并即获得外链。

⚠️ 注意:列表条目要求**英文描述**、按字母顺序排;若你 fork 后列表已有变化,先同步上游再提交。

---

### 4.2 FREE FOR DEV

**操作:**
1. 注册 GitHub 账号登录 `free-for.dev`(无需新注册,用 GitHub OAuth)
2. 点右上角/侧边 **Contribute / Edit on GitHub**(它会带你到该仓库的贡献流程)
3. 按仓库 CONTRIBUTING 指引,在合适分类(如 Software 或 Hosting 附近找"Design/Game"类)添加条目:
   ```
   - [CircleGen](https://pixelcircle.online) — free Minecraft circle generator with pixel-perfect block blueprints, 11 languages, PNG/SVG export.
   ```
4. 提 PR,等合并

---

### 4.3 AlternativeTo

**操作:**
1. 注册账号(邮箱即可)
2. 打开 `alternativeto.net`,搜索 **"minecraft circle generator"** 或 **"plotz modeller"** 等已知工具(Plotz 是最有名的同类)
3. 在找到的页面点 **Add alternative** → 填:
   - Name: `CircleGen`
   - Website: `https://pixelcircle.online`
   - Description: 用中版文案
   - 标签: `minecraft`, `circle`, `blueprint`
4. 提交,等审核(1-7 天)

---

### 4.4 SaaSHub

**操作:**
1. 注册 `saashub.com`
2. 点 **Add software** → 填名称、URL、描述(中版文案)、类别
3. 提交后等待审核

---

### 4.5 Freesiteslike

**操作:**
1. 打开 `freesiteslike.com`,注册
2. 点 **Submit a site** → 填 URL、标题、描述(短版文案)
3. 审核通过后获得外链

---

### 4.6 FreeToolDirectory

**操作:**
1. 打开 `freetooldirectory.com` → **Submit**
2. 填:URL、标题、描述、类别(Games/Design)
3. 部分目录站要求先免费注册

---

### 4.7 Toolify

**操作:**
1. 打开 `toolify.ai` → 注册
2. 提交站点(它偏 AI 工具,若审核被拒可跳过,不是重点)

---

### 4.8 Product Hunt(单次最大曝光,值得认真做)

**准备(发布前 1 周):**
1. 注册/登录 `producthunt.com`(需 GitHub 或 Twitter 账号)
2. 准备素材:
   - 主图 1000×1000(可裁 og-image 或新做)
   - 1-2 张截图 + 1 个 GIF(3.3 素材)
   - 标题:`CircleGen — pixel-perfect Minecraft circle blueprints in 11 languages`
   - 描述:长版文案
   - 标签(最多 3 个):`Minecraft`、`Design Tools`、`Developer Tools`
3. 首次发布需要先提交 **Upcoming** 排期(产品页点 "Upcoming",选 1-2 周后)

**发布日(选周二-周四,UTC 时间上午):**
1. 当天刷新产品页确认上线
2. **前 2 小时是黄金期**:准备 5-10 个朋友/社区支持者点 Upvote 并评论
3. 全程回复所有评论(越快越好)
4. 发布后 24 小时内在产品页发一条 Update 帖(感谢 + 使用技巧)

⚠️ 外链价值:PH 页面是 dofollow,且能带来种子流量和社交信号。

---

### 4.9 Hacker News(Show HN)

**操作:**
1. 打开 `news.ycombinator.com`,注册账号(需要邮箱;新账号可发帖,但最好先攒点 karma)
2. 标题格式:`Show HN: Free Minecraft circle generator (static, 11 languages)`
3. 正文(第一段即可):
   > I built a fully static Minecraft circle generator that turns any diameter into a copyable block blueprint. Circles, ovals, spheres, domes, arcs, toruses, ellipsoids; PNG/SVG/CSV export, /setblock copy, build-order animation, 11 languages, 3100+ SEO pages. No backend — the math runs in your browser.
   > Demo: https://pixelcircle.online
4. **发布后 1-2 小时务必在评论区回复技术问题**(HN 排序算法极其看重作者参与度)
5. 常见质疑应对:
   - "跟 Plotz 有什么区别?" → 答:完全静态无后端、多语言、/setblock 导出、每尺寸独立 SEO 页
   - "为什么不用 canvas?" → 答:网格用 DOM/SVG 便于逐格交互与坐标复制

⚠️ 新账号发 Show HN 有被 flag 风险;建议先回复其他帖攒 10-20 karma 再发。

---

### 4.10 PlanetMinecraft

**操作:**
1. 注册 `planetminecraft.com`(邮箱,需激活;新账号有发帖限制,先活跃 2-3 天:收藏、评论)
2. 点 **Create → Resource/Project**(选"其他"类型)
3. 填:标题 `CircleGen - Free Minecraft Circle Generator`、简介(中版文案)、截图、链接、标签
4. 发布后把链接加到你的 PMC 签名档

---

### 4.11 minecraftforum.net

**操作:**
1. 注册 `minecraftforum.net`
2. 找 **Off Topic / Gaming / Tutorials** 板块(或"Free tools"类)
3. 发帖:标题 `[Free Tool] CircleGen – Minecraft circle/sphere/dome blueprint generator`,内容用中版文案 + 截图
4. 把链接放进**签名档**(论坛签名档是持续外链)

---

### 4.12 Reddit(收益最大,风险也最大)

**账号准备:**
- 用**真实常用账号**(新号发外链必被删)
- 先花 1-2 周在子板块正常参与(回答建造问题),攒 50+ karma

**可参与的 subreddit(按规则筛选):**
- `r/Minecraft`(严格,禁止自我推广帖;只可讨论中自然提及)
- `r/minecraftbuilds`(分享建造作品;工具类贴需看规则)
- `r/MinecraftHelp`(解答问题,签名式提及工具可接受)
- `r/MinecraftCommands`(setblock 相关,工具高度相关)
- `r/askminecraft` 等

**安全发布姿势:**
1. 先搜 "circle" 相关老帖,回复已存在的求助帖(自然带出工具 + 社区回复模板)
2. 若某 sub 有 "share your tools" 周帖,在里面发
3. **绝不**:重复发链接、多个账号互顶、先发链接后编辑(会被 spam 系统标记)

---

### 4.13 Discord 建造社区

**操作:**
1. 加入 2-3 个 Minecraft 建造服务器(从 PMC/reddit 的推荐列表找)
2. 阅读每个服务器的 #rules,找 #tools / #showcase / #self-promo 频道
3. 在允许的频道发:中版文案 + 截图 + 链接
4. 之后偶尔在别人问"怎么画圆"时帮忙(自然带出)

---

### 4.14 中文社区

**贴吧(百度):**
1. 打开 `tieba.baidu.com/f?kw=minecraft`
2. 阅读吧规(吧务很严,确认允许工具分享)
3. 发帖:标题 `分享一个免费MC圆形生成器,支持11种语言` 内容用中文版文案 + 截图
4. 注意:贴吧外链带跳转,权重低但流量真实

**网易我的世界论坛(MCBBS 已关闭后的主要中文论坛):**
- 打开 `mc.netease.com` 社区 → 注册 → 找"建筑/工具"板块发帖

**B站合作(效果最好的中文渠道):**
1. 搜索 MC 建造类 up 主(如"MC建筑教程"类,粉丝 1-10 万即可)
2. 私信模板:
   > 你好!我开发了一个免费的 MC 圆形/球形生成器(pixelcircle.online),支持 11 种语言、逐块蓝图和 /setblock 导出。看到你的建筑教程很精彩,如果愿意在视频简介里放个链接,我可以帮你生成任意尺寸的定制蓝图(比如你的视频封面圆形)。有兴趣吗?
3. 目标:2-3 个 up 主接受,视频简介外链 + 真实中文流量

---

### 4.15 中文版文案模板(贴吧/网易用)

> 免费 MC 圆形生成器,支持 11 种语言(含简体中文):
> - 圆形/椭圆/球形/穹顶/圆弧/圆环/椭球,轮廓/图表/实心三种样式
> - 逐块像素蓝图,可直接照着搭;支持 3D 预览、建造顺序动画、逐层切片
> - 导出 PNG/SVG/CSV/JSON,复制 /setblock 命令(带世界坐标)
> - 45 种方块配色、免费、无需注册、纯静态、Java & Bedrock 通用
> 地址:https://pixelcircle.online

---

## 五、时间线(建议节奏)

| 周 | 任务 |
|---|---|
| 第 1 周 | 素材准备 → awesome-minecraft PR → FREE FOR DEV / AlternativeTo / SaaSHub / Freesiteslike / FreeToolDirectory(5-8 个提交) |
| 第 2 周 | Product Hunt 排期(Upcoming)+ HN 账号养 karma + PlanetMinecraft / minecraftforum 注册活跃 |
| 第 3 周 | PH 发布日(周二-周四)+ HN Show HN + reddit 开始自然参与 |
| 第 4 周 | reddit/Discord/中文社区持续参与 + B站联系 up 主 + 回复所有目录站审核 |
| 第 5 周起 | 每周 2-3 次社区参与;**GSC → 链接报告**看外链收录;评估是否启动博客 |

---

## 六、红线(违反会前功尽弃)

1. **不买外链、不加入链接农场、不用 PBN**——Google 反外链操纵,新域名最容易中招
2. **不重复复制粘贴同一文案**(目录站可微调;reddit/论坛必须原创化)
3. **不同时用多个账号操作**——被识别为 spam 会波及主站
4. **所有社区先读版规再发**
5. **链接仅放你拥有权限的页面**(README、自己的资源页、允许的频道)
6. 每天控制节奏:目录站提交一天 2-3 个,社区参与一次即可

---

## 七、监控与验证

| 时间点 | 动作 |
|---|---|
| 每天 | `site:pixelcircle.online` 手动搜一次(GSC 收录前 Bing 通常先出) |
| 每周 | GSC → 概览:收录页面数变化 |
| 第 2-3 周 | GSC → 链接 → 外部链接:看外链域名数 |
| 第 3-4 周 | GSC → 效果:看是否出现展示(0 展示也正常,耐心) |
| 第 6 周 | 若展示仍为 0 → 检查 GSC 网页报告是否有 "已抓取-未编入索引" 及其原因 |

**收录检查工具**:GSC 网页报告(权威)、Google 搜索 `site:pixelcircle.online`、Bing 搜索 `site:pixelcircle.online`(Bing 收录更快,可作先行指标)。

---

## 八、常见问题

**Q: 收录要多久?**
A: 首页 1-2 周;3,161 个 SEO 页 2-6 周逐步收录。外链能明显加速。

**Q: 为什么搜 "pixelcircle" 搜不到?**
A: 品牌词需要首页被收录后才可能出现。收录完成后,域名精确匹配通常能命中品牌搜索。

**Q: 先做博客还是先做外链?**
A: 先外链(4 周),有 15+ 外链后再考虑博客。博客是第 2 阶段。

**Q: 外链目标数量?**
A: 4-8 周 15-30 个足够启动;之后靠内容持续积累。

---

## 十、广告策略(重要:先读再提交)

**当前定位:免费工具(free tool),不做"无广告(no ads)"承诺。**

原因:提交给目录站/社区的文案、README、llms.txt 会被 Google 缓存、被 AI 引擎长期引用。一旦未来接入广告,"no ads" 就会变成假话,损害 GEO 信任和品牌形象。**"免费"是永久成立的定位,广告不影响它。**

**未来接入广告时的正确姿势:**
1. 位置:不遮挡工具主体(如:侧边栏/底部/导出页),不影响核心操作
2. 类型:Google AdSense(需要新增隐私政策声明——现有 privacy 页可补充)或联盟链接(如 Minecraft 服务器/主机商)
3. 文案演进:"free tool" 保持不变;若产品页曾被收录 "no ads" 文案,发布广告后更新这些页面并等待重新抓取
4. 本文档所有模板已按此原则编写,**提交时不要私自加回 "no ads" 表述**

## 十一、可选:提交后给维护者的跟进模板

若 7 天后目录站/awesome PR 未合并:

> Hi! Just following up on my submission of CircleGen (https://pixelcircle.online) — a free static Minecraft circle generator with per-size blueprint pages in 11 languages. Let me know if anything needs adjusting. Thanks!
