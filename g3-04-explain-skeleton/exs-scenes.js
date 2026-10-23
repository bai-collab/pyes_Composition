// 三年級說明文（事物）第一集：每個場景只由段內秒數 u 決定。
const META = {
  title: '寫一篇解說牌',
  subtitle: '9 段・約 2 分鐘・三年級說明文（事物）第一集',
  ariaLabel: '用日記本、解說牌、材料泡泡與四塊積木，介紹說明文要說什麼，以及圖書館說明文的四段骨架。',
  note: '出處：楊裕貿作文寫作要領、研習講義、寫作課程設計；作文仿寫學習單。日記本、解說牌、釘子標籤、泡泡、積木、工作牌、放大鏡、飲料成分表是視覺比喻；圖書館是示意圖；示範句與短語自編。鍵盤操作：空白鍵播放／暫停，左右方向鍵切換段落，F 鍵全螢幕。畫面只由時間決定。',
  works: [],
};

const EXS_WOOD = '#a9784f';
const EXS_RED = '#d9605a';
const EXS_GREEN = '#8fd18a';
const EXS_BLUE = '#7fb6d9';
const EXS_ORANGE = '#e8875b';
const exsK = (u, a, b) => ease(P(u, a, b));
const exsO = (value) => Math.max(0, Math.min(1, Number(value) || 0)).toFixed(3);
const exsN = (value) => Number(value).toFixed(1);

function exsTag(op = 1) {
  return `<g opacity="${exsO(op)}">${box(1375, 56, 165, 60, C.orange, 1, C.deep)}${txt(1457, 98, '比喻', { a: 'middle', s: 30, w: 1, f: C.orange })}</g>`;
}

function exsLabel(cx, y, value, size = 30, color = C.chalk, op = 1) {
  if (op <= 0.001) return '';
  return txt(cx, y, value, { a: 'middle', s: size, w: 1, f: color, o: op });
}

function exsTextByChar(value, cx, y, size, color = C.chalk, op = 1) {
  const chars = Array.from(value);
  return chars.map((ch, i) => txt(cx + (i - (chars.length - 1) / 2) * size, y, ch, {
    a: 'middle', s: size, w: 1, f: color, o: op,
  })).join('');
}

function exsType(value, u, cx, y, size, color, start, end, op = 1) {
  if (u <= start || op <= 0.001) return '';
  const chars = Array.from(value);
  const count = Math.min(chars.length, Math.ceil(exsK(u, start, end) * chars.length));
  return chars.slice(0, count).map((ch, i) => txt(cx + (i - (chars.length - 1) / 2) * size, y, ch, {
    a: 'middle', s: size, w: 1, f: color, o: op,
  })).join('');
}

function exsLine(x1, y1, x2, y2, color = C.chalk, width = 5, op = 1, dash = '') {
  if (op <= 0.001) return '';
  return `<path d="M${exsN(x1)} ${exsN(y1)} L${exsN(x2)} ${exsN(y2)}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${exsO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function exsPath(d, color = C.chalk, width = 5, op = 1, fill = 'none', dash = '') {
  if (op <= 0.001) return '';
  return `<path d="${d}" fill="${fill}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${exsO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function exsCircle(cx, cy, r, stroke = C.chalk, width = 5, fill = 'none', op = 1, dash = '') {
  if (op <= 0.001 || r <= 0) return '';
  return `<circle cx="${exsN(cx)}" cy="${exsN(cy)}" r="${exsN(r)}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" opacity="${exsO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function exsBlock(x, y, w, h, color, op = 1, dashed = false) {
  if (op <= 0.001 || w <= 2 || h <= 2) return '';
  if (dashed) return `<g opacity="${exsO(op)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="rgba(239,233,216,.012)" stroke="${color}" stroke-width="5" stroke-dasharray="14 10"/></g>`;
  let g = `<g opacity="${exsO(op)}">`;
  const count = Math.max(2, Math.floor(w / 130));
  for (let i = 0; i < count; i++) {
    const cx = x + w * (i + 0.5) / count;
    g += `<rect x="${exsN(cx - 20)}" y="${exsN(y - 11)}" width="40" height="13" rx="6" fill="${color}"/>`;
  }
  return g + `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${color}" fill-opacity=".22" stroke="${C.chalk}" stroke-width="4"/></g>`;
}

