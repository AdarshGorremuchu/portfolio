"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Counts the leading number in a stat string up from zero when scrolled into
 * view, preserving any prefix/suffix (e.g. "70-85%" counts 70, keeps "-85%").
 * Shows the final value immediately for reduced-motion users.
 */
export default function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  const match = value.match(/\d+/);
  const target = match ? parseInt(match[0], 10) : 0;
  const idx = match?.index ?? 0;
  const prefix = match ? value.slice(0, idx) : "";
  const suffix = match ? value.slice(idx + match[0].length) : value;

  const [n, setN] = useState(target);

  useEffect(() => {
    if (reduce) {
      setN(target);
      return;
    }
    if (!inView) {
      setN(0);
      return;
    }
    let raf = 0;
    const dur = 1100;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, target]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}
