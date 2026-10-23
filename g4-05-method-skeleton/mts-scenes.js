const META = {
  title: '寫一件事怎麼做',
  subtitle: '9 段・約 2 分鐘・四年級說明文（事理）第一集',
  ariaLabel: '事理說明文寫怎麼做，四段：提出問題、分析原因、解決問題、結論，方法用首先其次最後。',
  note: '出處：楊裕貿作文寫作要領、寫作課程設計、作文仿寫學習單。解說牌、說明書、書桌、放大鏡、箭頭、旗子、積木、工作牌、愛心是視覺比喻或示意；示範短語、原因、方法與好處自編；講義〈比讀書更重要的事〉只借四段排法。鍵盤：空白鍵播放／暫停，左右方向鍵切換段落，F 鍵全螢幕。畫面只由時間決定。',
  works: [],
};

const MTS_WOOD = '#a9784f';
const MTS_RED = '#d9605a';
const MTS_GREEN = '#8fd18a';
const MTS_BLUE = '#7fb6d9';
const MTS_ORANGE = '#e8875b';
const MTS_CREAM = '#efe9d8';
const MTS_INK = '#1a2b23';
const MTS_YELLOW = '#f2c14e';
const mtsK = (u, a, b) => ease(P(u, a, b));
const mtsLerp = (a, b, k) => a + (b - a) * k;
const mtsN = (value) => Number.isFinite(Number(value)) ? Number(Number(value).toFixed(2)) : 0;
const mtsO = (value) => Math.max(0, Math.min(1, Number(value) || 0)).toFixed(3);

function mtsMetaphorTag(op = 1) {
  return `<g opacity="${mtsO(op)}">${box(1375, 56, 165, 60, MTS_ORANGE, 1, C.deep)}${txt(1457, 98, '比喻', { a: 'middle', s: 30, w: 1, f: MTS_ORANGE })}</g>`;
}

function mtsLabel(cx, y, value, size = 30, color = C.chalk, op = 1) {
  if (op <= 0.001) return '';
  return txt(cx, y, value, { a: 'middle', s: size, w: 1, f: color, o: op });
}

function mtsPhrase(x, y, value, size = 30, color = C.chalk, op = 1, anchor = 'start') {
  if (op <= 0.001) return '';
  return txt(x, y, value, { a: anchor, s: size, w: 1, f: color, o: op });
}

function mtsLine(x1, y1, x2, y2, color = C.chalk, width = 5, op = 1, dash = '') {
  if (op <= 0.001) return '';
  return `<path d="M${mtsN(x1)} ${mtsN(y1)} L${mtsN(x2)} ${mtsN(y2)}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${mtsO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function mtsPath(d, color = C.chalk, width = 5, op = 1, fill = 'none', dash = '') {
  if (op <= 0.001) return '';
  return `<path d="${d}" fill="${fill}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${mtsO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function mtsCircle(cx, cy, r, stroke = C.chalk, width = 5, fill = 'none', op = 1, dash = '') {
  if (op <= 0.001 || r <= 0) return '';
  return `<circle cx="${mtsN(cx)}" cy="${mtsN(cy)}" r="${mtsN(r)}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" opacity="${mtsO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function mtsBlock(x, y, w, h, color, op = 1, dashed = false) {
  if (op <= 0.001 || w <= 2 || h <= 2) return '';
  if (dashed) return `<g opacity="${mtsO(op)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="rgba(239,233,216,.012)" stroke="${color}" stroke-width="5" stroke-dasharray="14 10"/></g>`;
  let g = `<g opacity="${mtsO(op)}">`;
  const count = Math.max(2, Math.floor(w / 130));
  for (let i = 0; i < count; i++) {
    const cx = x + w * (i + 0.5) / count;
    g += `<rect x="${mtsN(cx - 20)}" y="${mtsN(y - 11)}" width="40" height="13" rx="6" fill="${color}"/>`;
  }
  return g + `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${color}" fill-opacity=".22" stroke="${C.chalk}" stroke-width="4"/></g>`;
}

