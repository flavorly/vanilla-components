import type { ComputedRef, Ref } from 'vue'
import { computed, getCurrentInstance, ref, watch } from 'vue'
import type { Data } from '@/core/types'

export default function useBootVariant<Props extends Data, ErrorsKey extends string, ModelValueKey extends Ref>(
  props: Props,
  errorsKey: ErrorsKey,
  modelValue: ModelValueKey,
) {
  const vm = getCurrentInstance()!

  // Own component errors as a new reactive ref.
  const componentErrors = ref(props[errorsKey]) as Ref<string | undefined>

  // Parent Flash
  // console.log(vm.parent.type.__name)
  if (vm?.parent?.type?.__name === 'InputGroup'
    && vm?.type.__name !== 'InputGroup'
    && vm?.type.__name !== 'FormLabel'
    && vm?.parent?.props?.errors !== undefined
  ) {
    componentErrors.value = vm?.parent.props.errors as string | undefined
  }

  // Local Errors starting as undefined
  const localErrors = ref(undefined) as Ref<string | undefined>
  const localVariant = ref(props.variant)

  // If component itself has errors, then use them
  if (componentErrors.value !== undefined && componentErrors.value !== '') {
      localErrors.value = componentErrors.value
  }

  // In case the Model Value changes, we will then reset everything.
  watch(modelValue, () => {
      componentErrors.value = undefined
      localErrors.value = undefined
      localVariant.value = props.variant
  })

  // Component has errors if parent or local component has errors
  const hasErrors = computed(() => localErrors.value !== undefined && localErrors.value !== null && localErrors.value !== '') as ComputedRef<boolean>

  // Check if initial has errors if there is errors, we will update the variant to error
  if (hasErrors.value) {
      localVariant.value = 'error'
  }

  // If the variant changes, we will just update with the new variant
  watch(() => props.variant, (variant) => {
    localVariant.value = variant
  })

  // If prop of the component changes, we will update the localErrors as well with that value
  // We must also reset the variant here
  watch(() => props[errorsKey], (newErrors: any) => {
    localErrors.value = newErrors
    if (hasErrors.value) {
      localVariant.value = 'error'
    }
    else {
      localVariant.value = props.variant
    }
  })

  return {
    hasErrors,
    localErrors,
    localVariant,
  }
}
