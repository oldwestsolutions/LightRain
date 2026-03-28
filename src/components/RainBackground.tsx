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

    layers.push(
      createRainLayer(scene, {
        count: mobile ? 1100 : 2200,
        speedMin: 0.55,
        speedMax: 1.15,
        lengthMin: 1.1,
        lengthMax: 2.8,
        opacity: 0.22,
        color: 0x050505,
        spreadX: 95,
        spreadY: 75,
        spreadZ: 28,
        drift: 0.018,
      })
    );

    layers.push(
      createRainLayer(scene, {
        count: mobile ? 700 : 1400,
        speedMin: 0.35,
        speedMax: 0.72,
        lengthMin: 0.7,
        lengthMax: 1.6,
        opacity: 0.14,
        color: 0x0a0a0a,
        spreadX: 110,
        spreadY: 85,
        spreadZ: 38,
        drift: 0.012,
      })
    );

    layers.push(
      createRainLayer(scene, {
        count: mobile ? 320 : 600,
        speedMin: 0.2,
        speedMax: 0.45,
        lengthMin: 0.45,
        lengthMax: 1.1,
        opacity: 0.09,
        color: 0x111111,
        spreadX: 125,
        spreadY: 90,
        spreadZ: 45,
        drift: 0.008,
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
      const gust = Math.sin(t * 0.35) * 0.4 + Math.sin(t * 1.1) * 0.15;

      for (let L = 0; L < layers.length; L++) {
        const layer = layers[L];
        const { geometry, velocities, driftPhase, count } = layer;
        const pos = geometry.attributes.position.array as Float32Array;
        const driftScale = [0.018, 0.012, 0.008][L] ?? 0.01;

        for (let i = 0; i < count; i++) {
          const base = i * 6;
          const vy = velocities[i];
          const wind = gust * driftScale * 18 + Math.sin(t * 0.8 + driftPhase[i]) * driftScale * 6;

          pos[base] += wind * 0.016;
          pos[base + 1] -= vy;
          pos[base + 2] += Math.cos(t * 0.5 + driftPhase[i]) * 0.012;

          pos[base + 3] += wind * 0.016;
          pos[base + 4] -= vy;
          pos[base + 5] += Math.cos(t * 0.5 + driftPhase[i]) * 0.012;

          if (pos[base + 4] < bounds.bottom) {
            const nx = (Math.random() - 0.5) * (95 + L * 12);
            const ny = bounds.top + Math.random() * 12;
            const nz = (Math.random() - 0.5) * (28 + L * 8);
            const len =
              [1.1, 0.7, 0.45][L]! + Math.random() * ([1.7, 0.9, 0.65][L] ?? 1);
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
