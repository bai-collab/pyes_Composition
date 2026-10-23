const META = {
  title: "寫一篇讓人相信的「如何」",
  subtitle: "9 段・約 2 分鐘・五年級議論文（如何型）第一集",
  ariaLabel: "議論文要讓人相信，如何型四段：主張和理由、兩段方法、再說一次主張。",
  note: "出處：楊裕貿作文寫作要領、寫作研習資料、作文仿寫學習單、分步學寫議論文、議論文引導講義。說明書、讀者人偶、問號泡泡、主張牌、支架、方法積木、段落框、虛線、藍積木、工作牌是視覺比喻或示意；示範短語、理由與方法自編；〈如何保護山林〉兩種大綱依講義原文縮短。鍵盤：空白鍵播放／暫停，左右方向鍵切換段落，F 鍵全螢幕。畫面只由時間決定。",
  works: [],
};

const HTS_WOOD = "#a9784f";
const HTS_RED = "#d9605a";
const HTS_GREEN = "#8fd18a";
const HTS_BLUE = "#7fb6d9";
const HTS_ORANGE = "#e8875b";
const HTS_CREAM = "#efe9d8";
const HTS_INK = "#1a2b23";
const HTS_YELLOW = "#f2c14e";
const htsK = (u, a, b) => ease(P(u, a, b));
const htsLerp = (a, b, k) => a + (b - a) * k;
const htsN = (value) => Number.isFinite(Number(value)) ? Number(Number(value).toFixed(2)) : 0;
const htsO = (value) => Math.max(0, Math.min(1, Number(value) || 0)).toFixed(3);

function htsMetaphorTag(op = 1) {
  if (op <= 0.001) return "";
  return "<g opacity=\"" + htsO(op) + "\">" +
    box(1375, 56, 165, 60, HTS_ORANGE, 1, C.deep) +
    txt(1457, 98, "比喻", { a: "middle", s: 30, w: 1, f: HTS_ORANGE }) + "</g>";
}

function htsLabel(cx, y, value, size = 30, color = C.chalk, op = 1) {
  if (op <= 0.001) return "";
  return txt(cx, y, value, { a: "middle", s: size, w: 1, f: color, o: op });
}

function htsPhrase(x, y, value, size = 30, color = C.chalk, op = 1, anchor = "start") {
  if (op <= 0.001) return "";
  return txt(x, y, value, { a: anchor, s: size, w: 1, f: color, o: op });
}

function htsLine(x1, y1, x2, y2, color = C.chalk, width = 5, op = 1, dash = "", progress = 1) {
  if (op <= 0.001 || progress <= 0.001) return "";
  const ex = htsLerp(x1, x2, progress);
  const ey = htsLerp(y1, y2, progress);
  return "<path d=\"M" + htsN(x1) + " " + htsN(y1) + " L" + htsN(ex) + " " + htsN(ey) +
    "\" fill=\"none\" stroke=\"" + color + "\" stroke-width=\"" + width +
    "\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"" + htsO(op) + "\"" +
    (dash ? " stroke-dasharray=\"" + dash + "\"" : "") + "/>";
}

function htsPath(d, color = C.chalk, width = 5, op = 1, fill = "none", dash = "") {
  if (op <= 0.001) return "";
  return "<path d=\"" + d + "\" fill=\"" + fill + "\" stroke=\"" + color +
    "\" stroke-width=\"" + width + "\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"" +
    htsO(op) + "\"" + (dash ? " stroke-dasharray=\"" + dash + "\"" : "") + "/>";
}

function htsCircle(cx, cy, r, stroke = C.chalk, width = 5, fill = "none", op = 1, dash = "") {
  if (op <= 0.001 || r <= 0) return "";
  return "<circle cx=\"" + htsN(cx) + "\" cy=\"" + htsN(cy) + "\" r=\"" + htsN(r) +
    "\" fill=\"" + fill + "\" stroke=\"" + stroke + "\" stroke-width=\"" + width +
    "\" opacity=\"" + htsO(op) + "\"" + (dash ? " stroke-dasharray=\"" + dash + "\"" : "") + "/>";
}

function htsEllipse(cx, cy, rx, ry, stroke = C.yellow, width = 4, op = 1) {
  if (op <= 0.001) return "";
  return "<ellipse cx=\"" + htsN(cx) + "\" cy=\"" + htsN(cy) + "\" rx=\"" + htsN(rx) +
    "\" ry=\"" + htsN(ry) + "\" fill=\"none\" stroke=\"" + stroke + "\" stroke-width=\"" +
    width + "\" opacity=\"" + htsO(op) + "\"/>";
}

