# CircleGen 项目全量文档（截至 2026-10-24）

> 本文档是 pixelcircle.online（CircleGen）的完整项目档案：做了什么、没做什么、
> 网站是什么、SEO 进展到哪一步、外链情况、SEO 相关数据。
> 数据来源：仓库内 `docs/gsc/`、`docs/ga/`、`docs/backlink-campaign.md`、
> `docs/adsense-preparation.md`、git 提交历史与本次线上实测。
>
> 最后更新：2026-10-24（内容批次上线后，commit `033eed6`；同日浏览器实时拉取
> GSC+GA4 数据，见 `docs/gsc/gsc-20261024.md`）

---

## 一、网站是什么

**CircleGen** 是一个免费、开源、纯静态的 Minecraft 图形蓝图生成器。

- **域名**：https://pixelcircle.online
- **GitHub**：https://github.com/ywb-coder/Minecraft-Circle--Generator（MIT 协议，已公开）
- **一句话定位**：输入直径/尺寸，输出可以照着造的逐块像素蓝图（pixel-perfect block
  blueprint），支持 Java 版和基岩版。
- **上线日期**：2026-08-13（`LAUNCH_DATE`）
- **部署**：Vercel（Git push 自动部署），输出是纯静态 HTML（`next build` 产物 `out/`）
- **无后端、无账号、无运行时依赖**：所有几何计算在浏览器本地完成

### 支持的图形（7 种 × 3 种样式）

| 图形 | 参数 | 样式 |
|---|---|---|
| 圆形 circle | 直径（3–512） | outline（像素环）/ chart（经典图表）/ filled（实心） |
| 椭圆 oval | 宽 × 高（奇数对，12 组预设） | 同上 |
| 球体 sphere | 直径（5–127） | 分层切片 |
| 穹顶 dome | 直径（5–127） | 分层切片 |
| 圆弧 arc | 角度/半径 | 蓝图 |
| 圆环 torus | 直径 × 管径（12 组预设） | 分层切片 |
| 椭球 ellipsoid | 宽 × 高 × 深（12 组预设） | 分层切片 |

### 核心功能

- 交互式蓝图网格：坐标、每行方块数、缩放
- 等距 3D 预览（拖拽旋转）
- 建造顺序动画（Builder mode：Next/Prev/自动播放逐步放置）
- 球体/穹顶/圆环/椭球逐层切片视图
- 45 色方块调色板
- 导出：PNG、SVG、CSV、JSON；复制方块坐标；复制 `/setblock` 命令（带世界坐标）
- 分享链接（URL state 持久化）
- 轮廓厚度 1–6、内圆挖空（空心环）
- 11 种语言界面

### 技术栈

| 层 | 选型 |
|---|---|
| 框架 | Next.js 16.3（App Router，静态导出） |
| UI | React 19、Tailwind CSS 4（自研 "Blueprint Night" 像素风设计系统） |
| 语言 | TypeScript 5 |
| 测试 | Vitest 4（单元）、Playwright（E2E/SEO/性能） |
| 部署 | Vercel 静态托管 |
| 字体 | 本地像素字体（Press Start 2P / VT323 / Inter），无外部请求 |
| 分析 | GA4（G-ED1D95CXQV），接受同意后才加载 |

### 代码结构（关键文件）

```
src/lib/shapes/        几何引擎（circle/oval/sphere/dome/torus/ellipsoid + bench）
src/lib/seo.ts         可索引路径白名单、hreflang、直径数组、OVAL/TORUS/ELLIPSOID 预设
src/lib/shape-notes.ts 29 个可索引形状页的 EN/ES 专属简介
src/lib/consent.ts     一方同意状态（localStorage）
src/app/sitemap.ts     站点地图（346 URL）
src/app/llms.txt       AI 引擎可读站点摘要
src/app/llms-full.txt  完整版（含全部尺寸块数表）
src/app/_seo/          页面壳、JSON-LD、尺寸指南模板
src/components/        HomePage、ConsentGate、SiteFooter、ArticleMeta 等
docs/gsc/              GSC 导出与 SERP 跟踪数据（原始归档）
docs/ga/               GA 导出数据（按日期归档）
docs/backlink-campaign.md   外链操作手册 + 提交追踪表
docs/adsense-preparation.md AdSense 准备清单
```

