const META = {
  title: '一封信有五個部分',
  subtitle: '9 段・約 2 分鐘・三年級應用文（書信）第一集',
  ariaLabel: '書信寫給一個人看，五個部分照順序：稱謂語、正文、祝福語、署名、日期，正文寫一件事、想法、總結。',
  note: '出處：楊裕貿研習講義、五下國語〈給女兒的一封信〉講義的書信結構表。人偶、信紙槽位、工作牌、積木、放大鏡是視覺比喻或示意；信紙各部分的位置是示意；示範信與人名自編；本集不含信封格式。鍵盤操作：空白鍵播放／暫停，左右方向鍵切換段落，F 鍵全螢幕。畫面只由時間決定。',
  works: [],
};

const LTR_WOOD = '#a9784f';
const LTR_RED = '#d9605a';
const LTR_GREEN = '#8fd18a';
const LTR_BLUE = '#7fb6d9';
const LTR_ORANGE = '#e8875b';
const LTR_YELLOW = '#f2c14e';
const LTR_BR = 34, LTR_KNOT = '#c96a40', LTR_CREAM = '#efe9d8', LTR_INK = '#1a2b23';
const ltrK = (u, a, b) => ease(P(u, a, b));
const ltrO = (value) => Math.max(0, Math.min(1, Number(value) || 0)).toFixed(3);
const ltrN = (value) => Number(value).toFixed(1);

function ltrTag(op = 1) {
  return `<g opacity="${ltrO(op)}">${box(1375, 56, 165, 60, C.orange, 1, C.deep)}${txt(1457, 98, '比喻', { a: 'middle', s: 30, w: 1, f: C.orange })}</g>`;
}

function ltrLabel(cx, y, value, size = 30, color = C.chalk, op = 1) {
  if (op <= 0.001) return '';
  return txt(cx, y, value, { a: 'middle', s: size, w: 1, f: color, o: op });
}

function ltrTextByChar(value, cx, y, size, color, op = 1) {
  const chars = Array.from(value);
  return chars.map((ch, i) => txt(cx + (i - (chars.length - 1) / 2) * size, y, ch, {
    a: 'middle', s: size, w: 1, f: color, o: op,
  })).join('');
}

function ltrType(value, u, cx, y, size, color, start, end, op = 1) {
  if (u <= start || op <= 0.001) return '';
  const chars = Array.from(value);
  const count = Math.min(chars.length, Math.ceil(ltrK(u, start, end) * chars.length));
  return chars.slice(0, count).map((ch, i) => txt(cx + (i - (chars.length - 1) / 2) * size, y, ch, {
    a: 'middle', s: size, w: 1, f: color, o: op,
  })).join('');
}

function ltrTypeLeft(value, u, x, y, size, color, start, end, op = 1) {
  if (u <= start || op <= 0.001) return '';
  const chars = Array.from(value);
  const count = Math.min(chars.length, Math.ceil(ltrK(u, start, end) * chars.length));
  return chars.slice(0, count).map((ch, i) => txt(x + i * size, y, ch, {
    a: 'start', s: size, w: 1, f: color, o: op,
  })).join('');
}

function ltrLine(x1, y1, x2, y2, color = C.chalk, width = 5, op = 1, dash = '') {
  if (op <= 0.001) return '';
  return `<path d="M${ltrN(x1)} ${ltrN(y1)} L${ltrN(x2)} ${ltrN(y2)}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${ltrO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function ltrPath(d, color = C.chalk, width = 5, op = 1, fill = 'none', dash = '') {
  if (op <= 0.001) return '';
  return `<path d="${d}" fill="${fill}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${ltrO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function ltrCircle(cx, cy, r, stroke = C.chalk, width = 5, fill = 'none', op = 1, dash = '') {
  if (op <= 0.001 || r <= 0) return '';
  return `<circle cx="${ltrN(cx)}" cy="${ltrN(cy)}" r="${ltrN(r)}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" opacity="${ltrO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function ltrBlock(x, y, w, h, color, op = 1, dashed = false) {
  if (op <= 0.001 || w <= 2 || h <= 2) return '';
  if (dashed) return `<g opacity="${ltrO(op)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="rgba(239,233,216,.012)" stroke="${color}" stroke-width="5" stroke-dasharray="14 10"/></g>`;
  let g = `<g opacity="${ltrO(op)}">`;
  const count = Math.max(2, Math.floor(w / 130));
  for (let i = 0; i < count; i++) {
    const cx = x + w * (i + 0.5) / count;
    g += `<rect x="${ltrN(cx - 18)}" y="${ltrN(y + 2)}" width="36" height="8" rx="4" fill="${color}"/>`;
  }
  return g + `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${color}" fill-opacity=".22" stroke="${C.chalk}" stroke-width="4"/></g>`;
}

