const META = {
  title: "為什麼重要？用例子說服人",
  subtitle: "10 段・約 2 分鐘・五年級議論文（為何型）第一集",
  ariaLabel: "為何型問為什麼重要，四段依序寫我的看法、理由一加例子、理由二加例子、再說一次加怎麼做；中間兩段可以寫正例加反例或兩個正例，先問反例說得通嗎。",
  note: "出處：楊裕貿作文寫作要領、寫作研習資料、作文仿寫學習單、分步學寫議論文、如何把握時間講義、敏銳觀察講義。題目卡、讀者人偶、泡泡、主張牌、理由牆、撐牆石塊、小牌、問號牌、虛線、籃子、藍積木、工作牌是視覺比喻或示意；〈守信的重要〉示範短語與例子自編，小安是虛構人物；〈分享的快樂〉四段依講義結構表縮短。鍵盤：空白鍵播放／暫停，左右方向鍵切換段落，F 鍵全螢幕。畫面只由時間決定。",
  works: [],
};

const WYS_WOOD = "#a9784f";
const WYS_BLUE = "#7fb6d9";
const WYS_ORANGE = "#F0B27A";
const WYS_YELLOW = "#f2c14e";
const WYS_CREAM = "#efe9d8";
const WYS_INK = "#1a2b23";
const WYS_RED = "#E07A6B";
const wysK = (u, a, b) => ease(P(u, a, b));
const wysLerp = (a, b, k) => a + (b - a) * k;
const wysN = (value) => Number.isFinite(Number(value)) ? Number(Number(value).toFixed(2)) : 0;
const wysO = (value) => Math.max(0, Math.min(1, Number(value) || 0)).toFixed(3);

function wysHead(u, index) {
  const seg = SEGS[index];
  return head(u, seg.grp, seg.name);
}

function wysMetaphorTag(op = 1) {
  if (op <= 0.001) return "";
  return "<g opacity=\"" + wysO(op) + "\">" +
    box(1375, 56, 165, 60, WYS_ORANGE, 1, C.deep) +
    txt(1457, 98, "比喻", { a: "middle", s: 30, w: 1, f: WYS_ORANGE }) + "</g>";
}

function wysLabel(cx, y, value, size = 30, color = C.chalk, op = 1) {
  if (op <= 0.001) return "";
  return txt(cx, y, value, { a: "middle", s: size, w: 1, f: color, o: op });
}

function wysPhrase(x, y, value, size = 30, color = C.chalk, op = 1, anchor = "start") {
  if (op <= 0.001 || !value) return "";
  return txt(x, y, value, { a: anchor, s: size, w: 1, f: color, o: op });
}

function wysLine(x1, y1, x2, y2, color = C.chalk, width = 5, op = 1, dash = "", progress = 1) {
  if (op <= 0.001 || progress <= 0.001) return "";
  const ex = wysLerp(x1, x2, progress);
  const ey = wysLerp(y1, y2, progress);
  return "<path d=\"M" + wysN(x1) + " " + wysN(y1) + " L" + wysN(ex) + " " + wysN(ey) +
    "\" fill=\"none\" stroke=\"" + color + "\" stroke-width=\"" + width +
    "\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"" + wysO(op) + "\"" +
    (dash ? " stroke-dasharray=\"" + dash + "\"" : "") + "/>";
}

function wysArrow(x1, y, x2, op = 1, progress = 1) {
  if (op <= 0.001 || progress <= 0.001) return "";
  const end = wysLerp(x1, x2, progress);
  let g = wysLine(x1, y, end, y, C.yellow, 4, op);
  if (progress >= 0.99) {
    g += "<polygon points=\"" + x2 + "," + y + " " + (x2 - 16) + "," + (y - 9) + " " +
      (x2 - 16) + "," + (y + 9) + "\" fill=\"" + C.yellow + "\" opacity=\"" + wysO(op) + "\"/>";
  }
  return g;
}

function wysPath(d, color = C.chalk, width = 5, op = 1, fill = "none", dash = "") {
  if (op <= 0.001) return "";
  return "<path d=\"" + d + "\" fill=\"" + fill + "\" stroke=\"" + color +
    "\" stroke-width=\"" + width + "\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"" +
    wysO(op) + "\"" + (dash ? " stroke-dasharray=\"" + dash + "\"" : "") + "/>";
}

function wysCircle(cx, cy, r, stroke = C.chalk, width = 5, fill = "none", op = 1, dash = "") {
  if (op <= 0.001 || r <= 0) return "";
  return "<circle cx=\"" + wysN(cx) + "\" cy=\"" + wysN(cy) + "\" r=\"" + wysN(r) +
    "\" fill=\"" + fill + "\" stroke=\"" + stroke + "\" stroke-width=\"" + width +
    "\" opacity=\"" + wysO(op) + "\"" + (dash ? " stroke-dasharray=\"" + dash + "\"" : "") + "/>";
}

function wysEllipse(cx, cy, rx, ry, stroke = C.yellow, width = 4, op = 1) {
  if (op <= 0.001) return "";
  return "<ellipse cx=\"" + wysN(cx) + "\" cy=\"" + wysN(cy) + "\" rx=\"" + wysN(rx) +
    "\" ry=\"" + wysN(ry) + "\" fill=\"none\" stroke=\"" + stroke + "\" stroke-width=\"" +
    width + "\" opacity=\"" + wysO(op) + "\"/>";
}

function wysBlock(x, y, w, h, color, op = 1, dashed = false, flash = 0) {
  if (op <= 0.001 || w <= 2 || h <= 2) return "";
  if (dashed) {
    const fill = flash > 0.01 ? "rgba(242,193,78," + (0.5 * flash).toFixed(3) + ")" : "rgba(239,233,216,.012)";
    return "<rect x=\"" + wysN(x) + "\" y=\"" + wysN(y) + "\" width=\"" + wysN(w) +
      "\" height=\"" + wysN(h) + "\" rx=\"14\" fill=\"" + fill + "\" stroke=\"" + color +
      "\" stroke-width=\"5\" stroke-dasharray=\"14 10\" opacity=\"" + wysO(op) + "\"/>";
  }
  return "<rect x=\"" + wysN(x) + "\" y=\"" + wysN(y) + "\" width=\"" + wysN(w) +
    "\" height=\"" + wysN(h) + "\" rx=\"14\" fill=\"" + color +
    "\" fill-opacity=\".22\" stroke=\"" + C.chalk + "\" stroke-width=\"4\" opacity=\"" + wysO(op) + "\"/>";
}

