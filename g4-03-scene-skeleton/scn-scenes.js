const META = {
  title: '寫一處風景，跟著腳步走',
  subtitle: '9 段・約 2 分鐘・四年級記敘文（記景）第一集',
  ariaLabel: '記景作文骨架：審題、蒐集材料、移步觀察與總分段落',
  note: '出處：楊裕貿研習講義；寫作課程設計；三年級學習單。方框、放大鏡、腳印、泡泡、星星、積木是視覺比喻；校園地圖是示意圖；溜滑梯依網路實景照片重繪為示意；示範句依講義結構自編。鍵盤：空白鍵播放／暫停，左右方向鍵切換段落，F 鍵全螢幕。畫面只由時間決定。',
  works: [],
};

const SCN_BLUE = C.blue;
const SCN_ORANGE = C.orange;
const SCN_SKIN = '#f0d9bd';
const SCN_BROWN = '#66513e';
const SCN_GREY = '#c3cbd0';
// 第三個參數小於等於起點時視為持續秒數（Codex 混用了「結束時間」與「持續秒數」兩種寫法）
const scnK = (u, a, b) => ease(P(u, a, b > a ? b : a + b));
const scnO = (v) => Math.max(0, Math.min(1, Number(v) || 0)).toFixed(3);
const scnN = (v) => Number(v).toFixed(1);

function scnLine(x1, y1, x2, y2, color = C.chalk, width = 5, op = 1, dash = '') {
  return `<path d="M${scnN(x1)} ${scnN(y1)} L${scnN(x2)} ${scnN(y2)}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${scnO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function scnPath(d, color = C.chalk, width = 6, op = 1, fill = 'none', dash = '') {
  return `<path d="${d}" fill="${fill}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${scnO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function scnCircle(cx, cy, r, stroke = C.chalk, width = 5, fill = 'none', op = 1, dash = '') {
  return `<circle cx="${scnN(cx)}" cy="${scnN(cy)}" r="${scnN(r)}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" opacity="${scnO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function scnTag(op = 1) {
  return `<g opacity="${scnO(op)}">${box(1375, 56, 165, 60, C.orange, 1, C.deep)}${txt(1457, 98, '比喻', { a: 'middle', s: 30, w: 1, f: C.orange })}</g>`;
}

function scnLabel(cx, y, value, size = 30, color = C.chalk, op = 1) {
  return txt(cx, y, value, { a: 'middle', s: size, w: 1, f: color, o: op });
}

function scnDoll(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${scnN(cx)} ${scnN(cy)}) scale(${scnN(scale)})" opacity="${scnO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M0 -126 L0 -104" stroke="${C.dim}" stroke-width="4" stroke-dasharray="6 7"/>` +
    `<circle cx="0" cy="-72" r="31" fill="${SCN_SKIN}" fill-opacity=".7" stroke="${C.chalk}" stroke-width="5"/>` +
    `<path d="M-28 -77 Q-21 -112 4 -105 Q27 -99 29 -75 Q9 -90 -4 -87 Q-18 -83 -28 -77Z" fill="${SCN_BROWN}" stroke="${C.chalk}" stroke-width="3"/>` +
    `<path d="M-43 43 Q-40 -28 0 -28 Q40 -28 43 43Z" fill="rgba(127,182,217,.36)" stroke="${C.chalk}" stroke-width="5"/>` +
    `<path d="M-37 -5 L-70 26 M37 -5 L70 26 M-19 43 L-30 91 M19 43 L30 91" fill="none" stroke="${C.chalk}" stroke-width="9"/>` +
    `<path d="M-42 91 L-14 91 M14 91 L42 91" fill="none" stroke="${C.blue}" stroke-width="12"/>` +
    `<circle cx="-10" cy="-67" r="3" fill="${SCN_BROWN}"/><circle cx="10" cy="-67" r="3" fill="${SCN_BROWN}"/>` +
    `<path d="M-8 -52 Q0 -46 8 -52" fill="none" stroke="${SCN_BROWN}" stroke-width="3"/></g>`;
}

function scnClassroom(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${scnN(cx)} ${scnN(cy)}) scale(${scnN(scale)})" opacity="${scnO(op)}" fill="none" stroke="${C.chalk}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">` +
    `<path d="M-132 78 L-132 -36 L0 -105 L132 -36 L132 78 Z" fill="rgba(127,182,217,.055)"/>` +
    `<path d="M-96 -26 L-36 -26 L-36 24 L-96 24 Z M-66 -26 L-66 24 M-96 -1 L-36 -1"/>` +
    `<path d="M36 -26 L96 -26 L96 24 L36 24 Z M66 -26 L66 24 M36 -1 L96 -1"/>` +
    `<path d="M-32 78 L-32 27 Q0 1 32 27 L32 78 Z M-149 79 L149 79"/>` +
    `<path d="M-132 -36 L0 -105 L132 -36" stroke-width="9"/></g>`;
}

function scnBus(cx, cy, scale = 1, op = 1, wheelAngle = 0) {
  let g = `<g transform="translate(${scnN(cx)} ${scnN(cy)}) scale(${scnN(scale)})" opacity="${scnO(op)}" stroke-linejoin="round">`;
  g += `<rect x="-180" y="-53" width="360" height="108" rx="22" fill="rgba(127,182,217,.16)" stroke="${C.chalk}" stroke-width="6"/>`;
  for (const x of [-145, -70, 5, 80]) g += `<rect x="${x}" y="-33" width="54" height="42" rx="7" fill="${C.deep}" stroke="${C.chalk}" stroke-width="4"/>`;
  g += `<path d="M109 -45 L147 -45 L168 -16 L168 8 L109 8 Z" fill="${C.deep}" stroke="${C.chalk}" stroke-width="4"/><path d="M-168 17 L168 17 M104 7 L104 52" fill="none" stroke="${C.chalk}" stroke-width="4"/>`;
  for (const x of [-112, 112]) g += `<g transform="rotate(${scnN(wheelAngle)} ${x} 58)"><circle cx="${x}" cy="58" r="28" fill="${C.deep}" stroke="${C.chalk}" stroke-width="5"/><circle cx="${x}" cy="58" r="10" fill="none" stroke="${C.dim}" stroke-width="4"/><path d="M${x} 31 L${x} 85 M${x - 27} 58 L${x + 27} 58" stroke="${C.dim}" stroke-width="3"/></g>`;
  return g + '</g>';
}

