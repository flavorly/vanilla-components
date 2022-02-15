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
      // {
      //   text: 'Components',
      //   children: [
      //     { text: 'Button', link: '/guide/elements/buttons' },
      //     { text: 'Card', link: '/guide/elements/cards' },
      //   ],
      // },
      {
        text: 'Inputs',
        children: [
          { text: 'Introduction', link: '/guide/inputs/shared-options' },
          { text: 'Text & Password', link: '/guide/inputs/text' },
          { text: 'Textarea', link: '/guide/inputs/textarea' },
          // { text: 'Select', link: '/guide/inputs/select' },
          // { text: 'Rich Select', link: '/guide/inputs/rich-select' },
          // { text: 'Rich Radio Input', link: '/guide/inputs/radio-group' },
          // { text: 'Phone Input', link: '/guide/inputs/phone-number' },
          // { text: 'Country', link: '/guide/inputs/country' },
          // { text: 'Toggle', link: '/guide/inputs/toggle' },
          // { text: 'Profile Photo', link: '/guide/inputs/profile-photo' },
          { text: 'Datetime', link: '/guide/inputs/datetimepicker' },
        ],
      },
    ],
  },
  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, './../guide'),
        components: {
          Wrapper: path.resolve(__dirname, './components/Wrapper.vue'),
          SharedProperties: path.resolve(__dirname, './components/SharedProperties.vue'),
        },
        getComponentName: (filePath: string) => {
          const fileName = path.basename(filePath, path.extname(filePath))
          return fileName
            .replace(/^[a-z]/, (s) => s.toUpperCase())
            .replace(/([a-z])([A-Z])/g, "$1-$2")
            .replace(/\s+/g, '-')
            .toLowerCase();
        },
      },
    ],
    // Preview Docs Plugin
    [
      'vuepress-plugin-demoblock-plus', {
         //theme: 'dracula'
        scriptImports: ["import * as VanillaComponents from '@/index'"],
        scriptReplaces: [
          {
            searchValue: /import ({.*}) from '@vanilla-components'/g,
            replaceValue: (s: any, s1: any) => `const ${s1} = VanillaComponents`
          }
        ],
        locales: {
          '/': {
            'hide-text': 'View Design',
            'show-text': 'Show Source code',
            'copy-button-text': 'Copy',
            'copy-success-text': 'Copied to Clipboard',
          },
          '/zh': {
            'hide-text': '隐藏代码',
            'show-text': '显示代码',
            'copy-button-text': '复制代码片段',
            'copy-success-text': '复制成功'
          }
        }
      }
    ]
  ],
  bundler: '@vuepress/bundler-vite',
  bundlerConfig: {
      viteOptions: {
        resolve: {
          alias: [
            { find: '@', replacement: path.resolve(__dirname,'./../../src') }
          ]
        },
        css: {
          postcss: {
            plugins: [
              require('postcss-import'),
              require('tailwindcss/nesting'),
              require('tailwindcss'),
              require('autoprefixer'),
            ]
          }
        },
      }
  },
  extendsMarkdown: (md: any) => {
    // use more markdown-it plugins!
    md.use(require('markdown-it-include'))
  }
}