function mtsCardFrame(x, y, w, h, op = 1, dashed = false, stroke = C.chalk) {
  if (op <= 0.001) return '';
  if (dashed) return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="rgba(239,233,216,.012)" stroke="${stroke}" stroke-width="4" stroke-dasharray="13 9" opacity="${mtsO(op)}"/>`;
  return `<g opacity="${mtsO(op)}">${box(x, y, w, h, stroke, 1, 'rgba(239,233,216,.015)')}</g>`;
}

function mtsStar(cx, cy, r, op = 1) {
  if (op <= 0.01 || r <= 1) return '';
  const points = [];
  for (let i = 0; i < 10; i++) {
    const angle = -Math.PI / 2 + i * Math.PI / 5;
    const radius = i % 2 ? r * 0.46 : r;
    points.push(`${mtsN(cx + Math.cos(angle) * radius)},${mtsN(cy + Math.sin(angle) * radius)}`);
  }
  return `<polygon points="${points.join(' ')}" fill="rgba(242,193,78,.3)" stroke="${C.yellow}" stroke-width="5" stroke-linejoin="round" opacity="${mtsO(op)}"/>`;
}

function mtsCheck(cx, cy, scale = 1, op = 1) {
  if (op <= 0.01) return '';
  return `<path d="M${mtsN(cx - 30 * scale)} ${mtsN(cy)} L${mtsN(cx - 8 * scale)} ${mtsN(cy + 23 * scale)} L${mtsN(cx + 37 * scale)} ${mtsN(cy - 30 * scale)}" fill="none" stroke="${MTS_GREEN}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" opacity="${mtsO(op)}"/>`;
}

function mtsCross(cx, cy, size = 24, op = 1) {
  if (op <= 0.01) return '';
  return `<g opacity="${mtsO(op)}" stroke="${MTS_RED}" stroke-width="10" stroke-linecap="round"><line x1="${mtsN(cx - size)}" y1="${mtsN(cy - size)}" x2="${mtsN(cx + size)}" y2="${mtsN(cy + size)}"/><line x1="${mtsN(cx + size)}" y1="${mtsN(cy - size)}" x2="${mtsN(cx - size)}" y2="${mtsN(cy + size)}"/></g>`;
}

function mtsLens(cx, cy, r = 48, op = 1, dashed = false, handleUp = false) {
  if (op <= 0.01 || r <= 1) return '';
  const dash = dashed ? '11 9' : '';
  const sy = handleUp ? -1 : 1;
  return `<g opacity="${mtsO(op)}"><circle cx="${mtsN(cx)}" cy="${mtsN(cy)}" r="${mtsN(r)}" fill="rgba(242,193,78,.045)" stroke="${C.yellow}" stroke-width="8"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<path d="M${mtsN(cx + r * 0.68)} ${mtsN(cy + sy * r * 0.68)} L${mtsN(cx + r * 1.28)} ${mtsN(cy + sy * r * 1.28)}" stroke="${C.yellow}" stroke-width="17" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<path d="M${mtsN(cx + r * 0.8)} ${mtsN(cy + sy * 0.8)} L${mtsN(cx + r * 1.26)} ${mtsN(cy + sy * 1.26)}" stroke="${C.chalk}" stroke-width="4" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/></g>`;
}

function mtsFlash(u, start) {
  const fadeIn = mtsK(u, start, start + 0.08);
  const fadeOut = 1 - mtsK(u, start + 0.42, start + 0.5);
  return Math.max(0, Math.min(fadeIn, fadeOut));
}

function mtsPaint(svg) {
  return svg.replace(/font-size="24"/g, 'font-size="26"')
    .replace(/<text ([^>]*?)fill="([^"]+)"/g, '<text $1style="fill:$2" fill="$2"');
}

function mtsWorkTag(x, y, w, value, op = 1) {
  return mtsLabel(x + w / 2, y, value, 34, C.chalk, op);
}

function mtsTag(x, y, w, label, op = 1) {
  if (op <= 0.001) return '';
  return `<g opacity="${mtsO(op)}">${box(x, y, w, 64, C.yellow, 1, 'rgba(26,43,35,.94)')}${txt(x + w / 2, y + 42, label, { a: 'middle', s: 30, w: 1, f: C.chalk })}</g>`;
}

function mtsSign(cx, cy, w, h, op = 1) {
  if (op <= 0.001) return '';
  const postEnd = h * 0.85;
  const iconY = -h / 3 + (h < 240 ? h * 0.1 : 0);
  return `<g transform="translate(${mtsN(cx)} ${mtsN(cy)})" opacity="${mtsO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M${mtsN(-w * 0.34)} ${mtsN(h * 0.44)} V${mtsN(postEnd)} M${mtsN(w * 0.34)} ${mtsN(h * 0.44)} V${mtsN(postEnd)}" fill="none" stroke="${MTS_WOOD}" stroke-width="10"/>` +
    `<rect x="${mtsN(-w / 2)}" y="${mtsN(-h / 2)}" width="${w}" height="${h}" rx="7" fill="#315342" stroke="${MTS_WOOD}" stroke-width="6"/>` +
    mtsQuestionArrow(0, iconY, Math.min(1, h / 200), 1) + '</g>';
}

function mtsQuestionArrow(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${mtsN(cx)} ${mtsN(cy)}) scale(${mtsN(scale)})" opacity="${mtsO(op)}" fill="none" stroke="${C.chalk}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M-64 -14 Q-64 -42 -40 -42 Q-16 -42 -16 -20 Q-16 -5 -39 5 Q-48 9 -48 22"/><circle cx="-48" cy="39" r="3" fill="${C.chalk}"/>` +
    `<path d="M-2 0 H40 M28 -12 L42 0 L28 12" stroke="${C.yellow}" stroke-width="6"/>` +
    `<path d="M65 -38 V12" stroke="${C.chalk}" stroke-width="8"/><circle cx="65" cy="37" r="4" fill="${C.chalk}" stroke="none"/></g>`;
}