function scnTree(cx, baseY, scale = 1, op = 1, dash = '') {
  return `<g transform="translate(${scnN(cx)} ${scnN(baseY)}) scale(${scnN(scale)})" opacity="${scnO(op)}" fill="none" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M0 0 L-6 -146 M-3 -70 L-58 -112 M-2 -97 L55 -139 M-4 -47 L-52 -74 M1 -83 L48 -103" stroke="${C.chalk}" stroke-width="10"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<path d="M-58 -112 Q-92 -126 -91 -158 Q-60 -163 -42 -130 M55 -139 Q68 -168 99 -157 Q96 -128 65 -121 M-52 -74 Q-83 -91 -103 -73 Q-92 -48 -54 -61 M48 -103 Q77 -126 102 -105 Q90 -81 51 -87" fill="rgba(143,209,138,.16)" stroke="${C.green}" stroke-width="6"${dash ? ` stroke-dasharray="${dash}"` : ''}/></g>`;
}

function scnFlower(cx, cy, scale = 1, op = 1) {
  let g = `<g transform="translate(${scnN(cx)} ${scnN(cy)}) scale(${scnN(scale)})" opacity="${scnO(op)}" stroke-linecap="round" stroke-linejoin="round">`;
  for (const [x, y, r, color] of [[0, -24, 13, C.yellow], [-16, -13, 11, C.orange], [16, -13, 11, C.orange], [-11, 2, 11, C.yellow], [11, 2, 11, C.yellow]]) {
    g += `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}" fill-opacity=".42" stroke="${C.chalk}" stroke-width="3"/>`;
  }
  return g + `<path d="M0 12 L0 70 M0 42 Q-27 27 -36 41 Q-22 58 0 51 M0 54 Q23 35 37 47 Q26 65 0 64" fill="none" stroke="${C.green}" stroke-width="5"/></g>`;
}

function scnRice(cx, cy, scale = 1, op = 1) {
  let g = `<g transform="translate(${scnN(cx)} ${scnN(cy)}) scale(${scnN(scale)})" opacity="${scnO(op)}" stroke-linecap="round" stroke-linejoin="round">`;
  g += `<path d="M0 108 Q-5 5 -6 -65 M-3 52 Q-45 3 -70 -19 M-3 33 Q31 -15 57 -39 M-5 -6 Q-47 -56 -69 -73 M-5 -18 Q21 -69 45 -90 M-2 -43 Q-24 -85 -42 -106" fill="none" stroke="${C.green}" stroke-width="8"/>`;
  for (const [x, y, r, a] of [[-76,-22,10,-38],[-63,-2,10,30],[-80,-74,10,-30],[-59,-52,10,32],[60,-42,10,32],[46,-20,10,-34],[48,-91,10,29],[31,-68,10,-36],[-46,-108,10,-34],[-28,-88,10,34]]) {
    g += `<ellipse cx="${x}" cy="${y}" rx="9" ry="15" transform="rotate(${a} ${x} ${y})" fill="rgba(242,193,78,.58)" stroke="${C.yellow}" stroke-width="4"/>`;
  }
  return g + `<path d="M-30 108 H30" stroke="${C.chalk}" stroke-width="5"/></g>`;
}

function scnRunning(cx, cy, scale = 1, op = 1, phase = 0) {
  const swing = Math.sin(phase) * 17;
  return `<g transform="translate(${scnN(cx)} ${scnN(cy)}) scale(${scnN(scale)})" opacity="${scnO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<circle cx="0" cy="-57" r="25" fill="${SCN_SKIN}" stroke="${C.chalk}" stroke-width="5"/><path d="M-20 -67 Q-11 -94 12 -83 Q24 -76 25 -60" fill="none" stroke="${SCN_BROWN}" stroke-width="8"/>` +
    `<path d="M-4 -31 L-12 22 M-8 -10 L-54 ${-30 - swing} M-8 -9 L40 ${-42 + swing} M-12 22 L-55 ${65 + swing} M-12 22 L42 ${60 - swing}" fill="none" stroke="${C.chalk}" stroke-width="10"/>` +
    `<path d="M-70 -64 L-108 -64 M-69 -42 L-96 -42 M-61 -19 L-86 -19" fill="none" stroke="${C.yellow}" stroke-width="5"/></g>`;
}

function scnHill(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${scnN(cx)} ${scnN(cy)}) scale(${scnN(scale)})" opacity="${scnO(op)}">` +
    `<path d="M-190 50 Q-122 -28 -50 30 Q22 -79 104 28 Q153 -9 202 50Z" fill="rgba(127,182,217,.09)" stroke="${C.chalk}" stroke-width="6" stroke-linejoin="round"/>` +
    `<path d="M-188 54 H202" fill="none" stroke="${C.green}" stroke-width="5"/>` +
    scnTree(-73, 26, .34, 1) + scnTree(97, 27, .28, 1) + '</g>';
}

