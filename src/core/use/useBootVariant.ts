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
  //const parentErrors = ref(vm.parent?.props[errorsKey]) as Ref<Errors>;
  // Own component errors as a new reactive ref.
  const componentErrors = ref(props[errorsKey]) as Ref<Errors>;
  // Local Errors starting as undefined
  const localErrors = ref(undefined) as Ref<Errors>;

  // If component itself has errors, then use them
  if (componentErrors.value !== undefined && componentErrors.value !== '') {
      localErrors.value = componentErrors.value;
  }

  // If Parent has errors, then use them
  // if (parentErrors.value !== undefined && parentErrors.value !== '') {
  //     localErrors.value = parentErrors.value;
  // }

  // First variant we found initiated on this component, so we have a safe way to "rollback" the variant
  const immutableLocalVariant = props.variant;

  // If prop of the component changes, we will update the localErrors as well with that value
  watch(() => props[errorsKey], (newErrors: Errors) => {
    //console.log('Errors Changed [ Local VM ]: ', newErrors, vm.type.name);
    localErrors.value = newErrors;
  });

  // Same happens if the parent changes
  // watch(parentErrors, (newErrors: Errors) => {
  //   console.log('Errors Changed [Parent VM ]:', newErrors, vm?.parent?.type.name);
  //   localErrors.value = newErrors;
  // });

  // In case the Model Value changes, we will then reset everything.
  watch(modelValue, (value) => {
      //console.log('Local Value Changed:', value, vm?.type.name);
      componentErrors.value = undefined;
      //parentErrors.value = undefined;
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

  // TODO : Must watch when variant changes to update.

  // const localVariant = ref(props.variant);
  // if (hasErrors.value){
  //   return localVariant.value = 'error';
  // }
  //
  // // If prop of the component changes, we will update the localErrors as well with that value
  // watch(() => props.variant, (variant) => {
  //   console.log('Local Variant should change [ Local VM ]: ', variant);
  //   localVariant.value = variant;
  // });


  return {
    hasErrors,
    localErrors,
    localVariant,
  };
}
