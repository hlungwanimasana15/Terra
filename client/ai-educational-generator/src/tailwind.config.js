/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // All JS/TS files in src folder and subfolders
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
