const META = {
  title: '一段裡面怎麼說明',
  subtitle: '9 段・約 2 分鐘・三年級說明文（事物）第二集',
  ariaLabel: '說明文一段一句一層，照次序排，最後說用處。',
  note: '出處：楊裕貿作文寫作要領、研習講義。積木、盒子、珠子、蝴蝶結、次序卡、取景框、放大鏡、用處牌是視覺比喻；借書區、閱讀區是示意圖；示範句與短語自編。鍵盤操作：空白鍵播放／暫停，左右方向鍵切換段落，F 鍵全螢幕。畫面只由時間決定。',
  works: [],
};

const EXL_WOOD = '#a9784f';
const EXL_RED = '#d9605a';
const EXL_GREEN = '#8fd18a';
const EXL_BLUE = '#7fb6d9';
const EXL_ORANGE = '#e8875b';
const exlK = (u, a, b) => ease(P(u, a, b));
const exlO = (value) => Math.max(0, Math.min(1, Number(value) || 0)).toFixed(3);
const exlN = (value) => Number(value).toFixed(1);

function exlTag(op = 1) {
  return `<g opacity="${exlO(op)}">${box(1375, 56, 165, 60, C.orange, 1, C.deep)}${txt(1457, 98, '比喻', { a: 'middle', s: 30, w: 1, f: C.orange })}</g>`;
}

function exlLabel(cx, y, value, size = 30, color = C.chalk, op = 1) {
  if (op <= 0.001) return '';
  return txt(cx, y, value, { a: 'middle', s: size, w: 1, f: color, o: op });
}

function exlTextByChar(value, cx, y, size, color = C.chalk, op = 1) {
  const chars = Array.from(value);
  return chars.map((ch, i) => txt(cx + (i - (chars.length - 1) / 2) * size, y, ch, {
    a: 'middle', s: size, w: 1, f: color, o: op,
  })).join('');
}

function exlType(value, u, cx, y, size, color, start, end, op = 1) {
  if (u <= start || op <= 0.001) return '';
  const chars = Array.from(value);
  const count = Math.min(chars.length, Math.ceil(exlK(u, start, end) * chars.length));
  return chars.slice(0, count).map((ch, i) => txt(cx + (i - (chars.length - 1) / 2) * size, y, ch, {
    a: 'middle', s: size, w: 1, f: color, o: op,
  })).join('');
}

function exlLine(x1, y1, x2, y2, color = C.chalk, width = 5, op = 1, dash = '') {
  if (op <= 0.001) return '';
  return `<path d="M${exlN(x1)} ${exlN(y1)} L${exlN(x2)} ${exlN(y2)}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${exlO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function exlPath(d, color = C.chalk, width = 5, op = 1, fill = 'none', dash = '') {
  if (op <= 0.001) return '';
  return `<path d="${d}" fill="${fill}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${exlO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function exlCircle(cx, cy, r, stroke = C.chalk, width = 5, fill = 'none', op = 1, dash = '') {
  if (op <= 0.001 || r <= 0) return '';
  return `<circle cx="${exlN(cx)}" cy="${exlN(cy)}" r="${exlN(r)}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" opacity="${exlO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function exlBlock(x, y, w, h, color, op = 1, dashed = false) {
  if (op <= 0.001 || w <= 2 || h <= 2) return '';
  if (dashed) return `<g opacity="${exlO(op)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="rgba(239,233,216,.012)" stroke="${color}" stroke-width="5" stroke-dasharray="14 10"/></g>`;
  let g = `<g opacity="${exlO(op)}">`;
  const count = Math.max(2, Math.floor(w / 130));
  for (let i = 0; i < count; i++) {
    const cx = x + w * (i + 0.5) / count;
    g += `<rect x="${exlN(cx - 20)}" y="${exlN(y - 11)}" width="40" height="13" rx="6" fill="${color}"/>`;
  }
  return g + `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${color}" fill-opacity=".22" stroke="${C.chalk}" stroke-width="4"/></g>`;
}

