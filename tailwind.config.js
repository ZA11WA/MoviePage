/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
      },
      gridTemplateColumns: {
        fluid: "repeat(auto-fit,minmax(15rem,1fr))",
      },
      keyframes: {
        scrollLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-250px * 7))' }, // Moves left for 7 items
        },
        scrollRight: { // New keyframe for scrolling to the right
          '0%': { transform: 'translateX(calc(-250px * 7))' }, // Start with items offscreen
          '100%': { transform: 'translateX(0)' }, // End fully scrolled to the right
        },
      },
      animation: {
        scrollLeft: 'scrollLeft 40s linear infinite', // Animation for left-to-right
        scrollRight: 'scrollRight 40s linear infinite', // Animation for right-to-left
      },
    },
  },
  plugins: [],
};
