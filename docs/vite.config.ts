import { defineConfig } from 'vite'

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
    alias: [
      {
        find: '@indigit/vanilla-components',
        replacement: '../src',
      },
    ],
  },
  optimizeDeps: {
    exclude: [
      '@indigit/vanilla-components',
      '../src',
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
  plugins: [],
})
