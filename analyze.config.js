import { visualizer } from 'rollup-plugin-visualizer'
import vue from '@vitejs/plugin-vue'

import { defineConfig } from 'vite'
import { resolve } from 'path'
import typescript from "@rollup/plugin-typescript";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      open: true,
      title: 'Vanilla Components Bundle Visualizer',
    }),
  ],
  resolve:{
    alias: [
      { find: '/^~/', replacement: ''},
      { find: '@', replacement: resolve(__dirname,'src') }
    ]
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'vanilla-components',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      plugins: [
        typescript({
          "exclude": ["node_modules"]
        }),
      ],
      //inlineDynamicImports: true,
      external: [
        'vue',
        '@headlessui/vue',
        '@heroicons/vue',
        '@heroicons/vue',
        '@popperjs/core',
        '@variantjs/core',
        '@variantjs/vue',
        'body-scroll-lock',
        'flatpickr',
        'fuse.js',
        'libphonenumber-js',
        'lodash',
        'moment-timezone',
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