function exsCardFrame(x, y, w, h, op = 1, dashed = false, stroke = C.chalk) {
  if (op <= 0.001) return '';
  if (dashed) return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="rgba(239,233,216,.012)" stroke="${stroke}" stroke-width="4" stroke-dasharray="13 9" opacity="${exsO(op)}"/>`;
  return `<g opacity="${exsO(op)}">${box(x, y, w, h, stroke, 1, C.deep)}</g>`;
}

function exsStar(cx, cy, r, op = 1) {
  if (op <= 0.01 || r <= 1) return '';
  const points = [];
  for (let i = 0; i < 10; i++) {
    const angle = -Math.PI / 2 + i * Math.PI / 5;
    const radius = i % 2 ? r * 0.46 : r;
    points.push(`${exsN(cx + Math.cos(angle) * radius)},${exsN(cy + Math.sin(angle) * radius)}`);
  }
  return `<polygon points="${points.join(' ')}" fill="rgba(242,193,78,.3)" stroke="${C.yellow}" stroke-width="5" stroke-linejoin="round" opacity="${exsO(op)}"/>`;
}

function exsCheck(cx, cy, scale = 1, op = 1) {
  if (op <= 0.01) return '';
  return `<path d="M${cx - 30 * scale} ${cy} L${cx - 8 * scale} ${cy + 23 * scale} L${cx + 37 * scale} ${cy - 30 * scale}" fill="none" stroke="${EXS_GREEN}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" opacity="${exsO(op)}"/>`;
}

function exsCross(cx, cy, size = 24, op = 1) {
  if (op <= 0.01) return '';
  return `<g opacity="${exsO(op)}" stroke="${EXS_RED}" stroke-width="10" stroke-linecap="round"><line x1="${cx - size}" y1="${cy - size}" x2="${cx + size}" y2="${cy + size}"/><line x1="${cx + size}" y1="${cy - size}" x2="${cx - size}" y2="${cy + size}"/></g>`;
}

function exsLens(cx, cy, r = 48, op = 1, dashed = false, handleUp = false) {
  if (op <= 0.01 || r <= 1) return '';
  const dash = dashed ? '11 9' : '';
  const sy = handleUp ? -1 : 1;
  return `<g opacity="${exsO(op)}"><circle cx="${exsN(cx)}" cy="${exsN(cy)}" r="${exsN(r)}" fill="rgba(242,193,78,.045)" stroke="${C.yellow}" stroke-width="8"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<path d="M${exsN(cx + r * 0.68)} ${exsN(cy + sy * r * 0.68)} L${exsN(cx + r * 1.28)} ${exsN(cy + sy * r * 1.28)}" stroke="${C.yellow}" stroke-width="17" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<path d="M${exsN(cx + r * 0.8)} ${exsN(cy + sy * 0.8)} L${exsN(cx + r * 1.26)} ${exsN(cy + sy * 1.26)}" stroke="${C.chalk}" stroke-width="4" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/></g>`;
}

function exsFlash(u, start) {
  const fadeIn = exsK(u, start, start + 0.08);
  const fadeOut = 1 - exsK(u, start + 0.42, start + 0.5);
  return Math.max(0, Math.min(fadeIn, fadeOut));
}

function exsBracket(x1, x2, y, progress, color = C.yellow) {
  if (progress <= 0.001) return '';
  const end = lerp(x1, x2, progress);
  return exsPath(`M${x1} ${y - 8} V${y} H${end} V${y - 8}`, color, 4, 1);
}

function exsPaint(svg) {
  return svg.replace(/font-size="24"/g, 'font-size="26"')
    .replace(/<text ([^>]*?)fill="([^"]+)"/g, '<text $1style="fill:$2" fill="$2"');
}

// 粉筆線圖：圖書館只有外框、門窗與書本圖示，不含任何字。
function exsLibrary(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${exsN(cx)} ${exsN(cy)}) scale(${exsN(scale)})" opacity="${exsO(op)}" fill="none" stroke="${C.chalk}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M-148 -92 L0 -124 L148 -92 V108 H-148 Z" fill="rgba(239,233,216,.018)"/><path d="M-148 -92 L0 -124 L148 -92" stroke="${EXS_WOOD}" stroke-width="9"/>` +
    `<path d="M-148 4 H148 M-100 -79 H-48 V-32 H-100 Z M48 -79 H100 V-32 H48 Z M-112 25 H-62 V70 H-112 Z M62 25 H112 V70 H62 Z"/>` +
    `<path d="M-25 108 V43 Q-25 17 0 17 Q25 17 25 43 V108 Z" fill="rgba(127,182,217,.06)"/><path d="M-21 62 Q-10 55 0 62 V85 Q-10 78 -21 85 Z M0 62 Q10 55 21 62 V85 Q10 78 0 85 Z M0 62 V85" stroke-width="3" stroke="${C.yellow}"/>` +
    `<path d="M-150 109 H150" stroke="${C.dim}" stroke-width="4"/></g>`;
}

function exsDiary(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${exsN(cx)} ${exsN(cy)}) scale(${exsN(scale)})" opacity="${exsO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M-104 -65 Q-55 -78 0 -55 V67 Q-53 44 -104 58 Z M0 -55 Q54 -78 104 -65 V58 Q52 44 0 67 Z" fill="rgba(127,182,217,.08)" stroke="${C.chalk}" stroke-width="5"/><path d="M0 -54 V66" fill="none" stroke="${C.chalk}" stroke-width="4"/>` +
    `<circle cx="-57" cy="-28" r="13" fill="none" stroke="${C.yellow}" stroke-width="4"/><path d="M-57 -13 V17 M-57 -2 L-75 8 M-57 -2 L-39 8 M-57 17 L-70 35 M-57 17 L-44 35" fill="none" stroke="${C.chalk}" stroke-width="4"/>` +
    `<path d="M44 -28 Q44 -40 55 -40 Q63 -40 68 -32 Q73 -40 82 -40 Q94 -40 94 -28 Q94 -17 68 0 Q44 -17 44 -28Z" fill="rgba(232,135,91,.12)" stroke="${EXS_ORANGE}" stroke-width="3"/>` +
    `<path d="M39 18 H87 M39 34 H91 M39 50 H78" fill="none" stroke="${C.dim}" stroke-width="3"/></g>`;
}

