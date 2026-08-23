"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/**
 * A soft gold radial glow that trails the cursor with a gentle spring lag.
 * Desktop + fine-pointer only; disabled for touch and reduced-motion users.
 * Purely decorative (pointer-events: none, aria-hidden).
 */
export default function CursorGlow() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 220, damping: 30, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 30, mass: 0.4 });

  useEffect(() => {
    if (reduce) return;
    // Only for devices with a fine pointer (mouse/trackpad).
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX - 200);
      y.set(e.clientY - 200);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: sx,
        y: sy,
        width: 400,
        height: 400,
        background:
          "radial-gradient(circle, rgba(201,162,74,0.10) 0%, rgba(201,162,74,0.05) 35%, transparent 70%)",
      }}
      className="pointer-events-none fixed top-0 left-0 z-[55] rounded-full"
    />
  );
}
