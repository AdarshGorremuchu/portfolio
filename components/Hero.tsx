"use client";

import { motion } from "framer-motion";
import { Linkedin, Github, Mail } from "lucide-react";
import { personal } from "@/lib/data";

const socials = [
  { href: personal.linkedin, icon: <Linkedin size={22} />, label: "LinkedIn" },
  { href: `mailto:${personal.email}`, icon: <Mail size={22} />, label: "Email" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-bg"
    >
      {/* ── Geometric decorations ── */}

      {/* top-left: partial circle large purple */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="geo"
        style={{
          top: "8%",
          left: "-3%",
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "#6c5ce7",
          clipPath: "polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)",
        }}
      />

      {/* top-left: diagonal bar light lavender */}
      <motion.div
        animate={{ rotate: ["-20deg", "-15deg", "-20deg"] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="geo"
        style={{
          top: "4%",
          left: "6%",
          width: 90,
          height: 22,
          borderRadius: 4,
          background: "#ebebff",
          transform: "rotate(-20deg)",
        }}
      />

      {/* top-center: circle outline lavender */}
      <div
        className="geo"
        style={{
          top: "18%",
          left: "35%",
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "3px solid #ebebff",
        }}
      />

      {/* top-right: large C-shape purple */}
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="geo"
        style={{
          top: "5%",
          right: "-2%",
          width: 200,
          height: 200,
          borderRadius: "50%",
          border: "48px solid #6c5ce7",
          clipPath: "polygon(0% 10%, 55% 10%, 55% 90%, 0% 90%)",
        }}
      />

      {/* top-right: rectangle bar lavender */}
      <motion.div
        animate={{ rotate: ["18deg", "22deg", "18deg"] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="geo"
        style={{
          top: "10%",
          right: "22%",
          width: 80,
          height: 18,
          borderRadius: 4,
          background: "#ebebff",
          transform: "rotate(18deg)",
        }}
      />

      {/* middle-left: circle outline tiny lavender */}
      <div
        className="geo"
        style={{
          top: "52%",
          left: "2%",
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "3px solid #ebebff",
        }}
      />

      {/* bottom-left: half-circle purple */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="geo"
        style={{
          bottom: "8%",
          left: "5%",
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "#6c5ce7",
          clipPath: "polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)",
        }}
      />

      {/* bottom-center: diagonal bar lavender */}
      <motion.div
        animate={{ rotate: ["-12deg", "-8deg", "-12deg"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="geo"
        style={{
          bottom: "18%",
          left: "42%",
          width: 70,
          height: 16,
          borderRadius: 4,
          background: "#ebebff",
          transform: "rotate(-12deg)",
        }}
      />

      {/* bottom-center: solid circle purple */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="geo"
        style={{
          bottom: "12%",
          left: "55%",
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "#6c5ce7",
        }}
      />

      {/* bottom-right: circle outline lavender */}
      <div
        className="geo"
        style={{
          bottom: "15%",
          right: "8%",
          width: 90,
          height: 90,
          borderRadius: "50%",
          border: "3px solid #ebebff",
        }}
      />

      {/* ── Content ── */}
      <div className="section relative z-10 w-full pt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm font-semibold text-ink-secondary mb-4"
        >
          Welcome to my world
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-[clamp(2.4rem,6vw,4.2rem)] font-bold leading-tight text-ink-primary mb-6"
        >
          I&apos;m {personal.name.split(" ")[0]},<br />
          Glad to see you!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-lg text-ink-secondary max-w-xl leading-relaxed mb-10"
        >
          {personal.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-xs font-bold tracking-widest uppercase text-accent mb-4">
            Let&apos;s Connect
          </p>
          <div className="flex items-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-11 h-11 flex items-center justify-center rounded-full border-2 border-ink-primary text-ink-primary hover:border-accent hover:text-accent hover:bg-accent/5 transition-all"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
