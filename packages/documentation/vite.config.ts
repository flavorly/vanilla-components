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
  optimizeDeps: {
    exclude: [
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