function exsQuestionArrow(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${exsN(cx)} ${exsN(cy)}) scale(${exsN(scale)})" opacity="${exsO(op)}" fill="none" stroke="${C.chalk}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M-64 -14 Q-64 -42 -40 -42 Q-16 -42 -16 -20 Q-16 -5 -39 5 Q-48 9 -48 22"/><circle cx="-48" cy="39" r="3" fill="${C.chalk}"/>` +
    `<path d="M-2 0 H40 M28 -12 L42 0 L28 12" stroke="${C.yellow}" stroke-width="6"/>` +
    `<path d="M65 -38 V12" stroke="${C.chalk}" stroke-width="8"/><circle cx="65" cy="37" r="4" fill="${C.chalk}" stroke="none"/></g>`;
}

function exsSign(cx, cy, w, h, op = 1) {
  const postEnd = h * 0.85;
  const iconY = cy - h / 3 + (h < 240 ? h * 0.1 : 0);
  return `<g transform="translate(${exsN(cx)} ${exsN(cy)})" opacity="${exsO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M${exsN(-w * 0.34)} ${exsN(h * 0.44)} V${exsN(postEnd)} M${exsN(w * 0.34)} ${exsN(h * 0.44)} V${exsN(postEnd)}" fill="none" stroke="${EXS_WOOD}" stroke-width="10"/>` +
    `<rect x="${exsN(-w / 2)}" y="${exsN(-h / 2)}" width="${w}" height="${h}" rx="7" fill="#315342" stroke="${EXS_WOOD}" stroke-width="6"/>` +
    exsQuestionArrow(0, iconY - cy, Math.min(1, h / 200), 1) + '</g>';
}

function exsBubble(cx, cy, r, kind, op = 1, dashed = false) {
  const dash = dashed ? '11 9' : '';
  let g = `<g opacity="${exsO(op)}"><circle cx="${exsN(cx)}" cy="${exsN(cy)}" r="${exsN(r)}" fill="${dashed ? 'none' : 'rgba(239,233,216,.025)'}" stroke="${C.chalk}" stroke-width="5"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
  if (dashed) return g + '</g>';
  const s = r / 100;
  if (kind === 0) {
    g += `<g transform="translate(${exsN(cx)} ${exsN(cy)}) scale(${exsN(s)})" fill="none" stroke="${C.chalk}" stroke-width="5" stroke-linejoin="round"><path d="M-58 48 V-17 L0 -50 L58 -17 V48 Z M-75 49 H75 M-14 48 V12 Q0 -5 14 12 V48"/><path d="M-54 -13 L0 -42 L54 -13" stroke="${EXS_WOOD}"/></g>`;
  } else if (kind === 1) {
    g += `<g transform="translate(${exsN(cx)} ${exsN(cy)}) scale(${exsN(s)})" fill="none" stroke="${C.chalk}" stroke-width="5"><rect x="-65" y="-48" width="130" height="96" rx="4"/><path d="M0 -46 V46 M-56 0 H-4 M8 0 H56" stroke="${C.blue}" stroke-width="4"/></g>`;
  } else {
    g += exsShelf(cx - 28 * s, cy - 6 * s, s * 0.62, 1) + exsTable(cx + 34 * s, cy + 30 * s, s * 0.62, 1);
  }
  return g + '</g>';
}

function exsShelf(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${exsN(cx)} ${exsN(cy)}) scale(${exsN(scale)})" opacity="${exsO(op)}" fill="none" stroke="${C.chalk}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M-35 -31 V32 H35 V-31 M-35 -4 H35 M-35 17 H35"/><path d="M-26 -29 V-7 M-11 -28 V-7 M5 -29 V-7 M21 -28 V-7 M-26 -2 V15 M-10 -2 V15 M8 -2 V15 M23 -2 V15" stroke="${C.blue}" stroke-width="6"/><path d="M-43 34 H43" stroke="${EXS_WOOD}"/></g>`;
}

function exsCounter(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${exsN(cx)} ${exsN(cy)}) scale(${exsN(scale)})" opacity="${exsO(op)}" fill="none" stroke="${C.chalk}" stroke-width="5" stroke-linejoin="round"><path d="M-38 -13 H38 V8 H-38 Z M-31 8 V31 M31 8 V31 M-44 32 H44"/><path d="M-18 -8 V2 M0 -8 V2 M18 -8 V2" stroke="${C.yellow}" stroke-width="4"/></g>`;
}

function exsTable(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${exsN(cx)} ${exsN(cy)}) scale(${exsN(scale)})" opacity="${exsO(op)}" fill="none" stroke="${C.chalk}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M-39 -5 H39 V7 H-39 Z M-31 7 L-25 33 M31 7 L25 33"/><path d="M-42 34 H42" stroke="${EXS_WOOD}" stroke-width="4"/></g>`;
}

function exsLamp(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${exsN(cx)} ${exsN(cy)}) scale(${exsN(scale)})" opacity="${exsO(op)}" fill="none" stroke="${C.chalk}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M-26 31 H22 M-14 31 L-4 2 L14 -16"/><circle cx="-4" cy="2" r="4"/><path d="M6 -30 L34 -12 L22 -2 Z"/><path d="M22 4 L30 18 M30 -2 L40 8" stroke="${C.yellow}" stroke-width="3"/></g>`;
}

