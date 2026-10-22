const META = {
  title: '寫一件事，先排好時間',
  subtitle: '10 段・約 2 分鐘・四年級記敘文（敘事）第一集',
  ariaLabel: '四年級記敘文敘事動畫：用圖示拼出四要素、排列事件順序與四段骨架。',
  note: '出處：楊裕貿研習講義；寫作課程設計。拼圖、骨牌、太陽、曬衣繩照片、泡泡、門、積木是視覺比喻；示範句依講義結構自編；原因法、結果法依講義範例歸納。鍵盤：空白鍵播放／暫停，左右方向鍵切換段落，F 鍵全螢幕。畫面只由時間決定。',
  works: [],
};

const EVT_INK = C.deep;
const EVT_SKIN = '#f0d9bd';
const EVT_BROWN = '#6e4c31';
const evtO = (v) => Math.max(0, Math.min(1, Number(v) || 0)).toFixed(3);
const evtK = (u, a, b) => ease(P(u, a, b));
const evtF = (v) => Number(v).toFixed(1);
const evtL = (a, b, t) => lerp(a, b, Math.max(0, Math.min(1, t)));

function evtTag(u) {
  const o = evtK(u, 0, 0.55);
  return '<g opacity="' + evtO(o) + '">' +
    box(1376, 48, 164, 60, C.orange, 1, C.deep) +
    txt(1458, 88, '比喻', { a: 'middle', s: 30, w: 1, f: C.orange }) +
    '</g>';
}

function evtLine(x1, y1, x2, y2, color, width, op, dash) {
  return '<line x1="' + evtF(x1) + '" y1="' + evtF(y1) + '" x2="' + evtF(x2) +
    '" y2="' + evtF(y2) + '" fill="none" stroke="' + color + '" stroke-width="' + width +
    '" stroke-linecap="round" opacity="' + evtO(op) + '"' +
    (dash ? ' stroke-dasharray="' + dash + '"' : '') + '/>';
}

function evtPath(d, color, width, op, fill) {
  return '<path d="' + d + '" fill="' + (fill || 'none') + '" stroke="' + color +
    '" stroke-width="' + width + '" stroke-linecap="round" stroke-linejoin="round" opacity="' +
    evtO(op) + '"/>';
}

function evtCircle(cx, cy, r, fill, stroke, width, op) {
  return '<circle cx="' + evtF(cx) + '" cy="' + evtF(cy) + '" r="' + evtF(r) +
    '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + width +
    '" opacity="' + evtO(op) + '"/>';
}

function evtHuman(cx, cy, scale, opacity, shirt) {
  const col = shirt || C.blue;
  return '<g transform="translate(' + evtF(cx) + ' ' + evtF(cy) + ') scale(' + evtF(scale) +
    ')" opacity="' + evtO(opacity) + '" stroke-linecap="round" stroke-linejoin="round">' +
    '<circle cx="0" cy="-61" r="29" fill="' + EVT_SKIN + '" fill-opacity=".7" stroke="' + C.chalk + '" stroke-width="5"/>' +
    '<path d="M-27 -66 Q-21 -99 4 -94 Q27 -89 29 -65 Q9 -80 -4 -76 Q-17 -72 -27 -66Z" fill="' + EVT_BROWN + '" stroke="' + C.chalk + '" stroke-width="3"/>' +
    '<path d="M-43 53 Q-41 -22 0 -22 Q41 -22 43 53Z" fill="' + col + '" fill-opacity=".48" stroke="' + C.chalk + '" stroke-width="5"/>' +
    '<path d="M-37 -4 L-72 28 M37 -4 L72 28 M-20 53 L-29 105 M20 53 L29 105" fill="none" stroke="' + C.chalk + '" stroke-width="9"/>' +
    '<path d="M-42 105 L-16 105 M16 105 L42 105" fill="none" stroke="' + col + '" stroke-width="12"/>' +
    '<circle cx="-10" cy="-57" r="2.8" fill="' + EVT_INK + '" stroke="none"/><circle cx="10" cy="-57" r="2.8" fill="' + EVT_INK + '" stroke="none"/>' +
    '<path d="M-8 -43 Q0 -37 8 -43" fill="none" stroke="' + EVT_INK + '" stroke-width="3"/></g>';
}

function evtClassroom(cx, cy, scale, opacity) {
  return '<g transform="translate(' + evtF(cx) + ' ' + evtF(cy) + ') scale(' + evtF(scale) +
    ')" opacity="' + evtO(opacity) + '" fill="none" stroke="' + C.chalk +
    '" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">' +
    '<path d="M-130 76 L-130 -36 L0 -104 L130 -36 L130 76 Z"/>' +
    '<path d="M-94 -28 L-32 -28 L-32 24 L-94 24 Z M-63 -28 L-63 24 M-94 -2 L-32 -2"/>' +
    '<path d="M33 -23 L88 -23 L88 76 L33 76 Z"/><circle cx="74" cy="28" r="4" fill="' + C.chalk + '"/>' +
    '<path d="M-146 77 L146 77"/></g>';
}

function evtBus(cx, cy, scale, opacity, wheelAngle, litWindows) {
  const lights = litWindows || [];
  let g = '<g transform="translate(' + evtF(cx) + ' ' + evtF(cy) + ') scale(' + evtF(scale) +
    ')" opacity="' + evtO(opacity) + '" stroke-linejoin="round">';
  g += '<rect x="-180" y="-53" width="360" height="108" rx="22" fill="rgba(127,182,217,.16)" stroke="' + C.chalk + '" stroke-width="6"/>';
  const wx = [-145, -70, 5, 80];
  wx.forEach((x, i) => {
    const lit = Number(lights[i]) || 0;
    const fill = lit > 0.01 ? 'rgba(242,193,78,' + (0.16 + 0.6 * Math.min(1, lit)).toFixed(2) + ')' : EVT_INK;
    g += '<rect x="' + x + '" y="-33" width="54" height="42" rx="7" fill="' + fill + '" stroke="' + C.chalk + '" stroke-width="4"/>';
  });
  g += '<path d="M109 -45 L147 -45 L168 -16 L168 8 L109 8 Z" fill="' + EVT_INK + '" stroke="' + C.chalk + '" stroke-width="4"/>';
  g += '<path d="M-168 17 L168 17 M104 7 L104 52" fill="none" stroke="' + C.chalk + '" stroke-width="4"/>';
  [-112, 112].forEach((x) => {
    g += '<g transform="rotate(' + evtF(wheelAngle || 0) + ' ' + x + ' 58)">' +
      '<circle cx="' + x + '" cy="58" r="28" fill="' + EVT_INK + '" stroke="' + C.chalk + '" stroke-width="5"/>' +
      '<circle cx="' + x + '" cy="58" r="10" fill="none" stroke="' + C.dim + '" stroke-width="4"/>' +
      '<path d="M' + x + ' 31 L' + x + ' 85 M' + (x - 27) + ' 58 L' + (x + 27) + ' 58" stroke="' + C.dim + '" stroke-width="3"/></g>';
  });
  return g + '</g>';
}

