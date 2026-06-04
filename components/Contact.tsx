"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { personal } from "@/lib/data";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/mwvzvlkz", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) { setStatus("success"); form.reset(); }
      else setStatus("error");
    } catch { setStatus("error"); }
  }

  const inputCls =
    "w-full px-4 py-3 rounded-md bg-white/15 border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:border-white/70 focus:bg-white/20 transition-all text-sm";

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{ background: "#6c5ce7" }}
    >
      {/* Background geometric circles */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "10%", right: "-4%",
          width: 220, height: 220,
          borderRadius: "50%",
          border: "50px solid rgba(255,255,255,0.12)",
          clipPath: "polygon(0% 10%, 55% 10%, 55% 90%, 0% 90%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "5%", left: "-3%",
          width: 160, height: 160,
          borderRadius: "50%",
          border: "36px solid rgba(255,255,255,0.08)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "20%", right: "8%",
          width: 80, height: 80,
          borderRadius: "50%",
          border: "20px solid rgba(255,255,255,0.1)",
        }}
      />

      <div className="section relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">
            Get in touch
          </p>
          <h2 className="text-white font-bold text-[clamp(1.75rem,4vw,2.75rem)] leading-tight">
            Contact me
          </h2>
          <p className="text-white/75 mt-3 max-w-md mx-auto text-sm leading-relaxed">
            If you have an application you are interested in developing, a feature
            that you need coded, I&apos;d love to help with it.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-lg mx-auto space-y-4"
        >
          <input
            type="text"
            name="name"
            required
            className={inputCls}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            required
            className={inputCls}
            placeholder="E-mail"
          />
          <textarea
            name="message"
            required
            rows={5}
            className={inputCls + " resize-none"}
            placeholder="Write your message here..."
          />

          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "sending" ? (
                "Sending…"
              ) : status === "success" ? (
                <><CheckCircle2 size={16} /> Sent!</>
              ) : (
                <>Get In Touch <Send size={15} /></>
              )}
            </button>
          </div>

          {status === "error" && (
            <p className="text-white/80 text-sm text-center">
              Something went wrong. Email me at{" "}
              <a href={`mailto:${personal.email}`} className="underline">
                {personal.email}
              </a>
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
