const META = {
  title: '一站裡面怎麼寫',
  subtitle: '9 段・約 2 分鐘・四年級記敘文（記景）第二集',
  ariaLabel: '用四塊積木、珠串、腳印、取景框和放大鏡，呈現一段裡的句子如何排列。',
  note: '出處：楊裕貿研習講義；三年級記景學習單。積木、珠子、蝴蝶結、腳印、取景框、放大鏡、圖章是視覺比喻；校園地圖與溜滑梯是示意圖；示範句與短語依講義結構自編。鍵盤操作：空白鍵播放／暫停，左右方向鍵切換段落，F 鍵全螢幕。畫面只由時間決定。',
  works: [],
};

const G44_BLUE = C.blue;
const G44_ORANGE = C.orange;
const G44_BROWN = '#66513e';
const G44_SKIN = '#f0d9bd';
const g44K = (u, a, b) => ease(P(u, a, b));
const g44N = (v) => Number(v).toFixed(1);
const g44O = (v) => Math.max(0, Math.min(1, Number(v) || 0)).toFixed(3);

function g44Line(x1, y1, x2, y2, color = C.chalk, width = 5, op = 1, dash = '') {
  return '<line x1="' + g44N(x1) + '" y1="' + g44N(y1) + '" x2="' + g44N(x2) + '" y2="' + g44N(y2) + '" fill="none" stroke="' + color + '" stroke-width="' + width + '" stroke-linecap="round" stroke-linejoin="round" opacity="' + g44O(op) + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
}

function g44Path(d, color = C.chalk, width = 6, op = 1, fill = 'none', dash = '') {
  return '<path d="' + d + '" fill="' + fill + '" stroke="' + color + '" stroke-width="' + width + '" stroke-linecap="round" stroke-linejoin="round" opacity="' + g44O(op) + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
}

function g44Circle(cx, cy, r, stroke = C.chalk, width = 5, fill = 'none', op = 1, dash = '') {
  return '<circle cx="' + g44N(cx) + '" cy="' + g44N(cy) + '" r="' + g44N(r) + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + width + '" opacity="' + g44O(op) + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
}

function g44Block(x, y, w, h, color = G44_BLUE, op = 1, dashed = false) {
  let g = '<g opacity="' + g44O(op) + '">';
  if (dashed) return g + '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="14" fill="rgba(239,233,216,.012)" stroke="' + color + '" stroke-width="5" stroke-dasharray="14 10"/></g>';
  const n = Math.max(2, Math.floor(w / 130));
  for (let i = 0; i < n; i++) {
    const cx = x + w * (i + .5) / n;
    g += '<rect x="' + (cx - 20) + '" y="' + (y - 11) + '" width="40" height="13" rx="6" fill="' + color + '"/>';
  }
  return g + '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="14" fill="' + color + '" fill-opacity=".22" stroke="' + C.chalk + '" stroke-width="4"/></g>';
}

function g44Tag(u) {
  const op = g44K(u, .05, .55);
  return '<g opacity="' + g44O(op) + '">' + box(1376, 48, 164, 60, G44_ORANGE, 1, C.deep) + txt(1458, 88, '比喻', { a: 'middle', s: 30, w: 1, f: G44_ORANGE }) + '</g>';
}

function g44Bead(cx, cy, r = 30, op = 1, dashed = false) {
  if (op <= 0.002) return '';
  const fill = dashed ? 'none' : '#7fb6d9';
  const dash = dashed ? '8 7' : '';
  return '<g opacity="' + g44O(op) + '">' +
    '<circle cx="' + g44N(cx) + '" cy="' + g44N(cy) + '" r="' + g44N(r) + '" fill="' + fill + '" stroke="' + G44_BLUE + '" stroke-width="4"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>' +
    (dashed ? '' : '<ellipse cx="' + g44N(cx - r * .35) + '" cy="' + g44N(cy - r * .4) + '" rx="' + g44N(r * .25) + '" ry="' + g44N(r * .14) + '" fill="#fff" opacity=".55" transform="rotate(-35 ' + g44N(cx - r * .35) + ' ' + g44N(cy - r * .4) + ')"/>') +
    '</g>';
}

function g44Bow(cx, cy, sc = 1, op = 1, dashed = false) {
  if (op <= 0.002 || sc <= .01) return '';
  const w = 64 * sc, h = 43 * sc, knot = 19 * sc;
  const fill = dashed ? 'none' : G44_ORANGE, dash = dashed ? ' stroke-dasharray="8 7"' : '';
  return '<g opacity="' + g44O(op) + '">' +
    '<polygon points="' + g44N(cx - 7 * sc) + ',' + g44N(cy) + ' ' + g44N(cx - w) + ',' + g44N(cy - h) + ' ' + g44N(cx - w) + ',' + g44N(cy + h) + '" fill="' + fill + '" stroke="' + G44_ORANGE + '" stroke-width="4" stroke-linejoin="round"' + dash + '/>' +
    '<polygon points="' + g44N(cx + 7 * sc) + ',' + g44N(cy) + ' ' + g44N(cx + w) + ',' + g44N(cy - h) + ' ' + g44N(cx + w) + ',' + g44N(cy + h) + '" fill="' + fill + '" stroke="' + G44_ORANGE + '" stroke-width="4" stroke-linejoin="round"' + dash + '/>' +
    '<circle cx="' + g44N(cx) + '" cy="' + g44N(cy) + '" r="' + g44N(knot) + '" fill="' + (dashed ? 'none' : '#c96a40') + '" stroke="' + G44_ORANGE + '" stroke-width="4"' + dash + '/></g>';
}

function g44Thread(x1, x2, y, op = 1, dashed = false) {
  return g44Line(x1, y, x2, y, dashed ? C.dim : C.chalk, 5, op, dashed ? '13 12' : '');
}

function g44Glow(cx, cy, rx = 105, ry = 90, op = .5) {
  return '<g opacity="' + g44O(op) + '"><ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '" fill="rgba(242,193,78,.13)"/><ellipse cx="' + cx + '" cy="' + cy + '" rx="' + (rx - 18) + '" ry="' + (ry - 15) + '" fill="none" stroke="' + C.yellow + '" stroke-width="5"/></g>';
}

function g44BlockGlow(x, y, w, h, op = 1) {
  const pad = 10;
  const opacity = g44O(Math.min(.25, Math.max(0, op)));
  return '<rect x="' + (x - pad) + '" y="' + (y - pad) + '" width="' + (w + pad * 2) + '" height="' + (h + pad * 2) + '" rx="18" fill="rgba(242,193,78,.22)" opacity="' + opacity + '"/>';
}

