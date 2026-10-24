// 第 24 集「從骨架長出肉」（g6-07，六年級議論文長肉，表徵版）場景檔。前綴 arl；畫面只由段內秒數 u 決定。
const META = {
  title: '從骨架長出肉',
  subtitle: '10 段・約 2 分鐘・六年級議論文長肉',
  ariaLabel: '議論文骨架不變、每段長肉：開頭用排比或引言，論據段寫理由加例子加小結，結尾呼應開頭；四塊藍積木各自長出肉條。',
  note: '出處：楊裕貿議論文教學策略（2023）、分步學寫議論文講義、名言出處《荀子．勸學》。積木、肉條、柱子、卷軸、石塊、蓋子石、主張牌、虛線、工作牌是視覺比喻或示意；〈一本書的啟示〉長肉示範句與生活例子自編；排比問句自編；〈龜兔賽跑〉出自《伊索寓言》。鍵盤操作：空白鍵播放／暫停，左右方向鍵切換段落，F 鍵全螢幕。畫面只由時間決定。',
  works: [],
};
const ARL_WOOD = '#a9784f';
const ARL_BLUE = '#7fb6d9';
const ARL_ORANGE = '#F0B27A';
const ARL_YELLOW = '#f2c14e';
const ARL_CREAM = '#efe9d8';
const ARL_DEEP = '#1a2b23';
const arlK = (u, a, b) => ease(P(u, a, b));
const arlLerp = (a, b, k) => a + (b - a) * k;
const arlN = (value) => Number.isFinite(Number(value)) ? Number(Number(value).toFixed(2)) : 0;
const arlO = (value) => Math.max(0, Math.min(1, Number(value) || 0)).toFixed(3);

function arlHead(u, i) {
  const seg = SEGS[i];
  return head(u, seg.grp, seg.name);
}

function arlPaint(svg) {
  return svg.replace(/font-size="24"/g, 'font-size="26"')
    .replace(/<text ([^>]*?)fill="([^"]+)"/g, '<text $1style="fill:$2" fill="$2"');
}

function arlMetaphorTag(op = 1) {
  if (op <= 0.001) return '';
  return `<g opacity="${arlO(op)}">${box(1375, 56, 165, 60, ARL_ORANGE, 1, ARL_DEEP)}${txt(1457, 98, '比喻', { a: 'middle', s: 30, w: 1, f: ARL_ORANGE })}</g>`;
}

function arlLabel(cx, y, value, size = 30, color = ARL_CREAM, op = 1) {
  if (op <= 0.001) return '';
  return txt(cx, y, value, { a: 'middle', s: size, w: 1, f: color, o: op });
}

function arlPhrase(x, y, value, size = 30, color = ARL_CREAM, op = 1, anchor = 'start') {
  if (op <= 0.001 || !value) return '';
  return txt(x, y, value, { a: anchor, s: size, w: 1, f: color, o: op });
}

