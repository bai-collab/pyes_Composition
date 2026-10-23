// 六年級記敘文（寫人，進階）第二集：場景只由 u（段內秒數）決定。
const META = {
  title: '舉一件事，證明她勇敢',
  subtitle: '9 段・約 2 分鐘・六年級記敘文（寫人）第二集',
  ariaLabel: '用積木、珠子、蝴蝶結、小旗、小火車、對話泡泡與放大鏡，呈現中間段如何先說主題、舉例並寫感覺。',
  note: '出處：楊裕貿研習講義；記人學習單。「積木、工作牌、珠子、蝴蝶結、小旗、小火車、對話泡泡、放大鏡、星星」是視覺比喻；示範句、短語與人物（姊姊）依講義結構自編。鍵盤操作：空白鍵播放／暫停，左右方向鍵切換段落，F 鍵全螢幕。畫面只由時間決定。',
  works: [],
};

const PFL_BLUE = '#7fb6d9';
const PFL_ORANGE = '#e8875b';
const PFL_RED = '#d9605a';
const PFL_SKIN = '#f0d9bd';
const PFL_BROWN = '#66513e';
const PFL_X = [140, 365, 805, 1245];
const PFL_W = [215, 430, 430, 215];
const PFL_COLORS = [PFL_BLUE, PFL_BLUE, PFL_BLUE, PFL_ORANGE];
const pflK = (u, a, b) => ease(P(u, a, b));
const pflO = (v) => Math.max(0, Math.min(1, Number(v) || 0)).toFixed(3);
const pflN = (v) => Number(v).toFixed(1);

function pflTag(u) {
  const op = pflK(u, 0.05, 0.55);
  return '<g opacity="' + pflO(op) + '">' + box(1376, 60, 164, 60, PFL_ORANGE, 1, C.deep) +
    txt(1458, 100, '比喻', { a: 'middle', s: 30, w: 1, f: PFL_ORANGE }) + '</g>';
}

function pflLabel(cx, y, value, size = 30, color = C.chalk, op = 1) {
  if (op <= 0.001) return '';
  return txt(cx, y, value, { a: 'middle', s: size, w: 1, f: color, o: op });
}

function pflTextByChar(value, cx, y, size, color = C.chalk, op = 1, visibleCount = Array.from(value).length) {
  const chars = Array.from(value);
  const visible = Math.max(0, Math.min(chars.length, visibleCount));
  return chars.slice(0, visible).map((ch, i) => txt(cx + (i - (chars.length - 1) / 2) * size, y, ch, {
    a: 'middle', s: size, w: 1, f: color, o: op,
  })).join('');
}

function pflProgressText(value, cx, y, size, color, op, count) {
  return pflTextByChar(value, cx, y, size, color, op, count);
}

function pflLine(x1, y1, x2, y2, color = C.chalk, width = 5, op = 1, dash = '') {
  if (op <= 0.001) return '';
  return '<line x1="' + pflN(x1) + '" y1="' + pflN(y1) + '" x2="' + pflN(x2) + '" y2="' + pflN(y2) +
    '" fill="none" stroke="' + color + '" stroke-width="' + width + '" stroke-linecap="round" stroke-linejoin="round" opacity="' + pflO(op) + '"' +
    (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
}

function pflBlock(x, y, w, h, color, op = 1, dashed = false) {
  if (op <= 0.001 || w <= 2 || h <= 2) return '';
  if (dashed) return '<g opacity="' + pflO(op) + '"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h +
    '" rx="14" fill="rgba(239,233,216,.012)" stroke="' + color + '" stroke-width="5" stroke-dasharray="14 10"/></g>';
  let g = '<g opacity="' + pflO(op) + '">';
  const n = Math.max(2, Math.floor(w / 130));
  for (let i = 0; i < n; i++) {
    const cx = x + w * (i + 0.5) / n;
    g += '<rect x="' + pflN(cx - 20) + '" y="' + pflN(y - 11) + '" width="40" height="13" rx="6" fill="' + color + '"/>';
  }
  return g + '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="14" fill="' + color +
    '" fill-opacity=".22" stroke="' + C.chalk + '" stroke-width="4"/></g>';
}

function pflCardFrame(x, y, w, h, op = 1, dashed = false, stroke = C.chalk) {
  if (op <= 0.001) return '';
  if (dashed) return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="18" fill="rgba(239,233,216,.012)" stroke="' +
    stroke + '" stroke-width="4" stroke-dasharray="13 9" opacity="' + pflO(op) + '"/>';
  return '<g opacity="' + pflO(op) + '">' + box(x, y, w, h, stroke, 1, C.deep) + '</g>';
}

function pflCircle(cx, cy, r, stroke = C.chalk, width = 4, fill = 'none', op = 1, dash = '') {
  return '<circle cx="' + pflN(cx) + '" cy="' + pflN(cy) + '" r="' + pflN(r) + '" fill="' + fill + '" stroke="' + stroke +
    '" stroke-width="' + width + '" opacity="' + pflO(op) + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
}

function pflLens(cx, cy, r = 45, op = 1, dashed = false, handleUp = false) {
  if (op <= 0.01 || r <= 1) return '';
  const dash = dashed ? '11 9' : '';
  const sy = handleUp ? -1 : 1;
  return '<g opacity="' + pflO(op) + '"><circle cx="' + pflN(cx) + '" cy="' + pflN(cy) + '" r="' + pflN(r) +
    '" fill="rgba(242,193,78,.045)" stroke="' + C.yellow + '" stroke-width="8"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>' +
    '<path d="M' + pflN(cx + r * 0.68) + ' ' + pflN(cy + sy * r * 0.68) + ' L' + pflN(cx + r * 1.28) + ' ' + pflN(cy + sy * r * 1.28) +
    '" stroke="' + C.yellow + '" stroke-width="17" stroke-linecap="round"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>' +
    '<path d="M' + pflN(cx + r * 0.8) + ' ' + pflN(cy + sy * r * 0.8) + ' L' + pflN(cx + r * 1.26) + ' ' + pflN(cy + sy * 1.26) +
    '" stroke="' + C.chalk + '" stroke-width="4" stroke-linecap="round"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/></g>';
}

function pflStar(cx, cy, r, op = 1, dashed = false) {
  if (op <= 0.01 || r <= 1) return '';
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5;
    const rr = i % 2 ? r * 0.46 : r;
    pts.push(pflN(cx + Math.cos(a) * rr) + ',' + pflN(cy + Math.sin(a) * rr));
  }
  return '<polygon points="' + pts.join(' ') + '" fill="' + (dashed ? 'none' : 'rgba(242,193,78,.3)') + '" stroke="' + C.yellow +
    '" stroke-width="5" stroke-linejoin="round" opacity="' + pflO(op) + '"' + (dashed ? ' stroke-dasharray="8 7"' : '') + '/>';
}

