# CircleGen（pixelcircle.online）全站 SEO 优化战略

> 版本：2026-10-26 · 搜霸霸 SEO 专家诊断
> 数据依据：`docs/gsc/gsc-20261024.md`（GSC 实时）+ `docs/ga/ga-20261024.md`（GA4 深度）+ 2026-10 竞品 SERP 巡检
> 前置文档：`docs/roadmap-20261024.md`（战术路线图）——本文是完整战略层，两者配合使用

---

## 0. 执行摘要

**一句话诊断**：技术底座与多语言矩阵已经建成且在起量（28 天点击 4.3×），当前流量瓶颈不在"缺页面"，而在 **① CTR 转化效率、② 索引覆盖率、③ 域名权威度** 三件事。

**增长引擎已验证**：近 28 天 143 点击 / 7,550 展示 / 平均排名 9.1，西语市场（/es/）以 33% 点击占比成为第一流量入口，AI 助手渠道占会话 8.1% 且质量全场最高。

**最高杠杆动作（按 ROI 排序）**：

| # | 动作 | 预估回报 | 投入 | 时间窗 |
|---|---|---|---|---|
| 1 | /es/ + 长尾语言 CTR 优化（title/description 已改版，待验证） | CTR 1.57%→3% ≈ **+43 点击/月** | 已完成 10/24 | 2 周见效 |
| 2 | 索引攻坚：346 精选页从 74 → 150+ | 内容资产变现的前提 | 中 | 2–6 周 |
| 3 | 西语内容扩产（ES 仅 4 篇 vs EN 6 篇） | 巩固第一市场 | 每篇 2–3h | 2–4 周 |
| 4 | 榜单型外链（"Best Minecraft circle generators" 类 listicle） | 高相关 dofollow + 精准推荐流量 | 每条 1–2h | 持续 |
| 5 | GEO：llms-full.txt 西语数据块 | AI 渠道（8.1% 会话）再放大 | 1h | 本周 |

**战略纪律（与 roadmap 一致，本专家确认）**：主打西语、不追英语 head 词、不开新语言、不买链、不慌索引、中文市场暂缓。

---

## 1. 数据基线（截至 2026-10-23 / 28 天窗口）

### 1.1 搜索表现

| 指标 | 9 月基线 | 10-24 现状 | 变化 | 11 月中目标 |
|---|---|---|---|---|
| 点击 | 33 | **143** | 4.3× | ≥170 |
| 展示 | 2,960 | **7,550** | 2.5× | ≥9,000 |
| CTR | ~1.1% | **1.9%** | +0.8pp | ≥2.5% |
| 平均排名 | ~35 | **9.1** | 进首页区间 | ≤8 |
| 索引页 | 75 | **74**（数据停 10-16） | 停滞 | ≥150 |

### 1.2 流量结构（GA4）

| 渠道 | 会话占比 | 互动质量 | 战略含义 |
|---|---|---|---|
| Organic Search | 60.6% | 页/会话 12.06 | 主基本盘 |
| Direct | 28.9% | 8.65 | 品牌回访+永久链分享，偏高需观察 |
| **AI Assistant** | **8.1%** | **页/会话 13.43（全场最高）** | GEO 渠道已跑通，值得追加投入 |
| Referral | 2.1% | 10.0 | 外链引荐，量小质高 |

### 1.3 市场结构——西语是主打，且优势在扩大

- 着陆页 TOP1：**/es/ 47 点击 / 2,995 展示 / 排名 7.6**（英语首页 10 点击 / 排名 17.3）
- 查询 TOP10 中 **7 个西语词**；头号词 `generador de circulos minecraft`（17 点击 / 971 展示）
- 国家维度：墨西哥 17 + 巴西 13 + 哥伦比亚 5 + 阿根廷 5 = **拉美 40 点击 > 美国 12**
- 美国展示最大（1,040）但 CTR 最差（1.2%）——英语 SERP 竞争烈度最高

---

## 2. 技术 SEO 审计结论

### 2.1 已达标（不需要再投入的资产）

