import { path } from '@vuepress/utils'

export default {
  lang: 'en-US',
  title: 'Vanilla Components',
  description: 'A lightweight Vue 3 component based on Tailwind CSS',
  serviceWorker: true,
  theme: path.resolve(__dirname, './theme'),
  port: 3000,
  themeConfig: {
    docsDir: 'docs',
    darkMode: true,
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
        children: [
          { text: 'Button', link: '/guide/buttons' },
          { text: 'Card', link: '/guide/cards' },
        ],
      },
      {
        text: 'Inputs',
        children: [
          { text: 'Introduction', link: '/guide/inputs/shared-options' },
          { text: 'Text', link: '/guide/inputs/text' },
          { text: 'Select', link: '/guide/inputs/select' },
        ],
      },
    ],
  },
  plugins: [
    [
      '@vuepress/plugin-register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
  ]
}
