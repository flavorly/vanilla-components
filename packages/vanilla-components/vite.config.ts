import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import type { PluginOption } from 'vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import copy from 'rollup-plugin-copy'
import DefineOptions from 'unplugin-vue-define-options/vite'
import { dependencies, peerDependencies } from './package.json'

const externals = [
  ...Object.keys(dependencies || {}),
  ...Object.keys(peerDependencies || {}),
]

const plugins: PluginOption[] = [
  vue(),
  DefineOptions(),
  copy({
    targets: [
      { src: 'src/components/**/*.vue', dest: 'dist' },
      { src: 'src/components/**/config.ts', dest: 'dist' },
      { src: 'src/core/config/*.ts', dest: 'dist' },
    ],
    flatten: false,
    hook: 'writeBundle',
    copyOnce: true,
  }) as Plugin,
  dts({
    tsConfigFilePath: '../../tsconfig.json',
    staticImport: true,
    skipDiagnostics: true,
    outputDir: 'dist',
  }),
]

export default defineConfig({
    plugins,
    resolve: {
      alias: [
        { find: '/^~/', replacement: '' },
        { find: '@', replacement: resolve(__dirname, 'src') },
      ],
    },
    build: {
      minify: false,
      sourcemap: true,
      lib: {
        formats: ['es', 'cjs', 'umd'],
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'VanillaComponents',
        fileName: format => `index.${format}.js`,
      },
      rollupOptions: {
        external: externals,
        output: {
          sourcemapExcludeSources: true,
          globals: {
            'vue': 'vue',
            '@vueuse/core': 'vue-use',
            '@popperjs/core': 'popperjs',
            '@headlessui/vue': 'headlessui-vue',
            'libphonenumber-js': 'libphonenumber-js',
            'fuse.js': 'fusejs',
            '@flavorly/v-calendar': 'v-calendar',
            'focus-trap': 'focus-trap',
            'qs': 'qs',
            'universal-cookie': 'universal-cookie',
          },
        },
      },
    },
})
