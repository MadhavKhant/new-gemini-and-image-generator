import typography from '@tailwindcss/typography';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'xl': '0 10px 30px rgba(0, 0, 0, 0.3)',
        '2xl': '0 10px 30px rgba(0, 0, 0, 0.4)',
        '3xl': '0 10px 30px rgba(0, 0, 0, 0.5)', // Strong shadow
        '4xl': '0 10px 30px rgba(0, 0, 0, 0.6)', // Strong shadow
        '5xl': '0 15px 50px rgba(0, 0, 0, 0.7)', // Even stronger shadow
        '6xl': '0 20px 70px rgba(0, 0, 0, 0.8)', // Maximum shadow effect
      }
    },
  },
  plugins: [
    typography
  ],
}