function htsBlock(x, y, w, h, color, op = 1, dashed = false, flash = 0) {
  if (op <= 0.001 || w <= 2 || h <= 2) return "";
  if (dashed) {
    const fill = flash > 0.01 ? "rgba(242,193,78," + (0.5 * flash).toFixed(3) + ")" : "rgba(239,233,216,.012)";
    return "<rect x=\"" + htsN(x) + "\" y=\"" + htsN(y) + "\" width=\"" + htsN(w) +
      "\" height=\"" + htsN(h) + "\" rx=\"14\" fill=\"" + fill + "\" stroke=\"" + color +
      "\" stroke-width=\"5\" stroke-dasharray=\"14 10\" opacity=\"" + htsO(op) + "\"/>";
  }
  return "<rect x=\"" + htsN(x) + "\" y=\"" + htsN(y) + "\" width=\"" + htsN(w) +
    "\" height=\"" + htsN(h) + "\" rx=\"14\" fill=\"" + color +
    "\" fill-opacity=\".22\" stroke=\"" + C.chalk + "\" stroke-width=\"4\" opacity=\"" + htsO(op) + "\"/>";
}

function htsCardFrame(x, y, w, h, op = 1, dashed = false, stroke = C.chalk) {
  if (op <= 0.001) return "";
  if (dashed) {
    return "<rect x=\"" + x + "\" y=\"" + y + "\" width=\"" + w + "\" height=\"" + h +
      "\" rx=\"18\" fill=\"rgba(239,233,216,.012)\" stroke=\"" + stroke +
      "\" stroke-width=\"4\" stroke-dasharray=\"13 9\" opacity=\"" + htsO(op) + "\"/>";
  }
  return "<g opacity=\"" + htsO(op) + "\">" + box(x, y, w, h, stroke, 1, "rgba(239,233,216,.015)") + "</g>";
}

function htsDashedRoundFrame(x, y, w, h, progress, id, op = 1, radius = 18) {
  if (progress <= 0.001 || op <= 0.001) return "";
  const d = "M" + htsN(x + radius) + " " + htsN(y) + " H" + htsN(x + w - radius) +
    " A" + radius + " " + radius + " 0 0 1 " + htsN(x + w) + " " + htsN(y + radius) +
    " V" + htsN(y + h - radius) + " A" + radius + " " + radius + " 0 0 1 " +
    htsN(x + w - radius) + " " + htsN(y + h) + " H" + htsN(x + radius) +
    " A" + radius + " " + radius + " 0 0 1 " + htsN(x) + " " + htsN(y + h - radius) +
    " V" + htsN(y + radius) + " A" + radius + " " + radius + " 0 0 1 " +
    htsN(x + radius) + " " + htsN(y) + " Z";
  const perimeter = 2 * (w + h - 4 * radius) + 2 * Math.PI * radius;
  const reveal = htsN(perimeter * Math.max(0, Math.min(1, progress)));
  return "<defs><mask id=\"" + id + "\" maskUnits=\"userSpaceOnUse\" maskContentUnits=\"userSpaceOnUse\" x=\"" +
    htsN(x - 8) + "\" y=\"" + htsN(y - 8) + "\" width=\"" + htsN(w + 16) +
    "\" height=\"" + htsN(h + 16) + "\"><rect x=\"" + htsN(x - 8) + "\" y=\"" +
    htsN(y - 8) + "\" width=\"" + htsN(w + 16) + "\" height=\"" + htsN(h + 16) +
    "\" fill=\"black\"/><path d=\"" + d + "\" fill=\"none\" stroke=\"white\" stroke-width=\"9\" stroke-linecap=\"butt\" pathLength=\"" +
    htsN(perimeter) + "\" stroke-dasharray=\"" + reveal + " " + htsN(perimeter) +
    "\"/></mask></defs><path d=\"" + d + "\" fill=\"none\" stroke=\"" + C.yellow +
    "\" stroke-width=\"3\" stroke-dasharray=\"10 8\" opacity=\"" + htsO(op) +
    "\" mask=\"url(#" + id + ")\"/>";
}

function htsCheck(cx, cy, scale = 1, op = 1) {
  if (op <= 0.01) return "";
  return "<path d=\"M" + htsN(cx - 30 * scale) + " " + htsN(cy) + " L" +
    htsN(cx - 8 * scale) + " " + htsN(cy + 23 * scale) + " L" +
    htsN(cx + 37 * scale) + " " + htsN(cy - 30 * scale) +
    "\" fill=\"none\" stroke=\"" + HTS_GREEN + "\" stroke-width=\"" + (11 * scale) +
    "\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"" + htsO(op) + "\"/>";
}

function htsFlash(u, start) {
  const fadeIn = htsK(u, start, start + 0.08);
  const fadeOut = 1 - htsK(u, start + 0.42, start + 0.5);
  return Math.max(0, Math.min(fadeIn, fadeOut));
}

function htsPaint(svg) {
  return svg.replace(/font-size="24"/g, "font-size=\"26\"")
    .replace(/<text ([^>]*?)fill="([^"]+)"/g, "<text $1style=\"fill:$2\" fill=\"$2\"");
}

