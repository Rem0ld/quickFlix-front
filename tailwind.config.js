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
    borderRadius: {
      'none': '0',
      'sm': '0.250rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'large': '12px',
    },
    extend: {
      animation: {
        "fade-in": "fadein 500ms ease-in-out",
        "fade-out": "fadeout 500ms ease-in-out"
      },
      keyframes: {
        fadein: {
          "0%": {opacity: 0},
          "100%": {opacity: 1}
        },
        fadeout: {
          "0%": {opacity: 1},
          "100%": {opacity: 0}

        }
      },
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