function arlPath(d, color = ARL_CREAM, width = 5, op = 1, fill = 'none', dash = '') {
  if (op <= 0.001) return '';
  return `<path d="${d}" fill="${fill}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${arlO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function arlLine(x1, y1, x2, y2, color = ARL_CREAM, width = 5, op = 1, dash = '', progress = 1) {
  if (op <= 0.001 || progress <= 0.001) return '';
  const ex = arlLerp(x1, x2, progress), ey = arlLerp(y1, y2, progress);
  return arlPath(`M${arlN(x1)} ${arlN(y1)} L${arlN(ex)} ${arlN(ey)}`, color, width, op, 'none', dash);
}

function arlArrowTo(x1, y1, x2, y2, op = 1, p = 1, size = 16, dash = '') {
  if (op <= 0.001 || p <= 0.001) return '';
  const ex = arlLerp(x1, x2, p), ey = arlLerp(y1, y2, p), a = Math.atan2(y2 - y1, x2 - x1);
  let g = arlLine(x1, y1, ex, ey, ARL_YELLOW, 4, op, dash);
  if (p >= 0.99) {
    g += `<polygon points="${x2},${y2} ${arlN(x2 - size * Math.cos(a - 0.48))},${arlN(y2 - size * Math.sin(a - 0.48))} ${arlN(x2 - size * Math.cos(a + 0.48))},${arlN(y2 - size * Math.sin(a + 0.48))}" fill="${ARL_YELLOW}" opacity="${arlO(op)}"/>`;
  }
  return g;
}

// 黃虛線弧：二次貝茲，k 為繪製進度（de Casteljau 截段）
function arlCurve(x1, y1, cx, cy, x2, y2, k, op = 1, color = ARL_YELLOW, width = 4, dash = '') {
  if (op <= 0.001 || k <= 0.001) return '';
  const px = arlLerp(x1, cx, k), py = arlLerp(y1, cy, k);
  const qx = arlLerp(cx, x2, k), qy = arlLerp(cy, y2, k);
  const ex = arlLerp(px, qx, k), ey = arlLerp(py, qy, k);
  return arlPath(`M${arlN(x1)} ${arlN(y1)} Q${arlN(px)} ${arlN(py)} ${arlN(ex)} ${arlN(ey)}`, color, width, op, 'none', dash);
}

function arlFlash(u, start) {
  const fadeIn = arlK(u, start, start + 0.08);
  const fadeOut = 1 - arlK(u, start + 0.42, start + 0.5);
  return Math.max(0, Math.min(fadeIn, fadeOut));
}

function arlBlock(x, y, w, h, color, op = 1, dashed = false, flash = 0) {
  if (op <= 0.001 || w <= 2 || h <= 2) return '';
  if (dashed) {
    const fill = flash > 0.01 ? `rgba(242,193,78,${(0.5 * flash).toFixed(3)})` : 'rgba(239,233,216,.012)';
    return `<rect x="${arlN(x)}" y="${arlN(y)}" width="${arlN(w)}" height="${arlN(h)}" rx="14" fill="${fill}" stroke="${color}" stroke-width="5" stroke-dasharray="14 10" opacity="${arlO(op)}"/>`;
  }
  return `<rect x="${arlN(x)}" y="${arlN(y)}" width="${arlN(w)}" height="${arlN(h)}" rx="14" fill="${color}" fill-opacity=".22" stroke="${ARL_CREAM}" stroke-width="4" opacity="${arlO(op)}"/>`;
}

// 肉條：圓角長條；text 為白字 30px 置中；dashed 為虛線空條（字改黃色）
function arlMeat(x, y, w, h, color, text, op = 1, dashed = false, flash = 0) {
  if (op <= 0.001) return '';
  const lit = flash > 0.01;
  const fill = dashed ? 'none' : lit ? `rgba(242,193,78,${(0.5 * flash).toFixed(3)})` : color;
  const fillOp = dashed || lit ? '' : ' fill-opacity="0.14"';
  const rect = `<rect x="${arlN(x)}" y="${arlN(y)}" width="${arlN(w)}" height="${arlN(h)}" rx="14" fill="${fill}"${fillOp} stroke="${color}" stroke-width="4"${dashed ? ' stroke-dasharray="14 10"' : ''} opacity="${arlO(op)}"/>`;
  return rect + (text ? arlLabel(x + w / 2, y + h / 2 + 11, text, 30, dashed ? ARL_YELLOW : ARL_CREAM, op) : '');
}

// 排比柱：白粉筆矩形由底往上長（grow），柱頂一條橫線當柱頭；grow ≥ 0.98 才寫字
function arlPillar(x, top, w, bottom, text, op = 1, grow = 1) {
  if (op <= 0.001 || grow <= 0.001) return '';
  const k = Math.max(0, Math.min(1, grow));
  const vis = bottom - (bottom - top) * k;
  let g = `<g opacity="${arlO(op)}"><rect x="${arlN(x)}" y="${arlN(vis)}" width="${arlN(w)}" height="${arlN(bottom - vis)}" fill="rgba(239,233,216,.05)" stroke="${ARL_CREAM}" stroke-width="5"/>`;
  g += arlPath(`M${arlN(x - 8)} ${arlN(vis)} H${arlN(x + w + 8)}`, ARL_CREAM, 7, 1) + '</g>';
  if (text && k >= 0.98) g += arlLabel(x + w / 2, top + 70, text, 30, ARL_CREAM, op);
  return g;
}

// 名言卷軸：紙面由中間往左右展開（寬 × open）；open ≥ 0.98 才寫字
function arlScroll(x, y, w, h, text, source, op = 1, open = 1) {
  if (op <= 0.001 || open <= 0.001) return '';
  const k = Math.max(0, Math.min(1, open));
  const pw = w * k, px = x + w / 2 - pw / 2;
  let g = `<g opacity="${arlO(op)}"><rect x="${arlN(px)}" y="${arlN(y)}" width="${arlN(pw)}" height="${arlN(h)}" fill="rgba(239,233,216,.06)" stroke="${ARL_CREAM}" stroke-width="3"/>`;
  g += arlPath(`M${arlN(x)} ${arlN(y - 10)} V${arlN(y + h + 10)} M${arlN(x + w)} ${arlN(y - 10)} V${arlN(y + h + 10)}`, ARL_CREAM, 6, 1) + '</g>';
  if (k >= 0.98) {
    g += arlPhrase(x + w / 2 - 50, y + h / 2 + 12, text, 34, ARL_CREAM, op, 'middle');
    g += arlPhrase(x + w - 85, y + h / 2 + 12, source, 26, 'rgba(239,233,216,.75)', op, 'middle');
  }
  return g;
}

// 梯子：兩側直桿＋橫木
function arlLadder(x1, x2, top, bottom, rungs, op = 1) {
  if (op <= 0.001) return '';
  let g = arlPath(`M${x1} ${top} V${bottom} M${x2} ${top} V${bottom}`, ARL_CREAM, 6, op);
  rungs.forEach((y) => { g += arlPath(`M${x1} ${y} H${x2}`, ARL_CREAM, 5, op); });
  return g;
}

// 石塊：有步驟小字（step）時為「步驟字＋短語」兩行；無步驟字時短語置中；slide 由下方滑入 30px
function arlStone(x, y, w, h, color, phrase, step, op, slide = 1, dashed = false) {
  if (op <= 0.001 || w <= 2 || h <= 2) return '';
  const dy = 30 * (1 - Math.max(0, Math.min(1, slide)));
  const fill = color === ARL_ORANGE ? 'rgba(240,178,122,.12)' : color === ARL_BLUE ? 'rgba(127,182,217,.12)' : 'rgba(242,193,78,.12)';
  const rich = w >= 80 && h >= 60;
  let g = `<g transform="translate(0 ${arlN(dy)})" opacity="${arlO(op)}"><rect x="${arlN(x)}" y="${arlN(y)}" width="${arlN(w)}" height="${arlN(h)}" rx="14" fill="${dashed ? 'none' : fill}" stroke="${color}" stroke-width="${w < 50 ? 4 : 5}"${dashed ? ' stroke-dasharray="8 6"' : ''}/>`;
  if (!dashed && rich) g += `<path d="M${arlN(x + 12)} ${arlN(y + 14)} l10 8 M${arlN(x + w - 24)} ${arlN(y + h - 16)} l10 -8" fill="none" stroke="rgba(239,233,216,.35)" stroke-width="2"/>`;
  g += '</g>';
  if (phrase && step && rich) {
    g += arlLabel(x + w / 2, y + 30, step, 24, 'rgba(239,233,216,.75)', op) + arlLabel(x + w / 2, y + 76, phrase, 30, ARL_CREAM, op);
  } else if (phrase) {
    g += arlLabel(x + w / 2, y + h / 2 + 11, phrase, 30, ARL_CREAM, op);
  }
  return g;
}

// 小牆（圖示用，無字）
function arlWall(x, top, w, bottom, op = 1, dashed = false) {
  if (op <= 0.001) return '';
  let g = `<g opacity="${arlO(op)}"><rect x="${arlN(x)}" y="${arlN(top)}" width="${arlN(w)}" height="${arlN(bottom - top)}" fill="${dashed ? 'none' : 'rgba(239,233,216,.04)'}" stroke="${ARL_CREAM}" stroke-width="4"${dashed ? ' stroke-dasharray="12 9"' : ''}/>`;
  if (!dashed) for (let yy = top + 36; yy < bottom; yy += 36) g += arlLine(x, yy, x + w, yy, 'rgba(239,233,216,.46)', 2);
  return g + '</g>';
}

// 主張牌：黃框木牌，label 置中
function arlBoard(x1, x2, y, h, label, op = 1, flash = 0) {
  if (op <= 0.001) return '';
  const fill = flash > 0.01 ? `rgba(242,193,78,${(0.5 * flash).toFixed(3)})` : 'rgba(242,193,78,.12)';
  return `<rect x="${arlN(x1)}" y="${arlN(y)}" width="${arlN(x2 - x1)}" height="${arlN(h)}" rx="10" fill="${fill}" stroke="${ARL_YELLOW}" stroke-width="5" opacity="${arlO(op)}"/>` +
    arlLabel((x1 + x2) / 2, y + h / 2 + 11, label, 30, ARL_CREAM, op);
}

// 小標籤（黃框深底，字 30px）
function arlTag(x, y, w, label, op = 1) {
  if (op <= 0.001) return '';
  return `<g opacity="${arlO(op)}">${box(x, y, w, 64, ARL_YELLOW, 1, 'rgba(26,43,35,.94)')}${txt(x + w / 2, y + 42, label, { a: 'middle', s: 30, w: 1, f: ARL_CREAM })}</g>`;
}

function arlCardFrame(x, y, w, h, op = 1) {
  if (op <= 0.001) return '';
  return `<g opacity="${arlO(op)}">${box(x, y, w, h, ARL_CREAM, 1, 'rgba(239,233,216,.015)')}</g>`;
}

function arlTitleCard(x, y, w, value, size, op) {
  if (op <= 0.001) return '';
  return `<g opacity="${arlO(op)}"><rect x="${x}" y="${y}" width="${w}" height="56" rx="12" fill="rgba(26,43,35,.96)" stroke="${ARL_CREAM}" stroke-width="4"/></g>` +
    txt(x + w / 2, y + 38, value, { a: 'middle', s: size, w: 1, f: ARL_YELLOW, o: op });
}

// 標題列：〈一句話的〉＋黃字「啟示」＋〉
function arlColorTitle(cx, y, before, mark, after, size, op) {
  if (op <= 0.001) return '';
  return `<text x="${cx}" y="${y}" text-anchor="middle" font-size="${size}" font-weight="700" fill="${ARL_CREAM}" opacity="${arlO(op)}">` +
    `<tspan fill="${ARL_CREAM}" style="fill:${ARL_CREAM}">${esc(before)}</tspan>` +
    `<tspan fill="${ARL_YELLOW}" style="fill:${ARL_YELLOW}">${esc(mark)}</tspan>` +
    `<tspan fill="${ARL_CREAM}" style="fill:${ARL_CREAM}">${esc(after)}</tspan></text>`;
}

function arlStageTitle(u, value) {
  return arlLabel(800, 240, value, 36, ARL_YELLOW, arlK(u, 0.2, 0.8));
}

function arlWorkTag(x, y, w, value, op = 1) {
  return arlLabel(x + w / 2, y, value, 34, ARL_CREAM, op);
}

// 小柱（三根，各寬 10、高 34、間距 16，無字）
function arlMiniPillars(cx, cy, op = 1) {
  if (op <= 0.001) return '';
  let g = `<g opacity="${arlO(op)}">`;
  [-21, -5, 11].forEach((dx) => { g += `<rect x="${cx + dx}" y="${cy - 17}" width="10" height="34" fill="rgba(239,233,216,.06)" stroke="${ARL_CREAM}" stroke-width="3"/>`; });
  return g + '</g>';
}

// 小卷軸（寬 44、高 30，兩側小軸，無字）
function arlMiniScroll(cx, cy, op = 1) {
  if (op <= 0.001) return '';
  return `<g opacity="${arlO(op)}"><rect x="${cx - 18}" y="${cy - 11}" width="36" height="22" fill="rgba(239,233,216,.06)" stroke="${ARL_CREAM}" stroke-width="2.5"/>` +
    arlPath(`M${cx - 20} ${cy - 15} V${cy + 15} M${cx + 20} ${cy - 15} V${cy + 15}`, ARL_CREAM, 4, 1) + '</g>';
}

// 粉筆小人（nod 為點頭進度）
function arlDoll(cx, cy, scale = 1, op = 1, nod = 0) {
  const dy = 10 * Math.sin(Math.PI * Math.max(0, Math.min(1, nod)));
  return `<g transform="translate(${arlN(cx)} ${arlN(cy + dy)}) scale(${arlN(scale)})" opacity="${arlO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<circle cx="0" cy="-72" r="31" fill="rgba(240,217,189,.55)" stroke="${ARL_CREAM}" stroke-width="5"/>` +
    `<path d="M-28 -77 Q-21 -112 4 -105 Q27 -99 29 -75 Q9 -90 -4 -87 Q-18 -83 -28 -77Z" fill="${ARL_WOOD}" stroke="${ARL_CREAM}" stroke-width="3"/>` +
    `<path d="M-43 43 Q-40 -28 0 -28 Q40 -28 43 43Z" fill="rgba(127,182,217,.28)" stroke="${ARL_CREAM}" stroke-width="5"/>` +
    `<path d="M-37 -5 L-70 26 M37 -5 L70 26 M-19 43 L-30 91 M19 43 L30 91" fill="none" stroke="${ARL_CREAM}" stroke-width="9"/>` +
    `<circle cx="-10" cy="-67" r="3" fill="${ARL_WOOD}"/><circle cx="10" cy="-67" r="3" fill="${ARL_WOOD}"/></g>`;
}

