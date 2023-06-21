/* eslint-disable indent */
/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mega: " #6BEFA3",
        quina: "#8666EF",
        lotofacil: "#DD7AC6",
        timemania: " #5AAD7D",
        lotomania: "#FFAB64",
        diadesorte: "#BFAF83",
        claro: "#C5DFFF",
        escuro: "#061E3C",
        hover: "#1057B0",
        azulMarinho: "#3772FF",
        ateneoBlue: "#0A4D68",
        metallicSeaweed: "#088395"
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        vast: ["Vast Shadow", "cursive"],
      },
      dropShadow: {
        "3xl": "0px 0px 37px 10px rgba(0,0,0,0.64)",
        "4xl": [
          "0 35px 35px rgba(0, 0, 0, 0.25)",
          "0 45px 65px rgba(0, 0, 0, 0.15)",
        ],
      },
      keyframes: {
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },
        fadeOut: {
          "0%": { backgroundColor: "colors.red.300" },
          "100%": { backgroundColor: "colors.transparent" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        clock: {
          "0%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "waving-hand": "wave 10s linear infinite",
        "loop-clock": "clock 10s linear infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        balanco: "wiggle 200ms ease-in-out",
        fadeinDown: "fade-in-down 0.5s ease-out",
      },
    },
  },
  plugins: [
    require("tw-elements/dist/plugin")
  ],
};
