import {
  getCurrentInstance,
  Ref,
  watch,
  ref,
} from 'vue';

import { Data } from '@/core/types';

export default function useVModelBoolean<P extends Data, K extends keyof P>(
  props: P,
  key: K,
  trueValue: never,
  falseValue: never,
): Ref<P[K]> {
  const vm = getCurrentInstance();
  const localValue = ref(props[key]) as Ref<P[K]>;

  watch(localValue, (value) => {
    if (value === true){
      value = trueValue;
    } else {
      value = falseValue;
    }
    vm?.emit(`update:${key}`, value);
  });

  watch(() => props[key], (value) => {
    if (value === true){
      value = trueValue;
    } else {
      value = falseValue;
    }
    localValue.value = value;
  });

  return localValue;
}
