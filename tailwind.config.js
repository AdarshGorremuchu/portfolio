const plugin = require("tailwindcss/plugin");

/**
 * B1 named text styles.
 *
 * Every style is built from a step of Tailwind's default type scale, so no
 * off-scale font size can enter the project. Registered through the plugin
 * API (not @layer components) so responsive variants like `md:heading-1`
 * generate correctly.
 *
 * Headings carry `text-wrap: balance` and body copy `text-wrap: pretty`,
 * which is how the "no orphaned words" rule is enforced globally.
 */
const HEADING = { fontWeight: "600", textWrap: "balance" };
const BODY = { textWrap: "pretty" };

const TEXT_STYLES = {
  // Heading — page and section headings. Heading 1 is the hero.
  ".heading-1": { fontSize: "3.75rem", lineHeight: "1", letterSpacing: "-0.025em", ...HEADING },
  ".heading-2": { fontSize: "3rem", lineHeight: "1", letterSpacing: "-0.02em", ...HEADING },
  ".heading-3": { fontSize: "2.25rem", lineHeight: "2.5rem", letterSpacing: "-0.015em", ...HEADING },
  ".heading-4": { fontSize: "1.875rem", lineHeight: "2.25rem", letterSpacing: "-0.01em", ...HEADING },
  ".heading-5": { fontSize: "1.5rem", lineHeight: "2rem", letterSpacing: "-0.01em", ...HEADING },
  ".heading-6": { fontSize: "1.25rem", lineHeight: "1.75rem", ...HEADING },

  // Title — card titles, list item titles, labels leading a block, nav items.
  ".title-1": { fontSize: "1.25rem", lineHeight: "1.75rem", fontWeight: "500" },
  ".title-2": { fontSize: "1.125rem", lineHeight: "1.75rem", fontWeight: "500" },
  ".title-3": { fontSize: "1rem", lineHeight: "1.5rem", fontWeight: "500" },
  ".title-4": { fontSize: "0.875rem", lineHeight: "1.25rem", fontWeight: "500" },
  ".title-5": { fontSize: "0.75rem", lineHeight: "1rem", fontWeight: "500" },

  // Body — running text. 1 is the strongest weight at each size.
  ".body-1": { fontSize: "1rem", lineHeight: "1.5rem", fontWeight: "600", ...BODY },
  ".body-2": { fontSize: "1rem", lineHeight: "1.5rem", fontWeight: "500", ...BODY },
  ".body-3": { fontSize: "1rem", lineHeight: "1.5rem", fontWeight: "400", ...BODY },
  ".body-4": { fontSize: "0.875rem", lineHeight: "1.25rem", fontWeight: "600", ...BODY },
  ".body-5": { fontSize: "0.875rem", lineHeight: "1.25rem", fontWeight: "500", ...BODY },
  ".body-6": { fontSize: "0.875rem", lineHeight: "1.25rem", fontWeight: "400", ...BODY },
  // Body 7 extends the group onto the text-lg step for lead paragraphs,
  // per B1's rule for adding a style ("add the next number in its group").
  ".body-7": { fontSize: "1.125rem", lineHeight: "1.75rem", fontWeight: "400", ...BODY },

  // Button — text inside buttons only.
  ".button-lg": { fontSize: "1.125rem", lineHeight: "1.75rem", fontWeight: "600" },
  ".button-md": { fontSize: "1rem", lineHeight: "1.5rem", fontWeight: "600" },
  ".button-sm": { fontSize: "0.875rem", lineHeight: "1.25rem", fontWeight: "600" },
  ".button-xsm": { fontSize: "0.75rem", lineHeight: "1rem", fontWeight: "600" },

  // Caption — metadata, helper text, badges, fine print.
  ".caption-1": { fontSize: "0.875rem", lineHeight: "1.25rem", fontWeight: "500" },
  ".caption-2": { fontSize: "0.875rem", lineHeight: "1.25rem", fontWeight: "400" },
  ".caption-3": { fontSize: "0.75rem", lineHeight: "1rem", fontWeight: "600" },
  ".caption-4": { fontSize: "0.75rem", lineHeight: "1rem", fontWeight: "500" },
  ".caption-5": { fontSize: "0.75rem", lineHeight: "1rem", fontWeight: "400" },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    /**
     * B2 spacing scale, replacing Tailwind's default outright so no value
     * between or outside the token set can be used. Keys keep Tailwind's
     * familiar numbering, which happens to map 1:1 onto the B2 tokens.
     * `px` is kept as a hairline primitive for rules and dividers, not as a
     * spacing value.
     */
    spacing: {
      px: "1px",
      0: "0px", // Spacing-0
      0.5: "2px", // Spacing-25
      1: "4px", // Spacing-50
      2: "8px", // Spacing-75
      3: "12px", // Spacing-100
      4: "16px", // Spacing-200
      6: "24px", // Spacing-300
      8: "32px", // Spacing-400
      10: "40px", // Spacing-500
      12: "48px", // Spacing-600
      16: "64px", // Spacing-700
      20: "80px", // Spacing-800
      24: "96px", // Spacing-900
    },
    extend: {
      colors: {
        /**
         * B4 dark mode backgrounds. #131209 is the one warm tone on the
         * approved list, which is what lets the gold accent still read as
         * deliberate rather than arbitrary.
         */
        bg: {
          DEFAULT: "#131209",
          soft: "#1F1F1F",
          card: "#272727",
          elev: "#313131",
        },
        accent: {
          DEFAULT: "#c9a24a",
          glow: "#e6c877",
          deep: "#9c7a2c",
        },
        ink: {
          primary: "#FFFFFF",
          error: "#f08a7c", // 6.1:1 on bg.card, distinct from the gold accent
          secondary: "#B9B9B9", // 9.5:1 on bg
          muted: "#9B9B9B", // 6.8:1 on bg
        },
        border: {
          subtle: "rgba(255,255,255,0.10)",
          strong: "rgba(201,162,74,0.32)",
        },
      },
      fontFamily: {
        // One typeface per site (B1). Poppins only, no pairing.
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        // B5: hero heading and subheading are capped at 680px.
        prose: "680px",
        shell: "1160px",
      },
      transitionTimingFunction: {
        // B7 base curve. Weighted, decelerates into place.
        base: "cubic-bezier(0.22,1,0.36,1)",
      },
      backdropBlur: {
        nav: "16px",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities(TEXT_STYLES);
    }),
  ],
};