function exlCardFrame(x, y, w, h, op = 1, dashed = false, stroke = C.chalk) {
  if (op <= 0.001) return '';
  if (dashed) return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="rgba(239,233,216,.012)" stroke="${stroke}" stroke-width="4" stroke-dasharray="13 9" opacity="${exlO(op)}"/>`;
  return `<g opacity="${exlO(op)}">${box(x, y, w, h, stroke, 1, 'rgba(239,233,216,.015)')}</g>`;
}

function exlStar(cx, cy, r, op = 1) {
  if (op <= 0.01 || r <= 1) return '';
  const points = [];
  for (let i = 0; i < 10; i++) {
    const angle = -Math.PI / 2 + i * Math.PI / 5;
    const radius = i % 2 ? r * 0.46 : r;
    points.push(`${exlN(cx + Math.cos(angle) * radius)},${exlN(cy + Math.sin(angle) * radius)}`);
  }
  return `<polygon points="${points.join(' ')}" fill="rgba(242,193,78,.3)" stroke="${C.yellow}" stroke-width="5" stroke-linejoin="round" opacity="${exlO(op)}"/>`;
}

function exlCheck(cx, cy, scale = 1, op = 1) {
  if (op <= 0.01) return '';
  return `<path d="M${cx - 30 * scale} ${cy} L${cx - 8 * scale} ${cy + 23 * scale} L${cx + 37 * scale} ${cy - 30 * scale}" fill="none" stroke="${EXL_GREEN}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" opacity="${exlO(op)}"/>`;
}

function exlCross(cx, cy, size = 24, op = 1) {
  if (op <= 0.01) return '';
  return `<g opacity="${exlO(op)}" stroke="${EXL_RED}" stroke-width="10" stroke-linecap="round"><line x1="${cx - size}" y1="${cy - size}" x2="${cx + size}" y2="${cy + size}"/><line x1="${cx + size}" y1="${cy - size}" x2="${cx - size}" y2="${cy + size}"/></g>`;
}

function exlLens(cx, cy, r = 48, op = 1, dashed = false, handleUp = false) {
  if (op <= 0.01 || r <= 1) return '';
  const dash = dashed ? '11 9' : '';
  const sy = handleUp ? -1 : 1;
  return `<g opacity="${exlO(op)}"><circle cx="${exlN(cx)}" cy="${exlN(cy)}" r="${exlN(r)}" fill="rgba(242,193,78,.045)" stroke="${C.yellow}" stroke-width="8"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<path d="M${exlN(cx + r * 0.68)} ${exlN(cy + sy * r * 0.68)} L${exlN(cx + r * 1.28)} ${exlN(cy + sy * r * 1.28)}" stroke="${C.yellow}" stroke-width="17" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<path d="M${exlN(cx + r * 0.8)} ${exlN(cy + sy * 0.8)} L${exlN(cx + r * 1.26)} ${exlN(cy + sy * 1.26)}" stroke="${C.chalk}" stroke-width="4" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/></g>`;
}

function exlFlash(u, start) {
  const fadeIn = exlK(u, start, start + 0.08);
  const fadeOut = 1 - exlK(u, start + 0.42, start + 0.5);
  return Math.max(0, Math.min(fadeIn, fadeOut));
}

function exlBracket(x1, x2, y, progress, color = C.yellow) {
  if (progress <= 0.001) return '';
  const end = lerp(x1, x2, progress);
  return exlPath(`M${x1} ${y - 8} V${y} H${end} V${y - 8}`, color, 4, 1);
}

function exlPaint(svg) {
  return svg.replace(/font-size="24"/g, 'font-size="26"')
    .replace(/<text ([^>]*?)fill="([^"]+)"/g, '<text $1style="fill:$2" fill="$2"');
}

// 粉筆線圖：圖書館只有外框、門窗與書本圖示，不含任何字。
function exlLibrary(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${exlN(cx)} ${exlN(cy)}) scale(${exlN(scale)})" opacity="${exlO(op)}" fill="none" stroke="${C.chalk}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M-148 -92 L0 -124 L148 -92 V108 H-148 Z" fill="rgba(239,233,216,.018)"/><path d="M-148 -92 L0 -124 L148 -92" stroke="${EXL_WOOD}" stroke-width="9"/>` +
    `<path d="M-148 4 H148 M-100 -79 H-48 V-32 H-100 Z M48 -79 H100 V-32 H48 Z M-112 25 H-62 V70 H-112 Z M62 25 H112 V70 H62 Z"/>` +
    `<path d="M-25 108 V43 Q-25 17 0 17 Q25 17 25 43 V108 Z" fill="rgba(127,182,217,.06)"/><path d="M-21 62 Q-10 55 0 62 V85 Q-10 78 -21 85 Z M0 62 Q10 55 21 62 V85 Q10 78 0 85 Z M0 62 V85" stroke-width="3" stroke="${C.yellow}"/>` +
    `<path d="M-150 109 H150" stroke="${C.dim}" stroke-width="4"/></g>`;
}

function exlDiary(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${exlN(cx)} ${exlN(cy)}) scale(${exlN(scale)})" opacity="${exlO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M-104 -65 Q-55 -78 0 -55 V67 Q-53 44 -104 58 Z M0 -55 Q54 -78 104 -65 V58 Q52 44 0 67 Z" fill="rgba(127,182,217,.08)" stroke="${C.chalk}" stroke-width="5"/><path d="M0 -54 V66" fill="none" stroke="${C.chalk}" stroke-width="4"/>` +
    `<circle cx="-57" cy="-28" r="13" fill="none" stroke="${C.yellow}" stroke-width="4"/><path d="M-57 -13 V17 M-57 -2 L-75 8 M-57 -2 L-39 8 M-57 17 L-70 35 M-57 17 L-44 35" fill="none" stroke="${C.chalk}" stroke-width="4"/>` +
    `<path d="M44 -28 Q44 -40 55 -40 Q63 -40 68 -32 Q73 -40 82 -40 Q94 -40 94 -28 Q94 -17 68 0 Q44 -17 44 -28Z" fill="rgba(232,135,91,.12)" stroke="${EXL_ORANGE}" stroke-width="3"/>` +
    `<path d="M39 18 H87 M39 34 H91 M39 50 H78" fill="none" stroke="${C.dim}" stroke-width="3"/></g>`;
}

function exlQuestionArrow(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${exlN(cx)} ${exlN(cy)}) scale(${exlN(scale)})" opacity="${exlO(op)}" fill="none" stroke="${C.chalk}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M-64 -14 Q-64 -42 -40 -42 Q-16 -42 -16 -20 Q-16 -5 -39 5 Q-48 9 -48 22"/><circle cx="-48" cy="39" r="3" fill="${C.chalk}"/>` +
    `<path d="M-2 0 H40 M28 -12 L42 0 L28 12" stroke="${C.yellow}" stroke-width="6"/>` +
    `<path d="M65 -38 V12" stroke="${C.chalk}" stroke-width="8"/><circle cx="65" cy="37" r="4" fill="${C.chalk}" stroke="none"/></g>`;
}

