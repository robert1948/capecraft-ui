/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",                // ✅ add this line
    "./src/**/*.{js,jsx,ts,tsx}",  // ✅ keep this for all React files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
