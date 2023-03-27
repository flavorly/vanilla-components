import { resolve } from 'path'
import { defineConfig } from 'vitepress'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { version } from '../../package.json'

const production = process.env.NODE_ENV === 'production'
const site = production ? 'https://vanilla-components.com' : 'http://localhost:3005'
const title = 'Vanilla Components'
const description = 'A lightweight, flexible & customizable UI library for Vue 3, styled with Tailwind CSS'

const navQuickStart = [
  { text: 'Introduction', link: '/guide/introduction' },
  { text: 'Installation', link: '/guide/quick-start' },
  { text: 'Configuration', link: '/guide/configuration' },
  { text: 'Changelog', link: '/guide/changelog' },
]

export default defineConfig({

  // Vite config
  vite: {
    server: {
      host: true,
      fs: {
        allow: ['../..'],
      },
    },
    resolve: {
      alias: [
        { find: '@flavorly/vanilla-components', replacement: resolve(__dirname, '../../packages/vanilla-components/src') },

        // { find: './VPNavBarSearch.vue', replacement: resolve(__dirname, './lunr/VPNavBarSearch.vue') },
      ],
    },
    json: {
      stringify: true,
    },
    plugins: [
      Icons({
        autoInstall: true,
      }),
      Components({
        resolvers: [
          IconsResolver(),
        ],
        dirs: ['foo'],
        dts: true,
      }),
    ],
    build: {
      sourcemap: false,
      chunkSizeWarningLimit: 16000,
    },
    ssr: {
      noExternal: ['@flavorly/vanilla-components'],
    },
  },

  // Vitepress Config
  srcDir: './src',
  base: '/',
  title: 'Vanilla Components',
  description: 'A lightweight, flexible & customizable UI library for Vue 3',
  head: [
    ['meta', { name: 'author', content: 'Flavorly' }],
    ['meta', { name: 'keywords', content: 'components, vue, headless-ui, variantjs, datatables, tailwind' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/symbol-gradient.svg' }],
    ['meta', { name: 'HandheldFriendly', content: 'True' }],
    ['meta', { name: 'MobileOptimized', content: '320' }],
    ['meta', { name: '_old_theme-color', content: '#d8b4fe' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: site }],
    ['meta', { name: 'twitter:title', value: title }],
    ['meta', { name: 'twitter:description', value: description }],
    ['meta', { name: 'twitter:image', content: '/seo.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:site', content: site }],
    ['meta', { property: 'og:site_name', content: title }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:image', content: '/seo.png' }],
    ['meta', { property: 'og:description', content: description }],
  ],

  // Theme Configuration
  themeConfig: {

    algolia: {
      appId: 'MPT9YSZL25',
      apiKey: '98b3ea697d5242577262c11bfcb0f8ec',
      indexName: 'vanilla-components',
    },

    logo: '/symbol-gradient.svg',

    editLink: {
      pattern: 'https://github.com/flavorly/vanilla-components/tree/master/packages/documentation/src/:path',
      text: 'Suggest changes to this page',
    },

    socialLinks: [
      { icon: 'twitter', link: 'https://twitter.com/flavorly' },
      { icon: 'github', link: 'https://github.com/flavorly/vanilla-components' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present - Flavorly ®',
    },

    nav: [
      {
        text: 'Overview',
        items: navQuickStart,
      },
      { text: 'Guide', link: '/guide/quick-start', activeMatch: '/guide/quick-start' },
      { text: 'Components', link: '/guide/components-list', activeMatch: '/guide/components-list' },
      { text: version, link: 'https://github.com/flavorly/vanilla-components' },
    ],

    sidebar: {
      '/': [
        {
          text: 'Getting started',
          items: navQuickStart,
        },
        {
          text: 'Components',
          items: [
            { text: 'Alert', link: '/guide/components/alert' },
            { text: 'Avatar', link: '/guide/components/avatar' },
            { text: 'Button', link: '/guide/components/button' },
            { text: 'Card', link: '/guide/components/card' },
            { text: 'Checkbox', link: '/guide/components/checkbox' },
            { text: 'Country Input', link: '/guide/components/country-input' },
            { text: 'Datatables', link: '/guide/components/datatable' },
            { text: 'Datetime Picker', link: '/guide/components/datetime-input' },
            { text: 'Dialog', link: '/guide/components/dialog' },
            { text: 'Dropdown', link: '/guide/components/dropdown' },
            { text: 'Forms', link: '/guide/components/forms' },
            { text: 'Input', link: '/guide/components/input' },
            { text: 'Phone Input', link: '/guide/components/phone-input' },
            { text: 'Rich Radio', link: '/guide/components/rich-radio' },
            { text: 'Rich Select', link: '/guide/components/rich-select' },
            { text: 'Select', link: '/guide/components/select' },
            { text: 'Skeletons', link: '/guide/components/skeleton' },
            { text: 'Slideover', link: '/guide/components/slideover' },
            { text: 'Status Indicator', link: '/guide/components/status-indicator' },
            { text: 'Textarea', link: '/guide/components/textarea' },
            { text: 'Toggle', link: '/guide/components/toggle' },
          ],
        },
        {
          text: 'Advanced',
          items: [
            { text: 'Custom Components', link: '/guide/advanced-configuration' },
            { text: 'Shared Props', link: '/guide/advanced-props' },
            { text: 'Form Sections & Groups', link: '/guide/examples-form-sections' },
            { text: 'IDE Config', link: '/guide/advanced-ide' },
          ],
        },
        {
          text: 'Integrations',
          items: [
            { text: 'Laravel + Datatables', link: '/guide/integrations-datatables' },
            { text: 'Nuxt', link: '/guide/integrations-nuxt' },
            { text: 'Unplugin', link: '/guide/integrations-autoimport' },
          ],
        },
      ],
    },
  },
})
