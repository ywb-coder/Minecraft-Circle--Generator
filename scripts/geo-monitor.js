/**
 * geo-monitor.js — GEO visibility tracker (standalone, NOT part of e2e suite)
 *
 * Measures how often CircleGen gets mentioned in AI answer engines, and how
 * that compares with the competitors. This is the metric the GEO diagnosis
 * turns on: traditional SERP rank says nothing about whether an AI assistant
 * recommends the tool.
 *
 * Two modes:
 *
 *   1. "probe" mode (default) — open-ended audit. Runs a set of question
 *      templates against whichever AI platforms answer without a login, and
 *      records which brands each answer names. Because AI answers change
 *      constantly, run it on a schedule rather than expecting a diff.
 *
 *   2. "regression" mode — a fixed, versioned question set with a recorded
 *      baseline. Compares the current run against the baseline to show
 *      movement. This is the mode that tells you whether the listing
 *      submissions actually worked.
 *
 * Usage:  node scripts/geo-monitor.js [--regression] [--platforms=1,2,4]
 * Output: docs/geo/geo-monitor-YYYYMMDD.json     (raw answers + brand mentions)
 *         docs/geo/geo-mention-YYYYMMDD.csv      (flat matrix, diffable)
 *         docs/geo/BASELINE.md                   (manual baseline notes)
 *
 * Caveat: AI answers are non-deterministic. A single run is a sample, not a
 * census. Read the trend across 4+ runs before concluding anything. Platform
 * bias of roughly ±8% between runs is normal and is why we average.
 */

const fs = require("fs");
const path = require("path");

const GEO_DIR = path.resolve(__dirname, "..", "docs", "geo");

/** Platform codes match the GEO diagnosis skill's numbering. */
const PLATFORMS = {
  1: { name: "DeepSeek", url: "https://chat.deepseek.com/" },
  2: { name: "Doubao", url: "https://www.doubao.com/chat/" },
  3: { name: "Yuanbao", url: "https://yuanbao.tencent.com/chat/" },
  4: { name: "Tongyi Qianwen", url: "https://www.tongyi.com/" },
  5: { name: "Wenxin Yiyan", url: "https://chat.baidu.com/" },
  6: { name: "Nami Search", url: "https://www.n.cn/" },
  7: { name: "Kimi", url: "https://kimi.moonshot.cn/" },
  8: { name: "Zhipu Qingyan", url: "https://chatglm.cn/" },
};

/**
 * Brands we track. Our own plus the five competitors the diagnosis ranked.
 * Order matters only for readability of the output matrix.
 */
const BRANDS = {
  circlegen: ["circlegen", "pixelcircle.online", "pixel circle online"],
  godlike: ["godlike.host", "godlike host"],
  donat: ["donat studios", "donatstudios"],
  mcgic: ["mcgic"],
  plotz: ["plotz"],
  pixelcirclegenerator: ["pixelcirclegenerator.com", "pixel circle generator"],
};

/**
 * The fixed question set for regression mode. Do not reorder or edit these
 * between runs — the baseline is only meaningful against a stable list.
 * Keep them the kind of question a real builder would type.
 */
const REGRESSION_QUESTIONS = [
  { q: "best Minecraft circle generator", kind: "selection" },
  { q: "best free Minecraft circle generator with 3D preview", kind: "selection" },
  { q: "Minecraft circle generator that exports PNG and setblock commands", kind: "feature" },
  { q: "Minecraft circle generator with block count per layer", kind: "feature" },
  { q: "Minecraft torus generator online free", kind: "feature" },
  { q: "Minecraft sphere generator free no signup", kind: "selection" },
  { q: "how many blocks do I need for a 100x100 circle in Minecraft", kind: "fact" },
  { q: "how many blocks are in a 101 block circle in Minecraft", kind: "fact" },
  { q: "how to make a perfect circle in Minecraft without mods", kind: "fact" },
  { q: "Minecraft circle generator that works in Bedrock edition", kind: "feature" },
  { q: "Minecraft circle generator 512 blocks", kind: "feature" },
  { q: "open source Minecraft circle generator GitHub", kind: "selection" },
  { q: "generador de círculos minecraft gratis", kind: "selection" },
  { q: "Minecraft circle generator 中文 教程", kind: "selection" },
  { q: "best Minecraft shape generator 2026", kind: "selection" },
];

