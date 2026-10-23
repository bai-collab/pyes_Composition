// 六年級記敘文（寫人，進階）第一集：場景只由 u（段內秒數）決定。
const META = {
  title: '中間每一段，都寫那個「重點」',
  subtitle: '9 段・約 2 分鐘・六年級記敘文（寫人）第一集',
  ariaLabel: '以範圍框、放大鏡、磁鐵和四段積木，說明六年級寫人文章如何依題目重點安排四段骨架。',
  note: '出處：楊裕貿研習講義；記人學習單。「積木、工作牌、放大鏡、範圍框、星星、磁鐵、翻面」是視覺比喻；示範句、短語與人物（姊姊）依講義結構自編。鍵盤操作：空白鍵播放／暫停，左右方向鍵切換段落，F 鍵全螢幕。畫面只由時間決定。',
  works: [],
};

const PFS_BLUE = '#7fb6d9';
const PFS_ORANGE = '#e8875b';
const PFS_RED = '#d9605a';
const PFS_GREEN = '#8fd18f';
const PFS_SKIN = '#f0d9bd';
const PFS_BROWN = '#66513e';
const PFS_X = [140, 365, 805, 1245];
const PFS_W = [215, 430, 430, 215];
const PFS_COLORS = [PFS_BLUE, PFS_BLUE, PFS_BLUE, PFS_ORANGE];
const pfsK = (u, a, b) => ease(P(u, a, b));
const pfsO = (v) => Math.max(0, Math.min(1, Number(v) || 0)).toFixed(3);
const pfsN = (v) => Number(v).toFixed(1);

function pfsTag(op = 1) {
  return `<g opacity="${pfsO(op)}">${box(1375, 56, 165, 60, PFS_ORANGE, 1, C.deep)}${txt(1457, 98, '比喻', { a: 'middle', s: 30, w: 1, f: PFS_ORANGE })}</g>`;
}

function pfsLabel(cx, y, value, size = 30, color = C.chalk, op = 1) {
  if (op <= 0.001) return '';
  return txt(cx, y, value, { a: 'middle', s: size, w: 1, f: color, o: op });
}

function pfsTextByChar(value, cx, y, size, color = C.chalk, op = 1) {
  const chars = Array.from(value);
  return chars.map((ch, i) => txt(cx + (i - (chars.length - 1) / 2) * size, y, ch, {
    a: 'middle', s: size, w: 1, f: color, o: op,
  })).join('');
}

function pfsLine(x1, y1, x2, y2, color = C.chalk, width = 5, op = 1, dash = '') {
  if (op <= 0.001) return '';
  return `<line x1="${pfsN(x1)}" y1="${pfsN(y1)}" x2="${pfsN(x2)}" y2="${pfsN(y2)}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" opacity="${pfsO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function pfsBlock(x, y, w, h, color, op = 1, dashed = false) {
  if (op <= 0.001 || w <= 2 || h <= 2) return '';
  if (dashed) return `<g opacity="${pfsO(op)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="rgba(239,233,216,.012)" stroke="${color}" stroke-width="5" stroke-dasharray="14 10"/></g>`;
  let g = `<g opacity="${pfsO(op)}">`;
  const n = Math.max(2, Math.floor(w / 130));
  for (let i = 0; i < n; i++) {
    const cx = x + w * (i + 0.5) / n;
    g += `<rect x="${pfsN(cx - 20)}" y="${pfsN(y - 11)}" width="40" height="13" rx="6" fill="${color}"/>`;
  }
  return g + `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${color}" fill-opacity=".22" stroke="${C.chalk}" stroke-width="4"/></g>`;
}

function pfsStar(cx, cy, r, op = 1, dashed = false) {
  if (op <= 0.01 || r <= 1) return '';
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5;
    const rr = i % 2 ? r * 0.46 : r;
    pts.push(`${pfsN(cx + Math.cos(a) * rr)},${pfsN(cy + Math.sin(a) * rr)}`);
  }
  return `<polygon points="${pts.join(' ')}" fill="${dashed ? 'none' : 'rgba(242,193,78,.3)'}" stroke="${C.yellow}" stroke-width="5" stroke-linejoin="round" opacity="${pfsO(op)}"${dashed ? ' stroke-dasharray="8 7"' : ''}/>`;
}

function pfsHeart(cx, cy, scale = 1, op = 1) {
  if (op <= 0.01 || scale <= 0.01) return '';
  return `<path transform="translate(${pfsN(cx)} ${pfsN(cy)}) scale(${pfsN(scale)})" d="M0 38 C-13 21 -48 -2 -48 -24 C-48 -51 -15 -55 0 -31 C15 -55 48 -51 48 -24 C48 -2 13 21 0 38Z" fill="rgba(232,135,91,.22)" stroke="${PFS_ORANGE}" stroke-width="6" opacity="${pfsO(op)}"/>`;
}

