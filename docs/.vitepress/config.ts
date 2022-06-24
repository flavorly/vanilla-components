import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vanilla Components',
  description: 'Next Generation Frontend Tooling',

  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],

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
          items: [
            { text: 'Introduction', link: '/introduction' },
            { text: 'Quick start', link: '/quick-start' },
          ],
        },
        {
          text: 'Concepts',
          items: [
            { text: 'Variants', link: '/concepts/variants' },
            { text: 'Configuration', link: '/concepts/configuration' },
            { text: 'Layouts', link: '/concepts/layouts' },
            { text: 'Properties', link: '/concepts/layouts' },
          ],
        },
        {
          text: 'Inputs & Forms',
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
          items: [
            { text: 'Card', link: '/components/card/index' },
            { text: 'Datatables', link: '/components/datatables/index' },
            { text: 'Dropdown', link: '/components/dropdown/index' },
            { text: 'Slideover', link: '/components/slideover/index' },
          ],
        },

        {
          text: 'Other Demos',
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
