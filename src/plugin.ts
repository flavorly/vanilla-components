import { App } from 'vue';
import { VanillaComponentConfiguration } from '@/core/types';
import { variantJS } from '@variantjs/vue';
import mergeWithVariantJsAndUserConfiguration from '@/core/mergeWithVariantJsAndUserConfiguration';


const plugin = {
  install: (app: App<Element>, configuration: VanillaComponentConfiguration = {}): void => {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$vanillaComponents = true;
    const mergedConfiguration = mergeWithVariantJsAndUserConfiguration(configuration);
    app.provide('vanilla_configuration', mergedConfiguration);
    // Also use VariantJS with their own configuration but merged with our defaults.
    app.use(variantJS, mergedConfiguration);
  },
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $vanillaComponents: boolean;
  }
}

export default plugin;
