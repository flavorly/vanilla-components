const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    './.vitepress/theme/**/*.{js,jsx,ts,tsx,vue,md}',
    './src/**/*.{js,jsx,ts,tsx,vue,md}',
    './../src/**/*.{js,jsx,ts,tsx,vue,md}',
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
      pink: colors.pink,
      gray: colors.zinc, // To match Vitepresss Dark mode
      // Primary color, change to your own
      primary: colors.indigo,
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
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('./tailwind/TailwindFormsPlugin.cjs'),
    require('./tailwind/TailwindFillOpacityPlugin.cjs'),
  ],
}
