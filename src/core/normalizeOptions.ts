import get from './helpers/get';
import {
  InputOptions,
  NormalizedOptions,
  NormalizedOption,
  InputOption,
  InputOptionValue,
  InputOptionText,
  InputOptionObject,
} from '@/core/types';

const guessOptionValue = (option: InputOptionObject, valueAttribute?: string): InputOptionValue => {
  if (valueAttribute) {
    const value = get(option, valueAttribute);

    if (value === null) {
      return null;
    }

    if (typeof value === 'undefined') {
      return undefined;
    }

    if (typeof value === 'number' || typeof value === 'string') {
      return value;
    }

    return String(value);
  }

  return option.value;
};

const guessOptionText = (option: InputOptionObject, textAttribute?: string): InputOptionText => {
  if (textAttribute) {
    const text = get(option, textAttribute);

    if (typeof text === 'undefined' || text === null) {
      return '';
    }

    if (typeof text === 'number' || typeof text === 'string') {
      return text;
    }

    return String(text);
  }

  return option.text;
};

const normalizeOption = (
  option: InputOption,
  textAttribute?: string,
  valueAttribute?: string,
): NormalizedOption => {
  if (typeof option === 'string' || typeof option === 'number') {
    return {
      value: option,
      text: option,
      raw: option,
    };
  }

  const normalizedOption: NormalizedOption = {
    value: guessOptionValue(option, valueAttribute),
    text: guessOptionText(option, textAttribute),
    raw: option,
  };

  if (option.disabled) {
    normalizedOption.disabled = true;
  }

  if (option.children) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    normalizedOption.children = normalizeOptions(option.children, textAttribute, valueAttribute);
  }

  return normalizedOption;
};

const normalizeOptions = (
  options?: InputOptions,
  textAttribute?: string,
  valueAttribute?: string,
): NormalizedOptions => {
  if (Array.isArray(options)) {
    return options.map((option) => normalizeOption(option, textAttribute, valueAttribute));
  }

  if (typeof options === 'object') {
    return Object.keys(options).map((optionKey) => ({
      value: optionKey,
      text: options[optionKey],
    }));
  }

  return [];
};

export default normalizeOptions;