function pflHeart(cx, cy, scale = 1, op = 1) {
  if (op <= 0.01 || scale <= 0.01) return '';
  return '<path transform="translate(' + pflN(cx) + ' ' + pflN(cy) + ') scale(' + pflN(scale) +
    ')" d="M0 38 C-13 21 -48 -2 -48 -24 C-48 -51 -15 -55 0 -31 C15 -55 48 -51 48 -24 C48 -2 13 21 0 38Z" fill="rgba(232,135,91,.22)" stroke="' +
    PFL_ORANGE + '" stroke-width="6" opacity="' + pflO(op) + '"/>';
}

function pflPonytail(cx, cy, scale = 1, op = 1) {
  return '<g transform="translate(' + pflN(cx) + ' ' + pflN(cy) + ') scale(' + pflN(scale) + ')" opacity="' + pflO(op) +
    '" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M-39 -13 Q-55 -40 -37 -63 Q-17 -86 13 -73 Q37 -62 37 -34 L53 -19 L38 -7 Q35 21 12 34 L10 52 L-23 52 L-20 31 Q-45 15 -39 -13Z" fill="rgba(240,217,189,.24)" stroke="' + C.chalk + '" stroke-width="5"/>' +
    '<path d="M-34 -39 Q-18 -78 17 -66 Q39 -58 39 -32 Q15 -48 -2 -45 Q-18 -42 -34 -30Z" fill="' + PFL_BROWN + '" stroke="' + C.chalk + '" stroke-width="4"/>' +
    '<path d="M36 -49 Q63 -39 57 -15 Q52 5 37 13" fill="none" stroke="' + PFL_BROWN + '" stroke-width="13"/><path d="M40 -45 Q64 -37 57 -16" fill="none" stroke="' + C.chalk + '" stroke-width="3"/>' +
    '<path d="M-16 54 Q-7 70 5 54 M5 54 Q14 70 24 54" fill="none" stroke="' + C.chalk + '" stroke-width="5"/>' +
    '<circle cx="17" cy="-15" r="3.5" fill="' + C.chalk + '"/><path d="M28 -2 Q35 2 37 -2" fill="none" stroke="' + PFL_BROWN + '" stroke-width="3"/></g>';
}

function pflStormWindow(cx, cy, scale = 1, op = 1) {
  return '<g transform="translate(' + pflN(cx) + ' ' + pflN(cy) + ') scale(' + pflN(scale) + ')" opacity="' + pflO(op) +
    '" stroke-linecap="round" stroke-linejoin="round"><rect x="-48" y="-46" width="82" height="88" rx="3" fill="rgba(127,182,217,.08)" stroke="' + C.chalk + '" stroke-width="5"/>' +
    '<path d="M-7 -44 V40 M-46 -1 H32" fill="none" stroke="' + C.chalk + '" stroke-width="4"/>' +
    '<path d="M8 -32 L-5 -8 L9 -8 L-3 18 L20 -11 L6 -11 L18 -32Z" fill="' + C.yellow + '" stroke="' + C.yellow + '" stroke-width="3"/>' +
    '<g transform="rotate(-30 52 34)"><path d="M36 27 L8 14 L8 56 L36 41Z" fill="rgba(242,193,78,.35)" stroke="none"/>' +
    '<rect x="44" y="27" width="30" height="14" rx="4" fill="' + PFL_BLUE + '" stroke="' + C.chalk + '" stroke-width="3"/><rect x="35" y="23" width="10" height="22" rx="2" fill="' + C.chalk + '" stroke="' + C.chalk + '" stroke-width="2"/></g></g>';
}