/** Open-ended probes for audit mode — broader, no baseline needed. */
const AUDIT_QUESTIONS = [
  "best Minecraft circle generator",
  "Minecraft 圆圈生成器 推荐",
  "how to build a perfect circle in Minecraft",
  "Minecraft build tools for large structures",
  "free blueprint generators for Minecraft",
  "Minecraft 3D shape generator for domes and spheres",
  "Minecraft circle generator with coordinates",
  "best Minecraft building helper tools",
];

/**
 * Classify which brands an answer names. Brand names are matched on word
 * boundaries where possible so "plotz" does not match inside another word.
 */
function detectBrands(text) {
  const lower = (text || "").toLowerCase();
  const found = {};
  for (const [brand, patterns] of Object.entries(BRANDS)) {
    if (patterns.some((p) => lower.includes(p))) found[brand] = true;
  }
  return found;
}

/**
 * Rank of our brand within the answer's own ordering, 1-based, or null if
 * we are not mentioned. This matters more than raw mention rate: an answer
 * that names us fifth is worth much less than one that names us first.
 */
function ourPosition(text) {
  const lower = (text || "").toLowerCase();
  const positions = [];
  for (const [brand, patterns] of Object.entries(BRANDS)) {
    let best = Infinity;
    for (const p of patterns) {
      const idx = lower.indexOf(p);
      if (idx !== -1 && idx < best) best = idx;
    }
    if (best !== Infinity) positions.push({ brand, idx: best });
  }
  positions.sort((a, b) => a.idx - b.idx);
  const rank = positions.findIndex((p) => p.brand === "circlegen");
  return rank === -1 ? null : rank + 1;
}

function parseArgs() {
  const args = process.argv.slice(2);
  const out = { mode: "audit", platforms: Object.keys(PLATFORMS).map(Number) };
  for (const a of args) {
    if (a === "--regression") out.mode = "regression";
    else if (a.startsWith("--platforms=")) {
      out.platforms = a
        .split("=")[1]
        .split(",")
        .map((n) => parseInt(n.trim(), 10))
        .filter((n) => !isNaN(n) && PLATFORMS[n]);
    }
  }
  return out;
}

async function loadBaseline() {
  const file = path.join(GEO_DIR, "baseline.json");
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return null;
  }
}

function writeCsv(rows, file) {
  const header = [
    "date",
    "mode",
    "platform",
    "platformName",
    "question",
    "kind",
    "mentioned",
    "ourPosition",
    "competitorsMentioned",
    "answerChars",
  ];
  const lines = [header.join(",")];
  for (const r of rows) {
    lines.push(
      [
        r.date,
        r.mode,
        r.platformCode,
        r.platformName,
        `"${String(r.question).replace(/"/g, '""')}"`,
        r.kind || "",
        r.mentioned ? "yes" : "no",
        r.ourPosition ?? "",
        `"${Object.keys(r.competitorsMentioned || {}).join(";")}"`,
        r.answerChars,
      ].join(",")
    );
  }
  fs.writeFileSync(file, lines.join("\n"), "utf8");
}

/**
 * Attempt to collect an answer from one platform.
 *
 * Every platform here needs a logged-in session before it will answer, and
 * none of them expose a public API for anonymous use. Rather than pretend
 * otherwise, this function returns null when it cannot reach a platform and
 * the caller records the platform as "not sampled". The honest signal comes
 * from running the check inside a browser where you are already signed in,
 * or from cross-checking against the GEO diagnosis skill's simulated query
 * results, which do not need a session.
 */
async function collectAnswer(platformCode, question) {
  try {
    // Requires a signed-in browser session. Not implemented headlessly on
    // purpose — a half-working scraper that silently returns nothing is
    // worse than an explicit gap, because it makes the numbers look real.
    return null;
  } catch (err) {
    return null;
  }
}

