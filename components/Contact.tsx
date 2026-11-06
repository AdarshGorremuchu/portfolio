"use client";

import { useState } from "react";
import {
  CheckCircleIcon,
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  MapPinIcon,
  PaperPlaneTiltIcon,
} from "@phosphor-icons/react/dist/ssr";
import { personal } from "@/lib/data";
import Reveal from "@/components/Reveal";

type Status = "idle" | "sending" | "success" | "error";
type Errors = { name?: string; email?: string; message?: string };

/** B10 requires client side validation for required fields and email format. */
function validate(form: HTMLFormElement): Errors {
  const data = new FormData(form);
  const errors: Errors = {};
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();

  if (!name) errors.name = "Enter your name.";
  if (!email) errors.email = "Enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email = "That address does not look complete. Try you@company.com.";
  if (!message) errors.message = "Add a line or two about the role.";

  return errors;
}

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Focus the first field that failed. Reading it off `found` rather than
      // off the DOM matters: React has not re-rendered the aria-invalid
      // attributes yet at this point.
      const first = (["name", "email", "message"] as const).find((k) => found[k]);
      if (first) form.querySelector<HTMLElement>(`#contact-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mwvzvlkz", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const rows = [
    {
      Icon: EnvelopeSimpleIcon,
      label: "Email",
      value: personal.email,
      href: `mailto:${personal.email}`,
    },
    {
      Icon: LinkedinLogoIcon,
      label: "LinkedIn",
      value: "adarsh-gorremuchu",
      href: personal.linkedin,
    },
    {
      Icon: GithubLogoIcon,
      label: "GitHub",
      value: "AdarshGorremuchu",
      href: personal.github,
    },
    { Icon: MapPinIcon, label: "Location", value: personal.location, href: null },
  ];

  return (
    <section id="contact" className="section border-t border-border-subtle bg-bg-soft">
      <div className="shell">
        <Reveal>
          <p className="label mb-6">Contact</p>
          {/* Final CTA, identical in promise to the one in the hero (A2). */}
          <h2 className="heading-4 md:heading-2 mb-6 max-w-prose text-ink-primary">
            Send a message and I will read it myself.
          </h2>
          <p className="body-7 mb-12 max-w-prose text-ink-secondary">
            {personal.riskReversal}
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-5">
          <Reveal delay={0.1} className="md:col-span-2">
            <ul className="flex flex-col gap-3">
              {rows.map(({ Icon, label, value, href }) => {
                const inner = (
                  <>
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border-subtle bg-bg text-accent">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="caption-5 block text-ink-muted">
                        {label}
                      </span>
                      <span className="body-6 block truncate text-ink-primary">
                        {value}
                      </span>
                    </span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="card card-hover flex items-center gap-3 p-4"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="card flex items-center gap-3 p-4">
                        {inner}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.2} className="md:col-span-3">
            {status === "success" ? (
              // Calm, specific confirmation (B8). No exclamation marks.
              <div className="card h-full border-border-strong p-6">
                <span className="mb-6 grid h-10 w-10 place-items-center rounded-lg border border-border-strong bg-bg text-accent">
                  <CheckCircleIcon size={20} aria-hidden="true" />
                </span>
                <p className="title-1 mb-2 text-ink-primary">Message sent.</p>
                <p className="body-6 mb-6 text-ink-secondary">
                  It is in my inbox. I will reply to the address you gave, and
                  nobody else sees this form.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="btn-secondary button-sm"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="card p-6">
                <div className="mb-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="caption-4 mb-2 block text-ink-muted"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      aria-invalid={errors.name ? "true" : undefined}
                      aria-describedby={errors.name ? "err-name" : undefined}
                      className={`field ${errors.name ? "field-invalid" : ""}`}
                    />
                    {errors.name && (
                      <p id="err-name" className="caption-5 mt-2 text-ink-error">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="caption-4 mb-2 block text-ink-muted"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      aria-invalid={errors.email ? "true" : undefined}
                      aria-describedby={errors.email ? "err-email" : undefined}
                      className={`field ${errors.email ? "field-invalid" : ""}`}
                    />
                    {errors.email && (
                      <p id="err-email" className="caption-5 mt-2 text-ink-error">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="contact-company"
                    className="caption-4 mb-2 block text-ink-muted"
                  >
                    Company or role
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    placeholder="Optional"
                    className="field"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="contact-message"
                    className="caption-4 mb-2 block text-ink-muted"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="What are you hiring for, and what is the problem behind it?"
                    aria-invalid={errors.message ? "true" : undefined}
                    aria-describedby={errors.message ? "err-message" : undefined}
                    className={`field resize-none ${
                      errors.message ? "field-invalid" : ""
                    }`}
                  />
                  {errors.message && (
                    <p id="err-message" className="caption-5 mt-2 text-ink-error">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary w-full md:w-auto"
                >
                  {status === "sending" ? (
                    "Sending"
                  ) : (
                    <>
                      Send a message
                      <PaperPlaneTiltIcon size={16} aria-hidden="true" />
                    </>
                  )}
                </button>

                {status === "error" && (
                  <p role="alert" className="body-6 mt-4 text-ink-error">
                    Could not send. CheckIcon your connection, or email{" "}
                    <a
                      href={`mailto:${personal.email}`}
                      className="underline underline-offset-4"
                    >
                      {personal.email}
                    </a>{" "}
                    directly.
                  </p>
                )}
              </form>
            )}
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <p className="caption-5 mt-12 text-ink-muted">
            Prefer the short version? The{" "}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-secondary underline underline-offset-4 transition-colors duration-300 ease-base hover:text-accent"
            >
              resume
            </a>{" "}
            covers the same ground in two pages.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