function pflClimb(cx, cy, scale = 1, op = 1) {
  return '<g transform="translate(' + pflN(cx) + ' ' + pflN(cy) + ') scale(' + pflN(scale) + ')" opacity="' + pflO(op) +
    '" stroke-linecap="round" stroke-linejoin="round"><path d="M-52 48 L-37 -47 L44 -47 L57 48Z" fill="rgba(127,182,217,.08)" stroke="' + C.chalk + '" stroke-width="5"/>' +
    '<path d="M-25 20 L-11 9 L0 23 M25 -19 L37 -29 M-35 -23 L-27 -31" fill="none" stroke="' + PFL_ORANGE + '" stroke-width="9" stroke-linecap="round"/>' +
    '<circle cx="-9" cy="-22" r="9" fill="' + PFL_SKIN + '" stroke="' + C.chalk + '" stroke-width="3"/><path d="M-8 -12 L5 4 L-1 20 M2 2 L18 -6 M0 19 L-15 33 M0 19 L15 30" fill="none" stroke="' + C.chalk + '" stroke-width="6" stroke-linecap="round"/>' +
    '<path d="M-16 36 L18 36" fill="none" stroke="' + C.dim + '" stroke-width="3"/></g>';
}

function pflBead(cx, cy, r = 30, op = 1, dashed = false) {
  if (op <= 0.002) return '';
  const fill = dashed ? 'none' : PFL_BLUE;
  const dash = dashed ? '8 7' : '';
  return '<g opacity="' + pflO(op) + '"><circle cx="' + pflN(cx) + '" cy="' + pflN(cy) + '" r="' + pflN(r) + '" fill="' + fill +
    '" stroke="' + PFL_BLUE + '" stroke-width="4"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>' +
    (dashed ? '' : '<ellipse cx="' + pflN(cx - r * 0.35) + '" cy="' + pflN(cy - r * 0.4) + '" rx="' + pflN(r * 0.25) + '" ry="' + pflN(r * 0.14) +
      '" fill="#fff" opacity=".55" transform="rotate(-35 ' + pflN(cx - r * 0.35) + ' ' + pflN(cy - r * 0.4) + ')"/>') + '</g>';
}

function pflBow(cx, cy, sc = 1, op = 1, dashed = false) {
  if (op <= 0.002 || sc <= 0.01) return '';
  const w = 64 * sc, h = 43 * sc, knot = 19 * sc;
  const fill = dashed ? 'none' : PFL_ORANGE, dash = dashed ? ' stroke-dasharray="8 7"' : '';
  return '<g opacity="' + pflO(op) + '"><polygon points="' + pflN(cx - 7 * sc) + ',' + pflN(cy) + ' ' + pflN(cx - w) + ',' + pflN(cy - h) + ' ' + pflN(cx - w) + ',' + pflN(cy + h) +
    '" fill="' + fill + '" stroke="' + PFL_ORANGE + '" stroke-width="4" stroke-linejoin="round"' + dash + '/>' +
    '<polygon points="' + pflN(cx + 7 * sc) + ',' + pflN(cy) + ' ' + pflN(cx + w) + ',' + pflN(cy - h) + ' ' + pflN(cx + w) + ',' + pflN(cy + h) +
    '" fill="' + fill + '" stroke="' + PFL_ORANGE + '" stroke-width="4" stroke-linejoin="round"' + dash + '/>' +
    '<circle cx="' + pflN(cx) + '" cy="' + pflN(cy) + '" r="' + pflN(knot) + '" fill="' + (dashed ? 'none' : '#c96a40') + '" stroke="' + PFL_ORANGE +
    '" stroke-width="4"' + dash + '/></g>';
}

function pflThread(x1, x2, y, op = 1, dashed = false) {
  return pflLine(x1, y, x2, y, dashed ? C.dim : C.chalk, 5, op, dashed ? '13 12' : '');
}

function pflGlow(cx, cy, rx = 105, ry = 90, op = 0.5) {
  if (op <= 0.001) return '';
  return '<g opacity="' + pflO(op) + '"><ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="rgba(242,193,78,.13)"/>' +
    '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + (rx - 18) + '" ry="' + (ry - 15) + '" fill="none" stroke="' + C.yellow + '" stroke-width="5"/></g>';
}

