// 一段裡面怎麼排？——三年級記敘文（寫人）第二集（場景檔：META＋s1…s9；段落、秒數、字幕在 timing.json）
const META = {
  title: '一段裡面怎麼排？',
  subtitle: '9 段・約 2 分鐘・三年級記敘文（寫人）第二集',
  ariaLabel: '教學動畫：接續第一集，以「我的老師」為例，說明一段裡面怎麼排。打開一塊積木，裡面是一句一句的句子；看到句號就打括號，一句一層；寫真實細節的是 a，寫感覺的是 b，先寫 a 再寫 b，像把藍色珠子用橘色蝴蝶結綁成一串；第二段也一樣，最後一段反過來，a 少、b 多；每段的重點藏在 b，全篇的重點藏在最後一段 B；開頭可以用破題法，一開始就點明題目；結尾可以用希望法或感想（感謝）法；最後換你用細目表排〈我的媽媽〉。',
  note: '出處：楊裕貿〈寫作課程規劃與有效的寫作教學──輕鬆閱讀、快樂寫作〉研習講義；三年級寫作學習單。積木、珠子、蝴蝶結、剪刀、門都是視覺比喻；示範短文〈我的老師〉與結尾示範句為依講義結構自編，人名虛構。鍵盤：空白鍵播放／暫停，左右方向鍵切換段落，F 鍵全螢幕。畫面只由時間決定。',
  works: [],
};

// ===== 本集的輔助圖形與常數（一律以 lay 開頭，避免與範本與共用圖形重名）=====
const LAY_BLUE = '#7fb6d9';
const LAY_ORANGE = '#e8875b';
const LAY_INK = '#1a2b23';
const LAY_CREAM = '#efe9d8';
const LAY_KNOT = '#c96a40';
const layk = (u, a, d = 0.7) => ease(P(u, a, a + d));
const layOut = (x) => 1 - Math.pow(1 - x, 3);
const layO = (v) => Math.max(0, Math.min(1, v)).toFixed(3);
const layW = (s, z) => [...s].length * z; // 全形字寬估算

// 積木（外觀同第一集）：x,y 左上角；studs 是上面的小凸點
function layBlock(x, y, w, h, col, op, label, size = 34, studs = true) {
  if (op <= 0.002 || w <= 2 || h <= 2) return '';
  let g = `<g opacity="${layO(op)}">`;
  if (studs && w >= 90) {
    const n = Math.max(2, Math.floor(w / 120));
    for (let i = 0; i < n; i++) g += `<rect x="${(x + w * (i + 0.5) / n - 20).toFixed(1)}" y="${(y - 10).toFixed(1)}" width="40" height="12" rx="6" fill="${col}"/>`;
  }
  g += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="14" fill="${col}" stroke="rgba(26,43,35,.45)" stroke-width="3"/>`;
  if (label) g += txt(x + w / 2, y + h / 2 + size * 0.35, label, { a: 'middle', s: size, w: 1, f: LAY_INK });
  return g + '</g>';
}
// 粉筆直線，k 是畫到哪裡（0–1）
function layLine(x1, y1, x2, y2, k, col = C.chalk, w = 4, op = 1) {
  if (k <= 0.001) return '';
  return `<line x1="${x1}" y1="${y1}" x2="${lerp(x1, x2, k).toFixed(1)}" y2="${lerp(y1, y2, k).toFixed(1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" opacity="${layO(op)}"/>`;
}
// 粉筆描線：d 是路徑，k 是描到哪裡
function layPath(d, k, col = C.chalk, w = 6, op = 1) {
  if (k <= 0.001) return '';
  return `<path d="${d}" pathLength="100" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${(Math.min(1, k) * 100).toFixed(2)} 100" opacity="${layO(op)}"/>`;
}
// 右上角小標
function layTag(op, label = '比喻', color = C.orange, w = 160) {
  return `<g opacity="${layO(op)}">${box(1540 - w, 56, w, 60, color, 1, C.deep)}${txt(1540 - w / 2, 98, label, { a: 'middle', s: 30, w: 1, f: color })}</g>`;
}
// 逐句出現：淡入加一點向上位移
function laySent(x, y, s, size, k, col = C.chalk, op = 1) {
  if (k <= 0.002) return '';
  return txt(x, y + (1 - k) * 16, s, { s: size, w: 1, f: col, o: k * op });
}
// 括號：side −1 左括號、+1 右括號；x 是括號弧線的中心；y 是文字基線
function layParen(x, y, side, k, col = C.yellow) {
  const a = x - 8 * side, b = x + 8 * side;
  return layPath(`M${a} ${y - 41} Q${b} ${y - 13} ${a} ${y + 15}`, k, col, 6);
}
// 沿折線移動：k 為 0–1（含緩動）
function layAlong(pts, k) {
  const L = []; let tot = 0;
  for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  let t = ease(k) * tot;
  for (let i = 0; i < L.length; i++) {
    if (t <= L[i] || i === L.length - 1) { const f = L[i] ? Math.min(1, t / L[i]) : 1; return [lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f)]; }
    t -= L[i];
  }
  return pts[0];
}

