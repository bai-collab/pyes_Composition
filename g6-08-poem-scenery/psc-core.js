// 「每一句都是一幅畫」（g6-08，六年級童詩寫景）共用核心：META、2D 小工具（沿用前集）、three.js 圖層 PscGL。畫面只由段內秒數 u 決定。
const META = {
  title: '每一句都是一幅畫',
  subtitle: '10 段・約 2 分鐘・六年級童詩（寫景）第一集',
  ariaLabel: '童詩不是只有字少：每一句詩都長出一幅畫。童詩分行分節；月夜裡月亮像燈、月光灑在海上樹梢窗前的排比、夜風沙沙落葉紛紛；寫景童詩四步：選景、五感、比喻或擬人、感受。',
  note: '出處：作文寫作要領（六年級童詩寫景、排比技巧練習）、香港教育局資優教育學校網絡分享簡報（童詩特色）、國小海洋童詩教案（五感、比喻擬人、感受）。〈月夜〉與散文對照句為自編；夜空、月亮、海面、樹、窗、落葉等立體畫面是想像的示意，由 three.js（r170，MIT 授權）繪製。鍵盤：空白鍵播放／暫停、左右鍵換段。畫面只由時間決定。',
  works: [],
};

const PSC_WOOD = '#a9784f';
const PSC_BLUE = '#7fb6d9';
const PSC_ORANGE = '#F0B27A';
const PSC_YELLOW = '#f2c14e';
const PSC_CREAM = '#efe9d8';
const PSC_DEEP = '#1a2b23';
const pscK = (u, a, b) => ease(P(u, a, b));
const pscLerp = (a, b, k) => a + (b - a) * k;
const pscN = (value) => Number.isFinite(Number(value)) ? Number(Number(value).toFixed(2)) : 0;
const pscO = (value) => Math.max(0, Math.min(1, Number(value) || 0)).toFixed(3);

function pscHead(u, i) {
  const seg = SEGS[i];
  return head(u, seg.grp, seg.name);
}

function pscPaint(svg) {
  return svg.replace(/font-size="24"/g, 'font-size="26"')
    .replace(/<text ([^>]*?)fill="([^"]+)"/g, '<text $1style="fill:$2" fill="$2"');
}

function pscMetaphorTag(op = 1) {
  if (op <= 0.001) return '';
  return `<g opacity="${pscO(op)}">${box(1375, 56, 165, 60, PSC_ORANGE, 1, PSC_DEEP)}${txt(1457, 98, '比喻', { a: 'middle', s: 30, w: 1, f: PSC_ORANGE })}</g>`;
}

function pscLabel(cx, y, value, size = 30, color = PSC_CREAM, op = 1) {
  if (op <= 0.001) return '';
  return txt(cx, y, value, { a: 'middle', s: size, w: 1, f: color, o: op });
}

function pscPhrase(x, y, value, size = 30, color = PSC_CREAM, op = 1, anchor = 'start') {
  if (op <= 0.001 || !value) return '';
  return txt(x, y, value, { a: anchor, s: size, w: 1, f: color, o: op });
}

