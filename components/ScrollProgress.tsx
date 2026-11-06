"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Hairline progress bar that fills as the page scrolls. Flat accent fill, no
 * gradient (B4), and it scales on the x axis only, so nothing but a transform
 * animates (B7). It reflects scroll position rather than running on its own,
 * which is why it stays on under prefers-reduced-motion.
 */
export default function ScrollProgress({
  /** Fill colour, so each version can pass its own flat accent. */
  colorClass = "bg-accent",
}: {
  colorClass?: string;
} = {}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className={`fixed left-0 right-0 top-0 z-[60] h-px origin-left ${colorClass}`}
    />
  );
}
