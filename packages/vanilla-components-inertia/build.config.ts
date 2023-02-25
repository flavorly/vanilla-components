import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    { builder: 'mkdist', input: './src/' },
    { builder: 'mkdist', input: './src/', format: 'cjs', ext: 'js' },
  ],
  dependencies: [
    '@flavorly/vanilla-components',
    '@inertiajs/vue3',
  ],
  declaration: true,
  clean: true,
})