---

## 二、站点结构与规模

### 页面总量

- **构建产出**：3,181 个静态页面（`npm run build`）
- **站点地图**：**346** 个 URL（2026-10-23 起；此前为 3,166 全量）
- **语言**：11 种 —— en（默认，根路径）、de、es、fr、pt、tr、it、ru、pl、id、zh

### URL 类型

| 类型 | 示例 | 数量 | 索引策略 |
|---|---|---|---|
| 形状页（全量） | `/circle/15/`、`/de/sphere/21/`、`/es/oval/21/9/` | ~3,100（11 语言） | **仅 29 条精选路径可索引**，其余 `noindex, follow` |
| 精选形状页（可索引） | `/circle/7|9|11|15|21|25|31|33|41|49|51|65|101/` 等 | 29 × 11 语言 = 319 | index + 12 hreflang |
| 本地化首页 | `/`、`/es/`、`/zh/`… | 11 | index |
| 信任页 | `/about/` `/contact/` `/privacy/` `/terms/` | 4 | index |
| 博客索引 | `/blog/`、`/es/blog/` | 2 | index |
| 文章 | 见下节 | 10 | index |
| 其他 | robots.txt、sitemap.xml、llms.txt、llms-full.txt、Google 站点验证 | — | — |

29 条可索引形状路径的构成：
圆 13（7/9/11/15/21/25/31/33/41/49/51/65/101）+
球 5（15/21/31/51/101）+ 穹顶 3（15/21/31）+
椭圆 4（15×7/21×9/31×15/41×21）+ 圆环 2（21×4/33×6）+
椭球 2（15×11×7/21×15×9）= 29。

### 技术 SEO（已全部实现）

- canonical：每个可索引页面指向自身绝对 URL
- hreflang：可索引形状页 12 个互链（11 语言 + x-default）；`noindex` 页不输出 hreflang
- sitemap：只含 346 条可索引 URL，附图片扩展（`image:image`）
- robots.txt：全放行 + 指向 sitemap
- JSON-LD：WebApplication、WebSite、Organization、FAQPage、BlogPosting、BreadcrumbList
- llms.txt / llms-full.txt：面向 AI 引擎的站点摘要（含全部尺寸块数）
- 图片：静态形状 PNG（`/shape-pngs/`），alt 文案区分"生成图而非游戏截图"
- CSP：`vercel.json` 配置（尚不含 AdSense 域名）
- 内链：全站实测 0 断链（3,177 个 HTML、3,185 条唯一内链）
- 干净构建：`tsc` 通过、lint 0 错误（28 个既有 `<img>` 警告）、70 个单元测试通过

---

## 三、内容资产（做了什么）

### 文章（10 篇，全部带作者/日期、BlogPosting + BreadcrumbList、FAQ）

| # | 语言 | 路径 | 主题 | 发布/更新 |
|---|---|---|---|---|
| 1 | EN | `/blog/minecraft-circle-guide/` | 圆形建造总指南（奇偶直径、步骤、球/穹顶） | 2026-09-10 / 10-21 |
| 2 | EN | `/blog/minecraft-circle-sizes/` | 尺寸选择表（块数、用途） | 2026-09-10 / 10-21 |
| 3 | EN | `/blog/minecraft-sphere-guide/` | 球体逐层建造 | 2026-10-21 |
| 4 | EN | `/blog/minecraft-dome-guide/` | 穹顶建造 | 2026-10-21 |
| 5 | EN | `/blog/minecraft-oval-guide/` | 椭圆蓝图（42/62/90/122 块表） | 2026-10-23 |
| 6 | EN | `/blog/minecraft-tower-guide/` | 塔楼直径选择（9–51 外壳块数表） | 2026-10-23 |
| 7 | ES | `/es/blog/como-hacer-circulos-minecraft/` | 圆形建造（西语） | 2026-10-21 |
| 8 | ES | `/es/blog/como-hacer-esfera-minecraft/` | 球体逐层（西语） | 2026-10-21 |
| 9 | ES | `/es/blog/medidas-circulos-minecraft/` | 尺寸表（西语） | 2026-10-21 |
| 10 | ES | `/es/blog/como-hacer-ovalo-minecraft/` | 椭圆建造（西语） | 2026-10-23 |

