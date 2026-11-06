"use client";

import Image from "next/image";
import { FileTextIcon } from "@phosphor-icons/react/dist/ssr";
import { personal, stats, education } from "@/lib/data";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="about" className="section">
      <div className="shell">
        <Reveal>
          <p className="label mb-6">About</p>
          <h2 className="heading-4 md:heading-2 mb-12 max-w-prose text-ink-primary">
            A data scientist&apos;s rigor,
            <br />
            an engineer&apos;s instinct to ship.
          </h2>
        </Reveal>

        <div className="mb-20 grid gap-12 md:grid-cols-5">
          {/* Nested radius: outer 16px with a 4px gap gives the image 12px. */}
          <Reveal delay={0.1} className="md:col-span-2">
            <div className="rounded-2xl border border-border-strong bg-bg-card p-1">
              <Image
                src="/headshot.webp"
                alt="Adarsh Gorremuchu, AI/ML engineer, in a dark jacket against a plain background"
                width={480}
                height={600}
                priority
                className="aspect-[4/5] w-full rounded-xl object-cover object-top"
              />
            </div>
          </Reveal>

          <Reveal delay={0.2} className="md:col-span-3">
            <div className="flex h-full flex-col">
              <p className="body-7 mb-6 text-ink-secondary">{personal.summary}</p>

              {education.map((ed) => (
                <div key={ed.school} className="card mb-6 p-6">
                  <p className="caption-4 mb-2 text-accent">{ed.period}</p>
                  <p className="title-1 text-ink-primary">{ed.school}</p>
                  <p className="body-6 mb-2 text-ink-secondary">{ed.degree}</p>
                  <p className="caption-5 text-ink-muted">{ed.focus}</p>
                </div>
              ))}

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary button-sm mt-auto self-start"
              >
                <FileTextIcon size={16} aria-hidden="true" />
                Read the resume
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <li key={s.label} className="card p-6">
                <CountUp
                  value={s.value}
                  className="heading-5 md:heading-4 mb-2 block text-accent"
                />
                <p className="caption-5 text-ink-muted">{s.label}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