function exlSign(cx, cy, w, h, op = 1) {
  const postEnd = h * 0.85;
  const iconY = cy - h / 3 + (h < 240 ? h * 0.1 : 0);
  return `<g transform="translate(${exlN(cx)} ${exlN(cy)})" opacity="${exlO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M${exlN(-w * 0.34)} ${exlN(h * 0.44)} V${exlN(postEnd)} M${exlN(w * 0.34)} ${exlN(h * 0.44)} V${exlN(postEnd)}" fill="none" stroke="${EXL_WOOD}" stroke-width="10"/>` +
    `<rect x="${exlN(-w / 2)}" y="${exlN(-h / 2)}" width="${w}" height="${h}" rx="7" fill="#315342" stroke="${EXL_WOOD}" stroke-width="6"/>` +
    exlQuestionArrow(0, iconY - cy, Math.min(1, h / 200), 1) + '</g>';
}

function exlBubble(cx, cy, r, kind, op = 1, dashed = false) {
  const dash = dashed ? '11 9' : '';
  let g = `<g opacity="${exlO(op)}"><circle cx="${exlN(cx)}" cy="${exlN(cy)}" r="${exlN(r)}" fill="${dashed ? 'none' : 'rgba(239,233,216,.025)'}" stroke="${C.chalk}" stroke-width="5"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
  if (dashed) return g + '</g>';
  const s = r / 100;
  if (kind === 0) {
    g += `<g transform="translate(${exlN(cx)} ${exlN(cy)}) scale(${exlN(s)})" fill="none" stroke="${C.chalk}" stroke-width="5" stroke-linejoin="round"><path d="M-58 48 V-17 L0 -50 L58 -17 V48 Z M-75 49 H75 M-14 48 V12 Q0 -5 14 12 V48"/><path d="M-54 -13 L0 -42 L54 -13" stroke="${EXL_WOOD}"/></g>`;
  } else if (kind === 1) {
    g += `<g transform="translate(${exlN(cx)} ${exlN(cy)}) scale(${exlN(s)})" fill="none" stroke="${C.chalk}" stroke-width="5"><rect x="-65" y="-48" width="130" height="96" rx="4"/><path d="M0 -46 V46 M-56 0 H-4 M8 0 H56" stroke="${C.blue}" stroke-width="4"/></g>`;
  } else {
    g += exlShelf(cx - 28 * s, cy - 6 * s, s * 0.62, 1) + exlTable(cx + 34 * s, cy + 30 * s, s * 0.62, 1);
  }
  return g + '</g>';
}

function exlShelf(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${exlN(cx)} ${exlN(cy)}) scale(${exlN(scale)})" opacity="${exlO(op)}" fill="none" stroke="${C.chalk}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M-35 -31 V32 H35 V-31 M-35 -4 H35 M-35 17 H35"/><path d="M-26 -29 V-7 M-11 -28 V-7 M5 -29 V-7 M21 -28 V-7 M-26 -2 V15 M-10 -2 V15 M8 -2 V15 M23 -2 V15" stroke="${C.blue}" stroke-width="6"/><path d="M-43 34 H43" stroke="${EXL_WOOD}"/></g>`;
}

function exlCounter(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${exlN(cx)} ${exlN(cy)}) scale(${exlN(scale)})" opacity="${exlO(op)}" fill="none" stroke="${C.chalk}" stroke-width="5" stroke-linejoin="round"><path d="M-38 -13 H38 V8 H-38 Z M-31 8 V31 M31 8 V31 M-44 32 H44"/><path d="M-18 -8 V2 M0 -8 V2 M18 -8 V2" stroke="${C.yellow}" stroke-width="4"/></g>`;
}

function exlTable(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${exlN(cx)} ${exlN(cy)}) scale(${exlN(scale)})" opacity="${exlO(op)}" fill="none" stroke="${C.chalk}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M-39 -5 H39 V7 H-39 Z M-31 7 L-25 33 M31 7 L25 33"/><path d="M-42 34 H42" stroke="${EXL_WOOD}" stroke-width="4"/></g>`;
}

function exlLamp(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${exlN(cx)} ${exlN(cy)}) scale(${exlN(scale)})" opacity="${exlO(op)}" fill="none" stroke="${C.chalk}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M-26 31 H22 M-14 31 L-4 2 L14 -16"/><circle cx="-4" cy="2" r="4"/><path d="M6 -30 L34 -12 L22 -2 Z"/><path d="M22 4 L30 18 M30 -2 L40 8" stroke="${C.yellow}" stroke-width="3"/></g>`;
}

function exlUpArrow(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${exlN(cx)} ${exlN(cy)}) scale(${exlN(scale)})" opacity="${exlO(op)}" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M-34 32 V-5 L0 -26 L34 -5 V32 Z" stroke="${C.chalk}" stroke-width="4"/><path d="M0 23 V-15 M-12 -3 L0 -15 L12 -3" stroke="${C.yellow}" stroke-width="7"/><path d="M-39 34 H39" stroke="${EXL_WOOD}" stroke-width="4"/></g>`;
}

function exlBookPile(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${exlN(cx)} ${exlN(cy)}) scale(${exlN(scale)})" opacity="${exlO(op)}" stroke-linejoin="round"><path d="M-38 18 L-8 9 L-8 31 L-38 39 Z M-8 9 L19 18 V40 L-8 31 Z" fill="rgba(127,182,217,.16)" stroke="${C.chalk}" stroke-width="4"/><path d="M-24 -4 L7 -13 L7 9 L-24 18 Z M7 -13 L35 -4 V18 L7 9 Z" fill="rgba(232,135,91,.12)" stroke="${C.chalk}" stroke-width="4"/><path d="M-31 -27 L-3 -35 L-3 -15 L-31 -7 Z M-3 -35 L23 -27 V-7 L-3 -15 Z" fill="rgba(242,193,78,.12)" stroke="${C.chalk}" stroke-width="4"/></g>`;
}