function pfsLens(cx, cy, r = 45, op = 1, dashed = false, handleUp = false) {
  if (op <= 0.01 || r <= 1) return '';
  const dash = dashed ? '11 9' : '';
  const sy = handleUp ? -1 : 1;
  return `<g opacity="${pfsO(op)}"><circle cx="${pfsN(cx)}" cy="${pfsN(cy)}" r="${pfsN(r)}" fill="rgba(242,193,78,.045)" stroke="${C.yellow}" stroke-width="8"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<path d="M${pfsN(cx + r * 0.68)} ${pfsN(cy + sy * r * 0.68)} L${pfsN(cx + r * 1.28)} ${pfsN(cy + sy * r * 1.28)}" stroke="${C.yellow}" stroke-width="17" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<path d="M${pfsN(cx + r * 0.8)} ${pfsN(cy + sy * r * 0.8)} L${pfsN(cx + r * 1.26)} ${pfsN(cy + sy * r * 1.26)}" stroke="${C.chalk}" stroke-width="4" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/></g>`;
}

function pfsCardFrame(x, y, w, h, op = 1, dashed = false, stroke = C.chalk) {
  if (op <= 0.001) return '';
  if (dashed) return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="rgba(239,233,216,.012)" stroke="${stroke}" stroke-width="4" stroke-dasharray="13 9" opacity="${pfsO(op)}"/>`;
  return `<g opacity="${pfsO(op)}">${box(x, y, w, h, stroke, 1, C.deep)}</g>`;
}

function pfsPonytail(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${pfsN(cx)} ${pfsN(cy)}) scale(${pfsN(scale)})" opacity="${pfsO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M-39 -13 Q-55 -40 -37 -63 Q-17 -86 13 -73 Q37 -62 37 -34 L53 -19 L38 -7 Q35 21 12 34 L10 52 L-23 52 L-20 31 Q-45 15 -39 -13Z" fill="rgba(240,217,189,.24)" stroke="${C.chalk}" stroke-width="5"/>` +
    `<path d="M-34 -39 Q-18 -78 17 -66 Q39 -58 39 -32 Q15 -48 -2 -45 Q-18 -42 -34 -30Z" fill="${PFS_BROWN}" stroke="${C.chalk}" stroke-width="4"/>` +
    `<path d="M36 -49 Q63 -39 57 -15 Q52 5 37 13" fill="none" stroke="${PFS_BROWN}" stroke-width="13"/><path d="M40 -45 Q64 -37 57 -16" fill="none" stroke="${C.chalk}" stroke-width="3"/>` +
    `<path d="M-16 54 Q-7 70 5 54 M5 54 Q14 70 24 54" fill="none" stroke="${C.chalk}" stroke-width="5"/>` +
    `<circle cx="17" cy="-15" r="3.5" fill="${C.chalk}"/><path d="M28 -2 Q35 2 37 -2" fill="none" stroke="${PFS_BROWN}" stroke-width="3"/></g>`;
}

function pfsBrush(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${pfsN(cx)} ${pfsN(cy)}) scale(${pfsN(scale)})" opacity="${pfsO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M-45 43 Q-26 19 -7 1 L35 -43 Q43 -51 51 -43 Q58 -35 50 -27 L8 17 Q-10 36 -35 52Z" fill="rgba(127,182,217,.24)" stroke="${C.chalk}" stroke-width="5"/>` +
    `<path d="M-45 43 L-35 52 L-56 61Z" fill="${PFS_ORANGE}" stroke="${C.chalk}" stroke-width="4"/><path d="M-4 5 L8 17 M33 -41 L47 -27" stroke="${PFS_BLUE}" stroke-width="4"/>` +
    `<path d="M-56 -44 Q-36 -53 -17 -44 M-53 -33 Q-36 -40 -22 -33" fill="none" stroke="${C.yellow}" stroke-width="5"/></g>`;
}