function wysCardFrame(x, y, w, h, op = 1, dashed = false, stroke = C.chalk) {
  if (op <= 0.001) return "";
  if (dashed) {
    return "<rect x=\"" + x + "\" y=\"" + y + "\" width=\"" + w + "\" height=\"" + h +
      "\" rx=\"18\" fill=\"rgba(239,233,216,.012)\" stroke=\"" + stroke +
      "\" stroke-width=\"4\" stroke-dasharray=\"13 9\" opacity=\"" + wysO(op) + "\"/>";
  }
  return "<g opacity=\"" + wysO(op) + "\">" + box(x, y, w, h, stroke, 1, "rgba(239,233,216,.015)") + "</g>";
}

function wysDashedRoundFrame(x, y, w, h, progress, id, op = 1, radius = 18) {
  if (progress <= 0.001 || op <= 0.001) return "";
  const d = "M" + wysN(x + radius) + " " + wysN(y) + " H" + wysN(x + w - radius) +
    " A" + radius + " " + radius + " 0 0 1 " + wysN(x + w) + " " + wysN(y + radius) +
    " V" + wysN(y + h - radius) + " A" + radius + " " + radius + " 0 0 1 " +
    wysN(x + w - radius) + " " + wysN(y + h) + " H" + wysN(x + radius) +
    " A" + radius + " " + radius + " 0 0 1 " + wysN(x) + " " + wysN(y + h - radius) +
    " V" + wysN(y + radius) + " A" + radius + " " + radius + " 0 0 1 " +
    wysN(x + radius) + " " + wysN(y) + " Z";
  const perimeter = 2 * (w + h - 4 * radius) + 2 * Math.PI * radius;
  const reveal = wysN(perimeter * Math.max(0, Math.min(1, progress)));
  return "<defs><mask id=\"" + id + "\" maskUnits=\"userSpaceOnUse\" maskContentUnits=\"userSpaceOnUse\" x=\"" +
    wysN(x - 8) + "\" y=\"" + wysN(y - 8) + "\" width=\"" + wysN(w + 16) + "\" height=\"" +
    wysN(h + 16) + "\"><rect x=\"" + wysN(x - 8) + "\" y=\"" + wysN(y - 8) + "\" width=\"" +
    wysN(w + 16) + "\" height=\"" + wysN(h + 16) + "\" fill=\"black\"/><path d=\"" + d +
    "\" fill=\"none\" stroke=\"white\" stroke-width=\"9\" stroke-linecap=\"butt\" pathLength=\"" +
    wysN(perimeter) + "\" stroke-dasharray=\"" + reveal + " " + wysN(perimeter) +
    "\"/></mask></defs><path d=\"" + d + "\" fill=\"none\" stroke=\"" + C.yellow +
    "\" stroke-width=\"3\" stroke-dasharray=\"10 8\" opacity=\"" + wysO(op) + "\" mask=\"url(#" + id + ")\"/>";
}

function wysCheck(cx, cy, scale = 1, op = 1) {
  if (op <= 0.01) return "";
  return "<path d=\"M" + wysN(cx - 30 * scale) + " " + wysN(cy) + " L" +
    wysN(cx - 8 * scale) + " " + wysN(cy + 23 * scale) + " L" +
    wysN(cx + 37 * scale) + " " + wysN(cy - 30 * scale) +
    "\" fill=\"none\" stroke=\"#8fd18a\" stroke-width=\"" + (11 * scale) +
    "\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"" + wysO(op) + "\"/>";
}

function wysCross(cx, cy, scale, op) {
  if (op <= 0.01) return "";
  const half = 30 * scale;
  return "<g opacity=\"" + wysO(op) + "\" stroke=\"" + WYS_RED + "\" stroke-width=\"8\" stroke-linecap=\"round\"><path d=\"M" +
    wysN(cx - half) + " " + wysN(cy - half) + " L" + wysN(cx + half) + " " + wysN(cy + half) +
    " M" + wysN(cx + half) + " " + wysN(cy - half) + " L" + wysN(cx - half) + " " + wysN(cy + half) + "\"/></g>";
}

function wysFlash(u, start) {
  const fadeIn = wysK(u, start, start + 0.08);
  const fadeOut = 1 - wysK(u, start + 0.42, start + 0.5);
  return Math.max(0, Math.min(fadeIn, fadeOut));
}

function wysPaint(svg) {
  return svg.replace(/font-size="24"/g, "font-size=\"26\"")
    .replace(/<text ([^>]*?)fill="([^"]+)"/g, '<text $1style="fill:$2" fill="$2"');
}

function wysWorkTag(x, y, w, value, op = 1) {
  return wysLabel(x + w / 2, y, value, 34, C.chalk, op);
}

function wysTag(x, y, w, label, op = 1) {
  if (op <= 0.001) return "";
  return "<g opacity=\"" + wysO(op) + "\">" + box(x, y, w, 64, C.yellow, 1, "rgba(26,43,35,.94)") +
    txt(x + w / 2, y + 42, label, { a: "middle", s: 30, w: 1, f: C.chalk }) + "</g>";
}

