const META = {
  title: '寫一件事怎麼變',
  subtitle: '9 段・約 2 分鐘・三年級說明文（事物）第三集',
  ariaLabel: '說明文記錄歷程，由開始到結束，時間式與事件式，四段骨架。',
  note: '出處：楊裕貿作文寫作要領、研習講義、寫作課程設計。解說牌、杯子裡的綠豆、長箭頭、月曆、步驟卡、積木、工作牌、放大鏡是視覺比喻或示意；綠豆天數是示範，不是實驗數據；示範句、短語與吹畫步驟自編。鍵盤操作：空白鍵播放／暫停，左右方向鍵切換段落，F 鍵全螢幕。畫面只由時間決定。',
  works: [],
};

const EXP_WOOD = '#a9784f';
const EXP_RED = '#d9605a';
const EXP_GREEN = '#8fd18a';
const EXP_BLUE = '#7fb6d9';
const EXP_ORANGE = '#e8875b';
const EXP_YELLOW = '#f2c14e';
const expK = (u, a, b) => ease(P(u, a, b));
const expO = (value) => Math.max(0, Math.min(1, Number(value) || 0)).toFixed(3);
const expN = (value) => Number(value).toFixed(1);

function expTag(op = 1) {
  return `<g opacity="${expO(op)}">${box(1375, 56, 165, 60, C.orange, 1, C.deep)}${txt(1457, 98, '比喻', { a: 'middle', s: 30, w: 1, f: C.orange })}</g>`;
}

function expLabel(cx, y, value, size = 30, color = C.chalk, op = 1) {
  if (op <= 0.001) return '';
  return txt(cx, y, value, { a: 'middle', s: size, w: 1, f: color, o: op });
}

function expTextByChar(value, cx, y, size, color = C.chalk, op = 1) {
  const chars = Array.from(value);
  return chars.map((ch, i) => txt(cx + (i - (chars.length - 1) / 2) * size, y, ch, {
    a: 'middle', s: size, w: 1, f: color, o: op,
  })).join('');
}

function expType(value, u, cx, y, size, color, start, end, op = 1) {
  if (u <= start || op <= 0.001) return '';
  const chars = Array.from(value);
  const count = Math.min(chars.length, Math.ceil(expK(u, start, end) * chars.length));
  return chars.slice(0, count).map((ch, i) => txt(cx + (i - (chars.length - 1) / 2) * size, y, ch, {
    a: 'middle', s: size, w: 1, f: color, o: op,
  })).join('');
}

function expLine(x1, y1, x2, y2, color = C.chalk, width = 5, op = 1, dash = '') {
  if (op <= 0.001) return '';
  return `<path d="M${expN(x1)} ${expN(y1)} L${expN(x2)} ${expN(y2)}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${expO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function expPath(d, color = C.chalk, width = 5, op = 1, fill = 'none', dash = '') {
  if (op <= 0.001) return '';
  return `<path d="${d}" fill="${fill}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${expO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function expCircle(cx, cy, r, stroke = C.chalk, width = 5, fill = 'none', op = 1, dash = '') {
  if (op <= 0.001 || r <= 0) return '';
  return `<circle cx="${expN(cx)}" cy="${expN(cy)}" r="${expN(r)}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" opacity="${expO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function expBlock(x, y, w, h, color, op = 1, dashed = false) {
  if (op <= 0.001 || w <= 2 || h <= 2) return '';
  if (dashed) return `<g opacity="${expO(op)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="rgba(239,233,216,.012)" stroke="${color}" stroke-width="5" stroke-dasharray="14 10"/></g>`;
  let g = `<g opacity="${expO(op)}">`;
  const count = Math.max(2, Math.floor(w / 130));
  for (let i = 0; i < count; i++) {
    const cx = x + w * (i + 0.5) / count;
    g += `<rect x="${expN(cx - 20)}" y="${expN(y - 11)}" width="40" height="13" rx="6" fill="${color}"/>`;
  }
  return g + `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${color}" fill-opacity=".22" stroke="${C.chalk}" stroke-width="4"/></g>`;
}

