const META = {
  title: '每一層先插路標',
  subtitle: '9 段・約 2 分鐘・三年級說明文（事物）第四集',
  ariaLabel: '一段一句一層，每層先寫路標再寫變化，最後把變化串起來。',
  note: '出處：楊裕貿作文寫作要領、研習講義、寫作課程設計。積木、盒子、珠子、旗子（路標）、放大鏡、小卡、杯子裡的綠豆是視覺比喻或示意；綠豆天數是示範，不是實驗數據；示範句、短語與吹畫步驟自編。鍵盤操作：空白鍵播放／暫停，左右方向鍵切換段落，F 鍵全螢幕。畫面只由時間決定。',
  works: [],
};

const EPL_WOOD = '#a9784f';
const EPL_RED = '#d9605a';
const EPL_GREEN = '#8fd18a';
const EPL_BLUE = '#7fb6d9';
const EPL_ORANGE = '#e8875b';
const EPL_YELLOW = '#f2c14e';
const EPL_BR = 34, EPL_KNOT = '#c96a40', EPL_CREAM = '#efe9d8', EPL_INK = '#1a2b23';
const LAY_BEAD_RADIUS = EPL_BR, LAY_BEAD_COLOR = EPL_BLUE;
const eplK = (u, a, b) => ease(P(u, a, b));
const eplO = (value) => Math.max(0, Math.min(1, Number(value) || 0)).toFixed(3);
const eplN = (value) => Number(value).toFixed(1);

function eplTag(op = 1) {
  return `<g opacity="${eplO(op)}">${box(1375, 56, 165, 60, C.orange, 1, C.deep)}${txt(1457, 98, '比喻', { a: 'middle', s: 30, w: 1, f: C.orange })}</g>`;
}

function eplLabel(cx, y, value, size = 30, color = C.chalk, op = 1) {
  if (op <= 0.001) return '';
  return txt(cx, y, value, { a: 'middle', s: size, w: 1, f: color, o: op });
}

function eplTextByChar(value, cx, y, size, color, op = 1) {
  const chars = Array.from(value);
  return chars.map((ch, i) => txt(cx + (i - (chars.length - 1) / 2) * size, y, ch, {
    a: 'middle', s: size, w: 1, f: color, o: op,
  })).join('');
}

function eplType(value, u, cx, y, size, color, start, end, op = 1) {
  if (u <= start || op <= 0.001) return '';
  const chars = Array.from(value);
  const count = Math.min(chars.length, Math.ceil(eplK(u, start, end) * chars.length));
  return chars.slice(0, count).map((ch, i) => txt(cx + (i - (chars.length - 1) / 2) * size, y, ch, {
    a: 'middle', s: size, w: 1, f: color, o: op,
  })).join('');
}

function eplLine(x1, y1, x2, y2, color = C.chalk, width = 5, op = 1, dash = '') {
  if (op <= 0.001) return '';
  return `<path d="M${eplN(x1)} ${eplN(y1)} L${eplN(x2)} ${eplN(y2)}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${eplO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function eplPath(d, color = C.chalk, width = 5, op = 1, fill = 'none', dash = '') {
  if (op <= 0.001) return '';
  return `<path d="${d}" fill="${fill}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${eplO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function eplCircle(cx, cy, r, stroke = C.chalk, width = 5, fill = 'none', op = 1, dash = '') {
  if (op <= 0.001 || r <= 0) return '';
  return `<circle cx="${eplN(cx)}" cy="${eplN(cy)}" r="${eplN(r)}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" opacity="${eplO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function eplBlock(x, y, w, h, color, op = 1, dashed = false) {
  if (op <= 0.001 || w <= 2 || h <= 2) return '';
  if (dashed) return `<g opacity="${eplO(op)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="rgba(239,233,216,.012)" stroke="${color}" stroke-width="5" stroke-dasharray="14 10"/></g>`;
  let g = `<g opacity="${eplO(op)}">`;
  const count = Math.max(2, Math.floor(w / 130));
  for (let i = 0; i < count; i++) {
    const cx = x + w * (i + 0.5) / count;
    g += `<rect x="${eplN(cx - 20)}" y="${eplN(y - 11)}" width="40" height="13" rx="6" fill="${color}"/>`;
  }
  return g + `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${color}" fill-opacity=".22" stroke="${C.chalk}" stroke-width="4"/></g>`;
}

