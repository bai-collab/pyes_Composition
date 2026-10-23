// 六年級記敘文（寫事，進階）第一集：場景只由段內 u（秒）決定。
const META = {
  title: '先放最特別的那一刻',
  subtitle: '9 段・約 2 分鐘・六年級記敘文（寫事）第一集',
  ariaLabel: '以範圍框、放大鏡、磁鐵、骨牌、照片與四段積木，說明六年級寫事文章如何先寫結果，再寫原因和經過，最後回到結果。',
  note: '出處：楊裕貿研習講義。「範圍框、放大鏡、磁鐵、骨牌、小鈴、照片、積木、工作牌、星星」是視覺比喻；示範句、短語與情節依講義結構自編。鍵盤操作：空白鍵播放／暫停，左右方向鍵切換段落，F 鍵全螢幕。畫面只由時間決定。',
  works: [],
};

const EFS_BLUE = '#7fb6d9';
const EFS_ORANGE = '#e8875b';
const EFS_RED = '#d9605a';
const EFS_GREEN = '#8fd18a';
const EFS_X = [140, 365, 805, 1245];
const EFS_W = [215, 430, 430, 215];
const EFS_COLORS = [EFS_BLUE, EFS_BLUE, EFS_BLUE, EFS_ORANGE];
const efsK = (u, a, b) => ease(P(u, a, b));
const efsO = (v) => Math.max(0, Math.min(1, Number(v) || 0)).toFixed(3);
const efsN = (v) => Number(v).toFixed(1);

function efsTag(op = 1) {
  return `<g opacity="${efsO(op)}">${box(1375, 56, 165, 60, EFS_ORANGE, 1, C.deep)}${txt(1457, 98, '比喻', { a: 'middle', s: 30, w: 1, f: EFS_ORANGE })}</g>`;
}

function efsLabel(cx, y, value, size = 30, color = C.chalk, op = 1) {
  if (op <= 0.001) return '';
  return txt(cx, y, value, { a: 'middle', s: size, w: 1, f: color, o: op });
}

function efsTextByChar(value, cx, y, size, color = C.chalk, op = 1) {
  const chars = Array.from(value);
  return chars.map((ch, i) => txt(cx + (i - (chars.length - 1) / 2) * size, y, ch, {
    a: 'middle', s: size, w: 1, f: color, o: op,
  })).join('');
}

function efsType(value, u, cx, y, size, color, start, end, op = 1) {
  if (u <= start) return '';
  const chars = Array.from(value);
  const count = Math.min(chars.length, Math.ceil(P(u, start, end) * chars.length));
  if (count <= 0) return '';
  return efsTextByChar(chars.slice(0, count).join(''), cx, y, size, color, op);
}

function efsLine(x1, y1, x2, y2, color = C.chalk, width = 5, op = 1, dash = '') {
  if (op <= 0.001) return '';
  return `<line x1="${efsN(x1)}" y1="${efsN(y1)}" x2="${efsN(x2)}" y2="${efsN(y2)}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" opacity="${efsO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function efsBlock(x, y, w, h, color, op = 1, dashed = false) {
  if (op <= 0.001 || w <= 2 || h <= 2) return '';
  if (dashed) return `<g opacity="${efsO(op)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="rgba(239,233,216,.012)" stroke="${color}" stroke-width="5" stroke-dasharray="14 10"/></g>`;
  let g = `<g opacity="${efsO(op)}">`;
  const n = Math.max(2, Math.floor(w / 130));
  for (let i = 0; i < n; i++) {
    const cx = x + w * (i + 0.5) / n;
    g += `<rect x="${efsN(cx - 20)}" y="${efsN(y - 11)}" width="40" height="13" rx="6" fill="${color}"/>`;
  }
  return g + `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${color}" fill-opacity=".22" stroke="${C.chalk}" stroke-width="4"/></g>`;
}

