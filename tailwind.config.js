/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fefdf8",
          100: "#fef9e7",
          200: "#fef2c4",
          300: "#fde68a",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        coffee: {
          50: "#fdf8f3",
          100: "#faeee1",
          200: "#f3dcc2",
          300: "#eac298",
          400: "#dfa16c",
          500: "#d4844a",
          600: "#c6703f",
          700: "#a45936",
          800: "#834732",
          900: "#6a3a2b",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
