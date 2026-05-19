"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import {
  Brain,
  Cloud,
  Database,
  BarChart3,
  Code2,
  Sparkles,
} from "lucide-react";

const iconMap: Record<string, JSX.Element> = {
  "AI / ML": <Brain size={20} />,
  Microsoft: <Sparkles size={20} />,
  "Cloud & DevOps": <Cloud size={20} />,
  Data: <Database size={20} />,
  Languages: <Code2 size={20} />,
  "BI / Analytics": <BarChart3 size={20} />,
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="section relative bg-bg-soft/30 border-y border-border-subtle"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">04 / Skills</div>
        <h2 className="section-heading">
          The <span className="italic gradient-text">toolkit</span>.
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.map((group, idx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="glow-card rounded-xl bg-bg-card border border-border-subtle p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center text-accent-glow">
                {iconMap[group.category] || <Code2 size={20} />}
              </div>
              <h3 className="font-display text-xl text-ink-primary">
                {group.category}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