function efsCardFrame(x, y, w, h, op = 1, dashed = false, stroke = C.chalk) {
  if (op <= 0.001) return '';
  if (dashed) return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="rgba(239,233,216,.012)" stroke="${stroke}" stroke-width="4" stroke-dasharray="13 9" opacity="${efsO(op)}"/>`;
  return `<g opacity="${efsO(op)}">${box(x, y, w, h, stroke, 1, C.deep)}</g>`;
}

function efsStar(cx, cy, r, op = 1, dashed = false) {
  if (op <= 0.01 || r <= 1) return '';
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5;
    const rr = i % 2 ? r * 0.46 : r;
    pts.push(`${efsN(cx + Math.cos(a) * rr)},${efsN(cy + Math.sin(a) * rr)}`);
  }
  return `<polygon points="${pts.join(' ')}" fill="${dashed ? 'none' : 'rgba(242,193,78,.3)'}" stroke="${C.yellow}" stroke-width="5" stroke-linejoin="round" opacity="${efsO(op)}"${dashed ? ' stroke-dasharray="8 7"' : ''}/>`;
}

function efsHeart(cx, cy, scale = 1, op = 1) {
  if (op <= 0.01 || scale <= 0.01) return '';
  return `<path transform="translate(${efsN(cx)} ${efsN(cy)}) scale(${efsN(scale)})" d="M0 38 C-13 21 -48 -2 -48 -24 C-48 -51 -15 -55 0 -31 C15 -55 48 -51 48 -24 C48 -2 13 21 0 38Z" fill="rgba(232,135,91,.22)" stroke="${EFS_ORANGE}" stroke-width="6" opacity="${efsO(op)}"/>`;
}

function efsLens(cx, cy, r = 45, op = 1, dashed = false, handleUp = false) {
  if (op <= 0.01 || r <= 1) return '';
  const dash = dashed ? '11 9' : '';
  const sy = handleUp ? -1 : 1;
  return `<g opacity="${efsO(op)}"><circle cx="${efsN(cx)}" cy="${efsN(cy)}" r="${efsN(r)}" fill="rgba(242,193,78,.045)" stroke="${C.yellow}" stroke-width="8"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<path d="M${efsN(cx + r * 0.68)} ${efsN(cy + sy * r * 0.68)} L${efsN(cx + r * 1.28)} ${efsN(cy + sy * r * 1.28)}" stroke="${C.yellow}" stroke-width="17" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<path d="M${efsN(cx + r * 0.8)} ${efsN(cy + sy * r * 0.8)} L${efsN(cx + r * 1.26)} ${efsN(cy + sy * r * 1.26)}" stroke="${C.chalk}" stroke-width="4" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/></g>`;
}

function efsMagnet(cx, cy, scale = 1, op = 1, label = '', dashed = false) {
  if (op <= 0.001) return '';
  if (dashed) return `<g transform="translate(${efsN(cx)} ${efsN(cy)}) scale(${efsN(scale)})" opacity="${efsO(op)}"><path d="M-94 -55 H-70 V12 C-70 44 -38 56 0 56 C38 56 70 44 70 12 V-55 H94 V12 C94 62 50 80 0 80 C-50 80 -94 62 -94 12Z" fill="rgba(239,233,216,.012)" stroke="${C.chalk}" stroke-width="5" stroke-dasharray="13 9" stroke-linejoin="round"/></g>`;
  return `<g transform="translate(${efsN(cx)} ${efsN(cy)}) scale(${efsN(scale)})" opacity="${efsO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M-82 -55 V12 C-82 52 -42 68 0 68 C42 68 82 52 82 12 V-55" fill="none" stroke="${C.chalk}" stroke-width="24"/>` +
    `<path d="M-82 -54 V12 C-82 52 -42 66 0 66" fill="none" stroke="${EFS_RED}" stroke-width="16"/><path d="M0 66 C42 66 82 52 82 12 V-54" fill="none" stroke="${EFS_BLUE}" stroke-width="16"/>` +
    `<path d="M-94 -55 H-70 M70 -55 H94" stroke="${C.chalk}" stroke-width="8"/><path d="M-91 -55 H-71" stroke="${EFS_RED}" stroke-width="14"/><path d="M71 -55 H91" stroke="${EFS_BLUE}" stroke-width="14"/>` +
    (label ? txt(0, 19, label, { a: 'middle', s: 36, w: 1, f: C.yellow }) : '') + '</g>';
}

function efsCheck(cx, cy, scale = 1, op = 1) {
  if (op <= 0.01) return '';
  return `<path d="M${cx - 30 * scale} ${cy} L${cx - 8 * scale} ${cy + 23 * scale} L${cx + 37 * scale} ${cy - 30 * scale}" fill="none" stroke="${EFS_GREEN}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" opacity="${efsO(op)}"/>`;
}

function efsCross(cx, cy, size = 24, op = 1) {
  if (op <= 0.01) return '';
  return `<g opacity="${efsO(op)}" stroke="${EFS_RED}" stroke-width="10" stroke-linecap="round"><line x1="${cx - size}" y1="${cy - size}" x2="${cx + size}" y2="${cy + size}"/><line x1="${cx + size}" y1="${cy - size}" x2="${cx - size}" y2="${cy + size}"/></g>`;
}

function efsDomino(cx, baseY, w, h, angle = 0, op = 1, dashed = false) {
  if (op <= 0.001) return '';
  return `<g transform="translate(${efsN(cx)} ${efsN(baseY)}) rotate(${efsN(angle)})" opacity="${efsO(op)}">` +
    `<rect x="${efsN(-w / 2)}" y="${efsN(-h)}" width="${efsN(w)}" height="${efsN(h)}" rx="11" fill="${dashed ? 'none' : 'rgba(232,135,91,.13)'}" stroke="${dashed ? C.chalk : C.orange}" stroke-width="5"${dashed ? ' stroke-dasharray="12 8"' : ''}/>` +
    (dashed ? '' : `<circle cx="0" cy="${efsN(-h * 0.72)}" r="7" fill="${C.orange}"/><circle cx="0" cy="${efsN(-h * 0.3)}" r="7" fill="${C.orange}"/>`) + '</g>';
}

function efsFinger(cx, cy, opacity = 1) {
  return `<g transform="translate(${efsN(cx)} ${efsN(cy)})" opacity="${efsO(opacity)}"><path d="M0 24 L45 24 Q54 24 60 14 L76 -16 Q81 -25 89 -21 Q96 -17 91 -7 L82 17 L112 4 Q122 0 126 8 Q129 16 118 21 L78 39 Q70 43 66 52 L16 52 Z" fill="rgba(239,233,216,.16)" stroke="${C.chalk}" stroke-width="5" stroke-linejoin="round"/></g>`;
}

function efsBell(cx, cy, scale = 1, angle = 0, opacity = 1) {
  return `<g transform="translate(${efsN(cx)} ${efsN(cy)}) scale(${efsN(scale)}) rotate(${efsN(angle)})" opacity="${efsO(opacity)}" stroke-linejoin="round">` +
    `<path d="M-37 33 Q-31 20 -29 -8 Q-26 -43 0 -52 Q26 -43 29 -8 Q31 20 37 33 Z" fill="rgba(239,233,216,.1)" stroke="${C.chalk}" stroke-width="5"/><path d="M-43 34 L43 34 M-12 44 Q0 55 12 44" fill="none" stroke="${C.chalk}" stroke-width="6" stroke-linecap="round"/><circle cx="0" cy="-57" r="7" fill="${C.yellow}"/></g>`;
}

function efsWaves(cx, cy, op = 1) {
  if (op <= 0.001) return '';
  return `<g fill="none" stroke="${C.yellow}" stroke-width="5" stroke-linecap="round" opacity="${efsO(op)}"><path d="M${cx - 72} ${cy - 16} Q${cx - 93} ${cy} ${cx - 72} ${cy + 16}"/><path d="M${cx - 92} ${cy - 34} Q${cx - 130} ${cy} ${cx - 92} ${cy + 34}"/><path d="M${cx + 72} ${cy - 16} Q${cx + 93} ${cy} ${cx + 72} ${cy + 16}"/></g>`;
}

function efsHuman(cx, cy, scale = 1, op = 1, raiseHand = false) {
  const arm = raiseHand ? 'M-5 -10 L-34 -32 M5 -10 L31 -25 L38 -60' : 'M-5 -10 L-36 14 M5 -10 L36 14';
  return `<g transform="translate(${efsN(cx)} ${efsN(cy)}) scale(${efsN(scale)})" opacity="${efsO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<circle cx="0" cy="-50" r="22" fill="rgba(240,217,189,.2)" stroke="${C.chalk}" stroke-width="5"/><path d="M-9 -53 Q0 -61 9 -53" fill="none" stroke="${C.chalk}" stroke-width="3"/>` +
    `<path d="M0 -28 L0 38 ${arm} M0 38 L-26 76 M0 38 L26 76" fill="none" stroke="${C.chalk}" stroke-width="8"/><path d="M-18 -20 Q0 -29 18 -20 L22 28 Q0 39 -22 28Z" fill="rgba(127,182,217,.2)" stroke="${EFS_BLUE}" stroke-width="4"/></g>`;
}

