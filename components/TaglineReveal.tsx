"use client";

import { useEffect, useRef, useState } from "react";

/**
 * B11 tagline reveal, mandatory on every landing page.
 *
 * Each word starts at 30% of the base text color and turns full white as it
 * crosses a trigger line, one word at a time in reading order. Words on the
 * same visual line do not flip together: their horizontal position shifts the
 * line they have to cross, so activation runs left to right as well as top to
 * bottom.
 *
 * Driven by a single scroll listener throttled through requestAnimationFrame,
 * which B7 and B11 both permit. Under prefers-reduced-motion the finished text
 * renders at full color immediately with no word by word animation.
 */
export default function TaglineReveal({
  text,
  mutedColor = "rgba(255,255,255,0.30)",
  litColor = "#FFFFFF",
  className = "heading-3 md:heading-2 max-w-prose",
}: {
  text: string;
  /** Roughly 30% of the theme's base text colour, per B11. */
  mutedColor?: string;
  litColor?: string;
  className?: string;
}) {
  const words = text.split(" ");
  const ref = useRef<HTMLParagraphElement>(null);
  const [lit, setLit] = useState<boolean[]>(() => words.map(() => false));
  const [animated, setAnimated] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimated(false);
      setLit(words.map(() => true));
      return;
    }

    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let queued = false;

    const measure = () => {
      queued = false;
      const nodes = Array.from(
        el.querySelectorAll<HTMLElement>("[data-word]")
      );
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const triggerLine = vh * 0.58;

      setLit((prev) => {
        let changed = false;
        const next = prev.slice();
        nodes.forEach((node, i) => {
          if (next[i]) return;
          const r = node.getBoundingClientRect();
          // Pushing the threshold down by the word's horizontal offset is what
          // staggers words that share a line.
          const crossing = r.top + r.height * 0.5 + (r.left / vw) * r.height;
          if (crossing < triggerLine) {
            next[i] = true;
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // words.length is stable for a given text prop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <p ref={ref} className={className} style={{ color: mutedColor }}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          data-word
          className="inline-block"
          style={{
            color: lit[i] ? litColor : "inherit",
            transition: animated
              ? "color 500ms cubic-bezier(0.22,1,0.36,1)"
              : "none",
          }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