function mtsHeart(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${mtsN(cx)} ${mtsN(cy)}) scale(${mtsN(scale)})" opacity="${mtsO(op)}"><path d="M-50 -12 Q-50 -36 -28 -36 Q-12 -36 0 -20 Q12 -36 28 -36 Q50 -36 50 -12 Q50 10 0 44 Q-50 10 -50 -12Z" fill="rgba(232,135,91,.12)" stroke="${MTS_ORANGE}" stroke-width="6"/></g>`;
}

function mtsFlag(fx, fy, label, op = 1, dashed = false, flash = 0, width = 120, height = 44, poleLength = 84) {
  if (op <= 0.001) return '';
  const dash = dashed ? '11 8' : '';
  const fill = dashed ? (flash > 0.01 ? `rgba(242,193,78,${(0.5 * flash).toFixed(3)})` : 'none') : MTS_YELLOW;
  const textColor = dashed ? MTS_YELLOW : MTS_INK;
  return `<g opacity="${mtsO(op)}">${mtsLine(fx + 8, fy, fx + 8, fy + poleLength, C.chalk, 4, 1)}<rect x="${fx}" y="${fy}" width="${width}" height="${height}" rx="6" fill="${fill}" stroke="${MTS_YELLOW}" stroke-width="4"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    (label ? txt(fx + width / 2, fy + height * 0.75, label, { a: 'middle', s: 30, w: 1, f: textColor }) : '') + '</g>';
}

function mtsMiniFlag(x, y, op = 1) {
  if (op <= 0.001) return '';
  return `<g opacity="${mtsO(op)}">${mtsLine(x + 4, y - 20, x + 4, y + 48, C.chalk, 3, 1)}<path d="M${x + 5} ${y} L${x + 50} ${y + 3} L${x + 46} ${y + 22} L${x + 5} ${y + 20}Z" fill="${MTS_YELLOW}" stroke="${MTS_YELLOW}" stroke-width="2"/></g>`;
}

function mtsDesk(cx, cy, a, b, c, scale, op) {
  if (op <= 0.001) return '';
  const bookColors = [MTS_BLUE, MTS_ORANGE, MTS_CREAM];
  const messyBooks = [
    { x: -60, y: -68, angle: -15 },
    { x: -50, y: -54, angle: 10 },
    { x: -40, y: -40, angle: -5 },
  ];
  const shelfLefts = [-225, -195, -165];
  let g = `<g transform="translate(${mtsN(cx)} ${mtsN(cy)}) scale(${mtsN(scale)})" opacity="${mtsO(op)}" stroke-linecap="round" stroke-linejoin="round">`;

  // 桌面、桌腳與桌面上的固定收納物。
  g += mtsLine(-260, 0, 260, 0, C.chalk, 6, 1);
  g += mtsLine(-230, 0, -230, 150, C.chalk, 6, 1);
  g += mtsLine(230, 0, 230, 150, C.chalk, 6, 1);
  g += `<path d="M-240 -150 H-120 V0 M-240 -150 V0" fill="none" stroke="${C.chalk}" stroke-width="5"/>`;
  g += `<path d="M150 -70 V-5 Q175 5 200 -5 V-70" fill="none" stroke="${C.chalk}" stroke-width="5"/>`;
  g += `<path d="M290 70 L360 70 L352 150 L298 150 Z" fill="rgba(239,233,216,.025)" stroke="${C.chalk}" stroke-width="5"/>`;

  // 三本課本由桌面亂堆移入左後方書架。
  for (let i = 0; i < 3; i++) {
    const from = messyBooks[i];
    const x = mtsLerp(from.x, shelfLefts[i] + 11, a);
    const y = mtsLerp(from.y, -50, a);
    const angle = mtsLerp(from.angle, 0, a);
    const w = mtsLerp(90, 22, a);
    const h = mtsLerp(22, 100, a);
    g += `<g transform="translate(${mtsN(x)} ${mtsN(y)}) rotate(${mtsN(angle)})"><rect x="${mtsN(-w / 2)}" y="${mtsN(-h / 2)}" width="${mtsN(w)}" height="${mtsN(h)}" rx="2" fill="${bookColors[i]}" stroke="${C.chalk}" stroke-width="3"/></g>`;
  }

  // 鉛筆先斜躺在紙邊，整理後插進筆筒；紙張一起疊到固定位置。
  const pencilX = mtsLerp(70, 175, b);
  const pencilY = mtsLerp(-20, -85, b);
  const pencilAngle = mtsLerp(-45, -90, b);
  g += `<g transform="translate(${mtsN(pencilX)} ${mtsN(pencilY)}) rotate(${mtsN(pencilAngle)})"><rect x="-35" y="-4" width="62" height="8" rx="3" fill="#f2c14e" stroke="${C.chalk}" stroke-width="2"/><path d="M27 -4 L38 0 L27 4Z" fill="#f2c14e" stroke="${C.chalk}" stroke-width="2"/><path d="M38 0 L33 -1.8 L33 1.8Z" fill="${MTS_INK}"/></g>`;
  for (let i = 0; i < 2; i++) {
    const x = mtsLerp(i === 0 ? 45 : 55, 40, b);
    const y = mtsLerp(i === 0 ? -16 : -10, -8, b);
    const angle = mtsLerp(i === 0 ? -10 : 6, 0, b);
    g += `<g transform="translate(${mtsN(x)} ${mtsN(y)}) rotate(${mtsN(angle)})"><rect x="-30" y="-23" width="60" height="46" rx="2" fill="rgba(239,233,216,.06)" stroke="${C.chalk}" stroke-width="3"/></g>`;
  }

  // 三團紙屑循弧線向右上飛，再落入垃圾桶；不留下原位複本。
  const scraps = [
    { x: -20, y: -10, tx: 310, ty: 118 },
    { x: 100, y: -8, tx: 326, ty: 112 },
    { x: 230, y: -8, tx: 340, ty: 122 },
  ];
  for (let i = 0; i < scraps.length; i++) {
    const s = scraps[i];
    const x = mtsLerp(s.x, s.tx, c);
    const y = mtsLerp(s.y, s.ty, c) - 78 * 4 * c * (1 - c);
    g += `<path d="M${mtsN(x - 9)} ${mtsN(y - 3)} L${mtsN(x - 3)} ${mtsN(y - 9)} L${mtsN(x + 2)} ${mtsN(y - 5)} L${mtsN(x + 9)} ${mtsN(y - 7)} L${mtsN(x + 7)} ${mtsN(y + 1)} L${mtsN(x + 10)} ${mtsN(y + 6)} L${mtsN(x + 1)} ${mtsN(y + 8)} L${mtsN(x - 5)} ${mtsN(y + 5)} L${mtsN(x - 10)} ${mtsN(y + 7)}Z" fill="${C.chalk}" stroke="${C.chalk}" stroke-width="2"/>`;
  }
  return g + '</g>';
}

function mtsManual(cx, cy, k, lit, op = 1) {
  if (op <= 0.001 || k <= 0.001) return '';
  const half = 180 * k;
  const pageOp = Math.max(0, Math.min(1, (k - 0.3) / 0.3));
  let g = `<g opacity="${mtsO(op)}" stroke-linejoin="round">`;
  g += `<path d="M${mtsN(cx - half)} ${mtsN(cy - 120)} Q${mtsN(cx)} ${mtsN(cy - 132)} ${mtsN(cx + half)} ${mtsN(cy - 120)} V${mtsN(cy + 120)} Q${mtsN(cx)} ${mtsN(cy + 108)} ${mtsN(cx - half)} ${mtsN(cy + 120)}Z" fill="rgba(239,233,216,.025)" stroke="${C.chalk}" stroke-width="5"/>`;
  g += mtsLine(cx, cy - 120, cx, cy + 120, C.chalk, 4, 1);
  for (const dy of [-50, 0, 50]) g += mtsLine(cx - half + 18, cy + dy, cx - 18, cy + dy, C.chalk, 4, pageOp);
  const rows = [-86, -22, 42];
  for (let i = 0; i < 3; i++) {
    const y = cy + rows[i];
    const litFill = lit >= i + 1 ? 'rgba(242,193,78,.25)' : 'none';
    g += `<g opacity="${mtsO(pageOp)}"><rect x="${mtsN(cx + 18)}" y="${mtsN(y)}" width="44" height="44" rx="4" fill="${litFill}" stroke="${C.yellow}" stroke-width="4"/>${txt(cx + 40, y + 33, String(i + 1), { a: 'middle', s: 30, w: 1, f: C.yellow })}</g>`;
  }
  return g + '</g>';
}

function mtsBookPencil(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${mtsN(cx)} ${mtsN(cy)}) scale(${mtsN(scale)})" opacity="${mtsO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M-68 -42 Q-35 -52 0 -38 V45 Q-34 31 -68 42Z M0 -38 Q34 -52 68 -42 V42 Q34 31 0 45Z" fill="rgba(127,182,217,.16)" stroke="${MTS_BLUE}" stroke-width="5"/>` +
    `<path d="M0 -38 V45" fill="none" stroke="${C.chalk}" stroke-width="4"/>` +
    `<g transform="translate(40 0) rotate(30)"><rect x="-5" y="-42" width="10" height="70" rx="4" fill="#f2c14e" stroke="${C.chalk}" stroke-width="2"/><path d="M-5 28 L0 42 L5 28Z" fill="${MTS_INK}" stroke="${C.chalk}" stroke-width="2"/></g></g>`;
}