function expCardFrame(x, y, w, h, op = 1, dashed = false, stroke = C.chalk) {
  if (op <= 0.001) return '';
  if (dashed) return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="rgba(239,233,216,.012)" stroke="${stroke}" stroke-width="4" stroke-dasharray="13 9" opacity="${expO(op)}"/>`;
  return `<g opacity="${expO(op)}">${box(x, y, w, h, stroke, 1, 'rgba(239,233,216,.015)')}</g>`;
}

function expStar(cx, cy, r, op = 1) {
  if (op <= 0.01 || r <= 1) return '';
  const points = [];
  for (let i = 0; i < 10; i++) {
    const angle = -Math.PI / 2 + i * Math.PI / 5;
    const radius = i % 2 ? r * 0.46 : r;
    points.push(`${expN(cx + Math.cos(angle) * radius)},${expN(cy + Math.sin(angle) * radius)}`);
  }
  return `<polygon points="${points.join(' ')}" fill="rgba(242,193,78,.3)" stroke="${C.yellow}" stroke-width="5" stroke-linejoin="round" opacity="${expO(op)}"/>`;
}

function expCheck(cx, cy, scale = 1, op = 1) {
  if (op <= 0.01) return '';
  return `<path d="M${cx - 30 * scale} ${cy} L${cx - 8 * scale} ${cy + 23 * scale} L${cx + 37 * scale} ${cy - 30 * scale}" fill="none" stroke="${EXP_GREEN}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" opacity="${expO(op)}"/>`;
}

function expCross(cx, cy, size = 24, op = 1) {
  if (op <= 0.01) return '';
  return `<g opacity="${expO(op)}" stroke="${EXP_RED}" stroke-width="10" stroke-linecap="round"><line x1="${cx - size}" y1="${cy - size}" x2="${cx + size}" y2="${cy + size}"/><line x1="${cx + size}" y1="${cy - size}" x2="${cx - size}" y2="${cy + size}"/></g>`;
}

function expLens(cx, cy, r = 48, op = 1, dashed = false, handleUp = false) {
  if (op <= 0.01 || r <= 1) return '';
  const dash = dashed ? '11 9' : '';
  const sy = handleUp ? -1 : 1;
  return `<g opacity="${expO(op)}"><circle cx="${expN(cx)}" cy="${expN(cy)}" r="${expN(r)}" fill="rgba(242,193,78,.045)" stroke="${C.yellow}" stroke-width="8"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<path d="M${expN(cx + r * 0.68)} ${expN(cy + sy * r * 0.68)} L${expN(cx + r * 1.28)} ${expN(cy + sy * r * 1.28)}" stroke="${C.yellow}" stroke-width="17" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<path d="M${expN(cx + r * 0.8)} ${expN(cy + sy * r * 0.8)} L${expN(cx + r * 1.26)} ${expN(cy + sy * r * 1.26)}" stroke="${C.chalk}" stroke-width="4" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/></g>`;
}

function expFlash(u, start) {
  const fadeIn = expK(u, start, start + 0.08);
  const fadeOut = 1 - expK(u, start + 0.42, start + 0.5);
  return Math.max(0, Math.min(fadeIn, fadeOut));
}

function expBracket(x1, x2, y, progress, color = C.yellow) {
  if (progress <= 0.001) return '';
  const end = lerp(x1, x2, progress);
  return expPath(`M${x1} ${y - 8} V${y} H${end} V${y - 8}`, color, 4, 1);
}

function expPaint(svg) {
  return svg.replace(/font-size="24"/g, 'font-size="26"')
    .replace(/<text ([^>]*?)fill="([^"]+)"/g, '<text $1style="fill:$2" fill="$2"');
}

function expPhrase(x, y, value, size = 30, color = C.chalk, op = 1, anchor = 'start') {
  return txt(x, y, value, { a: anchor, s: size, w: 1, f: color, o: op });
}

function expWorkTag(x, y, w, value, op = 1) {
  return expLabel(x + w / 2, y, value, 34, C.chalk, op);
}

function expOrderCard(x, y, w, h, value, op = 1, dashed = false) {
  return expCardFrame(x, y, w, h, op, dashed, C.yellow) + expLabel(x + w / 2, y + h / 2 + 11, value, 30, C.yellow, op);
}

function expQuestionArrow(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${expN(cx)} ${expN(cy)}) scale(${expN(scale)})" opacity="${expO(op)}" fill="none" stroke="${C.chalk}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M-64 -14 Q-64 -42 -40 -42 Q-16 -42 -16 -20 Q-16 -5 -39 5 Q-48 9 -48 22"/><circle cx="-48" cy="39" r="3" fill="${C.chalk}"/>` +
    `<path d="M-2 0 H40 M28 -12 L42 0 L28 12" stroke="${C.yellow}" stroke-width="6"/>` +
    `<path d="M65 -38 V12" stroke="${C.chalk}" stroke-width="8"/><circle cx="65" cy="37" r="4" fill="${C.chalk}" stroke="none"/></g>`;
}

