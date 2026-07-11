import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ParticleField from "@/components/ParticleField";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adarsh Gorremuchu | AI/ML Engineer & Data Scientist",
  description:
    "AI/ML Engineer specializing in LLMs, RAG systems, autonomous agents, and cloud-native ML infrastructure. Currently building production AI systems at Ampcus Inc.",
  keywords: [
    "Adarsh Gorremuchu",
    "AI Engineer",
    "ML Engineer",
    "LLM Engineer",
    "RAG",
    "AI Agents",
    "Azure AI",
    "AWS",
    "Data Engineer",
    "Python",
    "LangChain",
    "Semantic Kernel",
  ],
  authors: [{ name: "Adarsh Gorremuchu" }],
  creator: "Adarsh Gorremuchu",
  openGraph: {
    title: "Adarsh Gorremuchu | AI/ML Engineer & Data Scientist",
    description:
      "AI/ML Engineer building production LLM systems, autonomous agents, and cloud-native ML infrastructure.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adarsh Gorremuchu | AI/ML Engineer & Data Scientist",
    description:
      "AI/ML Engineer building production LLM systems and autonomous agents.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <ParticleField />
        <div className="noise" />
        {children}
      </body>
    </html>
  );
}
