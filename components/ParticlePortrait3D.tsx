"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Real 3D point-cloud portrait: the headshot is sampled into a THREE.Points
 * cloud where each bright pixel becomes a gold point, pushed forward in Z by
 * its brightness so the face has genuine depth. The cloud gently auto-rotates
 * and leans toward the cursor (orbit-style parallax). Click bursts the points
 * outward; they spring back.
 *
 * Lazy-loaded (ssr:false) and only mounted on capable desktops via HeroPortrait
 * gating in Hero.tsx.
 */

const GOLDS: [number, number, number][] = [
  [0.79, 0.64, 0.29],
  [0.9, 0.78, 0.47],
  [0.96, 0.89, 0.66],
  [0.61, 0.48, 0.17],
];

function PointCloud() {
  const ref = useRef<THREE.Points>(null);
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const home = useRef<Float32Array | null>(null);
  const vel = useRef<Float32Array | null>(null);
  // Window-level pointer (normalized -1..1). R3F's own state.pointer only
  // updates over the canvas, and the hero text overlay covers part of it.
  const ptr = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      ptr.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      ptr.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const sw = 130;
      const sh = Math.round((img.height / img.width) * sw);
      const cvs = document.createElement("canvas");
      cvs.width = sw;
      cvs.height = sh;
      const ctx = cvs.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, sw, sh);
      const data = ctx.getImageData(0, 0, sw, sh).data;

      const positions: number[] = [];
      const colors: number[] = [];
      const aspect = sw / sh;
      const S = 3.2; // world scale
      const J = 0.014; // positional jitter to break the sampling lattice

      for (let y = 0; y < sh; y++) {
        for (let x = 0; x < sw; x++) {
          const i = (y * sw + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          const bright = (r + g + b) / 3;
          // Soft elliptical vignette: thin points out toward the frame edge so
          // the sampled rectangle never reads as a hard border.
          const u = x / sw - 0.5;
          const v = y / sh - 0.5;
          const d = Math.hypot(u * 1.25, v);
          // Only thin the extreme frame edge, so the subject stays dense.
          const keep = d < 0.46 ? 1 : Math.max(0, 1 - (d - 0.46) / 0.14);
          if (keep < 1 && Math.random() > keep) continue;

          // Keep the subject's mid-tones; drop the bright studio background
          // and blown highlights (upper band) and deep shadow (lower band).
          if (a > 50 && bright > 44 && bright < 168) {
            const norm = bright / 255;
            const px =
              (x / sw - 0.5) * aspect * S + (Math.random() - 0.5) * J;
            const py = -(y / sh - 0.5) * S + (Math.random() - 0.5) * J;
            const pz = (norm - 0.42) * 1.2 + (Math.random() - 0.5) * J;
            positions.push(px, py, pz);
            const col = GOLDS[Math.floor(Math.random() * GOLDS.length)];
            const inten = Math.min(1, norm * 1.4 + 0.35);
            colors.push(col[0] * inten, col[1] * inten, col[2] * inten);
          }
        }
      }

      const geo = new THREE.BufferGeometry();
      const posArr = new Float32Array(positions);
      geo.setAttribute("position", new THREE.BufferAttribute(posArr, 3));
      geo.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
      );
      home.current = posArr.slice();
      vel.current = new Float32Array(posArr.length);
      setGeometry(geo);
    };
    img.src = "/headshot.png";
  }, []);

  useFrame((state) => {
    const pts = ref.current;
    if (!pts) return;
    const t = state.clock.elapsedTime;

    // Orbit-style parallax: lean toward the cursor + slow idle drift.
    // Kept deliberately subtle so the face stays readable at cursor extremes.
    const targetY = ptr.current.x * 0.3 + Math.sin(t * 0.12) * 0.07;
    const targetX = ptr.current.y * 0.16;
    pts.rotation.y += (targetY - pts.rotation.y) * 0.06;
    pts.rotation.x += (targetX - pts.rotation.x) * 0.06;

    // Click-burst spring-back on the point positions.
    const geo = pts.geometry;
    const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    const h = home.current;
    const v = vel.current;
    if (h && v) {
      let moved = false;
      for (let i = 0; i < arr.length; i++) {
        const a = (h[i] - arr[i]) * 0.06;
        v[i] = (v[i] + a) * 0.86;
        if (Math.abs(v[i]) > 0.00005) {
          arr[i] += v[i];
          moved = true;
        }
      }
      if (moved) posAttr.needsUpdate = true;
    }
  });

  if (!geometry) return null;

  return (
    <points
      ref={ref}
      geometry={geometry}
      onPointerDown={(e) => {
        // Burst points near the click outward.
        const pts = ref.current;
        if (!pts) return;
        const geo = pts.geometry;
        const posAttr = geo.getAttribute("position") as THREE.BufferAttribute;
        const arr = posAttr.array as Float32Array;
        const v = vel.current;
        if (!v) return;
        const local = pts.worldToLocal(e.point.clone());
        for (let i = 0; i < arr.length; i += 3) {
          const dx = arr[i] - local.x;
          const dy = arr[i + 1] - local.y;
          const dz = arr[i + 2] - local.z;
          const d = Math.hypot(dx, dy, dz) || 1;
          if (d < 1.4) {
            const f = (1 - d / 1.4) * 0.5;
            v[i] += (dx / d) * f;
            v[i + 1] += (dy / d) * f;
            v[i + 2] += (dz / d) * f;
          }
        }
      }}
    >
      <pointsMaterial
        size={0.022}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ParticlePortrait3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.4], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      <PointCloud />
    </Canvas>
  );
}