| 项目 | 状态 | 评价 |
|---|---|---|
| 渲染方式 | Next.js 静态导出，3,177 个预渲染 HTML | ✅ 对爬虫最友好，零 JS 依赖可读 |
| URL 架构 | `/circle/15/`、`/es/circle/15/` 语义化层级 | ✅ 清晰、含关键词、可扩展 |
| hreflang | 11 语言互指 + `x-default`（`lib/config.ts` HREFLANG_MAP） | ✅ 严格执行 |
| Canonical | 每页自指 canonical | ✅ |
| JSON-LD | WebApplication / FAQPage / WebSite / Organization / Article | ✅ 覆盖主要页面类型 |
| Sitemap | 346 条精选 URL，带 image + hreflang alternates | ✅ 10-24 已提交并被 GSC 读取 |
| Robots | 全放行 + GPTBot / OAI-SearchBot / ChatGPT-User / PerplexityBot 显式声明 | ✅ GEO 前置就位 |
| llms.txt / llms-full.txt | 已上线，含尺寸-块数表 | ✅ AI 引用渠道已验证有效 |
| 精选/长尾分层 | 精选页可索引，其余 per-size 页 noindex（`isIndexableShapePath`） | ✅ 防止 3,100 页稀释抓取预算 |
| 图标/OG/manifest | favicon 全套 + og-image 1200×630 + webmanifest | ✅ |
| 页面性能 | 本地字体预载、无外部请求、纯静态 | ✅ CWV 预期良好（桌面用户 99.5%，符合受众） |
| GSC 站点验证 | google59dae63d03160853.html | ✅ |

### 2.2 待改进（按影响排序）

| # | 问题 | 影响 | 建议动作 | 优先级 |
|---|---|---|---|---|
| T1 | **索引率 74 / 346 精选 URL（21%）**，"已发现-尚未编入"约 3,100 | 内容资产无法参与排名 | 见第 6 节索引攻坚 | **P0** |
| T2 | 内链权重集中于首页，per-size 页与 blog 互链网络偏薄 | 长尾页排名起不来 | 每篇 blog 链 3–5 个相关 shape 页 + 对侧 shape 页互链 | P1 |
| T3 | 形状页 title 模板同质化（`Minecraft {d}x{d} {shape} — {blocks} bloques`） | 摘要点击率受限 | 在模板中加入差异化修饰词（"plantilla PNG / layer by layer"） | P1 |
| T4 | Blog 仅 EN 6 篇 + ES 4 篇，ES 缺 dome/tower 指南 | 西语内容簇不完整 | 按 EN 规范复刻缺失篇目 | P1 |
| T5 | 无 `Article`/`Breadcrumb` 作者实体（E-E-A-T） | 竞争性内容信号弱 | about 页补编辑/作者实体 + Article schema author 字段 | P2 |
| T6 | 英文首页 title 仍为品牌向（`Minecraft Circle Generator — Free Block Blueprints`） | 英语 head 词 CTR 1.3% | 保持不动为宜——英语 head 词策略是"不追"，title 品牌化符合现状 | P3（不动） |

> 注：robots.ts 与 E2E 用例的 GPTBot 断言不一致问题（10/24 日志已记录），当前 robots 实现已包含 AI agents，跑一次 `npm run test:e2e` 确认即可，非 SEO 风险。

---

## 3. 市场与关键词战略

### 3.1 市场分层（资源分配原则）

| 层级 | 市场 | 现状 | 战略 |
|---|---|---|---|
| **主打** | 西语（墨西哥/西班牙/哥伦比亚/阿根廷） | 33% 点击，排名 7.6 | **All-in**：内容 + CTR + GEO 三线加注 |
| **第二** | 俄语（/ru/ 20 点击，排名 7.7） | 起量中 | 维持现状，不加码（俄语 SEO 生态特殊） |
| **第三** | 葡语（巴西 13 点击）、意语、波兰语 | 有展示有点击，CTR 偏低 | 只做 title/desc 本地化微调 |
| **观察** | 英语（美国展示 1,040 / CTR 1.2%） | 排名 17.3 | 长尾 + 外链自然积累，不投 head 词 |
| **暂缓** | 中文（/zh/ 用户最浅：32 秒） | 社区生态封闭 | 每季度复查，不投入 |