// 四段地圖（右上角）：active＝1–4 為亮起的那段，0 為全部不亮；op 為整組淡入
function arlMiniMap(active, op = 1) {
  if (op <= 0.001) return '';
  const xs = [1150, 1246, 1342, 1438], names = ['一段', '二段', '三段', '四段'];
  let g = `<g opacity="${arlO(op)}">`;
  xs.forEach((x, i) => {
    const on = active === i + 1;
    g += `<rect x="${x}" y="200" width="86" height="50" rx="8" fill="${on ? 'rgba(242,193,78,.35)' : 'rgba(127,182,217,.30)'}" stroke="${on ? ARL_YELLOW : ARL_CREAM}" stroke-width="${on ? 4 : 2}"/>`;
    g += txt(x + 43, 236, names[i], { a: 'middle', s: 30, w: 1, f: ARL_CREAM, o: on ? 1 : 0.7 });
  });
  return g + '</g>';
}

// 一行多色文字置中：parts＝[[文字, 顏色], …]，每段一個 tspan（fill 與 style 都寫）
function arlRich(cx, y, parts, size = 30, op = 1) {
  if (op <= 0.001) return '';
  const spans = parts.map(([t, c]) => `<tspan fill="${c}" style="fill:${c}">${esc(t)}</tspan>`).join('');
  return `<text x="${cx}" y="${y}" class="t-chalk" font-size="${size}" font-weight="700" text-anchor="middle" fill="${ARL_CREAM}" opacity="${arlO(op)}">${spans}</text>`;
}

