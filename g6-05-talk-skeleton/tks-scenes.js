const META = {
  title: "看題目、舉論據",
  subtitle: "10 段・約 2 分鐘・六年級議論文（談論型）第一集",
  ariaLabel: "先看題目分四型：談論、如何、什麼、為何；談論型四段依序寫我的看法、例子加名言、怎麼做到、再說一次；名言也可以當論據。",
  note: "出處：楊裕貿寫作研習資料（國小場、國中場）、楊裕貿議論文教學策略（2023）、名言出處《尚書．大禹謨》。本集資料：projects/essay-writing-animations/g6-05-talk-skeleton/brief.md、timing.json。篩網、題目卡、讀者人偶、泡泡、主張牌、理由牆、撐牆石塊、名言碑、踏腳石、虛線、籃子、藍積木、工作牌是視覺比喻或示意；〈談謙虛〉示範短語與例子自編，小真是虛構人物；〈談誠實〉結構依講義縮短；〈真正的聰明〉〈在挫折中成長〉為講義列舉的課文題目。鍵盤：空白鍵播放／暫停，左右方向鍵切換段落，F 鍵全螢幕。畫面只由時間決定。",
  works: [],
};

const TKS_WOOD = "#a9784f";
const TKS_BLUE = "#7fb6d9";
const TKS_ORANGE = "#F0B27A";
const TKS_YELLOW = "#f2c14e";
const TKS_CREAM = "#efe9d8";
const TKS_INK = "#1a2b23";
const TKS_RED = "#E07A6B";
const tksK = (u, a, b) => ease(P(u, a, b));
const tksLerp = (a, b, k) => a + (b - a) * k;
const tksN = (value) => Number.isFinite(Number(value)) ? Number(Number(value).toFixed(2)) : 0;
const tksO = (value) => Math.max(0, Math.min(1, Number(value) || 0)).toFixed(3);

function tksHead(u, i) {
  const seg = SEGS[i];
  return head(u, seg.grp, seg.name);
}

function tksMetaphorTag(op = 1) {
  if (op <= 0.001) return "";
  return "<g opacity=\"" + tksO(op) + "\">" +
    box(1375, 56, 165, 60, TKS_ORANGE, 1, C.deep) +
    txt(1457, 98, "比喻", { a: "middle", s: 30, w: 1, f: TKS_ORANGE }) + "</g>";
}

function tksLabel(cx, y, value, size = 30, color = C.chalk, op = 1) {
  if (op <= 0.001) return "";
  return txt(cx, y, value, { a: "middle", s: size, w: 1, f: color, o: op });
}

function tksPhrase(x, y, value, size = 30, color = C.chalk, op = 1, anchor = "start") {
  if (op <= 0.001 || !value) return "";
  return txt(x, y, value, { a: anchor, s: size, w: 1, f: color, o: op });
}

function tksLine(x1, y1, x2, y2, color = C.chalk, width = 5, op = 1, dash = "", progress = 1) {
  if (op <= 0.001 || progress <= 0.001) return "";
  const ex = tksLerp(x1, x2, progress);
  const ey = tksLerp(y1, y2, progress);
  return "<path d=\"M" + tksN(x1) + " " + tksN(y1) + " L" + tksN(ex) + " " + tksN(ey) +
    "\" fill=\"none\" stroke=\"" + color + "\" stroke-width=\"" + width +
    "\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"" + tksO(op) + "\"" +
    (dash ? " stroke-dasharray=\"" + dash + "\"" : "") + "/>";
}

function tksArrow(x1, y, x2, op = 1, progress = 1) {
  if (op <= 0.001 || progress <= 0.001) return "";
  const end = tksLerp(x1, x2, progress);
  let g = tksLine(x1, y, end, y, C.yellow, 4, op);
  if (progress >= 0.99) {
    g += "<polygon points=\"" + x2 + "," + y + " " + (x2 - 16) + "," + (y - 9) + " " +
      (x2 - 16) + "," + (y + 9) + "\" fill=\"" + C.yellow + "\" opacity=\"" + tksO(op) + "\"/>";
  }
  return g;
}

function tksPath(d, color = C.chalk, width = 5, op = 1, fill = "none", dash = "") {
  if (op <= 0.001) return "";
  return "<path d=\"" + d + "\" fill=\"" + fill + "\" stroke=\"" + color +
    "\" stroke-width=\"" + width + "\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"" +
    tksO(op) + "\"" + (dash ? " stroke-dasharray=\"" + dash + "\"" : "") + "/>";
}

function tksCircle(cx, cy, r, stroke = C.chalk, width = 5, fill = "none", op = 1, dash = "") {
  if (op <= 0.001 || r <= 0) return "";
  return "<circle cx=\"" + tksN(cx) + "\" cy=\"" + tksN(cy) + "\" r=\"" + tksN(r) +
    "\" fill=\"" + fill + "\" stroke=\"" + stroke + "\" stroke-width=\"" + width +
    "\" opacity=\"" + tksO(op) + "\"" + (dash ? " stroke-dasharray=\"" + dash + "\"" : "") + "/>";
}

function tksEllipse(cx, cy, rx, ry, stroke = C.yellow, width = 4, op = 1) {
  if (op <= 0.001) return "";
  return "<ellipse cx=\"" + tksN(cx) + "\" cy=\"" + tksN(cy) + "\" rx=\"" + tksN(rx) +
    "\" ry=\"" + tksN(ry) + "\" fill=\"none\" stroke=\"" + stroke + "\" stroke-width=\"" +
    width + "\" opacity=\"" + tksO(op) + "\"/>";
}

function tksBlock(x, y, w, h, color, op = 1, dashed = false, flash = 0) {
  if (op <= 0.001 || w <= 2 || h <= 2) return "";
  if (dashed) {
    const fill = flash > 0.01 ? "rgba(242,193,78," + (0.5 * flash).toFixed(3) + ")" : "rgba(239,233,216,.012)";
    return "<rect x=\"" + tksN(x) + "\" y=\"" + tksN(y) + "\" width=\"" + tksN(w) +
      "\" height=\"" + tksN(h) + "\" rx=\"14\" fill=\"" + fill + "\" stroke=\"" + color +
      "\" stroke-width=\"5\" stroke-dasharray=\"14 10\" opacity=\"" + tksO(op) + "\"/>";
  }
  return "<rect x=\"" + tksN(x) + "\" y=\"" + tksN(y) + "\" width=\"" + tksN(w) +
    "\" height=\"" + tksN(h) + "\" rx=\"14\" fill=\"" + color +
    "\" fill-opacity=\".22\" stroke=\"" + C.chalk + "\" stroke-width=\"4\" opacity=\"" + tksO(op) + "\"/>";
}

