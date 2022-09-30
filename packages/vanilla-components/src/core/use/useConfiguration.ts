import type { ComponentInternalInstance, ComputedRef, Ref } from 'vue'
import { camelize, computed, getCurrentInstance, inject, reactive, ref, watch } from 'vue'
import { get, isEqual, isPrimitive, pick } from '@/core/helpers'
import { useParseVariant } from '@/core/use'
import type { ComponentsConfiguration, Data } from '@/core/types'

/**
 * Extract the defined props from the component
 * @param vm
 */
export const extractDefinedProps = (vm: ComponentInternalInstance): string[] => {
  const validProps = Object.keys(vm.props)

  return Object.keys(vm.vnode.props || {})
    .map(propName => camelize(propName))
    .filter(propName => validProps.includes(propName) && propName !== 'modelValue')
}

/**
 * Extract the Attributes from the configuration
 * @param configuration
 */
export function useAttributes<ComponentOptions extends Data>(configuration: ComponentOptions): Data {
  const vm = getCurrentInstance()!

  const computedAttributes: ComputedRef<Data> = computed<Data>((): Data => {
    const availableProps = Object.keys(vm?.props ?? {})

    return pick(configuration, (value, key) => isPrimitive(value) && !availableProps.includes(String(key)))
  })

  const attributes = reactive<Data>(computedAttributes.value)

  watch(computedAttributes, (newValue) => {
    Object.keys(newValue).forEach((key) => {
      if (!isEqual(attributes[key], newValue[key])) {
        attributes[key] = newValue[key]
      }
    })
  })

  return attributes
}

/**
 * Extracts the configuration parts for the component such as
 * classes list & options / classes for the component
 */
export function useConfigurationParts<ComponentOptions extends Data>(
  componentName: string | keyof ComponentsConfiguration,
): {
  componentGlobalConfiguration?: ComponentOptions
  propsValues: ComputedRef<Data>
} {
  // Get the current instance
  const vm = getCurrentInstance()!

  // Inject the Default Configuration
  const variantGlobalConfiguration = inject<ComponentsConfiguration>('vanilla_configuration', {})

  // This ensures the configuration can only be loaded for this component name
  const componentGlobalConfiguration = get<ComponentsConfiguration, ComponentOptions>(
    variantGlobalConfiguration,
    componentName as keyof ComponentsConfiguration,
    {},
  )

  // Set the props
  const propsValues = computed(() => {
    const values: Data = {}
    if (vm) {
      extractDefinedProps(vm).forEach((attributeName) => {
        const normalizedAttribute = camelize(attributeName)
        values[normalizedAttribute] = vm.props[normalizedAttribute]
      })
    }
    return values
  })

  return {
    componentGlobalConfiguration,
    propsValues: propsValues as ComputedRef<Data>,
  }
}

/**
 * Use this function to extract the current configuration ( custom + globals for a certain component )
 * Returns the configuration for the component & the Attributes
 *
 * @param defaultConfiguration
 * @param classesListKeys
 * @param modelValue
 * @param componentName
 */
export function useConfiguration<ComponentOptions extends Data>(
  defaultConfiguration: ComponentOptions,
  componentName: keyof ComponentsConfiguration,
  modelValue: Ref | undefined = undefined,
  classesListKeys: string[] | undefined = undefined,
): {
  configuration: ComponentOptions
  attributes: Data
  errors: Ref<string | undefined>
  variant: Ref<string | undefined>
  hasErrors: Ref<boolean>
} {
  const vm = getCurrentInstance()!
  const props = vm?.props

  // Local Errors starting as undefined
  const errors = ref<string | undefined>(props?.errors as string | undefined)
  const variant = ref<string | undefined>(props?.variant as string | undefined)
  const hasErrors = computed(() => errors?.value !== undefined && errors?.value !== null && errors?.value !== '') as ComputedRef<boolean>

  // If there is any error, we will just set the variant to the error one
  if (errors.value !== undefined && errors.value !== '') {
      variant.value = 'error'
  }

  // If there is a model value, we will watch it and reset the errors
  if (modelValue !== undefined) {
    watch(() => modelValue?.value, () => {
      errors.value = undefined
      variant.value = props.variant as string | undefined
    })
  }

  // Watch the variant change and re-pass it
  watch(() => props.variant, (newVariant) => {
    variant.value = newVariant as string | undefined
  })

  // If the actual errors changes, we will also update it
  watch(() => props.errors, (newErrors: any) => {
    errors.value = newErrors
    if (hasErrors.value) {
      variant.value = 'error'
    }
    else {
      variant.value = props.variant as string | undefined
    }
  })

  // Finally here extract everything on a single computed configuration
  const { propsValues, componentGlobalConfiguration } = useConfigurationParts<ComponentOptions>(componentName)

  const finalClassesListKeys = classesListKeys ?? Object.keys(defaultConfiguration.classes ?? {})

  const computedConfiguration = computed(() => ({
    ...props || {},
    ...useParseVariant(
      propsValues.value,
      finalClassesListKeys,
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
    errors,
    variant,
    hasErrors,
  }
}