function exsUpArrow(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${exsN(cx)} ${exsN(cy)}) scale(${exsN(scale)})" opacity="${exsO(op)}" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M-34 32 V-5 L0 -26 L34 -5 V32 Z" stroke="${C.chalk}" stroke-width="4"/><path d="M0 23 V-15 M-12 -3 L0 -15 L12 -3" stroke="${C.yellow}" stroke-width="7"/><path d="M-39 34 H39" stroke="${EXS_WOOD}" stroke-width="4"/></g>`;
}

function exsBookPile(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${exsN(cx)} ${exsN(cy)}) scale(${exsN(scale)})" opacity="${exsO(op)}" stroke-linejoin="round"><path d="M-38 18 L-8 9 L-8 31 L-38 39 Z M-8 9 L19 18 V40 L-8 31 Z" fill="rgba(127,182,217,.16)" stroke="${C.chalk}" stroke-width="4"/><path d="M-24 -4 L7 -13 L7 9 L-24 18 Z M7 -13 L35 -4 V18 L7 9 Z" fill="rgba(232,135,91,.12)" stroke="${C.chalk}" stroke-width="4"/><path d="M-31 -27 L-3 -35 L-3 -15 L-31 -7 Z M-3 -35 L23 -27 V-7 L-3 -15 Z" fill="rgba(242,193,78,.12)" stroke="${C.chalk}" stroke-width="4"/></g>`;
}

function exsDoll(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${exsN(cx)} ${exsN(cy)}) scale(${exsN(scale)})" opacity="${exsO(op)}" stroke-linecap="round" stroke-linejoin="round"><circle cx="0" cy="-72" r="31" fill="rgba(240,217,189,.55)" stroke="${C.chalk}" stroke-width="5"/><path d="M-28 -77 Q-21 -112 4 -105 Q27 -99 29 -75 Q9 -90 -4 -87 Q-18 -83 -28 -77Z" fill="${EXS_WOOD}" stroke="${C.chalk}" stroke-width="3"/><path d="M-43 43 Q-40 -28 0 -28 Q40 -28 43 43Z" fill="rgba(127,182,217,.28)" stroke="${C.chalk}" stroke-width="5"/><path d="M-37 -5 L-70 26 M37 -5 L70 26 M-19 43 L-30 91 M19 43 L30 91" fill="none" stroke="${C.chalk}" stroke-width="9"/><circle cx="-10" cy="-67" r="3" fill="${EXS_WOOD}"/><circle cx="10" cy="-67" r="3" fill="${EXS_WOOD}"/></g>`;
}

function exsClassroom(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${exsN(cx)} ${exsN(cy)}) scale(${exsN(scale)})" opacity="${exsO(op)}" fill="none" stroke="${C.chalk}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"><path d="M-132 78 L-132 -36 L0 -105 L132 -36 L132 78 Z" fill="rgba(127,182,217,.055)"/><path d="M-96 -26 H-36 V24 H-96 Z M-66 -26 V24 M-96 -1 H-36 M36 -26 H96 V24 H36 Z M66 -26 V24 M36 -1 H96"/><path d="M-32 78 V27 Q0 1 32 27 V78 M-149 79 H149"/><path d="M-132 -36 L0 -105 L132 -36" stroke-width="9"/></g>`;
}

function exsBus(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${exsN(cx)} ${exsN(cy)}) scale(${exsN(scale)})" opacity="${exsO(op)}" stroke-linejoin="round"><rect x="-180" y="-53" width="360" height="108" rx="22" fill="rgba(127,182,217,.16)" stroke="${C.chalk}" stroke-width="6"/>` +
    [-145, -70, 5, 80].map((x) => `<rect x="${x}" y="-33" width="54" height="42" rx="7" fill="${C.deep}" stroke="${C.chalk}" stroke-width="4"/>`).join('') +
    `<path d="M109 -45 H147 L168 -16 V8 H109 Z M-168 17 H168 M104 7 V52" fill="${C.deep}" stroke="${C.chalk}" stroke-width="4"/><circle cx="-112" cy="58" r="28" fill="${C.deep}" stroke="${C.chalk}" stroke-width="5"/><circle cx="112" cy="58" r="28" fill="${C.deep}" stroke="${C.chalk}" stroke-width="5"/><circle cx="-112" cy="58" r="9" fill="none" stroke="${C.dim}" stroke-width="4"/><circle cx="112" cy="58" r="9" fill="none" stroke="${C.dim}" stroke-width="4"/></g>`;
}

function exsTree(cx, baseY, scale = 1, op = 1) {
  return `<g transform="translate(${exsN(cx)} ${exsN(baseY)}) scale(${exsN(scale)})" opacity="${exsO(op)}" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M0 0 L-6 -146 M-3 -70 L-58 -112 M-2 -97 L55 -139 M-4 -47 L-52 -74 M1 -83 L48 -103" stroke="${C.chalk}" stroke-width="10"/><path d="M-58 -112 Q-92 -126 -91 -158 Q-60 -163 -42 -130 M55 -139 Q68 -168 99 -157 Q96 -128 65 -121 M-52 -74 Q-83 -91 -103 -73 Q-92 -48 -54 -61 M48 -103 Q77 -126 102 -105 Q90 -81 51 -87" fill="rgba(143,209,138,.16)" stroke="${C.green}" stroke-width="6"/></g>`;
}

