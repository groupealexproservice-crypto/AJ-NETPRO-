// Renders public/images/sculpture-aurex.png from the GLB with model-viewer (Chromium). Needs: playwright, @google/model-viewer.
const { chromium } = require("playwright"); const http = require("http"), fs = require("fs"), path = require("path");
const root = path.resolve(__dirname, "..");
const srv = http.createServer((q, r) => {
  const map = { "/mv.js": ["node_modules/@google/model-viewer/dist/model-viewer.min.js", "text/javascript"], "/m.glb": ["public/models/sculpture-aurex.glb", "model/gltf-binary"] };
  if (q.url === "/") { r.setHeader("content-type", "text/html"); return r.end(`<body style="margin:0;background:transparent"><script type="module" src="/mv.js"></script><model-viewer id=m src="/m.glb" camera-orbit="${process.env.ORBIT || "20deg 68deg auto"}" exposure="1" shadow-intensity="0.9" shadow-softness="1" field-of-view="26deg" environment-image="legacy" style="width:1000px;height:1000px;background:transparent"></model-viewer>`); }
  const e = map[q.url]; if (!e) { r.statusCode = 404; return r.end(); } r.setHeader("content-type", e[1]); r.end(fs.readFileSync(path.join(root, e[0])));
}).listen(4567);
(async () => {
  const b = await chromium.launch({ args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const p = await b.newPage({ viewport: { width: 1000, height: 1000 } });
  await p.goto("http://localhost:4567/"); await p.waitForFunction(() => document.getElementById("m").loaded, null, { timeout: 60000 }); await p.waitForTimeout(2500);
  await p.screenshot({ path: process.argv[2] || "/tmp/poster.png", omitBackground: true }); await b.close(); srv.close();
})().catch((e) => { console.error(e); process.exit(1); });
