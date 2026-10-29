# GEO 持续监控机制

> 建立日期：2026-10-29
> 基线：`docs/geo/baseline.json`（AIVO 64，整体提及率 0.256）
> 关联：`docs/listing-submission-kit.md`、`docs/community-content-kit.md`、`docs/geo-p3-technical-assessment.md`

---

## 为什么要监控

诊断结论是「基建 86、权威度 42」，行动项全部是外部动作（榜单提报、社区口碑）。**外部动作的唯一问题就是不知道有没有生效。**

传统 SEO 用 GSC 看排名，GEO 没有等价物 —— AI 不排名，它提及或不提及。所以必须自己定义指标并定期复测。

三条监控线：

| 线 | 频率 | 测什么 | 工具 |
|---|---|---|---|
| **A · AI 提及率** | 每月 | AI 是否开始推荐我们 | GEO 诊断技能（阶段 2） |
| **B · 榜单收录** | 每月 | 权威度来源是否建立 | 手工巡检 7 站 |
| **C · 搜索引擎表现** | 已有 | GSC / GA4 / SERP | 现有 `06-serp-check.js` + GSC 导出 |

C 线项目里已有成熟流程（`docs/gsc/` 归档到 2026-10-24），不重复建设。A、B 线是本次新增。

---

## A 线 · AI 提及率复测

### 方法

用 GEO 诊断技能（`geo-diag-report`）重跑一次，读取阶段 2 的 `aiSearch` 与 `geoEffect` 部分。

技能跑完会把结果合并成 JSON，从 `stages.AI_SEARCH.platformResults` 取每平台的 `mentioned` / `totalQueries`，从 `stages.GEO_EFFECT.overview` 取整体数据。

### 固定不变的测量条件

**复测必须与基线口径完全一致，否则数字不可比。**

| 条件 | 基线值 | 要求 |
|---|---|---|
| 平台数 | 8 | 必须全选，不能减 |
| 问题数 | 20 | 用同一批问题（技能阶段 1 生成的问题集） |
| 竞品集合 | 6 个 | Donat / Godlike / Plotz / Mcgic / BlockBlend / Pixel Circle Generator |
| 问题类型配比 | 4 组画像 × 5 题 | 保持 |

⚠️ **最容易犯的错**：这次复测时如果只跑了 4 个平台，得到的 0.35 和基线的 0.256 完全没有可比性 —— 因为 Kimi（0.35）和 Nami（0.15）本身就差 0.2。

### 更新基线

每次复测后，把新数据写回 `docs/geo/baseline.json`（保留 `notes` 说明本次变化原因），并在 `docs/geo/geo-log.md` 追加一行。

### 判读标准

| 变化 | 判读 | 动作 |
|---|---|---|
| ≥ +5pp | 有效，应继续加码 | 推进 P2 剩余项 |
| +2 ~ +5pp | 有效但偏弱 | 检查是哪类问题提升的，复制该打法 |
| ±2pp 内 | 正常波动 | 继续观察，不做判断 |
| ≤ -3pp | 警号 | 检查是否有负面舆情或竞品动作 |

**单次运行不作数。** AI 回答每次不同，平台间正常波动 ±8%。至少 4 次运行取趋势再下结论。

---

## B 线 · 榜单收录巡检

### 巡检清单

每月检查这 7 个站是否已有 CircleGen 的页面/条目：

| # | 站点 | 站点内搜索路径 | 收录形态 |
|---|---|---|---|
| 1 | iTechGuides | 站内搜 "CircleGen" / 搜 "pixelcircle.online" | 榜单条目 + 独立评测页 |
| 2 | UMA Technology | `umatechnology.org/best/minecraft-shape-generators/` | 榜单条目 |
| 3 | Position Is Everything | `positioniseverything.net/best/minecraft-circle-generators/` | 榜单条目 + 工具页 |
| 4 | Everything Xiaomi | `everythingxiaomi.com/best/minecraft-circle-generators/` | 榜单条目 |
| 5 | HowPremium | `howpremium.com/best/minecraft-circle-generators/` | 榜单条目 |
| 6 | PCN Mobile | `pcnmobile.com/best/minecraft-shape-generators/` | 榜单条目 |
| 7 | TechYorker | `techyorker.com/best/minecraft-circle-generators` | 榜单条目 + 产品页 |

同时检查 4 家工具目录站（它们不是排名站但会被 AI 引用）：
- positioniseverything.net/tools/circle-gen
- techyorker.com/products/circle-gen
- howpremium.com/tools/circle-gen
- pcnmobile.com/tools/circle-gen

### 巡检记录格式

追加到 `docs/geo/listing-tracking.md`：

