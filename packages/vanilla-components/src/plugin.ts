import type { App } from 'vue'
import { mergeConfiguration } from './configuration'
import type { ComponentsConfiguration } from './core/types'

const plugin = {
  install: (app: App<Element>, configuration: ComponentsConfiguration = {}): void => {
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