function eplCardFrame(x, y, w, h, op = 1, dashed = false, stroke = C.chalk) {
  if (op <= 0.001) return '';
  if (dashed) return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="rgba(239,233,216,.012)" stroke="${stroke}" stroke-width="4" stroke-dasharray="13 9" opacity="${eplO(op)}"/>`;
  return `<g opacity="${eplO(op)}">${box(x, y, w, h, stroke, 1, 'rgba(239,233,216,.015)')}</g>`;
}

function eplStar(cx, cy, r, op = 1) {
  if (op <= 0.01 || r <= 1) return '';
  const points = [];
  for (let i = 0; i < 10; i++) {
    const angle = -Math.PI / 2 + i * Math.PI / 5;
    const radius = i % 2 ? r * 0.46 : r;
    points.push(`${eplN(cx + Math.cos(angle) * radius)},${eplN(cy + Math.sin(angle) * radius)}`);
  }
  return `<polygon points="${points.join(' ')}" fill="rgba(242,193,78,.3)" stroke="${C.yellow}" stroke-width="5" stroke-linejoin="round" opacity="${eplO(op)}"/>`;
}

function eplCheck(cx, cy, scale = 1, op = 1) {
  if (op <= 0.01) return '';
  return `<path d="M${cx - 30 * scale} ${cy} L${cx - 8 * scale} ${cy + 23 * scale} L${cx + 37 * scale} ${cy - 30 * scale}" fill="none" stroke="${EPL_GREEN}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" opacity="${eplO(op)}"/>`;
}

function eplCross(cx, cy, size = 24, op = 1) {
  if (op <= 0.01) return '';
  return `<g opacity="${eplO(op)}" stroke="${EPL_RED}" stroke-width="10" stroke-linecap="round"><line x1="${cx - size}" y1="${cy - size}" x2="${cx + size}" y2="${cy + size}"/><line x1="${cx + size}" y1="${cy - size}" x2="${cx - size}" y2="${cy + size}"/></g>`;
}

function eplLens(cx, cy, r = 48, op = 1, dashed = false, handleUp = false) {
  if (op <= 0.01 || r <= 1) return '';
  const dash = dashed ? '11 9' : '';
  const sy = handleUp ? -1 : 1;
  return `<g opacity="${eplO(op)}"><circle cx="${eplN(cx)}" cy="${eplN(cy)}" r="${eplN(r)}" fill="rgba(242,193,78,.045)" stroke="${C.yellow}" stroke-width="8"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<path d="M${eplN(cx + r * 0.68)} ${eplN(cy + sy * r * 0.68)} L${eplN(cx + r * 1.28)} ${eplN(cy + sy * r * 1.28)}" stroke="${C.yellow}" stroke-width="17" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<path d="M${eplN(cx + r * 0.8)} ${eplN(cy + sy * 0.8)} L${eplN(cx + r * 1.26)} ${eplN(cy + sy * 1.26)}" stroke="${C.chalk}" stroke-width="4" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/></g>`;
}

function eplFlash(u, start) {
  const fadeIn = eplK(u, start, start + 0.08);
  const fadeOut = 1 - eplK(u, start + 0.42, start + 0.5);
  return Math.max(0, Math.min(fadeIn, fadeOut));
}

function eplBracket(x1, x2, y, progress, color = C.yellow) {
  if (progress <= 0.001) return '';
  const end = lerp(x1, x2, progress);
  return eplPath(`M${x1} ${y - 8} V${y} H${end} V${y - 8}`, color, 4, 1);
}

function eplPaint(svg) {
  return svg.replace(/font-size="24"/g, 'font-size="26"')
    .replace(/<text ([^>]*?)fill="([^"]+)"/g, '<text $1style="fill:$2" fill="$2"');
}

function eplBead(cx, cy, sc = 0.8, op = 1, color = LAY_BEAD_COLOR) {
  const r = LAY_BEAD_RADIUS * sc;
  if (op <= 0.002 || r <= 1) return '';
  return `<g opacity="${eplO(op)}"><circle cx="${eplN(cx)}" cy="${eplN(cy)}" r="${eplN(r)}" fill="${color}" stroke="rgba(26,43,35,.5)" stroke-width="3"/><ellipse cx="${eplN(cx-r*.38)}" cy="${eplN(cy-r*.42)}" rx="${eplN(r*.26)}" ry="${eplN(r*.15)}" fill="#fff" opacity=".5" transform="rotate(-35 ${eplN(cx-r*.38)} ${eplN(cy-r*.42)})"/></g>`;
}

function eplPhrase(x, y, value, size = 30, color = C.chalk, op = 1, anchor = 'start') {
  if (op <= 0.001) return '';
  return txt(x, y, value, { a: anchor, s: size, w: 1, f: color, o: op });
}

function eplWorkTag(x, y, w, value, op = 1) {
  return eplLabel(x + w / 2, y, value, 34, C.chalk, op);
}

function eplContainer(x, y, w, h, op = 1, dashed = false, stroke = C.chalk) {
  if (op <= 0.001) return '';
  const fill = dashed ? 'rgba(239,233,216,.008)' : 'rgba(239,233,216,.035)';
  return `<rect x="${eplN(x)}" y="${eplN(y)}" width="${eplN(w)}" height="${eplN(h)}" rx="14" fill="${fill}" stroke="${stroke}" stroke-width="4" opacity="${eplO(op)}"${dashed ? ' stroke-dasharray="14 10"' : ''}/>`;
}

function eplFlag(fx, fy, label, op = 1, dashed = false) {
  if (op <= 0.001) return '';
  const dash = dashed ? '11 8' : '';
  let g = `<g opacity="${eplO(op)}">${eplLine(fx, fy, fx, fy + 84, C.chalk, 4, 1)}`;
  g += `<rect x="${eplN(fx)}" y="${eplN(fy)}" width="120" height="44" rx="7" fill="${dashed ? 'none' : EPL_YELLOW}" stroke="${EPL_YELLOW}" stroke-width="4"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
  if (!dashed && label) g += txt(fx + 60, fy + 31, label, { a: 'middle', s: 30, w: 1, f: EPL_INK });
  return g + '</g>';
}

