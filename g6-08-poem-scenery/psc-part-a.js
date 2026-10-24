// g6-08 場景 A：分行分節、海上月光、樹梢白紗、落葉紛紛與寫詩練習。
// 本檔只定義 s2、s4、s5、s8、s10 與 pa_ 前綴的小工具。

function pa_camera(THREE) {
  const camera = new THREE.OrthographicCamera(-8, 8, 4.5, -4.5, 0.1, 100);
  camera.position.set(0, 0, 20);
  camera.lookAt(0, 0, 0);
  return camera;
}

function pa_gradient(THREE, scene, topHex, bottomHex, opacity = 0.92) {
  const geometry = new THREE.PlaneGeometry(1, 1);
  const pos = geometry.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const top = new THREE.Color(topHex), bottom = new THREE.Color(bottomHex);
  for (let i = 0; i < pos.count; i++) {
    const k = THREE.MathUtils.clamp(pos.getY(i) + 0.5, 0, 1);
    const color = bottom.clone().lerp(top, k);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const material = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity, depthWrite: false });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(16, 9, 1);
  mesh.position.z = -8;
  scene.add(mesh);
  return mesh;
}

function pa_stars(THREE, scene, count = 160, size = 3.2) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = -7.65 + PscGL.rand(i, 11) * 15.3;
    positions[i * 3 + 1] = -3.95 + PscGL.rand(i, 12) * 7.9;
    positions[i * 3 + 2] = -4.2 + PscGL.rand(i, 13) * 0.3;
    phases[i] = PscGL.rand(i, 14) * Math.PI * 2;
    colors[i * 3] = 0.36;
    colors[i * 3 + 1] = 0.48;
    colors[i * 3 + 2] = 0.72;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const colorAttr = new THREE.BufferAttribute(colors, 3);
  colorAttr.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('color', colorAttr);
  const material = new THREE.PointsMaterial({ size, sizeAttenuation: false, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false });
  const points = new THREE.Points(geometry, material);
  scene.add(points);
  return {
    update(u) {
      for (let i = 0; i < count; i++) {
        const twinkle = 0.28 + 0.48 * (0.5 + 0.5 * Math.sin(u * 0.47 + phases[i]));
        colorAttr.setXYZ(i, 0.24 * twinkle, 0.39 * twinkle, 0.72 * twinkle);
      }
      colorAttr.needsUpdate = true;
    },
  };
}

function pa_waterSheet(THREE, scene, horizon, opacity, upperHex, lowerHex) {
  const nx = 72, ny = 30, width = 16, depth = 4.1;
  const positions = new Float32Array((nx + 1) * (ny + 1) * 3);
  const colors = new Float32Array((nx + 1) * (ny + 1) * 3);
  const indices = [];
  const upper = new THREE.Color(upperHex), lower = new THREE.Color(lowerHex);
  for (let j = 0; j <= ny; j++) {
    const v = j / ny;
    const color = upper.clone().lerp(lower, v);
    for (let i = 0; i <= nx; i++) {
      const n = j * (nx + 1) + i;
      positions[n * 3] = -width / 2 + width * i / nx;
      positions[n * 3 + 1] = horizon - depth * v;
      positions[n * 3 + 2] = -2.8 + v * 0.1;
      colors[n * 3] = color.r;
      colors[n * 3 + 1] = color.g;
      colors[n * 3 + 2] = color.b;
      if (i < nx && j < ny) {
        const a = n, b = n + 1, c = n + nx + 1, d = c + 1;
        indices.push(a, b, d, a, d, c);
      }
    }
  }
  const geometry = new THREE.BufferGeometry();
  const positionAttr = new THREE.BufferAttribute(positions, 3);
  positionAttr.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('position', positionAttr);
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  const material = new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity, side: THREE.DoubleSide, depthWrite: false });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.frustumCulled = false;
  scene.add(mesh);
  return {
    update(u, len) {
      const t = Math.min(u, len - 1.5) * 0.28;
      for (let j = 0; j <= ny; j++) {
        const v = j / ny;
        for (let i = 0; i <= nx; i++) {
          const n = j * (nx + 1) + i;
          const x = -width / 2 + width * i / nx;
          const wave = Math.sin(x * 1.14 + t + j * 0.22) * 0.035 + Math.sin(x * 0.58 - t * 0.72 + j * 0.39) * 0.022;
          positionAttr.setY(n, horizon - depth * v + wave * (0.45 + v));
        }
      }
      positionAttr.needsUpdate = true;
    },
  };
}

