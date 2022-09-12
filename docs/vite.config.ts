import { defineConfig } from 'vite';
import { whyframe } from '@whyframe/core';
import { whyframeVue } from '@whyframe/vue';

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
  plugins: [
    whyframe({defaultSrc: '/frames/default'}),
    whyframeVue({include: /\.(?:vue|md)$/})
  ]
})