function eplMiniCard(x, y, title, phrase, op = 1) {
  if (op <= 0.001) return '';
  return `<g opacity="${eplO(op)}">${box(x, y, 300, 130, C.chalk, 1, 'rgba(26,43,35,.12)')}` +
    txt(x + 150, y + 45, title, { a: 'middle', s: 30, w: 1, f: EPL_YELLOW }) +
    txt(x + 150, y + 100, phrase, { a: 'middle', s: 30, w: 1, f: C.chalk }) + '</g>';
}

function eplCup(cx, cy, stage, scale = 1, op = 1) {
  const s = Math.max(0, Math.min(4, stage));
  const grow = eplK(s, 0, 1);
  const root = eplK(s, 1, 2);
  const fineRoots = eplK(s, 2, 3);
  const stem = eplK(s, 2, 3);
  const leaves = eplK(s, 3, 4);
  let g = `<g transform="translate(${eplN(cx)} ${eplN(cy)}) scale(${eplN(scale)})" opacity="${eplO(op)}" stroke-linecap="round" stroke-linejoin="round">`;
  g += `<path d="M-70 -65 L-55 65 H55 L70 -65" fill="rgba(239,233,216,.015)" stroke="${C.chalk}" stroke-width="5"/>`;
  g += `<ellipse cx="0" cy="-65" rx="70" ry="10" fill="none" stroke="${C.chalk}" stroke-width="5"/>`;
  g += `<path d="M-64 -18 Q-48 -29 -31 -18 T2 -18 T35 -18 T62 -18 L58 5 Q35 11 10 4 T-40 5 L-60 2 Z" fill="rgba(239,233,216,.25)" stroke="${C.chalk}" stroke-width="3"/>`;
  const rx = 12 + 6 * grow;
  const ry = 9 + 4 * grow;
  g += `<ellipse cx="0" cy="-30" rx="${rx}" ry="${ry}" fill="#8fbf6a" stroke="${C.chalk}" stroke-width="3"/>`;
  if (root > 0.01) {
    const endY = lerp(-17, 23, root);
    const dash = (42 * root).toFixed(1);
    g += `<path d="M0 -17 Q-8 -3 2 5 Q9 13 2 ${endY}" fill="none" stroke="#f3efe2" stroke-width="4" stroke-dasharray="${dash} 42"/>`;
    g += `<path d="M-4 -34 Q0 -29 4 -25" fill="none" stroke="#f3efe2" stroke-width="2.5" opacity="${root}"/>`;
  }
  if (fineRoots > 0.01) {
    const rootTip = lerp(-1, 17, fineRoots);
    for (let idx = 0; idx < 3; idx++) {
      const side = idx === 1 ? 1 : -1;
      const fromY = -1 + idx * 8;
      const len = 12 * fineRoots;
      const toX = (idx - 1) * 9;
      g += `<path d="M${toX * .3} ${fromY} Q${toX * .6 + side * 3} ${fromY + len * .45} ${toX + side * len * .55} ${rootTip + len * .35}" fill="none" stroke="#f3efe2" stroke-width="2" opacity="${fineRoots}"/>`;
    }
  }
  if (stem > 0.01) {
    const topY = lerp(-40, -90, stem);
    const dash = (50 * stem).toFixed(1);
    g += `<path d="M0 -40 Q5 -62 0 ${topY}" fill="none" stroke="#9fd27a" stroke-width="5" stroke-dasharray="${dash} 50"/>`;
  }
  if (leaves > 0.01) {
    const leafRx = 16 * leaves;
    const leafRy = 9 * leaves;
    g += `<ellipse cx="-12" cy="-87" rx="${leafRx}" ry="${leafRy}" transform="rotate(-30 -12 -87)" fill="#9fd27a" stroke="${C.chalk}" stroke-width="2.5" opacity="${leaves}"/>`;
    g += `<ellipse cx="12" cy="-87" rx="${leafRx}" ry="${leafRy}" transform="rotate(30 12 -87)" fill="#9fd27a" stroke="${C.chalk}" stroke-width="2.5" opacity="${leaves}"/>`;
  }
  return g + '</g>';
}

