module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-prefix-selector')({
      prefix: ':not(:where(.vp-raw *, #headlessui-portal-root *, .z-50 *))',
      includeFiles: [
        /vp-doc\.css/,
        /base\.css/,
        /vp-code\.css/,
        /utils\.css/,
      ],
      transform(prefix, _selector, prefixedSelector) {
        const [selector, pseudo = ''] = _selector.split(/(:\S*)$/)
        return selector + prefix + pseudo
      },
    }),
  ],
}
