"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_BASE } from "@/components/Reveal";

const links = [
  { href: "#about", label: "About", id: "about" },
  { href: "#experience", label: "Experience", id: "experience" },
  { href: "#work", label: "Work", id: "work" },
  { href: "#faq", label: "FAQ", id: "faq" },
];

/**
 * B7 navigation.
 *
 * Resting state is a compact pill that floats 16px off the top edge, centered
 * and sized to its content, over a translucent blurred surface. The menu
 * toggle transforms between its two states rather than swapping icons, and the
 * mobile menu is a full height panel whose links arrive one after another,
 * 60ms apart, capped under 400ms.
 *
 * The section currently in view is marked with aria-current.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  // Track the section in view so the nav can indicate the current location.
  useEffect(() => {
    const ids = [...links.map((l) => l.id), "contact"];
    const observed = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.6] }
    );

    observed.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Lock the page behind the full height panel.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed left-0 right-0 top-4 z-50 flex justify-center px-4">
        <nav
          aria-label="Main"
          className="flex w-full max-w-prose items-center justify-between gap-6 rounded-full border border-border-subtle bg-bg/70 px-3 py-2 backdrop-blur-nav md:w-auto md:max-w-none"
        >
          <a
            href="#hero"
            className="title-3 shrink-0 px-2 text-ink-primary transition-colors duration-300 ease-base hover:text-accent"
          >
            Adarsh<span className="text-accent">.</span>
          </a>

          <ul className="hidden items-center gap-2 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={active === l.id ? "true" : undefined}
                  className={`title-4 rounded-full px-3 py-2 transition-colors duration-300 ease-base hover:text-accent ${
                    active === l.id ? "bg-bg-soft text-accent" : "text-ink-secondary"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="btn-primary button-sm hidden md:inline-flex">
            Send a message
          </a>

          {/* Animated toggle: the two rules rotate into a cross. */}
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="relative grid h-8 w-8 shrink-0 place-items-center rounded-full md:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span
              aria-hidden="true"
              className="absolute h-px w-4 bg-ink-primary transition-transform duration-500 ease-base"
              style={{ transform: open ? "rotate(45deg)" : "translateY(-4px)" }}
            />
            <span
              aria-hidden="true"
              className="absolute h-px w-4 bg-ink-primary transition-transform duration-500 ease-base"
              style={{ transform: open ? "rotate(-45deg)" : "translateY(4px)" }}
            />
          </button>
        </nav>
      </header>

      {/* Full height panel, base surface at high opacity with a strong blur. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_BASE }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-nav md:hidden"
          >
            <ul className="flex h-full flex-col justify-center gap-6 px-8">
              {[...links, { href: "#contact", label: "Contact", id: "contact" }].map(
                (l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: Math.min(i * 0.06, 0.4),
                      ease: EASE_BASE,
                    }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={active === l.id ? "true" : undefined}
                      className={`heading-5 block ${
                        active === l.id ? "text-accent" : "text-ink-primary"
                      }`}
                    >
                      {l.label}
                    </a>
                  </motion.li>
                )
              )}
              <motion.li
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.36, ease: EASE_BASE }}
              >
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="body-6 text-ink-muted"
                >
                  Read the resume
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
