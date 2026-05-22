"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { experiences } from "@/lib/data";

export default function Experience() {
  return (
    <section
      id="experience"
      className="section relative bg-bg-soft/30 border-y border-border-subtle"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">02 / Experience</div>
        <h2 className="section-heading">
          Where I&apos;ve <span className="gradient-text">shipped</span>.
        </h2>
      </motion.div>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-accent/20 to-transparent" />

        <div className="space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company + idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-12 md:pl-20"
            >
              {/* Timeline dot */}
              <div className="absolute left-2 md:left-6 top-2 w-5 h-5 rounded-full bg-bg border-2 border-accent flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              </div>

              <div className="glow-card rounded-xl bg-bg-card border border-border-subtle p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl text-ink-primary leading-tight">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 text-accent-glow font-mono text-sm">
                      <Briefcase size={14} />
                      <span>{exp.company}</span>
                      <span className="text-ink-muted">·</span>
                      <MapPin size={14} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  <span className="font-mono text-xs px-3 py-1 rounded-full bg-bg-elev border border-border-subtle text-ink-secondary whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>

                <p className="text-ink-secondary mb-5 leading-relaxed">
                  {exp.description}
                </p>

                <ul className="space-y-2.5 mb-6">
                  {exp.achievements.map((a, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm text-ink-secondary leading-relaxed"
                    >
                      <span className="text-accent-glow mt-1.5 shrink-0">
                        ▸
                      </span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.stack.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