function wysSign(cx, boardY, w, h, label, op, tilt = 0, postBottom, dashed = false) {
  if (op <= 0.001) return "";
  const bottom = Number.isFinite(postBottom) ? postBottom : boardY + h / 2 + 170;
  const dash = dashed ? ' stroke-dasharray="10 7"' : "";
  let g = "<g transform=\"translate(" + wysN(cx) + " " + wysN(bottom) + ") rotate(" +
    wysN(tilt) + ") translate(" + wysN(-cx) + " " + wysN(-bottom) + ")\" opacity=\"" +
    wysO(op) + "\" stroke-linecap=\"round\" stroke-linejoin=\"round\">";
  g += "<path d=\"M" + wysN(cx) + " " + wysN(boardY + h / 2) + " L" + wysN(cx) + " " +
    wysN(bottom) + "\" fill=\"none\" stroke=\"" + C.chalk + "\" stroke-width=\"8\"" + dash + "/>";
  g += "<rect x=\"" + wysN(cx - w / 2) + "\" y=\"" + wysN(boardY - h / 2) + "\" width=\"" +
    wysN(w) + "\" height=\"" + wysN(h) + "\" rx=\"10\" fill=\"" + (dashed ? "none" : "rgba(242,193,78,.12)") +
    "\" stroke=\"" + C.yellow + "\" stroke-width=\"5\"" + dash + "/>";
  if (label) g += txt(cx, boardY + 11, label, { a: "middle", s: 30, w: 1, f: C.chalk });
  else if (!dashed) g += "<path d=\"M" + wysN(cx - w * 0.22) + " " + wysN(boardY - h * 0.12) +
    " H" + wysN(cx + w * 0.22) + " M" + wysN(cx - w * 0.22) + " " + wysN(boardY + h * 0.12) +
    " H" + wysN(cx + w * 0.22) + "\" fill=\"none\" stroke=\"rgba(239,233,216,.72)\" stroke-width=\"4\"/>";
  return g + "</g>";
}

function wysBoard(x1, x2, y, h, label, op, tilt = 0, pivotX, pivotY) {
  if (op <= 0.001) return "";
  const px = Number.isFinite(pivotX) ? pivotX : (x1 + x2) / 2;
  const py = Number.isFinite(pivotY) ? pivotY : y + h / 2;
  let g = "<g transform=\"translate(" + wysN(px) + " " + wysN(py) + ") rotate(" + wysN(tilt) +
    ") translate(" + wysN(-px) + " " + wysN(-py) + ")\" opacity=\"" + wysO(op) + "\">";
  g += "<rect x=\"" + wysN(x1) + "\" y=\"" + wysN(y) + "\" width=\"" + wysN(x2 - x1) +
    "\" height=\"" + wysN(h) + "\" rx=\"10\" fill=\"rgba(242,193,78,.12)\" stroke=\"" +
    C.yellow + "\" stroke-width=\"5\"/>";
  if (label) g += txt((x1 + x2) / 2, y + h / 2 + 11, label, { a: "middle", s: 30, w: 1, f: C.chalk });
  return g + "</g>";
}

function wysStone(x, y, w, h, color, phrase, step, op, slide = 1, dashed = false) {
  if (op <= 0.001 || w <= 2 || h <= 2) return "";
  const direction = x < 800 ? -1 : 1;
  const shift = direction * 120 * (1 - Math.max(0, Math.min(1, slide)));
  const border = w < 50 ? 4 : 5;
  const fill = color === WYS_ORANGE ? "rgba(240,178,122,.12)" : color === WYS_BLUE ? "rgba(127,182,217,.12)" : "rgba(242,193,78,.12)";
  const dash = dashed ? ' stroke-dasharray="8 6"' : "";
  let g = "<g transform=\"translate(" + wysN(shift) + " 0)\" opacity=\"" + wysO(op) + "\">";
  g += "<rect x=\"" + wysN(x) + "\" y=\"" + wysN(y) + "\" width=\"" + wysN(w) + "\" height=\"" +
    wysN(h) + "\" rx=\"14\" fill=\"" + (dashed ? "none" : fill) + "\" stroke=\"" + color +
    "\" stroke-width=\"" + border + "\"" + dash + "/>";
  if (!dashed && w >= 80 && h >= 60) {
    g += "<path d=\"M" + wysN(x + 12) + " " + wysN(y + 14) + " l10 8 M" + wysN(x + w - 24) +
      " " + wysN(y + h - 16) + " l10 -8\" fill=\"none\" stroke=\"rgba(239,233,216,.35)\" stroke-width=\"2\"/>";
    if (step) g += txt(x + w / 2, y + 30, step, { a: "middle", s: 24, w: 1, f: "rgba(239,233,216,.75)" });
    if (phrase) g += txt(x + w / 2, y + 76, phrase, { a: "middle", s: 30, w: 1, f: C.chalk });
  } else if (!dashed && phrase) {
    g += txt(x + w / 2, y + h / 2 + 11, phrase, { a: "middle", s: 30, w: 1, f: C.chalk });
  }
  return g + "</g>";
}

function wysWall(x, top, w, bottom, label, op, tilt = 0, grow = 1, flash = 0, dashed = false, labelOp = 1) {
  if (op <= 0.001 || grow <= 0.001) return "";
  const visibleTop = bottom - (bottom - top) * Math.max(0, Math.min(1, grow));
  const visibleH = bottom - visibleTop;
  const cx = x + w / 2;
  const clipId = "wys-wall-clip-" + [x, top, w, bottom].join("-");
  const dash = dashed ? ' stroke-dasharray="12 9"' : "";
  let g = "<defs><clipPath id=\"" + clipId + "\" clipPathUnits=\"userSpaceOnUse\"><rect x=\"" +
    wysN(x - 4) + "\" y=\"" + wysN(visibleTop) + "\" width=\"" + wysN(w + 8) + "\" height=\"" +
    wysN(visibleH + 4) + "\"/></clipPath></defs>";
  g += "<g transform=\"translate(" + wysN(cx) + " " + wysN(bottom) + ") rotate(" + wysN(tilt) +
    ") translate(" + wysN(-cx) + " " + wysN(-bottom) + ")\" opacity=\"" + wysO(op) + "\">";
  const fill = flash > 0.01 ? "rgba(242,193,78," + (0.5 * flash).toFixed(3) + ")" : "rgba(239,233,216,.04)";
  g += "<g clip-path=\"url(#" + clipId + ")\"><rect x=\"" + wysN(x) + "\" y=\"" + wysN(top) +
    "\" width=\"" + wysN(w) + "\" height=\"" + wysN(bottom - top) + "\" fill=\"" +
    (dashed ? "none" : fill) + "\" stroke=\"" + C.chalk + "\" stroke-width=\"5\"" + dash + "/>";
  if (!dashed) {
    for (let row = 0, yy = top; yy <= bottom; row++, yy += 36) {
      g += wysLine(x, yy, x + w, yy, "rgba(239,233,216,.46)", 2);
      const offset = row % 2 ? 30 : 0;
      for (let k = -1; k <= Math.ceil(w / 60); k++) {
        const vx = x + offset + k * 60;
        if (vx > x && vx < x + w) g += wysLine(vx, yy, vx, Math.min(bottom, yy + 36), "rgba(239,233,216,.46)", 2);
      }
    }
  }
  g += "</g>";
  if (label && !dashed && grow >= 0.98 && labelOp > 0.001) {
    const plateY = top + 70;
    g += "<g opacity=\"" + wysO(labelOp) + "\"><rect x=\"" + wysN(x + 12) + "\" y=\"" +
      wysN(plateY) + "\" width=\"" + wysN(w - 24) + "\" height=\"60\" fill=\"rgba(26,43,35,.96)\" stroke=\"" +
      C.chalk + "\" stroke-width=\"3\"/>" + txt(x + w / 2, top + 111, label, { a: "middle", s: 30, w: 1, f: C.chalk }) + "</g>";
  }
  return g + "</g>";
}