function tksCardFrame(x, y, w, h, op = 1, dashed = false, stroke = C.chalk) {
  if (op <= 0.001) return "";
  if (dashed) {
    return "<rect x=\"" + x + "\" y=\"" + y + "\" width=\"" + w + "\" height=\"" + h +
      "\" rx=\"18\" fill=\"rgba(239,233,216,.012)\" stroke=\"" + stroke +
      "\" stroke-width=\"4\" stroke-dasharray=\"13 9\" opacity=\"" + tksO(op) + "\"/>";
  }
  return "<g opacity=\"" + tksO(op) + "\">" + box(x, y, w, h, stroke, 1, "rgba(239,233,216,.015)") + "</g>";
}

function tksDashedRoundFrame(x, y, w, h, progress, id, op = 1, radius = 18) {
  if (progress <= 0.001 || op <= 0.001) return "";
  const d = "M" + tksN(x + radius) + " " + tksN(y) + " H" + tksN(x + w - radius) +
    " A" + radius + " " + radius + " 0 0 1 " + tksN(x + w) + " " + tksN(y + radius) +
    " V" + tksN(y + h - radius) + " A" + radius + " " + radius + " 0 0 1 " +
    tksN(x + w - radius) + " " + tksN(y + h) + " H" + tksN(x + radius) +
    " A" + radius + " " + radius + " 0 0 1 " + tksN(x) + " " + tksN(y + h - radius) +
    " V" + tksN(y + radius) + " A" + radius + " " + radius + " 0 0 1 " +
    tksN(x + radius) + " " + tksN(y) + " Z";
  const perimeter = 2 * (w + h - 4 * radius) + 2 * Math.PI * radius;
  const reveal = tksN(perimeter * Math.max(0, Math.min(1, progress)));
  return "<defs><mask id=\"" + id + "\" maskUnits=\"userSpaceOnUse\" maskContentUnits=\"userSpaceOnUse\" x=\"" +
    tksN(x - 8) + "\" y=\"" + tksN(y - 8) + "\" width=\"" + tksN(w + 16) + "\" height=\"" +
    tksN(h + 16) + "\"><rect x=\"" + tksN(x - 8) + "\" y=\"" + tksN(y - 8) + "\" width=\"" +
    tksN(w + 16) + "\" height=\"" + tksN(h + 16) + "\" fill=\"black\"/><path d=\"" + d +
    "\" fill=\"none\" stroke=\"white\" stroke-width=\"9\" stroke-linecap=\"butt\" pathLength=\"" +
    tksN(perimeter) + "\" stroke-dasharray=\"" + reveal + " " + tksN(perimeter) +
    "\"/></mask></defs><path d=\"" + d + "\" fill=\"none\" stroke=\"" + C.yellow +
    "\" stroke-width=\"3\" stroke-dasharray=\"10 8\" opacity=\"" + tksO(op) + "\" mask=\"url(#" + id + ")\"/>";
}

function tksCheck(cx, cy, scale = 1, op = 1) {
  if (op <= 0.01) return "";
  return "<path d=\"M" + tksN(cx - 30 * scale) + " " + tksN(cy) + " L" +
    tksN(cx - 8 * scale) + " " + tksN(cy + 23 * scale) + " L" +
    tksN(cx + 37 * scale) + " " + tksN(cy - 30 * scale) +
    "\" fill=\"none\" stroke=\"#8fd18a\" stroke-width=\"" + (11 * scale) +
    "\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"" + tksO(op) + "\"/>";
}

function tksCross(cx, cy, scale, op) {
  if (op <= 0.01) return "";
  const half = 30 * scale;
  return "<g opacity=\"" + tksO(op) + "\" stroke=\"" + TKS_RED + "\" stroke-width=\"8\" stroke-linecap=\"round\"><path d=\"M" +
    tksN(cx - half) + " " + tksN(cy - half) + " L" + tksN(cx + half) + " " + tksN(cy + half) +
    " M" + tksN(cx + half) + " " + tksN(cy - half) + " L" + tksN(cx - half) + " " + tksN(cy + half) + "\"/></g>";
}

function tksFlash(u, start) {
  const fadeIn = tksK(u, start, start + 0.08);
  const fadeOut = 1 - tksK(u, start + 0.42, start + 0.5);
  return Math.max(0, Math.min(fadeIn, fadeOut));
}

function tksPaint(svg) {
  return svg.replace(/font-size="24"/g, "font-size=\"26\"")
    .replace(/<text ([^>]*?)fill="([^"]+)"/g, '<text $1style="fill:$2" fill="$2"');
}

function tksWorkTag(x, y, w, value, op = 1) {
  return tksLabel(x + w / 2, y, value, 34, C.chalk, op);
}

function tksTag(x, y, w, label, op = 1) {
  if (op <= 0.001) return "";
  return "<g opacity=\"" + tksO(op) + "\">" + box(x, y, w, 64, C.yellow, 1, "rgba(26,43,35,.94)") +
    txt(x + w / 2, y + 42, label, { a: "middle", s: 30, w: 1, f: C.chalk }) + "</g>";
}

