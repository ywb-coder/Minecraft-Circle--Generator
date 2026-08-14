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
| 营销素材 | 截图 ×5 + 演示 GIF + PH 1000×1000 主图,位于 `docs/assets/campaign/`(见 3.1) |
| **awesome-minecraft PR** | **已提交 PR #66**(`bs-community:master`),待合并(见 4.1 / 追踪表) |
| **渠道核实** | 16 个渠道全部核实,结论见第六节;无效渠道(FREE FOR DEV / Toolify / 疑似停摆站)已标记跳过 |

---

## 二、提交追踪表(每完成一项打勾)

> 2026-08-13 已逐渠道核实,标注了实际可行性(✅ 可提交 / ⚠️ 待确认 / ❌ 跳过)。

| # | 渠道 | 外链类型 | 预估价值 | 状态 |
|---|---|---|---|---|
| 1 | awesome-minecraft(GitHub PR) | dofollow | ★★★★ | ✅ **已提交 PR #66**(2026-08-13),待合并 |
| 2 | FREE FOR DEV | dofollow | ★★★ | ❌ 跳过:只收 SaaS 免费层级,明确拒绝通用工具箱站,AI 文案 PR 直接关闭 |
| 3 | AlternativeTo | dofollow | ★★★ | ☐ 可提交(软件详情页 "Suggest alternative" 按钮) |
| 4 | SaaSHub | dofollow | ★★ | ☐ 可提交(saashub.com/submit,免费,接受网页工具) |
| 5 | Freesiteslike | dofollow | ★★ | ⚠️ 站点疑似停摆(TLS 证书失效/停放页),待确认 |
| 6 | FreeToolDirectory | dofollow | ★★ | ⚠️ 站点当前无法访问(超时),待确认 |
| 7 | Toolify | dofollow | ★★ | ❌ 跳过:只收 AI 工具,且当前提交收费 $99 |
| 8 | Product Hunt Launch | dofollow | ★★★★ | ☐ 可提交(需排期) |
| 9 | Hacker News Show HN | dofollow | ★★★★ | ☐ 可提交(需先攒 karma) |
| 10 | PlanetMinecraft 资源页 | dofollow | ★★★ | ☐ 可提交(新账号走 Greenlight 审核) |
| 11 | minecraftforum.net | dofollow | ★★★ | ⚠️ 站点被 Cloudflare 拦截,注册后以实际提示为准 |
| 12 | Reddit 自然参与 | dofollow/nofollow | ★★★★ | ☐ 可参与(遵守各 sub 规则) |
| 13 | Discord 社区分享 | nofollow | ★★ | ☐ 可参与 |
| 14 | 贴吧 minecraft 吧 | nofollow | ★(中文流量) | ☐ 可参与(先读吧规) |
| 15 | 网易我的世界论坛 | nofollow | ★★ | ☐ 可参与 |
| 16 | B站 MC 建造 up 主合作 | 视频简介外链 | ★★★ | ☐ 可联系 |
| 17 | **dev.to 干货文** | dofollow(实测) | ★★★★ | ✅ **已发布**(2026-08-14),[文章链接](https://dev.to/ywbcoder/how-i-built-a-free-minecraft-circle-generator-with-3100-pre-rendered-pages-2cai),前 1-2 小时蹲评论区 |
| 18 | **LiteDevelopers/awesome-minecraft**(PR) | dofollow | ★★★★ | ❌ 跳过(2026-08-14 用户决定不做 PR 类渠道;备料仍在 `docs/awesome-lists-prs.md` 留档) |
| 19 | **itch.io /tools** | nofollow(平台对描述链接自动加) | ★★★★ | ✅ **已发布**(2026-08-14),[项目页](https://ywb-coder.itch.io/circlegen-minecraft-circle-generator),Tools/HTML 嵌入,入口页 `docs/itch/index.html`;项目页含指向 pixelcircle.online 的链接(nofollow)+ meta/og 描述 |
| 20 | **ArkFlame/awesome-minecraft**(PR) | dofollow | ★★★ | ❌ 跳过(2026-08-14 用户决定;备料留档) |
| 21 | **CAIMEOX/awesome-minecraft-bedrock**(PR) | dofollow | ★★★ | ❌ 跳过(2026-08-14 用户决定;备料留档) |
| 22 | **Uneed(uneed.best)** | dofollow(官方声明) | ★★★ | ✅ **已提交并排期**(2026-08-14),slug:uneed.best/tool/circlegen,已 Unschedule 让系统分配约 8/28 档期;发布后公开页生成 |
| 23 | **LibHunt** | dofollow(大部分) | ★★★ | ✅ **已提交并自动批准**(2026-08-14),项目页 https://libhunt.com/r/Minecraft-Circle--Generator 含 pixelcircle.online 链接(已验证) |
| 24 | **SideProjectors** | dofollow(实测) | ★★★ | ✅ **已提交**(2026-08-14),Showcase 类型,ID 88943,状态 pending review;ComingUp 免费联动已开 |
| 25 | **Launching Next** | 🟡 多源标 dofollow | ★★ | ✅ **已提交**(2026-08-14),免费队列 In Queue(预计 4 个月);$99 Fast-Track 未购买(性价比低),发布后自查 dofollow |
| 26 | **10words** | ⚪ 未验证 | ★★ | ☐ 免费,10 词简介 |
| 27 | **Alternative.me** | 🟡 | ★★ | ☐ 可把 CircleGen 作为 Plotz 替代品提交 |
| 28 | **minecrafttools.net** | dofollow(实测) | ★★ | ☐ 无表单,需进 Discord 建议,收录不确定 |
| 29 | Indie Hackers | ❌ 默认 nofollow | ★(曝光) | ☐ 可选:只当社区曝光(需 500 积分才解锁 dofollow) |

### 已提交记录

| 时间 | 渠道 | 内容 | 状态 |
|---|---|---|---|
| 2026-08-13 | awesome-minecraft | PR #66 `Add CircleGen to Web Applications`,1 commit(+1 行),目标 `bs-community:master` | 已提交,待维护者合并(仓库较休眠,上次合并约 1 年前,建议保留并 2-3 个月后复查) |
| 2026-08-14 | dev.to | 文章 `How I built a free Minecraft circle generator with 3,100 pre-rendered pages` | ✅ **已发布**(dofollow,正文含 pixelcircle.online + GitHub 链接),标签 showdev/minecraft/javascript/nextjs。URL:https://dev.to/ywbcoder/how-i-built-a-free-minecraft-circle-generator-with-3100-pre-rendered-pages-2cai |
| 2026-08-14 | GitHub 仓库 | 转为 public + MIT 许可证;About 描述/Website 已设(pixelcircle.online) | ✅ 完成(匿名 API 验证 public) |
| 2026-08-14 | itch.io /tools | 项目 `CircleGen - Minecraft Circle Generator`,Tools 分类,HTML 嵌入(iframe→pixelcircle.online),封面+3 截图+描述+4 标签 | ✅ **已发布**(2026-08-14),URL:https://ywb-coder.itch.io/circlegen-minecraft-circle-generator;链接为 nofollow(itch 对描述外链自动加),meta/og 描述已补 |
| 2026-08-14 | itch.io 社区 Release Announcements | 发布公告帖(标题+简介+截图+双链接,符合板块规则) | ✅ **已发布**(2026-08-14),URL:https://itch.io/t/6790276/circlegen-free-minecraft-circle-generator-with-pixel-perfect-block-blueprints |
| 2026-08-14 | LibHunt | 提交 GitHub 仓库,自动批准;项目页含 pixelcircle.online 链接 | ✅ **已收录**(2026-08-14),URL:https://libhunt.com/r/Minecraft-Circle--Generator |
| 2026-08-14 | AlternativeTo / SaaSHub | AlternativeTo:Plotz 不在库中且无 Suggest 入口,跳过;SaaSHub:注册被拒(Error 4.22.2,IP/邮箱拦截),OAuth 可后试 | ⚠️ 暂缓,待补 |
| 2026-08-14 | Uneed(uneed.best) | 提交产品 CircleGen(slug:circlegen,Category Design,Pricing Free,Tagline+描述+Logo+1 图),已 Save;已 Unschedule 等待系统分配约 2026-08-28 档期 | ✅ 已提交,待发布(发布后验证 dofollow) |
| 2026-08-14 | SideProjectors | Showcase 类型提交(Name+URL+pitch+描述+技术栈),开启 ComingUp 免费联动,ID 88943 | ✅ 已提交,pending review(提交页 HTTP 200 确认) |
| 2026-08-14 | Launching Next | 免费表单提交(Name/URL/headline/描述/tags/侧项目/$0 预算),已入队(预计 4 个月);Fast-Track $99 未买 | ✅ 已提交,In Queue |

---

## 三、素材准备(先做这一步)

### 3.1 截图/演示素材(已全部生成,位于 `docs/assets/campaign/`)

| 文件 | 尺寸 | 用途 |
|---|---|---|
| `01-tool-main.png` | 1440×900 | 工具主界面全貌(目录站/论坛) |
| `01-tool-main-1280.png` | 1280×1280 | 大图备用(论坛附件/README) |
| `02-blueprint-closeup.png` | 566×566 | 蓝图网格特写(细节展示) |
| `03-preview-3d.png` | ~590×590 | 3D 球体渲染(视觉最佳,缩略图/社交图) |
| `04-demo.gif` | 640×400,14 帧循环 | 演示 GIF:滑块拖动圆形从小变大 → 切 3D 预览(PH/论坛) |
| `05-social-2d-1000.png` | 1000×1000 | Product Hunt 主图(2D 蓝图) |
| `05-social-3d-1000.png` | 1000×1000 | Product Hunt 主图(3D 球体,推荐用这张) |

> 社交分享图(1200×630)已有 `/og-image.png`,无需另做。

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

### 4.1 awesome-minecraft(GitHub,优先级最高)✅ 已完成

> 免费 dofollow 外链,权威相关的完美来源。需要 GitHub 账号(你已有)。

**✅ 2026-08-13 已提交:PR #66**(`Add CircleGen to Web Applications`,目标 `bs-community:master`,1 commit +1 行)。

**后续:**
- 等待维护者合并。注意:该仓库**较休眠**(上次合并约 1 年前),PR 可能等数周-数月,保留即可
- 2-3 个月后若仍未合并,可在 PR 下礼貌跟进一次(见第十一节模板)
- 若维护者要求修改(如描述格式),按反馈更新即可

**当时的操作流程(留档):**
1. 打开 `github.com/bs-community/awesome-minecraft`,点右上角 **Fork**(把仓库复制到你的账号)
2. 在你的 fork 里,打开 `readme.md`,找 **Web Applications** 分类
3. 添加一行:
   ```
   - [CircleGen](https://pixelcircle.online) - Free Minecraft circle generator with block-by-block pixel blueprints in 11 languages.
   ```
4. 提交 commit(写:`Add CircleGen to Web Applications`),选 "start a pull request" 分支流程
5. 先创建了对**自己 fork** 的 PR(无意义),关闭后改用跨仓库 PR:
   - 到 `github.com/bs-community/awesome-minecraft` → Pull requests → New pull request → **compare across forks**
   - base:`bs-community/awesome-minecraft:master` ← compare:`ywb-coder:master`(或你的分支)
   - Create pull request → PR #66 ✅

⚠️ 注意:列表条目要求**英文描述**;若之后 fork 已落后上游,先同步再改动。

---

### 4.2 FREE FOR DEV(❌ 已核实:跳过)

**2026-08-13 核实结果:不匹配,不要提交。**
- 该清单只收"提供免费层级的 SaaS 服务"(面向 DevOps/基础设施开发者)
- 明确拒绝"通用工具箱网站——格式转换器、计算器等"
- 规则写明:未用 PR 模板或明显 AI 生成的提交,不做讨论直接关闭
- CircleGen 属于"通用免费网页工具",提交大概率被拒,还浪费 PR 名额

---

### 4.3 AlternativeTo(✅ 已核实)

**2026-08-13 核实结果:可提交。入口是软件详情页的 "Suggest alternative" 按钮(旧版直链已失效)。**

**操作:**
1. 注册:`alternativeto.net` → 右上角 **Sign in / Sign up**(免费,邮箱或 Google 登录)
2. 搜索 **"Plotz"**(或 "minecraft circle generator"),打开其详情页
3. 页面找到 **"Suggest alternative"** 按钮(未登录时显示 "Sign in to suggest alternatives")
4. 填写字段:
   - Name: `CircleGen`
   - Website: `https://pixelcircle.online`
   - Tagline: 短版文案
   - Description: 中版文案
   - License: Free
   - Platforms: Web
   - Categories/Tags: `minecraft`、`circle`、`blueprint`、`generator`
   - 可附 1 张截图
5. 提交,等审核(通常 1-7 天)

---

### 4.4 SaaSHub(✅ 已核实)

**2026-08-13 核实结果:可提交,免费,接受免费网页工具(榜单上有大量同类)。**

**操作:**
1. 打开 `saashub.com` → 注册(邮箱即可)
2. 进入 `saashub.com/submit` → 填:
   - Service name: `CircleGen`
   - Website: `https://pixelcircle.online`
   - One-line description: 短版文案
   - Long description: 中版文案
   - Logo: 用 `01-tool-main.png` 或 `og-image.png`
   - Categories / Pricing(Free) / Open source(是)
3. 提交并完成验证后,可在管理页的 **Submit 标签**把它发布到所有相关目录

---

### 4.5 Freesiteslike(⚠️ 已核实:疑似停摆)

**2026-08-13 核实结果:站点 TLS 证书失效、HTTP 返回主机商停放页,疑似已停止运营。**
- 建议跳过;若 2-4 周后站点恢复(可先用浏览器手动访问确认),再回来提交

---

### 4.6 FreeToolDirectory(⚠️ 已核实:当前无法访问)

**2026-08-13 核实结果:站点 TCP/HTTPS 全部超时,疑似宕机或地域封锁。**
- 建议跳过;可稍后手动在浏览器打开 `freetooldirectory.com` 确认是否恢复

---

### 4.7 Toolify(❌ 已核实:跳过)

**2026-08-13 核实结果:只收 AI 工具,且官方提交页当前显示 $99 一次性付费。**
- 不匹配也不免费,直接跳过

---

### 4.8 Product Hunt(单次最大曝光,值得认真做)

> 📦 **2026-08-14 发布包已备:`docs/producthunt-kit.md`** —— 所有表单字段(名称/Tagline/描述/话题/链接)均为最终文案,图片顺序、Upcoming 排期步骤、发布日 Playbook、首条评论模板、24h Update 模板全部就绪,照抄即可。

**准备(发布前 1 周):**
1. 注册/登录 `producthunt.com`(需 GitHub 或 Twitter 账号;用 GitHub 即可)
2. 按 `docs/producthunt-kit.md` 第 1 节填产品字段、传图库
3. 首次发布需要先提交 **Upcoming** 排期(选 1-2 周后的周二-周四,UTC 上午)

**发布日(选周二-周四,UTC 时间上午):**
1. 当天刷新产品页确认上线
2. **前 2 小时是黄金期**:发创始人首条评论(模板在 kit),准备 5-10 个朋友/社区支持者点 Upvote 并评论
3. 全程回复所有评论(越快越好)
4. 发布后 24 小时内在产品页发一条 Update 帖(感谢 + 使用技巧,模板在 kit)

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

### 4.10 PlanetMinecraft(✅ 已核实)

**2026-08-13 核实结果:可提交。新账号/低等级账号的发布走 Greenlight 审核系统——"低等级会员的资源包提交需经审核与批准",不是硬性天数冷却。注意等级限制:Lv5+ 才能创建 Jam;广告/付费链接需 Lv20+;账号须满 13 岁。**

**操作:**
1. 注册 `planetminecraft.com`(邮箱激活;建议先活跃 2-3 天:收藏、评论,积累等级)
2. 点 **Create → Resource/Project**(选"其他"类型)
3. 填:标题 `CircleGen - Free Minecraft Circle Generator`、简介(中版文案)、截图、链接、标签
4. 提交后进入审核队列,通过后公开
5. 发布后把链接加到你的 PMC 签名档

---

### 4.11 minecraftforum.net(⚠️ 已核实:站点有防护,注册后以实际提示为准)

**2026-08-13 核实结果:全站 Cloudflare 拦截,外部无法读取版规与新账号发帖限制。社区准则页地址为 `minecraftforum.net/community-standards/`,请注册登录后阅读。**

**操作:**
1. 注册 `minecraftforum.net`
2. 登录后先读 **community-standards**,确认新账号发帖门槛
3. 找 **Off Topic / Gaming / Tutorials** 板块(或"Free tools"类)
4. 发帖:标题 `[Free Tool] CircleGen – Minecraft circle/sphere/dome blueprint generator`,内容用中版文案 + 截图
5. 把链接放进**签名档**(论坛签名档是持续外链)

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

### 4.16 dev.to(✅ 已核实,第二轮首选)

**2026-08-13 核实:免费、dofollow(实测正文链接无 nofollow)、即时发布、无审核;工具帖生态好(有 #showdev 标签)。**

**操作:**
1. 注册:`dev.to` → /enter(邮箱或 GitHub 登录)
2. 写一篇干货文,标题建议:
   - `How I built a static Minecraft circle generator in 11 languages`
   - 或 `Free Minecraft circle generator: pixel-perfect blueprints for Java & Bedrock`
3. 结构建议:为什么做 → 数学原理(中点圆算法)→ 功能演示(贴截图/GIF)→ 用法 → 链接放正文叙述中(只甩一个链接的纯广告帖会被举报)
4. 标签:`showdev`、`minecraft`、`javascript`、`nextjs`
5. 发布后回复评论;可同时投稿到 dev.to 的 weekly digest

⚠️ 链接自然融入正文(比如"the tool is live at pixelcircle.online"),不要堆外链。

---

### 4.17 LiteDevelopers/awesome-minecraft(✅ 已核实)

**2026-08-13 核实:145★,最后推送 2026-07-17,有 `Software → Tools` 分类(已收 Blockbench),要求开源且免费(CircleGen MIT + 免费符合);合并节奏慢(现积压 4 个 PR),提交后耐心等。**

**操作:** 与 4.1 相同的 fork → 编辑 readme → 跨仓库 PR 流程:
1. fork `github.com/LiteDevelopers/awesome-minecraft`
2. 在 `Software → Tools(Miscellaneous tools)` 分类加:
   ```
   - [CircleGen](https://pixelcircle.online) - Free Minecraft circle generator with block-by-block pixel blueprints in 11 languages.
   ```
3. 跨仓库 PR 到 `LiteDevelopers:master`

---

### 4.18 itch.io /tools(✅ 已核实)

**2026-08-13 核实:免费发布 HTML5 网页工具,项目页外链 dofollow(实测)。**

**操作:**
1. 注册 `itch.io`
2. 右上角 **Upload new project** → 分类选 **Tools**,类型选 **HTML**(Play in browser)
3. 打包一个 HTML 入口页(或直接填 Website 链接指向 pixelcircle.online;若只填外链没有自托管文件,itch 可能要求可玩内容,可放一个 iframe 嵌入页面)
4. 填标题 `CircleGen - Minecraft Circle Generator`、描述(中版文案)、标签 minecraft/generator
5. 免费发布

---

### 4.19 ArkFlame/awesome-minecraft(✅ 已核实)

**2026-08-13 核实:25★,2026-06-18 更新;`Content Creation Tools → Data Packs Commands and Generators` 分类已收 misode/MCStacker/minecraft.tools 等网页工具。README 有完整 Contributing 规则(名称/规范 URL/一句话描述/分类/状态徽章/收录理由)。**

**操作:** fork → 按 CONTRIBUTING 加条目 → 跨仓库 PR。

---

### 4.20 CAIMEOX/awesome-minecraft-bedrock(✅ 已核实)

**2026-08-13 核实:74★,2026-02-28 更新;`Tool → General` 分类已收网站类工具;描述要求英文 ≤200 字符、不重复、分类正确。**

**操作:** fork → PR;CircleGen 支持 Bedrock,可写:
```
- [CircleGen](https://pixelcircle.online) - Free web-based Minecraft circle and shape generator with block blueprints, works on Bedrock.
```

---

### 4.21 Uneed(uneed.best)(✅ 已核实,注意域名!)

**2026-08-13 核实:uneed.io 已停运(域名在售);当前平台是 `uneed.best`。免费排队提交(付费可插队 $14.99-29.99),官方声明获 75DR 域 dofollow 外链。**

**操作:**
1. 打开 `uneed.best/submit-a-tool` → 注册
2. 提交工具信息(Name/URL/描述/分类 Free Tools)
3. 选免费排队("Join the line"),等排期发布
4. 发布后可分享投票链接积累支持

---

### 4.22 LibHunt(✅ 已核实)

**2026-08-13 核实:免费提交开源项目,`libhunt.com/repo/submit` 填 GitHub 仓库 URL;外链大部分 dofollow。**

**操作:**
1. 打开 `libhunt.com/repo/submit`
2. 填仓库 URL:`github.com/ywb-coder/Minecraft-Circle--Generator`
3. 提交,等待收录;可顺带在 `/t/minecraft` 相关标签下活跃

---

### 4.23 SideProjectors(✅ 已核实)

**2026-08-13 核实:免费展示提交,dofollow(实测 listing 无 nofollow),人工审核("All projects are reviewed")。**

**操作:**
1. 注册 `sideprojectors.com`
2. 提交项目:名称、描述(中版文案)、截图(`01-tool-main.png`)、链接
3. 等人工审核通过

---

### 4.24 Launching Next(✅ 已核实,待发布后自查)

**2026-08-13 核实:免费表单提交;多源标注 dofollow(未能直接抓 HTML 验证,发布后建议用外链检查工具确认)。**

**操作:** `launchingnext.com/submit/` → 填 Name/URL/Tagline/Description/Email → 提交。

---

### 4.25 10words(✅ 已核实)

**2026-08-13 核实:免费,提交只需 10 词简介;dofollow 未验证。**

**操作:** `app.10words.io/submit` → 填名称 + 10 词简介(如 "Free Minecraft circle generator with pixel-perfect block blueprints in 11 languages")。

---

### 4.26 Alternative.me(🟡 已核实)

**2026-08-13 核实:有 suggest 入口、免费、活跃;可将 CircleGen 作为 Plotz 的替代品提交。**

**操作:** `alternative.me` → 找 Plotz(或同类)→ Suggest → 填 CircleGen 信息。

---

### 4.27 minecrafttools.net(🟡 已核实,收录不确定)

**2026-08-13 核实:活跃 MC 工具聚合站(©2026),dofollow(实测首页无 nofollow);无提交表单,官方 FAQ 说通过 Discord 建议收录。**

**操作:** 加入其 Discord(`discord.gg/T6nyycywvY`)→ 在合适频道建议收录 CircleGen(附描述+截图);收录与否不确定,顺带在 Discord 混个脸熟。

---

### 4.28 Indie Hackers(⚠️ 已核实,仅作社区曝光)

**2026-08-13 核实:发布免费,但**新账号所有外链默认 nofollow**(官方 JS bundle 验证),需 500 积分才解锁 dofollow;适合当社区曝光渠道,不指望外链值。**

**操作:** 注册 → 发产品页/帖子("Show IH")→ 正常参与社区积累积分;外链 SEO 价值≈0,别浪费精力。

---

### 4.15 中文版文案模板(贴吧/网易用)

> 免费 MC 圆形生成器,支持 11 种语言(含简体中文):
> - 圆形/椭圆/球形/穹顶/圆弧/圆环/椭球,轮廓/图表/实心三种样式
> - 逐块像素蓝图,可直接照着搭;支持 3D 预览、建造顺序动画、逐层切片
> - 导出 PNG/SVG/CSV/JSON,复制 /setblock 命令(带世界坐标)
> - 45 种方块配色、免费、无需注册、纯静态、Java & Bedrock 通用
> 地址:https://pixelcircle.online

---

## 五、时间线(建议节奏,已按 2026-08-13 核实结果修订)

| 周 | 任务 |
|---|---|
| 第 1 周 | ✅ awesome-minecraft PR 已提交(#66)→ AlternativeTo / SaaSHub 提交(2 个确定可行) |
| 第 2 周 | **dev.to 干货文 + itch.io /tools 发布 + LiteDevelopers PR**(第二轮高性价比渠道)→ PH 排期 + HN 养 karma |
| 第 3 周 | PH 发布日 + HN Show HN + Uneed(uneed.best)/ LibHunt / SideProjectors 提交 + reddit 开始自然参与 |
| 第 4 周 | ArkFlame / CAIMEOX PR + Launching Next / 10words / Alternative.me + B站联系 + 复查停摆站 |
| 第 5 周起 | 每周 2-3 次社区参与;**GSC → 链接报告**看外链收录;评估是否启动博客 |

---

## 六、渠道核实记录(2026-08-13)

> 逐个核实后的结论,与追踪表一致。来源:官方页面/帮助文档为主,第三方交叉印证,无法确认的已标注。

### 第一轮(目录站)

| 渠道 | 核实结论 |
|---|---|
| awesome-minecraft | ✅ 可提交 → **已提交 PR #66**。仓库较休眠(上次合并约 1 年前),639 stars,保留等待 |
| FREE FOR DEV | ❌ 不匹配:只收 SaaS 免费层级,明确拒绝通用工具箱站,AI 文案 PR 直接关闭 |
| AlternativeTo | ✅ 可提交:软件详情页 "Suggest alternative" 按钮(旧直链失效),需注册,字段含 Name/URL/Tagline/Description/License/Platforms/分类/标签 |
| SaaSHub | ✅ 可提交:saashub.com/submit 免费,接受免费网页工具(榜单有大量同类) |
| Freesiteslike | ⚠️ 疑似停摆:TLS 证书失效、返回停放页,待确认 |
| FreeToolDirectory | ⚠️ 当前无法访问(超时),待确认 |
| Toolify | ❌ 只收 AI 工具,提交收费 $99 |
| Product Hunt | ✅ 可提交:需账号 + Upcoming 排期,发布日互动 |
| Hacker News | ✅ 可提交:Show HN 需先攒 10-20 karma |
| PlanetMinecraft | ✅ 可提交:新账号走 Greenlight 审核(资源发布需审批),Lv5+ 可建 Jam,广告链接需 Lv20+,须满 13 岁 |
| minecraftforum.net | ⚠️ 全站 Cloudflare 拦截,版规/发帖门槛需注册登录后确认(community-standards 页) |
| Reddit / Discord / 贴吧 / 网易 / B站 | 无需额外核实,按各平台版规操作(先读规则、不硬广) |

### 第二轮(创作者平台 + Minecraft 清单/工具目录)

| 渠道 | 核实结论 |
|---|---|
| **dev.to** | ✅ 免费、dofollow(实测正文无 nofollow)、即时发布;工具帖生态好(#showdev),推荐写成干货文 |
| **LiteDevelopers/awesome-minecraft** | ✅ 145★ 活跃(2026-07-17),有 Tools 分类,要求开源免费(符合),合并慢(积压 4 PR) |
| **ArkFlame/awesome-minecraft** | ✅ 25★(2026-06-18),Content Creation Tools 已收 misode/MCStacker 等,贡献规则完整 |
| **CAIMEOX/awesome-minecraft-bedrock** | ✅ 74★(2026-02-28),Tool→General 分类收网站工具,描述 ≤200 字符 |
| **itch.io /tools** | ✅ 免费发布 HTML5 工具,项目页外链 dofollow(实测) |
| **Uneed** | ✅ **域名是 uneed.best**(uneed.io 已停运在售);免费排队,官方声明 75DR dofollow |
| **LibHunt** | ✅ /repo/submit 免费,要求 GitHub 开源项目,外链大部分 dofollow |
| **SideProjectors** | ✅ 免费展示,dofollow(实测),人工审核 |
| **Launching Next** | ✅ 免费表单;dofollow 多源标注但未能直验,发布后自查 |
| **10words** | ✅ 免费,10 词简介;dofollow 未验证 |
| **Alternative.me** | ✅ suggest 入口免费,可把 CircleGen 作为 Plotz 替代品 |
| **minecrafttools.net** | ✅ dofollow(实测),但无表单,需进 Discord 建议,收录不确定 |
| **Indie Hackers** | ⚠️ 免费但新账号外链默认 **nofollow**(JS bundle 验证),需 500 积分解锁;仅作社区曝光 |
| **BetaList** | ❌ 无免费档(FAQ 原文 "All submissions are paid"),有预算再考虑 |
| **Lenny's 目录** | ❌ 无公开免费提交渠道 |
| **mcpedl** | ❌ 只收文件类资源(Mods/Maps/Skins),不收网页工具 |
| **awesome-gamedev / awesome-minecraft-server 系列 / 中文清单** | ❌ 不匹配或停更 |

---

## 七、红线(违反会前功尽弃)

1. **不买外链、不加入链接农场、不用 PBN**——Google 反外链操纵,新域名最容易中招
2. **不重复复制粘贴同一文案**(目录站可微调;reddit/论坛必须原创化)
3. **不同时用多个账号操作**——被识别为 spam 会波及主站
4. **所有社区先读版规再发**
5. **链接仅放你拥有权限的页面**(README、自己的资源页、允许的频道)
6. 每天控制节奏:目录站提交一天 2-3 个,社区参与一次即可

---

## 八、监控与验证

| 时间点 | 动作 |
|---|---|
| 每天 | `site:pixelcircle.online` 手动搜一次(GSC 收录前 Bing 通常先出) |
| 每周 | GSC → 概览:收录页面数变化 |
| 第 2-3 周 | GSC → 链接 → 外部链接:看外链域名数 |
| 第 3-4 周 | GSC → 效果:看是否出现展示(0 展示也正常,耐心) |
| 第 6 周 | 若展示仍为 0 → 检查 GSC 网页报告是否有 "已抓取-未编入索引" 及其原因 |

**收录检查工具**:GSC 网页报告(权威)、Google 搜索 `site:pixelcircle.online`、Bing 搜索 `site:pixelcircle.online`(Bing 收录更快,可作先行指标)。

---

## 九、常见问题

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
