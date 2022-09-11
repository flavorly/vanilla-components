import {
  computed,
  inject,
  camelize,
  getCurrentInstance,
  ComponentInternalInstance,
  ComputedRef,
  watch,
  reactive,
} from 'vue';

import {
  get,
  isEqual,
  isPrimitive,
  parseVariant,
  pick,
} from '@/core';

import {
  Data,
  VanillaComponentConfiguration,
} from '@/core/types';

/**
 * Extract the defined props from the component
 * @param vm
 */
export const extractDefinedProps = (vm: ComponentInternalInstance): string[] => {
  const validProps = Object.keys(vm.props);

  return Object.keys(vm.vnode.props || {})
    .map((propName) => camelize(propName))
    .filter((propName) => validProps.includes(propName) && propName !== 'modelValue');
};

/**
 * Extract the Attributes from the configuration
 * @param configuration
 */
export function useAttributes<ComponentOptions extends Data>(configuration: ComponentOptions): Data {
  const vm = getCurrentInstance()!;

  const computedAttributes: ComputedRef<Data> = computed<Data>(():Data => {
    const availableProps = Object.keys(vm?.props ?? {});

    return pick(configuration, (value, key) => isPrimitive(value) && !availableProps.includes(String(key)));
  });

  const attributes = reactive<Data>(computedAttributes.value);

  watch(computedAttributes, (newValue) => {
    Object.keys(newValue).forEach((key) => {
      if (!isEqual(attributes[key], newValue[key])) {
        attributes[key] = newValue[key];
      }
    });
  });

  return attributes;
}

/**
 * Extracts the configuration parts for the component such as
 * classes list & options / classes for the component
 */
export function useConfigurationParts<ComponentOptions extends Data>(): {
  componentGlobalConfiguration?: ComponentOptions
  propsValues: ComputedRef<Data>
} {
  // Get the current instance
  const vm = getCurrentInstance()!;

  // Inject the Default Configuration
  const variantGlobalConfiguration = inject<VanillaComponentConfiguration>('vanilla_configuration', {});

  // This ensures the configuration can only be loaded for this component name
  // TODO: check this, we can probably add other ways to pick the configuration key file.
  const componentGlobalConfiguration = get<VanillaComponentConfiguration, ComponentOptions>(variantGlobalConfiguration, vm?.type.name as keyof VanillaComponentConfiguration, {});

  // Set the props
  const propsValues = computed(() => {
    const values: Data = {};
    if (vm) {
      extractDefinedProps(vm).forEach((attributeName) => {
        const normalizedAttribute = camelize(attributeName);
        values[normalizedAttribute] = vm.props[normalizedAttribute];
      });
    }
    return values;
  });

  return {
    componentGlobalConfiguration,
    propsValues: propsValues as ComputedRef<Data>,
  };
}

/**
 * Use this function to extract the current configuration ( custom + globals for a certain component )
 * Returns the configuration for the component & the Attributes
 *
 * @param defaultConfiguration
 */
export default function useConfiguration<ComponentOptions extends Data>(defaultConfiguration: ComponentOptions): {
  configuration: ComponentOptions,
  attributes: Data,
} {
  const vm = getCurrentInstance()!;

  const { propsValues, componentGlobalConfiguration } = useConfigurationParts<ComponentOptions>();

  const computedConfiguration = computed(() => {
    const props = { ...vm.props };
    delete props.modelValue;
    return {
      ...props,
      ...parseVariant(
        propsValues.value,
        componentGlobalConfiguration,
        defaultConfiguration,
      ),
    };
  });

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
