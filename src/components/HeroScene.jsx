import { useEffect, useRef } from "react";
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Clock,
  Color,
  DirectionalLight,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  Points,
  PointsMaterial,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { createBrain, pointOnEdge, seededRandom } from "./brainGeometry";

const TEAL = new Color(0x2dd4bf);
const LIGHT_TEAL = new Color(0x9ff5e8);
const CORAL = new Color(0xff7a59);
const EDGE_SEGMENTS = 8;
const PULSE_COUNT = 64;

function glowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.25, "rgba(255,255,255,0.75)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return new CanvasTexture(canvas);
}

// The folds take real CPU to generate, so that happens in a worker to keep the
// page responsive. Falls back to the main thread if workers aren't available.
function loadBrain(options) {
  return new Promise((resolve) => {
    let worker;
    try {
      worker = new Worker(new URL("./brain.worker.js", import.meta.url), { type: "module" });
    } catch {
      resolve(createBrain(options));
      return;
    }
    worker.onerror = () => {
      worker.terminate();
      resolve(createBrain(options));
    };
    worker.onmessage = ({ data }) => {
      worker.terminate();
      resolve({
        surfaces: data.surfaces.map(({ position, normal, color, index }) => {
          const geometry = new BufferGeometry();
          geometry.setAttribute("position", new BufferAttribute(position, 3));
          geometry.setAttribute("normal", new BufferAttribute(normal, 3));
          geometry.setAttribute("color", new BufferAttribute(color, 3));
          if (index) geometry.setIndex(new BufferAttribute(index, 1));
          return geometry;
        }),
        nodes: data.nodes.map((position) => ({ position: new Vector3(...position) })),
        edges: data.edges.map(({ a, b, control }) => ({ a, b, control: new Vector3(...control) })),
        adjacency: data.adjacency,
      });
    };
    worker.postMessage(options);
  });
}