function pflBlockGlow(x, y, w, h, op = 1) {
  const pad = 10;
  const opacity = pflO(Math.min(0.25, Math.max(0, op)));
  return '<rect x="' + (x - pad) + '" y="' + (y - pad) + '" width="' + (w + pad * 2) + '" height="' + (h + pad * 2) + '" rx="18" fill="rgba(242,193,78,.22)" opacity="' + opacity + '"/>';
}

function pflFlag(x, y, value, op = 1, dashed = false) {
  if (op <= 0.001) return '';
  const w = Array.from(value).length * 30 + 30;
  const top = y - 120;
  const dash = dashed ? ' stroke-dasharray="13 9"' : '';
  const fill = dashed ? 'rgba(239,233,216,.012)' : 'rgba(242,193,78,.14)';
  return '<g opacity="' + pflO(op) + '">' +
    '<line x1="' + x + '" y1="' + y + '" x2="' + x + '" y2="' + top + '" stroke="' + C.chalk + '" stroke-width="5" stroke-linecap="round"' + (dashed ? ' stroke-dasharray="13 9"' : '') + '/>' +
    '<rect x="' + (x + 8) + '" y="' + top + '" width="' + w + '" height="56" rx="7" fill="' + fill + '" stroke="' + C.yellow + '" stroke-width="4"' + dash + '/>' +
    pflLabel(x + 8 + w / 2, top + 38, value, 30, C.yellow, 1) + '</g>';
}

function pflTrain(x, y, w, h, labels, phrases, lit, op = 1, dashed = false, gap = 40, engine = true, reveal = [1, 1, 1]) {
  let g = '';
  const step = w + gap;
  for (let i = 0; i < 2; i++) {
    const r = Math.max(0, Math.min(1, reveal[i + 1] ?? 1));
    g += pflLine(x + i * step + w, y + h / 2, x + (i + 1) * step, y + h / 2, C.chalk, 5, op * r);
  }
  if (engine) {
    const ey = y + h * 0.68;
    g += '<g opacity="' + pflO(op) + '" fill="none" stroke="' + C.chalk + '" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">' +
      '<path d="M' + (x - 30) + ' ' + ey + ' V' + (ey - 25) + ' H' + (x - 15) + ' L' + (x - 5) + ' ' + (ey - 12) + ' H' + x + ' V' + ey + ' Z"/>' +
      '<path d="M' + (x - 22) + ' ' + (ey - 29) + ' V' + (ey - 38) + ' H' + (x - 16) + ' V' + (ey - 29) + '"/>' +
      '<circle cx="' + (x - 22) + '" cy="' + (ey + 3) + '" r="8" fill="' + C.deep + '"/><circle cx="' + (x - 5) + '" cy="' + (ey + 3) + '" r="8" fill="' + C.deep + '"/></g>';
  }
  for (let i = 0; i < 3; i++) {
    const xx = x + i * step;
    const r = Math.max(0, Math.min(1, reveal[i] ?? 1));
    const light = Math.max(0, Math.min(1, lit[i] ?? 0));
    const strokeOp = dashed ? op * r : op * r * (0.22 + 0.78 * light);
    const phraseOp = op * r;
    const stroke = dashed ? PFL_BLUE : C.chalk;
    const dash = dashed ? ' stroke-dasharray="13 9"' : '';
    const fill = dashed ? 'rgba(239,233,216,.012)' : 'rgba(26,43,35,.74)';
    g += '<g opacity="' + pflO(strokeOp) + '"><rect x="' + xx + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="18" fill="' + fill + '" stroke="' + stroke + '" stroke-width="4"' + dash + '/></g>';
    if (!dashed && labels && labels[i]) g += pflLabel(xx + w / 2, y + Math.min(40, h * 0.38), labels[i], 30, PFL_BLUE, phraseOp);
    if (phrases && phrases[i]) g += pflLabel(xx + w / 2, y + (labels && labels[i] ? h - 28 : h * 0.62), phrases[i], 30, C.yellow, phraseOp);
    if (h >= 70) {
      const wy = y + h + 8;
      g += '<g opacity="' + pflO(strokeOp) + '">' +
        pflCircle(xx + w * 0.32, wy, 12, dashed ? PFL_BLUE : C.chalk, 3, dashed ? 'none' : C.deep, 1, dashed ? '7 6' : '') +
        pflCircle(xx + w * 0.68, wy, 12, dashed ? PFL_BLUE : C.chalk, 3, dashed ? 'none' : C.deep, 1, dashed ? '7 6' : '') + '</g>';
    }
  }
  return g;
}

function pflMiniCar(x, y, op = 1) {
  return '<g opacity="' + pflO(op) + '"><rect x="' + x + '" y="' + y + '" width="50" height="30" rx="5" fill="rgba(26,43,35,.75)" stroke="' + PFL_BLUE + '" stroke-width="3"/>' +
    '<circle cx="' + (x + 12) + '" cy="' + (y + 31) + '" r="4" fill="' + C.deep + '" stroke="' + C.chalk + '" stroke-width="2"/>' +
    '<circle cx="' + (x + 38) + '" cy="' + (y + 31) + '" r="4" fill="' + C.deep + '" stroke="' + C.chalk + '" stroke-width="2"/></g>';
}

