import { App } from 'vue';
import { VanillaComponentConfiguration } from '@/core/types';
import mergeConfiguration from './configuration';

const plugin = {
  install: (app: App<Element>, configuration: VanillaComponentConfiguration = {}): void => {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$vanillaComponents = true;
    const mergedConfiguration = mergeConfiguration(configuration);
    app.provide('vanilla_configuration', mergedConfiguration);
  },
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $vanillaComponents: boolean;
  }
}

export default plugin;
