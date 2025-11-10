/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        primary: ['Josefin Sans', 'sans-serif'],
      },
      colors: {
        primary: '#5B21B6',
        dark: '#4C1D95',
        lighter: '#F5F3FF',
        light: '#DDD6FE',
        normalBg: '#FFFFFF',
        darkBg: '#1E1E1E',
      },
    },
  },
  plugins: [],
}
