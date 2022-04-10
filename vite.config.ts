import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import typescript from '@rollup/plugin-typescript';
import dts from 'vite-plugin-dts'
import copy from 'rollup-plugin-copy'

const pluginsProduction = [
  vue(),
  // Generate Definitions
  dts({
    cleanVueFileName: false,
    staticImport: true,
    beforeWriteFile(filePath, content){
      return {
        filePath: filePath.replace(`src`, ``),
        content,
      };
    }
  }),
  // Copy vue files so Webstorm can be happy.
  copy({
    targets: [
      // Vue Components
      { src: 'src/components/**/*.vue', dest: 'dist' },
      // Vanilla Components Configuration
      { src: 'src/components/**/Config.ts', dest: 'dist' },
      // Vanilla Base Configuration
      { src: 'src/core/config/*.ts', dest: 'dist' },
    ],
    hook: 'writeBundle',
    flatten: false, // Keep directory structure
  }),
];

const pluginsDevelopment = [
  vue(),
  copy({
    targets: [
      // Vue Components
      { src: 'src/components/**/*.vue', dest: 'dist' },
      // Vanilla Components Configuration
      { src: 'src/components/**/Config.ts', dest: 'dist' },
      // Vanilla Base Configuration
      { src: 'src/core/config/*.ts', dest: 'dist' },
    ],
    hook: 'writeBundle',
    flatten: false, // Keep directory structure
  }),
]

export default defineConfig(({ command, mode }) => {
  // Todo Remove this after we are done! :p
  //const isDevelopmentWatch = command === 'build' && mode === 'production';
  const isDevelopmentWatch = false;
  return {
    plugins: isDevelopmentWatch ? pluginsDevelopment : pluginsProduction,
    resolve:{
      alias: [
        { find: '/^~/', replacement: ''},
        { find: '@', replacement: resolve(__dirname,'src') }
      ]
    },
    build: {
      minify: false,
      sourcemap: true,
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'vanilla-components',
        fileName: (format) => `index.${format}.js`
      },
      rollupOptions: {
        plugins: [
          // typescript({
          //   "exclude": ["node_modules"]
          // }),
        ],
        //inlineDynamicImports: true,
        external: [
          'vue',
          '@headlessui/vue',
          '@heroicons/vue',
          '@heroicons/vue',
          '@popperjs/core',
          'body-scroll-lock',
          'flatpickr',
          'fuse.js',
          'libphonenumber-js',
          'moment-timezone',
          'lodash',
          'lodash/each',
          'lodash/filter',
          'lodash/orderBy',
          'lodash/merge',
          'lodash/mapValues',
          'lodash/find',
          'lodash/assign',
          'lodash/debounce',
          'lodash/findIndex',
          'lodash/merge',
          'lodash/first',
          'lodash/pick',
          'lodash/omit',
          'lodash/uniqueId',
          'lodash/filter',
        ],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  }
})
