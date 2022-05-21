module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "steel-gray": "#1F1D2B",
        "tower-gray": "#ABBBC2",
        apricot: "#EA7C69",
        "ebony-clay": "#252836",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
    },
  },
  plugins: [require("daisyui")],
};
