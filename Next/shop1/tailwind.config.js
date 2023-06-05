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
      fontFamily: {
        'creepster': ["Creepster", ...defaultTheme.fontFamily.sans],
        'rubik': ["Rubik", ...defaultTheme.fontFamily.sans],
        'flow': ["Flow Rounded", ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}