function evtClock(cx, cy, r, opacity, angle) {
  let g = '<g opacity="' + evtO(opacity) + '">';
  g += evtCircle(cx, cy, r, 'rgba(242,193,78,.08)', C.yellow, 6, 1);
  for (let i = 0; i < 12; i++) {
    const a = i * Math.PI / 6, r1 = r * 0.74, r2 = r * 0.86;
    g += evtLine(cx + Math.sin(a) * r1, cy - Math.cos(a) * r1, cx + Math.sin(a) * r2,
      cy - Math.cos(a) * r2, C.yellow, i % 3 === 0 ? 5 : 3, 0.92);
  }
  const a1 = (angle || 0) * Math.PI / 180, a2 = a1 / 12;
  g += evtLine(cx, cy, cx + Math.sin(a2) * r * 0.46, cy - Math.cos(a2) * r * 0.46, C.yellow, 6, 1);
  g += evtLine(cx, cy, cx + Math.sin(a1) * r * 0.72, cy - Math.cos(a1) * r * 0.72, C.yellow, 4, 1);
  g += evtCircle(cx, cy, 7, C.yellow, C.yellow, 1, 1);
  return g + '</g>';
}

function evtPin(cx, cy, scale, opacity) {
  return '<g transform="translate(' + evtF(cx) + ' ' + evtF(cy) + ') scale(' + evtF(scale) +
    ')" opacity="' + evtO(opacity) + '">' +
    '<path d="M0 76 C-12 48 -55 7 -55 -27 A55 55 0 1 1 55 -27 C55 7 12 48 0 76Z" fill="rgba(143,209,138,.16)" stroke="' + C.green + '" stroke-width="7"/>' +
    '<circle cx="0" cy="-28" r="17" fill="none" stroke="' + C.green + '" stroke-width="6"/></g>';
}

function evtAction(cx, cy, scale, opacity, color) {
  const col = color || C.orange;
  return '<g transform="translate(' + evtF(cx) + ' ' + evtF(cy) + ') scale(' + evtF(scale) +
    ')" opacity="' + evtO(opacity) + '" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M-82 0 L48 0 M30 -24 L58 0 L30 24" fill="none" stroke="' + col + '" stroke-width="12"/>' +
    '<path d="M-70 -39 L-30 -39 M-83 39 L-48 39" fill="none" stroke="' + col + '" stroke-width="6"/>' +
    '<path d="M48 -43 L77 -43 L77 43 L48 43" fill="none" stroke="' + col + '" stroke-width="5"/></g>';
}

function evtLeaf(cx, cy, scale, opacity) {
  return '<g transform="translate(' + evtF(cx) + ' ' + evtF(cy) + ') scale(' + evtF(scale) +
    ')" opacity="' + evtO(opacity) + '" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M0 84 Q-5 8 0 -74 M0 8 Q-67 -4 -75 -55 Q-15 -57 0 8 M0 -18 Q46 -23 67 -72 Q17 -79 0 -18 M0 36 Q42 28 62 -7 Q22 -9 0 36" fill="rgba(143,209,138,.14)" stroke="' + C.green + '" stroke-width="6"/>' +
    '<path d="M-56 -48 L-5 -1 M51 -65 L5 -25 M49 -1 L6 31" fill="none" stroke="' + C.green + '" stroke-width="3"/></g>';
}

function evtSquirrel(cx, cy, scale, opacity) {
  return '<g transform="translate(' + evtF(cx) + ' ' + evtF(cy) + ') scale(' + evtF(scale) +
    ')" opacity="' + evtO(opacity) + '" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M-50 36 C-99 15 -94 -54 -49 -65 C-8 -76 20 -43 5 -12 C-5 7 -26 16 -43 8 C-55 1 -53 -18 -39 -26 C-25 -34 -12 -22 -18 -11" fill="rgba(232,135,91,.12)" stroke="' + C.orange + '" stroke-width="9"/>' +
    '<ellipse cx="20" cy="37" rx="52" ry="65" fill="rgba(232,135,91,.14)" stroke="' + C.chalk + '" stroke-width="6"/>' +
    '<circle cx="23" cy="-39" r="43" fill="' + EVT_INK + '" stroke="' + C.chalk + '" stroke-width="6"/>' +
    '<path d="M-5 -68 L-17 -106 L17 -81 M39 -69 L58 -99 L62 -55" fill="rgba(232,135,91,.14)" stroke="' + C.chalk + '" stroke-width="6"/>' +
    '<circle cx="38" cy="-47" r="5" fill="' + C.chalk + '" stroke="none"/><path d="M57 -30 L72 -24 L57 -18" fill="none" stroke="' + C.chalk + '" stroke-width="4"/>' +
    '<path d="M9 4 Q24 -10 41 4 M14 6 L14 26 M39 6 L39 26" fill="none" stroke="' + C.chalk + '" stroke-width="6"/>' +
    '<circle cx="27" cy="18" r="15" fill="rgba(242,193,78,.28)" stroke="' + C.yellow + '" stroke-width="4"/>' +
    '<path d="M-3 87 L-18 99 M45 87 L58 99" fill="none" stroke="' + C.chalk + '" stroke-width="7"/></g>';
}

