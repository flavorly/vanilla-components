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
        link: 'https://github.com/ulissesferreira/moon',
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
}

function getComponents() {
  return [
    { text: 'Button', link: '/guide/button/button' },
    { text: 'Card', link: '/guide/cards/card' },
  ]
}