function ltrCardFrame(x, y, w, h, op = 1, dashed = false, stroke = C.chalk) {
  if (op <= 0.001) return '';
  if (dashed) return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="rgba(239,233,216,.012)" stroke="${stroke}" stroke-width="4" stroke-dasharray="13 9" opacity="${ltrO(op)}"/>`;
  return `<g opacity="${ltrO(op)}">${box(x, y, w, h, stroke, 1, 'rgba(239,233,216,.015)')}</g>`;
}

function ltrStar(cx, cy, r, op = 1) {
  if (op <= 0.01 || r <= 1) return '';
  const points = [];
  for (let i = 0; i < 10; i++) {
    const angle = -Math.PI / 2 + i * Math.PI / 5;
    const radius = i % 2 ? r * 0.46 : r;
    points.push(`${ltrN(cx + Math.cos(angle) * radius)},${ltrN(cy + Math.sin(angle) * radius)}`);
  }
  return `<polygon points="${points.join(' ')}" fill="rgba(242,193,78,.3)" stroke="${C.yellow}" stroke-width="5" stroke-linejoin="round" opacity="${ltrO(op)}"/>`;
}

function ltrCheck(cx, cy, scale = 1, op = 1) {
  if (op <= 0.01) return '';
  return `<path d="M${cx - 30 * scale} ${cy} L${cx - 8 * scale} ${cy + 23 * scale} L${cx + 37 * scale} ${cy - 30 * scale}" fill="none" stroke="${LTR_GREEN}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" opacity="${ltrO(op)}"/>`;
}

function ltrCross(cx, cy, size = 24, op = 1) {
  if (op <= 0.01) return '';
  return `<g opacity="${ltrO(op)}" stroke="${LTR_RED}" stroke-width="10" stroke-linecap="round"><line x1="${cx - size}" y1="${cy - size}" x2="${cx + size}" y2="${cy + size}"/><line x1="${cx + size}" y1="${cy - size}" x2="${cx - size}" y2="${cy + size}"/></g>`;
}

function ltrLens(cx, cy, r = 48, op = 1, dashed = false, handleUp = false) {
  if (op <= 0.01 || r <= 1) return '';
  const dash = dashed ? '11 9' : '';
  const sy = handleUp ? -1 : 1;
  return `<g opacity="${ltrO(op)}"><circle cx="${ltrN(cx)}" cy="${ltrN(cy)}" r="${ltrN(r)}" fill="rgba(242,193,78,.045)" stroke="${C.yellow}" stroke-width="8"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<path d="M${ltrN(cx + r * 0.68)} ${ltrN(cy + sy * r * 0.68)} L${ltrN(cx + r * 1.28)} ${ltrN(cy + sy * r * 1.28)}" stroke="${C.yellow}" stroke-width="17" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/>` +
    `<path d="M${ltrN(cx + r * 0.8)} ${ltrN(cy + sy * 0.8)} L${ltrN(cx + r * 1.26)} ${ltrN(cy + sy * 1.26)}" stroke="${C.chalk}" stroke-width="4" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}/></g>`;
}

function ltrFlash(u, start) {
  const fadeIn = ltrK(u, start, start + 0.08);
  const fadeOut = 1 - ltrK(u, start + 0.42, start + 0.5);
  return Math.max(0, Math.min(fadeIn, fadeOut));
}

function ltrPaint(svg) {
  return svg.replace(/font-size="24"/g, 'font-size="26"')
    .replace(/<text ([^>]*?)fill="([^"]+)"/g, '<text $1style="fill:$2" fill="$2"');
}

function ltrPhrase(x, y, value, size = 30, color = C.chalk, op = 1, anchor = 'start') {
  if (op <= 0.001) return '';
  return txt(x, y, value, { a: anchor, s: size, w: 1, f: color, o: op });
}

function ltrWorkTag(x, y, w, value, op = 1) {
  return ltrLabel(x + w / 2, y + 35, value, 34, C.chalk, op);
}

function ltrDoll(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${ltrN(cx)} ${ltrN(cy)}) scale(${ltrN(scale)})" opacity="${ltrO(op)}" stroke-linecap="round" stroke-linejoin="round"><circle cx="0" cy="-72" r="31" fill="rgba(240,217,189,.55)" stroke="${C.chalk}" stroke-width="5"/><path d="M-28 -77 Q-21 -112 4 -105 Q27 -99 29 -75 Q9 -90 -4 -87 Q-18 -83 -28 -77Z" fill="${LTR_WOOD}" stroke="${C.chalk}" stroke-width="3"/><path d="M-43 43 Q-40 -28 0 -28 Q40 -28 43 43Z" fill="rgba(127,182,217,.28)" stroke="${C.chalk}" stroke-width="5"/><path d="M-37 -5 L-70 26 M37 -5 L70 26 M-19 43 L-30 91 M19 43 L30 91" fill="none" stroke="${C.chalk}" stroke-width="9"/><circle cx="-10" cy="-67" r="3" fill="${LTR_WOOD}"/><circle cx="10" cy="-67" r="3" fill="${LTR_WOOD}"/></g>`;
}

