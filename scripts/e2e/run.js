const { spawn } = require("child_process");
const path = require("path");
const http = require("http");
const net = require("net");

const ROOT = path.resolve(__dirname, "..", "..");
const OUT = path.join(ROOT, "out");
const MODULES = [
  "01-tool-core",
  "02-interaction",
  "03-layout-ux",
  "04-perf",
  "05-seo-pages",
];

let serverProc = null;

function freePort() {
  return new Promise((resolve) => {
    const srv = net.createServer();
    srv.listen(0, "127.0.0.1", () => {
      const port = srv.address().port;
      srv.close(() => resolve(port));
    });
  });
}

function waitForServer(url, timeoutMs) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const tick = () => {
      const req = http.get(url, (res) => {
        res.resume();
        resolve();
      });
      req.on("error", () => {
        if (Date.now() - start > timeoutMs) reject(new Error("server timeout"));
        else setTimeout(tick, 300);
      });
    };
    tick();
  });
}

async function startServer(port) {
  serverProc = spawn(
    "python",
    ["-m", "http.server", String(port), "--bind", "127.0.0.1", "--directory", OUT],
    { stdio: "ignore", detached: true }
  );
  serverProc.unref();
  await waitForServer(`http://127.0.0.1:${port}/`, 10000);
}

async function stopServer() {
  if (serverProc && serverProc.pid) {
    try {
      process.kill(-serverProc.pid, "SIGKILL");
    } catch {
      try {
        process.kill(serverProc.pid, "SIGKILL");
      } catch {
        // ignore
      }
    }
  }
  serverProc = null;
}

(async () => {
  if (!require("fs").existsSync(OUT)) {
    console.error("out/ missing — run npm run build first");
    process.exit(1);
  }
  const PORT = await freePort();
  process.env.BASE_URL = `http://127.0.0.1:${PORT}`;
  try {
    await startServer(PORT);
  } catch (e) {
    console.error("cannot start server:", e.message);
    process.exit(1);
  }

  let exit = 0;
  for (const mod of MODULES) {
    console.log(`\n########## ${mod} ##########`);
    try {
      delete require.cache[require.resolve(`./${mod}`)];
      const fn = require(`./${mod}`);
      await fn();
    } catch (e) {
      console.log("MODULE ERROR: " + (e.message || e).slice(0, 300));
      exit = 1;
    }
  }
  await stopServer();
  const { summary } = require("./helpers");
  process.exit(summary());
})();
