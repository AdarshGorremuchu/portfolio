"use client";

import { useEffect, useRef, useState } from "react";

/** Matches a value holding exactly one number, such as "40%" or "4+". */
const SINGLE_NUMBER = /^(\D*)(\d+(?:\.\d+)?)(\D*)$/;

/**
 * Counts a stat up from zero when it scrolls into view.
 *
 * Values holding more than one number, such as "70 to 85%", render as written:
 * animating them would read as "0 to 85%" for a second, which is worse than
 * not animating at all. Reduced motion shows the final value immediately.
 *
 * Deliberately written against IntersectionObserver and matchMedia rather than
 * Framer Motion, so version 2 can use it without pulling an animation library
 * onto that route.
 */
export default function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const parts = value.match(SINGLE_NUMBER);
  const target = parts ? parseFloat(parts[2]) : 0;
  const decimals = parts && parts[2].includes(".") ? 1 : 0;

  // Start at the final value so the number is correct before hydration and
  // for anyone whose observer never fires.
  const [n, setN] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el || !parts) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") return;

    let raf = 0;
    setN(0);

    const run = () => {
      const dur = 1100;
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(parseFloat((target * eased).toFixed(decimals)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
    // `parts` is derived from `value`, so value is the real dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, target, decimals]);

  if (!parts) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {parts[1]}
      {n.toFixed(decimals)}
      {parts[3]}
    </span>
  );
}