function pfsStormWindow(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${pfsN(cx)} ${pfsN(cy)}) scale(${pfsN(scale)})" opacity="${pfsO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<rect x="-48" y="-46" width="82" height="88" rx="3" fill="rgba(127,182,217,.08)" stroke="${C.chalk}" stroke-width="5"/><path d="M-7 -44 V40 M-46 -1 H32" fill="none" stroke="${C.chalk}" stroke-width="4"/>` +
    `<path d="M8 -32 L-5 -8 L9 -8 L-3 18 L20 -11 L6 -11 L18 -32Z" fill="${C.yellow}" stroke="${C.yellow}" stroke-width="3"/>` +
    `<g transform="rotate(-30 52 34)"><path d="M36 27 L8 14 L8 56 L36 41Z" fill="rgba(242,193,78,.35)" stroke="none"/>` +
    `<rect x="44" y="27" width="30" height="14" rx="4" fill="${PFS_BLUE}" stroke="${C.chalk}" stroke-width="3"/><rect x="35" y="23" width="10" height="22" rx="2" fill="${C.chalk}" stroke="${C.chalk}" stroke-width="2"/></g></g>`;
}

function pfsClimb(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${pfsN(cx)} ${pfsN(cy)}) scale(${pfsN(scale)})" opacity="${pfsO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M-52 48 L-37 -47 L44 -47 L57 48Z" fill="rgba(127,182,217,.08)" stroke="${C.chalk}" stroke-width="5"/>` +
    `<path d="M-25 20 L-11 9 L0 23 M25 -19 L37 -29 M-35 -23 L-27 -31" fill="none" stroke="${PFS_ORANGE}" stroke-width="9" stroke-linecap="round"/>` +
    `<circle cx="-9" cy="-22" r="9" fill="${PFS_SKIN}" stroke="${C.chalk}" stroke-width="3"/><path d="M-8 -12 L5 4 L-1 20 M2 2 L18 -6 M0 19 L-15 33 M0 19 L15 30" fill="none" stroke="${C.chalk}" stroke-width="6" stroke-linecap="round"/>` +
    `<path d="M-16 36 L18 36" fill="none" stroke="${C.dim}" stroke-width="3"/></g>`;
}

function pfsMagnet(cx, cy, scale = 1, op = 1, label = '', dashed = false) {
  if (op <= 0.001) return '';
  if (dashed) return `<g transform="translate(${pfsN(cx)} ${pfsN(cy)}) scale(${pfsN(scale)})" opacity="${pfsO(op)}">` +
    `<path d="M-94 -55 H-70 V12 C-70 44 -38 56 0 56 C38 56 70 44 70 12 V-55 H94 V12 C94 62 50 80 0 80 C-50 80 -94 62 -94 12Z" fill="rgba(239,233,216,.012)" stroke="${C.chalk}" stroke-width="5" stroke-dasharray="13 9" stroke-linejoin="round"/></g>`;
  return `<g transform="translate(${pfsN(cx)} ${pfsN(cy)}) scale(${pfsN(scale)})" opacity="${pfsO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M-82 -55 V12 C-82 52 -42 68 0 68 C42 68 82 52 82 12 V-55" fill="none" stroke="${C.chalk}" stroke-width="24"/>` +
    `<path d="M-82 -54 V12 C-82 52 -42 66 0 66" fill="none" stroke="${PFS_RED}" stroke-width="16"/><path d="M0 66 C42 66 82 52 82 12 V-54" fill="none" stroke="${PFS_BLUE}" stroke-width="16"/>` +
    `<path d="M-94 -55 H-70 M70 -55 H94" stroke="${C.chalk}" stroke-width="8"/><path d="M-91 -55 H-71" stroke="${PFS_RED}" stroke-width="14"/><path d="M71 -55 H91" stroke="${PFS_BLUE}" stroke-width="14"/>` +
    (label ? txt(0, 19, label, { a: 'middle', s: 36, w: 1, f: C.yellow }) : '') + '</g>';
}

function pfsAsk(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${pfsN(cx)} ${pfsN(cy)}) scale(${pfsN(scale)})" opacity="${pfsO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M-22 35 Q-48 23 -44 -7 Q-42 -45 -7 -49 Q20 -50 31 -28 L39 -16 L29 -8 Q30 13 10 25 L9 38Z" fill="rgba(240,217,189,.2)" stroke="${C.chalk}" stroke-width="5"/>` +
    `<circle cx="9" cy="-17" r="3" fill="${C.chalk}"/><path d="M-5 -22 Q2 -35 14 -28 Q24 -21 13 -12 Q7 -8 7 0" fill="none" stroke="${C.yellow}" stroke-width="5"/><circle cx="7" cy="10" r="3.5" fill="${C.yellow}"/></g>`;
}

function pfsCheck(cx, cy, scale = 1, op = 1) {
  if (op <= 0.01) return '';
  return `<path d="M${cx - 30 * scale} ${cy} L${cx - 8 * scale} ${cy + 23 * scale} L${cx + 37 * scale} ${cy - 30 * scale}" fill="none" stroke="${PFS_GREEN}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" opacity="${pfsO(op)}"/>`;
}

function pfsCross(cx, cy, size = 24, op = 1) {
  if (op <= 0.01) return '';
  return `<g opacity="${pfsO(op)}" stroke="${PFS_RED}" stroke-width="10" stroke-linecap="round"><line x1="${cx - size}" y1="${cy - size}" x2="${cx + size}" y2="${cy + size}"/><line x1="${cx + size}" y1="${cy - size}" x2="${cx - size}" y2="${cy + size}"/></g>`;
}

