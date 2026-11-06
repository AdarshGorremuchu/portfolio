"use client";

import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { faqs } from "@/lib/data";
import Reveal from "@/components/Reveal";

/**
 * A2 section 10, in plain question and answer form so it also works for AEO
 * (A7). Built on native details and summary: disclosure is instant and the
 * answer fades with opacity and transform only, because B7 forbids animating
 * height.
 */
export default function FAQ() {
  return (
    <section id="faq" className="section border-t border-border-subtle">
      <div className="shell">
        <Reveal>
          <p className="label mb-6">Questions</p>
          <h2 className="heading-4 md:heading-2 mb-12 max-w-prose text-ink-primary">
            The things recruiters ask first.
          </h2>
        </Reveal>

        <ul className="flex max-w-prose flex-col gap-2">
          {faqs.map((f, i) => (
            <li key={f.q}>
              <Reveal delay={Math.min(i * 0.03, 0.24)}>
                <details className="group card p-6">
                  <summary className="flex cursor-pointer items-center justify-between gap-4">
                    <span className="title-3 text-ink-primary">{f.q}</span>
                    <PlusIcon
                      size={20}
                      aria-hidden="true"
                      className="shrink-0 text-accent transition-transform duration-500 ease-base group-open:rotate-45"
                    />
                  </summary>
                  <p className="faq-answer body-6 mt-4 text-ink-secondary">
                    {f.a}
                  </p>
                </details>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