function efsMirror(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${efsN(cx)} ${efsN(cy)}) scale(${efsN(scale)})" opacity="${efsO(op)}" fill="none" stroke="${C.chalk}" stroke-linejoin="round"><ellipse cx="0" cy="-5" rx="30" ry="42" stroke-width="5"/><path d="M0 37 L0 61 M-18 62 H18" stroke-width="5"/><path d="M-14 -20 Q0 -30 14 -20" stroke="${C.yellow}" stroke-width="4"/></g>`;
}

function efsNotebook(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${efsN(cx)} ${efsN(cy)}) scale(${efsN(scale)})" opacity="${efsO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M-43 -28 Q-18 -36 0 -23 V35 Q-20 22 -43 30Z M0 -23 Q20 -36 43 -28 V30 Q20 22 0 35Z" fill="rgba(127,182,217,.12)" stroke="${C.chalk}" stroke-width="5"/><path d="M0 -22 V35 M-32 -14 Q-19 -17 -8 -10 M-32 2 Q-19 -1 -8 6" fill="none" stroke="${EFS_BLUE}" stroke-width="4"/><path d="M22 27 L42 3 L50 10 L30 34 L21 38Z" fill="rgba(242,193,78,.28)" stroke="${C.yellow}" stroke-width="4"/></g>`;
}

function efsBowl(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${efsN(cx)} ${efsN(cy)}) scale(${efsN(scale)})" opacity="${efsO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M-42 -4 Q-36 35 0 38 Q36 35 42 -4Z" fill="rgba(232,135,91,.14)" stroke="${C.chalk}" stroke-width="5"/><path d="M-48 -5 H48 M-25 -18 Q-15 -29 -5 -18 M0 -19 Q10 -30 20 -18" fill="none" stroke="${C.chalk}" stroke-width="4"/><path d="M22 -47 L44 -9 M31 -50 L50 -15" stroke="${C.yellow}" stroke-width="4"/></g>`;
}