function evtSchool(cx, cy, scale, opacity, light) {
  const glow = Number(light) || 0;
  const winFill = glow > 0.02 ? 'rgba(242,193,78,' + (0.18 + 0.55 * Math.min(1, glow)).toFixed(2) + ')' : EVT_INK;
  return '<g transform="translate(' + evtF(cx) + ' ' + evtF(cy) + ') scale(' + evtF(scale) +
    ')" opacity="' + evtO(opacity) + '" stroke-linejoin="round" stroke-linecap="round">' +
    '<path d="M-132 80 L-132 -28 L0 -104 L132 -28 L132 80 Z" fill="rgba(239,233,216,.04)" stroke="' + C.chalk + '" stroke-width="6"/>' +
    '<path d="M-61 80 L-61 28 Q0 -18 61 28 L61 80" fill="rgba(127,182,217,.08)" stroke="' + C.chalk + '" stroke-width="5"/>' +
    '<rect x="-105" y="-16" width="43" height="42" fill="' + winFill + '" stroke="' + C.chalk + '" stroke-width="4"/>' +
    '<rect x="62" y="-16" width="43" height="42" fill="' + winFill + '" stroke="' + C.chalk + '" stroke-width="4"/>' +
    '<path d="M-132 80 L132 80" fill="none" stroke="' + C.chalk + '" stroke-width="6"/></g>';
}

function evtSun(cx, cy, r, opacity, rotation) {
  let g = '<g transform="translate(' + evtF(cx) + ' ' + evtF(cy) + ') rotate(' + evtF(rotation || 0) +
    ')" opacity="' + evtO(opacity) + '" stroke-linecap="round">';
  g += '<circle cx="0" cy="0" r="' + evtF(r) + '" fill="rgba(242,193,78,.14)" stroke="' + C.yellow + '" stroke-width="6"/>';
  for (let i = 0; i < 12; i++) {
    const a = i * Math.PI / 6, r1 = r * 1.3, r2 = r * 1.68;
    g += '<line x1="' + evtF(Math.cos(a) * r1) + '" y1="' + evtF(Math.sin(a) * r1) +
      '" x2="' + evtF(Math.cos(a) * r2) + '" y2="' + evtF(Math.sin(a) * r2) +
      '" stroke="' + C.yellow + '" stroke-width="5"/>';
  }
  return g + '</g>';
}

function evtBubbleIcon(cx, cy, r, color, kind, opacity) {
  let g = '<g opacity="' + evtO(opacity) + '">';
  g += evtCircle(cx, cy, r, 'rgba(239,233,216,.04)', color, 5, 1);
  g += evtPath('M' + evtF(cx - r * 0.58) + ' ' + evtF(cy - r * 0.45) + ' Q' +
    evtF(cx - r * 0.18) + ' ' + evtF(cy - r * 0.82) + ' ' + evtF(cx + r * 0.1) + ' ' +
    evtF(cy - r * 0.66), color, 4, 0.62);
  if (kind === 'question') {
    g += evtPath('M' + evtF(cx - r * 0.22) + ' ' + evtF(cy - r * 0.18) + ' Q' +
      evtF(cx - r * 0.22) + ' ' + evtF(cy - r * 0.5) + ' ' + evtF(cx + r * 0.08) + ' ' +
      evtF(cy - r * 0.45) + ' Q' + evtF(cx + r * 0.34) + ' ' + evtF(cy - r * 0.4) +
      ' ' + evtF(cx + r * 0.22) + ' ' + evtF(cy - r * 0.13) + ' Q' + evtF(cx + r * 0.13) +
      ' ' + evtF(cy + r * 0.02) + ' ' + evtF(cx + r * 0.02) + ' ' + evtF(cy + r * 0.12),
      color, 8, 1);
    g += evtCircle(cx + r * 0.02, cy + r * 0.34, r * 0.045, color, color, 1, 1);
  } else if (kind === 'eye') {
    g += evtPath('M' + evtF(cx - r * 0.58) + ' ' + evtF(cy) + ' Q' + evtF(cx) + ' ' +
      evtF(cy - r * 0.52) + ' ' + evtF(cx + r * 0.58) + ' ' + evtF(cy) + ' Q' +
      evtF(cx) + ' ' + evtF(cy + r * 0.52) + ' ' + evtF(cx - r * 0.58) + ' ' + evtF(cy) +
      ' Z', color, 5, 1);
    g += evtCircle(cx, cy, r * 0.19, 'none', color, 5, 1);
    g += evtCircle(cx, cy, r * 0.07, color, color, 1, 1);
  } else {
    g += evtLine(cx, cy - r * 0.48, cx, cy + r * 0.12, color, 9, 1);
    g += evtCircle(cx, cy + r * 0.34, r * 0.055, color, color, 1, 1);
  }
  return g + '</g>';
}

function evtPuzzlePath(x, y, w, h, tabs, color, op, fill, dashed) {
  const t = tabs || {};
  const b = Math.min(27, w * 0.09, h * 0.15);
  const mx = x + w / 2, my = y + h / 2;
  const d = 'M' + evtF(x + 18) + ' ' + evtF(y) +
    ' L' + evtF(mx - b) + ' ' + evtF(y) +
    ' C' + evtF(mx - b) + ' ' + evtF(y - (t.top || 0) * b * 1.25) + ' ' +
    evtF(mx + b) + ' ' + evtF(y - (t.top || 0) * b * 1.25) + ' ' + evtF(mx + b) + ' ' + evtF(y) +
    ' L' + evtF(x + w - 18) + ' ' + evtF(y) + ' Q' + evtF(x + w) + ' ' + evtF(y) + ' ' +
    evtF(x + w) + ' ' + evtF(y + 18) +
    ' L' + evtF(x + w) + ' ' + evtF(my - b) +
    ' C' + evtF(x + w + (t.right || 0) * b * 1.25) + ' ' + evtF(my - b) + ' ' +
    evtF(x + w + (t.right || 0) * b * 1.25) + ' ' + evtF(my + b) + ' ' + evtF(x + w) + ' ' + evtF(my + b) +
    ' L' + evtF(x + w) + ' ' + evtF(y + h - 18) + ' Q' + evtF(x + w) + ' ' + evtF(y + h) + ' ' +
    evtF(x + w - 18) + ' ' + evtF(y + h) +
    ' L' + evtF(mx + b) + ' ' + evtF(y + h) +
    ' C' + evtF(mx + b) + ' ' + evtF(y + h + (t.bottom || 0) * b * 1.25) + ' ' +
    evtF(mx - b) + ' ' + evtF(y + h + (t.bottom || 0) * b * 1.25) + ' ' + evtF(mx - b) + ' ' + evtF(y + h) +
    ' L' + evtF(x + 18) + ' ' + evtF(y + h) + ' Q' + evtF(x) + ' ' + evtF(y + h) + ' ' +
    evtF(x) + ' ' + evtF(y + h - 18) +
    ' L' + evtF(x) + ' ' + evtF(my + b) +
    ' C' + evtF(x - (t.left || 0) * b * 1.25) + ' ' + evtF(my + b) + ' ' +
    evtF(x - (t.left || 0) * b * 1.25) + ' ' + evtF(my - b) + ' ' + evtF(x) + ' ' + evtF(my - b) +
    ' L' + evtF(x) + ' ' + evtF(y + 18) + ' Q' + evtF(x) + ' ' + evtF(y) + ' ' +
    evtF(x + 18) + ' ' + evtF(y) + ' Z';
  return '<path d="' + d + '" fill="' + (fill || 'rgba(239,233,216,.035)') +
    '" stroke="' + color + '" stroke-width="5" stroke-linejoin="round" opacity="' + evtO(op) +
    '"' + (dashed ? ' stroke-dasharray="13 10"' : '') + '/>';
}

