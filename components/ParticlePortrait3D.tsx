"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/**
 * Real 3D point-cloud portrait driven by a GPU shader. The headshot is sampled
 * into gold points with depth from brightness. All motion (assembly intro,
 * idle breathing, twinkle, cursor ripple) happens in the vertex/fragment shader
 * so the CPU does almost nothing per frame. The whole cloud also leans toward
 * the cursor. Soft additive round sprites give the points a glowing look.
 *
 * Lazy-loaded (ssr:false) and only mounted on capable desktops via HeroPortrait
 * gating in Hero.tsx.
 */

const GOLDS: [number, number, number][] = [
  [0.82, 0.66, 0.31],
  [0.9, 0.78, 0.47],
  [1.0, 0.92, 0.7],
  [0.63, 0.49, 0.18],
];

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uMouse;
  uniform float uSize;
  uniform float uPixelRatio;

  attribute vec3 aColor;
  attribute vec3 aScatter;
  attribute float aSeed;

  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    // Assemble from the scattered start positions into the portrait.
    vec3 pos = mix(aScatter, position, uProgress);

    float ph = aSeed * 6.2831853;
    // Idle breathing + gentle sway (only once assembled).
    pos.z += sin(uTime * 0.8 + ph) * 0.03 * uProgress;
    pos.x += sin(uTime * 0.4 + ph) * 0.01 * uProgress;

    // Cursor ripple: push points away from the cursor, falling off with distance.
    vec2 md = pos.xy - uMouse;
    float dist = length(md);
    float infl = smoothstep(0.55, 0.0, dist) * uProgress;
    pos.xy += normalize(md + 0.0001) * infl * 0.28;
    pos.z += infl * 0.15;

    vColor = aColor;
    vTwinkle = 0.78 + 0.32 * sin(uTime * 1.8 + ph * 3.0);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uSize * uPixelRatio * (1.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    // Bright core with a soft glowing halo.
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.2, d);
    float halo = smoothstep(0.5, 0.0, d) * 0.3;
    float alpha = clamp(core + halo, 0.0, 1.0);
    gl_FragColor = vec4(vColor * vTwinkle * 1.65, alpha);
  }
`;

function PointCloud() {
  const ref = useRef<THREE.Points>(null);
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const ptr = useRef({ x: 0, y: 0 });
  // Until the mouse actually moves, keep the ripple off the portrait so it
  // doesn't carve the face (pointer defaults to the face center otherwise).
  const moved = useRef(false);
  const start = useRef<number>(0);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uProgress: { value: 0 },
          uMouse: { value: new THREE.Vector2(999, 999) },
          uSize: { value: 5.5 },
          uPixelRatio: {
            value:
              typeof window !== "undefined"
                ? Math.min(window.devicePixelRatio, 2)
                : 1,
          },
        },
      }),
    []
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      ptr.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      ptr.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
      moved.current = true;
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
      const scatter: number[] = [];
      const seeds: number[] = [];
      const aspect = sw / sh;
      const S = 3.2;
      const J = 0.014;

      for (let y = 0; y < sh; y++) {
        for (let x = 0; x < sw; x++) {
          const i = (y * sw + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          const bright = (r + g + b) / 3;

          const u = x / sw - 0.5;
          const v = y / sh - 0.5;
          const dd = Math.hypot(u * 1.25, v);
          const keep = dd < 0.46 ? 1 : Math.max(0, 1 - (dd - 0.46) / 0.14);
          if (keep < 1 && Math.random() > keep) continue;

          if (a > 50 && bright > 42 && bright < 172) {
            const norm = bright / 255;
            const px = (x / sw - 0.5) * aspect * S + (Math.random() - 0.5) * J;
            const py = -(y / sh - 0.5) * S + (Math.random() - 0.5) * J;
            const pz = (norm - 0.42) * 1.2 + (Math.random() - 0.5) * J;
            positions.push(px, py, pz);

            // Scattered start: a random point on a large-ish sphere.
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const rad = 3 + Math.random() * 4;
            scatter.push(
              Math.sin(phi) * Math.cos(theta) * rad,
              Math.sin(phi) * Math.sin(theta) * rad,
              Math.cos(phi) * rad
            );

            seeds.push(Math.random());
            const col = GOLDS[Math.floor(Math.random() * GOLDS.length)];
            const inten = Math.min(1, norm * 1.4 + 0.35);
            colors.push(col[0] * inten, col[1] * inten, col[2] * inten);
          }
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
      geo.setAttribute("aColor", new THREE.Float32BufferAttribute(colors, 3));
      geo.setAttribute(
        "aScatter",
        new THREE.Float32BufferAttribute(scatter, 3)
      );
      geo.setAttribute("aSeed", new THREE.Float32BufferAttribute(seeds, 1));
      setGeometry(geo);
      start.current = performance.now();
    };
    img.src = "/headshot.png";
  }, []);

  useFrame(() => {
    const pts = ref.current;
    if (!pts) return;
    const u = material.uniforms;
    u.uTime.value = (performance.now() - start.current) / 1000;
    // Ease the assembly progress 0 -> 1 over ~2.7s (easeOutCubic) for a more
    // dramatic "fly in and form" reveal.
    const p = Math.min(1, u.uTime.value / 2.7);
    u.uProgress.value = 1 - Math.pow(1 - p, 3);
    // Map the cursor into the cloud's local XY for the ripple; hold it far
    // off-portrait until the mouse has actually moved.
    if (moved.current) {
      (u.uMouse.value as THREE.Vector2).set(
        ptr.current.x * 1.5,
        ptr.current.y * 1.7
      );
    } else {
      (u.uMouse.value as THREE.Vector2).set(99, 99);
    }

    // Smooth lean toward the cursor (rotation-only, cheap).
    const targetY = ptr.current.x * 0.32;
    const targetX = ptr.current.y * 0.18;
    pts.rotation.y += (targetY - pts.rotation.y) * 0.045;
    pts.rotation.x += (targetX - pts.rotation.x) * 0.045;
  });

  if (!geometry) return null;

  return <points ref={ref} geometry={geometry} material={material} />;
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
      <EffectComposer>
        <Bloom
          intensity={1.6}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          radius={0.7}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
