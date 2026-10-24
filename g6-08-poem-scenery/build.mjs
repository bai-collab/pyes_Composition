// 組裝 g6-08：psc-core.js＋psc-part-a.js＋psc-part-b.js → psc-scenes.js → Skill 組裝 → 插入 three.js 全域腳本。
// 正式：node projects/essay-writing-animations/g6-08-poem-scenery/build.mjs
// 預覽（只有自己那一份時用；缺的段自動補空白段，輸出到 preview-a／preview-b，不碰正式 index.html）：
//   node projects/essay-writing-animations/g6-08-poem-scenery/build.mjs --preview a
import fs from "node:fs"; import path from "node:path"; import { execFileSync } from "node:child_process"; import { fileURLToPath } from "node:url";
const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dir, "../../..");
const NL = String.fromCharCode(10);
const pi = process.argv.indexOf("--preview");
const preview = pi > 0 ? process.argv[pi + 1] : null;
const out = preview ? path.join(dir, "preview-" + preview) : dir;
fs.mkdirSync(out, { recursive: true });
const timing = JSON.parse(fs.readFileSync(path.join(dir, "timing.json"), "utf8"));
const files = ["psc-core.js", "psc-part-a.js", "psc-part-b.js"].filter((f) => fs.existsSync(path.join(dir, f)));
if (!preview && files.length < 3) throw new Error("正式組裝需要 psc-part-a.js 與 psc-part-b.js");
let code = files.map((f) => fs.readFileSync(path.join(dir, f), "utf8")).join(NL);
timing.segments.forEach((s, i) => {
  if (!code.includes("function s" + (i + 1) + "(")) code += NL + "function s" + (i + 1) + "(u) { PscGL.show(null, u, " + s.len + "); return pscPaint(pscHead(u, " + i + ")); }";
});
const scenesFile = path.join(out, "psc-scenes.js");
fs.writeFileSync(scenesFile, code);
if (preview) fs.copyFileSync(path.join(dir, "timing.json"), path.join(out, "timing.json"));
execFileSync(process.execPath, [path.join(root, "brain/skills/repo-to-teaching-animation/scripts/assemble.mjs"), out, scenesFile], { stdio: "inherit" });
const html = path.join(out, "index.html");
let s = fs.readFileSync(html, "utf8");
const rel = path.relative(out, path.join(dir, "..", "vendor", "three-r170.global.js")).split(path.sep).join("/");
const tag = '<script src="' + rel + '"></script>';
if (!s.includes("three-r170.global.js")) {
  const at = s.indexOf("<script>");
  if (at < 0) throw new Error("找不到第一個 <script>");
  s = s.slice(0, at) + tag + NL + s.slice(at);
  fs.writeFileSync(html, s);
}
console.log("已插入 three.js 全域腳本：" + rel);