function g44Star(cx, cy, r, op = 1) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .46 : r;
    pts.push(g44N(cx + Math.cos(a) * rr) + ',' + g44N(cy + Math.sin(a) * rr));
  }
  return '<polygon points="' + pts.join(' ') + '" fill="rgba(242,193,78,.3)" stroke="' + C.yellow + '" stroke-width="5" stroke-linejoin="round" opacity="' + g44O(op) + '"/>';
}

function g44Heart(cx, cy, scale = 1, op = 1) {
  return '<path transform="translate(' + g44N(cx) + ' ' + g44N(cy) + ') scale(' + g44N(scale) + ')" d="M0 38 C-13 21 -48 -2 -48 -24 C-48 -51 -15 -55 0 -31 C15 -55 48 -51 48 -24 C48 -2 13 21 0 38Z" fill="rgba(232,135,91,.22)" stroke="' + G44_ORANGE + '" stroke-width="6" opacity="' + g44O(op) + '"/>';
}

function g44Tree(cx, baseY, scale = 1, op = 1, dash = '') {
  return '<g transform="translate(' + g44N(cx) + ' ' + g44N(baseY) + ') scale(' + g44N(scale) + ')" opacity="' + g44O(op) + '" fill="none" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M0 0 L-6 -146 M-3 -70 L-58 -112 M-2 -97 L55 -139 M-4 -47 L-52 -74 M1 -83 L48 -103" stroke="' + C.chalk + '" stroke-width="10"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>' +
    '<path d="M-58 -112 Q-92 -126 -91 -158 Q-60 -163 -42 -130 M55 -139 Q68 -168 99 -157 Q96 -128 65 -121 M-52 -74 Q-83 -91 -103 -73 Q-92 -48 -54 -61 M48 -103 Q77 -126 102 -105 Q90 -81 51 -87" fill="rgba(143,209,138,.16)" stroke="' + C.green + '" stroke-width="6"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/></g>';
}

function g44Flower(cx, cy, scale = 1, op = 1) {
  let g = '<g transform="translate(' + g44N(cx) + ' ' + g44N(cy) + ') scale(' + g44N(scale) + ')" opacity="' + g44O(op) + '" stroke-linecap="round" stroke-linejoin="round">';
  for (const [x, y, r, color] of [[0, -24, 13, C.yellow], [-16, -13, 11, C.orange], [16, -13, 11, C.orange], [-11, 2, 11, C.yellow], [11, 2, 11, C.yellow]]) {
    g += '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + color + '" fill-opacity=".42" stroke="' + C.chalk + '" stroke-width="3"/>';
  }
  return g + '<path d="M0 12 L0 70 M0 42 Q-27 27 -36 41 Q-22 58 0 51 M0 54 Q23 35 37 47 Q26 65 0 64" fill="none" stroke="' + C.green + '" stroke-width="5"/></g>';
}

function g44RiceField(x, y, w, h, op = 1, dash = '') {
  let g = '<g opacity="' + g44O(op) + '"><rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="rgba(242,193,78,.055)" stroke="' + C.yellow + '" stroke-width="4"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
  for (let i = 1; i < 4; i++) g += g44Line(x + i * w / 4, y + 4, x + i * w / 4, y + h - 4, C.yellow, 2, .55, dash);
  for (let i = 0; i < 3; i++) g += g44Line(x + 8, y + (i + 1) * h / 4, x + w - 8, y + (i + 1) * h / 4, C.yellow, 2, .55, dash);
  for (let i = 0; i < 7; i++) {
    const xx = x + 13 + i * (w - 26) / 6;
    g += g44Path('M' + xx + ' ' + (y + h - 8) + ' Q' + (xx - 5) + ' ' + (y + h * .56) + ' ' + (xx + (i % 2 ? 6 : -4)) + ' ' + (y + h * .3), C.green, 3, .9, 'none', dash);
    g += g44Path('M' + xx + ' ' + (y + h * .66) + ' Q' + (xx + 8) + ' ' + (y + h * .47) + ' ' + (xx + 18) + ' ' + (y + h * .5), C.green, 3, .9, 'none', dash);
  }
  return g + '</g>';
}

function g44Gate(cx, baseY, scale = 1, op = 1) {
  return '<g transform="translate(' + g44N(cx) + ' ' + g44N(baseY) + ') scale(' + g44N(scale) + ')" opacity="' + g44O(op) + '" fill="none" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M-67 0 V-88 H-35 V0 M35 0 V-88 H67 V0 M-84 0 H84" stroke="' + C.chalk + '" stroke-width="8"/>' +
    '<path d="M-68 -74 Q-108 -119 -127 -82 Q-118 -47 -72 -48 M68 -71 Q109 -114 128 -77 Q116 -43 72 -47 M-66 -25 Q-98 -48 -117 -25 Q-103 -2 -67 -9 M67 -24 Q98 -47 117 -23 Q104 -2 67 -8" fill="rgba(143,209,138,.12)" stroke="' + C.green + '" stroke-width="6"/></g>';
}

function g44Track(cx, cy, scale = 1, op = 1) {
  return '<g transform="translate(' + g44N(cx) + ' ' + g44N(cy) + ') scale(' + g44N(scale) + ')" opacity="' + g44O(op) + '" fill="none" stroke-linecap="round" stroke-linejoin="round">' +
    '<ellipse cx="0" cy="0" rx="205" ry="120" fill="rgba(127,182,217,.07)" stroke="' + C.chalk + '" stroke-width="7"/>' +
    '<ellipse cx="0" cy="0" rx="166" ry="84" stroke="' + C.blue + '" stroke-width="5"/>' +
    '<ellipse cx="0" cy="0" rx="132" ry="56" stroke="' + C.dim + '" stroke-width="3" stroke-dasharray="12 9"/>' +
    '<path d="M-186 52 Q-133 13 -83 26 M83 -26 Q136 -14 184 -52" stroke="' + C.yellow + '" stroke-width="5"/></g>';
}