function efsMic(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${efsN(cx)} ${efsN(cy)}) scale(${efsN(scale)})" opacity="${efsO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<rect x="-16" y="-43" width="32" height="54" rx="16" fill="rgba(127,182,217,.18)" stroke="${C.chalk}" stroke-width="5"/><path d="M-27 -8 Q-27 28 0 28 Q27 28 27 -8 M0 28 V47 M-22 48 H22" fill="none" stroke="${C.chalk}" stroke-width="5"/><path d="M-9 -28 H9 M-9 -14 H9" stroke="${EFS_BLUE}" stroke-width="4"/></g>`;
}

function efsBag(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${efsN(cx)} ${efsN(cy)}) scale(${efsN(scale)})" opacity="${efsO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M-34 -18 Q-34 -35 -18 -35 H18 Q34 -35 34 -18 L40 34 Q40 43 30 43 H-30 Q-40 43 -40 34Z" fill="rgba(232,135,91,.13)" stroke="${C.chalk}" stroke-width="5"/><path d="M-19 -34 Q-19 -55 0 -55 Q19 -55 19 -34 M-28 -5 Q0 7 28 -5 V22 H-28Z" fill="none" stroke="${EFS_ORANGE}" stroke-width="5"/><path d="M-40 4 L-51 27 M40 4 L51 27" stroke="${C.chalk}" stroke-width="4"/></g>`;
}

function efsPhoto(cx, cy, scale = 1, op = 1, dashed = false) {
  if (op <= 0.001 || scale <= 0.001) return '';
  const w = 180, h = 210;
  if (dashed) return `<g transform="translate(${efsN(cx)} ${efsN(cy)}) scale(${efsN(scale)})" opacity="${efsO(op)}"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="none" stroke="${C.chalk}" stroke-width="6" stroke-dasharray="14 10"/></g>`;
  return `<g transform="translate(${efsN(cx)} ${efsN(cy)}) scale(${efsN(scale)})" opacity="${efsO(op)}">` +
    `<rect x="-90" y="-105" width="180" height="210" fill="#f4f0e6" stroke="${C.chalk}" stroke-width="6"/>` +
    `<rect x="-72" y="-88" width="144" height="132" fill="#26382f" stroke="${EFS_BLUE}" stroke-width="3"/>` +
    `<circle cx="-30" cy="-47" r="15" fill="rgba(240,217,189,.28)" stroke="#efe9d8" stroke-width="4"/><path d="M-53 -8 Q-48 -32 -30 -32 Q-12 -32 -7 -8 M-30 -9 V17" fill="none" stroke="#efe9d8" stroke-width="5" stroke-linecap="round"/>` +
    `<rect x="23" y="-64" width="22" height="53" rx="11" fill="rgba(127,182,217,.2)" stroke="${EFS_BLUE}" stroke-width="4"/><path d="M16 -19 Q16 2 34 2 Q52 2 52 -19 M34 2 V17 M23 18 H45" fill="none" stroke="#efe9d8" stroke-width="4" stroke-linecap="round"/><path d="M-64 67 H64" stroke="#b2aa96" stroke-width="3"/></g>`;
}

function efsMaterialIcon(kind, cx, cy, scale = 1, op = 1) {
  if (kind === 0) return efsNotebook(cx, cy, scale, op);
  if (kind === 1) return efsBowl(cx, cy, scale, op);
  if (kind === 2) return efsMic(cx, cy, scale, op);
  return efsBag(cx, cy, scale, op);
}

function efsMaterialCard(kind, x, y, op = 1) {
  const cx = x + 130;
  const labels = ['每天寫功課', '吃早餐', '第一次當主持', '放學回家'];
  return `<g opacity="${efsO(op)}">${box(x, y, 260, 170, C.chalk, 1, C.deep)}` +
    efsMaterialIcon(kind, cx, y + 70, 0.85, 1) +
    txt(cx, y + 140, labels[kind], { a: 'middle', s: 30, w: 1, f: C.chalk }) + '</g>';
}

function efsSmallCardCopy(kind, cx, cy, op = 1) {
  if (op <= 0.001) return '';
  const label = ['每天寫功課', '吃早餐', '第一次當主持', '放學回家'][kind];
  return `<g transform="translate(${efsN(cx)} ${efsN(cy)})" opacity="${efsO(op)}">` +
    `${box(-110, -65, 220, 130, C.chalk, 1, C.deep)}${efsMaterialIcon(kind, 0, -24, 0.62, 1)}` +
    txt(0, 55, label, { a: 'middle', s: 30, w: 1, f: C.chalk }) + '</g>';
}

function efsFlash(u, start) {
  const inK = efsK(u, start, start + 0.1);
  const outK = 1 - efsK(u, start + 0.4, start + 0.5);
  return Math.max(0, Math.min(inK, outK));
}

function efsPaint(svg) {
  return svg.replace(/font-size="24"/g, 'font-size="26"')
    .replace(/<text ([^>]*?)fill="([^"]+)"/g, '<text $1style="fill:$2" fill="$2"');
}

