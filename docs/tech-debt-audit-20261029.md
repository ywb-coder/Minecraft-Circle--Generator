# 技术债体检报告

> 日期：2026-10-29 · 范围：`E:/myselfProject/mc` 工作区
> 方法：静态导出产物与源码目录比对 + git 跟踪状态核查
> 结论：**1 项待你确认，其余已在上次会话处理完毕**

---

## 一、结论速览

| 项目 | 状态 | 风险 | 建议 |
|---|---|---|---|
| `circle-generator/.next-corrupted-1026` | ✅ 已清理 | — | 无需处理 |
| `circle-generator/.next-old-1026-b` | ✅ 已清理 | — | 无需处理 |
| `circle-generator/out-old-1026` | ⚠️ 仍在磁盘 | 低 | 可删，git 已忽略 |
| `mc/_wb_build_trash/` | ⚠️ 仍在磁盘 | 低 | **待你确认后清理** |
| `circle-generator/out/` | ✅ 构建产物 | — | 每次构建覆盖 |
| `circle-generator/.next/` | ✅ 构建缓存 | — | 每次构建覆盖 |

---

## 二、`_wb_build_trash/` — 唯一待处理项

### 性质确认

```
_wb_build_trash/
├── out_pre_gf/          46 个顶层条目
├── out_pre_refactor/    46 个顶层条目
├── out_trash/           46 个顶层条目
└── out_webpack_verified/ 46 个顶层条目
```

**核查结果**：
- ❌ 非 git 仓库
- ❌ 无 `.ts` / `.tsx` / `.md` 源文件（纯 HTML/JS/CSS 构建产物）
- ❌ 不在任何 `.gitignore` 覆盖范围内（`circle-generator/.gitignore` 只对 `circle-generator/` 子目录生效）

四个子目录是同一站点在不同时间点的静态导出快照（`out_pre_gf` = GraphFonts 改造前，`out_pre_refactor` = 重构前，`out_trash` = 废弃版，`out_webpack_verified` = webpack 验证版）。

### 风险评估

| 维度 | 评估 |
|---|---|
| 代码风险 | 无 —— 不含源码，删除不影响任何功能 |
| Git 风险 | 无 —— 非 git 仓库，不在版本控制内 |
| SEO 风险 | 无 —— 未部署到线上（Vercel 从 git 仓库构建，不读本地目录） |
| 磁盘占用 | 约 50,000 文件，数百 MB |
| 唯一顾虑 | 如果这些快照有作为「历史对照」的价值（比如回滚参考），删了就找不回来 |

### 建议

**删除。** 理由：这些是同一份代码的 4 个历史构建快照，git 里已有全部源码，任何时候都能重新构建出来。留着只是占空间，且未来某次 AI 爬虫误扫工作区时可能把过期页面当成正式内容索引（这正是 `.gitignore` 里那段注释提到的问题 —— Tailwind 自动源检测会扫到它们拖慢构建）。

**如果你想先备份**，可以只留一份：

```bash
# 方案 A：全删
rm -rf "E:/myselfProject/mc/_wb_build_trash"

# 方案 B：只留一份最新的，其余删除
mv "E:/myselfProject/mc/_wb_build_trash/out_webpack_verified" "E:/myselfProject/mc/_backup_build"
rm -rf "E:/myselfProject/mc/_wb_build_trash"
```

> ⚠️ 这是不可逆操作，需要你确认后我才执行。

### 顺带建议

在 `E:/myselfProject/mc/` 加一个根级 `.gitignore`，避免将来再产生同类残留：

```gitignore
# 构建产物快照
/_wb_build_trash/
/*-old-*/
/*-corrupted-*/
```

---

## 三、已处理项（本次核查确认）

### `.next-corrupted-1026` 与 `.next-old-1026-b`

两个目录**已不存在**，是上次会话清理掉的。

`circle-generator/.gitignore` 里已有对应规则：

```gitignore
# stale build / export snapshots. These are not matched by the rules above and
# would otherwise be committed AND scanned by Tailwind's automatic source
# detection (which slows every `next build` down considerably).
/.next-*/
/out-*/
```

这段注释本身就说明了当时的判断依据 —— 不是「占空间」这么简单，而是 Tailwind 的自动源检测会扫描它们，**显著拖慢每次 `next build`**。考虑到本项目单次构建要生成 3,200+ 页，这个影响是实打实的。

### `out-old-1026`

仍在磁盘但已被 `.gitignore` 的 `/out-*/` 规则覆盖，`git status` 完全干净。保留无风险，但因为和即将重新生成的 `out/` 内容重复，可顺手删除。

---

## 四、构建产物健康度核查

### `out/` 目录（正式构建产物）

```
out/llms.txt        4,037 B   ← AI 抓取入口
out/llms-full.txt              ← AI 全量抓取入口
out/index.html
3,207 个 .html 文件
```

### `diag-output/`（本次 GEO 诊断产物）

已被 `.gitignore` 的 `/diag-output/` 规则覆盖，不进版本控制。内容：
- `CircleGen-GEO-诊断报告.html`（209 KB 可视化报告）
- `CircleGenMinecraft 圆圈生成器-diag-report.json`（119 KB 合并数据）

> 注意：合并脚本 `merge-stages.js` 在生成时会**删除 stage1-4.json**，只保留合并结果。如果后续想重新生成报告并保留分阶段数据，需要先备份。

---

## 五、本次改动的影响面

| 文件 | 类型 | 说明 |
|---|---|---|
| `src/lib/geo-comparison.ts` | 新增 | 对比数据单一数据源 |
| `src/components/ComparisonSection.tsx` | 新增 | 首页/about 共用的对比区块 |
| `src/app/llms.txt/route.ts` | 修改 | +对比矩阵 +品牌消歧 |
| `src/app/llms-full.txt/route.ts` | 修改 | +对比矩阵 +竞品逐条说明 +结构化块数 |
| `src/app/_seo/shape-page.tsx` | 修改 | +Dataset JSON-LD（结构化块数） |
| `src/components/HomePage.tsx` | 修改 | +ComparisonSection 引用 |
| `src/app/(en)/about/page.tsx` | 修改 | +ComparisonSection 引用 |
| `scripts/geo-monitor.js` | 新增 | GEO 监控脚本 |
| `docs/geo/baseline.json` | 新增 | 监控基线 |
| `docs/geo-monitoring-setup.md` | 新增 | 监控机制说明 |
| `docs/listing-submission-kit.md` | 新增 | 榜单提报素材 |
| `docs/community-content-kit.md` | 新增 | 社区口碑内容包 |
| `docs/geo-p3-technical-assessment.md` | 新增 | P3 技术评估 |

**无风险变更**：全部是新增文件 + 追加式修改，未触碰几何引擎、导出逻辑或任何现有业务逻辑。`npm test` 84 项全过，`tsc --noEmit` 零错误。

---

## 六、待你确认的两件事

1. **是否删除 `_wb_build_trash/`**（约 50,000 文件）—— 建议删
2. **是否删除 `out-old-1026/`** —— 建议删（git 已忽略）

其余我已全部处理完毕。
