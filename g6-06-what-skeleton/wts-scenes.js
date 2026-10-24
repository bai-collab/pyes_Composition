const META = {
  title: "讀出一個道理",
  subtitle: "10 段・約 2 分鐘・六年級議論文（什麼型）第一集",
  ariaLabel: "題目前加什麼是說得通是什麼型；啟示是學到的道理；四段：這本書加道理、書裡的例子、生活的例子、再說一次；論點也可以放最後。",
  note: "出處：楊裕貿寫作研習資料（國小場）、楊裕貿議論文教學策略（2023）、教育部《成語典》〈龜兔賽跑〉條。本集資料：projects/essay-writing-animations/g6-06-what-skeleton/brief.md、timing.json。篩網、題目卡、書本、主張牌、理由牆、撐牆石塊、小書與小房子圖示、讀者人偶、泡泡、虛線、籃子、藍積木、工作牌是視覺比喻或示意；〈一本書的啟示〉示範短語與生活例子自編；〈龜兔賽跑〉出自《伊索寓言》；〈真正的聰明〉為講義列舉的課文題目。鍵盤操作：空白鍵播放／暫停，左右方向鍵切換段落，F 鍵全螢幕。畫面只由時間決定。",
  works: [],
};
const WTS_WOOD = "#a9784f";
const WTS_BLUE = "#7fb6d9";
const WTS_ORANGE = "#F0B27A";
const WTS_YELLOW = "#f2c14e";
const WTS_CREAM = "#efe9d8";
const WTS_INK = "#1a2b23";
const WTS_RED = "#E07A6B";
const wtsK = (u, a, b) => ease(P(u, a, b));
const wtsLerp = (a, b, k) => a + (b - a) * k;
const wtsN = (value) => Number.isFinite(Number(value)) ? Number(Number(value).toFixed(2)) : 0;
const wtsO = (value) => Math.max(0, Math.min(1, Number(value) || 0)).toFixed(3);

function wtsHead(u, i) {
  const seg = SEGS[i];
  return head(u, seg.grp, seg.name);
}

function wtsMetaphorTag(op = 1) {
  if (op <= 0.001) return "";
  return "<g opacity=\"" + wtsO(op) + "\">" +
    box(1375, 56, 165, 60, WTS_ORANGE, 1, C.deep) +
    txt(1457, 98, "比喻", { a: "middle", s: 30, w: 1, f: WTS_ORANGE }) + "</g>";
}

function wtsLabel(cx, y, value, size = 30, color = C.chalk, op = 1) {
  if (op <= 0.001) return "";
  return txt(cx, y, value, { a: "middle", s: size, w: 1, f: color, o: op });
}

function wtsPhrase(x, y, value, size = 30, color = C.chalk, op = 1, anchor = "start") {
  if (op <= 0.001 || !value) return "";
  return txt(x, y, value, { a: anchor, s: size, w: 1, f: color, o: op });
}

function wtsLine(x1, y1, x2, y2, color = C.chalk, width = 5, op = 1, dash = "", progress = 1) {
  if (op <= 0.001 || progress <= 0.001) return "";
  const ex = wtsLerp(x1, x2, progress);
  const ey = wtsLerp(y1, y2, progress);
  return "<path d=\"M" + wtsN(x1) + " " + wtsN(y1) + " L" + wtsN(ex) + " " + wtsN(ey) +
    "\" fill=\"none\" stroke=\"" + color + "\" stroke-width=\"" + width +
    "\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"" + wtsO(op) + "\"" +
    (dash ? " stroke-dasharray=\"" + dash + "\"" : "") + "/>";
}

function wtsArrow(x1, y, x2, op = 1, progress = 1) {
  if (op <= 0.001 || progress <= 0.001) return "";
  const end = wtsLerp(x1, x2, progress);
  let g = wtsLine(x1, y, end, y, C.yellow, 4, op);
  if (progress >= 0.99) {
    g += "<polygon points=\"" + x2 + "," + y + " " + (x2 - 16) + "," + (y - 9) + " " +
      (x2 - 16) + "," + (y + 9) + "\" fill=\"" + C.yellow + "\" opacity=\"" + wtsO(op) + "\"/>";
  }
  return g;
}

function wtsPath(d, color = C.chalk, width = 5, op = 1, fill = "none", dash = "") {
  if (op <= 0.001) return "";
  return "<path d=\"" + d + "\" fill=\"" + fill + "\" stroke=\"" + color +
    "\" stroke-width=\"" + width + "\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"" +
    wtsO(op) + "\"" + (dash ? " stroke-dasharray=\"" + dash + "\"" : "") + "/>";
}

function wtsCircle(cx, cy, r, stroke = C.chalk, width = 5, fill = "none", op = 1, dash = "") {
  if (op <= 0.001 || r <= 0) return "";
  return "<circle cx=\"" + wtsN(cx) + "\" cy=\"" + wtsN(cy) + "\" r=\"" + wtsN(r) +
    "\" fill=\"" + fill + "\" stroke=\"" + stroke + "\" stroke-width=\"" + width +
    "\" opacity=\"" + wtsO(op) + "\"" + (dash ? " stroke-dasharray=\"" + dash + "\"" : "") + "/>";
}

function wtsEllipse(cx, cy, rx, ry, stroke = C.yellow, width = 4, op = 1) {
  if (op <= 0.001) return "";
  return "<ellipse cx=\"" + wtsN(cx) + "\" cy=\"" + wtsN(cy) + "\" rx=\"" + wtsN(rx) +
    "\" ry=\"" + wtsN(ry) + "\" fill=\"none\" stroke=\"" + stroke + "\" stroke-width=\"" +
    width + "\" opacity=\"" + wtsO(op) + "\"/>";
}

function wtsBlock(x, y, w, h, color, op = 1, dashed = false, flash = 0) {
  if (op <= 0.001 || w <= 2 || h <= 2) return "";
  if (dashed) {
    const fill = flash > 0.01 ? "rgba(242,193,78," + (0.5 * flash).toFixed(3) + ")" : "rgba(239,233,216,.012)";
    return "<rect x=\"" + wtsN(x) + "\" y=\"" + wtsN(y) + "\" width=\"" + wtsN(w) +
      "\" height=\"" + wtsN(h) + "\" rx=\"14\" fill=\"" + fill + "\" stroke=\"" + color +
      "\" stroke-width=\"5\" stroke-dasharray=\"14 10\" opacity=\"" + wtsO(op) + "\"/>";
  }
  return "<rect x=\"" + wtsN(x) + "\" y=\"" + wtsN(y) + "\" width=\"" + wtsN(w) +
    "\" height=\"" + wtsN(h) + "\" rx=\"14\" fill=\"" + color +
    "\" fill-opacity=\".22\" stroke=\"" + C.chalk + "\" stroke-width=\"4\" opacity=\"" + wtsO(op) + "\"/>";
}

function wtsCardFrame(x, y, w, h, op = 1, dashed = false, stroke = C.chalk) {
  if (op <= 0.001) return "";
  if (dashed) {
    return "<rect x=\"" + x + "\" y=\"" + y + "\" width=\"" + w + "\" height=\"" + h +
      "\" rx=\"18\" fill=\"rgba(239,233,216,.012)\" stroke=\"" + stroke +
      "\" stroke-width=\"4\" stroke-dasharray=\"13 9\" opacity=\"" + wtsO(op) + "\"/>";
  }
  return "<g opacity=\"" + wtsO(op) + "\">" + box(x, y, w, h, stroke, 1, "rgba(239,233,216,.015)") + "</g>";
}