function mtsBroom(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${mtsN(cx)} ${mtsN(cy)}) scale(${mtsN(scale)})" opacity="${mtsO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M-42 -62 L15 30" stroke="${C.chalk}" stroke-width="9"/><path d="M-57 -52 L-29 -71" stroke="${MTS_WOOD}" stroke-width="13"/>` +
    `<path d="M-2 12 Q8 35 2 56 Q18 61 35 53 L28 23Z" fill="rgba(232,135,91,.14)" stroke="${MTS_ORANGE}" stroke-width="4"/>` +
    `<path d="M34 18 L68 18 L61 55 L25 55Z" fill="rgba(239,233,216,.05)" stroke="${C.chalk}" stroke-width="4"/><path d="M34 18 H68" stroke="${C.yellow}" stroke-width="5"/></g>`;
}

function mtsArrow(x1, y1, x2, y2, k, op = 1) {
  if (op <= 0.001 || k <= 0.001) return '';
  const ex = mtsLerp(x1, x2, k), ey = mtsLerp(y1, y2, k);
  const ang = Math.atan2(y2 - y1, x2 - x1), h = 16;
  let g = `<g opacity="${mtsO(op)}"><line x1="${mtsN(x1)}" y1="${mtsN(y1)}" x2="${mtsN(ex)}" y2="${mtsN(ey)}" stroke="${C.yellow}" stroke-width="4" stroke-linecap="round"/>`;
  if (k >= 0.99) g += `<polygon points="${mtsN(x2)},${mtsN(y2)} ${mtsN(x2 - h * Math.cos(ang - 0.45))},${mtsN(y2 - h * Math.sin(ang - 0.45))} ${mtsN(x2 - h * Math.cos(ang + 0.45))},${mtsN(y2 - h * Math.sin(ang + 0.45))}" fill="${C.yellow}"/>`;
  return g + '</g>';
}

