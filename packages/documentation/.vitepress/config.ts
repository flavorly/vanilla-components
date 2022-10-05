import { resolve } from 'path'
import { defineConfig } from 'vitepress'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import MarkitDownInclude from 'markdown-it-include'
import Inspect from 'vite-plugin-inspect'
import ReplacePackagePlugin from '../plugins/local-link'

const production = process.env.NODE_ENV === 'production'
const site = production ? 'https://vanillacomponents.dev' : 'http://localhost:3000'
const image = `${site}/banner.png`
const title = 'Vanilla Components'
const description = 'A beautiful set of Vanilla Components for Vue 3 + Tailwind CSS'

const plugins = !production
  ? [
    ReplacePackagePlugin(),
    Inspect({
      build: false,
      outputDir: '.vite-inspect',
    }),
  ]
: []

const navQuickStart = [
  { text: 'Introduction', link: '/guide/introduction' },
  { text: 'Installation', link: '/guide/quick-start' },
  { text: 'Configuration', link: '/guide/configuration' },
  { text: 'Variants & Usage', link: '/guide/variants' },
  { text: 'Shared Props', link: '/guide/props' },
]

export default defineConfig({
  // Vue Config
  vue: {
    reactivityTransform: true,
  },

  // Vite config
  vite: {
    optimizeDeps: {
      exclude: [],
      include: [
        '@indigit/vanilla-components',
      ],
      force: true,
    },
    server: {
      host: true,
      fs: {
        allow: ['../..'],
      },
    },
    resolve: {
      alias: [
        { find: '@vanilla', replacement: resolve(__dirname, '../../vanilla-components') },
        { find: '@', replacement: resolve(__dirname, '../../vanilla-components/src') },
        { find: './VPNavBarSearch.vue', replacement: resolve(__dirname, './theme/AlgoliaLunr/VPNavBarSearch.vue') },
      ],
    },
    json: {
      stringify: true,
    },
    plugins,
    build: {
      sourcemap: true,
    },
  },

  // Vitepress Config
  srcDir: './src',
  base: '/',
  title: 'Vanilla Components',
  description: 'A lightweight, flexible & customizable UI library for Vue 3',
  head: [
    ['meta', { name: 'author', content: 'INDIGIT' }],
    ['meta', { name: 'keywords', content: 'components, vue, headless-ui, variantjs, datatables, tailwind' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/symbol-gradient.svg' }],
    ['meta', { name: 'HandheldFriendly', content: 'True' }],
    ['meta', { name: 'MobileOptimized', content: '320' }],
    ['meta', { name: '_old_theme-color', content: '#d8b4fe' }],
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
  ],

  // Plugins Configuration
  markdown: {
    config(md) {
      md.use(MarkitDownInclude)
    },
  },

  // Theme Configuration
  themeConfig: {
    logo: '/symbol-gradient.svg',

    editLink: {
      pattern: 'https://github.com/nikuscs/vanilla-components/tree/master/packages/documentation/src/:path',
      text: 'Suggest changes to this page',
    },

    socialLinks: [
      { icon: 'twitter', link: 'https://twitter.com/nikuscs' },

      // { icon: 'discord', link: 'https://chat.vitejs.dev' },
      { icon: 'github', link: 'https://github.com/nikuscs' },
    ],

    // algolia: {
    //   appId: '',
    //   apiKey: '',
    //   indexName: 'vanilla-components',
    //   searchParameters: {
    //     facetFilters: ['tags:en'],
    //   },
    // },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Pedro Martins + INDIGIT',
    },

    nav: [
      {
        text: 'Overview',
        items: navQuickStart,
      },
      { text: 'Guide', link: '/guide/quick-start', activeMatch: '/guide/' },
      { text: 'Components', link: '/components/', activeMatch: '/components/' },
      { text: 'v0.6.27', link: 'https://github.com/nikuscs/vanilla-components' },
    ],

    sidebar: {
      '/': [
        {
          text: 'Getting started',
          collapsible: true,
          items: navQuickStart,
        },
        {
          text: 'Components',
          collapsible: true,
          items: [
            { text: 'Avatar', link: '/components/avatar/index' },
            { text: 'Button', link: '/components/button/index' },
            { text: 'Input', link: '/components/input/index' },
            { text: 'Country Input', link: '/components/country-input/index' },
            { text: 'Phone Input', link: '/components/phone-input/index' },
            { text: 'Checkbox', link: '/components/checkbox/index' },
            { text: 'Date Time Picker', link: '/components/datetimepicker/index' },
            { text: 'Card', link: '/components/card/index' },
            { text: 'Datatables', link: '/components/datatables/index' },
            { text: 'Dropdown', link: '/components/dropdown/index' },
            { text: 'Slideover', link: '/components/slideover/index' },
            { text: 'Rich Select', link: '/components/rich-select/index' },
          ],
        },
        {
          text: 'Advanced',
          collapsible: true,
          items: [
            { text: 'Custom Components', link: '/guide/advanced-configuration' },
          ],
        },
        {
          text: 'Integrations',
          collapsible: true,
          items: [
            { text: 'Laravel + Datatables', link: '/guide/integrations-datatables' },
          ],
        },
      ],
    },
  },
})
