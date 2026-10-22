// 寫人的文章怎麼搭骨架？——三年級記敘文（寫人）第一集（場景檔：META＋s1…s9；段落、秒數、字幕在 timing.json）
const META = {
  title: '寫人的文章怎麼搭骨架？',
  subtitle: '9 段・約 2 分鐘・三年級記敘文（寫人）',
  ariaLabel: '教學動畫：以「我的老師」為題，說明三年級記敘文（寫人）怎麼搭骨架。記敘文有兩種積木：A 寫真的人、真的事，B 寫心裡的想法和感情；先蒐集外表、個性、興趣等材料，挑三樣各寫一段，最後一段寫 B；四段長短像鳳頭、豬肚、豹尾，比例 1 比 2 比 2 比 1；一段只放一件事，避免分太寬與分太碎；B 可以寫感想、希望、祝福、讚美、懷念；四塊積木翻面就是示範短文〈我的老師〉；最後換你用大綱表練習〈我的媽媽〉。',
  note: '出處：楊裕貿〈寫作課程規劃與有效的寫作教學──輕鬆閱讀、快樂寫作〉研習講義；三年級寫作學習單。鳳頭、豬肚、豹尾是原講義的比喻；積木、泡泡是視覺比喻；示範短文〈我的老師〉為依講義結構自編，人名虛構。鍵盤：空白鍵播放／暫停，左右方向鍵切換段落，F 鍵全螢幕。畫面只由時間決定。',
  works: [],
};

