"use client";

import { steps } from "@/lib/data";
import Reveal from "@/components/Reveal";

/** A2 section 8. Three steps, no more. */
export default function HowItWorks() {
  return (
    <section id="how" className="section border-t border-border-subtle">
      <div className="shell">
        <Reveal>
          <p className="label mb-6">How it works</p>
          <h2 className="heading-4 md:heading-2 mb-12 max-w-prose text-ink-primary">
            Three steps from a problem
            <br />
            to something running.
          </h2>
        </Reveal>

        <ol className="grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={Math.min(i * 0.08, 0.24)} className="h-full">
                <div className="card h-full p-6">
                  <p className="caption-3 mb-6 text-accent">
                    Step {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="title-1 mb-2 text-ink-primary">{s.title}</p>
                  <p className="body-6 text-ink-secondary">{s.detail}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
