module.exports = {
  theme: {
    extend: {
      fontWeight: {
        light: "300",
      },
      backgroundImage: {
        noise: "url('/assets/noise.png')",
      },
    },
    fontFamily: {
      mont: ["Montserrat", "sans-serif"],
      dm: ["DM Sans", "sans-serif"],
      dmMono: ["DM Mono", "monospace"],
      space: ["Space Grotesk", "sans-serif"],
    },
    colors: {
      dark: {
        DEFAULT: "#111111",
      },
      white: {
        DEFAULT: "#ffffff",
        100: "#ADADAD",
      },
      green: {
        DEFAULT: "#41B883",
        opacity: "#066B3E",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  purge: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    " ./plugins/**/*.{js,ts}",
  ],
};