function expSign(cx, cy, w, h, op = 1) {
  const postEnd = h * 0.85;
  const iconY = -h / 3 + (h < 240 ? h * 0.1 : 0);
  return `<g transform="translate(${expN(cx)} ${expN(cy)})" opacity="${expO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<path d="M${expN(-w * 0.34)} ${expN(h * 0.44)} V${expN(postEnd)} M${expN(w * 0.34)} ${expN(h * 0.44)} V${expN(postEnd)}" fill="none" stroke="${EXP_WOOD}" stroke-width="10"/>` +
    `<rect x="${expN(-w / 2)}" y="${expN(-h / 2)}" width="${w}" height="${h}" rx="7" fill="#315342" stroke="${EXP_WOOD}" stroke-width="6"/>` +
    expQuestionArrow(0, iconY, Math.min(1, h / 200), 1) + '</g>';
}

function expCup(cx, cy, stage, scale = 1, op = 1) {
  const s = Math.max(0, Math.min(4, stage));
  const grow = expK(s, 0, 1);
  const root = expK(s, 1, 2);
  const fineRoots = expK(s, 2, 3);
  const stem = expK(s, 2, 3);
  const leaves = expK(s, 3, 4);
  let g = `<g transform="translate(${expN(cx)} ${expN(cy)}) scale(${expN(scale)})" opacity="${expO(op)}" stroke-linecap="round" stroke-linejoin="round">`;
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

function expCalendar(cx, cy, label, flip = 0, op = 1) {
  const f = Math.max(0, Math.min(1, flip));
  const oldLabel = label === '第3天' ? '第1天' : label === '第7天' ? '第3天' : label;
  let g = `<g opacity="${expO(op)}">`;
  g += `<rect x="${cx - 120}" y="${cy - 118}" width="240" height="248" rx="12" fill="rgba(239,233,216,.035)" stroke="${C.chalk}" stroke-width="5"/>`;
  g += `<path d="M${cx - 120} ${cy - 78} H${cx + 120}" fill="none" stroke="${C.chalk}" stroke-width="4"/>`;
  for (const dx of [-44, 44]) {
    g += `<path d="M${cx + dx} ${cy - 139} V${cy - 113}" fill="none" stroke="${EXP_WOOD}" stroke-width="9" stroke-linecap="round"/>`;
    g += `<circle cx="${cx + dx}" cy="${cy - 130}" r="12" fill="${C.deep}" stroke="${C.chalk}" stroke-width="4"/>`;
  }
  g += `<text x="${cx}" y="${cy + 29}" text-anchor="middle" font-size="40" font-weight="700" fill="${C.yellow}" opacity="${expO(f)}">${label}</text>`;
  if (f < 0.999 && oldLabel !== label) {
    g += `<g transform="translate(${cx} ${cy - 44 * f}) rotate(${-5 * f} ${cx} ${cy})" opacity="${expO(1 - f)}"><rect x="${cx - 116}" y="${cy - 114}" width="232" height="240" rx="9" fill="${C.deep}" stroke="${C.chalk}" stroke-width="4"/><text x="${cx}" y="${cy + 29}" text-anchor="middle" font-size="40" font-weight="700" fill="${C.yellow}">${oldLabel}</text></g>`;
  } else if (oldLabel === label) {
    g += `<text x="${cx}" y="${cy + 29}" text-anchor="middle" font-size="40" font-weight="700" fill="${C.yellow}">${label}</text>`;
  }
  return g + '</g>';
}

function expClay(cx, cy, kind, scale = 1, op = 1) {
  let g = `<g transform="translate(${expN(cx)} ${expN(cy)}) scale(${expN(scale)})" opacity="${expO(op)}" stroke-linecap="round" stroke-linejoin="round">`;
  if (kind === 0) {
    g += `<path d="M-43 14 Q-53 -5 -35 -22 Q-18 -38 0 -27 Q16 -42 34 -22 Q52 -3 39 17 Q25 34 4 29 Q-20 38 -37 25 Z" fill="#e9d8cf" stroke="${C.chalk}" stroke-width="4"/>`;
    g += `<path d="M-25 12 Q-2 1 22 13" fill="none" stroke="rgba(169,120,79,.7)" stroke-width="3"/>`;
  } else {
    g += `<path d="M-48 -18 Q-42 14 -30 28 Q0 39 30 28 Q42 14 48 -18 Q22 -2 0 -1 Q-24 -1 -48 -18 Z" fill="#e9d8cf" stroke="${C.chalk}" stroke-width="4"/>`;
    g += `<path d="M-48 -18 Q0 4 48 -18" fill="none" stroke="${EXP_WOOD}" stroke-width="3"/>`;
  }
  return g + '</g>';
}

function expPaper(cx, cy, kind, k = 0, scale = 1, op = 1) {
  const p = Math.max(0, Math.min(1, k));
  const colors = [EXP_RED, EXP_BLUE, EXP_YELLOW];
  let g = `<g transform="translate(${expN(cx)} ${expN(cy)}) scale(${expN(scale)})" opacity="${expO(op)}" stroke-linecap="round" stroke-linejoin="round">`;
  g += `<rect x="-100" y="-70" width="200" height="140" rx="5" fill="rgba(239,233,216,.055)" stroke="${C.chalk}" stroke-width="4"/>`;
  if (kind === 1) {
    const xs = [-36, 0, 36];
    for (let i = 0; i < 3; i++) {
      const yy = lerp(-82, -18 + (i % 2) * 9, p);
      g += `<circle cx="${xs[i]}" cy="${yy}" r="7" fill="${colors[i]}" stroke="${C.chalk}" stroke-width="1.5" opacity="${expO(0.45 + 0.55 * p)}"/>`;
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
      if (kind === 2 && p < 0.95) {
        g += `<circle cx="0" cy="0" r="7" fill="${color}" opacity="${expO(1 - p)}"/>`;
      }
    }
    if (kind === 2) {
      g += `<path d="M42 -58 L88 -26" fill="none" stroke="${C.chalk}" stroke-width="9"/>`;
      g += `<path d="M49 -62 L93 -31" fill="none" stroke="${EXP_WOOD}" stroke-width="2"/>`;
    } else {
      g += `<circle cx="70" cy="-42" r="18" fill="${C.deep}" stroke="${C.chalk}" stroke-width="4"/>`;
      g += `<path d="M70 -42 V-53 M70 -42 L79 -36" fill="none" stroke="${C.yellow}" stroke-width="3.5"/>`;
    }
  }
  return g + '</g>';
}

function expArrow(x1, y1, x2, y2, k, op = 1) {
  const t = Math.max(0, Math.min(1, k));
  const x = lerp(x1, x2, t), y = lerp(y1, y2, t);
  const angle = Math.atan2(y2 - y1, x2 - x1), h = 18;
  let g = `<g opacity="${expO(op)}"><line x1="${x1}" y1="${y1}" x2="${x}" y2="${y}" stroke="${C.yellow}" stroke-width="6" stroke-linecap="round"/>`;
  if (t > 0.01) g += `<polygon points="${x},${y} ${x - h * Math.cos(angle - .48)},${y - h * Math.sin(angle - .48)} ${x - h * Math.cos(angle + .48)},${y - h * Math.sin(angle + .48)}" fill="${C.yellow}"/>`;
  return g + '</g>';
}

function expCupStageAt(u) {
  if (u < 3) return expK(u, 2, 3);
  if (u < 5.6) return 1;
  if (u < 6.6) return 1 + expK(u, 5.6, 6.6);
  if (u < 9.6) return 2;
  return 2 + 2 * expK(u, 9.6, 10.8);
}

function s1(u) {
  let g = head(u, '開場', '這次寫怎麼變') + expTag(1);
  const title = expK(u, 0.2, 0.8);
  g += `<g opacity="${expO(title)}">${box(640, 200, 320, 72, EXP_YELLOW, 1, C.deep)}${expLabel(800, 248, '〈種子的發芽〉', 40, EXP_YELLOW)}</g>`;
  g += expSign(400, 470, 220, 180, 0.6 * expK(u, 0.5, 1.5));
  g += expLabel(400, 700, '是什麼', 34, C.chalk, expK(u, 1.5, 2.5));
  g += expArrow(560, 470, 1040, 470, expK(u, 2.5, 3.5));
  const cupOp = expK(u, 3.0, 3.5);
  const stage = 4 * expK(u, 3.5, 9.0);
  g += expCup(1200, 520, stage, 1.2, cupOp);
  g += expLabel(1200, 720, '怎麼變', 34, EXP_YELLOW, expK(u, 3.0, 4.0));
  return expPaint(g);
}

function s2(u) {
  let g = head(u, '寫什麼', '三個歷程題目') + expTag(1);
  const xs = [120, 600, 1080];
  const titles = ['種子的發芽', '紙黏土的製作', '吹畫的製作'];
  const begins = [0.5, 3.0, 5.5];
  for (let i = 0; i < 3; i++) {
    const appear = expK(u, begins[i], begins[i] + 0.6);
    const cardCx = xs[i] + 200;
    g += expCardFrame(xs[i], 250, 400, 420, appear, false, C.chalk);
    g += expLabel(cardCx, 305, titles[i], 34, C.chalk, appear);
    g += expArrow(xs[i] + 170, 470, xs[i] + 230, 470, expK(u, begins[i] + 0.6, begins[i] + 1.0), appear);
    const after = expK(u, begins[i] + 1.0, begins[i] + 1.8);
    if (i === 0) {
      g += expCup(xs[i] + 105, 470, 0, 0.6, appear);
      g += expCup(xs[i] + 295, 470, 4 * after, 0.6, appear * after);
    } else if (i === 1) {
      g += expClay(xs[i] + 105, 470, 0, 0.9, appear);
      g += expClay(xs[i] + 295, 470, 1, 0.9, appear * after);
    } else {
      g += expPaper(xs[i] + 105, 470, 0, 0, 0.55, appear);
      g += expPaper(xs[i] + 295, 470, 3, 1, 0.55, appear * after);
    }
  }
  g += expLabel(800, 760, '記錄歷程', 36, EXP_YELLOW, expK(u, 8.5, 9.5));
  return expPaint(g);
}

function s3(u) {
  let g = head(u, '排次序', '由開始到結束') + expTag(1);
  const arrowK = expK(u, 0.3, 1.3);
  g += `<g opacity="${expO(arrowK)}">${expLine(180, 620, 1420, 620, C.chalk, 5)}<path d="M1420 620 L1398 608 L1398 632 Z" fill="${C.yellow}"/></g>`;
  g += expLabel(220, 685, '開始', 34, C.chalk, expK(u, 1.0, 1.6));
  g += expLabel(1380, 685, '結束', 34, C.chalk, expK(u, 1.0, 1.6));
  const xs = [330, 610, 890, 1170];
  const stages = [0, 1, 2, 4];
  for (let i = 0; i < xs.length; i++) {
    const appear = expK(u, 2.0 + i * 2, 2.6 + i * 2);
    g += expCup(xs[i], 500, stages[i], 0.8, appear);
    g += expLine(xs[i], 592, xs[i], 610, C.chalk, 4, appear);
  }
  g += expLabel(800, 300, '由開始到結束', 36, EXP_YELLOW, expK(u, 9.5, 10.5));
  return expPaint(g);
}

function s4(u) {
  let g = head(u, '排次序', '時間式：照時間') + expTag(1);
  g += expLabel(800, 250, '時間式', 36, EXP_YELLOW, expK(u, 0.2, 0.8));
  let label = '第1天', flip = 0;
  if (u >= 5.0 && u < 5.6) { label = '第3天'; flip = expK(u, 5.0, 5.6); }
  else if (u >= 5.6 && u < 9.0) { label = '第3天'; flip = 1; }
  else if (u >= 9.0 && u < 9.6) { label = '第7天'; flip = expK(u, 9.0, 9.6); }
  else if (u >= 9.6) { label = '第7天'; flip = 1; }
  g += expCalendar(380, 520, label, flip, expK(u, 1.0, 1.5));
  g += expCup(860, 560, expCupStageAt(u), 1.6, expK(u, 2.0, 2.5));
  const phrases = [
    ['變得又胖', 400, 3.0],
    ['長出白根', 520, 6.6],
    ['打開兩葉', 640, 10.8],
  ];
  for (const [word, y, t] of phrases) {
    const op = expK(u, t, t + 0.4);
    g += `<circle cx="1125" cy="${y - 10}" r="7" fill="${C.yellow}" opacity="${expO(op)}"/>`;
    g += expPhrase(1150, y, word, 30, C.chalk, op);
  }
  return expPaint(g);
}

function s5(u) {
  let g = head(u, '排次序', '事件式：照步驟') + expTag(1);
  g += expLabel(800, 250, '事件式', 36, EXP_YELLOW, expK(u, 0.2, 0.8));
  const xs = [150, 630, 1110];
  const tags = ['開始', '接著', '後來'];
  const phrases = ['滴顏料', '用吸管吹', '等它晾乾'];
  const starts = [0.8, 4.0, 7.2];
  const labelsAt = [2.7, 5.9, 9.0];
  for (let i = 0; i < 3; i++) {
    const op = expK(u, starts[i], starts[i] + 0.5);
    const cx = xs[i] + 170;
    g += expCardFrame(xs[i], 330, 340, 300, op, false, C.chalk);
    g += expLabel(cx, 315, tags[i], 30, EXP_YELLOW, op);
    const k = i === 0 ? expK(u, 1.2, 2.7) : i === 1 ? expK(u, 4.4, 5.9) : 1;
    const paperOp = i === 2 ? expK(u, 7.6, 9.0) : op;
    g += expPaper(cx, 450, i + 1, k, 0.9, paperOp);
    g += expPhrase(cx, 580, phrases[i], 30, C.chalk, expK(u, labelsAt[i], labelsAt[i] + 0.4), 'middle');
  }
  g += expArrow(500, 480, 620, 480, expK(u, 3.4, 4.0));
  g += expArrow(980, 480, 1100, 480, expK(u, 6.6, 7.2));
  return expPaint(g);
}

function s6(u) {
  let g = head(u, '骨架', '四段各寫什麼') + expTag(1);
  const xs = [140, 360, 780, 1200];
  const ws = [200, 400, 400, 200];
  const tags = ['準備材料', '前三天', '第四到七天', '總結結果'];
  const words = [['十顆綠豆', '濕棉花'], ['變胖', '長白根'], ['長莖', '開兩葉'], ['七天變小芽']];
  const starts = [0.2, 0.55, 0.9, 1.25];
  for (let i = 0; i < 4; i++) {
    const land = expK(u, starts[i], starts[i] + 0.55);
    const fallY = 70 * (1 - land);
    const titleOp = expK(u, 1.0 + i * 0.35, 1.35 + i * 0.35);
    g += `<g transform="translate(0 ${fallY})" opacity="${expO(land)}">${expBlock(xs[i], 250, ws[i], 210, EXP_BLUE, 1, false)}${expWorkTag(xs[i], 300, ws[i], tags[i], titleOp)}</g>`;
  }
  const iconStarts = [2.5, 3.15, 3.8, 4.55];
  const cx = [240, 560, 980, 1280];
  const stages = [0, 2, 4, 4];
  for (let i = 0; i < 4; i++) {
    const land = expK(u, starts[i], starts[i] + 0.55);
    const iconOp = expK(u, iconStarts[i], iconStarts[i] + 0.45) * land;
    const iconY = 400 + 70 * (1 - land);
    const scale = i === 3 ? 0.45 : 0.55;
    g += expCup(cx[i], iconY, stages[i], scale, iconOp);
  }
  g += expCheck(1362, 372, 0.5, expK(u, 4.55, 5.0));
  for (let i = 0; i < 4; i++) {
    const x = xs[i] + ws[i] / 2;
    const op = expK(u, 5.0 + i * 0.55, 5.45 + i * 0.55);
    if (words[i].length === 1) g += expPhrase(x, 510, words[i][0], 30, EXP_YELLOW, op, 'middle');
    else {
      g += expPhrase(x, 510, words[i][0], 30, EXP_YELLOW, op, 'middle');
      g += expPhrase(x, 552, words[i][1], 30, EXP_YELLOW, op, 'middle');
    }
  }
  g += expPhrase(1300, 600, '不寫感想', 30, EXP_YELLOW, expK(u, 9.0, 10.0), 'middle');
  return expPaint(g);
}

function expMoveCard(cx, cy, label, op = 1) {
  return `<g opacity="${expO(op)}">${expCardFrame(cx - 150, cy - 55, 300, 110, 1, false, C.chalk)}${expLabel(cx, cy + 10, label, 30, C.chalk)}</g>`;
}

function s7(u) {
  let g = head(u, '檢查', '先後要對') + expTag(1);
  const lineOp = expK(u, 0.2, 0.8);
  g += expLine(220, 560, 1380, 560, C.chalk, 5, lineOp);
  const originals = [
    { x: 400, text: '打開兩葉' },
    { x: 800, text: '變得又胖' },
    { x: 1200, text: '長出白根' },
  ];
  for (let i = 0; i < originals.length; i++) {
    const a = [0.5, 1.0, 1.5][i];
    const op = expK(u, a, a + 0.5) * (1 - 0.94 * expK(u, 5.5, 6.0));
    g += expMoveCard(originals[i].x, 470, originals[i].text, op);
  }
  const lift3 = expK(u, 5.5, 6.0);
  const across3 = expK(u, 6.7, 7.1);
  const down3 = expK(u, 7.1, 7.5);
  if (u >= 5.5) {
    let x3 = 1200, y3 = lerp(470, 330, lift3);
    if (u >= 6.7 && u < 7.1) { x3 = lerp(1200, 800, across3); y3 = 330; }
    else if (u >= 7.1) { x3 = 800; y3 = lerp(330, 470, down3); }
    g += expMoveCard(x3, y3, '長出白根', 1);
  }
  if (u >= 6.0) {
    const move1 = expK(u, 6.0, 6.7);
    const x1 = lerp(400, 1200, move1);
    const y1 = 470 - 140 * Math.sin(Math.PI * move1);
    let x2 = 800, y2 = 470;
    if (u < 6.12) y2 = lerp(470, 520, expK(u, 6.0, 6.12));
    else if (u < 6.55) { x2 = lerp(800, 400, expK(u, 6.12, 6.55)); y2 = 520; }
    else { x2 = 400; y2 = lerp(520, 470, expK(u, 6.55, 6.7)); }
    g += expMoveCard(x1, y1, '打開兩葉', 1);
    g += expMoveCard(x2, y2, '變得又胖', 1);
  }
  const crossOp = expK(u, 4.5, 5.0) * (1 - expK(u, 5.5, 6.0));
  g += expCross(520, 430, 24, crossOp);
  let lx = 800, ly = 260, lensOp = 0;
  if (u >= 2.5 && u < 3.2) { const p = expK(u, 2.5, 3.2); lx = lerp(800, 400, p); ly = lerp(260, 470, p); lensOp = p; }
  else if (u >= 3.2 && u < 4.5) { lx = 400 + 24 * Math.sin((u - 3.2) * Math.PI * 2); ly = 470; lensOp = 1; }
  else if (u >= 4.5 && u < 5.0) { lx = 400; ly = 470; lensOp = 1; }
  else if (u >= 5.0 && u < 5.5) { const p = expK(u, 5.0, 5.5); lx = lerp(400, 1460, p); ly = lerp(470, 290, p); lensOp = 1; }
  else if (u >= 5.5) { lx = 1460; ly = 290; lensOp = 1; }
  if (lensOp > 0.01) g += expLens(lx, ly, 48, lensOp);
  const days = [
    ['第1天', 400, 8.0],
    ['第3天', 800, 8.5],
    ['第7天', 1200, 9.0],
  ];
  for (const [day, x, t] of days) g += expLabel(x, 395, day, 30, EXP_YELLOW, expK(u, t, t + 0.45));
  const badge = expK(u, 9.5, 10.0);
  g += expStar(1482, 420, 26, badge) + expCheck(1430, 482, 0.6, badge);
  g += expLabel(600, 660, '先後要對', 34, EXP_YELLOW, expK(u, 10.0, 10.5));
  g += expLabel(1000, 660, '寫出第幾天', 34, EXP_YELLOW, expK(u, 10.0, 10.5));
  return expPaint(g);
}

function s8(u) {
  let g = head(u, '動筆', '第一句先說準備') + expTag(1);
  const blockOp = expK(u, 0.2, 0.8);
  g += expBlock(300, 250, 1000, 280, EXP_BLUE, blockOp, false);
  g += expWorkTag(300, 300, 1000, '準備材料', blockOp);
  const sentence = '把十顆綠豆放在濕棉花上，每天早上澆一次水。';
  g += expType(sentence, u, 800, 410, 36, EXP_YELLOW, 0.8, 6.5);
  const marks = expK(u, 7.0, 8.0);
  const labels = [
    [458, 602, '材料', 530],
    [674, 782, '材料', 728],
    [854, 1142, '方法', 998],
  ];
  for (const [x1, x2, text, cx] of labels) {
    g += expBracket(x1, x2, 445, marks, EXP_YELLOW);
    g += expLabel(cx, 490, text, 30, EXP_YELLOW, marks);
  }
  return expPaint(g);
}

function s9(u) {
  let g = head(u, '練習', '換你排骨架') + expTag(1);
  const title = expK(u, 0.2, 0.8);
  g += `<g opacity="${expO(title)}">${box(620, 200, 360, 72, EXP_YELLOW, 1, C.deep)}${expLabel(800, 248, '〈紙黏土的製作〉', 40, EXP_YELLOW)}</g>`;
  const choices = [
    { x: 470, text: '時間式' },
    { x: 730, text: '事件式' },
  ];
  for (let i = 0; i < choices.length; i++) {
    const op = expK(u, 0.6 + i * 0.25, 1.0 + i * 0.25);
    g += expOrderCard(choices[i].x, 300, 200, 56, choices[i].text, op, true);
  }
  const xs = [140, 360, 780, 1200];
  const ws = [200, 400, 400, 200];
  const tags = ['準備材料', '第一步', '接下來', '總結結果'];
  for (let i = 0; i < 4; i++) {
    const op = expK(u, 2.0 + i * 0.7, 2.7 + i * 0.6);
    g += expBlock(xs[i], 420, ws[i], 170, EXP_BLUE, op, true);
    g += expWorkTag(xs[i], 510, ws[i], tags[i], op);
  }
  const flashStarts = [6.0, 7.0, 8.0, 9.0, 10.0, 11.0];
  const targets = [
    { x: 470, y: 300, w: 200, h: 56 },
    { x: 730, y: 300, w: 200, h: 56 },
    { x: 140, y: 420, w: 200, h: 170 },
    { x: 360, y: 420, w: 400, h: 170 },
    { x: 780, y: 420, w: 400, h: 170 },
    { x: 1200, y: 420, w: 200, h: 170 },
  ];
  for (let i = 0; i < targets.length; i++) {
    const f = expFlash(u, flashStarts[i]);
    if (f > .01) {
      const r = targets[i];
      g += `<rect x="${r.x + 4}" y="${r.y + 4}" width="${r.w - 8}" height="${r.h - 8}" rx="12" fill="rgba(242,193,78,${(0.24 * f).toFixed(3)})" stroke="none"/>`;
    }
  }
  return expPaint(g);
}
