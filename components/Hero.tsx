"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail, MapPin } from "lucide-react";
import { personal } from "@/lib/data";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const c = ctx;

    let animId: number;
    let W = 0,
      H = 0;

    interface Particle {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speedX: number;
      speedY: number;
    }

    let particles: Particle[] = [];

    const el = canvas;

    function resize() {
      W = el.offsetWidth;
      H = el.offsetHeight;
      el.width = W;
      el.height = H;
    }

    function init() {
      resize();
      particles = [];
      const count = Math.floor((W * H) / 8000);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          size: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.6 + 0.1,
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.15,
        });
      }
    }

    function draw() {
      c.clearRect(0, 0, W, H);
      for (const p of particles) {
        c.beginPath();
        c.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        c.fillStyle = `rgba(255,255,255,${p.opacity})`;
        c.fill();
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      }
      animId = requestAnimationFrame(draw);
    }

    init();
    draw();

    const ro = new ResizeObserver(init);
    ro.observe(el);

    return () => {
      cancelAnimationFrame(animId);
      ro.unobserve(el);
    };
  }, []);

  return <canvas ref={canvasRef} id="particle-canvas" />;
}

export default function Hero() {
  const nameParts = personal.name.toUpperCase().split(" ");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-bg"
    >
      {/* Layer 0: particle canvas */}
      <ParticleCanvas />

      {/* Layer 1: radial vignette — fades particles at edges */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(7,12,22,0.88) 100%)",
        }}
      />

      {/* Layer 2: content */}
      <div className="section relative z-10 w-full pt-28">
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-xs font-mono text-ink-secondary uppercase tracking-widest">
            Available for new opportunities
          </span>
        </motion.div>

        {/* Editorial name — each word drops in as a full block */}
        <div className="mb-6 overflow-hidden">
          {nameParts.map((word, i) => (
            <motion.span
              key={word}
              className="hero-word"
              style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.15 + i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Title — spread all-caps editorial line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mb-10 overflow-hidden"
        >
          <span
            className="hero-word hero-word--spread"
            style={{ fontSize: "clamp(0.85rem, 2.2vw, 1.4rem)" }}
          >
            {personal.title.toUpperCase()}
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="text-base md:text-lg text-ink-secondary max-w-xl leading-relaxed mb-10"
        >
          {personal.tagline}
        </motion.p>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="flex flex-wrap items-center gap-6 mb-10 text-xs font-mono text-ink-muted uppercase tracking-widest"
        >
          <span className="flex items-center gap-2">
            <MapPin size={12} className="text-accent" />
            {personal.location}
          </span>
          <a
            href={`mailto:${personal.email}`}
            className="flex items-center gap-2 hover:text-ink-primary transition-colors"
          >
            <Mail size={12} className="text-accent" />
            {personal.email}
          </a>
        </motion.div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.88 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-white rounded-full font-sans font-semibold text-sm uppercase tracking-wider hover:bg-accent-glow transition-all"
          >
            View My Work
            <ArrowDown
              size={14}
              className="group-hover:translate-y-0.5 transition-transform"
            />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-sans font-semibold text-sm uppercase tracking-wider border border-white/15 text-ink-primary hover:border-accent/60 hover:bg-accent/5 transition-all"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-muted"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
