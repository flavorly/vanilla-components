import { Data } from '@/core/types';
import {
  computed,
  ref,
  getCurrentInstance,
  Ref,
  watch,
} from 'vue';

export default function useMultipleVModel<P extends Data, K extends keyof P, C extends boolean>(
  props: P,
  key: K,
  multiple?: C,
): {
  localValue: Ref<P[K]>;
  clearValue: () => void
} {
  const vm = getCurrentInstance();

  const isMultiple = computed<boolean>((): boolean => (multiple === undefined ? false : multiple !== null && true && multiple !== false));

  const getDefaultValue = (): P[K] => {
    if (isMultiple.value) {
      return [] as P[K];
    }

    return undefined as P[K];
  };

  const initialValue = props[key];

  const localValue = ref(initialValue === undefined ? getDefaultValue() : initialValue) as Ref<P[K]>;

  watch(localValue, (value) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    vm?.emit(`update:${key}`, value);
  });

  watch(() => props[key], (value) => {
    localValue.value = value;
  });

  const clearValue = () : void => {
    localValue.value = getDefaultValue();
  };

  watch(isMultiple, () => {
    clearValue();
  });

  return {
    localValue,
    clearValue,
  };
}
