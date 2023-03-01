const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    './documentation/.vitepress/**/*.{js,jsx,ts,tsx,vue,md}',
    './packages/vanilla-components/src/**/*.*',
    './documentation/src/**/*.{js,jsx,ts,tsx,vue,md,json}',
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.zinc,
        primary: colors.indigo,
      },
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
        inter: ['Inter', 'sans-serif'], // Ensure fonts with spaces have " " surrounding it.
      },
      screens: {
        xxs: { min: '200px', max: '374px' },
        xs: { min: '375px', max: '639px' },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
