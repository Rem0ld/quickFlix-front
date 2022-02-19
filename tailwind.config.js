const colors = require("tailwindcss/colors")

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.tsx", "./src/**/*.ts"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.gray,
      zinc: colors.zinc,
      black: colors.black,
      white: colors.white,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
      red: colors.red
    },
    extend: {
      skew: {
        '51': '-51deg'
      },
      blur: {
        '2': '2px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