### 3.2 关键词地图

**西语核心簇（主打，按优先级）**

| 关键词 | 量级信号 | 意图 | 落地页 | 动作 |
|---|---|---|---|---|
| generador de circulos minecraft | 971 展示/28天 | 交易型（工具） | /es/ | CTR 优化 ✅已完成，观察排名进前 5 |
| creador de circulos minecraft | 212 展示 | 交易型 | /es/ | 同页覆盖，desc 同义词轮换 |
| circulos en minecraft / circulos minecraft | 36+213 展示 | 信息型偏工具 | /es/ + ES blog | 内容承接 |
| como hacer un circulo en minecraft | 预判增量 | 信息型 | ES blog（需新建/强化） | **内容缺口** |
| plantilla circulos minecraft / plano circulo minecraft | 长尾 | 交易型 | /es/circle/{d}/ | 形状页 title 修饰词 |
| generador de esferas minecraft | 未覆盖 | 交易型 | /es/sphere/ | ES sphere 指南内链 |
| circulos minecraft 5x5 / 15x15 / 101x101 | per-size 长尾 | 交易型 | /es/circle/{d}/ | 精选页收录后放量 |

**英语簇（守长尾，不攻 head）**

| 关键词 | 策略 |
|---|---|
| minecraft circle generator | 不投资源。竞品 donatstudios / mcgic / plotz 多年霸位；靠品牌词+长尾+外链自然爬 |
| minecraft circle generator 101 / N×N | per-size 精选页承接（/circle/101/、/circle/15/ 等） |
| minecraft circle chart / pixel circle minecraft | blog 承接（minecraft-circle-sizes 已覆盖） |
| how to make a circle in minecraft | blog/minecraft-circle-guide 承接，补 PAA 问答块 |
| minecraft dome / sphere / oval / torus generator | 各形状首页承接 |

**新兴机会词（本轮竞品巡检发现）**

| 关键词类型 | 机会 | 动作 |
|---|---|---|
| `best minecraft circle generator` / `minecraft circle generator comparison` | 多个 2026 榜单页在排（itechguides、itechfaqs、androidexperto、umatechnology、freedom251 等），**CircleGen 均未入榜** | 以"免费开源 + 11 语言 + 3100 页 + 3D 预览 + PNG/SVG/CSV/JSON/setblock 多格式导出"为卖点投稿提名（见第 5 节） |
| `plotz alternative` / `donat studios alternative` | 竞品品牌词 | AlternativeTo/SaaSHub 补交 + 相关对比内容 |

### 3.3 竞争格局（2026-10 巡检）

**直接竞品**：mcgic.com（榜单常客 #1，功能面接近）、donatstudios.com（老牌，开源 MIT）、Plotz（3D 建模老牌）、minecraftcirclegenerators.net、minecraftmaps.com、mctoolbox.net

**CircleGen 差异化卖点（外链与内容弹药）**：

1. 形状覆盖最全之一：circle / oval / sphere / dome / arc / torus / ellipsoid × 3 种样式
2. 建造顺序动画 + 逐层切片（生存建造刚需）
3. 导出最全：PNG / SVG / CSV / JSON / 方块坐标 / `/setblock` 命令 / 分享链接
4. 11 语言 + 3,100+ 预渲染页（多语言竞品极少）
5. 免费、无账号、开源 MIT

**SERP 特征观察**：榜单类 listicle 站（含付费位）正在瓜分 "best/comparison" 型查询；传统蓝链之外，AI 概览/助手引用对工具类查询的分流在加大——GEO 与 listicle 入榜是两条对冲路径。

---

## 4. CTR 优化（最高杠杆，已启动）

### 4.1 已完成（2026-10-24）

- 本地化首页改用 `absolute` title，绕过 `%s | CircleGen` 模板，获得完整 ~60 字符空间
- ES：`Generador de Círculos Minecraft — Planos Gratis en PNG`（54 字符）+ desc 148 字符（gratis / sin registro / PNG / 5–256 bloques）
- PL / EN desc 同步重写