// Living brain: slow rotation that follows the pointer, a gentle breath, a
// wave of activity across the cortex, and coral signals hopping between
// neurons, which flash when one arrives. Pauses off-screen; renders one still
// frame under reduced motion. Returns its cleanup function.
function startScene(mount, { surfaces, nodes, edges, adjacency }) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let renderer;
  try {
    renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    // No WebGL: the CSS orb behind this mount stays as the fallback.
    surfaces.forEach((geometry) => geometry.dispose());
    return () => {};
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  mount.appendChild(renderer.domElement);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const envMap = pmrem.fromScene(room, 0.04).texture;
  scene.environment = envMap;

  const camera = new PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 7.5);

  const frame = new Group(); // fits the brain to the viewport
  const brain = new Group(); // rotates and breathes
  frame.add(brain);
  scene.add(frame);

  const uniforms = { uTime: { value: 0 } };
  const cortex = new MeshPhysicalMaterial({
    vertexColors: true,
    metalness: 0.15,
    roughness: 0.5,
    clearcoat: 0.8,
    clearcoatRoughness: 0.35,
    envMapIntensity: 0.4,
  });
  // A soft band of activity sweeping front to back across the surface
  cortex.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = uniforms.uTime;
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vBrainPos;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvBrainPos = position;");
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nuniform float uTime;\nvarying vec3 vBrainPos;")
      .replace(
        "#include <emissivemap_fragment>",
        `#include <emissivemap_fragment>
        float brainWave = sin(vBrainPos.z * 2.4 + vBrainPos.y * 1.3 - uTime * 1.2) * 0.5 + 0.5;
        totalEmissiveRadiance += vec3(0.1, 0.72, 0.65) * pow(brainWave, 6.0) * 0.5 * vColor.g;`
      );
  };
  surfaces.forEach((geometry) => brain.add(new Mesh(geometry, cortex)));

  // Wiring between neurons
  const linePositions = new Float32Array(edges.length * EDGE_SEGMENTS * 6);
  const from = new Vector3();
  const to = new Vector3();
  edges.forEach((edge, e) => {
    for (let s = 0; s < EDGE_SEGMENTS; s++) {
      pointOnEdge(edge, nodes, s / EDGE_SEGMENTS, from);
      pointOnEdge(edge, nodes, (s + 1) / EDGE_SEGMENTS, to);
      linePositions.set([from.x, from.y, from.z, to.x, to.y, to.z], (e * EDGE_SEGMENTS + s) * 6);
    }
  });
  const lineGeometry = new BufferGeometry();
  lineGeometry.setAttribute("position", new BufferAttribute(linePositions, 3));
  const lineMaterial = new LineBasicMaterial({
    color: TEAL,
    transparent: true,
    opacity: 0.4,
    blending: AdditiveBlending,
    depthWrite: false,
  });
  brain.add(new LineSegments(lineGeometry, lineMaterial));

  const glow = glowTexture();

  // Neurons: flash coral when a signal lands, then settle back to teal
  const nodePositions = new Float32Array(nodes.length * 3);
  const nodeColors = new Float32Array(nodes.length * 3);
  nodes.forEach((node, i) => node.position.toArray(nodePositions, i * 3));
  const nodeGeometry = new BufferGeometry();
  nodeGeometry.setAttribute("position", new BufferAttribute(nodePositions, 3));
  nodeGeometry.setAttribute("color", new BufferAttribute(nodeColors, 3));
  const nodeMaterial = new PointsMaterial({
    size: 0.11,
    map: glow,
    vertexColors: true,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
  });
  brain.add(new Points(nodeGeometry, nodeMaterial));

  // Signals travelling along the wiring
  const random = seededRandom(23);
  const pulses = Array.from({ length: PULSE_COUNT }, () => ({
    edge: Math.floor(random() * edges.length),
    t: random(),
    speed: 0.5 + random() * 0.9,
    forward: random() > 0.5,
  }));
  const pulsePositions = new Float32Array(PULSE_COUNT * 3);
  const pulseGeometry = new BufferGeometry();
  pulseGeometry.setAttribute("position", new BufferAttribute(pulsePositions, 3));
  const pulseMaterial = new PointsMaterial({
    size: 0.16,
    map: glow,
    // Normal blending: additive would wash coral out to white over the teal
    color: CORAL,
    transparent: true,
    depthWrite: false,
  });
  brain.add(new Points(pulseGeometry, pulseMaterial));

  const activation = new Float32Array(nodes.length);
  const point = new Vector3();
  const nodeColor = new Color();

  const updateNetwork = (delta) => {
    pulses.forEach((pulse, i) => {
      pulse.t += delta * pulse.speed;
      if (pulse.t >= 1) {
        const edge = edges[pulse.edge];
        const arrived = pulse.forward ? edge.b : edge.a;
        activation[arrived] = 1;
        // Carry on along a random connection of the neuron it reached
        const options = adjacency[arrived];
        pulse.edge = options[Math.floor(random() * options.length)];
        pulse.forward = edges[pulse.edge].a === arrived;
        pulse.t = 0;
      }
      pointOnEdge(edges[pulse.edge], nodes, pulse.forward ? pulse.t : 1 - pulse.t, point);
      point.toArray(pulsePositions, i * 3);
    });
    pulseGeometry.attributes.position.needsUpdate = true;

    for (let i = 0; i < nodes.length; i++) {
      activation[i] = Math.max(0, activation[i] - delta * 1.6);
      nodeColor.copy(LIGHT_TEAL).lerp(CORAL, activation[i]).multiplyScalar(0.65 + activation[i] * 0.9);
      nodeColor.toArray(nodeColors, i * 3);
    }
    nodeGeometry.attributes.color.needsUpdate = true;
  };

  const key = new DirectionalLight(0xe8fbff, 1.5);
  key.position.set(3, 4, 5);
  const rim = new DirectionalLight(0x2dd4bf, 2.4);
  rim.position.set(-4, 1, -4);
  const fill = new DirectionalLight(0xff7a59, 0.7);
  fill.position.set(2, -4, 1);
  scene.add(key, rim, fill);

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = mount;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // Keep the brain inside narrow (portrait) frames
    frame.scale.setScalar(Math.min(1, camera.aspect * 1.15));
  };
  resize();
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(mount);

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const handlePointer = (e) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", handlePointer, { passive: true });

  const clock = new Clock();
  let animationFrame = null;
  let visible = true;

  const renderFrame = () => {
    const delta = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    uniforms.uTime.value = t;
    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;
    brain.rotation.y = -0.75 + t * 0.2 + pointer.x * 0.5;
    brain.rotation.x = 0.1 + pointer.y * 0.28;
    brain.scale.setScalar(1.28 + Math.sin(t * 1.1) * 0.015);
    brain.position.y = 0.2 + Math.sin(t * 0.7) * 0.05;
    updateNetwork(delta);
    renderer.render(scene, camera);
  };

  const loop = () => {
    renderFrame();
    animationFrame = visible ? requestAnimationFrame(loop) : null;
  };

  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && animationFrame == null && !reduceMotion) {
      clock.getDelta(); // don't count the time spent paused
      loop();
    }
  });
  intersection.observe(mount);

  if (reduceMotion) renderFrame();
  else loop();
  mount.dataset.ready = "true";

  return () => {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    intersection.disconnect();
    resizeObserver.disconnect();
    window.removeEventListener("pointermove", handlePointer);
    surfaces.forEach((geometry) => geometry.dispose());
    [lineGeometry, nodeGeometry, pulseGeometry].forEach((geometry) => geometry.dispose());
    [cortex, lineMaterial, nodeMaterial, pulseMaterial].forEach((material) => material.dispose());
    glow.dispose();
    envMap.dispose();
    pmrem.dispose();
    room.dispose?.();
    renderer.dispose();
    renderer.domElement.remove();
    delete mount.dataset.ready;
  };
}

export default function HeroScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    let cleanup = null;
    let cancelled = false;

    // Phones get fewer triangles and neurons
    loadBrain({ detail: finePointer ? 56 : 34, nodeCount: finePointer ? 130 : 80 }).then((brain) => {
      if (!cancelled) cleanup = startScene(mount, brain);
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <div ref={mountRef} className="hero-scene" aria-hidden="true" />;
}
