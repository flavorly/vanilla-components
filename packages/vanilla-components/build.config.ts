// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { resolve } from 'path'
import { defineBuildConfig } from 'unbuild'
import * as pkg from './package.json'

const externals = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

export default defineBuildConfig({
  entries: [
    { builder: 'mkdist', input: './src/' },
    { builder: 'mkdist', input: './src/', format: 'cjs', ext: 'js' },
  ],
  externals,
  declaration: true,
  clean: true,
  alias: {
     // '@': resolve(__dirname, './src/'),
  },
  replace: {
    // '@': './src',
  },
})