### 4.2 待办与验证

| 动作 | 详情 | 验证 |
|---|---|---|
| **A/B 观察窗** | 2 周后（11 月上旬）对比 GSC 效果报告 /es/ CTR | 目标 ≥2.5%（当前 1.57%） |
| it / pt / zh 首页 desc 差异化 | it 93 展示/5 点击、pt/zh 有展示低点击；补卖点词（gratis/senza registrazione/grátis 等） | 同窗口对比 |
| 形状页 title 模板升级 | 在 `perSize.title` 中加入意图词：ES「plantilla PNG」「paso a paso」；EN「block chart / layer by layer」 | 形状页 CTR 分组对比 |
| 描述中的数字钩子 | "5–256 bloques"「3100+ planos」等具体数字提高摘要吸引力 | — |
| Rich snippet 护城河 | FAQ schema 已有；确认形状页 FAQ 覆盖 PAA 高频问（"how many blocks is a 15 circle" 类） | Rich Results Test + SERP 截图 |

**纪律**：一次只改 title/desc 一个变量组，2 周窗口，用 GSC 效果报告对比，不凭感觉迭代。

---

## 5. 内容战略

### 5.1 西语内容扩产（P1，2–4 周）

ES 是最大单一市场但只有 4 篇文章。按 EN 已验证规范复刻（块数表与生成器核对 + FAQ + 2–3 篇互链 + 透明度声明）：

| 优先级 | 主题 | 对应 EN | 预估 |
|---|---|---|---|
| 1 | Guía de cúpulas Minecraft（dome guide） | minecraft-dome-guide | 2–3h |
| 2 | Guía de torres / construir torres circulares | minecraft-tower-guide | 2–3h |
| 3 | Cómo hacer un círculo en Minecraft（深度版 how-to） | 新题（PAA 覆盖） | 2–3h |
| 4 | Tamaños de círculos Minecraft（尺寸对照表强化） | minecraft-circle-sizes（已有，补数据表） | 1–2h |

### 5.2 内容簇与内链架构

```
支柱页（Pillar）
├── /es/                       ← generador de circulos minecraft
│   ├── /es/blog/como-hacer-circulos-minecraft
│   ├── /es/blog/medidas-circulos-minecraft     ← 尺寸长尾
│   ├── /es/blog/como-hacer-esfera-minecraft
│   ├── /es/blog/como-hacer-ovalo-minecraft
│   └── [新增] dome / tower / how-to 深度版
└── 形状精选页
    ├── /es/circle/{15,21,33,49,101}/
    ├── /es/sphere/{15,21,...}/
    └── ...
```

**内链规则**：每篇 blog 链向 3–5 个相关形状精选页（锚文本用自然语言）；形状页底部"相关尺寸/相关形状"模块互链；blog 彼此 2–3 条上下文互链。目标：消灭 0 内链孤儿页，使抓取深度 ≤3 次点击到达任意精选页。

### 5.3 E-E-A-T 增强（P2）

- about 页补"编辑方针 / 数据来源 / 最后更新日期"（`CONTENT_UPDATED` 已有，展示出来）
- Article JSON-LD 补 `author` 实体（CircleGen Team 或具名作者 + sameAs）
- 引用权威源（已引用 Wikipedia / Minecraft Wiki / Minecraft.net——保持并在新文章延续）

---

## 6. 权威度与外链战略

### 6.1 现状

已落地：dev.to 干货文（dofollow）、Product Hunt（ugc）、itch.io（nofollow 但有引荐）、LibHunt（dofollow）、SideProjectors（dofollow）、GitHub public + MIT、awesome-minecraft PR #66（待合并）、Launching Next（排队中）。**净外链约 7–8，目标 15+。**

### 6.2 新发现机会：榜单提名（本轮最高价值增量）

2026 年 "Best Minecraft circle generators / shape generators" 类榜单页活跃，且 **CircleGen 全部缺席**。这类页面排名好、意图匹配精准、通常提供提交入口：