function pa_waveLines(THREE, scene, horizon, color, opacity, lineCount = 12) {
  const lines = [];
  const pointsPerLine = 72;
  for (let row = 0; row < lineCount; row++) {
    const positions = new Float32Array(pointsPerLine * 3);
    const geometry = new THREE.BufferGeometry();
    const attribute = new THREE.BufferAttribute(positions, 3);
    attribute.setUsage(THREE.DynamicDrawUsage);
    geometry.setAttribute('position', attribute);
    const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: opacity * (0.62 + 0.38 * PscGL.rand(row, 30)), depthWrite: false });
    const line = new THREE.Line(geometry, material);
    scene.add(line);
    lines.push({ attribute, row });
  }
  return {
    update(u, len) {
      const t = Math.min(u, len - 1.5) * 0.24;
      lines.forEach(({ attribute, row }) => {
        for (let i = 0; i < pointsPerLine; i++) {
          const x = -7.7 + 15.4 * i / (pointsPerLine - 1);
          const y = horizon - 0.18 - row * 0.29 + Math.sin(x * 0.8 + t + row * 0.63) * 0.035;
          attribute.setXYZ(i, x, y, -0.2 + row * 0.005);
        }
        attribute.needsUpdate = true;
      });
    },
  };
}

function pa_moon(THREE, scene, x, y, z = -0.2, radius = 0.5) {
  const halo = new THREE.Mesh(new THREE.SphereGeometry(radius * 2.4, 24, 16), new THREE.MeshBasicMaterial({ color: 0xc4d5e5, transparent: true, opacity: 0.045, depthWrite: false }));
  halo.position.set(x, y, z - 0.25);
  halo.scale.set(1.2, 0.86, 0.18);
  scene.add(halo);
  const glow = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.5, 24, 16), new THREE.MeshBasicMaterial({ color: 0xf2e9d2, transparent: true, opacity: 0.12, depthWrite: false }));
  glow.position.set(x, y, z - 0.1);
  glow.scale.set(1.06, 1.06, 0.3);
  scene.add(glow);
  const orb = new THREE.Mesh(new THREE.SphereGeometry(radius, 28, 20), new THREE.MeshBasicMaterial({ color: 0xf5eedb }));
  orb.position.set(x, y, z);
  scene.add(orb);
  return { halo, glow, orb };
}

function pa_branch(THREE, scene, from, to, radiusBottom, radiusTop, material, sides = 8) {
  const start = new THREE.Vector3(from[0], from[1], from[2] || 0);
  const end = new THREE.Vector3(to[0], to[1], to[2] || 0);
  const direction = new THREE.Vector3().subVectors(end, start);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, direction.length(), sides, 1), material);
  mesh.position.copy(start).add(end).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  scene.add(mesh);
  return mesh;
}

function pa_leafGeometry(THREE) {
  const shape = new THREE.Shape();
  shape.moveTo(0, -0.28);
  shape.bezierCurveTo(-0.13, -0.18, -0.17, -0.02, -0.12, 0.12);
  shape.bezierCurveTo(-0.08, 0.23, -0.025, 0.3, 0, 0.34);
  shape.bezierCurveTo(0.035, 0.29, 0.12, 0.2, 0.14, 0.08);
  shape.bezierCurveTo(0.17, -0.06, 0.1, -0.2, 0, -0.28);
  return new THREE.ShapeGeometry(shape, 8);
}

function pa_leafVeinGeometry(THREE) {
  const shape = new THREE.Shape();
  shape.moveTo(-0.009, -0.235);
  shape.lineTo(0.009, -0.235);
  shape.lineTo(0.007, 0.245);
  shape.lineTo(-0.007, 0.245);
  return new THREE.ShapeGeometry(shape, 1);
}