function wtsDashedRoundFrame(x, y, w, h, progress, id, op = 1, radius = 18) {
  if (progress <= 0.001 || op <= 0.001) return "";
  const d = "M" + wtsN(x + radius) + " " + wtsN(y) + " H" + wtsN(x + w - radius) +
    " A" + radius + " " + radius + " 0 0 1 " + wtsN(x + w) + " " + wtsN(y + radius) +
    " V" + wtsN(y + h - radius) + " A" + radius + " " + radius + " 0 0 1 " +
    wtsN(x + w - radius) + " " + wtsN(y + h) + " H" + wtsN(x + radius) +
    " A" + radius + " " + radius + " 0 0 1 " + wtsN(x) + " " + wtsN(y + h - radius) +
    " V" + wtsN(y + radius) + " A" + radius + " " + radius + " 0 0 1 " +
    wtsN(x + radius) + " " + wtsN(y) + " Z";
  const perimeter = 2 * (w + h - 4 * radius) + 2 * Math.PI * radius;
  const reveal = wtsN(perimeter * Math.max(0, Math.min(1, progress)));
  return "<defs><mask id=\"" + id + "\" maskUnits=\"userSpaceOnUse\" maskContentUnits=\"userSpaceOnUse\" x=\"" +
    wtsN(x - 8) + "\" y=\"" + wtsN(y - 8) + "\" width=\"" + wtsN(w + 16) + "\" height=\"" +
    wtsN(h + 16) + "\"><rect x=\"" + wtsN(x - 8) + "\" y=\"" + wtsN(y - 8) + "\" width=\"" +
    wtsN(w + 16) + "\" height=\"" + wtsN(h + 16) + "\" fill=\"black\"/><path d=\"" + d +
    "\" fill=\"none\" stroke=\"white\" stroke-width=\"9\" stroke-linecap=\"butt\" pathLength=\"" +
    wtsN(perimeter) + "\" stroke-dasharray=\"" + reveal + " " + wtsN(perimeter) +
    "\"/></mask></defs><path d=\"" + d + "\" fill=\"none\" stroke=\"" + C.yellow +
    "\" stroke-width=\"3\" stroke-dasharray=\"10 8\" opacity=\"" + wtsO(op) + "\" mask=\"url(#" + id + ")\"/>";
}

function wtsCheck(cx, cy, scale = 1, op = 1) {
  if (op <= 0.01) return "";
  return "<path d=\"M" + wtsN(cx - 30 * scale) + " " + wtsN(cy) + " L" +
    wtsN(cx - 8 * scale) + " " + wtsN(cy + 23 * scale) + " L" +
    wtsN(cx + 37 * scale) + " " + wtsN(cy - 30 * scale) +
    "\" fill=\"none\" stroke=\"#8fd18a\" stroke-width=\"" + (11 * scale) +
    "\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"" + wtsO(op) + "\"/>";
}

function wtsCross(cx, cy, scale, op) {
  if (op <= 0.01) return "";
  const half = 30 * scale;
  return "<g opacity=\"" + wtsO(op) + "\" stroke=\"" + WTS_RED + "\" stroke-width=\"8\" stroke-linecap=\"round\"><path d=\"M" +
    wtsN(cx - half) + " " + wtsN(cy - half) + " L" + wtsN(cx + half) + " " + wtsN(cy + half) +
    " M" + wtsN(cx + half) + " " + wtsN(cy - half) + " L" + wtsN(cx - half) + " " + wtsN(cy + half) + "\"/></g>";
}

function wtsFlash(u, start) {
  const fadeIn = wtsK(u, start, start + 0.08);
  const fadeOut = 1 - wtsK(u, start + 0.42, start + 0.5);
  return Math.max(0, Math.min(fadeIn, fadeOut));
}

function wtsPaint(svg) {
  return svg.replace(/font-size="24"/g, "font-size=\"26\"")
    .replace(/<text ([^>]*?)fill="([^"]+)"/g, '<text $1style="fill:$2" fill="$2"');
}

function wtsWorkTag(x, y, w, value, op = 1) {
  return wtsLabel(x + w / 2, y, value, 34, C.chalk, op);
}

function wtsTag(x, y, w, label, op = 1) {
  if (op <= 0.001) return "";
  return "<g opacity=\"" + wtsO(op) + "\">" + box(x, y, w, 64, C.yellow, 1, "rgba(26,43,35,.94)") +
    txt(x + w / 2, y + 42, label, { a: "middle", s: 30, w: 1, f: C.chalk }) + "</g>";
}

function wtsSign(cx, boardY, w, h, label, op, tilt = 0, postBottom, dashed = false) {
  if (op <= 0.001) return "";
  const bottom = Number.isFinite(postBottom) ? postBottom : boardY + h / 2 + 170;
  const dash = dashed ? ' stroke-dasharray="10 7"' : "";
  let g = "<g transform=\"translate(" + wtsN(cx) + " " + wtsN(bottom) + ") rotate(" +
    wtsN(tilt) + ") translate(" + wtsN(-cx) + " " + wtsN(-bottom) + ")\" opacity=\"" +
    wtsO(op) + "\" stroke-linecap=\"round\" stroke-linejoin=\"round\">";
  g += "<path d=\"M" + wtsN(cx) + " " + wtsN(boardY + h / 2) + " L" + wtsN(cx) + " " +
    wtsN(bottom) + "\" fill=\"none\" stroke=\"" + C.chalk + "\" stroke-width=\"8\"" + dash + "/>";
  g += "<rect x=\"" + wtsN(cx - w / 2) + "\" y=\"" + wtsN(boardY - h / 2) + "\" width=\"" +
    wtsN(w) + "\" height=\"" + wtsN(h) + "\" rx=\"10\" fill=\"" + (dashed ? "none" : "rgba(242,193,78,.12)") +
    "\" stroke=\"" + C.yellow + "\" stroke-width=\"5\"" + dash + "/>";
  if (label) g += txt(cx, boardY + 11, label, { a: "middle", s: 30, w: 1, f: C.chalk });
  else if (!dashed) g += "<path d=\"M" + wtsN(cx - w * 0.22) + " " + wtsN(boardY - h * 0.12) +
    " H" + wtsN(cx + w * 0.22) + " M" + wtsN(cx - w * 0.22) + " " + wtsN(boardY + h * 0.12) +
    " H" + wtsN(cx + w * 0.22) + "\" fill=\"none\" stroke=\"rgba(239,233,216,.72)\" stroke-width=\"4\"/>";
  return g + "</g>";
}

function wtsBoard(x1, x2, y, h, label, op, tilt = 0, pivotX, pivotY) {
  if (op <= 0.001) return "";
  const px = Number.isFinite(pivotX) ? pivotX : (x1 + x2) / 2;
  const py = Number.isFinite(pivotY) ? pivotY : y + h / 2;
  let g = "<g transform=\"translate(" + wtsN(px) + " " + wtsN(py) + ") rotate(" + wtsN(tilt) +
    ") translate(" + wtsN(-px) + " " + wtsN(-py) + ")\" opacity=\"" + wtsO(op) + "\">";
  g += "<rect x=\"" + wtsN(x1) + "\" y=\"" + wtsN(y) + "\" width=\"" + wtsN(x2 - x1) +
    "\" height=\"" + wtsN(h) + "\" rx=\"10\" fill=\"rgba(242,193,78,.12)\" stroke=\"" +
    C.yellow + "\" stroke-width=\"5\"/>";
  if (label) g += txt((x1 + x2) / 2, y + h / 2 + 11, label, { a: "middle", s: 30, w: 1, f: C.chalk });
  return g + "</g>";
}