| 目标 | URL | 切入点 | 预估价值 |
|---|---|---|---|
| iTechGuides "Best Minecraft Circle Generators" | itechguides.com/best/minecraft-circle-generators/ | 联系/提名入口，强调开源+多语言+多格式导出 | ★★★★ |
| iTechFAQs "Best Minecraft Shape Generators" | itechfaqs.com/best/minecraft-shape-generators | "Is your tool on this list?" 提交入口（明示可提报） | ★★★★ |
| AndroidExperto / UMA Technology / Freedom251 同源榜单 | 各 best/minecraft-shape-generators 页 | 批量提名，文案复用 | ★★★ |
| AlternativeTo | Plotz / Donat Studios 条目页 | "Suggest alternative" 补交（8 月因 Plotz 不在库受阻，改从 Donat Studios / mcgic 条目切入） | ★★★ |
| SaaSHub | saashub.com/submit | 重试注册（8 月 Error 4.22.2，换邮箱/网络） | ★★ |
| PlanetMinecraft 资源页 | planetminecraft.com | 注册走 Greenlight，发资源帖 | ★★★ |
| Hacker News "Show HN" | news.ycombinator.com | 先攒 karma，文案已备（`docs/backlink-campaign.md`） | ★★★★ |

**提名文案统一卖点**（复制即用）：

> CircleGen is a free, open-source (MIT) Minecraft circle/shape generator with pixel-perfect block blueprints, 3D preview, build-order animation, and PNG/SVG/CSV/JSON/setblock exports. 11 languages, 3,100+ pre-rendered size pages, no account required. https://pixelcircle.online

### 6.3 红线（不可妥协）

- ❌ 不买链、不做 PBN、不交换农场
- ❌ 不用自动化群发提交
- ✅ 每天限量 1–2 个渠道、先读版规、真实参与社区
- ✅ nofollow 链接仍要（引荐流量 + 品牌信号 + 收录发现）

---

## 7. GEO / AI 搜索优化（第二增长曲线）

AI Assistant 渠道 28 天 23 会话（8.1%），互动率 69.6%、页/会话 13.43——**质量全场最高**，ChatGPT 是绝对主力。

| 动作 | 详情 | 成本 | 优先级 |
|---|---|---|---|
| llms-full.txt 补西语尺寸-块数表 | 西语查询量最大，直接服务 AI 引用 | 1h | **P0（本周）** |
| llms.txt Key facts 增加 ES 段落 | 保持结构化、可被引用的短句事实 | 30min | P1 |
| FAQ 页面保持问答对格式（40–60 词答案） | 利于 AI 摘要引用 | 已有基础 | P1 |
| 监测 AI 引用 | 每月 GA4 侧记录 AI Assistant 会话；抽查 ChatGPT/Perplexity 中 "minecraft circle generator" 引用是否提及 CircleGen | 30min/月 | P1 |
| robots 维持 AI 爬虫放行 | GPTBot / OAI-SearchBot / ChatGPT-User / PerplexityBot 已显式 allow | ✅ 完成 | — |

### 7.1 GEO 实测诊断（2026-10-29，8 平台 × 20 题 = 160 次收录查询）

上表是「把 AI 可读的基础设施做好」，本节是「AI 到底有没有提到我们」。完整报告：`diag-output/CircleGen-GEO-诊断报告.html`。

**AIVO 总分 64 / 100（一般）** — 基建 86、权威度 42，中间 48 分的断层就是全部行动空间。

| 维度 | 分数 | 关键数据 |
|---|---|---|
| AI 搜索可见度 | **38** | 160 次查询仅被提及 41 次（提及率 0.256）= 竞品均值的 47% |
| 基建完善度 | **86** | llms.txt / llms-full.txt / JSON-LD / hreflang / 3,179 页矩阵全部到位 |
| 竞品对比优势 | **42** | 选型类问题提及率 < 15%，17 题中 **0 次**被列为首位 |
| 舆情健康度 | **90** | 负面率 0.0875——但这是**假性高分**，负面少是因为没人谈它 |

**诊断结论**：技术基建已经过关（Kimi/DeepSeek/智谱能准确说出「11 语言」「3,179 页」「MIT 开源」），但 AI 在选型题里只从高权重榜单站取数，而 7 大榜单站（iTechGuides、UMA、TechYorker、Position Is Everything、Everything Xiaomi、HowPremium、PCN Mobile）**100% 缺席**。