function pa_card(x, y, w, h, op) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="rgba(12,22,36,.88)" stroke="rgba(239,233,216,.38)" stroke-width="3" opacity="${pscO(op)}"/>`;
}

function pa_richPhrase(x, y, parts, size, op = 1) {
  if (op <= 0.001) return '';
  const spans = parts.map(([value, color]) => `<tspan fill="${color}" style="fill:${color}">${esc(value)}</tspan>`).join('');
  return `<text x="${x}" y="${y}" class="t-chalk" font-size="${size}" font-weight="700" text-anchor="start" fill="${PSC_CREAM}" opacity="${pscO(op)}">${spans}</text>`;
}

function pa_oceanScene(THREE, options = {}) {
  const scene = new THREE.Scene();
  const horizon = options.horizon ?? -0.72;
  const segmentLen = options.len ?? 14;
  pa_gradient(THREE, scene, options.skyTop || '#0a1429', options.skyBottom || '#17253a', options.skyOpacity ?? 0.92);
  const stars = options.stars === false ? null : pa_stars(THREE, scene, options.starCount ?? 92, 2.8);
  const water = pa_waterSheet(THREE, scene, horizon, options.waterOpacity ?? 0.72, options.waterTop || '#23394d', options.waterBottom || '#101d2b');
  const waves = pa_waveLines(THREE, scene, horizon, options.waveColor || '#9bb5bc', options.waveOpacity ?? 0.16, options.waveCount ?? 14);
  return {
    scene,
    camera: pa_camera(THREE),
    water,
    waves,
    stars,
    update(u) {
      water.update(u, segmentLen);
      waves.update(u, segmentLen);
      if (stars) stars.update(Math.min(u, segmentLen - 1.5));
    },
  };
}

PscGL.register('a-s2', (THREE) => {
  const scene = new THREE.Scene();
  pa_gradient(THREE, scene, '#081229', '#101d37', 0.94);
  const stars = pa_stars(THREE, scene, 210, 3.5);
  const camera = pa_camera(THREE);
  return {
    scene,
    camera,
    update(u) { stars.update(u); },
  };
});

PscGL.register('a-s4', (THREE) => {
  const base = pa_oceanScene(THREE, { len: 15, horizon: -0.68, skyTop: '#081329', skyBottom: '#14243b', waterTop: '#24435a', waterBottom: '#101b2b', waveColor: '#98b6c5', waveOpacity: 0.18, starCount: 112 });
  const moon = pa_moon(THREE, base.scene, 4.85, 2.55, -0.7, 0.46);
  const pathShape = new THREE.Shape();
  pathShape.moveTo(4.65, -0.78);
  pathShape.lineTo(4.32, -1.4);
  pathShape.lineTo(3.2, -2.45);
  pathShape.lineTo(1.25, -4.62);
  pathShape.lineTo(7.05, -4.62);
  pathShape.lineTo(5.45, -2.5);
  pathShape.lineTo(4.95, -1.45);
  const pathMaterial = new THREE.MeshBasicMaterial({ color: 0xf3dfaa, transparent: true, opacity: 0.075, side: THREE.DoubleSide, depthWrite: false });
  const path = new THREE.Mesh(new THREE.ShapeGeometry(pathShape, 24), pathMaterial);
  path.position.z = -0.75;
  base.scene.add(path);
  const glints = [];
  const rows = 18;
  for (let row = 0; row < rows; row++) {
    const progress = row / (rows - 1);
    const y = -0.86 - progress * 3.45;
    const center = 4.62 - progress * 1.12;
    const span = 0.28 + progress * 1.0;
    const rowMaterial = new THREE.MeshBasicMaterial({ color: row % 4 === 0 ? 0xffedc3 : 0xf1dca7, transparent: true, opacity: 0.01, depthWrite: false });
    const segments = [];
    for (let part = 0; part < 7; part++) {
      const key = row * 19 + part;
      const x = center + (PscGL.rand(key, 51) - 0.5) * span * 2;
      const length = 0.12 + PscGL.rand(key, 52) * (0.17 + progress * 0.24);
      const geometry = new THREE.PlaneGeometry(length, 0.025 + PscGL.rand(key, 53) * 0.025);
      const mesh = new THREE.Mesh(geometry, rowMaterial);
      mesh.position.set(x, y + (PscGL.rand(key, 54) - 0.5) * 0.18, -0.58 + part * 0.002);
      mesh.rotation.z = (PscGL.rand(key, 55) - 0.5) * 0.08;
      base.scene.add(mesh);
      segments.push(mesh);
    }
    glints.push({ material: rowMaterial, progress, segments });
  }
  return {
    scene: base.scene,
    camera: base.camera,
    update(u) {
      base.update(u);
      const motion = Math.min(u, 13.5);
      const reach = pscK(motion, 1.5, 8);
      pathMaterial.opacity = 0.018 + 0.075 * reach;
      glints.forEach(({ material, progress }, row) => {
        const arrival = pscK(reach, Math.max(0, progress - 0.11), Math.min(1, progress + 0.12));
        const shimmer = 0.78 + 0.22 * Math.sin(motion * 1.1 + row * 0.87);
        material.opacity = (0.015 + arrival * 0.48) * shimmer;
      });
      moon.glow.material.opacity = 0.12 + 0.012 * Math.sin(motion * 0.32);
    },
  };
});

PscGL.register('a-s5', (THREE) => {
  const scene = new THREE.Scene();
  pa_gradient(THREE, scene, '#09152d', '#142337', 0.94);
  const stars = pa_stars(THREE, scene, 74, 2.6);
  pa_moon(THREE, scene, 6.25, 3.22, -1.6, 0.36);
  const bark = new THREE.MeshBasicMaterial({ color: 0x111d2a });
  const barkLight = new THREE.MeshBasicMaterial({ color: 0x27333a });
  pa_branch(THREE, scene, [3.45, -4.1, -0.2], [3.7, 1.22, -0.1], 0.25, 0.1, bark, 9);
  pa_branch(THREE, scene, [3.67, -0.65, 0], [2.56, 0.9, 0], 0.12, 0.045, barkLight, 7);
  pa_branch(THREE, scene, [3.69, -0.15, 0], [4.72, 1.42, 0], 0.11, 0.04, barkLight, 7);
  pa_branch(THREE, scene, [3.65, 0.45, 0], [3.2, 1.83, 0], 0.08, 0.03, barkLight, 7);
  pa_branch(THREE, scene, [6.65, -4.15, -0.25], [6.58, 0.72, -0.15], 0.2, 0.08, bark, 8);
  pa_branch(THREE, scene, [6.61, -0.42, -0.05], [5.78, 0.75, -0.02], 0.09, 0.035, barkLight, 7);
  pa_branch(THREE, scene, [6.6, 0.05, -0.02], [7.3, 1.18, -0.02], 0.08, 0.03, barkLight, 7);
  const crownSpecs = [
    [2.55, 1.45, 1.18, 0.78], [3.27, 2.05, 1.28, 0.92], [4.14, 1.75, 1.2, 0.82],
    [3.52, 2.63, 0.92, 0.72], [4.83, 2.25, 0.93, 0.72], [5.56, 1.44, 0.96, 0.68],
    [6.05, 1.38, 0.88, 0.64], [6.78, 1.77, 1.02, 0.72], [7.39, 1.24, 0.86, 0.62],
  ];
  const deepLeaf = new THREE.Color('#183047'), paleLeaf = new THREE.Color('#a7b8b8');
  const crowns = [];
  crownSpecs.forEach(([x, y, sx, sy], i) => {
    const geometry = new THREE.IcosahedronGeometry(0.78, 1);
    const material = new THREE.MeshBasicMaterial({ color: deepLeaf.clone().multiplyScalar(0.8 + (i % 3) * 0.08) });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, 0.08 + i * 0.006);
    mesh.scale.set(sx, sy, 0.58);
    scene.add(mesh);
    crowns.push({ material, factor: 0.64 + (i % 4) * 0.08 });
  });
  const leafGeo = pa_leafGeometry(THREE);
  const edgeMaterial = new THREE.MeshBasicMaterial({ color: 0xd7e0d7, transparent: true, opacity: 0.04, side: THREE.DoubleSide, depthWrite: false });
  const edgeLeaves = new THREE.InstancedMesh(leafGeo, edgeMaterial, 156);
  edgeLeaves.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  edgeLeaves.frustumCulled = false;
  const dummy = new THREE.Object3D();
  for (let i = 0; i < 156; i++) {
    const spec = crownSpecs[i % crownSpecs.length];
    const x = spec[0] + (PscGL.rand(i, 62) - 0.5) * spec[2] * 1.75;
    const y = spec[1] + (PscGL.rand(i, 63) - 0.5) * spec[3] * 1.65;
    dummy.position.set(x, y, 0.58 + PscGL.rand(i, 64) * 0.18);
    dummy.rotation.set((PscGL.rand(i, 65) - 0.5) * 0.38, 0, PscGL.rand(i, 66) * Math.PI * 2);
    const size = 0.43 + PscGL.rand(i, 67) * 0.45;
    dummy.scale.set(size, size, 1);
    dummy.updateMatrix();
    edgeLeaves.setMatrixAt(i, dummy.matrix);
  }
  scene.add(edgeLeaves);
  const veilMaterial = new THREE.MeshBasicMaterial({ color: 0xd8e3e4, transparent: true, opacity: 0, depthWrite: false });
  const veils = crownSpecs.slice(1, 7).map(([x, y, sx, sy], i) => {
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.64, 14, 10), veilMaterial);
    mesh.position.set(x, y + 0.02, 0.42 + i * 0.004);
    mesh.scale.set(sx * 1.12, sy * 0.85, 0.38);
    scene.add(mesh);
    return mesh;
  });
  const camera = pa_camera(THREE);
  return {
    scene,
    camera,
    update(u) {
      const motion = Math.min(u, 12.5);
      const silver = pscK(motion, 1.5, 8);
      stars.update(motion);
      crowns.forEach(({ material, factor }) => material.color.copy(deepLeaf).lerp(paleLeaf, silver * factor));
      edgeMaterial.opacity = 0.02 + silver * 0.54;
      veilMaterial.opacity = silver * 0.075;
      veils.forEach((mesh, i) => { mesh.scale.y = (0.85 + 0.05 * Math.sin(motion * 0.34 + i)) * (0.8 + silver * 0.12); });
    },
  };
});

PscGL.register('a-s8', (THREE) => {
  const scene = new THREE.Scene();
  pa_gradient(THREE, scene, '#09152b', '#172235', 0.95);
  const stars = pa_stars(THREE, scene, 56, 2.4);
  pa_moon(THREE, scene, 6.46, 3.28, -2.1, 0.31);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(16, 0.88), new THREE.MeshBasicMaterial({ color: 0x101b26, transparent: true, opacity: 0.8, depthWrite: false }));
  ground.position.set(0, -4.12, -0.45);
  scene.add(ground);
  const trunk = new THREE.MeshBasicMaterial({ color: 0x111923 });
  const limbs = new THREE.MeshBasicMaterial({ color: 0x202d37 });
  pa_branch(THREE, scene, [4.08, -4.18, -0.12], [4.32, 1.56, 0], 0.29, 0.1, trunk, 9);
  pa_branch(THREE, scene, [4.22, -0.58, 0], [2.78, 0.85, 0.02], 0.12, 0.035, limbs, 7);
  pa_branch(THREE, scene, [4.3, -0.1, 0], [5.58, 1.42, 0.02], 0.11, 0.035, limbs, 7);
  pa_branch(THREE, scene, [4.31, 0.48, 0], [3.58, 2.14, 0.02], 0.085, 0.028, limbs, 7);
  pa_branch(THREE, scene, [5.02, 0.46, 0], [6.07, 2.0, 0.02], 0.075, 0.025, limbs, 7);
  const canopySpecs = [
    [2.75, 1.58, 1.12, 0.74], [3.4, 2.22, 1.0, 0.72], [4.27, 2.48, 1.14, 0.78],
    [5.15, 2.23, 1.16, 0.76], [5.83, 1.6, 1.03, 0.7], [4.24, 1.44, 1.18, 0.8],
  ];
  canopySpecs.forEach(([x, y, sx, sy], i) => {
    const material = new THREE.MeshBasicMaterial({ color: i % 2 ? 0x263342 : 0x1c2935 });
    const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.78, 1), material);
    mesh.position.set(x, y, -0.02 + i * 0.005);
    mesh.scale.set(sx, sy, 0.62);
    scene.add(mesh);
  });

  const leafGeometry = pa_leafGeometry(THREE), veinGeometry = pa_leafVeinGeometry(THREE);
  const palette = [0xd9877f, 0xe5aa77, 0xe9c59a];
  const leafTotal = 102, groundTotal = 186;
  const leafGroups = palette.map((color, group) => {
    const count = Math.ceil(leafTotal / palette.length);
    const leafMaterial = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.94, side: THREE.DoubleSide, depthWrite: false });
    const veinMaterial = new THREE.MeshBasicMaterial({ color: 0xffe1bc, transparent: true, opacity: 0.74, side: THREE.DoubleSide, depthWrite: false });
    const leaves = new THREE.InstancedMesh(leafGeometry, leafMaterial, count);
    const veins = new THREE.InstancedMesh(veinGeometry, veinMaterial, count);
    leaves.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    veins.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    leaves.frustumCulled = false;
    veins.frustumCulled = false;
    scene.add(leaves, veins);
    return { leaves, veins, leafMaterial, veinMaterial, count };
  });
  const groundGroups = palette.map((color) => {
    const count = Math.ceil(groundTotal / palette.length);
    const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.94, side: THREE.DoubleSide, depthWrite: false });
    const leaves = new THREE.InstancedMesh(leafGeometry, material, count);
    leaves.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    leaves.frustumCulled = false;
    scene.add(leaves);
    return { leaves, material, count };
  });
  const fallingData = Array.from({ length: leafTotal }, (_, i) => ({
    x: 2.7 + PscGL.rand(i, 71) * 3.2,
    y: 1.12 + PscGL.rand(i, 72) * 1.75,
    delay: PscGL.rand(i, 73) * 3.35,
    duration: 4.2 + PscGL.rand(i, 74) * 2.45,
    phase: PscGL.rand(i, 75) * Math.PI * 2,
    tilt: (PscGL.rand(i, 76) - 0.5) * 0.5,
    rot: PscGL.rand(i, 77) * Math.PI * 2,
  }));
  const groundData = Array.from({ length: groundTotal }, (_, i) => ({
    x: -7.5 + PscGL.rand(i, 81) * 15,
    y: -4.03 + PscGL.rand(i, 82) * 0.23,
    phase: PscGL.rand(i, 83),
    rot: PscGL.rand(i, 84) * Math.PI * 2,
    size: 0.44 + PscGL.rand(i, 85) * 0.58,
  }));
  const dummy = new THREE.Object3D();
  const camera = pa_camera(THREE);
  return {
    scene,
    camera,
    update(u) {
      const motion = Math.min(u, 14.5);
      stars.update(motion);
      leafGroups.forEach((group) => { group.leaves.count = 0; group.veins.count = 0; });
      fallingData.forEach((leaf, i) => {
        const groupIndex = i % palette.length, slot = Math.floor(i / palette.length);
        const group = leafGroups[groupIndex];
        const start = 1.0 + leaf.delay;
        const p = THREE.MathUtils.clamp((motion - start) / leaf.duration, 0, 1);
        const sway = Math.sin(motion * 1.15 + leaf.phase) * 0.24 * (p > 0 ? 1 : 0.2);
        const x = leaf.x + p * (1.05 + PscGL.rand(i, 86) * 1.05) + sway;
        const y = leaf.y - (leaf.y + 3.8) * p + Math.sin(p * Math.PI) * 0.22;
        const z = 0.72 + (i % 9) * 0.012;
        const rot = leaf.rot + p * (2.4 + PscGL.rand(i, 87) * 1.8) + Math.sin(motion * 0.8 + leaf.phase) * 0.12;
        const tilt = leaf.tilt + Math.sin(motion * 0.9 + leaf.phase) * 0.24 * (p < 1 ? 1 : 0.1);
        const scale = 0.58 + 0.16 * PscGL.rand(i, 88);
        dummy.position.set(x, y, z);
        dummy.rotation.set(tilt, Math.sin(motion * 0.72 + leaf.phase) * 0.42 * (p < 1 ? 1 : 0.06), rot);
        dummy.scale.set(scale, scale * (0.86 + 0.2 * PscGL.rand(i, 89)), 1);
        dummy.updateMatrix();
        group.leaves.setMatrixAt(slot, dummy.matrix);
        group.veins.setMatrixAt(slot, dummy.matrix);
        group.leaves.count = Math.max(group.leaves.count, slot + 1);
        group.veins.count = Math.max(group.veins.count, slot + 1);
      });
      leafGroups.forEach((group) => {
        group.leaves.instanceMatrix.needsUpdate = true;
        group.veins.instanceMatrix.needsUpdate = true;
      });
      groundGroups.forEach((group) => { group.leaves.count = 0; });
      groundData.forEach((leaf, i) => {
        const groupIndex = i % palette.length, slot = Math.floor(i / palette.length);
        const group = groundGroups[groupIndex];
        const appear = pscK(motion, 4.5 + leaf.phase * 4.2, 6.0 + leaf.phase * 4.2);
        dummy.position.set(leaf.x, leaf.y, 0.24 + (i % 11) * 0.01);
        dummy.rotation.set(0, 0, leaf.rot);
        dummy.scale.set(leaf.size * appear, leaf.size * appear, 1);
        dummy.updateMatrix();
        group.leaves.setMatrixAt(slot, dummy.matrix);
        group.leaves.count = Math.max(group.leaves.count, slot + 1);
      });
      groundGroups.forEach((group) => { group.leaves.instanceMatrix.needsUpdate = true; });
    },
  };
});

PscGL.register('a-s10', (THREE) => pa_oceanScene(THREE, {
  len: 14,
  horizon: -0.68,
  skyTop: '#0a1427',
  skyBottom: '#131f31',
  skyOpacity: 0.92,
  waterTop: '#1c3040',
  waterBottom: '#101925',
  waterOpacity: 0.45,
  waveColor: '#8299a5',
  waveOpacity: 0.095,
  waveCount: 9,
  starCount: 28,
}));

function s2(u) {
  PscGL.show('a-s2', u, 12);
  const lines = [
    [300, '月亮悄悄爬上山頭，'],
    [345, '像一盞剛點亮的燈。'],
    [420, '月光灑在海上，'],
    [465, '海浪鋪成一條銀色的路；'],
    [510, '月光灑在樹梢，'],
    [555, '葉子輕輕披上白紗；'],
    [600, '月光灑在窗前，'],
    [645, '小貓的影子伸了個懶腰。'],
    [720, '夜風沙沙地吹，'],
    [765, '葉子一片片飄落，'],
    [810, '輕輕對大地說：晚安。'],
  ];
  let g = pscHead(u, 1);
  lines.forEach(([y, value], i) => {
    const start = 0.5 + i * 0.54;
    const k = pscK(u, start, start + 0.38);
    if (k <= 0.001) return;
    g += `<g opacity="${pscO(k)}" transform="translate(0 ${pscN(24 * (1 - k))})">${txt(520, y, value, { s: 30, f: PSC_CREAM, w: 1 })}</g>`;
  });
  const stanzaK = pscK(u, 6.2, 7.0);
  if (stanzaK > 0.001) {
    const brace = (x, top, bottom, label, cy) => {
      const mid = (top + bottom) / 2;
      const d = `M${x + 20} ${top} C${x + 3} ${top} ${x + 3} ${top} ${x + 3} ${top + 18} L${x + 3} ${mid - 16} C${x + 3} ${mid - 5} ${x - 10} ${mid - 5} ${x - 18} ${mid} C${x - 10} ${mid + 5} ${x + 3} ${mid + 5} ${x + 3} ${mid + 16} L${x + 3} ${bottom - 18} C${x + 3} ${bottom} ${x + 3} ${bottom} ${x + 20} ${bottom}`;
      return `<path d="${d}" fill="none" stroke="${PSC_YELLOW}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="${pscO(stanzaK)}"/>` + pscPhrase(x + 32, cy, label, 30, PSC_YELLOW, stanzaK);
    };
    g += brace(1042, 278, 366, '第一節', 333);
    g += brace(1042, 399, 666, '第二節', 539);
    g += brace(1042, 698, 829, '第三節', 778);
  }
  const cardK = pscK(u, 9.5, 9.9);
  if (cardK > 0.001) {
    g += `<g opacity="${pscO(cardK)}">${box(1150, 430, 340, 72, PSC_YELLOW, 1, 'rgba(12,22,36,.92)')}</g>`;
    g += pscPhrase(1172, 475, '一句一行，一節一組', 30, PSC_CREAM, cardK);
  }
  return pscPaint(g);
}

