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
          { text: 'Button', link: '/guide/elements/buttons' },
          { text: 'Card', link: '/guide/elements/cards' },
        ],
      },
      {
        text: 'Inputs',
        children: [
          { text: 'Introduction', link: '/guide/inputs/shared-options' },
          { text: 'Text', link: '/guide/inputs/text' },
          { text: 'Select', link: '/guide/inputs/select' },
          { text: 'Rich Select', link: '/guide/inputs/rich-select' },
          { text: 'Rich Radio Input', link: '/guide/inputs/radio-group' },
          { text: 'Phone Input', link: '/guide/inputs/phone-number' },
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
  ],
  // when using vuepress package, you can omit this field
  // because webpack is the default bundler
  bundler: '@vuepress/bundler-vite',
  // options for webpack bundler
  bundlerConfig: {
      // chainWebpack(config,isServer,isBuild){
      //   //console.log(config);
      //   config.resolve.alias.set('@', path.resolve(__dirname, "./../../src"))
      // },
      viteOptions: {
        alias: [
          //{ find: '/^~/', replacement: ''},
          //{ find: '@', replacement: path.resolve(__dirname,'./../../src') }
        ]
      }
  },
  // alias: {
  //   '@': path.resolve(__dirname,'./../../src'),
  // },
}