function scnSlide(cx, cy, scale = 1, op = 1) {
  const spiral = 'M-7 -79 C78 -92 118 -54 91 -28 C67 -4 14 -17 8 18 C2 52 47 69 89 52 C128 36 143 76 111 101 C91 116 60 120 56 151';
  return `<g transform="translate(${scnN(cx)} ${scnN(cy)}) scale(${scnN(scale)})" opacity="${scnO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M-145 91 V-111 H-9 V91 M-145 -14 H-9 M-145 34 H-9" fill="rgba(239,233,216,.025)" stroke="${C.chalk}" stroke-width="7"/>` +
    `<path d="M-142 -75 H-10 M-142 -27 H-10 M-142 20 H-10 M-142 65 H-10" fill="none" stroke="${C.dim}" stroke-width="3"/>` +
    `<path d="M-8 -80 H-1 V-66 H74" fill="none" stroke="${C.chalk}" stroke-width="8"/>` +
    `<path d="${spiral}" fill="none" stroke="${C.blue}" stroke-width="27"/>` +
    `<path d="${spiral}" fill="none" stroke="#71c69c" stroke-width="24" stroke-dasharray="11 18"/>` +
    `<path d="M28 -77 L53 -77 L139 104 M72 -77 L97 -77 L183 104 M51 -77 L78 -77 M139 104 H183" fill="none" stroke="${SCN_GREY}" stroke-width="11"/>` +
    `<path d="M47 -69 L66 -44 M59 -69 L78 -44 M71 -69 L90 -44 M83 -69 L102 -44" fill="none" stroke="#eef1f0" stroke-width="4"/>` +
    `<ellipse cx="111" cy="132" rx="111" ry="28" fill="rgba(232,210,159,.2)" stroke="#d9c795" stroke-width="6"/>` +
    [-68, -32, 4, 40, 75].map((x, i) => `<circle cx="${x}" cy="${132 + (i % 2) * 7}" r="3.5" fill="#d9c795"/>`).join('') + '</g>';
}

function scnGate(cx, baseY, scale = 1, op = 1) {
  return `<g transform="translate(${scnN(cx)} ${scnN(baseY)}) scale(${scnN(scale)})" opacity="${scnO(op)}" fill="none" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M-67 0 V-88 H-35 V0 M35 0 V-88 H67 V0 M-84 0 H84" stroke="${C.chalk}" stroke-width="8"/>` +
    `<path d="M-68 -74 Q-108 -119 -127 -82 Q-118 -47 -72 -48 M68 -71 Q109 -114 128 -77 Q116 -43 72 -47 M-66 -25 Q-98 -48 -117 -25 Q-103 -2 -67 -9 M67 -24 Q98 -47 117 -23 Q104 -2 67 -8" fill="rgba(143,209,138,.12)" stroke="${C.green}" stroke-width="6"/>` +
    `<path d="M-34 -70 V0 M34 -70 V0" stroke="${C.dim}" stroke-width="4"/></g>`;
}

function scnTrack(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${scnN(cx)} ${scnN(cy)}) scale(${scnN(scale)})" opacity="${scnO(op)}" fill="none" stroke-linecap="round" stroke-linejoin="round">` +
    `<ellipse cx="0" cy="0" rx="205" ry="120" fill="rgba(127,182,217,.07)" stroke="${C.chalk}" stroke-width="7"/>` +
    `<ellipse cx="0" cy="0" rx="166" ry="84" stroke="${C.blue}" stroke-width="5"/>` +
    `<ellipse cx="0" cy="0" rx="132" ry="56" stroke="${C.dim}" stroke-width="3" stroke-dasharray="12 9"/>` +
    `<path d="M-186 52 Q-133 13 -83 26 M83 -26 Q136 -14 184 -52" stroke="${C.yellow}" stroke-width="5"/></g>`;
}

function scnPond(cx, cy, scale = 1, op = 1, dash = '') {
  return `<g transform="translate(${scnN(cx)} ${scnN(cy)}) scale(${scnN(scale)})" opacity="${scnO(op)}">` +
    `<ellipse cx="0" cy="0" rx="67" ry="39" fill="rgba(127,182,217,.13)" stroke="${C.blue}" stroke-width="5"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<path d="M-40 -3 Q-18 -17 4 -3 T46 -4 M-27 15 Q-9 3 11 15" fill="none" stroke="${C.chalk}" stroke-width="3" opacity=".72"${dash ? ` stroke-dasharray="${dash}"` : ''}/></g>`;
}

function scnRiceField(x, y, w, h, op = 1, dash = '') {
  let g = `<g opacity="${scnO(op)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="rgba(242,193,78,.055)" stroke="${C.yellow}" stroke-width="4"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
  for (let i = 1; i < 4; i++) g += scnLine(x + i * w / 4, y + 4, x + i * w / 4, y + h - 4, C.yellow, 2, .55, dash);
  for (let i = 0; i < 3; i++) g += scnLine(x + 8, y + (i + 1) * h / 4, x + w - 8, y + (i + 1) * h / 4, C.yellow, 2, .55, dash);
  for (let i = 0; i < 7; i++) {
    const xx = x + 13 + i * (w - 26) / 6;
    g += scnPath(`M${xx} ${y + h - 8} Q${xx - 5} ${y + h * .56} ${xx + (i % 2 ? 6 : -4)} ${y + h * .3}`, C.green, 3, .9, 'none', dash);
    g += scnPath(`M${xx} ${y + h * .66} Q${xx + 8} ${y + h * .47} ${xx + 18} ${y + h * .5}`, C.green, 3, .9, 'none', dash);
  }
  return g + '</g>';
}

function scnGarden(x, y, scale = 1, op = 1, ghost = false) {
  const d = ghost ? '12 9' : '';
  const fill = ghost ? 'none' : 'rgba(143,209,138,.07)';
  return `<g transform="translate(${scnN(x)} ${scnN(y)}) scale(${scnN(scale)})" opacity="${scnO(op)}">` +
    `<path d="M-10 100 Q-28 32 3 -8 Q40 -35 94 -8 Q134 20 119 100Z" fill="${fill}" stroke="${C.green}" stroke-width="5"${d ? ` stroke-dasharray="${d}"` : ''}/>` +
    scnTree(46, 110, .55, 1, d) + scnFlower(-5, 65, .75, 1) + scnFlower(95, 78, .55, 1) + scnPond(164, 81, .55, 1, d) +
    scnRiceField(118, 130, 92, 62, 1, d) + '</g>';
}

function scnMap(x, y, scale = 1, op = 1) {
  return `<g transform="translate(${scnN(x)} ${scnN(y)}) scale(${scnN(scale)})" opacity="${scnO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<rect x="8" y="8" width="984" height="544" rx="32" fill="rgba(239,233,216,.018)" stroke="${C.dim}" stroke-width="3"/>` +
    `<path d="M140 446 Q240 428 324 407 Q397 382 454 346" fill="none" stroke="${C.chalk}" stroke-width="34" opacity=".1"/><path d="M140 446 Q240 428 324 407 Q397 382 454 346" fill="none" stroke="${C.chalk}" stroke-width="4" stroke-dasharray="14 12" opacity=".8"/>` +
    scnGate(122, 464, .86, 1) + scnTrack(488, 342, 1, 1) + scnGarden(738, 119, 1, 1) +
    `<path d="M690 254 Q742 278 765 326" fill="none" stroke="${C.green}" stroke-width="4" stroke-dasharray="9 9"/>` +
    `</g>`;
}

