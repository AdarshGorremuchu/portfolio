import V1Frame from "@/components/V1Frame";
import type { Metadata } from "next";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { personal } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms | Adarsh Gorremuchu",
  description: "Terms of use for this personal portfolio site.",
};

const sections = [
  {
    heading: "What this site is",
    body: "A personal portfolio describing Adarsh Gorremuchu's work history, projects, and skills. It is informational. Nothing here is an offer of employment, a quote for services, or a contract.",
  },
  {
    heading: "Accuracy",
    body: "Every metric and date on this page comes from the resume linked in the navigation, and figures describe outcomes on projects delivered with teams and employers. Work described for an employer or client remains their property and is summarized at a level that discloses nothing confidential.",
  },
  {
    heading: "Content and reuse",
    body: "The writing, layout, and code of this site belong to Adarsh Gorremuchu. You are welcome to quote or share a link to it. Republishing it as your own, in whole or in substantial part, is not permitted. Third party names and trademarks belong to their owners and appear here descriptively.",
  },
  {
    heading: "Using the contact form",
    body: "Send genuine enquiries. Do not use the form for bulk messaging, advertising, or anything unlawful. A submission does not create any obligation on either side.",
  },
  {
    heading: "Third party links",
    body: "Links lead to sites such as LinkedIn and GitHub that are run by other people. Their content and their terms are their own responsibility.",
  },
  {
    heading: "Changes",
    body: "These terms may be updated as the site changes. The version on this page is the one that applies.",
  },
];

export default function Terms() {
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

        <h1 className="heading-4 md:heading-3 mb-6 text-ink-primary">Terms</h1>
        <p className="body-7 mb-12 text-ink-secondary">
          The short version: read it, link to it, write to me. Do not copy it
          wholesale.
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
              Anything unclear goes to{" "}
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