function htsWorkTag(x, y, w, value, op = 1) {
  return htsLabel(x + w / 2, y, value, 34, C.chalk, op);
}

function htsTag(x, y, w, label, op = 1) {
  if (op <= 0.001) return "";
  return "<g opacity=\"" + htsO(op) + "\">" +
    box(x, y, w, 64, C.yellow, 1, "rgba(26,43,35,.94)") +
    txt(x + w / 2, y + 42, label, { a: "middle", s: 30, w: 1, f: C.chalk }) + "</g>";
}

function htsSign(cx, boardY, w, h, label, op, tilt = 0, postBottom) {
  if (op <= 0.001) return "";
  const bottom = Number.isFinite(postBottom) ? postBottom : boardY + h / 2 + 170;
  let g = "<g transform=\"translate(" + htsN(cx) + " " + htsN(bottom) + ") rotate(" +
    htsN(tilt) + ") translate(" + htsN(-cx) + " " + htsN(-bottom) + ")\" opacity=\"" +
    htsO(op) + "\" stroke-linecap=\"round\" stroke-linejoin=\"round\">";
  g += "<path d=\"M" + htsN(cx) + " " + htsN(boardY + h / 2) + " L" + htsN(cx) + " " +
    htsN(bottom) + "\" fill=\"none\" stroke=\"" + C.chalk + "\" stroke-width=\"8\"/>";
  g += "<rect x=\"" + htsN(cx - w / 2) + "\" y=\"" + htsN(boardY - h / 2) +
    "\" width=\"" + htsN(w) + "\" height=\"" + htsN(h) +
    "\" rx=\"10\" fill=\"rgba(242,193,78,.12)\" stroke=\"" + C.yellow + "\" stroke-width=\"5\"/>";
  if (label) {
    g += txt(cx, boardY + 11, label, { a: "middle", s: 30, w: 1, f: C.chalk });
  } else {
    g += "<path d=\"M" + htsN(cx - w * 0.22) + " " + htsN(boardY - h * 0.12) + " H" +
      htsN(cx + w * 0.22) + " M" + htsN(cx - w * 0.22) + " " + htsN(boardY + h * 0.12) +
      " H" + htsN(cx + w * 0.22) +
      "\" fill=\"none\" stroke=\"rgba(239,233,216,.72)\" stroke-width=\"4\"/>";
  }
  return g + "</g>";
}

function htsStrut(x1, y1, x2, y2, k, op = 1) {
  if (op <= 0.001 || k <= 0.001) return "";
  const ex = htsLerp(x1, x2, k);
  const ey = htsLerp(y1, y2, k);
  const foot = k >= 0.99
    ? "<path d=\"M" + htsN(x1 - 12) + " " + htsN(y1 - 2) + " L" + htsN(x1) + " " +
      htsN(y1 - 20) + " L" + htsN(x1 + 12) + " " + htsN(y1 - 2) + "\" fill=\"none\" stroke=\"" +
      C.chalk + "\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>"
    : "";
  return "<g opacity=\"" + htsO(op) + "\"><path d=\"M" + htsN(x1) + " " + htsN(y1) +
    " L" + htsN(ex) + " " + htsN(ey) +
    "\" fill=\"none\" stroke=\"" + C.chalk + "\" stroke-width=\"9\" stroke-linecap=\"round\"/>" +
    foot + "</g>";
}

function htsBasket(cx, cy, w, label, op, dashed = false, flash = 0) {
  if (op <= 0.001) return "";
  const top = cy - 50;
  const bottom = cy + 50;
  const halfTop = w / 2;
  const halfBottom = w * 0.4;
  const fill = flash > 0.01
    ? "rgba(242,193,78," + (0.5 * flash).toFixed(3) + ")"
    : (dashed ? "none" : "rgba(239,233,216,.025)");
  const dash = dashed ? " stroke-dasharray=\"11 8\"" : "";
  let g = "<g opacity=\"" + htsO(op) + "\">";
  g += "<path d=\"M" + htsN(cx - halfTop) + " " + htsN(top) + " L" +
    htsN(cx + halfTop) + " " + htsN(top) + " L" + htsN(cx + halfBottom) + " " +
    htsN(bottom) + " L" + htsN(cx - halfBottom) + " " + htsN(bottom) + " Z\" fill=\"" +
    fill + "\" stroke=\"" + C.chalk + "\" stroke-width=\"4\"" + dash + "/>";
  g += "<path d=\"M" + htsN(cx - w * 0.31) + " " + htsN(cy - 20) + " L" +
    htsN(cx - w * 0.24) + " " + htsN(cy + 22) + " M" + htsN(cx + w * 0.31) + " " +
    htsN(cy - 20) + " L" + htsN(cx + w * 0.24) + " " + htsN(cy + 22) +
    "\" fill=\"none\" stroke=\"" + C.chalk + "\" stroke-width=\"2\" opacity=\".45\"/>";
  g += txt(cx, cy + 12, label, { a: "middle", s: 34, w: 1, f: C.yellow });
  return g + "</g>";
}