function s1(u) {
  let g = head(u, '開場', '再寫一次事') + efsTag(1);
  const oldOp = 1 - 0.5 * efsK(u, 3.5, 4.5);
  g += `<g opacity="${efsO(oldOp)}">${efsCardFrame(120, 220, 340, 64)}${efsLabel(290, 265, '〈戶外教學〉', 34)}`;
  const xs = [190, 290, 390];
  const labels = ['原因', '經過', '結果'];
  xs.forEach((x, i) => {
    const k = efsK(u, 0.3 + i * 0.55, 0.8 + i * 0.55);
    g += efsDomino(x, 400, 40, 100, 0, k);
    g += efsLabel(x, 450, labels[i], 30, C.chalk, k);
  });
  g += efsLabel(290, 510, '四年級', 34) + '</g>';
  const k = efsK(u, 4.0, 5.5);
  g += `<g opacity="${efsO(k)}" transform="translate(${efsN(240 * (1 - k))} 0)">${efsCardFrame(700, 300, 760, 130)}${efsLabel(1080, 382, '〈一件特別的事〉', 56, C.yellow)}</g>`;
  g += efsLabel(1080, 500, '六年級', 36, C.chalk, efsK(u, 5.5, 6.0));
  const arrowK = efsK(u, 5.5, 6.5);
  if (arrowK > 0.01) g += arrow(480, 330, 680, 360, C.chalk, 1, false, arrowK);
  return efsPaint(g);
}

function s2(u) {
  let g = head(u, '審題', '題目的重點') + efsTag(1);
  const title = '〈一件特別的事〉';
  const cardK = efsK(u, 0.2, 0.5);
  g += efsCardFrame(400, 210, 800, 130, cardK);
  g += efsType(title, u, 800, 300, 60, C.yellow, 0.2, 1.0);
  const rangeK = efsK(u, 1.5, 3.0);
  if (rangeK > 0.01) {
    g += `<rect x="620" y="238" width="120" height="80" rx="8" fill="none" stroke="${EFS_BLUE}" stroke-width="5" stroke-dasharray="12 9" opacity="${efsO(rangeK)}"/>`;
    g += `<rect x="920" y="238" width="60" height="80" rx="8" fill="none" stroke="${EFS_BLUE}" stroke-width="5" stroke-dasharray="12 9" opacity="${efsO(rangeK)}"/>`;
    g += `<path d="M680 318 Q815 426 950 318" fill="none" stroke="${EFS_BLUE}" stroke-width="4" stroke-dasharray="10 8" opacity="${efsO(rangeK)}"/>`;
  }
  g += efsLabel(680, 420, '範圍', 36, EFS_BLUE, rangeK);
  const lensK = efsK(u, 4.0, 6.0);
  const lensX = 1400 + (800 - 1400) * lensK;
  const lensY = 450 + (272 - 450) * lensK;
  g += efsLens(lensX, lensY, 60, lensK, false, true);
  g += efsLabel(1290, 290, '重點', 36, C.yellow, lensK);
  const arrowK = efsK(u, 5.5, 6.5);
  if (arrowK > 0.01) g += arrow(1245, 266, 890, 204, C.yellow, 1, false, arrowK);
  const cardK2 = efsK(u, 7.0, 7.3);
  const cardK3 = efsK(u, 7.0, 7.3);
  g += efsCardFrame(300, 560, 440, 100, cardK2);
  g += efsType('〈最有趣的事〉', u, 520, 620, 44, C.chalk, 7.0, 8.0);
  g += efsCardFrame(860, 560, 440, 100, cardK3);
  g += efsType('〈最有意義的事〉', u, 1080, 620, 44, C.chalk, 7.0, 8.0);
  const under1 = efsK(u, 8.5, 9.2), under2 = efsK(u, 10.0, 10.7);
  if (under1 > 0.01) {
    g += underline(412, 541, 638, under1, C.yellow, 1);
    g += efsLens(476, 548, 34, under1);
  }
  if (under2 > 0.01) {
    g += underline(952, 1120, 638, under2, C.yellow, 1);
    g += efsLens(1036, 548, 34, under2);
  }
  return efsPaint(g);
}

function s3(u) {
  let g = head(u, '選材', '用重點挑一件事') + efsTag(1);
  const xs = [130, 470, 810, 1150];
  for (let i = 0; i < 4; i++) {
    const appear = efsK(u, 0.3 + i * 0.35, 0.75 + i * 0.35);
    const dim = i === 2 ? 1 : 1 - 0.55 * efsK(u, 7.0, 8.0);
    const sourceOp = i === 2 ? 1 - efsK(u, 5.0, 6.5) : 1;
    g += efsMaterialCard(i, xs[i], 290, appear * dim * sourceOp);
    if (i === 2 && u >= 5.0) g += efsCardFrame(xs[i], 290, 260, 170, efsK(u, 5.0, 6.5), true);
  }
  const magnetK = efsK(u, 3.0, 5.0);
  const magnetX = 1500 + (1110 - 1500) * magnetK;
  g += efsMagnet(magnetX, 650, 1, magnetK, '特別');
  const copyK = efsK(u, 5.0, 6.5);
  const copyX = 940 + (1110 - 940) * copyK;
  const copyY = 375 + (775 - 375) * copyK;
  g += efsSmallCardCopy(2, copyX, copyY, copyK);
  return efsPaint(g);
}

