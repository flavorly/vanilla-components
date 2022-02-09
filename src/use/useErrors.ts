import { Data } from '@variantjs/core';
import {
  getCurrentInstance,
  Ref,
  watch,
  ref,
  toRef,
} from 'vue';

export default function useErrors<Props extends Data, ErrorsKey extends keyof Props, ModelValueKey extends Ref>(
  props: Props,
  errorsKey: ErrorsKey,
  modelValue: ModelValueKey,
) {
  const vm = getCurrentInstance();
  const localErrors = toRef(props, errorsKey) as Ref<Props[ErrorsKey]>;
  const hasErrors = localErrors.value !== undefined;

  console.log('Model Value on Boot', modelValue.value);

  watch(modelValue, (value) => {
    console.log('Model Value Changed', value);
    console.log('Local Errors are', localErrors.value);
  });

  return {
    localErrors,
    hasErrors,
  };
}
