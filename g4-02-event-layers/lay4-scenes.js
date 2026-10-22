const META = {
  title: '一段裡面也要排隊',
  subtitle: '9 段・約 2 分鐘・四年級記敘文（敘事）第二集',
  ariaLabel: '用積木、串珠、漫畫、取景框和骨牌，示範一段裡的句子如何依序排列。',
  note: '出處：楊裕貿研習講義。積木、珠子、蝴蝶結、連環漫畫、取景框、骨牌是視覺比喻；示範句依講義結構自編。鍵盤：空白鍵播放／暫停，左右方向鍵切換段落，F 鍵全螢幕。畫面只由時間決定。',
  works: [],
};

const ELY_BLUE = C.blue;
const ELY_ORANGE = C.orange;
const ELY_INK = C.deep;
const ELY_SKIN = '#f0d9bd';
const ELY_BROWN = '#6e4c31';
const elyK = (u, a, b) => ease(P(u, a, b));
const elyN = (v) => Number(v).toFixed(1);
const elyO = (v) => Math.max(0, Math.min(1, Number(v) || 0)).toFixed(3);
const elyL = (a, b, k) => lerp(a, b, Math.max(0, Math.min(1, k)));

function elyTag(u) {
  return `<g opacity="${elyO(elyK(u, 0.05, 0.55))}">${box(1376, 48, 164, 60, ELY_ORANGE, 1, C.deep)}${txt(1458, 88, '比喻', { a: 'middle', s: 30, w: 1, f: ELY_ORANGE })}</g>`;
}

function elyLine(x1, y1, x2, y2, color = C.chalk, width = 5, op = 1, dash = '') {
  return `<line x1="${elyN(x1)}" y1="${elyN(y1)}" x2="${elyN(x2)}" y2="${elyN(y2)}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" opacity="${elyO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function elyPath(d, color = C.chalk, width = 6, op = 1, fill = 'none', dash = '') {
  return `<path d="${d}" fill="${fill}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" opacity="${elyO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function elyCircle(cx, cy, r, fill = 'none', stroke = C.chalk, width = 4, op = 1, dash = '') {
  return `<circle cx="${elyN(cx)}" cy="${elyN(cy)}" r="${elyN(r)}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" opacity="${elyO(op)}"${dash ? ` stroke-dasharray="${dash}"` : ''}/>`;
}

function elyBlock(x, y, w, h, color = ELY_BLUE, op = 1, dashed = false) {
  let g = `<g opacity="${elyO(op)}">`;
  if (!dashed) {
    const n = Math.max(2, Math.floor(w / 125));
    for (let i = 0; i < n; i++) {
      const cx = x + w * (i + 0.5) / n;
      g += `<rect x="${elyN(cx - 19)}" y="${elyN(y - 10)}" width="38" height="13" rx="6" fill="${color}"/>`;
    }
  }
  g += `<rect x="${elyN(x)}" y="${elyN(y)}" width="${elyN(w)}" height="${elyN(h)}" rx="16" fill="${dashed ? 'rgba(239,233,216,.015)' : (color === ELY_ORANGE ? 'rgba(232,135,91,.18)' : 'rgba(127,182,217,.18)')}" stroke="${dashed ? C.dim : C.chalk}" stroke-width="5"${dashed ? ' stroke-dasharray="14 11"' : ''}/>`;
  return g + '</g>';
}

function elyBead(cx, cy, sc = 1, op = 1) {
  const r = 34 * sc;
  if (op <= 0.002 || r < 1) return '';
  return `<g opacity="${elyO(op)}"><circle cx="${elyN(cx)}" cy="${elyN(cy)}" r="${elyN(r)}" fill="#7fb6d9" stroke="rgba(26,43,35,.55)" stroke-width="4"/><ellipse cx="${elyN(cx - r * 0.35)}" cy="${elyN(cy - r * 0.4)}" rx="${elyN(r * 0.25)}" ry="${elyN(r * 0.14)}" fill="#fff" opacity=".55" transform="rotate(-35 ${elyN(cx - r * 0.35)} ${elyN(cy - r * 0.4)})"/></g>`;
}

function elyBow(cx, cy, sc = 1, op = 1, dashed = false) {
  if (op <= 0.002 || sc <= 0.01) return '';
  const w = 64 * sc, h = 43 * sc, knot = 19 * sc;
  const fill = dashed ? 'none' : ELY_ORANGE, dash = dashed ? ' stroke-dasharray="8 7"' : '';
  return `<g opacity="${elyO(op)}"><polygon points="${elyN(cx - 7 * sc)},${elyN(cy)} ${elyN(cx - w)},${elyN(cy - h)} ${elyN(cx - w)},${elyN(cy + h)}" fill="${fill}" stroke="${ELY_ORANGE}" stroke-width="4" stroke-linejoin="round"${dash}/><polygon points="${elyN(cx + 7 * sc)},${elyN(cy)} ${elyN(cx + w)},${elyN(cy - h)} ${elyN(cx + w)},${elyN(cy + h)}" fill="${fill}" stroke="${ELY_ORANGE}" stroke-width="4" stroke-linejoin="round"${dash}/><circle cx="${elyN(cx)}" cy="${elyN(cy)}" r="${elyN(knot)}" fill="${dashed ? 'none' : '#c96a40'}" stroke="${ELY_ORANGE}" stroke-width="4"${dash}/></g>`;
}

function elyThread(x1, y, x2, op = 1, dashed = false) {
  return elyLine(x1, y, x2, y, dashed ? C.dim : C.chalk, 5, op, dashed ? '13 12' : '');
}

function elyAlong(points, k) {
  const lengths = [];
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    const d = Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
    lengths.push(d); total += d;
  }
  let dist = Math.max(0, Math.min(1, k)) * total;
  for (let i = 0; i < lengths.length; i++) {
    if (dist <= lengths[i] || i === lengths.length - 1) {
      const t = lengths[i] ? dist / lengths[i] : 1;
      return [elyL(points[i][0], points[i + 1][0], t), elyL(points[i][1], points[i + 1][1], t)];
    }
    dist -= lengths[i];
  }
  return points[0];
}

function elyFlyBead(u, start, end, points, op = 1, startScale = 0.3, endScale = 0.82) {
  if (u < start) return '';
  const k = elyK(u, start, end), [x, y] = elyAlong(points, k);
  return elyBead(x, y, elyL(startScale, endScale, k), op);
}

function elyFlyBow(u, start, end, points, fadeStart = end - 0.18) {
  if (u < start) return '';
  const k = elyK(u, start, end), [x, y] = elyAlong(points, k);
  return elyBow(x, y, elyL(0.38, 0.88, k), 1 - elyK(u, fadeStart, end + 0.22));
}

function elyGlow(cx, cy, rx = 105, ry = 90, op = 0.5) {
  return `<g opacity="${elyO(op)}"><ellipse cx="${elyN(cx)}" cy="${elyN(cy)}" rx="${elyN(rx)}" ry="${elyN(ry)}" fill="rgba(242,193,78,.13)"/><ellipse cx="${elyN(cx)}" cy="${elyN(cy)}" rx="${elyN(rx - 18)}" ry="${elyN(ry - 15)}" fill="none" stroke="${C.yellow}" stroke-width="5"/></g>`;
}