function wysQuestionSign(x, y, w, h, value, size, op, flash = 0) {
  if (op <= 0.001) return "";
  const fill = flash > 0.01 ? "rgba(242,193,78," + (0.5 * flash).toFixed(3) + ")" : "rgba(242,193,78,.10)";
  return "<g opacity=\"" + wysO(op) + "\">" + box(x, y, w, h, C.yellow, 1, fill) +
    txt(x + w / 2, y + h / 2 + size * 0.34, value, { a: "middle", s: size, w: 1, f: C.yellow }) + "</g>";
}

function wysBasket(cx, cy, w, label, op, dashed = false, flash = 0) {
  if (op <= 0.001) return "";
  const top = cy - 50, bottom = cy + 50, halfTop = w / 2, halfBottom = w * 0.4;
  const fill = flash > 0.01 ? "rgba(242,193,78," + (0.5 * flash).toFixed(3) + ")" : (dashed ? "none" : "rgba(239,233,216,.025)");
  const dash = dashed ? ' stroke-dasharray="11 8"' : "";
  let g = "<g opacity=\"" + wysO(op) + "\"><path d=\"M" + wysN(cx - halfTop) + " " + wysN(top) +
    " L" + wysN(cx + halfTop) + " " + wysN(top) + " L" + wysN(cx + halfBottom) + " " +
    wysN(bottom) + " L" + wysN(cx - halfBottom) + " " + wysN(bottom) + " Z\" fill=\"" + fill +
    "\" stroke=\"" + C.chalk + "\" stroke-width=\"4\"" + dash + "/>";
  if (!dashed) g += "<path d=\"M" + wysN(cx - w * 0.31) + " " + wysN(cy - 20) + " L" +
    wysN(cx - w * 0.24) + " " + wysN(cy + 22) + " M" + wysN(cx + w * 0.31) + " " +
    wysN(cy - 20) + " L" + wysN(cx + w * 0.24) + " " + wysN(cy + 22) +
    "\" fill=\"none\" stroke=\"" + C.chalk + "\" stroke-width=\"2\" opacity=\".45\"/>";
  g += txt(cx, cy + 12, label, { a: "middle", s: 34, w: 1, f: C.yellow });
  return g + "</g>";
}

function wysDoll(cx, cy, scale = 1, op = 1, nod = 0) {
  const dy = 10 * Math.sin(Math.PI * Math.max(0, Math.min(1, nod)));
  return "<g transform=\"translate(" + wysN(cx) + " " + wysN(cy + dy) + ") scale(" + wysN(scale) +
    ")\" opacity=\"" + wysO(op) + "\" stroke-linecap=\"round\" stroke-linejoin=\"round\">" +
    "<circle cx=\"0\" cy=\"-72\" r=\"31\" fill=\"rgba(240,217,189,.55)\" stroke=\"" + C.chalk + "\" stroke-width=\"5\"/>" +
    "<path d=\"M-28 -77 Q-21 -112 4 -105 Q27 -99 29 -75 Q9 -90 -4 -87 Q-18 -83 -28 -77Z\" fill=\"" + WYS_WOOD +
    "\" stroke=\"" + C.chalk + "\" stroke-width=\"3\"/><path d=\"M-43 43 Q-40 -28 0 -28 Q40 -28 43 43Z\" fill=\"rgba(127,182,217,.28)\" stroke=\"" +
    C.chalk + "\" stroke-width=\"5\"/><path d=\"M-37 -5 L-70 26 M37 -5 L70 26 M-19 43 L-30 91 M19 43 L30 91\" fill=\"none\" stroke=\"" +
    C.chalk + "\" stroke-width=\"9\"/><circle cx=\"-10\" cy=\"-67\" r=\"3\" fill=\"" + WYS_WOOD +
    "\"/><circle cx=\"10\" cy=\"-67\" r=\"3\" fill=\"" + WYS_WOOD + "\"/></g>";
}