function eplPaper(cx, cy, kind, k = 0, scale = 1, op = 1) {
  const p = Math.max(0, Math.min(1, k));
  const colors = [EPL_RED, EPL_BLUE, EPL_YELLOW];
  let g = `<g transform="translate(${eplN(cx)} ${eplN(cy)}) scale(${eplN(scale)})" opacity="${eplO(op)}" stroke-linecap="round" stroke-linejoin="round">`;
  g += `<rect x="-100" y="-70" width="200" height="140" rx="5" fill="rgba(239,233,216,.055)" stroke="${C.chalk}" stroke-width="4"/>`;
  if (kind === 1) {
    const xs = [-36, 0, 36];
    for (let i = 0; i < 3; i++) {
      const yy = lerp(-82, -18 + (i % 2) * 9, p);
      g += `<circle cx="${xs[i]}" cy="${yy}" r="7" fill="${colors[i]}" stroke="${C.chalk}" stroke-width="1.5" opacity="${eplO(0.45 + 0.55 * p)}"/>`;
    }
  } else if (kind === 2 || kind === 3) {
    const paths = [
      'M0 0 Q-34 -20 -65 -48',
      'M0 0 Q-7 -42 16 -59',
      'M0 0 Q34 -20 63 -42',
    ];
    for (let i = 0; i < paths.length; i++) {
      const color = colors[i];
      if (kind === 2) g += `<path d="${paths[i]}" fill="none" stroke="${color}" stroke-width="7" pathLength="100" stroke-dasharray="${(100 * p).toFixed(1)} 100"/>`;
      else g += `<path d="${paths[i]}" fill="none" stroke="${color}" stroke-width="7"/>`;
      if (kind === 2 && p < 0.95) g += `<circle cx="0" cy="0" r="7" fill="${color}" opacity="${eplO(1 - p)}"/>`;
    }
    if (kind === 2) {
      g += `<path d="M42 -58 L88 -26" fill="none" stroke="${C.chalk}" stroke-width="9"/>`;
      g += `<path d="M49 -62 L93 -31" fill="none" stroke="${EPL_WOOD}" stroke-width="2"/>`;
    } else {
      g += `<circle cx="70" cy="-42" r="18" fill="${C.deep}" stroke="${C.chalk}" stroke-width="4"/>`;
      g += `<path d="M70 -42 V-53 M70 -42 L79 -36" fill="none" stroke="${C.yellow}" stroke-width="3.5"/>`;
    }
  }
  return g + '</g>';
}

function eplRow(x, y, flag, phrase, op = 1) {
  return eplFlag(x + 40, y - 40, flag, op) +
    eplBead(x + 230, y, 0.8, op) +
    eplPhrase(x + 270, y + 10, phrase, 30, C.chalk, op);
}

