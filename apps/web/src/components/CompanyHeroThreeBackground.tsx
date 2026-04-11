"use client";

import { useEffect, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  FogExp2,
  Group,
  Line,
  LineBasicMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer,
} from "three";

const BOLT_POOL = 5;
const MAX_SEGMENTS = 22;
const MAX_POINTS = MAX_SEGMENTS * 3;

type BoltState = {
  geometry: InstanceType<typeof BufferGeometry>;
  line: InstanceType<typeof Line>;
  active: boolean;
  life: number;
  maxLife: number;
};

function fillBoltPoints(target: Float32Array, drawCount: number): void {
  const segments = drawCount;
  let x = (Math.random() - 0.5) * 18;
  let y = 5.5 + Math.random() * 3;
  let z = -1.5 + (Math.random() - 0.5) * 5;
  for (let i = 0; i < segments; i++) {
    target[i * 3] = x;
    target[i * 3 + 1] = y;
    target[i * 3 + 2] = z;
    x += (Math.random() - 0.45) * 2.4;
    y -= 0.65 + Math.random() * 1.1;
    z += (Math.random() - 0.5) * 0.5;
  }
}

function boltOpacity(u: number): number {
  if (u < 0.1) return u / 0.1;
  if (u > 0.5) return Math.max(0, 1 - (u - 0.5) / 0.5);
  return 1;
}

/**
 * Black canvas: faint rain + occasional additive lightning (muted, distant).
 */
export function CompanyHeroThreeBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let disposed = false;
    let raf = 0;
    let lastT = performance.now();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);

    const scene = new Scene();
    scene.fog = new FogExp2(0x000000, 0.03);

    const camera = new PerspectiveCamera(46, width / height, 0.1, 60);
    camera.position.set(0, 0.15, 10.5);

    const renderer = new WebGLRenderer({
      alpha: false,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 1);
    renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block;";
    container.appendChild(renderer.domElement);

    const clearColor = new Color(0x000000);

    const count = 780;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      speeds[i] = 0.0018 + Math.random() * 0.008;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));

    const material = new PointsMaterial({
      color: 0xa8c0e0,
      size: 0.042,
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
      blending: AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new Points(geometry, material);
    scene.add(points);

    const bolts: BoltState[] = [];
    const boltGroup = new Group();
    scene.add(boltGroup);

    for (let b = 0; b < BOLT_POOL; b++) {
      const arr = new Float32Array(MAX_POINTS);
      const g = new BufferGeometry();
      g.setAttribute("position", new BufferAttribute(arr, 3));
      g.setDrawRange(0, 0);
      const m = new LineBasicMaterial({
        color: 0xc8e8ff,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: AdditiveBlending,
      });
      const line = new Line(g, m);
      line.visible = false;
      boltGroup.add(line);
      bolts.push({ geometry: g, line, active: false, life: 0, maxLife: 1 });
    }

    let nextBoltAt = performance.now() + 900 + Math.random() * 2000;
    let ambientFlash = 0;

    const spawnBolt = () => {
      const slot = bolts.find((x) => !x.active);
      if (!slot) return;
      const segments = 9 + Math.floor(Math.random() * 10);
      const attr = slot.geometry.getAttribute("position");
      if (!(attr instanceof BufferAttribute)) return;
      const arr = attr.array as Float32Array;
      fillBoltPoints(arr, Math.min(segments, MAX_SEGMENTS));
      attr.needsUpdate = true;
      slot.geometry.setDrawRange(0, Math.min(segments, MAX_SEGMENTS));
      slot.active = true;
      slot.life = 0;
      slot.maxLife = 0.07 + Math.random() * 0.08;
      slot.line.visible = true;
      slot.line.material.opacity = 0;
      ambientFlash = 0.85 + Math.random() * 0.45;

      if (Math.random() < 0.38) {
        window.setTimeout(() => {
          if (disposed) return;
          const s2 = bolts.find((x) => !x.active);
          if (!s2) return;
          const segs = 8 + Math.floor(Math.random() * 8);
          const a2 = s2.geometry.getAttribute("position");
          if (!(a2 instanceof BufferAttribute)) return;
          const ar2 = a2.array as Float32Array;
          fillBoltPoints(ar2, Math.min(segs, MAX_SEGMENTS));
          a2.needsUpdate = true;
          s2.geometry.setDrawRange(0, Math.min(segs, MAX_SEGMENTS));
          s2.active = true;
          s2.life = 0;
          s2.maxLife = 0.045 + Math.random() * 0.06;
          s2.line.visible = true;
          s2.line.material.opacity = 0;
          ambientFlash = Math.max(ambientFlash, 0.5);
        }, 45 + Math.random() * 80);
      }
    };

    const loop = (time: number) => {
      raf = requestAnimationFrame(loop);
      if (disposed) return;

      const now = performance.now();
      const dt = Math.min(0.05, (now - lastT) / 1000);
      lastT = now;
      const t = time * 0.0002;

      if (!reduceMotion.matches) {
        const pos = geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < count; i++) {
          pos[i * 3 + 1] -= speeds[i] * dt * 38;
          if (pos[i * 3 + 1] < -7.5) pos[i * 3 + 1] = 7.5;
          pos[i * 3] += Math.sin(t * 1.1 + i * 0.015) * 0.0014 * dt * 60;
        }
        geometry.attributes.position.needsUpdate = true;
        points.rotation.y = t * 0.065;

        if (now >= nextBoltAt) {
          spawnBolt();
          nextBoltAt = now + 1600 + Math.random() * 4800;
        }

        for (const b of bolts) {
          if (!b.active) continue;
          b.life += dt;
          const u = b.life / b.maxLife;
          if (u >= 1) {
            b.active = false;
            b.line.visible = false;
            b.line.material.opacity = 0;
            b.geometry.setDrawRange(0, 0);
            continue;
          }
          b.line.material.opacity = boltOpacity(u) * 0.72;
        }

        ambientFlash *= Math.exp(-11 * dt);
        const f = Math.min(1, ambientFlash * 0.09);
        clearColor.setRGB(0.008 + f * 0.12, 0.008 + f * 0.14, 0.015 + f * 0.2);
        renderer.setClearColor(clearColor, 1);
        camera.position.x = Math.sin(t * 0.3) * 0.18;
      } else {
        renderer.setClearColor(0x000000, 1);
        camera.position.x = 0;
      }

      renderer.render(scene, camera);
    };

    raf = requestAnimationFrame(loop);

    const onResize = () => {
      const w = Math.max(1, container.clientWidth);
      const h = Math.max(1, container.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      for (const b of bolts) {
        b.geometry.dispose();
        b.line.material.dispose();
      }
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="pointer-events-none absolute inset-0 overflow-hidden bg-black" aria-hidden />;
}
