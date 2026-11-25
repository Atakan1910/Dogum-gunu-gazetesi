/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        headline: ['"Playfair Display"', "Georgia", "serif"],
        gothic: ['"Grenze Gotisch"', '"Playfair Display"', "Georgia", "serif"],
        body: ['"Lora"', "Georgia", "serif"],
      },
      contrast: {
        105: "1.05",
        115: "1.15",
      },
      saturate: {
        90: ".9",
      },
    },
  },
  plugins: [],
};
