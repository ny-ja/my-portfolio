/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundImage: {
      "background-img": "url('/src/assets/images/bg.png')",
    },
  },
  plugins: [],
}

