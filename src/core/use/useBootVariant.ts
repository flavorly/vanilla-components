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
  // Booting will be aware of parent errors as well. This might lead to some errors but its usefull at this point
  const parentErrors = ref(vm.parent?.props[errorsKey]) as Ref<Errors>;
  // Own component errors as a new reactive ref.
  const componentErrors = ref(props[errorsKey]) as Ref<Errors>;
  // Local Errors starting as undefined
  const localErrors = ref(undefined) as Ref<Errors>;

  // If component itself has errors, then use them
  if (componentErrors.value !== undefined && componentErrors.value !== '') {
      localErrors.value = componentErrors.value;
  }

  // If Parent has errors, then use them
  if (parentErrors.value !== undefined && parentErrors.value !== '') {
      localErrors.value = parentErrors.value;
  }

  // First variant we found initiated on this component, so we have a safe way to "rollback" the variant
  const immutableLocalVariant = props.variant;

  // If prop of the component changes, we will update the localErrors as well with that value
  watch(() => props[errorsKey], (val: Errors) => {
    localErrors.value = val;
  });

  // Same happens if the parent changes
  watch(parentErrors, (newVal) => {
    console.log('Parent Errors Changed [Parent VM / Current VM ]:', vm?.parent?.type.name, vm.type.name);
    localErrors.value = newVal;
  });

  // In case the Model Value changes, we will then reset everything.
  watch(modelValue, () => {
      componentErrors.value = undefined;
      parentErrors.value = undefined;
      localErrors.value = undefined;
  });

  // Component has errors if parent or local component has errors
  const hasErrors = computed(() => localErrors.value !== undefined &&  localErrors.value !== null && localErrors.value !== '') as ComputedRef<boolean>;

  // Local variant is a computed value, if it has errors then variant for errors is used
  // Otherwise it will roll back to the previous variant
  const localVariant = computed(() => {
    if (hasErrors.value){
      return 'error';
    }
    return immutableLocalVariant;
  });

  return {
    hasErrors,
    localErrors,
    localVariant,
  };
}
