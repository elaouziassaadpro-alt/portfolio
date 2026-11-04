import { BufferAttribute, Color, CylinderGeometry, IcosahedronGeometry, Vector3 } from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// Procedural anatomy for the hero brain: no model file to download, and the
// folds can be as fine as the device allows.

const GYRUS_COLOR = new Color(0x186474);
const SULCUS_COLOR = new Color(0x06222c);

export function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Classic 3D Perlin noise, roughly in [-1, 1]
function createNoise(seed) {
  const random = seededRandom(seed);
  const p = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  const perm = [...p, ...p];
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a, b, t) => a + (b - a) * t;
  const grad = (hash, x, y, z) => {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
  };

  return (x, y, z) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);
    const u = fade(x);
    const v = fade(y);
    const w = fade(z);
    const A = perm[X] + Y;
    const AA = perm[A] + Z;
    const AB = perm[A + 1] + Z;
    const B = perm[X + 1] + Y;
    const BA = perm[B] + Z;
    const BB = perm[B + 1] + Z;
    return lerp(
      lerp(
        lerp(grad(perm[AA], x, y, z), grad(perm[BA], x - 1, y, z), u),
        lerp(grad(perm[AB], x, y - 1, z), grad(perm[BB], x - 1, y - 1, z), u),
        v
      ),
      lerp(
        lerp(grad(perm[AA + 1], x, y, z - 1), grad(perm[BA + 1], x - 1, y, z - 1), u),
        lerp(grad(perm[AB + 1], x, y - 1, z - 1), grad(perm[BB + 1], x - 1, y - 1, z - 1), u),
        v
      ),
      w
    );
  };
}

function smoothstep(edge0, edge1, x) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

function sphereGeometry(detail) {
  const geometry = new IcosahedronGeometry(1, detail);
  // Without these, vertices along UV seams stay split and the folds shade flat
  geometry.deleteAttribute("normal");
  geometry.deleteAttribute("uv");
  return mergeVertices(geometry, 1e-4);
}

// side: 1 = right hemisphere, -1 = left. +z is the front of the brain.
// Returns the geometry plus the crest-of-fold points the neurons sit on.
function createHemisphere(side, detail, noise) {
  const geometry = sphereGeometry(detail);
  const position = geometry.attributes.position;
  const colors = new Float32Array(position.count * 3);
  const crests = [];
  const offset = side > 0 ? 0 : 37.2; // so the two sides aren't mirror images
  const color = new Color();
  const normal = new Vector3();

  for (let i = 0; i < position.count; i++) {
    const dx = position.getX(i);
    const dy = position.getY(i);
    const dz = position.getZ(i);

    // Outward distance from the midline, then squash the inner wall flat
    let out = side * dx * 0.68;
    const isMedial = out < -0.3;
    if (isMedial) out = -0.3 + (out + 0.3) * 0.15;

    let y = dy * 1.0;
    const z = dz * 1.42;

    y *= 1 - 0.2 * Math.pow(Math.max(0, z) / 1.42, 2); // frontal taper
    if (y < -0.35) y = -0.35 + (y + 0.35) * 0.6; // flatter underside
    // Temporal lobe: bulge low on the side, toward the front
    y -= 0.24 * Math.exp(-(Math.pow(z - 0.35, 2) / 0.35 + Math.pow(out - 0.3, 2) / 0.2)) * smoothstep(0.1, -0.4, y);

    normal.set(dx / 0.68, dy, dz / 1.42).normalize();

    // Gyri: the zero contours of warped noise wander like cortical folds
    const warp = noise(dx * 1.2 + offset, dy * 1.2, dz * 1.2) * 0.55;
    const n = noise(dx * 3.3 + warp + offset, dy * 3.3 - warp, dz * 4.4 + warp);
    const crest = smoothstep(0, 0.32, Math.abs(n));
    const groove = 1 - smoothstep(0, 0.1, Math.abs(n));
    const fine = noise(dx * 13 + offset, dy * 13, dz * 13) * 0.006;
    const strength = isMedial ? 0.2 : 1;
    const displacement = (0.07 * crest - 0.055 * groove + fine) * strength;

    const px = side * (out + 0.355) + normal.x * displacement;
    const py = y + normal.y * displacement;
    const pz = z + normal.z * displacement;
    position.setXYZ(i, px, py, pz);

    color.copy(SULCUS_COLOR).lerp(GYRUS_COLOR, crest);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;

    if (!isMedial && crest > 0.85 && py > -0.62) {
      crests.push({ position: new Vector3(px, py, pz), normal: normal.clone() });
    }
  }

  geometry.setAttribute("color", new BufferAttribute(colors, 3));
  geometry.computeVertexNormals();
  return { geometry, crests };
}