```markdown
### 2026-11-26

| 站点 | 收录 | 评分/位置 | 备注 |
|---|---|---|---|
| iTechGuides | ✅ | #5, 8.1/10 | 10-20 提交，11-18 收录 |
| UMA Technology | ✅ | #7 | |
| Position Is Everything | ❌ | | 未找到 |
| Everything Xiaomi | ❌ | | |
| HowPremium | ❌ | | |
| PCN Mobile | ❌ | | |
| TechYorker | ❌ | | |
```

### 关键动作

**收录 ≠ 生效。** 每次新收录后 24 小时内必须：

1. 更新 `src/lib/geo-comparison.ts` 的 `CIRCLEGEN_SPEC`（若规格有变）
2. 检查 `src/app/llms.txt/route.ts` 的对比表是否需要同步
3. 在 `src/app/llms.txt/route.ts` 加「Coverage」区块，列出已收录的榜单站

第 3 条是给 AI 的「最佳答案形态」—— 用户问「有哪些榜单收录了 CircleGen」时，这一行可以直接被引用。

---

## C 线 · 既有流程（不重复建设）

项目已有：

- `scripts/e2e/06-serp-check.js` — 真实浏览器 SERP 排名检查，输出 `docs/gsc/serp-YYYYMMDD.csv`
- GSC / GA4 导出归档 `docs/gsc/`、`docs/ga/`
- 月度分析文档 `docs/gsc/gsc-20261024.md`

**C 线与 A 线的区别**：C 线看搜索引擎给不给位置，A 线看 AI 说不说我们。两者可能背离 —— 我们现在 GSC 平均排名 9.1（首页区间），但 AI 提及率只有 0.256。这正是「SEO 不错、GEO 不行」的典型形态，所以 A 线必须独立跟踪。

---

## 自动化脚本

`scripts/geo-monitor.js` 提供问题集管理与结果归档。

```bash
# 审计模式：开放式探测，输出 JSON + CSV
node scripts/geo-monitor.js

# 回归模式：固定 15 题，与基线对比
node scripts/geo-monitor.js --regression

# 指定平台
node scripts/geo-monitor.js --platforms=1,3,7
```

**重要说明**：该脚本的自动采集部分**故意留空**。8 个平台全部需要登录态才能返回回答，且都不提供匿名 API。写一个半成品采集器、静默返回空值，比明确留空更糟 —— 那会让数字看起来是真的。

实际用法：

1. 在已登录的浏览器里跑一次 GEO 诊断技能，把结果整理进 `docs/geo/baseline.json`
2. `geo-monitor.js` 负责：维护固定问题集、归档 JSON/CSV、与基线做差值对比、异常告警
3. 问题集的**内容**归你维护，脚本只管格式与对比

---

## 排期

| 时间 | 动作 | 产出 |
|---|---|---|
| 每周 | 巡检 B 线（7 站 + 4 目录站） | `listing-tracking.md` 追加一行 |
| 每月 | 重跑 A 线诊断（8 平台 × 20 题） | 更新 `baseline.json` + `geo-log.md` |
| 每月 | C 线 GSC/GA4 导出 | 沿用现有流程 |
| 每季度 | 整体复盘：重跑完整 AIVO 诊断 | 更新 AIVO 总分 |

### 关键检查点

| 日期 | 检查什么 |
|---|---|
| 2026-11-26 | 榜单提报是否被收录（iTechGuides 优先） |
| 2026-11-26 | A 线首次复测 —— 收录是否转化为提及率 |
| 2026-12-24 | 社区内容是否产生可引用语料（Kimi/DeepSeek 是否提及品牌体验） |
| 2027-01-26 | AIVO 总分是否从 63 提升到 72+ |

---

## 判读陷阱

### 1. 不要用单次结果下结论

AI 回答是非确定性的。同一问题两次回答可能提到不同工具。**至少 4 次运行取趋势。**

### 2. 不要在改了问题集之后对比基线

问题集变了就不是同一个实验。改了就要重建基线，并在 `notes` 里写明原因。

### 3. 不要把「被提及」等同于「被推荐」

提及率 0.4 里可能大部分是「CircleGen 是个工具」的顺带一提。真正有价值的信号是：
- **位列首位**的次数（基线：0/17）
- **在对比类问题中与竞品并列出现**（说明进入了候选集）

`geo-monitor.js` 的 `ourPosition` 字段就是为这个准备的。

### 4. 收录后 2 周内提及率没涨，是正常的

榜单收录 → AI 重新抓取 → 更新回答索引，这个链路通常有 2-6 周延迟。**2 周没动静不要慌，6 周再看趋势。**

### 5. 竞品在动，我们要跟

Godlike.Host 现在 8 款榜单全 #1。如果它新增功能或拿到更多收录，我们的相对分会被稀释。**B 线巡检要同时看竞品的排名变化，不只是看自己在不在。**