function s4(u) {
  PscGL.show('a-s4', u, 15);
  const op = pscK(u, 0.3, 0.9);
  let g = pscHead(u, 3);
  g += pa_card(110, 230, 650, 160, op);
  g += pscPhrase(150, 300, '月光灑在海上，', 34, PSC_CREAM, op);
  g += pscPhrase(150, 350, '海浪鋪成一條銀色的路；', 34, PSC_CREAM, op);
  return pscPaint(g);
}

function s5(u) {
  PscGL.show('a-s5', u, 14);
  const op = pscK(u, 0.3, 0.9);
  let g = pscHead(u, 4);
  g += pa_card(110, 230, 650, 160, op);
  g += pscPhrase(150, 300, '月光灑在樹梢，', 34, PSC_CREAM, op);
  g += pscPhrase(150, 350, '葉子輕輕披上白紗；', 34, PSC_CREAM, op);
  return pscPaint(g);
}

function s8(u) {
  PscGL.show('a-s8', u, 16);
  const op = pscK(u, 0.3, 0.9);
  let g = pscHead(u, 7);
  g += pa_card(110, 210, 650, 210, op);
  g += pa_richLeft(150, 270, [['夜風', PSC_CREAM], ['沙沙', PSC_YELLOW], ['地吹，', PSC_CREAM]], 34, op);
  g += pa_richLeft(150, 320, [['葉子', PSC_CREAM], ['一片片', PSC_YELLOW], ['飄落，', PSC_CREAM]], 34, op);
  g += pa_richLeft(150, 370, [['輕輕', PSC_YELLOW], ['對大地說：晚安。', PSC_CREAM]], 34, op);
  const tagOp = pscK(u, 0.8, 1.25);
  g += pscTag(1130, 210, 330, '擬聲、疊詞', tagOp);
  return pscPaint(g);
}