function wysBubble(x, y, w, h, op = 1, tail = "down", flash = 0) {
  if (op <= 0.001) return "";
  const tailPath = tail === "leftDown"
    ? "<path d=\"M" + wysN(x + 16) + " " + wysN(y + h - 1) + " L" + wysN(x + 36) + " " + wysN(y + h - 1) +
      " L" + wysN(x - 10) + " " + wysN(y + h + 10) + " Z\" fill=\"rgba(35,57,47,.95)\" stroke=\"" + C.chalk + "\" stroke-width=\"4\" stroke-linejoin=\"round\"/>"
    : "<path d=\"M" + wysN(x + w * 0.48) + " " + wysN(y + h - 1) + " L" + wysN(x + w * 0.62) + " " +
      wysN(y + h - 1) + " L" + wysN(x + w * 0.55) + " " + wysN(y + h + 18) +
      " Z\" fill=\"rgba(35,57,47,.95)\" stroke=\"" + C.chalk + "\" stroke-width=\"4\" stroke-linejoin=\"round\"/>";
  const fill = flash > 0.01 ? "rgba(242,193,78," + (0.5 * flash).toFixed(3) + ")" : "rgba(239,233,216,.06)";
  return "<g opacity=\"" + wysO(op) + "\"><rect x=\"" + wysN(x) + "\" y=\"" + wysN(y) + "\" width=\"" +
    wysN(w) + "\" height=\"" + wysN(h) + "\" rx=\"18\" fill=\"" + fill + "\" stroke=\"" +
    C.chalk + "\" stroke-width=\"4\"/>" + tailPath + "</g>";
}

function wysBracket(x1, x2, y, progress, op = 1) {
  if (op <= 0.001 || progress <= 0.001) return "";
  const end = x1 + (x2 - x1) * progress;
  return "<path d=\"M" + wysN(x1) + " " + wysN(y - 7) + " L" + wysN(x1) + " " + wysN(y) +
    " L" + wysN(end) + " " + wysN(y) + " L" + wysN(end) + " " + wysN(y - 7) +
    "\" fill=\"none\" stroke=\"" + C.yellow + "\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"" + wysO(op) + "\"/>";
}

function wysCurve(x1, y1, cx, cy, x2, y2, k, op = 1, color = C.yellow, width = 4, dash = "") {
  if (op <= 0.001 || k <= 0.001) return "";
  const px = wysLerp(x1, cx, k), py = wysLerp(y1, cy, k);
  const qx = wysLerp(cx, x2, k), qy = wysLerp(cy, y2, k);
  const ex = wysLerp(px, qx, k), ey = wysLerp(py, qy, k);
  return wysPath("M" + wysN(x1) + " " + wysN(y1) + " Q" + wysN(px) + " " + wysN(py) + " " + wysN(ex) + " " + wysN(ey), color, width, op, "none", dash);
}

function wysStageTitle(u, value) {
  return wysLabel(800, 240, value, 36, C.yellow, wysK(u, 0.2, 0.8));
}

function wysShakeAmp(u, start, firstEnd, secondEnd, thirdEnd) {
  let amp = 4;
  amp = wysLerp(4, 2.6, wysK(u, firstEnd, firstEnd + 0.5));
  amp = wysLerp(amp, 1.3, wysK(u, secondEnd, secondEnd + 0.5));
  amp = wysLerp(amp, 0, wysK(u, thirdEnd, thirdEnd + 0.5));
  return u < start ? 0 : amp * Math.sin(2 * Math.PI * u / 1.4);
}

function s1(u) {
  let g = wysHead(u, 0) + wysMetaphorTag();
  const divider = wysK(u, 0.2, 1.0);
  g += wysLine(800, 300, 800, 800, C.chalk, 4, divider, "10 8");

  const left = 0.55;
  g += "<g opacity=\"" + wysO(left) + "\">" + box(120, 290, 560, 72, C.yellow, wysK(u, 0.2, 0.8), C.deep) +
    txt(400, 339, "〈如何做一個好學生〉", { a: "middle", s: 40, w: 1, f: C.yellow, o: wysK(u, 0.2, 0.8) }) + "</g>";
  const leftDoll = wysK(u, 0.6, 0.85) * left;
  g += wysDoll(400, 640, 0.9, leftDoll);
  const leftBubble = wysK(u, 1.0, 1.6) * left;
  g += wysBubble(290, 430, 220, 64, leftBubble);
  g += wysLabel(400, 472, "怎麼做？", 30, C.chalk, leftBubble);
  g += wysPhrase(400, 800, "如何型：寫方法", 34, C.yellow, wysK(u, 2.0, 2.8) * left, "middle");

  const rightCard = wysK(u, 3.5, 4.1);
  g += box(920, 290, 560, 72, C.yellow, rightCard, C.deep);
  g += wysLabel(1200, 339, "〈守信的重要〉", 40, C.yellow, rightCard);
  const rightDoll = wysK(u, 4.0, 4.25);
  g += wysDoll(1200, 640, 0.9, rightDoll);
  const rightBubble = wysK(u, 5.0, 5.6);
  const flash = wysFlash(u, 6.5);
  g += wysBubble(1080, 430, 240, 64, rightBubble, "down", flash);
  g += wysLabel(1200, 472, "為什麼重要？", 30, C.chalk, rightBubble);
  g += wysPhrase(1200, 800, "為何型：寫理由", 34, C.yellow, wysK(u, 7.0, 7.8), "middle");
  return wysPaint(g);
}

function s2(u) {
  let g = wysHead(u, 1) + wysMetaphorTag();
  const cards = [
    { x: 120, text: "〈讀書的重要〉", start: 0.4 },
    { x: 600, text: "〈守信的重要〉", start: 1.6 },
    { x: 1080, text: "〈合作的重要〉", start: 2.8 },
  ];
  for (const cardData of cards) {
    const op = wysK(u, cardData.start, cardData.start + 0.6);
    g += wysCardFrame(cardData.x, 280, 400, 200, op);
    g += wysLabel(cardData.x + 200, 395, cardData.text, 40, C.chalk, op);
  }
  const ellipseOp = wysK(u, 4.5, 5.5);
  // 「的重要」與前後字距只有約 4px，橢圓必壓字；改用淡黃底＋黃底線標出（實測字位：卡中心 x −18 到 +98）
  for (const cardData of cards) {
    const cx = cardData.x + 200;
    g += "<rect x=\"" + wysN(cx - 18) + "\" y=\"358\" width=\"116\" height=\"48\" rx=\"6\" fill=\"rgba(242,193,78,.24)\" opacity=\"" + wysO(ellipseOp) + "\"/>";
    g += wysLine(cx - 16, 414, cx + 96, 414, C.yellow, 5, ellipseOp);
  }

  const reasonFall = wysK(u, 6.0, 7.0);
  const methodFall = wysK(u, 6.0, 7.0);
  g += wysBasket(560, 700 - 160 * (1 - reasonFall), 220, "理由", reasonFall);
  g += wysBasket(1040, 700 - 160 * (1 - methodFall), 220, "方法", methodFall);
  g += wysLabel(800, 600, "先蒐集", 34, C.yellow, wysK(u, 7.5, 8.3));
  return wysPaint(g);
}