function htsDoll(cx, cy, scale = 1, op = 1, nod = 0) {
  const dy = 10 * Math.sin(Math.PI * Math.max(0, Math.min(1, nod)));
  return "<g transform=\"translate(" + htsN(cx) + " " + htsN(cy + dy) + ") scale(" +
    htsN(scale) + ")\" opacity=\"" + htsO(op) +
    "\" stroke-linecap=\"round\" stroke-linejoin=\"round\">" +
    "<circle cx=\"0\" cy=\"-72\" r=\"31\" fill=\"rgba(240,217,189,.55)\" stroke=\"" +
    C.chalk + "\" stroke-width=\"5\"/>" +
    "<path d=\"M-28 -77 Q-21 -112 4 -105 Q27 -99 29 -75 Q9 -90 -4 -87 Q-18 -83 -28 -77Z\" fill=\"" +
    HTS_WOOD + "\" stroke=\"" + C.chalk + "\" stroke-width=\"3\"/>" +
    "<path d=\"M-43 43 Q-40 -28 0 -28 Q40 -28 43 43Z\" fill=\"rgba(127,182,217,.28)\" stroke=\"" +
    C.chalk + "\" stroke-width=\"5\"/>" +
    "<path d=\"M-37 -5 L-70 26 M37 -5 L70 26 M-19 43 L-30 91 M19 43 L30 91\" fill=\"none\" stroke=\"" +
    C.chalk + "\" stroke-width=\"9\"/>" +
    "<circle cx=\"-10\" cy=\"-67\" r=\"3\" fill=\"" + HTS_WOOD + "\"/>" +
    "<circle cx=\"10\" cy=\"-67\" r=\"3\" fill=\"" + HTS_WOOD + "\"/></g>";
}

function htsBubble(x, y, w, h, op = 1, tail = "down", flash = 0) {
  if (op <= 0.001) return "";
  const tailPath = tail === "leftDown"
    ? "<path d=\"M" + htsN(x + 16) + " " + htsN(y + h - 1) + " L" + htsN(x + 36) + " " +
      htsN(y + h - 1) + " L" + htsN(x - 10) + " " + htsN(y + h + 10) +
      " Z\" fill=\"rgba(35,57,47,.95)\" stroke=\"" + C.chalk + "\" stroke-width=\"4\" stroke-linejoin=\"round\"/>"
    : "<path d=\"M" + htsN(x + w * 0.48) + " " + htsN(y + h - 1) + " L" +
      htsN(x + w * 0.62) + " " + htsN(y + h - 1) + " L" +
      htsN(x + w * 0.55) + " " + htsN(y + h + 18) +
      " Z\" fill=\"rgba(35,57,47,.95)\" stroke=\"" + C.chalk + "\" stroke-width=\"4\" stroke-linejoin=\"round\"/>";
  const fill = flash > 0.01
    ? "rgba(242,193,78," + (0.5 * flash).toFixed(3) + ")"
    : "rgba(239,233,216,.06)";
  return "<g opacity=\"" + htsO(op) + "\"><rect x=\"" + htsN(x) + "\" y=\"" + htsN(y) +
    "\" width=\"" + htsN(w) + "\" height=\"" + htsN(h) + "\" rx=\"18\" fill=\"" + fill +
    "\" stroke=\"" + C.chalk + "\" stroke-width=\"4\"/>" + tailPath + "</g>";
}

function htsBracket(x1, x2, y, progress, op = 1) {
  if (op <= 0.001 || progress <= 0.001) return "";
  const end = x1 + (x2 - x1) * progress;
  return "<path d=\"M" + htsN(x1) + " " + htsN(y - 7) + " L" + htsN(x1) + " " +
    htsN(y) + " L" + htsN(end) + " " + htsN(y) + " L" + htsN(end) + " " + htsN(y - 7) +
    "\" fill=\"none\" stroke=\"" + C.yellow + "\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"" +
    htsO(op) + "\"/>";
}

function htsCurve(x1, y1, cx, cy, x2, y2, k, op = 1, color = C.yellow, width = 4, dash = "") {
  if (op <= 0.001 || k <= 0.001) return "";
  const px = htsLerp(x1, cx, k);
  const py = htsLerp(y1, cy, k);
  const qx = htsLerp(cx, x2, k);
  const qy = htsLerp(cy, y2, k);
  const ex = htsLerp(px, qx, k);
  const ey = htsLerp(py, qy, k);
  return htsPath("M" + htsN(x1) + " " + htsN(y1) + " Q" + htsN(px) + " " +
    htsN(py) + " " + htsN(ex) + " " + htsN(ey), color, width, op, "none", dash);
}