function mtsStageTitle(u, value) {
  return mtsLabel(800, 240, value, 36, C.yellow, mtsK(u, 0.2, 0.8));
}

function s1(u) {
  let g = head(u, '開場', '這次寫怎麼做') + mtsMetaphorTag();
  const title = mtsK(u, 0.2, 0.8);
  g += mtsCardFrame(600, 200, 400, 72, title, false, C.yellow);
  g += mtsLabel(800, 247, '〈書桌的整理方式〉', 40, C.yellow, title);
  g += mtsSign(400, 500, 220, 180, 0.6 * mtsK(u, 0.5, 1.5));
  g += mtsLabel(400, 342, '事物', 34, C.chalk, mtsK(u, 1, 2));
  g += mtsLabel(400, 720, '是什麼', 34, C.chalk, mtsK(u, 1, 2));
  g += mtsArrow(560, 500, 980, 500, mtsK(u, 2.5, 3.5));
  const open = mtsK(u, 3, 4);
  const lit = u >= 5.9 ? 3 : u >= 5.2 ? 2 : u >= 4.5 ? 1 : 0;
  g += mtsManual(1200, 500, open, lit, 1);
  g += mtsLabel(1200, 342, '事理', 34, C.yellow, mtsK(u, 3.5, 4.5));
  g += mtsLabel(1200, 720, '怎麼做', 34, C.yellow, mtsK(u, 3.5, 4.5));
  return mtsPaint(g);
}