function tksSign(cx, boardY, w, h, label, op, tilt = 0, postBottom, dashed = false) {
  if (op <= 0.001) return "";
  const bottom = Number.isFinite(postBottom) ? postBottom : boardY + h / 2 + 170;
  const dash = dashed ? ' stroke-dasharray="10 7"' : "";
  let g = "<g transform=\"translate(" + tksN(cx) + " " + tksN(bottom) + ") rotate(" +
    tksN(tilt) + ") translate(" + tksN(-cx) + " " + tksN(-bottom) + ")\" opacity=\"" +
    tksO(op) + "\" stroke-linecap=\"round\" stroke-linejoin=\"round\">";
  g += "<path d=\"M" + tksN(cx) + " " + tksN(boardY + h / 2) + " L" + tksN(cx) + " " +
    tksN(bottom) + "\" fill=\"none\" stroke=\"" + C.chalk + "\" stroke-width=\"8\"" + dash + "/>";
  g += "<rect x=\"" + tksN(cx - w / 2) + "\" y=\"" + tksN(boardY - h / 2) + "\" width=\"" +
    tksN(w) + "\" height=\"" + tksN(h) + "\" rx=\"10\" fill=\"" + (dashed ? "none" : "rgba(242,193,78,.12)") +
    "\" stroke=\"" + C.yellow + "\" stroke-width=\"5\"" + dash + "/>";
  if (label) g += txt(cx, boardY + 11, label, { a: "middle", s: 30, w: 1, f: C.chalk });
  else if (!dashed) g += "<path d=\"M" + tksN(cx - w * 0.22) + " " + tksN(boardY - h * 0.12) +
    " H" + tksN(cx + w * 0.22) + " M" + tksN(cx - w * 0.22) + " " + tksN(boardY + h * 0.12) +
    " H" + tksN(cx + w * 0.22) + "\" fill=\"none\" stroke=\"rgba(239,233,216,.72)\" stroke-width=\"4\"/>";
  return g + "</g>";
}

function tksBoard(x1, x2, y, h, label, op, tilt = 0, pivotX, pivotY) {
  if (op <= 0.001) return "";
  const px = Number.isFinite(pivotX) ? pivotX : (x1 + x2) / 2;
  const py = Number.isFinite(pivotY) ? pivotY : y + h / 2;
  let g = "<g transform=\"translate(" + tksN(px) + " " + tksN(py) + ") rotate(" + tksN(tilt) +
    ") translate(" + tksN(-px) + " " + tksN(-py) + ")\" opacity=\"" + tksO(op) + "\">";
  g += "<rect x=\"" + tksN(x1) + "\" y=\"" + tksN(y) + "\" width=\"" + tksN(x2 - x1) +
    "\" height=\"" + tksN(h) + "\" rx=\"10\" fill=\"rgba(242,193,78,.12)\" stroke=\"" +
    C.yellow + "\" stroke-width=\"5\"/>";
  if (label) g += txt((x1 + x2) / 2, y + h / 2 + 11, label, { a: "middle", s: 30, w: 1, f: C.chalk });
  return g + "</g>";
}

function tksStone(x, y, w, h, color, phrase, step, op, slide = 1, dashed = false) {
  if (op <= 0.001 || w <= 2 || h <= 2) return "";
  const direction = x < 800 ? -1 : 1;
  const shift = direction * 120 * (1 - Math.max(0, Math.min(1, slide)));
  const border = w < 50 ? 4 : 5;
  const fill = color === TKS_ORANGE ? "rgba(240,178,122,.12)" : color === TKS_BLUE ? "rgba(127,182,217,.12)" : "rgba(242,193,78,.12)";
  const dash = dashed ? ' stroke-dasharray="8 6"' : "";
  let g = "<g transform=\"translate(" + tksN(shift) + " 0)\" opacity=\"" + tksO(op) + "\">";
  g += "<rect x=\"" + tksN(x) + "\" y=\"" + tksN(y) + "\" width=\"" + tksN(w) + "\" height=\"" +
    tksN(h) + "\" rx=\"14\" fill=\"" + (dashed ? "none" : fill) + "\" stroke=\"" + color +
    "\" stroke-width=\"" + border + "\"" + dash + "/>";
  if (!dashed && w >= 80 && h >= 60) {
    g += "<path d=\"M" + tksN(x + 12) + " " + tksN(y + 14) + " l10 8 M" + tksN(x + w - 24) +
      " " + tksN(y + h - 16) + " l10 -8\" fill=\"none\" stroke=\"rgba(239,233,216,.35)\" stroke-width=\"2\"/>";
    if (step) g += txt(x + w / 2, y + 30, step, { a: "middle", s: 24, w: 1, f: "rgba(239,233,216,.75)" });
    if (phrase) g += txt(x + w / 2, y + 76, phrase, { a: "middle", s: 30, w: 1, f: C.chalk });
  } else if (!dashed && phrase) {
    g += txt(x + w / 2, y + h / 2 + 11, phrase, { a: "middle", s: 30, w: 1, f: C.chalk });
  }
  return g + "</g>";
}

function tksWall(x, top, w, bottom, label, op, tilt = 0, grow = 1, flash = 0, dashed = false, labelOp = 1) {
  if (op <= 0.001 || grow <= 0.001) return "";
  const visibleTop = bottom - (bottom - top) * Math.max(0, Math.min(1, grow));
  const visibleH = bottom - visibleTop;
  const cx = x + w / 2;
  const clipId = "tks-wall-clip-" + [x, top, w, bottom].join("-");
  const dash = dashed ? ' stroke-dasharray="12 9"' : "";
  let g = "<defs><clipPath id=\"" + clipId + "\" clipPathUnits=\"userSpaceOnUse\"><rect x=\"" +
    tksN(x - 4) + "\" y=\"" + tksN(visibleTop) + "\" width=\"" + tksN(w + 8) + "\" height=\"" +
    tksN(visibleH + 4) + "\"/></clipPath></defs>";
  g += "<g transform=\"translate(" + tksN(cx) + " " + tksN(bottom) + ") rotate(" + tksN(tilt) +
    ") translate(" + tksN(-cx) + " " + tksN(-bottom) + ")\" opacity=\"" + tksO(op) + "\">";
  const fill = flash > 0.01 ? "rgba(242,193,78," + (0.5 * flash).toFixed(3) + ")" : "rgba(239,233,216,.04)";
  g += "<g clip-path=\"url(#" + clipId + ")\"><rect x=\"" + tksN(x) + "\" y=\"" + tksN(top) +
    "\" width=\"" + tksN(w) + "\" height=\"" + tksN(bottom - top) + "\" fill=\"" +
    (dashed ? "none" : fill) + "\" stroke=\"" + C.chalk + "\" stroke-width=\"5\"" + dash + "/>";
  if (!dashed) {
    for (let row = 0, yy = top; yy <= bottom; row++, yy += 36) {
      g += tksLine(x, yy, x + w, yy, "rgba(239,233,216,.46)", 2);
      const offset = row % 2 ? 30 : 0;
      for (let k = -1; k <= Math.ceil(w / 60); k++) {
        const vx = x + offset + k * 60;
        if (vx > x && vx < x + w) g += tksLine(vx, yy, vx, Math.min(bottom, yy + 36), "rgba(239,233,216,.46)", 2);
      }
    }
  }
  g += "</g>";
  if (label && !dashed && grow >= 0.98 && labelOp > 0.001) {
    const plateY = top + 70;
    g += "<g opacity=\"" + tksO(labelOp) + "\"><rect x=\"" + tksN(x + 12) + "\" y=\"" +
      tksN(plateY) + "\" width=\"" + tksN(w - 24) + "\" height=\"60\" fill=\"rgba(26,43,35,.96)\" stroke=\"" +
      C.chalk + "\" stroke-width=\"3\"/>" + txt(x + w / 2, top + 111, label, { a: "middle", s: 30, w: 1, f: C.chalk }) + "</g>";
  }
  return g + "</g>";
}