function exlDoll(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${exlN(cx)} ${exlN(cy)}) scale(${exlN(scale)})" opacity="${exlO(op)}" stroke-linecap="round" stroke-linejoin="round"><circle cx="0" cy="-72" r="31" fill="rgba(240,217,189,.55)" stroke="${C.chalk}" stroke-width="5"/><path d="M-28 -77 Q-21 -112 4 -105 Q27 -99 29 -75 Q9 -90 -4 -87 Q-18 -83 -28 -77Z" fill="${EXL_WOOD}" stroke="${C.chalk}" stroke-width="3"/><path d="M-43 43 Q-40 -28 0 -28 Q40 -28 43 43Z" fill="rgba(127,182,217,.28)" stroke="${C.chalk}" stroke-width="5"/><path d="M-37 -5 L-70 26 M37 -5 L70 26 M-19 43 L-30 91 M19 43 L30 91" fill="none" stroke="${C.chalk}" stroke-width="9"/><circle cx="-10" cy="-67" r="3" fill="${EXL_WOOD}"/><circle cx="10" cy="-67" r="3" fill="${EXL_WOOD}"/></g>`;
}

function exlClassroom(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${exlN(cx)} ${exlN(cy)}) scale(${exlN(scale)})" opacity="${exlO(op)}" fill="none" stroke="${C.chalk}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"><path d="M-132 78 L-132 -36 L0 -105 L132 -36 L132 78 Z" fill="rgba(127,182,217,.055)"/><path d="M-96 -26 H-36 V24 H-96 Z M-66 -26 V24 M-96 -1 H-36 M36 -26 H96 V24 H36 Z M66 -26 V24 M36 -1 H96"/><path d="M-32 78 V27 Q0 1 32 27 V78 M-149 79 H149"/><path d="M-132 -36 L0 -105 L132 -36" stroke-width="9"/></g>`;
}

function exlBus(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${exlN(cx)} ${exlN(cy)}) scale(${exlN(scale)})" opacity="${exlO(op)}" stroke-linejoin="round"><rect x="-180" y="-53" width="360" height="108" rx="22" fill="rgba(127,182,217,.16)" stroke="${C.chalk}" stroke-width="6"/>` +
    [-145, -70, 5, 80].map((x) => `<rect x="${x}" y="-33" width="54" height="42" rx="7" fill="${C.deep}" stroke="${C.chalk}" stroke-width="4"/>`).join('') +
    `<path d="M109 -45 H147 L168 -16 V8 H109 Z M-168 17 H168 M104 7 V52" fill="${C.deep}" stroke="${C.chalk}" stroke-width="4"/><circle cx="-112" cy="58" r="28" fill="${C.deep}" stroke="${C.chalk}" stroke-width="5"/><circle cx="112" cy="58" r="28" fill="${C.deep}" stroke="${C.chalk}" stroke-width="5"/><circle cx="-112" cy="58" r="9" fill="none" stroke="${C.dim}" stroke-width="4"/><circle cx="112" cy="58" r="9" fill="none" stroke="${C.dim}" stroke-width="4"/></g>`;
}

function exlTree(cx, baseY, scale = 1, op = 1) {
  return `<g transform="translate(${exlN(cx)} ${exlN(baseY)}) scale(${exlN(scale)})" opacity="${exlO(op)}" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M0 0 L-6 -146 M-3 -70 L-58 -112 M-2 -97 L55 -139 M-4 -47 L-52 -74 M1 -83 L48 -103" stroke="${C.chalk}" stroke-width="10"/><path d="M-58 -112 Q-92 -126 -91 -158 Q-60 -163 -42 -130 M55 -139 Q68 -168 99 -157 Q96 -128 65 -121 M-52 -74 Q-83 -91 -103 -73 Q-92 -48 -54 -61 M48 -103 Q77 -126 102 -105 Q90 -81 51 -87" fill="rgba(143,209,138,.16)" stroke="${C.green}" stroke-width="6"/></g>`;
}