function pflBubble(x, y, w, h, tailX, tailY, value, op = 1, dashed = false, size = 36) {
  if (op <= 0.001) return '';
  const dash = dashed ? ' stroke-dasharray="13 9"' : '';
  const fill = dashed ? 'rgba(239,233,216,.012)' : C.deep;
  const mid = x + w * 0.62;
  const tail = '<path d="M' + (mid - 16) + ' ' + (y + h - 2) + ' L' + tailX + ' ' + tailY + ' L' + (mid + 16) + ' ' + (y + h - 2) +
    ' Z" fill="' + fill + '" stroke="' + C.chalk + '" stroke-width="4"' + dash + '/>';
  const body = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="18" fill="' + fill + '" stroke="' + C.chalk + '" stroke-width="4"' + dash + '/>';
  return '<g opacity="' + pflO(op) + '">' + tail + body +
    pflLabel(x + w / 2, y + h / 2 + size * 0.35, value, size, dashed ? C.dim : C.chalk, 1) + '</g>';
}

function pflFlash(u, start) {
  const inK = pflK(u, start, start + 0.1);
  const outK = 1 - pflK(u, start + 0.4, start + 0.5);
  return Math.max(0, Math.min(inK, outK));
}

function pflPaint(svg) {
  return svg.replace(/font-size="24"/g, 'font-size="26"')
    .replace(/<text ([^>]*?)fill="([^"]+)"/g, '<text $1style="fill:$2" fill="$2"');
}

function pflHeadRole(x, width, y, text, op, size = 34, color = C.chalk) {
  const left = x - width / 2;
  return pflCardFrame(left, y, width, 60, op) + pflLabel(x, y + 40, text, size, color, op);
}

function pflArrowTo(x1, y1, x2, y2, op = 1, color = C.yellow, k = 1) {
  return arrow(x1, y1, x2, y2, color, op, false, k);
}

function pflShortArrow(x1, x2, y, op = 1) {
  if (op <= 0.001) return '';
  const mid = x2 - 6;
  return pflLine(x1, y, mid, y, C.yellow, 3, op) +
    '<path d="M' + (x2 - 10) + ' ' + (y - 6) + ' L' + x2 + ' ' + y + ' L' + (x2 - 10) + ' ' + (y + 6) +
    '" fill="none" stroke="' + C.yellow + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="' + pflO(op) + '"/>';
}

function s1(u) {
  let g = head(u, '開場', '從骨架長出來') + pflTag(u);
  const glow = pflK(u, 6.0, 7.0);
  g += pflBlockGlow(365, 260, 430, 190, glow);
  const roles = ['她是誰', '為何說她勇敢', '為何說她勇敢', '感想'];
  for (let i = 0; i < 4; i++) {
    const start = 0.2 + i * 0.34;
    const k = pflK(u, start, start + 0.78);
    const y = lerp(-145, 260, k);
    g += pflBlock(PFL_X[i], y, PFL_W[i], 190, PFL_COLORS[i], k);
    const roleK = pflK(u, 1.5, 2.5);
    g += pflLabel(PFL_X[i] + PFL_W[i] / 2, 310, roles[i], 36, C.chalk, roleK);
  }
  const iconK = pflK(u, 2.0, 3.5);
  g += pflPonytail(247, 390, 0.62, iconK) + pflStormWindow(580, 390, 0.72, iconK) +
    pflClimb(1020, 390, 0.76, iconK) + pflHeart(1352, 390, 0.48, iconK);
  const phraseK = pflK(u, 3.5, 5.0);
  g += pflLabel(247, 500, '讀六年級', 30, C.yellow, phraseK);
  g += pflLabel(247, 542, '綁著馬尾', 30, C.yellow, phraseK);
  g += pflLabel(580, 500, '颱風夜關窗', 30, C.yellow, phraseK);
  g += pflLabel(1020, 500, '怕高仍爬到頂', 30, C.yellow, phraseK);
  g += pflLabel(1352, 500, '我要學她', 30, C.yellow, phraseK);
  g += pflArrowTo(580, 518, 580, 600, pflK(u, 7.0, 8.0), C.yellow, pflK(u, 7.0, 8.0));
  g += pflLabel(580, 650, '長肉', 36, C.yellow, pflK(u, 7.0, 8.0));
  return pflPaint(g);
}