// ===== 各段 =====
function s1(u) {
  let g = arlHead(u, 0) + arlMetaphorTag();
  g += arlStageTitle(u, '骨架不變，每段長肉');
  g += arlTitleCard(620, 290, 360, '〈一本書的啟示〉', 34, arlK(u, 0.4, 0.9));
  const blocks = [
    { x: 70, w: 300, tag: '這本書＋道理', part: '第一段' },
    { x: 390, w: 400, tag: '書裡的例子', part: '第二段' },
    { x: 810, w: 400, tag: '生活的例子', part: '第三段' },
    { x: 1230, w: 300, tag: '再說一次', part: '第四段' }
  ];
  blocks.forEach((b, i) => {
    g += arlBlock(b.x, 420, b.w, 200, ARL_BLUE, arlK(u, 1.0 + i * 0.4, 1.8 + i * 0.4));
    g += arlWorkTag(b.x, 470, b.w, b.tag, arlK(u, 1.5 + i * 0.5, 2.0 + i * 0.5));
    g += arlLabel(b.x + b.w / 2, 665, b.part, 30, ARL_YELLOW, arlK(u, 3.5 + i * 0.667, 4.0 + i * 0.667));
  });
  blocks.forEach((b, i) => {
    [ARL_ORANGE, ARL_BLUE].forEach((c, r) => {
      const j = i * 2 + r;
      g += arlMeat(b.x + 20, 514 + r * 54, b.w - 40, 40, c, '', arlK(u, 6.0 + j * 0.286, 6.5 + j * 0.286), true);
    });
  });
  g += arlMiniMap(0, arlK(u, 9.5, 10.5));
  return arlPaint(g);
}

