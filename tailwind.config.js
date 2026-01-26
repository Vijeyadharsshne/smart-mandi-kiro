/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          500: '#059669',
          600: '#047857',
          700: '#065f46',
        },
        secondary: {
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      fontFamily: {
        'hindi': ['Noto Sans Devanagari', 'sans-serif'],
      }
    },
  },
  plugins: [],
}