function exsS1(u) {
  let g = head(u, '開場', '這次寫說明文') + exsTag(1);
  const titleOp = exsK(u, 0.2, 0.8);
  g += `<g opacity="${exsO(titleOp)}">${box(640, 210, 320, 72, C.yellow, 1, C.deep)}${exsLabel(800, 258, '〈圖書館〉', 40, C.yellow)}</g>`;

  const fade = 1 - 0.55 * exsK(u, 3, 4);
  g += `<g opacity="${exsO(fade)}">`;
  const icons = [
    [exsDoll, 230, 340, 0.38], [exsClassroom, 460, 340, 0.38],
    [exsBus, 230, 455, 0.38], [exsTree, 460, 490, 0.38],
  ];
  icons.forEach(([draw, x, y, scale], i) => {
    const start = 0.4 + i * 0.4;
    const op = exsK(u, start, start + 0.4);
    g += draw(x, y, scale, op);
  });
  g += exsLabel(345, 570, '記敘文', 34, C.chalk, exsK(u, 0.8, 1.3));
  g += '</g>';

  const signK = exsK(u, 4, 5.5);
  g += exsSign(1150, lerp(590, 420, signK), 240, 200, signK);
  g += exsLabel(1150, 640, '說明文', 36, C.yellow, exsK(u, 5, 5.8));
  return exsPaint(g);
}

function exsS2(u) {
  let g = head(u, '說明文是什麼', '怎麼樣、是什麼') + exsTag(1);
  const libraryOp = exsK(u, 0.2, 0.8);
  g += exsLibrary(800, 440, 1, libraryOp);
  const leftArrow = exsK(u, 1.2, 2);
  const rightArrow = exsK(u, 5.2, 6);
  if (leftArrow > 0.01) g += arrow(640, 440, 490, 440, C.dim, 0.75, false, leftArrow);
  if (rightArrow > 0.01) g += arrow(960, 440, 1110, 440, C.dim, 0.75, false, rightArrow);

  const diaryOp = exsK(u, 1.5, 2.5);
  g += exsDiary(360, 440, 1, diaryOp);
  g += exsLabel(360, 300, '記敘文', 34, C.chalk, diaryOp);
  g += exsLabel(360, 590, '怎麼樣', 36, C.yellow, exsK(u, 3, 4));

  const signOp = exsK(u, 5.5, 6.5);
  g += exsSign(1240, 430, 220, 180, signOp);
  g += exsLabel(1240, 290, '說明文', 34, C.chalk, signOp);
  g += exsLabel(1240, 655, '是什麼', 36, C.yellow, exsK(u, 7, 8));
  return exsPaint(g);
}

function exsS3(u) {
  let g = head(u, '說明文是什麼', '說明什麼') + exsTag(1);
  const signOp = exsK(u, 0.2, 1);
  g += exsSign(800, 440, 600, 300, signOp);
  const labels = ['形狀', '性質', '成因', '關係', '功用'];
  const xs = [576, 688, 800, 912, 1024];
  labels.forEach((label, i) => {
    const start = 1.5 + i * 0.8;
    const op = exsK(u, start, start + 0.8);
    const active = i === 0 || i === 4;
    const highlight = active ? exsK(u, 6.5, 7.5) : 0;
    g += exsCardFrame(xs[i] - 50, 420, 100, 60, op * (1 - highlight), false, C.chalk);
    g += exsCardFrame(xs[i] - 50, 420, 100, 60, op * highlight, false, C.yellow);
    g += exsCircle(xs[i] - 36, 432, 5, EXS_RED, 2, C.yellow, op);
    g += exsLabel(xs[i], 462, label, 34, C.chalk, op * (1 - highlight));
    g += exsLabel(xs[i], 462, label, 34, C.yellow, op * highlight);
  });
  g += exsLabel(800, 720, '準確明白', 34, C.yellow, exsK(u, 8, 9));
  return exsPaint(g);
}

function exsTrail(u, start, x1, y1, x2, y2, op = 1) {
  const p = exsK(u, start, start + 0.8);
  let g = '';
  for (let i = 1; i <= 6; i++) {
    if (p >= i / 6) g += exsCircle(lerp(x1, x2, i / 6), lerp(y1, y2, i / 6), 3.5, C.chalk, 1, C.chalk, op * 0.7);
  }
  return g;
}