function scnFoot(cx, cy, angle = 0, scale = 1, op = 1, ghost = false) {
  const col = ghost ? C.blue : C.chalk, dash = ghost ? '9 7' : '';
  return `<g transform="translate(${scnN(cx)} ${scnN(cy)}) rotate(${scnN(angle)}) scale(${scnN(scale)})" opacity="${scnO(op)}">` +
    `<ellipse cx="-11" cy="0" rx="8" ry="14" fill="${ghost ? 'none' : 'rgba(239,233,216,.13)'}" stroke="${col}" stroke-width="3"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<ellipse cx="11" cy="-7" rx="8" ry="14" fill="${ghost ? 'none' : 'rgba(239,233,216,.13)'}" stroke="${col}" stroke-width="3"${dash ? ` stroke-dasharray="${dash}"` : ''}/></g>`;
}

function scnBadge(cx, cy, dots, op = 1, active = 0) {
  let g = `<g opacity="${scnO(op)}">${scnCircle(cx, cy, 30, active > .01 ? C.yellow : C.chalk, 5, C.deep, 1)}`;
  g += txt(cx, cy + 10, String(dots), { a: 'middle', s: 28, w: 1, f: active > .01 ? C.yellow : C.chalk });
  if (active > .01) g += `<circle cx="${cx}" cy="${cy}" r="43" fill="none" stroke="${C.yellow}" stroke-width="4" opacity="${scnO(.25 + .75 * active)}"/>`;
  return g + '</g>';
}

function scnBlock(x, y, w, h, color, op = 1, dashed = false) {
  let g = `<g opacity="${scnO(op)}">`;
  if (dashed) return g + `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="rgba(239,233,216,.012)" stroke="${color}" stroke-width="5" stroke-dasharray="14 10"/></g>`;
  const n = Math.max(2, Math.floor(w / 130));
  for (let i = 0; i < n; i++) {
    const cx = x + w * (i + .5) / n;
    g += `<rect x="${cx - 20}" y="${y - 11}" width="40" height="13" rx="6" fill="${color}"/>`;
  }
  return g + `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${color}" fill-opacity=".22" stroke="${C.chalk}" stroke-width="4"/></g>`;
}

function scnHeart(cx, cy, scale = 1, op = 1) {
  return `<path transform="translate(${scnN(cx)} ${scnN(cy)}) scale(${scnN(scale)})" d="M0 38 C-13 21 -48 -2 -48 -24 C-48 -51 -15 -55 0 -31 C15 -55 48 -51 48 -24 C48 -2 13 21 0 38Z" fill="rgba(232,135,91,.22)" stroke="${C.orange}" stroke-width="6" opacity="${scnO(op)}"/>`;
}

function scnStar(cx, cy, r, op = 1) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .46 : r;
    pts.push(`${scnN(cx + Math.cos(a) * rr)},${scnN(cy + Math.sin(a) * rr)}`);
  }
  return `<polygon points="${pts.join(' ')}" fill="rgba(242,193,78,.3)" stroke="${C.yellow}" stroke-width="5" stroke-linejoin="round" opacity="${scnO(op)}"/>`;
}

function scnLens(cx, cy, r = 65, op = 1, dashed = false) {
  const dash = dashed ? '11 9' : '';
  return `<g opacity="${scnO(op)}"><circle cx="${scnN(cx)}" cy="${scnN(cy)}" r="${scnN(r)}" fill="rgba(242,193,78,.045)" stroke="${C.yellow}" stroke-width="8"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<path d="M${scnN(cx + r * .68)} ${scnN(cy + r * .68)} L${scnN(cx + r * 1.28)} ${scnN(cy + r * 1.28)}" stroke="${C.yellow}" stroke-width="17" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<path d="M${scnN(cx + r * .8)} ${scnN(cy + r * .8)} L${scnN(cx + r * 1.26)} ${scnN(cy + r * 1.26)}" stroke="${C.chalk}" stroke-width="4" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/></g>`;
}

function scnChalkBubble(cx, cy, r, op = 1) {
  return `<g opacity="${scnO(op)}"><circle cx="${cx}" cy="${cy}" r="${r}" fill="rgba(127,182,217,.04)" stroke="${C.chalk}" stroke-width="5"/>` +
    `<path d="M${cx - r * .63} ${cy - r * .38} A${r * .68} ${r * .68} 0 0 1 ${cx - r * .08} ${cy - r * .78}" fill="none" stroke="${C.chalk}" stroke-width="4" opacity=".58"/></g>`;
}

function scnGardenSpot(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${scnN(cx)} ${scnN(cy)}) scale(${scnN(scale)})" opacity="${scnO(op)}">` +
    scnTree(-45, 90, .42) + scnFlower(22, 52, .58) + scnFlower(69, 65, .42) + scnPond(88, 60, .46) +
    scnRiceField(38, 103, 88, 50) + '</g>';
}

function scnMiniStation(kind, cx, cy, scale = 1, op = 1) {
  if (kind === 'gate') return scnGate(cx, cy + 42 * scale, scale, op);
  if (kind === 'track') return scnTrack(cx, cy, scale, op);
  return scnGardenSpot(cx, cy, scale, op);
}