function pfsMaterialIcon(kind, cx, cy, scale = 1, op = 1) {
  if (kind === 0) return pfsPonytail(cx, cy, scale * 0.72, op);
  if (kind === 1) return pfsBrush(cx, cy, scale * 0.72, op);
  if (kind === 2) return pfsStormWindow(cx, cy, scale * 0.72, op);
  return pfsClimb(cx, cy, scale * 0.72, op);
}

function pfsMaterialCard(kind, x, y, op = 1) {
  const cx = x + 130;
  return `<g opacity="${pfsO(op)}">${box(x, y, 260, 170, C.chalk, 1, C.deep)}` +
    pfsMaterialIcon(kind, cx, y + 70, 1, 1) +
    txt(cx, y + 140, ['綁馬尾', '愛畫畫', '颱風夜關窗', '攀岩爬到頂'][kind], { a: 'middle', s: 30, w: 1, f: C.chalk }) + '</g>';
}

function pfsSmallCardCopy(kind, cx, cy, op = 1) {
  if (op <= 0.001) return '';
  return `<g transform="translate(${pfsN(cx)} ${pfsN(cy)})" opacity="${pfsO(op)}">` +
    `${box(-100, -65, 200, 130, C.chalk, 1, C.deep)}${pfsMaterialIcon(kind, 0, -20, 0.62, 1)}` +
    txt(0, 48,['綁馬尾', '愛畫畫', '颱風夜關窗', '攀岩爬到頂'][kind], { a: 'middle', s: 30, w: 1, f: C.chalk }) + '</g>';
}

function pfsTextBlock(x, y, w, label, size, color, op = 1) {
  return pfsBlock(x, y, w, 170, color, op) + pfsLabel(x + w / 2, y + 60, label, size, C.chalk, op);
}

function pfsBeam(op = 1) {
  if (op <= 0.01) return '';
  return `<polygon points="770,290 830,290 1235,330 365,330" fill="rgba(242,193,78,.16)" opacity="${pfsO(op)}"/>`;
}

function pfsFlash(u, start) {
  const inK = pfsK(u, start, start + 0.1);
  const outK = 1 - pfsK(u, start + 0.4, start + 0.5);
  return Math.max(0, Math.min(inK, outK));
}

function pfsPaint(svg) {
  return svg.replace(/font-size="24"/g, 'font-size="26"')
    .replace(/<text ([^>]*?)fill="([^"]+)"/g, '<text $1style="fill:$2" fill="$2"');
}

function s1(u) {
  let g = head(u, '開場', '再寫一次人') + pfsTag(1);
  const oldFade = 1 - 0.5 * pfsK(u, 3.5, 4.5);
  g += `<g opacity="${pfsO(oldFade)}">${box(120, 230, 440, 70, C.chalk, 1, C.deep)}`;
  g += pfsLabel(340, 275, '〈我的老師〉', 36, C.chalk);
  const oldX = [120, 206, 372, 538], oldW = [80, 160, 160, 80];
  const oldNames = ['外表', '個性', '興趣', '感想'];
  oldNames.forEach((label, i) => {
    const k = pfsK(u, 0.3 + i * 0.4, 0.75 + i * 0.4);
    g += pfsBlock(oldX[i], 320, oldW[i], 70, PFS_BLUE, k);
    g += pfsLabel(oldX[i] + oldW[i] / 2, 365, label, 30, C.chalk, k);
  });
  g += pfsLabel(340, 440, '三年級', 34, C.chalk);
  g += '</g>';
  const cardK = pfsK(u, 4.0, 5.5);
  const shift = 300 * (1 - cardK);
  g += `<g opacity="${pfsO(cardK)}" transform="translate(${pfsN(shift)} 0)">${box(760, 300, 680, 130, C.chalk, 1, C.deep)}`;
  g += pfsLabel(1100, 385, '〈一個勇敢的人〉', 56, C.yellow) + '</g>';
  g += pfsLabel(1100, 490, '六年級', 36, C.chalk, pfsK(u, 5.5, 6.0));
  const ak = pfsK(u, 5.5, 6.5);
  if (ak > 0.01) g += arrow(580, 300, 740, 350, C.chalk, 1, false, ak);
  return pfsPaint(g);
}