// 藍色珠子（a）與橘色蝴蝶結（b）：比喻。sc 是縮放，letter 只在夠大時才寫
const LAY_BR = 34;
function layBead(cx, cy, sc, op = 1) {
  const r = LAY_BR * sc;
  if (op <= 0.002 || r <= 1) return '';
  return `<g opacity="${layO(op)}"><circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="${LAY_BLUE}" stroke="rgba(26,43,35,.5)" stroke-width="3"/>` +
    `<ellipse cx="${(cx - r * 0.38).toFixed(1)}" cy="${(cy - r * 0.42).toFixed(1)}" rx="${(r * 0.26).toFixed(1)}" ry="${(r * 0.15).toFixed(1)}" fill="#ffffff" opacity=".5" transform="rotate(-35 ${(cx - r * 0.38).toFixed(1)} ${(cy - r * 0.42).toFixed(1)})"/>` +
    (r >= 26 ? txt(cx, cy + 11, 'a', { a: 'middle', s: 32, w: 1, f: LAY_INK }) : '') + '</g>';
}
function layBow(cx, cy, sc, op = 1) {
  if (op <= 0.002 || sc <= 0.05) return '';
  const w = 64 * sc, h = 40 * sc, kr = 19 * sc, st = 'rgba(26,43,35,.5)';
  const f = (n) => n.toFixed(1);
  return `<g opacity="${layO(op)}"><polygon points="${f(cx - 6 * sc)},${f(cy)} ${f(cx - w)},${f(cy - h)} ${f(cx - w)},${f(cy + h)}" fill="${LAY_ORANGE}" stroke="${st}" stroke-width="3" stroke-linejoin="round"/>` +
    `<polygon points="${f(cx + 6 * sc)},${f(cy)} ${f(cx + w)},${f(cy - h)} ${f(cx + w)},${f(cy + h)}" fill="${LAY_ORANGE}" stroke="${st}" stroke-width="3" stroke-linejoin="round"/>` +
    `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(kr)}" fill="${LAY_KNOT}" stroke="${st}" stroke-width="3"/>` +
    (sc >= 0.7 ? txt(cx, cy + 8, 'b', { a: 'middle', s: 24, w: 1, f: LAY_CREAM }) : '') + '</g>';
}
const layPiece = (kind, x, y, sc, op = 1) => (kind === 'a' ? layBead(x, y, sc, op) : layBow(x, y, sc, op));
// 先在起點長出來（pop 秒），再沿折線飛到終點（fly 秒）；到了就停在終點
function layFly(u, t0, kind, pts, pop = 0.4, fly = 1.0) {
  if (u < t0) return '';
  const kp = layOut(P(u, t0, t0 + pop)), kf = P(u, t0 + pop, t0 + pop + fly);
  const [x, y] = layAlong(pts, kf);
  return layPiece(kind, x, y, kp, 1);
}
// 原地蹦出
function layPop(u, t, kind, x, y, sc = 1, d = 0.5) {
  const k = layOut(P(u, t, t + d));
  return k <= 0.002 ? '' : layPiece(kind, x, y, k * sc, Math.min(1, k * 3));
}
// 發光
function layGlow(cx, cy, k) {
  if (k <= 0.01) return '';
  return `<g opacity="${layO(k)}"><circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(96 + 8 * k).toFixed(1)}" fill="${C.yellow}" opacity=".12"/><circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(76 + 8 * k).toFixed(1)}" fill="${C.yellow}" opacity=".2"/>` +
    `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(60 + 10 * k).toFixed(1)}" fill="none" stroke="${C.yellow}" stroke-width="5"/></g>`;
}
// 簡筆剪刀：tx,ty 是刀尖位置；ang 是刀尖指向的角度（SVG 角度，0＝向右、90＝向下）；open 是單邊張開角
function layScissors(tx, ty, ang, open, sc, op) {
  if (op <= 0.002) return '';
  const dx = Math.cos(ang * Math.PI / 180), dy = Math.sin(ang * Math.PI / 180);
  const px = tx - 122 * sc * dx, py = ty - 122 * sc * dy;
  const blade = (a) => `<g transform="rotate(${a.toFixed(2)})"><path d="M-8 -7 L122 0 L-8 7 Z" fill="#d9dfe2" stroke="${LAY_INK}" stroke-width="2.5" stroke-linejoin="round"/>` +
    `<line x1="-8" y1="0" x2="-50" y2="0" stroke="${C.red}" stroke-width="9" stroke-linecap="round"/><circle cx="-72" cy="0" r="21" fill="none" stroke="${C.red}" stroke-width="8"/></g>`;
  return `<g opacity="${layO(op)}" transform="translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${ang}) scale(${sc})">${blade(-open)}${blade(open)}<circle r="7" fill="${LAY_INK}" stroke="${C.chalk}" stroke-width="2"/></g>`;
}

