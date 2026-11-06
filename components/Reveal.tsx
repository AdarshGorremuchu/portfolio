"use client";

import { motion, useReducedMotion } from "framer-motion";

/** B7 base curve. */
export const EASE_BASE = [0.22, 1, 0.36, 1] as const;

/**
 * B7 scroll reveal: rises 32px (Spacing-400) and fades 0 to 1 over 700ms on
 * the base curve, once only. Framer's whileInView is backed by
 * IntersectionObserver, so nothing is attached to a scroll event.
 *
 * Under prefers-reduced-motion the movement drops and only opacity changes.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: EASE_BASE }}
    >
      {children}
    </motion.div>
  );
}