function htsManual(cx, cy, k, lit, op = 1) {
  if (op <= 0.001 || k <= 0.001) return "";
  const half = 180 * k;
  const pageOp = Math.max(0, Math.min(1, (k - 0.3) / 0.3));
  let g = "<g opacity=\"" + htsO(op) + "\" stroke-linejoin=\"round\">";
  g += "<path d=\"M" + htsN(cx - half) + " " + htsN(cy - 120) + " Q" +
    htsN(cx) + " " + htsN(cy - 132) + " " + htsN(cx + half) + " " +
    htsN(cy - 120) + " V" + htsN(cy + 120) + " Q" + htsN(cx) + " " +
    htsN(cy + 108) + " " + htsN(cx - half) + " " + htsN(cy + 120) +
    " Z\" fill=\"rgba(239,233,216,.025)\" stroke=\"" + C.chalk + "\" stroke-width=\"5\"/>";
  g += htsLine(cx, cy - 120, cx, cy + 120, C.chalk, 4, 1);
  for (const dy of [-50, 0, 50]) g += htsLine(cx - half + 18, cy + dy, cx - 18, cy + dy, C.chalk, 4, pageOp);
  const rows = [-86, -22, 42];
  for (let i = 0; i < 3; i++) {
    const yy = cy + rows[i];
    const litFill = lit >= i + 1 ? "rgba(242,193,78,.25)" : "none";
    g += "<g opacity=\"" + htsO(pageOp) + "\"><rect x=\"" + htsN(cx + 18) +
      "\" y=\"" + htsN(yy) + "\" width=\"44\" height=\"44\" rx=\"4\" fill=\"" +
      litFill + "\" stroke=\"" + C.yellow + "\" stroke-width=\"4\"/>" +
      txt(cx + 40, yy + 33, String(i + 1), { a: "middle", s: 30, w: 1, f: C.yellow }) + "</g>";
  }
  return g + "</g>";
}

function htsStageTitle(u, value) {
  return htsLabel(800, 240, value, 36, C.yellow, htsK(u, 0.2, 0.8));
}

function htsTopicTitle(cx, y, value, charCount, op) {
  const gap = 16;
  const totalWidth = charCount * 34 + gap;
  const start = cx - totalWidth / 2;
  return htsPhrase(start, y, value.slice(0, 2), 34, C.chalk, op) +
    htsPhrase(start + 68 + gap, y, value.slice(2), 34, C.chalk, op);
}

function s1(u) {
  let g = head(u, "開場", "這次要讓人相信") + htsMetaphorTag();
  const title = htsK(u, 0.2, 0.8);
  g += box(560, 200, 480, 72, C.yellow, title, C.deep);
  g += htsLabel(800, 247, "〈如何做一個好學生〉", 40, C.yellow, title);

  g += htsManual(400, 490, 1, 3, 0.6 * htsK(u, 0.4, 1.2));
  g += htsPhrase(400, 700, "說明文：讓人知道", 34, C.chalk, htsK(u, 1.0, 2.0), "middle");
  g += htsLine(800, 330, 800, 760, C.chalk, 3, htsK(u, 1.5, 2.5), "12 10");

  const dollOp = htsK(u, 2.5, 3.3);
  g += htsDoll(1380, 600, 1, dollOp);
  const bubbleOp = htsK(u, 3.5, 4.2);
  g += htsBubble(1310, 380, 140, 70, bubbleOp);
  g += htsLabel(1380, 427, "？", 44, HTS_ORANGE, bubbleOp);

  const signDrop = htsK(u, 4.5, 6.0);
  const boardY = htsLerp(300, 470, signDrop);
  g += htsSign(1080, boardY, 240, 80, "", signDrop, 0, 700);
  g += htsPhrase(1200, 780, "議論文：讓人相信", 34, C.yellow, htsK(u, 6.0, 7.0), "middle");
  return htsPaint(g);
}

function s2(u) {
  let g = head(u, "寫什麼", "如何型要找什麼") + htsMetaphorTag();
  const xs = [120, 600, 1080];
  const labels = ["如何保護環境", "怎樣做個孝順的孩子", "如何做一個好學生"];
  const counts = [6, 9, 8];
  for (let i = 0; i < 3; i++) {
    const start = 0.4 + i * 1.4;
    const op = htsK(u, start, start + 0.6);
    g += htsCardFrame(xs[i], 220, 400, 240, op, false, C.chalk);
    g += htsTopicTitle(xs[i] + 200, 355, labels[i], counts[i], op);
    const circleOp = htsK(u, 4.8, 6.0) * op;
    const left = xs[i] + 200 - (counts[i] * 34 + 16) / 2;
    g += htsEllipse(left + 34, 343, 40, 25, C.yellow, 4, circleOp);
  }

  const basketDrop = htsK(u, 6.0, 7.0);
  const basketY = htsLerp(500, 740, basketDrop);
  g += htsBasket(480, basketY, 220, "理由", basketDrop);
  g += htsBasket(1120, basketY, 220, "方法", basketDrop);
  g += htsDoll(800, 720, 0.8, htsK(u, 6.5, 7.1));

  const bubble1 = htsK(u, 7.5, 8.0);
  g += htsBubble(360, 540, 240, 64, bubble1);
  g += htsLabel(480, 580, "為什麼要？", 30, C.chalk, bubble1);
  const bubble2 = htsK(u, 8.3, 8.8);
  g += htsBubble(1000, 540, 240, 64, bubble2);
  g += htsLabel(1120, 580, "怎麼做？", 30, C.chalk, bubble2);
  const links = htsK(u, 9.0, 10.0);
  g += htsLine(480, 610, 480, 688, C.yellow, 4, links, "10 8", links);
  g += htsLine(1120, 610, 1120, 688, C.yellow, 4, links, "10 8", links);
  return htsPaint(g);
}

