import V1Frame from "@/components/V1Frame";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProofStrip from "@/components/ProofStrip";
import About from "@/components/About";
import ProblemSolution from "@/components/ProblemSolution";
import Benefits from "@/components/Benefits";
import Tagline from "@/components/Tagline";
import HowItWorks from "@/components/HowItWorks";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { faqs, personal } from "@/lib/data";

/** A7: the FAQ in machine readable form, so answer engines can quote it. */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  jobTitle: personal.title,
  email: `mailto:${personal.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tysons",
    addressRegion: "VA",
    addressCountry: "US",
  },
  sameAs: [personal.linkedin, personal.github],
  alumniOf: { "@type": "CollegeOrUniversity", name: "George Mason University" },
  worksFor: { "@type": "Organization", name: "Ampcus Inc" },
};

export default function Home() {
  return (
    <V1Frame>
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />

      <main id="main" tabIndex={-1} className="relative outline-none">
        <Hero />
        <ProofStrip />
        <About />
        <ProblemSolution />
        <Benefits />
        <Tagline />
        <HowItWorks />
        <Experience />
        <Projects />
        <Skills />
        <FAQ />
        <Contact />
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
    </V1Frame>
  );
}