function s2(u) {
  let g = head(u, '寫什麼', '三個事理題目') + mtsMetaphorTag();
  const xs = [120, 600, 1080];
  const labels = ['我的讀書方法', '書桌的整理方式', '掃地的方式'];
  for (let i = 0; i < 3; i++) {
    const start = 0.5 + i * 2.5;
    const op = mtsK(u, start, start + 0.6);
    const x = xs[i];
    g += mtsCardFrame(x, 250, 400, 420, op, false, C.chalk);
    g += mtsPhrase(x + 200, 305, labels[i], 34, C.chalk, op, 'middle');
    if (i === 0) g += mtsBookPencil(x + 200, 480, 1.2, op);
    if (i === 1) g += mtsDesk(x + 180, 480, 1, 1, 1, 0.5, op);
    if (i === 2) g += mtsBroom(x + 200, 480, 1.1, op);
  }
  g += mtsLabel(800, 760, '寫做事的方法', 36, C.yellow, mtsK(u, 8.5, 9.5));
  return mtsPaint(g);
}

function s3(u) {
  let g = head(u, '骨架', '先提出問題') + mtsMetaphorTag();
  g += mtsStageTitle(u, '提出問題');
  g += mtsDesk(680, 560, 0, 0, 0, 1.1, mtsK(u, 0.2, 1));
  g += mtsLine(636, 516, 1160, 420, C.yellow, 3, mtsK(u, 3.5, 4), '10 9');
  g += mtsTag(1160, 388, 240, '書亂堆', mtsK(u, 3.5, 4));
  g += mtsLine(757, 538, 1160, 560, C.yellow, 3, mtsK(u, 7, 7.5), '10 9');
  g += mtsTag(1160, 528, 240, '找不到筆', mtsK(u, 7, 7.5));

  let lx = 1460, ly = 300, handleUp = false;
  if (u >= 2 && u < 4) {
    const k = mtsK(u, 2, 4); lx = mtsLerp(1460, 636, k); ly = mtsLerp(300, 516, k);
  } else if (u >= 4 && u < 5.5) { lx = 636; ly = 516; }
  else if (u >= 5.5 && u < 7.5) {
    const k = mtsK(u, 5.5, 7.5); lx = mtsLerp(636, 757, k); ly = mtsLerp(516, 538, k);
  } else if (u >= 7.5 && u < 9) { lx = 757; ly = 538; }
  else if (u >= 9) {
    const k = mtsK(u, 9, 9.8); lx = mtsLerp(757, 1460, k); ly = mtsLerp(538, 780, k); handleUp = true;
  }
  g += mtsLens(lx, ly, 55, mtsK(u, 0.5, 0.9), false, handleUp);
  return mtsPaint(g);
}

function s4(u) {
  let g = head(u, '骨架', '再分析原因') + mtsMetaphorTag();
  g += mtsStageTitle(u, '分析原因');
  g += mtsDesk(680, 560, 0, 0, 0, 1.1, mtsK(u, 0.2, 0.8));
  g += mtsArrow(636, 500, 1150, 415, mtsK(u, 2, 3));
  g += mtsTag(1160, 383, 300, '沒固定位置', mtsK(u, 3, 3.5));
  g += mtsArrow(757, 530, 1150, 595, mtsK(u, 6, 7));
  g += mtsTag(1160, 563, 300, '用完沒放回', mtsK(u, 7, 7.5));
  return mtsPaint(g);
}