const EXL_BR = 34, EXL_KNOT = '#c96a40', EXL_CREAM = '#efe9d8', EXL_INK = '#1a2b23';
function exlBead(cx, cy, sc = 0.8, op = 1, color = EXL_BLUE) {
  const r = EXL_BR * sc;
  if (op <= 0.002 || r <= 1) return '';
  return `<g opacity="${exlO(op)}"><circle cx="${exlN(cx)}" cy="${exlN(cy)}" r="${exlN(r)}" fill="${color}" stroke="rgba(26,43,35,.5)" stroke-width="3"/><ellipse cx="${exlN(cx-r*.38)}" cy="${exlN(cy-r*.42)}" rx="${exlN(r*.26)}" ry="${exlN(r*.15)}" fill="#fff" opacity=".5" transform="rotate(-35 ${exlN(cx-r*.38)} ${exlN(cy-r*.42)})"/></g>`;
}
function exlBow(cx, cy, sc = 0.8, op = 1) {
  if (op <= 0.002 || sc <= 0.05) return '';
  const w = 64*sc, h = 40*sc, kr = 19*sc, st = 'rgba(26,43,35,.5)', f = n => n.toFixed(1);
  return `<g opacity="${exlO(op)}"><polygon points="${f(cx-6*sc)},${f(cy)} ${f(cx-w)},${f(cy-h)} ${f(cx-w)},${f(cy+h)}" fill="${EXL_ORANGE}" stroke="${st}" stroke-width="3"/><polygon points="${f(cx+6*sc)},${f(cy)} ${f(cx+w)},${f(cy-h)} ${f(cx+w)},${f(cy+h)}" fill="${EXL_ORANGE}" stroke="${st}" stroke-width="3"/><circle cx="${f(cx)}" cy="${f(cy)}" r="${f(kr)}" fill="${EXL_KNOT}" stroke="${st}" stroke-width="3"/></g>`;
}
function exlPhrase(x,y,value,size=30,color=C.chalk,op=1,anchor='start') {
  if (op<=0.001) return '';
  return txt(x,y,value,{a:anchor,s:size,w:1,f:color,o:op});
}
function exlWorkTag(x,y,w,value,op=1) { return exlLabel(x+w/2,y,value,34,C.chalk,op); }
function exlOrderCard(x,y,w,h,value,op=1,dashed=false) {
  if (op<=0.001) return '';
  const dash = dashed ? '13 9' : '';
  return `<g opacity="${exlO(op)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="13" fill="rgba(26,43,35,.18)" stroke="#f2c14e" stroke-width="3" stroke-dasharray="${dash}"/>${txt(x+w/2,y+h/2+10,value,{a:'middle',s:30,w:1,f:'#f2c14e'})}</g>`;
}
function exlUseCard(x,y,op=1,lit=0,dashed=false) {
  if (op<=0.001) return '';
  const ring = lit>0.001 ? `<ellipse cx="${x+45}" cy="${y+22}" rx="55" ry="32" fill="rgba(242,193,78,${(0.12+0.12*lit).toFixed(3)})" stroke="#f2c14e" stroke-width="4" opacity="${exlO(lit)}"/>` : '';
  const dash=dashed?'11 8':'', color=dashed?'#f2c14e':'#1a2b23', fill=dashed?'rgba(26,43,35,.12)':'#f2c14e';
  const scale=1+0.08*lit;
  return `<g opacity="${exlO(op)}" transform="translate(${x+45} ${y+22}) scale(${scale}) translate(${-x-45} ${-y-22})">${ring}<rect x="${x}" y="${y}" width="90" height="44" rx="5" fill="${fill}" stroke="#f2c14e" stroke-width="3" stroke-dasharray="${dash}"/>${txt(x+45,y+32,'用處',{a:'middle',s:30,w:1,f:color})}</g>`;
}
function exlViewfinder(x,y,w,h,op=1) {
  if (op<=0.01||w<2||h<2) return '';
  const c=Math.min(24,w/3,h/3);
  const solid=[
    `M${x} ${y+c} V${y} H${x+c}`, `M${x+w-c} ${y} H${x+w} V${y+c}`,
    `M${x} ${y+h-c} V${y+h} H${x+c}`, `M${x+w-c} ${y+h} H${x+w} V${y+h-c}`
  ].join(' ');
  return `<g opacity="${exlO(op)}"><rect x="${exlN(x)}" y="${exlN(y)}" width="${exlN(w)}" height="${exlN(h)}" fill="none" stroke="#f2c14e" stroke-width="4" stroke-dasharray="14 11"/><path d="${solid}" fill="none" stroke="#f2c14e" stroke-width="4"/></g>`;
}
function exlBorrowArea(op=1) {
  let g=''; [360,510].forEach(y=>[300,390,480,570,660,750].forEach(x=>g+=exlShelf(x,y,.7,op)));
  return g+exlCounter(250,680,1.3,op);
}
function exlReadArea(op=1) {
  let g=''; [420,620].forEach(y=>[250,480,710].forEach(x=>{g+=exlTable(x,y,.9,op);g+=exlLamp(x,y-50,.5,op);}));
  return g;
}
function exlPeriod(cx,cy,op=1) { return exlCircle(cx,cy,14,C.chalk,5,'none',op); }
function exlOrderIcon(kind,cx,cy,k,op=1) {
  const p=Math.max(0,Math.min(1,k)), chalk=C.chalk, yellow='#f2c14e';
  if(kind===0) {
    const stroke=p>.65?yellow:chalk;
    const ghost=p>.01?`<rect x="${cx-100}" y="${cy-60}" width="200" height="120" fill="none" stroke="${chalk}" stroke-width="4" opacity="${exlO(op*.35*Math.min(1,p*3))}"/>`:'';
    return ghost+`<rect x="${exlN(lerp(cx-100,cx+20,p))}" y="${exlN(lerp(cy-60,cy+12,p))}" width="${exlN(lerp(200,70,p))}" height="${exlN(lerp(120,45,p))}" fill="none" stroke="${stroke}" stroke-width="5" opacity="${exlO(op)}"/>`;
  }
  if(kind===1) return (p>.01?`<circle cx="${cx}" cy="${cy}" r="60" fill="none" stroke="${chalk}" stroke-width="4" opacity="${exlO(op*.35*Math.min(1,p*3))}"/>`:'')+`<circle cx="${cx}" cy="${cy}" r="${exlN(lerp(60,20,p))}" fill="none" stroke="${p>.65?yellow:chalk}" stroke-width="5" opacity="${exlO(op)}"/>`;
  const outer=`<rect x="${cx-100}" y="${cy-65}" width="200" height="130" fill="none" stroke="${chalk}" stroke-width="5" opacity="${exlO(op)}"/>`;
  const inner=`<rect x="${cx-45}" y="${cy-30}" width="90" height="60" fill="none" stroke="${chalk}" stroke-width="5" opacity="${exlO(op)}"/>`;
  return outer+inner+arrow(cx-100,cy,cx-45,cy,yellow,op,false,p);
}
function exlRectAt(u,a,b,from,to) {
  const p=exlK(u,a,b);
  return {x:lerp(from.x,to.x,p),y:lerp(from.y,to.y,p),w:lerp(from.w,to.w,p),h:lerp(from.h,to.h,p)};
}

