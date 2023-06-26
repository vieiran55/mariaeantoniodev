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
        metallicSeaweed: "#088395",
        verdeLoud: "#70FF00",
        gold: "#DAA520",
        rubi: "#CE633E"
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
        fadeInDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeInDownFull: {
          "0%": {
            opacity: "0.5",
            transform: "translateY(0)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeInLeft: {
          "0%": {
            opacity: "0",
            transform: "translateX(-10px)", /* Modificado: translateX em vez de translateY */
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)", /* Modificado: translateX em vez de translateY */
          },
        },
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)", /* Modificado: translateY em vez de translateX */
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)", /* Modificado: translateY em vez de translateX */
          },
        },
        flip: {
          "0%": {
            transform: "perspective(400px) rotateY(0)"
          },
          "100%": {
            transform: "perspective(400px) rotateY(360deg)"
          }
        },
        flipSlow: {
          "0%, 100%": { transform: "rotateY(180deg)" },
          "100%": { transform: "rotateY(0)" },
        },
      },
      animation: {
        wavingHand: "wave 10s linear infinite",
        loopClock: "clock 10s linear infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        balanco: "wiggle 200ms ease-in-out",
        fadeinDown: "fadeInDown 1s ease-in-out",
        fadeInDownFull: "fadeInDownFull 1s ease-in-out",
        fadeinDownSlow: "fadeInDown 3s ease-in-out",
        fadeInLeft: "fadeInLeft 1s ease-in-out",
        fadeInUp: "fadeInUp 1s ease-in-out",
        spinSlow: "spin 3s linear infinite",
        pulseSlow: "pulse 1s ease-in",
        bounceSlow: "bounce 0.5s ease-out",
        pingStop: "ping 1s",
        flip: "flip 1s ease-in-out infinite",
        flipSlow: "flipSlow 2s",
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")],
};