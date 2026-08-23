"use client";

import { useEffect, useRef } from "react";

/**
 * Soft, slowly drifting gold "aurora" blobs rendered on a low-res blurred
 * canvas. Purely decorative background accent (aria-hidden, pointer-events
 * none). Draws a single static frame for reduced-motion users.
 */
export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx;
    const el = canvas;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let W = 0;
    let H = 0;
    let raf = 0;

    // Low internal resolution: cheap, and it's blurred anyway.
    const SCALE = 0.18;

    const blobs = [
      { hue: "#c9a24a", r: 0.55, ax: 0.18, ay: 0.12, px: 0.0, py: 0.0, sp: 0.00013 },
      { hue: "#e6c877", r: 0.42, ax: 0.14, ay: 0.16, px: 2.1, py: 1.2, sp: 0.00017 },
      { hue: "#9c7a2c", r: 0.5, ax: 0.16, ay: 0.1, px: 4.0, py: 3.3, sp: 0.0001 },
    ];

    function resize() {
      W = Math.max(1, Math.floor(el.offsetWidth * SCALE));
      H = Math.max(1, Math.floor(el.offsetHeight * SCALE));
      el.width = W;
      el.height = H;
    }

    function draw(time: number) {
      c.clearRect(0, 0, W, H);
      c.globalCompositeOperation = "lighter";
      for (const b of blobs) {
        const t = time * b.sp;
        const cx = (0.5 + Math.sin(t + b.px) * b.ax) * W;
        const cy = (0.5 + Math.cos(t + b.py) * b.ay) * H;
        const rad = b.r * Math.min(W, H);
        const g = c.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, b.hue);
        g.addColorStop(1, "transparent");
        c.fillStyle = g;
        c.beginPath();
        c.arc(cx, cy, rad, 0, Math.PI * 2);
        c.fill();
      }
      c.globalCompositeOperation = "source-over";
    }

    resize();
    if (reduce) {
      draw(0);
    } else {
      const loop = (t: number) => {
        draw(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(0);
    });
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-25 blur-2xl pointer-events-none"
    />
  );
}