// 第一集的四塊積木：位置、寬度、顏色、關鍵字
const LAY_X = [100, 341, 807, 1273];
const LAY_WD = [225, 450, 450, 225];
const LAY_COL = [LAY_BLUE, LAY_BLUE, LAY_BLUE, LAY_ORANGE];
const LAY_KEY = ['外表', '個性', '興趣', '感想／希望'];

// 示範短文〈我的老師〉（自編；逐句）
const LAY_P1 = ['我的級任老師是林老師。', '她個子小小的，頭髮短短的。', '她戴著圓圓的眼鏡，每天都穿球鞋。', '她看起來像一位活力滿滿的大姐姐。'];
const LAY_P2 = ['林老師很有耐心。', ['有一次我的數學題算錯了三次，她沒有生氣，', '蹲在我旁邊，一步一步陪我再算一遍。'], '我覺得老師像一盞溫暖的燈。'];
const LAY_P4 = ['老師每天認真教我們、陪我們。', '我想，她一定很辛苦。', '我希望老師每天都健康、快樂。'];

// ---------- s1 打開一塊積木 ----------
function lay1(u) {
  let g = head(u, '開場', '打開一塊積木') + layTag(layk(u, 0.3, 0.5));
  const Y = 400, H = 120;
  const fo = layk(u, 0.1, 0.5), other = 1 - layk(u, 1.4, 0.6);
  // 其他三塊與小字（先淡出，外表才移動，避免途中交疊）
  for (let i = 1; i < 4; i++) g += layBlock(LAY_X[i], Y, LAY_WD[i], H, LAY_COL[i], fo * other, LAY_KEY[i], 34);
  g += txt(800, 590, '上一集的四塊積木', { a: 'middle', s: 28, f: C.dim, o: layk(u, 0.5, 0.5) * other });
  // 抽屜：藏在外表積木後面，往下拉開
  const mv = layk(u, 2.2, 1.2), d = layk(u, 3.8, 1.6);
  const x = lerp(100, 300, mv), y = lerp(Y, 230, mv), w = lerp(225, 1000, mv), h = lerp(H, 130, mv);
  if (d > 0.002) {
    const dh = 20 + 350 * d;
    g += `<rect x="340" y="340" width="920" height="${dh.toFixed(1)}" rx="16" fill="${LAY_CREAM}" stroke="${LAY_BLUE}" stroke-width="8"/>`;
    g += `<rect x="760" y="${(340 + dh - 34).toFixed(1)}" width="80" height="16" rx="8" fill="${C.dim}"/>`;
    [420, 500, 580, 660].forEach((ly, i) => {
      const k = P(u, 5.4 + i * 0.6, 6.0 + i * 0.6);
      g += layLine(400, ly, 400 + 800 * [0.9, 0.7, 0.95, 0.5][i], ly, k, i === 3 ? LAY_ORANGE : LAY_INK, 9);
    });
  }
  g += layBlock(x, y, w, h, LAY_BLUE, fo, '外表', lerp(34, 48, mv));
  const yo = layk(u, 8.2, 0.8);
  g += txt(800, 800, '一段裡面，也有順序', { a: 'middle', s: 54, w: 1, f: C.yellow, o: yo });
  return g;
}