function wtsStone(x, y, w, h, color, phrase, step, op, slide = 1, dashed = false) {
  if (op <= 0.001 || w <= 2 || h <= 2) return "";
  const direction = x < 800 ? -1 : 1;
  const shift = direction * 120 * (1 - Math.max(0, Math.min(1, slide)));
  const border = w < 50 ? 4 : 5;
  const fill = color === WTS_ORANGE ? "rgba(240,178,122,.12)" : color === WTS_BLUE ? "rgba(127,182,217,.12)" : "rgba(242,193,78,.12)";
  const dash = dashed ? ' stroke-dasharray="8 6"' : "";
  let g = "<g transform=\"translate(" + wtsN(shift) + " 0)\" opacity=\"" + wtsO(op) + "\">";
  g += "<rect x=\"" + wtsN(x) + "\" y=\"" + wtsN(y) + "\" width=\"" + wtsN(w) + "\" height=\"" +
    wtsN(h) + "\" rx=\"14\" fill=\"" + (dashed ? "none" : fill) + "\" stroke=\"" + color +
    "\" stroke-width=\"" + border + "\"" + dash + "/>";
  if (!dashed && w >= 80 && h >= 60) {
    g += "<path d=\"M" + wtsN(x + 12) + " " + wtsN(y + 14) + " l10 8 M" + wtsN(x + w - 24) +
      " " + wtsN(y + h - 16) + " l10 -8\" fill=\"none\" stroke=\"rgba(239,233,216,.35)\" stroke-width=\"2\"/>";
    if (step) g += txt(x + w / 2, y + 30, step, { a: "middle", s: 24, w: 1, f: "rgba(239,233,216,.75)" });
    if (phrase) g += txt(x + w / 2, y + 76, phrase, { a: "middle", s: 30, w: 1, f: C.chalk });
  } else if (!dashed && phrase) {
    g += txt(x + w / 2, y + h / 2 + 11, phrase, { a: "middle", s: 30, w: 1, f: C.chalk });
  }
  return g + "</g>";
}

function wtsWall(x, top, w, bottom, label, op, tilt = 0, grow = 1, flash = 0, dashed = false, labelOp = 1) {
  if (op <= 0.001 || grow <= 0.001) return "";
  const visibleTop = bottom - (bottom - top) * Math.max(0, Math.min(1, grow));
  const visibleH = bottom - visibleTop;
  const cx = x + w / 2;
  const clipId = "wts-wall-clip-" + [x, top, w, bottom].join("-");
  const dash = dashed ? ' stroke-dasharray="12 9"' : "";
  let g = "<defs><clipPath id=\"" + clipId + "\" clipPathUnits=\"userSpaceOnUse\"><rect x=\"" +
    wtsN(x - 4) + "\" y=\"" + wtsN(visibleTop) + "\" width=\"" + wtsN(w + 8) + "\" height=\"" +
    wtsN(visibleH + 4) + "\"/></clipPath></defs>";
  g += "<g transform=\"translate(" + wtsN(cx) + " " + wtsN(bottom) + ") rotate(" + wtsN(tilt) +
    ") translate(" + wtsN(-cx) + " " + wtsN(-bottom) + ")\" opacity=\"" + wtsO(op) + "\">";
  const fill = flash > 0.01 ? "rgba(242,193,78," + (0.5 * flash).toFixed(3) + ")" : "rgba(239,233,216,.04)";
  g += "<g clip-path=\"url(#" + clipId + ")\"><rect x=\"" + wtsN(x) + "\" y=\"" + wtsN(top) +
    "\" width=\"" + wtsN(w) + "\" height=\"" + wtsN(bottom - top) + "\" fill=\"" +
    (dashed ? "none" : fill) + "\" stroke=\"" + C.chalk + "\" stroke-width=\"5\"" + dash + "/>";
  if (!dashed) {
    for (let row = 0, yy = top; yy <= bottom; row++, yy += 36) {
      g += wtsLine(x, yy, x + w, yy, "rgba(239,233,216,.46)", 2);
      const offset = row % 2 ? 30 : 0;
      for (let k = -1; k <= Math.ceil(w / 60); k++) {
        const vx = x + offset + k * 60;
        if (vx > x && vx < x + w) g += wtsLine(vx, yy, vx, Math.min(bottom, yy + 36), "rgba(239,233,216,.46)", 2);
      }
    }
  }
  g += "</g>";
  if (label && !dashed && grow >= 0.98 && labelOp > 0.001) {
    const plateY = top + 70;
    g += "<g opacity=\"" + wtsO(labelOp) + "\"><rect x=\"" + wtsN(x + 12) + "\" y=\"" +
      wtsN(plateY) + "\" width=\"" + wtsN(w - 24) + "\" height=\"60\" fill=\"rgba(26,43,35,.96)\" stroke=\"" +
      C.chalk + "\" stroke-width=\"3\"/>" + txt(x + w / 2, top + 111, label, { a: "middle", s: 30, w: 1, f: C.chalk }) + "</g>";
  }
  return g + "</g>";
}

function wtsQuestionSign(x, y, w, h, value, size, op, flash = 0) {
  if (op <= 0.001) return "";
  const fill = flash > 0.01 ? "rgba(242,193,78," + (0.5 * flash).toFixed(3) + ")" : "rgba(242,193,78,.10)";
  return "<g opacity=\"" + wtsO(op) + "\">" + box(x, y, w, h, C.yellow, 1, fill) +
    txt(x + w / 2, y + h / 2 + size * 0.34, value, { a: "middle", s: size, w: 1, f: C.yellow }) + "</g>";
}

function wtsBasket(cx, cy, w, label, op, dashed = false, flash = 0) {
  if (op <= 0.001) return "";
  const top = cy - 50, bottom = cy + 50, halfTop = w / 2, halfBottom = w * 0.4;
  const fill = flash > 0.01 ? "rgba(242,193,78," + (0.5 * flash).toFixed(3) + ")" : (dashed ? "none" : "rgba(239,233,216,.025)");
  const dash = dashed ? ' stroke-dasharray="11 8"' : "";
  let g = "<g opacity=\"" + wtsO(op) + "\"><path d=\"M" + wtsN(cx - halfTop) + " " + wtsN(top) +
    " L" + wtsN(cx + halfTop) + " " + wtsN(top) + " L" + wtsN(cx + halfBottom) + " " +
    wtsN(bottom) + " L" + wtsN(cx - halfBottom) + " " + wtsN(bottom) + " Z\" fill=\"" + fill +
    "\" stroke=\"" + C.chalk + "\" stroke-width=\"4\"" + dash + "/>";
  if (!dashed) g += "<path d=\"M" + wtsN(cx - w * 0.31) + " " + wtsN(cy - 20) + " L" +
    wtsN(cx - w * 0.24) + " " + wtsN(cy + 22) + " M" + wtsN(cx + w * 0.31) + " " +
    wtsN(cy - 20) + " L" + wtsN(cx + w * 0.24) + " " + wtsN(cy + 22) +
    "\" fill=\"none\" stroke=\"" + C.chalk + "\" stroke-width=\"2\" opacity=\".45\"/>";
  g += txt(cx, cy + 12, label, { a: "middle", s: 34, w: 1, f: C.yellow });
  return g + "</g>";
}

