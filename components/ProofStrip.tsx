"use client";

import { proofOrgs } from "@/lib/data";
import Reveal from "@/components/Reveal";

/**
 * A2 proof signal. Real employers only, as wordmarks rather than invented
 * logos (B8).
 */
export default function ProofStrip() {
  return (
    <section className="border-y border-border-subtle bg-bg-soft py-12">
      <div className="shell">
        <Reveal>
          <p className="caption-4 mb-6 uppercase text-ink-muted" style={{ letterSpacing: "0.18em" }}>
            Where the work has run
          </p>
          <ul className="grid gap-6 md:grid-cols-3">
            {proofOrgs.map((org) => (
              <li key={org.name}>
                <p className="title-1 text-ink-primary">{org.name}</p>
                <p className="caption-5 text-ink-muted">{org.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
