# GSC / SERP 数据目录说明

本目录存放 pixelcircle.online 的搜索排名跟踪数据,由 `npm run serp`(scripts/e2e/06-serp-check.js)生成,用于每周对比外链/内容动作的效果。

## 文件清单

| 文件 | 内容 |
|---|---|
| `serp-YYYYMMDD.csv` | 6 个关键词的排名快照(引擎、位置、收集数) |
| `serp-detail-YYYYMMDD.csv` | 每个词前 10-20 名竞品明细(URL+标题) |
| `serp-probe-YYYYMMDD.csv` | 收录关联探针:`site:域名 关键词` 是否命中(= 已进入该词候选池) |
| `serp-deep-YYYYMMDD.csv` | `--deep` 模式:head 词 Google 前 400 名深扫结果 |

## 基线(2026-08-14,上线第 2 天)

### 排名快照(外部信号估算,非地面真值)

| 关键词 | 估算排名 | 置信度 | 依据 |
|---|---|---|---|
| minecraft circle generator | 150-400 | 低 | 已进池 + 深扫未进前 100;约 8K 结果、首页全是多年老站 |
| minecraft circle chart | 100-300 | 低-中 | 竞品较少,进池已确认 |
| minecraft circle generator 101 | 50-200 | 中 | 长尾词结果集小,进池后容易起 |
| pixel circle minecraft | 100-300 | 低 | 词被 Google Pixel 品牌污染,相关性弱 |
| 我的世界圆形生成器 | 500+ 或未排位 | 中 | 无关联证据(探针落 Bing,存疑,需人工复核) |
| minecraft kreis generator | 500+ 或未排位 | 中 | 同上 |

### 状态标记口径

- **未关联**:`site:域名 词` 无结果 → 尚未进入该词的检索候选集
- **已进池**:`site:域名 词` 有结果 → 已关联该词,通常意味着在候选集(几百条)内
- **有排位**:普通搜索能翻到具体位置(serp CSV 显示数字)

### 每周对比时看什么

1. `serp-probe`:几词从"未关联"→"已进池"(外链和收录生效的直接信号)
2. `serp`:排名数字前移幅度(进池后通常 2-8 周开始明显移动)
3. `serp-deep`:head 词是否进入前 100/前 50

## 关键前提(不要误读数据)

1. **新站沙盒期**:Google 对新域名延迟给实质排名(2-8 周)。基线数字是起点,不是终点。
2. **外部信号 ≠ 精确排名**:本脚本是"可重复的近似值"。精确排名以 GSC 数据为准(数据出现后逐词核对)。
3. **验证码兜底**:Google 对数据中心 IP/无头浏览器会弹验证码,脚本自动切 Bing 并在引擎列标注;该词的 Bing 数据仅供参考。
4. **zh/de 词探针存疑**:Bing 的 site: 查询不可靠,中文/德语词需在本地 Google 无痕手动复核:
   - `site:pixelcircle.online 我的世界圆形生成器`
   - `site:pixelcircle.online minecraft kreis generator`

## 使用

```powershell
# 每周例行(排名 + 竞品 + 探针)
npm run serp

# 加 head 词深扫(Google 前 400)
npm run serp -- --deep
```

结果文件自动落到本目录,按日期区分,git 已跟踪,便于回溯。