function s1(u) {
  let g=head(u,'開場','骨架長肉')+exlTag(1);
  const titleOp=exlK(u,.2,.8);
  g+=`<g opacity="${exlO(titleOp)}">${box(640,200,320,72,'#f2c14e',1,C.deep)}${exlLabel(800,248,'〈圖書館〉',40,'#f2c14e')}</g>`;
  const xs=[140,360,780,1200], ws=[200,400,400,200], work=['位置和整體','介紹借書區','介紹閱讀區','總結用處'], starts=[.5,1.15,1.8,2.45];
  const dim=1-.65*exlK(u,4,5);
  for(let i=0;i<4;i++){const appear=exlK(u,starts[i],starts[i]+.55),op=appear*(i===1?1:dim);g+=exlBlock(xs[i],300,ws[i],150,EXL_BLUE,op,false)+exlWorkTag(xs[i],385,ws[i],work[i],op);}
  const p=exlK(u,4,5.5), bx=lerp(560,480,p), by=lerp(360,500,p), bw=lerp(0,640,p), bh=lerp(0,300,p);
  if(u>4){g+=exlCardFrame(bx,by,bw,bh,exlK(u,4,4.6),false,C.chalk);g+=exlWorkTag(480,550,640,'介紹借書區',exlK(u,5.2,5.8));}
  g+=exlLabel(1250,660,'長肉',36,'#f2c14e',exlK(u,6.5,7.5));
  return exlPaint(g);
}

function s2(u) {
  let g=head(u,'一段裡面','一個句號一層')+exlTag(1);
  const f=exlK(u,.2,.8);
  g+=exlCardFrame(500,230,600,560,f,false,C.chalk)+exlWorkTag(500,285,600,'介紹借書區',f);
  const starts=[.8,1.15,1.5], src=[[1300,350],[1300,470],[1300,590]], dst=[[800,680],[800,580],[800,480]], times=[2,4.5,7];
  for(let i=0;i<3;i++){
    const [sx,sy]=src[i],[tx,ty]=dst[i],t=times[i];
    const sourceOp=u<t?exlK(u,starts[i],starts[i]+.3):.3;
    g+=exlPeriod(sx,sy,sourceOp);
    const p=exlK(u,t,t+1);
    if(u>=t&&u<t+1) g+=exlPeriod(lerp(sx,tx,p),lerp(sy,ty,p),1);
    if(u>=t+1) g+=exlBead(tx,ty,.8,1);
  }
  g+=exlLabel(300,510,'一句一層',36,'#f2c14e',exlK(u,9,10));
  return exlPaint(g);
}

function s3(u) {
  let g=head(u,'一段裡面','排出次序')+exlTag(1);
  const xs=[120,610,1100], labels=['由整體而部分','由大到小','由外而內'], starts=[.5,3,5.5];
  for(let i=0;i<3;i++){const t=starts[i],op=exlK(u,t,t+.45),k=exlK(u,t+.5,t+2);g+=exlCardFrame(xs[i],240,380,280,op,false,'#f2c14e')+exlLabel(xs[i]+190,290,labels[i],30,'#f2c14e',op)+exlOrderIcon(i,xs[i]+190,420,k,op);}
  const src=[[300,700],[360,670],[400,730],[340,760]], dst=[[700,720],[820,720],[940,720],[1060,720]], show=exlK(u,8,9), slide=exlK(u,9.5,11);
  for(let i=0;i<4;i++){g+=exlCircle(src[i][0],src[i][1],22,C.chalk,4,'none',show*(1-.7*slide),'8 7');g+=exlCircle(lerp(src[i][0],dst[i][0],slide),lerp(src[i][1],dst[i][1],slide),22,C.chalk,4,'none',slide,'8 7');}
  g+=exlLabel(350,815,'想到的材料',30,C.chalk,show);
  g+=arrow(660,770,1120,770,'#f2c14e',exlK(u,9.5,11),false,exlK(u,9.5,10.4));
  g+=exlLabel(1300,735,'排出次序',34,'#f2c14e',exlK(u,11,12));
  return exlPaint(g);
}

