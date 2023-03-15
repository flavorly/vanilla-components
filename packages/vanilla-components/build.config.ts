import { defineBuildConfig } from 'unbuild'

// import DefineOptions from 'unplugin-vue-define-options/rollup'
import * as pkg from './package.json'

export default defineBuildConfig({
  entries: [
    { builder: 'mkdist', input: './src/' },
    { builder: 'mkdist', input: './src/', format: 'cjs', ext: 'js' },
  ],
  dependencies: [...Object.keys(pkg.dependencies || {})],
  peerDependencies: [...Object.keys(pkg.peerDependencies || {})],
  declaration: true,
  clean: true,
  externals: [
    'vue',
    'vite',
    'v-calendar',
    '@headlessui/vue',
    '@popperjs/core',
  ],
  hooks: {
    'rollup:options': function (_ctx, options) {
      // options.plugins?.push(DefineOptions())
    },
  },
  rollup: {

  },
})
