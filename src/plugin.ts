import type { App } from 'vue'
import mergeConfiguration from './configuration'
import type { VanillaComponentConfiguration } from '@/core/types'

const plugin = {
  install: (app: App<Element>, configuration: VanillaComponentConfiguration = {}): void => {
    app.config.globalProperties.$vanillaComponents = true
    const mergedConfiguration = mergeConfiguration(configuration)
    app.provide('vanilla_configuration', mergedConfiguration)
  },
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $vanillaComponents: boolean
  }
}

export default plugin