function s2(u) {
  let g = arlHead(u, 1) + arlMetaphorTag();
  // 三張卡依序出現；卡出現後 0.4 秒起，三行每 0.8 秒依序亮起
  const cards = [
    { x: 70, s: 1.0, tag: '例一', lines: [
      [['春', ARL_CREAM], ['天來了，', ARL_YELLOW], ['花開了', ARL_CREAM]],
      [['夏', ARL_CREAM], ['天來了，', ARL_YELLOW], ['蟬叫了', ARL_CREAM]],
      [['秋', ARL_CREAM], ['天來了，', ARL_YELLOW], ['葉落了', ARL_CREAM]]
    ] },
    { x: 570, s: 4.5, tag: '例二', lines: [
      [['堅持，是', ARL_YELLOW], ['不停的腳步', ARL_CREAM]],
      [['堅持，是', ARL_YELLOW], ['不放棄的心', ARL_CREAM]],
      [['堅持，是', ARL_YELLOW], ['成功的路', ARL_CREAM]]
    ] },
    { x: 1070, s: 8.0, tag: '例三', lines: [
      [['你會', ARL_YELLOW], ['做完', ARL_CREAM], ['，還是', ARL_YELLOW], ['放棄', ARL_CREAM], ['？', ARL_YELLOW]],
      [['你會', ARL_YELLOW], ['前進', ARL_CREAM], ['，還是', ARL_YELLOW], ['停下', ARL_CREAM], ['？', ARL_YELLOW]],
      [['你會', ARL_YELLOW], ['追趕', ARL_CREAM], ['，還是', ARL_YELLOW], ['認輸', ARL_CREAM], ['？', ARL_YELLOW]]
    ] }
  ];
  cards.forEach((c) => {
    g += arlCardFrame(c.x, 280, 460, 300, arlK(u, c.s, c.s + 0.4));
    g += arlLabel(c.x + 230, 325, c.tag, 30, ARL_YELLOW, arlK(u, c.s, c.s + 0.4));
    c.lines.forEach((parts, j) => {
      const t = c.s + 0.4 + j * 0.8;
      g += arlRich(c.x + 230, 395 + j * 60, parts, 30, arlK(u, t, t + 0.4));
    });
  });
  g += arlCardFrame(400, 640, 800, 72, arlK(u, 12.0, 12.8));
  g += arlLabel(800, 686, '句型一樣的幾句排在一起＝排比', 30, ARL_CREAM, arlK(u, 12.0, 12.8));
  return arlPaint(g);
}

