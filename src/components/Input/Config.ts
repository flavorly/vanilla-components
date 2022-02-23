import { mapValues } from 'lodash';
import { commonClasses } from '@/core/config/commonClasses';
import { mergeClasses } from '@/core';

export const VanillaInputConfig = {
  fixedClasses: {
    input: mergeClasses(
      'appearance-none block w-full',
      commonClasses.inputsShadows,
      commonClasses.inputsDisabled,
      commonClasses.inputsSpacing,
    ),
    wrapper: 'relative',
    addonBefore: 'absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer',
    addonAfter: 'absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer',
    addonBeforeInputClasses: 'pl-10',
    addonAfterInputClasses: 'pr-10',
    addonClasses: commonClasses.iconsSize,
  },
  // Default Input appearance
  classes: {
    input:  mergeClasses(
      '',
      commonClasses.inputsText,
      commonClasses.inputsTextColor,
      commonClasses.inputsBackground,
      commonClasses.inputsBorder,
      commonClasses.inputsRing,
      commonClasses.inputsRadius,
    ),
    wrapper : '',
    addonBefore: '',
    addonAfter: '',
    addonBeforeInputClasses: '',
    addonAfterInputClasses: '',
    addonClasses: 'text-gray-300 dark:text-gray-600',
  },
  // Variants
  variants: {
    // Used for Errors
    error: {
      classes: {
        input: mergeClasses(
          commonClasses.inputsErrorText,
          commonClasses.inputsErrorsBackground,
          commonClasses.inputsErrorsBorder,
          commonClasses.inputsErrorsRing,
        ),
        wrapper : '',
        addonBefore: '',
        addonAfter: '',
        addonBeforeInputClasses: '',
        addonAfterInputClasses: '',
        addonClasses: 'text-red-300 dark:text-red-300/70',
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


