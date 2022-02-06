import {
  NormalizedOption,
  NormalizedOptions,
} from './types';

const flattenOptions = (options: NormalizedOptions): NormalizedOptions => options.flatMap((option: NormalizedOption) => {
  if (option.children) {
    return flattenOptions(option.children);
  }

  return option;
});

export default flattenOptions;
