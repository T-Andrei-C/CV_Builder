/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
    screens: {
      "xl": "1280px",
      "lg": "1024px",
      "md": "768px",
      "sm": "640px",
      "exsm": "505px"
    }
  },
  plugins: [],
  darkMode: "class"
}