function s4(u) {
  let g=head(u,'示範','借書區怎麼排')+exlTag(1)+exlBorrowArea(exlK(u,.2,.8));
  g+=exlCardFrame(980,230,520,560,1,false,C.chalk)+exlWorkTag(980,285,520,'介紹借書區')+exlOrderCard(1110,310,260,50,'由整體而部分');
  let r;
  if(u<1)r={x:480,y:510,w:0,h:0};
  else if(u<2)r=exlRectAt(u,1,2,{x:480,y:510,w:0,h:0},{x:130,y:260,w:700,h:500});
  else if(u<5)r={x:130,y:260,w:700,h:500};
  else if(u<6)r=exlRectAt(u,5,6,{x:130,y:260,w:700,h:500},{x:425,y:310,w:110,h:100});
  else if(u<9)r={x:425,y:310,w:110,h:100};
  else if(u<10)r=exlRectAt(u,9,10,{x:425,y:310,w:110,h:100},{x:150,y:610,w:200,h:140});
  else r={x:150,y:610,w:200,h:140};
  g+=exlViewfinder(r.x,r.y,r.w,r.h,exlK(u,1,1.2));
  const ys=[440,560,680], words=['十二排書架','依種類排好','借書還書'], times=[2.5,6.5,10.5];
  for(let i=0;i<3;i++){const p=exlK(u,times[i],times[i]+.8);if(u>=times[i])g+=exlBead(1040,lerp(285,ys[i],p),.8,1);if(u>=times[i]+.8)g+=exlPhrase(1090,ys[i]+10,words[i],30);}
  return exlPaint(g);
}

function s5(u) {
  let g=head(u,'示範','閱讀區怎麼排')+exlTag(1)+exlReadArea(exlK(u,.2,.8));
  const a=u>=.2?1:0;
  g+=exlCardFrame(870,230,320,540,a,false,C.chalk)+exlWorkTag(870,285,320,'介紹借書區',a)+exlOrderCard(900,310,260,50,'由整體而部分',a);
  const ay=[430,530,630], aw=['十二排書架','依種類排好','借書還書'];
  for(let i=0;i<3;i++)g+=exlBead(920,ay[i],.8,a)+exlPhrase(960,ay[i]+10,aw[i],30,C.chalk,a);
  const b=exlK(u,.5,1);
  g+=exlCardFrame(1210,230,320,540,b,false,C.chalk)+exlWorkTag(1210,285,320,'介紹閱讀區',b)+exlOrderCard(1240,310,260,50,'由大到小',b);
  // 由大到小：先框住全部長桌（第一層落下時仍是大範圍），之後才縮到一張桌子和檯燈
  const full={x:140,y:330,w:680,h:380}, desk={x:410,y:320,w:140,h:150};let r;
  if(u<1)r={x:480,y:520,w:0,h:0};else if(u<2)r=exlRectAt(u,1,2,{x:480,y:520,w:0,h:0},full);else if(u<8)r=full;else if(u<9)r=exlRectAt(u,8,9,full,desk);else r=desk;
  g+=exlViewfinder(r.x,r.y,r.w,r.h,exlK(u,1,1.2));
  const by=[430,530], bw=['六張長桌、檯燈','安靜看書'], bt=[6.8,10.2];
  for(let i=0;i<2;i++){const op=exlK(u,bt[i],bt[i]+.35);g+=exlBead(1260,by[i],.8,op)+exlPhrase(1300,by[i]+10,bw[i],30,C.chalk,op);}
  return exlPaint(g);
}

function s6(u) {
  let g=head(u,'示範','最後說用處')+exlTag(1);
  const boxes=[
    {x:140,title:'介紹借書區',order:'由整體而部分',words:['十二排書架','依種類排好','借書還書']},
    {x:600,title:'介紹閱讀區',order:'由大到小',words:['六張長桌、檯燈','安靜看書']}
  ];
  const base=exlK(u,.2,.8);
  boxes.forEach(b=>{g+=exlCardFrame(b.x,230,420,520,base,false,C.chalk)+exlWorkTag(b.x,285,420,b.title,base)+exlOrderCard(b.x+30,310,260,50,b.order,base);[430,530,630].forEach((y,i)=>{if(b.words[i]){const yy=y+10;g+=exlBead(b.x+50,y,.8,base)+exlPhrase(b.x+90,yy,b.words[i],30,C.chalk,base);}});});
  const pa=Math.max(exlFlash(u,5),exlFlash(u,7)), pb=Math.max(exlFlash(u,6),exlFlash(u,8)), la=exlK(u,5,5.5), lb=exlK(u,6,6.5), aa=exlK(u,2,2.3), ab=exlK(u,3.5,3.8);
  g+=exlUseCard(385,608,aa,Math.max(pa,la))+exlUseCard(845,508,ab,Math.max(pb,lb));
  const card=exlK(u,6.5,7.5);
  g+=exlCardFrame(1080,280,460,320,card,false,C.chalk)+exlLabel(1310,335,'講義的教室',34,C.chalk,card)+exlClassroom(1310,445,.55,card)+exlLabel(1310,560,'閱讀、放雜物',30,'#f2c14e',card);
  return exlPaint(g);
}