function s3(u) {
  let g = head(u, "骨架", "先說主張") + htsMetaphorTag();
  g += htsStageTitle(u, "論點＝我的主張");
  const signDrop = htsK(u, 0.3, 1.0);
  const boardY = htsLerp(340, 470, signDrop);
  const settledU = Math.min(u, 11.5);
  const tilt = u < 1.5 ? 0 : 6 * Math.sin(2 * Math.PI * settledU / 1.6);
  g += htsSign(700, boardY, 300, 90, "從小事做起", 1, tilt, 760);
  g += htsLine(560, 760, 840, 760, C.chalk, 4, 1);
  g += htsDoll(1300, 620, 1, htsK(u, 0.6, 1.0));
  const bubbleOp = htsK(u, 3.0, 3.6);
  const bubbleFlash = htsFlash(u, 6.0);
  g += htsBubble(1180, 400, 240, 64, bubbleOp, "down", bubbleFlash);
  g += htsLabel(1300, 440, "為什麼要？", 30, C.chalk, bubbleOp);
  return htsPaint(g);
}

function s4(u) {
  let g = head(u, "骨架", "用理由撐住") + htsMetaphorTag();
  g += htsStageTitle(u, "論據＝理由");
  const amplitude = u < 2.0 ? 1 : u < 3.5 ? 1 - htsK(u, 2.0, 3.5) : 0;
  const tilt = amplitude * 6 * Math.sin(2 * Math.PI * u / 1.6);
  g += htsSign(700, 470, 300, 90, "從小事做起", 1, tilt, 760);
  g += htsLine(560, 760, 840, 760, C.chalk, 4, 1);
  const struts = htsK(u, 2.0, 3.5);
  g += htsStrut(560, 760, 650, 520, struts);
  g += htsStrut(840, 760, 750, 520, struts);
  g += htsTag(240, 600, 260, "習慣會累積", htsK(u, 4.0, 4.5));
  g += htsTag(900, 600, 270, "天天進步一點", htsK(u, 4.8, 5.3));
  g += htsLine(502, 632, 596, 632, C.yellow, 3, 0.8 * htsK(u, 4.0, 4.5), "8 8");
  g += htsLine(804, 632, 898, 632, C.yellow, 3, 0.8 * htsK(u, 4.8, 5.3), "8 8");
  const paragraphFrame = htsK(u, 9.0, 10.0);
  g += htsDashedRoundFrame(530, 400, 340, 375, paragraphFrame, "hts-s4-first-paragraph");
  g += htsLabel(700, 815, "第一段", 30, C.yellow, htsK(u, 9.5, 10.3));

  const nod = htsK(u, 6.5, 7.5);
  g += htsDoll(1380, 620, 1, 1, nod);
  const bubbleOp = 1 - htsK(u, 5.5, 6.3);
  g += htsBubble(1260, 400, 240, 64, bubbleOp);
  g += htsLabel(1380, 440, "為什麼要？", 30, C.chalk, bubbleOp);
  return htsPaint(g);
}

function s5(u) {
  let g = head(u, "骨架", "方法放中間兩段") + htsMetaphorTag();
  g += htsStageTitle(u, "方法：放在中間兩段");
  g += htsDoll(1420, 470, 0.75, htsK(u, 0.3, 0.8));
  const bubbleOp = htsK(u, 0.8, 1.3);
  g += htsBubble(1260, 300, 200, 60, bubbleOp);
  g += htsLabel(1360, 338, "怎麼做？", 30, C.chalk, bubbleOp);

  const rows = [
    { x: 170, label: "首先", number: "1", phrase: "上課專心", start: 2.0 },
    { x: 420, label: "其次", number: "2", phrase: "作業檢查", start: 4.0 },
    { x: 800, label: "最後", number: "3", phrase: "愛護教室", start: 6.0 },
  ];
  for (const row of rows) {
    const drop = htsK(u, row.start, row.start + 0.6);
    const yy = 420 - 56 * (1 - drop);
    const cx = row.x + 110;
    g += htsBlock(row.x, yy, 220, 200, HTS_BLUE, drop);
    g += htsPhrase(cx, yy - 15, row.label, 30, C.yellow, drop, "middle");
    g += htsLabel(cx, 485, row.number, 34, C.yellow, drop);
    g += htsPhrase(cx, 580, row.phrase, 30, C.chalk,
      htsK(u, row.start + 1.1, row.start + 1.5), "middle");
  }
  const leftFrame = htsK(u, 8.5, 9.5);
  g += htsDashedRoundFrame(140, 360, 530, 300, leftFrame, "hts-s5-second-paragraph");
  g += htsLabel(405, 345, "第二段", 30, C.yellow, leftFrame);
  const rightFrame = htsK(u, 10.0, 11.0);
  g += htsDashedRoundFrame(770, 360, 280, 300, rightFrame, "hts-s5-third-paragraph");
  g += htsLabel(910, 345, "第三段", 30, C.yellow, rightFrame);
  const footerOp = htsK(u, 11.0, 12.0);
  g += htsLabel(405, 700, "學習上", 30, C.chalk, footerOp);
  g += htsLabel(910, 700, "生活上", 30, C.chalk, footerOp);
  return htsPaint(g);
}