**与上文 6.2 节「榜单提名」的关系**：6.2 提出的榜单提名是本节诊断给出的**量化理由**——不再是「应该做」，而是「提及率 0.256 vs 目标 0.40，这是唯一杠杆」。

| 本次新增动作 | 文档 | 状态 |
|---|---|---|
| llms.txt / llms-full.txt 加入竞品差异矩阵 + 品牌混淆消歧 | — | ✅ 本次完成 |
| per-size 页 Dataset 结构化块数（JSON-LD） | — | ✅ 本次完成 |
| 榜单提报素材包（7 站通用 + 精确块数表） | `docs/listing-submission-kit.md` | ✅ 素材就绪，待提交 |
| 社区口碑内容包（5 篇实录 + 西语篇） | `docs/community-content-kit.md` | ✅ 草稿就绪，待发布 |
| .schem 导出 / 512 上限 / 预设模板 评估 | `docs/geo-p3-technical-assessment.md` | ✅ 评估完成 |
| 月度提及率复测 + 榜单巡检机制 | `docs/geo-monitoring-setup.md` | ✅ 已建立 |

**新发现的竞品情报**（此前 10-26 竞品文档未收录）：
- **Godlike.Host Circle Generator** — iTechGuides 9.7/10，8 款榜单全部 #1，支持 .schem 导出。2026 年 AI 权重上升最快的对手
- **pixelcirclegenerator.com** — 与本品牌名高度近似，已获三家榜单站独立评测页，AI 已出现同品类混淆推荐。其短板是**无 3D 预览**，正是我们的差异点

---

## 8. 索引攻坚（P0，最大隐忧）

**问题**：74 页已索引 / 346 条 sitemap 精选 URL / 3,181 总路由。sitemap 10-24 已提交成功，但覆盖数据停在 10-16，尚未反映。

**诊断假设与验证路径**：

| 假设 | 验证方法 | 若成立的动作 |
|---|---|---|
| H1：正常时滞（Google 尚未重抓） | 11 月中导出 Coverage 对比 | 等待，继续内容节奏 |
| H2："已发现-尚未编入"为主 = 质量信号不足 | Coverage 按原因拆分 | 给精选页补 3–5 条针对性外链 + 内链，而非全站撒网 |
| H3：精选页内容薄、与竞品比无优势 | 抽查 5 个未收录精选页 vs 竞品同尺寸页 | 补数据表、FAQ、建造示例，加厚内容 |
| H4：hreflang/语言版本稀释 | 检查同内容 11 语言是否被视为重复 | 确保每语言版本有本地化正文（不只翻译 UI） |

**纪律**：sitemap 刚提交 2 天，**现在不动索引相关配置**（不改 canonical、不改 noindex 策略、不批量求收录），11 月中看数再动。判断线：已编入 ≥150 为健康；若仍 ≤80，启动 H2/H3 动作。

---

## 9. 度量框架与检查点

### 9.1 KPI 看板（每月更新到 docs/gsc/）

| 指标 | 当前 | 11 月中 | 12 月底 | 2027 Q1 末 |
|---|---|---|---|---|
| GSC 28 天点击 | 143 | 170 | 250 | 400 |
| 全站 CTR | 1.9% | 2.5% | 2.8% | 3%+ |
| /es/ CTR | 1.57% | 2.5% | 3% | 3.5% |
| 平均排名 | 9.1 | 8 | 7 | ≤6 |
| 索引精选页 | 74 | 150 | 250 | 346（满编） |
| 外链（净） | ~8 | 12 | 15 | 20 |
| AI Assistant 会话/28天 | 23 | 30 | 45 | 60 |
| ES 文章数 | 4 | 6 | 8 | 8+ |

### 9.2 检查节奏

