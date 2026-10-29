# 技术评估：.schem 导出 / 512 方块上限 / 建筑预设模板

> 日期：2026-10-29 · 为 CircleGen（pixelcircle.online）产出
> 关联：`geo-diag-report` AIVO 诊断（总分 64）、`keyword-research-competitor-analysis-20261026.md`
> 目的：量化 P3 三项技术工作的真实成本与收益，供决策排序

---

## 摘要

| 项目 | 结论 | 成本 | 预期可见性收益 | 建议 |
|---|---|---|---|---|
| **512 方块上限** | ✅ 2D 零成本，3D 需分层策略 | 2-3 天 | +3（补齐榜单扣分项） | **立即做**，先只放 2D |
| **.schem 导出** | ✅ 零新依赖可行 | 5-7 天 | +5（对打 Godlike 9.7 / Mcgic 8.2） | **立即做**，最高 ROI |
| **建筑预设模板** | ⚠️ 工程量大，但可复用现有引擎 | 8-12 天 | +2（Plotz 短板） | P3，先验证需求 |

**一句话**：512 上限是配置改动（当天可上），.schem 是纯增量功能（无架构风险），预设模板是唯一需要产品决策的。三项都不需要推翻现有架构。

---

## 一、512 方块上限

### 背景

竞品 Godlike.Host 与 Mcgic 均支持 512 方块，CircleGen 停在 256。榜单站（iTechGuides 等）在「Largest size」这一评分维度上会直接标记 CircleGen 为 256 而非 512，属于**确定性扣分**——AI 引用该评分时会把这条差异一并带出。

### 实测数据

压测脚本：`src/lib/shapes/bench512.probe.test.ts`（引擎已内置 512 性能预算测试，见 `bench.test.ts`）

| 形状 | 尺寸 | 耗时 | 规模 | 判定 |
|---|---|---|---|---|
| circle outline | 512 | **0.55ms** | 1,624 块 / 511×511 bbox | ✅ 毫无压力 |
| circle filled | 512 | **9.07ms** | 205,581 块 | ✅ 可接受 |
| dome | 512 | **65.87ms** | 257 层 / 323,261 块 | ✅ 可接受 |
| ellipsoid | 512×384×256 | **59.15ms** | 257 层 / 321,074 块 | ✅ 可接受 |
| sphere | 512 | **188.21ms** | 513 层 / 644,914 块 | ⚠️ 移动端有风险 |

对照当前上限（256）：circle 256 outline = 816 个点 / 255×255 bbox，512 恰好翻倍（1,624 点 / 511×511）。

### 结论

**引擎完全支持 512，瓶颈不在几何计算，在渲染与导出体积。**

关键洞察：outline 模式的 2D 网格点数只与直径成正比（512 是 256 的 2 倍，不是 4 倍），因为环形只画边界不填充面积。SVG 用单 `<path>` 渲染（见 `_seo/blueprint.tsx` 的 `buildPathData`），体积同样线性。**所以 2D 放开到 512 是安全的。**

真正的风险在三处：
1. **sphere 512 的 188ms** —— 移动端中低端机可能掉帧。需按现有 `layered` 采样逻辑（`shape.layers.length <= 24` 时全展示，否则抽样）扩展。
2. **/setblock 命令导出体积** —— sphere 512 是 644,914 块，命令文本约 40MB+，浏览器内存与下载体验会崩。必须在导出前给出体积警告。
3. **filled 模式 205,581 块** —— SVG path 节点数巨大，DOM 会卡。

### 实施建议（分两步）

**第一步（当天）**：只放开 2D 形状（circle / oval / arc）到 512。

改动点：
- `src/app/_seo/shape-page.tsx` 的 `RANGES.circle.max`：`256` → `512`
- `src/lib/seo.ts` 的 `circleDiameters = oddRange(5, 255)` → 需拆分：可索引精选页保持现有范围，工具页放开到 511
- 工具页 UI 的直径输入上限

风险：低。引擎无需改动。

**第二步（后续）**：3D 形状分层放开。
- sphere/dome 上限提到 256→384（sphere 384 实测约 105ms，比 512 安全）
- 加体积守卫：导出前若块数 > 50,000 则提示用户分批导出
- `LayerGrid` 已有 >64 宽自动降级为「Ø N」显示的逻辑，512 场景可直接复用

### 决策点

- **是否要做预渲染页？** 现在有 3,179 页预渲染。加 512 尺寸页会让页面数翻倍（~6,400 页），构建时间已经偏长（本次构建 > 45 分钟）。建议：**512 尺寸只做工具页，不做预渲染页**，保持 per-size 矩阵在 256 以内。这既拿到「支持 512」的事实，又不拖垮构建。