文章规范：真实建造问题 → 块数数学（与生成器输出核对）→ 生成图（注明非游戏截图）
→ 相关工具/文章互链（2–3 篇）→ 3 条 FAQ（可见文本与 FAQPage JSON-LD 一致）→
"本文如何写成"透明度声明（不虚构游戏实测）。

### 形状页专属简介（29 × EN/ES = 58 条）

`src/lib/shape-notes.ts`：每个可索引形状页两句话、35–70 词的尺寸专属导语
（如"15 塔基/喷泉/小广场；注意墙厚"），渲染在描述与"打开工具"按钮之间；
其他语言沿用原有本地化通用文案。全部 58 条已验证渲染。

### 信任与合规

- `SiteFooter`：全站统一页脚（品牌、导航、更新日期、联系邮箱、Product Hunt 徽章）
- `/about/`：独立开发者定位 + 编辑标准（算法来源、计数核对方式、纠错渠道）
- `/contact/`：直接邮箱 ywbiong@gmail.com + GitHub Issues + 提交缺陷指引
- `/privacy/`：本地处理、托管日志、同意门控 GA4、cookie、EEA/UK 权利、儿童、无广告现状
- `/terms/`：使用条款
- **同意门控**：一方 ConsentGate（非 Google 认证 CMP），GA4 仅在用户接受后加载，
  撤回时清除 GA cookie；11 语言文案；页脚可重新打开设置
- GA4 不再无条件加载；Plausible 已移除；CSP 同步移除 plausible 域名

### llms / GEO

- `llms.txt`：关键事实（各直径块数）、特性、页面、指南、语言列表
- `llms-full.txt`：含全部尺寸（5–255）块数表，供 AI 引擎引用
- 文案策略：只承诺 "free tool"，不写 "no ads"（为未来接入广告留后路，
  见 `docs/backlink-campaign.md` 第十节）

---

## 四、SEO 做到什么地步（现状 + 数据）

### 4.1 索引进度（GSC Coverage，`docs/gsc/gsc-20260922-coverage/`）

| 日期 | 已编入索引 | 已发现未编入 | 展示/日 |
|---|---|---|---|
| 2026-08-14 | 1 | 3,160 | 61 |
| 2026-08-15 | 4 | 3,159 | 63 |
| 2026-08-18 | 33 | 3,132 | 68 |
| 2026-08-22 | 70 | 3,099 | 75 |
| 2026-08-29 | 73 | 3,096 | **171（峰值）** |
| 2026-09-05 | 74 | 3,098 | 78 |
| 2026-09-15 | **75** | 3,097 | 108 |
| 2026-09-18（当时最后导出） | 75 | 3,097 | 103 |
| 2026-10-24（浏览器实时读取，覆盖数据截至 10-16） | 74 | 3,100（5 原因） | — |

最近一次 Coverage（2026-10-24 读取）明细：
已编入索引 74；未编入索引 3,100；抓取错误 0，技术侧无问题。

✅ 2026-10-24 实时核实：**新版 346 条 sitemap 已在 GSC 提交成功，当天被读取**
（旧文档中"尚未提交"的记录已过期）。覆盖数据仍停留在 10-16 旧口径（74/3,100），
新 sitemap 效果需 2–4 周后导出对比。完整分析见 `docs/gsc/gsc-20261024.md`。

### 4.2 搜索表现（GSC 四轮对比，`docs/gsc/README.md`）

| 指标 | 8/14 | 8/21 | 8/24 | 8/26 | 9 月中（0825–0921 窗口） |
|---|---|---|---|---|---|
| 展示 | 80 | ~385 | 594 | 748 | 窗口内 2,960（着陆页级） |
| 点击 | 0 | 11 | 15 | 15 | 窗口内 33 |
| 关联查询 | 29 | 78 | 113 | 133 | 346（查询级行数） |
| 有数据页面 | 1 | 3 | 21 | 37 | 74 |
| 平均排名 | 53.7 | ~55 | 45.8 | 35（8/23） | — |