function wtsDoll(cx, cy, scale = 1, op = 1, nod = 0) {
  const dy = 10 * Math.sin(Math.PI * Math.max(0, Math.min(1, nod)));
  return "<g transform=\"translate(" + wtsN(cx) + " " + wtsN(cy + dy) + ") scale(" + wtsN(scale) +
    ")\" opacity=\"" + wtsO(op) + "\" stroke-linecap=\"round\" stroke-linejoin=\"round\">" +
    "<circle cx=\"0\" cy=\"-72\" r=\"31\" fill=\"rgba(240,217,189,.55)\" stroke=\"" + C.chalk + "\" stroke-width=\"5\"/>" +
    "<path d=\"M-28 -77 Q-21 -112 4 -105 Q27 -99 29 -75 Q9 -90 -4 -87 Q-18 -83 -28 -77Z\" fill=\"" + WTS_WOOD +
    "\" stroke=\"" + C.chalk + "\" stroke-width=\"3\"/><path d=\"M-43 43 Q-40 -28 0 -28 Q40 -28 43 43Z\" fill=\"rgba(127,182,217,.28)\" stroke=\"" +
    C.chalk + "\" stroke-width=\"5\"/><path d=\"M-37 -5 L-70 26 M37 -5 L70 26 M-19 43 L-30 91 M19 43 L30 91\" fill=\"none\" stroke=\"" +
    C.chalk + "\" stroke-width=\"9\"/><circle cx=\"-10\" cy=\"-67\" r=\"3\" fill=\"" + WTS_WOOD +
    "\"/><circle cx=\"10\" cy=\"-67\" r=\"3\" fill=\"" + WTS_WOOD + "\"/></g>";
}

function wtsBubble(x, y, w, h, op = 1, tail = "down", flash = 0) {
  if (op <= 0.001) return "";
  let tailPath = "";
  if (tail === "up") {
    tailPath = "<path d=\"M" + wtsN(x + w * 0.48) + " " + wtsN(y + 1) + " L" + wtsN(x + w * 0.62) + " " +
      wtsN(y + 1) + " L" + wtsN(x + w * 0.55) + " " + wtsN(y - 18) +
      " Z\" fill=\"rgba(35,57,47,.95)\" stroke=\"" + C.chalk + "\" stroke-width=\"4\" stroke-linejoin=\"round\"/>";
  } else if (tail === "leftDown") {
    tailPath = "<path d=\"M" + wtsN(x + 16) + " " + wtsN(y + h - 1) + " L" + wtsN(x + 36) + " " + wtsN(y + h - 1) +
      " L" + wtsN(x - 10) + " " + wtsN(y + h + 10) + " Z\" fill=\"rgba(35,57,47,.95)\" stroke=\"" + C.chalk + "\" stroke-width=\"4\" stroke-linejoin=\"round\"/>";
  } else if (tail === "down") {
    tailPath = "<path d=\"M" + wtsN(x + w * 0.48) + " " + wtsN(y + h - 1) + " L" + wtsN(x + w * 0.62) + " " +
      wtsN(y + h - 1) + " L" + wtsN(x + w * 0.55) + " " + wtsN(y + h + 18) +
      " Z\" fill=\"rgba(35,57,47,.95)\" stroke=\"" + C.chalk + "\" stroke-width=\"4\" stroke-linejoin=\"round\"/>";
  }
  const fill = flash > 0.01 ? "rgba(242,193,78," + (0.5 * flash).toFixed(3) + ")" : "rgba(239,233,216,.06)";
  return "<g opacity=\"" + wtsO(op) + "\"><rect x=\"" + wtsN(x) + "\" y=\"" + wtsN(y) + "\" width=\"" +
    wtsN(w) + "\" height=\"" + wtsN(h) + "\" rx=\"18\" fill=\"" + fill + "\" stroke=\"" +
    C.chalk + "\" stroke-width=\"4\"/>" + tailPath + "</g>";
}

function wtsBracket(x1, x2, y, progress, op = 1) {
  if (op <= 0.001 || progress <= 0.001) return "";
  const end = x1 + (x2 - x1) * progress;
  return "<path d=\"M" + wtsN(x1) + " " + wtsN(y - 7) + " L" + wtsN(x1) + " " + wtsN(y) +
    " L" + wtsN(end) + " " + wtsN(y) + " L" + wtsN(end) + " " + wtsN(y - 7) +
    "\" fill=\"none\" stroke=\"" + C.yellow + "\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" opacity=\"" + wtsO(op) + "\"/>";
}

function wtsCurve(x1, y1, cx, cy, x2, y2, k, op = 1, color = C.yellow, width = 4, dash = "") {
  if (op <= 0.001 || k <= 0.001) return "";
  const px = wtsLerp(x1, cx, k), py = wtsLerp(y1, cy, k);
  const qx = wtsLerp(cx, x2, k), qy = wtsLerp(cy, y2, k);
  const ex = wtsLerp(px, qx, k), ey = wtsLerp(py, qy, k);
  return wtsPath("M" + wtsN(x1) + " " + wtsN(y1) + " Q" + wtsN(px) + " " + wtsN(py) + " " + wtsN(ex) + " " + wtsN(ey), color, width, op, "none", dash);
}

function wtsStageTitle(u, value) {
  return wtsLabel(800, 240, value, 36, C.yellow, wtsK(u, 0.2, 0.8));
}


