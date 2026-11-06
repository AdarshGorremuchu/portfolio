import V1Frame from "@/components/V1Frame";
import type { Metadata } from "next";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Page not found | Adarsh Gorremuchu",
  description: "That page does not exist on this site.",
  robots: { index: false, follow: true },
};

/** B10: a custom, branded 404 with a way back. */
export default function NotFound() {
  return (
    <V1Frame>
    <main className="flex min-h-screen items-center">
      <div className="shell">
        <p className="label mb-6">Error 404</p>
        <h1 className="heading-4 md:heading-2 mb-6 max-w-prose text-ink-primary">
          That page does not exist.
        </h1>
        <p className="body-7 mb-10 max-w-prose text-ink-secondary">
          The link may be out of date, or the address may have a typo in it.
          Everything on this site lives on one page, so the way back is short.
        </p>
        <a href="/" className="btn-primary">
          <ArrowLeftIcon size={16} aria-hidden="true" />
          Back to the start
        </a>
      </div>
    </main>
    </V1Frame>
  );
}