function s2(u) {
  let g = head(u, '審題', '題目多了重點') + pfsTag(1);
  const cardOp = pfsK(u, 0.2, 0.5);
  g += pfsCardFrame(400, 210, 800, 130, cardOp);
  g += pfsTextByChar('〈一個勇敢的人〉', 800, 300, 60, C.yellow, cardOp);
  const rangeK = pfsK(u, 1.5, 3.0);
  if (rangeK > 0.01) {
    g += `<rect x="620" y="238" width="120" height="80" rx="8" fill="none" stroke="${PFS_BLUE}" stroke-width="5" stroke-dasharray="12 9" opacity="${pfsO(rangeK)}"/>`;
    g += `<rect x="920" y="238" width="60" height="80" rx="8" fill="none" stroke="${PFS_BLUE}" stroke-width="5" stroke-dasharray="12 9" opacity="${pfsO(rangeK)}"/>`;
    g += `<path d="M680 318 Q815 426 950 318" fill="none" stroke="${PFS_BLUE}" stroke-width="4" stroke-dasharray="10 8" opacity="${pfsO(rangeK)}"/>`;
  }
  g += pfsLabel(680, 420, '範圍', 36, PFS_BLUE, rangeK);
  const lensK = pfsK(u, 4.0, 6.0);
  const lensX = 1400 + (800 - 1400) * lensK;
  const lensY = 450 + (280 - 450) * lensK;
  g += pfsLens(lensX, lensY - 8 * lensK, 60, lensK, false, true);
  const focusK = pfsK(u, 4.0, 6.0);
  g += pfsLabel(1290, 290, '重點', 36, C.yellow, focusK);
  if (focusK > 0.01) g += arrow(1245, 266, 890, 204, C.yellow, 1, false, focusK);
  const card1 = pfsK(u, 7.0, 7.5), card2 = pfsK(u, 7.5, 8.0);
  g += pfsCardFrame(300, 560, 440, 100, card1);
  g += pfsLabel(520, 620, '〈最感謝的人〉', 44, C.chalk, card1);
  g += pfsCardFrame(860, 560, 440, 100, card2);
  g += pfsLabel(1080, 620, '〈最難忘的人〉', 44, C.chalk, card2);
  const under1 = pfsK(u, 8.5, 9.2), under2 = pfsK(u, 10.0, 10.7);
  if (under1 > 0.01) {
    g += underline(410, 542, 637, under1, C.yellow, 1);
    g += pfsLens(476, 540, 34, under1);
  }
  if (under2 > 0.01) {
    g += underline(970, 1102, 637, under2, C.yellow, 1);
    g += pfsLens(1036, 540, 34, under2);
  }
  return pfsPaint(g);
}

function s3(u) {
  let g = head(u, '骨架', '四段各寫什麼') + pfsTag(1);
  const drop = [];
  for (let i = 0; i < 4; i++) {
    const k = pfsK(u, 0.3 + i * 0.65, 0.7 + i * 0.65);
    drop.push(k);
    const y = 180 + 150 * k - Math.sin(Math.PI * k) * 10;
    g += pfsBlock(PFS_X[i], y, PFS_W[i], 170, PFS_COLORS[i], k);
  }
  const beamK = pfsK(u, 4.3, 5.3);
  g += pfsBeam(beamK);
  if (beamK > 0.01) {
    g += `<rect x="365" y="330" width="430" height="170" rx="14" fill="rgba(242,193,78,.09)" opacity="${pfsO(beamK)}"/>`;
    g += `<rect x="805" y="330" width="430" height="170" rx="14" fill="rgba(242,193,78,.09)" opacity="${pfsO(beamK)}"/>`;
  }
  const whoK = pfsK(u, 3.0, 3.8);
  g += pfsLabel(247, 390, '她是誰', 36, C.chalk, whoK);
  g += pfsAsk(247, 450, 0.6, whoK);
  g += pfsLabel(247, 545, '長什麼樣子', 30, C.chalk, whoK);
  const reasonK = pfsK(u, 5.5, 6.5);
  g += pfsLabel(580, 400, '為何說她勇敢', 36, C.chalk, reasonK);
  g += pfsLabel(1020, 400, '為何說她勇敢', 36, C.chalk, reasonK);
  g += pfsStar(580, 460, 30, reasonK);
  g += pfsStar(1020, 460, 30, reasonK);
  const feelK = pfsK(u, 7.5, 8.3);
  g += pfsLabel(1352, 400, '感想', 36, C.chalk, feelK);
  g += pfsHeart(1352, 460, 0.72, feelK);
  g += pfsLens(800, 245, 45, beamK);
  return pfsPaint(g);
}