function s3(u) {
  let g = arlHead(u, 2) + arlMetaphorTag();
  g += arlMiniMap(1, arlK(u, 0.2, 0.7));
  g += arlBlock(160, 280, 1280, 470, ARL_BLUE, arlK(u, 0.3, 0.8));
  g += arlLabel(800, 325, '第一段', 34, ARL_CREAM, arlK(u, 0.3, 0.8));
  g += arlLabel(1300, 325, '提出論點', 30, ARL_YELLOW, arlK(u, 0.3, 0.8));
  const pillars = [
    { x: 223, text: '一步步做完，還是放棄？', label: '排比一', start: 1.0 },
    { x: 623, text: '繼續前進，還是停下？', label: '排比二', start: 3.0 },
    { x: 1023, text: '咬牙追趕，還是認輸？', label: '排比三', start: 5.0 }
  ];
  pillars.forEach((p) => {
    const k = arlK(u, p.start, p.start + 1.0);
    g += arlPillar(p.x, 460, 354, 680, p.text, arlK(u, p.start, p.start + 0.2), k);
    g += arlLabel(p.x + 177, 725, p.label, 30, ARL_YELLOW, k);
  });
  g += arlBoard(223, 1377, 370, 76, '堅持到底才會成功', arlK(u, 7.5, 8.5));
  return arlPaint(g);
}

function s4(u) {
  let g = arlHead(u, 3) + arlMetaphorTag();
  g += arlMiniMap(1, arlK(u, 0.2, 0.7));
  g += arlBlock(160, 270, 1280, 500, ARL_BLUE, arlK(u, 0.3, 0.8));
  g += arlLabel(800, 315, '第一段', 34, ARL_CREAM, arlK(u, 0.3, 0.8));
  const nameOp = arlK(u, 0.8, 1.0);
  g += arlScroll(560, 340, 600, 90, '鍥而不捨，金石可鏤', '《荀子》', nameOp, arlK(u, 0.8, 2.2));
  g += arlPhrase(530, 395, '① 名言', 30, ARL_YELLOW, nameOp, 'end');
  g += arlArrowTo(860, 438, 860, 468, 1, arlK(u, 2.3, 2.8));
  const meaningOp = arlK(u, 3.5, 4.0);
  g += box(560, 478, 600, 70, ARL_CREAM, meaningOp, 'rgba(26,43,35,.96)');
  g += arlLabel(860, 523, '意思：不停下來，硬石也刻得動', 30, ARL_CREAM, meaningOp);
  g += arlPhrase(530, 523, '② 意思', 30, ARL_YELLOW, meaningOp, 'end');
  g += arlArrowTo(860, 556, 860, 586, 1, arlK(u, 4.4, 4.9));
  const claimOp = arlK(u, 6.0, 6.8);
  g += arlBoard(620, 1100, 596, 74, '堅持到底才會成功', claimOp);
  g += arlPhrase(530, 643, '③ 論點', 30, ARL_YELLOW, claimOp, 'end');
  g += box(460, 690, 680, 64, ARL_CREAM, arlK(u, 8.5, 9.3), 'rgba(26,43,35,.96)');
  g += arlLabel(800, 732, '第一段就把名言和論點寫清楚', 30, ARL_YELLOW, arlK(u, 8.5, 9.3));
  return arlPaint(g);
}

function s5(u) {
  let g = arlHead(u, 4) + arlMetaphorTag();
  g += arlMiniMap(2, arlK(u, 0.2, 0.7));
  g += arlBlock(360, 270, 880, 430, ARL_BLUE, arlK(u, 0.3, 0.8));
  g += arlWorkTag(360, 320, 880, '第二段：書裡的例子', arlK(u, 0.5, 0.9));
  g += arlMeat(400, 350, 800, 60, ARL_ORANGE, '理由：不停下來就會到', arlK(u, 1.5, 2.1));
  const stones = [
    { x: 400, w: 160, color: ARL_ORANGE, phrase: '烏龜', step: '什麼人', start: 3.5 },
    { x: 580, w: 290, color: ARL_BLUE, phrase: '一步步不停往前', step: '做什麼事', start: 4.5 },
    { x: 890, w: 200, color: ARL_YELLOW, phrase: '先到終點', step: '結果', start: 5.5 }
  ];
  stones.forEach((s) => {
    const k = arlK(u, s.start, s.start + 0.5);
    g += arlStone(s.x, 430, s.w, 90, s.color, s.phrase, s.step, k, k);
  });
  // 蓋子肉條：起點 530 在石塊底 520 之下，移動中不穿過石塊；落點 550
  const lidK = arlK(u, 7.5, 8.3);
  g += arlMeat(400, arlLerp(530, 550, lidK), 800, 64, ARL_YELLOW, '小結：不停下來就能贏', arlK(u, 7.5, 7.9));
  g += arlPhrase(1270, 392, '理由', 30, ARL_YELLOW, arlK(u, 1.5, 2.1));
  g += arlPhrase(1270, 478, '例子', 30, ARL_YELLOW, arlK(u, 3.5, 4.0));
  g += arlPhrase(1270, 594, '小結', 30, ARL_YELLOW, arlK(u, 7.5, 7.9));
  return arlPaint(g);
}

