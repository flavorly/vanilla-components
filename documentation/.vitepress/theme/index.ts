// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import DefaultTheme from 'vitepress/theme'
import { Plugin } from '@flavorly/vanilla-components'
import type { EnhanceAppContext } from 'vitepress'
import DynamicLayout from '../components/DynamicLayout.vue'
import { makeServer } from '../miragejs/server'

import './styles/brand.css'
import './styles/tailwind.css'
import './styles/v-calendar.pcss'
import 'vue-json-pretty/lib/styles.css'

export default {
  ...DefaultTheme,
  Layout: DynamicLayout,
  enhanceApp(ctx: EnhanceAppContext) {
    // Let the default theme do its thing
    DefaultTheme.enhanceApp(ctx)

    // Install Vanilla Components Plugin
    ctx.app.use(Plugin)

    // Register Demo Components
    const components = import.meta.glob('../../src/components/*.vue', { eager: true })
    Object.entries(components).forEach(([path, definition]) => {
      const componentName = path.split('/').pop().replace(/\.\w+$/, '')
      ctx.app.component(componentName, definition.default)
    })

    // Start MirageJS Server
    if (!import.meta.env.SSR) {
      // Start the fake API server
      makeServer({ environment: 'production' })
    }
  },
}
