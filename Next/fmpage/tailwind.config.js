/** @type {import('tailwindcss').Config} */
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
        'landingTwo': "url('/media/images/landingImageTwo.webp')",
        'skip': "url('/media/images/hvalfangst.webp')"
      },
    },
    fontSize: {
      sm: "0.707rem",
      md: "1rem",
      lg: "1.414rem",
      xl: "1.999rem",
    }
  },
  plugins: [],
}
