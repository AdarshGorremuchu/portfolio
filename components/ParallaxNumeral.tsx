"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * The giant translucent roman numeral, drifting vertically as its section
 * scrolls through the viewport (parallax). Static for reduced-motion users.
 */
export default function ParallaxNumeral({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [90, -90]);

  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      className="roman-numeral"
      style={{ ...style, y }}
    >
      {children}
    </motion.span>
  );
}