function evtPuzzleTabs(i) {
  return [
    { right: 1, bottom: 1 },
    { left: -1, bottom: 1 },
    { top: -1, right: 1 },
    { top: -1, left: -1 },
  ][i];
}

function evtPuzzleMini(cx, cy, scale, opacity, eventOpacity) {
  const transform = 'translate(' + evtF(cx) + ' ' + evtF(cy) + ') scale(' + evtF(scale) + ') translate(-800 -500)';
  const colors = [C.blue, C.yellow, C.green, C.orange];
  const boxes = [[650, 390], [805, 390], [650, 530], [805, 530]];
  let g = '<g transform="' + transform + '" opacity="' + evtO(opacity) + '">';
  boxes.forEach((p, i) => {
    const op = i === 3 ? eventOpacity : 1;
    g += '<g opacity="' + evtO(op) + '">' +
      evtPuzzlePath(p[0], p[1], 140, 125, evtPuzzleTabs(i), colors[i], 0.92, 'rgba(239,233,216,.04)', false);
    if (i === 0) g += evtHuman(p[0] + 70, p[1] + 77, 0.28, 0.9, colors[i]);
    if (i === 1) g += evtClock(p[0] + 70, p[1] + 60, 32, 0.95, 20);
    if (i === 2) g += evtPin(p[0] + 70, p[1] + 62, 0.42, 0.95);
    if (i === 3) g += evtAction(p[0] + 70, p[1] + 62, 0.46, 0.95, colors[i]);
    g += '</g>';
  });
  return g + '</g>';
}

function evtDomino(cx, baseY, w, h, angle, opacity) {
  return '<g transform="translate(' + evtF(cx) + ' ' + evtF(baseY) + ') rotate(' + evtF(angle) +
    ')" opacity="' + evtO(opacity) + '">' +
    '<rect x="' + evtF(-w / 2) + '" y="' + evtF(-h) + '" width="' + evtF(w) + '" height="' + evtF(h) +
    '" rx="11" fill="rgba(232,135,91,.13)" stroke="' + C.orange + '" stroke-width="5"/>' +
    '<circle cx="0" cy="' + evtF(-h * 0.72) + '" r="7" fill="' + C.orange + '"/>' +
    '<circle cx="0" cy="' + evtF(-h * 0.3) + '" r="7" fill="' + C.orange + '"/></g>';
}

function evtFinger(cx, cy, opacity) {
  return '<g transform="translate(' + evtF(cx) + ' ' + evtF(cy) + ')" opacity="' + evtO(opacity) + '">' +
    '<path d="M0 24 L45 24 Q54 24 60 14 L76 -16 Q81 -25 89 -21 Q96 -17 91 -7 L82 17 L112 4 Q122 0 126 8 Q129 16 118 21 L78 39 Q70 43 66 52 L16 52 Z" fill="rgba(239,233,216,.16)" stroke="' + C.chalk + '" stroke-width="5" stroke-linejoin="round"/>' +
    '</g>';
}

function evtBell(cx, cy, scale, angle, opacity) {
  return '<g transform="translate(' + evtF(cx) + ' ' + evtF(cy) + ') scale(' + evtF(scale) + ') rotate(' +
    evtF(angle) + ')" opacity="' + evtO(opacity) + '" stroke-linejoin="round">' +
    '<path d="M-37 33 Q-31 20 -29 -8 Q-26 -43 0 -52 Q26 -43 29 -8 Q31 20 37 33 Z" fill="rgba(239,233,216,.1)" stroke="' + C.chalk + '" stroke-width="5"/>' +
    '<path d="M-43 34 L43 34 M-12 44 Q0 55 12 44" fill="none" stroke="' + C.chalk + '" stroke-width="6" stroke-linecap="round"/>' +
    '<circle cx="0" cy="-57" r="7" fill="' + C.yellow + '"/></g>';
}

function evtDrop(k) {
  if (k <= 0) return 1;
  if (k >= 1) return 0;
  if (k < 0.82) {
    const f = k / 0.82;
    return 1 - f * f;
  }
  return 0.04 * Math.sin(Math.PI * (k - 0.82) / 0.18);
}

function evtBlock(x, y, w, h, color, opacity, dashed) {
  let g = '<g opacity="' + evtO(opacity) + '">';
  if (dashed) {
    g += '<rect x="' + evtF(x) + '" y="' + evtF(y) + '" width="' + evtF(w) + '" height="' + evtF(h) +
      '" rx="14" fill="rgba(239,233,216,.015)" stroke="' + color + '" stroke-width="5" stroke-dasharray="13 10"/>';
  } else {
    const n = Math.max(2, Math.floor(w / 130));
    for (let i = 0; i < n; i++) {
      const cx = x + w * (i + 0.5) / n;
      g += '<rect x="' + evtF(cx - 20) + '" y="' + evtF(y - 11) + '" width="40" height="13" rx="6" fill="' + color + '"/>';
    }
    g += '<rect x="' + evtF(x) + '" y="' + evtF(y) + '" width="' + evtF(w) + '" height="' + evtF(h) +
      '" rx="14" fill="' + color + '" fill-opacity=".72" stroke="' + C.chalk + '" stroke-width="4"/>';
  }
  return g + '</g>';
}

function evtHeart(cx, cy, scale, opacity) {
  return '<path transform="translate(' + evtF(cx) + ' ' + evtF(cy) + ') scale(' + evtF(scale) + ')" ' +
    'd="M0 34 C-12 20 -47 -2 -47 -23 C-47 -49 -14 -53 0 -30 C14 -53 47 -49 47 -23 C47 -2 12 20 0 34Z" ' +
    'fill="rgba(232,135,91,.18)" stroke="' + C.orange + '" stroke-width="6" opacity="' + evtO(opacity) + '"/>';
}

