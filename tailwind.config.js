
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {

      },
      keyframes: {
        movetop: {
          "0%": { transform:"translatey(0)" },
          "50%": { transform:"translatey(20px)" },
          "100%": { transform:"translatey(0)" },
        },
      },
      animation:{
        movetop:"movetop 3s ease-in-out infinite"
      },
      screens: {
        'sm': '540px',
        'md': '720px',
        'lg': '960px',
        'xl': '1140px',
        '2xl': '1320px'
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

