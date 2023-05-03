import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import type { PluginOption } from 'vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import copy from 'rollup-plugin-copy'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { dependencies, peerDependencies } from './package.json'

const externals = [
  ...Object.keys(dependencies || {}),
  ...Object.keys(peerDependencies || {}),
]

const plugins: PluginOption[] = [
  vue(),
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
]

export default defineConfig({
    plugins,
    resolve: {
      alias: [
        { find: '/^~/', replacement: '' },
        { find: '@', replacement: resolve(__dirname, 'src') },
      ],
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext',
      },
    },
    build: {
      minify: false,
      sourcemap: true,
      emptyOutDir: true,

      // Target must be esnext in order to support dynamic imports for umd builds
      target: 'esnext',
      lib: {
        formats: ['es', 'cjs', 'umd'],
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'VanillaComponents',
        fileName: format => `index.${format}.js`,
      },
      rollupOptions: {
        external: externals,
        output: {
          globals: {
            'vue': 'vue',
            '@vueuse/core': 'vue-use',
            '@popperjs/core': 'popperjs',
            '@headlessui/vue': 'headlessui-vue',
            'libphonenumber-js': 'libphonenumber-js',
            'fuse.js': 'fusejs',
            'v-calendar': 'v-calendar',
            'focus-trap': 'focus-trap',
            'qs': 'qs',
            'universal-cookie': 'universal-cookie',
          },
        },
      },
    },
})