function exsS4(u) {
  let g = head(u, '動筆之前', '把材料收進來') + exsTag(1);
  // 使用者指定：三個泡泡從圖書館本身沿光芒冒出
  const lx = 420, ly = 480;
  const glow = exsK(u, 0.8, 1.5);
  for (let i = 0; i < 12; i++) {
    const a = (Math.PI * 2 * i) / 12;
    g += exsLine(lx + Math.cos(a) * 200, ly + Math.sin(a) * 175, lx + Math.cos(a) * 228, ly + Math.sin(a) * 200, C.yellow, 4, glow * 0.7);
  }
  g += exsLibrary(lx, ly, 1.1, exsK(u, 0.2, 0.8));
  const items = [
    { x: 1000, y: 300, kind: 0, label: '外形', lx: 1000, ly: 432, start: 1.8 },
    { x: 1220, y: 480, kind: 1, label: '內部結構', lx: 1220, ly: 612, start: 4.2 },
    { x: 1000, y: 660, kind: 2, label: '擺設', lx: 1000, ly: 792, start: 6.6 },
  ];
  items.forEach(({ x, y, kind, label, lx: tx, ly: ty, start }) => {
    const ray = exsK(u, start - 0.5, start + 0.2);
    const ang = Math.atan2(y - ly, x - lx);
    const sx = lx + Math.cos(ang) * 185, sy = ly + Math.sin(ang) * 160;
    const ex = x - Math.cos(ang) * 100, ey = y - Math.sin(ang) * 100;
    g += exsLine(sx, sy, lerp(sx, ex, ray), lerp(sy, ey, ray), C.yellow, 5, ray * 0.8);
    const fly = exsK(u, start, start + 1.0);
    const px = lerp(lx, x, fly), py = lerp(ly, y, fly);
    g += exsBubble(px, py, 95 * (0.15 + 0.85 * fly), kind, fly, false);
    g += exsLabel(tx, ty, label, 30, C.chalk, exsK(u, start + 1.0, start + 1.3));
  });
  return exsPaint(g);
}

function exsS5(u) {
  let g = head(u, '骨架', '最後不寫感想') + exsTag(1);
  const titleOp = exsK(u, 0.2, 0.8);
  g += `<g opacity="${exsO(titleOp)}">${box(620, 690, 360, 64, C.chalk, 1, C.deep)}${exsLabel(800, 733, '〈科學博物館〉', 34, C.chalk)}</g>`;
  const xs = [140, 365, 805, 1245], ws = [215, 430, 430, 215];
  const colors = [EXS_BLUE, EXS_BLUE, EXS_BLUE, EXS_ORANGE];
  const topLabels = ['參觀原因', '參觀生命科學廳', '參觀植物園', '心得感想'];
  const bottomLabels = ['位置與整體', '介紹生命科學廳', '介紹植物園'];
  const centers = xs.map((x, i) => x + ws[i] / 2);
  const topStarts = [0.2, 0.35, 0.5, 0.65];
  const bottomStarts = [3, 3.15, 3.3, 3.45];

  g += `<g opacity="${exsO(exsK(u, 0.2, 0.7))}">${exsCardFrame(105, 186, 140, 50, 1, false, C.dim)}${exsLabel(175, 220, '記敘文', 30, C.chalk)}</g>`;
  for (let i = 0; i < 4; i++) {
    const p = exsK(u, topStarts[i], topStarts[i] + 0.4);
    const y = lerp(178, 250, p);
    g += exsBlock(xs[i], y, ws[i], 120, colors[i], p);
    g += exsLabel(centers[i], 322, topLabels[i], 34, C.chalk, exsK(u, 0.5 + i * 0.6, 1 + i * 0.6));
  }

  g += `<g opacity="${exsO(exsK(u, 3.2, 3.7))}">${exsCardFrame(105, 406, 140, 50, 1, false, C.dim)}${exsLabel(175, 440, '說明文', 30, C.chalk)}</g>`;
  for (let i = 0; i < 4; i++) {
    const p = exsK(u, bottomStarts[i], bottomStarts[i] + 0.4);
    const y = lerp(398, 470, p);
    const fade = i === 3 ? 1 - 0.75 * exsK(u, 8.5, 10) : 1;
    g += exsBlock(xs[i], y, ws[i], 120, colors[i], p * fade);
    if (i < 3) g += exsLabel(centers[i], 542, bottomLabels[i], 34, C.chalk, exsK(u, 3.5 + i * 0.7, 4.1 + i * 0.7));
  }

  const xOp = 1 - 0.75 * exsK(u, 8.5, 10);
  const crossX = centers[3], crossY = 530;
  const slashA = exsK(u, 7, 7.45) * xOp;
  const slashB = exsK(u, 7.45, 7.9) * xOp;
  g += exsLine(crossX - 30, crossY - 30, crossX + 30, crossY + 30, EXS_RED, 10, slashA);
  g += exsLine(crossX + 30, crossY - 30, crossX - 30, crossY + 30, EXS_RED, 10, slashB);
  return exsPaint(g);
}

function exsHeart(cx, cy, scale = 1, op = 1) {
  // 和日記本上的愛心同形
  return `<g transform="translate(${exsN(cx)} ${exsN(cy)}) scale(${exsN(scale)})" opacity="${exsO(op)}"><path d="M-50 -12 Q-50 -36 -28 -36 Q-12 -36 0 -20 Q12 -36 28 -36 Q50 -36 50 -12 Q50 10 0 44 Q-50 10 -50 -12Z" fill="rgba(232,135,91,.12)" stroke="${EXS_ORANGE}" stroke-width="6"/></g>`;
}

