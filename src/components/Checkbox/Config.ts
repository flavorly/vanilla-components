import { mapValues } from 'lodash';
import { mergeClasses } from '@/core';

export const VanillaCheckboxConfig = {
  fixedClasses: {
    wrapper: 'flex items-center justify-center',
    container: '',
    checkbox: 'h-4 w-4 transition duration-150 ease-in-out block',
  },
  // Default Input appearance
  classes: {
    wrapper : '',
    container: '',
    checkbox:  mergeClasses(
      'checked:bg-primary-600 checked:text-white',
      'dark:focus:ring-offset-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:checked:bg-primary-600',
    ),
  },
  // Variants
  variants: {
    // Used for Errors
    error: {
      classes: {
        wrapper : '',
        container: '',
        checkbox:  mergeClasses(
          'text-red-600 border-red-300 placeholder-red-300 dark:bg-gray-900',
          'focus:ring-red-500',
          'checked:bg-red-600 checked:text-white',
          'dark:checked:bg-red-600 dark:focus:ring-offset-gray-900',
        ),
      },
    },
  },
};

/**
 * Converts our own config into VariantJS config
 * @param configuration
 * @constructor
 */
export const VanillaCheckboxConfigToVariantJs = (configuration: any) => {
  return {
    fixedClasses: configuration.fixedClasses.checkbox,
    classes: VanillaCheckboxConfig.classes.checkbox,
    variants: mapValues(configuration.variants, (value) => {
      return {
        classes: value.classes.checkbox,
      };
    }),
  };
};

export const VanillaCheckboxClassesKeys = Object.keys(VanillaCheckboxConfig.classes);

export type VanillaCheckboxClassesValidKeys = keyof typeof VanillaCheckboxConfig.classes;