// ---------- s2 沿著句號剪開 ----------
const LAY_RY = [300, 430, 560, 690];
const LAY_TIP = LAY_P1.map((s, i) => [300 + layW(s, 36) - 18, LAY_RY[i] - 22]);
const LAY_CUT = [4.9, 6.7, 8.5, 10.3];
function layScisState(u) {
  const T = LAY_TIP;
  const mvT = [[5.8, 6.6], [7.6, 8.4], [9.4, 10.2]];
  let x, y;
  if (u < 4.8) { const k = layk(u, 3.9, 0.9); x = lerp(T[0][0] + 260, T[0][0], k); y = lerp(T[0][1] - 80, T[0][1], k); }
  else {
    let idx = 0;
    mvT.forEach(([a], i) => { if (u >= a) idx = i + 1; });
    x = T[idx][0]; y = T[idx][1];
    if (idx > 0) {
      const [a, b] = mvT[idx - 1], k = layk(u, a, b - a);
      if (k < 1) {
        const A = T[idx - 1], B = T[idx], cx = Math.max(A[0], B[0]) + 130, cy = (A[1] + B[1]) / 2;
        x = (1 - k) * (1 - k) * A[0] + 2 * (1 - k) * k * cx + k * k * B[0];
        y = (1 - k) * (1 - k) * A[1] + 2 * (1 - k) * k * cy + k * k * B[1];
      }
    }
  }
  { const kp = layk(u, 11.2, 0.6); x += 68 * kp; y += 8 * kp; } // 最後一剪之後，退開一點停在句尾旁
  let open = 11;
  LAY_CUT.forEach((t) => { if (u >= t && u <= t + 0.8) open = 3 + 8 * (0.5 + 0.5 * Math.cos(4 * Math.PI * (u - t) / 0.8)); });
  return [x, y, open, layk(u, 3.9, 0.5)];
}
function lay2(u) {
  let g = head(u, '分層次', '沿著句號剪開') + layTag(layk(u, 0.3, 0.5));
  LAY_P1.forEach((s, i) => {
    const y = LAY_RY[i], end = 300 + layW(s, 36);
    g += laySent(300, y, s, 36, layk(u, 0.4 + i * 0.9, 0.6));
    const kb = P(u, LAY_CUT[i] + 0.2, LAY_CUT[i] + 0.55);
    g += layParen(282, y, -1, kb) + layParen(end + 14, y, 1, kb);
    g += txt(100, y, `第${i + 1}層`, { s: 30, w: 1, f: C.yellow, o: layk(u, LAY_CUT[i] + 0.4, 0.5) });
  });
  const [sx, sy, open, op] = layScisState(u);
  g += layScissors(sx, sy, 125, open, 1, op);
  g += txt(800, 810, '看到句號，就打一個括號', { a: 'middle', s: 42, w: 1, f: C.yellow, o: layk(u, 11.4, 0.8) });
  return g;
}

// ---------- s3 珠子和蝴蝶結 ----------
const LAY3_Y = [270, 360, 450, 540];
const LAY3_X = [330, 590, 850], LAY3_BOW = 1110, LAY3_SY = 690;
function lay3(u) {
  let g = head(u, '分層次', '珠子和蝴蝶結') + layTag(layk(u, 0.3, 0.5));
  // 串線（畫在珠子後面）
  g += layLine(250, LAY3_SY, 1190, LAY3_SY, P(u, 9.0, 9.9), C.chalk, 5, 0.9);
  // 句子：①②③ 縮小飛走，④ 留下變淡
  const T0 = [3.0, 4.1, 5.2];
  LAY_P1.forEach((s, i) => {
    const y = LAY3_Y[i], kin = layk(u, 0.1 + i * 0.12, 0.5);
    if (i < 3) {
      const ks = P(u, T0[i], T0[i] + 0.4);
      const sc = 1 - 0.5 * ks;
      if (ks < 1) g += `<g transform="translate(300 ${y}) scale(${sc.toFixed(3)}) translate(-300 ${-y})">${txt(300, y, s, { s: 36, w: 1, o: kin * (1 - ks) })}</g>`;
    } else {
      const gh = 1 - 0.5 * layk(u, 7.4, 0.6);
      g += txt(300, y, s, { s: 36, w: 1, o: kin * gh });
    }
  });
  // ④ 劃紅線、標 b
  const kl = P(u, 1.2, 2.3);
  g += layLine(300, 558, 876, 558, ease(kl), C.red, 7, 1);
  g += txt(920, 556, 'b', { s: 44, w: 1, f: LAY_ORANGE, o: layk(u, 2.2, 0.5) });
  // 三顆珠子：從句子左端冒出，走左邊的通道下來，落到串線上
  for (let i = 0; i < 3; i++) {
    const a = LAY3_Y[i] - 13;
    g += layFly(u, T0[i], 'a', [[322, a], [210, a], [210, 625], [LAY3_X[i], 625], [LAY3_X[i], LAY3_SY]], 0.4, 1.5);
  }
  // 蝴蝶結：從 ④ 旁邊長出來，飛到三顆珠子右邊
  g += layFly(u, 7.4, 'b', [[1040, 520], [LAY3_BOW, LAY3_SY]], 0.5, 1.0);
  // 細目小字
  ['名字', '身材、五官', '五官、服裝'].forEach((s, i) => {
    g += txt(LAY3_X[i], 772, s, { a: 'middle', s: 28, f: C.chalk, o: layk(u, T0[i] + 1.7, 0.5) });
  });
  g += txt(LAY3_BOW, 772, '感覺', { a: 'middle', s: 28, f: LAY_ORANGE, o: layk(u, 8.8, 0.5) });
  g += txt(800, 330, '先寫 a，再寫 b', { a: 'middle', s: 58, w: 1, f: C.yellow, o: layk(u, 10.3, 0.8) });
  return g;
}