function s3(u) {
  let g = wysHead(u, 2) + wysMetaphorTag();
  g += wysStageTitle(u, "論點＝我的看法");
  g += wysLine(560, 760, 840, 760, C.chalk, 4, 1);
  const drop = wysK(u, 0.3, 1.0);
  const boardY = wysLerp(300, 470, drop);
  g += wysSign(700, boardY, 300, 90, "守信很重要", drop, 0, 760);
  g += wysDoll(1300, 620, 1, wysK(u, 0.6, 0.85));
  const bubble = wysK(u, 3.0, 3.6);
  g += wysBubble(1160, 400, 240, 64, bubble, "down", wysFlash(u, 6.0));
  g += wysLabel(1280, 442, "為什麼重要？", 30, C.chalk, bubble);
  return wysPaint(g);
}

function s4(u) {
  let g = wysHead(u, 3) + wysMetaphorTag();
  g += wysStageTitle(u, "論證一：理由＋例子");
  g += wysLine(60, 760, 1540, 760, C.chalk, 4, 1);

  const slide1 = wysK(u, 4.5, 5.1), slide2 = wysK(u, 6.5, 7.1), slide3 = wysK(u, 8.5, 9.1);
  const amp = wysShakeAmp(u, 2.0, 5.1, 7.1, 9.1);
  const tilt = u < 2.0 ? 0 : amp;
  const wallGrow = wysK(u, 0.8, 1.8);
  g += wysBoard(380, 1220, 290, 80, "守信很重要", wysK(u, 0.2, 0.8), 0.25 * tilt, 1220, 370);
  g += wysWall(400, 370, 240, 760, "別人才會相信", 1, tilt, wallGrow, 0, false, wysK(u, 1.8, 2.2));
  g += wysStone(100, 660, 300, 100, WYS_ORANGE, "小安", "什麼人", slide1, slide1);
  g += wysStone(130, 560, 270, 100, WYS_BLUE, "答應借筆記就做到", "做了什麼", slide2, slide2);
  g += wysStone(190, 460, 210, 100, C.yellow, "同學都信任他", "結果", slide3, slide3);
  return wysPaint(g);
}

function s5(u) {
  let g = wysHead(u, 4) + wysMetaphorTag();
  g += wysStageTitle(u, "論證二：舉反例");
  g += wysLine(60, 760, 1540, 760, C.chalk, 4, 1);

  const slide1 = wysK(u, 4.0, 4.6), slide2 = wysK(u, 5.5, 6.1), slide3 = wysK(u, 7.0, 7.6);
  const amp = wysShakeAmp(u, 2.0, 4.6, 6.1, 7.6);
  const tilt = u < 2.0 ? 0 : amp;
  const wallGrow = wysK(u, 0.8, 1.8);
  const bubbleOp = wysK(u, 0.6, 0.9) * (1 - wysK(u, 9.0, 9.8));

  g += wysBoard(380, 1220, 290, 80, "守信很重要", 1, -0.25 * tilt, 380, 370);
  g += wysWall(400, 370, 240, 760, "別人才會相信", 1, 0, 1);
  g += wysStone(100, 660, 300, 100, WYS_ORANGE, "小安", "", 1, 1);
  g += wysStone(130, 560, 270, 100, WYS_BLUE, "答應借筆記就做到", "", 1, 1);
  g += wysStone(190, 460, 210, 100, C.yellow, "同學都信任他", "", 1, 1);

  g += wysDoll(800, 650, 0.85, wysK(u, 0.3, 0.55), wysK(u, 10.0, 11.0));
  g += wysBubble(690, 440, 220, 64, bubbleOp);
  g += wysLabel(800, 482, "為什麼重要？", 30, C.chalk, bubbleOp);

  g += wysWall(960, 370, 240, 760, "失去別人信任", 1, tilt, wallGrow, 0, false, wysK(u, 1.8, 2.2));
  g += wysStone(1200, 660, 300, 100, WYS_ORANGE, "我", "", slide1, slide1);
  g += wysStone(1200, 560, 270, 100, WYS_BLUE, "答應值日卻忘了", "", slide2, slide2);
  g += wysStone(1200, 460, 210, 100, C.yellow, "同學不信我", "", slide3, slide3);

  const tags = wysK(u, 8.2, 8.8);
  g += wysTag(450, 560, 140, "正例", tags);
  g += wysTag(1010, 560, 140, "反例", tags);
  return wysPaint(g);
}

