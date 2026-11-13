/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f6f6f2",
        ink: "#0b0b0d",
        cobalt: "#1a2bff",
        mute: "#5a5a63",
        haze: "#a9a9b4",
      },
      fontFamily: {
        sans: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { page: "1360px" },
    },
  },
  plugins: [],
};