function evtDoor(x, y, w, h, opening, opacity) {
  const hinge = x + 16, sx = Math.max(0.035, 1 - 0.96 * Math.max(0, Math.min(1, opening)));
  let g = '<g opacity="' + evtO(opacity) + '" fill="none" stroke="' + C.chalk + '" stroke-linejoin="round">';
  g += '<rect x="' + evtF(x) + '" y="' + evtF(y) + '" width="' + evtF(w) + '" height="' + evtF(h) +
    '" rx="5" stroke-width="9"/>';
  g += '<g transform="translate(' + evtF(hinge) + ' 0) scale(' + evtF(sx) + ' 1) translate(' + evtF(-hinge) + ' 0)">';
  g += '<rect x="' + evtF(x + 18) + '" y="' + evtF(y + 18) + '" width="' + evtF(w - 36) + '" height="' + evtF(h - 36) +
    '" rx="5" fill="rgba(110,76,49,.22)" stroke="' + C.chalk + '" stroke-width="6"/>';
  g += '<path d="M' + evtF(x + 34) + ' ' + evtF(y + 36) + ' L' + evtF(x + w - 34) + ' ' + evtF(y + h - 36) +
    ' M' + evtF(x + w - 34) + ' ' + evtF(y + 36) + ' L' + evtF(x + 34) + ' ' + evtF(y + h - 36) +
    '" stroke="' + C.dim + '" stroke-width="3"/>';
  g += '<circle cx="' + evtF(x + w - 52) + '" cy="' + evtF(y + h / 2) + '" r="6" fill="' + C.yellow + '" stroke="none"/>';
  g += '</g></g>';
  return g;
}

function evtQuestion(cx, cy, scale, opacity) {
  return '<g transform="translate(' + evtF(cx) + ' ' + evtF(cy) + ') scale(' + evtF(scale) +
    ')" opacity="' + evtO(opacity) + '" fill="none" stroke="' + C.blue + '" stroke-width="14" stroke-linecap="round">' +
    '<path d="M-42 -35 Q-42 -78 5 -77 Q55 -76 51 -35 Q48 -5 11 9 Q-3 14 -3 42"/>' +
    '<circle cx="-3" cy="72" r="6" fill="' + C.blue + '" stroke="none"/></g>';
}

function evtCart(cx, cy, scale, opacity) {
  return '<g transform="translate(' + evtF(cx) + ' ' + evtF(cy) + ') scale(' + evtF(scale) +
    ')" opacity="' + evtO(opacity) + '" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M-145 -70 L-108 -70 L-76 55 L84 55 L122 -35 L-100 -35" fill="none" stroke="' + C.chalk + '" stroke-width="9"/>' +
    '<path d="M-88 -25 L105 -25 M-80 0 L96 0 M-72 27 L88 27 M-39 -34 L-26 54 M21 -34 L21 54 M78 -34 L60 54" fill="none" stroke="' + C.chalk + '" stroke-width="4"/>' +
    '<path d="M-85 58 L-73 82 L92 82" fill="none" stroke="' + C.chalk + '" stroke-width="8"/>' +
    '<circle cx="-48" cy="104" r="23" fill="' + C.deep + '" stroke="' + C.chalk + '" stroke-width="7"/>' +
    '<circle cx="74" cy="104" r="23" fill="' + C.deep + '" stroke="' + C.chalk + '" stroke-width="7"/>' +
    '<circle cx="-48" cy="104" r="5" fill="' + C.yellow + '" stroke="none"/><circle cx="74" cy="104" r="5" fill="' + C.yellow + '" stroke="none"/></g>';
}

function evtPhoto(cx, cy, kind, opacity) {
  const top = cy - 58;
  let g = '<g opacity="' + evtO(opacity) + '">';
  g += '<rect x="' + evtF(cx - 44) + '" y="' + evtF(top) + '" width="88" height="116" rx="7" fill="rgba(239,233,216,.045)" stroke="' + C.chalk + '" stroke-width="4"/>';
  g += '<path d="M' + evtF(cx - 14) + ' ' + evtF(top) + ' L' + evtF(cx - 14) + ' ' + evtF(top - 24) +
    ' L' + evtF(cx + 14) + ' ' + evtF(top - 24) + ' L' + evtF(cx + 14) + ' ' + evtF(top) +
    '" fill="rgba(110,76,49,.35)" stroke="' + C.chalk + '" stroke-width="4"/>';
  if (kind === 'leaf') g += evtLeaf(cx, cy + 8, 0.38, 1);
  else if (kind === 'squirrel') g += evtSquirrel(cx, cy + 12, 0.32, 1);
  else g += evtSchool(cx, cy + 5, 0.32, 1, 0);
  return g + '</g>';
}

function evtWaypoint(u, times) {
  if (u < times[0]) return 0;
  for (let i = 0; i < times.length - 1; i++) {
    const moveStart = times[i] + 0.65;
    const moveEnd = times[i + 1];
    if (u < moveStart) return i / (times.length - 1);
    if (u < moveEnd) return evtL(i / (times.length - 1), (i + 1) / (times.length - 1), evtK(u, moveStart, moveEnd));
  }
  return 1;
}

function evtScene1(u) {
  let g = head(u, '開場', '這次寫一件事');
  const hp = evtK(u, 0.25, 0.95);
  const cp = evtK(u, 0.7, 1.5);
  const bp = evtK(u, 2.25, 3.1);
  const oldFade = 1 - 0.86 * evtK(u, 5.0, 6.2);
  const oldScale = 1 - 0.22 * evtK(u, 5.0, 6.2);
  const drive = evtK(u, 3.1, 7.2);
  g += evtHuman(245, 585, oldScale, hp * oldFade, C.blue);
  g += evtClassroom(595, 570, 0.92 * oldScale, cp * oldFade);
  g += evtBus(evtL(1290, 980, drive), 635, 1.0, bp, drive * 360, []);
  g += txt(980, 450, '〈戶外教學〉', { a: 'middle', s: 40, w: 1, f: C.yellow, o: evtK(u, 3.2, 4.0) });
  return g;
}

