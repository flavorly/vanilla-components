import DefaultTheme from 'vitepress/theme'
import { Plugin } from '@flavorly/vanilla-components'

import './styles/tailwind.css'
import './styles/brand.css'

// import './styles/custom.css'

// import './styles/v-calendar.pcss'
// import 'vue-json-pretty/lib/styles.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    // extend default theme custom behaviour.
    DefaultTheme.enhanceApp(ctx)
    ctx.app.use(Plugin)

    const components = import.meta.glob('../../src/components/*.vue', { eager: true })
    Object.entries(components).forEach(([path, definition]) => {
      const componentName = path.split('/').pop().replace(/\.\w+$/, '')
      ctx.app.component(componentName, definition.default)
    })

    // register your custom global components
    // ctx.app.component('MyGlobalComponent' /* ... */)
  },
}
