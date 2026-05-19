import { personal } from "@/lib/data";
import { Mail, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle py-10 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-ink-muted font-mono">
          © {new Date().getFullYear()} {personal.name}. Built with Next.js.
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${personal.email}`}
            className="text-ink-muted hover:text-accent-glow transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-muted hover:text-accent-glow transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
