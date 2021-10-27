/**
 * This can be used as an example
 * https://github.com/vuejs/vitepress/blob/master/docs/.vitepress/config.js
 */
module.exports = {
  lang: 'en-US',
  title: '🌙 Moon',
  description: 'A lightweight Vue 3 component library',

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
    { text: 'Checkbox', link: '/guide/checkbox/checkbox' },
    { text: 'Input', link: '/guide/input/input' },
    { text: 'Link', link: '/guide/link/link' },
    { text: 'Modal', link: '/guide/modal/modal' },
    { text: 'ModalManager', link: '/guide/modal-manager/modal-manager' },
    { text: 'Progress', link: '/guide/progress/progress' },
    { text: 'Radio', link: '/guide/radio/radio' },
    { text: 'Sidebar', link: '/guide/sidebar/sidebar' },
    { text: 'SidebarManager', link: '/guide/sidebar-manager/sidebar-manager' },
    { text: 'Switch', link: '/guide/switch/switch' },
    { text: 'Textarea', link: '/guide/textarea/textarea' },
    { text: 'Tooltip', link: '/guide/tooltip/tooltip' },
  ]
}
