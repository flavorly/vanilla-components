import {
  computed,
  getCurrentInstance,
  reactive,
  watch,
} from 'vue';
import { Data } from '@/core/types';
import { parseVariantWithClassesList } from '@/core';
import { useAttributes, useConfigurationParts } from './useConfiguration';

export default function useConfigurationWithClassesList<ComponentOptions extends Data>(defaultConfiguration: ComponentOptions, classesListKeys: string[]): {
  configuration: ComponentOptions,
  attributes: Data,
} {
  const vm = getCurrentInstance()!;

  const { propsValues, componentGlobalConfiguration } = useConfigurationParts<ComponentOptions>();

  const computedConfiguration = computed(() => ({
    ...vm.props,
    ...parseVariantWithClassesList(
      propsValues.value,
      classesListKeys,
      componentGlobalConfiguration,
      defaultConfiguration,
    ),
  }));

  const configuration = reactive(computedConfiguration.value);

  watch(computedConfiguration, (newValue) => {
    Object.keys(newValue).forEach((key) => {
      configuration[key] = newValue[key];
    });
  });

  const attributes = useAttributes(configuration);

  return {
    configuration: configuration as ComponentOptions,
    attributes,
  };
}