function s5(u) {
  let g = head(u, '骨架', '想出方法') + mtsMetaphorTag();
  g += mtsStageTitle(u, '解決問題');
  g += mtsDesk(560, 560, mtsK(u, 1.8, 3.3), mtsK(u, 5.8, 7.3), mtsK(u, 9.8, 11.3), 1.1, mtsK(u, 0.2, 0.8));
  const rows = [
    { y: 380, flagY: 340, start: 1, flag: '首先', phrase: '課本立起來' },
    { y: 520, flagY: 480, start: 5, flag: '其次', phrase: '筆放進筆筒' },
    { y: 660, flagY: 620, start: 9, flag: '最後', phrase: '紙屑丟掉' },
  ];
  for (const row of rows) {
    const drop = mtsK(u, row.start, row.start + 0.45);
    const fy = row.flagY - 22 * (1 - drop);
    g += mtsFlag(1000, fy, row.flag, drop);
    g += mtsPhrase(1140, row.y - 7, row.phrase, 30, C.chalk, mtsK(u, row.start + 0.6, row.start + 0.9));
  }
  return mtsPaint(g);
}

function s6(u) {
  let g = head(u, '骨架', '最後說結論') + mtsMetaphorTag();
  g += mtsStageTitle(u, '結論：說好處');
  g += mtsDesk(560, 560, 1, 1, 1, 1.1, mtsK(u, 0.2, 0.8));
  const card1 = mtsK(u, 2, 2.5), card2 = mtsK(u, 4, 4.5);
  g += mtsTag(1100, 330, 300, '找得到東西', card1) + mtsCheck(1070, 362, 0.45, card1);
  g += mtsTag(1100, 450, 300, '寫功課方便', card2) + mtsCheck(1070, 482, 0.45, card2);
  const heart = mtsK(u, 5.5, 6);
  g += mtsHeart(1250, 640, 0.9, heart);
  const k1 = mtsK(u, 6.5, 7), k2 = mtsK(u, 7, 7.5);
  if (u >= 7.5) g += mtsCross(1250, 640, 23, 1);
  else {
    if (u >= 6.5) g += mtsLine(1227, 617, mtsLerp(1227, 1273, k1), mtsLerp(617, 663, k1), MTS_RED, 10, 1);
    if (u >= 7) g += mtsLine(1273, 617, mtsLerp(1273, 1227, k2), mtsLerp(617, 663, k2), MTS_RED, 10, 1);
  }
  g += mtsPhrase(1250, 760, '不寫心情', 30, C.chalk, mtsK(u, 7.5, 8.3), 'middle');
  return mtsPaint(g);
}

function s7(u) {
  let g = head(u, '骨架', '四段各寫什麼') + mtsMetaphorTag();
  const xs = [140, 360, 780, 1200], ws = [200, 400, 400, 200];
  const labels = ['書桌怎麼了', '為什麼會亂', '怎麼整理', '整理的好處'];
  const blockStarts = [0.2, 0.55, 0.9, 1.25];
  for (let i = 0; i < 4; i++) {
    const drop = mtsK(u, blockStarts[i], blockStarts[i] + 0.55);
    g += mtsBlock(xs[i], 250 - 44 * (1 - drop), ws[i], 210, MTS_BLUE, drop, false);
    g += mtsWorkTag(xs[i], 300, ws[i], labels[i], mtsK(u, 1, 2.5));
  }
  const iconStarts = [2.5, 3.25, 4, 4.5];
  g += mtsDesk(227, 405, 0, 0, 0, 0.26, mtsK(u, iconStarts[0], iconStarts[0] + 0.5));
  g += mtsQuestionArrow(560, 395, 0.8, mtsK(u, iconStarts[1], iconStarts[1] + 0.5));
  const flagOp = mtsK(u, iconStarts[2], iconStarts[2] + 0.5);
  g += mtsMiniFlag(900, 370, flagOp) + mtsMiniFlag(980, 370, flagOp) + mtsMiniFlag(1060, 370, flagOp);
  g += mtsDesk(1287, 405, 1, 1, 1, 0.26, mtsK(u, iconStarts[3], iconStarts[3] + 0.5));

  const phraseStarts = [5, 5.8, 6.6, 7.2];
  const phraseOps = phraseStarts.map((start) => mtsK(u, start, start + 0.6));
  g += mtsPhrase(240, 510, '書亂堆', 30, C.yellow, phraseOps[0], 'middle');
  g += mtsPhrase(240, 552, '找不到筆', 30, C.yellow, phraseOps[0], 'middle');
  g += mtsPhrase(560, 510, '沒固定位置', 30, C.yellow, phraseOps[1], 'middle');
  g += mtsPhrase(560, 552, '用完沒放回', 30, C.yellow, phraseOps[1], 'middle');
  g += mtsPhrase(980, 510, '首先其次最後', 30, C.yellow, phraseOps[2], 'middle');
  g += mtsPhrase(1300, 510, '找得到東西', 30, C.yellow, phraseOps[3], 'middle');
  return mtsPaint(g);
}

