"use client";

import { BriefcaseIcon, MapPinIcon } from "@phosphor-icons/react/dist/ssr";
import { experiences } from "@/lib/data";
import Reveal from "@/components/Reveal";

export default function Experience() {
  return (
    <section
      id="experience"
      className="section border-t border-border-subtle bg-bg-soft"
    >
      <div className="shell">
        <Reveal>
          <p className="label mb-6">Experience</p>
          <h2 className="heading-4 md:heading-2 mb-12 max-w-prose text-ink-primary">
            Where the numbers came from.
          </h2>
        </Reveal>

        <div className="relative">
          {/* Flat hairline rule. No gradient (B4). */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-2 top-0 w-px bg-border-subtle"
          />

          <ol className="flex flex-col gap-12">
            {experiences.map((exp, idx) => (
              <li key={exp.company} className="relative pl-10 md:pl-12">
                {/* Node sits on the rule. */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-6 grid h-4 w-4 place-items-center rounded-full border border-accent bg-bg"
                >
                  <span className="h-1 w-1 rounded-full bg-accent" />
                </span>

                <Reveal delay={Math.min(idx * 0.08, 0.24)}>
                  <article className="card p-6">
                    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="heading-6 md:heading-5 text-ink-primary">
                          {exp.role}
                        </h3>
                        <p className="caption-1 mt-2 flex flex-wrap items-center gap-2 text-accent">
                          <BriefcaseIcon size={14} aria-hidden="true" />
                          <span>{exp.company}</span>
                          <MapPinIcon size={14} aria-hidden="true" />
                          <span>{exp.location}</span>
                        </p>
                      </div>
                      <span className="caption-4 whitespace-nowrap rounded-full border border-border-subtle bg-bg px-3 py-1 text-ink-secondary">
                        {exp.period}
                      </span>
                    </div>

                    <p className="body-6 mb-6 text-ink-secondary">
                      {exp.description}
                    </p>

                    <ul className="mb-6 flex flex-col gap-3">
                      {exp.achievements.map((a) => (
                        <li key={a} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent"
                          />
                          <span className="body-6 text-ink-secondary">{a}</span>
                        </li>
                      ))}
                    </ul>

                    <ul className="flex flex-wrap gap-2">
                      {exp.stack.map((tech) => (
                        <li key={tech} className="tag">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
