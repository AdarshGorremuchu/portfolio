"use client";

import { skills } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function Skills() {
  return (
    <section
      id="toolkit"
      className="section border-t border-border-subtle bg-bg-soft"
    >
      <div className="shell">
        <Reveal>
          <p className="label mb-6">Toolkit</p>
          <h2 className="heading-4 md:heading-2 mb-12 max-w-prose text-ink-primary">
            What I work with.
          </h2>
        </Reveal>

        <ul className="grid gap-4 md:grid-cols-2">
          {skills.map((group, i) => (
            <li key={group.category}>
              <Reveal delay={Math.min(i * 0.05, 0.24)} className="h-full">
                <div className="card h-full p-6">
                  <p className="caption-3 mb-4 uppercase text-accent" style={{ letterSpacing: "0.14em" }}>
                    {group.category}
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item} className="tag">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
