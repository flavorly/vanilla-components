import { defineClientAppEnhance } from '@vuepress/client'
import { VanillaComponentConfiguration }  from "@/core/types";
import { VanillaComponents } from "@/index";

export default defineClientAppEnhance(({ app, router, siteData }) => {

  const configuration: VanillaComponentConfiguration = {
    VanillaInput: {
      ///classes: 'border-yellow-500',
      placeholder: 'Elon Musky'
    },
  };

  app.use(VanillaComponents, configuration)

})
