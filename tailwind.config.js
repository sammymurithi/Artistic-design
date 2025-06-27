/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html", // Scans index.html, products.html in the project root
    "./assets/**/*.js" // Scans JS files in assets folder and subdirectories
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
