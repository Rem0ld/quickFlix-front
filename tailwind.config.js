module.exports = {
  mode: "jit",
  purge: ["./src/**/*.tsx", "./src/**/*.ts"],
  darkMode: false, // or 'media' or 'class'
  theme: {
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
