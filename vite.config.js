import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import typescript from '@rollup/plugin-typescript';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
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
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: [
              'vue',
              '@headlessui/vue',
              '@heroicons/vue',
              '@heroicons/vue',
              '@popperjs/core',
              '@variantjs/core',
              '@variantjs/vue',
              '@vueuse/core',
              'body-scroll-lock',
              'flatpickr',
              'fuse.js',
              'libphonenumber-js',
              'lodash',
              'mitt',
              'moment-timezone',
            ],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
})
