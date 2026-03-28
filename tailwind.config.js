/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#3D3D3D",
        canvas: "#F3F3F5",
        surface: "#FFFFFF",
        muted: "#6B7280",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          '"Didact Gothic"',
          '"Century Gothic"',
          "CenturyGothic",
          "AppleGothic",
          "URW Gothic",
          "Geneva",
          "Tahoma",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)",
        card: "0 1px 2px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.06)",
        nav: "0 1px 0 rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
