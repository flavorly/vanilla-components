/**
 * This can be used as an example
 * https://github.com/vuejs/vitepress/blob/master/docs/.vitepress/config.js
 */
module.exports = {
  lang: 'en-US',
  title: 'Vanilla Components',
  description: 'A lightweight Vue 3 component based on Tailwind CSS',

  themeConfig: {
    docsDir: 'docs',
    nav: [
      {
        text: 'Github',
        link: 'https://github.com/igerslike/vanilla-documents',
      },
    ],
    sidebar: [
      {
        text: 'Introduction',
        link: '/',
      },
      {
        text: 'Components',
        children: getComponents(),
      },
    ],
  },
  plugins: [
      require('vue-shadow-dom')
  ]
}

function getComponents() {
  return [
    { text: 'Button', link: '/guide/button/button' },
    { text: 'Card', link: '/guide/cards/card' },
    { text: 'Teste', link: '/guide/sample' },
  ]
}