function tksQuestionSign(x, y, w, h, value, size, op, flash = 0) {
  if (op <= 0.001) return "";
  const fill = flash > 0.01 ? "rgba(242,193,78," + (0.5 * flash).toFixed(3) + ")" : "rgba(242,193,78,.10)";
  return "<g opacity=\"" + tksO(op) + "\">" + box(x, y, w, h, C.yellow, 1, fill) +
    txt(x + w / 2, y + h / 2 + size * 0.34, value, { a: "middle", s: size, w: 1, f: C.yellow }) + "</g>";
}

function tksBasket(cx, cy, w, label, op, dashed = false, flash = 0) {
  if (op <= 0.001) return "";
  const top = cy - 50, bottom = cy + 50, halfTop = w / 2, halfBottom = w * 0.4;
  const fill = flash > 0.01 ? "rgba(242,193,78," + (0.5 * flash).toFixed(3) + ")" : (dashed ? "none" : "rgba(239,233,216,.025)");
  const dash = dashed ? ' stroke-dasharray="11 8"' : "";
  let g = "<g opacity=\"" + tksO(op) + "\"><path d=\"M" + tksN(cx - halfTop) + " " + tksN(top) +
    " L" + tksN(cx + halfTop) + " " + tksN(top) + " L" + tksN(cx + halfBottom) + " " +
    tksN(bottom) + " L" + tksN(cx - halfBottom) + " " + tksN(bottom) + " Z\" fill=\"" + fill +
    "\" stroke=\"" + C.chalk + "\" stroke-width=\"4\"" + dash + "/>";
  if (!dashed) g += "<path d=\"M" + tksN(cx - w * 0.31) + " " + tksN(cy - 20) + " L" +
    tksN(cx - w * 0.24) + " " + tksN(cy + 22) + " M" + tksN(cx + w * 0.31) + " " +
    tksN(cy - 20) + " L" + tksN(cx + w * 0.24) + " " + tksN(cy + 22) +
    "\" fill=\"none\" stroke=\"" + C.chalk + "\" stroke-width=\"2\" opacity=\".45\"/>";
  g += txt(cx, cy + 12, label, { a: "middle", s: 34, w: 1, f: C.yellow });
  return g + "</g>";
}

function tksDoll(cx, cy, scale = 1, op = 1, nod = 0) {
  const dy = 10 * Math.sin(Math.PI * Math.max(0, Math.min(1, nod)));
  return "<g transform=\"translate(" + tksN(cx) + " " + tksN(cy + dy) + ") scale(" + tksN(scale) +
    ")\" opacity=\"" + tksO(op) + "\" stroke-linecap=\"round\" stroke-linejoin=\"round\">" +
    "<circle cx=\"0\" cy=\"-72\" r=\"31\" fill=\"rgba(240,217,189,.55)\" stroke=\"" + C.chalk + "\" stroke-width=\"5\"/>" +
    "<path d=\"M-28 -77 Q-21 -112 4 -105 Q27 -99 29 -75 Q9 -90 -4 -87 Q-18 -83 -28 -77Z\" fill=\"" + TKS_WOOD +
    "\" stroke=\"" + C.chalk + "\" stroke-width=\"3\"/><path d=\"M-43 43 Q-40 -28 0 -28 Q40 -28 43 43Z\" fill=\"rgba(127,182,217,.28)\" stroke=\"" +
    C.chalk + "\" stroke-width=\"5\"/><path d=\"M-37 -5 L-70 26 M37 -5 L70 26 M-19 43 L-30 91 M19 43 L30 91\" fill=\"none\" stroke=\"" +
    C.chalk + "\" stroke-width=\"9\"/><circle cx=\"-10\" cy=\"-67\" r=\"3\" fill=\"" + TKS_WOOD +
    "\"/><circle cx=\"10\" cy=\"-67\" r=\"3\" fill=\"" + TKS_WOOD + "\"/></g>";
}

function tksBubble(x, y, w, h, op = 1, tail = "down", flash = 0) {
  if (op <= 0.001) return "";
  let tailPath = "";
  if (tail === "up") {
    tailPath = "<path d=\"M" + tksN(x + w * 0.48) + " " + tksN(y + 1) + " L" + tksN(x + w * 0.62) + " " +
      tksN(y + 1) + " L" + tksN(x + w * 0.55) + " " + tksN(y - 18) +
      " Z\" fill=\"rgba(35,57,47,.95)\" stroke=\"" + C.chalk + "\" stroke-width=\"4\" stroke-linejoin=\"round\"/>";
  } else if (tail === "leftDown") {
    tailPath = "<path d=\"M" + tksN(x + 16) + " " + tksN(y + h - 1) + " L" + tksN(x + 36) + " " + tksN(y + h - 1) +
      " L" + tksN(x - 10) + " " + tksN(y + h + 10) + " Z\" fill=\"rgba(35,57,47,.95)\" stroke=\"" + C.chalk + "\" stroke-width=\"4\" stroke-linejoin=\"round\"/>";
  } else if (tail === "down") {
    tailPath = "<path d=\"M" + tksN(x + w * 0.48) + " " + tksN(y + h - 1) + " L" + tksN(x + w * 0.62) + " " +
      tksN(y + h - 1) + " L" + tksN(x + w * 0.55) + " " + tksN(y + h + 18) +
      " Z\" fill=\"rgba(35,57,47,.95)\" stroke=\"" + C.chalk + "\" stroke-width=\"4\" stroke-linejoin=\"round\"/>";
  }
  const fill = flash > 0.01 ? "rgba(242,193,78," + (0.5 * flash).toFixed(3) + ")" : "rgba(239,233,216,.06)";
  return "<g opacity=\"" + tksO(op) + "\"><rect x=\"" + tksN(x) + "\" y=\"" + tksN(y) + "\" width=\"" +
    tksN(w) + "\" height=\"" + tksN(h) + "\" rx=\"18\" fill=\"" + fill + "\" stroke=\"" +
    C.chalk + "\" stroke-width=\"4\"/>" + tailPath + "</g>";
}