function elyStar(cx, cy, r, op = 1) {
  const p = [];
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r;
    p.push(`${elyN(cx + Math.cos(a) * rr)},${elyN(cy + Math.sin(a) * rr)}`);
  }
  return `<polygon points="${p.join(' ')}" fill="rgba(242,193,78,.24)" stroke="${C.yellow}" stroke-width="5" stroke-linejoin="round" opacity="${elyO(op)}"/>`;
}

function elyPlant(cx, cy, sc = 1, op = 1) {
  return `<g transform="translate(${elyN(cx)} ${elyN(cy)}) scale(${elyN(sc)})" opacity="${elyO(op)}" fill="none" stroke="${C.green}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="M0 90 Q-4 15 0 -80 M0 50 Q-74 29 -87 -28 Q-31 -37 0 50 M0 15 Q67 1 87 -57 Q31 -65 0 15 M0 -20 Q-47 -31 -48 -80 Q-11 -75 0 -20 M0 38 Q42 32 58 -1 Q19 -3 0 38" fill="rgba(143,209,138,.12)"/><path d="M-68 -22 L-8 39 M69 -51 L8 1 M-38 -72 L-3 -24 M49 -2 L7 33" stroke-width="3"/></g>`;
}

function elyBus(cx, cy, sc = 1, op = 1, wheel = 0) {
  return `<g transform="translate(${elyN(cx)} ${elyN(cy)}) scale(${elyN(sc)})" opacity="${elyO(op)}" stroke-linejoin="round"><rect x="-180" y="-54" width="360" height="110" rx="22" fill="rgba(127,182,217,.15)" stroke="${C.chalk}" stroke-width="6"/><rect x="-145" y="-34" width="55" height="43" rx="7" fill="${ELY_INK}" stroke="${C.chalk}" stroke-width="4"/><rect x="-70" y="-34" width="55" height="43" rx="7" fill="${ELY_INK}" stroke="${C.chalk}" stroke-width="4"/><rect x="5" y="-34" width="55" height="43" rx="7" fill="${ELY_INK}" stroke="${C.chalk}" stroke-width="4"/><path d="M80 -46 L140 -46 L168 -15 L168 9 L80 9Z" fill="${ELY_INK}" stroke="${C.chalk}" stroke-width="4"/><path d="M-166 18 L166 18 M74 9 L74 52" fill="none" stroke="${C.chalk}" stroke-width="4"/><g transform="rotate(${elyN(wheel)} -112 58)"><circle cx="-112" cy="58" r="28" fill="${ELY_INK}" stroke="${C.chalk}" stroke-width="5"/><path d="M-112 31 L-112 85 M-139 58 L-85 58" stroke="${C.dim}" stroke-width="4"/></g><g transform="rotate(${elyN(wheel)} 112 58)"><circle cx="112" cy="58" r="28" fill="${ELY_INK}" stroke="${C.chalk}" stroke-width="5"/><path d="M112 31 L112 85 M85 58 L139 58" stroke="${C.dim}" stroke-width="4"/></g></g>`;
}

function elyGreenhouseIcon(cx, cy, sc = 1, op = 1) {
  return `<g transform="translate(${elyN(cx)} ${elyN(cy)}) scale(${elyN(sc)})" opacity="${elyO(op)}" fill="none" stroke="${C.chalk}" stroke-width="6" stroke-linejoin="round"><path d="M-132 72 L-132 -28 L0 -103 L132 -28 L132 72Z" fill="rgba(127,182,217,.05)"/><path d="M-84 -47 L-40 -72 L-40 72 M0 -94 L0 72 M42 -72 L84 -47 L84 72 M-132 10 L132 10"/><path d="M-105 72 L-105 32 M105 72 L105 32" stroke="${C.green}" stroke-width="4"/></g>${elyPlant(cx - 47 * sc, cy + 15 * sc, 0.53 * sc, op)}${elyPlant(cx + 56 * sc, cy + 7 * sc, 0.61 * sc, op)}`;
}

function elySchool(cx, cy, sc = 1, op = 1) {
  return `<g transform="translate(${elyN(cx)} ${elyN(cy)}) scale(${elyN(sc)})" opacity="${elyO(op)}" stroke-linejoin="round"><path d="M-132 78 L-132 -24 L0 -104 L132 -24 L132 78Z" fill="rgba(239,233,216,.05)" stroke="${C.chalk}" stroke-width="6"/><path d="M-60 78 L-60 26 Q0 -14 60 26 L60 78Z" fill="rgba(127,182,217,.08)" stroke="${C.chalk}" stroke-width="5"/><rect x="-105" y="-14" width="42" height="42" fill="${ELY_INK}" stroke="${C.chalk}" stroke-width="4"/><rect x="63" y="-14" width="42" height="42" fill="${ELY_INK}" stroke="${C.chalk}" stroke-width="4"/><path d="M-132 78 L132 78" fill="none" stroke="${C.chalk}" stroke-width="6"/></g>`;
}

function elySquirrel(cx, cy, sc = 1, pose = 'sit', op = 1) {
  const turn = pose === 'run' ? -20 : pose === 'climb' ? 28 : pose === 'down' ? 15 : 0;
  const fruit = pose === 'sit' ? `<circle cx="29" cy="16" r="18" fill="rgba(242,193,78,.25)" stroke="${C.yellow}" stroke-width="4"/><path d="M29 -2 Q32 -15 43 -18" fill="none" stroke="${C.green}" stroke-width="4"/>` : '';
  return `<g transform="translate(${elyN(cx)} ${elyN(cy)}) rotate(${turn}) scale(${elyN(sc)})" opacity="${elyO(op)}" stroke-linecap="round" stroke-linejoin="round"><path d="M-48 41 C-106 23 -102 -43 -59 -57 C-20 -70 12 -43 1 -12 C-6 7 -29 16 -44 6 C-56 -2 -52 -20 -37 -25 C-25 -30 -13 -21 -18 -10" fill="rgba(232,135,91,.12)" stroke="${C.orange}" stroke-width="9"/><ellipse cx="1" cy="31" rx="51" ry="63" fill="rgba(232,135,91,.15)" stroke="${C.chalk}" stroke-width="6"/><circle cx="20" cy="-42" r="42" fill="${ELY_INK}" stroke="${C.chalk}" stroke-width="6"/><path d="M-5 -72 L-16 -108 L16 -81 M34 -74 L54 -103 L59 -57" fill="rgba(232,135,91,.13)" stroke="${C.chalk}" stroke-width="6"/><circle cx="35" cy="-49" r="5" fill="${C.chalk}" stroke="none"/><path d="M53 -31 L68 -25 L54 -19" fill="none" stroke="${C.chalk}" stroke-width="4"/><path d="M-1 5 Q17 -7 36 5 M5 8 L5 27 M31 8 L31 27" fill="none" stroke="${C.chalk}" stroke-width="6"/>${fruit}<path d="M-18 84 L-34 98 M33 83 L49 97" fill="none" stroke="${C.chalk}" stroke-width="7"/></g>`;
}

