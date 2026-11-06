import V1Frame from "@/components/V1Frame";
import type { Metadata } from "next";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { personal } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy | Adarsh Gorremuchu",
  description:
    "What this site collects, where a contact form submission goes, and how long it is kept.",
};

const sections = [
  {
    heading: "What this site collects",
    body: "Nothing, until you submit the contact form. There are no analytics scripts, no advertising pixels, and no tracking cookies on this site. Nothing you do while reading it is recorded.",
  },
  {
    heading: "The contact form",
    body: "The form collects your name, your email address, an optional company or role, and your message. It is delivered by Formspree, a third party form service, which processes the submission and forwards it to a private inbox. Formspree handles the data under its own privacy policy at formspree.io/legal/privacy-policy.",
  },
  {
    heading: "Why that data is used",
    body: "Only to reply to you about the role or question you wrote in. Your details are never sold, published, or added to a mailing list.",
  },
  {
    heading: "Hosting",
    body: "The site is hosted on Vercel. Like any web host, Vercel receives standard request information such as your IP address in order to serve the page, under its own privacy policy.",
  },
  {
    heading: "Your choices",
    body: "You can ask for a copy of what you sent, or ask for it to be deleted, by emailing the address below. There is nothing to opt out of otherwise, because nothing is tracked.",
  },
];

export default function Privacy() {
  return (
    <V1Frame>
    <main className="section">
      <div className="shell max-w-prose">
        <a
          href="/"
          className="caption-4 mb-12 inline-flex items-center gap-2 text-ink-muted transition-colors duration-300 ease-base hover:text-accent"
        >
          <ArrowLeftIcon size={14} aria-hidden="true" />
          Back to the portfolio
        </a>

        <h1 className="heading-4 md:heading-3 mb-6 text-ink-primary">Privacy</h1>
        <p className="body-7 mb-12 text-ink-secondary">
          This is a personal portfolio. It is deliberately simple about data: it
          collects nothing unless you write to me.
        </p>

        <div className="flex flex-col gap-10">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="heading-6 mb-3 text-ink-primary">{s.heading}</h2>
              <p className="body-6 text-ink-secondary">{s.body}</p>
            </section>
          ))}

          <section>
            <h2 className="heading-6 mb-3 text-ink-primary">Contact</h2>
            <p className="body-6 text-ink-secondary">
              Questions about any of this go to{" "}
              <a
                href={`mailto:${personal.email}`}
                className="text-accent underline underline-offset-4"
              >
                {personal.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
    </V1Frame>
  );
}