function scnRunningMini(cx, cy, scale = 1, op = 1, phase = 0) {
  return scnRunning(cx, cy + 55 * scale, scale, op, phase);
}

function scnMazeFootline(u, startX, endX, y, op = 1) {
  const dots = 12, k = scnK(u, 0, 1);
  let g = '';
  for (let i = 0; i < dots; i++) {
    const f = i / (dots - 1);
    if (f > k) continue;
    g += scnFoot(lerp(startX, endX, f), y + Math.sin(f * Math.PI) * 23, -12 + f * 25, .6, op, true);
  }
  return g;
}

function scnParkBlank(x, y, w, h, op = 1) {
  let g = `<g opacity="${scnO(op)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="rgba(127,182,217,.018)" stroke="${C.blue}" stroke-width="5" stroke-dasharray="13 10"/>`;
  const trees = [[x + 72, y + h - 16, .28], [x + 166, y + h - 20, .32], [x + w - 160, y + h - 18, .3], [x + w - 68, y + h - 20, .26]];
  for (const [tx, ty, s] of trees) g += scnTree(tx, ty, s, 1, '9 8');
  g += scnPond(x + w * .52, y + h * .52, .65, 1, '10 8');
  const stations = [[x + w * .22, y + h * .48], [x + w * .5, y + h * .34], [x + w * .78, y + h * .5]];
  stations.forEach(([sx, sy], i) => {
    g += scnCircle(sx, sy, 19, C.blue, 4, 'none', 1, '7 6');
    g += scnFoot(sx, sy + 35, i * 8 - 8, .7, 1, true);
  });
  return g + '</g>';
}

function scnWallet(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${scnN(cx)} ${scnN(cy)}) scale(${scnN(scale)})" opacity="${scnO(op)}" stroke-linejoin="round">` +
    `<rect x="-60" y="-37" width="120" height="76" rx="13" fill="rgba(169,179,166,.18)" stroke="${C.dim}" stroke-width="6"/>` +
    `<path d="M-50 -18 H39 Q59 -18 59 1 V22 H20 Q0 22 0 3 Q0 -14 20 -14 H59" fill="${C.deep}" stroke="${C.dim}" stroke-width="5"/>` +
    `<circle cx="26" cy="2" r="4" fill="${C.dim}"/></g>`;
}

function scnBlockSet(u, y, compact = false) {
  const xs = compact ? [170, 328, 632, 936] : [260, 440, 800, 1160];
  const ws = compact ? [150, 300, 300, 150] : [170, 340, 340, 170];
  const h = compact ? 138 : 175;
  const colors = [SCN_BLUE, SCN_BLUE, SCN_BLUE, SCN_ORANGE];
  const labels = compact ? [170, 478, 782, 1011] : [345, 800, 970, 1245];
  let g = '';
  for (let i = 0; i < 4; i++) {
    const t = .35 + i * .9;
    const p = scnK(u, t, t + .75);
    const bounce = p >= 1 ? 0 : Math.sin(Math.PI * p) * 22;
    const yy = y - (1 - p) * 160 + bounce;
    g += scnBlock(xs[i], yy, ws[i], h, colors[i], Math.min(1, p * 2));
    if (i === 0) {
      g += scnMap(xs[i] + ws[i] / 2 - 72, yy + 40, .144, Math.min(1, p * 2));
    } else if (i === 1) {
      g += scnGate(xs[i] + 91, yy + 119, .42, Math.min(1, p * 2));
      g += scnTrack(xs[i] + 224, yy + 83, compact ? .21 : .29, Math.min(1, p * 2));
    } else if (i === 2) {
      g += scnGardenSpot(xs[i] + 174, yy + 28, compact ? .62 : .72, Math.min(1, p * 2));
    } else {
      g += scnHeart(xs[i] + ws[i] / 2, yy + h / 2 + 8, .78, Math.min(1, p * 2));
    }
  }
  if (!compact) {
    g += scnLabel(labels[0], y + h + 62, '總說', 32, C.chalk, scnK(u, 1.0, 1.35));
    g += scnLabel(labels[1], y + h + 62, '分說', 32, C.chalk, scnK(u, 1.6, 2.0));
    g += scnLabel(labels[3], y + h + 62, '感想', 32, C.chalk, scnK(u, 3.3, 3.8));
  }
  return { svg: g, xs, ws, h };
}

function scnPaint(svg) {
  return svg.replace(/font-size="24"/g, 'font-size="26"')
    .replace(/<text ([^>]*?)fill="([^"]+)"/g, '<text $1style="fill:$2" fill="$2"');
}

function scnS1(u) {
  const times = [.25, 1.45, 2.65, 3.85];
  const starts = [215, 575, 935, 1300];
  const y = 430;
  let g = head(u, '開場', '這次寫一處風景') + scnTag(1);
  for (let i = 0; i < 3; i++) {
    const pop = scnK(u, times[i], times[i] + .62);
    const fade = 1 - scnK(u, 6.15 + i * .2, 1.3);
    const sc = pop * (.98 - .34 * scnK(u, 6.15 + i * .2, 1.3));
    if (i === 0) g += scnDoll(lerp(starts[i], 235, pop), y, .76 * sc, fade * pop);
    if (i === 1) g += scnClassroom(lerp(starts[i], 575, pop), y, .72 * sc, fade * pop);
    if (i === 2) g += scnBus(lerp(starts[i], 935, pop), y + 4, .7 * sc, fade * pop, 0);
  }
  const treeIn = scnK(u, times[3], times[3] + .8);
  const focus = scnK(u, 6.0, 2.2);
  const tx = lerp(starts[3], 800, focus), ty = lerp(y + 15, 392, focus), ts = lerp(.78, 1.23, focus);
  g += scnHill(tx, ty + 94, ts, treeIn);
  g += scnTree(tx + 4 * ts, ty + 86 * ts, .8 * ts, treeIn);
  const cardIn = scnK(u, 7.7, .8);
  g += `<g opacity="${scnO(cardIn)}">${box(440, 650, 720, 112, C.yellow, 1, C.deep)}${txt(800, 722, '〈美麗的校園〉', { a: 'middle', s: 56, w: 1, f: C.yellow })}</g>`;
  return scnPaint(g);
}