function s1(u) {
  let g = head(u, '開場', '骨架長肉') + eplTag();
  const titleOp = eplK(u, 0.2, 0.8);
  g += `<g opacity="${eplO(titleOp)}">${box(640, 200, 320, 72, EPL_YELLOW, 1, C.deep)}${eplLabel(800, 248, '〈種子的發芽〉', 40, EPL_YELLOW)}</g>`;
  const xs = [140, 360, 780, 1200], ws = [200, 400, 400, 200];
  const labels = ['準備材料', '前三天', '第四到七天', '總結結果'];
  const starts = [0.5, 1.1, 1.7, 2.3];
  const dim = 1 - 0.65 * eplK(u, 4.0, 5.0);
  for (let i = 0; i < 4; i++) {
    const appear = eplK(u, starts[i], starts[i] + 0.5);
    const op = appear * (i === 1 ? 1 : dim);
    g += eplBlock(xs[i], 300, ws[i], 150, EPL_BLUE, op) + eplWorkTag(xs[i], 385, ws[i], labels[i], op);
  }
  const grow = eplK(u, 4.0, 5.5);
  const bx = lerp(360, 480, grow), by = lerp(300, 500, grow);
  const bw = lerp(400, 640, grow), bh = lerp(150, 300, grow);
  g += eplContainer(bx, by, bw, bh, grow, false, C.chalk);
  const innerTag = eplK(u, 5.0, 5.5);
  g += eplWorkTag(480, 550, 640, '前三天', innerTag);
  g += eplPhrase(1250, 660, '長肉', 36, EPL_YELLOW, eplK(u, 6.5, 7.5));
  return eplPaint(g);
}

function s2(u) {
  let g = head(u, '一段裡面', '先插路標') + eplTag();
  const boxOp = eplK(u, 0.2, 0.8);
  g += eplContainer(500, 230, 600, 560, boxOp) + eplWorkTag(500, 285, 600, '前三天', boxOp);
  const flag1 = eplK(u, 2.0, 2.5);
  g += eplFlag(540, 390 - 60 * (1 - flag1), '第一天', flag1);
  const bead1 = eplK(u, 2.8, 2.9), fall1 = eplK(u, 2.8, 3.6);
  g += eplBead(730, lerp(230, 430, fall1), 0.8, bead1);
  const flag2 = eplK(u, 5.5, 6.0);
  g += eplFlag(540, 540 - 60 * (1 - flag2), '第三天', flag2);
  const bead2 = eplK(u, 6.3, 6.4), fall2 = eplK(u, 6.3, 7.1);
  g += eplBead(730, lerp(230, 580, fall2), 0.8, bead2);
  g += eplPhrase(300, 470, '一句一層', 36, EPL_YELLOW, eplK(u, 8.5, 9.3));
  g += eplPhrase(300, 560, '先寫第幾天', 36, EPL_YELLOW, eplK(u, 9.5, 10.3));
  return eplPaint(g);
}

function s3(u) {
  let g = head(u, '一段裡面', '看出變化') + eplTag();
  g += eplLabel(1050, 250, '寫出變化', 36, EPL_YELLOW, eplK(u, 0.2, 0.8));
  const cupStage = u < 2.5 ? eplK(u, 1.0, 2.5) : 1 + eplK(u, 3.0, 4.5);
  g += eplCup(420, 560, cupStage, 1.8, eplK(u, 0.2, 0.8));
  const flagIn = eplK(u, 0.5, 1.0), flagY = 300 - 60 * (1 - flagIn);
  const daySwap = eplK(u, 3.0, 3.5);
  g += eplFlag(130, flagY, '', flagIn);
  g += eplLabel(190, flagY + 31, '第一天', 30, EPL_INK, flagIn * (1 - daySwap));
  g += eplLabel(190, flagY + 31, '第三天', 30, EPL_INK, flagIn * daySwap);

  const cards = [
    [300, '大小', '又大又胖', 6.0],
    [460, '形狀', '裂開', 7.5],
    [620, '顏色', '白色的根', 9.0],
  ];
  for (const [y, title, phrase, start] of cards) g += eplMiniCard(900, y, title, phrase, eplK(u, start, start + 0.5));

  let lx = 700, ly = 300;
  if (u >= 5.0 && u < 6.5) {
    const p = eplK(u, 5.0, 6.5); lx = lerp(700, 420, p); ly = lerp(300, 500, p);
  } else if (u >= 6.5 && u < 10.5) { lx = 420; ly = 500; }
  else if (u >= 10.5) {
    const p = eplK(u, 10.5, 11.5); lx = lerp(420, 680, p); ly = lerp(500, 300, p);
  }
  const flash = Math.max(eplFlash(u, 6.0), eplFlash(u, 7.5), eplFlash(u, 9.0));
  if (flash > 0.01) g += eplCircle(lx, ly, 76, EPL_YELLOW, 4, 'rgba(242,193,78,.12)', flash);
  if (u >= 5.0) g += eplLens(lx, ly, 60, 1);
  return eplPaint(g);
}

