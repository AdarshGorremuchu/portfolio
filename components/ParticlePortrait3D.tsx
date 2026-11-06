"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/**
 * 3D point-cloud portrait driven by a GPU shader.
 *
 * Segmentation: the studio background is neutral (saturation ~12) while skin is
 * warm (saturation ~62), so the subject is cut out by SATURATION rather than
 * brightness. A brightness band cannot work here: the background (~171) and the
 * face's lit highlights overlap, which both leaked background and punched holes
 * in the face.
 *
 * Interaction: drag to orbit the portrait; the cursor illuminates nearby points
 * (brighten + grow) without displacing them, so the face never distorts. The
 * cursor is projected through the camera into the cloud's local space so the
 * highlight lands exactly under the pointer.
 *
 * Lazy-loaded (ssr:false), desktop-only via HeroPortrait gating in Hero.tsx.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform vec3  uMouse;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uRadius;

  attribute vec3  aColor;
  attribute vec3  aScatter;
  attribute float aSeed;

  varying vec3  vColor;
  varying float vTwinkle;
  varying float vGlow;
  varying float vSweep;

  void main() {
    // Assemble from scattered start positions into the portrait.
    vec3 pos = mix(aScatter, position, uProgress);

    float ph = aSeed * 6.2831853;
    // Idle breathing so it feels alive at rest (kept small to stay sharp).
    pos.z += sin(uTime * 0.8 + ph) * 0.02 * uProgress;

    // Illuminate-only cursor: no displacement, just glow + size falloff.
    float dist = distance(pos, uMouse);
    vGlow = smoothstep(uRadius, 0.0, dist) * uProgress;

    // Signature moment: a gold light sweep travelling up the portrait every 7s.
    float cycle = fract(uTime / 7.0) * 3.4 - 1.7;
    vSweep = smoothstep(0.28, 0.0, abs(pos.y - cycle)) * uProgress;

    vColor   = aColor;
    vTwinkle = 0.88 + 0.14 * sin(uTime * 1.8 + ph * 3.0);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize =
      uSize * uPixelRatio * (1.0 + vGlow * 2.0 + vSweep * 0.9) * (1.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3  vColor;
  varying float vTwinkle;
  varying float vGlow;
  varying float vSweep;

  void main() {
    // Tight core so points stay crisp; only a light halo.
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.26, d);
    float halo = smoothstep(0.5, 0.0, d) * 0.22;
    float alpha = clamp(core + halo, 0.0, 1.0);

    // Cursor glow and the sweep both push toward champagne.
    vec3 col = vColor * vTwinkle;
    col += vec3(1.0, 0.88, 0.62) * (vGlow * 0.5 + vSweep * 0.42);

    // Kept moderate: additive blending accumulates, so a high multiplier here
    // blows out dense areas and destroys the facial tones.
    gl_FragColor = vec4(col * 1.25, alpha);
  }
`;

function PointCloud() {
  const ref = useRef<THREE.Points>(null);
  const { camera, gl } = useThree();
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  const client = useRef({ x: 0, y: 0, moved: false });
  const drag = useRef({ active: false, lastX: 0, lastY: 0, rx: 0, ry: 0 });
  const start = useRef(0);
  const world = useMemo(() => new THREE.Vector3(), []);

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
          uMouse: { value: new THREE.Vector3(999, 999, 999) },
          uSize: { value: 2.9 },
          uRadius: { value: 0.42 },
          uPixelRatio: {
            value:
              typeof window !== "undefined"
                ? Math.min(window.devicePixelRatio, 1.5)
                : 1,
          },
        },
      }),
    []
  );

  // Pointer tracking + drag-to-orbit, bound to the canvas element.
  useEffect(() => {
    const el = gl.domElement;

    const onMove = (e: PointerEvent) => {
      client.current.x = e.clientX;
      client.current.y = e.clientY;
      client.current.moved = true;
      if (drag.current.active) {
        const dx = e.clientX - drag.current.lastX;
        const dy = e.clientY - drag.current.lastY;
        drag.current.lastX = e.clientX;
        drag.current.lastY = e.clientY;
        drag.current.ry += dx * 0.0035;
        drag.current.rx += dy * 0.0035;
        // The cloud is a shallow relief, so past ~35 degrees it flattens into an
        // edge-on sheet. Clamp both axes to keep the portrait readable.
        drag.current.ry = Math.max(-0.45, Math.min(0.45, drag.current.ry));
        drag.current.rx = Math.max(-0.28, Math.min(0.28, drag.current.rx));
      }
    };
    const onDown = (e: PointerEvent) => {
      drag.current.active = true;
      drag.current.lastX = e.clientX;
      drag.current.lastY = e.clientY;
      el.style.cursor = "grabbing";
    };
    const onUp = () => {
      drag.current.active = false;
      el.style.cursor = "grab";
    };

    el.style.cursor = "grab";
    el.style.touchAction = "none";
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [gl]);

  // Sample the headshot into a point cloud.
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const sw = 330; // source is 864px wide; higher sampling = finer features
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
      const J = 0.0035; // low jitter: heavy jitter smears fine facial detail

      // Gold ramp: deep antique gold in shadow, champagne in highlight.
      const C0 = [0.62, 0.45, 0.16];
      const C1 = [1.0, 0.92, 0.7];

      for (let y = 0; y < sh; y++) {
        for (let x = 0; x < sw; x++) {
          const i = (y * sw + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          if (a < 50) continue;

          const mx = Math.max(r, g, b);
          const mn = Math.min(r, g, b);
          const sat = mx - mn;
          const bright = (r + g + b) / 3;

          // Reject the neutral studio background (low saturation AND not dark).
          // Keeps warm skin (sat ~62) and dark hair/suit (bright < 70).
          if (sat < 22 && bright > 70) continue;
          // Drop near-black pixels that would render as invisible noise.
          if (bright < 24) continue;

          // Very soft edge fade so the sampled rectangle never reads as a border.
          const u = x / sw - 0.5;
          const v = y / sh - 0.5;
          const dd = Math.hypot(u * 1.25, v);
          const keep = dd < 0.47 ? 1 : Math.max(0, 1 - (dd - 0.47) / 0.1);
          if (keep < 1 && Math.random() > keep) continue;

          const norm = bright / 255;
          positions.push(
            (x / sw - 0.5) * aspect * S + (Math.random() - 0.5) * J,
            -(y / sh - 0.5) * S + (Math.random() - 0.5) * J,
            (norm - 0.42) * 0.8 + (Math.random() - 0.5) * J
          );

          // Scattered start on a sphere for the assembly intro.
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const rad = 3 + Math.random() * 4;
          scatter.push(
            Math.sin(phi) * Math.cos(theta) * rad,
            Math.sin(phi) * Math.sin(theta) * rad,
            Math.cos(phi) * rad
          );

          seeds.push(Math.random());

          // Colour from the pixel's own luminance so facial shading survives.
          const t = Math.min(1, Math.max(0, (norm - 0.12) / 0.66));
          const j = 0.92 + Math.random() * 0.16;
          colors.push(
            (C0[0] + (C1[0] - C0[0]) * t) * j,
            (C0[1] + (C1[1] - C0[1]) * t) * j,
            (C0[2] + (C1[2] - C0[2]) * t) * j
          );
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
      geo.setAttribute("aColor", new THREE.Float32BufferAttribute(colors, 3));
      geo.setAttribute("aScatter", new THREE.Float32BufferAttribute(scatter, 3));
      geo.setAttribute("aSeed", new THREE.Float32BufferAttribute(seeds, 1));
      setGeometry(geo);
      start.current = performance.now();
    };
    img.src = "/headshot.webp";
  }, []);

  useFrame(() => {
    const pts = ref.current;
    if (!pts) return;
    const u = material.uniforms;

    u.uTime.value = (performance.now() - start.current) / 1000;
    const p = Math.min(1, u.uTime.value / 2.7);
    u.uProgress.value = 1 - Math.pow(1 - p, 3);

    // Rotation: drag dominates, with a small lean toward the cursor.
    const rect = gl.domElement.getBoundingClientRect();
    const nx = ((client.current.x - rect.left) / rect.width) * 2 - 1;
    const ny = -(((client.current.y - rect.top) / rect.height) * 2 - 1);
    const lean = client.current.moved && !drag.current.active ? 0.14 : 0;
    const targetY = drag.current.ry + nx * lean;
    const targetX = drag.current.rx + ny * (lean * 0.6);
    pts.rotation.y += (targetY - pts.rotation.y) * 0.08;
    pts.rotation.x += (targetX - pts.rotation.x) * 0.08;

    // Project the cursor onto the z=0 plane, then into the cloud's local space,
    // so the highlight lands exactly under the pointer.
    if (client.current.moved) {
      const cam = camera as THREE.PerspectiveCamera;
      const halfH = cam.position.z * Math.tan(((cam.fov / 2) * Math.PI) / 180);
      const halfW = halfH * (rect.width / rect.height);
      world.set(nx * halfW, ny * halfH, 0);
      pts.worldToLocal(world);
      (u.uMouse.value as THREE.Vector3).copy(world);
    }
  });

  if (!geometry) return null;

  return <points ref={ref} geometry={geometry} material={material} />;
}

export default function ParticlePortrait3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.4], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      <PointCloud />
      <EffectComposer>
        {/* Selective bloom: a high threshold means only the brightest
            highlights glow, instead of hazing the whole face. */}
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.52}
          luminanceSmoothing={0.6}
          radius={0.6}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
