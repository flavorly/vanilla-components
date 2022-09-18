import path, { resolve } from 'path'
import { defineConfig } from 'vite'
import type { Alias } from 'vite'
import replaceFiles from 'vite-plugin-replace-files'
const projRoot = path.resolve(__dirname, '..', '..', '..')
const alias: Alias[] = []

alias.push(

  // {
  //   find: /^vanilla-components(\/(es|umd))?$/,
  //   replacement: path.resolve(__dirname, '../vanilla-components/src/index.ts'),
  // },
  // {
  //   find: /^vanilla-components\/(es|umd)\/(.*)$/,
  //   replacement: `${path.resolve(__dirname, '../../packages')}/$2`,
  // },
  // {
  //   find: '@indigit/vanilla-components',
  //   replacement: path.resolve(__dirname, '../vanilla-components/src/index.ts'),
  // },
  // {
  //   find: 'vanilla',
  //   replacement: resolve(__dirname, '../vanilla-components/src'),
  // },
)

export default defineConfig({
  ssr: {
    noExternal: [
      '@heroicons/vue',
    ],
    optimizeDeps: {
      exclude: ['@heroicons/vue'],
    },
  },
  resolve: {
    alias,
  },
  optimizeDeps: {
    exclude: [
      // '@indigit/vanilla-components',

      // '../src',
    ],
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
  json: {
    stringify: true,
  },
  plugins: [
  ],
})
