//import { mapValues } from 'lodash';
import { commonClasses, mergeClasses } from '@/core';

export const VanillaToggleConfig = {
  fixedClasses: {
    wrapper: 'flex items-center justify-center',
    toggle: mergeClasses(
      'relative inline-flex flex-shrink-0  cursor-pointer',
      'border-2 border-transparent',
      'h-6 w-11',
      'rounded-full',
      'transition-colors ease-in-out duration-200',
      commonClasses.buttonRing,
    ),
    checked: '',
    unchecked: '',
    iconChecked: 'h-3 w-3',
    iconUnchecked: 'h-3 w-3',
  },
  // Default Input appearance
  classes: {
    wrapper : '',
    toggle: 'focus:ring-offset-2 focus:ring-primary-600',
    checked: 'bg-primary-600',
    unchecked: 'bg-gray-200 dark:bg-gray-900 dark:border-gray-700',
    iconChecked: 'text-primary-600',
    iconUnchecked: 'text-gray-400 dark:text-gray-900',
  },
  // Variants
  variants: {
    // Used for Errors
    error: {
      classes: {
        wrapper : '',
        toggle: 'focus:ring-offset-2 focus:ring-red-600',
        checked: 'bg-red-600',
        unchecked: 'bg-red-600/50 dark:bg-red-500/70',
        iconChecked: 'text-red-600',
        iconUnchecked: 'text-red-400',
      },
    },
  },
};

/**
 * Converts our own config into VariantJS config
 * @param configuration
 * @constructor
 */
// export const VanillaToggleConfigToVariantJs = (configuration: any) => {
//   return {
//     fixedClasses: configuration.fixedClasses.checkbox,
//     classes: VanillaToggleConfig.classes.checkbox,
//     variants: mapValues(configuration.variants, (value) => {
//       return {
//         classes: value.classes.checkbox,
//       };
//     }),
//   };
// };

export const VanillaToggleClassesKeys = Object.keys(VanillaToggleConfig.classes);

export type VanillaToggleClassesValidKeys = keyof typeof VanillaToggleConfig.classes;