function s4(u) {
  let g = head(u, '骨架', '中間段換內容') + pfsTag(1);
  const old = ['外表', '個性', '興趣', '感想'];
  const topY = 220, topH = 110, bottomY = 470, bottomH = 150;
  for (let i = 0; i < 4; i++) {
    const k = pfsK(u, 0.3 + i * 0.22, 0.78 + i * 0.22);
    g += pfsBlock(PFS_X[i], topY, PFS_W[i], topH, PFS_COLORS[i], k);
    g += pfsLabel(PFS_X[i] + PFS_W[i] / 2, 285, old[i], 36, C.chalk, k);
  }
  for (let i = 0; i < 4; i++) {
    const k = pfsK(u, 1.5 + i * 0.22, 1.9 + i * 0.22);
    const y = 220 + (bottomY - 220) * k - Math.sin(Math.PI * k) * 8;
    g += pfsBlock(PFS_X[i], y, PFS_W[i], bottomH, PFS_COLORS[i], k);
    if (i === 3) {
      g += pfsLabel(PFS_X[i] + PFS_W[i] / 2, y + 90, '感想', 36, C.chalk, k);
      continue;
    }
    const flipRange = i === 1 ? [4.0, 5.0] : i === 2 ? [5.5, 6.5] : i === 0 ? [7.5, 8.5] : [20, 21];
    const flip = pfsK(u, flipRange[0], flipRange[1]);
    const sx = Math.max(0.025, Math.abs(1 - 2 * flip));
    const value = i === 1 ? (flip >= 0.5 ? '唱歌可愛' : '個性') : i === 2 ? (flip >= 0.5 ? '睡覺可愛' : '興趣') : (flip >= 0.5 ? '妹妹簡介' : '外表');
    const size = i === 0 && flip >= 0.5 ? 34 : 36;
    const cx = PFS_X[i] + PFS_W[i] / 2;
    const op = k;
    g += `<g transform="translate(${cx} 0) scale(${sx.toFixed(3)} 1) translate(${-cx} 0)">`;
    g += pfsLabel(cx, y + 88, value, size, C.chalk, op) + '</g>';
    if (i > 0) g += pfsHeart(cx, y + 120, 0.34, pfsK(u, flipRange[1] - 0.15, flipRange[1] + 0.2));
  }
  g += pfsLabel(800, 720, '〈可愛的妹妹〉', 40, C.yellow, pfsK(u, 2.0, 2.8));
  return pfsPaint(g);
}

function s5(u) {
  let g = head(u, '選材', '用重點挑材料') + pfsTag(1);
  const starts = [130, 470, 810, 1150];
  const centers = [260, 600, 940, 1280];
  const cardY = 290;
  for (let i = 0; i < 4; i++) {
    const appear = pfsK(u, 0.3 + i * 0.35, 0.75 + i * 0.35);
    // 被取走的卡留下虛線空位；沒被挑中的「愛畫畫」原地變淡
    const moved = i === 2 || i === 3 ? pfsK(u, 5.7, 6.5) : i === 0 ? pfsK(u, 7.5, 9.0) : 0;
    const keepOp = i === 1 ? 1 - 0.55 * pfsK(u, 9.0, 10.0) : 1 - moved;
    g += pfsMaterialCard(i, starts[i], cardY, appear * keepOp);
    if (moved > 0.01) g += pfsCardFrame(starts[i], cardY, 260, 170, appear * moved * 0.6, true);
  }
  const magnetK = pfsK(u, 3.0, 5.0);
  const magnetX = 1500 + (1110 - 1500) * magnetK;
  g += pfsMagnet(magnetX, 650, 1, magnetK, '勇敢');
  const c3 = pfsK(u, 5.0, 6.5), c4 = pfsK(u, 5.0, 6.5);
  g += pfsSmallCardCopy(2, centers[2] + (1000 - centers[2]) * c3, 375 + (775 - 375) * c3, c3);
  g += pfsSmallCardCopy(3, centers[3] + (1220 - centers[3]) * c4, 375 + (775 - 375) * c4, c4);
  const roleK = pfsK(u, 7.0, 7.5);
  g += `<g opacity="${pfsO(roleK)}">${box(150, 600, 220, 70, C.chalk, 1, C.deep)}${pfsLabel(260, 646, '她是誰', 34, C.chalk)}</g>`;
  const c1 = pfsK(u, 7.5, 9.0);
  g += pfsSmallCardCopy(0, centers[0], 375 + (760 - 375) * c1, c1);
  return pfsPaint(g);
}

