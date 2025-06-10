/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,tsx,ts,jsx}",
    "./src/**/*.{js,tsx,ts,jsx}", // 👈 Added this line
    "./components/**/*.{js,tsx,ts,jsx}", // optional, if you have a components folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