function evtScene2(u) {
  let g = head(u, '四要素', '拼出一件事') + evtTag(u);
  const cx = [650, 950], cy = [392, 652], w = 280, h = 230;
  const colors = [C.blue, C.yellow, C.green, C.orange];
  const labels = ['人物', '時間', '地點', '事件'];
  const starts = [[270, 340], [1320, 340], [270, 690], [1320, 690]];
  const begins = [0.55, 2.55, 4.55, 6.55];
  for (let i = 0; i < 4; i++) {
    const col = i % 2, row = Math.floor(i / 2);
    const x = cx[col] - w / 2, y = cy[row] - h / 2;
    g += evtPuzzlePath(x, y, w, h, evtPuzzleTabs(i), C.dim, 0.24, 'rgba(239,233,216,.015)', false);
    const p = evtK(u, begins[i], begins[i] + 1.15);
    if (u < begins[i]) continue;
    const dx = evtL(starts[i][0] - cx[col], 0, p);
    const dy = evtL(starts[i][1] - cy[row], 0, p);
    const op = Math.min(1, evtK(u, begins[i], begins[i] + 0.18));
    g += '<g transform="translate(' + evtF(dx) + ' ' + evtF(dy) + ')" opacity="' + evtO(op) + '">';
    g += evtPuzzlePath(x, y, w, h, evtPuzzleTabs(i), colors[i], 0.98, 'rgba(239,233,216,.065)', false);
    if (i === 0) g += evtHuman(cx[col], cy[row] - 15, 0.62, 1, colors[i]);
    if (i === 1) g += evtClock(cx[col], cy[row] - 12, 67, 1, evtL(0, 720, P(u, begins[i], begins[i] + 1.15)));
    if (i === 2) g += evtPin(cx[col], cy[row] - 12, 0.78, 1);
    if (i === 3) g += evtAction(cx[col], cy[row] - 12, 1.45, 1, colors[i]);
    g += txt(cx[col], cy[row] + 87, labels[i], { a: 'middle', s: 30, w: 1, f: colors[i] });
    g += '</g>';
  }
  const glow = evtK(u, 7.8, 8.7);
  g += '<rect x="492" y="250" width="616" height="534" rx="30" fill="none" stroke="' + C.yellow +
    '" stroke-width="' + (3 + 4 * glow).toFixed(1) + '" opacity="' + evtO(glow) + '"/>';
  return g;
}

function evtScene3(u) {
  let g = head(u, '四要素', '事件裡的骨牌') + evtTag(u);
  const miniP = evtK(u, 0.15, 2.25);
  const miniX = evtL(800, 290, miniP), miniY = evtL(500, 330, miniP), miniS = evtL(1, 0.62, miniP);
  const puzzleOpacity = 1 - evtK(u, 3.2, 3.85);
  g += evtPuzzleMini(miniX, miniY, miniS, puzzleOpacity, 1 - evtK(u, 2.05, 2.45));
  const lift = evtK(u, 2.05, 3.2);
  const tileFade = 1 - evtK(u, 3.2, 3.85);
  if (u >= 2.05 && tileFade > 0.01) {
    g += '<g transform="translate(' + evtF(evtL(320, 800, lift)) + ' ' + evtF(evtL(380, 405, lift)) +
      ') scale(' + evtF(evtL(0.62, 1.38, lift)) + ')" opacity="' + evtO(tileFade) + '">';
    g += '<rect x="-94" y="-76" width="188" height="152" rx="22" fill="rgba(232,135,91,.13)" stroke="' + C.orange + '" stroke-width="7"/>';
    g += evtAction(0, -6, 0.78, 1, C.orange);
    g += '</g>';
  }
  const labels = [
    [320, '原因'],
    [740, '經過'],
    [1160, '結果'],
  ];
  labels.forEach((it) => {
    g += txt(it[0], 493, it[1], { a: 'middle', s: 32, w: 1, f: C.orange, o: evtK(u, 4.1, 4.6) });
  });
  g += evtLine(250, 625, 315, 625, C.yellow, 7, evtK(u, 3.55, 4.0));
  g += evtFinger(174, 555, evtK(u, 3.35, 3.8) * (1 - evtK(u, 4.45, 4.85)));
  for (let i = 0; i < 7; i++) {
    const x = 320 + i * 140;
    const falling = evtK(u, 4.1 + i * 0.56, 4.65 + i * 0.56);
    g += evtDomino(x, 690, 58, 125, 70 * falling, evtK(u, 3.7, 4.0));
  }
  const bellK = evtK(u, 8.3, 9.0);
  const swing = 15 * Math.sin(Math.PI * P(u, 8.9, 10.3) * 2) * (1 - evtK(u, 10.0, 10.5));
  g += evtBell(1335, 606, 0.78, swing, bellK);
  return g;
}

function evtScene4(u) {
  let g = head(u, '四要素', '第一句就拼好') + evtTag(u);
  const fs = 34, lineY = 286;
  const runs = [
    { text: '上星期五', key: 'time', color: C.yellow },
    { text: '，', key: '', color: C.chalk },
    { text: '我們四年級全班', key: 'person', color: C.blue },
    { text: '坐遊覽車，', key: '', color: C.chalk },
    { text: '到', key: '', color: C.chalk },
    { text: '植物園', key: 'place', color: C.green },
    { text: '戶外教學', key: 'event', color: C.orange },
    { text: '。', key: '', color: C.chalk },
  ];
  const chars = runs.reduce((n, r) => n + Array.from(r.text).length, 0);
  let x = (1600 - chars * fs) / 2;
  const source = {};
  runs.forEach((r) => {
    if (r.key) source[r.key] = { x: x, y: lineY, text: r.text, color: r.color };
    const t0 = { time: 1.5, person: 3.25, place: 5.0, event: 6.75 }[r.key];
    const active = r.key && u >= t0;
    g += txt(x, lineY, r.text, { s: fs, w: 1, f: active ? r.color : C.chalk, o: evtK(u, 0.65, 1.05) });
    x += Array.from(r.text).length * fs;
  });
  g += txt(800, 334, '示範句為自編', { a: 'middle', c: 't-body', s: 24, f: C.dim, o: evtK(u, 0.7, 1.1) });
  const cells = [
    { key: 'time', cx: 610, cy: 532, color: C.yellow, t: 1.5, dest: [610, 532] },
    { key: 'person', cx: 920, cy: 532, color: C.blue, t: 3.25, dest: [920, 532] },
    { key: 'place', cx: 610, cy: 690, color: C.green, t: 5.0, dest: [610, 690] },
    { key: 'event', cx: 920, cy: 690, color: C.orange, t: 6.75, dest: [920, 690] },
  ];
  const cw = 290, ch = 132;
  cells.forEach((c, i) => {
    const xx = c.cx - cw / 2, yy = c.cy - ch / 2;
    g += evtPuzzlePath(xx, yy, cw, ch, evtPuzzleTabs(i), c.color, 0.72, 'rgba(239,233,216,.012)', true);
    const k = P(u, c.t, c.t + 1.0);
    if (u >= c.t) {
      const src = source[c.key];
      const px = evtL(src.x, c.dest[0] - Array.from(src.text).length * fs / 2, ease(k));
      const py = evtL(src.y, c.dest[1], ease(k)) - Math.sin(Math.PI * k) * 44;
      const op = 1 - 0.1 * k;
      g += txt(px, py, src.text, { s: 28, w: 1, f: c.color, o: op });
    }
  });
  const complete = evtK(u, 7.7, 8.4);
  g += '<rect x="454" y="452" width="622" height="318" rx="26" fill="none" stroke="' + C.green +
    '" stroke-width="' + (3 + 3 * complete).toFixed(1) + '" opacity="' + evtO(complete) + '"/>';
  g += tick(1187, 610, 32, complete, C.green);
  g += txt(1282, 622, '記敘文', { a: 'middle', s: 38, w: 1, f: C.green, o: complete });
  return g;
}

