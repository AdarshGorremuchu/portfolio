import { Poppins } from "next/font/google";

/**
 * Wrapper for every version 1 route (the portfolio itself plus the legal
 * pages and the 404).
 *
 * The font is imported here rather than in the root layout on purpose: Next
 * only ships a font to the routes whose module graph imports it, so /v2 never
 * downloads Poppins and version 1 never downloads Geist. The variable lands on
 * this div instead of <html>, and `.v1` in globals.css resolves it.
 *
 * Weights stop at semibold, since B1 bans ultra bold, and no italic face is
 * loaded at all.
 */
const poppins = Poppins({
  weight: ["400", "500", "600"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function V1Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${poppins.variable} v1`}>
      <div className="grain" aria-hidden="true" />
      {children}
    </div>
  );
}
