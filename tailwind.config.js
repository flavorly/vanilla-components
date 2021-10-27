const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: [],
  darkMode: 'class', // or 'media' or 'class'
  variants: {
    extend: {},
  },
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
      cyan: colors.cyan,
      violet: colors.violet,
      fuchsia: colors.fuchsia,
      lime: colors.lime,
      'light-blue': colors.sky,
      rose: colors.rose,
      emerald: colors.emerald,
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
      maxWidth: {
        '8xl': '90rem',
      },
      maxHeight: (theme) => ({
        '(screen-16)': `calc(100vh - ${theme('spacing.16')})`,
      }),
      boxShadow: {
        px: '0 0 0 1px rgba(0, 0, 0, 0.5)',
        link:
          'inset 0 -0.125em 0 0 #fff, inset 0 -0.375em 0 0 rgba(165, 243, 252, 0.4)',
      },
      height: (theme) => ({
        '(screen-16)': `calc(100vh - ${theme('spacing.16')})`,
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
