const { nextui } = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textStroke: {
        black: "1px black",
      },
      colors: {
        primary: "#4f5de3",
        secondary: "#4654e0",
        terciary: "#e9ecfc",
        question: "#aab3e3",
        clear: "#8692cf",
      },
      backgroundColor: {
        primary: "#8692cf",
        secondary: "#282A36",
        button: "#4f5de3",
      },
      borderColor: {
        primary: "#4f5de3",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
    function ({ addUtilities }) {
      addUtilities({
        ".text-stroke-black": {
          "-webkit-text-stroke": "1px black",
        },
      });
    },
  ],
};