- **移动端突破**：0 展示 → 8/21 首次点击 → 8/26 移动平均排名 10.21（桌面 52.8）
- **head 词**：`minecraft circle generator` 8/14 实测 58 位（远好于预估 150–400），
  8/21 产生 5 次点击（CTR 20.8%）；0825–0921 窗口 3 点击/149 展示/平均 56.5
- **沙盒判断**：新域名 2–8 周延迟排名；已观察到"可发现→回撤→爬升"完整周期

### 4.2.1 第五轮对比（2026-10-24 实时拉取，近 28 天 9/24–10/23）

| 指标 | 9 月中（0825–0921） | 10-24（近 28 天） | 变化 |
|---|---|---|---|
| 点击 | 33 | **143** | 4.3× |
| 展示 | 2,960 | **7,550** | 2.5× |
| CTR | ~1.1% | **1.9%** | +0.8pp |
| 平均排名 | ~35 | **9.1** | 进入首页 |

**结构性转变：西语成为第一流量来源**（详见 `docs/gsc/gsc-20261024.md`）：
- 头号查询 `generador de circulos minecraft`（17 点击/971 展示）；TOP10 查询 7 个西语
- /es/ 首页 47 点击/2,995 展示，全站第一着陆页，是英语首页（10 点击）的 4.7 倍
- 国家 TOP：墨西哥 17、巴西 13，均超美国（12 点击/1,040 展示）
- 英语 head 词仍未破：96 展示/1 点击，10 名开外

### 4.3 关键排名（0825–0921，GA × Search Console，`docs/ga/ga-20260922/`）

着陆页级（总 74 页有数据，33 点击 / 2,960 展示）：

| 着陆页 | 点击 | 展示 | 平均排名 |
|---|---|---|---|
| `/` | 13 | 1,087 | 47.5 |
| `/circle/33/` | 5 | 135 | **7.7** |
| `/ru/` | 4 | 207 | 10.7 |
| `/dome/15/` | 2 | 12 | **5.25** |
| `/it/` | 2 | 66 | 12.0 |
| `/sphere/21/` | 1 | 8 | **7.0** |
| `/es/sphere/15/` | 1 | 6 | **7.7** |
| `/de/oval/101/51/` | 1 | 5 | 18.2 |
| `/es/oval/101/51/` | 1 | 14 | 13.8 |
| `/blog/minecraft-circle-guide/` | 0 | 165 | 22.8 |

查询级（Google 隐私阈值导致部分查询不可见，总量小于着陆页级）：

| 查询 | 点击 | 展示 | 排名 |
|---|---|---|---|
| minecraft circle generator | 3 | 149 | 56.5 |
| circle temple minecraft | 1 | 2 | 8.0 |
| generatore di cerchi minecraft | 1 | 1 | 11.0 |
| генератор кругов майнкрафт | 1 | 6 | 14.3 |
| купол майнкрафт сайт | 1 | 4 | **4.5** |
| 15 block circle minecraft | 0 | 16 | **5.9** |
| 21 block circle minecraft | 0 | 12 | 8.7 |
| 21 block diameter circle minecraft | 0 | 6 | 7.3 |
| 101 circle minecraft | 0 | 2 | 7.5 |

**解读**：head 词仍在 45–57 位（英语主战场竞争激烈）；长尾词（逐尺寸、
逐语言）已大量进入第 1 页（5–9 位）；非英语词（意/俄/土/德/西）表现显著优于英语。
**当前瓶颈是 CTR 与排名爬升，不是曝光。**

### 4.4 本地化首页排名（8/24–8/26 实测，`docs/gsc/README.md`）

| 页面 | 8/24 排名 | 8/26 排名 | 展示 |
|---|---|---|---|
| `/it/` | 3.0 | 3.46 | 26 |
| `/pt/` | 4.17 | 4.31 | 16 |
| `/zh/` | 5.0 | 5.5 | 18 |
| `/tr/` | 7.86 | 8.13 | 23 |
| `/ru/` | 12.65 | 10.06 | 33 |
| `/pl/` | 11.67 | 11.69 | 26 |