function s6(u) {
  let g = wysHead(u, 5) + wysMetaphorTag();
  const question = wysK(u, 0.5, 1.2);
  g += wysQuestionSign(560, 282, 480, 76, "反例說得通嗎？", 40, question);

  const branch = wysK(u, 1.5, 2.3);
  g += wysLine(800, 358, 420, 412, C.chalk, 4, branch);
  g += wysLine(800, 358, 1180, 412, C.chalk, 4, branch);

  const leftTitle = wysK(u, 2.5, 2.9);
  g += box(220, 416, 400, 64, C.chalk, leftTitle, C.deep);
  g += wysLabel(420, 457, "〈守信的重要〉", 34, C.yellow, leftTitle);
  const leftSentence = wysK(u, 3.2, 3.6);
  g += box(200, 500, 440, 64, C.chalk, leftSentence, C.deep);
  g += wysLabel(420, 541, "不守信→失去信任", 30, C.chalk, leftSentence);
  g += wysCheck(685, 532, 0.5, wysK(u, 4.5, 5.0));
  const leftWalls = wysK(u, 5.3, 6.0);
  g += wysWall(240, 640, 120, 740, "", leftWalls);
  g += wysWall(480, 640, 120, 740, "", leftWalls);
  g += wysBoard(220, 620, 612, 28, "", leftWalls);
  for (const wx of [248, 488]) {
    g += "<rect x=\"" + wx + "\" y=\"674\" width=\"104\" height=\"40\" fill=\"rgba(26,43,35,.96)\" opacity=\"" + wysO(leftWalls) + "\"/>";
  }
  g += wysLabel(300, 703, "正例", 30, C.chalk, leftWalls);
  g += wysLabel(540, 703, "反例", 30, C.chalk, leftWalls);
  g += wysTag(310, 766, 220, "正例＋反例", wysK(u, 6.3, 6.7));

  const rightTitle = wysK(u, 7.0, 7.4);
  g += box(980, 416, 400, 64, C.chalk, rightTitle, C.deep);
  g += wysLabel(1180, 457, "〈分享的快樂〉", 34, C.yellow, rightTitle);
  const rightSentence = wysK(u, 7.7, 8.1);
  g += box(960, 500, 440, 64, C.chalk, rightSentence, C.deep);
  g += wysLabel(1180, 541, "不分享→不快樂？", 30, C.chalk, rightSentence);
  g += wysCross(1445, 532, 0.55, wysK(u, 9.0, 9.5));
  const rightWalls = wysK(u, 9.8, 10.5);
  const flash = 0.7 * rightWalls; // 兩面牆持續亮黃（兩個正例），不是一閃
  g += wysWall(1000, 640, 120, 740, "", rightWalls, 0, 1, flash);
  g += wysWall(1240, 640, 120, 740, "", rightWalls, 0, 1, flash);
  g += wysBoard(980, 1380, 612, 28, "", rightWalls);
  for (const wx of [1008, 1248]) {
    g += "<rect x=\"" + wx + "\" y=\"674\" width=\"104\" height=\"40\" fill=\"rgba(26,43,35,.96)\" opacity=\"" + wysO(rightWalls) + "\"/>";
  }
  g += wysLabel(1060, 703, "正例", 30, C.chalk, rightWalls);
  g += wysLabel(1300, 703, "正例", 30, C.chalk, rightWalls);
  g += wysTag(1060, 766, 240, "兩個正例", wysK(u, 10.8, 11.2));
  return wysPaint(g);
}

function s7(u) {
  let g = wysHead(u, 6) + wysMetaphorTag();
  g += wysStageTitle(u, "結論：再說一次＋怎麼做");
  g += wysSign(330, 470, 260, 80, "守信很重要", wysK(u, 0.3, 0.7), 0, 640);
  const rightSign = wysK(u, 1.0, 2.0);
  g += wysSign(1000, wysLerp(300, 470, rightSign), 260, 80, "守信真重要", rightSign, 0, 640);
  g += wysCurve(1000, 428, 665, 320, 330, 428, wysK(u, 3.0, 5.0), 1, C.yellow, 4, "10 8");

  const cardOp = wysK(u, 5.5, 6.3);
  const cardScale = wysLerp(0.8, 1, cardOp);
  const cardX = 1000 - 140 * cardScale, cardY = 720 - 56 * cardScale;
  const cardW = 280 * cardScale, cardH = 112 * cardScale;
  g += "<g opacity=\"" + wysO(cardOp) + "\">" + box(cardX, cardY, cardW, cardH, C.chalk, 1, C.deep) + "</g>";
  g += wysLabel(1000, 708, "我會怎麼做", 30, C.chalk, cardOp);
  g += wysLabel(1000, 752, "答應就做到", 30, C.yellow, cardOp);

  const dollOp = wysK(u, 0.5, 0.8);
  g += wysDoll(1380, 620, 1, dollOp, wysK(u, 7.5, 8.5));
  g += wysCheck(1460, 470, 0.5, wysK(u, 8.5, 9.1));
  return wysPaint(g);
}

function s8(u) {
  let g = wysHead(u, 7) + wysMetaphorTag();
  const blocks = [
    { x: 70, w: 300, tag: "我的看法" },
    { x: 390, w: 400, tag: "理由一＋例子" },
    { x: 810, w: 400, tag: "理由二＋例子" },
    { x: 1230, w: 300, tag: "再說＋怎麼做" },
  ];
  const blockStarts = [0.2, 0.8, 1.4, 2.0];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i], drop = wysK(u, blockStarts[i], blockStarts[i] + 0.45);
    g += wysBlock(block.x, 300 - 42 * (1 - drop), block.w, 200, WYS_BLUE, drop);
  }

  const tagStarts = [1.0, 1.8, 2.6, 3.1];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    g += wysWorkTag(block.x, 350, block.w, block.tag, wysK(u, tagStarts[i], tagStarts[i] + 0.4));
  }

  const iconStarts = [3.5, 4.15, 4.8, 5.45];
  for (let i = 0; i < blocks.length; i++) {
    const iconOp = wysK(u, iconStarts[i], iconStarts[i] + 0.5);
    if (i === 0) g += wysSign(220, 420, 90, 32, "", iconOp, 0, 470);
    else if (i === 1 || i === 2) {
      const dx = i === 1 ? 0 : 420, wallX = 600 + dx;
      g += wysWall(wallX, 392, 40, 476, "", iconOp);
      g += wysStone(wallX - 60, 450, 60, 26, WYS_ORANGE, "", "", iconOp, 1);
      g += wysStone(wallX - 45, 424, 45, 26, WYS_BLUE, "", "", iconOp, 1);
      g += wysStone(wallX - 30, 398, 30, 26, C.yellow, "", "", iconOp, 1);
    } else g += wysSign(1380, 420, 90, 32, "", iconOp, 0, 470);
  }

  const phrases = [
    { x: 220, y: 550, text: "守信很重要", start: 6.0 },
    { x: 590, y: 550, text: "別人才會相信", start: 6.65 },
    { x: 590, y: 592, text: "小安說到就做到", start: 7.3 },
    { x: 1010, y: 550, text: "失去別人信任", start: 7.95 },
    { x: 1010, y: 592, text: "我答應卻忘了", start: 8.6 },
    { x: 1380, y: 550, text: "守信真重要", start: 9.25 },
    { x: 1380, y: 592, text: "答應就做到", start: 9.6 },
  ];
  for (const phrase of phrases) g += wysPhrase(phrase.x, phrase.y, phrase.text, 30, C.yellow, wysK(u, phrase.start, phrase.start + 0.4), "middle");

  const bracketOp = wysK(u, 11.0, 13.0);
  const groups = [
    { x1: 70, x2: 370, cx: 220, label: "開頭" },
    { x1: 390, x2: 1210, cx: 800, label: "中間" },
    { x1: 1230, x2: 1530, cx: 1380, label: "結尾" },
  ];
  for (const group of groups) {
    g += wysBracket(group.x1, group.x2, 280, bracketOp);
    g += wysLabel(group.cx, 262, group.label, 30, C.chalk, bracketOp);
  }
  return wysPaint(g);
}

