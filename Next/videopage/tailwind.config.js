/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        "c-background": "#050505;",
        "c-p-button": "#793947;",
        "c-s-button": "#cfeddd;",
        "c-accent": "#783b4f;",
      },
      colors: {
        "c-text": "#fcfefb;",
      },
      fontFamily: {
        'covered': ["Flow Circular", ...defaultTheme.fontFamily.sans],
        'standard': ["Roboto Condensed", ...defaultTheme.fontFamily.sans],
        'hiragana': ["Tsukimi Rounded", ...defaultTheme.fontFamily.sans]        
      }
    },
  },
  plugins: [],
}