function exsDrink(cx, cy, scale = 1, op = 1) {
  // 一杯飲料：杯身、吸管、杯中液面
  return `<g transform="translate(${exsN(cx)} ${exsN(cy)}) scale(${exsN(scale)})" opacity="${exsO(op)}" fill="none" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M-34 -42 L-26 50 H26 L34 -42 Z" fill="rgba(242,193,78,.10)" stroke="${C.chalk}" stroke-width="5"/>` +
    `<path d="M-31 -14 H31" stroke="${C.yellow}" stroke-width="4"/>` +
    `<path d="M8 -42 L20 -78 H34" stroke="${EXS_RED}" stroke-width="6"/></g>`;
}

function exsS6(u) {
  let g = head(u, '骨架', '四段各寫什麼') + exsTag(1);
  // 使用者指示改四段：第四段總結用處（藍色，不是感想）
  const xs = [140, 365, 805, 1245], ws = [215, 430, 430, 215];
  const centers = xs.map((x, i) => x + ws[i] / 2);
  const work = ['位置和整體', '介紹借書區', '介紹閱讀區', '總結用處'];
  const blockStarts = [0.2, 0.7, 1.2, 1.7];
  for (let i = 0; i < 4; i++) {
    const p = exsK(u, blockStarts[i], blockStarts[i] + 0.4);
    g += exsBlock(xs[i], lerp(95, 280, p), ws[i], 200, EXS_BLUE, p);
    g += exsLabel(centers[i], 330, work[i], 34, C.chalk, exsK(u, 1 + i * 0.4, 1.5 + i * 0.4));
  }
  const iconStarts = [2.5, 3.2, 3.9, 4.6];
  g += exsUpArrow(centers[0], 410, 1, exsK(u, iconStarts[0], iconStarts[0] + 0.5));
  g += exsShelf(centers[1] - 40, 410, 0.9, exsK(u, iconStarts[1], iconStarts[1] + 0.5));
  g += exsCounter(centers[1] + 40, 410, 0.9, exsK(u, iconStarts[1] + 0.3, iconStarts[1] + 0.8));
  g += exsTable(centers[2] - 40, 410, 0.9, exsK(u, iconStarts[2], iconStarts[2] + 0.45));
  g += exsLamp(centers[2] + 40, 405, 0.9, exsK(u, iconStarts[2] + 0.3, iconStarts[2] + 0.75));
  g += exsBookPile(centers[3] - 22, 412, 0.75, exsK(u, iconStarts[3], iconStarts[3] + 0.5));
  g += exsCheck(centers[3] + 34, 405, 0.6, exsK(u, iconStarts[3] + 0.3, iconStarts[3] + 0.8));
  const phrases = [
    ['在二樓', '分兩區'], ['十二排書架', '借書還書'], ['六張長桌', '安靜看書'], ['借書看書', '找書方便'],
  ];
  phrases.forEach((pair, i) => {
    const op = exsK(u, 5.2 + i * 0.8, 5.9 + i * 0.8);
    g += exsLabel(centers[i], 540, pair[0], 30, C.yellow, op);
    g += exsLabel(centers[i], 582, pair[1], 30, C.yellow, op);
  });
  g += exsLabel(1352, 640, '不寫感想、不加心情', 30, EXS_ORANGE, exsK(u, 8.8, 9.6));
  // 使用者指定的比喻：飲料成分表只寫有什麼，不寫心情
  const drinkK = exsK(u, 9.4, 10.0);
  g += exsDrink(360, 750, 1, drinkK);
  const lensK = exsK(u, 10.0, 10.8);
  const tableK = exsK(u, 10.8, 11.6);
  g += `<g opacity="${exsO(tableK)}">${box(520, 655, 360, 170, C.chalk, 1, C.deep)}</g>`;
  g += exsLabel(700, 700, '成分表', 30, C.yellow, tableK);
  g += exsLabel(700, 750, '成分：水、糖、檸檬', 30, C.chalk, exsK(u, 11.2, 11.8));
  g += exsLabel(700, 800, '容量：三百毫升', 30, C.chalk, exsK(u, 11.5, 12.1));
  g += exsLens(lerp(600, 375, lensK), lerp(640, 735, lensK) - 8 * tableK, 44, lensK);
  const heartK = exsK(u, 11.9, 12.4);
  g += exsHeart(990, 735, 0.8, heartK);
  g += exsCross(990, 740, 30, exsK(u, 12.2, 12.6));
  return exsPaint(g);
}