---

## 二、.schem / WorldEdit 导出

### 背景

这是**当前 ROI 最高的一项**。Godlike.Host（8 款榜单全 #1，iTechGuides 9.7/10）与 Mcgic（8.2/10）都在「WorldEdit / .schem export」这一维度拿到满分/加分，CircleGen 在该维度是「No」。榜单评分是 AI 生成选型推荐时的高权重输入——补上这一项，等于直接进入 AI 的推荐候选集。

### 技术可行性

`.schem` 文件格式 = **gzip 压缩的 NBT 标签格式**（Minecraft 1.13+ WorldEdit schematic v2）。

**关键结论：零新依赖可实现。**

| 需要的能力 | 方案 | 是否需要新依赖 |
|---|---|---|
| NBT 标签序列化 | 手写（约 200-300 行）：TAG_End/Byte/Short/Int/Long/Float/Double/String/List/Compound/IntArray | ❌ 不需要 |
| gzip 压缩 | 浏览器原生 `CompressionStream("gzip")` | ❌ 不需要 |
| 方块状态序列化 | 需 palette 索引 + `BlockState` 字符串 | ❌ 不需要 |
| 容器打包 | `DataView` + `Uint8Array` | ❌ 不需要 |

浏览器支持：`CompressionStream` 已获 Chrome 80+ / Safari 16.4+ / Firefox 113+ 全面支持，覆盖率远超 AI 爬虫与目标用户群体。

> ⚠️ 注意：`CompressionStream("gzip")` 产生的是 gzip 容器（带 header），与 `zlib` 格式不同。WorldEdit 读取的是 gzip，可直接用。若某些工具期望 raw deflate，可用 `CompressionStream("deflate-raw")`。

### 现有代码可复用度

`src/lib/export.ts`（134 行）已经是干净的纯函数层：
- `toSVG(points, color, cell)` — SVG 导出
- `pointsToCSV(points)` — CSV 导出
- `pointsToJSON(points, meta)` — JSON 导出
- `setblockText(points, cx, cy, cz, layerZ, blockId)` — 命令导出
- `downloadText(filename, text, mime)` / `downloadBlob(filename, blob)` — 下载层

**所有导出都基于 `points: Point[]` 这一统一抽象。** 3D 形状的各层通过 `shape.layers[i].points` 拿到。.schem 导出只需新增一个 `toSchem(shape, origin, blockId)` 函数，与现有导出并列，不触碰任何现有逻辑。

### 实施难点与对策

| 难点 | 说明 | 对策 |
|---|---|---|
| 3D 坐标映射 | `Point` 是 2D 的，z 来自 `layer.z` | 遍历 layers，逐层用 `layer.z` 写入 NBT 坐标 |
| 方块状态 | .schem 需 `BlockState` 名如 `minecraft:stone` | 复用现有 `blocks.ts` 的 45 方块色板 |
| 调色板索引 | .schem v2 用 palette + 索引存储 | 收集唯一方块 → 建索引表 → 写 IntArray |
| 体积 | sphere 512 = 644,914 块 | 加体积守卫（>50,000 提示分批），palette 已大幅压缩重复方块 |
| 异步 | `CompressionStream` 是流式 API | 包成 `async` 函数，`await new Response(stream).arrayBuffer()` |

### 工作量拆解

| 任务 | 预计 | 备注 |
|---|---|---|
| NBT 写入器（手写） | 1.5 天 | 核心，需仔细处理 tag type 与 payload |
| .schem v2 结构组装 | 1 天 | palette + block data + metadata |
| 体积守卫 + 降级提示 | 0.5 天 | 复用现有 modal 组件 |
| UI 按钮 + 导出菜单 | 0.5 天 | 加进 `CircleTool` 导出区 |
| 单元测试 | 1 天 | NBT 结构断言 + gzip 可解压校验 |
| E2E 验证 | 1 天 | 导出文件用 WorldEdit 实测加载 |
| **合计** | **5.5 天** | |

### 建议

**做。** 理由：
1. 零架构风险，不动现有代码
2. 直接补齐 AI 引用榜单评分时的确定性扣分项
3. 差异化可被 AI 明确表述：「CircleGen 支持 .schem 导出」是可被引用的客观事实

附加价值：`.schem` 导出后，CircleGen 的产物能直接进 WorldEdit/MCEdit 生态，从「查图纸的工具」变成「进建造流程的工具」。

---

## 三、建筑预设模板

### 背景

智谱清言在对比回答中点名了 CircleGen 的一项短板：「Plotz 支持巫师塔、灯塔、雪人等完整预设生态与逐层滑块，而 CircleGen 虽功能密度更高但缺少现成建筑预设模板」。

