import { defineConfig } from 'vite'

export default defineConfig({
  ssr: {
    noExternal: [
      '@heroicons/vue'
    ]
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
  plugins: []
})
