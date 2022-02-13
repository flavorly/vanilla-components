import { mapValues } from 'lodash';

export const VanillaInputConfig = {
  fixedClasses: {
    wrapper: 'relative',
    input: 'appearance-none block w-full leading-normal sm:text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed  focus:outline-none focus:ring-1',
    errorsWrapper: 'absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none',
    errorsIcon: 'w-5 h-5 text-red-400',
  },
  // Default Input appearance
  classes: {
    wrapper : '',
    input: 'border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:focus:ring-offset-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:focus:border-primary-400',
    errorsWrapper: '',
    errorsIcon: '',
  },
  // Variants
  variants: {
    // Used for Errors
    error: {
      classes: {
        wrapper : 'im-not-relative',
        errorsWrapper: 'plus-some-class',
        errorsIcon: '',
        input: 'text-red-400 border-red-400 focus:border-red-400 placeholder-red-400 dark:bg-gray-900 focus:ring-red-500  dark:focus:border-red-400',
      },
    },
  },
};

/**
 * Converts our own config into VariantJS config
 * TODO : need to finish the typings
 * @param configuration
 * @constructor
 */
export const VanillaInputConfigToVariantJs = (configuration: any) => {
  return {
    fixedClasses: configuration.fixedClasses.input,
    classes: VanillaInputConfig.classes.input,
    variants: mapValues(configuration.variants, (value) => {
      return {
        classes: value.classes.input,
      };
    }),
  };
};

export const VanillaInputClassesKeys = Object.keys(VanillaInputConfig.classes);

export type VanillaInputClassesValidKeys = keyof typeof VanillaInputConfig.classes;