function g44Slide(cx, cy, scale = 1, op = 1) {
  const spiral = 'M-7 -79 C78 -92 118 -54 91 -28 C67 -4 14 -17 8 18 C2 52 47 69 89 52 C128 36 143 76 111 101 C91 116 60 120 56 151';
  return '<g transform="translate(' + g44N(cx) + ' ' + g44N(cy) + ') scale(' + g44N(scale) + ')" opacity="' + g44O(op) + '" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M-145 91 V-111 H-9 V91 M-145 -14 H-9 M-145 34 H-9" fill="rgba(239,233,216,.025)" stroke="' + C.chalk + '" stroke-width="7"/>' +
    '<path d="M-142 -75 H-10 M-142 -27 H-10 M-142 20 H-10 M-142 65 H-10" fill="none" stroke="' + C.dim + '" stroke-width="3"/>' +
    '<path d="M-8 -80 H-1 V-66 H74" fill="none" stroke="' + C.chalk + '" stroke-width="8"/>' +
    '<path d="' + spiral + '" fill="none" stroke="' + C.blue + '" stroke-width="27"/>' +
    '<path d="' + spiral + '" fill="none" stroke="#71c69c" stroke-width="24" stroke-dasharray="11 18"/>' +
    '<path d="M28 -77 L53 -77 L139 104 M72 -77 L97 -77 L183 104 M51 -77 L78 -77 M139 104 H183" fill="none" stroke="#c3cbd0" stroke-width="11"/>' +
    '<ellipse cx="111" cy="132" rx="111" ry="28" fill="rgba(232,210,159,.2)" stroke="#d9c795" stroke-width="6"/></g>';
}

function g44Map(x, y, scale = 1, op = 1) {
  return '<g transform="translate(' + g44N(x) + ' ' + g44N(y) + ') scale(' + g44N(scale) + ')" opacity="' + g44O(op) + '" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="8" y="8" width="984" height="544" rx="32" fill="rgba(239,233,216,.018)" stroke="' + C.dim + '" stroke-width="3"/>' +
    '<path d="M140 446 Q240 428 324 407 Q397 382 454 346" fill="none" stroke="' + C.chalk + '" stroke-width="34" opacity=".1"/>' +
    '<path d="M140 446 Q240 428 324 407 Q397 382 454 346" fill="none" stroke="' + C.chalk + '" stroke-width="4" stroke-dasharray="14 12" opacity=".8"/>' +
    g44Gate(122, 464, .86) + g44Track(488, 342, 1) +
    '<g transform="translate(738 119) scale(.48)">' + g44Tree(46, 110, .55) + g44Flower(-5, 65, .75) + g44Flower(95, 78, .55) + '</g></g>';
}

function g44Foot(cx, cy, angle = 0, scale = 1, op = 1, ghost = false) {
  const col = ghost ? C.blue : C.chalk, dash = ghost ? '9 7' : '', fill = ghost ? 'none' : 'rgba(239,233,216,.13)';
  return '<g transform="translate(' + g44N(cx) + ' ' + g44N(cy) + ') rotate(' + g44N(angle) + ') scale(' + g44N(scale) + ')" opacity="' + g44O(op) + '">' +
    '<ellipse cx="-11" cy="0" rx="8" ry="14" fill="' + fill + '" stroke="' + col + '" stroke-width="3"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>' +
    '<ellipse cx="11" cy="-7" rx="8" ry="14" fill="' + fill + '" stroke="' + col + '" stroke-width="3"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/></g>';
}

function g44Doll(cx, cy, scale = 1, op = 1) {
  return '<g transform="translate(' + g44N(cx) + ' ' + g44N(cy) + ') scale(' + g44N(scale) + ')" opacity="' + g44O(op) + '" stroke-linecap="round" stroke-linejoin="round">' +
    '<circle cx="0" cy="-72" r="31" fill="' + G44_SKIN + '" fill-opacity=".7" stroke="' + C.chalk + '" stroke-width="5"/>' +
    '<path d="M-28 -77 Q-21 -112 4 -105 Q27 -99 29 -75 Q9 -90 -4 -87 Q-18 -83 -28 -77Z" fill="' + G44_BROWN + '" stroke="' + C.chalk + '" stroke-width="3"/>' +
    '<path d="M-43 43 Q-40 -28 0 -28 Q40 -28 43 43Z" fill="rgba(127,182,217,.36)" stroke="' + C.chalk + '" stroke-width="5"/>' +
    '<path d="M-37 -5 L-70 26 M37 -5 L70 26 M-19 43 L-30 91 M19 43 L30 91" fill="none" stroke="' + C.chalk + '" stroke-width="9"/>' +
    '<circle cx="-10" cy="-67" r="3" fill="' + G44_BROWN + '"/><circle cx="10" cy="-67" r="3" fill="' + G44_BROWN + '"/></g>';
}

function g44Running(cx, cy, scale = 1, op = 1, phase = 0) {
  const swing = Math.sin(phase) * 17;
  return '<g transform="translate(' + g44N(cx) + ' ' + g44N(cy) + ') scale(' + g44N(scale) + ')" opacity="' + g44O(op) + '" stroke-linecap="round" stroke-linejoin="round">' +
    '<circle cx="0" cy="-57" r="25" fill="' + G44_SKIN + '" stroke="' + C.chalk + '" stroke-width="5"/><path d="M-20 -67 Q-11 -94 12 -83 Q24 -76 25 -60" fill="none" stroke="' + G44_BROWN + '" stroke-width="8"/>' +
    '<path d="M-4 -31 L-12 22 M-8 -10 L-54 ' + (-30 - swing) + ' M-8 -9 L40 ' + (-42 + swing) + ' M-12 22 L-55 ' + (65 + swing) + ' M-12 22 L42 ' + (60 - swing) + '" fill="none" stroke="' + C.chalk + '" stroke-width="10"/>' +
    '<path d="M-70 -64 L-108 -64 M-69 -42 L-96 -42 M-61 -19 L-86 -19" fill="none" stroke="' + C.yellow + '" stroke-width="5"/></g>';
}

function g44Sparrow(cx, cy, scale = 1, op = 1) {
  return '<g transform="translate(' + g44N(cx) + ' ' + g44N(cy) + ') scale(' + g44N(scale) + ')" opacity="' + g44O(op) + '">' +
    '<path d="M-34 4 Q-29 -28 2 -29 Q30 -27 37 -3 Q20 17 -7 15 Q-26 13 -34 4Z" fill="rgba(232,135,91,.18)" stroke="' + C.chalk + '" stroke-width="4"/>' +
    '<path d="M-8 -2 Q9 -19 25 -3 Q10 9 -8 -2Z" fill="rgba(242,193,78,.35)" stroke="' + C.yellow + '" stroke-width="3"/>' +
    '<path d="M35 -6 L51 0 L35 5" fill="' + C.yellow + '" stroke="' + C.yellow + '" stroke-width="2"/>' +
    '<circle cx="23" cy="-11" r="3" fill="' + C.chalk + '"/></g>';
}