function ltrLetter(cx, cy, scale = 1, op = 1) {
  return `<g transform="translate(${ltrN(cx)} ${ltrN(cy)}) scale(${ltrN(scale)})" opacity="${ltrO(op)}" stroke-linejoin="round"><rect x="-45" y="-30" width="90" height="60" rx="3" fill="rgba(239,233,216,.045)" stroke="${C.chalk}" stroke-width="5"/><path d="M-45 0 L45 0" fill="none" stroke="${C.chalk}" stroke-width="3" stroke-dasharray="8 6"/><path d="M-30 -16 L30 -16 M-30 16 L20 16" fill="none" stroke="${C.chalk}" stroke-width="3" opacity=".6"/></g>`;
}

function ltrWave(cx, cy, k = 1, op = 1) {
  if (op <= 0.001 || k <= 0.001) return '';
  const paths = [
    `M${cx - 18} ${cy + 17} Q${cx - 29} ${cy + 1} ${cx - 13} ${cy - 13}`,
    `M${cx - 2} ${cy + 21} Q${cx - 11} ${cy + 1} ${cx + 3} ${cy - 18}`,
    `M${cx + 14} ${cy + 17} Q${cx + 8} ${cy + 1} ${cx + 22} ${cy - 12}`,
  ];
  return `<g fill="none" stroke="${C.yellow}" stroke-width="6" stroke-linecap="round" opacity="${ltrO(op)}">` + paths.map((d, i) => {
    const p = Math.max(0, Math.min(1, k * 3 - i));
    return p <= 0.01 ? '' : `<path d="${d}" pathLength="100" stroke-dasharray="${(100 * p).toFixed(1)} 100"/>`;
  }).join('') + '</g>';
}

function ltrPaper(op = 1) {
  return `<rect x="560" y="230" width="480" height="600" fill="rgba(239,233,216,.04)" stroke="${C.chalk}" stroke-width="5" opacity="${ltrO(op)}"/>`;
}

