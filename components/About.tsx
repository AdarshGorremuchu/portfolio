"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download } from "lucide-react";
import { personal, stats, education, skills } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="section relative">
      <span className="roman-numeral" style={{ top: "3rem", left: "1rem" }}>
        I
      </span>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">About</div>
          <h2 className="section-heading">
            A data scientist&apos;s rigor,
            <br />
            an <em>engineer&apos;s</em> ship-it instinct.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-12 mb-20 md:items-stretch">
          {/* Left: clear gold-framed portrait */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2"
          >
            <div className="rounded-2xl p-[3px] bg-gradient-to-br from-accent-glow via-accent to-accent-deep shadow-[0_12px_40px_rgba(201,162,74,0.18)]">
              <Image
                src="/headshot.png"
                alt="Adarsh Gorremuchu, AI/ML Engineer & Data Scientist"
                width={480}
                height={600}
                priority
                className="rounded-[calc(1rem-3px)] w-full aspect-[4/5] object-cover object-top"
              />
            </div>
          </motion.div>

          {/* Right: bio + education + resume, filling the column height */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3 flex flex-col"
          >
            <p className="text-lg leading-relaxed text-ink-secondary mb-6">
              {personal.summary}
            </p>

            {education.map((ed) => (
              <div key={ed.school} className="gold-card p-5 mb-6">
                <div className="text-xs font-mono text-accent mb-2 tracking-wider">
                  {ed.period}
                </div>
                <div className="font-medium text-ink-primary mb-1">
                  {ed.school}
                </div>
                <div className="text-sm text-ink-secondary mb-2">{ed.degree}</div>
                <div className="text-xs text-ink-muted">{ed.focus}</div>
              </div>
            ))}

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-sm inline-flex self-start mt-auto"
            >
              <Download size={15} aria-hidden="true" /> Get my resume
            </a>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {stats.map((s) => (
            <div key={s.label} className="gold-card p-5">
              <div className="font-display text-3xl md:text-4xl gold-text mb-2">
                {s.value}
              </div>
              <div className="text-xs text-ink-muted leading-snug">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Toolkit</div>
          <h3 className="font-display text-2xl md:text-3xl text-ink-primary mb-8">
            What I work with
          </h3>
          <div className="grid md:grid-cols-2 gap-x-12">
            {skills.map((group) => (
              <div
                key={group.category}
                className="py-5 border-b border-border-subtle"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
