"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Phone, Send, CheckCircle2, MapPin } from "lucide-react";
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
      const res = await fetch("https://formspree.io/f/mwvzvlkz", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const inputCls =
    "w-full px-4 py-3 rounded-md bg-bg-elev border border-border-subtle text-ink-primary placeholder:text-ink-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all";

  return (
    <section
      id="contact"
      className="section relative bg-bg-soft/40 border-t border-border-subtle"
    >
      <span className="roman-numeral" style={{ top: "3rem", right: "1rem" }}>
        IV
      </span>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">Contact</div>
          <h2 className="section-heading">
            Let&apos;s <em>talk</em>.
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
              Open to AI/ML Engineer, Data Scientist, and ML Platform roles. Reach
              out about opportunities, collaborations, or responsible-AI work.
            </p>

            <div className="space-y-3">
              {[
                { icon: <Mail size={18} />, label: "Email", value: personal.email, href: `mailto:${personal.email}` },
                { icon: <Linkedin size={18} />, label: "LinkedIn", value: "/adarsh-gorremuchu", href: personal.linkedin },
                { icon: <Phone size={18} />, label: "Phone", value: personal.phone, href: `tel:${personal.phone.replace(/\D/g, "")}` },
                { icon: <MapPin size={18} />, label: "Location", value: personal.location, href: undefined },
              ].map((row) => {
                const Inner = (
                  <>
                    <div className="w-10 h-10 rounded-md bg-accent/10 border border-border-subtle flex items-center justify-center text-accent">
                      {row.icon}
                    </div>
                    <div>
                      <div className="text-xs text-ink-muted font-mono">{row.label}</div>
                      <div className="text-sm text-ink-primary group-hover:text-accent transition-colors">
                        {row.value}
                      </div>
                    </div>
                  </>
                );
                return row.href ? (
                  <a
                    key={row.label}
                    href={row.href}
                    target={row.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 gold-card group"
                  >
                    {Inner}
                  </a>
                ) : (
                  <div key={row.label} className="flex items-center gap-3 p-4 gold-card group">
                    {Inner}
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3 gold-card p-7"
          >
            <div className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-ink-muted uppercase tracking-wider mb-2">
                    Name
                  </label>
                  <input type="text" name="name" required className={inputCls} placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-ink-muted uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input type="email" name="email" required className={inputCls} placeholder="you@company.com" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-ink-muted uppercase tracking-wider mb-2">
                  Company / Role
                </label>
                <input type="text" name="company" className={inputCls} placeholder="Optional" />
              </div>

              <div>
                <label className="block text-xs font-mono text-ink-muted uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className={inputCls + " resize-none"}
                  placeholder="Tell me about the role or opportunity..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-gold w-full md:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  "Sending..."
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 size={16} /> Sent! I&apos;ll reply soon.
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
      </div>
    </section>
  );
}