function s6(u) {
  let g = arlHead(u, 5) + arlMetaphorTag();
  g += arlMiniMap(3, arlK(u, 0.2, 0.7));
  g += arlBlock(360, 270, 880, 430, ARL_BLUE, arlK(u, 0.2, 0.7));
  g += arlWorkTag(360, 320, 880, '第三段：生活的例子', arlK(u, 0.4, 0.8));
  g += arlMeat(400, 350, 800, 60, ARL_ORANGE, '理由：每天做一點就會進步', arlK(u, 1.0, 1.6));
  const stones = [
    { x: 400, w: 140, color: ARL_ORANGE, phrase: '我', start: 2.5 },
    { x: 560, w: 290, color: ARL_BLUE, phrase: '每天練琴十分鐘', start: 3.3 },
    { x: 870, w: 250, color: ARL_YELLOW, phrase: '彈完一整首曲', start: 4.1 }
  ];
  stones.forEach((s) => {
    const k = arlK(u, s.start, s.start + 0.5);
    g += arlStone(s.x, 430, s.w, 90, s.color, s.phrase, '', k, k);
  });
  const lidK = arlK(u, 5.5, 6.3);
  g += arlMeat(400, arlLerp(530, 550, lidK), 800, 64, ARL_YELLOW, '小結：小努力變大進步', arlK(u, 5.5, 5.9));
  g += arlPhrase(1270, 392, '理由', 30, ARL_YELLOW, arlK(u, 1.0, 1.6));
  g += arlPhrase(1270, 478, '例子', 30, ARL_YELLOW, arlK(u, 2.5, 3.0));
  g += arlPhrase(1270, 594, '小結', 30, ARL_YELLOW, arlK(u, 5.5, 5.9));
  return arlPaint(g);
}

function s7(u) {
  let g = arlHead(u, 6) + arlMetaphorTag();
  g += arlMiniMap(4, arlK(u, 0.2, 0.7));
  // 第一列
  const r1 = arlK(u, 0.5, 1.0), r1r = arlK(u, 2.0, 2.5);
  g += arlCardFrame(160, 320, 380, 110, r1);
  g += arlMiniPillars(225, 375, r1);
  g += arlLabel(380, 387, '第一段排比', 34, ARL_CREAM, r1);
  g += arlCardFrame(980, 320, 460, 110, r1r);
  g += arlMiniScroll(1035, 375, r1r);
  g += arlLabel(1230, 365, '第四段引言', 34, ARL_CREAM, r1r);
  g += arlLabel(1230, 412, '鍥而不捨，金石可鏤', 30, ARL_YELLOW, r1r);
  g += arlArrowTo(550, 375, 970, 375, 1, arlK(u, 1.2, 2.0), 16, '10 8');
  // 第二列
  const r2 = arlK(u, 4.0, 4.5), r2r = arlK(u, 5.5, 6.0);
  g += arlCardFrame(160, 490, 380, 90, r2);
  g += arlMiniScroll(225, 535, r2);
  g += arlLabel(380, 547, '第一段引言', 34, ARL_CREAM, r2);
  g += arlCardFrame(980, 490, 460, 90, r2r);
  g += arlMiniPillars(1035, 535, r2r);
  g += arlLabel(1230, 547, '第四段排比', 34, ARL_CREAM, r2r);
  g += arlArrowTo(550, 535, 970, 535, 1, arlK(u, 4.7, 5.5), 16, '10 8');
  g += arlBoard(560, 1040, 650, 80, '堅持到底才會成功', arlK(u, 7.0, 7.8));
  return arlPaint(g);
}

function s8(u) {
  let g = arlHead(u, 7) + arlMetaphorTag();
  const x = [70, 390, 810, 1230], w = [300, 400, 400, 300];
  const tags = ['第一段', '第二段', '第三段', '第四段'];
  for (let i = 0; i < 4; i++) {
    const s = 0.3 + i * 0.4;
    g += arlBlock(x[i], 330, w[i], 380, ARL_BLUE, arlK(u, s, s + 0.5));
    g += arlLabel(x[i] + w[i] / 2, 378, tags[i], 34, ARL_YELLOW, arlK(u, s, s + 0.5));
  }
  // 塊 1：三個問句，最後是論點
  [[450, '做完還是放棄？', ARL_CREAM], [500, '前進還是停下？', ARL_CREAM], [550, '追趕還是認輸？', ARL_CREAM], [620, '堅持到底才會成功', ARL_YELLOW]]
    .forEach(([y, t, c], i) => { const s = 2.5 + i * 0.9; g += arlLabel(220, y, t, 30, c, arlK(u, s, s + 0.3)); });
  // 塊 2、塊 3：理由／例子／小結，依序長出
  [[420, ARL_ORANGE, '不停下來就會到'], [500, ARL_BLUE, '烏龜不停往前'], [580, ARL_YELLOW, '不停下來就能贏']]
    .forEach(([y, c, t], i) => { const s = 6.0 + i * 1.1; g += arlMeat(410, y, 360, 52, c, t, arlK(u, s, s + 0.3)); });
  [[420, ARL_ORANGE, '每天做一點就進步'], [500, ARL_BLUE, '我每天練琴'], [580, ARL_YELLOW, '小努力變大進步']]
    .forEach(([y, c, t], i) => { const s = 9.0 + i * 1.1; g += arlMeat(830, y, 360, 52, c, t, arlK(u, s, s + 0.3)); });
  // 塊 4：引名言，最後是論點
  g += arlLabel(1380, 450, '鍥而不捨，', 30, ARL_CREAM, arlK(u, 12.0, 12.3));
  g += arlLabel(1380, 500, '金石可鏤', 30, ARL_CREAM, arlK(u, 12.85, 13.15));
  g += arlLabel(1380, 620, '堅持到底才會成功', 30, ARL_YELLOW, arlK(u, 13.7, 14.0));
  // 呼應弧：第一段積木上方到第四段積木上方
  g += arlCurve(220, 322, 800, 214, 1380, 322, arlK(u, 14.5, 15.8), 1, ARL_YELLOW, 4, '10 8');
  g += arlLabel(800, 312, '呼應', 30, ARL_YELLOW, arlK(u, 15.8, 16.3));
  return arlPaint(g);
}

