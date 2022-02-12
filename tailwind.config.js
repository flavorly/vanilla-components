const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  darkMode: 'class', // or 'media' or 'class'*,
  content: [
    './docs/.vuepress/components/**/*.{js,jsx,ts,tsx,vue}',
    './docs/.vuepress/theme/**/*.{js,jsx,ts,tsx,vue}',
    './docs/.vuepress/*.{js,jsx,ts,tsx,vue}',
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
    require('./src/Utils/TailwindFormsPlugin'),
    require('./src/Utils/TailwindFillOpacityPlugin'),
  ],
}
