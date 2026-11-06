"use client";

import {
  RobotIcon,
  MagnifyingGlassIcon,
  ChartScatterIcon,
  ScalesIcon,
  ChartLineUpIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { benefits } from "@/lib/data";
import Reveal from "@/components/Reveal";

const ICONS: Record<string, Icon> = {
  agents: RobotIcon,
  retrieval: MagnifyingGlassIcon,
  validation: ChartScatterIcon,
  fairness: ScalesIcon,
  delivery: ChartLineUpIcon,
};

/**
 * A2 section 7. Outcome first, with the real number attached to each claim
 * so the proof sits beside the thing it supports (A4).
 */
export default function Benefits() {
  return (
    <section id="benefits" className="section border-t border-border-subtle bg-bg-soft">
      <div className="shell">
        <Reveal>
          <p className="label mb-6">What you get</p>
          <h2 className="heading-4 md:heading-2 mb-12 max-w-prose text-ink-primary">
            Five things I am reliably good at.
          </h2>
        </Reveal>

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => {
            const Glyph = ICONS[b.icon] ?? RobotIcon;
            return (
              <li key={b.title} className={i === 0 ? "lg:col-span-2" : ""}>
                <Reveal delay={Math.min(i * 0.06, 0.24)} className="h-full">
                  <div className="card card-hover h-full p-6">
                    <span className="mb-6 grid h-10 w-10 place-items-center rounded-lg border border-border-subtle bg-bg text-accent">
                      <Glyph size={20} aria-hidden="true" />
                    </span>
                    <p className="title-1 mb-2 text-ink-primary">{b.title}</p>
                    <p className="body-6 text-ink-secondary">{b.detail}</p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
