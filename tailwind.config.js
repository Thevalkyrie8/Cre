/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /(from|to)-(blue|cyan|pink|rose|purple|green|emerald|orange|amber|violet|indigo)-[0-9]{2,3}/,
    },
    {
      pattern: /bg-gradient-to-br/,
    },
  ],
}

