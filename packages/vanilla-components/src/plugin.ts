import type { App } from 'vue'
import mergeConfiguration from './configuration'
import type { VanillaComponentConfiguration } from './core/types'
import { FragmentPlugin } from './plugins/Fragment'

const plugin = {
  install: (app: App<Element>, configuration: VanillaComponentConfiguration = {}): void => {
    app.config.globalProperties.$vanillaComponents = true
    const mergedConfiguration = mergeConfiguration(configuration)
    app.provide('vanilla_configuration', mergedConfiguration)
    app.use(FragmentPlugin)
  },
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $vanillaComponents: boolean
  }
}

export default plugin
