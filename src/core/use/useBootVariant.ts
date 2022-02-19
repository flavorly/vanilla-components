import {
  Errors,
  Data,
} from '@/core/types';

import {
  getCurrentInstance,
  Ref,
  watch,
  ref,
  computed,
  ComputedRef,
} from 'vue';

export default function useBootVariant<Props extends Data, ErrorsKey extends string, ModelValueKey extends Ref>(
  props: Props,
  errorsKey: ErrorsKey,
  modelValue: ModelValueKey,
) {

  const vm = getCurrentInstance()!;
  // Check any errors from the component itself or parent component
  const parentErrors = ref(vm.parent?.props[errorsKey]) as Ref<Errors>;
  const componentErrors = ref(props[errorsKey]) as Ref<Errors>;

  // Errors can be either from parent or from component itself, it gives priority to component errors
  const errors = computed(() => {
    if (componentErrors.value !== undefined && componentErrors.value !== '') {
      return componentErrors.value;
    }

    if (parentErrors.value !== undefined && parentErrors.value !== '') {
      return parentErrors.value;
    }
    return undefined;
  }) as Ref<Errors>;

  // Ensure we have a bool to toggle errors
  const hasErrors = computed(() => errors.value !== undefined && errors.value !== '') as ComputedRef<boolean>;

  // Variant is either if we have errors it will be error, otherwise it uses the default variant
  const localVariant = ref(props.variant);
  if (hasErrors.value) {
    localVariant.value = 'error';
  }

  watch(modelValue, () => {
      componentErrors.value = undefined;
      parentErrors.value = undefined;
      localVariant.value = null;
  });

  return {
    hasErrors,
    errors,
    localVariant,
  };
}
