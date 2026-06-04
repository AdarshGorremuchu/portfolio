"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail, Download } from "lucide-react";
import { personal, skills, education } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="section relative bg-white">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        {/* Left — bio */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Who I am</p>
          <h2 className="section-heading">About Myself</h2>

          <p className="text-ink-secondary leading-relaxed mb-6">
            {personal.summary}
          </p>

          {/* Education */}
          <div className="space-y-3 mb-8">
            {education.map((ed) => (
              <div key={ed.school} className="flex gap-3">
                <div className="w-1 rounded-full bg-accent shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-ink-primary text-sm">{ed.school}</p>
                  <p className="text-xs text-ink-muted">{ed.degree} · {ed.period}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Socials + resume */}
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
            Let&apos;s Connect
          </p>
          <div className="flex items-center gap-3 mb-6">
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-ink-primary text-ink-primary hover:border-accent hover:text-accent transition-all"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-ink-primary text-ink-primary hover:border-accent hover:text-accent transition-all"
            >
              <Mail size={18} />
            </a>
          </div>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline text-sm inline-flex">
            <Download size={15} /> Get my resume
          </a>
        </motion.div>

        {/* Right — skills accordion */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="section-label">What I do</p>
          <h2 className="section-heading">Skills</h2>

          <div className="divide-y divide-border-subtle">
            {skills.map((group) => (
              <details key={group.category} className="group py-4">
                <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-ink-primary hover:text-accent transition-colors select-none">
                  <span>{group.category}</span>
                  <span className="text-accent text-lg transition-transform group-open:rotate-90">›</span>
                </summary>
                <div className="flex flex-wrap gap-2 mt-3 pb-1">
                  {group.items.map((item) => (
                    <span key={item} className="tag">{item}</span>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
