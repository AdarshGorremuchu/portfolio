import type { MetadataRoute } from "next";

/**
 * The site had no robots.txt at all, so everything in /public was fair game,
 * including resume.pdf.
 *
 * The resume is handled with an X-Robots-Tag header in next.config.js rather
 * than a Disallow here, on purpose: a Disallow would stop crawlers reading
 * the noindex and the already-indexed URL would stay in results.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    host: "https://www.adarshgorremuchu.com",
  };
}