这是 AI 主动提出的**具体功能缺口**，说明它已进入对比模型的视野范围。但对比中同时指出 CircleGen「功能密度更高」，说明这不是致命短板。

### 工程量评估

预设不是新功能，而是**已有引擎的组合调用**。核心几何全部现成：

| 预设 | 组成 | 复用现有引擎 | 额外工作 |
|---|---|---|---|
| 巫师塔 | 圆柱塔身 + 圆锥屋顶 + 附属小塔 | cylinder（circle 多层堆叠）+ cone | 中等，需新增 cone |
| 灯塔 | 圆柱 + 顶部灯室 + 栏杆 | circle + cylinder | 较小 |
| 雪人 | 堆叠球体（3 球递减） | sphere | 小 |
| 圆形竞技场 | 环形墙 + 看台分层 | torus + circle | 中等 |
| 花园池塘 | 不规则圆（多层偏移圆叠加） | circle 多层偏移 | 中等 |

真正的新增只有 **cone（圆锥）** —— 目前 `src/lib/shapes/` 有 circle/oval/sphere/dome/arc/torus/ellipsoid，没有 cone。

工作量：
- cone 几何引擎：1 天
- 预设数据结构 + 组合逻辑：2 天
- 每个预设 3D 预览 + 分层展示：2 天
- 逐层建造引导接入 Builder Mode：1 天
- 4 个预设 × 内容页 + 多语言：2-3 天
- **合计：8-12 天**

### 收益评估

- 可见性收益：约 **+2 分**（对打 Plotz 的单项短板，不改变整体竞争格局）
- 转化收益：不确定。预设是「一键出图」，但 CircleGen 的核心用户是**要控制细节的高级玩家**，预设可能不是他们的真实需求

### 建议

**先验证需求，不急着做。**

三个理由：
1. 可见性收益只有 +2，是三项里最低的
2. 8-12 天投入比 .schem（5.5 天 / +5 分）差一倍
3. 预设是「广度」型功能，而 CircleGen 的护城河是「深度」（精确块数 + 11 语言 + 内容矩阵）。加预设不加深护城河

**如果要做，先做 2 个验证性预设**（雪人 + 灯塔，各 1-2 天），看用户是否真的用。花园池塘与竞技场等用户反馈再定。

**替代方案**：在 /blog 里写一篇「如何用 CircleGen 搭巫师塔」的图文教程 —— 成本 0.5 天，能让 AI 检索到「CircleGen + wizard tower」的关联，弥补没有预设的短板，且不引入新代码。

---

## 四、优先级建议

### 立即执行（本周）

| # | 事项 | 理由 |
|---|---|---|
| 1 | **512 上限仅 2D 形状** | 引擎零改动，当天可上，直接补齐 Largest size 维度 |
| 2 | **.schem 导出启动** | ROI 最高，零依赖，无架构风险 |
| 3 | **「如何用 CircleGen 搭巫师塔」教程** | 0.5 天成本对冲 Plotz 短板，性价比高于做预设功能 |

### 排期

```
第 1 周    512 上限（2D）上线 → 更新 llms.txt 对比表
第 1-2 周  .schem 导出开发（NBT 写入器 → 格式组装 → UI）
第 2 周    .schem 上线 → 更新 llms.txt + /about 对比表
第 3 周+   视数据决定是否做预设功能
```

### 每次上线后必做

改动的功能要同步进三个地方，否则 AI 读到的仍是旧事实：
1. `src/lib/geo-comparison.ts` 的 `CIRCLEGEN_SPEC`（对比表数据源）
2. `src/app/llms.txt/route.ts` 与 `llms-full.txt/route.ts`
3. `/about` 与首页的 ComparisonSection（自动读取同一数据源）

**这一步是本次诊断的核心结论落地**：对比数据只维护一处，避免像散落的文案那样逐渐失真。

---

## 五、附：压测数据留存

`src/lib/shapes/bench512.probe.test.ts` 为本次新增的探针测试，保留在仓库中作为后续性能回归基线。如不想长期维护，可删除——引擎自带的 `bench.test.ts` 已覆盖 512 性能预算。

实测原始输出：

```
circle 512 outline: 0.55ms, blocks=1624
circle 512 filled: 9.07ms, blocks=205581
sphere 512: 188.21ms, layers=513, total=644914
dome 512: 65.87ms, layers=257, total=323261
ellipsoid 512x384x256: 59.15ms, layers=257, total=321074
circle 256: points=816, bbox=255x255
circle 512: points=1624, bbox=511x511
```