function elyHeart(cx, cy, sc = 1, op = 1) {
  return `<path transform="translate(${elyN(cx)} ${elyN(cy)}) scale(${elyN(sc)})" d="M0 36 C-13 20 -47 -2 -47 -23 C-47 -49 -14 -53 0 -30 C14 -53 47 -49 47 -23 C47 -2 13 20 0 36Z" fill="rgba(232,135,91,.19)" stroke="${C.orange}" stroke-width="6" opacity="${elyO(op)}"/>`;
}

function elyTile(x, y, w, h, kind, color = ELY_BLUE, op = 1, glow = 0) {
  const cx = x + w / 2, cy = y + h / 2;
  let g = '';
  if (glow > 0.01) g += elyGlow(cx, cy, w * 0.63, h * 0.76, glow);
  g += elyBlock(x, y, w, h, color, op);
  const sc = Math.min(w / 330, h / 205) * 0.78;
  if (kind === 'bus') g += elyBus(cx, cy + 4, sc, op);
  else if (kind === 'green') g += elyGreenhouseIcon(cx, cy + 1, sc, op);
  else if (kind === 'squirrel') g += elySquirrel(cx, cy + 7, sc * 0.84, 'sit', op);
  else if (kind === 'school') { g += elySchool(cx, cy + 5, sc, op); g += elyHeart(x + w - 26, y + 30, Math.min(0.42, sc * 0.55), op); }
  return g;
}

function elyTree(cx, baseY, sc = 1, op = 1) {
  return `<g transform="translate(${elyN(cx)} ${elyN(baseY)}) scale(${elyN(sc)})" opacity="${elyO(op)}" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M0 0 L-7 -205 M-4 -104 L-89 -162 M0 -143 L85 -200 M-4 -72 L-82 -110 M1 -121 L78 -145" stroke="${C.chalk}" stroke-width="13"/><path d="M-88 -163 Q-137 -185 -134 -224 Q-89 -231 -63 -189 M86 -200 Q107 -243 151 -225 Q147 -182 98 -174 M-83 -112 Q-123 -136 -154 -112 Q-137 -76 -83 -92 M77 -146 Q112 -177 150 -148 Q132 -111 81 -121" fill="rgba(143,209,138,.12)" stroke="${C.green}" stroke-width="7"/></g>`;
}

function elyKid(cx, cy, sc = 1, op = 1) {
  return `<g transform="translate(${elyN(cx)} ${elyN(cy)}) scale(${elyN(sc)})" opacity="${elyO(op)}" stroke-linecap="round"><circle cx="0" cy="-28" r="29" fill="${ELY_SKIN}" fill-opacity=".65" stroke="${C.chalk}" stroke-width="5"/><path d="M-28 -33 Q-22 -66 3 -61 Q27 -55 29 -31 Q7 -43 -3 -41 Q-18 -39 -28 -33Z" fill="${ELY_BROWN}" stroke="${C.chalk}" stroke-width="3"/><circle cx="-9" cy="-27" r="3" fill="${ELY_INK}" stroke="none"/><circle cx="9" cy="-27" r="3" fill="${ELY_INK}" stroke="none"/><path d="M-8 -12 L8 -12 M-43 70 Q-40 14 0 14 Q40 14 43 70" fill="none" stroke="${C.blue}" stroke-width="9"/></g>`;
}

function elyComic(x, y, w, h, kind, op = 1) {
  let g = `<g opacity="${elyO(op)}"><rect x="${elyN(x)}" y="${elyN(y)}" width="${elyN(w)}" height="${elyN(h)}" rx="14" fill="rgba(239,233,216,.055)" stroke="${C.chalk}" stroke-width="5"/>`;
  if (kind === 0) {
    g += elyTree(x + w * 0.72, y + h * 0.92, 0.58, 1);
    g += elySquirrel(x + w * 0.36, y + h * 0.58, 0.55, 'down', 1);
    g += elyPath(`M${elyN(x + w * 0.34)} ${elyN(y + h * 0.2)} Q${elyN(x + w * 0.25)} ${elyN(y + h * 0.34)} ${elyN(x + w * 0.34)} ${elyN(y + h * 0.43)}`, C.yellow, 4, 0.85);
    g += `<polygon points="${elyN(x + w * 0.34)},${elyN(y + h * 0.43)} ${elyN(x + w * 0.31)},${elyN(y + h * 0.38)} ${elyN(x + w * 0.37)},${elyN(y + h * 0.38)}" fill="${C.yellow}"/>`;
  } else if (kind === 1) {
    g += `<path d="M${elyN(x + 54)} ${elyN(y + h * 0.83)} Q${elyN(x + w * 0.5)} ${elyN(y + h * 0.68)} ${elyN(x + w - 45)} ${elyN(y + h * 0.83)} L${elyN(x + w - 38)} ${elyN(y + h * 0.92)} L${elyN(x + 46)} ${elyN(y + h * 0.92)}Z" fill="rgba(169,179,166,.12)" stroke="${C.dim}" stroke-width="4"/>`;
    g += elySquirrel(x + w * 0.5, y + h * 0.63, 0.62, 'sit', 1);
  } else {
    g += elyTree(x + w * 0.3, y + h * 0.93, 0.52, 1);
    g += elySquirrel(x + w * 0.38, y + h * 0.46, 0.48, 'climb', 1);
    g += elyKid(x + w * 0.68, y + h * 0.78, 0.58, 1);
    g += elyKid(x + w * 0.87, y + h * 0.8, 0.54, 1);
  }
  return g + '</g>';
}

function elyCamera(x, y, w, h, op = 1, strong = true) {
  const l = 45, sw = strong ? 9 : 5, col = strong ? C.yellow : C.dim;
  return `<g opacity="${elyO(op)}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round"><path d="M${x} ${y + l}V${y}H${x + l} M${x + w - l} ${y}H${x + w}V${y + l} M${x + w} ${y + h - l}V${y + h}H${x + w - l} M${x + l} ${y + h}H${x}V${y + h - l}"/></g>`;
}

