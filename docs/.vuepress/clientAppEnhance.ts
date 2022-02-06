import { defineClientAppEnhance } from '@vuepress/client'
import { variantJS, VariantJSConfiguration } from '@variantjs/vue'

export default defineClientAppEnhance(({ app, router, siteData }) => {

  const configuration: VariantJSConfiguration = {
    VanillaInputText: {
      classes: 'foo',
      variants: {
        // A red variant of the button (applied when `<t-button variant="error" />`)
        error: {
          classes: 'text-white bg-red-600 hover:bg-red-500 focus:border-red-700 active:bg-red-700 text-sm font-medium border border-transparent px-3 py-2 rounded-md',
        },
        // A green variant of the button (applied when `<t-button variant="success" />`)
        success: {
          classes: 'text-white bg-green-600 hover:bg-green-500 focus:border-green-700 active:bg-green-700 text-sm font-medium border border-transparent px-3 py-2 rounded-md',
        },
      },
      placeholder: 'Elon Musky'
    },
  };

  app.use(variantJS, configuration)

})
