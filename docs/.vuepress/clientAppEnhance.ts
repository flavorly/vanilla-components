import { defineClientAppEnhance } from '@vuepress/client'
import plugin from '../../src/plugin'
import { variantJS } from '@variantjs/vue'
import { VariantJSConfiguration } from './types/variantCore';

export default defineClientAppEnhance(({ app, router, siteData }) => {

  const configuration: VariantJSConfiguration = {
    TInput: {
      classes: 'foo',
    },
  };

  //app.use(plugin, configuration)
  app.use(variantJS, configuration)

  console.log(app);

  //console.log(app);
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
