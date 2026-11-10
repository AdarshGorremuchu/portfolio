import type { Metadata } from "next";
import "./globals.css";

/**
 * Fonts are deliberately NOT loaded here. Each version imports its own in its
 * frame (components/V1Frame.tsx, app/v2/layout.tsx), so a route only ever
 * downloads the one typeface it uses.
 */

const title = "Adarsh Gorremuchu | AI/ML Engineer and Data Scientist";
const description =
  "AI/ML engineer and data scientist in Tysons, Virginia. Agent workflows and retrieval systems in production, backed by statistical modeling, fairness testing, and governance. Open to remote, hybrid, and onsite roles.";

export const metadata: Metadata = {
  /*
   * The canonical origin, hardcoded on purpose. VERCEL_URL resolves to the
   * per-deployment preview host (portfolio-<hash>.vercel.app), which made
   * og:image point at a URL that serves HTML rather than the image and that
   * changes on every deploy, so link previews broke.
   */
  metadataBase: new URL("https://www.adarshgorremuchu.com"),
  title,
  description,
  keywords: [
    "Adarsh Gorremuchu",
    "AI Engineer",
    "Data Scientist",
    "ML Engineer",
    "Statistical Modeling",
    "Disparate Impact Analysis",
    "LLM Engineer",
    "RAG",
    "AI Agents",
    "Responsible AI",
    "Azure AI",
    "AWS",
    "Data Engineer",
    "Python",
    "LangGraph",
  ],
  authors: [{ name: "Adarsh Gorremuchu" }],
  creator: "Adarsh Gorremuchu",
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Adarsh Gorremuchu, AI/ML engineer. AI that earns its place.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