function wtsNet(x1,x2,y,op,lit=0){
  if(op<=.001)return ""; const k=Math.max(0,Math.min(1,lit)), c=k>.01?WTS_YELLOW:WTS_CREAM;
  let g="<g opacity=\""+wtsO(op)+"\">";
  if(k>.01)g+="<rect x=\""+x1+"\" y=\""+(y-4)+"\" width=\""+(x2-x1)+"\" height=\"12\" fill=\"rgba(242,193,78,"+(k*.18).toFixed(3)+")\"/>";
  g+=wtsLine(x1,y,x2,y,c,4,1,"14 8")+wtsLine(x1,y+8,x2,y+8,k>.01?WTS_YELLOW:"rgba(239,233,216,.55)",2);
  for(let x=x1+20;x<x2;x+=40)g+=wtsLine(x,y,x+7,y+8,k>.01?WTS_YELLOW:"rgba(239,233,216,.72)",2);
  return g+"</g>";
}
function wtsTitleCard(x,y,w,value,size,op){
  if(op<=.001)return "";
  return "<g opacity=\""+wtsO(op)+"\"><rect x=\""+x+"\" y=\""+y+"\" width=\""+w+"\" height=\"56\" rx=\"12\" fill=\"rgba(26,43,35,.96)\" stroke=\""+WTS_CREAM+"\" stroke-width=\"4\"/>"+txt(x+w/2,y+38,value,{a:"middle",s:size,w:1,f:WTS_YELLOW})+"</g>";
}
function wtsTablet(x,top,w,bottom,line1,line2,base,op,grow=1,dashed=false,textOp=1){
  if(op<=.001||grow<=.001)return ""; const k=Math.max(0,Math.min(1,grow)),r=w/2,vis=bottom-(bottom-top)*k,id="wts-tab-"+[x,top,w,bottom].join("-"),dash=dashed?" stroke-dasharray=\"12 9\"":"";
  const pad=Math.min(20,w*0.25),baseH=Math.min(40,w*0.3); // 小石碑碑座跟著縮，避免像提包
  const d="M"+x+" "+(top+r)+" A"+r+" "+r+" 0 0 1 "+(x+w)+" "+(top+r)+" L"+(x+w)+" "+(bottom-baseH)+" L"+x+" "+(bottom-baseH)+" Z";
  let g="<defs><clipPath id=\""+id+"\" clipPathUnits=\"userSpaceOnUse\"><rect x=\""+(x-24)+"\" y=\""+vis+"\" width=\""+(w+48)+"\" height=\""+(bottom-vis+2)+"\"/></clipPath></defs><g opacity=\""+wtsO(op)+"\"><g clip-path=\"url(#"+id+")\">";
  g+="<path d=\""+d+"\" fill=\""+(dashed?"none":"rgba(239,233,216,.06)")+"\" stroke=\""+WTS_CREAM+"\" stroke-width=\"5\""+dash+"/><rect x=\""+(x-pad)+"\" y=\""+(bottom-baseH)+"\" width=\""+(w+2*pad)+"\" height=\""+baseH+"\" fill=\""+(dashed?"none":"rgba(239,233,216,.06)")+"\" stroke=\""+WTS_CREAM+"\" stroke-width=\"4\""+dash+"/>";
  if(!dashed&&k>=.98&&textOp>.001){g+="<g opacity=\""+wtsO(textOp)+"\">";if(line1)g+=txt(x+w/2,top+r+56,line1,{a:"middle",s:30,w:1,f:WTS_CREAM});if(line2)g+=txt(x+w/2,top+r+106,line2,{a:"middle",s:30,w:1,f:WTS_CREAM});if(base)g+=txt(x+w/2,bottom-12,base,{a:"middle",s:26,w:1,f:"rgba(239,233,216,.78)"});g+="</g>";}
  return g+"</g></g>";
}
function wtsStep(cx,cy,rx,ry,value,op,pop=1,dashed=false){
  if(op<=.001)return "";const scale=.8+.2*Math.max(0,Math.min(1,pop)),dash=dashed?" stroke-dasharray=\"12 8\"":"";
  let g="<g transform=\"translate("+cx+" "+cy+") scale("+wtsN(scale)+") translate("+(-cx)+" "+(-cy)+")\" opacity=\""+wtsO(op)+"\"><ellipse cx=\""+cx+"\" cy=\""+cy+"\" rx=\""+rx+"\" ry=\""+ry+"\" fill=\""+(dashed?"none":"rgba(240,178,122,.12)")+"\" stroke=\""+WTS_ORANGE+"\" stroke-width=\"5\""+dash+"/>";
  if(!dashed&&value)g+=txt(cx,cy+11,value,{a:"middle",s:30,w:1,f:WTS_CREAM});return g+"</g>";
}
function wtsColorTitle(cx,y,before,mark,after,size,op){
  if(op<=.001)return "";return "<text x=\""+cx+"\" y=\""+y+"\" text-anchor=\"middle\" font-size=\""+size+"\" font-weight=\"700\" fill=\""+WTS_CREAM+"\" opacity=\""+wtsO(op)+"\"><tspan fill=\""+WTS_CREAM+"\" style=\"fill:"+WTS_CREAM+"\">"+esc(before)+"</tspan><tspan fill=\""+WTS_YELLOW+"\" style=\"fill:"+WTS_YELLOW+"\">"+esc(mark)+"</tspan><tspan fill=\""+WTS_CREAM+"\" style=\"fill:"+WTS_CREAM+"\">"+esc(after)+"</tspan></text>";
}
function wtsOuterFrame(x,y,w,h,op){
  if(op<=.001)return "";const left=Math.max(62,x-6),right=Math.min(1538,x+w+6);
  return "<rect x=\""+left+"\" y=\""+(y-6)+"\" width=\""+(right-left)+"\" height=\""+(h+12)+"\" rx=\"20\" fill=\"none\" stroke=\""+WTS_YELLOW+"\" stroke-width=\"4\" opacity=\""+wtsO(op)+"\"/>";
}
function wtsArrowTo(x1,y1,x2,y2,op=1,p=1,size=16){
  if(op<=.001||p<=.001)return "";const ex=wtsLerp(x1,x2,p),ey=wtsLerp(y1,y2,p),a=Math.atan2(y2-y1,x2-x1);
  let g=wtsLine(x1,y1,ex,ey,WTS_YELLOW,4,op);if(p>=.99){g+="<polygon points=\""+x2+","+y2+" "+wtsN(x2-size*Math.cos(a-.48))+","+wtsN(y2-size*Math.sin(a-.48))+" "+wtsN(x2-size*Math.cos(a+.48))+","+wtsN(y2-size*Math.sin(a+.48))+"\" fill=\""+WTS_YELLOW+"\" opacity=\""+wtsO(op)+"\"/>";}return g;
}
function wtsJump(x1,y1,x2,y2,p,h=60){const k=Math.max(0,Math.min(1,p));return{x:wtsLerp(x1,x2,k),y:wtsLerp(y1,y2,k)-4*h*k*(1-k)};}
function wtsWallTilt(u,start,a,b,c){
  if(u<start)return 0;let amp=4;amp=wtsLerp(4,2.6,wtsK(u,a,a+.5));amp=wtsLerp(amp,1.6,wtsK(u,b,b+.5));amp=wtsLerp(amp,1,wtsK(u,c,c+.5));return amp*Math.sin(2*Math.PI*u/1.4);
}
function wtsBook(cx, cy, w, h, left, right, op, open = 1, dashed = false) {
  if (op <= 0.001) return "";
  const k = Math.max(0, Math.min(1, open));
  const span = w * 0.5 * k, top = cy - h * 0.5, bottom = cy + h * 0.5;
  const dash = dashed ? ' stroke-dasharray="12 9"' : "";
  const fill = dashed ? "none" : "rgba(239,233,216,.04)";
  const lx = cx - span, rx = cx + span;
  let g = "<g opacity=\"" + wtsO(op) + "\" stroke=\"" + WTS_CREAM + "\" stroke-width=\"5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"" + dash + ">";
  g += "<path d=\"M" + wtsN(cx) + " " + bottom + " L" + wtsN(lx) + " " + bottom + " L" + wtsN(lx) + " " + top + " Q" + wtsN(cx - span * .55) + " " + wtsN(top + 12) + " " + wtsN(cx) + " " + wtsN(top + 8) + " Z\" fill=\"" + fill + "\"/>";
  g += "<path d=\"M" + wtsN(cx) + " " + bottom + " L" + wtsN(rx) + " " + bottom + " L" + wtsN(rx) + " " + top + " Q" + wtsN(cx + span * .55) + " " + wtsN(top + 12) + " " + wtsN(cx) + " " + wtsN(top + 8) + " Z\" fill=\"" + fill + "\"/>";
  g += "<line x1=\"" + wtsN(cx) + "\" y1=\"" + wtsN(top + 8) + "\" x2=\"" + wtsN(cx) + "\" y2=\"" + bottom + "\"/>";
  g += "</g><g opacity=\"" + wtsO(op) + "\">"; // 字不可繼承粉筆線的 stroke（原本字被描粗糊掉）
  if (!dashed && k >= .98) {
    g += txt(cx - w * .25, cy + 12, left, { a: "middle", s: 34, w: 1, f: WTS_CREAM });
    g += txt(cx + w * .25, cy + 12, right, { a: "middle", s: 34, w: 1, f: WTS_CREAM });
  }
  return g + "</g>";
}

function wtsMiniBook(cx, cy, s, op, dashed = false) {
  if (op <= 0.001) return "";
  const dash = dashed ? ' stroke-dasharray="7 5"' : "";
  const fill = dashed ? "none" : "rgba(239,233,216,.04)";
  return "<g transform=\"translate(" + wtsN(cx) + " " + wtsN(cy) + ") scale(" + wtsN(s) + ")\" opacity=\"" + wtsO(op) + "\" stroke=\"" + WTS_CREAM + "\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"" + dash + ">" +
    "<path d=\"M0 14 Q-11 8 -22 10 V-12 Q-10 -15 0 -8 Z\" fill=\"" + fill + "\"/><path d=\"M0 14 Q11 8 22 10 V-12 Q10 -15 0 -8 Z\" fill=\"" + fill + "\"/><line x1=\"0\" y1=\"-8\" x2=\"0\" y2=\"14\"/></g>";
}