function s4(u) {
  let g = head(u, '示範', '前三天長好了') + eplTag();
  const aOp = eplK(u, 0.2, 0.8);
  g += eplContainer(110, 230, 680, 560, aOp) + eplWorkTag(110, 285, 680, '前三天', aOp);
  g += eplFlag(150, 390, '第一天', aOp) + eplBead(340, 430, 0.8, aOp);
  g += eplPhrase(380, 440, '又大又胖', 30, C.chalk, eplK(u, 1.0, 1.5));
  g += eplFlag(150, 540, '第三天', aOp) + eplBead(340, 580, 0.8, aOp);
  g += eplPhrase(380, 590, '裂開長白根', 30, C.chalk, eplK(u, 2.0, 2.5));

  const bOp = eplK(u, 4.0, 5.0);
  g += eplContainer(810, 230, 680, 560, bOp) + eplWorkTag(810, 285, 680, '第四到七天', bOp);
  const row1 = eplK(u, 5.5, 6.0);
  g += eplFlag(850, 390 - 60 * (1 - row1), '第五天', row1);
  const bead1 = eplK(u, 6.2, 6.3), fall1 = eplK(u, 6.2, 7.0);
  g += eplBead(1040, lerp(230, 430, fall1), 0.8, bead1);
  g += eplPhrase(1080, 440, '長鬚根和莖', 30, C.chalk, eplK(u, 6.8, 7.3));
  const row2 = eplK(u, 8.5, 9.0);
  g += eplFlag(850, 540 - 60 * (1 - row2), '第七天', row2);
  const bead2 = eplK(u, 9.2, 9.3), fall2 = eplK(u, 9.2, 10.0);
  g += eplBead(1040, lerp(230, 580, fall2), 0.8, bead2);
  g += eplPhrase(1080, 590, '開兩片綠葉', 30, C.chalk, eplK(u, 9.8, 10.3));
  return eplPaint(g);
}

function s5(u) {
  let g = head(u, '示範', '做東西的路標') + eplTag();
  const frame = eplK(u, 0.2, 0.8);
  g += eplContainer(440, 230, 720, 560, frame) + eplWorkTag(440, 285, 720, '吹畫的製作', frame);
  const rows = [
    [400, '開始', '滴三滴顏料', 1.0, 1],
    [530, '接著', '用吸管吹散', 4.0, 2],
    [660, '後來', '放窗邊晾乾', 7.0, 3],
  ];
  for (const [y, flag, phrase, start, kind] of rows) {
    const f = eplK(u, start, start + 0.5);
    g += eplFlag(480, y - 40 - 60 * (1 - f), flag, f);
    const beadOp = eplK(u, start + 0.7, start + 0.8), fall = eplK(u, start + 0.7, start + 1.5);
    g += eplBead(670, lerp(230, y, fall), 0.8, beadOp);
    const phraseOp = eplK(u, start + 1.2, start + 1.7);
    g += eplPhrase(710, y + 10, phrase, 30, C.chalk, phraseOp);
    g += eplPaper(1070, y, kind, 1, 0.35, phraseOp);
  }
  g += eplPhrase(1340, 510, '照步驟', 36, EPL_YELLOW, eplK(u, 9.5, 10.3));
  return eplPaint(g);
}

