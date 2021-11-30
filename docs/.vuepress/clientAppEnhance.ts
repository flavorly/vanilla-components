import { defineClientAppEnhance } from '@vuepress/client'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

export default defineClientAppEnhance(({ app, router, siteData }) => {

  // Register all components in Src folder as global
  // const requireComponent = require.context(
  //   './../../src/components',
  //   true,
  //   /\.vue$/i
  // )
  //
  // requireComponent.keys().forEach(fileName => {
  //   const componentConfig = requireComponent(fileName)
  //   const componentName = upperFirst(
  //     camelCase(
  //       fileName
  //         .split('/')
  //         .pop()
  //         .replace(/\.\w+$/, '')
  //     )
  //   )
  //   // Register
  //   app.component(
  //     componentConfig?.default?.name || componentName,
  //     componentConfig.default || componentConfig
  //   )
  // })

  // End component registration

})
