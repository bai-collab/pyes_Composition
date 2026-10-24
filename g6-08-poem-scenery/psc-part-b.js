// ===================== psc-part-b.js：g6-08 分工 B（段 s1、s3、s6、s7、s9）=====================
// 小工具前綴 pb_；three 場景 id：'b-s1'、'b-s3'、'b-s6'。build 只執行一次；update(u) 只改位置、顏色、透明度，畫面只由 u 決定。

// 舞台座標（1600×900，y 向下）→ 正交相機世界座標（原點在舞台中心，y 向上）
const pb_W = (sx, sy) => [sx - 800, 450 - sy];
// 段內淡入淡出用的群組（群組只帶 opacity，不帶 stroke；字不放在有 stroke 的群組裡）
const pb_fade = (op, inner) => (op <= 0.001 ? '' : `<g opacity="${pscO(op)}">${inner}</g>`);
// 詩句卡：半透明深底圓角矩形（獨立元素，不包住文字）
const pb_card = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="rgba(26,43,35,.82)" stroke="rgba(239,233,216,.55)" stroke-width="3"/>`;
// 多色一行，靠左對齊（詩句用；parts＝[[文字, 顏色], …]）
const pb_richLeft = (x, y, parts, size = 34) => `<text x="${x}" y="${y}" class="t-chalk" font-size="${size}" font-weight="700" text-anchor="start" fill="${PSC_CREAM}">` +
  parts.map(([t, c]) => `<tspan fill="${c}" style="fill:${c}">${esc(t)}</tspan>`).join('') + '</text>';

// build 時用 Canvas 畫的漸層貼圖（天空、牆面等）
function pb_gradTex(THREE, stops) {
  const c = document.createElement('canvas'); c.width = 4; c.height = 256;
  const g = c.getContext('2d'), gr = g.createLinearGradient(0, 0, 0, 256);
  stops.forEach(([o, col]) => gr.addColorStop(o, col));
  g.fillStyle = gr; g.fillRect(0, 0, 4, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.minFilter = THREE.LinearFilter; t.generateMipmaps = false;
  return t;
}
// 圓形柔光貼圖（月暈、星點共用）
function pb_glowTex(THREE) {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d'), gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, 'rgba(255,248,226,1)'); gr.addColorStop(0.2, 'rgba(255,240,200,.5)'); gr.addColorStop(1, 'rgba(255,240,200,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace; t.minFilter = THREE.LinearFilter; t.generateMipmaps = false;
  return t;
}
// 星點：toWorld(sx, sy) 給三維座標；reject 為真的舞台位置不放星（例如詩句卡底下）。回傳 update(u) 讓星點慢慢閃
function pb_stars(THREE, scene, n, seed, toWorld, reject) {
  const pos = [], base = [];
  for (let i = 0; base.length < n && i < n * 30; i++) {
    const sx = PscGL.rand(i, seed) * 1600, sy = PscGL.rand(i, seed + 1) * 560;
    if (reject && reject(sx, sy)) continue;
    pos.push(...toWorld(sx, sy)); base.push(0.45 + 0.55 * PscGL.rand(i, seed + 2));
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  const col = new THREE.BufferAttribute(new Float32Array(base.length * 3), 3);
  geo.setAttribute('color', col);
  const mat = new THREE.PointsMaterial({ size: 7, sizeAttenuation: false, map: pb_glowTex(THREE), vertexColors: true, transparent: true, depthWrite: false });
  scene.add(new THREE.Points(geo, mat));
  return (u) => {
    base.forEach((b, i) => { const k = b * (0.84 + 0.16 * Math.sin(u * 0.9 + i * 1.7)); col.setXYZ(i, k, k * 0.96, k * 0.82); });
    col.needsUpdate = true;
  };
}

// ===== s1 童詩不是只有字少：左右兩張字卡＋小窗裡的夜海月光路 =====
function s1(u) {
  PscGL.show('b-s1', u, 14);
  let g = pb_fade(pscK(u, 0.5, 1.0), box(110, 280, 620, 200) +
    pscPhrase(150, 360, '晚上月亮出來了，月光照在海上、', 30, 'rgba(239,233,216,.78)') +
    pscPhrase(150, 410, '樹上和窗戶上，很漂亮。', 30, 'rgba(239,233,216,.78)'));
  g += pb_fade(pscK(u, 2.5, 3.0), box(870, 280, 620, 140) +
    pscPhrase(910, 334, '月光灑在海上，', 34, PSC_CREAM) +
    pscPhrase(910, 384, '海浪鋪成一條銀色的路；', 34, PSC_CREAM));
  g += pscLabel(420, 620, '字少，畫面多', 36, PSC_YELLOW, pscK(u, 8.5, 9.0));
  g += pb_fade(pscK(u, 0.5, 1.0), box(866, 446, 628, 348)); // 小窗外圍的白粉筆細框
  return pscPaint(pscHead(u, 0) + g);
}
PscGL.register('b-s1', (THREE) => {
  const scene = new THREE.Scene();
  // 小窗：相機水平看出去，地平線在窗的正中央；月亮在夜空上方，月光路從地平線鋪到窗底
  const cam = new THREE.PerspectiveCamera(50, 620 / 340, 0.1, 3000);
  cam.position.set(0, 8, 0); cam.lookAt(0, 8, -100);
  const sky = new THREE.Mesh(new THREE.PlaneGeometry(2400, 1400), new THREE.MeshBasicMaterial({
    map: pb_gradTex(THREE, [[0, '#03091a'], [0.38, '#0b1d38'], [0.5, '#1b3d62'], [0.56, '#102a48'], [1, '#0a2038']]), depthWrite: false }));
  sky.position.set(0, 8, -1200); scene.add(sky);
  const sea = new THREE.Mesh(new THREE.PlaneGeometry(3000, 1100), new THREE.MeshBasicMaterial({ color: 0x0a2238 }));
  sea.rotation.x = -Math.PI / 2; sea.position.set(0, 0, -556); scene.add(sea);
  const stars = pb_stars(THREE, scene, 46, 11, (sx, sy) => [(sx - 800) * 0.9, 8 + sy * 0.4, -900]);
  const moonPos = [0, 96, -520];
  const moon = new THREE.Mesh(new THREE.CircleGeometry(40, 48), new THREE.MeshBasicMaterial({ color: 0xfff4d6 }));
  moon.position.set(...moonPos); scene.add(moon);
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: pb_glowTex(THREE), color: 0xffe9b0, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.45 }));
  halo.position.set(...moonPos); halo.scale.set(150, 150, 1); scene.add(halo);
  // 月光路：梯形水面（外暈、內亮兩層），頂點依距離分級；遠處（靠近月亮）先亮、近處後亮，約 u 4–8 慢慢鋪到眼前
  const near = 17, far = 520, K = 16;
  const seaC = new THREE.Color(0x0a2238), goldC = new THREE.Color(0xfff0b8);
  const ds = Array.from({ length: K + 1 }, (_, k) => near * Math.pow(far / near, k / K));
  const layers = [[(d) => 1.2 + 0.035 * d, 0.4, 1], [(d) => 0.6 + 0.02 * d, 1, 2]].map(([hw, peak, order]) => {
    const sh = new THREE.Shape();
    ds.forEach((d, k) => (k ? sh.lineTo(-hw(d), d) : sh.moveTo(-hw(d), d)));
    for (let k = K; k >= 0; k--) sh.lineTo(hw(ds[k]), ds[k]);
    const geo = new THREE.ShapeGeometry(sh);
    const cnt = geo.attributes.position.count, cols = new THREE.BufferAttribute(new Float32Array(cnt * 3), 3);
    geo.setAttribute('color', cols);
    const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true, depthTest: false }));
    mesh.rotation.x = -Math.PI / 2; mesh.renderOrder = order; scene.add(mesh);
    const dd = [], ph = [];
    for (let j = 0; j < cnt; j++) {
      const d = geo.attributes.position.getY(j), gg = Math.log(d / near) / Math.log(far / near);
      dd.push(d); ph.push(4 + 3.2 * (1 - gg));
    }
    return { cols, cnt, dd, ph, peak };
  });
  return {
    scene, camera: cam, viewport: { x: 870, y: 450, w: 620, h: 340 },
    update(u) {
      stars(u);
      halo.material.opacity = 0.42 + 0.06 * Math.sin(u * 0.7);
      layers.forEach(({ cols, cnt, dd, ph, peak }) => {
        for (let j = 0; j < cnt; j++) {
          const b = peak * pscK(u, ph[j], ph[j] + 1.0) * (0.92 + 0.08 * Math.sin(u * 1.1 + dd[j] * 0.25));
          cols.setXYZ(j, seaC.r + (goldC.r - seaC.r) * b, seaC.g + (goldC.g - seaC.g) * b, seaC.b + (goldC.b - seaC.b) * b);
        }
        cols.needsUpdate = true;
      });
    },
  };
});
// 正交相機用的山脊剪影：pts 為舞台座標（x 須由 0 到 1600），下方補到畫面底
function pb_ridge(THREE, scene, pts, color, z) {
  const sh = new THREE.Shape();
  pts.forEach(([sx, sy], i) => { const [x, y] = pb_W(sx, sy); if (i) sh.lineTo(x, y); else sh.moveTo(x, y); });
  sh.lineTo(...pb_W(1600, 900)); sh.lineTo(...pb_W(0, 900));
  const m = new THREE.Mesh(new THREE.ShapeGeometry(sh), new THREE.MeshBasicMaterial({ color }));
  m.position.z = z; scene.add(m);
}

// ===== s3 月亮像一盞燈：詩句卡＋山後升起的月、慢慢點亮的光暈 =====
function s3(u) {
  PscGL.show('b-s3', u, 15);
  let g = pb_fade(pscK(u, 0.3, 0.9), pb_card(110, 230, 650, 160) +
    pb_richLeft(150, 298, [['月亮', PSC_YELLOW], ['悄悄爬上山頭，', PSC_CREAM]]) +
    pb_richLeft(150, 348, [['像一盞剛點亮的', PSC_CREAM], ['燈', PSC_YELLOW], ['。', PSC_CREAM]]));
  g += pscTag(620, 306, 120, '比喻', pscK(u, 1.5, 2.0));
  return pscPaint(pscHead(u, 2) + g);
}
PscGL.register('b-s3', (THREE) => {
  const scene = new THREE.Scene();
  const cam = new THREE.OrthographicCamera(-800, 800, 450, -450, 0.1, 2000);
  cam.position.set(0, 0, 1000);
  const sky = new THREE.Mesh(new THREE.PlaneGeometry(1600, 900), new THREE.MeshBasicMaterial({
    map: pb_gradTex(THREE, [[0, '#050e1d'], [0.5, '#0d2442'], [0.78, '#1a3a5e'], [1, '#203f63']]), depthWrite: false }));
  sky.position.set(0, 0, -900); scene.add(sky);
  const stars = pb_stars(THREE, scene, 120, 23, (sx, sy) => [...pb_W(sx, sy), -850], (sx, sy) => sx < 790 && sy < 410);
  // 月：先藏在山脊後面，u 1–7 緩緩升起；暗色到亮色，光暈 u 6–10 由小變大
  const dimC = new THREE.Color(0x6b7a95), brightC = new THREE.Color(0xfff4d8);
  const moon = new THREE.Group(); moon.position.set(330, 0, -800); scene.add(moon);
  const disc = new THREE.Mesh(new THREE.CircleGeometry(50, 64), new THREE.MeshBasicMaterial({ color: 0x6b7a95 }));
  moon.add(disc);
  [[-18, 12, 9], [14, -16, 6], [22, 20, 5]].forEach(([x, y, r]) => {
    const c = new THREE.Mesh(new THREE.CircleGeometry(r, 24), new THREE.MeshBasicMaterial({ color: 0xc9bd98, transparent: true, opacity: 0.35, depthWrite: false }));
    c.position.set(x, y, 0.1); moon.add(c);
  });
  const haloM = new THREE.SpriteMaterial({ map: pb_glowTex(THREE), color: 0xffd98a, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0 });
  const halo = new THREE.Sprite(haloM); halo.scale.set(120, 120, 1); moon.add(halo);
  // 山：遠山較亮、近山較暗，兩層剪影；1130 那座山峰是月亮升起的地方
  pb_ridge(THREE, scene, [[0, 640], [140, 600], [300, 650], [470, 560], [640, 600], [800, 520], [960, 560], [1060, 500], [1130, 470], [1230, 520], [1320, 500], [1420, 540], [1520, 500], [1600, 540]], 0x17324f, -400);
  pb_ridge(THREE, scene, [[0, 760], [170, 700], [380, 740], [560, 690], [760, 740], [960, 690], [1160, 650], [1340, 700], [1500, 660], [1600, 690]], 0x0b1a2c, -200);
  return {
    scene, camera: cam, viewport: { x: 0, y: 0, w: 1600, h: 900 },
    update(u) {
      stars(u);
      const k = ease(P(u, 1, 7)), h = ease(P(u, 6, 10));
      moon.position.y = 450 - lerp(560, 300, k);
      disc.material.color.copy(dimC).lerp(brightC, P(u, 1, 10));
      halo.scale.setScalar(lerp(120, 360, h));
      haloM.opacity = 0.9 * h;
    },
  };
});

// ===== s6 月光灑在窗前：窗、斜照的光塊、窗台上的貓；地上的貓影慢慢拉長 =====
function pb_cat(THREE, mat) {
  // 貓（坐姿剪影）：座尾為原點，舞台座標（y 向下）換成 three 座標時 y 取反；K 為縮放
  const K = 0.8, V = (x, y) => new THREE.Vector2(x * K, -y * K);
  const ell = (cx, cy, rx, ry, n = 36) => Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2; return V(cx + rx * Math.cos(a), cy + ry * Math.sin(a)); });
  const parts = [ell(0, -48, 44, 46), ell(18, -104, 30, 29), [V(-6, -122), V(2, -162), V(22, -128)], [V(14, -126), V(32, -160), V(40, -118)]];
  // 尾巴：二次貝茲的帶狀多邊形，由根部細細往上翹
  const P0 = [36, -18], P1 = [96, -6], P2 = [86, -100], N = 12, L = [], R = [];
  for (let i = 0; i <= N; i++) {
    const t = i / N, bx = (1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * P1[0] + t * t * P2[0], by = (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * P1[1] + t * t * P2[1];
    const tx = 2 * (1 - t) * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0]), ty = 2 * (1 - t) * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1]);
    const len = Math.hypot(tx, ty), nx = -ty / len, ny = tx / len, w = (10 - 7 * t) / 2;
    L.push(V(bx + nx * w, by + ny * w)); R.unshift(V(bx - nx * w, by - ny * w));
  }
  parts.push([...L, ...R]);
  const g = new THREE.Group();
  parts.forEach((pts) => { const m = new THREE.Mesh(new THREE.ShapeGeometry(new THREE.Shape(pts)), mat); g.add(m); });
  return g;
}
PscGL.register('b-s6', (THREE) => {
  const scene = new THREE.Scene();
  const cam = new THREE.OrthographicCamera(-800, 800, 450, -450, 0.1, 2000);
  cam.position.set(0, 0, 1000);
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(1600, 900), new THREE.MeshBasicMaterial({
    map: pb_gradTex(THREE, [[0, '#0a1728'], [0.7, '#15263d'], [1, '#1a2d46']]), depthWrite: false }));
  wall.position.set(0, 0, -900); scene.add(wall);
  const flat = (w, h, sx, sy, z, color, extra = {}) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color, ...extra })); m.position.set(...pb_W(sx, sy), z); scene.add(m); return m; };
  flat(1600, 200, 800, 800, -800, 0x0a1424);
  flat(1600, 12, 800, 706, -799, 0x1c2f48);
  // 窗：暖色窗框、夜空玻璃、十字窗櫺；窗內左上一輪月
  flat(460, 370, 1110, 425, -700, 0xb07a4a);
  const glass = new THREE.MeshBasicMaterial({ map: pb_gradTex(THREE, [[0, '#0b1830'], [1, '#1d3a5e']]), depthWrite: false });
  const gm = new THREE.Mesh(new THREE.PlaneGeometry(428, 338), glass); gm.position.set(...pb_W(1110, 425), -695); scene.add(gm);
  flat(16, 338, 1110, 425, -690, 0xb07a4a);
  flat(428, 16, 1110, 425, -690, 0xb07a4a);
  const moon = new THREE.Mesh(new THREE.CircleGeometry(30, 48), new THREE.MeshBasicMaterial({ color: 0xfff4d6 }));
  moon.position.set(...pb_W(1000, 330), -688); scene.add(moon);
  const haloM = new THREE.SpriteMaterial({ map: pb_glowTex(THREE), color: 0xdbe8ff, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: 0.35 });
  const halo = new THREE.Sprite(haloM); halo.scale.set(150, 150, 1); halo.position.set(...pb_W(1000, 330), -687); scene.add(halo);
  flat(500, 20, 1110, 616, -640, 0xb98152);
  // 斜照進來的月光：地上一塊光、窗下一道淡淡的光束
  const beamPts = (pts) => { const sh = new THREE.Shape(); pts.forEach(([sx, sy], i) => { const [x, y] = pb_W(sx, sy); if (i) sh.lineTo(x, y); else sh.moveTo(x, y); }); return new THREE.ShapeGeometry(sh); };
  const patchM = new THREE.MeshBasicMaterial({ color: 0xf5e6b3, transparent: true, opacity: 0, depthWrite: false });
  const patch = new THREE.Mesh(beamPts([[900, 715], [1260, 715], [1080, 835], [720, 835]]), patchM); patch.position.z = -600; scene.add(patch);
  const beamM = new THREE.MeshBasicMaterial({ color: 0xf5e6b3, transparent: true, opacity: 0, depthWrite: false });
  const beam = new THREE.Mesh(beamPts([[896, 594], [1324, 594], [1260, 715], [900, 715]]), beamM); beam.position.z = -610; scene.add(beam);
  // 窗台上的貓（坐姿剪影），與地上的影子用同一個造型
  const catM = new THREE.MeshBasicMaterial({ color: 0x050c16, side: THREE.DoubleSide });
  const cat = pb_cat(THREE, catM); cat.position.set(...pb_W(1220, 606), -650); scene.add(cat);
  // 地上的影子：與貓同形，壓扁、朝窗外反方向（左）拉長
  const shadowM = new THREE.MeshBasicMaterial({ color: 0x07101d, side: THREE.DoubleSide });
  const shadow = pb_cat(THREE, shadowM); shadow.position.set(...pb_W(1000, 800), -585); scene.add(shadow);
  return {
    scene, camera: cam, viewport: { x: 0, y: 0, w: 1600, h: 900 },
    update(u) {
      patchM.opacity = 0.28 * pscK(u, 0.8, 2.0);
      beamM.opacity = 0.07 * pscK(u, 0.8, 2.0);
      const s = ease(P(u, 3, 9));
      shadow.scale.set(-lerp(0.55, 1.25, s), 0.3 + 0.03 * s, 1);
      haloM.opacity = 0.35 + 0.03 * Math.sin(u * 0.8);
    },
  };
});
// s6 的詩句：詩句卡在左上，立體畫面（窗與貓影）在右與下
function s6(u) {
  PscGL.show('b-s6', u, 14);
  let g = pb_fade(pscK(u, 0.3, 0.9), pb_card(110, 230, 650, 160) +
    pb_richLeft(150, 298, [['月光', PSC_YELLOW], ['灑在窗前，', PSC_CREAM]]) +
    pb_richLeft(150, 348, [['小貓的影子', PSC_CREAM], ['伸了個懶腰', PSC_YELLOW], ['。', PSC_CREAM]]));
  g += pscTag(620, 306, 120, '擬人', pscK(u, 1.5, 2.0));
  return pscPaint(pscHead(u, 5) + g);
}
// ===== s7 排比讓畫面一層層打開：三張句卡各配一幅 2D 小畫（海、樹、窗），最後一句收尾（不用立體）=====
function pb_pic7(k, cx, op) {
  if (op <= 0.001) return '';
  if (k === 0) { // 海浪與月光
    const wave = (y) => pscPath(`M${cx - 130} ${y} Q${cx - 95} ${y - 18} ${cx - 60} ${y} T${cx} ${y} T${cx + 60} ${y} T${cx + 130} ${y}`, PSC_BLUE, 5);
    return pb_fade(op, wave(430) + wave(490) + wave(550) +
      `<circle cx="${cx + 60}" cy="390" r="26" fill="none" stroke="${PSC_CREAM}" stroke-width="4"/>` +
      pscLine(cx - 60, 448, cx + 60, 448, PSC_YELLOW, 4) + pscLine(cx - 40, 500, cx + 40, 500, PSC_YELLOW, 4) + pscLine(cx - 25, 552, cx + 25, 552, PSC_YELLOW, 4));
  }
  if (k === 1) { // 樹與白紗
    return pb_fade(op, pscPath(`M${cx} 590 V470`, PSC_CREAM, 6) +
      `<circle cx="${cx}" cy="440" r="56" fill="rgba(239,233,216,.06)" stroke="${PSC_CREAM}" stroke-width="4"/>` +
      pscPath(`M${cx - 66} 462 Q${cx} 418 ${cx + 66} 462 L${cx + 66} 486 Q${cx} 452 ${cx - 66} 486 Z`, PSC_CREAM, 2, 0.85, 'rgba(239,233,216,.3)'));
  }
  // 窗與貓影：窗框、月光落在地上的光塊，貓的剪影
  return pb_fade(op, pscPath(`M${cx - 100} 500 H${cx + 100} L${cx + 124} 560 H${cx - 124} Z`, PSC_YELLOW, 2, 0.8, 'rgba(242,193,78,.22)') +
    pscPath(`M${cx - 60} 400 H${cx + 60} V490 H${cx - 60} Z`, PSC_CREAM, 5, 1, 'rgba(239,233,216,.06)') +
    pscLine(cx, 400, cx, 490, PSC_CREAM, 3) + pscLine(cx - 60, 445, cx + 60, 445, PSC_CREAM, 3) +
    `<path d="M${cx - 44} 560 Q${cx - 34} 520 ${cx} 526 Q${cx + 30} 520 ${cx + 40} 560 Z" fill="#050c16"/>` +
    `<circle cx="${cx + 22}" cy="516" r="14" fill="#050c16"/>`);
}
function s7(u) {
  PscGL.show(null, u, 13);
  const rows = [[110, 0.5, '海上，'], [580, 2.0, '樹梢，'], [1050, 3.5, '窗前，']];
  let g = '';
  rows.forEach(([x, s, tail], k) => {
    const cx = x + 220;
    g += pb_fade(pscK(u, s, s + 0.5), box(x, 280, 440, 330) + pscRich(cx, 335, [['月光灑在', PSC_YELLOW], [tail, PSC_CREAM]], 34));
    g += pb_pic7(k, cx, pscK(u, s + 0.4, s + 1.2));
  });
  g += pb_fade(pscK(u, 7, 7.5), box(450, 660, 700, 72) + pscLabel(800, 706, '句型一樣，景物換一個', 30, PSC_CREAM));
  return pscPaint(pscHead(u, 6) + g);
}

// ===== s9 寫景童詩四步：四張卡各配一個小圖示＋詞語，卡與卡之間的箭頭（不用立體）=====
// 卡的 x 起點為 65、445、825、1205（分鏡表原為 90、470、850、1230；右側會貼到 60px 安全邊界，故整體左移 25px，間距 50 不變）
function pb_icon9(k, cx, cy, op) {
  const C = PSC_CREAM;
  if (k === 0) return pb_fade(op, `<rect x="${cx - 40}" y="${cy - 32}" width="80" height="64" rx="6" fill="none" stroke="${C}" stroke-width="4"/>` +
    `<circle cx="${cx + 14}" cy="${cy - 12}" r="9" fill="${PSC_YELLOW}"/>` +
    pscPath(`M${cx - 40} ${cy + 24} Q${cx - 18} ${cy + 2} ${cx + 4} ${cy + 18} T${cx + 40} ${cy + 12}`, C, 3));
  if (k === 1) return pb_fade(op, pscPath(`M${cx - 40} ${cy} Q${cx} ${cy - 34} ${cx + 40} ${cy} Q${cx} ${cy + 34} ${cx - 40} ${cy} Z`, C, 4) +
    `<circle cx="${cx}" cy="${cy}" r="13" fill="${PSC_BLUE}"/><circle cx="${cx}" cy="${cy}" r="5" fill="${PSC_DEEP}"/>`);
  if (k === 2) return pb_fade(op, `<circle cx="${cx}" cy="${cy - 8}" r="22" fill="rgba(242,193,78,.35)" stroke="${PSC_YELLOW}" stroke-width="4"/>` +
    pscPath(`M${cx - 12} ${cy + 14} H${cx + 12} V${cy + 28} H${cx - 12} Z`, C, 3));
  return pb_fade(op, pscPath(`M${cx} ${cy + 28} C${cx - 50} ${cy - 6} ${cx - 22} ${cy - 36} ${cx} ${cy - 14} C${cx + 22} ${cy - 36} ${cx + 50} ${cy - 6} ${cx} ${cy + 28} Z`, PSC_ORANGE, 4, 1, 'rgba(232,135,91,.45)'));
}
function s9(u) {
  PscGL.show(null, u, 14);
  const titles = ['①選景', '②五感', '③比喻或擬人', '④感受'];
  const words = [['月夜'], ['眼：月光', '耳：沙沙', '手：涼涼的風'], ['像一盞燈', '伸了個懶腰'], ['安靜', '溫柔']];
  const xs = [65, 445, 825, 1205], starts = [0.5, 2.5, 4.5, 6.5];
  let g = '';
  xs.forEach((x, i) => {
    const cx = x + 165, s = starts[i];
    g += pb_fade(pscK(u, s, s + 0.5), box(x, 280, 330, 380) + pscLabel(cx, 330, titles[i], 34, PSC_YELLOW));
    g += pb_icon9(i, cx, 400, pscK(u, s + 0.4, s + 1.2));
    words[i].forEach((w, j) => { g += pscLabel(cx, 500 + 48 * j, w, 30, PSC_CREAM, pscK(u, s + 0.6, s + 1.4)); });
  });
  [0, 1, 2].forEach((i) => { g += pscArrowTo(xs[i] + 336, 470, xs[i + 1] - 6, 470, 1, pscK(u, 8 + 0.6 * i, 8.8 + 0.6 * i), 14); });
  return pscPaint(pscHead(u, 8) + g);
}