// ---------- s4 第二段也一樣 ----------
function lay4(u) {
  let g = head(u, '分層次', '第二段也一樣') + layTag(layk(u, 0.3, 0.5));
  const tags = [['個性', LAY_BLUE], ['舉例', LAY_BLUE], ['感覺', LAY_ORANGE]];
  const rowY = [350, 450, 610], frame = [[275, 305, 322, 62], [275, 406, 730, 114], [275, 566, 492, 62]];
  const tl = [1.3, 2.9, 4.5], sIn = [0.5, 2.0, 3.6];
  const ghost = [1, 2, 3].map((_, i) => 1 - 0.55 * layk(u, 5.6 + i * 0.9, 0.6));
  // 三個細目標籤
  tags.forEach(([lab, col], i) => {
    const x = 300 + i * 230, ap = layk(u, 0.3 + i * 0.1, 0.5), lit = layk(u, tl[i], 0.4);
    g += `<g opacity="${layO(ap)}"><rect x="${x}" y="195" width="190" height="58" rx="14" fill="${C.yellow}" fill-opacity="${(0.04 + 0.2 * lit).toFixed(3)}" stroke="${lit > 0.5 ? C.yellow : col}" stroke-width="${lit > 0.5 ? 5 : 3}"/>` +
      txt(x + 95, 236, lab, { a: 'middle', s: 32, w: 1, f: lit > 0.5 ? C.yellow : col }) + '</g>';
  });
  // 三句（②斷兩行）；亮起的句子外面套黃框，下一個亮起時前一個淡出
  [LAY_P2[0], LAY_P2[1], LAY_P2[2]].forEach((s, i) => {
    const k = layk(u, sIn[i], 0.7), op = ghost[i];
    if (Array.isArray(s)) { g += laySent(300, 450, s[0], 34, k, C.chalk, op) + laySent(300, 502, s[1], 34, k, C.chalk, op); }
    else g += laySent(300, rowY[i], s, 34, k, C.chalk, op);
    const fo = layk(u, tl[i], 0.4) * (1 - layk(u, tl[i + 1] ?? 5.4, 0.4));
    const f = frame[i];
    if (fo > 0.01) g += `<rect x="${f[0]}" y="${f[1]}" width="${f[2]}" height="${f[3]}" rx="20" fill="rgba(242,193,78,.08)" stroke="${C.yellow}" stroke-width="5" stroke-dasharray="16 12" opacity="${layO(fo)}"/>`;
  });
  // 收成一串：珠子從句子右端冒出，往右再往下，落到畫面下方
  const X = [1100, 1280, 1440], SY = 790;
  g += layLine(1040, SY, 1500, SY, P(u, 8.9, 9.6), C.chalk, 5, 0.9);
  const anc = [[300 + layW(LAY_P2[0], 34) + 40, 338], [300 + layW(LAY_P2[1][0], 34) + 42, 476], [300 + layW(LAY_P2[2], 34) + 40, 598]];
  const kinds = ['a', 'a', 'b'], T0 = [5.6, 6.5, 7.4];
  for (let i = 0; i < 3; i++) g += layFly(u, T0[i], kinds[i], [anc[i], [X[i], anc[i][1]], [X[i], SY]], 0.4, 1.0);
  return g;
}

