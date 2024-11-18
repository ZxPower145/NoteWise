/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./utils/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      backgroundImage: {
        'newMeetingBg': "url('assets/images/newMeetingWallpaper.png')"
      },
      colors: {
        pink: "#f76bb0",
        hotpink: {
          DEFAULT: "#8867f3",
          50: "#744aff",
          100: "#997ef3",
          200: "#af97ff",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          50: "#363636",
          75: "#5c5b5b",
          100: "#666666",
          200: "#707070",
          300: "#a6a6a6",
          400: "#d1d1d1",
        },
      },
    },
  },
  plugins: [],
}
