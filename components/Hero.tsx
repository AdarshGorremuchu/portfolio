"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRightIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  MapPinIcon,
} from "@phosphor-icons/react/dist/ssr";
import { personal } from "@/lib/data";
import Magnetic from "@/components/Magnetic";
import { EASE_BASE } from "@/components/Reveal";

// Real 3D point cloud portrait, code split so the heavy three.js payload only
// loads on capable desktops (see the gating in HeroPortrait below).
const ParticlePortrait3D = dynamic(
  () => import("@/components/ParticlePortrait3D"),
  { ssr: false }
);

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Chooses the 3D point cloud on capable desktops, otherwise the 2D canvas
 * portrait (which handles reduced motion itself). Starts as 2D so SSR and
 * first paint stay cheap, then upgrades after mount.
 */
function HeroPortrait() {
  const [use3D, setUse3D] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    if (!reduce && !small && supportsWebGL()) setUse3D(true);
  }, []);
  return use3D ? <ParticlePortrait3D /> : <ParticlePortrait />;
}

/**
 * Samples /public/headshot.webp into a field of gold particles that assemble
 * from scattered positions on mount, repel the cursor, and shatter on click.
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
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animId = 0;
    let W = 0;
    let H = 0;

    interface P {
      x: number;
      y: number;
      tx: number;
      ty: number;
      size: number;
      alpha: number;
      depth: number;
      vx: number;
      vy: number;
    }
    let particles: P[] = [];

    let mx = -9999;
    let my = -9999;
    let pointerActive = false;
    let parX = 0;
    let parY = 0;

    const GOLDS = ["#c9a24a", "#e6c877", "#f5e2a8", "#b8862f"];

    function buildFromSource(
      draw: (o: CanvasRenderingContext2D, w: number, h: number) => void
    ) {
      W = el.offsetWidth;
      H = el.offsetHeight;
      el.width = W;
      el.height = H;

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
      const gap = 2;
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
          if (a > 50 && bright > 36) {
            const tx = x * scaleX;
            const ty = y * scaleY;
            const norm = bright / 255;
            next.push({
              x: Math.random() * W,
              y: Math.random() * H,
              tx,
              ty,
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
      o.font = `600 ${Math.round(h * 0.62)}px Poppins, system-ui, sans-serif`;
      o.fillText("AG", w / 2, h / 2 + h * 0.02);
    }

    function animate() {
      const t = Date.now();

      const targetParX = pointerActive ? -((mx - W / 2) / W) * 24 : 0;
      const targetParY = pointerActive ? -((my - H / 2) / H) * 24 : 0;
      parX += (targetParX - parX) * 0.05;
      parY += (targetParY - parY) * 0.05;

      const breath = 1 + Math.sin(t * 0.0009) * 0.014;
      const bob = Math.sin(t * 0.0011) * 1.6;

      c.clearRect(0, 0, W, H);
      c.globalCompositeOperation = "lighter";
      const R = Math.max(80, W * 0.1);
      for (const p of particles) {
        let ax = (p.tx - p.x) * 0.022;
        let ay = (p.ty - p.y) * 0.022;
        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < R * R) {
          const d = Math.sqrt(d2) || 1;
          const force = ((R - d) / R) * 6;
          ax += (dx / d) * force;
          ay += (dy / d) * force;
        }
        p.vx = (p.vx + ax) * 0.85;
        p.vy = (p.vy + ay) * 0.85;
        p.x += p.vx;
        p.y += p.vy;

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

    // Reduced motion: render the portrait once at rest, no assembly, no
    // pointer interaction.
    if (reduce) {
      const drawStatic = () => {
        buildFromSource(activeDraw);
        c.clearRect(0, 0, W, H);
        c.globalCompositeOperation = "lighter";
        for (const p of particles) {
          c.beginPath();
          c.arc(p.tx, p.ty, p.size, 0, Math.PI * 2);
          c.fillStyle = GOLDS[(p.tx | 0) % GOLDS.length];
          c.globalAlpha = p.alpha;
          c.fill();
        }
        c.globalAlpha = 1;
        c.globalCompositeOperation = "source-over";
      };
      img.onload = () => {
        activeDraw = drawPhoto;
        drawStatic();
      };
      img.src = "/headshot.webp";
      drawStatic();
      const roStatic = new ResizeObserver(drawStatic);
      roStatic.observe(el);
      return () => roStatic.disconnect();
    }

    img.onload = () => {
      activeDraw = drawPhoto;
      buildFromSource(activeDraw);
    };
    img.src = "/headshot.webp";

    buildFromSource(activeDraw);
    animate();

    const ro = new ResizeObserver(() => buildFromSource(activeDraw));
    ro.observe(el);

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

    const shatter = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const cxp = clientX - rect.left;
      const cyp = clientY - rect.top;
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

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  const wordReveal = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE_BASE },
    },
  };

  // B5: line breaks fall where the thought breaks.
  const lines = [
    ["AI", "that", "earns"],
    ["its", "place."],
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-bg pt-24"
    >
      {/* Portrait: right half on desktop, a dim full bleed backdrop on mobile.
          On desktop a mask feathers the left edge so the canvas bounds never
          read as a rectangle (see .portrait-mask in globals.css). */}
      <div className="portrait-mask absolute inset-0 z-0 opacity-20 md:left-1/2 md:top-24 md:opacity-100">
        <HeroPortrait />
      </div>

      {/* pointer-events-none keeps the transparent wrapper from stealing the
          cursor from the portrait behind it. Interactive clusters opt back in. */}
      <div className="shell section relative z-10 pointer-events-none">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_BASE }}
          className="label mb-6"
        >
          {personal.title}
        </motion.p>

        <motion.h1
          aria-label="AI that earns its place."
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
          }}
          className="hero-gradient heading-3 md:heading-1 mb-6 max-w-prose"
        >
          {lines.map((line, li) => (
            <span aria-hidden="true" className="block" key={li}>
              {line.map((word, wi) => (
                <motion.span
                  key={word}
                  variants={wordReveal}
                  className={`inline-block ${wi > 0 ? "ml-2" : ""}`}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE_BASE }}
          className="body-7 mb-10 max-w-prose text-ink-secondary"
        >
          {personal.subheadline}
        </motion.p>

        {/* One primary action. The resume is a plain link, not a rival CTA. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE_BASE }}
          className="pointer-events-auto mb-6 flex flex-wrap items-center gap-6"
        >
          <Magnetic>
            <a href="#contact" className="btn-primary">
              Send a message
              <ArrowRightIcon size={16} aria-hidden="true" />
            </a>
          </Magnetic>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="body-6 text-ink-secondary underline decoration-border-strong underline-offset-4 transition-colors duration-300 ease-base hover:text-accent"
          >
            Read the resume
          </a>
        </motion.div>

        {/* The one proof signal above the fold. */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE_BASE }}
          className="caption-2 mb-12 max-w-prose text-ink-muted"
        >
          {personal.proofLine}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7, ease: EASE_BASE }}
          className="pointer-events-auto flex flex-wrap items-center gap-6"
        >
          <span className="caption-4 flex items-center gap-2 text-ink-muted">
            <MapPinIcon size={14} className="text-accent" aria-hidden="true" />
            {personal.location}
          </span>
          <div className="flex items-center gap-3">
            {[
              {
                href: personal.linkedin,
                label: "LinkedIn",
                Icon: LinkedinLogoIcon,
                external: true,
              },
              {
                href: personal.github,
                label: "GitHub",
                Icon: GithubLogoIcon,
                external: true,
              },
              {
                href: `mailto:${personal.email}`,
                label: "Email",
                Icon: EnvelopeSimpleIcon,
                external: false,
              },
            ].map(({ href, label, Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-border-subtle text-ink-secondary transition-colors duration-300 ease-base hover:border-border-strong hover:text-accent"
              >
                <Icon size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