function s2(u) {
  let g = head(u, '段內三層', '中間段分三層') + pflTag(u);
  const titleK = pflK(u, 0.2, 0.8);
  g += pflBlock(565, 205, 430, 80, PFL_BLUE, titleK);
  g += pflLabel(780, 255, '為何說她勇敢', 34, C.chalk, titleK);
  g += pflThread(320, 1280, 560, pflK(u, 0.6, 1.2));
  const cards = [
    { x: 480, text: '主題句：她怎樣', start: 1.0, end: 1.8 },
    { x: 800, text: '舉例：一件事', start: 3.0, end: 3.8 },
    { x: 1120, text: '感覺', start: 5.0, end: 5.8 },
  ];
  const beads = [
    { x: 480, kind: 'a', start: 1.0, end: 1.8 },
    { x: 800, kind: 'a', start: 3.0, end: 3.8 },
    { x: 1120, kind: 'b', start: 5.0, end: 5.8 },
  ];
  for (let i = 0; i < 3; i++) {
    const c = cards[i], b = beads[i], k = pflK(u, b.start, b.end);
    g += pflCardFrame(c.x - 150, 400, 300, 64, k);
    g += pflLabel(c.x, 442, c.text, 34, C.chalk, k);
    g += pflLine(c.x, 464, c.x, 516, C.chalk, 4, k);
    if (b.kind === 'a') g += pflBead(b.x, 560, 44, k);
    else g += pflBow(b.x, 560, 1.4, k);
  }
  const letterStarts = [7.0, 7.7, 8.2];
  for (let i = 0; i < 3; i++) {
    const b = beads[i];
    g += pflLabel(b.x, 650, b.kind, 36, b.kind === 'a' ? PFL_BLUE : PFL_ORANGE, pflK(u, letterStarts[i], letterStarts[i] + 0.3));
  }
  return pflPaint(g);
}

function s3(u) {
  let g = head(u, '段內三層', '先說她怎樣') + pflTag(u);
  const beadK = pflK(u, 0.3, 1.0);
  g += pflBead(420, 600, 70, beadK);
  g += pflFlag(420, 530, '膽子很大', pflK(u, 1.5, 3.0));
  const roleK = pflK(u, 3.0, 3.6);
  g += pflCardFrame(320, 700, 200, 60, roleK) + pflLabel(420, 739, '主題句', 34, C.chalk, roleK);
  const cardK = 0.75 * pflK(u, 5.0, 5.6);
  g += pflCardFrame(860, 400, 600, 160, cardK);
  const xs = [890, 1070, 1250], texts = ['個性', '舉例', '感覺'];
  for (let i = 0; i < 3; i++) {
    const k = pflK(u, 5.6 + i * 0.65, 6.2 + i * 0.65);
    g += pflCardFrame(xs[i], 440, 160, 80, k, false, i === 2 ? PFL_ORANGE : PFL_BLUE);
    g += pflLabel(xs[i] + 80, 489, texts[i], 34, i === 2 ? PFL_ORANGE : PFL_BLUE, k);
  }
  g += pflShortArrow(1053, 1067, 480, pflK(u, 6.2, 6.8));
  g += pflShortArrow(1233, 1247, 480, pflK(u, 6.85, 7.45));
  return pflPaint(g);
}

function s4(u) {
  let g = head(u, '段內三層', '舉一件事') + pflTag(u);
  g += pflThread(140, 400, 600, pflK(u, 0.2, 1.2));
  g += pflBead(220, 600, 30, pflK(u, 0.2, 0.8));
  g += pflFlag(220, 570, '膽子很大', pflK(u, 0.2, 0.8));
  g += pflBead(370, 600, 30, pflK(u, 0.5, 1.0));
  const trainK = pflK(u, 2.0, 3.5);
  g += pflLabel(860, 470, '記得有一次', 34, C.yellow, pflK(u, 2.5, 3.2));
  g += pflTrain(430, 520, 260, 120, ['開始', '接著', '後來'], ['颱風夜停電', '窗戶砰砰響', '她去關好窗'],
    [pflK(u, 4.0, 4.6), pflK(u, 6.0, 6.6), pflK(u, 8.0, 8.6)], trainK, false, 40, true);
  return pflPaint(g);
}

function s5(u) {
  let g = head(u, '段內三層', '讓她開口說話') + pflTag(u);
  g += pflThread(140, 400, 600, 1);
  g += pflBead(220, 600, 30, 1) + pflFlag(220, 570, '膽子很大', 1);
  g += pflBead(370, 600, 30, 1);
  g += pflTrain(430, 520, 260, 120, ['開始', '接著', '後來'], ['颱風夜停電', '窗戶砰砰響', '她去關好窗'], [1, 1, 1], 1, false, 40, true);
  g += pflBubble(1080, 330, 220, 100, 1160, 520, '不怕！', pflK(u, 0.5, 1.5), false, 36);
  const sentence = '姊姊說：「不怕！」';
  const chars = Array.from(sentence);
  const shown = Math.min(chars.length, Math.floor(pflK(u, 3.0, 5.5) * chars.length) + 1);
  g += pflProgressText(sentence, 800, 730, 36, C.yellow, pflK(u, 2.9, 3.1), shown);
  const cardXs = [400, 680, 960], centers = [520, 800, 1080];
  const labels = ['人稱在前', '說的話在前', '說的話在兩頭'];
  const highlight = pflK(u, 7.5, 8.5);
  for (let i = 0; i < 3; i++) {
    const stroke = i === 0 && highlight > 0.001 ? C.yellow : C.chalk;
    const cardK = pflK(u, 6.0 + i * 0.3, 6.5 + i * 0.3);
    g += pflCardFrame(cardXs[i], 776, 240, 56, cardK, false, stroke);
    g += pflLabel(centers[i], 812, labels[i], 34, C.chalk, cardK);
  }
  g += underline(600, 784, 748, pflK(u, 7.5, 8.5), C.yellow);
  g += pflArrowTo(540, 774, 600, 748, pflK(u, 7.5, 8.5), C.yellow, pflK(u, 7.5, 8.5));
  return pflPaint(g);
}