function g44Lens(cx, cy, r = 48, op = 1, dashed = false) {
  const dash = dashed ? '11 9' : '';
  return '<g opacity="' + g44O(op) + '"><circle cx="' + g44N(cx) + '" cy="' + g44N(cy) + '" r="' + g44N(r) + '" fill="rgba(242,193,78,.045)" stroke="' + C.yellow + '" stroke-width="8"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>' +
    '<path d="M' + g44N(cx + r * .68) + ' ' + g44N(cy + r * .68) + ' L' + g44N(cx + r * 1.28) + ' ' + g44N(cy + r * 1.28) + '" stroke="' + C.yellow + '" stroke-width="17" stroke-linecap="round"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>' +
    '<path d="M' + g44N(cx + r * .8) + ' ' + g44N(cy + r * .8) + ' L' + g44N(cx + r * 1.26) + ' ' + g44N(cy + r * 1.26) + '" stroke="' + C.chalk + '" stroke-width="4" stroke-linecap="round"/></g>';
}

function g44Frame(x, y, w, h, op = 1, ghost = false) {
  if (ghost) return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="8" fill="none" stroke="' + C.yellow + '" stroke-width="4" stroke-dasharray="13 10" opacity="' + g44O(op) + '"/>';
  const l = 32;
  return '<path d="M' + x + ' ' + (y + l) + ' V' + y + ' H' + (x + l) + ' M' + (x + w - l) + ' ' + y + ' H' + (x + w) + ' V' + (y + l) + ' M' + (x + w) + ' ' + (y + h - l) + ' V' + (y + h) + ' H' + (x + w - l) + ' M' + (x + l) + ' ' + (y + h) + ' H' + x + ' V' + (y + h - l) + '" fill="rgba(242,193,78,.035)" stroke="' + C.yellow + '" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity="' + g44O(op) + '"/>';
}

function g44Stamp(cx, cy, kind, label, op = 1, active = false, radius = 46, labelSize = 34, labelDy = 108) {
  const col = active ? C.yellow : C.chalk;
  let icon = '';
  if (kind === 'color') icon = '<rect x="' + (cx - 22) + '" y="' + (cy - 14) + '" width="13" height="28" rx="3" fill="' + C.blue + '"/><rect x="' + (cx - 5) + '" y="' + (cy - 14) + '" width="13" height="28" rx="3" fill="' + C.yellow + '"/><rect x="' + (cx + 12) + '" y="' + (cy - 14) + '" width="13" height="28" rx="3" fill="' + C.orange + '"/>';
  else if (kind === 'shape') icon = '<path d="M' + (cx - 25) + ' ' + cy + ' Q' + (cx - 14) + ' ' + (cy - 22) + ' ' + cx + ' ' + cy + ' T' + (cx + 25) + ' ' + cy + '" fill="none" stroke="' + col + '" stroke-width="5" stroke-dasharray="5 5"/>';
  else icon = '<path d="M' + (cx - 17) + ' ' + (cy - 10) + ' H' + (cx + 17) + ' M' + (cx - 17) + ' ' + (cy + 10) + ' H' + (cx + 17) + '" stroke="' + col + '" stroke-width="6" stroke-linecap="round"/>';
  return '<g opacity="' + g44O(op) + '">' + g44Circle(cx, cy, radius, col, 5, C.deep) + icon + txt(cx, cy + labelDy, label, { a: 'middle', s: labelSize, w: 1, f: col }) + '</g>';
}

function g44MiniIcon(kind, cx, cy, op = 1) {
  if (kind === 'map') return g44Map(cx - 65, cy - 36, .13, op);
  if (kind === 'gate') return g44Gate(cx, cy + 32, .32, op);
  if (kind === 'track') return g44Track(cx, cy, .25, op);
  if (kind === 'flower') return g44Flower(cx - 26, cy, .55, op) + g44Flower(cx + 24, cy + 4, .45, op);
  if (kind === 'rice') return g44RiceField(cx - 54, cy - 20, 108, 48, op);
  if (kind === 'heart') return g44Heart(cx, cy, .9, op);
  return '';
}

function g44ScaledMiniIcon(kind, cx, cy, scale, op = 1) {
  return '<g transform="translate(' + cx + ' ' + cy + ') scale(' + scale + ') translate(' + (-cx) + ' ' + (-cy) + ')">' + g44MiniIcon(kind, cx, cy, op) + '</g>';
}

function g44Progress(current, u) {
  const xs = [560, 646, 812, 978], ws = [80, 160, 160, 80];
  let g = '';
  for (let i = 0; i < 4; i++) {
    const on = i === current, op = g44K(u, .05, .4);
    g += '<rect x="' + xs[i] + '" y="200" width="' + ws[i] + '" height="44" rx="8" fill="' + (on ? 'rgba(242,193,78,.20)' : 'rgba(239,233,216,.025)') + '" stroke="' + (on ? C.yellow : C.chalk) + '" stroke-width="' + (on ? 5 : 3) + '" opacity="' + g44O(op * (on ? 1 : .45)) + '"/>';
  }
  return g;
}

function g44Paint(svg) {
  return svg.replace(/font-size="24"/g, 'font-size="26"')
    .replace(/<text ([^>]*?)fill="([^"]+)"/g, '<text $1style="fill:$2" fill="$2"');
}

function s1(u) {
  let g = head(u, '開場', '骨架有了，接著長肉') + g44Tag(u);
  const cardOp = g44K(u, .2, .9);
  g += '<g opacity="' + g44O(cardOp) + '">' + box(600, 196, 400, 72, C.yellow, 1, C.deep) + txt(800, 245, '〈美麗的校園〉', { a: 'middle', s: 40, w: 1, f: C.yellow }) + '</g>';
  const xs = [140, 365, 805, 1245], ws = [215, 430, 430, 215], colors = [G44_BLUE, G44_BLUE, G44_BLUE, G44_ORANGE];
  const glow = g44K(u, 6.4, 7.4);
  g += g44BlockGlow(365, 300, 430, 170, glow) + g44BlockGlow(805, 300, 430, 170, glow);
  for (let i = 0; i < 4; i++) {
    const a = .4 + i * .8, k = g44K(u, a, a + .6), y = lerp(100, 300, k);
    if (u >= a) {
      g += g44Block(xs[i], y, ws[i], 170, colors[i]);
      if (i === 0) g += g44MiniIcon('map', xs[i] + ws[i] / 2, y + 89);
      if (i === 1) g += g44MiniIcon('gate', xs[i] + 120, y + 93) + g44MiniIcon('track', xs[i] + 314, y + 93);
      if (i === 2) g += g44MiniIcon('flower', xs[i] + 130, y + 87) + g44MiniIcon('rice', xs[i] + 310, y + 88);
      if (i === 3) g += g44MiniIcon('heart', xs[i] + ws[i] / 2, y + 84);
    }
  }
  const labels = ['總說', '分說', '分說', '感想'];
  const phrases = [['校園不大', '花草樹木多'], ['校門：兩排綠樹', '操場：紅跑道'], ['花園：花朵盛開', '稻田：金黃稻穀'], ['我愛我的校園']];
  const centers = [247, 580, 1020, 1352], labelOp = g44K(u, 3.4, 4.2), phraseOp = g44K(u, 4.2, 4.8);
  for (let i = 0; i < 4; i++) {
    g += txt(centers[i], 530, labels[i], { a: 'middle', s: 36, w: 1, f: i === 3 ? G44_ORANGE : C.chalk, o: labelOp });
    for (let j = 0; j < phrases[i].length; j++) g += txt(centers[i], 580 + j * 42, phrases[i][j], { a: 'middle', s: 30, f: C.yellow, o: phraseOp });
  }
  g += txt(800, 700, '長肉', { a: 'middle', s: 36, w: 1, f: C.yellow, o: g44K(u, 6.9, 7.5) });
  return g44Paint(g);
}