function wtsMiniHouse(cx, cy, s, op, dashed = false) {
  if (op <= 0.001) return "";
  const dash = dashed ? ' stroke-dasharray="7 5"' : "";
  const fill = dashed ? "none" : "rgba(239,233,216,.04)";
  return "<g transform=\"translate(" + wtsN(cx) + " " + wtsN(cy) + ") scale(" + wtsN(s) + ")\" opacity=\"" + wtsO(op) + "\" stroke=\"" + WTS_CREAM + "\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"" + dash + ">" +
    "<path d=\"M-20 0 L0 -20 L20 0 V20 H-20 Z\" fill=\"" + fill + "\"/><path d=\"M-4 20 V8 H4 V20\" fill=\"" + fill + "\"/></g>";
}

function wtsIconTag(x, y, w, icon, label, op) {
  if (op <= 0.001) return "";
  const ix = x + 36, iy = y + 32, labelX = x + 60 + (w - 60) / 2;
  let g = "<g opacity=\"" + wtsO(op) + "\">" + box(x, y, w, 64, WTS_YELLOW, 1, "rgba(26,43,35,.94)");
  if (icon === "book") g += wtsMiniBook(ix, iy, .8, 1);
  if (icon === "house") g += wtsMiniHouse(ix, iy, .8, 1);
  g += txt(labelX, y + 42, label, { a: "middle", s: 30, w: 1, f: WTS_CREAM }) + "</g>";
  return g;
}

function wtsDownArrowHead(x, y, op = 1) {
  if (op <= 0.001) return "";
  return "<polygon points=\"" + wtsN(x - 11) + "," + wtsN(y - 12) + " " + wtsN(x + 11) + "," + wtsN(y - 12) + " " + wtsN(x) + "," + wtsN(y + 2) + "\" fill=\"" + WTS_YELLOW + "\" opacity=\"" + wtsO(op) + "\"/>";
}
function s1(u) {
  // 使用者 2026-10-24 意見：寫之前把四個型都加到題目前面試一次，可以同時符合兩型；改成為何型屬高階寫法，只提一句
  let g = wtsHead(u, 0) + wtsMetaphorTag();
  g += wtsTitleCard(620, 222, 360, "〈一本書的啟示〉", 34, wtsK(u, .2, .8));
  const rows = [
    { y: 380, mark: "（談論）", ok: true, type: "談論型", t: 1.0 },
    { y: 465, mark: "（如何）", ok: false, type: "如何型", t: 3.0 },
    { y: 550, mark: "（什麼是）", ok: true, type: "什麼型", t: 5.0 },
    { y: 635, mark: "（為何）", ok: false, type: "為何型", t: 7.0 }
  ];
  rows.forEach((r) => {
    const textOp = wtsK(u, r.t, r.t + .5), markOp = wtsK(u, r.t + .8, r.t + 1.1), tagOp = wtsK(u, r.t + 1.2, r.t + 1.6);
    g += wtsColorTitle(600, r.y, "", r.mark, "一本書的啟示", 34, textOp);
    g += r.ok ? wtsCheck(830, r.y - 12, .45, markOp) : wtsCross(830, r.y - 12, .45, markOp);
    g += wtsTag(900, r.y - 44, 170, r.type, tagOp * (r.ok ? 1 : .45));
    if (r.ok) g += wtsOuterFrame(900, r.y - 44, 170, 64, tagOp);
  });
  const noteOp = wtsK(u, 10.0, 10.8);
  if (noteOp > .001) {
    g += "<g opacity=\"" + wtsO(noteOp) + "\">" + box(300, 700, 1000, 72, WTS_CREAM, 1, "rgba(26,43,35,.96)") + "</g>";
    g += wtsLabel(800, 746, "也可以寫成〈一本書的啟示（為何重要）〉→ 為何型（高階）", 30, WTS_CREAM, noteOp);
  }
  return wtsPaint(g);
}

function s2(u) {
  let g = wtsHead(u, 1) + wtsMetaphorTag();
  g += wtsTag(710, 226, 180, "什麼型", wtsK(u, .2, .8));
  const cards = [
    { x: 120, before: "〈一本書的", mark: "啟示", after: "〉", start: .8 },
    { x: 600, before: "〈一句話的", mark: "啟示", after: "〉", start: 1.8 },
    { x: 1080, before: "〈一件事的", mark: "啟示", after: "〉", start: 2.8 }
  ];
  cards.forEach((c, i) => {
    const op = wtsK(u, c.start, c.start + .6);
    const lit = wtsK(u, 4.5 + i * .25, 4.7 + i * .25);
    g += wtsCardFrame(c.x, 320, 400, 200, op);
    g += wtsOuterFrame(c.x, 320, 400, 200, lit);
    g += wtsColorTitle(c.x + 200, 435, c.before, c.mark, c.after, 40, op);
  });
  const basket = wtsK(u, 6, 7);
  const basketY = wtsLerp(520, 720, basket);
  g += wtsBasket(560, basketY, 220, "書摘", basket);
  g += wtsBasket(1040, basketY, 220, "啟示", basket);
  g += wtsLabel(800, 620, "先蒐集", 34, WTS_YELLOW, wtsK(u, 7.5, 8.3));
  return wtsPaint(g);
}

function s3(u) {
  let g = wtsHead(u, 2) + wtsMetaphorTag();
  const boardIn = wtsK(u, 2.5, 2.8);
  const boardRise = wtsK(u, 2.5, 4);
  const boardY = wtsLerp(420, 300, boardRise);
  g += wtsBoard(520, 880, boardY, 80, "堅持到底才會成功", boardIn, 0, 700, 760);
  const bookOp = wtsK(u, .3, 1.2);
  g += wtsBook(700, 585, 520, 230, "《伊索寓言》", "〈龜兔賽跑〉", bookOp, bookOp);
  const light = wtsK(u, 4, 4.25);
  g += wtsLine(700, 465, 700, 395, WTS_YELLOW, 4, light);
  g += wtsLine(700, 465, 660, 395, WTS_YELLOW, 4, light);
  g += wtsLine(700, 465, 740, 395, WTS_YELLOW, 4, light);
  g += wtsDoll(1300, 620, 1, wtsK(u, 1, 1.4));
  const bubble = wtsK(u, 5, 5.6), flash = wtsFlash(u, 8);
  g += wtsBubble(1190, 400, 180, 64, bubble, "down", flash);
  g += wtsLabel(1280, 442, "真的嗎？", 30, WTS_CREAM, bubble);
  return wtsPaint(g);
}

function s4(u) {
  let g = wtsHead(u, 3) + wtsMetaphorTag() + wtsStageTitle(u, "論據一：書裡的例子");
  g += wtsLine(60, 760, 1540, 760, WTS_CREAM, 4, 1);
  const tilt = wtsWallTilt(u, 2, 5.1, 7.1, 9.1);
  const boardOp = wtsK(u, .2, .8), wallGrow = wtsK(u, .8, 1.8);
  g += "<g transform=\"translate(800 760) rotate(" + wtsN(tilt) + ") translate(-800 -760)\">";
  g += wtsBoard(380, 1220, 290, 80, "堅持到底才會成功", boardOp, 0, 800, 760);
  g += wtsWall(670, 370, 260, 760, "不停下來就會到", 1, 0, wallGrow, 0, false, wtsK(u, 1.8, 2.2));
  g += "</g>";
  g += wtsStone(370, 660, 300, 100, WTS_ORANGE, "烏龜", "什麼人", wtsK(u, 4.5, 5.1), wtsK(u, 4.5, 5.1));
  g += wtsStone(420, 560, 250, 100, WTS_BLUE, "一步步不停往前", "做什麼事", wtsK(u, 6.5, 7.1), wtsK(u, 6.5, 7.1));
  g += wtsStone(470, 460, 200, 100, WTS_YELLOW, "先到終點", "結果", wtsK(u, 8.5, 9.1), wtsK(u, 8.5, 9.1));
  const bookTag = wtsK(u, 9.6, 10.2);
  g += wtsIconTag(470, 386, 170, "book", "書裡", bookTag);
  const dollOp = wtsK(u, .3, .7), bubbleOp = wtsK(u, .6, .9);
  g += wtsDoll(1350, 650, .85, dollOp);
  g += wtsBubble(1250, 440, 180, 64, bubbleOp, "down");
  g += wtsLabel(1340, 482, "真的嗎？", 30, WTS_CREAM, bubbleOp);
  return wtsPaint(g);
}