function evtScene5(u) {
  let g = head(u, '動筆之前', '把材料收進來') + evtTag(u);
  const busScale = 2.18, busY = 520;
  const bubbleX = [360, 800, 1240];
  const windowIndices = [0, 1, 2];
  const targetX = windowIndices.map((i) => 800 + [-118, -43, 32, 107][i] * busScale);
  const targetY = busY - 12 * busScale;
  const labelY = 790;
  const labels = ['為什麼去', '看到什麼', '特別的事'];
  const types = ['question', 'eye', 'exclaim'];
  const colors = [C.blue, C.yellow, C.green];
  const starts = [1.7, 3.8, 5.9];
  const light = [0, 0, 0, 0];
  for (let i = 0; i < 3; i++) {
    if (u >= starts[i] + 0.9) light[windowIndices[i]] = evtK(u, starts[i] + 0.9, starts[i] + 1.25);
  }
  g += evtBus(800, busY, busScale, 1, 0, light);
  for (let i = 0; i < 3; i++) {
    const p = evtK(u, starts[i], starts[i] + 1.25);
    const x = evtL(bubbleX[i], targetX[i], p);
    const y = evtL(390, targetY, p) - Math.sin(Math.PI * p) * 38;
    const r = evtL(68, 32, p);
    if (u >= starts[i]) {
      g += evtBubbleIcon(x, y, r, colors[i], types[i], 1);
      g += txt(targetX[i], labelY, labels[i], { a: 'middle', s: 30, w: 1, f: colors[i], o: evtK(u, starts[i], starts[i] + 0.45) });
    }
  }
  return g;
}

function evtScene6(u) {
  let g = head(u, '排順序', '跟著太陽走') + evtTag(u);
  const times = [1.0, 3.25, 5.5, 7.75];
  const p = evtWaypoint(u, times);
  const sunX = 300 + p * 1000;
  const nx = (sunX - 800) / 500;
  const sunY = 560 - 270 * Math.sqrt(Math.max(0, 1 - nx * nx));
  g += evtLine(195, 820, 1405, 820, C.chalk, 5, 0.9);
  g += '<path d="M300 560 A500 270 0 0 1 1300 560" fill="none" stroke="' + C.dim +
    '" stroke-width="4" stroke-dasharray="13 12"/>';
  const xs = [300, 633.3, 966.7, 1300];
  const icons = [
    (op) => evtBus(xs[0], 735, 0.85, op, 0, []),
    (op) => evtLeaf(xs[1], 729, 0.86, op),
    (op) => evtSquirrel(xs[2], 733, 0.60, op),
    (op) => evtSchool(xs[3], 731, 0.68, op, 0),
  ];
  const sceneAt = [1.0, 3.25, 5.5, 7.75];
  icons.forEach((draw, i) => g += draw(evtK(u, sceneAt[i], sceneAt[i] + 0.7)));
  g += evtSun(sunX, sunY, 39, 1, evtL(0, 240, p));
  g += txt(1372, 204, '時間式', { a: 'middle', s: 34, w: 1, f: C.yellow, o: evtK(u, 8.2, 8.9) });
  return g;
}

function evtScene7(u) {
  let g = head(u, '排順序', '三條路選一條') + evtTag(u);
  const leftOp = evtK(u, 0.25, 0.8);
  g += '<rect x="135" y="276" width="460" height="430" rx="25" fill="none" stroke="' + C.dim +
    '" stroke-width="3" opacity=".28"/>';
  g += '<path d="M220 500 Q360 235 500 500" fill="none" stroke="' + C.dim + '" stroke-width="4" stroke-dasharray="11 10" opacity="' + evtO(leftOp) + '"/>';
  const leftDots = [[220, 500], [360, 367], [500, 500]];
  leftDots.forEach((p) => g += evtCircle(p[0], p[1], 9, C.deep, C.dim, 4, leftOp));
  const lp = evtK(u, 0.45, 2.9);
  const lx = 220 + lp * 280, ly = 500 - 133 * 4 * lp * (1 - lp);
  g += evtSun(lx, ly, 29, leftOp, lp * 180);

  const ropeOp = evtK(u, 3.0, 3.45);
  g += evtLine(641, 397, 959, 397, C.chalk, 5, ropeOp);
  const photoKinds = ['leaf', 'squirrel', 'school'];
  const photoXs = [680, 800, 920];
  for (let i = 0; i < 3; i++) {
    const t0 = 3.35 + i * 0.8;
    const k = evtK(u, t0, t0 + 0.75);
    const y = evtL(285, 455, k);
    g += evtPhoto(photoXs[i], y, photoKinds[i], k);
  }

  const dominoXs = [1005, 1165, 1325];
  for (let i = 0; i < 3; i++) {
    const k = evtK(u, 6.25 + i * 0.58, 6.85 + i * 0.58);
    g += evtDomino(dominoXs[i], 627, 58, 132, 70 * k, evtK(u, 5.9, 6.2));
  }
  g += txt(360, 758, '時間式', { a: 'middle', s: 30, w: 1, f: C.yellow, o: evtK(u, 0.8, 1.25) });
  g += txt(800, 758, '事件式', { a: 'middle', s: 30, w: 1, f: C.blue, o: evtK(u, 3.2, 3.7) });
  g += txt(1240, 758, '因果式', { a: 'middle', s: 30, w: 1, f: C.orange, o: evtK(u, 6.1, 6.5) });
  const choice = evtK(u, 8.8, 9.4);
  g += '<rect x="135" y="276" width="460" height="430" rx="25" fill="none" stroke="' + C.yellow +
    '" stroke-width="' + (4 + 3 * choice).toFixed(1) + '" opacity="' + evtO(choice) + '"/>';
  g += txt(360, 818, '選一種', { a: 'middle', s: 30, w: 1, f: C.yellow, o: choice });
  return g;
}