function elyGreenhouseCut(x, y, w, h, op = 1) {
  const roof = 155, top = y + roof;
  let g = `<g opacity="${elyO(op)}" fill="none" stroke="${C.chalk}" stroke-width="6" stroke-linejoin="round"><path d="M${x} ${top} L${x + w / 2} ${y} L${x + w} ${top} V${y + h} H${x}Z" fill="rgba(127,182,217,.04)"/><path d="M${x + w * 0.15} ${y + roof * 0.78} L${x + w * 0.85} ${y + roof * 0.78} M${x + w * 0.27} ${y + roof * 0.56} L${x + w * 0.73} ${y + roof * 0.56} M${x + w * 0.39} ${y + roof * 0.32} L${x + w * 0.61} ${y + roof * 0.32} M${x + w * 0.33} ${y + roof * 0.56} L${x + w * 0.23} ${top} M${x + w * 0.5} ${y} V${top} M${x + w * 0.67} ${y + roof * 0.56} L${x + w * 0.77} ${top}"/><path d="M${x + 12} ${y + h - 62} H${x + w - 12}" stroke="${C.green}" stroke-width="5"/></g>`;
  g += elyPlant(x + w * 0.37, y + h - 72, 0.74, op);
  g += elyPlant(x + w * 0.62, y + h - 70, 0.9, op);
  for (let i = 0; i < 12; i++) {
    const mx = x + 28 + i * (w - 56) / 11;
    const my = y + h - 30 - (i % 3) * 7;
    g += elyCircle(mx, my, 3 + (i % 2), C.green, C.green, 1, op);
  }
  return g;
}

function elyTeacher(cx, cy, sc = 1, op = 1) {
  return `<g transform="translate(${elyN(cx)} ${elyN(cy)}) scale(${elyN(sc)})" opacity="${elyO(op)}" stroke-linecap="round" stroke-linejoin="round"><circle cx="0" cy="-62" r="28" fill="${ELY_SKIN}" fill-opacity=".7" stroke="${C.chalk}" stroke-width="5"/><path d="M-28 -67 Q-18 -100 5 -94 Q26 -89 28 -63 Q7 -76 -5 -75 Q-18 -72 -28 -67Z" fill="${ELY_BROWN}" stroke="${C.chalk}" stroke-width="3"/><path d="M-39 50 Q-38 -24 0 -24 Q38 -24 39 50Z" fill="rgba(127,182,217,.3)" stroke="${C.chalk}" stroke-width="5"/><path d="M-31 -2 L-59 22 M30 -2 L63 -35 M-18 50 L-24 85 M18 50 L25 85" fill="none" stroke="${C.chalk}" stroke-width="8"/><path d="M64 -40 L98 -108" stroke="${C.yellow}" stroke-width="5"/></g>`;
}

function elyGate(cx, cy, sc = 1, op = 1) {
  return `<g transform="translate(${elyN(cx)} ${elyN(cy)}) scale(${elyN(sc)})" opacity="${elyO(op)}" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M-118 72 V-14 A118 118 0 0 1 118 -14 V72 M-93 72 V-12 A93 93 0 0 1 93 -12 V72 M-145 72 H145" stroke="${C.chalk}" stroke-width="8"/><path d="M-111 -47 Q-157 -93 -180 -53 Q-169 -16 -123 -17 M104 -57 Q152 -101 176 -62 Q162 -23 118 -29 M-139 19 Q-181 -7 -197 29 Q-176 59 -139 45 M134 12 Q176 -21 196 18 Q178 54 135 42" fill="rgba(143,209,138,.12)" stroke="${C.green}" stroke-width="7"/></g>`;
}

function elyDomino(cx, baseY, w, h, angle, kind, op = 1) {
  const pivotX = cx + w / 2;
  let g = '<g transform="translate(' + elyN(pivotX) + ' ' + elyN(baseY) + ') rotate(' + elyN(angle) + ')" opacity="' + elyO(op) + '"><rect x="' + elyN(-w) + '" y="' + elyN(-h) + '" width="' + elyN(w) + '" height="' + elyN(h) + '" rx="14" fill="rgba(232,135,91,.13)" stroke="' + C.orange + '" stroke-width="6"/>';
  g += '<circle cx="' + elyN(-w / 2) + '" cy="' + elyN(-h * 0.76) + '" r="8" fill="' + C.orange + '"/><circle cx="' + elyN(-w / 2) + '" cy="' + elyN(-h * 0.29) + '" r="8" fill="' + C.orange + '"/>';
  if (kind === 'teacher') g += elyTeacher(-w / 2, -h * 0.43, 0.63, 1);
  else if (kind === 'bus') g += elyBus(-w / 2, -h * 0.48, 0.33, 1, 0);
  else g += elyGate(-w / 2, -h * 0.35, 0.32, 1);
  return g + '</g>';
}
function elyFinger(cx, cy, op = 1) {
  return `<g transform="translate(${elyN(cx)} ${elyN(cy)})" opacity="${elyO(op)}"><path d="M0 25 L44 25 Q54 25 61 14 L78 -16 Q83 -25 91 -21 Q98 -17 93 -7 L83 17 L112 4 Q122 0 127 8 Q130 16 118 22 L78 40 Q70 44 66 53 L17 53Z" fill="rgba(239,233,216,.16)" stroke="${C.chalk}" stroke-width="5" stroke-linejoin="round"/></g>`;
}

function elyCart(cx, cy, sc = 1, op = 1) {
  return `<g transform="translate(${elyN(cx)} ${elyN(cy)}) scale(${elyN(sc)})" opacity="${elyO(op)}" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M-80 -52 H-55 L-37 25 H51 L72 -32 H-48 M-32 4 H63" stroke="${C.chalk}" stroke-width="8"/><circle cx="-22" cy="49" r="12" fill="${ELY_INK}" stroke="${C.yellow}" stroke-width="6"/><circle cx="49" cy="49" r="12" fill="${ELY_INK}" stroke="${C.yellow}" stroke-width="6"/><path d="M-28 -14 L-20 10 M0 -14 L2 10 M28 -14 L24 10" stroke="${C.green}" stroke-width="5"/></g>`;
}

function elyTileString(x1, x2, y, beads, bows, beadSc = 0.76, bowSc = 0.7, op = 1) {
  let g = elyThread(x1, y, x2, op);
  const n = beads + bows, span = x2 - x1, step = n > 1 ? span / (n - 1) : 0;
  for (let i = 0; i < beads; i++) g += elyBead(x1 + i * step, y, beadSc, op);
  for (let i = 0; i < bows; i++) g += elyBow(x1 + (beads + i) * step, y, bowSc, op);
  return g;
}