// ---------- s5 最後一段反過來 ----------
function lay5(u) {
  let g = head(u, '分層次', '最後一段反過來') + layTag(layk(u, 0.3, 0.5));
  const rowY = [280, 360, 440], SY = 560;
  const ghost = 1 - 0.55 * layk(u, 4.2, 1.5);
  LAY_P4.forEach((s, i) => { g += laySent(300, rowY[i], s, 34, layk(u, 0.4 + i * 1.0, 0.7), C.chalk, ghost); });
  // 右：段四 1 顆藍珠＋2 個橘蝴蝶結
  const RX = [1000, 1160, 1320], rk = ['a', 'b', 'b'], T0 = [4.0, 4.9, 5.8];
  g += layLine(930, SY, 1400, SY, P(u, 6.6, 7.2), C.chalk, 5, 0.9);
  for (let i = 0; i < 3; i++) {
    const a = [300 + layW(LAY_P4[i], 34) + 40, rowY[i] - 13];
    g += layFly(u, T0[i], rk[i], [a, [RX[i], a[1]], [RX[i], SY]], 0.4, 1.0);
  }
  // 左：段一 3 顆藍珠＋1 個橘蝴蝶結
  const LX = [190, 350, 510, 670], lk = ['a', 'a', 'a', 'b'];
  g += layLine(120, SY, 740, SY, P(u, 5.0, 6.4), C.chalk, 5, 0.9);
  for (let i = 0; i < 4; i++) g += layPop(u, 5.0 + i * 0.4, lk[i], LX[i], SY, 1, 0.5);
  g += txt(430, 690, 'A 段：a 多、b 少', { a: 'middle', s: 38, w: 1, f: C.yellow, o: layk(u, 7.0, 0.7) });
  g += txt(1160, 690, 'B 段：a 少、b 多', { a: 'middle', s: 38, w: 1, f: C.yellow, o: layk(u, 7.8, 0.7) });
  return g;
}

// ---------- s6 重點藏在 b ----------
function lay6(u) {
  let g = head(u, '找重點', '重點藏在 b') + layTag(layk(u, 0.3, 0.5));
  const RY = [250, 370, 490], names = ['段一', '段二', '段四'];
  const rows = [['a', 'a', 'a', 'b'], ['a', 'a', 'b'], ['a', 'b', 'b']];
  const BX = [230, 360, 490, 620];
  const SCB = 0.94, SCW = 0.85;
  // 四個橘蝴蝶結：[列, 位置]、發光時間、右側直列的位置
  const bows = [[0, 3], [1, 2], [2, 2], [2, 1]];
  const slotY = [250, 340, 430, 520], G0 = 2.4, GS = 0.8, MG = 6.4;
  const BLK = { x: 1180, y: 285, w: 280, h: 170 }, ctr = [BLK.x + BLK.w / 2, BLK.y + BLK.h / 2];
  // 三串（橘蝴蝶結要飛走，所以先畫珠子與線，蝴蝶結另外處理）
  rows.forEach((r, ri) => {
    const fi = layk(u, 0.3 + ri * 0.5, 0.6), y = RY[ri];
    g += txt(80, y + 10, names[ri], { s: 28, f: C.dim, o: fi });
    g += layLine(200, y, BX[r.length - 1] + 40, y, 1, C.chalk, 5, 0.9 * fi);
    r.forEach((kd, j) => {
      if (kd === 'a') g += layBead(BX[j], y, SCB, fi);
    });
  });
  bows.forEach(([ri, j], bi) => {
    const fi = layk(u, 0.3 + ri * 0.5, 0.6), y = RY[ri], g0 = G0 + bi * GS;
    const glow = P(u, g0, g0 + 0.4) * (1 - P(u, g0 + 0.9, g0 + 1.4));
    const kf = layk(u, g0 + 0.5, 0.9), km = P(u, MG + bi * 0.1, MG + 0.8 + bi * 0.1);
    let x = lerp(BX[j], 900, kf), yy = lerp(y, slotY[bi], kf), sc = SCW, op = fi;
    if (km > 0) { const e = ease(km); x = lerp(900, ctr[0], e); yy = lerp(slotY[bi], ctr[1], e); sc = SCW * (1 - 0.7 * e); op = 1 - P(km, 0.8, 1); }
    if (u > g0 + 1.0) g += `<ellipse cx="${BX[j]}" cy="${y}" rx="${(54 * SCW + 4).toFixed(1)}" ry="${(34 * SCW).toFixed(1)}" fill="none" stroke="${LAY_ORANGE}" stroke-width="3" stroke-dasharray="9 8" opacity="${layO(0.55 * fi)}"/>`;
    g += layGlow(x, yy, glow);
    g += layBow(x, yy, sc, op);
  });
  // 橘色 B 積木
  g += layBlock(BLK.x, BLK.y, BLK.w, BLK.h, LAY_ORANGE, layk(u, 5.8, 0.5), 'B', 60);
  // 黃字卡
  const co = layk(u, 7.4, 0.6);
  g += `<g opacity="${layO(co)}">${box(300, 590, 1000, 210, C.yellow, 1, C.deep)}</g>`;
  g += txt(800, 672, '每段的重點藏在 b', { a: 'middle', s: 50, w: 1, f: C.yellow, o: layk(u, 7.6, 0.7) });
  g += txt(800, 756, '全篇的重點藏在 B', { a: 'middle', s: 50, w: 1, f: C.yellow, o: layk(u, 8.6, 0.7) });
  return g;
}