function s2(u) {
  let g = head(u, '長肉', '第一段：先總後分') + g44Tag(u) + g44Progress(0, u);
  const sentence = '我們的校園不大，卻種滿了花草樹木。';
  const chars = Math.min(sentence.length, Math.floor(Math.max(0, u - .3) * 2.6));
  g += txt(800, 300, sentence.slice(0, chars), { a: 'middle', s: 36, w: 1, f: C.yellow, o: g44K(u, .3, .6) });
  const mapOp = g44K(u, 1.0, 1.8);
  g += g44Map(240, 360, .26, mapOp);
  g += g44Thread(300, 1300, 650, g44K(u, .2, .7));
  if (u >= 2.5) {
    const k = g44K(u, 2.5, 3.5);
    g += g44Bead(lerp(240, 380, k), lerp(435, 650, k), 44, 1);
  }
  g += txt(380, 740, '總', { a: 'middle', s: 36, w: 1, f: C.yellow, o: g44K(u, 3.0, 3.6) });
  const xs = [640, 800, 960], icons = ['gate', 'track', 'flower'], words = ['校門', '操場', '花園'];
  for (let i = 0; i < 3; i++) {
    const a = 5 + i;
    if (u >= a) {
      g += g44Bead(xs[i], 650, 30, 1);
      g += g44ScaledMiniIcon(icons[i], xs[i], 592, .6, 1);
    }
    g += txt(xs[i], 720, words[i], { a: 'middle', s: 30, f: C.chalk, o: g44K(u, a + .3, a + .8) });
  }
  const sub = g44K(u, 4.9, 5.4);
  g += '<path d="M610 545 Q610 559 630 559 H970 Q990 559 990 545" fill="none" stroke="' + C.yellow + '" stroke-width="4" opacity="' + g44O(sub) + '"/>';
  g += txt(800, 530, '分', { a: 'middle', s: 36, w: 1, f: C.yellow, o: sub });
  const bowOp = g44K(u, 8.5, 9.5);
  g += g44Bow(1180, 650, .82, bowOp);
  g += txt(1180, 730, '每個角落都美', { a: 'middle', s: 30, f: C.chalk, o: g44K(u, 8.8, 9.6) });
  return g44Paint(g);
}

function s3(u) {
  let g = head(u, '長肉', '第二段：跟著腳步寫') + g44Tag(u) + g44Progress(1, u);
  const sceneOp = g44K(u, .15, .65);
  g += g44Gate(300, 520, .9, sceneOp);
  g += g44Tree(480, 515, .52, sceneOp);
  g += g44Tree(535, 515, .42, sceneOp);
  g += g44Track(760, 450, .7, sceneOp);
  g += g44Slide(1020, 430, .55, sceneOp);
  g += g44Running(1240, 470, .48, sceneOp, Math.min(7.7, Math.max(0, u - .8)) * 2);
  const footProg = g44K(u, .8, 9.5);
  for (let i = 0; i < 19; i++) {
    const f = i / 18;
    if (f <= footProg) g += g44Foot(300 + 940 * f, 542 + Math.sin(f * Math.PI) * 8, (i % 2 ? 16 : -14), .58, 1);
  }
  g += txt(300, 620, '移步', { a: 'middle', s: 36, w: 1, f: C.blue, o: g44K(u, .3, .8) });
  const xs = [480, 760, 1020, 1240], words = ['榕樹像衛兵', '紅色的跑道', '彎彎溜滑梯', '跑得滿頭汗'], starts = [2.2, 4.2, 6.2, 8.2];
  g += g44Thread(360, 1460, 690, g44K(u, .2, .7));
  for (let i = 0; i < xs.length; i++) {
    const t = starts[i], k = g44K(u, t, t + .6);
    if (u >= t) {
      g += g44Circle(xs[i], 542, 22, C.yellow, 4, 'rgba(242,193,78,.12)', 1);
      g += g44Bead(xs[i], lerp(542, 690, k), 30, 1);
    }
    g += txt(xs[i], 770, words[i], { a: 'middle', s: 30, f: C.chalk, o: g44K(u, t + .45, t + .9) });
  }
  const bow = g44K(u, 10, 11);
  g += g44Bow(1420, 690, .82, bow);
  g += txt(1420, 770, '我也想跑', { a: 'middle', s: 30, f: C.chalk, o: g44K(u, 10.3, 11.1) });
  return g44Paint(g);
}

