import type { ComputedRef, Ref } from 'vue'
import { computed } from 'vue'
import type { InputOptions, NormalizedOption, NormalizedOptions } from '../types'
import { flattenOptions, normalizeOptions } from '../helpers'

export default function useMultipleOptions(
  options: Ref<InputOptions | undefined>,
  textAttribute: Ref<string | undefined>,
  valueAttribute: Ref<string | undefined>,
  normalize: Ref<boolean>,
): {
  normalizedOptions: ComputedRef<NormalizedOptions>
  flattenedOptions: ComputedRef<NormalizedOption[]>
} {
  const normalizedOptions = computed<NormalizedOptions>(() => {
    if (!normalize.value) {
      return options.value as NormalizedOptions
    }

    return normalizeOptions(
      options.value,
      textAttribute.value,
      valueAttribute.value,
    )
  })

  // Flattened array with all posible options
  const flattenedOptions = computed((): NormalizedOption[] => flattenOptions(normalizedOptions.value))

  return {
    normalizedOptions,
    flattenedOptions,
  }
}
