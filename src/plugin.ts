import { App } from 'vue';
import { VCConfiguration } from './types';

const plugin = {
  install: (app: App<Element>, configuration: VCConfiguration = {}): void => {
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
