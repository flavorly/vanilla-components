import {
  getCurrentInstance,
  Ref,
  watch,
  ref,
} from 'vue';

import { Data } from '@/core/types';

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
