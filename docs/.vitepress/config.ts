import { defineConfig } from 'vitepress'

const production = process.env.NODE_ENV === 'production'
const site = production ? 'https://vanillacomponents.dev' : 'http://localhost:3000'
const image = `${site}/banner.png`
const title = 'Vanilla Components'
const description = 'A beautiful set of Vanilla Components for Vue 3 + Tailwind CSS'

export default defineConfig({
  title: 'Vanilla Components',
  description: 'Next Generation Frontend Tooling',
  head: [
    ['meta', { name: 'author', content: 'INDIGIT' }],
    ['meta', { name: 'keywords', content: 'components, vue, headless-ui, variantjs, datatables, tailwind' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/symbol-gradient.svg' }],
    ['meta', { name: 'HandheldFriendly', content: 'True' }],
    ['meta', { name: 'MobileOptimized', content: '320' }],
    ['meta', { name: 'theme-color', content: '#d8b4fe' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: site }],
    ['meta', { name: 'twitter:title', value: title }],
    ['meta', { name: 'twitter:description', value: description }],
    ['meta', { name: 'twitter:image', content: image }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:site', content: site }],
    ['meta', { property: 'og:site_name', content: title }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:image', content: image }],
    ['meta', { property: 'og:description', content: description }],
    // @ts-ignore
    ...(production ? [['link', {href: '/assets/tailwind.css', rel: 'stylesheet'}]] : [])
  ],

  vue: {
    reactivityTransform: true
  },

  srcDir: './src',
  base: '/',

  vite: {
    server: {
      host: true,
      fs: {
        allow: ['../..'],
      },
    },
    json: {
      stringify: true,
    },
  },

  markdown: {
    config(md) {
      md.use(require('markdown-it-copy'),{
        btnText: '', // 'copy' | button text
        failText: 'Failed to Copy', // 'copy fail' | copy-fail text
        successText: 'Copied to Clipboard', // 'copy success' | copy-success text
      })
      md.use(require('markdown-it-include'))
    }
  },

  themeConfig: {
    logo: '/symbol-gradient.svg',

    editLink: {
      pattern: 'https://github.com/vitejs/vite/edit/main/docs/:path',
      text: 'Suggest changes to this page'
    },

    socialLinks: [
      { icon: 'twitter', link: 'https://twitter.com/vite_js' },
      { icon: 'discord', link: 'https://chat.vitejs.dev' },
      { icon: 'github', link: 'https://github.com/vitejs/vite' }
    ],

    algolia: {
      apiKey: 'b573aa848fd57fb47d693b531297403c',
      indexName: 'vitejs',
      searchParameters: {
        facetFilters: ['tags:en']
      }
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You & Vite Contributors'
    },

    nav: [
      { text: 'Guide', link: '/guide/', activeMatch: '/guide/' },
      { text: 'Config', link: '/config/', activeMatch: '/config/' },
      { text: 'Plugins', link: '/plugins/', activeMatch: '/plugins/' },
      {
        text: 'Links',
        items: [
          {
            text: 'Twitter',
            link: 'https://twitter.com/vite_js'
          },
          {
            text: 'Discord Chat',
            link: 'https://chat.vitejs.dev'
          },
          {
            text: 'Awesome Vite',
            link: 'https://github.com/vitejs/awesome-vite'
          },
          {
            text: 'DEV Community',
            link: 'https://dev.to/t/vite'
          },
          {
            text: 'Rollup Plugins Compat',
            link: 'https://vite-rollup-plugins.patak.dev/'
          },
          {
            text: 'Changelog',
            link: 'https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md'
          }
        ]
      },
      {
        text: 'v3 (next)',
        items: [
          {
            text: 'v2.x (stable)',
            link: 'https://v2.vitejs.dev'
          }
        ]
      }
    ],

    sidebar: {
      '/': [
        {
          text: 'Getting started',
          collapsible: true,
          items: [
            { text: 'Introduction', link: '/introduction' },
            { text: 'Quick start', link: '/quick-start' },
          ],
        },
        {
          text: 'Concepts',
          collapsible: true,
          items: [
            { text: 'Variants', link: '/concepts/variants' },
            { text: 'Configuration', link: '/concepts/configuration' },
            { text: 'Layouts', link: '/concepts/layouts' },
            { text: 'Properties', link: '/concepts/layouts' },
          ],
        },
        {
          text: 'Inputs & Forms',
          collapsible: true,
          items: [
            { text: 'Avatar', link: '/components/avatar/index' },
            { text: 'Button', link: '/components/button/index' },
            { text: 'Input', link: '/components/input/index' },
            { text: 'Phone Input', link: '/components/phone-input/index' },
            { text: 'Checkbox', link: '/components/checkbox/index' },
            { text: 'Date Time Picker', link: '/components/datetimepicker/index' },
          ],
        },
        {
          text: 'Other & UI',
          collapsible: true,
          items: [
            { text: 'Card', link: '/components/card/index' },
            { text: 'Datatables', link: '/components/datatables/index' },
            { text: 'Dropdown', link: '/components/dropdown/index' },
            { text: 'Slideover', link: '/components/slideover/index' },
          ],
        },

        {
          text: 'Other Demos',
          collapsible: true,
          items : [

            { text: 'Programmatic API', link: '/extra-topics/programmatic-api' },
            { text: 'Alternatives', link: '/extra-topics/alternatives' },

            { text: 'Install packages', link: '/action/install-packages' },
            { text: 'Execute command', link: '/action/execute-command' },
            { text: 'Edit files', link: '/action/edit-files' },
            { text: 'Delete paths', link: '/action/delete-paths' },
            { text: 'Apply nested preset', link: '/action/apply-nested-preset' },
            { text: 'Group', link: '/action/group' },
            { text: 'Prompt (experimental)', link: '/action/prompt' },
          ]
        }
      ],
    }
  }
})