function s4(u) {
  let g = head(u, '長肉', '第三段：站著由上而下') + g44Tag(u) + g44Progress(2, u);
  const sceneOp = g44K(u, .15, .7);
  g += g44Tree(800, 390, .72, sceneOp);
  g += g44Sparrow(735, 295, .54, sceneOp) + g44Sparrow(867, 320, .46, sceneOp) + g44Sparrow(910, 280, .4, sceneOp);
  g += g44Flower(730, 428, .72, sceneOp) + g44Flower(800, 438, .86, sceneOp) + g44Flower(870, 428, .72, sceneOp);
  g += g44RiceField(690, 505, 220, 70, sceneOp);
  g += g44Doll(470, 560, .62, sceneOp);
  g += g44Thread(520, 1300, 690, g44K(u, .2, .7));
  const moves = [[2, 4, 320], [4.6, 6.6, 450], [7.2, 9.2, 540]];
  if (u >= 4.6) g += g44Frame(650, 265, 300, 110, .3, true);
  if (u >= 7.2) g += g44Frame(650, 395, 300, 110, .3, true);
  let frameY = 265, frameOp = 0;
  if (u >= 2 && u < 4) { frameY = 265; frameOp = 1; }
  else if (u >= 4 && u < 4.6) { frameY = lerp(265, 395, g44K(u, 4, 4.6)); frameOp = 1; }
  else if (u >= 4.6 && u < 6.6) { frameY = 395; frameOp = 1; }
  else if (u >= 6.6 && u < 7.2) { frameY = lerp(395, 485, g44K(u, 6.6, 7.2)); frameOp = 1; }
  else if (u >= 7.2) { frameY = 485; frameOp = 1; }
  g += g44Frame(650, frameY, 300, 110, frameOp, false);
  const xs = [560, 800, 1040], words = ['樹上的麻雀', '五顏六色的花', '金黃的稻穗'], drops = [3.35, 5.95, 8.55], dropYs = [375, 505, 595];
  for (let i = 0; i < xs.length; i++) {
    const t = drops[i], k = g44K(u, t, t + .65);
    if (u >= t) g += g44Bead(xs[i], lerp(dropYs[i], 690, k), 30, 1);
    g += txt(xs[i], 770, words[i], { a: 'middle', s: 30, f: C.chalk, o: g44K(u, t + .5, t + .9) });
  }
  g += txt(470, 662, '定點', { a: 'middle', s: 36, w: 1, f: C.yellow, o: g44K(u, .3, .8) });
  g += g44Line(1120, 346, 1120, 520, C.yellow, 5, g44K(u, .3, .8));
  g += '<polygon points="1120,540 1108,516 1132,516" fill="' + C.yellow + '" opacity="' + g44O(g44K(u, .3, .8)) + '"/>';
  g += txt(1120, 320, '由上而下', { a: 'middle', s: 34, w: 1, f: C.yellow, o: g44K(u, .3, .8) });
  const bow = g44K(u, 10, 11);
  g += g44Bow(1260, 690, .82, bow);
  g += txt(1260, 770, '像會唱歌的畫', { a: 'middle', s: 30, f: C.chalk, o: g44K(u, 10.3, 11.1) });
  return g44Paint(g);
}

function g44StringRow(x1, x2, y, beadXs, bowX, op = 1) {
  let g = g44Thread(x1, x2, y, op);
  for (const x of beadXs) g += g44Bead(x, y, 30, op);
  if (bowX != null) g += g44Bow(bowX, y, .68, op);
  return g;
}

function g44Phrase(cx, y, before, bright, after, lit) {
  const all = before + bright + after, start = cx - all.length * 15;
  let g = '';
  if (before) g += txt(start, y, before, { s: 30, f: C.chalk });
  if (bright) {
    const x = start + before.length * 30;
    g += txt(x, y, bright, { s: 30, f: lit ? C.yellow : C.chalk });
    if (lit) g += g44Line(x, y + 8, x + bright.length * 30 - 3, y + 8, C.yellow, 4, 1);
  }
  if (after) g += txt(start + (before.length + bright.length) * 30, y, after, { s: 30, f: C.chalk });
  return g;
}

function s5(u) {
  let g = head(u, '照到重點', '每段都要照到美') + g44Tag(u);
  g += txt(170, 330, '段二', { a: 'middle', s: 30, w: 1, f: C.blue, o: g44K(u, .2, .7) });
  g += txt(170, 570, '段三', { a: 'middle', s: 30, w: 1, f: C.blue, o: g44K(u, .2, .7) });
  g += g44StringRow(260, 1180, 320, [300, 520, 740, 960], 1140, g44K(u, .2, .7));
  g += g44StringRow(260, 1000, 560, [300, 520, 740], 960, g44K(u, .2, .7));
  const keys = [
    [300, 400, '榕樹', '像衛兵', '', 1.6],
    [520, 400, '', '紅色', '的跑道', 2.7],
    [740, 400, '', '彎彎', '溜滑梯', 3.8],
    [960, 400, '跑得滿頭汗', '', '', 99],
    [300, 640, '樹上的麻雀', '', '', 99],
    [520, 640, '', '五顏六色', '的花', 7.4],
    [740, 640, '', '金黃', '的稻穗', 8.5],
  ];
  for (const [x, y, before, bright, after, t] of keys) g += g44Phrase(x, y, before, bright, after, u >= t);
  g += txt(1140, 400, '我也想跑', { a: 'middle', s: 30, f: C.chalk });
  g += txt(960, 640, '像會唱歌的畫', { a: 'middle', s: 30, f: C.chalk });
  g += g44Stamp(1380, 290, 'color', '顏色', g44K(u, .2, .7), u >= 2.7);
  g += g44Stamp(1380, 470, 'shape', '樣子', g44K(u, .2, .7), u >= 3.8);
  g += g44Stamp(1380, 650, 'like', '像什麼', g44K(u, .2, .7), u >= 1.6);
  if (u >= 9.4) g += g44Star(1230, 290, 30, 1);
  if (u >= 10) g += g44Star(1050, 530, 30, 1);
  let lx = 300, ly = 300;
  const stops = [[.8, 300, 300], [1.6, 300, 310], [2.7, 520, 310], [3.8, 740, 310], [4.9, 960, 310], [6.3, 300, 550], [7.4, 520, 550], [8.5, 740, 550]];
  if (u >= .8 && u <= 8.5) {
    for (let i = 0; i < stops.length - 1; i++) {
      if (u >= stops[i][0] && u <= stops[i + 1][0]) {
        const k = g44K(u, stops[i][0], stops[i + 1][0]);
        lx = lerp(stops[i][1], stops[i + 1][1], k);
        ly = lerp(stops[i][2], stops[i + 1][2], k);
      }
    }
    if (u > 8.5) { lx = 740; ly = 550; }
  } else if (u > 8.5 && u < 10.6) { lx = 740; ly = 550; }
  else if (u >= 10.6) {
    const k = g44K(u, 10.6, 11.6);
    lx = lerp(740, 1150, k); ly = lerp(550, 470, k);
  }
  g += g44Lens(lx, ly, 48, g44K(u, .7, 1.1));
  return g44Paint(g);
}

function g44SmallBowRow(cx, y, phrase, op = 1, bounce = 0) {
  const yy = y - bounce;
  return g44Bow(cx, yy, .62, op) + txt(cx, y + 70, phrase, { a: 'middle', s: 30, f: C.chalk, o: op });
}

function g44Pen(x, y, op = 1) {
  return '<g transform="translate(' + g44N(x) + ' ' + g44N(y) + ') rotate(-18)" opacity="' + g44O(op) + '">' +
    '<path d="M-30 0 H25 L38 0 L25 7 H-30Z" fill="' + C.red + '" stroke="' + C.chalk + '" stroke-width="2"/>' +
    '<path d="M38 0 L25 7 L25 -7Z" fill="' + C.yellow + '" stroke="' + C.chalk + '" stroke-width="2"/></g>';
}

