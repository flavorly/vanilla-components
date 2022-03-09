import {
  Errors,
  Data,
} from '@/core/types';

import {
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

  //const vm = getCurrentInstance()!;
  // Booting will be aware of parent errors as well. This might lead to some errors but its usefull at this point
  // const parentErrors = ref(vm.parent?.props[errorsKey]) as Ref<Errors>;

  // Own component errors as a new reactive ref.
  const componentErrors = ref(props[errorsKey]) as Ref<Errors>;

  // Local Errors starting as undefined
  const localErrors = ref(undefined) as Ref<Errors>;
  const localVariant = ref(props.variant);

  // If component itself has errors, then use them
  if (componentErrors.value !== undefined && componentErrors.value !== '') {
      localErrors.value = componentErrors.value;
  }

  // In case the Model Value changes, we will then reset everything.
  watch(modelValue, () => {
      componentErrors.value = undefined;
      localErrors.value = undefined;
      localVariant.value = props.variant;
  });

  // Component has errors if parent or local component has errors
  const hasErrors = computed(() => localErrors.value !== undefined &&  localErrors.value !== null && localErrors.value !== '') as ComputedRef<boolean>;

  // Check if initial has errors if there is errors, we will update the variant to error
  if (hasErrors.value){
      localVariant.value = 'error';
  }

  // If the variant changes, we will just update with the new variant
  watch(() => props.variant, (variant) => {
    localVariant.value = variant;
  });

  // If prop of the component changes, we will update the localErrors as well with that value
  // We must also reset the variant here
  watch(() => props[errorsKey], (newErrors: Errors) => {
    localErrors.value = newErrors;
    if (hasErrors.value){
      localVariant.value = 'error';
    } else {
      localVariant.value = props.variant;
    }
  });

  return {
    hasErrors,
    localErrors,
    localVariant,
  };
}