function s9(u) {
  let g = wysHead(u, 8) + wysMetaphorTag();
  g += wysStageTitle(u, "講義的四段");
  const leftOp = wysK(u, 0.3, 0.8), rightOp = wysK(u, 0.8, 1.3);
  g += wysCardFrame(100, 280, 600, 400, leftOp);
  g += wysCardFrame(900, 280, 600, 400, rightOp);
  g += wysLabel(400, 330, "〈分享的快樂〉", 34, C.yellow, leftOp);

  const leftRows = [
    { y: 400, text: "論點", start: 1.5 },
    { y: 470, text: "論證一", start: 2.0 },
    { y: 540, text: "論證二", start: 2.5 },
    { y: 610, text: "重申論點", start: 3.0 },
  ];
  const rightRows = [
    { y: 400, text: "我的看法", start: 2.0 },
    { y: 470, text: "理由一＋例子", start: 2.5 },
    { y: 540, text: "理由二＋例子", start: 3.0 },
    { y: 610, text: "再說＋怎麼做", start: 3.5 },
  ];
  for (const row of leftRows) g += wysPhrase(150, row.y, row.text, 30, C.chalk, wysK(u, row.start, row.start + 0.4));
  for (const row of rightRows) g += wysLabel(1200, row.y, row.text, 34, C.chalk, wysK(u, row.start, row.start + 0.4));

  for (let i = 0; i < 4; i++) {
    const y = [400, 470, 540, 610][i] - 10;
    g += wysArrow(320, y, 1080, wysK(u, 4.5 + i * 0.6, 5.1 + i * 0.6));
  }

  const cardOp = wysK(u, 8.0, 8.8);
  g += box(450, 700, 700, 72, C.chalk, cardOp, C.deep);
  g += wysLabel(800, 746, "舉例三步：什麼人→做了什麼事→得到的結果", 30, C.chalk, cardOp);
  const curveOp = wysK(u, 9.0, 10.0);
  g += wysLine(450, 736, 125, 736, C.yellow, 3, curveOp, "8 6");
  g += wysLine(125, 736, 125, 460, C.yellow, 3, curveOp, "8 6");
  g += wysLine(125, 460, 140, 460, C.yellow, 3, curveOp, "8 6");
  g += wysLine(125, 530, 140, 530, C.yellow, 3, curveOp, "8 6");
  return wysPaint(g);
}

function s10(u) {
  let g = wysHead(u, 9) + wysMetaphorTag();
  const title = wysK(u, 0.2, 0.6);
  g += box(580, 200, 440, 72, C.yellow, title, C.deep);
  g += wysLabel(800, 247, "〈讀書的重要〉", 40, C.yellow, title);

  const basketOp = wysK(u, 0.6, 1.4);
  g += wysBasket(620, 340, 200, "理由", basketOp, true, wysFlash(u, 6.5));
  g += wysBasket(980, 340, 200, "方法", basketOp, true, wysFlash(u, 7.35));

  const blocks = [
    { x: 70, w: 300, tag: "我的看法" },
    { x: 390, w: 400, tag: "理由一＋例子" },
    { x: 810, w: 400, tag: "理由二＋例子" },
    { x: 1230, w: 300, tag: "再說＋怎麼做" },
  ];
  const starts = [1.5, 2.0, 2.5, 3.0];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i], op = wysK(u, starts[i], starts[i] + 0.5);
    const flash = wysFlash(u, 8.2 + i * 0.85);
    g += wysBlock(block.x, 440, block.w, 240, WYS_BLUE, op, true, flash);
    g += wysWorkTag(block.x, 490, block.w, block.tag, op);
  }

  const iconOp = wysK(u, 4.0, 5.0);
  g += wysSign(220, 560, 90, 32, "", iconOp, 0, 610, true);
  g += wysWall(600, 532, 40, 616, "", iconOp, 0, 1, 0, true);
  g += wysStone(540, 590, 60, 26, WYS_ORANGE, "", "", iconOp, 1, true);
  g += wysStone(555, 564, 45, 26, WYS_BLUE, "", "", iconOp, 1, true);
  g += wysStone(570, 538, 30, 26, C.yellow, "", "", iconOp, 1, true);
  g += wysWall(1020, 532, 40, 616, "", iconOp, 0, 1, 0, true);
  g += wysStone(960, 590, 60, 26, WYS_ORANGE, "", "", iconOp, 1, true);
  g += wysStone(975, 564, 45, 26, WYS_BLUE, "", "", iconOp, 1, true);
  g += wysStone(990, 538, 30, 26, C.yellow, "", "", iconOp, 1, true);
  g += wysSign(1380, 560, 90, 32, "", iconOp, 0, 610, true);

  const choiceOp = wysK(u, 4.0, 5.0);
  const choiceFlash = wysFlash(u, 11.6);
  g += wysPhrase(1010, 655, "反例說得通嗎？", 30, choiceFlash > 0.01 ? "#fff0a6" : C.yellow, choiceOp, "middle");
  g += wysCurve(220, 690, 800, 800, 1380, 690, wysK(u, 5.0, 6.0), 1, C.yellow, 4, "12 9");

  return wysPaint(g);
}
