const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
let makeShadow = (name, rgb) => {
  let obj = {};
  obj[name + "-xs"] = `0 0 0 1px rgba(${rgb}, 0.05)`;
  obj[name + "-xs"] = `0 0 0 1px rgba(${rgb}, 0.05)`;
  obj[name + "-sm"] = `0 1px 2px 0 rgba(${rgb}, 0.05)`;
  obj[name] = `0 1px 3px 0 rgba(${rgb}, 0.1), 0 1px 2px 0 rgba(${rgb}, 0.06)`;
  obj[name + "-md"] = `0 4px 6px -1px rgba(${rgb}, 0.1), 0 2px 4px -1px rgba(${rgb}, 0.06)`;
  obj[name + "-lg"] = `0 10px 15px -3px rgba(${rgb}, 0.1), 0 4px 6px -2px rgba(${rgb}, 0.05)`;
  obj[name + "-xl"] = `0 20px 25px -5px rgba(${rgb}, 0.1), 0 10px 10px -5px rgba(${rgb}, 0.04)`;
  obj[name + "-2xl"] = `0 25px 50px -12px rgba(${rgb}, 0.25)`;
  obj[name + "-inner"] = `inset 0 2px 4px 0 rgba(${rgb}, 0.06)`;
  return obj;
};

module.exports = {
  mode: 'jit',
  darkMode: 'class', // or 'media' or 'class'*,
  purge: [
    './docs/.vuepress/**/*.{js,jsx,ts,tsx,vue,md}',
    './docs/guide/**/*.{js,jsx,ts,tsx,vue,md}',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      red: colors.red,
      yellow: colors.amber,
      green: colors.emerald,
      indigo: colors.indigo,
      blue: colors.blue,
      gray:{
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        750: '#2B3544',
        800: '#1f2937',
        850: '#1D2532',
        900: '#1a202c',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
        inter: ['Inter', 'sans-serif'] // Ensure fonts with spaces have " " surrounding it.
      },
      screens: {
        'xxs': {'min': '200px', 'max': '374px'},
        'xs': {'min': '375px', 'max': '639px'},
      },
      boxShadow: {
        ...makeShadow("cool-gray", "71, 85, 104"),
        ...makeShadow("gray", "75, 85, 98"),
        ...makeShadow("red", "223, 39, 44"),
        ...makeShadow("orange", "207, 57, 24"),
        ...makeShadow("yellow", "158, 88, 28"),
        ...makeShadow("green", "16, 122, 87"),
        ...makeShadow("teal", "13, 116, 128"),
        ...makeShadow("blue", "29, 100, 236"),
        ...makeShadow("indigo", "87, 81, 230"),
        ...makeShadow("purple", "125, 59, 236"),
        ...makeShadow("pink", "213, 34, 105"),
        ...makeShadow("white", "255, 255, 255"),
        ...makeShadow("dark", "0, 0, 0"),
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