function tksBracket(x1, x2, y, progress, op = 1) {
  if (op <= 0.001 || progress <= 0.001) return "";
  const end = x1 + (x2 - x1) * progress;
  return "<path d=\"M" + tksN(x1) + " " + tksN(y - 7) + " L" + tksN(x1) + " " + tksN(y) +
    " L" + tksN(end) + " " + tksN(y) + " L" + tksN(end) + " " + tksN(y - 7) +
    "\" fill=\"none\" stroke=\"" + C.yellow + "\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"" + tksO(op) + "\"/>";
}

function tksCurve(x1, y1, cx, cy, x2, y2, k, op = 1, color = C.yellow, width = 4, dash = "") {
  if (op <= 0.001 || k <= 0.001) return "";
  const px = tksLerp(x1, cx, k), py = tksLerp(y1, cy, k);
  const qx = tksLerp(cx, x2, k), qy = tksLerp(cy, y2, k);
  const ex = tksLerp(px, qx, k), ey = tksLerp(py, qy, k);
  return tksPath("M" + tksN(x1) + " " + tksN(y1) + " Q" + tksN(px) + " " + tksN(py) + " " + tksN(ex) + " " + tksN(ey), color, width, op, "none", dash);
}

function tksStageTitle(u, value) {
  return tksLabel(800, 240, value, 36, C.yellow, tksK(u, 0.2, 0.8));
}