function s5(u) {
  let g = wtsHead(u, 4) + wtsMetaphorTag() + wtsStageTitle(u, "論據二：生活的例子");
  g += wtsLine(60, 760, 1540, 760, WTS_CREAM, 4, 1);
  let amp = 1;
  amp = wtsLerp(amp, .6, wtsK(u, 1, 1.6));
  amp = wtsLerp(amp, .3, wtsK(u, 2.5, 3.1));
  amp = wtsLerp(amp, 0, wtsK(u, 4, 4.6));
  const tilt = amp * Math.sin(2 * Math.PI * u / 1.4);
  g += "<g transform=\"translate(800 760) rotate(" + wtsN(tilt) + ") translate(-800 -760)\">";
  g += wtsBoard(380, 1220, 290, 80, "堅持到底才會成功", 1, 0, 800, 760);
  g += wtsWall(670, 370, 260, 760, "不停下來就會到", 1, 0, 1, 0, false, 1);
  g += "</g>";
  g += wtsStone(370, 660, 300, 100, WTS_ORANGE, "烏龜", "", 1, 1);
  g += wtsStone(420, 560, 250, 100, WTS_BLUE, "一步步不停往前", "", 1, 1);
  g += wtsStone(470, 460, 200, 100, WTS_YELLOW, "先到終點", "", 1, 1);
  g += wtsIconTag(470, 386, 170, "book", "書裡", 1);
  const houseTag = wtsK(u, 4.8, 5.4);
  g += wtsIconTag(960, 386, 170, "house", "生活", houseTag);
  const stone1 = wtsK(u, 1, 1.6), stone2 = wtsK(u, 2.5, 3.1), stone3 = wtsK(u, 4, 4.6);
  g += wtsStone(930, 660, 300, 100, WTS_ORANGE, "我", "", stone1, stone1);
  g += wtsStone(930, 560, 250, 100, WTS_BLUE, "每天練琴十分鐘", "", stone2, stone2);
  g += wtsStone(930, 460, 210, 100, WTS_YELLOW, "彈完一整首曲", "", stone3, stone3);
  const bubbleOp = 1 - wtsK(u, 5.4, 6.2);
  g += wtsBubble(1250, 440, 180, 64, bubbleOp, "down");
  g += wtsLabel(1340, 482, "真的嗎？", 30, WTS_CREAM, bubbleOp);
  const nod = wtsK(u, 6.4, 7.4);
  g += wtsDoll(1350, 650, .85, 1, nod);
  return wtsPaint(g);
}

function s6(u) {
  let g = wtsHead(u, 5) + wtsMetaphorTag() + wtsStageTitle(u, "重申論點");
  const left = wtsK(u, .3, .7);
  g += wtsSign(330, 470, 300, 80, "堅持到底才會成功", left, 0, 640);
  const drop = wtsK(u, 1, 2);
  g += wtsSign(1000, wtsLerp(300, 470, drop), 300, 80, "堅持到底才會成功", drop, 0, 640);
  g += wtsCurve(1000, 428, 665, 320, 330, 428, wtsK(u, 3, 5), 1, WTS_YELLOW, 4, "10 8");
  const cardOp = wtsK(u, 5.5, 5.8);
  g += wtsCardFrame(860, 664, 280, 112, cardOp);
  g += wtsLabel(1000, 708, "我會怎麼做", 30, WTS_CREAM, cardOp);
  g += wtsLabel(1000, 752, "遇到困難不放棄", 30, WTS_YELLOW, cardOp);
  const nod = wtsK(u, 7.5, 8.5);
  g += wtsDoll(1380, 620, 1, wtsK(u, .5, .8), nod);
  g += wtsCheck(1460, 470, .5, wtsK(u, 8.5, 9.1));
  return wtsPaint(g);
}

function s7(u) {
  let g = wtsHead(u, 6) + wtsMetaphorTag();
  const blocks = [
    { x: 70, w: 300, tag: "這本書＋道理" },
    { x: 390, w: 400, tag: "書裡的例子" },
    { x: 810, w: 400, tag: "生活的例子" },
    { x: 1230, w: 300, tag: "再說一次" }
  ];
  blocks.forEach((b, i) => {
    const start = .2 + i * .58, drop = wtsK(u, start, start + .6);
    g += wtsBlock(b.x, wtsLerp(190, 300, drop), b.w, 200, WTS_BLUE, drop);
    g += wtsWorkTag(b.x, 350, b.w, b.tag, wtsK(u, 1 + i * .7, 1.4 + i * .7));
  });
  const iconStarts = [3.5, 4.05, 4.6, 5.15];
  const icons = iconStarts.map(s => wtsK(u, s, s + .45));
  g += wtsMiniBook(170, 435, 1.2, icons[0]);
  g += wtsSign(270, 420, 80, 30, "", icons[0], 0, 470);
  g += wtsWall(640, 392, 30, 476, "", icons[1], 0, 1);
  g += wtsStone(580, 450, 60, 26, WTS_ORANGE, "", "", icons[1], 1);
  g += wtsStone(595, 424, 45, 26, WTS_BLUE, "", "", icons[1], 1);
  g += wtsStone(610, 398, 30, 26, WTS_YELLOW, "", "", icons[1], 1);
  g += wtsWall(930, 392, 30, 476, "", icons[2], 0, 1);
  g += wtsStone(960, 450, 60, 26, WTS_ORANGE, "", "", icons[2], 1);
  g += wtsStone(960, 424, 45, 26, WTS_BLUE, "", "", icons[2], 1);
  g += wtsStone(960, 398, 30, 26, WTS_YELLOW, "", "", icons[2], 1);
  g += wtsSign(1380, 420, 90, 32, "", icons[3], 0, 470);
  const phrases = [
    { x: 220, y: 550, text: "龜兔賽跑", start: 6 },
    { x: 220, y: 592, text: "堅持才成功", start: 6.5 },
    { x: 590, y: 550, text: "烏龜不停往前", start: 7 },
    { x: 1010, y: 550, text: "我每天練琴", start: 7.5 },
    { x: 1380, y: 550, text: "遇到困難不放棄", start: 8 }
  ];
  phrases.forEach(p => g += wtsPhrase(p.x, p.y, p.text, 30, WTS_YELLOW, wtsK(u, p.start, p.start + .4), "middle"));
  const bracketOp = wtsK(u, 11, 13);
  const groups = [
    { a: 70, b: 370, x: 220, text: "論點" },
    { a: 390, b: 790, x: 590, text: "論據一" },
    { a: 810, b: 1210, x: 1010, text: "論據二" },
    { a: 1230, b: 1530, x: 1380, text: "重申論點" }
  ];
  groups.forEach(q => {
    g += wtsBracket(q.a, q.b, 280, bracketOp);
    g += wtsLabel(q.x, 262, q.text, 30, WTS_CREAM, bracketOp);
  });
  return wtsPaint(g);
}

