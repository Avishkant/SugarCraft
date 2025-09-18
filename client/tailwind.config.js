/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6FB5',
        secondary: '#FFD93D',
        accent: '#6FE7DD',
        dark: '#2C2C2C',
        light: '#F9F9F9',
      },
    },
  },
  plugins: [],
};
