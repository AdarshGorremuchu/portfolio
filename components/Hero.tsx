"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, ArrowRight, MapPin } from "lucide-react";
import { personal } from "@/lib/data";

/**
 * ParticlePortrait: samples an image (or an "AG" monogram fallback) into a
 * field of gold particles that assemble from scattered positions on mount.
 *
 * To use a real headshot: drop a high-contrast, front-facing photo at
 * /public/headshot.png and it will render the face automatically.
 */
function ParticlePortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx;
    const el = canvas;

    let animId = 0;
    let W = 0;
    let H = 0;

    interface P {
      x: number;
      y: number; // current
      tx: number;
      ty: number; // target
      size: number;
      alpha: number;
      depth: number; // parallax depth factor (0.4 far → 1.3 near)
      vx: number;
      vy: number;
    }
    let particles: P[] = [];

    // Pointer position in canvas-local coords (off-screen until the user moves).
    let mx = -9999;
    let my = -9999;
    let pointerActive = false;
    // Smoothed parallax offset (eases toward the cursor-driven target).
    let parX = 0;
    let parY = 0;

    const GOLDS = ["#c9a24a", "#e6c877", "#f5e2a8", "#b8862f"];

    function buildFromSource(draw: (o: CanvasRenderingContext2D, w: number, h: number) => void) {
      W = el.offsetWidth;
      H = el.offsetHeight;
      el.width = W;
      el.height = H;

      // offscreen sample buffer
      const sampleW = 180;
      const sampleH = Math.round((H / W) * sampleW) || 180;
      const off = document.createElement("canvas");
      off.width = sampleW;
      off.height = sampleH;
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.clearRect(0, 0, sampleW, sampleH);
      draw(octx, sampleW, sampleH);

      const data = octx.getImageData(0, 0, sampleW, sampleH).data;
      const gap = 2; // sampling density
      const scaleX = W / sampleW;
      const scaleY = H / sampleH;
      const next: P[] = [];

      for (let y = 0; y < sampleH; y += gap) {
        for (let x = 0; x < sampleW; x += gap) {
          const i = (y * sampleW + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          const bright = (r + g + b) / 3;
          // keep opaque, non-shadow pixels
          if (a > 50 && bright > 36) {
            const tx = x * scaleX;
            const ty = y * scaleY;
            const norm = bright / 255;
            next.push({
              x: Math.random() * W,
              y: Math.random() * H,
              tx,
              ty,
              // brighter facial highlights → bigger, more luminous particles
              size: 0.65 + norm * 1.75,
              alpha: Math.min(1, norm * 1.55 + 0.5),
              depth: 0.4 + norm * 0.9,
              vx: 0,
              vy: 0,
            });
          }
        }
      }
      particles = next;
    }

    function drawMonogram(o: CanvasRenderingContext2D, w: number, h: number) {
      o.fillStyle = "#ffffff";
      o.textAlign = "center";
      o.textBaseline = "middle";
      o.font = `700 ${Math.round(h * 0.62)}px Georgia, "Playfair Display", serif`;
      o.fillText("AG", w / 2, h / 2 + h * 0.02);
    }

    function animate() {
      const t = Date.now();

      // Parallax: portrait leans toward the cursor; eases back to center on leave.
      const targetParX = pointerActive ? -((mx - W / 2) / W) * 24 : 0;
      const targetParY = pointerActive ? -((my - H / 2) / H) * 24 : 0;
      parX += (targetParX - parX) * 0.05;
      parY += (targetParY - parY) * 0.05;

      // Idle breathing: gentle scale pulse + vertical bob so it feels alive.
      const breath = 1 + Math.sin(t * 0.0009) * 0.014;
      const bob = Math.sin(t * 0.0011) * 1.6;

      c.clearRect(0, 0, W, H);
      // additive blending → overlapping gold particles glow
      c.globalCompositeOperation = "lighter";
      const R = Math.max(80, W * 0.1); // cursor influence radius
      for (const p of particles) {
        // spring back toward the portrait target
        let ax = (p.tx - p.x) * 0.022;
        let ay = (p.ty - p.y) * 0.022;
        // repel away from the cursor
        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < R * R) {
          const d = Math.sqrt(d2) || 1;
          const force = ((R - d) / R) * 6;
          ax += (dx / d) * force;
          ay += (dy / d) * force;
        }
        // integrate with damping
        p.vx = (p.vx + ax) * 0.85;
        p.vy = (p.vy + ay) * 0.85;
        p.x += p.vx;
        p.y += p.vy;

        // Render position: breathing scale about center + parallax (by depth) + bob.
        const rx = (p.x - W / 2) * breath + W / 2 + parX * p.depth;
        const ry = (p.y - H / 2) * breath + H / 2 + parY * p.depth + bob;

        c.beginPath();
        c.arc(rx, ry, p.size, 0, Math.PI * 2);
        c.fillStyle = GOLDS[(p.tx | 0) % GOLDS.length];
        c.globalAlpha = p.alpha;
        c.fill();
      }
      c.globalAlpha = 1;
      c.globalCompositeOperation = "source-over";
      animId = requestAnimationFrame(animate);
    }

    // The active source draw function: starts as monogram, upgrades to the
    // photo if /headshot.jpg loads successfully.
    const img = new Image();
    let activeDraw: (o: CanvasRenderingContext2D, w: number, h: number) => void =
      drawMonogram;

    const drawPhoto = (o: CanvasRenderingContext2D, w: number, h: number) => {
      const ir = img.width / img.height;
      const cr = w / h;
      let dw = w;
      let dh = h;
      let dx = 0;
      let dy = 0;
      if (ir > cr) {
        dh = h;
        dw = h * ir;
        dx = (w - dw) / 2;
      } else {
        dw = w;
        dh = w / ir;
        dy = (h - dh) / 2;
      }
      o.drawImage(img, dx, dy, dw, dh);
    };

    img.onload = () => {
      activeDraw = drawPhoto;
      buildFromSource(activeDraw);
    };
    img.src = "/headshot.png";

    // Kick off the monogram immediately so there's never a blank frame; the
    // photo (if present) swaps in via onload.
    buildFromSource(activeDraw);
    animate();

    const ro = new ResizeObserver(() => buildFromSource(activeDraw));
    ro.observe(el);

    // Pointer interaction: map cursor into canvas-local coords each move.
    const track = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      mx = clientX - rect.left;
      my = clientY - rect.top;
      pointerActive = true;
    };
    const onMouseMove = (e: MouseEvent) => track(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) track(t.clientX, t.clientY);
    };
    const onLeave = () => {
      mx = -9999;
      my = -9999;
      pointerActive = false;
    };

    // Click / tap to shatter: burst every particle outward from the hit point;
    // the spring-back reassembles the portrait over ~1.5s.
    const shatter = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const cxp = clientX - rect.left;
      const cyp = clientY - rect.top;
      // only when the hit lands over the portrait area
      if (cxp < -20 || cxp > W + 20 || cyp < -20 || cyp > H + 20) return;
      for (const p of particles) {
        const dx = p.x - cxp;
        const dy = p.y - cyp;
        const d = Math.hypot(dx, dy) || 1;
        const burst = 9 + Math.random() * 9;
        p.vx += (dx / d) * burst;
        p.vy += (dy / d) * burst;
      }
    };
    const onClick = (e: MouseEvent) => shatter(e.clientX, e.clientY);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("click", onClick);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("click", onClick);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" />;
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-bg"
    >
      {/* Radial gold glow behind portrait */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: "8%",
          right: "2%",
          width: "48%",
          height: "80%",
          background:
            "radial-gradient(ellipse at center, rgba(201,162,74,0.14) 0%, transparent 65%)",
        }}
      />

      {/* Particle portrait: right half on desktop, faded backdrop on mobile.
          Pushed below the navbar so links stay legible on landing. */}
      <div className="absolute top-24 bottom-0 left-0 right-0 md:left-[46%] z-0 opacity-40 md:opacity-100">
        <ParticlePortrait />
      </div>

      {/* Content */}
      <div className="section relative z-10 w-full">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-xs uppercase tracking-[0.22em] text-accent mb-6"
          >
            {personal.title}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display font-semibold leading-[1.05] text-ink-primary mb-8"
            style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}
          >
            AI that <em className="italic text-accent">earns</em>
            <br />
            its place.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-lg text-ink-secondary leading-relaxed mb-10 max-w-xl"
          >
            {personal.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <a href="#projects" className="btn-gold">
              See the work <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn-ghost">
              Get in touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex items-center gap-6"
          >
            <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ink-muted">
              <MapPin size={13} className="text-accent" />
              {personal.location}
            </span>
            <div className="flex items-center gap-3">
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-border-strong text-ink-secondary hover:text-accent hover:border-accent/60 transition-all"
              >
                <Linkedin size={17} />
              </a>
              <a
                href={`mailto:${personal.email}`}
                aria-label="Email"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-border-strong text-ink-secondary hover:text-accent hover:border-accent/60 transition-all"
              >
                <Mail size={17} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