function pa_senseIcon(cx, cy, kind, op, flash) {
  if (op <= 0.001) return '';
  let art = '';
  if (kind === 'eye') art = '<path d="M-20 0 Q0-20 20 0 Q0 20-20 0Z"/><circle cx="0" cy="0" r="5" fill="currentColor"/>';
  if (kind === 'ear') art = '<path d="M12-7 C12-19-4-22-12-13 C-19-5-12 1-10 7 C-8 12-8 19 0 19 C6 19 9 15 9 10"/><path d="M2-9 C7-8 8-2 4 2 C1 5 0 8 2 10"/>';
  if (kind === 'hand') art = '<path d="M-13 3 L-13-8 Q-13-12-9-12 Q-5-12-5-8 L-5 0 L-4-17 Q-4-21 0-21 Q4-21 4-17 L4 0 L5-14 Q5-18 9-18 Q13-18 13-14 L13 2 L14-8 Q14-12 18-11 Q22-10 21-6 L19 10 Q17 20 7 21 L-2 21 Q-9 20-13 12Z"/>';
  const fill = flash > 0.1 ? `rgba(242,193,78,${(0.18 * flash).toFixed(3)})` : 'rgba(12,22,36,.12)';
  return `<g transform="translate(${cx} ${cy})" opacity="${pscO(op)}" color="${PSC_CREAM}"><rect x="-30" y="-30" width="60" height="60" rx="12" fill="${fill}" stroke="${PSC_YELLOW}" stroke-width="3" stroke-dasharray="8 6"/><g fill="none" stroke="${PSC_CREAM}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">${art}</g></g>`;
}

