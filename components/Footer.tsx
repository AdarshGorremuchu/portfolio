import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { personal } from "@/lib/data";

export default function Footer() {
  const socials = [
    { href: `mailto:${personal.email}`, label: "Email", Icon: EnvelopeSimpleIcon },
    { href: personal.linkedin, label: "LinkedIn", Icon: LinkedinLogoIcon },
    { href: personal.github, label: "GitHub", Icon: GithubLogoIcon },
  ];

  return (
    <footer className="border-t border-border-subtle bg-bg py-12">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="title-3 text-ink-primary">
              Adarsh<span className="text-accent">.</span>
            </p>
            <p className="caption-5 mt-2 text-ink-muted">
              {personal.title} in {personal.location}
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-6">
            <a
              href="/privacy"
              className="caption-4 text-ink-muted transition-colors duration-300 ease-base hover:text-accent"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="caption-4 text-ink-muted transition-colors duration-300 ease-base hover:text-accent"
            >
              Terms
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="caption-4 text-ink-muted transition-colors duration-300 ease-base hover:text-accent"
            >
              Resume
            </a>
            <a
              href="#hero"
              className="caption-4 text-ink-muted transition-colors duration-300 ease-base hover:text-accent"
            >
              Back to top
            </a>
          </nav>

          <ul className="flex items-center gap-3">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border-subtle text-ink-muted transition-colors duration-300 ease-base hover:border-border-strong hover:text-accent"
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="caption-5 mt-12 text-ink-muted">
          © {new Date().getFullYear()} {personal.name}. Built with Next.js and
          hosted on Vercel.
        </p>
      </div>
    </footer>
  );
}