function s9(u) {
  let g = arlHead(u, 8) + arlMetaphorTag();
  g += arlStageTitle(u, '講義的四段式');
  const tableOp = arlK(u, 0.3, 0.8), grid = 'rgba(239,233,216,.5)';
  g += arlCardFrame(200, 290, 1200, 420, tableOp);
  [540, 960].forEach((x) => { g += arlLine(x, 290, x, 710, grid, 2, tableOp); });
  [370, 450, 530, 610].forEach((y) => { g += arlLine(200, y, 1400, y, grid, 2, tableOp); });
  g += arlLabel(750, 345, '等級 1', 34, ARL_YELLOW, arlK(u, 0.8, 1.2));
  g += arlLabel(1180, 345, '等級 3', 34, ARL_YELLOW, arlK(u, 0.8, 1.2));
  ['第一段（提出論點）', '第二段（論據段一）', '第三段（論據段二）', '第四段（結尾）'].forEach((t, i) => {
    g += arlPhrase(220, 425 + i * 80, t, 30, ARL_CREAM, arlK(u, 1.5 + i * 0.5, 2.0 + i * 0.5));
  });
  ['排比法', '什麼人做什麼事結果', '什麼人做什麼事結果', '引言法'].forEach((t, i) => {
    g += arlLabel(750, 425 + i * 80, t, 30, ARL_CREAM, arlK(u, 3.5 + i * 0.5, 4.0 + i * 0.5));
  });
  ['引言法', '理由＋例子＋小結', '理由＋例子＋小結', '引言法'].forEach((t, i) => {
    g += arlLabel(1180, 425 + i * 80, t, 30, ARL_CREAM, arlK(u, 6.0 + i * 0.5, 6.5 + i * 0.5));
  });
  g += arlLabel(800, 765, '論據段可以一級一級加：再加理由、再多一個例子', 30, 'rgba(239,233,216,.75)', arlK(u, 9.0, 9.8));
  return arlPaint(g);
}

function s10(u) {
  let g = arlHead(u, 9) + arlMetaphorTag();
  const titleOp = arlK(u, 0.2, 0.5);
  g += box(560, 200, 480, 72, ARL_CREAM, titleOp, 'rgba(26,43,35,.96)');
  g += arlColorTitle(800, 247, '〈一句話的', '啟示', '〉', 40, titleOp);
  const x = [70, 390, 810, 1230], w = [300, 400, 400, 300];
  const tags = ['這本書＋道理', '書裡的例子', '生活的例子', '再說一次'];
  const parts = ['第一段', '第二段', '第三段', '第四段'];
  const flashes = [6.5, 8.0, 9.5, 11.0];
  for (let i = 0; i < 4; i++) {
    const s = 0.8 + i * 0.5;
    const op = arlK(u, s, s + 0.7);
    g += arlBlock(x[i], 380, w[i], 260, ARL_BLUE, op, true, arlFlash(u, flashes[i]));
    g += arlWorkTag(x[i], 430, w[i], tags[i], op);
    g += arlLabel(x[i] + w[i] / 2, 362, parts[i], 30, ARL_YELLOW, op);
  }
  const meatTexts = ['排比或引言？', '理由＋例子＋小結', '理由＋例子＋小結', '呼應開頭'];
  const meatColors = [ARL_ORANGE, ARL_BLUE, ARL_BLUE, ARL_YELLOW];
  for (let i = 0; i < 4; i++) {
    const s = 3.5 + i * 0.6;
    g += arlMeat(x[i] + 20, 560, w[i] - 40, 54, meatColors[i], meatTexts[i], arlK(u, s, s + 0.7), true);
  }
  return arlPaint(g);
}
