"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gold progress bar pinned to the top of the viewport that fills as the
 * page scrolls. Reflects scroll position (not autonomous motion), so it stays
 * on even under prefers-reduced-motion.
 */
export default function ScrollProgress() {
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
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-accent-deep via-accent to-accent-glow"
    />
  );
}
