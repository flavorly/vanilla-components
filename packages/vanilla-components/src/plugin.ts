import type { App, Plugin } from 'vue'
import { defineOptions, mergeConfiguration } from './configuration'
import type { ComponentsConfiguration, PluginOptions } from './core/types'

const plugin: Plugin = {
  install: (
    app: App<Element>,
    configuration: ComponentsConfiguration = {},
    options: PluginOptions = {},
  ): void => {
    app.config.globalProperties.$vanillaComponents = true
    const mergedConfiguration = mergeConfiguration(configuration)
    app.provide('vanilla_configuration', mergedConfiguration)
    app.provide('vanilla_components_options', defineOptions(options))
  },
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $vanillaComponents: boolean
  }
}

export default plugin
