/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/*.js",],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}


