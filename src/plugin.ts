import { App } from 'vue';
import { VariantJSConfiguration } from './types';

const plugin = {
  install: (app: App<Element>, configuration: VariantJSConfiguration = {}): void => {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$vanillaComponents = true;
    app.provide('configuration', configuration);
  },
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $vanillaComponents: boolean;
  }
}

export default plugin;