function s8(u) {
  let g = head(u, '出處', '講義也這樣排') + mtsMetaphorTag();
  g += mtsStageTitle(u, '講義的四段');
  const left = mtsK(u, 0.5, 1.5);
  g += mtsCardFrame(160, 290, 520, 480, left, false, C.chalk);
  g += mtsLabel(420, 340, '〈比讀書更重要的事〉', 30, C.yellow, mtsK(u, 1.5, 2));
  const rows = [
    { y: 420, text: '提出問題', start: 1.5 },
    { y: 520, text: '分析問題', start: 2.1 },
    { y: 620, text: '解決問題', start: 2.7 },
    { y: 720, text: '結論', start: 3.3 },
  ];
  for (const row of rows) g += mtsPhrase(200, row.y, row.text, 34, C.chalk, mtsK(u, row.start, row.start + 0.45));
  g += mtsPhrase(380, 620, '首先 其次 最後', 30, C.yellow, mtsK(u, 4.5, 5));

  const cardYs = [378, 478, 578, 678];
  const work = ['書桌怎麼了', '為什麼會亂', '怎麼整理', '整理的好處'];
  for (let i = 0; i < 4; i++) {
    const op = mtsK(u, 5 + i * 0.5, 5.5 + i * 0.5);
    g += mtsCardFrame(1000, cardYs[i], 320, 64, op, false, C.chalk);
    g += mtsWorkTag(1000, cardYs[i] + 42, 320, work[i], op);
  }
  const arrowStarts = [7.5, 8.25, 9, 9.75];
  for (let i = 0; i < 4; i++) g += mtsArrow(690, rows[i].y - 12, 990, cardYs[i] + 32, mtsK(u, arrowStarts[i], arrowStarts[i] + 0.6));
  return mtsPaint(g);
}

function s9(u) {
  let g = head(u, '練習', '換你排骨架') + mtsMetaphorTag();
  const title = mtsK(u, 0.2, 0.8);
  g += mtsCardFrame(620, 200, 360, 72, title, false, C.yellow);
  g += mtsLabel(800, 247, '〈掃地的方式〉', 40, C.yellow, title);
  const xs = [140, 360, 780, 1200], ws = [200, 400, 400, 200];
  const labels = ['地板怎麼了', '為什麼會髒', '怎麼掃地', '掃完的好處'];
  const starts = [0.6, 1.1, 1.6, 2.1];
  const flashStarts = [6, 7, 8, 9];
  for (let i = 0; i < 4; i++) {
    const op = mtsK(u, starts[i], starts[i] + 0.6);
    const y = 320 + 38 * (1 - op);
    g += mtsBlock(xs[i], y, ws[i], 200, MTS_BLUE, op, true);
    const flash = mtsFlash(u, flashStarts[i]);
    if (flash > 0.01) g += `<rect x="${xs[i] + 5}" y="325" width="${ws[i] - 10}" height="190" rx="11" fill="rgba(242,193,78,${(0.5 * flash).toFixed(3)})"/>`;
    g += mtsWorkTag(xs[i], 385, ws[i], labels[i], op);
  }
  const flagXs = [815, 935, 1055];
  const flagLabels = ['首先', '其次', '最後'];
  const flagStarts = [3.5, 3.8, 4.1];
  for (let i = 0; i < 3; i++) {
    const op = mtsK(u, flagStarts[i], flagStarts[i] + 0.4);
    const flash = mtsFlash(u, 10 + i * 0.7);
    g += mtsFlag(flagXs[i], 430, flagLabels[i], op, true, flash, 100, 40, 60);
  }
  return mtsPaint(g);
}