| 节奏 | 动作 |
|---|---|
| 每周 | GSC 效果报告（点击/展示/CTR/排名四曲线），`npm run serp` 抽查关键词位次 |
| 每两周 | 重大 title/desc 改动的 A/B 窗口复盘 |
| 每月 | AI 渠道趋势 + 外链净增 + Coverage 对比；更新本文件 KPI 表 |
| 11 月中 | **关键检查点**：索引数 + /es/ CTR 双达标判断 |
| 每季度 | 中文市场复查 + 全文战略校准（数据说话，不追沉没成本） |

---

## 10. 90 天执行路线图

### 第一阶段：本周（10/26–11/1）—— 低投入高回报

| # | 动作 | 产出 | 负责 |
|---|---|---|---|
| 1 | llms-full.txt 补西语尺寸-块数表 | commit | 开发 1h |
| 2 | it/pt/zh 首页 desc 差异化 | commit | 文案 1h |
| 3 | 榜单提名启动（iTechFAQs 有明确提交入口，先提 2 个） | 提交记录 | 运营 2h |
| 4 | /pt/ 异常数据甄别（GA4 按用户拆分） | 结论记录 | 5min |
| 5 | E2E robots 断言复核 | 测试通过 | 10min |

### 第二阶段：2–4 周（11 月）—— 加注赢家

| # | 动作 | 产出 |
|---|---|---|
| 6 | ES 内容扩产 ×2（dome guide + tower guide） | 2 篇上线 + 内链 |
| 7 | 形状页 title 模板升级（意图词） | commit + 2 周观察 |
| 8 | 索引观察窗口（11 月中 Coverage 导出） | 诊断结论 → 决定 H2/H3 |
| 9 | 外链冲刺：AlternativeTo/SaaSHub/PlanetMinecraft + 榜单提名续 | 净增 ≥3 |
| 10 | 内链网络补全（blog ↔ 形状页规则落地） | commit |

### 第三阶段：1–2 月 —— 并行轨

| # | 动作 | 产出 |
|---|---|---|
| 11 | ES how-to 深度文 + sizes 强化 | 2 篇 |
| 12 | AdSense 链路（独立工程，不阻塞 SEO） | CMP 选型 → 申请 |
| 13 | Show HN（karma 就绪后） | 品牌 + 外链 |
| 14 | E-E-A-T：作者实体 + Article schema 补全 | commit |
| 15 | 12 月复盘：KPI 表 vs 目标，校准 2027 Q1 战略 | 战略修订版 |

---

## 11. 明确不做清单

| 不做 | 原因 |
|---|---|
| 不追英语 head 词 `minecraft circle generator` | 面对多年老站正面竞争，性价比最低；长尾 + 多语已足够增长 |
| 不开新语言 | 11 语言已覆盖，先把 ES 吃透；其他语言页面在赚零头，无需追加 |
| 不做移动端专项优化 | 移动用户仅 1.5%，保持响应式可用即可 |
| 不买外链 / PBN / 链接农场 | 红线；一次作弊毁掉 2 个月自然积累 |
| 不批量改索引配置 | sitemap 10-24 才提交，Google 需要时间；11 月中用数据决策 |
| 中文市场不投入 | 生态封闭（贴吧/B站/网易），ROI 低于西语；季度复查 |
| 不做无数据支撑的"大改版" | 一切以 GSC/GA4 变化为迭代依据 |

---

## 附录 A：关键数据口径

- 查询级数据以 **GSC 界面**为准；用户行为以 **GA4** 为准（两者归因口径不同，差异已知）
- GA4 同意门控：未接受 cookie 的会话不计入 GA4，故 GA4 会话数低于真实访问
- SERP 排名快照（`npm run serp`）为外部估算，地面真值以 GSC 平均排名为准

## 附录 B：相关文档索引

| 文档 | 用途 |
|---|---|
| `docs/gsc/gsc-20261024.md` | GSC 第五轮全量分析 |
| `docs/ga/ga-20261024.md` | GA4 深度分析 |
| `docs/roadmap-20261024.md` | 三阶段战术路线图 |
| `docs/backlink-campaign.md` | 外链操作手册 + 文案库 |
| `docs/project-documentation.md` | 项目总档案 |
| 本文 `docs/seo-master-strategy-20261026.md` | 全站 SEO 战略（总纲） |