function s6(u) {
  let g = head(u, '檢查', '哪一顆能放進去') + eplTag();
  const frame = eplK(u, 0.2, 0.8);
  g += eplContainer(480, 470, 640, 330, frame) + eplWorkTag(480, 515, 640, '第四到七天', frame);
  g += eplRow(480, 600, '第五天', '長鬚根和莖', frame);
  const emptyFlagOp = frame * (1 - eplK(u, 10.0, 11.5));
  const filledFlagOp = frame * eplK(u, 10.0, 11.5);
  g += eplFlag(520, 680, '', emptyFlagOp, true) + eplCircle(710, 720, EPL_BR * 0.8, EPL_BLUE, 4, 'none', emptyFlagOp, '11 8');
  g += eplFlag(520, 680, '第七天', filledFlagOp);
  let lensX = 400, lensY = 355;
  if (u >= 4.5 && u < 5.0) lensX = lerp(400, 800, eplK(u, 4.5, 5.0));
  else if (u >= 5.0 && u < 7.5) lensX = 800;
  else if (u >= 7.5 && u < 8.0) lensX = lerp(800, 1200, eplK(u, 7.5, 8.0));
  else if (u >= 8.0) lensX = 1200;
  if (u >= 10.0 && u < 11.0) lensX = 1200;
  else if (u >= 11.0) {
    const p = eplK(u, 11.0, 11.8); lensX = lerp(1200, 1460, p); lensY = lerp(355, 760, p);
  }
  if (u >= 2.0) g += eplLens(lensX, lensY, 48, 1, false, true);
  const choices = [
    [400, '我好開心', 0.5, 3.5, '不加感覺', 4.0, 200],
    [800, '過幾天長葉子', 0.85, 6.5, '寫出第幾天', 7.0, 300],
    [1200, '第七天開兩葉', 1.2, 0, '', 10.0, 1200],
  ];
  for (const [x, phrase, appearAt, crossAt, note, dropAt, outX] of choices) {
    const appear = eplK(u, appearAt, appearAt + 0.3);
    const dropDur = note ? 1.0 : 1.5;
    const dim = dropAt ? 1 - 0.7 * eplK(u, dropAt, dropAt + dropDur) : 1;
    g += eplBead(x, 290, 0.8, appear * dim);
    g += eplPhrase(x, 355, phrase, 30, C.chalk, appear * dim, 'middle');
    if (note) {
      const p = eplK(u, dropAt, dropAt + 1.0), cloneOp = 0.85 * 4 * p * (1 - p) * appear;
      const copyX = lerp(x, outX, p), copyY = lerp(290, 455, p);
      g += eplBead(copyX, copyY, 0.8, cloneOp);
      g += eplPhrase(copyX, copyY + 65, phrase, 30, C.chalk, cloneOp, 'middle');
      const labelOp = eplK(u, crossAt, crossAt + 0.3);
      g += eplCross(x, 290, 22, labelOp) + eplPhrase(x, 415, note, 30, EPL_YELLOW, labelOp, 'middle');
    }
  }
  const approve = eplK(u, 9.5, 10.0);
  g += eplStar(1312, 248, 24, approve) + eplCheck(1258, 292, 0.55, approve);
  const fill = eplK(u, 10.0, 11.5);
  g += eplBead(lerp(1200, 710, fill), lerp(290, 720, fill), 0.8, eplK(u, 10.0, 10.15));
  g += eplPhrase(750, 730, '開兩片綠葉', 30, C.chalk, eplK(u, 10.0, 10.5));
  return eplPaint(g);
}

function s7(u) {
  let g = head(u, '動筆', '從短語到句子') + eplTag();
  const frame = eplK(u, 0.2, 0.8);
  g += eplContainer(300, 240, 1000, 320, frame) + eplWorkTag(300, 290, 1000, '前三天', frame);
  g += eplRow(300, 380, '第一天', '又大又胖', frame);
  const sentence = '第一天，綠豆喝了水，變得又大又胖。';
  g += eplType(sentence, u, 800, 470, 36, EPL_YELLOW, 1.5, 6.5);
  const mark = eplK(u, 7.0, 8.0);
  g += eplBracket(494, 602, 500, mark, EPL_YELLOW) + eplLabel(548, 530, '路標', 30, EPL_YELLOW, mark);
  g += eplBracket(854, 1070, 500, mark, EPL_YELLOW) + eplLabel(962, 530, '變化', 30, EPL_YELLOW, mark);
  return eplPaint(g);
}

