module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // customize default plugin options
          // inlineStyles: {
          //   onlyMatchedOnce: false,
          //   removeMatchedSelectors: true,
          // },
          //convertStyleToAttrs: true,
        },
      },
    },
  ],
  convertStyleToAttrs: true,
};
