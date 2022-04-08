// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin');
const fillOpacityPlugin = plugin(function ( { addUtilities }) {
  const opacity = {
    0: 0,
    10: '0.1',
    20: '0.2',
    30: '0.3',
    40: '0.4',
    50: '0.5',
    60: '0.6',
    70: '0.7',
    80: '0.8',
    90: '0.9',
    100: '1',
  };

  const newUtilities = Object.keys(opacity).reduce((result, key) => {
    result[`.fill-opacity-${key}`] = {
      fillOpacity: opacity[key],
    };
    return result;
  }, {});

  addUtilities(newUtilities, ['responsive', 'hover', 'dark']);
});

module.exports = fillOpacityPlugin;