function s6(u) {
  let g = head(u, '骨架', '排成骨架') + pfsTag(1);
  const blockK = pfsK(u, 0.2, 1.0);
  for (let i = 0; i < 4; i++) {
    g += pfsBlock(PFS_X[i], 270, PFS_W[i], 200, PFS_COLORS[i], blockK);
  }
  const labelK = pfsK(u, 0.6, 1.5);
  ['她是誰', '為何說她勇敢', '為何說她勇敢', '感想'].forEach((label, i) => {
    g += pfsLabel(PFS_X[i] + PFS_W[i] / 2, 320, label, 36, C.chalk, labelK);
  });
  const iconK = pfsK(u, 1.5, 4.5);
  g += pfsPonytail(247, 400, 0.62, iconK);
  g += pfsStormWindow(580, 400, 0.72, iconK);
  g += pfsClimb(1020, 400, 0.76, iconK);
  g += pfsHeart(1352, 400, 0.48, iconK);
  const textK = pfsK(u, 4.5, 7.5);
  const rows = [
    [[247, 530, '讀六年級'], [247, 572, '綁著馬尾']],
    [[580, 530, '颱風夜關窗']],
    [[1020, 530, '怕高仍爬到頂']],
    [[1352, 530, '我要學她']],
  ];
  rows.forEach((items, i) => items.forEach(([x, y, text]) => g += pfsLabel(x, y, text, 30, C.yellow, textK)));
  const starK = pfsK(u, 8.0, 9.0);
  g += pfsStar(760, 290, 30, starK);
  g += pfsStar(1200, 290, 30, starK);
  return pfsPaint(g);
}

function s7(u) {
  let g = head(u, '檢查', '放大鏡檢查') + pfsTag(1);
  const titleK = pfsK(u, 0.2, 0.6);
  g += pfsCardFrame(560, 200, 480, 80, titleK);
  g += pfsTextByChar('〈一個勇敢的人〉', 800, 254, 40, C.chalk, titleK);
  const startCheck = pfsK(u, 2.0, 2.5);
  const zoomTarget = pfsLabel(1260, 245, '有寫到勇敢嗎', 34, C.yellow, titleK);
  g += zoomTarget;
  const cardXs = [120, 610, 1100], cardCenters = [310, 800, 1290];
  const phrases = ['停電她說不怕', '手抖還爬到頂', '她很會畫畫'];
  const kinds = [2, 3, 1];
  for (let i = 0; i < 3; i++) {
    const show = pfsK(u, 0.6 + i * 0.4, 1.2 + i * 0.4);
    const fade = i === 2 ? 1 - 0.55 * pfsK(u, 8.0, 8.5) : 1;
    g += pfsCardFrame(cardXs[i], 360, 380, 260, show * fade);
    g += pfsMaterialIcon(kinds[i], cardCenters[i], 440, 0.78, show * fade);
    g += pfsTextByChar(phrases[i], cardCenters[i], 570, 34, C.chalk, show * fade);
  }
  const firstK = pfsK(u, 2.5, 4.0), secondK = pfsK(u, 4.5, 6.0), thirdK = pfsK(u, 6.5, 7.2);
  const lensX1 = 800 + (378 - 800) * firstK, lensY1 = 245 + (528 - 245) * firstK;
  const lensX2 = 378 + (834 - 378) * secondK, lensY2 = 528;
  let lensX3;
  const search = pfsK(u, 7.2, 8.1);
  if (search < 0.5) lensX3 = 1360 + (1230 - 1360) * (search * 2);
  else lensX3 = 1230 + (1360 - 1230) * ((search - 0.5) * 2);
  const thirdTravelX = 834 + (1360 - 834) * thirdK;
  // 找完後移到卡片下方，不擋住短句
  const park = pfsK(u, 8.6, 9.4);
  const lensX = u < 4.5 ? lensX1 : u < 6.5 ? lensX2 : u < 7.2 ? thirdTravelX : lensX3 + (1180 - lensX3) * park;
  const lensY = u < 4.5 ? lensY1 : 528 + (770 - 528) * park;
  const lensOp = pfsK(u, 2.0, 2.2);
  g += pfsLens(lensX, lensY, 48, lensOp);
  const ul1 = pfsK(u, 2.5, 4.0), ul2 = pfsK(u, 4.5, 6.0);
  if (ul1 > 0.01) g += underline(344, 412, 583, ul1, C.yellow, 1);
  if (ul2 > 0.01) g += underline(766, 902, 583, ul2, C.yellow, 1);
  const good1 = pfsK(u, 3.6, 4.0), good2 = pfsK(u, 5.6, 6.0);
  g += pfsCheck(450, 400, 0.78, good1) + pfsStar(470, 450, 26, good1);
  g += pfsCheck(940, 400, 0.78, good2) + pfsStar(980, 450, 26, good2);
  const bad = pfsK(u, 8.0, 8.5);
  g += pfsCross(1400, 405, 25, bad);
  const resultK = pfsK(u, 9.0, 10.0);
  g += pfsLabel(310, 680, '文題相符', 36, C.yellow, resultK);
  g += pfsLabel(800, 680, '文題相符', 36, C.yellow, resultK);
  g += pfsLabel(1290, 680, '文題不符', 36, PFS_RED, resultK);
  return pfsPaint(g);
}

