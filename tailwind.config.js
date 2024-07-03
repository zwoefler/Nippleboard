/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
        colors: {
            almostBlack: '#121212',
            almostWhite: '#f8f9fa',
            footerBlack: '#000000',
            accentOrange: '#ff3e00',
        },
    },
  },
  plugins: [],
}

