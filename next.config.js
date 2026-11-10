/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async headers() {
    return [
      {
        /*
         * The resume stays reachable and shareable, but asks search engines
         * not to index it. It carries a phone number and a personal email,
         * and an indexed PDF is how those get harvested.
         *
         * Note this is deliberately NOT a robots.txt Disallow: blocking the
         * crawl would stop Googlebot from ever reading this header, so a URL
         * already in the index would linger there. Allow the crawl, serve
         * noindex, and it gets dropped.
         */
        source: "/resume.pdf",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, noarchive, nosnippet" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