function elyScene1(u) {
  let g = head(u, "開場", "骨架有了，接著長肉") + elyTag(u);
  const xs = [165, 395, 790, 1185], ws = [210, 380, 380, 210], h = 190, y = 440;
  const kinds = ["bus", "green", "squirrel", "school"];
  for (let i = 0; i < 4; i++) {
    const k = elyK(u, 0.25 + i * 0.88, 1.05 + i * 0.88);
    const yy = elyL(-150, y, k);
    let op = 1;
    if (i !== 2) op = 1 - elyK(u, 4.5, 5.05);
    if (u < 5.05) g += elyTile(xs[i], yy, ws[i], h, kinds[i], i === 3 ? ELY_ORANGE : ELY_BLUE, op, i === 2 ? elyK(u, 4.35, 5.2) * 0.5 : 0);
  }
  const focus = elyK(u, 5.05, 6.25);
  if (u >= 5.05) {
    const fx = elyL(790, 510, focus), fy = elyL(y, 275, focus), fw = elyL(380, 580, focus), fh = elyL(h, 300, focus);
    g += elyTile(fx, fy, fw, fh, "squirrel", ELY_BLUE, 1, elyK(u, 6.0, 7.0) * 0.55);
    g += txt(800, 730, "長肉", { a: "middle", s: 38, w: 1, f: C.yellow, o: elyK(u, 5.6, 6.3) });
  }
  const miniOp = elyK(u, 5.2, 6.0);
  const mx = [150, 405, 995], mw = [165, 235, 165], mk = ["bus", "green", "school"];
  for (let i = 0; i < 3; i++) g += elyTile(mx[i], 690, mw[i], 105, mk[i], i === 2 ? ELY_ORANGE : ELY_BLUE, miniOp * 0.84);
  return g;
}
function elyScene2(u) {
  let g = head(u, "長肉", "太瘦的一段") + elyTag(u);
  const sentence = "中午吃便當時，一隻松鼠從樹上跑下來。";
  const chars = [...sentence], n = Math.floor(chars.length * P(u, 0.35, 5.2));
  g += txt(180, 270, chars.slice(0, n).join(""), { s: 34, w: 1, f: C.chalk });
  g += txt(180, 320, "示範句為自編", { s: 24, w: 1, f: C.dim, o: elyK(u, 1.8, 2.5) });
  const open = elyK(u, 1.0, 3.0), drawerY = elyL(370, 500, open);
  const trayOp = elyK(u, 2.3, 3.1);
  g += box(310, 330, 820, 290, ELY_BLUE, 0.38, "rgba(26,43,35,.28)");
  g += box(310, drawerY, 820, 120, ELY_BLUE, trayOp, "rgba(127,182,217,.08)");
  g += elyLine(660, drawerY + 14, 780, drawerY + 14, C.dim, 4, trayOp);
  g += elyThread(410, drawerY + 62, 1085, trayOp);
  g += elyBead(485, drawerY + 62, 0.85, trayOp);
  g += elyBow(820, drawerY + 62, 0.72, trayOp);
  g += elyBlock(310, 330, 820, 170, ELY_BLUE, 1);
  g += elySquirrel(720, 408, 0.5, "sit", 1);
  g += elyLine(1270, 395, 1270, 685, C.chalk, 4, 0.9);
  g += elyLine(1257, 403, 1283, 403, C.chalk, 4, 1);
  g += elyLine(1257, 677, 1283, 677, C.chalk, 4, 1);
  for (let i = 1; i < 7; i++) g += elyLine(1263, 403 + i * 39, 1277, 403 + i * 39, C.dim, 3, 0.95);
  g += "<rect x=\"1249\" y=\"625\" width=\"42\" height=\"52\" fill=\"rgba(127,182,217,.78)\" opacity=\"" + elyO(trayOp) + "\"/>";
  g += box(1247, 395, 46, 290, C.chalk, 0.95, "none");
  g += txt(1270, 365, "150～200 字", { a: "middle", s: 30, w: 1, f: C.yellow });
  return g;
}
function elyScene3(u) {
  let g = head(u, '長肉', '連環漫畫：開始、接著、後來') + elyTag(u);
  const px = [120, 610, 1100], py = 250, pw = 380, ph = 220;
  const names = ['開始', '接著', '後來'];
  const phrases = ['松鼠跑下來', '抱果子吃', '跑回樹上'];
  const appear = [0.4, 4.0, 7.6], launches = [2.55, 6.15, 9.75];
  const centers = px.map((x) => x + pw / 2), beadX = [540, 800, 1060], beadY = 740;
  g += elyThread(470, beadY, 1130, 0.92);
  for (let i = 0; i < 3; i++) {
    const panelOp = elyK(u, appear[i], appear[i] + 0.9);
    g += elyComic(px[i], py, pw, ph, i, panelOp);
    g += txt(centers[i], 505, names[i], { a: 'middle', s: 30, w: 1, f: C.chalk, o: elyK(u, appear[i] + 0.58, appear[i] + 0.88) });
    g += txt(centers[i], 550, phrases[i], { a: 'middle', s: 28, w: 1, f: C.chalk, o: elyK(u, appear[i] + 1.28, appear[i] + 1.58) * 0.82 });
    if (u >= launches[i]) {
      const startX = px[i] + pw - 42, startY = py + ph - 25;
      const route = [[startX, startY], [startX, 610], [beadX[i], 660], [beadX[i], beadY]];
      const k = elyK(u, launches[i], launches[i] + 1.45), point = elyAlong(route, k);
      const scale = elyL(0.26, 0.055, k), copyOp = 1 - elyK(u, launches[i] + 1.25, launches[i] + 1.48);
      g += '<g transform="translate(' + elyN(point[0]) + ' ' + elyN(point[1]) + ') scale(' + elyN(scale) + ') translate(' + elyN(-centers[i]) + ' ' + elyN(-(py + ph / 2)) + ')" opacity="' + elyO(copyOp) + '">';
      g += elyComic(px[i], py, pw, ph, i, 1) + '</g>';
      g += elyBead(beadX[i], beadY, 0.82, elyK(u, launches[i] + 1.30, launches[i] + 1.48));
    }
  }
  return g;
}
function elyScene4(u) {
  let g = head(u, "長肉", "最後綁上蝴蝶結") + elyTag(u);
  const fold = elyK(u, 5.2, 7.2), openOp = 1 - fold;
  g += "<g opacity=\"" + elyO(openOp) + "\"><rect x=\"390\" y=\"405\" width=\"820\" height=\"306\" rx=\"18\" fill=\"rgba(26,43,35,.38)\" stroke=\"" + C.blue + "\" stroke-width=\"5\"/><path d=\"M420 430 V680 M1180 430 V680\" fill=\"none\" stroke=\"" + C.dim + "\" stroke-width=\"5\"/>";
  g += elyBlock(390, 405, 820, 150, ELY_BLUE, 1);
  g += elySquirrel(595, 481, 0.48, "sit", 0.9);
  g += elyThread(535, 635, 1080, 1);
  g += elyBead(625, 635, 0.8, 1) + elyBead(760, 635, 0.8, 1) + elyBead(895, 635, 0.8, 1);
  const starK = elyK(u, 1.1, 3.0), [sx, sy] = elyAlong([[1508, 540], [1370, 480], [1170, 570], [1055, 635]], starK);
  g += elyStar(sx, sy, 31, (1 - elyK(u, 2.7, 3.25)) * elyK(u, 0.7, 1.1));
  g += elyBow(1055, 635, 0.88, elyK(u, 2.65, 3.35));
  g += elyGlow(800, 635, 360, 85, elyK(u, 3.25, 4.1) * openOp * 0.55);
  g += "</g>";
  const closed = elyK(u, 5.2, 6.5);
  if (u >= 5.2) {
    const x = elyL(500, 465, closed), y = elyL(440, 395, closed), w = elyL(600, 670, closed), h = elyL(240, 260, closed);
    g += elyBlock(x, y, w, h, ELY_BLUE, closed);
    g += elySquirrel(x + w * 0.28, y + h * 0.6, elyL(0.35, 0.47, closed), "sit", closed);
    const rowY = y + h * 0.59;
    g += elyThread(x + w * 0.49, rowY, x + w * 0.9, closed);
    g += elyBead(x + w * 0.57, rowY, 0.46, closed) + elyBead(x + w * 0.68, rowY, 0.46, closed) + elyBead(x + w * 0.79, rowY, 0.46, closed);
    g += elyBow(x + w * 0.88, rowY, 0.43, closed);
  }
  g += txt(1005, 498, "b", { a: "middle", s: 38, w: 1, f: ELY_ORANGE, o: elyK(u, 2.7, 3.3) });
  return g;
}
function elyScene5(u) {
  let g = head(u, "長肉", "眼睛由上而下") + elyTag(u);
  g += elyGreenhouseCut(330, 260, 740, 365, 1);
  g += elyLine(210, 305, 210, 570, C.yellow, 8, 0.95);
  g += "<polygon points=\"210,590 192,558 228,558\" fill=\"" + C.yellow + "\"/>";
  g += txt(55, 450, "由上而下", { s: 30, w: 1, f: C.yellow });
  const targets = [
    { x: 515, y: 278, w: 360, h: 80 },
    { x: 520, y: 420, w: 360, h: 100 },
    { x: 540, y: 548, w: 280, h: 72 },
  ];
  const phrases = ['屋頂玻璃', '大大的葉子', '地上青苔'];
  const phraseY = targets.map((t) => t.y + t.h / 2 + 10);
  const phraseAt = [1.4, 3.55, 6.15];
  const mixFrame = (a, b, k) => ({
    x: elyL(a.x, b.x, k), y: elyL(a.y, b.y, k),
    w: elyL(a.w, b.w, k), h: elyL(a.h, b.h, k),
  });
  let camera = null;
  if (u >= 1.15 && u < 2.2) camera = targets[0];
  else if (u >= 2.2 && u < 3.3) camera = mixFrame(targets[0], targets[1], elyK(u, 2.2, 3.3));
  else if (u >= 3.3 && u < 4.8) camera = targets[1];
  else if (u >= 4.8 && u < 5.9) camera = mixFrame(targets[1], targets[2], elyK(u, 4.8, 5.9));
  else if (u >= 5.9 && u < 9.5) camera = targets[2];
  if (camera) g += elyCamera(camera.x, camera.y, camera.w, camera.h, 0.98, true);
  if (u >= 2.2) g += elyCamera(targets[0].x, targets[0].y, targets[0].w, targets[0].h, 0.34, false);
  if (u >= 4.8) g += elyCamera(targets[1].x, targets[1].y, targets[1].w, targets[1].h, 0.34, false);
  if (u >= 9.5) g += elyCamera(targets[2].x, targets[2].y, targets[2].w, targets[2].h, 0.34, false);
  for (let i = 0; i < 3; i++) {
    g += txt(1140, phraseY[i], phrases[i], { s: 28, w: 1, f: C.chalk, o: elyK(u, phraseAt[i], phraseAt[i] + 0.35) });
  }
  g += elyThread(590, 770, 1110, 0.92);
  const fly = [3.0, 6.8, 10.5];
  const from = [
    [[695, 318], [710, 430], [730, 580], [700, 770]],
    [[700, 470], [780, 575], [835, 680], [825, 770]],
    [[680, 584], [850, 640], [955, 710], [950, 770]],
  ];
  for (let i = 0; i < 3; i++) g += elyFlyBead(u, fly[i], fly[i] + 1.65, from[i], 1, 0.3, 0.82);
  g += elyFlyBow(u, 12.25, 13.4, [[1070, 590], [1115, 660], [1080, 770]], 13.05);
  g += elyBow(1080, 770, 0.88, elyK(u, 13.05, 13.4));
  g += txt(1080, 687, "b", { a: "middle", s: 36, w: 1, f: ELY_ORANGE, o: elyK(u, 12.9, 13.4) });
  return g;
}
function elyScene6(u) {
  let g = head(u, '長肉', '骨牌：原因推到結果') + elyTag(u);
  const cx = [380, 800, 1220], labels = ['原因', '經過', '結果'], phrases = ['要認識植物', '坐車出發', '到植物園'];
  const kinds = ['teacher', 'bus', 'gate'], baseY = 560, cardW = 130, cardH = 230;
  const starts = [2.3, 5.25, 8.2], ends = [3.9, 6.85, 9.8];
  for (let i = 0; i < 3; i++) {
    g += txt(cx[i], 620, labels[i], { a: 'middle', s: 30, w: 1, f: i === 0 ? C.blue : i === 2 ? C.orange : C.chalk, o: elyK(u, 0.15 + i * 0.18, 0.65 + i * 0.18) });
    g += txt(cx[i], 665, phrases[i], { a: 'middle', s: 28, w: 1, f: C.chalk, o: elyK(u, 0.8 + i * 1.5, 1.2 + i * 1.5) });
    const tip = elyK(u, starts[i], ends[i]), op = elyK(u, 0.25 + i * 0.15, 0.7 + i * 0.15);
    g += elyDomino(cx[i], baseY, cardW, cardH, elyL(0, 25, tip), kinds[i], op);
  }
  g += elyFinger(115, 435, 1 - elyK(u, 2.0, 2.6));
  g += elyThread(440, 770, 1320, 0.92);
  const beadX = [500, 800, 1100], beadY = 770;
  const beadPoints = [
    [[380, 450], [250, 535], [250, 720], [500, 770]],
    [[800, 450], [690, 535], [690, 720], [800, 770]],
    [[1220, 450], [1370, 535], [1370, 720], [1100, 770]],
  ];
  const launch = [4.15, 7.05, 10.0], beadEnd = [5.45, 8.35, 11.3];
  for (let i = 0; i < 3; i++) {
    const fade = 1 - elyK(u, beadEnd[i] - 0.16, beadEnd[i] + 0.15);
    g += elyFlyBead(u, launch[i], beadEnd[i], beadPoints[i], fade, 0.3, 0.82);
    g += elyBead(beadX[i], beadY, 0.82, elyK(u, beadEnd[i] - 0.12, beadEnd[i] + 0.08));
  }

  const travelBubble = (op) => {
    const bx = 690, by = 170, bw = 220, bh = 150, wx = bx + 14, wy = by + 12, ww = 192, wh = 76;
    const shift = (Math.max(0, u - 5.35) * 38) % 34;
    let b = '<g opacity="' + elyO(op) + '">';
    b += '<path d="M' + (bx + 102) + ' ' + (by + bh - 1) + ' L' + (bx + 110) + ' ' + (by + bh + 20) + ' L' + (bx + 118) + ' ' + (by + bh - 1) + ' Z" fill="rgba(26,43,35,.98)" stroke="' + C.chalk + '" stroke-width="4" stroke-linejoin="round"/>';
    b += '<rect x="' + bx + '" y="' + by + '" width="' + bw + '" height="' + bh + '" rx="24" fill="rgba(26,43,35,.98)" stroke="' + C.chalk + '" stroke-width="4"/>';
    b += '<defs><clipPath id="ely-s6-window-clip"><rect x="' + wx + '" y="' + wy + '" width="' + ww + '" height="' + wh + '" rx="8"/></clipPath></defs>';
    b += '<g clip-path="url(#ely-s6-window-clip)"><rect x="' + wx + '" y="' + wy + '" width="' + ww + '" height="' + wh + '" fill="' + ELY_INK + '"/>';
    b += '<path d="M' + wx + ' ' + (wy + 23) + ' H' + (wx + ww) + '" stroke="' + C.blue + '" stroke-width="3" opacity=".8"/>';
    for (let i = -1; i < 8; i++) {
      const fx = wx + 8 + i * 34 - shift;
      b += '<path d="M' + elyN(fx) + ' ' + (wy + 23) + ' L' + elyN(fx - 13) + ' ' + (wy + 71) + '" fill="none" stroke="' + C.green + '" stroke-width="3" opacity=".95"/>';
      b += '<path d="M' + elyN(fx - 20) + ' ' + (wy + 50) + ' Q' + elyN(fx - 6) + ' ' + (wy + 43) + ' ' + elyN(fx + 8) + ' ' + (wy + 50) + '" fill="none" stroke="' + C.green + '" stroke-width="2" opacity=".8"/>';
    }
    b += '</g>';
    b += '<rect x="' + wx + '" y="' + wy + '" width="' + ww + '" height="' + wh + '" rx="8" fill="none" stroke="' + C.yellow + '" stroke-width="3"/>';
    const heads = [bx + 65, bx + 125];
    for (const hx of heads) {
      const headY = by + 95;
      b += '<circle cx="' + hx + '" cy="' + headY + '" r="10" fill="' + ELY_SKIN + '" stroke="' + C.chalk + '" stroke-width="3"/>';
      b += '<path d="M' + (hx - 10) + ' ' + (headY - 3) + ' Q' + (hx - 8) + ' ' + (headY - 16) + ' ' + hx + ' ' + (headY - 12) + ' Q' + (hx + 9) + ' ' + (headY - 15) + ' ' + (hx + 11) + ' ' + (headY - 2) + ' Z" fill="' + ELY_BROWN + '" stroke="' + C.chalk + '" stroke-width="2"/>';
      b += '<path d="M' + (hx - 15) + ' ' + (by + 116) + ' Q' + hx + ' ' + (by + 105) + ' ' + (hx + 15) + ' ' + (by + 116) + ' V' + (by + 118) + '" fill="none" stroke="' + C.blue + '" stroke-width="5" stroke-linecap="round"/>';
      b += '<circle cx="' + (hx - 3) + '" cy="' + (headY + 1) + '" r="1.5" fill="' + ELY_INK + '"/><circle cx="' + (hx + 3) + '" cy="' + (headY + 1) + '" r="1.5" fill="' + ELY_INK + '"/>';
    }
    b += '<g fill="' + C.yellow + '" stroke="' + C.yellow + '" stroke-width="3" stroke-linecap="round"><ellipse cx="' + (bx + 178) + '" cy="' + (by + 104) + '" rx="5" ry="4"/><path d="M' + (bx + 182) + ' ' + (by + 104) + ' V' + (by + 83) + ' L' + (bx + 194) + ' ' + (by + 80) + ' V' + (by + 100) + '"/><ellipse cx="' + (bx + 202) + '" cy="' + (by + 102) + '" rx="5" ry="4"/><path d="M' + (bx + 206) + ' ' + (by + 102) + ' V' + (by + 82) + ' L' + (bx + 216) + ' ' + (by + 80) + ' V' + (by + 99) + '"/></g>';
    b += txt(bx + bw / 2, by + 141, '車上唱歌', { a: 'middle', s: 22, w: 1, f: C.chalk });
    return b + '</g>';
  };
  g += travelBubble(elyK(u, 5.35, 5.8));
  g += elyBow(1250, 770, 0.88, elyK(u, 11.85, 12.3));
  return g;
}
function elyScene7(u) {
  let g = head(u, '全篇', '四塊都長好肉') + elyTag(u);
  g += txt(800, 248, '重點段長一點', { a: 'middle', s: 34, w: 1, f: C.yellow, o: elyK(u, 0.3, 1.0) });
  const x = [100, 330, 790, 1250], w = [220, 440, 440, 220], kinds = ['bus', 'green', 'squirrel', 'school'];
  const counts = [[2, 1], [3, 1], [3, 1], [1, 2]];
  for (let i = 0; i < 4; i++) {
    const glow = i === 1 || i === 2 ? elyK(u, 3.2, 4.2) * 0.48 : 0;
    if (glow) g += elyGlow(x[i] + w[i] / 2, 485, w[i] * 0.58, 160, glow);
    g += elyTile(x[i], 365, w[i], 235, kinds[i], i === 3 ? ELY_ORANGE : ELY_BLUE, elyK(u, 0.25 + i * 0.35, 1.1 + i * 0.35), glow * 0.45);
    const [a, b] = counts[i], startX = x[i] + 26, endX = x[i] + w[i] - 50, yy = 710;
    g += elyThread(startX, yy, endX, elyK(u, 2.0 + i * 0.3, 2.7 + i * 0.3));
    const total = a + b, gap = (endX - startX) / Math.max(1, total - 1);
    for (let j = 0; j < a; j++) g += elyBead(startX + gap * j, yy, w[i] < 250 ? 0.58 : 0.72, elyK(u, 2.5 + j * 0.43 + i * 0.3, 3.2 + j * 0.43 + i * 0.3));
    for (let j = 0; j < b; j++) g += elyBow(startX + gap * (a + j), yy, w[i] < 250 ? 0.52 : 0.68, elyK(u, 3.0 + a * 0.4 + j * 0.36 + i * 0.3, 3.7 + a * 0.4 + j * 0.36 + i * 0.3));
  }
  return g;
}

