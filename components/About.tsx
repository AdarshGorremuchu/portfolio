"use client";

import { motion } from "framer-motion";
import { personal, stats, education } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="section relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">01 / About</div>
        <h2 className="section-heading">
          Engineer at the intersection of <span className="italic gradient-text">AI</span>,
          <br />
          data, and cloud.
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-5 gap-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-3"
        >
          <p className="text-lg leading-relaxed text-ink-secondary mb-6">
            {personal.summary}
          </p>
          <p className="text-lg leading-relaxed text-ink-secondary">
            Currently architecting autonomous agent workflows and embedding them
            into Microsoft enterprise ecosystems. Always curious about the next
            problem to solve.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-2 space-y-3"
        >
          {education.map((ed) => (
            <div
              key={ed.school}
              className="p-5 rounded-lg bg-bg-card border border-border-subtle"
            >
              <div className="text-xs font-mono text-accent-glow mb-2">
                {ed.period}
              </div>
              <div className="font-medium text-ink-primary mb-1">
                {ed.school}
              </div>
              <div className="text-sm text-ink-secondary mb-2">{ed.degree}</div>
              <div className="text-xs text-ink-muted">{ed.focus}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {stats.map((s) => (
          <div
            key={s.label}
            className="p-5 rounded-lg bg-bg-card border border-border-subtle hover:border-accent/30 transition-colors"
          >
            <div className="font-display text-3xl md:text-4xl gradient-text mb-2">
              {s.value}
            </div>
            <div className="text-xs text-ink-muted leading-snug">{s.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