function s6(u) {
  let g = head(u, '段內三層', '最後寫感覺') + pflTag(u);
  g += pflThread(200, 1380, 560, pflK(u, 0.2, 1.0));
  g += pflBead(300, 560, 30, pflK(u, 0.2, 0.8));
  g += pflFlag(300, 530, '膽子很大', pflK(u, 0.2, 0.8));
  g += pflBead(520, 560, 30, pflK(u, 0.5, 1.0));
  const miniK = pflK(u, 0.5, 1.0);
  for (const x of [465, 520, 575]) g += pflMiniCar(x, 480, miniK);
  const bowK = pflK(u, 1.0, 2.5);
  g += pflBow(900, 560, 1.6, bowK);
  const phrase = '好勇敢', phraseCount = Math.floor(pflK(u, 1.0, 2.5) * Array.from(phrase).length) + 1;
  g += pflProgressText(phrase, 900, 660, 30, C.yellow, pflK(u, 1.0, 1.2), Math.min(3, phraseCount));
  const lensK = pflK(u, 3.0, 4.5);
  const moveOut = pflK(u, 7.5, 8.5);
  const lensX = lerp(lerp(1300, 930, lensK), 1280, moveOut);
  const lensY = lerp(lerp(300, 650, lensK), 760, moveOut);
  g += pflLens(lensX, lensY, 46, pflK(u, 3.0, 3.3), false, false);
  const underlineK = pflK(u, 4.5, 5.0);
  g += underline(870, 930, 670, underlineK, C.yellow);
  g += pflStar(900, 455, 26, pflK(u, 4.5, 5.0));
  const focusK = pflK(u, 6.0, 7.0);
  g += pflLabel(1180, 440, '主旨藏在 b', 34, PFL_ORANGE, focusK);
  g += pflArrowTo(1170, 485, 1000, 535, focusK, PFL_ORANGE, focusK);
  return pflPaint(g);
}

function s7(u) {
  let g = head(u, '長肉', '第三段也這樣長') + pflTag(u);
  const panelXs = [100, 820];
  for (const x of panelXs) {
    const frameK = pflK(u, 0.1, 1.0);
    g += pflCardFrame(x, 220, 680, 580, frameK);
    g += pflHeadRole(x + 340, 280, 240, '為何說她勇敢', frameK, 34);
  }
  for (const x of panelXs) g += pflLine(x + 70, 430, x + 70, 700, C.chalk, 4, pflK(u, 0.3, 1.0));
  const leftX = 100, rightX = 820;
  const leftTop = pflK(u, 0.3, 1.0), leftTrain = pflK(u, 0.8, 1.6);
  g += pflBead(leftX + 70, 430, 26, leftTop) + pflFlag(leftX + 70, 430, '膽子很大', leftTop);
  g += pflBead(leftX + 70, 545, 26, leftTrain);
  g += pflLine(leftX + 96, 545, leftX + 115, 545, C.chalk, 4, leftTrain);
  g += pflTrain(leftX + 115, 500, 175, 90, ['', '', ''], ['颱風夜停電', '窗戶砰砰響', '她去關好窗'], [1, 1, 1], leftTrain, false, 10, false);
  g += pflBubble(leftX + 500, 430, 110, 50, leftX + 560, 500, '不怕！', pflK(u, 1.6, 2.3), false, 30);
  const leftBow = pflK(u, 2.0, 3.0);
  g += pflBow(leftX + 70, 700, 0.9, leftBow);
  g += pflLabel(leftX + 210, 711, '好勇敢', 30, PFL_ORANGE, leftBow);

  const rightTop = pflK(u, 4.0, 5.5);
  g += pflBead(rightX + 70, 430, 26, rightTop) + pflFlag(rightX + 70, 430, '怕高不放棄', rightTop);
  g += pflBead(rightX + 70, 545, 26, pflK(u, 6.5, 7.2));
  const rightReveal = [pflK(u, 6.5, 7.2), pflK(u, 8.0, 8.7), pflK(u, 9.5, 10.2)];
  g += pflLine(rightX + 96, 545, rightX + 115, 545, C.chalk, 4, rightReveal[0]);
  g += pflTrain(rightX + 115, 500, 175, 90, ['', '', ''], ['手一直發抖', '一步一步爬', '爬到最高點'], rightReveal, 1, false, 10, false, rightReveal);
  const rightBow = pflK(u, 11.0, 12.0);
  g += pflBow(rightX + 70, 700, 0.9, rightBow);
  g += pflLabel(rightX + 210, 711, '好佩服她', 30, PFL_ORANGE, rightBow);
  return pflPaint(g);
}

