/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ffe5f0',
          100: '#ffb8d6',
          200: '#ff8abc',
          300: '#ff5ca3',
          400: '#ff2e89',
          500: '#ff006f',
          600: '#cc0059',
          700: '#990043',
          800: '#66002c',
          900: '#330016',
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