11 语言策略已兑现：7 个本地化首页进入前 2 页，多在第 1 页。
非英语查询示例：`minecraft cerchi`（意，8.67）、`minecraft yuvarlak`（土，10.17）。
图片结果曾占点击 91%（8/15–8/18），图片 SEO 是有效入口。

### 4.5 流量（GA4，`docs/ga/`）

会话增长：8/31 导出 42 → 9/2 导出 68 → 9/10 导出 105 → 9/22 导出 **165**。

**0825–0921 窗口（165 会话）渠道构成：**

| 渠道 | 会话 | 感兴趣占比 | 平均互动时长 |
|---|---|---|---|
| Direct | 86 | 57% | 14.5s |
| **Organic Search** | 68 | **75%** | **58.8s** |
| Referral | 4 | 50% | 26.5s |
| Unassigned | 4 | 0% | 22.8s |
| AI Assistant | 3 | 100% | **268s** |

**国家分布（30 国）**：US 50、CN 24、DE 6、RU 5、HK 4、IN 4、BR 3、TR 3…
城市前列：Council Bluffs（GA 服务器）、深圳 8、纽约 4、法兰克福 3、莫斯科 3。

**关键信号**：自然搜索用户互动时长 58.8s、75% 为感兴趣会话——真实用户留得住；
AI Assistant 渠道（Copilot 等）3 会话但互动 268s，llms.txt 策略开始起量。

### 4.5.1 GA4 第五轮（2026-10-24 实时拉取，过去 28 天 9/26–10/23）

总量：**204 活跃用户 / 284 会话 / 2,374 浏览 / 3,161 事件 / 11.13 页每会话 /
1 分 43 秒平均会话时长**（同比前 30 天：用户 +58.3%、浏览 +122.1%、事件 +107.3%）。

| 渠道 | 会话 | 占比 | 互动率 | 平均互动时长 | 页/会话 |
|---|---|---|---|---|---|
| Organic Search | 172 | 60.6% | 66.3% | 1:33 | 12.06 |
| Direct | 82 | 28.9% | 62.2% | 0:35 | 8.65 |
| **AI Assistant** | **23** | **8.1%** | 69.6% | 1:11 | 13.43 |
| Referral | 6 | 2.1% | 83.3% | 1:11 | 10.0 |
| Organic Social | 1 | 0.4% | 100% | 0:00 | 8.0 |

- **AI Assistant 从 3 会话涨到 23 会话（7.7×）**，且互动率/页会话全场最高——GEO 策略兑现。
- 自然搜索着陆页：131 点击 / 7,106 展示 / 1.84% CTR / 平均排名 8.96；
  /es/ 占 32.8%、/ru/ 15.3%、英语首页 / 排名 17.3 明显落后。
- GA4 热门页（浏览量）：EN 843 / ES 569 / RU 375 / PT 174 / ZH 117 / TR 76。
- 同意门控导致 GA4 会话数低于真实量：/it/、/pl/ 等页"有点击无用户"属预期。
- **GA4 深度画像（10-24，`docs/ga/ga-20261024.md`）**：国家 TOP 美国 45/墨西哥 16/巴西 15
  （美国用户互动最短 55s，巴西 7:12 最长）；六大语言首页占 96.7% 浏览量；
  桌面用户 99.5%（移动仅 1.5%）；**事件仅 7 个且全为自动事件——产品漏斗零埋点**
  （建议补 generate_blueprint/download_png/copy_setblock 等 5 个自定义事件）；
  站内搜索 25% 用户使用；chatgpt.com 是 AI 引流绝对主力（17 首次互动用户）。

### 4.6 SERP 手动跟踪

- 跟踪脚本：`npm run serp`（6 关键词 + 竞品明细 + site: 探针 + `--deep` 深扫）
- 快照：`docs/gsc/serp-2026081*.csv`（8/14–8/19）
- 里程碑：8/18 `minecraft circle generator 101` 的 SERP 实体从首页切换为
  专属页 `/circle/101/`（收录 1 天即入 SERP）；site: 池 8/19 增至 6 页
  （en/pl/zh 首页 + sphere/101 + circle/101 + ru sphere/101）
- 注：Google 对数据中心 IP 弹验证码时自动回退 Bing，数据仅供参考