// ---------- s7 開頭：破題法 ----------
function lay7(u) {
  let g = head(u, '開頭結尾', '開頭：破題法') + layTag(layk(u, 0.3, 0.5));
  const dop = layk(u, 0.3, 0.6), sx = 1 - 0.92 * layk(u, 4.4, 1.8);
  // 門框與門後的房間
  g += `<g opacity="${layO(dop)}"><rect x="100" y="260" width="300" height="440" rx="10" fill="#14231c" stroke="${C.chalk}" stroke-width="6"/></g>`;
  // 題目卡（門打開之後才看得到）
  const ck = layk(u, 5.4, 0.8);
  if (ck > 0.01) g += `<g opacity="${layO(ck)}">${box(120, 420, 260, 110, C.yellow, 1, '#2c4a3b')}${txt(250, 487, '〈我的老師〉', { a: 'middle', s: 36, w: 1, f: C.yellow })}</g>`;
  // 門板：以左邊為軸，水平縮放打開
  g += `<g opacity="${layO(dop)}" transform="translate(100 0) scale(${sx.toFixed(3)} 1) translate(-100 0)">` +
    `<rect x="100" y="260" width="300" height="440" rx="10" fill="#8a6240" stroke="${C.chalk}" stroke-width="5"/>` +
    `<rect x="130" y="295" width="240" height="170" rx="8" fill="none" stroke="#6e4c31" stroke-width="5"/><rect x="130" y="495" width="240" height="170" rx="8" fill="none" stroke="#6e4c31" stroke-width="5"/>` +
    `<circle cx="365" cy="485" r="12" fill="${C.yellow}"/></g>`;
  // 第 ① 句
  g += laySent(640, 488, LAY_P1[0], 40, layk(u, 0.9, 0.7));
  const hf = layk(u, 2.8, 0.9);
  if (hf > 0.01) g += hframe(610, 430, 500, 90, hf, '', C.yellow, 0.6);
  // 箭頭：從第①句指向題目卡
  g += arrow(604, 475, 392, 475, C.yellow, layk(u, 6.8, 0.3), false, layk(u, 6.8, 1.0));
  // 定義卡
  const dk = layk(u, 9.0, 0.8);
  g += `<g opacity="${layO(dk)}">${box(640, 590, 840, 170, C.yellow, 1, C.deep)}${txt(1060, 665, '破題法', { a: 'middle', s: 50, w: 1, f: C.yellow })}${txt(1060, 726, '一開始就點明題目', { a: 'middle', s: 38, f: C.chalk })}</g>`;
  return g;
}

// ---------- s8 結尾：兩種出口 ----------
function lay8(u) {
  let g = head(u, '開頭結尾', '結尾：兩種出口');
  g += txt(800, 265, LAY_P4[0], { a: 'middle', s: 34, w: 1, o: layk(u, 0.4, 0.7) });
  g += txt(800, 335, LAY_P4[1], { a: 'middle', s: 34, w: 1, o: layk(u, 1.6, 0.7) });
  // 兩個出口的箭頭與格子
  const ak = layk(u, 3.4, 0.8);
  g += arrow(750, 365, 440, 468, C.yellow, 1, false, ak) + arrow(850, 365, 1160, 468, C.yellow, 1, false, ak);
  const bo = layk(u, 3.6, 0.8);
  g += `<g opacity="${layO(bo)}">${box(100, 480, 690, 320, C.chalk, 1, C.deep)}${box(810, 480, 690, 320, C.chalk, 1, C.deep)}</g>`;
  // 左格：希望法
  g += chip(130, 505, 170, '希望法', layk(u, 4.8, 0.6), C.yellow, 34, 62);
  g += laySent(130, 635, LAY_P4[2], 34, layk(u, 5.6, 0.7));
  g += txt(130, 735, '說出心中的希望與期待', { s: 30, f: C.dim, o: layk(u, 7.0, 0.7) });
  // 右格：感想（感謝）法
  g += chip(840, 505, 300, '感想（感謝）法', layk(u, 8.8, 0.6), C.yellow, 34, 62);
  g += laySent(840, 625, '我好感謝林老師，有她陪著我們學習，', 34, layk(u, 9.6, 0.7));
  g += laySent(840, 685, '我覺得好幸福。', 34, layk(u, 10.4, 0.7));
  g += txt(840, 760, '寫出心裡的想法、感情', { s: 30, f: C.dim, o: layk(u, 11.8, 0.7) });
  g += txt(1500, 836, '示範句為自編', { a: 'end', c: 't-body', s: 24, f: C.dim, o: layk(u, 4.0, 0.8) });
  return g;
}

