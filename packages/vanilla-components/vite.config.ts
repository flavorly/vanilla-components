import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import copy from 'rollup-plugin-copy'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import * as pkg from './package.json'

const externals = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

export default defineConfig(() => {
  return {
    plugins: [
      vue(),
      dts({
        cleanVueFileName: false,
        staticImport: false,
        skipDiagnostics: true,
        outputDir: 'dist',
        beforeWriteFile(filePath, content) {
          return {
            filePath: filePath.replace('packages/vanilla-components/src', ''),
            content,
          }
        },
      }),

      // Copy vue files so Webstorm can be happy.

      copy({
        targets: [
          // Vue Components
          { src: 'src/components/**/*.vue', dest: 'dist' },

          // Vanilla Components Configuration
          { src: 'src/components/**/config.ts', dest: 'dist' },

          // Vanilla Base Configuration
          { src: 'src/core/config/*.ts', dest: 'dist' },
        ],
        hook: 'writeBundle',
        flatten: false, // Keep directory structure
      }),
    ],
    resolve: {
      alias: [
        { find: '/^~/', replacement: '' },
        { find: '@', replacement: resolve(__dirname, 'src') },
      ],
    },
    build: {
      minify: false,
      sourcemap: false,
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'vanilla-components',
        fileName: format => `vanilla-components.${format}.js`,
      },
      rollupOptions: {
        external: externals,
        output: {
          globals: {
            'vue': 'Vue',
            '@vueuse/core': 'vue-use',
            '@popperjs/core': 'popperjs',
            '@headlessui/vue': 'headlessui-vue',
            'axios': 'axios',
            'flatpickr': 'flatpickr',
            'libphonenumber-js': 'libphonenumber-js',
            'fuse.js': 'fusejs',
            '@favlorly/v-calendar': 'v-calendar',
          },
        },
      },
    },
  }
})