function scnS2(u) {
  let g = head(u, '審題', '題目有兩個零件') + scnTag(1);
  const cardIn = scnK(u, .18, .8);
  g += `<g opacity="${scnO(cardIn)}">${box(315, 300, 970, 290, C.chalk, 1, C.deep)}${txt(800, 455, '〈美麗的校園〉', { a: 'middle', s: 64, w: 1, f: C.yellow })}</g>`;
  const f = scnK(u, .25, .8);
  g += `<rect x="826" y="372" width="144" height="106" rx="14" fill="rgba(127,182,217,.035)" stroke="${C.blue}" stroke-width="6" stroke-dasharray="15 11" opacity="${scnO(f)}"/>`;
  g += scnLabel(898, 536, '範圍', 34, C.blue, f);
  const lens = scnK(u, .48, 2.5);
  g += scnLens(lerp(1400, 707, lens), lerp(245, 430, lens), 72, lens);
  g += scnLabel(690, 548, '重點', 34, C.yellow, lens);
  return scnPaint(g);
}

function scnS3(u) {
  let g = head(u, '審題', '少一個零件') + scnTag(1);
  const l = scnK(u, .18, .8), r = scnK(u, .95, .8);
  g += `<g opacity="${scnO(l)}">${box(105, 278, 670, 340, C.chalk, 1, C.deep)}${txt(440, 406, '〈我的校園〉', { a: 'middle', s: 48, w: 1, f: C.yellow })}</g>`;
  g += `<g opacity="${scnO(r)}">${box(825, 278, 670, 340, C.chalk, 1, C.deep)}${txt(1160, 406, '〈美麗的校園〉', { a: 'middle', s: 43, w: 1, f: C.yellow })}</g>`;
  g += `<rect x="446" y="347" width="108" height="94" rx="12" fill="rgba(127,182,217,.025)" stroke="${C.blue}" stroke-width="6" stroke-dasharray="14 10" opacity="${scnO(l)}"/>`;
  g += `<rect x="1178" y="347" width="104" height="94" rx="12" fill="rgba(127,182,217,.025)" stroke="${C.blue}" stroke-width="6" stroke-dasharray="14 10" opacity="${scnO(r)}"/>`;
  g += scnLens(1100, 393, 50, r);
  g += scnLabel(440, 532, '範圍型', 32, C.blue, l);
  g += scnLabel(1160, 532, '範圍觀點型', 32, C.blue, r);
  const star = scnK(u, 5.1, .7);
  g += scnStar(1160, 696, 42, star);
  g += scnLabel(1160, 770, '每段要寫美', 32, C.yellow, star);
  return scnPaint(g);
}

function scnS4(u) {
  let g = head(u, '動筆之前', '把材料收進來') + scnTag(1);
  const mapOp = scnK(u, .12, .75);
  g += scnMap(525, 278, .53, mapOp);
  const b1 = scnK(u, .6, .85), b2 = scnK(u, 3.5, .85), b3 = scnK(u, 6.4, .85);
  g += scnPath('M742 467 Q570 418 392 410', C.dim, 3, b1, 'none', '9 9');
  g += scnPath('M945 443 Q1080 404 1203 401', C.dim, 3, b2, 'none', '9 9');
  g += scnPath('M790 478 Q798 526 800 574', C.dim, 3, b3, 'none', '9 9');
  for (const [cx, cy, k] of [[250, 400, b1], [1350, 400, b2], [800, 720, b3]]) g += scnChalkBubble(cx, cy, 140 * (.2 + .8 * k), k);
  const slideX = 250, slideY = 360;
  g += scnSlide(slideX, slideY, .6 * (.25 + .75 * b1), b1);
  g += scnLabel(250, 506, '溜滑梯', 30, C.chalk, b1);
  g += scnRice(1350, 388, .48 * (.25 + .75 * b2), b2);
  g += scnLabel(1350, 506, '稻穀', 30, C.chalk, b2);
  const phase = Math.min(3.5, Math.max(0, u - 6.4)) * 1.2;
  g += scnRunningMini(800, 675, .75 * (.25 + .75 * b3), b3, phase);
  g += scnLabel(800, 814, '跑步的人', 30, C.chalk, b3);
  return scnPaint(g);
}

function scnS5(u) {
  let g = head(u, '怎麼走', '跟著腳步走') + scnTag(1);
  const m = scnK(u, .12, .7);
  const mx = 355, my = 250, ms = .77;
  g += scnMap(mx, my, ms, m);
  const route = [[456, 595], [490, 576], [530, 557], [570, 540], [610, 529], [650, 522], [690, 514], [730, 501], [770, 482], [806, 461], [843, 440], [880, 420], [917, 404], [953, 394]];
  route.forEach(([x, y], i) => {
    const op = scnK(u, .35 + i * .34, .72 + i * .34);
    if (op > 0) g += scnFoot(x, y, -18 + i * 2.6, .82, op);
  });
  const stationTimes = [.5, 4.1, 8.1];
  const stations = [[415, 520, 450, 664, '校門'], [835, 585, 745, 655, '操場'], [872, 330, 990, 302, '花園']];
  stations.forEach(([x, y, lx, ly, label], i) => {
    const show = scnK(u, stationTimes[i], .65);
    const lit = scnK(u, stationTimes[i] + .15, .85);
    g += scnBadge(x, y, i + 1, show, lit);
    g += scnLabel(lx, ly, label, 29, C.chalk, show);
  });
  g += scnLabel(570, 731, '移步', 32, C.blue, scnK(u, 1, .6));
  const inset = scnK(u, .45, .75);
  g += `<g opacity="${scnO(inset)}">${box(1195, 345, 300, 264, C.chalk, 1, C.deep)}`;
  const cx = 1345, baseY = 533;
  g += scnDoll(cx, baseY, .62, inset);
  const sweep = 360 * scnK(u, .65, 7.2), a = (sweep - 90) * Math.PI / 180;
  const ex = cx + Math.cos(a) * 105, ey = baseY - 74 + Math.sin(a) * 105;
  g += `<path d="M${cx} ${baseY - 74} L${cx + Math.cos(a - .2) * 105} ${baseY - 74 + Math.sin(a - .2) * 105} A105 105 0 0 1 ${ex} ${ey} Z" fill="rgba(242,193,78,.12)" stroke="${C.yellow}" stroke-width="3" opacity=".85"/>`;
  g += scnLine(cx, baseY - 74, ex, ey, C.yellow, 5, 1);
  g += `</g>`;
  g += scnLabel(1345, 659, '定點', 32, C.yellow, inset);
  return scnPaint(g);
}

