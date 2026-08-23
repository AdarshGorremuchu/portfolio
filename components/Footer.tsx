import { personal } from "@/lib/data";
import { Mail, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-bg border-t border-border-subtle py-8 px-6">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-ink-muted">
          © {new Date().getFullYear()} {personal.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${personal.email}`}
            className="text-ink-muted hover:text-accent transition-colors"
            aria-label="Email"
          >
            <Mail size={18} aria-hidden="true" />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-muted hover:text-accent transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} aria-hidden="true" />
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-muted hover:text-accent transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
