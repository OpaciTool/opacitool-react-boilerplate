/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        square: "1 / 1",
      },
      animation: {
        "slide-in": "slide-in 0.3s ease-in-out",
        "slide-out": "slide-out 0.3s ease-in-out",
      },
      colors: {
        "brand-orange": {
          500: "#f36242",
          600: "#db583b",
          700: "#c24e35",
          800: "#aa452e",
          900: "#923b28",
        },
        "brand-blue": {
          50: "##edf9fa",
          100: "#daf4f5",
          200: "#c8eef0",
          300: "#b6e9eb",
          400: "#a4e3e7",
          500: "#48c7ce",
          600: "#41b3b9",
          700: "#3a9fa5",
          800: "#328b90",
          900: "#2b777c",
        },
        teal: {
          400: '#3BCDD3'
        },
      },
      screens: {
        'xs': '375px',
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
  safelist: [
    "text-2xl",
    "text-zinc-400",
    {
      pattern: /^bg-opacity-/,
    },
  ],
  darkMode: "class",
};
