import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts'
import copy from 'rollup-plugin-copy'
//import { visualizer } from 'rollup-plugin-visualizer';
// @ts-ignore
import * as pkg from './package.json'

const externals = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

export default defineConfig(({ command, mode }) => {
  return {
    ssr: {
      optimizeDeps: {
        disabled: 'build',
        exclude: [ 'vue' ]
      }
    },
    plugins: [
      vue(),
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
        inlineDynamicImports: true,
        external: externals,
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  }
})
