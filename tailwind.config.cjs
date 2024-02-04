/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        "custom-bg": "#09090B",
        "custom-ver-text": "#96969E",
      }
    },
  },
  plugins: [],
};