function elyScene8(u) {
  let g = head(u, "全篇", "重點藏在蝴蝶結") + elyTag(u);
  g += txt(710, 460, "每段 b", { a: "middle", s: 36, w: 1, f: ELY_ORANGE, o: elyK(u, 0.2, 0.8) });
  const rows = [315, 405, 495, 585], starts = [4.1, 5.15, 6.2, 7.25], bx = 535;
  const beadCounts = [2, 3, 3, 1], bowCounts = [1, 1, 1, 2];
  g += elyCircle(1280, 475, 158, "rgba(232,135,91,.12)", C.orange, 7, elyK(u, 4.0, 4.8));
  for (let i = 0; i < 4; i++) {
    const y = rows[i], x1 = 290, x2 = bx, beadCount = beadCounts[i], bowCount = bowCounts[i];
    const total = beadCount + bowCount, step = (x2 - x1) / Math.max(1, total - 1);
    g += elyThread(220, y, bx, 0.85);
    for (let j = 0; j < beadCount; j++) g += elyBead(x1 + j * step, y, 0.67, 0.9);
    for (let j = 0; j < bowCount; j++) {
      const x = x1 + (beadCount + j) * step, launch = starts[i] + j * 0.38, arrive = launch + 2.0;
      g += elyBow(x, y, 0.72, 1 - elyK(u, launch, launch + 0.3));
      g += elyBow(x, y, 0.72, elyK(u, launch, launch + 0.3), true);
      const glow = elyK(u, launch - 0.1, launch + 0.35) * (1 - elyK(u, launch + 0.45, launch + 0.8));
      g += elyGlow(x, y, 62, 52, glow * 0.72);
      const route = i < 2
        ? [[x, y], [720, y - 75], [930, 330 + i * 30], [1130, 405 + i * 20], [1280, 475]]
        : i === 2
          ? [[x, y], [720, y + 75], [930, 565], [1130, 540], [1280, 475]]
          : [[x, y], [720, y + 100], [930, 650], [1130, 545], [1280, 475]];
      g += elyFlyBow(u, launch + 0.35, arrive, route, arrive - 0.15);
    }
  }
  g += elyGlow(1280, 475, 175, 175, elyK(u, 8.2, 9.2) * 0.4);
  g += txt(1280, 525, "B", { a: "middle", s: 150, w: 1, f: ELY_ORANGE, o: elyK(u, 9.55, 10.2) });
  g += txt(1280, 690, "全篇 B", { a: "middle", s: 36, w: 1, f: C.yellow, o: elyK(u, 9.55, 10.2) });
  return g;
}
function elyScene9(u) {
  let g = head(u, '練習', '從骨架長出肉');
  const block = (x, y, w, h, color, op) => {
    let out = '<g opacity="' + elyO(op) + '">';
    const n = Math.max(2, Math.floor(w / 130));
    for (let i = 0; i < n; i++) {
      const tabX = x + w * (i + 0.5) / n;
      out += '<rect x="' + elyN(tabX - 20) + '" y="' + elyN(y - 11) + '" width="40" height="13" rx="6" fill="' + color + '"/>';
    }
    out += '<rect x="' + elyN(x) + '" y="' + elyN(y) + '" width="' + elyN(w) + '" height="' + elyN(h) + '" rx="14" fill="' + color + '" fill-opacity=".72" stroke="' + C.chalk + '" stroke-width="4"/>';
    return out + '</g>';
  };
  const labels = ['為什麼去', '看到什麼', '特別的事', '感想'];
  const xs = [110, 340, 800, 1260], ws = [220, 440, 440, 220], centers = xs.map((x, i) => x + ws[i] / 2);
  const colors = [ELY_BLUE, ELY_BLUE, ELY_BLUE, ELY_ORANGE], by = 275, bh = 90;
  g += txt(145, 232, '〈到超級市場〉', { s: 38, w: 1, f: C.yellow, o: elyK(u, 0.2, 0.75) });
  g += elyCart(1420, 202, 0.58, elyK(u, 0.25, 0.8));
  for (let i = 0; i < 4; i++) {
    const blockOp = elyK(u, 0.25 + i * 0.35, 0.85 + i * 0.35);
    g += block(xs[i], by, ws[i], bh, colors[i], blockOp);
    g += txt(centers[i], by + 58, labels[i], { a: 'middle', s: 27, w: 1, f: ELY_INK, o: blockOp });
  }
  const starts = [1.2, 3.3, 5.4, 7.5], lineEnds = [440, 435, 455, 486];
  for (let i = 0; i < 4; i++) {
    const grow = elyK(u, starts[i], starts[i] + 0.8);
    const clusterOp = elyK(u, starts[i] + 0.55, starts[i] + 1.1);
    const flash = Math.max(0, Math.sin(Math.PI * P(u, starts[i] + 1.15, starts[i] + 1.85)));
    const edge = flash > 0.12 ? C.yellow : C.dim;
    g += elyLine(centers[i], by + bh, centers[i], elyL(by + bh, lineEnds[i], grow), edge, 3, grow);
    if (i === 0) {
      const w = 42, h = 78, gap = 12, top = 440, startX = centers[i] - (w * 3 + gap * 2) / 2;
      for (let j = 0; j < 3; j++) {
        const x = startX + j * (w + gap);
        g += '<rect x="' + elyN(x) + '" y="' + top + '" width="' + w + '" height="' + h + '" rx="8" fill="rgba(239,233,216,.005)" stroke="' + edge + '" stroke-width="4" stroke-dasharray="10 8" opacity="' + elyO(clusterOp) + '"/>';
        g += elyLine(x + 8, top + h / 2, x + w - 8, top + h / 2, edge, 3, clusterOp, '8 7');
      }
    } else if (i === 1) {
      const cameraW = 150, cameraH = 54;
      for (let j = 0; j < 3; j++) {
        const y = 435 + j * 64;
        g += elyCamera(centers[i] - cameraW / 2, y, cameraW, cameraH, clusterOp, flash > 0.12);
      }
    } else if (i === 2) {
      const w = 104, h = 72, gap = 12, startX = centers[i] - (w * 3 + gap * 2) / 2, y = 455;
      for (let j = 0; j < 3; j++) {
        const x = startX + j * (w + gap);
        g += '<rect x="' + elyN(x) + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10" fill="rgba(239,233,216,.005)" stroke="' + edge + '" stroke-width="4" stroke-dasharray="10 8" opacity="' + elyO(clusterOp) + '"/>';
      }
    } else {
      // 直排：1 個空珠位（a）＋2 個空蝴蝶結位（b），不讓連接線穿過空格
      const cx = centers[i], beadY = 510, bow1Y = 602, bow2Y = 694;
      g += elyLine(cx, beadY + 28, cx, bow1Y - 38, C.dim, 3, clusterOp, '6 6');
      g += elyLine(cx, bow1Y + 38, cx, bow2Y - 38, C.dim, 3, clusterOp, '6 6');
      g += elyCircle(cx, beadY, 26, 'none', edge, 4, clusterOp, '9 7');
      g += elyBow(cx, bow1Y, 0.6, clusterOp, true);
      g += elyBow(cx, bow2Y, 0.6, clusterOp, true);
    }
  }
  return g;
}
const elyPaint = (svg) => svg.replace(/<text ([^>]*?)fill="([^"]+)"/g, '<text $1style="fill:$2" fill="$2"');
function s1(u) { return elyPaint(elyScene1(u)); }
function s2(u) { return elyPaint(elyScene2(u)); }
function s3(u) { return elyPaint(elyScene3(u)); }
function s4(u) { return elyPaint(elyScene4(u)); }
function s5(u) { return elyPaint(elyScene5(u)); }
function s6(u) { return elyPaint(elyScene6(u)); }
function s7(u) { return elyPaint(elyScene7(u)); }
function s8(u) { return elyPaint(elyScene8(u)); }
function s9(u) { return elyPaint(elyScene9(u)); }