function createCerebellum(detail, noise) {
  const geometry = sphereGeometry(detail);
  const position = geometry.attributes.position;
  const colors = new Float32Array(position.count * 3);
  const color = new Color();

  for (let i = 0; i < position.count; i++) {
    const dx = position.getX(i);
    const dy = position.getY(i);
    const dz = position.getZ(i);
    // Fine parallel folia instead of the cortex's winding folds
    const wave = Math.sin(dy * 34 + noise(dx * 2, dy * 2, dz * 2) * 3);
    const radius = 1 + 0.035 * wave;
    position.setXYZ(i, dx * 0.62 * radius, -0.66 + dy * 0.34 * radius, -0.98 + dz * 0.44 * radius);

    color.copy(SULCUS_COLOR).lerp(GYRUS_COLOR, wave * 0.5 + 0.5);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  geometry.setAttribute("color", new BufferAttribute(colors, 3));
  geometry.computeVertexNormals();
  return geometry;
}

function createBrainStem() {
  const geometry = new CylinderGeometry(0.17, 0.1, 0.75, 24, 1);
  geometry.rotateX(0.45);
  geometry.translate(0, -0.98, -0.5);
  const count = geometry.attributes.position.count;
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    colors[i * 3] = SULCUS_COLOR.r * 2.2;
    colors[i * 3 + 1] = SULCUS_COLOR.g * 2.2;
    colors[i * 3 + 2] = SULCUS_COLOR.b * 2.2;
  }
  geometry.setAttribute("color", new BufferAttribute(colors, 3));
  return geometry;
}

// Neurons on the crests of the folds, wired to their nearest neighbours by
// slightly arched paths that signals can travel along.
function createNetwork(crests, nodeCount, random) {
  const nodes = [];
  const minDistance = 0.17;
  for (let tries = 0; tries < nodeCount * 40 && nodes.length < nodeCount; tries++) {
    const candidate = crests[Math.floor(random() * crests.length)];
    if (nodes.every((node) => node.position.distanceTo(candidate.position) > minDistance)) {
      nodes.push({
        position: candidate.position.clone().addScaledVector(candidate.normal, 0.025),
        normal: candidate.normal,
      });
    }
  }

  const edges = [];
  const adjacency = nodes.map(() => []);
  const seen = new Set();
  nodes.forEach((node, a) => {
    const nearest = nodes
      .map((other, b) => ({ b, distance: node.position.distanceTo(other.position) }))
      .filter(({ b }) => b !== a)
      .sort((p, q) => p.distance - q.distance)
      .slice(0, 3);

    nearest.forEach(({ b, distance }) => {
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      if (seen.has(key) || distance > 0.6) return;
      seen.add(key);
      const control = node.position
        .clone()
        .add(nodes[b].position)
        .multiplyScalar(0.5)
        .addScaledVector(node.normal.clone().add(nodes[b].normal).normalize(), distance * 0.1);
      adjacency[a].push(edges.length);
      adjacency[b].push(edges.length);
      edges.push({ a, b, control });
    });
  });

  return { nodes, edges, adjacency };
}

export function pointOnEdge(edge, nodes, t, target) {
  const start = nodes[edge.a].position;
  const end = nodes[edge.b].position;
  const inv = 1 - t;
  return target
    .copy(start)
    .multiplyScalar(inv * inv)
    .addScaledVector(edge.control, 2 * inv * t)
    .addScaledVector(end, t * t);
}

export function createBrain({ detail, nodeCount }) {
  const noise = createNoise(11);
  const random = seededRandom(7);
  const right = createHemisphere(1, detail, noise);
  const left = createHemisphere(-1, detail, noise);
  const network = createNetwork([...right.crests, ...left.crests], nodeCount, random);

  return {
    surfaces: [
      right.geometry,
      left.geometry,
      createCerebellum(Math.round(detail * 0.6), noise),
      createBrainStem(),
    ],
    ...network,
  };
}
