"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { projects } from "@/lib/data";

const accentMap: Record<string, string> = {
  indigo: "from-orange-600/20 to-transparent",
  cyan: "from-amber-500/20 to-transparent",
  purple: "from-orange-500/20 to-transparent",
};

export default function Projects() {
  return (
    <section id="projects" className="section relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">03 / Projects</div>
        <h2 className="section-heading">
          Things I&apos;ve <span className="gradient-text">built</span>.
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, idx) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className={`glow-card group relative rounded-2xl bg-bg-card border border-border-subtle p-7 overflow-hidden ${
              idx === 0 ? "md:col-span-2" : ""
            }`}
          >
            {/* Accent gradient */}
            <div
              className={`absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl ${
                accentMap[p.accent] || accentMap.indigo
              } rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
            />

            <div className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2 text-accent-glow">
                  <Sparkles size={16} />
                  <span className="font-mono text-xs uppercase tracking-wider">
                    Featured Project
                  </span>
                </div>
                <ArrowUpRight
                  size={20}
                  className="text-ink-muted group-hover:text-accent-glow group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                />
              </div>

              <h3 className="font-display text-2xl md:text-3xl text-ink-primary mb-3 leading-tight">
                {p.title}
              </h3>

              <p className="text-ink-secondary mb-5 leading-relaxed">
                {p.description}
              </p>

              <ul className="space-y-2 mb-5">
                {p.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-sm text-ink-secondary"
                  >
                    <span className="text-accent mt-1">→</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {p.stack.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