function scnS6(u) {
  let g = head(u, '骨架', '一站一段') + scnTag(1);
  const y = 290, h = 200;
  const xs = [140, 365, 805, 1245], ws = [215, 430, 430, 215];
  const colors = [C.blue, C.blue, C.blue, C.orange];
  const starts = [.3, .9, 1.5, 2.1], labels = ['總說', '分說', '分說', '感想'];
  const centers = xs.map((x, i) => x + ws[i] / 2);

  for (let i = 0; i < 4; i++) {
    const land = starts[i] + .5;
    const p = scnK(u, starts[i], land);
    const bounceP = scnK(u, land, land + .4);
    const bounce = Math.sin(Math.PI * bounceP) * (1 - bounceP) * 18;
    const blockY = y - (1 - p) * 180 - bounce;
    const op = scnK(u, starts[i], starts[i] + .18);
    g += scnBlock(xs[i], blockY, ws[i], h, colors[i], op);
    if (i === 0) {
      g += scnMap(xs[i] + (ws[i] - 190) / 2, blockY + 47, .19, op);
    } else if (i === 3) {
      g += scnHeart(centers[i], blockY + h / 2 + 6, .82, op);
    }
  }

  const miniStarts = [3.0, 3.65, 4.3, 4.95], miniDuration = .55;
  for (let i = 0; i < 4; i++) {
    const p = scnK(u, miniStarts[i], miniStarts[i] + miniDuration);
    const op = scnK(u, miniStarts[i], miniStarts[i] + .15);
    if (i === 0) {
      g += scnGate(470, lerp(150, 430, p), .42, op);
    } else if (i === 1) {
      g += scnTrack(690, lerp(150, 410, p), .4, op);
    } else if (i === 2) {
      g += scnGardenSpot(905, lerp(165, 318, p), .86, op);
    } else {
      g += scnRiceField(1050, lerp(165, 365, p), 150, 78, op);
    }
  }

  for (let i = 0; i < 4; i++) {
    g += scnLabel(centers[i], 548, labels[i], 36, C.chalk, scnK(u, 5.5, 6.5));
  }

  const examples = [
    ['校園不大', '花草樹木多'],
    ['校門：兩排綠樹', '操場：紅跑道'],
    ['花園：花朵盛開', '稻田：金黃稻穀'],
    ['我愛我的校園'],
  ];
  const exampleStarts = [6.5, 7.8, 9.1, 10.4];
  for (let i = 0; i < 4; i++) {
    const op = scnK(u, exampleStarts[i], exampleStarts[i] + .8);
    g += scnLabel(centers[i], 600, examples[i][0], 30, C.yellow, op);
    if (examples[i][1]) g += scnLabel(centers[i], 645, examples[i][1], 30, C.yellow, op);
  }
  return scnPaint(g);
}

function scnS7(u) {
  let g = head(u, '骨架', '每段都要照到重點') + scnTag(1);
  const titleOp = scnK(u, .2, 1.0);
  g += box(555, 215, 400, 92, C.yellow, titleOp, C.deep);
  g += txt(646, 276, '〈', { a: 'end', s: 44, w: 1, f: C.yellow, o: titleOp });
  g += txt(690, 276, '美麗', { a: 'middle', s: 44, w: 1, f: C.yellow, o: titleOp });
  g += txt(734, 276, '的校園〉', { a: 'start', s: 44, w: 1, f: C.yellow, o: titleOp });
  g += scnLabel(1215, 274, '有寫到美嗎', 32, C.yellow, titleOp);

  const xs = [170, 600, 1030], cardStarts = [1.5, 2.1, 2.7];
  const cardOps = cardStarts.map((start) => scnK(u, start, start + .6));
  const cardCOp = cardOps[2] * (1 - .45 * scnK(u, 9.8, 10.4));
  g += box(xs[0], 380, 400, 220, C.chalk, cardOps[0], C.deep);
  g += box(xs[1], 380, 400, 220, C.chalk, cardOps[1], C.deep);
  g += box(xs[2], 380, 400, 220, C.chalk, cardCOp, C.deep);

  g += scnTrack(370, 455, .45, cardOps[0]);
  g += scnFlower(760, 460, .55, cardOps[1]);
  g += scnFlower(800, 450, .65, cardOps[1]);
  g += scnFlower(840, 460, .5, cardOps[1]);
  g += scnWallet(1230, 455, .8, cardCOp);

  g += txt(285, 560, '跑道', { a: 'start', s: 34, w: 1, f: C.chalk, o: cardOps[0] });
  g += txt(353, 560, '紅通通', { a: 'start', s: 34, w: 1, f: C.yellow, o: cardOps[0] });
  g += txt(698, 560, '花朵', { a: 'start', s: 34, w: 1, f: C.chalk, o: cardOps[1] });
  g += txt(766, 560, '五顏六色', { a: 'start', s: 34, w: 1, f: C.yellow, o: cardOps[1] });
  g += txt(1111, 560, '去福利社買餅乾', { a: 'start', s: 34, w: 1, f: C.chalk, o: cardCOp });

  const lineA = scnK(u, 5.0, 5.8), lineB = scnK(u, 7.4, 8.2);
  if (lineA > 0) g += scnLine(353, 575, 353 + 102 * lineA, 575, C.yellow, 6, 1);
  if (lineB > 0) g += scnLine(766, 575, 766 + 136 * lineB, 575, C.yellow, 6, 1);

  const starA = scnK(u, 5.4, 6.0), starB = scnK(u, 7.8, 8.4);
  g += scnStar(555, 392, 34, starA);
  g += scnStar(985, 392, 34, starB);
  g += scnLabel(370, 652, '文題相符', 34, C.blue, starA);
  g += scnLabel(800, 652, '文題相符', 34, C.blue, starB);

  const crossOp = scnK(u, 9.8, 10.4);
  g += scnPath('M1366 371 L1434 439', C.red, 12, crossOp);
  g += scnPath('M1434 371 L1366 439', C.red, 12, crossOp);
  g += scnLabel(1230, 652, '文題不符', 34, C.red, crossOp);

  let lensX = 690, lensY = 262;
  if (u >= 3.6 && u < 6.0) {
    const p = scnK(u, 3.6, 5.0);
    lensX = lerp(690, 404, p);
    lensY = lerp(262, 548, p);
  } else if (u >= 6.0 && u < 8.4) {
    lensX = lerp(404, 834, scnK(u, 6.0, 7.4));
    lensY = 548;
  } else if (u >= 8.4 && u < 9.8) {
    const p = scnK(u, 8.4, 9.8);
    const wiggle = Math.sin((u - 8.4) / 1.4 * 4 * Math.PI) * 12;
    lensX = lerp(834, 1230, p) + wiggle;
    lensY = 548;
  } else if (u >= 9.8 && u < 10.6) {
    lensX = 1230;
    lensY = 548;
  } else if (u >= 10.6) {
    const p = scnK(u, 10.6, 12.0);
    lensX = lerp(1230, 690, p);
    lensY = lerp(548, 262, p);
  }
  g += scnLens(lensX, lensY, 48, scnK(u, .6, 1.2));
  return scnPaint(g);
}

