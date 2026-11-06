"use client";

import { personal } from "@/lib/data";
import TaglineReveal from "@/components/TaglineReveal";

/**
 * B11 tagline reveal section. Its own moment in the mid page argument, placed
 * after the benefits rather than stacked under the hero.
 */
export default function Tagline() {
  return (
    <section
      id="tagline"
      className="border-t border-border-subtle bg-bg py-24"
    >
      <div className="shell">
        <TaglineReveal text={personal.tagline} />
      </div>
    </section>
  );
}
