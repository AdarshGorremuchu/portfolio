"use client";

import { XIcon, CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { problemSolution } from "@/lib/data";
import Reveal from "@/components/Reveal";

/** A2 section 6. The problem and the answer to it, side by side. */
export default function ProblemSolution() {
  return (
    <section id="problem" className="section border-t border-border-subtle">
      <div className="shell">
        <Reveal>
          <p className="label mb-6">The gap</p>
          <h2 className="heading-4 md:heading-2 mb-12 max-w-prose text-ink-primary">
            Pilots are easy.
            <br />
            Production is the hard part.
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="card h-full p-6">
              <p className="title-1 mb-6 text-ink-primary">
                What usually goes wrong
              </p>
              <ul className="flex flex-col gap-4">
                {problemSolution.problems.map((p) => (
                  <li key={p} className="flex gap-3">
                    <XIcon
                      size={16}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-ink-muted"
                    />
                    <span className="body-6 text-ink-secondary">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="card h-full border-border-strong p-6">
              <p className="title-1 mb-6 text-ink-primary">What I do instead</p>
              <ul className="flex flex-col gap-4">
                {problemSolution.solutions.map((s) => (
                  <li key={s} className="flex gap-3">
                    <CheckIcon
                      size={16}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-accent"
                    />
                    <span className="body-6 text-ink-secondary">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