function s4(u) {
  let g = head(u, '結構', '四年級：照順序') + efsTag(1);
  const xs = [520, 800, 1080];
  const labels = ['原因', '經過', '結果'];
  const phrases = ['全班只選我', '每天對鏡練', '順利講完'];
  xs.forEach((x, i) => {
    const show = efsK(u, 0.3 + i * 0.4, 0.75 + i * 0.4);
    const fall = efsK(u, 3.5 + i * 1.05, 4.6 + i * 1.05);
    g += efsLabel(x, 330, labels[i], 34, EFS_BLUE, show);
    g += efsDomino(x, 560, 60, 200, 78 * fall, show);
    g += efsLabel(x, 620, phrases[i], 30, C.yellow, show);
  });
  const bellOp = efsK(u, 0.3, 0.7);
  const shake = efsK(u, 7.0, 7.5);
  const angle = shake > 0.01 ? Math.sin((u - 7.0) * 16) * 14 : 0;
  g += efsBell(1250, 500, 1, angle, bellOp);
  const fingerK = efsK(u, 3.0, 3.5);
  g += efsFinger(405 + 90 * fingerK, 510, 1 - 0.5 * efsK(u, 4.0, 4.5));
  const waveOp = u < 7.0 ? 0 : Math.max(0.5, 1 - 0.5 * efsK(u, 7.0, 8.0));
  g += efsWaves(1250, 500, waveOp);
  g += efsLabel(800, 720, '因果式', 36, C.yellow, efsK(u, 8.5, 9.5));
  return efsPaint(g);
}

function s5(u) {
  let g = head(u, '結構', '六年級：先放結果') + efsTag(1);
  const xs = [520, 800, 1080];
  const phrases = ['全班只選我', '每天對鏡練', '順利講完'];
  xs.forEach((x, i) => {
    const angle = 78 * (1 - efsK(u, 5.0, 7.0));
    g += efsDomino(x, 560, 60, 200, angle, 1);
    g += efsLabel(x, 620, phrases[i], 30, C.yellow);
  });
  const bellAngle = u < 1.0 ? 0 : Math.sin((u - 1.0) * 12) * 9 * (1 - 0.4 * efsK(u, 2.0, 3.0));
  g += efsBell(1250, 500, 1, bellAngle, 1);
  g += efsWaves(1250, 500, u < 1.0 ? 0.35 : Math.max(0.35, 1 - 0.65 * efsK(u, 1.0, 2.0)));
  const flash = efsFlash(u, 1.0);
  if (flash > .01) {
    g += `<circle cx="1250" cy="440" r="${efsN(24 + 22 * flash)}" fill="rgba(255,255,255,.82)" opacity="${efsO(flash)}"/>`;
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4;
      g += efsLine(1250 + Math.cos(a) * 34, 440 + Math.sin(a) * 34, 1250 + Math.cos(a) * 55, 440 + Math.sin(a) * 55, '#ffffff', 5, flash);
    }
  }
  const originalOp = u < 1.0 ? 0 : 1 - 0.5 * efsK(u, 1.0, 2.0);
  g += efsPhoto(1330, 360, 0.6, originalOp);
  const copyK = efsK(u, 2.5, 4.0);
  const copyX = 1330 + (300 - 1330) * copyK;
  const copyY = 360 + 70 * copyK - 90 * 4 * copyK * (1 - copyK);
  g += efsPhoto(copyX, copyY, 0.8, u < 2.5 ? 0 : 1);
  if (u >= 2.5) g += efsLabel(copyX, copyY - 100, '果 1', 30, C.yellow);
  const resultOut = 1 - efsK(u, 4.0, 4.8);
  const resultIn = efsK(u, 4.0, 4.8);
  g += efsLabel(520, 330, '原因', 34, EFS_BLUE);
  g += efsLabel(800, 330, '經過', 34, EFS_BLUE);
  g += efsLabel(1080, 330, '結果', 34, EFS_BLUE, resultOut);
  g += efsLabel(1080, 330, '果 2', 34, EFS_BLUE, resultIn);
  const arrowTimes = [7.5, 8.25, 9.0];
  const arrowPairs = [[374, 480], [560, 760], [840, 1040]];
  arrowPairs.forEach(([x1, x2], i) => {
    const k = efsK(u, arrowTimes[i], arrowTimes[i] + 0.75);
    if (k > 0.01) g += arrow(x1, 440, x2, 440, C.yellow, 1, false, k);
  });
  const oldName = 0.4 * (1 - efsK(u, 9.8, 10.5));
  g += efsLabel(800, 720, '因果式', 36, C.yellow, oldName);
  g += efsLabel(800, 720, '果因果式', 36, C.yellow, efsK(u, 10.5, 11.5));
  return efsPaint(g);
}

