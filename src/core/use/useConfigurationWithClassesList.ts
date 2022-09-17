import type { Ref } from 'vue'
import {
  computed,
  getCurrentInstance,
  reactive,
  watch,
} from 'vue'

import {
  parseVariantWithClassesList,
  useAttributes,
  useConfigurationParts,
} from '@/core'

import type { Data } from '@/core/types'

/**
 * Same as configuration but with classes list.
 *
 * @param defaultConfiguration
 * @param classesListKeys
 * @param variant
 */
export default function useConfigurationWithClassesList<ComponentOptions extends Data>(
  defaultConfiguration: ComponentOptions,
  classesListKeys: string[],
  variant: Ref,
): {
  configuration: ComponentOptions
  attributes: Data
  variant: Ref | null
} {
  const vm = getCurrentInstance()!

  const { propsValues, componentGlobalConfiguration } = useConfigurationParts<ComponentOptions>()

  const computedConfiguration = computed(() => ({
    ...vm?.props || {},
    ...parseVariantWithClassesList(
      propsValues.value,
      classesListKeys,
      componentGlobalConfiguration,
      defaultConfiguration,
      variant.value,
    ),
  }))

  const configuration = reactive(computedConfiguration.value)

  // Watches all the component props and also the variant clases list
  // If any changes, it will be updated with the new keys
  watch(computedConfiguration, (newValue) => {
    Object.keys(newValue).forEach((key) => {
      configuration[key] = newValue[key]
    })
  })

  const attributes = useAttributes(configuration)

  return {
    configuration: configuration as ComponentOptions,
    attributes,
    variant,
  }
}
