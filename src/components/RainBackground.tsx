import { useEffect, useRef } from "react";
import * as THREE from "three";

type RainLayer = {
  count: number;
  speedMin: number;
  speedMax: number;
  lengthMin: number;
  lengthMax: number;
  opacity: number;
  color: number;
  spreadX: number;
  spreadY: number;
  spreadZ: number;
  drift: number;
};

function createRainLayer(
  scene: any,
  config: RainLayer
): {
  geometry: any;
  material: any;
  velocities: Float32Array;
  driftPhase: Float32Array;
  count: number;
} {
  const { count, lengthMin, lengthMax, spreadX, spreadY, spreadZ, opacity, color } = config;
  const positions = new Float32Array(count * 6);
  const velocities = new Float32Array(count);
  const driftPhase = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * spreadX;
    const y = (Math.random() - 0.5) * spreadY + spreadY * 0.35;
    const z = (Math.random() - 0.5) * spreadZ;
    const len = lengthMin + Math.random() * (lengthMax - lengthMin);
    const base = i * 6;
    positions[base] = x;
    positions[base + 1] = y;
    positions[base + 2] = z;
    positions[base + 3] = x;
    positions[base + 4] = y - len;
    positions[base + 5] = z;
    velocities[i] = config.speedMin + Math.random() * (config.speedMax - config.speedMin);
    driftPhase[i] = Math.random() * Math.PI * 2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.NormalBlending,
  });

  const lines = new THREE.LineSegments(geometry, material);
  scene.add(lines);

  return { geometry, material, velocities, driftPhase, count };
}

export function RainBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 200);
    camera.position.set(0, 4, 42);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    const canvas = renderer.domElement;
    canvas.style.position = "absolute";
    canvas.style.inset = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const mobile = window.innerWidth < 640;
    const layers: ReturnType<typeof createRainLayer>[] = [];

    /* Sparse streaks, natural fall speed — still soft opacity */
    layers.push(
      createRainLayer(scene, {
        count: mobile ? 180 : 380,
        speedMin: 0.42,
        speedMax: 0.78,
        lengthMin: 0.55,
        lengthMax: 1.15,
        opacity: 0.07,
        color: 0x1c1c24,
        spreadX: 95,
        spreadY: 75,
        spreadZ: 22,
        drift: 0.006,
      })
    );

    layers.push(
      createRainLayer(scene, {
        count: mobile ? 120 : 260,
        speedMin: 0.28,
        speedMax: 0.52,
        lengthMin: 0.4,
        lengthMax: 0.85,
        opacity: 0.045,
        color: 0x25252e,
        spreadX: 105,
        spreadY: 82,
        spreadZ: 32,
        drift: 0.004,
      })
    );

    layers.push(
      createRainLayer(scene, {
        count: mobile ? 70 : 140,
        speedMin: 0.16,
        speedMax: 0.32,
        lengthMin: 0.28,
        lengthMax: 0.55,
        opacity: 0.028,
        color: 0x2a2a35,
        spreadX: 115,
        spreadY: 88,
        spreadZ: 40,
        drift: 0.003,
      })
    );

    const clock = new THREE.Clock();
    let animationId = 0;

    const bounds = { top: 48, bottom: -48, side: 52 };

    const resize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    window.addEventListener("orientationchange", resize);

    const tick = () => {
      animationId = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();
      const gust =
        Math.sin(t * 0.12) * 0.22 + Math.sin(t * 0.35) * 0.08 + Math.sin(t * 0.55 + 1.2) * 0.05;

      for (let L = 0; L < layers.length; L++) {
        const layer = layers[L];
        const { geometry, velocities, driftPhase, count } = layer;
        const pos = geometry.attributes.position.array as Float32Array;
        const driftScale = [0.006, 0.004, 0.0025][L] ?? 0.003;

        for (let i = 0; i < count; i++) {
          const base = i * 6;
          const vy = velocities[i];
          const wind = gust * driftScale * 10 + Math.sin(t * 0.28 + driftPhase[i]) * driftScale * 2.5;

          pos[base] += wind * 0.012;
          pos[base + 1] -= vy;
          pos[base + 2] += Math.cos(t * 0.22 + driftPhase[i]) * 0.006;

          pos[base + 3] += wind * 0.012;
          pos[base + 4] -= vy;
          pos[base + 5] += Math.cos(t * 0.22 + driftPhase[i]) * 0.006;

          if (pos[base + 4] < bounds.bottom) {
            const nx = (Math.random() - 0.5) * (95 + L * 12);
            const ny = bounds.top + Math.random() * 12;
            const nz = (Math.random() - 0.5) * (28 + L * 8);
            const len =
              [0.55, 0.4, 0.28][L]! + Math.random() * ([0.6, 0.45, 0.27][L] ?? 0.5);
            pos[base] = nx;
            pos[base + 1] = ny;
            pos[base + 2] = nz;
            pos[base + 3] = nx;
            pos[base + 4] = ny - len;
            pos[base + 5] = nz;
          }

          if (pos[base] > bounds.side) pos[base] = pos[base + 3] = -bounds.side;
          if (pos[base] < -bounds.side) pos[base] = pos[base + 3] = bounds.side;
        }
        geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationId);
      ro.disconnect();
      window.removeEventListener("orientationchange", resize);
      layers.forEach(({ geometry, material }) => {
        geometry.dispose();
        material.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    />
  );
}
