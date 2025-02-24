/** @type {import('tailwindcss').Config} */
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
      transformStyle: {
        '3d': 'preserve-3d',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      },
      rotate: {
        'y-180': 'rotateY(180deg)',
      },
      perspective: {
        '1000': '1000px',
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
    "bg-orange-500",
    "bg-[#E4EAED]",
    "bg-[#EEEEEE]",
    "bg-white",
    "bg-black",
    "w-[80%]",
    "lg:w-[60%]",
    "xl:w-3/4",
    "mx-auto",
    {
      pattern: /^bg-opacity-/,
    },
    {
      pattern: /^w-/,
    }
  ],
  darkMode: "class",
};
