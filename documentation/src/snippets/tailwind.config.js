const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    // Add our default tailwind preset to the content list
    './node_modules/@flavorly/vanilla-components/dist/presets/tailwind/all.json', // [!code focus:1]
  ],
  theme: {
    extend: {
      colors: {
        // Set your primary color
        primary: colors.indigo, // [!code focus:1]
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),

    // Forms plugin is required if you are using the tailwind preset
    require('@tailwindcss/forms'), // [!code focus:1]
  ],
}
