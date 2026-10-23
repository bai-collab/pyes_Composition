const META = {
  title: '一份讀書報告有三個部分',
  subtitle: '10 段・約 2 分鐘・四年級應用文（讀書報告）第一集',
  ariaLabel: '介紹讀書報告的三個部分、內容摘要的寫法、讀後感想與練習骨架。',
  note: '出處：楊裕貿研習講義、國語五上備課指引〈讀書報告〉、如何寫讀書心得報告。人偶、報告紙槽位、身分證、紙捲、漏斗、珠子、放大鏡、愛心是視覺比喻或示意；書、作者、出版社與人名都是虛構；示範短語與句子自編；開始、經過、結尾是依使用者指示、借自寫事件的方法。鍵盤操作：空白鍵播放／暫停，左右方向鍵切換段落，F 鍵全螢幕。畫面只由時間決定。',
  works: [],
};

const BKR_WOOD = '#a9784f';
const BKR_RED = '#d9605a';
const BKR_GREEN = '#8fd18a';
const BKR_BLUE = '#7fb6d9';
const BKR_ORANGE = '#e8875b';
const BKR_YELLOW = '#f2c14e';
const BKR_CREAM = '#efe9d8';
const BKR_INK = '#1a2b23';
const BKR_BEAD_RADIUS = 34;
const BKR_BEAD_COLOR = BKR_BLUE;
const bkrK = (u, a, b) => ease(P(u, a, b));
const bkrO = (value) => Math.max(0, Math.min(1, Number(value) || 0)).toFixed(3);
const bkrN = (value) => Number(value).toFixed(1);

function bkrTag(op = 1) {
  return '<g opacity="' + bkrO(op) + '">' + box(1375, 56, 165, 60, C.orange, 1, C.deep) +
    txt(1457, 98, '比喻', { a: 'middle', s: 30, w: 1, f: C.orange }) + '</g>';
}

function bkrLabel(cx, y, value, size = 30, color = C.chalk, op = 1) {
  if (op <= 0.001) return '';
  return txt(cx, y, value, { a: 'middle', s: size, w: 1, f: color, o: op });
}

function bkrTextByChar(value, cx, y, size, color, op = 1) {
  if (op <= 0.001) return '';
  const chars = Array.from(value);
  return chars.map((ch, i) => txt(cx + (i - (chars.length - 1) / 2) * size, y, ch, {
    a: 'middle', s: size, w: 1, f: color, o: op,
  })).join('');
}

function bkrType(value, u, cx, y, size, color, start, end, op = 1) {
  if (u <= start || op <= 0.001) return '';
  const chars = Array.from(value);
  const count = Math.min(chars.length, Math.ceil(bkrK(u, start, end) * chars.length));
  return chars.slice(0, count).map((ch, i) => txt(cx + (i - (chars.length - 1) / 2) * size, y, ch, {
    a: 'middle', s: size, w: 1, f: color, o: op,
  })).join('');
}

function bkrTypeLeft(value, u, x, y, size, color, start, end, op = 1) {
  if (u <= start || op <= 0.001) return '';
  const chars = Array.from(value);
  const count = Math.min(chars.length, Math.ceil(bkrK(u, start, end) * chars.length));
  return chars.slice(0, count).map((ch, i) => txt(x + i * size, y, ch, {
    a: 'start', s: size, w: 1, f: color, o: op,
  })).join('');
}

function bkrLine(x1, y1, x2, y2, color = C.chalk, width = 5, op = 1, dash = '') {
  if (op <= 0.001) return '';
  return '<path d="M' + bkrN(x1) + ' ' + bkrN(y1) + ' L' + bkrN(x2) + ' ' + bkrN(y2) +
    '" fill="none" stroke="' + color + '" stroke-width="' + width + '" stroke-linecap="round" stroke-linejoin="round" opacity="' +
    bkrO(op) + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
}