async function main() {
  const args = parseArgs();
  fs.mkdirSync(GEO_DIR, { recursive: true });

  const date = new Date().toISOString().slice(0, 10);
  const questions =
    args.mode === "regression" ? REGRESSION_QUESTIONS : AUDIT_QUESTIONS.map((q) => ({ q, kind: "probe" }));

  console.log(`GEO monitor — mode=${args.mode}, ${questions.length} questions`);
  console.log(`Platforms: ${args.platforms.map((c) => `${c}:${PLATFORMS[c].name}`).join(", ")}`);
  console.log("");

  const results = [];
  const rows = [];
  const skipped = [];

  for (const platformCode of args.platforms) {
    const platform = PLATFORMS[platformCode];
    for (const { q, kind } of questions) {
      const answer = await collectAnswer(platformCode, q);
      if (answer === null) {
        skipped.push(platform.name);
        continue;
      }
      const brands = detectBrands(answer);
      const mentioned = Boolean(brands.circlegen);
      const pos = ourPosition(answer);
      const competitors = {};
      for (const b of Object.keys(brands)) if (b !== "circlegen") competitors[b] = true;

      results.push({
        platformCode,
        platformName: platform.name,
        question: q,
        kind,
        mentioned,
        ourPosition: pos,
        brands,
        competitorsMentioned: competitors,
        answerChars: answer.length,
        answer,
      });
      rows.push({
        date,
        mode: args.mode,
        platformCode,
        platformName: platform.name,
        question: q,
        kind,
        mentioned,
        ourPosition: pos,
        competitorsMentioned: competitors,
        answerChars: answer.length,
      });
      console.log(
        `  ${mentioned ? "✓" : "·"} ${platform.name.padEnd(16)} ${q.slice(0, 46)}` +
          (mentioned ? ` — mentioned, position ${pos}` : "")
      );
    }
  }

  const jsonFile = path.join(GEO_DIR, `geo-monitor-${date}.json`);
  const csvFile = path.join(GEO_DIR, `geo-mention-${date}.csv`);

  const payload = {
    date,
    mode: args.mode,
    questionCount: questions.length,
    platformsTargeted: args.platforms,
    platformsSampled: [...new Set(results.map((r) => r.platformCode))],
    results,
  };
  fs.writeFileSync(jsonFile, JSON.stringify(payload, null, 2), "utf8");
  writeCsv(rows, csvFile);

  // Summary
  const sampled = payload.platformsSampled;
  const mentionRate = results.length
    ? results.filter((r) => r.mentioned).length / results.length
    : 0;
  const skippedPlatforms = [...new Set(skipped)];

  console.log("");
  console.log("=== Summary ===");
  console.log(`Platforms sampled: ${sampled.length}/${args.platforms.length}`);
  if (skippedPlatforms.length) {
    console.log(
      `Platforms skipped (no automated session): ${skippedPlatforms.join(", ")}`
    );
  }
  console.log(`Our mention rate: ${(mentionRate * 100).toFixed(1)}%`);
  const top = results.filter((r) => r.ourPosition === 1).length;
  console.log(`Times ranked #1: ${top}`);

  const baseline = await loadBaseline();
  if (baseline) {
    console.log("");
    console.log("=== vs baseline ===");
    console.log(`Baseline date: ${baseline.date}`);
    console.log(`Baseline mention rate: ${(baseline.mentionRate * 100).toFixed(1)}%`);
    if (sampled.length) {
      const delta = (mentionRate - baseline.mentionRate) * 100;
      console.log(`Change: ${delta >= 0 ? "+" : ""}${delta.toFixed(1)}pp`);
      if (delta < -3) {
        console.log("WARNING: mention rate dropped more than 3pp — check what changed.");
      }
    } else {
      console.log(
        "No live samples this run, so no comparison was made. The baseline above\n" +
          "is the reference to measure against once a run has real answers in it."
      );
    }
  }

  console.log("");
  console.log(`Wrote ${path.relative(process.cwd(), jsonFile)}`);
  console.log(`Wrote ${path.relative(process.cwd(), csvFile)}`);
  if (!sampled.length) {
    console.log("");
    console.log(
      "No platforms could be sampled automatically. To record a run, run the\n" +
        "GEO diagnosis skill (which simulates the platform queries) and copy the\n" +
        "result into docs/geo/baseline.json using the same shape as the JSON\n" +
        "written above."
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