function scnStationCard(x, y, kind, scale, op) {
  if (kind === 'gate') return scnGate(x, y + 48 * scale, scale, op);
  if (kind === 'track') return scnTrack(x, y, scale, op);
  return scnGardenSpot(x, y - 38 * scale, scale, op);
}

function scnS8(u) {
  let g = head(u, '骨架', '第一句先總說') + scnTag(1);
  const sentence = '我們的校園不大，卻種滿了花草樹木。';
  const chars = Math.min(sentence.length, Math.floor(u * 2.2));
  const sentenceOp = scnK(u, .2, .55);
  g += txt(800, 275, sentence.slice(0, chars), { a: 'middle', s: 38, w: 1, f: C.yellow, o: sentenceOp });
  g += scnLabel(800, 333, '示範句為自編', 28, C.dim, sentenceOp);
  const build = scnK(u, 2.4, .9);
  g += `<g opacity="${scnO(build)}">${box(350, 375, 900, 270, C.chalk, 1, C.deep)}`;
  g += scnMap(570, 402, .43, build);
  g += scnLabel(405, 428, '總', 32, C.yellow, build);
  g += `</g>`;
  const lines = [[485, 645, 485, 697], [800, 645, 800, 697], [1115, 645, 1115, 697]];
  lines.forEach(([x1, y1, x2, y2], i) => g += scnLine(x1, y1, x2, y2, C.chalk, 4, scnK(u, 4.2 + i * .55, 4.8 + i * .55)));
  const stationOp = scnK(u, 5.7, .7);
  g += scnStationCard(485, 747, 'gate', .34, stationOp);
  g += scnStationCard(800, 738, 'track', .31, stationOp);
  g += scnStationCard(1115, 741, 'garden', .42, stationOp);
  g += scnLabel(800, 829, '分', 32, C.blue, stationOp);
  return scnPaint(g);
}

function scnS9(u) {
  let g = head(u, '練習', '換你排骨架') + scnTag(1);
  const title = scnK(u, .18, .65);
  g += `<g opacity="${scnO(title)}">${box(110, 215, 1380, 98, C.yellow, 1, C.deep)}${txt(800, 281, '〈○○公園〉', { a: 'middle', s: 54, w: 1, f: C.yellow })}</g>`;
  const top = scnK(u, .4, .7);
  g += `<rect x="190" y="374" width="355" height="160" rx="18" fill="rgba(127,182,217,.015)" stroke="${C.blue}" stroke-width="5" stroke-dasharray="14 10" opacity="${scnO(top)}"/>`;
  g += scnLabel(367, 584, '範圍', 32, C.blue, top);
  g += scnLens(750, 454, 61, top, true);
  g += scnLabel(750, 584, '重點', 32, C.yellow, top);
  const mapOp = scnK(u, 1.2, .75);
  g += scnParkBlank(965, 360, 470, 198, mapOp);
  const xs = [320, 480, 800, 1120], ws = [160, 320, 320, 160], colors = [SCN_BLUE, SCN_BLUE, SCN_BLUE, SCN_ORANGE];
  for (let i = 0; i < 4; i++) {
    const t = 5.7 + i * 1.25;
    const flash = Math.max(0, Math.sin(Math.PI * P(u, t, t + .52)));
    const op = scnK(u, .7 + i * .18, 1.2 + i * .18);
    g += scnBlock(xs[i], 660, ws[i], 96, colors[i], op, true);
    if (flash > .01) g += `<rect x="${xs[i]}" y="660" width="${ws[i]}" height="96" rx="14" fill="rgba(242,193,78,${(flash * .17).toFixed(3)})" stroke="${C.yellow}" stroke-width="5"/>`;
  }
  return scnPaint(g);
}

function s1(u) { return scnS1(u); }
function s2(u) { return scnS2(u); }
function s3(u) { return scnS3(u); }
function s4(u) { return scnS4(u); }
function s5(u) { return scnS5(u); }
function s6(u) { return scnS6(u); }
function s7(u) { return scnS7(u); }
function s8(u) { return scnS8(u); }
function s9(u) { return scnS9(u); }
