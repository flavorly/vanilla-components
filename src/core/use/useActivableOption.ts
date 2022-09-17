import { isEqual, normalizedOptionIsDisabled } from '@/core/helpers';
import { NormalizedOption } from '@/core/types';
import { computed, ComputedRef, Ref, ref, watch } from 'vue';

export default function useActivableOption(
  options: ComputedRef<NormalizedOption[]>,
  localValue: Ref,
): {
    activeOption: Ref<NormalizedOption | null>,
    initActiveOption: () => void,
    optionIsActive: (option: NormalizedOption) => boolean,
    setActiveOption: (option: NormalizedOption) => void,
    setNextOptionActive: () => void,
    setPrevOptionActive: () => void,
  } {
  const getActiveOption = (): NormalizedOption | null => {
    const selectedOption = options.value.find((option: NormalizedOption) => isEqual(option.value, localValue.value) && !normalizedOptionIsDisabled(option));

    if (selectedOption !== undefined) {
      return selectedOption;
    }

    if (options.value.length > 0) {
      return options.value.find((option) => !normalizedOptionIsDisabled(option)) || null;
    }

    return null;
  };

  const activeOption = ref<NormalizedOption | null>(getActiveOption());

  const activeOptionIndex = computed((): number => {
    if (activeOption.value === null) {
      return 0;
    }

    const index = options.value.findIndex((option) => isEqual(option.value, (activeOption.value as NormalizedOption).value));

    return index < 0 ? 0 : index;
  });

  const optionIsActive = (option: NormalizedOption): boolean => (activeOption.value === null ? false : isEqual(activeOption.value.value, option.value));

  const setActiveOption = (option: NormalizedOption): void => {
    activeOption.value = option;
  };

  const setNextOptionActive = (): void => {
    let newActiveOption: NormalizedOption | undefined;
    let nextIndex = activeOptionIndex.value + 1;

    while (nextIndex < options.value.length && newActiveOption === undefined) {
      const option = options.value[nextIndex];
      const optionIsDisabled = normalizedOptionIsDisabled(option);
      if (!optionIsDisabled) {
        newActiveOption = option;
      }
      nextIndex += 1;
    }

    if (newActiveOption) {
      setActiveOption(newActiveOption);
    }
  };

  const setPrevOptionActive = (): void => {
    let newActiveOption: NormalizedOption | undefined;
    let nextIndex = activeOptionIndex.value - 1;

    while (nextIndex >= 0 && newActiveOption === undefined) {
      const option = options.value[nextIndex];
      const optionIsDisabled = normalizedOptionIsDisabled(option);
      if (!optionIsDisabled) {
        newActiveOption = option;
      }
      nextIndex -= 1;
    }

    if (newActiveOption) {
      setActiveOption(newActiveOption);
    }
  };

  const initActiveOption = (): void => {
    activeOption.value = getActiveOption();
  };

  watch(options, (newOptions: NormalizedOption[], oldOptions: NormalizedOption[]) => {
    const firstNewOption = newOptions.find((o) => !oldOptions.includes(o) && !normalizedOptionIsDisabled(o));

    if (firstNewOption) {
      setActiveOption(firstNewOption);
    } else {
      initActiveOption();
    }
  });

  return {
    activeOption,
    initActiveOption,
    optionIsActive,
    setActiveOption,
    setNextOptionActive,
    setPrevOptionActive,
  };
}