function exsS7(u) {
  let g = head(u, '檢查', '說得準確明白') + exsTag(1);
  g += exsLabel(800, 260, '準確明白', 36, C.yellow, exsK(u, 0.2, 0.7));
  const card1 = 1 - 0.55 * exsK(u, 4.5, 5);
  const card2 = 1;
  g += exsCardFrame(230, 340, 420, 220, exsK(u, 0.5, 1.5) * card1, false, C.dim);
  g += exsCardFrame(950, 340, 420, 220, exsK(u, 0.5, 1.5) * card2, false, C.chalk);
  g += exsBookPile(440, 410, 0.85, exsK(u, 0.5, 1.2) * card1);
  g += exsShelf(1160, 410, 0.9, exsK(u, 0.5, 1.2) * card2);
  g += exsType('書好多好多', u, 440, 510, 34, C.chalk, 0.8, 1.8, card1);
  g += exsType('有十二排書架', u, 1160, 510, 34, C.chalk, 0.8, 1.8, card2);

  const lineOp = exsK(u, 5.5, 6.2);
  g += exsLine(1092, 522, lerp(1092, 1178, lineOp), 522, C.yellow, 5, lineOp);
  g += exsStar(1288, 382, 26, exsK(u, 6.2, 6.8));
  g += exsCheck(1320, 420, 0.72, exsK(u, 6.8, 7.5));
  g += exsLabel(800, 640, '說明文', 30, C.chalk, exsK(u, 9, 10));

  let lensX = 800, lensY = 260;
  if (u < 2.5 && u >= 2) {
    const p = exsK(u, 2, 2.5);
    lensX = lerp(800, 440, p);
    lensY = lerp(260, 450, p);
  } else if (u >= 2.5 && u < 4.5) {
    lensX = 440 + Math.sin((u - 2.5) * Math.PI * 2) * 15;
    lensY = 450;
  } else if (u >= 4.5 && u < 5.5) {
    const p = exsK(u, 4.5, 5.5);
    lensX = lerp(440, 1160, p);
    lensY = 450;
  } else if (u >= 5.5 && u < 8.5) {
    lensX = 1160 + Math.sin((u - 5.5) * Math.PI * 2) * 11;
    lensY = 450;
  } else if (u >= 8.5 && u < 8.8) {
    const p = exsK(u, 8.5, 8.8);
    lensX = lerp(1160, 1300, p);
    lensY = lerp(450, 520, p);
  } else if (u >= 8.8 && u < 9) {
    const p = exsK(u, 8.8, 9);
    lensX = 1300;
    lensY = lerp(520, 700, p);
  } else if (u >= 9 && u < 9.5) {
    const p = exsK(u, 9, 9.5);
    lensX = lerp(1300, 800, p);
    lensY = lerp(700, 760, p);
  } else if (u >= 9.5) {
    lensX = 800;
    lensY = 760;
  }
  g += exsLens(lensX, lensY, 48, exsK(u, 2, 2.2));
  return exsPaint(g);
}

function exsS8(u) {
  let g = head(u, '骨架', '第一句先說位置') + exsTag(1);
  const boxOp = exsK(u, 0.2, 0.8);
  g += `<g opacity="${exsO(boxOp)}">${exsBlock(300, 250, 1000, 240, EXS_BLUE, 1)}${exsLabel(420, 295, '位置和整體', 34, C.chalk)}</g>`;
  const sentence = '圖書館在學校二樓，分成借書區和閱讀區。';
  g += exsType(sentence, u, 800, 400, 36, C.yellow, 0.8, 6.5, boxOp);

  const bracket = exsK(u, 7, 8);
  g += exsBracket(674, 746, 430, bracket);
  g += exsBracket(782, 1106, 430, bracket);
  g += exsLabel(710, 470, '位置', 30, C.yellow, bracket);
  g += exsLabel(944, 470, '整體', 30, C.yellow, bracket);
  return exsPaint(g);
}

function exsS9(u) {
  let g = head(u, '練習', '換你排骨架') + exsTag(1);
  const titleOp = exsK(u, 0.2, 0.8);
  g += `<g opacity="${exsO(titleOp)}">${box(640, 200, 320, 72, C.yellow, 1, C.deep)}${exsLabel(800, 248, '〈我的學校〉', 40, C.yellow)}</g>`;

  const bubbles = [
    [500, '外形', 8], [800, '內部結構', 8.85], [1100, '擺設', 9.7],
  ];
  bubbles.forEach(([x, label, flashStart]) => {
    const op = exsK(u, 0.6, 1.1);
    g += exsBubble(x, 360, 60, 0, op, true);
    const flash = exsFlash(u, flashStart);
    if (flash > 0.01) g += `<circle cx="${x}" cy="360" r="58" fill="rgba(242,193,78,${(0.24 * flash).toFixed(3)})" stroke="${C.yellow}" stroke-width="4" opacity="${exsO(flash)}"/>`;
    g += exsLabel(x, 470, label, 30, C.chalk, op);
  });

  const xs = [140, 365, 805, 1245], ws = [215, 430, 430, 215], centers = xs.map((x, i) => x + ws[i] / 2);
  const work = ['位置和整體', '介紹第一處', '介紹第二處', '總結用處'];
  const blockStarts = [3, 3.7, 4.4, 5.1];
  for (let i = 0; i < 4; i++) {
    const op = exsK(u, blockStarts[i], blockStarts[i] + 0.7);
    g += exsBlock(xs[i], 520, ws[i], 150, EXS_BLUE, op, true);
    g += exsLabel(centers[i], 605, work[i], 34, C.chalk, op);
    const flash = exsFlash(u, 10.55 + i * 0.7);
    if (flash > 0.01) g += `<rect x="${xs[i]}" y="520" width="${ws[i]}" height="150" rx="14" fill="rgba(242,193,78,${(0.2 * flash).toFixed(3)})" stroke="${C.yellow}" stroke-width="4" opacity="${exsO(flash)}"/>`;
  }

  return exsPaint(g);
}

function s1(u) { return exsS1(u); }
function s2(u) { return exsS2(u); }
function s3(u) { return exsS3(u); }
function s4(u) { return exsS4(u); }
function s5(u) { return exsS5(u); }
function s6(u) { return exsS6(u); }
function s7(u) { return exsS7(u); }
function s8(u) { return exsS8(u); }
function s9(u) { return exsS9(u); }
