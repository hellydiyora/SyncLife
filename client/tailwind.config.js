/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'mainTag': ['Chelsea Market'  , 'sans-serif'],
        'subTag' : ["Truculenta", "sans-serif"],
        'danceTag' : ["Caveat", "cursive"],
        'allTag' : ["Poppins" , "sans-serif"],
      },
    },
  },

  plugins: [],
};
