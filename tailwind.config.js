/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#060a14", // deep navy-black
          soft: "#0a1020",
          card: "#0f1730",
          elev: "#141f3d",
        },
        accent: {
          DEFAULT: "#c9a24a", // gold
          glow: "#e6c877", // light champagne gold
          deep: "#9c7a2c", // antique gold
          blue: "#3d5a99", // muted royal blue pop
        },
        ink: {
          primary: "#f5f2e8", // warm ivory
          secondary: "#a8b2c8", // cool blue-gray
          muted: "#67728c", // muted slate
        },
        border: {
          subtle: "rgba(201,162,74,0.12)",
          strong: "rgba(201,162,74,0.28)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "fade-in": "fadeIn 1s ease-out forwards",
        "glow-pulse": "glowPulse 4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};