function s6(u) {
  let g = head(u, "骨架", "再說一次主張") + htsMetaphorTag();
  g += htsStageTitle(u, "結論＝再說一次主張");
  g += htsSign(330, 470, 260, 80, "從小事做起", htsK(u, 0.3, 0.8), 0, 720);
  const rightDrop = htsK(u, 1.0, 2.0);
  g += htsSign(1000, htsLerp(300, 470, rightDrop), 260, 80, "人人做得到", 1, 0, 720);
  g += htsCurve(1000, 428, 665, 320, 330, 428, htsK(u, 3.0, 5.0), 1, C.yellow, 4, "12 9");
  g += htsDoll(1380, 620, 1, htsK(u, 0.5, 1.0), htsK(u, 6.0, 7.0));
  g += htsCheck(1460, 470, 0.5, htsK(u, 7.0, 7.6));
  return htsPaint(g);
}

function s7(u) {
  let g = head(u, "骨架", "四段各寫什麼") + htsMetaphorTag();
  const blocks = [
    { x: 70, w: 300, tag: "主張＋為什麼" },
    { x: 390, w: 400, tag: "方法一和二" },
    { x: 810, w: 400, tag: "方法三" },
    { x: 1230, w: 300, tag: "再說一次主張" },
  ];
  const blockStarts = [0.2, 0.8, 1.4, 2.0];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const drop = htsK(u, blockStarts[i], blockStarts[i] + 0.45);
    g += htsBlock(block.x, 300 - 42 * (1 - drop), block.w, 200, HTS_BLUE, drop);
  }

  const tagStarts = [1.0, 1.8, 2.6, 3.1];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    g += htsWorkTag(block.x, 350, block.w, block.tag,
      htsK(u, tagStarts[i], tagStarts[i] + 0.4));
  }

  const iconStarts = [3.5, 4.15, 4.8, 5.45];
  for (let i = 0; i < blocks.length; i++) {
    const iconOp = htsK(u, iconStarts[i], iconStarts[i] + 0.5);
    if (i === 0) {
      g += htsSign(190, 420, 90, 32, "", iconOp, 0, 470);
      g += htsStrut(260, 470, 280, 420, 1, iconOp);
      g += htsStrut(290, 470, 310, 420, 1, iconOp);
    } else if (i === 1) {
      g += htsLabel(540, 450, "1", 34, C.yellow, iconOp);
      g += htsLabel(740, 450, "2", 34, C.yellow, iconOp);
    } else if (i === 2) {
      g += htsLabel(1010, 450, "3", 34, C.yellow, iconOp);
    } else {
      g += htsSign(1380, 420, 90, 32, "", iconOp, 0, 470);
    }
  }

  const phrases = [
    { x: 220, y: 550, text: "從小事做起", start: 6.0 },
    { x: 220, y: 592, text: "習慣會累積", start: 6.65 },
    { x: 590, y: 550, text: "上課專心", start: 7.3 },
    { x: 590, y: 592, text: "作業檢查", start: 7.95 },
    { x: 1010, y: 550, text: "愛護教室", start: 8.6 },
    { x: 1380, y: 550, text: "人人做得到", start: 9.5 },
  ];
  for (const phrase of phrases) {
    g += htsPhrase(phrase.x, phrase.y, phrase.text, 30, C.yellow,
      htsK(u, phrase.start, phrase.start + 0.45), "middle");
  }

  const bracketOp = htsK(u, 11.0, 13.0);
  const groups = [
    { x1: 70, x2: 370, cx: 220, label: "開頭" },
    { x1: 390, x2: 1210, cx: 800, label: "中間" },
    { x1: 1230, x2: 1530, cx: 1380, label: "結尾" },
  ];
  for (const group of groups) {
    g += htsBracket(group.x1, group.x2, 280, bracketOp);
    g += htsLabel(group.cx, 262, group.label, 30, C.chalk, bracketOp);
  }
  return htsPaint(g);
}