function s8(u) {
  let g = head(u, '結尾', '最後寫感情') + pfsTag(1);
  const blockK = pfsK(u, 0.2, 0.8);
  g += pfsBlock(300, 250, 1000, 240, PFS_ORANGE, blockK);
  g += pfsLabel(380, 290, '感想', 34, C.chalk, blockK);
  const sentence = '我要學姊姊，遇到困難也不怕。';
  const chars = Array.from(sentence);
  chars.forEach((ch, i) => {
    const appear = pfsK(u, 0.8 + i * 0.3, 1.2 + i * 0.3);
    g += pfsTextByChar(ch, 800 + (i - (chars.length - 1) / 2) * 36, 390, 36, C.yellow, appear);
  });
  const labels = ['感想', '讚美', '啟示'];
  const centers = [560, 800, 1040];
  for (let i = 0; i < 3; i++) {
    const appear = pfsK(u, 6.5 + i * 0.5, 7.0 + i * 0.5);
    const hi = i === 2 ? pfsK(u, 8.5, 9.5) : 0;
    g += `<circle cx="${centers[i]}" cy="640" r="60" fill="${hi > 0.01 ? `rgba(242,193,78,${(0.16 * hi).toFixed(3)})` : 'rgba(239,233,216,.025)'}" stroke="${hi > 0.01 ? C.yellow : C.chalk}" stroke-width="5" opacity="${pfsO(appear)}"/>`;
    g += pfsLabel(centers[i], 652, labels[i], 34, hi > 0.01 ? C.yellow : C.chalk, appear);
  }
  return pfsPaint(g);
}

function s9(u) {
  let g = head(u, '練習', '換你排骨架') + pfsTag(1);
  const topK = pfsK(u, 0.6, 4.0);
  const titleK = pfsK(u, 0.2, 0.7);
  g += pfsCardFrame(560, 200, 480, 80, titleK);
  g += pfsLabel(800, 252, '〈最感謝的人〉', 40, C.yellow, titleK);
  const rangeFlash = pfsFlash(u, 8.0);
  if (rangeFlash > 0.01) g += `<rect x="140" y="320" width="200" height="80" rx="8" fill="rgba(242,193,78,.16)" opacity="${pfsO(rangeFlash)}"/>`;
  g += `<rect x="140" y="320" width="200" height="80" rx="8" fill="none" stroke="${PFS_BLUE}" stroke-width="5" stroke-dasharray="12 9" opacity="${pfsO(topK)}"/>`;
  g += pfsLabel(240, 470, '範圍', 30, PFS_BLUE, topK);
  const lensFlash = pfsFlash(u, 8.45);
  if (lensFlash > 0.01) g += `<circle cx="470" cy="360" r="40" fill="rgba(242,193,78,.16)" opacity="${pfsO(lensFlash)}"/>`;
  g += pfsLens(470, 360, 40, topK, true);
  g += pfsLabel(470, 470, '重點', 30, C.yellow, topK);
  const magnetFlash = pfsFlash(u, 8.9);
  if (magnetFlash > 0.01) g += `<ellipse cx="760" cy="380" rx="82" ry="70" fill="rgba(242,193,78,.16)" opacity="${pfsO(magnetFlash)}"/>`;
  g += pfsMagnet(760, 380, 0.86, topK, '', true);
  const smallCards = [960, 1120, 1280];
  smallCards.forEach((x, i) => {
    const flash = pfsFlash(u, 9.35 + i * 0.45);
    if (flash > 0.01) g += `<rect x="${x}" y="320" width="130" height="90" rx="15" fill="rgba(242,193,78,.16)" opacity="${pfsO(flash)}"/>`;
    g += pfsCardFrame(x, 320, 130, 90, topK, true, C.chalk);
  });
  const blockK = pfsK(u, 4.0, 6.0);
  const roles = ['他是誰', '為何最感謝 ①', '為何最感謝 ②', '感想'];
  for (let i = 0; i < 4; i++) {
    const flash = pfsFlash(u, 10.7 + i * 0.45);
    if (flash > 0.01) g += `<rect x="${PFS_X[i]}" y="530" width="${PFS_W[i]}" height="150" rx="14" fill="rgba(242,193,78,.16)" opacity="${pfsO(flash)}"/>`;
    g += pfsBlock(PFS_X[i], 530, PFS_W[i], 150, PFS_COLORS[i], blockK, true);
    g += pfsLabel(PFS_X[i] + PFS_W[i] / 2, 600, roles[i], 34, C.chalk, blockK);
  }
  const stars = pfsK(u, 5.0, 6.0);
  g += pfsStar(760, 550, 26, stars, true);
  g += pfsStar(1200, 550, 26, stars, true);
  return pfsPaint(g);
}