---

## 五、外链情况（完整清单）

目标：4–8 周内 15–30 个高质量外链。截至本文档，**已生效 7 个渠道**
（8 个在线入口，itch.io 含项目页 + 社区帖），其余为排队/跳过/未执行。

### 已生效（在线验证过）

| # | 渠道 | 链接 | rel | 上线时间 | 备注 |
|---|---|---|---|---|---|
| 1 | dev.to 干货文 | [article](https://dev.to/ywbcoder/how-i-built-a-free-minecraft-circle-generator-with-3100-pre-rendered-pages-2cai) | **dofollow** | 2026-08-14 | 正文 2 处链接；showdev/minecraft/javascript/nextjs |
| 2 | LibHunt | [项目页](https://libhunt.com/r/Minecraft-Circle--Generator) | **dofollow** | 2026-08-14 | 自动批准，2 处链接 |
| 3 | SideProjectors | [listing](https://www.sideprojectors.com/project/88943) | **dofollow** | 2026-08-15 | 人工审核通过；ComingUp 联动 |
| 4 | GitHub 仓库 | [repo](https://github.com/ywb-coder/Minecraft-Circle--Generator) | dofollow | 2026-08-14 | public + MIT，About 指向官网 |
| 5 | itch.io 项目页 | [project](https://ywb-coder.itch.io/circlegen-minecraft-circle-generator) | nofollow（平台自动） | 2026-08-14 | Tools 分类，HTML iframe 嵌入本工具 |
| 6 | itch.io 社区帖 | [announcement](https://itch.io/t/6790276/circlegen-free-minecraft-circle-generator-with-pixel-perfect-block-blueprints) | nofollow | 2026-08-14 | Release Announcements 板块 |
| 7 | Product Hunt | [launch](https://www.producthunt.com/products/circlegen?launch=circlegen) | **rel=ugc**（≈nofollow） | 2026-08-20 | 价值=引荐流量+品牌信号+收录发现，非权重 |
| 8 | 站内入口 | Product Hunt 徽章（全站页脚） | ugc | 2026-08-20 | 品牌曝光 |

### 排队中

| 渠道 | 状态 |
|---|---|
| awesome-minecraft PR #66（bs-community，639 stars） | 已提交 2026-08-13，**未合并**（仓库休眠，上次合并 1 年前）；2–3 个月后可礼貌跟进 |
| Launching Next | 免费队列 In Queue（官方预估 4 个月）；$99 Fast-Track 未购 |

### 明确跳过（核实后）

| 渠道 | 原因 |
|---|---|
| FREE FOR DEV | 只收 SaaS 免费层级，明确拒绝通用工具箱站 |
| Toolify | 只收 AI 工具，提交费 $99 |
| BetaList | 全部付费 |
| mcpedl | 只收文件类资源 |
| Uneed（uneed.best） | 免费提交后仍需付费才发布 |
| LiteDevelopers / ArkFlame / CAIMEOX 三个 awesome PR | 用户 8/14 决定不做 PR 类渠道；PR 文案备料在 `docs/awesome-lists-prs.md` |
| Freesiteslike / FreeToolDirectory | 站点停摆/无法访问 |
| Indie Hackers | 新账号外链 nofollow（需 500 积分），仅当曝光 |

### 暂缓 / 未执行（人工社媒渠道，需账号操作）

| 渠道 | 状态 |
|---|---|
| AlternativeTo / SaaSHub | 8/14 暂缓（Plotz 无 Suggest 入口 / 注册被 IP 拦截），待补 |
| Hacker News Show HN | 待攒 10–20 karma（文案已备） |
| PlanetMinecraft / minecraftforum.net | 待注册 + Greenlight/Cloudflare 流程（步骤已写好） |
| Reddit / Discord | 待自然参与（红线：不硬广、不重复发链接） |
| 贴吧 / 网易论坛 / B 站 up 主合作 | 中文流量渠道，待执行（文案模板已备） |
| 10words / Alternative.me / minecrafttools.net | 待执行，低优先 |

### 外链红线（纪律，见 `docs/backlink-campaign.md` 第七节）

不买外链、不进链接农场/PBN、不同文案重复粘贴、不搞多账号互顶、
每天限量（目录站 2–3、社区 1）、所有社区先读版规。

---

## 六、没做什么（明确的未完成项）

### A. AdSense 变现（最大待办，`docs/adsense-preparation.md`）

1. **无 Google 认证 CMP**——当前是一方同意门控（只管 GA），不满足 EEA/UK/瑞士
   广告同意要求；需要选认证 CMP（Google 自家或 Cookiebot/Osano 等）并重做同意流程
2. **无 AdSense 账号 / pub ID**——`public/ads.txt` 不存在（线上 404），
   CSP 未加 AdSense 域名，页面无广告脚本
3. 隐私政策需在接入广告后补充广告伙伴/数据传输说明
4. 申请主体需 18+、真实地址与税务信息（站主侧）
5. 广告位规划（不遮挡工具主体）尚未实施

### B. SEO 后续

1. ~~未在 GSC 重新提交新站点地图~~ ✅ **已完成**（2026-10-24 核实：346 URL 已提交、
   当天读取成功；覆盖数据仍停 10-16，待 2–4 周后导出对比）
2. ~~GSC 数据停在 2026-09-22 导出~~ ✅ **已解决**（2026-10-24 浏览器实时拉取，
   见 `docs/gsc/gsc-20261024.md`：近 28 天 143 点击/7,550 展示/排名 9.1）
3. head 词 `minecraft circle generator` 仍在 10 名开外（96 展示/1 点击），英语市场未破
4. CTR 优化未做完：/es/ 2,995 展示仅 1.57% CTR（最高杠杆项）；it/zh/pt 有展示无点击
5. 站点仅 74/3,181 页被索引（10-16 口径），新 sitemap 效果待验证
6. 未做：视频内容、结构化数据扩展（HowTo 等）、Core Web Vitals 移动专项审计

### C. 内容

1. 俄语（RU）内容策略**明确延后**：先做 1 篇测试文再决定翻译全集
2. 作者信号弱：文章署名为品牌 `CircleGen`（诚实但不如真人作者），
   未使用真名/头像/履历（需站主决定是否公开）
3. 除 EN/ES 外的 9 种语言没有文章（只有工具页/形状页）

### D. 外链

1. 只完成 7 个渠道（目标 15–30），PR 类渠道用户已决定不做
2. HN/Reddit/PlanetMinecraft/中文社区等社媒渠道未执行（人工耗时）
3. awesome-minecraft PR #66 未合并

### E. 工程

1. E2E 套件（Playwright，含 SEO/性能/UX 5 组脚本）存在但只手动跑，
   未接入 CI
2. bench 性能门限在高负载下偶发抖动（已加预热缓解，仍是发布门禁）
3. 无自动化监控（排名/宕机/索引变化需手动导出）

---

## 七、验证命令与当前基线

```powershell
npm run lint        # 0 errors, 28 warnings（均为既有 <img>）
npx tsc --noEmit    # 通过
npm test            # 70 passed（Vitest）
npm run build       # 3,181 static pages
npm run serp        # SERP 跟踪快照
npm run test:e2e    # Playwright E2E
```

线上实测（2026-10-24，commit `033eed6` 已部署）：

- sitemap 346/346 URL 返回 200，canonical 全部正确，无 noindex 混入
- 3 篇新文章 JSON-LD（FAQPage/BlogPosting/BreadcrumbList）有效
- `/sphere/33/`（非精选页）200 + noindex + 无 hreflang
- `/circle/15/`、`/zh/circle/15/` 各 12 个 hreflang
- 首页不提前加载 GTM；CSP 无 Plausible；`ads.txt` 404（预期，尚未接入）
- 内链爬取 3,185 条唯一链接，0 断链

---

## 八、时间线（里程碑）

| 日期 | 事件 |
|---|---|
| 2026-08-13 | 站点上线（LAUNCH_DATE）；外链手册完成；awesome-minecraft PR #66 提交 |
| 2026-08-14 | dev.to 文章、itch.io、LibHunt 发布；GitHub 转 public + MIT |
| 2026-08-15 | SideProjectors 上线 |
| 2026-08-17 | 首批 GSC 真值：80 展示、head 词实测 58 位 |
| 2026-08-18 | `minecraft circle generator 101` SERP 切换至专属页；Coverage 首次导出 |
| 2026-08-20 | **Product Hunt 发布**（rel=ugc） |
| 2026-08-21 | 首次点击（11 次）；形状页排名 13–14；移动端突破 |
| 2026-08-24 | 本地化首页集体进前 2 页（it 3.0 / pt 4.17 / zh 5.0） |
| 2026-08-26 | GA4 部署；平均排名 5 天内 53→35；CTR 成新瓶颈 |
| 2026-08-29 | 展示峰值 171/日 |
| 2026-09-10 | 首批 2 篇 EN 博客 + 博客索引上线 |
| 2026-09-22 | 最后一次数据导出：165 会话、75 页索引 |
| 2026-10-21 | ES 增长包（2 篇 ES 文）+ 文章元数据/JSON-LD 全面补齐 |
| 2026-10-23 | **内容批次**：7 篇文章、58 条形状简介、consent/trust、精选索引、sitemap 346 |
| 2026-10-24 | 部署验证通过（commit `033eed6`）；浏览器接管实时拉取 GSC+GA4 全量数据 |

---

## 九、下一步建议（按优先级，2026-10-24 数据刷新后）

1. ~~GSC 重新提交新站点地图~~ ✅ 已完成（10-24 核实，当天读取成功）
2. **/es/ CTR 优化（新最高杠杆）**：2,995 展示 × 1.57% CTR，目标 3%+；
   同步 it/zh/pt 有展示无点击页面的 title/description 差异化
3. **西语内容扩产（新增）**：ES 已成最大单一市场（点击超美国 4 倍），
   现仅 4 篇 ES 文章，按 EN 的 7 篇结构补齐
4. **AdSense 链路**：选定认证 CMP → 重做同意流程 → 申请账号 → 拿 pub ID →
   ads.txt + CSP → 隐私政策补广告章节 → 提交站点审核
5. **2–4 周后复查索引**：GSC Coverage 导出对比 346 sitemap 提交效果，
   若"已发现-尚未编入"不降，给精选页补针对性外链
6. **AI 渠道专项（新增）**：AI Assistant 已达 8.1% 会话且质量最高，
   每月记录趋势；扩充 llms-full.txt 的西语尺寸块数表
7. **外链续作**：AlternativeTo/SaaSHub 补交、HN Show HN（攒 karma 后）、
   PlanetMinecraft、Reddit 自然参与、B 站 up 主合作
8. **内容续作**：观察 7 篇新文 2–4 周表现 → 决定 EN 继续扩量 / RU 试水
9. **作者信号**：站主决定是否公开真名 + 简介（提升 E-E-A-T）
10. **监控**：每周 GSC 导出对比；每月外链体检（GSC 链接报告）

---

## 十、数据文件索引

| 目录 | 内容 |
|---|---|
| `docs/gsc/gsc-2026*/` | GSC 效果/覆盖原始导出（CSV） |
| `docs/gsc/pixelcircle.online-*.zip` | GSC 官方 zip 归档（8/14–9/22） |
| `docs/gsc/serp-*.csv` | SERP 排名/竞品/探针快照 |
| `docs/gsc/README.md` | GSC 数据解读（四轮完整分析） |
| `docs/gsc/gsc-20261024.md` | **GSC+GA4 第五轮实时分析**（浏览器拉取，西语崛起） |
| `docs/ga/ga-2026*/` | GA 导出（流量/渠道/国家/查询/着陆页） |
| `docs/ga/ga-20261024.md` | **GA4 深度分析**（国家/页面/技术/事件/留存，浏览器拉取） |
| `docs/backlink-campaign.md` | 外链手册 + 29 渠道追踪表 + 文案模板 |
| `docs/awesome-lists-prs.md` | 3 个 awesome PR 备料（已决定不做） |
| `docs/producthunt-kit.md` | PH 发布全套材料 |
| `docs/devto-article.md` | dev.to 文章底稿 |
| `docs/adsense-preparation.md` | AdSense 准备清单 |
| `docs/assets/campaign/` | 截图/GIF/社交图素材 |
