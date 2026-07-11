"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { projects } from "@/lib/data";

const glowMap: Record<string, string> = {
  gold: "from-accent/25 to-transparent",
  blue: "from-accent-blue/30 to-transparent",
};

export default function Projects() {
  return (
    <section id="projects" className="section relative">
      <span className="roman-numeral" style={{ top: "3rem", left: "1rem" }}>
        III
      </span>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Selected Work</div>
          <h2 className="section-heading">
            Things I&apos;ve <em>built</em>.
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
              className={`gold-card group relative p-7 overflow-hidden ${
                idx === 0 ? "md:col-span-2" : ""
              }`}
            >
              {/* Accent glow */}
              <div
                className={`absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl ${
                  glowMap[p.accent] || glowMap.gold
                } rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2 text-accent">
                    <Sparkles size={16} />
                    <span className="font-mono text-xs uppercase tracking-widest">
                      Featured Project
                    </span>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-ink-muted group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
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
                    <li key={i} className="flex gap-2 text-sm text-ink-secondary">
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
      </div>
    </section>
  );
}