function evtScene8(u) {
  let g = head(u, '骨架', '骨架：重點在中間') + evtTag(u);
  const glow = evtK(u, 7.0, 8.0);
  g += '<rect x="406" y="550" width="788" height="224" rx="30" fill="rgba(242,193,78,' +
    (0.05 + 0.08 * glow).toFixed(3) + ')" stroke="' + C.yellow + '" stroke-width="' +
    (3 + 3 * glow).toFixed(1) + '" opacity="' + evtO(glow) + '"/>';
  const xs = [224, 428, 812, 1196], ws = [180, 360, 360, 180];
  const colors = [C.blue, C.blue, C.blue, C.orange];
  const finals = [314, 608, 992, 1286];
  const blockStart = [0.45, 1.1, 1.75, 2.4];
  for (let i = 0; i < 4; i++) {
    const k = evtK(u, blockStart[i], blockStart[i] + 1.0);
    const dy = evtDrop(k) * -210;
    g += '<g transform="translate(0 ' + evtF(dy) + ')">';
    g += evtBlock(xs[i], 600, ws[i], 140, colors[i], Math.min(1, k * 1.8), false);
    g += '</g>';
  }
  const iconStart = [3.7, 4.45, 5.2, 5.95];
  for (let i = 0; i < 4; i++) {
    const k = evtK(u, iconStart[i], iconStart[i] + 1.0);
    const dropY = evtL(355, 660, ease(k));
    const op = evtK(u, iconStart[i], iconStart[i] + 0.14);
    if (i === 0) g += evtBus(finals[i], dropY, 0.43, op, 0, []);
    if (i === 1) g += evtLeaf(finals[i], dropY, 0.58, op);
    if (i === 2) g += evtSquirrel(finals[i], dropY, 0.39, op);
    if (i === 3) {
      g += evtSchool(finals[i] - 27, dropY + 3, 0.34, op, 0);
      g += evtHeart(finals[i] + 47, dropY - 3, 0.31, op);
    }
  }
  g += txt(800, 465, '重點', { a: 'middle', s: 38, w: 1, f: C.yellow, o: glow });
  return g;
}

function evtScene9(u) {
  let g = head(u, '骨架', '進門和出門') + evtTag(u);
  const leftOpen = evtK(u, 1.0, 3.2);
  const rightOpen = evtK(u, 3.6, 5.8);
  g += evtQuestion(360, 438, 0.67, evtK(u, 2.0, 2.8));
  g += evtBus(385, 570, 0.36, evtK(u, 2.6, 3.3), 0, []);
  g += evtDoor(220, 320, 310, 310, leftOpen, evtK(u, 0.2, 0.7));
  g += evtDoor(970, 320, 310, 310, rightOpen, evtK(u, 0.2, 0.7));
  g += evtSchool(1190, 504, 0.25, evtK(u, 5.0, 5.8), evtK(u, 7.8, 8.4));
  const drive = evtK(u, 6.0, 8.0);
  g += evtBus(evtL(1048, 1085, drive), 568, 0.32, evtK(u, 5.8, 6.25), drive * 360, []);
  g += txt(375, 700, '原因法', { a: 'middle', s: 32, w: 1, f: C.blue, o: evtK(u, 2.2, 2.8) });
  g += txt(1125, 700, '結果法', { a: 'middle', s: 32, w: 1, f: C.orange, o: evtK(u, 7.6, 8.2) });
  return g;
}

function evtScene10(u) {
  let g = head(u, '練習', '換你拼〈到超級市場〉') + evtTag(u);
  const leftX = [270, 485], leftY = [500, 670], cw = 195, ch = 150;
  const colors = [C.blue, C.yellow, C.green, C.orange];
  for (let i = 0; i < 4; i++) {
    const col = i % 2, row = Math.floor(i / 2);
    const x = leftX[col] - cw / 2, y = leftY[row] - ch / 2;
    const flash = Math.sin(Math.PI * P(u, 0.9 + i * 0.55, 1.28 + i * 0.55));
    g += evtPuzzlePath(x, y, cw, ch, evtPuzzleTabs(i), flash > 0.05 ? C.yellow : C.dim,
      0.8 + 0.2 * Math.max(0, flash), 'rgba(239,233,216,.005)', true);
    g += evtCircle(leftX[col], leftY[row], 12 + 4 * Math.max(0, flash), colors[i], colors[i], 2, 0.8);
  }
  g += evtCart(800, 616, 0.83, evtK(u, 0.25, 0.8));
  const bx = [1040, 1124, 1292, 1460], bw = [72, 144, 144, 72], by = 550, bh = 150;
  for (let i = 0; i < 4; i++) {
    const flash = Math.sin(Math.PI * P(u, 3.1 + i * 0.55, 3.48 + i * 0.55));
    g += evtBlock(bx[i], by, bw[i], bh, i < 3 ? C.blue : C.orange, 0.76 + 0.24 * Math.max(0, flash), true);
  }
  return g;
}

const evtpaint = (svg) => svg.replace(/<text ([^>]*?)fill="([^"]+)"/g, '<text $1style="fill:$2" fill="$2"');
function s1(u) { return evtpaint(evtScene1(u)); }
function s2(u) { return evtpaint(evtScene2(u)); }
function s3(u) { return evtpaint(evtScene3(u)); }
function s4(u) { return evtpaint(evtScene4(u)); }
function s5(u) { return evtpaint(evtScene5(u)); }
function s6(u) { return evtpaint(evtScene6(u)); }
function s7(u) { return evtpaint(evtScene7(u)); }
function s8(u) { return evtpaint(evtScene8(u)); }
function s9(u) { return evtpaint(evtScene9(u)); }
function s10(u) { return evtpaint(evtScene10(u)); }