function ltrSlot(x, y, w, h, op = 1, glow = 0, dashed = true) {
  const on = glow > 0.01;
  const fill = on ? `rgba(242,193,78,${(0.15 * Math.max(0, Math.min(1, glow))).toFixed(3)})` : 'rgba(242,193,78,.012)';
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="${C.yellow}" stroke-width="3" opacity="${ltrO(op)}"${dashed && !on ? ' stroke-dasharray="12 9"' : ''}/>`;
}

const ltrSlotData = [
  { name: '稱謂語', x: 600, y: 260, w: 400, h: 60 },
  { name: '正文', x: 600, y: 340, w: 400, h: 240 },
  { name: '祝福語', x: 600, y: 600, w: 400, h: 60 },
  { name: '署名', x: 600, y: 680, w: 400, h: 56 },
  { name: '日期', x: 600, y: 750, w: 400, h: 56 },
];

function ltrScaffold(paperOp = 1, slotOps = [1, 1, 1, 1, 1], glows = [0, 0, 0, 0, 0]) {
  let g = ltrPaper(paperOp);
  ltrSlotData.forEach((slot, i) => {
    const op = slotOps[i] ?? 1;
    if (op <= 0.001) return;
    const tagY = slot.y + slot.h / 2 - 25;
    g += `<g opacity="${ltrO(op)}">${ltrSlot(slot.x, slot.y, slot.w, slot.h, 1, glows[i] ?? 0)}${ltrCardFrame(370, tagY, 170, 50, 1, false, C.chalk)}${ltrWorkTag(370, tagY, 170, slot.name)}</g>`;
  });
  return g;
}

function ltrPositionNote() {
  return ltrPhrase(1260, 836, '位置示意', 30, C.chalk);
}

function s1(u) {
  let g = head(u, '開場', '寫給一個人') + ltrTag();
  const titleOp = ltrK(u, 0.2, 0.8);
  g += `<g opacity="${ltrO(titleOp)}">${box(600, 200, 400, 72, C.yellow, 1, C.deep)}${ltrLabel(800, 248, '〈給老師的一封信〉', 40, C.yellow)}</g>`;
  if (u > 3.0) {
    const k = ltrK(u, 3.0, 6.0);
    const x = lerp(390, 1210, k), y = 470 - 110 * 4 * k * (1 - k);
    g += ltrLetter(x, y, 1, 1);
  }
  const leftOp = ltrK(u, 0.5, 1.0), rightOp = ltrK(u, 1.0, 1.5);
  g += ltrDoll(300, 500, 1.0, leftOp) + ltrLabel(300, 650, '寫的人', 30, C.chalk, leftOp);
  g += ltrDoll(1300, 500, 1.1, rightOp) + ltrLabel(1300, 650, '讀的人', 30, C.chalk, rightOp);
  g += ltrLabel(800, 770, '寫給一個人看', 36, C.yellow, ltrK(u, 7.0, 8.0));
  return ltrPaint(g);
}

function s2(u) {
  let g = head(u, '格式', '五個部分') + ltrTag();
  const starts = [1.5, 3.0, 4.5, 6.0, 7.5];
  const slotOps = starts.map((start) => u <= start ? 0 : ltrK(u, start, start + 0.18));
  const glows = starts.map((start) => {
    if (u <= start) return 0;
    if (u < start + 0.8) return 1;
    return 1 - ltrK(u, start + 0.8, start + 0.95);
  });
  g += ltrScaffold(ltrK(u, 0.2, 0.8), slotOps, glows);
  g += ltrPhrase(1260, 836, '位置示意', 30, C.chalk, ltrK(u, 9.0, 9.8));
  return ltrPaint(g);
}

function s3(u) {
  let g = head(u, '格式', '稱謂語：叫對方') + ltrTag();
  g += ltrScaffold(ltrK(u, 0.2, 0.5), [1, 0.35, 0.35, 0.35, 0.35], [1, 0, 0, 0, 0]);
  g += ltrTypeLeft('親愛的老師：', u, 620, 302, 34, C.chalk, 1.0, 3.0);
  const dollOp = ltrK(u, 0.5, 0.9);
  g += ltrDoll(1300, 450, 0.9, dollOp);
  g += ltrWave(1360, 400, ltrK(u, 4.0, 5.0), dollOp);
  g += ltrPhrase(1150, 300, '先叫對方', 30, C.yellow, ltrK(u, 5.5, 6.3));
  g += ltrPositionNote();
  return ltrPaint(g);
}

function s4(u) {
  let g = head(u, '格式', '正文：想說的話') + ltrTag();
  g += ltrScaffold(ltrK(u, 0.2, 0.5), [0.35, 1, 0.35, 0.35, 0.35], [0, 1, 0, 0, 0]);
  const rows = [
    { y: 352, start: 1.0, label: '一件事', phrase: '幫我改錯字' },
    { y: 428, start: 4.0, label: '我的想法', phrase: '作文不難了' },
    { y: 504, start: 7.0, label: '總結', phrase: '謝謝老師' },
  ];
  rows.forEach(({ y, start, label, phrase }) => {
    if (u <= start) return;
    const drop = ltrK(u, start, start + 0.5);
    const yy = lerp(y - 48, y, drop);
    g += ltrBlock(620, yy, 360, 66, LTR_BLUE, Math.max(0.01, drop));
    g += ltrPhrase(640, yy + 43, label, 30, C.yellow, drop);
    g += ltrPhrase(790, yy + 43, phrase, 30, C.chalk, ltrK(u, start + 0.6, start + 1.0));
  });
  g += ltrPositionNote();
  return ltrPaint(g);
}

function s5(u) {
  let g = head(u, '格式', '祝福語') + ltrTag();
  g += ltrScaffold(ltrK(u, 0.2, 0.5), [0.35, 0.35, 1, 0.35, 0.35], [0, 0, 1, 0, 0]);
  const blockRows = [
    { y: 352, label: '一件事', phrase: '幫我改錯字' },
    { y: 428, label: '我的想法', phrase: '作文不難了' },
    { y: 504, label: '總結', phrase: '謝謝老師' },
  ];
  blockRows.forEach(({ y, label, phrase }) => {
    g += ltrBlock(620, y, 360, 66, LTR_BLUE, 0.35);
    g += ltrPhrase(640, y + 43, label, 30, C.yellow, 0.35);
    g += ltrPhrase(790, y + 43, phrase, 30, C.chalk, 0.35);
  });
  g += ltrTypeLeft('祝 老師天天快樂', u, 620, 642, 34, C.chalk, 1.0, 3.0);
  if (u > 4.0) {
    const k = ltrK(u, 4.0, 5.5);
    g += ltrStar(lerp(950, 1395, k), lerp(630, 395, k), 22, 1);
  }
  g += ltrDoll(1300, 450, 0.9, ltrK(u, 0.5, 0.9));
  g += ltrLabel(1300, 640, '祝福對方', 30, C.yellow, ltrK(u, 6.0, 6.8));
  g += ltrPositionNote();
  return ltrPaint(g);
}

function s6(u) {
  let g = head(u, '格式', '署名和日期') + ltrTag();
  const dateOn = u <= 4.0 ? 0.35 : 1;
  const glows = [0, 0, 0, 1, u < 4.0 ? 0 : 1];
  g += ltrScaffold(ltrK(u, 0.2, 0.5), [0.35, 0.35, 0.35, 1, dateOn], glows);
  g += ltrPhrase(620, 302, '親愛的老師：', 34, C.chalk, 0.35);
  const fadedBlocks = [
    { y: 352, label: '一件事', phrase: '幫我改錯字' },
    { y: 428, label: '我的想法', phrase: '作文不難了' },
    { y: 504, label: '總結', phrase: '謝謝老師' },
  ];
  fadedBlocks.forEach(({ y, label, phrase }) => {
    g += ltrBlock(620, y, 360, 66, LTR_BLUE, 0.35);
    g += ltrPhrase(640, y + 43, label, 30, C.yellow, 0.35);
    g += ltrPhrase(790, y + 43, phrase, 30, C.chalk, 0.35);
  });
  g += ltrPhrase(620, 642, '祝 老師天天快樂', 34, C.chalk, 0.35);
  g += ltrTypeLeft('學生 小安', u, 620, 720, 34, C.chalk, 1.0, 2.0);
  g += ltrPhrase(1070, 720, '誰寫的', 30, C.yellow, ltrK(u, 2.0, 2.8));
  g += ltrTypeLeft('十月二十三日', u, 620, 790, 34, C.chalk, 4.0, 5.0, u < 4.0 ? 0 : 1);
  g += ltrPhrase(1070, 790, '哪一天', 30, C.yellow, ltrK(u, 5.0, 5.8));
  g += ltrPositionNote();
  return ltrPaint(g);
}

function s7(u) {
  let g = head(u, '檢查', '順序要對') + ltrTag();
  const badTexts = ['學生 小安', '親愛的老師：', '正文', '祝 老師天天快樂', '十月二十三日'];
  const initialY = [270, 350, 430, 510, 590];
  const entrance = [0.5, 0.875, 1.25, 1.625, 2.0];
  badTexts.forEach((value, i) => {
    if (u <= entrance[i]) return;
    const appear = ltrK(u, entrance[i], entrance[i] + 0.25);
    let x = 600, y = initialY[i];
    if (i === 0 && u > 5.0) {
      // 先整張移到右側，往下走到空位旁，等其他卡上移後再滑回，避免移動中壓到別張卡的字
      x = lerp(600, 1060, ltrK(u, 5.0, 5.6)) - 460 * ltrK(u, 7.8, 8.4);
      y = lerp(270, 510, ltrK(u, 5.6, 6.6));
    } else if (i === 1 && u > 6.0) y = lerp(350, 270, ltrK(u, 6.0, 6.6));
    else if (i === 2 && u > 6.6) y = lerp(430, 350, ltrK(u, 6.6, 7.2));
    else if (i === 3 && u > 7.2) y = lerp(510, 430, ltrK(u, 7.2, 7.8));
    g += `<g opacity="${ltrO(appear)}">${ltrCardFrame(x, y, 400, 60, 1, false, C.chalk)}${ltrPhrase(x + 20, y + 40, value, 34, C.chalk)}</g>`;
  });

  if (u >= 2.0 && u <= 4.5) {
    const p = u < 4.0 ? ltrK(u, 2.0, 4.0) : 1;
    let x, y;
    if (p <= 0.68) {
      const q = p / 0.68;
      x = lerp(1300, 1060, q);
      y = lerp(760, 240, q);
    } else {
      const q = (p - 0.68) / 0.32;
      x = lerp(1060, 720, q);
      y = lerp(240, 300, q);
    }
    g += ltrLens(x, y, 55, 1, false, true);
  } else if (u > 4.5) {
    const p = ltrK(u, 4.5, 5.0);
    let x, y;
    if (p <= 0.32) {
      const q = p / 0.32;
      x = lerp(720, 1060, q);
      y = lerp(300, 240, q);
    } else {
      const q = (p - 0.32) / 0.68;
      x = lerp(1060, 1300, q);
      y = lerp(240, 760, q);
    }
    g += ltrLens(x, y, 55, 1, false, true);
  }
  if (u >= 4.0) g += ltrCross(1060, 300, 24, u < 5.0 ? 1 : 1 - ltrK(u, 5.0, 5.5));

  if (u > 8.5) {
    const roles = ['稱謂語', '正文', '祝福語', '署名', '日期'];
    const finalY = [270, 350, 430, 510, 590];
    finalY.forEach((y, i) => {
      const op = ltrK(u, 8.5 + i * 0.2, 8.8 + i * 0.2);
      g += `<g opacity="${ltrO(op)}">${ltrCardFrame(370, y + 5, 170, 50, 1, false, C.chalk)}${ltrWorkTag(370, y + 5, 170, roles[i])}</g>`;
    });
  }
  if (u >= 9.5) g += ltrCheck(1090, 440, 0.6, 1) + ltrStar(1160, 390, 22, 1);
  g += ltrLabel(800, 760, '照順序寫', 36, C.yellow, ltrK(u, 10.0, 10.8));
  return ltrPaint(g);
}

function s8(u) {
  let g = head(u, '動筆', '正文第一句') + ltrTag();
  g += ltrLabel(800, 260, '正文', 34, C.chalk, ltrK(u, 0.2, 0.5));
  const blockOp = ltrK(u, 0.2, 0.8);
  g += ltrBlock(300, 300, 1000, 260, LTR_BLUE, blockOp);
  g += ltrLabel(800, 350, '一件事', 34, C.yellow, blockOp);
  g += ltrType('上星期您教我們寫作文，還幫我改了好多錯字。', u, 800, 455, 36, C.yellow, 1.0, 6.5);
  return ltrPaint(g);
}

function s9(u) {
  let g = head(u, '練習', '換你寫信') + ltrTag();
  const titleOp = ltrK(u, 0.2, 0.8);
  g += `<g opacity="${ltrO(titleOp)}">${box(1100, 240, 400, 72, C.yellow, 1, C.deep)}${ltrLabel(1300, 288, '〈給爸爸的一封信〉', 40, C.yellow)}</g>`;
  const scaffoldOp = ltrK(u, 0.6, 1.2);
  g += ltrScaffold(scaffoldOp, [1, 1, 1, 1, 1], [0, 0, 0, 0, 0]);
  const blockRows = [
    { y: 352, label: '一件事', flashAt: 9.75 },
    { y: 428, label: '我的想法', flashAt: 10.6 },
    { y: 504, label: '總結', flashAt: 11.45 },
  ];
  ltrSlotData.forEach((slot, i) => {
    const flash = ltrFlash(u, 6.0 + i * 0.75);
    if (flash > 0.01) g += ltrSlot(slot.x, slot.y, slot.w, slot.h, 1, flash, true);
  });
  blockRows.forEach(({ y, label, flashAt }) => {
    const flash = ltrFlash(u, flashAt);
    g += ltrBlock(620, y, 360, 66, LTR_BLUE, scaffoldOp, true);
    g += ltrPhrase(640, y + 43, label, 30, C.yellow, scaffoldOp);
    if (flash > 0.01) g += `<rect x="620" y="${y}" width="360" height="66" rx="14" fill="rgba(242,193,78,.15)" stroke="${C.yellow}" stroke-width="5" opacity="${ltrO(flash)}"/>`;
  });
  g += ltrPositionNote();
  return ltrPaint(g);
}