function s8(u) {
  let g = wtsHead(u, 7) + wtsMetaphorTag();
  const x = [70, 390, 810, 1230], w = [300, 400, 400, 300];
  const topTags = ["這本書＋道理", "書裡的例子", "生活的例子", "再說一次"];
  const bottomTags = ["這本書", "書裡的例子", "生活的例子", "道理＋怎麼做"];
  const topBlockStart = [.3, .65, 1, 1.35];
  const topLabelStart = [.6, .95, 1.3, 1.65];
  const iconStart = [2.2, 2.7, 3.2, 3.7];
  for (let i = 0; i < 4; i++) {
    const blockOp = wtsK(u, topBlockStart[i], topBlockStart[i] + .45);
    const workOp = wtsK(u, topLabelStart[i], topLabelStart[i] + .4);
    g += wtsBlock(x[i], 300, w[i], 150, WTS_BLUE, blockOp);
    g += wtsWorkTag(x[i], 345, w[i], topTags[i], workOp);
    const io = wtsK(u, iconStart[i], iconStart[i] + .45);
    if (i === 0) g += wtsSign(220, 395, 80, 28, "", io, 0, 440);
    if (i === 3) g += wtsSign(1380, 395, 80, 28, "", io, 0, 440);
  }
  g += wtsPhrase(70, 285, "論點在前", 30, WTS_YELLOW, wtsK(u, .3, .7), "start");
  const bottomBlockStart = [4, 4.35, 4.7, 5.05];
  const bottomLabelStart = [4.3, 4.65, 5, 5.35];
  for (let i = 0; i < 4; i++) {
    const blockOp = wtsK(u, bottomBlockStart[i], bottomBlockStart[i] + .45);
    const workOp = wtsK(u, bottomLabelStart[i], bottomLabelStart[i] + .4);
    const blockY = 580, blockH = 150;
    if (i === 3) {
      g += wtsBlock(x[i], blockY, w[i], blockH, WTS_BLUE, blockOp);
      const warm = wtsK(u, 8.5, 9.1);
      g += "<rect x=\"1230\" y=\"580\" width=\"300\" height=\"150\" rx=\"14\" fill=\"rgba(242,193,78,.25)\" opacity=\"" + wtsO(warm) + "\"/>";
      g += "<rect x=\"1230\" y=\"580\" width=\"300\" height=\"150\" rx=\"14\" fill=\"none\" stroke=\"" + WTS_CREAM + "\" stroke-width=\"4\" opacity=\"" + wtsO(blockOp) + "\"/>";
    } else {
      g += wtsBlock(x[i], blockY, w[i], blockH, WTS_BLUE, blockOp);
    }
    g += wtsWorkTag(x[i], 625, w[i], bottomTags[i], workOp);
    if (i === 0) g += wtsMiniBook(220, 680, 1.2, wtsK(u, 4.8, 5.2));
    if (i === 3) g += wtsSign(1380, 675, 80, 28, "", wtsK(u, 8.5, 9.1), 0, 720);
  }
  g += wtsPhrase(70, 565, "論點放最後", 30, WTS_YELLOW, wtsK(u, 4, 4.4), "start");
  const arrowP = wtsK(u, 6.5, 8.5);
  g += wtsCurve(220, 462, 800, 520, 1380, 572, arrowP, 1, WTS_YELLOW, 4, "10 8");
  g += wtsDownArrowHead(1380, 572, arrowP);
  return wtsPaint(g);
}

function s9(u) {
  let g = wtsHead(u, 8) + wtsMetaphorTag() + wtsStageTitle(u, "講義的兩種排法");
  const cardOp = wtsK(u, .3, .8);
  g += wtsCardFrame(100, 290, 760, 300, cardOp);
  g += wtsPhrase(140, 380, "論點＋論據＋論據＋重申論點", 30, WTS_CREAM, wtsK(u, 1, 1.4));
  g += wtsPhrase(140, 500, "論據＋論據＋提出論點", 30, WTS_CREAM, wtsK(u, 2, 2.4));
  const tag1 = wtsK(u, 1.5, 1.9), tag2 = wtsK(u, 2.5, 2.9);
  g += wtsTag(1100, 340, 240, "論點在前", tag1);
  g += wtsTag(1100, 460, 240, "論點放最後", tag2);
  const a1 = wtsK(u, 3.5, 4.2), a2 = wtsK(u, 4.2, 5);
  g += wtsArrowTo(560, 370, 1090, 372, a1);
  g += wtsArrowTo(470, 490, 1090, 492, a2);
  const noteOp = wtsK(u, 6, 6.8);
  g += wtsCardFrame(350, 640, 900, 72, noteOp);
  g += wtsLabel(800, 686, "〈真正的聰明〉先寫例子，再寫論點", 30, WTS_CREAM, noteOp);
  return wtsPaint(g);
}

function s10(u) {
  let g = wtsHead(u, 9) + wtsMetaphorTag();
  const titleOp = wtsK(u, .2, .5);
  g += wtsCardFrame(560, 200, 480, 72, titleOp);
  g += wtsColorTitle(800, 247, "〈一句話的", "啟示", "〉", 40, titleOp);
  g += wtsTag(1060, 204, 160, "什麼型", wtsK(u, .6, .8));
  const basketOp = wtsK(u, .8, 1.6);
  const basketFlash = [6.5, 7.35];
  g += wtsBasket(620, 340, 200, "書摘", basketOp, true, wtsFlash(u, basketFlash[0]));
  g += wtsBasket(980, 340, 200, "啟示", basketOp, true, wtsFlash(u, basketFlash[1]));
  const x = [70, 390, 810, 1230], w = [300, 400, 400, 300];
  const tags = ["這本書＋道理", "書裡的例子", "生活的例子", "再說一次"];
  const starts = [1.6, 2.2, 2.8, 3.4], flashes = [8.2, 9.05, 9.9, 10.75];
  for (let i = 0; i < 4; i++) {
    const op = wtsK(u, starts[i], starts[i] + .5);
    g += wtsBlock(x[i], 440, w[i], 240, WTS_BLUE, op, true, wtsFlash(u, flashes[i]));
    g += wtsWorkTag(x[i], 490, w[i], tags[i], op);
  }
  const io = wtsK(u, 4, 5);
  g += wtsSign(220, 560, 90, 32, "", io, 0, 610, true);
  g += wtsWall(640, 532, 30, 616, "", io, 0, 1, 0, true);
  g += wtsStone(580, 590, 60, 26, WTS_ORANGE, "", "", io, 1, true);
  g += wtsStone(595, 564, 45, 26, WTS_BLUE, "", "", io, 1, true);
  g += wtsStone(610, 538, 30, 26, WTS_YELLOW, "", "", io, 1, true);
  g += wtsWall(930, 532, 30, 616, "", io, 0, 1, 0, true);
  g += wtsStone(960, 590, 60, 26, WTS_ORANGE, "", "", io, 1, true);
  g += wtsStone(960, 564, 45, 26, WTS_BLUE, "", "", io, 1, true);
  g += wtsStone(960, 538, 30, 26, WTS_YELLOW, "", "", io, 1, true);
  g += wtsSign(1380, 560, 90, 32, "", io, 0, 610, true);
  g += wtsQuestionSign(650, 712, 300, 64, "論點放哪裡？", 30, wtsK(u, 5, 5.8), wtsFlash(u, 11.6));
  return wtsPaint(g);
}