function bkrPath(d, color = C.chalk, width = 5, op = 1, fill = 'none', dash = '') {
  if (op <= 0.001) return '';
  return '<path d="' + d + '" fill="' + fill + '" stroke="' + color + '" stroke-width="' + width +
    '" stroke-linecap="round" stroke-linejoin="round" opacity="' + bkrO(op) + '"' +
    (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
}

function bkrCircle(cx, cy, r, stroke = C.chalk, width = 5, fill = 'none', op = 1, dash = '') {
  if (op <= 0.001 || r <= 0) return '';
  return '<circle cx="' + bkrN(cx) + '" cy="' + bkrN(cy) + '" r="' + bkrN(r) + '" fill="' + fill +
    '" stroke="' + stroke + '" stroke-width="' + width + '" opacity="' + bkrO(op) + '"' +
    (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
}

function bkrCardFrame(x, y, w, h, op = 1, dashed = false, stroke = C.chalk) {
  if (op <= 0.001) return '';
  if (dashed) return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h +
    '" rx="18" fill="rgba(239,233,216,.012)" stroke="' + stroke +
    '" stroke-width="4" stroke-dasharray="13 9" opacity="' + bkrO(op) + '"/>';
  return '<g opacity="' + bkrO(op) + '">' + box(x, y, w, h, stroke, 1, 'rgba(239,233,216,.015)') + '</g>';
}

function bkrStar(cx, cy, r, op = 1) {
  if (op <= 0.01 || r <= 1) return '';
  const points = [];
  for (let i = 0; i < 10; i++) {
    const angle = -Math.PI / 2 + i * Math.PI / 5;
    const radius = i % 2 ? r * 0.46 : r;
    points.push(bkrN(cx + Math.cos(angle) * radius) + ',' + bkrN(cy + Math.sin(angle) * radius));
  }
  return '<polygon points="' + points.join(' ') +
    '" fill="rgba(242,193,78,.3)" stroke="' + C.yellow + '" stroke-width="5" stroke-linejoin="round" opacity="' + bkrO(op) + '"/>';
}

function bkrCheck(cx, cy, scale = 1, op = 1) {
  if (op <= 0.01) return '';
  return '<path d="M' + bkrN(cx - 30 * scale) + ' ' + bkrN(cy) + ' L' + bkrN(cx - 8 * scale) + ' ' +
    bkrN(cy + 23 * scale) + ' L' + bkrN(cx + 37 * scale) + ' ' + bkrN(cy - 30 * scale) +
    '" fill="none" stroke="' + BKR_GREEN + '" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" opacity="' + bkrO(op) + '"/>';
}

function bkrCross(cx, cy, size = 24, op = 1) {
  if (op <= 0.01) return '';
  return '<g opacity="' + bkrO(op) + '" stroke="' + BKR_RED + '" stroke-width="10" stroke-linecap="round"><line x1="' +
    (cx - size) + '" y1="' + (cy - size) + '" x2="' + (cx + size) + '" y2="' + (cy + size) +
    '"/><line x1="' + (cx + size) + '" y1="' + (cy - size) + '" x2="' + (cx - size) + '" y2="' + (cy + size) + '"/></g>';
}

function bkrLens(cx, cy, r = 55, op = 1, dashed = false, handleUp = false) {
  if (op <= 0.01 || r <= 1) return '';
  const dash = dashed ? '11 9' : '';
  const sy = handleUp ? -1 : 1;
  return '<g opacity="' + bkrO(op) + '"><circle cx="' + bkrN(cx) + '" cy="' + bkrN(cy) + '" r="' + bkrN(r) +
    '" fill="rgba(242,193,78,.045)" stroke="' + C.yellow + '" stroke-width="8"' +
    (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/><path d="M' + bkrN(cx + r * 0.68) + ' ' +
    bkrN(cy + sy * r * 0.68) + ' L' + bkrN(cx + r * 1.28) + ' ' + bkrN(cy + sy * r * 1.28) +
    '" stroke="' + C.yellow + '" stroke-width="17" stroke-linecap="round"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') +
    '/><path d="M' + bkrN(cx + r * 0.8) + ' ' + bkrN(cy + sy * r * 0.8) + ' L' +
    bkrN(cx + r * 1.26) + ' ' + bkrN(cy + sy * r * 1.26) + '" stroke="' + C.chalk +
    '" stroke-width="4" stroke-linecap="round"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/></g>';
}

function bkrFlash(u, start) {
  const fadeIn = bkrK(u, start, start + 0.08);
  const fadeOut = 1 - bkrK(u, start + 0.42, start + 0.5);
  return Math.max(0, Math.min(fadeIn, fadeOut));
}

function bkrLongGlow(u, start) {
  const fadeIn = bkrK(u, start, start + 0.12);
  const fadeOut = 1 - bkrK(u, start + 0.92, start + 1.04);
  return Math.max(0, Math.min(fadeIn, fadeOut));
}

function bkrPaint(svg) {
  return svg.replace(/font-size="24"/g, 'font-size="26"')
    .replace(/<text ([^>]*?)fill="([^"]+)"/g, '<text $1style="fill:$2" fill="$2"');
}

function bkrPhrase(x, y, value, size = 30, color = C.chalk, op = 1, anchor = 'start') {
  if (op <= 0.001) return '';
  return txt(x, y, value, { a: anchor, s: size, w: 1, f: color, o: op });
}

function bkrDoll(cx, cy, scale = 1, op = 1) {
  return '<g transform="translate(' + bkrN(cx) + ' ' + bkrN(cy) + ') scale(' + bkrN(scale) +
    ')" opacity="' + bkrO(op) + '" stroke-linecap="round" stroke-linejoin="round">' +
    '<circle cx="0" cy="-72" r="31" fill="rgba(240,217,189,.55)" stroke="' + C.chalk + '" stroke-width="5"/>' +
    '<path d="M-28 -77 Q-21 -112 4 -105 Q27 -99 29 -75 Q9 -90 -4 -87 Q-18 -83 -28 -77Z" fill="' + BKR_WOOD + '" stroke="' + C.chalk + '" stroke-width="3"/>' +
    '<path d="M-43 43 Q-40 -28 0 -28 Q40 -28 43 43Z" fill="rgba(127,182,217,.28)" stroke="' + C.chalk + '" stroke-width="5"/>' +
    '<path d="M-37 -5 L-70 26 M37 -5 L70 26 M-19 43 L-30 91 M19 43 L30 91" fill="none" stroke="' + C.chalk + '" stroke-width="9"/>' +
    '<circle cx="-10" cy="-67" r="3" fill="' + BKR_WOOD + '"/><circle cx="10" cy="-67" r="3" fill="' + BKR_WOOD + '"/></g>';
}

function bkrBook(cx, cy, scale = 1, op = 1) {
  return '<g transform="translate(' + bkrN(cx) + ' ' + bkrN(cy) + ') scale(' + bkrN(scale) +
    ')" opacity="' + bkrO(op) + '" stroke-linejoin="round"><rect x="-35" y="-45" width="70" height="90" rx="4" fill="rgba(127,182,217,.18)" stroke="' +
    BKR_BLUE + '" stroke-width="5"/><path d="M-22 -44 L-22 44" fill="none" stroke="' + C.chalk + '" stroke-width="4"/></g>';
}

function bkrOpenBook(x, y, w, h, op = 1, highlight = 0) {
  if (op <= 0.001) return '';
  const half = w / 2;
  let g = '<g opacity="' + bkrO(op) + '"><path d="M' + x + ' ' + (y + 22) + ' Q' + (x + half - 14) + ' ' + (y + 2) +
    ' ' + (x + half) + ' ' + (y + 28) + ' L' + (x + half) + ' ' + (y + h - 8) + ' Q' + (x + half - 18) + ' ' +
    (y + h - 32) + ' ' + x + ' ' + (y + h - 12) + ' Z" fill="rgba(239,233,216,.035)" stroke="' + C.chalk + '" stroke-width="5"/>' +
    '<path d="M' + (x + half) + ' ' + (y + 28) + ' Q' + (x + half + 14) + ' ' + (y + 2) + ' ' + (x + w) + ' ' +
    (y + 22) + ' L' + (x + w) + ' ' + (y + h - 12) + ' Q' + (x + half + 18) + ' ' + (y + h - 32) + ' ' +
    (x + half) + ' ' + (y + h - 8) + ' Z" fill="rgba(239,233,216,.035)" stroke="' + C.chalk + '" stroke-width="5"/>' +
    '<path d="M' + (x + half) + ' ' + (y + 28) + ' L' + (x + half) + ' ' + (y + h - 8) + '" fill="none" stroke="' + C.chalk + '" stroke-width="4"/>';
  for (let i = 0; i < 6; i++) {
    const yy = y + 82 + i * 45;
    const color = i === 2 && highlight > 0.01 ? C.yellow : C.chalk;
    const width = i === 2 && highlight > 0.01 ? 6 : 3;
    g += '<path d="M' + (x + 54) + ' ' + yy + ' Q' + (x + half - 20) + ' ' + (yy - 8) + ' ' + (x + half - 32) +
      ' ' + (yy + 1) + ' M' + (x + half + 32) + ' ' + (yy + 1) + ' Q' + (x + half + 20) + ' ' + (yy - 8) +
      ' ' + (x + w - 54) + ' ' + yy + '" fill="none" stroke="' + color + '" stroke-width="' + width + '" stroke-linecap="round"/>';
  }
  return g + '</g>';
}

function bkrScroll(x, y, w, h, op = 1) {
  if (op <= 0.001) return '';
  let g = '<g opacity="' + bkrO(op) + '"><rect x="' + bkrN(x) + '" y="' + bkrN(y) + '" width="' + bkrN(w) +
    '" height="' + bkrN(h) + '" rx="12" fill="rgba(239,233,216,.035)" stroke="' + C.chalk + '" stroke-width="4"/>';
  for (let i = 0; i < 14; i++) {
    const yy = y + 24 + i * ((h - 48) / 13);
    g += '<path d="M' + bkrN(x + 18) + ' ' + bkrN(yy) + ' L' + bkrN(x + w - 18) + ' ' + bkrN(yy) +
      '" fill="none" stroke="' + C.chalk + '" stroke-width="3" opacity=".7"/>';
  }
  return g + '</g>';
}

function bkrFunnel(cx, topY, topW, bottomY, op = 1) {
  const left = cx - topW / 2;
  const right = cx + topW / 2;
  const neck = 38;
  const neckTop = bottomY;
  const neckBottom = bottomY + 42;
  return '<g opacity="' + bkrO(op) + '"><path d="M' + left + ' ' + topY + ' L' + right + ' ' + topY +
    ' L' + (cx + neck) + ' ' + bottomY + ' L' + (cx - neck) + ' ' + bottomY + ' Z" fill="rgba(239,233,216,.025)" stroke="' +
    C.chalk + '" stroke-width="5"/><path d="M' + (cx - neck) + ' ' + neckTop + ' L' + (cx - neck) + ' ' + neckBottom +
    ' L' + (cx + neck) + ' ' + neckBottom + ' L' + (cx + neck) + ' ' + neckTop + '" fill="none" stroke="' + C.chalk + '" stroke-width="5"/></g>';
}

function bkrRoleTag(x, y, label, op = 1, dashed = false) {
  if (op <= 0.001) return '';
  const dash = dashed ? ' stroke-dasharray="11 8"' : '';
  return '<g opacity="' + bkrO(op) + '"><rect x="' + x + '" y="' + y + '" width="90" height="44" rx="11" fill="rgba(242,193,78,.025)" stroke="' +
    C.yellow + '" stroke-width="4"' + dash + '/>' + txt(x + 45, y + 32, label, { a: 'middle', s: 30, w: 1, f: C.yellow }) + '</g>';
}

function bkrHeart(cx, cy, scale = 1, op = 1, dashed = false, glow = 0) {
  if (op <= 0.001) return '';
  const d = 'M0 26 C-37 4 -42 -24 -20 -29 C-7 -32 0 -22 0 -13 C4 -24 13 -31 26 -27 C47 -20 39 8 0 26 Z';
  const fill = dashed ? (glow > 0.01 ? 'rgba(242,193,78,.2)' : 'none') : 'rgba(232,135,91,.72)';
  const stroke = dashed ? C.orange : BKR_RED;
  return '<path d="' + d + '" transform="translate(' + bkrN(cx) + ' ' + bkrN(cy) + ') scale(' + bkrN(scale) +
    ')" fill="' + fill + '" stroke="' + stroke + '" stroke-width="5" stroke-linejoin="round" opacity="' + bkrO(op) + '"' +
    (dashed ? ' stroke-dasharray="9 7"' : '') + '/>';
}

function bkrBubble(x, y, w, h, op = 1, tail = 'down') {
  if (op <= 0.001) return '';
  const tailPath = tail === 'leftDown'
    ? '<path d="M' + (x + 16) + ' ' + (y + h - 1) + ' L' + (x + 36) + ' ' + (y + h - 1) + ' L' + (x - 10) + ' ' + (y + h + 10) + ' Z" fill="rgba(35,57,47,.95)" stroke="' + C.chalk + '" stroke-width="4" stroke-linejoin="round"/>'
    : '<path d="M' + (x + w * 0.48) + ' ' + (y + h - 1) + ' L' + (x + w * 0.62) + ' ' + (y + h - 1) + ' L' + (x + w * 0.55) + ' ' + (y + h + 18) + ' Z" fill="rgba(35,57,47,.95)" stroke="' + C.chalk + '" stroke-width="4" stroke-linejoin="round"/>';
  return '<g opacity="' + bkrO(op) + '"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h +
    '" rx="18" fill="rgba(239,233,216,.06)" stroke="' + C.chalk + '" stroke-width="4"/>' + tailPath + '</g>';
}

function bkrLantern(cx, cy, s = 1, op = 1) {
  return '<g transform="translate(' + bkrN(cx) + ' ' + bkrN(cy) + ') scale(' + bkrN(s) + ')" opacity="' + bkrO(op) +
    '" stroke-linecap="round" stroke-linejoin="round"><path d="M-12 -25 Q0 -38 12 -25 M0 -25 L0 -19 M-17 -18 Q0 -25 17 -18 L14 16 Q0 27 -14 16 Z" fill="rgba(242,193,78,.26)" stroke="' +
    C.yellow + '" stroke-width="4"/><path d="M-10 -12 L-9 12 M0 -15 L0 17 M10 -12 L9 12 M-14 21 L14 21 M0 21 L0 29" fill="none" stroke="' +
    C.orange + '" stroke-width="3"/></g>';
}

function bkrHands(cx, cy, s = 1, op = 1) {
  return '<g transform="translate(' + bkrN(cx) + ' ' + bkrN(cy) + ') scale(' + bkrN(s) + ')" opacity="' + bkrO(op) +
    '" stroke-linecap="round" stroke-linejoin="round"><path d="M-29 12 L-14 0 L-3 6 Q0 8 3 5 L10 0 Q14 -3 17 1 Q20 5 16 9 L7 18 Q1 23 -7 19 L-15 15 L-23 22 Z" fill="rgba(127,182,217,.35)" stroke="' +
    BKR_BLUE + '" stroke-width="4"/><path d="M29 12 L14 0 L4 6 Q1 8 -3 5 L-10 0 Q-14 -3 -17 1 Q-20 5 -16 9 L-7 18 Q-1 23 7 19 L15 15 L23 22 Z" fill="rgba(232,135,91,.35)" stroke="' +
    C.orange + '" stroke-width="4"/><path d="M-5 7 Q0 2 5 7 M-4 12 Q0 8 4 12" fill="none" stroke="' + C.chalk + '" stroke-width="3"/></g>';
}

function bkrBead(cx, cy, sc = 0.8, op = 1, color = BKR_BEAD_COLOR) {
  const r = BKR_BEAD_RADIUS * sc;
  if (op <= 0.002 || r <= 1) return '';
  return '<g opacity="' + bkrO(op) + '"><circle cx="' + bkrN(cx) + '" cy="' + bkrN(cy) + '" r="' + bkrN(r) +
    '" fill="' + color + '" stroke="rgba(26,43,35,.5)" stroke-width="3"/><ellipse cx="' + bkrN(cx - r * .38) +
    '" cy="' + bkrN(cy - r * .42) + '" rx="' + bkrN(r * .26) + '" ry="' + bkrN(r * .15) +
    '" fill="#fff" opacity=".5" transform="rotate(-35 ' + bkrN(cx - r * .38) + ' ' + bkrN(cy - r * .42) + ')"/></g>';
}

function bkrSmallBead(cx, cy, r = 12, color = BKR_BLUE, op = 1) {
  if (op <= 0.002) return '';
  return '<g opacity="' + bkrO(op) + '"><circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + color +
    '" stroke="rgba(26,43,35,.5)" stroke-width="2"/><ellipse cx="' + (cx - r * .32) + '" cy="' + (cy - r * .35) +
    '" rx="' + (r * .24) + '" ry="' + (r * .15) + '" fill="#fff" opacity=".55"/></g>';
}

function bkrEmptyBead(cx, cy, op = 1, glow = 0) {
  const fill = glow > 0.01 ? 'rgba(242,193,78,.2)' : 'rgba(242,193,78,.012)';
  return bkrCircle(cx, cy, 22, C.yellow, 4, fill, op, '8 6');
}

function bkrBracket(x1, x2, y, progress, op = 1) {
  if (op <= 0.001 || progress <= 0.001) return '';
  const end = x1 + (x2 - x1) * progress;
  return '<path d="M' + bkrN(x1) + ' ' + bkrN(y - 7) + ' L' + bkrN(x1) + ' ' + bkrN(y) +
    ' L' + bkrN(end) + ' ' + bkrN(y) + ' L' + bkrN(end) + ' ' + bkrN(y - 7) +
    '" fill="none" stroke="' + C.yellow + '" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="' + bkrO(op) + '"/>';
}

function bkrPaper(op = 1) {
  return '<rect x="560" y="230" width="480" height="600" fill="rgba(239,233,216,.04)" stroke="' + C.chalk + '" stroke-width="5" opacity="' + bkrO(op) + '"/>';
}

function bkrSlot(x, y, w, h, op = 1, glow = 0, dashed = true) {
  if (op <= 0.001) return '';
  const fill = glow > 0.01 ? 'rgba(242,193,78,' + (0.15 * Math.max(0, Math.min(1, glow))).toFixed(3) + ')' : 'rgba(242,193,78,.012)';
  return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="12" fill="' + fill +
    '" stroke="' + C.yellow + '" stroke-width="3" opacity="' + bkrO(op) + '"' +
    (dashed ? ' stroke-dasharray="12 9"' : '') + '/>';
}

const BKR_SLOTS = [
  { name: '書籍資料', x: 600, y: 260, w: 400, h: 160 },
  { name: '內容摘要', x: 600, y: 440, w: 400, h: 200 },
  { name: '讀後感想', x: 600, y: 660, w: 400, h: 140 },
];

function bkrScaffold(paperOp = 1, slotOps = [1, 1, 1], glows = [0, 0, 0], dashed = true) {
  let g = bkrPaper(paperOp);
  BKR_SLOTS.forEach((slot, i) => {
    const op = slotOps[i] ?? 1;
    if (op <= 0.001) return;
    const tagY = slot.y + slot.h / 2 - 25;
    g += '<g opacity="' + bkrO(op) + '">' + bkrSlot(slot.x, slot.y, slot.w, slot.h, 1, glows[i] ?? 0, dashed) +
      bkrCardFrame(370, tagY, 170, 50, 1, false, C.chalk) +
      bkrPhrase(455, tagY + 35, slot.name, 34, C.chalk, 1, 'middle') + '</g>';
  });
  return g;
}

function bkrPositionNote(op = 1) {
  return bkrPhrase(1260, 836, '位置示意', 30, C.chalk, op);
}

function s1(u) {
  let g = head(u, '開場', '推薦一本書') + bkrTag();
  const titleOp = bkrK(u, 0.2, 0.8);
  g += box(600, 200, 400, 72, C.yellow, titleOp, 'rgba(242,193,78,.04)');
  g += bkrLabel(800, 248, '〈我的讀書報告〉', 40, C.yellow, titleOp);
  const dollOp = bkrK(u, 0.5, 0.8);
  g += bkrDoll(300, 520, 1.0, dollOp);
  g += bkrLine(332, 485, 360, 462, C.chalk, 8, dollOp);
  g += bkrCircle(360, 462, 6, C.chalk, 3, C.chalk, dollOp);
  g += bkrBook(370, 440, 0.8, bkrK(u, 1.0, 1.35));
  const arrowOp = bkrK(u, 2.5, 3.5);
  g += arrow(430, 470, 1060, 470, C.yellow, 1, false, arrowOp);
  g += bkrDoll(1180, 540, 0.85, bkrK(u, 1.0, 1.35));
  g += bkrDoll(1380, 540, 0.85, bkrK(u, 1.0, 1.35));
  g += bkrBook(1180, 410, 0.45, bkrK(u, 4.0, 4.3));
  g += bkrBook(1380, 410, 0.45, bkrK(u, 5.0, 5.3));
  g += bkrLabel(800, 770, '推薦給別人', 36, C.yellow, bkrK(u, 6.5, 7.3));
  return bkrPaint(g);
}

function s2(u) {
  let g = head(u, '格式', '三個部分') + bkrTag();
  const paperOp = bkrK(u, 0.2, 0.8);
  const slotOps = [bkrK(u, 1.5, 1.85), bkrK(u, 3.5, 3.85), bkrK(u, 5.5, 5.85)];
  const glows = [bkrLongGlow(u, 1.5), bkrLongGlow(u, 3.5), bkrLongGlow(u, 5.5)];
  g += bkrPaper(paperOp);
  g += bkrScaffold(0, slotOps, glows);
  g += bkrPositionNote(bkrK(u, 7.5, 7.8));
  return bkrPaint(g);
}

function s3(u) {
  let g = head(u, '格式', '書的身分證') + bkrTag();
  const frameOp = bkrK(u, 0.2, 0.8);
  g += bkrCardFrame(420, 250, 760, 420, frameOp, false, C.chalk);
  g += bkrBook(480, 310, 0.5, frameOp);
  const rows = [
    ['書名', '〈小狐狸的燈籠〉', 1.0],
    ['作者', '林小雨', 2.5],
    ['出版者', '星星出版社', 4.0],
    ['出版年月', '二〇二〇年五月', 5.5],
  ];
  rows.forEach(([label, value, start]) => {
    const op = bkrK(u, start, start + 0.35);
    const y = 370 + rows.findIndex((row) => row[0] === label) * 80;
    g += bkrPhrase(560, y, label, 34, C.yellow, op);
    g += bkrPhrase(760, y, value, 34, C.chalk, op);
  });
  g += bkrPhrase(1360, 400, '書的身分證', 36, C.yellow, bkrK(u, 7.0, 7.8), 'middle');
  g += bkrPhrase(1360, 470, '虛構示範', 30, C.chalk, bkrK(u, 8.0, 8.8), 'middle');
  return bkrPaint(g);
}

function s4(u) {
  let g = head(u, '內容摘要', '濃縮成重點') + bkrTag();
  g += bkrPhrase(800, 270, '內容摘要', 34, C.yellow, bkrK(u, 0.2, 0.5), 'middle');
  g += bkrScroll(100, 260, 120, 520, 1 - 0.65 * bkrK(u, 1.0, 3.5));
  g += bkrFunnel(440, 380, 260, 520, bkrK(u, 0.2, 0.8));
  const move = bkrK(u, 1.0, 3.5);
  const copyOp = bkrK(u, 1.05, 1.35) * (1 - bkrK(u, 3.0, 3.5));
  const scrollX = 100 + (400 - 100) * move;
  const scrollY = 260 + (390 - 260) * move;
  const scrollW = 120 + (60 - 120) * move;
  const scrollH = 520 + (250 - 520) * move;
  g += bkrScroll(scrollX, scrollY, scrollW, scrollH, copyOp);
  const rows = [
    { y: 380, tag: '開始', phrase: '森林迷路了', start: 4.0 },
    { y: 500, tag: '經過', phrase: '提燈籠找路', start: 5.5 },
    { y: 620, tag: '結尾', phrase: '燈籠照回家', start: 7.0 },
  ];
  rows.forEach((row) => {
    const op = bkrK(u, row.start, row.start + 0.2);
    const travel = bkrK(u, row.start, row.start + 0.8);
    g += bkrRoleTag(620, row.y - 22, row.tag, op, false);
    g += bkrBead(440 + (760 - 440) * travel, 540 + (row.y - 540) * travel, 0.8, op);
    g += bkrPhrase(800, row.y + 10, row.phrase, 30, C.chalk, op);
  });
  g += bkrPhrase(1250, 450, '挑重點', 36, C.yellow, bkrK(u, 8.5, 9.3));
  g += bkrPhrase(1250, 530, '用自己的話', 36, C.yellow, bkrK(u, 9.5, 10.3));
  return bkrPaint(g);
}

function s5(u) {
  let g = head(u, '內容摘要', '沒看過也懂') + bkrTag();
  const rows = [
    { y: 380, tag: '開始', phrase: '森林迷路了', start: 0.5 },
    { y: 500, tag: '經過', phrase: '提燈籠找路', start: 5.0 },
    { y: 620, tag: '結尾', phrase: '燈籠照回家', start: 5.6 },
  ];
  rows.forEach((row) => {
    const op = bkrK(u, row.start, row.start + 0.25);
    g += bkrRoleTag(160, row.y - 22, row.tag, op, false);
    g += bkrBead(300, row.y, 0.8, op);
    g += bkrPhrase(340, row.y + 10, row.phrase, 30, C.chalk, op);
  });
  g += bkrDoll(1250, 560, 1.0, bkrK(u, 0.3, 0.7));
  const qOp = bkrK(u, 0.5, 0.8);
  g += bkrBubble(1210, 340, 80, 70, qOp);
  g += bkrLabel(1250, 387, '？', 40, C.chalk, qOp * (1 - bkrK(u, 9.0, 9.6)));
  g += bkrCheck(1250, 385, 0.5, bkrK(u, 9.0, 9.6));
  const p1 = bkrK(u, 1.5, 3.0);
  g += bkrBead(300 + (1110 - 300) * p1, 380 + (470 - 380) * p1, 0.6, bkrK(u, 1.5, 1.7));
  const lateOp = bkrK(u, 3.5, 3.8);
  g += bkrBubble(1310, 280, 170, 56, lateOp * (1 - 0.75 * bkrK(u, 9.0, 9.6)), 'leftDown');
  g += bkrLabel(1395, 317, '後來呢？', 30, C.yellow, lateOp * (1 - 0.75 * bkrK(u, 9.0, 9.6)));
  const lookOp = bkrK(u, 9.0, 9.6);
  g += bkrBubble(1310, 350, 170, 56, lookOp);
  g += bkrLabel(1395, 387, '看懂了', 30, C.yellow, lookOp);
  const p2 = bkrK(u, 6.5, 7.3);
  const p3 = bkrK(u, 7.5, 8.3);
  g += bkrBead(300 + (1110 - 300) * p2, 500 + (520 - 500) * p2, 0.6, bkrK(u, 6.5, 6.7));
  g += bkrBead(300 + (1110 - 300) * p3, 620 + (570 - 620) * p3, 0.6, bkrK(u, 7.5, 7.7));
  g += bkrPhrase(800, 770, '開始→經過→結尾', 34, C.yellow, bkrK(u, 10.0, 10.8), 'middle');
  return bkrPaint(g);
}

function s6(u) {
  let g = head(u, '檢查', '不是抄') + bkrTag();
  g += bkrCardFrame(160, 290, 1280, 110, bkrK(u, 0.2, 0.5), false, C.chalk);
  g += bkrCardFrame(160, 460, 1280, 110, bkrK(u, 0.2, 0.5), false, C.chalk);
  let lensX = 800, lensY = 760;
  if (u < 4.0) {
    const p = bkrK(u, 2.0, 4.0);
    lensY = 760 + (345 - 760) * p;
  } else if (u < 5.0) {
    lensY = 345;
  } else if (u < 7.0) {
    const p = bkrK(u, 5.0, 7.0);
    lensY = 345 + (515 - 345) * p;
  } else if (u < 8.0) {
    lensY = 515;
  } else {
    const p = bkrK(u, 8.0, 8.8);
    lensY = 515 + (760 - 515) * p;
  }
  const lensOp = bkrK(u, 2.0, 2.15);
  g += bkrLens(lensX, lensY, 55, lensOp);
  const copyText = '那天晚上，風呼呼的吹，樹葉沙沙的響，小狐狸提著燈籠，一步一步走進黑黑的森林……';
  const ownText = '小狐狸提著燈籠，找到回家的路。';
  g += bkrType(copyText, u, 800, 360, 30, C.chalk, 0.5, 2.5);
  g += bkrType(ownText, u, 800, 530, 34, C.chalk, 1.0, 2.4);
  const noOp = bkrK(u, 4.0, 4.2);
  g += bkrCross(1200, 430, 18, noOp);
  g += bkrPhrase(1240, 440, '整段抄', 30, C.yellow, noOp);
  const yesOp = bkrK(u, 7.0, 7.2);
  g += bkrCheck(1200, 612, 0.55, yesOp);
  g += bkrStar(1270, 605, 20, yesOp);
  g += bkrPhrase(1310, 618, '自己的話', 30, C.yellow, yesOp);
  return bkrPaint(g);
}

function s7(u) {
  let g = head(u, '讀後感想', '從最感動處寫') + bkrTag();
  g += bkrPhrase(800, 260, '讀後感想', 34, C.yellow, bkrK(u, 0.2, 0.5), 'middle');
  const glow = bkrK(u, 1.5, 2.3);
  g += bkrOpenBook(360, 300, 600, 380, bkrK(u, 0.2, 0.8), glow);
  const ray = bkrK(u, 2.5, 3.5);
  g += bkrLine(908, 470, 1080, 470, C.yellow, 5, ray);
  const cardOp = bkrK(u, 3.0, 4.0);
  g += bkrCardFrame(1080, 430, 340, 80, cardOp, false, C.chalk);
  g += bkrPhrase(1250, 480, '燈籠熄了又點亮', 30, C.chalk, cardOp, 'middle');
  g += bkrHeart(880, 470, 0.7, glow, false);
  g += bkrPhrase(1250, 560, '最感動的地方', 30, C.yellow, bkrK(u, 5.0, 5.8), 'middle');
  return bkrPaint(g);
}

function s8(u) {
  let g = head(u, '讀後感想', '誰寫都一樣？') + bkrTag();
  const people = [
    { x: 420, name: '小安' },
    { x: 800, name: '小樂' },
    { x: 1180, name: '小晴' },
  ];
  const peopleOp = bkrK(u, 0.3, 1.0);
  people.forEach((p) => {
    g += bkrDoll(p.x, 290, 0.6, peopleOp);
    g += bkrLabel(p.x, 385, p.name, 30, C.chalk, peopleOp);
  });
  const labels = [
    { text: '書籍資料', y: 485, top: 445 },
    { text: '內容摘要', y: 605, top: 565 },
    { text: '讀後感想', y: 725, top: 685 },
  ];
  labels.forEach((row) => {
    g += bkrPhrase(100, row.y, row.text, 34, C.yellow, 1);
    [280, 660, 1040].forEach((x) => { g += bkrCardFrame(x, row.top, 280, 80, 1, false, C.chalk); });
  });
  const bookOp = bkrK(u, 1.5, 3.0);
  [420, 800, 1180].forEach((cx) => {
    g += bkrLabel(cx, 495, '〈小狐狸的燈籠〉', 30, C.chalk, bookOp);
  });
  g += bkrPhrase(1360, 485, '一樣', 30, C.yellow, bkrK(u, 3.5, 3.8));
  const beadOp = bkrK(u, 4.5, 6.0);
  [420, 800, 1180].forEach((baseX, i) => {
    [baseX - 50, baseX, baseX + 50].forEach((cx, j) => {
      const color = i === 2 && j === 2 ? C.yellow : BKR_BLUE;
      g += bkrSmallBead(cx, 605, 12, color, beadOp);
    });
  });
  g += bkrPhrase(1360, 605, '差不多', 30, C.yellow, bkrK(u, 6.5, 6.8));
  const iconOp = bkrK(u, 7.5, 9.0);
  g += bkrLantern(420, 725, 0.8, iconOp);
  g += bkrStar(800, 725, 30, iconOp);
  g += bkrHands(1180, 725, 0.8, iconOp);
  g += bkrPhrase(1360, 725, '不一樣', 30, C.yellow, bkrK(u, 9.5, 9.8));
  return bkrPaint(g);
}

function s9(u) {
  let g = head(u, '動筆', '感想第一句') + bkrTag();
  const frameOp = bkrK(u, 0.2, 0.8);
  g += bkrCardFrame(260, 280, 1080, 280, frameOp, false, C.yellow);
  g += bkrPhrase(800, 330, '讀後感想', 34, C.yellow, frameOp, 'middle');
  const sentence = '最讓我感動的是，燈籠被風吹熄了，小狐狸還是重新把它點亮。';
  g += bkrType(sentence, u, 800, 440, 36, C.yellow, 1.0, 7.0);
  const x1 = 296 + 8 * 36;
  const x2 = 296 + 27 * 36;
  const bracketOp = bkrK(u, 7.5, 7.7);
  g += bkrBracket(x1, x2, 460, bkrK(u, 7.5, 8.5), bracketOp);
  g += bkrPhrase((x1 + x2) / 2, 510, '最感動處', 30, C.yellow, bracketOp, 'middle');
  return bkrPaint(g);
}

function s10(u) {
  let g = head(u, '練習', '換你寫') + bkrTag();
  const titleOp = bkrK(u, 0.2, 0.55);
  g += box(1100, 240, 400, 72, C.yellow, titleOp, 'rgba(242,193,78,.04)');
  g += bkrLabel(1300, 288, '〈我的讀書報告〉', 40, C.yellow, titleOp);
  const baseOp = bkrK(u, 0.6, 0.95);
  const glow = [bkrFlash(u, 6.0), 0, 0];
  g += bkrScaffold(baseOp, [baseOp, baseOp, baseOp], glow, true);
  g += bkrPositionNote(baseOp);
  const fields = [
    ['書名', 297],
    ['作者', 333],
    ['出版者', 369],
    ['出版年月', 405],
  ];
  fields.forEach(([label, y]) => {
    g += bkrPhrase(620, y, label, 30, C.chalk, baseOp);
    g += bkrLine(770, y - 8, 980, y - 8, C.chalk, 3, baseOp, '10 8');
  });
  const summary = [
    { y: 485, text: '開始', flash: 7.5 },
    { y: 545, text: '經過', flash: 7.5 },
    { y: 605, text: '結尾', flash: 7.5 },
  ];
  summary.forEach((row, i) => {
    const pulse = bkrFlash(u, row.flash);
    g += bkrRoleTag(615, row.y - 22, row.text, baseOp, true);
    g += bkrEmptyBead(740, row.y, baseOp, pulse);
    g += bkrLine(775, row.y, 980, row.y, C.chalk, 3, baseOp, '10 8');
  });
  g += bkrHeart(800, 730, 0.9, baseOp, true, bkrFlash(u, 9.5));
  return bkrPaint(g);
}
