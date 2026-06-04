"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin } from "lucide-react";
import { experiences } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="section relative bg-bg-soft">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <p className="section-label">My journey</p>
        <h2 className="section-heading" style={{ marginBottom: 0 }}>
          Work Experience
        </h2>
      </motion.div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/50 via-accent/20 to-transparent" />

        <div className="space-y-10">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company + idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-12 md:pl-20"
            >
              {/* Timeline dot */}
              <div className="absolute left-1.5 md:left-5.5 top-3 w-5 h-5 rounded-full bg-white border-2 border-accent flex items-center justify-center shadow-sm">
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>

              <div className="white-card p-6 md:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-ink-primary leading-tight">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1.5 text-accent text-sm font-medium">
                      <Briefcase size={13} />
                      <span>{exp.company}</span>
                      <span className="text-border-strong">·</span>
                      <MapPin size={13} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-accent/10 text-accent whitespace-nowrap font-semibold">
                    {exp.period}
                  </span>
                </div>

                <p className="text-ink-secondary text-sm leading-relaxed mb-4">
                  {exp.description}
                </p>

                <ul className="space-y-2 mb-5">
                  {exp.achievements.map((a, i) => (
                    <li key={i} className="flex gap-2 text-sm text-ink-secondary">
                      <span className="text-accent mt-0.5 shrink-0">›</span>
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.stack.map((tech) => (
                    <span key={tech} className="tag">{tech}</span>
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