function s6(u) {
  let g = head(u, '感覺', '最後一句寫感覺') + g44Tag(u);
  const rows = [300, 470, 640], names = ['段一', '段二', '段三'], counts = [4, 4, 3];
  for (let r = 0; r < rows.length; r++) {
    const y = rows[r], start = .2 + r * .25, op = g44K(u, start, start + .5);
    g += txt(170, y + 10, names[r], { a: 'middle', s: 30, w: 1, f: C.chalk, o: op });
    g += g44Thread(260, 820, y, op);
    for (let i = 0; i < counts[r]; i++) g += g44Bead(300 + i * 90, y, r === 0 && i === 0 ? 30 : 22, op);
  }
  const bOp = g44K(u, .2, .7);
  g += txt(780, 235, 'b', { a: 'middle', s: 40, w: 1, f: G44_ORANGE, o: bOp });
  const phrases = ['每個角落都美', '我也想跑', '像會唱歌的畫'], starts = [1.5, 4, 6.5], widths = [180, 120, 210];
  for (let i = 0; i < rows.length; i++) {
    const t = starts[i], k = g44K(u, t, t + 2), y = rows[i] + 78;
    const left = 780 - widths[i] / 2, right = 780 + widths[i] / 2, end = lerp(left, right, k);
    g += g44SmallBowRow(780, rows[i], phrases[i], bOp);
    if (u >= t) g += g44Line(left, y, end, y, C.red, 6, 1);
  }
  let penX = 0, penY = 0, penOp = 0;
  const penRows = rows.map((y) => y + 78), penWidths = widths;
  if (u >= 1.5 && u < 3.5) { penX = lerp(780 - penWidths[0] / 2, 780 + penWidths[0] / 2, g44K(u, 1.5, 3.5)); penY = penRows[0]; penOp = 1; }
  else if (u >= 3.5 && u < 4) { penX = lerp(870, 720, g44K(u, 3.5, 4)); penY = lerp(penRows[0], penRows[1], g44K(u, 3.5, 4)); penOp = 1; }
  else if (u >= 4 && u < 6) { penX = lerp(720, 840, g44K(u, 4, 6)); penY = penRows[1]; penOp = 1; }
  else if (u >= 6 && u < 6.5) { penX = lerp(840, 675, g44K(u, 6, 6.5)); penY = lerp(penRows[1], penRows[2], g44K(u, 6, 6.5)); penOp = 1; }
  else if (u >= 6.5 && u < 8.5) { penX = lerp(675, 885, g44K(u, 6.5, 8.5)); penY = penRows[2]; penOp = 1; }
  else if (u >= 8.5) { penX = 885; penY = penRows[2]; penOp = 1; }
  if (penOp) g += g44Pen(penX, penY - 12, penOp);
  return g44Paint(g);
}

function s7(u) {
  let g = head(u, '感覺', '第四段：a 少 b 多') + g44Tag(u);
  g += g44Line(800, 260, 800, 620, C.chalk, 3, g44K(u, .2, .7), '10 10');
  const left = g44K(u, .2, .7), right = g44K(u, 4.5, 5.2);
  g += g44Block(150, 360, 600, 240, G44_ORANGE, left);
  g += g44Block(850, 360, 600, 240, G44_BLUE, right);
  g += txt(450, 330, '感想', { a: 'middle', s: 36, w: 1, f: G44_ORANGE, o: left });
  g += txt(1150, 330, '段二', { a: 'middle', s: 36, w: 1, f: C.blue, o: right });
  g += g44Thread(210, 700, 470, left);
  g += g44Thread(880, 1420, 470, right);
  const a1 = g44K(u, .6, 1.1), a2 = g44K(u, 2, 2.5), a3 = g44K(u, 3.4, 3.9);
  g += g44Bead(290, 470, 30, a1) + txt(290, 545, '回頭看校園', { a: 'middle', s: 30, f: C.chalk, o: a1 });
  const bounce = u >= 7 && u < 8 ? Math.sin((u - 7) * Math.PI) * 12 : 0;
  g += g44Bow(480, 470 - bounce, .62, a2) + txt(480, 545, '我愛校園', { a: 'middle', s: 30, f: C.chalk, o: a2 });
  g += g44Bow(660, 470 - bounce, .62, a3) + txt(660, 545, '希望永遠美', { a: 'middle', s: 30, f: C.chalk, o: a3 });
  for (let i = 0; i < 4; i++) g += g44Bead(930 + i * 80, 470, 22, g44K(u, 4.5 + i * .32, 5.1 + i * .32));
  g += g44Bow(1300, 470, .62, right);
  const showRatio = g44K(u, 7, 7.5);
  g += txt(450, 660, 'a 少 b 多', { a: 'middle', s: 40, w: 1, f: C.yellow, o: showRatio });
  return g44Paint(g);
}

function g44StepRow(x1, x2, y, xs, bows, op = 1, small = false, firstLarge = false) {
  let g = g44Thread(x1, x2, y, op);
  for (const [i, x] of xs.entries()) g += g44Bead(x, y, small ? (firstLarge && i === 0 ? 30 : 18) : (i === 0 ? 30 : 18), op);
  for (const x of bows) g += g44Bow(x, y, .6, op);
  return g;
}

function g44DetailedStepRow(x1, x2, y, beads, bows, op = 1) {
  let g = g44Thread(x1, x2, y, op);
  for (const [x, radius] of beads) g += g44Bead(x, y, radius, op);
  for (const [x, scale] of bows) g += g44Bow(x, y, scale, op);
  return g;
}

function g44FlyBow(u, start, end, x1, y1, x2, y2) {
  if (u < start || u > end) return '';
  const k = g44K(u, start, end);
  return g44Bow(lerp(x1, x2, k), lerp(y1, y2, k), lerp(.35, .7, k), 1);
}

