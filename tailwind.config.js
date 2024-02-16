/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        "custom-dark": "#09090B",
        "custom-ver-text": "#96969E",
        "custom-light-mode": "#111211"
      }
    },
  },
  plugins: [],
};