"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Phone, Send, CheckCircle2 } from "lucide-react";
import { personal } from "@/lib/data";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // Replace YOUR_FORM_ID below after creating a free form at https://formspree.io
      const res = await fetch("https://formspree.io/f/mwvzvlkz", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="section relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="section-label">05 / Contact</div>
        <h2 className="section-heading">
          Let's <span className="italic gradient-text">talk</span>.
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-5 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-2"
        >
          <p className="text-lg text-ink-secondary leading-relaxed mb-8">
            Open to AI/ML Engineer, ML Platform, and AI Engineering roles. Reach
            out about opportunities, collaborations, or just to say hi.
          </p>

          <div className="space-y-3">
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-3 p-4 rounded-lg bg-bg-card border border-border-subtle hover:border-accent/40 transition-all group"
            >
              <div className="w-10 h-10 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center text-accent-glow">
                <Mail size={18} />
              </div>
              <div>
                <div className="text-xs text-ink-muted font-mono">Email</div>
                <div className="text-sm text-ink-primary group-hover:text-accent-glow transition-colors">
                  {personal.email}
                </div>
              </div>
            </a>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-lg bg-bg-card border border-border-subtle hover:border-accent/40 transition-all group"
            >
              <div className="w-10 h-10 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center text-accent-glow">
                <Linkedin size={18} />
              </div>
              <div>
                <div className="text-xs text-ink-muted font-mono">LinkedIn</div>
                <div className="text-sm text-ink-primary group-hover:text-accent-glow transition-colors">
                  /adarsh-gorremuchu
                </div>
              </div>
            </a>

            <a
              href={`tel:${personal.phone.replace(/\D/g, "")}`}
              className="flex items-center gap-3 p-4 rounded-lg bg-bg-card border border-border-subtle hover:border-accent/40 transition-all group"
            >
              <div className="w-10 h-10 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center text-accent-glow">
                <Phone size={18} />
              </div>
              <div>
                <div className="text-xs text-ink-muted font-mono">Phone</div>
                <div className="text-sm text-ink-primary group-hover:text-accent-glow transition-colors">
                  {personal.phone}
                </div>
              </div>
            </a>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-3 rounded-xl bg-bg-card border border-border-subtle p-7"
        >
          <div className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-ink-muted uppercase tracking-wider mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-md bg-bg-elev border border-border-subtle text-ink-primary placeholder:text-ink-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-ink-muted uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-md bg-bg-elev border border-border-subtle text-ink-primary placeholder:text-ink-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-ink-muted uppercase tracking-wider mb-2">
                Company / Role
              </label>
              <input
                type="text"
                name="company"
                className="w-full px-4 py-3 rounded-md bg-bg-elev border border-border-subtle text-ink-primary placeholder:text-ink-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all"
                placeholder="Optional"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-ink-muted uppercase tracking-wider mb-2">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-md bg-bg-elev border border-border-subtle text-ink-primary placeholder:text-ink-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                placeholder="Tell me about the role or opportunity..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white rounded-md font-medium hover:bg-accent-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? (
                "Sending..."
              ) : status === "success" ? (
                <>
                  <CheckCircle2 size={16} /> Sent! I'll reply soon.
                </>
              ) : (
                <>
                  Send message <Send size={16} />
                </>
              )}
            </button>

            {status === "error" && (
              <p className="text-sm text-red-400">
                Something went wrong. Email me directly at {personal.email}.
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