function s8(u) {
  let g = head(u, '感覺', '重點藏在蝴蝶結') + g44Tag(u);
  const xs = [140, 365, 805, 1245], ws = [215, 430, 430, 215];
  const glow = g44K(u, 1.5, 2.5) * .25;
  g += g44BlockGlow(365, 230, 430, 110, glow) + g44BlockGlow(805, 230, 430, 110, glow);
  for (let i = 0; i < 4; i++) {
    g += g44Block(xs[i], 230, ws[i], 110, i === 3 ? G44_ORANGE : G44_BLUE, g44K(u, .2, .7));
    if (i === 0) g += g44MiniIcon('map', xs[i] + ws[i] / 2, 282, g44K(u, .2, .7));
    if (i === 1) g += g44MiniIcon('gate', 470, 290, g44K(u, .2, .7)) + g44MiniIcon('track', 690, 288, g44K(u, .2, .7));
    if (i === 2) g += g44MiniIcon('flower', 930, 286, g44K(u, .2, .7)) + g44MiniIcon('rice', 1110, 286, g44K(u, .2, .7));
    if (i === 3) g += g44MiniIcon('heart', 1352, 284, g44K(u, .2, .7));
  }
  const rows = [
    { x1: 140, x2: 355, y: 420, beads: [[175, 16], [212, 10], [240, 10], [268, 10]], bows: [[318, .42]] },
    { x1: 365, x2: 795, y: 420, beads: [[430, 14], [510, 14], [590, 14], [670, 14]], bows: [[750, .5]] },
    { x1: 805, x2: 1235, y: 420, beads: [[880, 14], [970, 14], [1060, 14]], bows: [[1170, .5]] },
    { x1: 1245, x2: 1460, y: 420, beads: [[1285, 14]], bows: [[1340, .38], [1412, .38]] },
  ];
  const rowOp = g44K(u, .2, .8);
  for (const row of rows) g += g44DetailedStepRow(row.x1, row.x2, row.y, row.beads, row.bows, rowOp);
  g += txt(800, 505, '每段 b', { a: 'middle', s: 34, w: 1, f: G44_ORANGE, o: g44K(u, 2.5, 3) });
  const bows = [[318, 420], [750, 420], [1170, 420], [1340, 420], [1412, 420]];
  for (let i = 0; i < bows.length; i++) {
    const start = 3.5 + i * .7, end = start + .7, [x, y] = bows[i];
    const active = u >= start;
    if (active) g += g44Glow(x, y, 54, 44, .5);
    g += g44FlyBow(u, start, end, x, y, 800, 680);
  }
  const arrived = bows.filter((_, i) => u >= 4.2 + i * .7).length;
  const orb = g44K(u, 5.6, 7);
  g += '<circle cx="800" cy="680" r="' + (18 + 52 * orb) + '" fill="rgba(232,135,91,.18)" stroke="' + G44_ORANGE + '" stroke-width="6" opacity="' + g44O(Math.min(1, arrived / 5)) + '"/>';
  g += txt(800, 701, 'B', { a: 'middle', s: 60, w: 1, f: G44_ORANGE, o: g44K(u, 7, 7.4) });
  g += txt(800, 800, '全篇 B', { a: 'middle', s: 34, w: 1, f: G44_ORANGE, o: g44K(u, 7, 7.5) });
  return g44Paint(g);
}

function s9(u) {
  let g = head(u, '練習', '從骨架長出肉') + g44Tag(u);
  const cardOp = g44K(u, .2, .8);
  g += '<g opacity="' + g44O(cardOp) + '">' + box(600, 196, 400, 72, C.yellow, 1, C.deep) + txt(800, 245, '〈○○公園〉', { a: 'middle', s: 40, w: 1, f: C.yellow }) + '</g>';
  const xs = [140, 365, 805, 1245], ws = [215, 430, 430, 215], labels = ['總說', '分說', '分說', '感想'], colors = [G44_BLUE, G44_BLUE, G44_BLUE, G44_ORANGE];
  for (let i = 0; i < 4; i++) {
    const op = g44K(u, .3 + i * .18, .8 + i * .18);
    g += g44Block(xs[i], 280, ws[i], 100, colors[i], op, true);
    g += txt(xs[i] + ws[i] / 2, 342, labels[i], { a: 'middle', s: 36, w: 1, f: colors[i], o: g44K(u, .6 + i * .18, 1.0 + i * .18) });
  }
  const groups = [g44K(u, 2.5, 3.2), g44K(u, 3.5, 4.2), g44K(u, 5, 5.7), g44K(u, 6.5, 7.2)];
  g += g44Line(247, 380, 247, 420, C.blue, 4, groups[0], '8 8');
  g += g44Thread(160, 340, 500, groups[0], true);
  g += g44Bead(175, 500, 20, groups[0], true) + g44Bead(232, 500, 14, groups[0], true) + g44Bead(282, 500, 14, groups[0], true) + g44Bead(332, 500, 14, groups[0], true);
  g += g44Line(580, 380, 580, 420, C.blue, 4, groups[1], '8 8');
  g += g44Thread(390, 770, 540, groups[1], true);
  for (let i = 0; i < 7; i++) {
    const fx = 400 + i * 48, fy = 440 + (i % 2) * 10;
    if (i % 2 === 0) g += g44Foot(fx, fy, i * 4, .65, groups[1], true);
  }
  for (const x of [430, 510, 590, 670]) g += g44Bead(x, 540, 22, groups[1], true);
  g += txt(580, 610, '移步', { a: 'middle', s: 30, w: 1, f: C.blue, o: groups[1] });
  g += g44Line(1020, 380, 1020, 410, C.blue, 4, groups[2], '8 8');
  g += g44Doll(850, 520, .5, groups[2]);
  g += g44Frame(930, 420, 250, 55, groups[2], true) + g44Frame(930, 485, 250, 55, groups[2], true) + g44Frame(930, 550, 250, 55, groups[2], true);
  g += txt(1020, 640, '定點', { a: 'middle', s: 30, w: 1, f: C.yellow, o: groups[2] });
  g += g44Line(1352, 380, 1352, 420, C.orange, 4, groups[3], '8 8');
  g += g44Thread(1260, 1450, 500, groups[3], true);
  g += g44Bead(1272, 500, 16, groups[3], true) + g44Bow(1340, 500, .46, groups[3], true) + g44Bow(1418, 500, .46, groups[3], true);
  const stamps = [[560, 'color', '顏色'], [800, 'shape', '樣子'], [1040, 'like', '像什麼']];
  for (const [x, kind, label] of stamps) g += g44Stamp(x, 720, kind, label, g44K(u, 8, 8.8), false, 40, 30, 80);
  const flashTimes = [9.5, 10.7, 11.9, 13];
  const flashRects = [[140, 420, 215, 170], [365, 420, 430, 200], [805, 410, 430, 220], [1245, 420, 215, 170]];
  for (let i = 0; i < flashTimes.length; i++) {
    const f = Math.max(0, Math.sin(Math.PI * P(u, flashTimes[i], flashTimes[i] + .5)));
    if (f > .01) g += '<rect x="' + flashRects[i][0] + '" y="' + flashRects[i][1] + '" width="' + flashRects[i][2] + '" height="' + flashRects[i][3] + '" rx="18" fill="rgba(242,193,78,' + (f * .16).toFixed(3) + ')" stroke="' + C.yellow + '" stroke-width="4"/>';
  }
  return g44Paint(g);
}
