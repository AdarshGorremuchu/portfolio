"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";

// Placeholder project visual — colored card mock to represent a screenshot
function ProjectVisual({ accent, title }: { accent: string; title: string }) {
  const palettes: Record<string, { bg: string; bar: string; dot: string }> = {
    indigo: { bg: "#f0f0ff", bar: "#6c5ce7", dot: "#a29bfe" },
    cyan:   { bg: "#f0fbff", bar: "#00cec9", dot: "#81ecec" },
    purple: { bg: "#fdf0ff", bar: "#fd79a8", dot: "#e84393" },
  };
  const p = palettes[accent] ?? palettes.indigo;

  return (
    <div
      className="rounded-xl overflow-hidden w-full h-full min-h-[220px] flex flex-col"
      style={{ background: p.bg }}
    >
      {/* Fake browser chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 bg-white/60 border-b border-black/5">
        <span className="w-3 h-3 rounded-full bg-red-300" />
        <span className="w-3 h-3 rounded-full bg-yellow-300" />
        <span className="w-3 h-3 rounded-full bg-green-300" />
        <span className="mx-auto text-xs text-gray-400 font-mono truncate">
          {title.toLowerCase().replace(/\s+/g, "-")}.app
        </span>
      </div>
      {/* Fake content */}
      <div className="flex-1 p-5 flex flex-col gap-3">
        <div className="h-4 rounded-full w-2/3" style={{ background: p.bar, opacity: 0.5 }} />
        <div className="h-3 rounded-full w-full bg-black/8" />
        <div className="h-3 rounded-full w-5/6 bg-black/8" />
        <div className="h-3 rounded-full w-4/6 bg-black/8" />
        <div className="mt-auto flex gap-2">
          <div className="h-8 rounded-md w-24" style={{ background: p.bar, opacity: 0.7 }} />
          <div className="h-8 rounded-md w-20 border-2" style={{ borderColor: p.dot, opacity: 0.5 }} />
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="section-label">Featured work</p>
        <h2 className="section-heading" style={{ marginBottom: 0 }}>
          Portfolio
        </h2>
      </motion.div>

      <div className="space-y-16">
        {projects.map((p, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="white-card grid md:grid-cols-2 gap-0 overflow-hidden"
            >
              {/* Visual — left on even, right on odd */}
              <div className={`p-6 flex items-center justify-center bg-bg-soft ${isEven ? "md:order-1" : "md:order-2"}`}>
                <div className="w-full">
                  <ProjectVisual accent={p.accent} title={p.title} />
                </div>
              </div>

              {/* Text */}
              <div className={`p-8 md:p-10 flex flex-col justify-center ${isEven ? "md:order-2" : "md:order-1"}`}>
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
                  Featured Project
                </p>
                <h3 className="text-2xl font-bold text-ink-primary mb-3 leading-snug">
                  {p.title}
                </h3>
                <p className="text-ink-secondary leading-relaxed mb-5 text-sm">
                  {p.description}
                </p>

                <ul className="space-y-1.5 mb-6">
                  {p.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2 text-sm text-ink-secondary">
                      <span className="text-accent mt-0.5 shrink-0">→</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-6">
                  {p.stack.map((tech) => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>

                <a href="#contact" className="btn-outline self-start text-sm">
                  See Project <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
