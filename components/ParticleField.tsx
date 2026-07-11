"use client";

import { useEffect, useRef } from "react";

/**
 * ParticleField: a fixed, whole-site gold particle layer.
 *
 * Ambient motion: a curl-noise-style flow field pushes particles along organic
 * currents, with parallax depth layers (near particles are bigger, brighter,
 * faster, and react more to mouse + scroll).
 *
 * Cursor play (continuous):
 *   • Attract & swirl: particles near the cursor are pulled in and orbit it.
 *   • Flashlight + lines: nearby particles brighten and link with gold lines.
 *   • Comet trail: gold sparks spawn and fade behind the moving cursor.
 *
 * Guardrails: low opacity for legibility, fewer particles + no line network on
 * small screens, and a static (non-animated) fallback for prefers-reduced-motion.
 */
export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx;
    const el = canvas;

    const GOLDS = ["#c9a24a", "#e6c877", "#f5e2a8", "#b8862f"];
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let W = 0;
    let H = 0;
    let dpr = 1;
    const isMobile = window.innerWidth < 768;

    interface P {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      depth: number; // 0.3 far → 1 near
      color: string;
    }
    let particles: P[] = [];

    // Interaction state
    let mx = -9999;
    let my = -9999;
    let pointerActive = false;
    let scrollY = window.scrollY;

    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      size: number;
      color: string;
    }
    let trail: Spark[] = [];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      el.width = W * dpr;
      el.height = H * dpr;
      el.style.width = W + "px";
      el.style.height = H + "px";
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function build() {
      resize();
      const density = isMobile ? 11000 : 7000;
      const count = Math.min(300, Math.floor((W * H) / density));
      particles = [];
      for (let i = 0; i < count; i++) {
        const depth = 0.3 + Math.random() * 0.7;
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: 0,
          vy: 0,
          size: (0.7 + Math.random() * 1.6) * depth,
          alpha: (0.08 + Math.random() * 0.28) * depth,
          depth,
          color: GOLDS[(Math.random() * GOLDS.length) | 0],
        });
      }
    }

    // Cheap pseudo-curl flow: returns a flow angle for a point at time t.
    function flowAngle(x: number, y: number, t: number) {
      const a =
        Math.sin(x * 0.0016 + t * 0.00020) +
        Math.cos(y * 0.0016 - t * 0.00018);
      const b =
        Math.cos(x * 0.0012 - t * 0.00015) +
        Math.sin(y * 0.0014 + t * 0.00022);
      return (a + b) * Math.PI;
    }

    const R = isMobile ? 110 : 165; // cursor influence radius

    function frame() {
      const t = Date.now();
      c.clearRect(0, 0, W, H);
      c.globalCompositeOperation = "lighter";

      // Particles within cursor reach, reused for the line network.
      const near: P[] = [];

      for (const p of particles) {
        // ── ambient curl-flow drift ──
        const ang = flowAngle(p.x, p.y, t);
        const speed = 0.12 + p.depth * 0.28;
        p.vx += Math.cos(ang) * speed * 0.05;
        p.vy += Math.sin(ang) * speed * 0.05;

        // ── cursor attract + swirl ──
        let brightened = 0;
        if (pointerActive) {
          const dx = mx - p.x;
          const dy = my - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const pull = (1 - d / R) * 0.9;
            // radial attraction
            p.vx += (dx / d) * pull;
            p.vy += (dy / d) * pull;
            // tangential swirl (perpendicular to radius)
            p.vx += (-dy / d) * pull * 0.8;
            p.vy += (dx / d) * pull * 0.8;
            brightened = (1 - d / R) * 1.0;
            if (near.length < 110) near.push(p);
          }
        }

        // integrate with damping so it settles back into the flow
        p.vx *= 0.92;
        p.vy *= 0.92;
        p.x += p.vx;
        p.y += p.vy;

        // wrap around viewport edges
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // ── parallax: mouse tilt + scroll depth ──
        const par = pointerActive ? (mx - W / 2) * 0.008 * p.depth : 0;
        const parY = pointerActive ? (my - H / 2) * 0.008 * p.depth : 0;
        const ry =
          (((p.y - scrollY * p.depth * 0.06) % H) + H) % H;

        c.beginPath();
        c.arc(p.x + par, ry + parY, p.size, 0, Math.PI * 2);
        c.fillStyle = p.color;
        c.globalAlpha = Math.min(1, p.alpha + brightened);
        c.fill();
      }

      // ── flashlight lines: link particles near the cursor ──
      if (!isMobile && near.length > 1) {
        const linkDist = 58;
        for (let i = 0; i < near.length; i++) {
          for (let j = i + 1; j < near.length; j++) {
            const a = near[i];
            const b = near[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < linkDist * linkDist) {
              const d = Math.sqrt(d2);
              c.beginPath();
              c.moveTo(a.x, a.y);
              c.lineTo(b.x, b.y);
              c.strokeStyle = "#e6c877";
              c.globalAlpha = (1 - d / linkDist) * 0.4;
              c.lineWidth = 0.7;
              c.stroke();
            }
          }
        }
      }

      // ── comet trail sparks ──
      for (let i = trail.length - 1; i >= 0; i--) {
        const s = trail[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.94;
        s.vy *= 0.94;
        s.life -= 0.02;
        if (s.life <= 0) {
          trail.splice(i, 1);
          continue;
        }
        c.beginPath();
        c.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        c.fillStyle = s.color;
        c.globalAlpha = s.life * 0.7;
        c.fill();
      }

      c.globalAlpha = 1;
      c.globalCompositeOperation = "source-over";
      animId = requestAnimationFrame(frame);
    }

    // Static fallback for reduced-motion: draw once, no animation/interaction.
    function drawStatic() {
      resize();
      build();
      c.globalCompositeOperation = "lighter";
      for (const p of particles) {
        c.beginPath();
        c.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        c.fillStyle = p.color;
        c.globalAlpha = p.alpha;
        c.fill();
      }
      c.globalAlpha = 1;
      c.globalCompositeOperation = "source-over";
    }

    let animId = 0;

    // Keep a moderate field presence over the hero (so the portrait still reads),
    // ramping to full strength once the user scrolls past it.
    function applyHeroFade() {
      const vh = window.innerHeight || 1;
      const f = Math.min(1, Math.max(0, (scrollY - vh * 0.2) / (vh * 0.6)));
      el.style.opacity = String(0.55 + f * 0.45);
    }

    if (reduce) {
      drawStatic();
      const onResizeStatic = () => drawStatic();
      window.addEventListener("resize", onResizeStatic);
      return () => window.removeEventListener("resize", onResizeStatic);
    }

    build();
    applyHeroFade();
    frame();

    // ── listeners ──
    const track = (x: number, y: number) => {
      // spawn trail sparks along cursor motion
      if (pointerActive) {
        const dx = x - mx;
        const dy = y - my;
        if (dx * dx + dy * dy > 6) {
          trail.push({
            x,
            y,
            vx: dx * 0.08 + (Math.random() - 0.5),
            vy: dy * 0.08 + (Math.random() - 0.5),
            life: 1,
            size: 1.4 + Math.random() * 1.6,
            color: GOLDS[(Math.random() * GOLDS.length) | 0],
          });
          if (trail.length > 120) trail.shift();
        }
      }
      mx = x;
      my = y;
      pointerActive = true;
    };
    const onMouseMove = (e: MouseEvent) => track(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const tt = e.touches[0];
      if (tt) track(tt.clientX, tt.clientY);
    };
    const onLeave = () => {
      pointerActive = false;
      mx = -9999;
      my = -9999;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
      applyHeroFade();
    };
    const onResize = () => build();

    // Click / tap to poke: particles near the hit point burst outward, then the
    // flow field and damping draw them back into the current.
    const burst = (cx: number, cy: number) => {
      const BR = isMobile ? 130 : 200;
      for (const p of particles) {
        const dx = p.x - cx;
        const dy = p.y - cy;
        const d2 = dx * dx + dy * dy;
        if (d2 < BR * BR) {
          const d = Math.sqrt(d2) || 1;
          const force = (1 - d / BR) * (11 + Math.random() * 9);
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }
      }
    };
    const onClick = (e: MouseEvent) => burst(e.clientX, e.clientY);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("click", onClick);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("click", onClick);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-30 pointer-events-none"
    />
  );
}