function s8(u) {
  let g = head(u, '示範', '最後串起來') + eplTag();
  const xs = [200, 330, 460, 590], stages = [0, 1, 2, 4], starts = [0.5, 1.0, 1.5, 2.0];
  const gather = eplK(u, 3.0, 4.5);
  for (let i = 0; i < xs.length; i++) {
    const appear = eplK(u, starts[i], starts[i] + 0.45);
    const oldOp = appear * (1 - 0.65 * gather);
    g += eplCup(xs[i], 420, stages[i], 0.55, oldOp);
    const cloneOp = 0.8 * 4 * gather * (1 - gather) * appear;
    g += eplCup(lerp(xs[i], 400, gather), 420, stages[i], lerp(0.55, 0.14, gather), cloneOp);
  }
  g += eplLine(160, 520, lerp(160, 640, gather), 520, EPL_YELLOW, 5, gather);

  const frame = eplK(u, 0.5, 1.0);
  g += eplContainer(820, 250, 640, 400, frame) + eplWorkTag(820, 305, 640, '總結結果', frame);
  const fly = eplK(u, 4.5, 5.5);
  g += eplBead(lerp(400, 1050, fly), lerp(520, 440, fly), 0.8, eplK(u, 4.5, 4.65));
  const flag = eplK(u, 5.5, 6.0);
  g += eplFlag(860, 400 - 60 * (1 - flag), '七天裡', flag);
  g += eplPhrase(1090, 450, '從豆子到小芽', 30, C.chalk, eplK(u, 6.5, 7.0));
  g += eplPhrase(1140, 700, '不寫感想', 30, EPL_YELLOW, eplK(u, 8.0, 9.0));
  return eplPaint(g);
}

function s9(u) {
  let g = head(u, '練習', '換你長肉') + eplTag();
  const titleOp = eplK(u, 0.2, 0.8);
  g += `<g opacity="${eplO(titleOp)}">${box(620, 200, 360, 72, EPL_YELLOW, 1, C.deep)}${eplLabel(800, 248, '〈紙黏土的製作〉', 40, EPL_YELLOW)}</g>`;
  const xs = [140, 360, 780, 1200], ws = [200, 400, 400, 200];
  const labels = ['準備材料', '第一步', '接下來', '總結結果'];
  const starts = [0.6, 1.2, 1.8, 2.4];
  const dim = 1 - 0.6 * eplK(u, 3.5, 5.0);
  for (let i = 0; i < 4; i++) {
    const appear = eplK(u, starts[i], starts[i] + 0.5);
    const op = appear * (i === 1 ? 1 : dim);
    g += eplBlock(xs[i], 300, ws[i], 130, EPL_BLUE, op, true) + eplWorkTag(xs[i], 375, ws[i], labels[i], op);
  }
  const grow = eplK(u, 3.5, 5.0);
  const bx = lerp(360, 440, grow), by = lerp(300, 460, grow);
  const bw = lerp(400, 720, grow), bh = lerp(130, 370, grow);
  g += eplContainer(bx, by, bw, bh, grow, true, EPL_BLUE);
  const inner = eplK(u, 5.0, 6.0);
  g += eplWorkTag(440, 505, 720, '第一步', inner);

  const ys = [590, 680, 770], flashes = [7.0, 8.5, 10.0];
  for (let i = 0; i < ys.length; i++) {
    const y = ys[i], op = inner, flash = eplFlash(u, flashes[i]);
    g += eplFlag(480, y - 40, '', op, true);
    g += eplCircle(670, y, EPL_BR * 0.8, EPL_BLUE, 4, 'none', op, '11 8');
    g += eplLine(710, y, 940, y, EPL_BLUE, 4, op, '11 8');
    if (flash > 0.01) {
      g += `<rect x="483" y="${y - 37}" width="114" height="38" rx="5" fill="rgba(242,193,78,${(0.45 * flash).toFixed(3)})"/>`;
      g += `<circle cx="670" cy="${y}" r="23" fill="rgba(242,193,78,${(0.45 * flash).toFixed(3)})"/>`;
      g += eplLine(710, y, 940, y, EPL_YELLOW, 7, flash);
    }
  }
  const cardFlash = eplFlash(u, 11.5);
  const cards = [[568, '開始'], [658, '接著'], [748, '後來']];
  for (const [y, label] of cards) {
    const op = inner;
    if (cardFlash > 0.01) g += `<rect x="1202" y="${y + 2}" width="96" height="40" rx="6" fill="rgba(242,193,78,${(0.45 * cardFlash).toFixed(3)})"/>`;
    g += `<g opacity="${eplO(op)}"><rect x="1200" y="${y}" width="100" height="44" rx="6" fill="none" stroke="${EPL_YELLOW}" stroke-width="3" stroke-dasharray="11 8"/>${eplLabel(1250, y + 32, label, 30, EPL_YELLOW)}</g>`;
  }
  return eplPaint(g);
}