function s6(u) {
  let g = head(u, '骨架', '四段各寫什麼') + efsTag(1);
  const blockK = efsK(u, 0.2, 1.0);
  for (let i = 0; i < 4; i++) g += efsBlock(EFS_X[i], 270, EFS_W[i], 200, EFS_COLORS[i], blockK);
  const roleK = efsK(u, 0.6, 1.5);
  g += efsLabel(247, 315, '先寫那一刻', 34, C.chalk, roleK);
  g += efsLabel(580, 315, '為何特別：起因', 34, C.chalk, roleK);
  g += efsLabel(1020, 315, '為何特別：經過', 34, C.chalk, roleK);
  g += efsLabel(1352, 315, '結果和感想', 34, C.chalk, roleK);

  const iconStarts = [1.5, 2.2, 2.9, 3.6];
  const iconEnds = [2.2, 2.9, 3.6, 4.5];
  for (let i = 0; i < 4; i++) {
    const k = efsK(u, iconStarts[i], iconEnds[i]);
    const y = 240 + 160 * k;
    if (i === 0) g += efsPhoto(247, y, 0.4, k);
    if (i === 1) g += efsHuman(580, y, 0.52, k, true);
    if (i === 2) g += efsDomino(984, y + 28, 20, 62, 0, k) + efsMirror(1060, y, 0.58, k);
    if (i === 3) g += efsBell(1325, y, 0.58, 0, k) + efsHeart(1388, y + 8, 0.42, k);
  }
  const entries = [
    [247, 530, '麥克風一響', 4.5], [247, 572, '腿在發抖', 4.9],
    [580, 530, '全班只選我', 5.3], [1020, 530, '每天對鏡練', 5.7],
    [1352, 530, '台下掌聲', 6.1], [1352, 572, '更有自信', 6.5],
  ];
  entries.forEach(([x, y, value, start]) => g += efsType(value, u, x, y, 30, C.yellow, start, start + 0.8));
  const starK = efsK(u, 8.0, 9.0);
  g += efsStar(760, 290, 30, starK) + efsStar(1200, 290, 30, starK);
  return efsPaint(g);
}

function s7(u) {
  let g = head(u, '檢查', '放大鏡檢查') + efsTag(1);
  const titleK = efsK(u, 0.2, 0.6);
  g += efsCardFrame(560, 200, 480, 80, titleK);
  g += efsType('〈一件特別的事〉', u, 800, 254, 40, C.chalk, 0.2, 0.8);
  g += efsLens(800, 240, 34, titleK, false, false);
  g += efsLabel(1260, 245, '有寫到特別嗎', 34, C.yellow, titleK);
  const cardXs = [120, 610, 1100], centers = [310, 800, 1290];
  const phrases = ['全班只選了我', '第一次拿麥克風', '午餐吃咖哩飯'];
  const starts = [0.6, 1.0, 1.4];
  for (let i = 0; i < 3; i++) {
    const show = efsK(u, starts[i], starts[i] + 0.6);
    const fade = i === 2 ? 1 - 0.55 * efsK(u, 8.0, 8.5) : 1;
    g += efsCardFrame(cardXs[i], 360, 380, 260, show * fade);
    if (i === 0) g += efsHuman(centers[i], 440, 0.58, show * fade, true);
    if (i === 1) g += efsMic(centers[i], 440, 0.82, show * fade);
    if (i === 2) g += efsBowl(centers[i], 440, 0.82, show * fade);
    g += efsType(phrases[i], u, centers[i], 570, 34, C.chalk, starts[i], starts[i] + 1.0, show * fade);
  }
  const travel1 = efsK(u, 2.0, 2.5), stay1 = efsK(u, 2.5, 4.0);
  const travel2 = efsK(u, 4.5, 5.0), stay2 = efsK(u, 5.0, 6.0);
  const travel3 = efsK(u, 6.5, 7.2);
  const search = efsK(u, 7.2, 8.1);
  const park = efsK(u, 8.6, 9.4);
  let lensX = 800, lensY = 240;
  if (u >= 2.0 && u < 4.5) {
    lensX = 800 + (344 - 800) * travel1;
    lensY = 240 + (526 - 240) * travel1;
  } else if (u >= 4.5 && u < 6.5) {
    lensX = 344 + (732 - 344) * travel2;
    lensY = 526;
  } else if (u >= 6.5 && u < 7.2) {
    lensX = 732 + (1290 - 732) * travel3;
    lensY = 526;
  } else if (u >= 7.2 && u < 8.6) {
    lensX = search < 0.5 ? 1290 + (1360 - 1290) * search * 2 : 1360 + (1290 - 1360) * (search - 0.5) * 2;
    lensY = 526;
  } else if (u >= 8.6) {
    lensX = 1290 + (1180 - 1290) * park;
    lensY = 526 + (770 - 526) * park;
  }
  const lensOp = efsK(u, 2.0, 2.2);
  g += efsLens(lensX, lensY, 48, lensOp);
  const ul1 = efsK(u, 2.5, 4.0), ul2 = efsK(u, 5.0, 6.0);
  if (ul1 > 0.01) g += underline(276, 412, 584, ul1, C.yellow, 1);
  if (ul2 > 0.01) g += underline(680, 782, 584, ul2, C.yellow, 1);
  const good1 = efsK(u, 3.6, 4.0), good2 = efsK(u, 5.6, 6.0);
  g += efsCheck(452, 400, 0.78, good1) + efsStar(467, 452, 26, good1);
  g += efsCheck(940, 400, 0.78, good2) + efsStar(967, 452, 26, good2);
  const bad = efsK(u, 8.0, 8.5);
  g += efsCross(1400, 405, 25, bad);
  const resultK = efsK(u, 9.0, 10.0);
  g += efsLabel(310, 680, '文題相符', 36, C.yellow, resultK);
  g += efsLabel(800, 680, '文題相符', 36, C.yellow, resultK);
  g += efsLabel(1290, 680, '文題不符', 36, EFS_RED, resultK);
  return efsPaint(g);
}