function pscPath(d, color = PSC_CREAM, width = 5, op = 1, fill = 'none', dash = '') {
  if (op <= 0.001) return '';
  return `<path d="${d}" fill="${fill}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${pscO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function pscLine(x1, y1, x2, y2, color = PSC_CREAM, width = 5, op = 1, dash = '', progress = 1) {
  if (op <= 0.001 || progress <= 0.001) return '';
  const ex = pscLerp(x1, x2, progress), ey = pscLerp(y1, y2, progress);
  return pscPath(`M${pscN(x1)} ${pscN(y1)} L${pscN(ex)} ${pscN(ey)}`, color, width, op, 'none', dash);
}

function pscArrowTo(x1, y1, x2, y2, op = 1, p = 1, size = 16, dash = '') {
  if (op <= 0.001 || p <= 0.001) return '';
  const ex = pscLerp(x1, x2, p), ey = pscLerp(y1, y2, p), a = Math.atan2(y2 - y1, x2 - x1);
  let g = pscLine(x1, y1, ex, ey, PSC_YELLOW, 4, op, dash);
  if (p >= 0.99) {
    g += `<polygon points="${x2},${y2} ${pscN(x2 - size * Math.cos(a - 0.48))},${pscN(y2 - size * Math.sin(a - 0.48))} ${pscN(x2 - size * Math.cos(a + 0.48))},${pscN(y2 - size * Math.sin(a + 0.48))}" fill="${PSC_YELLOW}" opacity="${pscO(op)}"/>`;
  }
  return g;
}

// 黃虛線弧：二次貝茲，k 為繪製進度（de Casteljau 截段）
function pscCurve(x1, y1, cx, cy, x2, y2, k, op = 1, color = PSC_YELLOW, width = 4, dash = '') {
  if (op <= 0.001 || k <= 0.001) return '';
  const px = pscLerp(x1, cx, k), py = pscLerp(y1, cy, k);
  const qx = pscLerp(cx, x2, k), qy = pscLerp(cy, y2, k);
  const ex = pscLerp(px, qx, k), ey = pscLerp(py, qy, k);
  return pscPath(`M${pscN(x1)} ${pscN(y1)} Q${pscN(px)} ${pscN(py)} ${pscN(ex)} ${pscN(ey)}`, color, width, op, 'none', dash);
}

function pscFlash(u, start) {
  const fadeIn = pscK(u, start, start + 0.08);
  const fadeOut = 1 - pscK(u, start + 0.42, start + 0.5);
  return Math.max(0, Math.min(fadeIn, fadeOut));
}

function pscBlock(x, y, w, h, color, op = 1, dashed = false, flash = 0) {
  if (op <= 0.001 || w <= 2 || h <= 2) return '';
  if (dashed) {
    const fill = flash > 0.01 ? `rgba(242,193,78,${(0.5 * flash).toFixed(3)})` : 'rgba(239,233,216,.012)';
    return `<rect x="${pscN(x)}" y="${pscN(y)}" width="${pscN(w)}" height="${pscN(h)}" rx="14" fill="${fill}" stroke="${color}" stroke-width="5" stroke-dasharray="14 10" opacity="${pscO(op)}"/>`;
  }
  return `<rect x="${pscN(x)}" y="${pscN(y)}" width="${pscN(w)}" height="${pscN(h)}" rx="14" fill="${color}" fill-opacity=".22" stroke="${PSC_CREAM}" stroke-width="4" opacity="${pscO(op)}"/>`;
}

// 肉條：圓角長條；text 為白字 30px 置中；dashed 為虛線空條（字改黃色）
function pscMeat(x, y, w, h, color, text, op = 1, dashed = false, flash = 0) {
  if (op <= 0.001) return '';
  const lit = flash > 0.01;
  const fill = dashed ? 'none' : lit ? `rgba(242,193,78,${(0.5 * flash).toFixed(3)})` : color;
  const fillOp = dashed || lit ? '' : ' fill-opacity="0.14"';
  const rect = `<rect x="${pscN(x)}" y="${pscN(y)}" width="${pscN(w)}" height="${pscN(h)}" rx="14" fill="${fill}"${fillOp} stroke="${color}" stroke-width="4"${dashed ? ' stroke-dasharray="14 10"' : ''} opacity="${pscO(op)}"/>`;
  return rect + (text ? pscLabel(x + w / 2, y + h / 2 + 11, text, 30, dashed ? PSC_YELLOW : PSC_CREAM, op) : '');
}

// 排比柱：白粉筆矩形由底往上長（grow），柱頂一條橫線當柱頭；grow ≥ 0.98 才寫字
function pscPillar(x, top, w, bottom, text, op = 1, grow = 1) {
  if (op <= 0.001 || grow <= 0.001) return '';
  const k = Math.max(0, Math.min(1, grow));
  const vis = bottom - (bottom - top) * k;
  let g = `<g opacity="${pscO(op)}"><rect x="${pscN(x)}" y="${pscN(vis)}" width="${pscN(w)}" height="${pscN(bottom - vis)}" fill="rgba(239,233,216,.05)" stroke="${PSC_CREAM}" stroke-width="5"/>`;
  g += pscPath(`M${pscN(x - 8)} ${pscN(vis)} H${pscN(x + w + 8)}`, PSC_CREAM, 7, 1) + '</g>';
  if (text && k >= 0.98) g += pscLabel(x + w / 2, top + 70, text, 30, PSC_CREAM, op);
  return g;
}

// 名言卷軸：紙面由中間往左右展開（寬 × open）；open ≥ 0.98 才寫字
function pscScroll(x, y, w, h, text, source, op = 1, open = 1) {
  if (op <= 0.001 || open <= 0.001) return '';
  const k = Math.max(0, Math.min(1, open));
  const pw = w * k, px = x + w / 2 - pw / 2;
  let g = `<g opacity="${pscO(op)}"><rect x="${pscN(px)}" y="${pscN(y)}" width="${pscN(pw)}" height="${pscN(h)}" fill="rgba(239,233,216,.06)" stroke="${PSC_CREAM}" stroke-width="3"/>`;
  g += pscPath(`M${pscN(x)} ${pscN(y - 10)} V${pscN(y + h + 10)} M${pscN(x + w)} ${pscN(y - 10)} V${pscN(y + h + 10)}`, PSC_CREAM, 6, 1) + '</g>';
  if (k >= 0.98) {
    g += pscPhrase(x + w / 2 - 50, y + h / 2 + 12, text, 34, PSC_CREAM, op, 'middle');
    g += pscPhrase(x + w - 85, y + h / 2 + 12, source, 26, 'rgba(239,233,216,.75)', op, 'middle');
  }
  return g;
}

// 梯子：兩側直桿＋橫木
function pscLadder(x1, x2, top, bottom, rungs, op = 1) {
  if (op <= 0.001) return '';
  let g = pscPath(`M${x1} ${top} V${bottom} M${x2} ${top} V${bottom}`, PSC_CREAM, 6, op);
  rungs.forEach((y) => { g += pscPath(`M${x1} ${y} H${x2}`, PSC_CREAM, 5, op); });
  return g;
}

// 石塊：有步驟小字（step）時為「步驟字＋短語」兩行；無步驟字時短語置中；slide 由下方滑入 30px
function pscStone(x, y, w, h, color, phrase, step, op, slide = 1, dashed = false) {
  if (op <= 0.001 || w <= 2 || h <= 2) return '';
  const dy = 30 * (1 - Math.max(0, Math.min(1, slide)));
  const fill = color === PSC_ORANGE ? 'rgba(240,178,122,.12)' : color === PSC_BLUE ? 'rgba(127,182,217,.12)' : 'rgba(242,193,78,.12)';
  const rich = w >= 80 && h >= 60;
  let g = `<g transform="translate(0 ${pscN(dy)})" opacity="${pscO(op)}"><rect x="${pscN(x)}" y="${pscN(y)}" width="${pscN(w)}" height="${pscN(h)}" rx="14" fill="${dashed ? 'none' : fill}" stroke="${color}" stroke-width="${w < 50 ? 4 : 5}"${dashed ? ' stroke-dasharray="8 6"' : ''}/>`;
  if (!dashed && rich) g += `<path d="M${pscN(x + 12)} ${pscN(y + 14)} l10 8 M${pscN(x + w - 24)} ${pscN(y + h - 16)} l10 -8" fill="none" stroke="rgba(239,233,216,.35)" stroke-width="2"/>`;
  g += '</g>';
  if (phrase && step && rich) {
    g += pscLabel(x + w / 2, y + 30, step, 24, 'rgba(239,233,216,.75)', op) + pscLabel(x + w / 2, y + 76, phrase, 30, PSC_CREAM, op);
  } else if (phrase) {
    g += pscLabel(x + w / 2, y + h / 2 + 11, phrase, 30, PSC_CREAM, op);
  }
  return g;
}

// 小牆（圖示用，無字）
function pscWall(x, top, w, bottom, op = 1, dashed = false) {
  if (op <= 0.001) return '';
  let g = `<g opacity="${pscO(op)}"><rect x="${pscN(x)}" y="${pscN(top)}" width="${pscN(w)}" height="${pscN(bottom - top)}" fill="${dashed ? 'none' : 'rgba(239,233,216,.04)'}" stroke="${PSC_CREAM}" stroke-width="4"${dashed ? ' stroke-dasharray="12 9"' : ''}/>`;
  if (!dashed) for (let yy = top + 36; yy < bottom; yy += 36) g += pscLine(x, yy, x + w, yy, 'rgba(239,233,216,.46)', 2);
  return g + '</g>';
}

// 主張牌：黃框木牌，label 置中
function pscBoard(x1, x2, y, h, label, op = 1, flash = 0) {
  if (op <= 0.001) return '';
  const fill = flash > 0.01 ? `rgba(242,193,78,${(0.5 * flash).toFixed(3)})` : 'rgba(242,193,78,.12)';
  return `<rect x="${pscN(x1)}" y="${pscN(y)}" width="${pscN(x2 - x1)}" height="${pscN(h)}" rx="10" fill="${fill}" stroke="${PSC_YELLOW}" stroke-width="5" opacity="${pscO(op)}"/>` +
    pscLabel((x1 + x2) / 2, y + h / 2 + 11, label, 30, PSC_CREAM, op);
}

// 小標籤（黃框深底，字 30px）
function pscTag(x, y, w, label, op = 1) {
  if (op <= 0.001) return '';
  return `<g opacity="${pscO(op)}">${box(x, y, w, 64, PSC_YELLOW, 1, 'rgba(26,43,35,.94)')}${txt(x + w / 2, y + 42, label, { a: 'middle', s: 30, w: 1, f: PSC_CREAM })}</g>`;
}

function pscCardFrame(x, y, w, h, op = 1) {
  if (op <= 0.001) return '';
  return `<g opacity="${pscO(op)}">${box(x, y, w, h, PSC_CREAM, 1, 'rgba(239,233,216,.015)')}</g>`;
}

function pscTitleCard(x, y, w, value, size, op) {
  if (op <= 0.001) return '';
  return `<g opacity="${pscO(op)}"><rect x="${x}" y="${y}" width="${w}" height="56" rx="12" fill="rgba(26,43,35,.96)" stroke="${PSC_CREAM}" stroke-width="4"/></g>` +
    txt(x + w / 2, y + 38, value, { a: 'middle', s: size, w: 1, f: PSC_YELLOW, o: op });
}

// 標題列：〈一句話的〉＋黃字「啟示」＋〉
function pscColorTitle(cx, y, before, mark, after, size, op) {
  if (op <= 0.001) return '';
  return `<text x="${cx}" y="${y}" text-anchor="middle" font-size="${size}" font-weight="700" fill="${PSC_CREAM}" opacity="${pscO(op)}">` +
    `<tspan fill="${PSC_CREAM}" style="fill:${PSC_CREAM}">${esc(before)}</tspan>` +
    `<tspan fill="${PSC_YELLOW}" style="fill:${PSC_YELLOW}">${esc(mark)}</tspan>` +
    `<tspan fill="${PSC_CREAM}" style="fill:${PSC_CREAM}">${esc(after)}</tspan></text>`;
}

function pscStageTitle(u, value) {
  return pscLabel(800, 240, value, 36, PSC_YELLOW, pscK(u, 0.2, 0.8));
}

function pscWorkTag(x, y, w, value, op = 1) {
  return pscLabel(x + w / 2, y, value, 34, PSC_CREAM, op);
}

// 小柱（三根，各寬 10、高 34、間距 16，無字）
function pscMiniPillars(cx, cy, op = 1) {
  if (op <= 0.001) return '';
  let g = `<g opacity="${pscO(op)}">`;
  [-21, -5, 11].forEach((dx) => { g += `<rect x="${cx + dx}" y="${cy - 17}" width="10" height="34" fill="rgba(239,233,216,.06)" stroke="${PSC_CREAM}" stroke-width="3"/>`; });
  return g + '</g>';
}

// 小卷軸（寬 44、高 30，兩側小軸，無字）
function pscMiniScroll(cx, cy, op = 1) {
  if (op <= 0.001) return '';
  return `<g opacity="${pscO(op)}"><rect x="${cx - 18}" y="${cy - 11}" width="36" height="22" fill="rgba(239,233,216,.06)" stroke="${PSC_CREAM}" stroke-width="2.5"/>` +
    pscPath(`M${cx - 20} ${cy - 15} V${cy + 15} M${cx + 20} ${cy - 15} V${cy + 15}`, PSC_CREAM, 4, 1) + '</g>';
}

// 粉筆小人（nod 為點頭進度）
function pscDoll(cx, cy, scale = 1, op = 1, nod = 0) {
  const dy = 10 * Math.sin(Math.PI * Math.max(0, Math.min(1, nod)));
  return `<g transform="translate(${pscN(cx)} ${pscN(cy + dy)}) scale(${pscN(scale)})" opacity="${pscO(op)}" stroke-linecap="round" stroke-linejoin="round">` +
    `<circle cx="0" cy="-72" r="31" fill="rgba(240,217,189,.55)" stroke="${PSC_CREAM}" stroke-width="5"/>` +
    `<path d="M-28 -77 Q-21 -112 4 -105 Q27 -99 29 -75 Q9 -90 -4 -87 Q-18 -83 -28 -77Z" fill="${PSC_WOOD}" stroke="${PSC_CREAM}" stroke-width="3"/>` +
    `<path d="M-43 43 Q-40 -28 0 -28 Q40 -28 43 43Z" fill="rgba(127,182,217,.28)" stroke="${PSC_CREAM}" stroke-width="5"/>` +
    `<path d="M-37 -5 L-70 26 M37 -5 L70 26 M-19 43 L-30 91 M19 43 L30 91" fill="none" stroke="${PSC_CREAM}" stroke-width="9"/>` +
    `<circle cx="-10" cy="-67" r="3" fill="${PSC_WOOD}"/><circle cx="10" cy="-67" r="3" fill="${PSC_WOOD}"/></g>`;
}

// 四段地圖（右上角）：active＝1–4 為亮起的那段，0 為全部不亮；op 為整組淡入
function pscMiniMap(active, op = 1) {
  if (op <= 0.001) return '';
  const xs = [1150, 1246, 1342, 1438], names = ['一段', '二段', '三段', '四段'];
  let g = `<g opacity="${pscO(op)}">`;
  xs.forEach((x, i) => {
    const on = active === i + 1;
    g += `<rect x="${x}" y="200" width="86" height="50" rx="8" fill="${on ? 'rgba(242,193,78,.35)' : 'rgba(127,182,217,.30)'}" stroke="${on ? PSC_YELLOW : PSC_CREAM}" stroke-width="${on ? 4 : 2}"/>`;
    g += txt(x + 43, 236, names[i], { a: 'middle', s: 30, w: 1, f: PSC_CREAM, o: on ? 1 : 0.7 });
  });
  return g + '</g>';
}

// 一行多色文字置中：parts＝[[文字, 顏色], …]，每段一個 tspan（fill 與 style 都寫）
function pscRich(cx, y, parts, size = 30, op = 1) {
  if (op <= 0.001) return '';
  const spans = parts.map(([t, c]) => `<tspan fill="${c}" style="fill:${c}">${esc(t)}</tspan>`).join('');
  return `<text x="${cx}" y="${y}" class="t-chalk" font-size="${size}" font-weight="700" text-anchor="middle" fill="${PSC_CREAM}" opacity="${pscO(op)}">${spans}</text>`;
}

// ===== 各段 =====

// ===================== three.js 圖層（WebGL 畫布墊在 SVG 後方，只由 u 決定）=====================
// 用法：在場景函式開頭呼叫 PscGL.show('s3', u, 15)；沒有立體畫面的段呼叫 PscGL.show(null, u, len)。
// 立體場景用 PscGL.register('s3', (THREE) => ({ scene, camera, update(u) {...} })) 註冊；build 只執行一次，update 每次 seek 都呼叫。
// 隨機請用 PscGL.rand(i, k)（固定種子），不要用 Math.random。
// 物件可帶 viewport: { x, y, w, h }（舞台座標）只畫在小窗內；相機 aspect 要等於 w／h。
const PscGL = (() => {
  let renderer = null, canvas = null, failed = false;
  const scenes = {};
  function ensure() {
    if (renderer || failed) return renderer;
    try {
      const stageEl = document.getElementById('stage');
      const board = stageEl.closest('.board') || stageEl.parentElement;
      canvas = document.createElement('canvas');
      canvas.width = 1600; canvas.height = 900;
      Object.assign(canvas.style, { position: 'absolute', left: '0', top: '0', width: '100%', height: '100%', pointerEvents: 'none', zIndex: '0', opacity: '0' });
      board.insertBefore(canvas, board.firstChild);
      Object.assign(stageEl.style, { position: 'relative', zIndex: '1' });
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
      renderer.setPixelRatio(1);
      renderer.setSize(1600, 900, false);
      renderer.setClearColor(0x000000, 0);
    } catch (e) { failed = true; renderer = null; }
    return renderer;
  }
  function fadeOf(u, len) { return Math.min(P(u, 0, 0.35), 1 - P(u, len - 0.35, len)); }
  return {
    register(id, build) { scenes[id] = { build, obj: null }; },
    show(id, u, len) {
      const r = ensure();
      if (!r) return;
      if (!id || !scenes[id]) { r.clear(); canvas.style.opacity = '0'; return; }
      const s = scenes[id];
      if (!s.obj) s.obj = s.build(THREE);
      s.obj.update(u);
      const v = s.obj.viewport; // 選用：{ x, y, w, h }（舞台座標，左上為原點），只畫在這個矩形內
      r.setScissorTest(!!v);
      r.clear();
      if (v) { r.setScissor(v.x, 900 - v.y - v.h, v.w, v.h); r.setViewport(v.x, 900 - v.y - v.h, v.w, v.h); }
      else r.setViewport(0, 0, 1600, 900);
      r.render(s.obj.scene, s.obj.camera);
      canvas.style.opacity = String(Math.max(0, fadeOf(u, len)).toFixed(3));
    },
    rand(i, k = 0) { const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453; return x - Math.floor(x); },
    get available() { return !!ensure(); },
  };
})();