function s7(u) {
  let g=head(u,'檢查','不加感覺、要準確')+exlTag(1);
  const left=exlK(u,.2,.8),right=exlK(u,1,1.5);
  g+=exlCardFrame(140,260,460,500,left,false,C.chalk)+exlWorkTag(140,315,460,'記敘文',left);
  g+=exlCardFrame(1000,260,460,500,right,false,C.chalk)+exlWorkTag(1000,315,460,'這篇說明文',right);
  [410,500,590].forEach((y,i)=>g+=exlBead(370,y,.8,exlK(u,.2+i*.45,.55+i*.45)));
  g+=exlBow(370,680,.8,exlK(u,1.55,2));
  [410,500,590].forEach((y,i)=>g+=exlBead(1230,y,.8,exlK(u,1+i*.45,1.35+i*.45)));
  g+=exlCircle(1230,680,40,EXL_ORANGE,4,'none',.5,'10 8')+exlLabel(1230,810,'不加感覺',30,'#f2c14e',exlK(u,3,4));
  let lx=800,ly=465,lo=0;
  if(u>=5.5&&u<6.3){ly=lerp(240,465,exlK(u,5.5,6.3));lo=exlK(u,5.5,5.8);}
  else if(u>=6.3&&u<7.5){lx=800+22*Math.sin((u-6.3)*Math.PI*2);lo=1;}
  else if(u>=7.5&&u<11.5)lo=1;
  else if(u>=11.5){ly=lerp(465,240,exlK(u,11.5,12.5));lo=1;}
  if(u>=5.5)g+=exlLens(lx,ly,48,lo);
  const drop=exlK(u,8,9), bad=exlK(u,4,4.4), old=bad*(u<8?1:.25);
  g+=exlBead(800,400,.8,old,'#8a9590')+exlLabel(800,465,'書架好多好漂亮',30,C.chalk,old);
  if(u>=8&&u<9){const op=(1-drop)*bad;g+=exlBead(800,lerp(400,735,drop),.8,op,'#8a9590')+exlLabel(800,lerp(465,800,drop),'書架好多好漂亮',30,C.chalk,op);}
  if(u>=7.5)g+=exlCross(800,400,24,exlK(u,7.5,8));
  const good=exlK(u,9.5,10.2);
  g+=exlBead(800,580,.8,good)+exlLabel(800,645,'十二排書架',30,C.chalk,good)+exlCheck(900,580,.6,exlK(u,9.8,10.3))+exlStar(958,548,26,exlK(u,9.8,10.3))+exlLabel(800,715,'要準確',30,'#f2c14e',exlK(u,10.5,11.5));
  return exlPaint(g);
}

function s8(u) {
  let g=head(u,'動筆','從短語到句子')+exlTag(1);
  const f=exlK(u,.2,.8);
  g+=exlCardFrame(300,240,1000,420,f,false,C.chalk)+exlWorkTag(300,295,1000,'介紹借書區',f);
  const bead=exlK(u,.8,1.6);
  g+=exlBead(420,380,.8,bead)+exlPhrase(470,390,'十二排書架',36,C.chalk,bead)+arrow(560,405,560,440,C.dim,exlK(u,2.2,2.8),false,exlK(u,2.2,2.8));
  const sentence='借書區有一個櫃臺和十二排書架。';
  g+=exlType(sentence,u,800,505,36,'#f2c14e',3,8)+exlBracket(854,1034,514,exlK(u,8.5,9.5),'#f2c14e');
  const flash=exlFlash(u,9.5);if(flash>.01)g+=exlCircle(1052,493,22,'#f2c14e',4,'rgba(242,193,78,.18)',flash);
  g+=exlLabel(800,720,'單句到多句',30,'#f2c14e',exlK(u,10,11));
  return exlPaint(g);
}

function s9(u) {
  let g=head(u,'練習','換你長肉')+exlTag(1);
  const title=exlK(u,.2,.8);
  g+=`<g opacity="${exlO(title)}">${box(640,200,320,72,'#f2c14e',1,C.deep)}${exlLabel(800,248,'〈我的學校〉',40,'#f2c14e')}</g>`;
  const xs=[140,360,780,1200],ws=[200,400,400,200],work=['位置和整體','介紹第一處','介紹第二處','總結用處'],starts=[.6,1.2,1.8,2.4];
  const fade=1-.6*exlK(u,3.5,5);
  for(let i=0;i<4;i++){const appear=exlK(u,starts[i],starts[i]+.45),op=appear*(i===1?1:fade);g+=exlBlock(xs[i],300,ws[i],130,EXL_BLUE,op,true)+exlWorkTag(xs[i],375,ws[i],work[i],op);}
  const from={x:360,y:300,w:400,h:130},to={x:480,y:460,w:640,h:370},r=u<3.5?from:exlRectAt(u,3.5,5,from,to);
  if(u>=3.5)g+=exlCardFrame(r.x,r.y,r.w,r.h,exlK(u,3.5,4),true,EXL_BLUE);
  const op=exlK(u,5,6);
  if(u>=5){
    g+=exlWorkTag(480,505,640,'介紹第一處',op)+exlOrderCard(650,525,300,50,'由＿＿＿',op,true);
    const ys=[630,700,770];ys.forEach(y=>g+=exlCircle(600,y,EXL_BR*.8,EXL_BLUE,4,'none',op,'11 8'));
    ys.forEach(y=>g+=exlLine(640,y,860,y,EXL_BLUE,4,op,'11 8'));
    g+=exlUseCard(880,748,op,0,true);
    const cf=exlFlash(u,7), bf=[8,9,10].map(t=>exlFlash(u,t)), uf=exlFlash(u,11);
    if(cf>.01)g+=`<rect x="650" y="525" width="300" height="50" rx="13" fill="rgba(242,193,78,${(.34*cf).toFixed(3)})" stroke="none"/>`;
    ys.forEach((y,i)=>{if(bf[i]>.01)g+=`<circle cx="600" cy="${y}" r="${EXL_BR*.8}" fill="rgba(242,193,78,${(.42*bf[i]).toFixed(3)})" stroke="none"/>`;});
    if(uf>.01)g+=`<rect x="880" y="748" width="90" height="44" rx="5" fill="rgba(242,193,78,${(.34*uf).toFixed(3)})" stroke="none"/>`;
  }
  return exlPaint(g);
}