function s8(u) {
  let g = head(u, '檢查', '數一數 a 和 b') + pflTag(u);
  const phrases = ['（膽子很大）', '（颱風夜停電）', '（說不怕去關窗）', '（覺得她好勇敢）'];
  const centers = [395, 630, 895, 1175];
  const starts = [0.5, 1.8, 3.1, 4.4];
  for (let i = 0; i < phrases.length; i++) {
    const k = pflK(u, starts[i], starts[i] + 0.7);
    g += pflLabel(centers[i], 420, phrases[i], 30, C.chalk, k);
  }
  const letterK = pflK(u, 6.0, 7.5);
  for (let i = 0; i < 4; i++) {
    const color = i === 3 ? PFL_ORANGE : PFL_BLUE;
    const letter = i === 3 ? 'b' : 'a';
    const k = pflK(u, 6.0 + i * 0.25, 6.6 + i * 0.25);
    g += pflLabel(centers[i], 500, letter, 40, color, k);
  }
  g += underline(centers[3] - 120, centers[3] + 120, 438, letterK, PFL_ORANGE);
  g += pflLabel(800, 620, '先寫 aaa 再寫 b', 34, C.yellow, pflK(u, 8.5, 9.5));
  const compareK = pflK(u, 10.5, 11.5);
  g += pflBlock(1150, 700, 120, 70, PFL_ORANGE, compareK);
  g += pflLabel(1360, 745, 'aa＋bbb', 30, C.chalk, compareK);
  return pflPaint(g);
}

function s9(u) {
  let g = head(u, '練習', '換你長肉') + pflTag(u);
  const titleK = pflK(u, 0.2, 0.8);
  g += pflCardFrame(560, 200, 480, 72, titleK);
  g += pflLabel(800, 249, '〈最感謝的人〉', 40, C.yellow, titleK);
  for (let i = 0; i < 4; i++) {
    const k = pflK(u, 0.6 + i * 0.16, 1.3 + i * 0.16);
    g += pflBlock(PFL_X[i], 300, PFL_W[i], 110, PFL_COLORS[i], k, true);
    g += pflLabel(PFL_X[i] + PFL_W[i] / 2, 365, ['他是誰', '為何最感謝 ①', '為何最感謝 ②', '感想'][i], 34, C.chalk, k);
  }
  const arrowK = pflK(u, 2.5, 3.0);
  g += pflLine(580, 410, 580, 470, C.dim, 4, arrowK, '13 9');
  const flagK = pflK(u, 3.0, 4.1);
  g += pflFlag(300, 640, '    ', flagK, true);
  g += pflLabel(300, 700, '主題句', 30, C.dim, pflK(u, 3.6, 4.3));
  const trainK = pflK(u, 4.4, 5.5);
  g += pflTrain(480, 560, 100, 70, ['', '', ''], ['', '', ''], [0, 0, 0], trainK, true, 20, false);
  g += pflLabel(650, 700, '記得有一次', 30, C.dim, pflK(u, 5.1, 5.8));
  const bubbleK = pflK(u, 5.8, 6.8);
  g += pflBubble(860, 480, 130, 70, 925, 560, '', bubbleK, true, 30);
  g += pflLabel(925, 700, '說的話', 30, C.dim, pflK(u, 6.5, 7.2));
  const bowK = pflK(u, 7.1, 8.1);
  g += pflBow(1120, 600, 1.2, bowK, true);
  g += pflLabel(1120, 700, '感覺', 30, C.dim, pflK(u, 7.8, 8.5));
  const flashes = [10.0, 11.0, 12.0, 13.0].map((start) => pflFlash(u, start));
  const flagFlash = flashes[0], trainFlash = flashes[1], bubbleFlash = flashes[2], bowFlash = flashes[3];
  g += '<rect x="312" y="524" width="142" height="48" rx="7" fill="rgba(242,193,78,' + (0.32 * flagFlash) + ')"/>';
  g += '<g opacity="' + pflO(trainFlash) + '"><rect x="484" y="564" width="92" height="62" rx="14" fill="rgba(242,193,78,.32)"/>' +
    '<rect x="604" y="564" width="92" height="62" rx="14" fill="rgba(242,193,78,.32)"/><rect x="724" y="564" width="92" height="62" rx="14" fill="rgba(242,193,78,.32)"/></g>';
  g += '<rect x="864" y="484" width="122" height="62" rx="14" fill="rgba(242,193,78,' + (0.32 * bubbleFlash) + ')"/>';
  g += '<g opacity="' + pflO(bowFlash) + '"><ellipse cx="1120" cy="600" rx="70" ry="45" fill="rgba(242,193,78,.32)"/></g>';
  return pflPaint(g);
}