function s8(u) {
  let g = head(u, '骨架', '第一句就放那一刻') + efsTag(1);
  const blockK = efsK(u, 0.2, 0.8);
  g += efsBlock(300, 250, 1000, 240, EFS_BLUE, blockK);
  g += efsLabel(405, 295, '先寫那一刻', 34, C.chalk, blockK);
  g += efsPhoto(1210, 345, 0.45, blockK);
  g += efsLabel(1120, 294, '果 1', 30, C.yellow, blockK);
  g += efsType('麥克風一響，全場突然安靜下來。', u, 800, 420, 36, C.yellow, 0.8, 6.0);
  return efsPaint(g);
}

function s9(u) {
  let g = head(u, '練習', '換你排骨架') + efsTag(1);
  const topK = efsK(u, 0.6, 1.0);
  const titleK = efsK(u, 0.2, 0.7);
  g += efsCardFrame(560, 200, 480, 72, titleK);
  g += efsType('〈最有趣的事〉', u, 800, 248, 40, C.yellow, 0.2, 0.8);
  const rangeFlash = efsFlash(u, 8.0);
  if (rangeFlash > .01) g += `<rect x="140" y="300" width="200" height="70" rx="8" fill="rgba(242,193,78,.22)" opacity="${efsO(rangeFlash)}"/>`;
  g += `<rect x="140" y="300" width="200" height="70" rx="8" fill="none" stroke="${EFS_BLUE}" stroke-width="5" stroke-dasharray="12 9" opacity="${efsO(topK)}"/>`;
  g += efsLabel(240, 420, '範圍', 30, EFS_BLUE, topK);
  const lensFlash = efsFlash(u, 8.7);
  if (lensFlash > .01) g += `<circle cx="450" cy="335" r="38" fill="rgba(242,193,78,.22)" opacity="${efsO(lensFlash)}"/>`;
  g += efsLens(450, 335, 36, topK, true);
  g += efsLabel(450, 420, '重點', 30, C.yellow, topK);
  const magnetFlash = efsFlash(u, 9.4);
  if (magnetFlash > .01) g += `<ellipse cx="700" cy="345" rx="68" ry="58" fill="rgba(242,193,78,.22)" opacity="${efsO(magnetFlash)}"/>`;
  g += efsMagnet(700, 345, 0.7, topK, '', true);
  const photoFlash = efsFlash(u, 10.1);
  if (photoFlash > .01) g += `<rect x="906" y="292" width="108" height="116" rx="10" fill="rgba(242,193,78,.22)" opacity="${efsO(photoFlash)}"/>`;
  g += efsPhoto(960, 350, 0.55, topK, true);
  g += efsLabel(960, 450, '果 1', 30, C.yellow, topK);
  const dominoFlash = efsFlash(u, 10.8);
  if (dominoFlash > .01) g += `<rect x="1110" y="292" width="300" height="118" rx="10" fill="rgba(242,193,78,.22)" opacity="${efsO(dominoFlash)}"/>`;
  [1140, 1260, 1380].forEach((x) => g += efsDomino(x, 410, 50, 110, 0, topK, true));
  ['原因', '經過', '果 2'].forEach((v, i) => g += efsLabel([1140, 1260, 1380][i], 450, v, 30, C.chalk, topK));
  const blockFlash = efsFlash(u, 11.7);
  if (blockFlash > .01) {
    EFS_X.forEach((x, i) => g += `<rect x="${x}" y="510" width="${EFS_W[i]}" height="150" rx="14" fill="rgba(242,193,78,.22)" opacity="${efsO(blockFlash)}"/>`);
  }
  for (let i = 0; i < 4; i++) g += efsBlock(EFS_X[i], 510, EFS_W[i], 150, EFS_COLORS[i], topK, true);
  g += efsLabel(247, 580, '先寫那一刻', 34, C.chalk, topK);
  g += efsLabel(580, 580, '為何有趣：起因', 34, C.chalk, topK);
  g += efsLabel(1020, 580, '為何有趣：經過', 34, C.chalk, topK);
  g += efsLabel(1352, 580, '結果和感想', 34, C.chalk, topK);
  g += efsStar(760, 530, 26, topK, true) + efsStar(1200, 530, 26, topK, true);
  return efsPaint(g);
}
