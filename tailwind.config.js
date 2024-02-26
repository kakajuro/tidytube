/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        "custom-dark": "#09090B",
        "custom-ver-text": "#96969E",
        "custom-light-mode-title": "#111211",
        "custom-light-mode": "#333333"
      }
    },
    fontFamily: {
      "jost": ["Jost", "sans-serif"]
    }
  },
  plugins: [],
};