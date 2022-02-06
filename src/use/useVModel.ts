import { Data } from '@variantjs/core';
import {
  getCurrentInstance, Ref, watch, ref,
} from 'vue';

export default function useVModel<P extends Data, K extends keyof P>(
  props: P,
  key: K,
): Ref<P[K]> {
  const vm = getCurrentInstance();

  const localValue = ref(props[key]) as Ref<P[K]>;

  watch(localValue, (value) => {
    vm?.emit(`update:${key}`, value);
  });

  watch(() => props[key], (value) => {
    localValue.value = value;
  });

  return localValue;
}
