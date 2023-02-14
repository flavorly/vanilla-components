import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
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
      dts({
        cleanVueFileName: false,
        staticImport: false,
        skipDiagnostics: true,
        outputDir: 'dist',
        beforeWriteFile(filePath, content) {
          return {
            filePath: filePath.replace('packages/vanilla-components-hybridly/src', ''),
            content,
          }
        },
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
        name: 'vanilla-components-hybridly',
        fileName: format => `vanilla-components-hybridly.${format}.js`,
      },
      rollupOptions: {
        external: externals,
        output: {
          globals: {
          },
        },
      },
    },
  }
})
