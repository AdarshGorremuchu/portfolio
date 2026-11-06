"use client";

import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { projects } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function Projects() {
  return (
    <section id="work" className="section border-t border-border-subtle">
      <div className="shell">
        <Reveal>
          <p className="label mb-6">Selected work</p>
          <h2 className="heading-4 md:heading-2 mb-12 max-w-prose text-ink-primary">
            Four builds, four problems.
          </h2>
        </Reveal>

        <ul className="grid gap-4 md:grid-cols-2">
          {projects.map((p, idx) => (
            <li key={p.title} className={idx === 0 ? "md:col-span-2" : ""}>
              <Reveal delay={Math.min(idx * 0.06, 0.24)} className="h-full">
                <article className="card card-hover h-full p-6">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <h3 className="heading-6 md:heading-5 text-ink-primary">
                      {p.title}
                    </h3>
                    <ArrowUpRightIcon
                      size={20}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-ink-muted"
                    />
                  </div>

                  <p className="body-6 mb-6 text-ink-secondary">{p.description}</p>

                  <ul className="mb-6 flex flex-col gap-2">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                        />
                        <span className="body-6 text-ink-secondary">{h}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="flex flex-wrap gap-2">
                    {p.stack.map((tech) => (
                      <li key={tech} className="tag">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