function s10(u) {
  PscGL.show('a-s10', u, 14);
  let g = pscHead(u, 9);
  const titleOp = pscK(u, 0.3, 0.8);
  if (titleOp > 0.001) {
    g += `<rect x="600" y="230" width="400" height="72" rx="18" fill="rgba(12,22,36,.9)" stroke="${PSC_YELLOW}" stroke-width="4" opacity="${pscO(titleOp)}"/>`;
    g += pscPhrase(800, 279, '〈大海〉', 40, PSC_YELLOW, titleOp, 'middle');
  }
  const rows = [[340, 400], [480, 540], [620, 680]];
  rows.forEach(([top, bottom], i) => {
    const op = pscK(u, 0.7, 1.1);
    const flash = pscFlash(u, 10 + i);
    g += pscBlock(360, top, 880, 52, PSC_YELLOW, op, true, flash);
    g += pscPhrase(390, top + 36, '＿＿灑在＿＿，', 30, 'rgba(242,193,78,.82)', op);
    g += pscBlock(360, bottom, 880, 52, PSC_YELLOW, op, true, flash);
    g += pa_senseIcon(1320, [400, 520, 640][i], ['eye', 'ear', 'hand'][i], op, flash);
  });
  const questionOp = pscK(u, 9, 9.35);
  g += pscTag(1180, 740, 300, '你看到什麼畫面？', questionOp);
  return pscPaint(g);
}

// 主 session 修正：原呼叫的 pscRichPhrase 不存在（執行錯誤），補一個靠左的多色字小工具，外觀同 pscRich。
function pa_richLeft(x, y, parts, size = 30, op = 1) {
  if (op <= 0.001) return '';
  const spans = parts.map(([t, c]) => `<tspan fill="${c}" style="fill:${c}">${esc(t)}</tspan>`).join('');
  return `<text x="${x}" y="${y}" class="t-chalk" font-size="${size}" font-weight="700" text-anchor="start" fill="${PSC_CREAM}" opacity="${pscO(op)}">${spans}</text>`;
}