function s8(u) {
  let g = head(u, "出處", "同題目兩種寫法") + htsMetaphorTag();
  const leftOp = htsK(u, 0.3, 0.8);
  const rightOp = htsK(u, 0.8, 1.3);
  g += htsCardFrame(120, 250, 640, 520, leftOp, false, C.chalk);
  g += htsCardFrame(840, 250, 640, 520, rightOp, false, C.chalk);
  g += htsLabel(440, 300, "議論文", 34, C.yellow, leftOp);
  g += htsPhrase(440, 345, "〈如何保護山林〉", 30, C.chalk, leftOp, "middle");
  g += htsLabel(1160, 300, "說明文", 34, C.yellow, rightOp);
  g += htsPhrase(1160, 345, "〈如何保護山林〉", 30, C.chalk, rightOp, "middle");

  const leftRows = [
    { y: 410, text: "要防範破壞（論點）", start: 1.5 },
    { y: 468, text: "許多人不重視（論據）", start: 2.05 },
    { y: 526, text: "方法一", start: 2.6 },
    { y: 584, text: "方法二", start: 3.15 },
    { y: 642, text: "方法三", start: 3.7 },
    { y: 700, text: "重申要保護（總結）", start: 4.25 },
  ];
  const rightRows = [
    { y: 410, text: "被破壞的現況", start: 2.0 },
    { y: 468, text: "計畫一", start: 2.6 },
    { y: 526, text: "計畫二", start: 3.2 },
    { y: 584, text: "計畫三", start: 3.8 },
    { y: 642, text: "預期成效", start: 4.4 },
  ];

  const topHighlight = htsK(u, 6.5, 7.0);
  const bottomHighlight = htsK(u, 6.5, 7.0);
  g += "<rect x=\"162\" y=\"376\" width=\"286\" height=\"50\" rx=\"8\" fill=\"rgba(242,193,78,.16)\" opacity=\"" + htsO(topHighlight) + "\"/>";
  g += "<rect x=\"162\" y=\"666\" width=\"286\" height=\"50\" rx=\"8\" fill=\"rgba(242,193,78,.16)\" opacity=\"" + htsO(bottomHighlight) + "\"/>";

  for (const row of leftRows) {
    const op = htsK(u, row.start, row.start + 0.4) * leftOp;
    g += htsPhrase(170, row.y, row.text, 30, C.chalk, op);
  }
  for (const row of rightRows) {
    const op = htsK(u, row.start, row.start + 0.4) * rightOp;
    g += htsPhrase(890, row.y, row.text, 30, C.chalk, op);
  }

  const methodsOp = htsK(u, 5.5, 6.3);
  g += htsLine(290, 500, 290, 652, C.chalk, 4, methodsOp);
  g += htsLine(278, 500, 290, 500, C.chalk, 4, methodsOp);
  g += htsLine(278, 652, 290, 652, C.chalk, 4, methodsOp);
  g += htsPhrase(305, 586, "方法", 30, C.yellow, methodsOp);

  g += htsCurve(720, 400, 750, 545, 720, 690, htsK(u, 7.5, 9.0), 1, C.yellow, 4, "10 8");
  g += htsPhrase(800, 820, "議論文：頭尾都是主張", 34, C.yellow, htsK(u, 9.5, 10.5), "middle");
  return htsPaint(g);
}

function s9(u) {
  let g = head(u, "練習", "換你排骨架") + htsMetaphorTag();
  const title = htsK(u, 0.2, 0.8);
  g += box(580, 200, 440, 72, C.yellow, title, C.deep);
  g += htsLabel(800, 247, "〈如何保護環境〉", 40, C.yellow, title);

  const basketOp = htsK(u, 0.6, 1.4);
  const basketFlash1 = htsFlash(u, 6.0);
  const basketFlash2 = htsFlash(u, 7.0);
  g += htsBasket(620, 340, 200, "理由", basketOp, true, basketFlash1);
  g += htsBasket(980, 340, 200, "方法", basketOp, true, basketFlash2);

  const blocks = [
    { x: 70, w: 300, tag: "主張＋為什麼" },
    { x: 390, w: 400, tag: "方法一和二" },
    { x: 810, w: 400, tag: "方法三" },
    { x: 1230, w: 300, tag: "再說一次主張" },
  ];
  const blockStarts = [1.5, 2.0, 2.5, 3.0];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const op = htsK(u, blockStarts[i], blockStarts[i] + 0.5);
    const flash = htsFlash(u, 8.0 + i);
    g += htsBlock(block.x, 440, block.w, 200, HTS_BLUE, op, true, flash);
    g += htsWorkTag(block.x, 490, block.w, block.tag, op);
  }

  g += htsCurve(220, 650, 800, 780, 1380, 650, htsK(u, 4.5, 5.5), 1, C.yellow, 4, "12 9");
  return htsPaint(g);
}
