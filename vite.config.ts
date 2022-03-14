import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import typescript from '@rollup/plugin-typescript';
import dts from 'vite-plugin-dts'
import copy from 'rollup-plugin-copy'

export default defineConfig({
    plugins: [
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
          { src: 'src/components/**/*.vue', dest: 'dist' }
        ],
        hook: 'writeBundle',
        flatten: false, // Keep directory structure
      }),
    ],
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