// ---------- s9 換你替文章長肉 ----------
// 估算字寬：半形字母、數字、句點約 0.55 個字級，其餘當全形
const layEst = (s, z) => [...s].reduce((a, c) => a + (c.charCodeAt(0) < 128 ? 0.55 : 1) * z, 0);
const LAY9_COLS = [
  { key: '媽媽的外表', cells: [['1.身材', 'a'], ['2.五官', 'a'], ['3.服裝', 'a'], ['b.感覺', 'b']] },
  { key: '媽媽的個性', cells: [['1.個性', 'a'], ['2.舉例', 'a'], ['b.感覺', 'b']] },
  { key: '媽媽的專長', cells: [['1.介紹專長', 'a'], ['2.特別的表現', 'a'], ['b.感覺', 'b']] },
  { key: '對媽媽的感謝', cells: [['1.每天的工作', 'a'], ['b.感覺', 'b'], ['b.感謝或希望', 'b']] },
];
function lay9(u) {
  let g = head(u, '練習', '換你替文章長肉') + layTag(layk(u, 0.3, 0.5));
  g += txt(1340, 100, '第一集：骨架 → 第二集：長肉', { a: 'end', s: 30, w: 1, f: C.yellow, o: layk(u, 0.6, 0.6) });
  g += txt(100, 222, '〈我的媽媽〉', { s: 36, w: 1, f: C.yellow, o: layk(u, 0.3, 0.6) });
  const BX = [100, 460, 820, 1180], BW = 330, BY = 262, BH = 88;
  LAY9_COLS.forEach((col, i) => {
    const kb = layk(u, 0.5 + i * 0.5, 0.6);
    g += layBlock(BX[i], BY + (1 - layOut(P(u, 0.5 + i * 0.5, 1.1 + i * 0.5))) * -36, BW, BH, i < 3 ? LAY_BLUE : LAY_ORANGE, Math.min(1, kb * 3), col.key, 30);
    const t0 = 3.0 + i * 1.8;
    col.cells.forEach(([name, kind], r) => {
      const k = layk(u, t0 + r * 0.4, 0.5);
      if (k <= 0.002) return;
      const x = BX[i], y = 364 + r * 86 - (1 - k) * 28, h = 76, isB = kind === 'b';
      g += `<g opacity="${layO(k)}"><rect x="${x}" y="${y.toFixed(1)}" width="${BW}" height="${h}" rx="14" fill="${isB ? 'rgba(232,135,91,.16)' : 'rgba(239,233,216,.04)'}" stroke="${isB ? C.orange : C.chalk}" stroke-width="3"/>` +
        `<circle cx="${x + 24}" cy="${(y + h / 2).toFixed(1)}" r="11" fill="${isB ? LAY_ORANGE : LAY_BLUE}"/>` +
        txt(x + 46, y + h / 2 + 10, name, { s: 28, w: 1, f: isB ? LAY_ORANGE : C.chalk }) +
        `<line x1="${(x + 46 + layEst(name, 28) + 12).toFixed(1)}" y1="${(y + h / 2 + 12).toFixed(1)}" x2="${x + BW - 18}" y2="${(y + h / 2 + 12).toFixed(1)}" stroke="${C.dim}" stroke-width="3" stroke-linecap="round"/></g>`;
    });
  });
  g += txt(800, 800, '排好細目，再一段一段說出來、寫下來', { a: 'middle', s: 44, w: 1, f: C.yellow, o: layk(u, 10.0, 0.8) });
  return g;
}

// ===== 場景包裝：範本的 .t-chalk／.t-body 以 CSS fill 蓋掉 SVG fill 屬性，這裡把 fill 同步寫進 style，讓 txt() 的 f 顏色生效 =====
const laypaint = (svg) => svg.replace(/<text ([^>]*?)fill="([^"]+)"/g, '<text $1style="fill:$2" fill="$2"');
function s1(u) { return laypaint(lay1(u)); }
function s2(u) { return laypaint(lay2(u)); }
function s3(u) { return laypaint(lay3(u)); }
function s4(u) { return laypaint(lay4(u)); }
function s5(u) { return laypaint(lay5(u)); }
function s6(u) { return laypaint(lay6(u)); }
function s7(u) { return laypaint(lay7(u)); }
function s8(u) { return laypaint(lay8(u)); }
function s9(u) { return laypaint(lay9(u)); }