// ===== 本集的輔助圖形與常數（一律以 eps 開頭，避免與範本與共用圖形重名）=====
const EPS_BLUE = '#7fb6d9';
const EPS_ORANGE = '#e8875b';
const EPS_INK = '#1a2b23';
const EPS_CREAM = '#efe9d8';
const epsk = (u, a, d = 0.7) => ease(P(u, a, a + d));
const epsOut = (x) => 1 - Math.pow(1 - x, 3);
const epsO = (v) => Math.max(0, Math.min(1, v)).toFixed(3);
// 積木：x,y 左上角；label 為空字串就不寫字；studs 是上面的小凸點
function epsBlock(x, y, w, h, col, op, label, size = 34, studs = true) {
  if (op <= 0.002 || w <= 2 || h <= 2) return '';
  let g = `<g opacity="${epsO(op)}">`;
  if (studs && w >= 90) {
    const n = Math.max(2, Math.floor(w / 120));
    for (let i = 0; i < n; i++) g += `<rect x="${(x + w * (i + 0.5) / n - 20).toFixed(1)}" y="${(y - 10).toFixed(1)}" width="40" height="12" rx="6" fill="${col}"/>`;
  }
  g += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="14" fill="${col}" stroke="rgba(26,43,35,.45)" stroke-width="3"/>`;
  if (label) g += txt(x + w / 2, y + h / 2 + size * 0.35, label, { a: 'middle', s: size, w: 1, f: EPS_INK });
  return g + '</g>';
}
// 粉筆描線：d 是路徑，k 是描到哪裡（0–1）
function epsPath(d, k, col = C.chalk, w = 6, op = 1) {
  if (k <= 0.001) return '';
  return `<path d="${d}" pathLength="100" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${(Math.min(1, k) * 100).toFixed(2)} 100" opacity="${epsO(op)}"/>`;
}
function epsLine(x1, y1, x2, y2, k, col = C.chalk, w = 4, op = 1) {
  if (k <= 0.001) return '';
  return `<line x1="${x1}" y1="${y1}" x2="${lerp(x1, x2, k).toFixed(1)}" y2="${lerp(y1, y2, k).toFixed(1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" opacity="${epsO(op)}"/>`;
}
// 手繪感圓圈：橢圓加一點抖動，頭尾不接在一起（像手畫的），k 是畫到哪裡
function epsHand(cx, cy, rx, ry, k, col = C.yellow, w = 8) {
  if (k <= 0.001) return '';
  const N = 90, n = Math.floor(N * Math.min(1, k));
  let d = '';
  for (let i = 0; i <= n; i++) {
    const t = i / N, a = -2.2 + t * (Math.PI * 2 + 0.5);
    const m = 0.93 + 0.09 * t + 0.03 * Math.sin(3 * a + 1);
    d += (i ? 'L' : 'M') + (cx + rx * m * Math.cos(a)).toFixed(1) + ' ' + (cy + ry * m * Math.sin(a)).toFixed(1);
  }
  return `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
}
// 右上角小標（比喻）
function epsTag(op, label = '比喻', color = C.orange, w = 160) {
  return `<g opacity="${epsO(op)}">${box(1540 - w, 56, w, 60, color, 1, C.deep)}${txt(1540 - w / 2, 98, label, { a: 'middle', s: 30, w: 1, f: color })}</g>`;
}
// 泡泡：lop 是裡面字的透明度
function epsBubble(cx, cy, r, label, col, op, size = 34, lop = 1) {
  if (op <= 0.002 || r <= 1) return '';
  return `<g opacity="${epsO(op)}"><circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="${col}" fill-opacity=".16" stroke="${col}" stroke-width="5"/>` +
    `<path d="M${(cx - r * 0.58).toFixed(1)} ${(cy - r * 0.42).toFixed(1)} A${(r * 0.72).toFixed(1)} ${(r * 0.72).toFixed(1)} 0 0 1 ${(cx - r * 0.1).toFixed(1)} ${(cy - r * 0.78).toFixed(1)}" fill="none" stroke="${col}" stroke-width="4" stroke-linecap="round" opacity=".6"/>` +
    (lop > 0.002 ? txt(cx, cy + size * 0.35, label, { a: 'middle', s: size, w: 1, f: col, o: lop }) : '') + '</g>';
}
// 水平縮放翻面：sx 為 0–1，繞 cx 縮放
const epsFlipOpen = (cx, sx) => `<g transform="translate(${cx} 0) scale(${Math.max(sx, 0.001).toFixed(3)} 1) translate(${-cx} 0)">`;

// 四塊積木 1：2：2：1 的位置與寬度、顏色、關鍵字
const EPS_X = [100, 341, 807, 1273];
const EPS_W = [225, 450, 450, 225];
const EPS_COL = [EPS_BLUE, EPS_BLUE, EPS_BLUE, EPS_ORANGE];
const EPS_KEY = ['外表', '個性', '興趣', '感想／希望'];
// 六顆泡泡（外表、個性、興趣、專長、難忘的事、工作）
const EPS_BUB = [['外表', C.blue], ['個性', C.yellow], ['興趣', C.green], ['專長', C.purple], ['難忘的事', '#e3b7d6'], ['工作', C.chalk]];

// ---------- s1 題目來了 ----------
function eps1(u) {
  let g = head(u, '開場', '題目來了');
  [['我', 520], ['的', 690], ['老', 890], ['師', 1060]].forEach(([c, x], i) => {
    const k = epsk(u, 0.8 + i * 0.8, 0.6);
    g += txt(x, 470 + (1 - k) * 24, c, { a: 'middle', s: 150, w: 1, o: k });
  });
  // 粉筆圈住「老師」
  g += epsHand(975, 420, 205, 120, P(u, 4.5, 6.5));
  // 右下：寫一個人 → 記敘文（寫人）
  const ck = epsk(u, 7.4, 0.8);
  g += `<g opacity="${epsO(ck)}" transform="translate(${((1 - ck) * 60).toFixed(1)} 0)">${box(940, 690, 580, 100, C.chalk, 1, C.deep)}` +
    txt(970, 752, '寫一個人', { s: 38, w: 1, f: C.blue }) + arrow(1150, 740, 1210, 740, C.chalk, 1, false, epsk(u, 8.0, 0.5)) +
    txt(1225, 752, '記敘文（寫人）', { s: 38, w: 1, f: C.yellow }) + '</g>';
  g += txt(100, 790, '三上先學：寫人類', { c: 't-body', s: 30, f: C.dim, o: epsk(u, 9.2, 0.7) });
  return g;
}

// ---------- s2 兩種積木 ----------
function epsDrop(k) { // 落下：先加速落地，再小彈一下；回傳 1（高處）→ 0（落地）
  if (k <= 0) return 1;
  if (k >= 1) return 0;
  if (k < 0.78) { const f = k / 0.78; return 1 - f * f; }
  return 0.06 * Math.sin(Math.PI * (k - 0.78) / 0.22);
}
function eps2(u) {
  let g = head(u, '記敘文', '兩種積木') + epsTag(epsk(u, 0.4, 0.5));
  const defs = [
    { x: 140, col: EPS_BLUE, t0: 1.0, lab: 'A 真的人、真的事', ex: '老師戴著圓眼鏡', t1: 4.0 },
    { x: 980, col: EPS_ORANGE, t0: 6.5, lab: 'B 心裡的想法和感情', ex: '我希望老師健康', t1: 9.5 },
  ];
  defs.forEach((d) => {
    const k = P(u, d.t0, d.t0 + 1.0);
    const y = 250 - epsDrop(k) * 520;
    g += epsBlock(d.x, y, 480, 150, d.col, Math.min(1, k * 4), '', 34);
    // 標籤貼上去（蓋章感：由大縮小）
    const lk = epsk(u, d.t0 + 1.2, 0.4), cx = d.x + 240, cy = 325, sc = 1.25 - 0.25 * lk;
    g += `<g opacity="${epsO(lk)}" transform="translate(${cx} ${cy}) scale(${sc.toFixed(3)}) translate(${-cx} ${-cy})">` +
      `<rect x="${d.x + 30}" y="293" width="420" height="64" rx="12" fill="${EPS_CREAM}"/>` +
      txt(cx, 337, d.lab, { a: 'middle', s: 34, w: 1, f: EPS_INK }) + '</g>';
    // 小例子卡：從積木底下掉出來
    const ck = epsk(u, d.t1, 0.9);
    const cy2 = lerp(410, 520, epsOut(ck));
    g += `<g opacity="${epsO(ck)}">${box(d.x + 40, cy2, 400, 90, d.col, 1, C.deep)}${txt(cx, cy2 + 58, d.ex, { a: 'middle', s: 34, w: 1 })}</g>`;
  });
  g += txt(800, 790, '記敘文以敘述為主', { a: 'middle', c: 't-body', s: 34, f: C.dim, o: epsk(u, 11.0, 0.8) });
  return g;
}

// ---------- s3 蒐集材料 ----------
const EPS_RING = [[514, 405], [800, 285], [1086, 405], [1086, 635], [800, 755], [514, 635]];
function epsPerson(op) {
  return `<g opacity="${epsO(op)}" stroke-linejoin="round">` +
    `<path d="M715 650 Q715 508 800 508 Q885 508 885 650 Z" fill="${EPS_BLUE}" stroke="${C.chalk}" stroke-width="4"/>` +
    `<circle cx="800" cy="440" r="54" fill="#f0d9bd" stroke="${C.chalk}" stroke-width="4"/>` +
    `<path d="M746 436 Q748 380 800 380 Q852 380 854 436 Q832 408 800 408 Q768 408 746 436 Z" fill="#4a3a2e" stroke="${C.chalk}" stroke-width="3"/>` +
    `<circle cx="778" cy="446" r="15" fill="none" stroke="${EPS_INK}" stroke-width="4"/><circle cx="822" cy="446" r="15" fill="none" stroke="${EPS_INK}" stroke-width="4"/>` +
    `<line x1="793" y1="446" x2="807" y2="446" stroke="${EPS_INK}" stroke-width="4"/>` +
    `<circle cx="778" cy="446" r="3" fill="${EPS_INK}"/><circle cx="822" cy="446" r="3" fill="${EPS_INK}"/>` +
    `<path d="M783 470 Q800 484 817 470" fill="none" stroke="${EPS_INK}" stroke-width="4" stroke-linecap="round"/></g>`;
}
function eps3(u) {
  let g = head(u, '動筆之前', '蒐集材料') + epsTag(epsk(u, 0.4, 0.5));
  g += epsPerson(epsk(u, 0.6, 1.0));
  EPS_BUB.forEach(([lab, col], i) => {
    const t0 = 2.4 + i * 1.3, f = epsOut(P(u, t0, t0 + 1.1));
    if (f <= 0) return;
    const amp = 5 * P(u, t0 + 1.1, t0 + 2.0);
    const x = lerp(800, EPS_RING[i][0], f), y = lerp(440, EPS_RING[i][1], f) + amp * Math.sin(1.7 * (u - t0) + i);
    g += epsBubble(x, y, 78 * (0.25 + 0.75 * f), lab, col, Math.min(1, f * 3), lab.length >= 4 ? 28 : 32);
  });
  g += txt(596, 722, '……', { a: 'start', s: 48, w: 1, f: C.chalk, o: epsk(u, 10.0, 0.7) });
  return g;
}

// ---------- s4 挑三樣，一段一樣 ----------
function eps4(u) {
  let g = head(u, '排段落', '挑三樣，一段一樣');
  const so = epsk(u, 1.0, 0.8);
  for (let i = 0; i < 4; i++) {
    const x = 100 + i * 360;
    g += `<rect x="${x}" y="620" width="320" height="130" rx="18" fill="rgba(239,233,216,.04)" stroke="${C.dim}" stroke-width="3" stroke-dasharray="12 10" opacity="${epsO(so)}"/>`;
    g += txt(x + 160, 792, ['段一', '段二', '段三', '段四'][i], { a: 'middle', s: 30, w: 1, o: so });
    g += txt(x + 160, 830, i < 3 ? 'A 真人真事' : 'B 思想感情', { a: 'middle', c: 't-body', s: 24, f: i < 3 ? C.blue : C.orange, o: so });
  }
  const dim = epsk(u, 7.9, 0.8);
  EPS_BUB.forEach(([lab, col], i) => {
    const bx = 245 + i * 222, ap = epsk(u, 0.3 + i * 0.15, 0.6);
    if (i < 3) {
      const t0 = 2.4 + i * 1.8, f = epsOut(P(u, t0, t0 + 1.0)), sh = epsk(u, t0 + 1.0, 0.7);
      const sx = 100 + i * 360 + 160;
      g += epsBubble(lerp(bx, sx, f), lerp(330, 685, f), 72 * (1 - sh), lab, col, ap, lab.length >= 4 ? 28 : 32, 1 - P(u, t0 + 1.0, t0 + 1.3));
      const bk = epsk(u, t0 + 1.0, 0.7), sc = 0.2 + 0.8 * bk, w = 320 * sc, h = 130 * sc;
      g += epsBlock(sx - w / 2, 685 - h / 2, w, h, EPS_BLUE, bk, EPS_KEY[i], 38);
    } else {
      g += epsBubble(bx, 330 + 70 * dim, 72, lab, col, ap * (1 - 0.7 * dim), lab.length >= 4 ? 28 : 32);
    }
  });
  // 第四格落下橘積木
  const k4 = P(u, 9.0, 10.0);
  if (k4 > 0) g += epsBlock(1180, lerp(440, 620, epsOut(k4)), 320, 130, EPS_ORANGE, Math.min(1, k4 * 3), '感想／希望', 34);
  const to = epsk(u, 10.4, 0.8);
  g += txt(800, 228, '並列：材料一樣一樣排開', { a: 'middle', s: 44, w: 1, f: C.yellow, o: to });
  g += underline(556, 1044, 246, epsk(u, 11.0, 0.6), C.yellow, to);
  return g;
}

// ---------- s5 鳳頭、豬肚、豹尾 ----------
function eps5(u) {
  let g = head(u, '排段落', '鳳頭、豬肚、豹尾');
  const ap = epsk(u, 0.2, 0.6), sk = epsk(u, 1.0, 2.0);
  for (let i = 0; i < 4; i++) {
    const x = lerp(100 + i * 360, EPS_X[i], sk), w = lerp(320, EPS_W[i], sk);
    g += epsBlock(x, 520, w, 120, EPS_COL[i], ap, EPS_KEY[i], 34);
  }
  // 鳳凰頭（側面鳥頭＋冠羽）
  const bird = [
    ['M177 440 A38 38 0 1 1 253 440 A38 38 0 1 1 177 440', 3.4, 4.0],
    ['M181 430 L140 446 L182 456', 3.9, 4.3],
    ['M198 474 Q206 490 203 502', 4.1, 4.5], ['M236 470 Q232 488 236 502', 4.1, 4.5],
    ['M222 404 Q226 366 262 352', 4.3, 4.7], ['M232 408 Q250 376 292 374', 4.5, 4.9], ['M242 416 Q272 398 306 412', 4.7, 5.1],
  ];
  bird.forEach(([d, a, b]) => { g += epsPath(d, P(u, a, b), C.chalk, 6); });
  g += dot(203, 432, 5, C.chalk, epsk(u, 4.0, 0.3));
  g += txt(212, 300, '鳳頭', { a: 'middle', s: 44, w: 1, f: C.yellow, o: epsk(u, 5.2, 0.5) });
  // 豬肚（圓滾滾的弧線）
  g += epsPath('M341 505 Q799 245 1257 505', P(u, 5.8, 7.4), C.chalk, 6);
  g += txt(800, 300, '豬肚', { a: 'middle', s: 44, w: 1, f: C.yellow, o: epsk(u, 7.5, 0.5) });
  // 豹尾（長而上翹的尾巴）
  g += epsPath('M1285 505 C1340 530 1420 500 1440 420 C1455 360 1440 340 1470 320', P(u, 8.2, 9.6), C.chalk, 6);
  g += txt(1385, 300, '豹尾', { a: 'middle', s: 44, w: 1, f: C.yellow, o: epsk(u, 9.7, 0.5) });
  // 字數
  ['約 75～100 字', '約 150～200 字', '約 150～200 字', '約 75～100 字'].forEach((s, i) => {
    g += txt(EPS_X[i] + EPS_W[i] / 2, 700, s, { a: 'middle', c: 't-body', s: 26, f: C.chalk, o: epsk(u, 10.4 + i * 0.25, 0.5) });
  });
  g += txt(800, 790, '長短比例 1：2：2：1', { a: 'middle', s: 44, w: 1, f: C.yellow, o: epsk(u, 11.4, 0.6) });
  return g;
}

// ---------- s6 一段只放一件事 ----------
function eps6(u) {
  let g = head(u, '排段落', '一段只放一件事');
  const Y = 400, H = 120;
  const row = epsk(u, 0.2, 0.6), dim = epsk(u, 0.6, 0.5);
  const out1 = 1 - epsk(u, 4.0, 0.4), out2 = 1 - epsk(u, 8.0, 0.4);
  const restore = epsk(u, 4.4, 0.3);
  const base = row * (1 - 0.7 * dim);

  g += txt(100, 345, '反例一', { s: 34, w: 1, f: C.yellow, o: epsk(u, 0.6, 0.4) * out1 });
  g += txt(100, 345, '反例二', { s: 34, w: 1, f: C.yellow, o: epsk(u, 4.4, 0.4) * out2 });

  // 段四（一直淡淡的，到反例結束才退場）
  if (u < 8.5) g += epsBlock(EPS_X[3], Y, EPS_W[3], H, EPS_ORANGE, base * out2, EPS_KEY[3], 34);

  // 段一：反例一裡淡淡的；反例二裡長大、被切成三小塊
  if (u < 8.5) {
    const gk = epsk(u, 4.6, 0.4), op1 = row * (1 - 0.7 * dim * (1 - restore)) * out2;
    if (u < 5.3) {
      g += epsBlock(100, Y, lerp(225, 630, gk), H, EPS_BLUE, op1, '外表', 34);
    } else {
      const sp = epsk(u, 5.3, 0.4), pw = lerp(210, 190, sp), gap = 30 * sp;
      ['頭髮', '眼鏡', '鞋子'].forEach((lab, i) => {
        const x = 100 + i * (pw + gap);
        g += epsBlock(x, Y, pw, H, EPS_BLUE, op1, '', 34);
        g += txt(x + pw / 2, Y + H / 2 + 12, lab, { a: 'middle', s: 34, w: 1, f: EPS_INK, o: op1 * epsk(u, 5.4, 0.3) });
      });
    }
    // 切刀虛線
    const ck = P(u, 5.0, 5.3), cop = (1 - epsk(u, 5.3, 0.4)) * out2;
    if (ck > 0 && cop > 0.01) [310, 520].forEach((x) => { g += `<line x1="${x}" y1="385" x2="${x}" y2="${lerp(385, 535, ck).toFixed(1)}" stroke="${C.red}" stroke-width="5" stroke-dasharray="10 8" stroke-linecap="round" opacity="${epsO(cop)}"/>`; });
    g += cross(870, 460, 26, epsk(u, 5.6, 0.4) * out2);
    g += txt(925, 477, '分太碎', { s: 46, w: 1, f: C.red, o: epsk(u, 5.7, 0.3) * out2 });
  }

  // 反例一：個性、興趣被推進同一格
  if (u < 4.5) {
    const sk = epsk(u, 1.0, 0.5);
    g += epsBlock(lerp(341, 353, sk), lerp(Y, 415, sk), lerp(450, 200, sk), lerp(H, 90, sk), EPS_BLUE, row * out1, '個性', 34);
    g += epsBlock(EPS_X[2], Y, EPS_W[2], H, EPS_BLUE, row * (1 - epsk(u, 1.0, 0.4)) * out1, '興趣', 34);
    const sl = epsOut(P(u, 1.4, 2.0));
    g += epsBlock(lerp(1000, 579, sl), 415, 200, 90, EPS_BLUE, epsk(u, 1.4, 0.3) * out1, '興趣', 34);
    const fo = epsk(u, 1.0, 0.5) * out1, bk = epsk(u, 2.0, 0.4);
    const wob = u > 2.0 ? 6 * Math.sin((u - 2.0) * 16) * (1 - P(u, 2.0, 3.0)) : 0;
    g += `<rect x="${(341 - 12 * bk - wob).toFixed(1)}" y="${(392 - 12 * bk).toFixed(1)}" width="${(450 + 90 * bk + wob * 2).toFixed(1)}" height="${(136 + 24 * bk).toFixed(1)}" rx="18" fill="none" stroke="${C.chalk}" stroke-width="4" opacity="${epsO(fo)}"/>`;
    g += epsPath('M760 380 L738 418 L770 452 L746 488 L768 540', P(u, 2.4, 2.8), C.red, 6, out1);
    g += cross(930, 460, 26, epsk(u, 2.8, 0.4) * out1);
    g += txt(985, 477, '分太寬', { s: 46, w: 1, f: C.red, o: epsk(u, 2.9, 0.4) * out1 });
  }

  // 結尾：四塊積木回到 1：2：2：1
  const fk = epsk(u, 8.5, 0.5);
  if (fk > 0) {
    for (let i = 0; i < 4; i++) g += epsBlock(EPS_X[i], Y, EPS_W[i], H, EPS_COL[i], fk, EPS_KEY[i], 34);
    const tk = epsk(u, 9.2, 0.5);
    g += tick(600, 632, 26, tk);
    g += txt(840, 650, '一段只放一件事', { a: 'middle', s: 52, w: 1, f: C.yellow, o: tk });
    g += txt(800, 740, '四塊積木回到 1：2：2：1', { a: 'middle', s: 38, f: C.dim, o: epsk(u, 9.8, 0.5) });
  }
  return g;
}

// ---------- s7 B 可以寫什麼 ----------
function eps7(u) {
  let g = head(u, '寫感情', 'B 可以寫什麼');
  const mk = epsk(u, 0.3, 1.2);
  const bx = lerp(1180, 620, mk), by = lerp(620, 570, mk), bw = lerp(320, 360, mk), bh = lerp(130, 190, mk);
  const words = ['感想', '希望', '祝福', '讚美', '懷念', '感嘆'];
  const sel = epsk(u, 8.0, 0.5), dimk = epsk(u, 8.3, 0.6), dk = ease(P(u, 9.0, 10.1));
  words.forEach((w, i) => {
    const th = (-15 + 24 * i) * Math.PI / 180;
    const tx = 800 + 340 * Math.sin(th), ty = 570 - 340 * Math.cos(th);
    const t0 = 3.6 + i * 0.65, f = epsOut(P(u, t0, t0 + 0.9));
    if (f <= 0) return;
    let x = lerp(800, tx, f), y = lerp(570, ty, f), op = Math.min(1, f * 3);
    // 「希望」最後停在盒口正上方，卡片下緣貼著盒口
    if (i === 1) { x = lerp(tx, 800, dk); y = lerp(ty, 538, dk); } else op *= 1 - 0.5 * dimk;
    g += chip(x - 64, y - 32, 128, w, op, i === 1 && sel > 0 ? C.yellow : C.chalk, 34, 64);
    if (i === 1) g += hframe(x - 80, y - 42, 160, 74, sel, '', C.yellow, 0.6);
  });
  // 盒子（橘積木放大）
  g += epsBlock(bx, by, bw, bh, EPS_ORANGE, epsk(u, 0.1, 0.4), '', 34, false);
  g += txt(bx + bw / 2, by + bh / 2 + 12, 'B 思想感情', { a: 'middle', s: 34, w: 1, f: EPS_INK, o: epsk(u, 1.4, 0.4) });
  // 蓋子：和盒子同寬的扁長蓋板（兩個凸點），以盒子左上角為轉軸往後翻開 110 度
  const ang = -110 * epsk(u, 2.2, 1.2), lo = epsk(u, 1.5, 0.4);
  g += `<g opacity="${epsO(lo)}" transform="rotate(${ang.toFixed(2)} ${bx.toFixed(1)} ${by.toFixed(1)})">` +
    [0.25, 0.75].map((r) => `<rect x="${(bx + bw * r - 20).toFixed(1)}" y="${(by - 54).toFixed(1)}" width="40" height="12" rx="6" fill="${EPS_ORANGE}"/>`).join('') +
    `<rect x="${bx.toFixed(1)}" y="${(by - 44).toFixed(1)}" width="${bw.toFixed(1)}" height="44" rx="12" fill="${EPS_ORANGE}" stroke="rgba(26,43,35,.45)" stroke-width="3"/></g>`;
  g += txt(800, 835, '挑一種，說出你的心意', { a: 'middle', s: 34, f: C.dim, o: epsk(u, 10.2, 0.7) });
  return g;
}

// ---------- s8 拼成一篇〈我的老師〉 ----------
const EPS_BACK = [
  { s: 28, l: ['林老師：', '小個子、', '短頭髮、', '圓眼鏡'] },
  { s: 34, l: ['很有耐心：', '陪我把數學再算一遍'] },
  { s: 34, l: ['愛種植物：', '窗台的小番茄'] },
  { s: 30, l: ['希望老師', '健康快樂'] },
];
function eps8(u) {
  let g = head(u, '完成', '拼成一篇〈我的老師〉');
  const Y = 330, H = 250;
  for (let i = 0; i < 4; i++) {
    const cx = EPS_X[i] + EPS_W[i] / 2;
    const ap = P(u, 0.3 + i * 0.35, 1.1 + i * 0.35), y = Y - (1 - epsOut(ap)) * 80, op = Math.min(1, ap * 3);
    const t0 = 3.0 + i * 2.4, fk = P(u, t0, t0 + 1.2), sx = Math.abs(Math.cos(Math.PI * fk));
    g += epsFlipOpen(cx, sx);
    if (fk < 0.5) {
      g += epsBlock(EPS_X[i], y, EPS_W[i], H, EPS_COL[i], op, EPS_KEY[i], i === 3 ? 30 : 36);
    } else {
      const b = EPS_BACK[i];
      g += `<g opacity="${epsO(op)}"><rect x="${EPS_X[i]}" y="${y}" width="${EPS_W[i]}" height="${H}" rx="14" fill="${EPS_CREAM}" stroke="${EPS_COL[i]}" stroke-width="8"/>`;
      b.l.forEach((s, k) => { g += txt(cx, y + H / 2 + (k - (b.l.length - 1) / 2) * b.s * 1.45 + b.s * 0.35, s, { a: 'middle', s: b.s, w: 1, f: EPS_INK }); });
      g += '</g>';
    }
    g += '</g>';
    const lo = epsk(u, 0.8 + i * 0.35, 0.6);
    g += txt(cx, 630, ['段一', '段二', '段三', '段四'][i], { a: 'middle', s: 30, w: 1, o: lo });
    g += txt(cx, 668, i < 3 ? 'A 真人真事' : 'B 思想感情', { a: 'middle', c: 't-body', s: 26, f: i < 3 ? C.blue : C.orange, o: lo });
  }
  g += chip(127, 250, 170, '破題法', epsk(u, 4.6, 0.6), C.yellow, 32, 58);
  g += chip(1300, 250, 170, '希望法', epsk(u, 11.6, 0.6), C.yellow, 32, 58);
  g += txt(800, 775, '〈我的老師〉', { a: 'middle', s: 60, w: 1, f: C.yellow, o: epsk(u, 12.4, 0.8) });
  g += txt(1520, 830, '示範短文為自編', { a: 'end', c: 't-body', s: 24, f: C.dim, o: epsk(u, 0.8, 0.8) });
  return g;
}

// ---------- s9 換你試試 ----------
function eps9(u) {
  let g = head(u, '完成', '換你試試');
  const X = [100, 300, 800, 1500], Y = [260, 320, 390, 460, 530, 600];
  g += txt(100, 233, '題目：我的媽媽', { s: 44, w: 1, f: C.yellow, o: epsk(u, 0.2, 0.6) });
  // 粉筆線逐條畫出
  Y.forEach((y, i) => { g += epsLine(X[0], y, X[3], y, P(u, 0.8 + i * 0.25, 1.4 + i * 0.25), C.chalk, 4, 0.9); });
  X.forEach((x, j) => { g += epsLine(x, Y[0], x, Y[5], P(u, 2.3 + j * 0.3, 2.9 + j * 0.3), C.chalk, 4, 0.9); });
  const ho = epsk(u, 3.4, 0.6);
  g += txt(200, 300, '段落', { a: 'middle', s: 30, w: 1, f: C.yellow, o: ho }) + txt(550, 300, '大綱', { a: 'middle', s: 30, w: 1, f: C.yellow, o: ho }) + txt(1150, 300, '資料搜尋區', { a: 'middle', s: 30, w: 1, f: C.yellow, o: ho });
  ['一', '二', '三', '四'].forEach((n, r) => {
    const c = Y[r + 1] + 35;
    g += txt(200, c + 12, n, { a: 'middle', s: 34, w: 1, o: epsk(u, 3.8 + r * 0.15, 0.5) });
    if (r < 3) g += txt(830, c + 10, 'A 真人真事', { c: 't-body', s: 28, f: C.dim, o: epsk(u, 4.4 + r * 0.4, 0.5) });
  });
  const bo = epsk(u, 6.0, 0.6);
  g += `<rect x="804" y="534" width="692" height="62" rx="12" fill="rgba(232,135,91,.18)" stroke="${C.orange}" stroke-width="4" opacity="${epsO(bo)}"/>`;
  g += txt(830, 575, 'B 思想感情', { s: 32, w: 1, f: C.orange, o: bo });
  // 三句重點
  [['先寫 A，最後寫 B', C.blue], ['蒐集材料，一段一件事', C.green], ['頭尾短，中間長', C.yellow]].forEach(([s, col], i) => {
    const o = epsk(u, 7.0 + i * 1.2, 0.6), y = 690 + i * 62;
    g += dot(112, y - 13, 12, col, o) + txt(140, y, s, { s: 38, w: 1, o });
  });
  return g;
}

// ===== 場景包裝：範本的 .t-chalk／.t-body 以 CSS fill 蓋掉 SVG fill 屬性，這裡把 fill 同步寫進 style，讓 txt() 的 f 顏色生效 =====
const epspaint = (svg) => svg.replace(/<text ([^>]*?)fill="([^"]+)"/g, '<text $1style="fill:$2" fill="$2"');
function s1(u) { return epspaint(eps1(u)); }
function s2(u) { return epspaint(eps2(u)); }
function s3(u) { return epspaint(eps3(u)); }
function s4(u) { return epspaint(eps4(u)); }
function s5(u) { return epspaint(eps5(u)); }
function s6(u) { return epspaint(eps6(u)); }
function s7(u) { return epspaint(eps7(u)); }
function s8(u) { return epspaint(eps8(u)); }
function s9(u) { return epspaint(eps9(u)); }