function tksNet(x1,x2,y,op,lit=0){
  if(op<=.001)return ""; const k=Math.max(0,Math.min(1,lit)), c=k>.01?TKS_YELLOW:TKS_CREAM;
  let g="<g opacity=\""+tksO(op)+"\">";
  if(k>.01)g+="<rect x=\""+x1+"\" y=\""+(y-4)+"\" width=\""+(x2-x1)+"\" height=\"12\" fill=\"rgba(242,193,78,"+(k*.18).toFixed(3)+")\"/>";
  g+=tksLine(x1,y,x2,y,c,4,1,"14 8")+tksLine(x1,y+8,x2,y+8,k>.01?TKS_YELLOW:"rgba(239,233,216,.55)",2);
  for(let x=x1+20;x<x2;x+=40)g+=tksLine(x,y,x+7,y+8,k>.01?TKS_YELLOW:"rgba(239,233,216,.72)",2);
  return g+"</g>";
}
function tksTitleCard(x,y,w,value,size,op){
  if(op<=.001)return "";
  return "<g opacity=\""+tksO(op)+"\"><rect x=\""+x+"\" y=\""+y+"\" width=\""+w+"\" height=\"56\" rx=\"12\" fill=\"rgba(26,43,35,.96)\" stroke=\""+TKS_CREAM+"\" stroke-width=\"4\"/>"+txt(x+w/2,y+38,value,{a:"middle",s:size,w:1,f:TKS_YELLOW})+"</g>";
}
function tksTablet(x,top,w,bottom,line1,line2,base,op,grow=1,dashed=false,textOp=1){
  if(op<=.001||grow<=.001)return ""; const k=Math.max(0,Math.min(1,grow)),r=w/2,vis=bottom-(bottom-top)*k,id="tks-tab-"+[x,top,w,bottom].join("-"),dash=dashed?" stroke-dasharray=\"12 9\"":"";
  const pad=Math.min(20,w*0.25),baseH=Math.min(40,w*0.3); // 小石碑碑座跟著縮，避免像提包
  const d="M"+x+" "+(top+r)+" A"+r+" "+r+" 0 0 1 "+(x+w)+" "+(top+r)+" L"+(x+w)+" "+(bottom-baseH)+" L"+x+" "+(bottom-baseH)+" Z";
  let g="<defs><clipPath id=\""+id+"\" clipPathUnits=\"userSpaceOnUse\"><rect x=\""+(x-24)+"\" y=\""+vis+"\" width=\""+(w+48)+"\" height=\""+(bottom-vis+2)+"\"/></clipPath></defs><g opacity=\""+tksO(op)+"\"><g clip-path=\"url(#"+id+")\">";
  g+="<path d=\""+d+"\" fill=\""+(dashed?"none":"rgba(239,233,216,.06)")+"\" stroke=\""+TKS_CREAM+"\" stroke-width=\"5\""+dash+"/><rect x=\""+(x-pad)+"\" y=\""+(bottom-baseH)+"\" width=\""+(w+2*pad)+"\" height=\""+baseH+"\" fill=\""+(dashed?"none":"rgba(239,233,216,.06)")+"\" stroke=\""+TKS_CREAM+"\" stroke-width=\"4\""+dash+"/>";
  if(!dashed&&k>=.98&&textOp>.001){g+="<g opacity=\""+tksO(textOp)+"\">";if(line1)g+=txt(x+w/2,top+r+56,line1,{a:"middle",s:30,w:1,f:TKS_CREAM});if(line2)g+=txt(x+w/2,top+r+106,line2,{a:"middle",s:30,w:1,f:TKS_CREAM});if(base)g+=txt(x+w/2,bottom-12,base,{a:"middle",s:26,w:1,f:"rgba(239,233,216,.78)"});g+="</g>";}
  return g+"</g></g>";
}
function tksStep(cx,cy,rx,ry,value,op,pop=1,dashed=false){
  if(op<=.001)return "";const scale=.8+.2*Math.max(0,Math.min(1,pop)),dash=dashed?" stroke-dasharray=\"12 8\"":"";
  let g="<g transform=\"translate("+cx+" "+cy+") scale("+tksN(scale)+") translate("+(-cx)+" "+(-cy)+")\" opacity=\""+tksO(op)+"\"><ellipse cx=\""+cx+"\" cy=\""+cy+"\" rx=\""+rx+"\" ry=\""+ry+"\" fill=\""+(dashed?"none":"rgba(240,178,122,.12)")+"\" stroke=\""+TKS_ORANGE+"\" stroke-width=\"5\""+dash+"/>";
  if(!dashed&&value)g+=txt(cx,cy+11,value,{a:"middle",s:30,w:1,f:TKS_CREAM});return g+"</g>";
}
function tksColorTitle(cx,y,before,mark,after,size,op){
  if(op<=.001)return "";return "<text x=\""+cx+"\" y=\""+y+"\" text-anchor=\"middle\" font-size=\""+size+"\" font-weight=\"700\" fill=\""+TKS_CREAM+"\" opacity=\""+tksO(op)+"\"><tspan fill=\""+TKS_CREAM+"\" style=\"fill:"+TKS_CREAM+"\">"+esc(before)+"</tspan><tspan fill=\""+TKS_YELLOW+"\" style=\"fill:"+TKS_YELLOW+"\">"+esc(mark)+"</tspan><tspan fill=\""+TKS_CREAM+"\" style=\"fill:"+TKS_CREAM+"\">"+esc(after)+"</tspan></text>";
}
function tksOuterFrame(x,y,w,h,op){
  if(op<=.001)return "";const left=Math.max(62,x-6),right=Math.min(1538,x+w+6);
  return "<rect x=\""+left+"\" y=\""+(y-6)+"\" width=\""+(right-left)+"\" height=\""+(h+12)+"\" rx=\"20\" fill=\"none\" stroke=\""+TKS_YELLOW+"\" stroke-width=\"4\" opacity=\""+tksO(op)+"\"/>";
}
function tksArrowTo(x1,y1,x2,y2,op=1,p=1,size=16){
  if(op<=.001||p<=.001)return "";const ex=tksLerp(x1,x2,p),ey=tksLerp(y1,y2,p),a=Math.atan2(y2-y1,x2-x1);
  let g=tksLine(x1,y1,ex,ey,TKS_YELLOW,4,op);if(p>=.99){g+="<polygon points=\""+x2+","+y2+" "+tksN(x2-size*Math.cos(a-.48))+","+tksN(y2-size*Math.sin(a-.48))+" "+tksN(x2-size*Math.cos(a+.48))+","+tksN(y2-size*Math.sin(a+.48))+"\" fill=\""+TKS_YELLOW+"\" opacity=\""+tksO(op)+"\"/>";}return g;
}
function tksJump(x1,y1,x2,y2,p,h=60){const k=Math.max(0,Math.min(1,p));return{x:tksLerp(x1,x2,k),y:tksLerp(y1,y2,k)-4*h*k*(1-k)};}
function tksWallTilt(u,start,a,b,c){
  if(u<start)return 0;let amp=4;amp=tksLerp(4,2.6,tksK(u,a,a+.5));amp=tksLerp(amp,1.6,tksK(u,b,b+.5));amp=tksLerp(amp,1,tksK(u,c,c+.5));return amp*Math.sin(2*Math.PI*u/1.4);
}
function s1(u){
  let g=tksHead(u,0)+tksMetaphorTag();
  const rows=[
    {y:300,q:"有「談」「論」？",type:"談論型",start:.2,drop:[2.8,3.4],slide:[4,4.6],w:230,text:"〈談謙虛〉"},
    {y:430,q:"有「如何」「怎樣」？",type:"如何型",start:.7,drop:[5,5.9],slide:[6.4,7],w:340,text:"〈如何做一個好學生〉"},
    {y:560,q:"前面加「什麼是」？",type:"什麼型",start:1.2,drop:[7.4,8.6],slide:[8.9,9.5],w:250,text:"〈真正的聰明〉"},
    {y:690,q:"前面加「為什麼要」？",type:"為何型",start:1.7,drop:[10.4,11.8],slide:[12.1,12.7],w:290,text:"〈在挫折中成長〉"}
  ];
  rows.forEach((r,i)=>{
    const op=tksK(u,r.start,r.start+.5),caught=tksK(u,r.drop[1],r.drop[1]+.5),tagY=r.y-62;
    g+=tksNet(560,1000,r.y,op,caught)+tksPhrase(540,r.y+10,r.q,30,TKS_CREAM,op,"end")+tksTag(1380,tagY,160,r.type,op)+tksOuterFrame(1380,tagY,160,64,caught);
    const drop=tksK(u,r.drop[0],r.drop[1]),slide=tksK(u,r.slide[0],r.slide[1]),x=tksLerp(780-r.w/2,1016,slide),y=tksLerp(200,r.y-62,drop);
    g+=tksTitleCard(x,y,r.w,r.text,30,tksK(u,r.drop[0],r.drop[0]+.12));
  });
  const b3=tksK(u,9.7,10.2),b4=tksK(u,12.9,13.4);
  g+=tksBubble(1030,566,340,50,b3,"none")+tksLabel(1200,600,"什麼是真正的聰明 ✓",30,TKS_CREAM,b3);
  g+=tksBubble(1000,696,370,50,b4,"none")+tksLabel(1185,730,"為什麼要在挫折中成長 ✓",30,TKS_CREAM,b4);
  return tksPaint(g);
}
function s2(u){
  let g=tksHead(u,1)+tksMetaphorTag()+tksTag(710,226,180,"談論型",tksK(u,.2,.8));
  const cards=[
    {x:120,b:"〈",m:"談",a:"謙虛〉",start:.8},
    {x:600,b:"〈",m:"論",a:"守時〉",start:1.8},
    {x:1080,b:"〈",m:"談",a:"環境保護〉",start:2.8}
  ];
  cards.forEach((c,i)=>{
    const op=tksK(u,c.start,c.start+.6),lit=tksK(u,4.5+i*.25,4.75+i*.25);
    g+=tksCardFrame(c.x,320,400,200,op)+tksOuterFrame(c.x,320,400,200,lit)+tksColorTitle(c.x+200,435,c.b,c.m,c.a,40,op);
  });
  const f=tksK(u,6,7);g+=tksBasket(560,tksLerp(520,720,f),220,"理由",f)+tksBasket(1040,tksLerp(520,720,f),220,"方法",f);
  g+=tksLabel(800,620,"先蒐集",34,TKS_YELLOW,tksK(u,7.5,8.3));return tksPaint(g);
}
function s3(u){
  let g=tksHead(u,2)+tksMetaphorTag()+tksStageTitle(u,"論點＝我的看法")+tksLine(560,760,840,760,TKS_CREAM,4,1);
  const d=tksK(u,.3,1),y=tksLerp(300,470,d),b=tksK(u,3,3.6);
  g+=tksSign(700,y,300,90,"做人要謙虛",d,0,760)+tksDoll(1300,620,1,tksK(u,.6,.85));
  g+=tksBubble(1190,400,180,64,b,"down",tksFlash(u,6))+tksLabel(1280,442,"為什麼？",30,TKS_CREAM,b);return tksPaint(g);
}
function s4(u){
  let g=tksHead(u,3)+tksMetaphorTag(); // timing 段名已同題示段標題，避免重複顯示。
  g+=tksLine(60,760,1540,760,TKS_CREAM,4,1);
  const tilt=tksWallTilt(u,2,5.1,7.1,9.1),bo=tksK(u,.2,.8),grow=tksK(u,.8,1.8);
  g+="<g transform=\"translate(800 760) rotate("+tksN(tilt)+") translate(-800 -760)\">";
  g+=tksBoard(380,1220,290,80,"做人要謙虛",bo)+tksWall(680,370,240,760,"謙虛才會進步",1,0,grow,0,false,tksK(u,1.8,2.2))+"</g>";
  g+=tksStone(380,660,300,100,TKS_ORANGE,"小真","什麼人",tksK(u,4.5,5.1),tksK(u,4.5,5.1));
  g+=tksStone(410,560,270,100,TKS_BLUE,"考第一還請教同學","做什麼事",tksK(u,6.5,7.1),tksK(u,6.5,7.1));
  g+=tksStone(480,460,200,100,TKS_YELLOW,"越學越進步","結果",tksK(u,8.5,9.1),tksK(u,8.5,9.1));
  g+=tksDoll(1350,650,.85,1)+tksBubble(1250,440,180,64,1)+tksLabel(1340,482,"為什麼？",30,TKS_CREAM,1);return tksPaint(g);
}
function s5(u){
  let g=tksHead(u,4)+tksMetaphorTag(); // timing 段名已同題示段標題，避免重複顯示。
  g+=tksLine(60,760,1540,760,TKS_CREAM,4,1);
  const amp=u<2.5?1:tksLerp(1,0,tksK(u,2.5,3)),tilt=amp*Math.sin(2*Math.PI*u/1.4);
  g+="<g transform=\"translate(800 760) rotate("+tksN(tilt)+") translate(-800 -760)\">";
  g+=tksBoard(380,1220,290,80,"做人要謙虛",1)+tksWall(680,370,240,760,"謙虛才會進步",1,0,1,0,false,1)+"</g>";
  g+=tksStone(380,660,300,100,TKS_ORANGE,"小真","",1,1)+tksStone(410,560,270,100,TKS_BLUE,"考第一還請教同學","",1,1)+tksStone(480,460,200,100,TKS_YELLOW,"越學越進步","",1,1);
  const bubble=1-tksK(u,3.2,4);g+=tksDoll(1350,650,.85,1,tksK(u,4.2,5.2))+tksBubble(1250,440,180,64,bubble)+tksLabel(1340,482,"為什麼？",30,TKS_CREAM,bubble);
  const gr=tksK(u,.8,2.2);g+=tksTablet(930,470,230,760,"滿招損，","謙受益","《尚書》",gr,gr,false,tksK(u,2.2,2.6));
  const tag=tksK(u,5.5,6.1);g+=tksTag(490,386,140,"事例",tag)+tksTag(975,386,140,"名言",tag);return tksPaint(g);
}
function s6(u){
  let g=tksHead(u,5)+tksMetaphorTag()+tksStageTitle(u,"方法：怎麼做到")+tksLine(60,760,1540,760,TKS_CREAM,4,1);
  g+=tksSign(1380,470,220,70,"做人要謙虛",tksK(u,.2,.5),0,760);
  g+=tksStep(640,740,170,44,"多聽別人意見",tksK(u,2,2.6),tksK(u,2,2.6))+tksStep(1040,740,170,44,"被誇獎說謝謝",tksK(u,3.5,4.1),tksK(u,3.5,4.1));
  const bubble=tksK(u,.6,.9)*(1-tksK(u,4.5,5));g+=tksBubble(170,470,220,64,bubble)+tksLabel(280,512,"怎麼做到？",30,TKS_CREAM,bubble);
  let doll={x:260,y:678};if(u>=5&&u<6.5)doll=tksJump(260,678,640,614,tksK(u,5,6.5));else if(u>=6.5&&u<7.5)doll={x:640,y:614};else if(u>=7.5&&u<9)doll=tksJump(640,614,1040,614,tksK(u,7.5,9));else if(u>=9)doll={x:1040,y:614};
  g+=tksDoll(doll.x,doll.y,.9,1);return tksPaint(g);
}
function s7(u){
  let g=tksHead(u,6)+tksMetaphorTag()+tksStageTitle(u,"重申論點：再說一次");
  g+=tksSign(330,470,260,80,"做人要謙虛",tksK(u,.3,.7),0,720);
  const r=tksK(u,1,2);g+=tksSign(1000,tksLerp(300,470,r),260,80,"謙虛使人進步",r,0,720);
  g+=tksCurve(1000,428,665,320,330,428,tksK(u,3,5),1,TKS_YELLOW,4,"10 8");
  g+=tksDoll(1380,620,1,tksK(u,.5,.8),tksK(u,5.5,6.5))+tksCheck(1460,470,.5,tksK(u,6.5,7.1));return tksPaint(g);
}
function s8(u){
  let g=tksHead(u,7)+tksMetaphorTag();
  const blocks=[{x:70,w:300,tag:"我的看法"},{x:390,w:400,tag:"例子＋名言"},{x:810,w:400,tag:"怎麼做到"},{x:1230,w:300,tag:"再說一次"}],bs=[.2,.8,1.4,2],ts=[1,1.8,2.6,3.1];
  blocks.forEach((b,i)=>{const d=tksK(u,bs[i],bs[i]+.5);g+=tksBlock(b.x,200+100*d,b.w,200,TKS_BLUE,d);g+=tksWorkTag(b.x,350,b.w,b.tag,tksK(u,ts[i],ts[i]+.4));});
  const starts=[3.5,4.15,4.8,5.45];
  blocks.forEach((b,i)=>{const o=tksK(u,starts[i],starts[i]+.5);if(i===0)g+=tksSign(220,420,90,32,"",o,0,470);else if(i===1){g+=tksWall(575,392,30,476,"",o)+tksStone(515,450,60,26,TKS_ORANGE,"","",o,1)+tksStone(530,424,45,26,TKS_BLUE,"","",o,1)+tksStone(545,398,30,26,TKS_YELLOW,"","",o,1);g+=tksTablet(630,418,28,476,"","","",o,1);}else if(i===2)g+=tksStep(960,450,50,14,"",o)+tksStep(1060,430,50,14,"",o);else g+=tksSign(1380,420,90,32,"",o,0,470);});
  const phrases=[{x:220,y:550,t:"做人要謙虛",s:6},{x:590,y:550,t:"小真請教同學",s:6.65},{x:590,y:592,t:"滿招損謙受益",s:7.3},{x:1010,y:550,t:"多聽別人意見",s:7.95},{x:1010,y:592,t:"被誇獎說謝謝",s:8.6},{x:1380,y:550,t:"謙虛使人進步",s:9.25}];
  phrases.forEach(p=>g+=tksPhrase(p.x,p.y,p.t,30,TKS_YELLOW,tksK(u,p.s,p.s+.4),"middle"));
  const bo=tksK(u,11,13),groups=[{a:70,b:370,x:220,t:"提出問題"},{a:390,b:790,x:590,t:"分析問題"},{a:810,b:1210,x:1010,t:"解決問題"},{a:1230,b:1530,x:1380,t:"結論"}];
  groups.forEach(q=>{g+=tksBracket(q.a,q.b,280,bo)+tksLabel(q.x,262,q.t,30,TKS_CREAM,bo);});return tksPaint(g);
}
function s9(u){
  let g=tksHead(u,8)+tksMetaphorTag()+tksStageTitle(u,"講義的寫法");
  const lo=tksK(u,.3,.8),ro=tksK(u,.8,1.3);g+=tksCardFrame(100,280,600,440,lo)+tksCardFrame(900,280,600,440,ro)+tksLabel(400,330,"〈談誠實〉",34,TKS_YELLOW,lo);
  const left=[{y:395,t:"論點",s:1.5},{y:455,t:"論據一",s:2},{y:515,t:"論據二",s:2.5},{y:575,t:"方法",s:3},{y:635,t:"重申論點",s:3.5}],right=[{y:395,t:"我的看法",s:2},{y:485,t:"例子＋名言",s:2.5},{y:575,t:"怎麼做到",s:3},{y:635,t:"再說一次",s:3.5}];
  left.forEach(r=>g+=tksPhrase(150,r.y,r.t,30,TKS_CREAM,tksK(u,r.s,r.s+.4)));
  right.forEach(r=>g+=tksLabel(1200,r.y,r.t,34,TKS_CREAM,tksK(u,r.s,r.s+.4)));
  const arrows=[{y1:385,y2:385,s:4.5,h:16},{y1:445,y2:470,s:5.1,h:9},{y1:505,y2:480,s:5.7,h:9},{y1:565,y2:565,s:6.3,h:16},{y1:625,y2:625,s:6.9,h:16}];
  arrows.forEach(a=>g+=tksArrowTo(320,a.y1,1080,a.y2,tksK(u,a.s,a.s+.6),1,a.h));
  const no=tksK(u,8.5,9.3);g+=box(450,740,700,72,TKS_CREAM,no,"rgba(26,43,35,.96)")+tksLabel(800,786,"四段時，兩個論據放同一段",30,TKS_CREAM,no);return tksPaint(g);
}
function s10(u){
  let g=tksHead(u,9)+tksMetaphorTag();const title=tksK(u,.2,.6);
  g+=box(560,200,480,72,TKS_CREAM,title,"rgba(26,43,35,.96)")+tksColorTitle(800,247,"〈","論","守時〉",40,title)+tksTag(1060,204,160,"談論型",tksK(u,.6,.8));
  const basket=tksK(u,.8,1.6);g+=tksBasket(620,340,200,"理由",basket,true,tksFlash(u,6.5))+tksBasket(980,340,200,"方法",basket,true,tksFlash(u,7.5));
  const blocks=[{x:70,w:300,t:"我的看法"},{x:390,w:400,t:"例子＋名言"},{x:810,w:400,t:"怎麼做到"},{x:1230,w:300,t:"再說一次"}],starts=[1.6,2.2,2.8,3.4],flashes=[8.5,9.5,10.5,11.5];
  blocks.forEach((b,i)=>{const o=tksK(u,starts[i],starts[i]+.5);g+=tksBlock(b.x,440,b.w,240,TKS_BLUE,o,true,tksFlash(u,flashes[i]))+tksWorkTag(b.x,490,b.w,b.t,o);});
  const io=tksK(u,4,5);g+=tksSign(220,560,90,32,"",io,0,610,true)+tksWall(575,532,30,616,"",io,0,1,0,true);
  g+=tksStone(515,590,60,26,TKS_ORANGE,"","",io,1,true)+tksStone(530,564,45,26,TKS_BLUE,"","",io,1,true)+tksStone(545,538,30,26,TKS_YELLOW,"","",io,1,true)+tksTablet(630,558,28,616,"","","",io,1,true);
  g+=tksStep(960,590,50,14,"",io,1,true)+tksStep(1060,570,50,14,"",io,1,true)+tksSign(1380,560,90,32,"",io,0,610,true);
  g+=tksCurve(220,690,800,800,1380,690,tksK(u,5,6),1,TKS_YELLOW,4,"12 9");return tksPaint(g);
}
